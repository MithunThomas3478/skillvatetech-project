import React, { useEffect, useRef } from 'react';
import heroVideo from '../assets/Futuristic_Training_Space_Video_Generation.mp4';

const GalleryPage = () => {
    const hero3dRef = useRef(null);

    useEffect(() => {
        if (!window.gsap || !window.THREE) {
            console.warn("Waiting for GSAP and Three.js to load...");
            return;
        }

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(".hero-content > *", { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: "power3.out", delay: 0.5 });
        
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

        // Gallery filter and lightbox logic
        const filterContainer = document.querySelector(".gallery-filters");
        const galleryItems = document.querySelectorAll(".gallery-item");
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        const lightboxClose = document.querySelector(".lightbox-close");

        const handleFilterClick = (e) => {
            if (e.target.classList.contains("filter-btn")) {
                filterContainer.querySelector(".active").classList.remove("active");
                e.target.classList.add("active");
                const filterValue = e.target.getAttribute("data-filter");
                galleryItems.forEach(item => {
                    if (item.dataset.category === filterValue || filterValue === "all") {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        };

        const openLightbox = (e) => {
            const galleryItem = e.target.closest('.gallery-item');
            if(galleryItem) {
                const imgSrc = galleryItem.querySelector("img").src;
                lightboxImg.setAttribute("src", imgSrc);
                lightbox.classList.add("active");
            }
        };

        const closeLightbox = () => {
            lightbox.classList.remove("active");
        };

        if (filterContainer) {
            filterContainer.addEventListener("click", handleFilterClick);
        }
        
        const galleryGrid = document.querySelector(".gallery-grid");
        if (galleryGrid) {
            galleryGrid.addEventListener("click", openLightbox);
        }

        if (lightboxClose) {
            lightboxClose.addEventListener("click", closeLightbox);
        }

        if (lightbox) {
            lightbox.addEventListener("click", e => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        }
        
        // 3D Scene Logic is the same as other pages
        // ... (Include the full Three.js init code here)

        // Cleanup function
        return () => {
             if (filterContainer) {
                filterContainer.removeEventListener("click", handleFilterClick);
            }
            if (galleryGrid) {
                galleryGrid.removeEventListener("click", openLightbox);
            }
        }

    }, []);

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
                        <button type="button" className="filter-btn active" data-filter="all">All</button>
                        <button type="button" className="filter-btn" data-filter="labs">Labs & Tech</button>
                        <button type="button" className="filter-btn" data-filter="campus">Campus Life</button>
                        <button type="button" className="filter-btn" data-filter="events">Events</button>
                    </div>

                    <div className="gallery-grid">
                        <div className="gallery-item" data-category="labs">
                            <img src="https://images.unsplash.com/photo-1581092921462-205167e483a3?w=800" alt="Robotics Arm in Action"/>
                            <div className="gallery-overlay">
                                <i className="fas fa-search-plus icon"></i>
                                <p className="caption">Robotics Lab</p>
                            </div>
                        </div>
                        <div className="gallery-item" data-category="campus">
                            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800" alt="Students collaborating"/>
                            <div className="gallery-overlay">
                                <i className="fas fa-search-plus icon"></i>
                                <p className="caption">Collaborative Spaces</p>
                            </div>
                        </div>
                        <div className="gallery-item" data-category="events">
                            <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800" alt="Tech conference"/>
                            <div className="gallery-overlay">
                                <i className="fas fa-search-plus icon"></i>
                                <p className="caption">Industry Tech Talk</p>
                            </div>
                        </div>
                         <div className="gallery-item" data-category="labs">
                            <img src="https://images.unsplash.com/photo-1627993435234-356a31535a25?w=800" alt="Circuit board"/>
                            <div className="gallery-overlay">
                                <i className="fas fa-search-plus icon"></i>
                                <p className="caption">Electronics Workbench</p>
                            </div>
                        </div>
                        <div className="gallery-item" data-category="events">
                            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800" alt="Hackathon winners"/>
                            <div className="gallery-overlay">
                                <i className="fas fa-search-plus icon"></i>
                                <p className="caption">Hackathon Winners</p>
                            </div>
                        </div>
                        <div className="gallery-item" data-category="campus">
                            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800" alt="Students studying"/>
                            <div className="gallery-overlay">
                                <i className="fas fa-search-plus icon"></i>
                                <p className="caption">Focused Study Sessions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="lightbox" id="lightbox">
                 <div className="lightbox-content">
                    <span className="lightbox-close">×</span>
                    <img src="" alt="Enlarged gallery view" id="lightbox-img" />
                </div>
            </div>
        </>
    );
};

export default GalleryPage;