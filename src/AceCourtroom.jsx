import React, { useState, useRef, useEffect } from "react";
import TypeIt from "typeit-react";
import { Howl } from "howler";

// Audio setup
const blipSound = new Howl({
  src: ["https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"],
  volume: 0.2,
});

const selectSound = new Howl({
  src: ["https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"],
  volume: 0.4,
});

// Evidence & Profiles Data
const evidenceData = {
  evidence: [
    {
      id: "badge",
      title: "Attorney's Badge",
      image: "/badge.png",
      description: "It's my prized possession. It proves I'm a certified full-stack developer skilled in modern web tech.",
      details: "Certified: Full-Stack Web Development\nStack: React, Node.js, Express, MongoDB",
      dialogue: "Take a look at this badge! It proves my competence in full-stack web development and modern frontend frameworks!",
      explanation: {
        subtitle: "Official Full-Stack Credential Verification",
        summary: "This badge certifies rigorous training and hands-on competence in end-to-end full-stack development, covering UI state management, API design, and database integration.",
        keyPoints: [
          "Demonstrated proficiency in React component architecture and lifecycle state management.",
          "Backend endpoint integration utilizing Node.js and RESTful Express routing patterns.",
          "Database schema design and CRUD operations with MongoDB."
        ],
        tags: ["Certification", "React", "Node.js", "Express", "MongoDB"]
      }
    },
    {
      id: "report",
      title: "MERN Stack Case File",
      icon: "📂",
      description: "Full-featured web application built with modern architecture and REST API integration.",
      details: "Framework: React & Tailwind CSS\nBackend: Express & Node.js API",
      dialogue: "This case file contains complete architectural proof of modern MERN stack development and clean API integration!",
      explanation: {
        subtitle: "Project Blueprint & Architectural Summary",
        summary: "A production-grade web application engineered to demonstrate clean code architecture, efficient state flow, and responsive utility styling.",
        keyPoints: [
          "Modular client-side rendering with Tailwind CSS utility classes.",
          "Secure Express API backend routes handling asynchronous data fetch operations.",
          "Scalable state distribution across complex component hierarchies."
        ],
        tags: ["MERN Stack", "REST API", "Tailwind CSS", "Architecture"]
      }
    },
    {
      id: "thinker",
      title: "Ace Portfolio Site",
      image: "/badge.png",
      description: "Interactive portfolio modeled after retro courtroom visual novels with custom dialogue engine.",
      details: "Engine: React + TypeIt + Howler.js\nDesign: Pixel-inspired UI",
      dialogue: "Notice the attention to detail! This dynamic courtroom portfolio is powered by React, custom typewriter logic, and Howler audio sync!",
      explanation: {
        subtitle: "Interactive Visual Novel Engine",
        summary: "A customized frontend experience mimicking the iconic Ace Attorney dialogue system using audio cues, typewriter typography, and dynamic viewport triggers.",
        keyPoints: [
          "Custom audio timing synchronization via Howler.js blip engine.",
          "Animated text rendering driven by TypeIt integration with dynamic state resets.",
          "IntersectionObserver hook integration tracking scroll position for UI toggles."
        ],
        tags: ["Frontend", "TypeIt", "Howler.js", "UX Design"]
      }
    },
    {
      id: "passport",
      title: "GitHub Repository",
      icon: "📘",
      description: "Contains all production source code, commits, and open-source contributions.",
      details: "URL: github.com/defense-dev\nStatus: Active Deployment",
      dialogue: "The source code doesn't lie! Every commit, feature branch, and production build is documented right here in my repository!",
      explanation: {
        subtitle: "Version Control & Source Code Inventory",
        summary: "Centralized repository hub hosting active web applications, feature branches, pull requests, and deployment builds.",
        keyPoints: [
          "Structured commit history adhering to semantic Git commit conventions.",
          "Automated page deployment and GitHub Actions workflows.",
          "Clean codebase repository management with modular file separation."
        ],
        tags: ["GitHub", "Git", "CI/CD", "Open Source"]
      }
    },
    {
      id: "document",
      title: "Technical Resume",
      icon: "📄",
      description: "Complete list of technical skillsets, project achievements, and work credentials.",
      details: "Format: PDF / Web View\nUpdated: 2026 Edition",
      dialogue: "Here is the indisputable record of my technical skills, language proficiencies, and project achievements!",
      explanation: {
        subtitle: "Comprehensive Career Credentials",
        summary: "Detailed overview of academic history, technical proficiencies, project milestones, and internship experience in modern web engineering.",
        keyPoints: [
          "Full breakdown of languages: JavaScript, Python, C, Java, and Bash.",
          "Track record of hackathon achievements and web application projects.",
          "Practical knowledge in cloud tooling, version control, and web stack frameworks."
        ],
        tags: ["Resume", "Skills", "Credentials", "2026 Edition"]
      }
    },
    null, null, null
  ],
  profiles: [
    {
      id: "phoenix",
      title: "Lead Developer",
      icon: "👤",
      description: "Passionate programmer specializing in frontend dynamics, component state, and scalable backends.",
      details: "Role: Full-Stack Developer\nFocus: Clean Code & High Performance",
      dialogue: "That's my own dossier! As the lead developer, I focus on clean code, dynamic user experiences, and responsive design.",
      explanation: {
        subtitle: "Primary Contact Dossier",
        summary: "Dedicated developer focused on turning visual novel concepts and complex web requirements into responsive, highly interactive web solutions.",
        keyPoints: [
          "Specializes in modern React patterns and dynamic UI components.",
          "Committed to clean maintainable architecture and performance tuning.",
          "Continuous learner expanding technical skillsets across game dev and web tools."
        ],
        tags: ["Full-Stack", "Lead Developer", "React Specialist"]
      }
    },
    {
      id: "mentor",
      title: "Senior Technical Mentor",
      icon: "🎓",
      description: "Guided architectural choices, code reviews, and proper deployment strategies.",
      details: "Specialty: System Design & Code Optimization",
      dialogue: "This profile details the guidance and code review standard behind my system design choices!",
      explanation: {
        subtitle: "Advisory & Code Review Record",
        summary: "Technical guidance resource assisting with structural system architecture, refactoring strategy, and industry best practices.",
        keyPoints: [
          "Architectural validation for RESTful API routing and state management.",
          "Code review and refactoring strategies for production readiness.",
          "Guidance on performance optimization and modern web standards."
        ],
        tags: ["Mentorship", "System Design", "Code Review"]
      }
    },
    null, null, null, null, null, null
  ]
};

// HELPER TO RENDER ICON OR BADGE IMAGE ACCORDING TO USE CASE
function RenderItemMedia({ item, sizeClass = "w-6 h-6", textFallback = "❓" }) {
  if (item?.image) {
    return (
      <img
        src={item.image}
        alt={item.title || "Badge"}
        className={`${sizeClass} object-contain inline-block drop-shadow-md select-none`}
      />
    );
  }
  return <span>{item?.icon || textFallback}</span>;
}

// COURT RECORD COMPONENT
function AceAttorneyCourtRecord({ playSelect, sectionRef, onPresent, isInCourtRecord, setIsInCourtRecord }) {
  const [activeTab, setActiveTab] = useState("evidence");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentItems = evidenceData[activeTab];
  const selectedItem = currentItems[selectedIndex] || currentItems[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInCourtRecord(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionRef, setIsInCourtRecord]);

  const handleTabToggle = () => {
    if (playSelect) playSelect();
    setActiveTab((prev) => (prev === "evidence" ? "profiles" : "evidence"));
    setSelectedIndex(0);
  };

  const handleSelectSlot = (idx) => {
    if (!currentItems[idx]) return;
    if (playSelect) playSelect();
    setSelectedIndex(idx);
  };

  const handlePresentItem = () => {
    if (activeTab !== "evidence" || !selectedItem || !isInCourtRecord) return;
    if (playSelect) playSelect();
    if (onPresent) onPresent(selectedItem);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isTyping = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
      if (isTyping) return;

      if ((e.key === "e" || e.key === "E") && activeTab === "evidence" && isInCourtRecord) {
        handlePresentItem();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, activeTab, playSelect, onPresent, isInCourtRecord]);

  return (
    <section
      ref={sectionRef}
      id="court-record"
      className="w-full max-w-6xl mx-auto my-12 scroll-mt-6 relative z-10 font-aceUi px-4"
    >
      <div className="w-full bg-slate-100 rounded-xl border-4 border-slate-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden relative">
        <div className="w-full bg-slate-200 border-b-2 border-slate-300 flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-1 bg-cyan-600 text-white font-black text-sm px-4 py-1 rounded-sm shadow-sm tracking-widest uppercase [clip-path:polygon(0_0,90%_0,100%_100%,0%_100%)] pr-6">
            <span>{activeTab === "evidence" ? "Evidence" : "Profiles"}</span>
          </div>

          <button
            onClick={handleTabToggle}
            className="px-4 py-1 bg-amber-400 hover:bg-amber-300 border border-amber-600 text-black font-black text-xs tracking-wider rounded transition-transform active:scale-95 shadow cursor-pointer"
          >
            SWITCH TO {activeTab === "evidence" ? "PROFILES 👤" : "EVIDENCE 📂"}
          </button>
        </div>

        <div className="p-5 md:p-8 bg-white border-2 border-cyan-500 m-3 rounded-md shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* MAIN DISPLAY BOX */}
            <div className="bg-slate-200 border-2 border-slate-400 rounded-lg flex items-center justify-center p-6 h-56 md:h-64 shadow-inner">
              <span className="text-8xl md:text-9xl select-none flex items-center justify-center">
                <RenderItemMedia item={selectedItem} sizeClass="w-32 h-32 md:w-40 md:h-40" />
              </span>
            </div>

            <div className="md:col-span-2 flex flex-col justify-start">
              <div className="bg-amber-300/90 border-b-2 border-amber-500 px-4 py-2 mb-4 rounded-sm shadow-sm">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-wide">
                  {selectedItem?.title || "Empty File"}
                </h3>
              </div>

              <div className="space-y-4 font-aceUi text-slate-800 text-lg md:text-xl leading-relaxed">
                <p className="border-b border-dashed border-slate-300 pb-2 font-semibold">
                  {selectedItem?.description || "No evidence recorded in this inventory slot."}
                </p>
                {selectedItem?.details && (
                  <p className="border-b border-dashed border-slate-300 pb-2 text-slate-600 text-base md:text-lg font-aceDialogue whitespace-pre-line tracking-wider">
                    {selectedItem.details}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* INVENTORY SLOTS GRID */}
          <div className="grid grid-cols-8 gap-2.5 bg-cyan-900/90 p-4 rounded-lg border-2 border-cyan-600 shadow-inner">
            {currentItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectSlot(idx)}
                  className={`aspect-square rounded border-2 relative flex items-center justify-center cursor-pointer transition-all ${
                    item ? "hover:bg-cyan-800/80" : "opacity-40 cursor-default"
                  } ${
                    isSelected
                      ? "bg-cyan-700 border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)] scale-105 z-10"
                      : "bg-cyan-950/80 border-cyan-700/60"
                  }`}
                >
                  {isSelected && (
                    <>
                      <span className="absolute -top-1 -left-1 text-amber-400 font-black text-xs">┌</span>
                      <span className="absolute -top-1 -right-1 text-amber-400 font-black text-xs">┐</span>
                      <span className="absolute -bottom-1 -left-1 text-amber-400 font-black text-xs">└</span>
                      <span className="absolute -bottom-1 -right-1 text-amber-400 font-black text-xs">┘</span>
                    </>
                  )}

                  <span className="text-2xl md:text-3xl select-none flex items-center justify-center">
                    <RenderItemMedia item={item} sizeClass="w-7 h-7 md:w-9 md:h-9" textFallback="" />
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-4 mt-5">
            {activeTab === "evidence" && (
              <button
                onClick={handlePresentItem}
                disabled={!isInCourtRecord}
                className={`flex items-center gap-2 font-aceUi text-sm md:text-base font-bold px-6 py-2 rounded border shadow-md transition-all ${
                  isInCourtRecord
                    ? "bg-cyan-700 hover:bg-cyan-600 active:scale-95 text-white border-cyan-400 cursor-pointer"
                    : "bg-slate-500 text-slate-300 border-slate-400 cursor-not-allowed opacity-50"
                }`}
              >
                <span className="hidden sm:inline-block bg-cyan-950 text-cyan-200 px-1.5 py-0.5 rounded text-xs border border-cyan-600 font-aceDialogue">
                  E
                </span>
                PRESENT
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// EVIDENCE DETAIL EXPLANATION
function EvidenceDetailExplanation({ presentedItem, detailRef }) {
  if (!presentedItem || !presentedItem.explanation) return null;

  const { title, explanation } = presentedItem;

  return (
    <section
      ref={detailRef}
      id="evidence-detail"
      className="w-full max-w-6xl mx-auto my-12 scroll-mt-6 relative z-10 font-aceUi px-4"
    >
      <div className="w-full bg-slate-900 border-4 border-amber-400/80 rounded-xl p-6 md:p-8 shadow-[0_0_35px_rgba(245,158,11,0.25)] relative overflow-hidden transition-all duration-300">
        <div className="flex items-center gap-3 border-b-2 border-amber-500/50 pb-4 mb-6">
          <img
            src="/badge.png"
            alt="Badge Icon"
            className="w-8 h-8 md:w-10 md:h-10 object-contain inline-block drop-shadow-md select-none"
          />
          <div>
            <div className="text-xs font-aceHeader font-bold tracking-widest text-amber-400 uppercase">
              EVIDENCE TESTIMONY & ANALYSIS
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-wide mt-1">
              {title}
            </h2>
          </div>
        </div>

        <div className="bg-cyan-950/80 border-l-4 border-cyan-400 p-4 mb-6 rounded-r">
          <h4 className="text-lg md:text-xl font-bold text-cyan-200 font-aceUi">
            📌 {explanation.subtitle}
          </h4>
          <p className="text-slate-300 text-base md:text-lg mt-2 leading-relaxed">
            {explanation.summary}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-aceHeader uppercase tracking-widest text-slate-400 font-bold">
            Key Evidentiary Points:
          </h4>
          <ul className="space-y-2">
            {explanation.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-200 text-base md:text-lg">
                <span className="text-amber-400 font-black">▶</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
          {explanation.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-slate-800 border border-slate-700 text-amber-300 text-xs font-aceHeader font-bold px-3 py-1 rounded-full shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// FRIENDLY PORTFOLIO INQUIRY FORM
function LawyerHiringForm({ onHoldIt, sectionRef }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    verdictChoice: "LETS WORK TOGETHER!",
    caseDescription: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNameFilled = formData.clientName.trim() !== "";
    const isEmailFilled = formData.clientEmail.trim() !== "";
    const isDescFilled = formData.caseDescription.trim() !== "";

    if (!isNameFilled || !isEmailFilled || !isDescFilled) {
      if (onHoldIt) {
        onHoldIt("Hold it! Please fill in your name, email, and project message before sending!");
      }
      return;
    }

    setSubmitted(true);
  };

  return (
    <section 
      ref={sectionRef} 
      id="hiring-contract" 
      className="w-full max-w-4xl mx-auto my-16 mb-48 relative z-10 px-4 scroll-mt-6"
    >
      {/* CLIPBOARD CLIP */}
      <div className="w-32 h-8 bg-slate-700 border-2 border-slate-900 mx-auto rounded-t-lg flex items-center justify-center shadow-md relative z-20">
        <div className="w-16 h-3 bg-slate-400 rounded-full border border-slate-600"></div>
      </div>

      {/* PAPER CONTAINER */}
      <div className="w-full bg-[#fdfbf7] text-slate-900 border-2 border-amber-900/40 rounded-b-sm rounded-t-sm p-6 md:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden font-sans">
        
        {/* STAMP */}
        {submitted && (
          <div className="absolute top-8 right-6 border-4 border-emerald-600 border-dashed rounded-lg px-4 py-2 font-mono text-xl md:text-2xl font-black uppercase text-emerald-700 bg-emerald-50/90 pointer-events-none z-30 animate-[stampPop_0.35s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
            VERDICT: CONNECTED!
          </div>
        )}

        {/* HEADER */}
        <div className="border-b-2 border-slate-800/20 pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-800 font-bold uppercase">
            <img src="/badge.png" alt="Badge Icon" className="w-4 h-4 object-contain inline-block" />
            <span>DIRECT INQUIRY // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 uppercase mt-1">
            LET'S BUILD SOMETHING GREAT
          </h2>
          <p className="text-sm text-slate-600 italic mt-1">
            Have a project in mind, a job opportunity, or just want to chat tech? Send a message below!
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-100/50 border-2 border-emerald-600/30 p-8 rounded-lg text-center my-8 space-y-3">
            <h3 className="text-2xl font-black text-emerald-950 uppercase tracking-wide">
              Message Sent!
            </h3>
            <p className="text-slate-800 text-base max-w-xl mx-auto leading-relaxed">
              Thanks for reaching out! Your message has been received and I'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 bg-slate-900 text-amber-300 font-mono text-xs uppercase font-bold rounded-md hover:bg-slate-800 shadow transition-transform active:scale-95 cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-1">
                  1. YOUR NAME / COMPANY <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Smith / Tech Corp"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-slate-300 focus:border-cyan-600 outline-none py-1.5 px-1 text-slate-900 font-medium transition-colors placeholder:text-slate-400 placeholder:italic"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-1">
                  2. YOUR EMAIL ADDRESS <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. alex@example.com"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-slate-300 focus:border-cyan-600 outline-none py-1.5 px-1 text-slate-900 font-medium transition-colors placeholder:text-slate-400 placeholder:italic"
                />
              </div>
            </div>

            {/* PURPOSE / VERDICT */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                3. WHAT ARE WE LOOKING TO DO?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "LETS WORK TOGETHER!",
                  "JUST SAYING HELLO"
                ].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-2 p-3 rounded-md border text-xs font-mono font-bold uppercase cursor-pointer transition-all ${
                      formData.verdictChoice === option
                        ? "bg-slate-900 text-amber-300 border-slate-900 shadow-sm"
                        : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="verdictChoice"
                      value={option}
                      checked={formData.verdictChoice === option}
                      onChange={(e) => setFormData({ ...formData, verdictChoice: e.target.value })}
                      className="accent-amber-400"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-1">
                4. PROJECT DETAILS / MESSAGE <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Tell me about your project, ideas, or timeline..."
                value={formData.caseDescription}
                onChange={(e) => setFormData({ ...formData, caseDescription: e.target.value })}
                className="w-full bg-[#f8f5ee] border border-slate-300 focus:border-cyan-600 rounded-md p-3 text-slate-900 outline-none leading-relaxed transition-colors placeholder:text-slate-400 placeholder:italic"
              ></textarea>
            </div>

            {/* SIGNATURE & SUBMIT */}
            <div className="pt-6 border-t border-slate-300 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div className="w-full md:w-1/2">
                <div className="border-b border-slate-800 pb-1 font-serif italic text-slate-700 text-lg min-h-[32px]">
                  {formData.clientName || "Your Name"}
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase mt-1">
                  SENDER SIGNATURE
                </div>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-amber-300 font-mono text-xs font-bold uppercase tracking-widest rounded-md border border-slate-900 shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>SEND MESSAGE</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

// MAIN PARENT COMPONENT
export default function AceCourtroom() {
  const [keyCounter, setKeyCounter] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  
  // Cut-in states
  const [showTakeThat, setShowTakeThat] = useState(false);
  const [showHoldIt, setShowHoldIt] = useState(false);
  
  const [imgTakeThatError, setImgTakeThatError] = useState(false);
  const [imgHoldItError, setImgHoldItError] = useState(false);

  const [isInCourtRecord, setIsInCourtRecord] = useState(false);
  
  const [currentText, setCurrentText] = useState(
    "Junior Full-Stack Developer & Web Dev Enthusiast building modern applications with PRECISION and DEDICATION."
  );

  const [presentedItem, setPresentedItem] = useState(evidenceData.evidence[0]);
  const courtRecordRef = useRef(null);
  const detailRef = useRef(null);
  const hiringFormRef = useRef(null);

  const scrollToCourtRecord = () => {
    if (!isMuted) selectSound.play();
    courtRecordRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHiringForm = () => {
    if (!isMuted) selectSound.play();
    hiringFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePresent = (item) => {
    setShowTakeThat(true);

    setTimeout(() => {
      setShowTakeThat(false);
      setPresentedItem(item);

      if (item.dialogue) {
        setCurrentText(item.dialogue);
        setKeyCounter((prev) => prev + 1);
      }

      detailRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 900);
  };

  const handleHoldIt = (warningMessage) => {
    setShowHoldIt(true);

    setTimeout(() => {
      setShowHoldIt(false);
      if (warningMessage) {
        setCurrentText(warningMessage);
        setKeyCounter((prev) => prev + 1);
      }
    }, 900);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "q" || e.key === "Q") {
        scrollToCourtRecord();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMuted]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowCharacter(true);
      } else {
        setShowCharacter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0b132b] text-white font-aceUi flex flex-col justify-between p-6 md:p-8 select-none relative pb-48 overflow-x-hidden">
      
      {/* TAKE THAT OVERLAY (RESPONSIVELY SCALED) */}
      {showTakeThat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
          {!imgTakeThatError ? (
            <img
              src="/take_that.png"
              alt="TAKE THAT!"
              onError={() => setImgTakeThatError(true)}
              className="w-screen h-auto max-w-none sm:w-auto sm:h-screen object-contain select-none animate-[courtShoutSharp_0.25s_steps(4,end)_forwards]"
            />
          ) : (
            <div className="animate-[courtShoutSharp_0.25s_steps(4,end)_forwards] text-center">
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black italic tracking-tighter text-amber-400 bg-red-600 px-8 py-4 md:px-12 md:py-6 border-[8px] md:border-[12px] border-yellow-300 shadow-[0_0_80px_rgba(239,68,68,0.9)] -rotate-6 transform">
                TAKE THAT!
              </h1>
            </div>
          )}
        </div>
      )}

      {/* HOLD IT OVERLAY (RESPONSIVELY SCALED) */}
      {showHoldIt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
          {!imgHoldItError ? (
            <img
              src="/hold_it.png"
              alt="HOLD IT!"
              onError={() => setImgHoldItError(true)}
              className="w-screen h-auto max-w-none sm:w-auto sm:h-screen object-contain select-none animate-[courtShoutSharp_0.25s_steps(4,end)_forwards]"
            />
          ) : (
            <div className="animate-[courtShoutSharp_0.25s_steps(4,end)_forwards] text-center">
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black italic tracking-tighter text-amber-300 bg-blue-700 px-8 py-4 md:px-12 md:py-6 border-[8px] md:border-[12px] border-cyan-300 shadow-[0_0_80px_rgba(29,78,216,0.9)] -rotate-3 transform">
                HOLD IT!
              </h1>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes courtShoutSharp {
          0% {
            transform: scale(1.5) rotate(-8deg);
            opacity: 0;
          }
          33% {
            transform: scale(0.95) rotate(3deg);
            opacity: 1;
          }
          66% {
            transform: scale(1.05) rotate(-1deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>

      {/* TOP NAVIGATION BAR */}
      <header className="w-full flex items-center justify-between border-b border-cyan-500/30 pb-4 z-20">
        <div className="flex items-center gap-2 font-black text-amber-400 tracking-wider text-base md:text-lg">
          <img src="/badge.png" alt="Badge Logo" className="w-6 h-6 object-contain inline-block drop-shadow" />
          <span>DEFENSE</span>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-sm font-black tracking-widest text-slate-300">
          <a href="#home" className="hover:text-amber-400 transition-colors text-amber-400">HOME</a>
          <button 
            onClick={scrollToCourtRecord}
            className="hover:text-amber-400 transition-colors uppercase font-black cursor-pointer"
          >
            COURT RECORD
          </button>
          <button 
            onClick={scrollToHiringForm}
            className="hover:text-amber-400 transition-colors uppercase font-black cursor-pointer"
          >
            HIRING FORM
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="rounded border border-slate-700 p-2 text-sm hover:border-amber-400 text-slate-300 cursor-pointer"
            title="Toggle Audio"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <main 
        id="home"
        className="flex-1 flex flex-col justify-between my-4 w-full max-w-6xl mx-auto rounded-xl border border-amber-500/20 relative overflow-hidden bg-cover bg-[32%_top] sm:bg-top bg-no-repeat min-h-[calc(100vh-160px)] p-4 md:p-6"
        style={{ backgroundImage: "url('/courtroom-bg.jpg')" }}
      >
        <div className="relative z-10 w-full flex flex-row items-start justify-between gap-4">
          <div className="border-2 border-cyan-500/40 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-lg shadow-2xl">
            <span className="block text-xs font-aceHeader font-bold text-cyan-400 mb-1 border-b border-cyan-900 pb-0.5 uppercase tracking-wider">
              Connections
            </span>
            <div className="flex flex-col gap-1 text-sm font-semibold text-slate-200">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-800 hover:text-amber-400 transition-colors"
              >
                <span>📦</span> Github
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-800 hover:text-amber-400 transition-colors"
              >
                <span>💼</span> Linkedin
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-800 hover:text-amber-400 transition-colors"
              >
                <span>💬</span> Discord
              </a>
            </div>
          </div>

          <div className="text-right bg-slate-950/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-amber-500/30">
            <h2 className="text-xs sm:text-sm font-aceHeader font-black tracking-widest text-amber-300 drop-shadow-md uppercase">
              COURTROOM NO. 4
            </h2>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-black tracking-wider text-white mt-0.5 drop-shadow-lg">
              DEFENSE BENCH
            </h3>
          </div>
        </div>
      </main>

      {/* COURT RECORD (INVENTORY) */}
      <AceAttorneyCourtRecord 
        sectionRef={courtRecordRef} 
        playSelect={() => !isMuted && selectSound.play()} 
        onPresent={handlePresent}
        isInCourtRecord={isInCourtRecord}
        setIsInCourtRecord={setIsInCourtRecord}
      />

      {/* EVIDENCE DETAIL EXPLANATION */}
      <EvidenceDetailExplanation 
        presentedItem={presentedItem} 
        detailRef={detailRef} 
      />

      {/* LAWYER HIRING CONTRACT FORM */}
      <LawyerHiringForm 
        onHoldIt={handleHoldIt} 
        sectionRef={hiringFormRef} 
      />

      {/* PHOENIX SPRITE */}
      <div 
        className={`fixed bottom-[140px] md:bottom-[160px] left-2 md:left-12 h-52 sm:h-64 md:h-80 lg:h-96 z-20 pointer-events-none flex items-end transition-opacity duration-300 ${
          showCharacter ? "opacity-100" : "opacity-0"
        }`}
      >
        <img 
          src="/character.png" 
          alt="Phoenix Wright" 
          className="h-full w-auto object-contain object-bottom drop-shadow-[0_12px_15px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* OVERLAY DIALOGUE BOX */}
      <div className="fixed bottom-0 left-0 right-0 w-full z-30 px-2 md:px-6">
        <div className="w-full bg-slate-950/95 border-t-2 border-cyan-500/50 p-6 md:p-8 relative min-h-[160px] shadow-2xl flex flex-col justify-between backdrop-blur-md">
          
          <div className="absolute -top-4 left-6 md:left-12 bg-cyan-600 border-2 border-cyan-300 text-white font-aceUi text-sm md:text-base font-bold px-6 py-0.5 shadow-md flex items-center justify-center [clip-path:polygon(10%_0%,_90%_0%,_100%_50%,_90%_100%,_10%_100%,_0%_50%)] z-40">
            Phoenix
          </div>

          <div className="mt-2 text-2xl md:text-3xl font-aceDialogue text-slate-100 tracking-wider leading-relaxed">
            <TypeIt
              key={keyCounter}
              options={{
                speed: 15,
                waitUntilVisible: true,
                cursor: false,
              }}
              getBeforeInit={(instance) => {
                instance.type(currentText);
                return instance;
              }}
              onCharacter={() => {
                if (!isMuted) {
                  if (blipSound.playing()) blipSound.stop();
                  blipSound.play();
                }
              }}
            />
          </div>

          <div className="w-full flex items-center justify-end border-t border-slate-700/50 pt-2 mt-4 min-h-[40px]">
            {!isInCourtRecord && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToCourtRecord();
                }}
                className="flex items-center gap-2 px-4 py-1.5 bg-cyan-900/80 hover:bg-cyan-800 border border-cyan-500/50 rounded text-cyan-200 text-xs md:text-sm font-bold tracking-wider transition-all shadow cursor-pointer active:scale-95"
              >
                <span className="hidden sm:inline-block bg-cyan-950 text-cyan-200 px-1.5 py-0.5 rounded text-xs border border-cyan-600 font-aceDialogue">
                  Q
                </span>
                COURT RECORD 📂
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}