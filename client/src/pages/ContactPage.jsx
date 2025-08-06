import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import heroVideo from '../assets/Futuristic_Training_Space_Video_Generation.mp4';

const ContactPage = () => {
    const hero3dRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', stream: '', query: '' });
    const [formResponse, setFormResponse] = useState({ message: '', error: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormResponse({ message: 'Sending...', error: false });
        try {
            const res = await axios.post('http://localhost:5000/api/forms/contact', formData);
            setFormResponse({ message: res.data.message, error: false });
            setFormData({ name: '', email: '', phone: '', stream: '', query: '' });
        } catch (err) {
            setFormResponse({ message: err.response?.data?.message || 'Submission failed.', error: true });
        }
    };

    useEffect(() => {
        // Ensure third-party libraries are loaded before using them
        if (!window.gsap || !window.THREE) {
            console.warn("Waiting for GSAP and Three.js to load...");
            return;
        }

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation
        gsap.from(".hero-content > *", {
            duration: 1, y: 50, opacity: 0,
            stagger: 0.2, ease: "power3.out", delay: 0.5
        });

        // Contact Grid Animation
        gsap.from('.contact-grid > *', {
            duration: 0.8, y: 60, opacity: 0, ease: 'power3.out', stagger: 0.2,
            scrollTrigger: {
                trigger: '.contact-grid',
                start: 'top 80%',
                once: true,
            }
        });

        // --- THREE.JS SCENE ---
        const THREE = window.THREE;
        const container = hero3dRef.current;
        if (!container || container.children.length > 0) return;

        let scene, camera, renderer, stars;
        let mouse = new THREE.Vector2(0, 0);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 1;
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const starGeometry = new THREE.BufferGeometry();
        const starCount = 5000;
        const positions = new Float32Array(starCount * 3);
        const velocities = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 1000;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
            velocities[i] = 0.5 + Math.random();
        }
        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true, opacity: 0.8 });
        stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        const handleMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) - 0.5;
            mouse.y = (event.clientY / window.innerHeight) - 0.5;
        };
        document.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const positions = stars.geometry.attributes.position.array;
            for(let i = 0; i < starCount; i++) {
                positions[i * 3 + 2] += velocities[i];
                if (positions[i * 3 + 2] > 500) positions[i * 3 + 2] = -500;
            }
            stars.geometry.attributes.position.needsUpdate = true;
            camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
            camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup function
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', handleMouseMove);
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

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
                        <span className="title-line">Have Questions?</span>
                        <span className="title-line orange-text">We're Here to Help</span>
                    </h1>
                    <p className="hero-description">
                        Whether you're a prospective student, a parent, or an industry partner, our team in Kochi is ready to assist you. Let's connect and build the future together.
                    </p>
                    <div className="hero-actions">
                        <a href="#contact-form" className="btn btn-primary"><span>Fill Inquiry Form</span> <i className="fas fa-edit"></i></a>
                        <a href="tel:+919876543210" className="btn btn-secondary"><span>Call Us Now</span></a>
                    </div>
                </div>
            </section>
            
            <section id="contact-form" className="section contact-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Get In Touch</h2>
                        <p className="section-subtitle">Use the form below for any questions you have, and our team will get back to you within 24 hours.</p>
                    </div>
                    <div className="contact-grid">
                        <div className="contact-form-wrapper">
                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="stream">Preferred Stream (Optional)</label>
                                        <select id="stream" name="stream" value={formData.stream} onChange={handleChange} className="form-control">
                                            <option value="">-- Select a Stream --</option>
                                            <option value="Mechanical">Mechanical</option>
                                            <option value="EEE">Electrical & Electronics (EEE)</option>
                                            <option value="ECE">Electronics & Communication (ECE)</option>
                                            <option value="Computer Science">Computer Science</option>
                                            <option value="Instrumentation">Instrumentation</option>
                                            <option value="Civil">Civil</option>
                                            <option value="General Inquiry">General Inquiry</option>
                                        </select>
                                    </div>
                                    <div className="form-group full-width">
                                        <label htmlFor="query">Your Query</label>
                                        <textarea id="query" name="query" value={formData.query} onChange={handleChange} className="form-control" required></textarea>
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="btn btn-primary">Send Message</button>
                                </div>
                                {formResponse.message && <p style={{textAlign: 'right', marginTop: '1rem', color: formResponse.error ? 'red' : 'var(--primary-orange)'}}>{formResponse.message}</p>}
                            </form>
                        </div>
                        <div className="contact-details-wrapper">
                            <div className="contact-info-card">
                                <h4>Contact Information</h4>
                                <ul>
                                    <li><i className="fas fa-map-marker-alt"></i><span>SkillvateTech Finishing School,<br/>Athulya Building, InfoPark,<br/>Kakkanad, Kochi, Kerala 682042</span></li>
                                    <li><i className="fas fa-envelope"></i><a href="mailto:info@skillvatetech.com">info@skillvatetech.com</a></li>
                                    <li><i className="fas fa-phone"></i><a href="tel:+919876543210">+91 98765 43210</a></li>
                                </ul>
                            </div>
                            <div className="contact-info-card social-links">
                                <h4>Connect With Us</h4>
                                <ul style={{display: 'flex', gap: '1rem', listStyle: 'none'}}>
                                    <li><a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a></li>
                                    <li><a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section map-section" style={{paddingTop: 0, background: 'var(--bg-dark)'}}>
                <div className="container">
                    <div className="map-container" style={{borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)'}}>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.777494436569!2d76.35279261533236!3d10.03548989282662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c3053675565%3A0x74251ca5959b7528!2sInfopark%20Kochi%20Phase%201%2C%20Kakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1628186419747!5m2!1sen!2sin" 
                            width="600" 
                            height="450" 
                            style={{border:0, width: '100%', height: '450px', filter: 'invert(1) hue-rotate(210deg) brightness(0.9) contrast(0.9)'}} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </section>

            <div className="floating-actions" style={{position: 'fixed', bottom: '30px', right: '30px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <a href="https://wa.me/919876543210" className="float-btn whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', color: 'white', fontSize: '1.8rem', textDecoration: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', background: '#25D366'}}><i className="fab fa-whatsapp"></i></a>
                <a href="tel:+919876543210" className="float-btn call" aria-label="Call Us" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', color: 'white', fontSize: '1.8rem', textDecoration: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', background: 'var(--primary-orange)'}}><i className="fas fa-phone-alt"></i></a>
            </div>
        </>
    );
};

export default ContactPage;