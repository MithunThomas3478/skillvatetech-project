import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../../assets/Futuristic_Training_Space_Video_Generation.mp4';

// Swiper React Components & Styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faBolt, faMicrochip, faLaptopCode, faGaugeHigh, faBuilding } from '@fortawesome/free-solid-svg-icons';

// 3D Scene helper function
const init3DScene = (container) => {
    if (!container || container.children.length > 0 || !window.THREE) return;
    const THREE = window.THREE;
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
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true, transparent: true, opacity: 0.8 });
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
        for (let i = 0; i < starCount; i++) {
            positions[i * 3 + 2] += velocities[i];
            if (positions[i * 3 + 2] > 500) { positions[i * 3 + 2] = -500; }
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
        window.removeEventListener("resize", handleResize);
        document.removeEventListener('mousemove', handleMouseMove);
        if (container && renderer.domElement) { container.removeChild(renderer.domElement); }
    };
};


const HomePage = () => {
    const hero3dRef = useRef(null);

    useEffect(() => {
        if (!window.gsap || !window.THREE) {
            console.warn("Waiting for libraries (GSAP, Three.js) to load...");
            return;
        }

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.from(".hero-content > *", { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: "power3.out", delay: 0.5 });
        
        const cleanup3D = init3DScene(hero3dRef.current);

        document.querySelectorAll(".stat-number").forEach(counter => {
            const target = +counter.dataset.target;
            ScrollTrigger.create({
                trigger: counter,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        duration: 2,
                        innerText: target,
                        roundProps: "innerText",
                        ease: "power2.out"
                    });
                }
            });
        });
        
        return () => {
            if (cleanup3D) cleanup3D();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <>
            <main>
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
                            <span className="title-line">From Classroom to Career</span>
                            <span className="title-line orange-text">Engineer Your Future with Us</span>
                        </h1>
                        <p className="hero-description">
                            SkillvateTech is the Industry 5.0 finishing school in Kochi that transforms your academic knowledge into career-ready expertise.
                        </p>
                        
                    </div>
                </section>
                
                <section className="section about-intro">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">India's Premier Engineering Finishing School</h2>
                            <p className="section-subtitle">Based in Kochi, Kerala, SkillvateTech bridges the critical gap between academic theory and the dynamic demands of Industry 5.0. We empower engineering graduates with hands-on skills, mentorship, and real-world project experience to launch successful careers in top-tier companies.</p>
                        </div>
                    </div>
                </section>
                
                <section id="streams" className="section programs">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title orange-text">Programs We Offer</h2>
                            <p className="section-subtitle">Specialized, industry-aligned programs for every core engineering discipline.</p>
                        </div>
                        <div className="programs-grid">
                            <div className="program-card">
                                <div className="card-header"><div className="card-icon"><FontAwesomeIcon icon={faCogs} /></div><h3>Mechanical</h3></div>
                                <p>Master advanced manufacturing, EV technology, robotics, and automation systems.</p>
                            </div>
                            <div className="program-card">
                                <div className="card-header"><div className="card-icon"><FontAwesomeIcon icon={faBolt} /></div><h3>Electrical & Electronics (EEE)</h3></div>
                                <p>Specialize in power systems, industrial automation, and embedded systems.</p>
                            </div>
                            <div className="program-card">
                                <div className="card-header"><div className="card-icon"><FontAwesomeIcon icon={faMicrochip} /></div><h3>Electronics & Communication (ECE)</h3></div>
                                <p>Dive deep into IoT development, VLSI design, and wireless communication.</p>
                            </div>
                            <div className="program-card">
                                <div className="card-header"><div className="card-icon"><FontAwesomeIcon icon={faLaptopCode} /></div><h3>Computer Science</h3></div>
                                <p>Excel in AI/ML, full-stack development, and cloud computing.</p>
                            </div>
                            <div className="program-card">
                                <div className="card-header"><div className="card-icon"><FontAwesomeIcon icon={faGaugeHigh} /></div><h3>Instrumentation</h3></div>
                                <p>Gain expertise in process control, industrial automation, and measurement systems.</p>
                            </div>
                            <div className="program-card">
                                <div className="card-header"><div className="card-icon"><FontAwesomeIcon icon={faBuilding} /></div><h3>Civil</h3></div>
                                <p>Focus on modern construction tech, sustainable infrastructure, and project management.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="placements" className="section placements">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Launching Careers in Top Companies</h2>
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

                <section id="testimonials" className="section testimonials">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">What Our Community Says</h2>
                            <p className="section-subtitle">Real stories, real results. Hear from our students and the industry mentors who guide them.</p>
                        </div>
                        
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            className="testimonial-swiper"
                            loop={true}
                            spaceBetween={30}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            breakpoints={{
                                640: { slidesPerView: 1, spaceBetween: 20 },
                                768: { slidesPerView: 2, spaceBetween: 30 },
                                1024: { slidesPerView: 3, spaceBetween: 30 },
                            }}
                        >
                            <SwiperSlide>
                                <div className="testimonial-content"><p>"The hands-on project in industrial automation gave me the confidence that lectures never could. I landed a job at Siemens before I even finished the course."</p></div>
                                <div className="testimonial-author">
                                    <div className="author-avatar"><img src="https://i.pravatar.cc/150?img=12" alt="Anjali Varma" /></div>
                                    <div className="author-info"><h4>Anjali Varma</h4><p>Automation Engineer, Siemens</p></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="testimonial-content"><p>"I mentor at SkillvateTech because they build talent seriously. Students here solve real problems, not just learn theory. It's rewarding to guide the next generation."</p></div>
                                <div className="testimonial-author">
                                    <div className="author-avatar"><img src="https://i.pravatar.cc/150?img=5" alt="Rajesh Kumar" /></div>
                                    <div className="author-info"><h4>Rajesh Kumar</h4><p>Senior Manager, L&T Technology</p></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="testimonial-content"><p>"100% placement support isn't a gimmick. The mock interviews were tougher than the real ones! The team's dedication is why I'm at Bosch today."</p></div>
                                <div className="testimonial-author">
                                    <div className="author-avatar"><img src="https://i.pravatar.cc/150?img=32" alt="Mohammed Faisal" /></div>
                                    <div className="author-info"><h4>Mohammed Faisal</h4><p>Embedded Software Engineer, Bosch</p></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="testimonial-content"><p>"The curriculum is perfectly aligned with what the industry needs right now. We hire from SkillvateTech because their graduates are productive from day one."</p></div>
                                <div className="testimonial-author">
                                    <div className="author-avatar"><img src="https://i.pravatar.cc/150?img=25" alt="Priya Nair" /></div>
                                    <div className="author-info"><h4>Priya Nair</h4><p>HR Director, Schneider Electric</p></div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>
                
                <section id="cta" className="section cta">
                <div className="container cta-content">
                    <h2 className="orange-text">Ready to Engineer Your Future?</h2>
                    <p>Take the first step towards a successful career. Apply for our next batch today.</p>
                    <div className="cta-actions">
                        {/* --- മാറ്റം ഇവിടെയാണ് --- */}
                        {/* ലിങ്ക് /admission#apply-now എന്നാക്കി മാറ്റി */}
                        <Link to="/admission#apply-now" className="btn btn-primary">
                           <i className="fas fa-paper-plane"></i> Apply Now
                        </Link>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
};

export default HomePage;