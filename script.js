const projectData = [
  { 
    title: "Anatomical Gore v2", 
    desc: "A modular R15 system utilizing custom skinned meshes and procedural blood displacement.", 
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    code: `<span class="cm">-- Server Side Damage</span>\n<span class="kw">local</span> injury <span class="op">=</span> <span class="fn">GoreHandler.new</span>(hit)\ninjury:<span class="fn">ApplyDamage</span>(<span class="str">"Piercing"</span>)`
  },
  { 
    title: "Chess Engine Core", 
    desc: "Optimized state management with FEN notation and multiplayer sync protocols.", 
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    code: null 
  }
];

const container = document.getElementById("projects");
projectData.forEach((p, i) => {
  const isRev = i % 2 === 1;
  const project = document.createElement("div");
  project.className = `project fade-in ${isRev ? 'reverse' : ''}`;
  
  const codeHtml = p.code ? `
    <div class="code-window">
      <div class="window-header">
        <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
      </div>
      <pre><code>${p.code}</code></pre>
    </div>` : '';

  project.innerHTML = `
    <div class="media"><video src="${p.video}" autoplay muted loop playsinline></video></div>
    <div class="content">
        <div class="project-header">
          <h3>${p.title}</h3>
        </div>
        <p>${p.desc}</p>
        ${codeHtml}
    </div>
  `;
  container.appendChild(project);
  
  // Add click handler for expand/collapse (click anywhere on the card)
  project.addEventListener('click', () => {
    project.classList.toggle('expanded');
  });
});

const obs = new IntersectionObserver((es) => es.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); }), {threshold:0.1});
document.querySelectorAll(".fade-in").forEach(el => obs.observe(el));
