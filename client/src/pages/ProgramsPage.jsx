import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../assets/Futuristic_Training_Space_Video_Generation.mp4';

const ProgramsPage = () => {
    const hero3dRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        if (!window.gsap || !window.THREE || !window.Swiper) {
            console.warn("Waiting for libraries to load...");
            return;
        }

        const gsap = window.gsap;
        gsap.from(".hero-content > *", { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: "power3.out", delay: 0.5 });
        
        const swiper = new window.Swiper('.program-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            coverflowEffect: {
                rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true,
            },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        });

        // 3D Scene Logic is the same as other pages
        // ... (Include the full Three.js init code here)
        
        // Cleanup swiper instance
        return () => {
            if (swiper) swiper.destroy();
        }
    }, []);

    const openModal = (program) => {
        const contentEl = document.getElementById(`curriculum-${program}`);
        const programTitle = {
            mechanical: "Mechanical Engineering",
            eee: "Electrical & Electronics (EEE)",
            ece: "Electronics & Communication (ECE)",
            cs: "Computer Science",
            instrumentation: "Instrumentation Engineering",
            civil: "Civil Engineering"
        }[program];

        if (contentEl) {
            setModalContent(contentEl.innerHTML);
            setModalTitle(`${programTitle} Curriculum`);
            setIsModalOpen(true);
            document.body.classList.add('modal-open');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.classList.remove('modal-open');
    };

    const programData = [
        { id: "mechanical", icon: "fas fa-cogs", title: "Mechanical Engineering", desc: "Focus on modern design, manufacturing, and automation.", modules: ["Advanced CAD/CAM", "Piping & HVAC", "Reliability Engineering"], tools: "SolidWorks, Ansys" },
        { id: "eee", icon: "fas fa-bolt", title: "Electrical & Electronics (EEE)", desc: "Gain expertise in power systems, control automation, and renewable energy.", modules: ["PLC & Control Panels", "Power Systems", "Switchgear Engineering"], tools: "AutoCAD Electrical, TIA Portal, ETAP" },
        { id: "ece", icon: "fas fa-microchip", title: "Electronics & Communication (ECE)", desc: "Specialize in technologies that power our connected world, from IoT to high-speed networks.", modules: ["PCB Design", "Embedded Systems & IoT", "Circuit Design"], tools: "KiCad, STM32CubeIDE, LTspice" },
    ];

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
                        <span className="title-line">Explore Our Future-Ready</span>
                        <span className="title-line orange-text">Engineering Programs</span>
                    </h1>
                    <p className="hero-description">
                        Detailed, industry-vetted curriculums for Mechanical, Electrical, Computer Science, and more. Find the perfect path to launch your engineering career in Kochi.
                    </p>
                    <div className="hero-actions">
                        <Link to="/contact" className="btn btn-primary"><span>Talk to an Advisor</span> <i className="fas fa-phone-alt"></i></Link>
                        <Link to="/admission" className="btn btn-secondary"><span>Apply Now</span></Link>
                    </div>
                </div>
            </section>

            <section className="section programs-detail-page">
                <div className="programs-section-header">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Our Core Disciplines</h2>
                            <p className="section-subtitle">Each program is a 3-month intensive course plus a 1-month internship. Swipe through our offerings below.</p>
                        </div>
                    </div>
                </div>
                
                <div className="swiper-container program-swiper">
                    <div className="swiper-wrapper">
                        {programData.map(prog => (
                             <div key={prog.id} className="swiper-slide" style={{width: '400px'}}>
                                <div className="program-detail-card" style={{minHeight: '550px'}}>
                                    <div className="card-header">
                                        <div className="card-icon"><i className={prog.icon}></i></div>
                                        <h3>{prog.title}</h3>
                                    </div>
                                    <p>{prog.desc}</p>
                                    <h4>Key Curriculum Modules</h4>
                                    <ul>
                                        {prog.modules.map((mod, i) => <li key={i}>{mod}</li>)}
                                    </ul>
                                    <h4>Software & Tools Covered</h4>
                                    <p className="program-tools">{prog.tools}</p>
                                    <div className="program-actions" style={{marginTop: 'auto'}}>
                                        <button onClick={() => openModal(prog.id)} className="btn btn-outline view-curriculum-btn">View Curriculum <i className="fas fa-arrow-right"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </div>
            </section>
            
            {/* Hidden curriculum data */}
            <div style={{ display: 'none' }}>
                <div id="curriculum-mechanical" dangerouslySetInnerHTML={{ __html: `<h4>Mechanical Curriculum Details...</h4><p>Detailed info about CAD/CAM etc.</p>` }} />
                <div id="curriculum-eee" dangerouslySetInnerHTML={{ __html: `<h4>EEE Curriculum Details...</h4><p>Detailed info about PLC, Drives etc.</p>` }} />
                <div id="curriculum-ece" dangerouslySetInnerHTML={{ __html: `<h4>ECE Curriculum Details...</h4><p>Detailed info about PCB, IoT etc.</p>` }} />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay active" onClick={closeModal}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">{modalTitle}</h2>
                            <button className="modal-close-btn" onClick={closeModal}>×</button>
                        </div>
                        <div className="modal-body" dangerouslySetInnerHTML={{ __html: modalContent }} />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProgramsPage;