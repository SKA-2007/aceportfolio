// Name: AceCourtroom_10.jsx
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

// Interactive skill nodes mapped to percentage coordinates on ./public/floor_plan.png
const mapNodes = [
  {
    id: "c",
    name: "C Language",
    top: "18%",
    left: "21%",
    description: "Low-level memory management, pointers, system calls, and core C programming fundamentals.",
    dialogue: [
      "OBJECTION! Look at the top-left chamber!",
      "C fundamentals and low-level system understanding form the bedrock of my code!",
      "Pointers and manual memory management hold no secrets here!"
    ]
  },
  {
    id: "github",
    name: "GitHub & Git",
    top: "27%",
    left: "41%",
    description: "Version control, feature branching, code review workflows, and automated deployments.",
    dialogue: [
      "TAKE THAT! Located right in the upper corridor!",
      "Version control tracks every commit and feature branch systematically!"
    ]
  },
  {
    id: "java",
    name: "Java",
    top: "27%",
    left: "70%",
    description: "Object-oriented design patterns, backend application development, and robust data structures.",
    dialogue: [
      "HOLD IT! That large eastern court hall proves strong Object-Oriented Programming!",
      "Java logic provides robust, enterprise-grade stability."
    ]
  },
  {
    id: "godot",
    name: "Game Development / Godot",
    top: "16%",
    left: "91%",
    description: "3D scene tree structures, gameplay mechanics, input systems, and interactive logic.",
    dialogue: [
      "TAKE THAT! The top-right room houses game mechanics and custom script logic!",
      "Interactive real-time systems are fully operational here!"
    ]
  },
  {
    id: "python",
    name: "Python",
    top: "52%",
    left: "24%",
    description: "Scripting efficiency, automated bots, data manipulation, and algorithmic problem solving.",
    dialogue: [
      "OBJECTION! The primary western wing is reserved for Python automation!",
      "From bot development to algorithmic efficiency, Python handles it seamlessly."
    ]
  },
  {
    id: "flowchart",
    name: "System Architecture",
    top: "68%",
    left: "50%",
    description: "Data flow planning, component hierarchy design, and algorithm diagramming.",
    dialogue: [
      "LOOK AT THIS! The central atrium maps system architecture!",
      "Clear flow diagrams and structured application hierarchy keep everything organized."
    ]
  },
  {
    id: "js",
    name: "JavaScript",
    top: "86%",
    left: "11%",
    description: "Modern ES6+ syntax, asynchronous JS, event loop handling, and web standards.",
    dialogue: [
      "TAKE THAT! Modern web applications start right here!",
      "Dynamic JavaScript DOM manipulation and async execution keep pages responsive."
    ]
  },
  {
    id: "next",
    name: "Next.js",
    top: "86%",
    left: "21%",
    description: "Server-side rendering (SSR), static site generation (SSG), and production web frameworking.",
    dialogue: [
      "OBJECTION! Full-stack web routing is handled right here in Next.js!",
      "Server-side rendering guarantees maximum performance and SEO readiness!"
    ]
  },
  {
    id: "react",
    name: "React",
    top: "86%",
    left: "33%",
    description: "Component-driven UI, state management hooks, and dynamic single-page applications.",
    dialogue: [
      "TAKE THAT! The React sector manages component lifecycles!",
      "Props flow and state-driven UI rendering keep interfaces completely fluid."
    ]
  },
  {
    id: "ts",
    name: "TypeScript",
    top: "82%",
    left: "67%",
    description: "Static typing, interface contracts, compile-time bug prevention, and scalable codebases.",
    dialogue: [
      "HOLD IT! Strong typing and static analysis eliminate runtime contradictions!",
      "Bugs are caught long before code ever hits production."
    ]
  },
  {
    id: "sql",
    name: "SQL & Databases",
    top: "82%",
    left: "91%",
    description: "Relational database schema design, structured query optimization, and data persistence.",
    dialogue: [
      "TAKE THAT! Structured database queries secure the entire backend infrastructure!",
      "Relational schemas ensure data integrity and persistence."
    ]
  }
];

// Testimony statements for Cross-Examination Mode
const testimonyStatements = [
  {
    id: 1,
    statement: "Statement 1: 'The developer claims that front-end interface logic has no impact on backend scalability.'",
    pressDialogue: [
      "HOLD IT! Front-end efficiency directly reduces payload size and API call frequencies!",
      "Optimized clients prevent server overload during peak demand!"
    ],
    witnessResponse: [
      "Hmph! That's just standard optimization talk. It proves nothing about my backend claims!"
    ],
    correctWitnessReaction: [
      "Urgh! N-no way... A streamlined client payload actually protects the server?!",
      "My entire architectural argument is falling apart!"
    ],
    wrongWitnessReaction: [
      "Ha! What a joke! That piece of evidence has absolutely nothing to do with API payloads or scalability!",
      "Are you just guessing blindly now, defense?"
    ],
    contradictoryItem: "badge"
  },
  {
    id: 2,
    statement: "Statement 2: 'All developer skillsets and room assignments on the floor plan are purely random without architectural layout.'",
    pressDialogue: [
      "HOLD IT! Look closely at the spatial arrangement!",
      "Low-level C, algorithms, and web frameworks are mapped systematically across the blueprint!"
    ],
    witnessResponse: [
      "W-what?! You actually inspected the layout? ...That was just a placeholder hypothesis!"
    ],
    correctWitnessReaction: [
      "Grrah! You spotted the structured zones on the blueprint!",
      "Every single room allocation was mathematically calculated!"
    ],
    wrongWitnessReaction: [
      "Bwahaha! You think *that* evidence disproves my random placement theory?",
      "Try looking at the actual blueprint, counselor!"
    ],
    contradictoryItem: "floor_plan"
  },
  {
    id: 3,
    statement: "Statement 3: 'This courtroom portfolio is merely a static web page with zero interactive React state or audio sync.'",
    pressDialogue: [
      "HOLD IT! TypeIt-React, Howler audio triggers, and custom state machines are actively running right now!",
      "This entire experience is dynamic from top to bottom!"
    ],
    witnessResponse: [
      "Tch! You caught me! The component architecture is completely operational!"
    ],
    correctWitnessReaction: [
      "Aieee! The component states, typewriters, and audio handlers have exposed me completely!",
      "It really is a fully dynamic interactive portfolio!"
    ],
    wrongWitnessReaction: [
      "Nice try, but that evidence doesn't prove anything about our React components or audio state!",
      "You'll need a better argument than that!"
    ],
    contradictoryItem: "thinker"
  }
];

// Evidence & Skills Data
const evidenceData = {
  evidence: [
    {
      id: "badge",
      title: "Programmer's Badge",
      image: "public/Evidence/badge.png",
      description: "My prized programmer's badge. It proves my credentials as a dedicated software and full-stack developer.",
      details: "Certified: Full-Stack & Systems Development\nStack: React, Node.js, C, Python, Java",
      viewUrl: "https://github.com",
      dialogue: [
        "Take a look at this programmer's badge!",
        "It proves my technical competence across multiple core engineering domains!",
        "Without it, I wouldn't even be standing at this defense bench!"
      ]
    },
    {
      id: "floor_plan",
      title: "Skill Map",
      icon: "🗺️",
      image: "public/Evidence/map.png",
      description: "Architectural blueprint mapping technical core competencies across low-level logic, backend systems, and frontend frameworks.",
      details: "Location: Courtroom Headquarters\nKey Areas: Low-Level, Game Logic, Web Stack, Databases",
      viewUrl: "https://github.com",
      dialogue: [
        "Look closely at this skill map!",
        "Click any room or icon on the blueprint to inspect its technical details!",
        "Every single sector represents a core engineering domain."
      ]
    },
    {
      id: "thinker",
      title: "Ace Portfolio",
      image: "public/Evidence/badge.png",
      description: "Interactive portfolio modeled after retro courtroom visual novels with custom dialogue engine.",
      details: "Engine: React + TypeIt + Howler.js\nDesign: Pixel-inspired UI",
      viewUrl: "https://github.com",
      dialogue: [
        "Notice the attention to detail!",
        "This dynamic courtroom portfolio is powered by React, custom typewriter logic, and Howler audio sync!"
      ]
    },
    {
      id: "research_paper",
      title: "Research Paper",
      icon: "📄",
      image: "public/Evidence/paper.png",
      description: "Comprehensive technical research documentation covering algorithms and advanced system design principles.",
      details: "Topic: Advanced Systems & Algorithmic Optimization\nStatus: Published & Verified",
      viewUrl: "https://github.com",
      dialogue: [
        "Behold this research paper!",
        "It details advanced computational strategies and rigorous data analysis."
      ]
    },
    {
      id: "undertale_game",
      title: "Undertale: Last Hope",
      icon: "⚔️",
      image: "public/Evidence/badge.png",
      description: "A fan-made sequel to Undertale Underdevelopment featuring custom battle mechanics and script logic.",
      details: "Project: Undertale: Last Hope\nEngine: Godot / Custom\nStatus: Active Development",
      viewUrl: "https://github.com",
      dialogue: [
        "Behold! 'Undertale: Last Hope'!",
        "A fan-made sequel crafted with custom mechanics and heartfelt dedication!"
      ]
    },
    {
      id: "japanese_cert",
      title: "Japanese Proficiency Certificate",
      icon: "🇯🇵",
      image: "public/Evidence/certificate.png",
      description: "Official certification recognizing structured language acquisition, vocabulary, kanji, and grammar study.",
      details: "Certification: JLPT N5 Certification\nFocus: Grammar, Kanji, Vocabulary, Basic Conversational Level",
      viewUrl: "public/Files/JLPT N5 Certificate.pdf",
      dialogue: [
        "Examine this certification!",
        "Rigorous language study, kanji mastery, and structured grammar practice are fully accounted for here."
      ]
    },
    {
      id: "cross_exam_doc",
      title: "Witness Testimony",
      icon: "⚖️",
      image: "public/Evidence/testimony.png",
      description: "Official witness statement transcript. Click the CHECK button while selecting this item to begin Cross-Examination mode.",
      details: "Document ID: WIT-2026\nStatus: Ready for Cross-Examination",
      viewUrl: "https://github.com",
      dialogue: [
        "Cross-examination document presented!",
        "We are now entering Cross-Examination mode.",
        "Review statements and present contradictory evidence to expose the truth!"
      ],
      triggersCrossExam: true
    },
    null
  ],
  skills: [
    {
      id: "react",
      title: "React & Modern Frontend",
      icon: "REACT",
      description: "Proficient in building interactive single-page applications with clean component architecture and hooks.",
      details: "Core: React, JavaScript (ES6+), JSX\nStyling: Tailwind CSS, CSS Modules",
      viewUrl: "https://github.com",
      dialogue: [
        "React is my primary frontend weapon!",
        "I structure component states and dynamic interfaces with absolute precision."
      ]
    },
    {
      id: "node",
      title: "Node.js & Express API",
      icon: "NODE",
      description: "Experienced in constructing RESTful backend services, routing, and database integrations.",
      details: "Backend: Express, Node.js\nDatabase: MongoDB / Mongoose",
      viewUrl: "https://github.com",
      dialogue: [
        "Backend architecture is all about stability!",
        "I build reliable Express REST APIs and asynchronous pipeline logic."
      ]
    },
    {
      id: "tools",
      title: "Developer Tooling",
      icon: "TOOL",
      description: "Daily workflow tools and version control systems for production deployment.",
      details: "Tools: Git, GitHub, VS Code, Postman\nDeployment: Vercel, GitHub Pages",
      viewUrl: "https://github.com",
      dialogue: [
        "Clean version control and efficient developer tooling keep production bugs to a minimum!"
      ]
    },
    null, null, null, null, null
  ]
};

// HELPER TO RENDER ITEM ICON OR IMAGE
function RenderItemMedia({ item, sizeClass = "w-8 h-8", textFallback = "❓" }) {
  if (item?.image) {
    return (
      <img
        src={item.image}
        alt={item.title || "Evidence"}
        className={`${sizeClass} object-contain inline-block drop-shadow-md select-none`}
      />
    );
  }
  return <span className="text-xl">{item?.icon || textFallback}</span>;
}

// COURT RECORD COMPONENT
function AceAttorneyCourtRecord({ playSelect, sectionRef, onCheck, isInCourtRecord, setIsInCourtRecord, selectedItem, setSelectedItem }) {
  const [activeTab, setActiveTab] = useState("evidence");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentItems = evidenceData[activeTab];

  useEffect(() => {
    const item = currentItems[selectedIndex] || currentItems[0];
    setSelectedItem(item);
  }, [activeTab, selectedIndex, setSelectedItem]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInCourtRecord(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionRef, setIsInCourtRecord]);

  const handleTabToggle = () => {
    if (playSelect) playSelect();
    const nextTab = activeTab === "evidence" ? "skills" : "evidence";
    setActiveTab(nextTab);
    const firstValidIdx = evidenceData[nextTab].findIndex((item) => item !== null);
    setSelectedIndex(firstValidIdx !== -1 ? firstValidIdx : 0);
  };

  const handleSelectSlot = (idx) => {
    const item = currentItems[idx];
    if (!item) return;
    if (playSelect) playSelect();
    setSelectedIndex(idx);
  };

  const handleCheckItem = () => {
    if (!selectedItem || !isInCourtRecord) return;
    if (playSelect) playSelect();
    if (onCheck) onCheck(selectedItem);
  };

  const findNextValidIndex = (currentIndex, direction) => {
    let len = currentItems.length;
    let nextIdx = currentIndex;
    for (let i = 0; i < len; i++) {
      nextIdx = (nextIdx + direction + len) % len;
      if (currentItems[nextIdx] !== null) {
        return nextIdx;
      }
    }
    return currentIndex;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isTyping = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
      if (isTyping) return;

      if ((e.key === "e" || e.key === "E") && isInCourtRecord) {
        handleCheckItem();
      }

      if ((e.key === "w" || e.key === "W") && isInCourtRecord) {
        e.preventDefault();
        handleTabToggle();
      }

      if (isInCourtRecord) {
        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
          e.preventDefault();
          const nextIdx = findNextValidIndex(selectedIndex, -1);
          setSelectedIndex(nextIdx);
          if (playSelect) playSelect();
        } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
          e.preventDefault();
          const nextIdx = findNextValidIndex(selectedIndex, 1);
          setSelectedIndex(nextIdx);
          if (playSelect) playSelect();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, playSelect, onCheck, isInCourtRecord, currentItems, selectedIndex, activeTab]);

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
            className="flex items-center gap-2 font-aceUi text-sm md:text-base font-bold px-6 py-2 rounded border shadow-md transition-all bg-cyan-700 hover:bg-cyan-600 active:scale-95 text-white border-cyan-400 cursor-pointer"
          >
            <span className="hidden sm:inline-block bg-cyan-950 text-cyan-200 px-1.5 py-0.5 rounded text-xs border border-cyan-600 font-aceDialogue">
              W
            </span>
            {activeTab === "evidence" ? "Profiles" : "Evidence"}
          </button>
        </div>

        <div className="p-5 md:p-8 bg-white border-2 border-cyan-500 m-3 rounded-md shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-200 border-2 border-slate-400 rounded-lg flex items-center justify-center p-6 h-56 md:h-64 shadow-inner">
              <span className="select-none flex items-center justify-center">
                <RenderItemMedia item={selectedItem} sizeClass="w-40 h-40 md:w-52 md:h-52" />
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
                  {selectedItem?.description || "No inventory item recorded in this slot."}
                </p>
                {selectedItem?.details && (
                  <p className="border-b border-dashed border-slate-300 pb-2 text-slate-600 text-base md:text-lg font-aceDialogue whitespace-pre-line tracking-wider">
                    {selectedItem.details}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-2.5 bg-cyan-900/90 p-4 rounded-lg border-2 border-cyan-600 shadow-inner">
            {currentItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectSlot(idx)}
                  className={`aspect-square rounded border-2 relative flex items-center justify-center transition-all ${
                    item ? "hover:bg-cyan-800/80 cursor-pointer" : "opacity-40 cursor-default"
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

                  <span className="select-none flex items-center justify-center">
                    <RenderItemMedia item={item} sizeClass="w-10 h-10 md:w-12 md:h-12" textFallback="" />
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-4 mt-5">
            {isInCourtRecord && activeTab === "evidence" && selectedIndex >= 2 && selectedIndex <= 5 && selectedItem && (
              <a
                href={selectedItem?.viewUrl || "https://github.com"}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSelect && playSelect()}
                className="flex items-center gap-2 font-aceUi text-sm md:text-base font-bold px-6 py-2 rounded border shadow-md transition-all bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white border-emerald-400 cursor-pointer"
              >
                VIEW
              </a>
            )}

            <button
              onClick={handleCheckItem}
              disabled={!isInCourtRecord || !selectedItem}
              className={`flex items-center gap-2 font-aceUi text-sm md:text-base font-bold px-6 py-2 rounded border shadow-md transition-all ${
                isInCourtRecord && selectedItem
                  ? "bg-cyan-700 hover:bg-cyan-600 active:scale-95 text-white border-cyan-400 cursor-pointer"
                  : "bg-slate-500 text-slate-300 border-slate-400 cursor-not-allowed opacity-50"
              }`}
            >
              <span className="hidden sm:inline-block bg-cyan-950 text-cyan-200 px-1.5 py-0.5 rounded text-xs border border-cyan-600 font-aceDialogue">
                E
              </span>
              CHECK
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// MAP INSPECTOR & CROSS-EXAMINATION SECTION
function EvidenceMapInspector({ 
  sectionRef, 
  isMapChecked, 
  isCrossExamActive, 
  onNodeSelect, 
  onMapMiss, 
  activeNodeId,
  isMuted,
  onPressStatement,
  statementIndex,
  setStatementIndex,
  setIsCrossExamInView,
  isMapDialogueActive,
  setIsMapDialogueActive
}) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [clickedHotspots, setClickedHotspots] = useState({});
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInsideMap, setIsInsideMap] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCrossExamInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionRef, setIsCrossExamInView, isCrossExamActive]);

  if (!isMapChecked && !isCrossExamActive) return null;

  const activeNode = mapNodes.find((n) => n.id === activeNodeId) || null;
  const currentStatement = testimonyStatements[statementIndex];

  const handleNextStatement = () => {
    setStatementIndex((prev) => (prev + 1) % testimonyStatements.length);
  };

  const handlePrevStatement = () => {
    setStatementIndex((prev) => (prev - 1 + testimonyStatements.length) % testimonyStatements.length);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getCustomSpriteSrc = () => {
    if (isMouseDown) {
      if (hoveredNodeId && clickedHotspots[hoveredNodeId]) {
        return "public/sprites/search/yellow_ticked.png";
      }
      return "public/sprites/search/yellow.png";
    }

    if (hoveredNodeId && clickedHotspots[hoveredNodeId]) {
      return "public/sprites/search/blue_ticked.png";
    }
    return "/sprites/search/blue.png";
  };

  return (
    <section
      ref={sectionRef}
      id="map-inspector"
      className="w-full max-w-6xl mx-auto my-8 px-4 relative z-10 font-aceUi scroll-mt-6 animate-[fadeIn_0.35s_ease-in-out]"
    >
      {isMapChecked && !isCrossExamActive && (
        <div className="w-full bg-slate-900 border-4 border-amber-500 rounded-xl p-6 shadow-[0_10px_35px_rgba(0,0,0,0.9)] text-white">
          <div className="flex items-center justify-between border-b-2 border-amber-500/40 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-amber-400 tracking-wide uppercase">
                  EXHIBIT B: SKILL MAP
                </h3>
                <p className="text-xs md:text-sm font-mono text-slate-400">
                  INSPECT SPECIFIC ROOMS OR LOGOS ON THE BLUEPRINT TO PRESENT TECHNICAL EVIDENCE
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block bg-amber-500/10 border-amber-500/40 text-amber-300 border font-mono text-xs px-3 py-1 rounded uppercase">
              {isMapDialogueActive ? "STATUS: ACTIVE DIALOGUE" : "MODE: INVESTIGATION"}
            </span>
          </div>

          <div 
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsInsideMap(true)}
            onMouseLeave={() => {
              setIsInsideMap(false);
              setIsMouseDown(false);
              setHoveredNodeId(null);
            }}
            onMouseDown={() => {
              if (!isMapDialogueActive) setIsMouseDown(true);
            }}
            onMouseUp={() => setIsMouseDown(false)}
            onClick={() => {
              if (!isMapDialogueActive) onMapMiss();
            }}
            style={{ cursor: isMapDialogueActive ? 'not-allowed' : 'none' }}
            className={`relative w-full bg-black rounded-lg border-2 border-slate-700 p-1 overflow-hidden shadow-inner flex items-center justify-center select-none ${
              isMapDialogueActive ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            <img
              src="public/floor_plan.png"
              alt="Technical Floor Plan Blueprint"
              className="w-full h-auto object-contain rounded select-none pointer-events-none"
            />

            {!isMapDialogueActive && mapNodes.map((node) => (
              <button
                key={node.id}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setClickedHotspots((prev) => ({ ...prev, [node.id]: true }));
                  onNodeSelect(node);
                }}
                style={{ top: node.top, left: node.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-0 cursor-none z-10 outline-none border-none"
              />
            ))}

            {isInsideMap && !isMapDialogueActive && (
              <div
                className="absolute pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                }}
              >
                <img
                  src={getCustomSpriteSrc()}
                  alt="Custom Cursor"
                  className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none"
                />
              </div>
            )}
          </div>

          <div className="mt-4 bg-slate-950/90 border border-slate-800 p-4 rounded-lg flex items-start gap-4">
            <div>
              <h4 className="text-lg font-black text-amber-400 uppercase tracking-wide">
                {activeNode ? activeNode.name : "Select a Room on the Blueprint"}
              </h4>
              <p className="text-sm md:text-base text-slate-300 font-aceDialogue leading-relaxed mt-1">
                {activeNode
                  ? activeNode.description
                  : "Click directly on any room or skill logo on the map above to present technical details."}
              </p>
            </div>
          </div>
        </div>
      )}

      {isCrossExamActive && !isMapChecked && (
        <div className="w-full bg-slate-950/95 border-2 border-green-500/80 rounded-xl p-6 md:p-8 relative min-h-[220px] shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex flex-col justify-between backdrop-blur-md font-aceUi">
          <div className="absolute -top-4 left-6 md:left-12 bg-green-600 border-2 border-green-300 text-white font-aceUi text-sm md:text-base font-bold px-6 py-0.5 shadow-md flex items-center justify-center [clip-path:polygon(10%_0%,_90%_0%,_100%_50%,_90%_100%,_10%_100%,_0%_50%)] z-40 uppercase tracking-wider">
            CROSS-EXAMINATION: WITNESS TESTIMONY
          </div>

          <div className="flex items-center justify-between border-b border-green-700/50 pb-2 mt-2">
            <span className="text-xs font-mono font-bold text-green-300 tracking-wider">
              WITNESS TESTIMONY STATEMENT {statementIndex + 1} OF {testimonyStatements.length}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevStatement}
                className="p-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                title="Previous Statement"
              >
                <img src="public/sprites/select_arrow.png" alt="Previous" className="w-7 h-7 object-contain drop-shadow" />
              </button>
              <button
                onClick={handleNextStatement}
                className="p-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                title="Next Statement"
              >
                <img src="public/sprites/select_arrow.png" alt="Next" className="w-7 h-7 object-contain drop-shadow scale-x-[-1]" />
              </button>
            </div>
          </div>

          <div className="my-4 text-xl md:text-2xl font-aceDialogue text-green-400 tracking-wider leading-relaxed min-h-[60px]">
            <TypeIt
              key={statementIndex}
              options={{ speed: 15, waitUntilVisible: true, cursor: false }}
              getBeforeInit={(instance) => {
                instance.type(currentStatement.statement);
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

          <div className="w-full flex items-center justify-end border-t border-slate-700/50 pt-3">
            <button
              onClick={() => onPressStatement(currentStatement)}
              className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-wider rounded border border-amber-600 shadow transition-transform active:scale-95 cursor-pointer"
            >
              HOLD IT! (PRESS)
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// LAWYER HIRING FORM
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
        onHoldIt([
          "Hold it! Please fill in your name, email, and project message before sending!",
          "An incomplete inquiry form cannot be processed by the defense bench!"
        ], "Phoenix");
      }
      return;
    }
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="hiring-contract" className="w-full max-w-4xl mx-auto my-16 mb-48 relative z-10 px-4 scroll-mt-6">
      <div className="w-32 h-8 bg-slate-700 border-2 border-slate-900 mx-auto rounded-t-lg flex items-center justify-center shadow-md relative z-20">
        <div className="w-16 h-3 bg-slate-400 rounded-full border border-slate-600"></div>
      </div>
      <div className="w-full bg-[#fdfbf7] text-slate-900 border-2 border-amber-900/40 rounded-b-sm rounded-t-sm p-6 md:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden font-sans">
        {submitted && (
          <div className="absolute top-8 right-6 border-4 border-emerald-600 border-dashed rounded-lg px-4 py-2 font-mono text-xl md:text-2xl font-black uppercase text-emerald-700 bg-emerald-50/90 pointer-events-none z-30 animate-[stampPop_0.35s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
            VERDICT: CONNECTED!
          </div>
        )}
        <div className="border-b-2 border-slate-800/20 pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-800 font-bold uppercase">
            <img src="public/Evidence/badge.png" alt="Badge Icon" className="w-4 h-4 object-contain inline-block" />
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
            <h3 className="text-2xl font-black text-emerald-950 uppercase tracking-wide">Message Sent!</h3>
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

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                3. WHAT ARE WE LOOKING TO DO?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["LETS WORK TOGETHER!", "JUST SAYING HELLO"].map((option) => (
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

            <div className="pt-6 border-t border-slate-300 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div className="w-full md:w-1/2">
                <div className="border-b border-slate-800 pb-1 font-serif italic text-slate-700 text-lg min-h-[32px]">
                  {formData.clientName || "Your Name"}
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase mt-1">SENDER SIGNATURE</div>
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
  
  const [selectedItem, setSelectedItem] = useState(evidenceData.evidence[0]);
  
  const [isMapChecked, setIsMapChecked] = useState(false);
  const [isCrossExamActive, setIsCrossExamActive] = useState(false);
  const [isCrossExamInView, setIsCrossExamInView] = useState(false);
  const [activeMapNodeId, setActiveMapNodeId] = useState(null);
  const [statementIndex, setStatementIndex] = useState(0);
  const [pendingCrossExamActivation, setPendingCrossExamActivation] = useState(false);
  const [isMapDialogueActive, setIsMapDialogueActive] = useState(false);

  const [showTakeThat, setShowTakeThat] = useState(false);
  const [showHoldIt, setShowHoldIt] = useState(false);
  const [showObjection, setShowObjection] = useState(false);
  
  const [imgTakeThatError, setImgTakeThatError] = useState(false);
  const [imgHoldItError, setImgHoldItError] = useState(false);
  const [imgObjectionError, setImgObjectionError] = useState(false);
  const [imgRightCharError, setImgRightCharError] = useState(false);

  const [isInCourtRecord, setIsInCourtRecord] = useState(false);
  
  const [dialogueQueue, setDialogueQueue] = useState([
    "Junior Full-Stack Developer & Web Dev Enthusiast building modern applications with PRECISION and DEDICATION."
  ]);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [activeSpeaker, setActiveSpeaker] = useState("Phoenix");

  const courtRecordRef = useRef(null);
  const hiringFormRef = useRef(null);
  const mapInspectorRef = useRef(null);

  const triggerDialogue = (dialogueData, speaker = "Phoenix", activateCrossExamOnFinish = false, customWitnessReaction = null) => {
    const lines = Array.isArray(dialogueData) ? dialogueData : [dialogueData];
    setDialogueQueue(lines);
    setDialogueIndex(0);
    setActiveSpeaker(speaker);
    setPendingCrossExamActivation(activateCrossExamOnFinish);
    if (customWitnessReaction) {
      setPendingWitnessResponse(customWitnessReaction);
    }
    setKeyCounter((prev) => prev + 1);
  };

  const currentText = dialogueQueue[dialogueIndex] || "Select an item to inspect.";
  const hasNextLine = dialogueIndex < dialogueQueue.length - 1;

  const scrollToCourtRecord = () => {
    if (!isMuted) selectSound.play();
    courtRecordRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHiringForm = () => {
    if (!isMuted) selectSound.play();
    hiringFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCheck = (item) => {
    setShowTakeThat(true);

    setTimeout(() => {
      setShowTakeThat(false);

      if (item.dialogue) {
        triggerDialogue(item.dialogue, "Phoenix", !!item.triggersCrossExam);
      }

      if (item.id === "floor_plan") {
        setIsMapChecked(true);
        setIsCrossExamActive(false);
        setPendingCrossExamActivation(false);
        setTimeout(() => {
          mapInspectorRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else if (item.id === "cross_exam_doc") {
        setIsMapChecked(false);
      }
    }, 900);
  };

  const handleNodeSelect = (node) => {
    if (!isMuted) selectSound.play();
    setActiveMapNodeId(node.id);
    setIsMapDialogueActive(true);
    setShowTakeThat(true);

    setTimeout(() => {
      setShowTakeThat(false);
      triggerDialogue(node.dialogue, "Phoenix");
    }, 600);
  };

  const handleMapMiss = () => {
    setIsMapDialogueActive(true);
    setShowTakeThat(true);

    setTimeout(() => {
      setShowTakeThat(false);
      triggerDialogue([
        "TAKE THAT!",
        "...Wait, that location doesn't show any conclusive technical evidence.",
        "Try pointing closer to one of the key rooms or skill logos!"
      ], "Phoenix");
    }, 800);
  };

  const handleHoldIt = (warningMessage, speakerName = "Phoenix") => {
    setShowHoldIt(true);

    setTimeout(() => {
      setShowHoldIt(false);
      if (warningMessage) {
        triggerDialogue(warningMessage, speakerName);
      }
    }, 900);
  };

  const [pendingWitnessResponse, setPendingWitnessResponse] = useState(null);

  const triggerPressSequence = (statement) => {
    setShowHoldIt(true);

    setTimeout(() => {
      setShowHoldIt(false);
      const phoenixLines = Array.isArray(statement.pressDialogue) ? statement.pressDialogue : [statement.pressDialogue];
      const xineLines = Array.isArray(statement.witnessResponse) ? statement.witnessResponse : [statement.witnessResponse];

      setPendingWitnessResponse(xineLines);
      triggerDialogue(phoenixLines, "Phoenix");
    }, 900);
  };

  const handleNextDialogueWithWitness = () => {
    if (dialogueIndex < dialogueQueue.length - 1) {
      if (!isMuted) selectSound.play();
      setDialogueIndex((prev) => prev + 1);
      setKeyCounter((prev) => prev + 1);
    } else if (pendingWitnessResponse) {
      if (!isMuted) selectSound.play();
      const xineLines = pendingWitnessResponse;
      setPendingWitnessResponse(null);
      triggerDialogue(xineLines, "Xine Ohp");
    } else if (pendingCrossExamActivation) {
      if (!isMuted) selectSound.play();
      setPendingCrossExamActivation(false);
      setIsCrossExamActive(true);
      setTimeout(() => {
        mapInspectorRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      setIsMapDialogueActive(false);
    }
  };

  const handlePresentEvidence = (statement) => {
    if (!isCrossExamActive) return;

    const targetStatement = statement || testimonyStatements[statementIndex];
    if (!targetStatement) return;

    setShowObjection(true);

    setTimeout(() => {
      setShowObjection(false);
      if (selectedItem?.id === targetStatement.contradictoryItem) {
        const correctReaction = Array.isArray(targetStatement.correctWitnessReaction)
          ? targetStatement.correctWitnessReaction
          : [targetStatement.correctWitnessReaction];

        triggerDialogue([
          `OBJECTION! ${selectedItem.title} directly contradicts this statement!`,
          "The evidence clearly proves otherwise!"
        ], "Phoenix", false, correctReaction);
      } else {
        const wrongReaction = Array.isArray(targetStatement.wrongWitnessReaction)
          ? targetStatement.wrongWitnessReaction
          : [targetStatement.wrongWitnessReaction];

        triggerDialogue([
          `OBJECTION!`,
          `...Hmm, presenting ${selectedItem?.title || "this evidence"} doesn't seem to contradict this specific statement.`,
          "Re-check the evidence!"
        ], "Phoenix", false, wrongReaction);
      }
    }, 900);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isTyping = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
      if (isTyping) return;

      if (e.key === "q" || e.key === "Q") {
        scrollToCourtRecord();
      }

      if ((e.key === "r" || e.key === "R") && isCrossExamActive) {
        handlePresentEvidence(testimonyStatements[statementIndex]);
      }

      if (e.key === " " || e.key === "Enter") {
        if (hasNextLine || pendingWitnessResponse || pendingCrossExamActivation || isMapDialogueActive) {
          e.preventDefault();
          handleNextDialogueWithWitness();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMuted, isCrossExamActive, statementIndex, selectedItem, hasNextLine, dialogueIndex, dialogueQueue, pendingWitnessResponse, pendingCrossExamActivation, isMapDialogueActive]);

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
      {showTakeThat && (
        <div className="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center pointer-events-none overflow-hidden">
          {!imgTakeThatError ? (
            <img
              src="public/Interjections/take_that.png"
              alt="TAKE THAT!"
              onError={() => setImgTakeThatError(true)}
              className="w-full h-full object-contain select-none animate-[courtShoutSharp_0.25s_steps(4,end)_forwards]"
            />
          ) : (
            <div className="animate-[courtShoutSharp_0.25s_steps(4,end)_forwards] text-center">
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black italic tracking-tighter text-amber-400 bg-red-600 px-8 py-4 md:px-12 md:py-6 border-[8px] md:border-[12px] border-yellow-300 -rotate-6 transform">
                TAKE THAT!
              </h1>
            </div>
          )}
        </div>
      )}

      {showHoldIt && (
        <div className="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center pointer-events-none overflow-hidden">
          {!imgHoldItError ? (
            <img
              src="public/Interjections/hold_it.png"
              alt="HOLD IT!"
              onError={() => setImgHoldItError(true)}
              className="w-full h-full object-contain select-none animate-[courtShoutSharp_0.25s_steps(4,end)_forwards]"
            />
          ) : (
            <div className="animate-[courtShoutSharp_0.25s_steps(4,end)_forwards] text-center">
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black italic tracking-tighter text-amber-300 bg-blue-700 px-8 py-4 md:px-12 md:py-6 border-[8px] md:border-[12px] border-cyan-300 -rotate-3 transform">
                HOLD IT!
              </h1>
            </div>
          )}
        </div>
      )}

      {showObjection && (
        <div className="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center pointer-events-none overflow-hidden">
          {!imgObjectionError ? (
            <img
              src="public/Interjections/objection.png"
              alt="OBJECTION!"
              onError={() => setImgObjectionError(true)}
              className="w-full h-full object-contain select-none animate-[courtShoutSharp_0.25s_steps(4,end)_forwards]"
            />
          ) : (
            <div className="animate-[courtShoutSharp_0.25s_steps(4,end)_forwards] text-center">
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black italic tracking-tighter text-white bg-red-700 px-8 py-4 md:px-12 md:py-6 border-[8px] md:border-[12px] border-amber-400 -rotate-6 transform">
                OBJECTION!
              </h1>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes courtShoutSharp {
          0% { transform: scale(1.5) rotate(-8deg); opacity: 0; }
          33% { transform: scale(0.95) rotate(3deg); opacity: 1; }
          66% { transform: scale(1.05) rotate(-1deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header className="w-full flex items-center justify-between border-b border-cyan-500/30 pb-4 z-20">
        <div className="flex items-center gap-2 font-black text-amber-400 tracking-wider text-base md:text-lg">
          <img src="public/Evidence/badge.png" alt="Badge Logo" className="w-6 h-6 object-contain inline-block drop-shadow" />
          <span>DEFENSE</span>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-sm font-black tracking-widest text-slate-300">
          <a href="#home" className="hover:text-amber-400 transition-colors text-amber-400">HOME</a>
          <button onClick={scrollToCourtRecord} className="hover:text-amber-400 transition-colors uppercase font-black cursor-pointer">
            COURT RECORD
          </button>
          <button onClick={scrollToHiringForm} className="hover:text-amber-400 transition-colors uppercase font-black cursor-pointer">
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
              <a href="https://github.com/SKA-2007" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-800 hover:text-amber-400 transition-colors">
                <span>📦</span> Github
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-800 hover:text-amber-400 transition-colors">
                <span>💼</span> Linkedin
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-800 hover:text-amber-400 transition-colors">
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

      <AceAttorneyCourtRecord 
        sectionRef={courtRecordRef} 
        playSelect={() => !isMuted && selectSound.play()} 
        onCheck={handleCheck}
        isInCourtRecord={isInCourtRecord}
        setIsInCourtRecord={setIsInCourtRecord}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <EvidenceMapInspector
        sectionRef={mapInspectorRef}
        isMapChecked={isMapChecked}
        isCrossExamActive={isCrossExamActive}
        onNodeSelect={handleNodeSelect}
        onMapMiss={handleMapMiss}
        activeNodeId={activeMapNodeId}
        isMuted={isMuted}
        onPressStatement={triggerPressSequence}
        statementIndex={statementIndex}
        setStatementIndex={setStatementIndex}
        setIsCrossExamInView={setIsCrossExamInView}
        isMapDialogueActive={isMapDialogueActive}
        setIsMapDialogueActive={setIsMapDialogueActive}
      />

      <LawyerHiringForm onHoldIt={handleHoldIt} sectionRef={hiringFormRef} />

      <div className={`fixed bottom-[140px] md:bottom-[160px] left-2 md:left-12 h-52 sm:h-64 md:h-80 lg:h-96 z-20 pointer-events-none flex items-end transition-opacity duration-300 ${showCharacter ? "opacity-100" : "opacity-0"}`}>
        <img src="public/Sprites/character.png" alt="Phoenix Wright" className="h-full w-auto object-contain object-bottom drop-shadow-[0_12px_15px_rgba(0,0,0,0.8)]" />
      </div>

      <div className={`fixed bottom-[140px] md:bottom-[160px] right-2 md:right-12 h-52 sm:h-64 md:h-80 lg:h-96 z-20 pointer-events-none flex items-end transition-opacity duration-300 ${isCrossExamActive && isCrossExamInView ? "opacity-100" : "opacity-0"}`}>
        <img 
          src={imgRightCharError ? "public/Sprites/character.png" : "public/Sprites/character_right.png"} 
          alt="Xine Ohp" 
          onError={() => setImgRightCharError(true)}
          className="h-full w-auto object-contain object-bottom drop-shadow-[0_12px_15px_rgba(0,0,0,0.8)] -scale-x-100"
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full z-50 px-2 md:px-6">
        <div 
          onClick={() => {
            if (hasNextLine || pendingWitnessResponse || pendingCrossExamActivation || isMapDialogueActive) {
              handleNextDialogueWithWitness();
            }
          }}
          className="w-full bg-slate-950/95 border-t-2 border-cyan-500/50 p-6 md:p-8 relative min-h-[160px] shadow-2xl flex flex-col justify-between backdrop-blur-md cursor-pointer select-none"
        >
          <div className={`absolute -top-4 left-6 md:left-12 border-2 text-white font-aceUi text-sm md:text-base font-bold px-6 py-0.5 shadow-md flex items-center justify-center [clip-path:polygon(10%_0%,_90%_0%,_100%_50%,_90%_100%,_10%_100%,_0%_50%)] z-40 ${
            activeSpeaker === "Xine Ohp" ? "bg-red-700 border-red-300" : "bg-cyan-600 border-cyan-300"
          }`}>
            {activeSpeaker}
          </div>

          <div className="mt-2 text-2xl md:text-3xl font-aceDialogue text-slate-100 tracking-wider leading-relaxed">
            <TypeIt
              key={`${keyCounter}-${dialogueIndex}`}
              options={{ speed: 15, waitUntilVisible: true, cursor: false }}
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

          <div className="w-full flex items-center justify-end gap-4 border-t border-slate-700/50 pt-2 mt-4 min-h-[40px]">
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
                COURT RECORD
              </button>
            )}

            {isCrossExamActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePresentEvidence(testimonyStatements[statementIndex]);
                }}
                className="flex items-center gap-2 px-4 py-1.5 bg-red-800/90 hover:bg-red-700 border border-red-500/70 rounded text-white text-xs md:text-sm font-bold tracking-wider transition-all shadow cursor-pointer active:scale-95 animate-[fadeIn_0.2s_ease-in-out]"
              >
                <span className="hidden sm:inline-block bg-red-950 text-red-200 px-1.5 py-0.5 rounded text-xs border border-red-600 font-aceDialogue">
                  R
                </span>
                PRESENT
              </button>
            )}

            {(hasNextLine || pendingWitnessResponse || pendingCrossExamActivation || isMapDialogueActive) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextDialogueWithWitness();
                }}
                className="p-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer animate-[fadeIn_0.2s_ease-in-out]"
                title="Next Line"
              >
                <img src="public/sprites/select_arrow.png" alt="Next Arrow" className="w-8 h-8 object-contain drop-shadow scale-x-[-1] animate-pulse" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
