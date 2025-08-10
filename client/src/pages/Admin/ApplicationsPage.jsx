import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/Admin.css';

const ApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/forms/applications');
            setApplications(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch applications:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    // ✅ സ്റ്റാറ്റസ് മാറ്റാനുള്ള പുതിയ ഫംഗ്ഷൻ
    const handleStatusChange = async (id, newStatus) => {
        try {
            // isRead സ്റ്റാറ്റസ് true ആക്കി മാറ്റുന്നു
            const updatedApp = applications.find(app => app._id === id);
            if (updatedApp && !updatedApp.isRead) {
                await axios.patch(`http://localhost:5000/api/forms/applications/${id}/read`);
            }

            // പുതിയ സ്റ്റാറ്റസ് അപ്ഡേറ്റ് ചെയ്യുന്നു
            await axios.patch(`http://localhost:5000/api/forms/status/${id}`, {
                status: newStatus,
                type: 'application'
            });
            
            // UI അപ്ഡേറ്റ് ചെയ്യാൻ സ്റ്റേറ്റ് മാറ്റുന്നു
            setApplications(prev => 
                prev.map(app => app._id === id ? { ...app, status: newStatus, isRead: true } : app)
            );
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Status update failed!");
        }
    };
    
    if (loading) return <div className="admin-page-container"><p>Loading applications...</p></div>;

    return (
        <div className="admin-page-container">
            <h1 className="page-title">Admission Applications</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email & Phone</th>
                            <th>Stream</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? (
                            applications.map(app => (
                                <tr key={app._id} className={!app.isRead ? 'unread' : ''}>
                                    <td>{new Date(app.submittedAt).toLocaleDateString()}</td>
                                    <td>{app.name}</td>
                                    <td>
                                        <div>{app.email}</div>
                                        <div>{app.phone}</div>
                                    </td>
                                    <td>{app.stream}</td>
                                    <td className="query-cell">{app.message || '-'}</td>
                                    <td>
                                        <select 
                                            className="status-select"
                                            value={app.status} 
                                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                            onClick={(e) => e.stopPropagation()} // ഡ്രോപ്പ്ഡൗണിൽ ക്ലിക്ക് ചെയ്യുമ്പോൾ tr യുടെ onClick പ്രവർത്തിക്കാതിരിക്കാൻ
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>No applications found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationsPage;