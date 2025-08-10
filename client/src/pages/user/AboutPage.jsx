import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../../assets/Futuristic_Training_Space_Video_Generation.mp4';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faRobot, faBridge, faStar, faFlaskVial, faUsersGear, faTools, faUserCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const AboutPage = () => {
    const hero3dRef = useRef(null);

    useEffect(() => {
        if (!window.gsap || !window.THREE) {
            console.warn("Waiting for GSAP and Three.js to load...");
            return;
        }

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        // --- GSAP ANIMATIONS ---
        gsap.from(".hero-content > *", {
            duration: 1, y: 50, opacity: 0,
            stagger: 0.2, ease: "power3.out", delay: 0.5
        });

        gsap.utils.toArray('.grid-layout, .team-grid, .infra-grid').forEach(grid => {
            gsap.from(grid.children, {
                scrollTrigger: { trigger: grid, start: "top 85%", toggleActions: "play none none none" },
                y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out"
            });
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
            <section id="about-hero" className="hero">
                <div className="hero-video-container">
                    <video className="hero-video" autoPlay muted loop playsInline preload="auto">
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                    <div className="video-overlay"></div>
                </div>
                <div className="hero-3d" ref={hero3dRef}></div>
                <div className="container hero-content">
                    <h1 className="hero-title">
                        <span className="title-line">The Minds & Mission</span>
                        <span className="title-line">Behind <span className="orange-text">SkillvateTech</span></span>
                    </h1>
                    <p className="hero-description">
                        We are a collective of educators and industry veterans from Kochi, dedicated to shaping the next generation of engineers for the challenges of Industry 5.0.
                    </p>
                </div>
            </section>

            <section id="vision-mission" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Purpose & Promise</h2>
                        <p className="section-subtitle">We are built on the core principles of Industry 5.0, transforming academic potential into professional excellence.</p>
                    </div>
                    <div className="grid-layout">
                        <div className="styled-card">
                            <div className="card-header">
                                <div className="card-icon"><FontAwesomeIcon icon={faRobot} /></div>
                                <h3>Our Foundation: Industry 5.0</h3>
                            </div>
                            <p>We stand at the cusp of the Fifth Industrial Revolution, which champions a synergy between humans and smart systems. The demand is for innovators who can think critically and work alongside intelligent machines. Our curriculum is built on this very foundation, preparing you for the future of engineering.</p>
                        </div>
                        <div className="styled-card">
                            <div className="card-header">
                                <div className="card-icon"><FontAwesomeIcon icon={faBridge} /></div>
                                <h3>Our Origin: Bridging the Gap</h3>
                            </div>
                            <p>SkillvateTech was born from a critical observation: a gap between traditional education and the dynamic tech world. Our mission is to forge a direct pathway from campus to career, transforming brilliant students with theoretical knowledge into confident, industry-ready professionals.</p>
                        </div>
                        <div className="styled-card">
                            <div className="card-header">
                                <div className="card-icon"><FontAwesomeIcon icon={faStar} /></div>
                                <h3>The Skillvate Advantage</h3>
                            </div>
                            <p>We are a technical finishing school rooted in experiential learning. Our holistic approach moves you beyond textbooks and into a world of hands-on projects and real-time problem-solving.</p>
                            <p className="advantage-p"><strong>Cutting-Edge Technical Expertise:</strong> We teach the latest industry-relevant technologies companies are actively hiring for.</p>
                            <p className="advantage-p"><strong>Essential Professional Acumen:</strong> We cultivate the communication, teamwork, and leadership skills crucial for a successful career.</p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '4rem auto 0 auto' }}>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-gray)', lineHeight: '1.7' }}>
                            Our mission is simple: to empower every aspiring engineer with the practical skills, confidence, and professional mindset required to not just secure a job, but to <span className="orange-text">excel from day one</span> and become a valuable asset to their organization.
                        </p>
                    </div>
                </div>
            </section>

            <section id="team" className="section" style={{ background: 'var(--bg-dark)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title orange-text">Meet Our Core Team & Faculty</h2>
                        <p className="section-subtitle">Led by seasoned professionals with decades of experience in both academia and the top echelons of industry.</p>
                    </div>
                    <div className="team-grid">
                        <div className="team-card">
                            <div className="team-avatar"><img src="https://i.pravatar.cc/150?img=60" alt="Arjun Menon" /></div>
                            <h4>Arjun Menon</h4>
                            <div className="role">Founder & Chief Mentor</div>
                            <p>A visionary with 20+ years at engineering giants. Passionate about mentoring young talent to meet global standards.</p>
                        </div>
                        <div className="team-card">
                            <div className="team-avatar"><img src="https://i.pravatar.cc/150?img=45" alt="Dr. Meera Iyer" /></div>
                            <h4>Dr. Meera Iyer</h4>
                            <div className="role">Head of Curriculum</div>
                            <p>Former HOD with a Ph.D. in Industrial Automation. Dr. Iyer architects our courses to be rigorous, relevant, and industry-aligned.</p>
                        </div>
                        <div className="team-card">
                            <div className="team-avatar"><img src="https://i.pravatar.cc/150?img=33" alt="Vikram Singh" /></div>
                            <h4>Vikram Singh</h4>
                            <div className="role">Director, Placements & Corp. Relations</div>
                            <p>An HR leader with deep connections across the engineering sector, ensuring our students land careers, not just jobs.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="collaborations" className="section" style={{ background: 'var(--bg-dark)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Industry Collaborations</h2>
                        <p className="section-subtitle">Our curriculum is co-designed and supported by global leaders. These collaborations include access to licensed tools, specialized training modules, and frequent guest lectures from industry experts.</p>
                    </div>
                    <div className="company-logos">
                        <div className="logos-scroll">
                            <img src="https://logo.clearbit.com/siemens.com" alt="Siemens" />
                            <img src="https://logo.clearbit.com/se.com" alt="Schneider Electric" />
                            <img src="https://logo.clearbit.com/Lnttechservices.com" alt="L&T Technology Services" />
                            <img src="https://logo.clearbit.com/tcs.com" alt="TCS" />
                            <img src="https://logo.clearbit.com/wipro.com" alt="Wipro" />
                            <img src="https://logo.clearbit.com/bosch.com" alt="Bosch" />
                            <img src="https://logo.clearbit.com/honeywell.com" alt="Honeywell" />
                            <img src="https://logo.clearbit.com/siemens.com" alt="Siemens" />
                            <img src="https://logo.clearbit.com/se.com" alt="Schneider Electric" />
                            <img src="https://logo.clearbit.com/Lnttechservices.com" alt="L&T Technology Services" />
                            <img src="https://logo.clearbit.com/tcs.com" alt="TCS" />
                            <img src="https://logo.clearbit.com/wipro.com" alt="Wipro" />
                            <img src="https://logo.clearbit.com/bosch.com" alt="Bosch" />
                            <img src="https://logo.clearbit.com/honeywell.com" alt="Honeywell" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="infrastructure" className="section" style={{ background: 'var(--bg-dark)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title orange-text">Our State-of-the-Art Infrastructure</h2>
                        <p className="section-subtitle">An environment built in Kochi to inspire innovation and foster hands-on learning.</p>
                    </div>
                    <div className="infra-grid">
                        <div className="feature-card">
                            <div className="feature-icon"><FontAwesomeIcon icon={faFlaskVial} /></div><h4>Advanced Simulation Labs</h4>
                            <p>Equipped with industry-grade simulation tools, robotics arms, PLC stations, and IoT development kits.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><FontAwesomeIcon icon={faUsersGear} /></div><h4>Collaborative Open Classrooms</h4>
                            <p>Dynamic learning spaces that reject traditional rows in favor of project-based teamwork and mentor interaction.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><FontAwesomeIcon icon={faTools} /></div><h4>Industry-Grade Equipment</h4>
                            <p>Access to the same hardware and software used by our corporate partners like Siemens, Schneider, and Bosch.</p>
                        </div>
                    </div>
                    <div className="infra-gallery" style={{marginTop: "4rem"}}>
                        <img src="https://images.unsplash.com/photo-1558137916-049195259265?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600" alt="Robotics Lab" />
                        <img src="https://images.unsplash.com/photo-1581092921449-41b1f0969969?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600" alt="Electronics Workshop" />
                        <img src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600" alt="Collaborative Classroom" />
                    </div>
                </div>
            </section>

           <section id="cta" className="section cta">
                <div className="container cta-content">
                    <h2 className="section-title">Ready to Build Your Future?</h2>
                    <p className="section-subtitle" style={{ color: 'var(--text-gray)', marginTop: '1rem', marginBottom: '2.5rem' }}>Your journey from classroom to a career in a top company starts here. Talk to our advisors today.</p>
                    <div className="cta-actions">
                        {/* --- ✅ മാറ്റം ഇവിടെയാണ്: ലിങ്കിൽ #apply-now ചേർത്തു --- */}
                        <Link to="/admission#apply-now" className="btn btn-primary"><FontAwesomeIcon icon={faUserCheck} /> Apply Now</Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;