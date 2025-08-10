// src/pages/AdmissionPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import heroVideo from '../../assets/Futuristic_Training_Space_Video_Generation.mp4';

const AdmissionPage = () => {
    const hero3dRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        stream: '',
        message: ''
    });
    const [formResponse, setFormResponse] = useState({ message: '', error: false });

    const location = useLocation();
    const applicationFormRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormResponse({ message: 'Submitting...', error: false });
        try {
            const res = await axios.post('http://localhost:5000/api/forms/application', formData);
            setFormResponse({ message: res.data.message, error: false });
            setFormData({ name: '', email: '', phone: '', stream: '', message: '' });
        } catch (err) {
            setFormResponse({ message: err.response?.data?.message || 'Submission failed.', error: true });
        }
    };

    useEffect(() => {
        if (!window.gsap || !window.THREE) return;
        const gsap = window.gsap;
        gsap.from(".hero-content > *", { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: "power3.out", delay: 0.5 });
    }, []);

    useEffect(() => {
        if (location.hash === '#apply-now') {
            setTimeout(() => {
                applicationFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [location.hash]);

    return (
        <>
            <section id="home" className="hero">
                <div className="hero-video-container">
                    <video className="hero-video" autoPlay muted loop playsInline preload="auto">
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                    <div className="video-overlay"></div>
                </div>
                <div className="hero-3d" ref={hero3dRef}></div>
                <div className="container hero-content">
                    <h1 className="hero-title">
                        <span className="title-line">Your Career Transformation</span>
                        <span className="title-line orange-text">Starts Here</span>
                    </h1>
                    <p className="hero-description">
                        Our straightforward admission process is designed to get you on track to becoming a skilled Industry 5.0 engineer. Apply today to join our next batch in Kochi.
                    </p>
                </div>
            </section>

            <section id="apply-now" ref={applicationFormRef} className="section" style={{ background: 'var(--bg-darker)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title orange-text">Application Form</h2>
                        <p className="section-subtitle">Take the first step. Fill out your details below and our team will get in touch with you shortly.</p>
                    </div>
                    <form className="application-form" onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group"><label htmlFor="name">Full Name</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required /></div>
                            <div className="form-group"><label htmlFor="email">Email Address</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required /></div>
                            
                            {/* ✅ ഇവിടെയാണ് മാറ്റം വരുത്തിയത് */}
                            <div className="form-group"><label htmlFor="phone">Phone Number</label><input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required /></div>
                            
                            <div className="form-group">
                                <label htmlFor="stream">Engineering Stream</label>
                                <select id="stream" name="stream" value={formData.stream} onChange={handleChange} className="form-control" required>
                                    <option value="">-- Select Your Stream --</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="EEE">Electrical & Electronics (EEE)</option>
                                    <option value="ECE">Electronics & Communication (ECE)</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Instrumentation">Instrumentation</option>
                                    <option value="Civil">Civil</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group full-width"><label htmlFor="message">Why do you want to join SkillvateTech? (Optional)</label><textarea id="message" name="message" value={formData.message} onChange={handleChange} className="form-control"></textarea></div>
                        </div>
                        <div className="form-actions"><button type="submit" className="btn btn-primary">Submit Application</button></div>
                        {formResponse.message && <p style={{ textAlign: 'center', marginTop: '1rem', color: formResponse.error ? 'red' : 'var(--primary-orange)' }}>{formResponse.message}</p>}
                    </form>
                </div>
            </section>
        </>
    );
};

export default AdmissionPage;