import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import heroVideo from '../../assets/Futuristic_Training_Space_Video_Generation.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faPlay, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = 'http://localhost:5000';

// കാറ്റഗറി പേരുകളും ഓർഡറും ഇവിടെ നിർവചിക്കുന്നു
const CATEGORY_ORDER = ['labs', 'campus', 'events'];
const categoryTitles = {
    labs: "Labs & Tech",
    campus: "Campus Life",
    events: "Events"
};

const GalleryPage = () => {
    const [groupedData, setGroupedData] = useState({});
    const [loading, setLoading] = useState(true);
    const [lightboxMedia, setLightboxMedia] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    
    // ✅ NEW: State for active category filter
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API_BASE_URL}/api/gallery`);
                
                const dataByGroup = res.data.reduce((acc, item) => {
                    const category = item.category || 'general';
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push({
                        id: item._id,
                        src: `${API_BASE_URL}${item.mediaUrl}`,
                        alt: item.title,
                        caption: item.title,
                        category: item.category,
                        type: item.mediaType
                    });
                    return acc;
                }, {});

                setGroupedData(dataByGroup);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch gallery data", err);
                setLoading(false);
            }
        };
        fetchGalleryData();
    }, []);

    // ✅ NEW: Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxMedia) return;
            if (e.key === 'Escape') {
                setLightboxMedia(null);
            } else if (e.key === 'ArrowRight') {
                handleNextMedia();
            } else if (e.key === 'ArrowLeft') {
                handlePrevMedia();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxMedia]);


    const handleToggleView = (category) => {
        setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    // ✅ NEW: Functions to handle lightbox navigation
    const openLightbox = (item) => {
        const categoryItems = groupedData[item.category] || [];
        const currentIndex = categoryItems.findIndex(i => i.id === item.id);
        setLightboxMedia({ ...item, categoryItems, currentIndex });
    };

    const handleNextMedia = () => {
        if (!lightboxMedia) return;
        const { categoryItems, currentIndex } = lightboxMedia;
        const nextIndex = (currentIndex + 1) % categoryItems.length;
        setLightboxMedia({ ...categoryItems[nextIndex], categoryItems, currentIndex: nextIndex });
    };

    const handlePrevMedia = () => {
        if (!lightboxMedia) return;
        const { categoryItems, currentIndex } = lightboxMedia;
        const prevIndex = (currentIndex - 1 + categoryItems.length) % categoryItems.length;
        setLightboxMedia({ ...categoryItems[prevIndex], categoryItems, currentIndex: prevIndex });
    };

    // ✅ NEW: Handle mouse enter/leave for video playback
    const handleMouseEnter = (e) => {
        const video = e.currentTarget.querySelector('video');
        if (video) {
            video.play().catch(err => console.log("Autoplay blocked"));
        }
    };
    
    const handleMouseLeave = (e) => {
        const video = e.currentTarget.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0; // Reset video to start
        }
    };

    const isGalleryEmpty = !loading && Object.keys(groupedData).length === 0;

    const categoriesToDisplay = CATEGORY_ORDER.filter(category => 
        (activeFilter === 'all' || activeFilter === category) && groupedData[category]
    );

    return (
        <>
            <section id="gallery-hero" className="hero">
                <div className="hero-video-container">
                    <video className="hero-video" autoPlay muted loop playsInline preload="auto">
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                    <div className="video-overlay"></div>
                </div>
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
                    {loading && <p className="loading-text">Loading Gallery...</p>}
                    
                    {isGalleryEmpty && <p className="empty-gallery-message">The gallery is currently empty. Please check back later.</p>}

                    {!loading && !isGalleryEmpty && (
                        <>
                            {/* ✅ NEW: Filter Buttons */}
                            <div className="gallery-filters">
                                <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>
                                    All Categories
                                </button>
                                {CATEGORY_ORDER.map(cat => (
                                    groupedData[cat] && <button key={cat} className={`filter-btn ${activeFilter === cat ? 'active' : ''}`} onClick={() => setActiveFilter(cat)}>
                                        {categoryTitles[cat]}
                                    </button>
                                ))}
                            </div>

                            {categoriesToDisplay.map(category => {
                                const items = groupedData[category];
                                if (!items || items.length === 0) return null;

                                const isExpanded = expandedCategories[category];
                                const visibleItems = isExpanded ? items : items.slice(0, 4); // Show 4 items initially

                                return (
                                    <div key={category} className="gallery-category-section">
                                        <h2 className="section-title">{categoryTitles[category] || category}</h2>
                                        <div className="gallery-grid">
                                            {visibleItems.map(item => (
                                                <div 
                                                    className="gallery-item" 
                                                    key={item.id} 
                                                    onClick={() => openLightbox(item)}
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    {item.type === 'image' ? (
                                                        <img src={item.src} alt={item.alt} loading="lazy" />
                                                    ) : (
                                                        <video src={item.src} muted loop playsInline preload="metadata" />
                                                    )}
                                                    <div className="gallery-overlay">
                                                        <FontAwesomeIcon icon={item.type === 'video' ? faPlay : faSearchPlus} className="icon" />
                                                        <p className="caption">{item.caption}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {items.length > 4 && (
                                            <div className="view-all-container">
                                                <button className="btn-secondary" onClick={() => handleToggleView(category)}>
                                                    {isExpanded ? 'View Less' : 'View All'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </section>

            {/* ✅ NEW: Upgraded Lightbox with Navigation */}
            {lightboxMedia && (
                <div className="lightbox active" onClick={() => setLightboxMedia(null)}>
                    <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); handlePrevMedia(); }}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <span className="lightbox-close" onClick={() => setLightboxMedia(null)}>×</span>
                        {lightboxMedia.type === 'image' ? (
                            <img src={lightboxMedia.src} alt="Enlarged gallery view" />
                        ) : (
                           <video src={lightboxMedia.src} controls autoPlay loop />
                        )}
                        <div className="lightbox-caption">{lightboxMedia.caption}</div>
                    </div>

                    <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); handleNextMedia(); }}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            )}
        </>
    );
};

export default GalleryPage;