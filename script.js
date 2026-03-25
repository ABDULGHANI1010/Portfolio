// Luau/Roblox Syntax Highlighter
function highlightLuau(code) {
  // Escape HTML first
  let result = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Tokenize to avoid nested replacements
  const tokens = [];
  let current = 0;
  
  const patterns = [
    { regex: /--[^\n]*/g, type: 'cm' },
    { regex: /"(?:[^"\\]|\\.)*"/g, type: 'str' },
    { regex: /'(?:[^'\\]|\\.)*'/g, type: 'str' },
    { regex: /\b(local|function|end|if|then|else|elseif|for|while|do|return|break|repeat|until|and|or|not|in|true|false|nil)\b/g, type: 'kw' },
    { regex: /\b(print|require|wait|spawn|delay|tick|pcall|ypcall|error|warn|setmetatable|getmetatable|next|pairs|ipairs|type|typeof)\b/gi, type: 'fn' },
    { regex: /\b\d+\.?\d*\b/g, type: 'num' },
    { regex: /[+\-*/%=<>~:]/g, type: 'op' },
    { regex: /\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()/g, type: 'fn' }
  ];
  
  // Find all matches with their positions
  const allMatches = [];
  patterns.forEach(({ regex, type }) => {
    let match;
    const r = new RegExp(regex.source, regex.flags);
    while ((match = r.exec(result)) !== null) {
      allMatches.push({ start: match.index, end: match.index + match[0].length, text: match[0], type });
    }
  });
  
  // Sort by position and remove overlapping matches
  allMatches.sort((a, b) => a.start - b.start);
  const filteredMatches = [];
  let lastEnd = 0;
  for (const m of allMatches) {
    if (m.start >= lastEnd) {
      filteredMatches.push(m);
      lastEnd = m.end;
    }
  }
  
  // Build highlighted string
  let highlighted = '';
  let pos = 0;
  for (const m of filteredMatches) {
    // Add plain text before match
    highlighted += result.slice(pos, m.start);
    // Add highlighted match
    highlighted += `<span class="${m.type}">${m.text}</span>`;
    pos = m.end;
  }
  // Add remaining plain text
  highlighted += result.slice(pos);
  
  return highlighted;
}

const container = document.getElementById("projects");

// Add Projects title
const projectsTitle = document.createElement("h2");
projectsTitle.className = "projects-title fade-in";
projectsTitle.textContent = "Featured Projects";
container.appendChild(projectsTitle);

projectData.forEach((p, i) => {
  const isRev = i % 2 === 1;
  const project = document.createElement("div");
  project.className = `project fade-in ${isRev ? 'reverse' : ''}`;
  
  const codeHtml = p.code ? `
    <div class="code-window">
      <div class="window-header">
        <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
      </div>
      <pre><code>${highlightLuau(p.code)}</code></pre>
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
    // Check if code should be full-width after expanding
    requestAnimationFrame(() => checkCodeLayout(project));
  });
});

const obs = new IntersectionObserver((es) => es.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); }), {threshold:0.1});
document.querySelectorAll(".fade-in").forEach(el => obs.observe(el));

// FAQ Section
const faqContainer = document.querySelector(".faq-container");
faqData.forEach((faq, index) => {
  const faqItem = document.createElement("div");
  faqItem.className = "faq-item";
  faqItem.innerHTML = `
    <button class="faq-question">
      <span>${faq.question}</span>
      <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="faq-answer">
      <p>${faq.answer}</p>
    </div>
  `;
  faqContainer.appendChild(faqItem);
  
  const questionBtn = faqItem.querySelector(".faq-question");
  questionBtn.addEventListener("click", () => {
    const isOpen = faqItem.classList.contains("open");
    // Close all other FAQ items
    document.querySelectorAll(".faq-item").forEach(item => {
      item.classList.remove("open");
    });
    // Toggle current item
    if (!isOpen) {
      faqItem.classList.add("open");
    }
  });
});

// Function to check if codeblock should be full-width
function checkCodeLayout(project) {
  const codeWindow = project.querySelector('.code-window');
  const media = project.querySelector('.media');
  const content = project.querySelector('.content');
  
  if (!codeWindow || !media || !project.classList.contains('expanded')) return;
  
  const mediaWidth = media.offsetWidth;
  const codeWidth = codeWindow.scrollWidth;
  
  // If code is wider than media (1.2x threshold), make it full-width
  if (codeWidth > mediaWidth * 1.1) {
    project.classList.add('code-full-width');
    // Move code-window out of content to project level
    if (codeWindow.parentElement === content) {
      content.after(codeWindow);
    }
  } else {
    project.classList.remove('code-full-width');
    // Move code-window back inside content
    if (codeWindow.parentElement !== content) {
      content.appendChild(codeWindow);
    }
  }
}

// Check code layout on window resize
window.addEventListener('resize', () => {
  document.querySelectorAll('.project.expanded').forEach(project => {
    checkCodeLayout(project);
  });
});
