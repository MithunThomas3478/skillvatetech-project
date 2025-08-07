import React, { useState, useEffect, useRef } from 'react';
import heroVideo from '../../assets/Futuristic_Training_Space_Video_Generation.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';

// ഗാലറിയിലെ ചിത്രങ്ങളുടെ ഡാറ്റാ
const galleryData = [
    { id: 1, src: "https://images.unsplash.com/photo-1581092921462-205167e483a3?w=800", alt: "Robotics Arm in Action", caption: "Robotics Lab", category: "labs" },
    { id: 2, src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800", alt: "Students collaborating", caption: "Collaborative Spaces", category: "campus" },
    { id: 3, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800", alt: "Tech conference", caption: "Industry Tech Talk", category: "events" },
    { id: 4, src: "https://images.unsplash.com/photo-1627993435234-356a31535a25?w=800", alt: "Circuit board", caption: "Electronics Workbench", category: "labs" },
    { id: 5, src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800", alt: "Hackathon winners", caption: "Hackathon Winners", category: "events" },
    { id: 6, src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800", alt: "Students studying", caption: "Focused Study Sessions", category: "campus" }
];

const GalleryPage = () => {
    const hero3dRef = useRef(null);
    const [filter, setFilter] = useState('all');
    const [lightboxImage, setLightboxImage] = useState(null);

    useEffect(() => {
        // GSAP and Three.js initialization
        if (!window.gsap || !window.THREE) {
            console.warn("Waiting for GSAP and Three.js to load...");
            return;
        }

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(".hero-content > *", { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: "power3.out", delay: 0.5 });
        
        // This animation will now re-trigger when the filter changes, thanks to the key on gallery-grid
        gsap.from(".gallery-item", {
            scrollTrigger: {
                trigger: ".gallery-grid",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            y: 50,
            scale: 0.95,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        });

        // Add 3D Scene Logic here if needed, similar to other pages
        // ...

    }, []);

    const filteredItems = filter === 'all'
        ? galleryData
        : galleryData.filter(item => item.category === filter);

    return (
        <>
            <section id="gallery-hero" className="hero">
                <div className="hero-video-container">
                    <video className="hero-video" autoPlay muted loop playsInline preload="auto">
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                    <div className="video-overlay"></div>
                </div>
                <div className="hero-3d" ref={hero3dRef}></div>
                <div className="container hero-content">
                    <h1 className="hero-title">
                        <span className="title-line">A Glimpse Into</span>
                        <span className="title-line orange-text">Our World</span>
                    </h1>
                    <p className="hero-description">
                        Experience the energy and innovation at SkillvateTech. Explore our campus, cutting-edge labs, collaborative events, and the groundbreaking projects our students bring to life.
                    </p>
                </div>
            </section>

            <section id="gallery" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Campus & Innovations</h2>
                        <p className="section-subtitle">Filter through moments that define the SkillvateTech experience.</p>
                    </div>

                    <div className="gallery-filters">
                        <button type="button" className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                        <button type="button" className={`filter-btn ${filter === 'labs' ? 'active' : ''}`} onClick={() => setFilter('labs')}>Labs & Tech</button>
                        <button type="button" className={`filter-btn ${filter === 'campus' ? 'active' : ''}`} onClick={() => setFilter('campus')}>Campus Life</button>
                        <button type="button" className={`filter-btn ${filter === 'events' ? 'active' : ''}`} onClick={() => setFilter('events')}>Events</button>
                    </div>

                    <div className="gallery-grid" key={filter}>
                        {filteredItems.map(item => (
                            <div className="gallery-item" key={item.id} onClick={() => setLightboxImage(item.src)}>
                                <img src={item.src} alt={item.alt} />
                                <div className="gallery-overlay">
                                    <FontAwesomeIcon icon={faSearchPlus} className="icon" />
                                    <p className="caption">{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {lightboxImage && (
                <div className="lightbox active" onClick={() => setLightboxImage(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <span className="lightbox-close" onClick={() => setLightboxImage(null)}>×</span>
                        <img src={lightboxImage} alt="Enlarged gallery view" />
                    </div>
                </div>
            )}
        </>
    );
};

export default GalleryPage;