import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/Admin.css';

const InquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/forms/inquiries');
            setInquiries(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch inquiries:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const updatedInq = inquiries.find(inq => inq._id === id);
            if (updatedInq && !updatedInq.isRead) {
                await axios.patch(`http://localhost:5000/api/forms/inquiries/${id}/read`);
            }

            await axios.patch(`http://localhost:5000/api/forms/status/${id}`, {
                status: newStatus,
                type: 'inquiry'
            });

            setInquiries(prev => 
                prev.map(inq => inq._id === id ? { ...inq, status: newStatus, isRead: true } : inq)
            );
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Status update failed!");
        }
    };

    if (loading) return <div className="admin-page-container"><p>Loading inquiries...</p></div>;

    return (
        <div className="admin-page-container">
            <h1 className="page-title">Contact Inquiries</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Query</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                         {inquiries.length > 0 ? (
                            inquiries.map(inq => (
                                <tr key={inq._id} className={!inq.isRead ? 'unread' : ''}>
                                    <td>{new Date(inq.submittedAt).toLocaleDateString()}</td>
                                    <td>{inq.name}</td>
                                    <td>{inq.email}</td>
                                    <td className="query-cell">{inq.query}</td>
                                    <td>
                                        <select 
                                            className="status-select"
                                            value={inq.status} 
                                            onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
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
                                <td colSpan="5" style={{ textAlign: 'center' }}>No inquiries found.</td>
                            </tr>
                         )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InquiriesPage;