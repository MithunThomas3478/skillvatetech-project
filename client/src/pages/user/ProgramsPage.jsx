import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../../assets/Futuristic_Training_Space_Video_Generation.mp4';

// Swiper React Components & Styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faBolt, faMicrochip, faLaptopCode, faGaugeHigh, faBuilding, faArrowRight, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

// Data for all programs, including detailed curriculum
const programData = [
    {
        id: "mechanical",
        icon: faCogs,
        title: "Mechanical Engineering",
        desc: "This program focuses on the core competencies required for modern mechanical design, manufacturing, and automation, preparing you for roles like Design Engineer, Robotics Specialist, or EV Technologist.",
        modules: ["Advanced CAD/CAM & Product Design", "Piping & HVAC Engineering", "Maintenance & Reliability Engineering"],
        tools: "SolidWorks, AutoCAD Plant 3D, Ansys",
        curriculumHtml: `<div class="curriculum-content"><div class="program-overview"><p>This finishing school program is an intensive, industry-focused curriculum designed to bridge the gap between academic knowledge and the practical skills required in the modern mechanical engineering landscape. The program equips graduates with proficiency in high-demand software, a deep understanding of advanced manufacturing techniques, and specialized knowledge in piping, HVAC, and reliability engineering. The curriculum is built around hands-on projects, ensuring that graduates are job-ready from day one.</p></div><div class="module"><div class="module-header"><h3 class="module-title">Module 1: Advanced CAD/CAM/CAE</h3><span class="module-duration">140 Hours</span></div><div class="module-body"><p class="module-objective">To develop expert-level proficiency in industry-standard design, manufacturing, and analysis software. Students will learn to create complex 3D models, generate manufacturing toolpaths, and perform engineering simulations to validate and optimize designs.</p><div class="curriculum-detail-table"><div class="table-header"><div>Topic</div><div>Key Concepts</div><div>Software/Tools</div><div>Duration (Hrs)</div><div>Project/Application</div></div><div class="table-row"><div data-label="Topic">SolidWorks</div><div data-label="Key Concepts">3D Part Modeling, Advanced Assemblies, Surface Modeling, Sheet Metal Design, Weldments, Drawing & Detailing, GD&T Basics.</div><div data-label="Software/Tools">SolidWorks</div><div data-label="Duration (Hrs)">40</div><div data-label="Project/Application">Design a multi-part mechanical assembly (e.g., a gearbox or a vise).</div></div><div class="table-row"><div data-label="Topic">AutoCAD</div><div data-label="Key Concepts">2D Drafting & Annotation, P&ID Layouts, Isometric Drawings, 3D Modeling Basics, Preparing Drawings for Manufacturing.</div><div data-label="Software/Tools">AutoCAD</div><div data-label="Duration (Hrs)">30</div><div data-label="Project/Application">Create a complete set of manufacturing drawings for a designed assembly.</div></div><div class="table-row"><div data-label="Topic">Ansys</div><div data-label="Key Concepts">FEA Fundamentals, Static Structural Analysis, Thermal Analysis, Modal Analysis, Meshing Techniques, Interpreting Results.</div><div data-label="Software/Tools">Ansys Workbench</div><div data-label="Duration (Hrs)">40</div><div data-label="Project/Application">Perform stress and thermal analysis on a critical component from the designed assembly.</div></div><div class="table-row"><div data-label="Topic">Fusion 360</div><div data-label="Key Concepts">Integrated CAD/CAM, Parametric Modeling, Generative Design, CAM for 2.5/3-Axis Milling, Simulation Basics.</div><div data-label="Software/Tools">Autodesk Fusion 360</div><div data-label="Duration (Hrs)">30</div><div data-label="Project/Application">Design a component using generative design and create the CNC toolpath for its manufacture.</div></div></div><div class="module-assessment"><span class="assessment-title">Assessment:</span> Portfolio of completed designs, simulation reports, and a final practical exam in SolidWorks and Ansys.</div></div></div><div class="capstone-project"><h3 class="capstone-subtitle">Integrated Program</h3><h2 class="capstone-title">Capstone Project</h2><p class="capstone-details">Design, analyze, and create a manufacturing plan for an automated assembly jig. This requires integrating skills from all modules, including design in SolidWorks, analysis in Ansys, manufacturing with CNC/3D printing, and reliability analysis (FMEA), culminating in a final presentation.</p></div></div>`
    },
    {
        id: "eee",
        icon: faBolt,
        title: "Electrical & Electronics (EEE)",
        desc: "Gain expertise in power systems, control automation, and renewable energy to tackle the challenges of the modern electrical industry. Pathways include Automation Engineer and Power Systems Specialist.",
        modules: ["PLC, Drives & Control Panels", "Power Systems & Protection", "Switchgear and Substation Engineering"],
        tools: "AutoCAD Electrical, TIA Portal, ETAP",
        curriculumHtml: `<div class="curriculum-content"><div class="program-overview"><p>This finishing school program is an intensive, industry-focused curriculum designed to equip electrical engineering graduates with the practical, in-demand skills required for a successful career in the core electrical sector. The program focuses on automation, power systems, energy management, and industrial standards, ensuring graduates are prepared for roles in design, projects, and maintenance.</p></div><div class="module"><div class="module-header"><h3 class="module-title">Module 1: PLC, Drives & Control Panels</h3><span class="module-duration">140 Hours</span></div><div class="module-body"><p class="module-objective">To develop proficiency in industrial automation, from programming PLCs and configuring drives to designing and building control panels for industrial applications.</p><div class="curriculum-detail-table"><div class="table-header"><div>Topic</div><div>Key Concepts</div><div>Software/Tools</div><div>Duration (Hrs)</div><div>Project/Application</div></div><div class="table-row"><div data-label="Topic">PLC Programming</div><div data-label="Key Concepts">PLC Architecture, Ladder Logic (LD), Function Block Diagram (FBD), Timers, Counters, Analog I/O, HMI Integration.</div><div data-label="Software/Tools">Siemens TIA Portal, ABB Automation Builder</div><div data-label="Duration (Hrs)">60</div><div data-label="Project/Application">Program a PLC for a motor control application (e.g., Star-Delta starter, conveyor control).</div></div><div class="table-row"><div data-label="Topic">AC Drives (VFDs)</div><div data-label="Key Concepts">VFD Principles, Parameter Configuration, Speed & Torque Control, Braking, Communication Protocols (Modbus/PROFIBUS).</div><div data-label="Software/Tools">Siemens SINAMICS, ABB ACS series drives</div><div data-label="Duration (Hrs)">40</div><div data-label="Project/Application">Configure a VFD to control the speed of an induction motor based on analog input.</div></div><div class="table-row"><div data-label="Topic">Control Panel Design</div><div data-label="Key Concepts">Component Selection (MCB, Contactors, Relays), General Arrangement (GA) & Schematic Drawings, Busbar Sizing, Heat Dissipation.</div><div data-label="Software/Tools">AutoCAD Electrical, EPLAN Electric P8 (Intro)</div><div data-label="Duration (Hrs)">40</div><div data-label="Project/Application">Design and create the complete drawing set for a motor control center (MCC) panel.</div></div></div><div class="module-assessment"><span class="assessment-title">Assessment:</span> Practical programming assignments, VFD configuration test, and a complete control panel design portfolio.</div></div></div><div class="capstone-project"><h3 class="capstone-subtitle">Integrated Program</h3><h2 class="capstone-title">Capstone Project</h2><p class="capstone-details">Develop a comprehensive electrical design and automation plan for a small-scale water pumping station, covering automation, power system design, wiring standards, and energy management, and present the integrated design.</p></div></div>`
    },
    {
        id: "ece",
        icon: faMicrochip,
        title: "Electronics & Communication (ECE)",
        desc: "Specialize in the technologies that power our connected world, from IoT devices to high-speed communication networks. Career paths include Embedded Developer and IoT Specialist.",
        modules: ["PCB Design & Fabrication", "Embedded Systems & IoT", "Analog & Digital Circuit Design"],
        tools: "KiCad, STM32CubeIDE, LTspice",
        curriculumHtml: `<div class="curriculum-content"><div class="program-overview"><p>This finishing school program is an intensive, project-oriented curriculum designed to transform electronics engineering graduates into industry-ready professionals. The program provides deep, hands-on expertise in the entire product development lifecycle, from circuit design and PCB fabrication to embedded programming and IoT implementation. Graduates will master industry-standard tools and methodologies, preparing them for roles in hardware design, embedded development, and IoT solutions.</p></div><div class="module"><div class="module-header"><h3 class="module-title">Module 1: PCB Design & Fabrication</h3><span class="module-duration">120 Hours</span></div><div class="module-body"><p class="module-objective">To achieve proficiency in designing professional, manufacturable printed circuit boards (PCBs) using industry-standard EDA tools, from schematic capture to generating fabrication files.</p><div class="curriculum-detail-table"><div class="table-header"><div>Topic</div><div>Key Concepts</div><div>Software/Tools</div><div>Duration (Hrs)</div><div>Project/Application</div></div><div class="table-row"><div data-label="Topic">Schematic Capture</div><div data-label="Key Concepts">Component Libraries, Netlists, Design Rules Check (DRC), Bill of Materials (BOM) Generation.</div><div data-label="Software/Tools">KiCad, Eagle</div><div data-label="Duration (Hrs)">30</div><div data-label="Project/Application">Create the schematic for a microcontroller development board.</div></div><div class="table-row"><div data-label="Topic">PCB Layout</div><div data-label="Key Concepts">Component Placement, Routing Techniques (Manual/Auto), Layer Stack-up, Power & Ground Planes, Signal Integrity Basics.</div><div data-label="Software/Tools">KiCad, Eagle</div><div data-label="Duration (Hrs)">50</div><div data-label="Project/Application">Design a 2-layer PCB for the development board schematic.</div></div></div><div class="module-assessment"><span class="assessment-title">Assessment:</span> A complete PCB design portfolio (schematic, layout, Gerbers, BOM) and a practical soldering and board testing exam.</div></div></div><div class="capstone-project"><h3 class="capstone-subtitle">Integrated Program</h3><h2 class="capstone-title">Capstone Project</h2><p class="capstone-details">Design and build a "Portable Environmental Monitor." This involves custom PCB design, firmware development for multiple sensors, IoT integration for cloud data transmission, and a final demonstration of the working prototype.</p></div></div>`
    },
    {
        id: "cs",
        icon: faLaptopCode,
        title: "Computer Science",
        desc: "Master the most in-demand skills in software development, data science, and cloud infrastructure. This program prepares you for high-growth roles like Full-Stack Developer or AI/ML Engineer.",
        modules: ["Full-Stack Web Development (MERN)", "DevOps & Cloud Computing (AWS)", "AI/ML Foundation"],
        tools: "React.js, Node.js, Docker, Python",
        curriculumHtml: `<div class="curriculum-content"><div class="program-overview"><p>This finishing school program is an intensive, hands-on curriculum designed to equip Computer Science and IT graduates with the practical, in-demand skills required by the modern technology industry. The program moves beyond academic theory to provide deep expertise in full-stack development, database management, DevOps, cloud computing, and the fundamentals of AI/ML and cybersecurity.</p></div><div class="module"><div class="module-header"><h3 class="module-title">Module 1: Full Stack Development</h3><span class="module-duration">150 Hours</span></div><div class="module-body"><p class="module-objective">To build and deploy dynamic, responsive, and complete web applications by mastering both front-end and back-end technologies using the MERN stack.</p><div class="curriculum-detail-table"><div class="table-header"><div>Topic</div><div>Key Concepts</div><div>Software/Tools</div><div>Duration (Hrs)</div><div>Project/Application</div></div><div class="table-row"><div data-label="Topic">Front-End Development</div><div data-label="Key Concepts">HTML5, CSS3, Flexbox, Grid, Responsive Design, JavaScript (ES6+), DOM Manipulation, API Fetching.</div><div data-label="Software/Tools">VS Code, Chrome DevTools</div><div data-label="Duration (Hrs)">50</div><div data-label="Project/Application">Build a responsive, multi-page portfolio website from scratch.</div></div><div class="table-row"><div data-label="Topic">React.js</div><div data-label="Key Concepts">Components, JSX, State, Props, Hooks (useState, useEffect), Component Lifecycle, React Router, State Management (Context API/Redux Toolkit).</div><div data-label="Software/Tools">React.js, Create React App</div><div data-label="Duration (Hrs)">50</div><div data-label="Project/Application">Develop a single-page application (SPA) like a movie search app using a public API.</div></div></div><div class="module-assessment"><span class="assessment-title">Assessment:</span> A fully functional MERN stack application (e.g., a simple e-commerce site) with a React front-end and a Node.js/Express back-end.</div></div></div><div class="capstone-project"><h3 class="capstone-subtitle">Integrated Program</h3><h2 class="capstone-title">Capstone Project</h2><p class="capstone-details">Design, develop, and deploy a "Smart Recommendation Web App." The project integrates a React front-end, Node.js back-end, a simple ML-based recommendation engine, and is containerized with Docker and deployed to AWS via a CI/CD pipeline.</p></div></div>`
    },
    {
        id: "instrumentation",
        icon: faGaugeHigh,
        title: "Instrumentation Engineering",
        desc: "Become an expert in the measurement and control of process variables in industrial settings. This program is your gateway to a career as a Process Control Engineer or Automation Specialist.",
        modules: ["Field Instruments & Transmitters", "Process Control & Automation Systems", "Smart Instrumentation & IIoT"],
        tools: "HART Communicator, DCS/SCADA Simulators",
        curriculumHtml: `<div class="curriculum-content"><div class="program-overview"><p>This finishing school program is an intensive, hands-on curriculum designed to bridge the gap between academic theory and the practical demands of the modern process industry. The program provides graduates with core competencies in process control, field instrumentation, modern automation systems (DCS/SCADA), and the emerging field of Industrial IoT (IIoT).</p></div><div class="module"><div class="module-header"><h3 class="module-title">Module 1: Field Instruments & Transmitters</h3><span class="module-duration">120 Hours</span></div><div class="module-body"><p class="module-objective">To build a strong, practical foundation in the working principles, selection, installation, and troubleshooting of common instruments used to measure and control process variables.</p></div></div><div class="capstone-project"><h3 class="capstone-subtitle">Integrated Program</h3><h2 class="capstone-title">Capstone Project</h2><p class="capstone-details">Design, Calibrate, and Commission a "Heat Exchanger Temperature Control Loop" on a training skid. This involves creating documentation (P&IDs), selecting and calibrating instruments, configuring control logic in a DCS/PLC, and demonstrating a working loop.</p></div></div>`
    },
    {
        id: "civil",
        icon: faBuilding,
        title: "Civil Engineering",
        desc: "Bridge theory and practice with a focus on modern construction technologies, sustainable design, and digital project management, preparing you for roles in BIM and structural design.",
        modules: ["Building Information Modeling (BIM)", "Advanced Structural Analysis & Design", "Construction Project Management"],
        tools: "AutoCAD, Revit, STAAD.Pro, Primavera P6",
        curriculumHtml: `<div class="curriculum-content"><div class="program-overview"><p>The detailed curriculum for our Civil Engineering finishing school program is being updated to reflect the latest industry standards.</p><p>Please contact our advisors for the most current information. Key areas of focus include:</p><ul><li>Building Information Modeling (BIM) with Revit</li><li>Advanced Structural Analysis & Design with STAAD.Pro</li><li>Construction Project Management with Primavera P6</li><li>Sustainable & Green Building Design</li></ul></div></div>`
    }
];

const ProgramsPage = () => {
    const hero3dRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');

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
            for(let i=0; i < starCount; i++) {
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

    useEffect(() => {
        if (!window.gsap || !window.THREE) {
            console.warn("Waiting for libraries to load...");
            return;
        }
        const gsap = window.gsap;
        gsap.from(".hero-content > *", { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: "power3.out", delay: 0.5 });
        
        const cleanup3D = init3DScene(hero3dRef.current);
        return () => {
            if (cleanup3D) cleanup3D();
        }
    }, []);

    const openModal = (program) => {
        setModalTitle(`${program.title} Curriculum`);
        setModalContent(program.curriculumHtml);
        setIsModalOpen(true);
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.classList.remove('modal-open');
    };

    return (
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
                        <span className="title-line">Explore Our Future-Ready</span>
                        <span className="title-line orange-text">Engineering Programs</span>
                    </h1>
                    <p className="hero-description">
                        Detailed, industry-vetted curriculums for Mechanical, Electrical, Computer Science, and more. Find the perfect path to launch your engineering career in Kochi.
                    </p>
                </div>
            </section>

            <section className="section programs-detail-page">
                <div className="programs-section-header">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Our Core Disciplines</h2>
                            <p className="section-subtitle">Each program is a 3-month intensive course plus a 1-month internship, available in both online and offline formats. Swipe through our offerings below.</p>
                        </div>
                    </div>
                </div>
                
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    coverflowEffect={{
                        rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    className="program-swiper"
                >
                    {programData.map(prog => (
                         <SwiperSlide key={prog.id} style={{width: '450px'}}>
                             <div className="program-detail-card">
                                 <div className="card-header">
                                     <div className="card-icon"><FontAwesomeIcon icon={prog.icon} /></div>
                                     <h3>{prog.title}</h3>
                                 </div>
                                 <p className="program-desc">{prog.desc}</p>
                                 <h4>Key Curriculum Modules</h4>
                                 <ul>
                                     {prog.modules.map((mod, i) => <li key={i}>{mod}</li>)}
                                 </ul>
                                 <h4>Software & Tools Covered</h4>
                                 <p className="program-tools">{prog.tools}</p>
                                 <div className="program-actions">
                                     <button onClick={() => openModal(prog)} className="btn btn-outline view-curriculum-btn">View Curriculum <FontAwesomeIcon icon={faArrowRight} /></button>
                                 </div>
                             </div>
                         </SwiperSlide>
                    ))}
                </Swiper>
            </section>
            
           <section id="cta" className="section cta">
                 <div className="container cta-content">
                    <h2 className="orange-text">Ready to Engineer Your Future?</h2>
                    <p>Find the perfect program and take the first step to launch your career.</p>
                    <div className="cta-actions">
                        {/* --- ✅ മാറ്റം ഇവിടെയാണ് --- */}
                        {/* ലിങ്ക് /admission#apply-now എന്നാക്കി മാറ്റി */}
                        <Link to="/admission#apply-now" className="btn btn-primary">
                            <i className="fas fa-user-check" style={{ marginRight: '8px' }}></i> Apply Now
                        </Link>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">{modalTitle}</h2>
                            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
                        </div>
                        <div className="modal-body" dangerouslySetInnerHTML={{ __html: modalContent }} />
                    </div>
                </div>
            )}
        </main>
    );
};

export default ProgramsPage;