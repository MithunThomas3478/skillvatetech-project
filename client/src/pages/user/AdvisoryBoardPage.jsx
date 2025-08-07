import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../../assets/Futuristic_Training_Space_Video_Generation.mp4';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faGraduationCap, faPhone } from '@fortawesome/free-solid-svg-icons';

const AdvisoryBoardPage = () => {
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
            duration: 1, y: 50, opacity: 0,
            stagger: 0.2, ease: "power3.out", delay: 0.5
        });
        
        // Member Card Animation
        gsap.from(".member-card", {
            scrollTrigger: {
                trigger: ".board-grid",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            duration: 0.8, y: 60, opacity: 0,
            stagger: 0.15, ease: "power3.out"
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
        <main>
            <section id="advisory-hero" className="hero">
                <div className="hero-video-container">
                    <video className="hero-video" autoPlay muted loop playsInline preload="auto">
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                    <div className="video-overlay"></div>
                </div>
                <div className="hero-3d" ref={hero3dRef}></div>
                <div className="container hero-content">
                    <h1 className="hero-title">
                        <span className="title-line">Guided by Industry</span>
                        <span className="title-line orange-text">Visionaries</span>
                    </h1>
                    <p className="hero-description">
                        Our Advisory Board comprises distinguished leaders and innovators from top global companies. Their collective wisdom and experience ensure our curriculum is at the cutting edge of industry demands.
                    </p>
                </div>
            </section>

            <section id="board" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Meet Our Esteemed Advisors</h2>
                        <p className="section-subtitle">The architects of our industry-focused curriculum, providing strategic direction and invaluable mentorship.</p>
                    </div>
                    <div className="board-grid">
                        <div className="member-card">
                            <div className="member-photo"><img src="https://i.pravatar.cc/150?img=5" alt="Arjun Menon"/></div>
                            <h3>Arjun Menon</h3>
                            <p className="member-title">Director of R&D, Siemens</p>
                            <p className="member-bio">With over 20 years in industrial automation, Arjun ensures our curriculum reflects the latest trends in smart manufacturing and IoT.</p>
                            <div className="member-social"><a href="#" target="_blank" aria-label="LinkedIn Profile"><FontAwesomeIcon icon={faLinkedinIn} /></a></div>
                        </div>
                        <div className="member-card">
                            <div className="member-photo"><img src="https://i.pravatar.cc/150?img=25" alt="Dr. Sunita Sharma"/></div>
                            <h3>Dr. Sunita Sharma</h3>
                            <p className="member-title">Lead AI Scientist, Bosch Global</p>
                            <p className="member-bio">A pioneer in applied machine learning, Dr. Sharma guides our AI and Computer Science programs to solve real-world challenges.</p>
                            <div className="member-social"><a href="#" target="_blank" aria-label="LinkedIn Profile"><FontAwesomeIcon icon={faLinkedinIn} /></a></div>
                        </div>
                        <div className="member-card">
                            <div className="member-photo"><img src="https://i.pravatar.cc/150?img=60" alt="Vikram Singh"/></div>
                            <h3>Vikram Singh</h3>
                            <p className="member-title">VP of Engineering, L&T Technology</p>
                            <p className="member-bio">Vikram's expertise in large-scale project management and sustainable infrastructure shapes our Civil and Mechanical engineering tracks.</p>
                            <div className="member-social"><a href="#" target="_blank" aria-label="LinkedIn Profile"><FontAwesomeIcon icon={faLinkedinIn} /></a></div>
                        </div>
                        <div className="member-card">
                            <div className="member-photo"><img src="https://i.pravatar.cc/150?img=28" alt="Meera Iyer"/></div>
                            <h3>Meera Iyer</h3>
                            <p className="member-title">Chief HR Officer, Wipro</p>
                            <p className="member-bio">Meera provides critical insights into talent acquisition and professional development, ensuring our graduates are not just skilled but career-ready.</p>
                            <div className="member-social"><a href="#" target="_blank" aria-label="LinkedIn Profile"><FontAwesomeIcon icon={faLinkedinIn} /></a></div>
                        </div>
                        <div className="member-card">
                            <div className="member-photo"><img src="https://i.pravatar.cc/150?img=56" alt="Rohan Mathew"/></div>
                            <h3>Rohan Mathew</h3>
                            <p className="member-title">Head of EV Powertrain, Honeywell</p>
                            <p className="member-bio">As a leader in electric vehicle technology, Rohan helps steer our EEE and Mechanical programs towards the future of mobility.</p>
                            <div className="member-social"><a href="#" target="_blank" aria-label="LinkedIn Profile"><FontAwesomeIcon icon={faLinkedinIn} /></a></div>
                        </div>
                        <div className="member-card">
                            <div className="member-photo"><img src="https://i.pravatar.cc/150?img=35" alt="Fatima Khan"/></div>
                            <h3>Fatima Khan</h3>
                            <p className="member-title">Principal VLSI Architect, TCS</p>
                            <p className="member-bio">Fatima’s deep knowledge in semiconductor design is instrumental in crafting our advanced ECE curriculum on VLSI and embedded systems.</p>
                            <div className="member-social"><a href="#" target="_blank" aria-label="LinkedIn Profile"><FontAwesomeIcon icon={faLinkedinIn} /></a></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="cta" className="section cta">
                <div className="container cta-content">
                    <h2 className="orange-text">Ready to Learn from the Best?</h2>
                    <p>Our programs are shaped by these industry leaders. Find the perfect one to launch your career.</p>
                    <div className="cta-actions">
                        <Link to="/programs" className="btn btn-primary"><FontAwesomeIcon icon={faGraduationCap} /> Explore Programs</Link>
                        <Link to="/contact" className="btn btn-secondary"><FontAwesomeIcon icon={faPhone} /> Contact Advisors</Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AdvisoryBoardPage;