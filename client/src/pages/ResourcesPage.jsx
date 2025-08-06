import React, { useEffect, useRef } from 'react';
import heroVideo from '../assets/Futuristic_Training_Space_Video_Generation.mp4';

const ResourcesPage = () => {
    const hero3dRef = useRef(null);

    useEffect(() => {
        if (!window.gsap || !window.THREE) {
            console.warn("Waiting for GSAP and Three.js to load...");
            return;
        }

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation
        gsap.from(".hero-content > *", { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            stagger: 0.2, 
            ease: "power3.out", 
            delay: 0.5 
        });
        
        // Staggered animation for cards and accordion items
        gsap.utils.toArray('.blog-card, .webinar-card, .accordion-item').forEach(item => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    once: true,
                },
                duration: 0.8,
                y: 60,
                opacity: 0,
                ease: 'power3.out',
            });
        });
        
        // Accordion (FAQ) Logic
        const accordionItems = document.querySelectorAll('.accordion-item');
        const handleClick = (e) => {
            const item = e.currentTarget.parentElement;
            const currentlyActive = document.querySelector('.accordion-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        };
        
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', handleClick);
        });

        // 3D Scene Logic (same as other pages)
        const THREE = window.THREE;
        const container = hero3dRef.current;
        if (!container || container.children.length > 0) return;
        
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 1;
        let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        // ... (Full Three.js code should be pasted here, same as in HomePage.jsx)

        // Cleanup
        return () => {
            accordionItems.forEach(item => {
                const header = item.querySelector('.accordion-header');
                header.removeEventListener('click', handleClick);
            });
            // Add cleanup for Three.js scene as well
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
                        <span className="title-line">Your Hub for</span>
                        <span className="title-line orange-text">Industry 5.0 Knowledge</span>
                    </h1>
                    <p className="hero-description">
                        Explore our collection of free resources—from deep-dive articles to expert webinars—designed to keep you ahead of the engineering curve.
                    </p>
                    <div className="hero-actions">
                        <a href="#blog" className="btn btn-primary"><span>Read Articles</span> <i className="fas fa-newspaper"></i></a>
                        <a href="#brochure" className="btn btn-secondary"><span>Download Brochure</span></a>
                    </div>
                </div>
            </section>

            <section id="brochure" className="section brochure-cta-section">
                <div className="container">
                    <div className="brochure-cta">
                        <div className="brochure-cta-text">
                            <h3>Get Our Official Course Brochure</h3>
                            <p>Download for detailed curriculum, faculty profiles, and campus information.</p>
                        </div>
                        <a href="/skillvatetech_brochure_2025.pdf" className="btn btn-primary" download>
                            <span>Download Now</span> <i className="fas fa-download"></i>
                        </a>
                    </div>
                </div>
            </section>

            <section id="blog" className="section blog-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Industry 5.0 Articles & Insights</h2>
                        <p className="section-subtitle">Stay updated with the latest trends, career advice, and technological advancements from our expert faculty and industry partners.</p>
                    </div>
                    <div className="blog-grid">
                        <div className="blog-card">
                            <div className="blog-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800')"}}></div>
                            <div className="blog-content">
                                <span className="blog-category">Career Tips</span>
                                <h4>5 Key Skills Every Mechanical Engineer Needs for Industry 5.0</h4>
                                <p>Beyond traditional mechanics, the future demands expertise in robotics, data analysis, and sustainable design. Here's what you need to know.</p>
                                <a href="#">Read More →</a>
                            </div>
                        </div>
                        <div className="blog-card">
                            <div className="blog-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1634733301905-4cce9438314a?q=80&w=800')"}}></div>
                            <div className="blog-content">
                                <span className="blog-category">Industry Trends</span>
                                <h4>The Rise of Digital Twins in Manufacturing</h4>
                                <p>Discover how virtual replicas of physical systems are revolutionizing product development, maintenance, and operational efficiency.</p>
                                <a href="#">Read More →</a>
                            </div>
                        </div>
                        <div className="blog-card">
                            <div className="blog-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1620712943543-285f2163ae10?q=80&w=800')"}}></div>
                            <div className="blog-content">
                                <span className="blog-category">Technology Deep Dive</span>
                                <h4>An Introduction to PLC Programming for Beginners</h4>
                                <p>Programmable Logic Controllers are the brains of industrial automation. Learn the fundamentals of ladder logic and how to get started.</p>
                                <a href="#">Read More →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="webinars" className="section webinars-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title orange-text">Faculty Talks & Webinars</h2>
                        <p className="section-subtitle">Watch recorded sessions from our expert instructors and guest speakers from the industry.</p>
                    </div>
                    <div className="webinar-grid">
                        <div className="webinar-card">
                            <div className="video-container">
                                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className="webinar-content">
                                <h4>The Future of Sustainable Engineering</h4>
                                <p>Dr. Arjun Sharma, Lead Faculty (Mechanical)</p>
                            </div>
                        </div>
                        <div className="webinar-card">
                            <div className="video-container">
                                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className="webinar-content">
                                <h4>Navigating a Career in AI & Machine Learning</h4>
                                <p>Ms. Sunita Rao, Head of Placements</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="faqs" className="section faq-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Frequently Asked Questions</h2>
                        <p className="section-subtitle">Find quick answers to common questions about our programs, admissions, and life at SkillvateTech.</p>
                    </div>
                    <div className="faq-container">
                        <div className="accordion-item">
                            <button className="accordion-header">What is the eligibility criteria to join a program?<i className="fas fa-plus accordion-icon"></i></button>
                            <div className="accordion-content"><p>Any student with a Diploma or B.Tech/B.E. in an engineering discipline is eligible to apply. We also welcome final year students and recent graduates who are looking to upskill for the industry.</p></div>
                        </div>
                        <div className="accordion-item">
                            <button className="accordion-header">Is there an entrance exam for admission?<i className="fas fa-plus accordion-icon"></i></button>
                            <div className="accordion-content"><p>No, there is no entrance exam. Our admission process is based on your academic background and a one-on-one orientation call with our academic counselors to ensure the program aligns with your career goals.</p></div>
                        </div>
                        <div className="accordion-item">
                            <button className="accordion-header">Do you provide placement assistance?<i className="fas fa-plus accordion-icon"></i></button>
                            <div className="accordion-content"><p>Yes, we offer 100% placement support. This includes resume building, mock interviews with industry experts, and arranging interviews with our extensive network of partner companies. Our goal is to ensure every student secures a job.</p></div>
                        </div>
                        <div className="accordion-item">
                            <button className="accordion-header">What is the duration of the courses?<i className="fas fa-plus accordion-icon"></i></button>
                            <div className="accordion-content"><p>All our core programs are designed as a 3-month intensive training course, followed by a mandatory 1-month internship at one of our partner companies to provide real-world experience.</p></div>
                        </div>
                        <div className="accordion-item">
                            <button className="accordion-header">Are the classes online or offline?<i className="fas fa-plus accordion-icon"></i></button>
                            <div className="accordion-content"><p>We offer both online and offline batches to provide flexibility for our students. Our offline classes are conducted at our state-of-the-art campus in InfoPark, Kochi.</p></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ResourcesPage;