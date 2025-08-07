// src/pages/admin/DashboardPage.jsx

import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faFileAlt, faChalkboardTeacher, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const DashboardPage = () => {
    const admissionsChartRef = useRef(null);
    const programsChartRef = useRef(null);

    useEffect(() => {
        if (!admissionsChartRef.current || !programsChartRef.current) return;

        const admissionsChart = new Chart(admissionsChartRef.current.getContext('2d'), {
            type: 'bar',
            data: { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'], datasets: [{ label: 'New Admissions', data: [12,19,25,30,22,40,45,86], backgroundColor: 'rgba(255,107,53,0.7)', borderColor: 'rgba(255,107,53,1)', borderWidth: 1, borderRadius: 5 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { y:{beginAtZero:true, ticks:{color:'#ffffff'}, grid:{color:'var(--border-color)'}}, x:{ticks:{color:'#ffffff'}, grid:{color:'transparent'}} }, plugins: { legend: { labels: { color: '#ffffff' } } } }
        });

        const programsChart = new Chart(programsChartRef.current.getContext('2d'), {
            type: 'doughnut',
            data: { labels: ['Mechanical','CS','ECE','EEE','Civil','Instrumentation'], datasets: [{ label: 'Students', data: [300,450,200,154,80,20], backgroundColor: ['#ff6b35','#35a2eb','#4bc0c0','#ffce56','#9966ff','#ff9f40'], borderColor: 'var(--bg-dark)', borderWidth: 2 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#ffffff' } } } }
        });
        
        return () => {
            admissionsChart.destroy();
            programsChart.destroy();
        };
    }, []);

    return (
        <div className="dashboard-main">
            <h1>Dashboard Overview</h1>
            
            <div className="stats-grid">
                <div className="stat-card"><div className="stat-icon orange"><FontAwesomeIcon icon={faUserPlus} /></div><div className="stat-info"><div className="stat-number">1,204</div><div className="stat-label">Total Students</div></div></div>
                <div className="stat-card"><div className="stat-icon blue"><FontAwesomeIcon icon={faFileAlt} /></div><div className="stat-info"><div className="stat-number">86</div><div className="stat-label">New Applications</div></div></div>
                <div className="stat-card"><div className="stat-icon green"><FontAwesomeIcon icon={faChalkboardTeacher} /></div><div className="stat-info"><div className="stat-number">6</div><div className="stat-label">Active Programs</div></div></div>
                <div className="stat-card"><div className="stat-icon purple"><FontAwesomeIcon icon={faRupeeSign} /></div><div className="stat-info"><div className="stat-number">45.8L</div><div className="stat-label">Revenue (Month)</div></div></div>
            </div>

            <div className="data-grid">
                <div className="data-card chart-card">
                    <canvas ref={admissionsChartRef}></canvas>
                </div>
                <div className="data-card pie-chart-card">
                    <canvas ref={programsChartRef}></canvas>
                </div>
                <div className="data-card table-card">
                    <h3>Recent Applications</h3>
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
                            <tr><td>Anjali Menon</td><td>Computer Science</td><td>Aug 04, 2025</td><td><span className="status-badge pending">Pending</span></td></tr>
                            <tr><td>Vikram Singh</td><td>Mechanical</td><td>Aug 03, 2025</td><td><span className="status-badge approved">Approved</span></td></tr>
                            <tr><td>Priya Sharma</td><td>ECE</td><td>Aug 02, 2025</td><td><span className="status-badge approved">Approved</span></td></tr>
                            <tr><td>Rohan Mathew</td><td>Civil</td><td>Aug 01, 2025</td><td><span className="status-badge rejected">Rejected</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;