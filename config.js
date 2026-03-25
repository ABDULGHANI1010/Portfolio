const projectData = [
  { 
    title: "Anatomical Gore v2", 
    desc: "A modular R15 system utilizing custom skinned meshes and procedural blood displacement. Supports accessories, gore stacking, limb displacement, and drag mechanics.", 
    video: "videos/anatomicgore.mp4",
    code: `-- Server Side Gore
local gore = require(ServerStorage.GoreModule)
gore:replaceBodyPart(char, "Head", "HeadExplosionMesh")`
  },
  { 
    title: "Rock Formations", 
    desc: "A rock arch and stacked boulder assets with smooth normal-mapped surfaces, arranged on a flat desert terrain with realistic PBR texturing.", 
    video: "videos/rockformation.mp4",
    code: null 
  },
  { 
    title: "Telegames v2", 
    desc: "I built the maps for Telegames which is meant to be a stage performance game.", 
    video: "videos/telegames.mp4",
    code: null 
  },
  { 
    title: "Universal UI", 
    desc: "Due to the strange nature of requests, I was hired to work on a universal UI script.", 
    video: "videos/universalui.mp4",
    code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/ABDULGHANI1010/UNIVERSALUI/refs/heads/main/Main.lua"))()`
  },

];

const faqData = [
  {
    question: "What programming languages do you specialize in?",
    answer: "I primarily work with Luau (Roblox's scripting language)."
  },
  {
    question: "How long have you been developing on Roblox?",
    answer: "I have over 4 years of experience in Roblox development, specializing in optimized Luau scripting, scalable server-client architecture, and polished UI/UX design, and 3D modelling of several styles."
  },
  {
    question: "What types of games have you created?",
    answer: "I've worked on a variety of game types including combat systems, RPGs, simulation games, and social experiences. My focus is on creating optimized, scalable systems that perform well even with large player counts."
  },
  {
    question: "Do you offer commission work?",
    answer: "Yes, I'm available for commission work! I can handle everything from single script commissions to full game development. Feel free to reach out via Discord to discuss your project requirements."
  },
  {
    question: "What is your workflow process?",
    answer: "My typical workflow involves: 1) Initial consultation to understand your vision, 2) Planning and documentation, 3) Development with regular progress updates, 4) Testing and optimization, 5) Final delivery with support."
  },
  {
    question: "Can you work with existing codebases?",
    answer: "Absolutely! I have experience working with and improving existing codebases. I can audit your current systems, identify issues, and implement fixes or enhancements as needed."
  },
  {
    question: "What platforms do you develop for?",
    answer: "I primarily develop for PC and Mobile platforms on Roblox. I ensure all my projects are optimized for both platforms with responsive design and touch controls where appropriate."
  },
  {
    question: "Do you provide documentation with your work?",
    answer: "Yes, I provide comprehensive documentation with all my projects, including code comments, API references, and setup guides to make it easy for you to understand and maintain the systems."
  }
];
