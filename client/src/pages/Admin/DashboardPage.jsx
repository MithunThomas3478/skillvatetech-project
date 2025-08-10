// src/pages/admin/DashboardPage.jsx

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faEnvelopeOpenText, faBook, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Chart, registerables } from 'chart.js';
import { Link } from 'react-router-dom'; // ലിങ്ക് ചേർക്കാൻ

Chart.register(...registerables);

const DashboardPage = () => {
    const programsChartRef = useRef(null);
    const [stats, setStats] = useState({
        newApplications: 0,
        newInquiries: 0,
        totalApplications: 0,
        totalInquiries: 0,
    });
    const [recentApplications, setRecentApplications] = useState([]);
    const [programDistribution, setProgramDistribution] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // ഒരേ സമയം അപ്ലിക്കേഷനുകളും എൻക്വയറികളും ഫെച്ച് ചെയ്യുന്നു
                const [applicationsRes, inquiriesRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/forms/applications'),
                    axios.get('http://localhost:5000/api/forms/inquiries')
                ]);

                const applications = applicationsRes.data;
                const inquiries = inquiriesRes.data;

                // സ്റ്റാറ്റസ് കാർഡുകൾക്കുള്ള ഡാറ്റ തയ്യാറാക്കുന്നു
                setStats({
                    newApplications: applications.filter(app => !app.isRead).length,
                    newInquiries: inquiries.filter(inq => !inq.isRead).length,
                    totalApplications: applications.length,
                    totalInquiries: inquiries.length,
                });

                // ടേബിളിനായി ഏറ്റവും പുതിയ 5 അപേക്ഷകൾ എടുക്കുന്നു
                setRecentApplications(applications.slice(0, 5));

                // പ്രോഗ്രാം ചാർട്ടിനുള്ള ഡാറ്റ തയ്യാറാക്കുന്നു
                const distribution = applications.reduce((acc, app) => {
                    acc[app.stream] = (acc[app.stream] || 0) + 1;
                    return acc;
                }, {});
                setProgramDistribution(distribution);

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // ചാർട്ട് വരയ്ക്കാൻ
    useEffect(() => {
        if (loading || !programsChartRef.current || Object.keys(programDistribution).length === 0) return;

        const chartInstance = new Chart(programsChartRef.current.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(programDistribution),
                datasets: [{
                    label: 'Applications',
                    data: Object.values(programDistribution),
                    backgroundColor: ['#ff6b35', '#35a2eb', '#4bc0c0', '#ffce56', '#9966ff', '#ff9f40', '#ff6384'],
                    borderColor: 'var(--bg-dark)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#ffffff' }
                    }
                }
            }
        });
        
        return () => {
            chartInstance.destroy();
        };
    }, [loading, programDistribution]);

    if (loading) {
        return <div className="dashboard-main"><h1>Loading Dashboard...</h1></div>;
    }

    return (
        <div className="dashboard-main">
            <h1>Dashboard Overview</h1>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon orange"><FontAwesomeIcon icon={faFileAlt} /></div>
                    <div className="stat-info">
                        <div className="stat-number">{stats.newApplications}</div>
                        <div className="stat-label">New Applications</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon blue"><FontAwesomeIcon icon={faEnvelopeOpenText} /></div>
                    <div className="stat-info">
                        <div className="stat-number">{stats.newInquiries}</div>
                        <div className="stat-label">New Inquiries</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon green"><FontAwesomeIcon icon={faUsers} /></div>
                    <div className="stat-info">
                        <div className="stat-number">{stats.totalApplications}</div>
                        <div className="stat-label">Total Applications</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon purple"><FontAwesomeIcon icon={faBook} /></div>
                    <div className="stat-info">
                        <div className="stat-number">6</div>
                        <div className="stat-label">Active Programs</div>
                    </div>
                </div>
            </div>

            <div className="data-grid">
                <div className="data-card pie-chart-card">
                    <h3>Program Distribution</h3>
                    <div className="chart-container">
                        <canvas ref={programsChartRef}></canvas>
                    </div>
                </div>
                <div className="data-card table-card">
                    <div className="card-header">
                        <h3>Recent Applications</h3>
                        <Link to="/admin/applications" className="view-all-link">View All</Link>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Applicant Name</th>
                                <th>Program</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentApplications.length > 0 ? recentApplications.map(app => (
                                <tr key={app._id}>
                                    <td>{app.name}</td>
                                    <td>{app.stream}</td>
                                    <td>{new Date(app.submittedAt).toLocaleDateString()}</td>
                                    <td><span className={`status-badge ${app.status}`}>{app.status}</span></td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" style={{textAlign: 'center'}}>No recent applications.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;