import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // SweetAlert2 ഇമ്പോർട്ട് ചെയ്യുന്നു

const API_URL = 'http://localhost:5000/api/gallery';

const GalleryManagementPage = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', category: 'labs' });
    const [files, setFiles] = useState(null);
    const [editingItem, setEditingItem] = useState(null); // എഡിറ്റ് ചെയ്യാനുള്ള ഐറ്റം സ്റ്റോർ ചെയ്യാൻ
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null); // ഫോം റീസെറ്റ് ചെയ്യാനും സ്ക്രോൾ ചെയ്യാനും

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const fetchGalleryItems = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL);
            setGalleryItems(res.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            Swal.fire('Error!', 'Failed to fetch gallery items.', 'error');
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    // എഡിറ്റ് ബട്ടൺ ക്ലിക്ക് ചെയ്യുമ്പോൾ
    const handleEditClick = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            description: item.description,
            category: item.category
        });
        formRef.current.scrollIntoView({ behavior: 'smooth' }); // ഫോമിലേക്ക് സ്ക്രോൾ ചെയ്യുന്നു
    };

    // എഡിറ്റ് കാൻസൽ ചെയ്യാൻ
    const cancelEdit = () => {
        setEditingItem(null);
        setFormData({ title: '', description: '', category: 'labs' });
    };

    // ഫോം സബ്മിറ്റ് ചെയ്യുമ്പോൾ (പുതിയത് ചേർക്കാനും എഡിറ്റ് ചെയ്യാനും)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // എഡിറ്റ് മോഡിൽ അല്ലെങ്കിൽ ഫയൽ നിർബന്ധമാണ്
        if (!editingItem && (!files || files.length === 0)) {
            Swal.fire('Info', 'Please select files to upload.', 'info');
            return;
        }

        setLoading(true);

        if (editingItem) {
            // ----- UPDATE LOGIC -----
            try {
                await axios.put(`${API_URL}/${editingItem._id}`, formData);
                Swal.fire('Updated!', 'Item has been updated successfully.', 'success');
                cancelEdit();
                fetchGalleryItems();
            } catch (err) {
                Swal.fire('Error!', 'Failed to update item.', 'error');
            }
        } else {
            // ----- CREATE LOGIC -----
            const uploadData = new FormData();
            uploadData.append('title', formData.title);
            uploadData.append('description', formData.description);
            uploadData.append('category', formData.category);
            for (let i = 0; i < files.length; i++) {
                uploadData.append('media', files[i]);
            }

            try {
                await axios.post(API_URL, uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                Swal.fire('Success!', 'New items have been uploaded.', 'success');
                setFormData({ title: '', description: '', category: 'labs' });
                setFiles(null);
                formRef.current.reset();
                fetchGalleryItems();
            } catch (err) {
                Swal.fire('Error!', 'Failed to upload items.', 'error');
            }
        }
        setLoading(false);
    };
    
    // ഡിലീറ്റ് ചെയ്യുമ്പോൾ
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#3e3e52',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_URL}/${id}`);
                    fetchGalleryItems();
                    Swal.fire(
                        'Deleted!',
                        'The item has been deleted.',
                        'success'
                    );
                } catch (err) {
                    Swal.fire('Error!', 'Failed to delete item.', 'error');
                }
            }
        });
    };

    return (
        <div className="admin-page">
            <h1 className="page-title">Manage Gallery</h1>
            
            <div className="admin-card">
                <h2>{editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item(s)'}</h2>
                <form onSubmit={handleSubmit} className="admin-form" ref={formRef}>
                    <div className="form-group">
                        <label htmlFor="title">Title / Caption</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
                            <option value="labs">Labs & Tech</option>
                            <option value="campus">Campus Life</option>
                            <option value="events">Events</option>
                        </select>
                    </div>
                    {!editingItem && (
                        <div className="form-group">
                            <label htmlFor="media">Image/Video File(s)</label>
                            <input type="file" id="media" name="media" onChange={handleFileChange} required multiple />
                        </div>
                    )}
                    <div className="form-actions">
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : (editingItem ? 'Update Item' : 'Add Item(s)')}
                        </button>
                        {editingItem && (
                            <button type="button" className="btn-secondary" onClick={cancelEdit} style={{marginLeft: '1rem'}}>
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="admin-card">
                <h2>Existing Gallery Items</h2>
                <div className="gallery-management-grid">
                    {galleryItems.map(item => (
                        <div key={item._id} className="gallery-management-item">
                            {item.mediaType === 'image' ? (
                                <img src={`http://localhost:5000${item.mediaUrl}`} alt={item.title} />
                            ) : (
                                <video src={`http://localhost:5000${item.mediaUrl}`} controls muted />
                            )}
                            <div className="item-details">
                                <strong>{item.title}</strong>
                                <p>{item.category}</p>
                                <div className="item-actions">
                                    <button onClick={() => handleEditClick(item)} className="btn-edit">Edit</button>
                                    <button onClick={() => handleDelete(item._id)} className="btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryManagementPage;