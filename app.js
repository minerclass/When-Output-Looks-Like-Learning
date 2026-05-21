document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Theme Management (Light / Dark Mode)
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for cached setting or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ==========================================
  // 2. Mobile Navigation Burger Menu
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  
  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-open');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-open');
    });
  });

  // ==========================================
  // 3. Interactive Timeline (Media Ecology)
  // ==========================================
  const timelineNodes = document.querySelectorAll('.timeline-node');
  const timelinePanels = document.querySelectorAll('.timeline-panel');
  const timelineIndicator = document.getElementById('timeline-indicator');
  
  function updateTimeline(index) {
    // Update progress bar width
    const percentage = (index / (timelineNodes.length - 1)) * 100;
    timelineIndicator.style.width = `${percentage}%`;
    
    // Update nodes active state
    timelineNodes.forEach((node, i) => {
      if (i <= index) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
    
    // Switch panels with a small fade transition
    timelinePanels.forEach((panel) => {
      panel.classList.remove('active');
    });
    
    setTimeout(() => {
      const activePanel = document.getElementById(`panel-${index}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    }, 100);
  }
  
  timelineNodes.forEach(node => {
    node.addEventListener('click', () => {
      const index = parseInt(node.getAttribute('data-index'), 10);
      updateTimeline(index);
    });
  });

  // ==========================================
  // 4. Interactive 2x2 Matrix Explainer
  // ==========================================
  const matrixCells = document.querySelectorAll('.matrix-cell');
  const explainerCard = document.getElementById('explainer-card');
  const explainerTitle = document.getElementById('explainer-title');
  const explainerText = document.getElementById('explainer-text');
  const explainerPerf = document.getElementById('explainer-perf');
  const explainerSchema = document.getElementById('explainer-schema');
  
  const cellData = {
    'productive-success': {
      title: 'Productive Success',
      tag: 'Ideal Goal',
      tagBg: 'rgba(16, 185, 129, 0.1)',
      tagColor: 'var(--accent-emerald)',
      cardClass: 'active-productive-success',
      text: 'Productive Success is the pedagogical benchmark. Here, high academic performance represents corresponding depth of learning. The assignment design makes cognitive work the only pathway to producing the outcome.',
      performance: 'High-quality, thoughtful, organized, and structurally fluent artifacts.',
      schema: 'Robust. Student integrates new data, reorganizes their long-term mental models, and builds strong retrieval pathways.',
      schemaColor: 'var(--accent-emerald)'
    },
    'productive-failure': {
      title: 'Productive Failure',
      tag: 'Desirable Difficulty',
      tagBg: 'rgba(59, 130, 246, 0.1)',
      tagColor: 'var(--accent-blue)',
      cardClass: 'active-productive-failure',
      text: 'Productive Failure occurs when students struggle with complex, novel problems before receiving direct instruction. While initial performance markers are low (wrong answers, messy drafts), the effortful search creates optimal conditions for subsequent learning.',
      performance: 'Unpolished, initial drafts containing errors, missteps, or incomplete arguments.',
      schema: 'High potential. Activates prior knowledge, exposes gaps, and primes the brain for deeper schema construction during feedback.',
      schemaColor: 'var(--accent-blue)'
    },
    'unproductive-success': {
      title: 'Unproductive Success',
      tag: 'AI Threat Vector',
      tagBg: 'rgba(244, 63, 94, 0.1)',
      tagColor: 'var(--accent-rose)',
      cardClass: 'active-unproductive-success',
      text: 'Unproductive success occurs when a student delivers an excellent final artifact (e.g., a well-crafted essay, correct coding syntax, or a polished slide deck) but does so by outsourcing the reasoning to an algorithm. Because the student bypasses cognitive tension, they construct no mental schemas in long-term memory.',
      performance: 'Advanced level structure, rich prose, accurate references, clear layout.',
      schema: 'Null. No retrieval strength is established, and no active conceptual reorganization occurs.',
      schemaColor: 'var(--accent-rose)'
    },
    'unproductive-failure': {
      title: 'Unproductive Failure',
      tag: 'System Disengagement',
      tagBg: 'rgba(148, 163, 184, 0.1)',
      tagColor: 'var(--text-muted)',
      cardClass: 'active-unproductive-failure',
      text: 'Unproductive Failure represents complete disengagement. The student does not perform the task and does not engage in any learning processes. In AI settings, this occurs when students are blocked from using tools but lack the support to start the work independently.',
      performance: 'Incomplete submissions, missing elements, or copy-pasted nonsense.',
      schema: 'Stagnant. No new associations are attempted or consolidated.',
      schemaColor: 'var(--text-muted)'
    }
  };
  
  matrixCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const type = cell.getAttribute('data-cell');
      const data = cellData[type];
      
      // Update active card class
      explainerCard.className = `glass-card matrix-explainer-card ${data.cardClass}`;
      
      // Update HTML content
      explainerTitle.innerHTML = `
        <span>${data.title}</span>
        <span class="matrix-explainer-tag" style="background: ${data.tagBg}; color: ${data.tagColor};">${data.tag}</span>
      `;
      explainerText.textContent = data.text;
      explainerPerf.textContent = data.performance;
      explainerSchema.textContent = data.schema;
      explainerSchema.style.color = data.schemaColor;
      
      // Add subtle scale animation to explainer card
      explainerCard.style.transform = 'scale(0.98)';
      setTimeout(() => {
        explainerCard.style.transform = 'none';
      }, 100);
    });
  });

  // ==========================================
  // 5. GPS vs Map Animation (Simulation Canvas)
  // ==========================================
  const canvas = document.getElementById('sim-canvas');
  const ctx = canvas.getContext('2d');
  
  const gpsBtn = document.getElementById('sim-btn-gps');
  const mapBtn = document.getElementById('sim-btn-map');
  
  const simFriction = document.getElementById('sim-val-friction');
  const simTime = document.getElementById('sim-val-time');
  const simRetention = document.getElementById('sim-val-retention');
  const simAgency = document.getElementById('sim-val-agency');
  
  let currentSimMode = 'map'; // Default
  let animationFrameId = null;
  let progress = 0;
  
  // Set canvas bounds
  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 200;
  }
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    drawSimulation();
  });
  
  resizeCanvas();
  
  const pathPoints = [];
  const obstaclePoints = [];
  
  // Pre-generate points
  function generatePathPoints() {
    pathPoints.length = 0;
    obstaclePoints.length = 0;
    
    const startX = 50;
    const startY = 100;
    const endX = canvas.width - 50;
    const endY = 100;
    
    // GPS is straight
    // Map is wavy and explores 3 check points
    const stepCount = 100;
    for (let i = 0; i <= stepCount; i++) {
      const t = i / stepCount;
      const x = startX + (endX - startX) * t;
      
      // Add winding sine waves for map path
      const y = startY + Math.sin(t * Math.PI * 4) * 45 + Math.cos(t * Math.PI * 2) * 15;
      pathPoints.push({ x, y });
    }
    
    // Add some random "nodes of uncertainty"
    obstaclePoints.push({ x: startX + (endX - startX) * 0.25, y: 50, label: '?' });
    obstaclePoints.push({ x: startX + (endX - startX) * 0.5, y: 150, label: 'Error' });
    obstaclePoints.push({ x: startX + (endX - startX) * 0.75, y: 70, label: 'Schema' });
  }
  
  function drawSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const textCol = isDark ? '#94a3b8' : '#475569';
    const accentCol = currentSimMode === 'gps' ? '#f43f5e' : '#06b6d4';
    const activeFill = currentSimMode === 'gps' ? 'rgba(244,63,94,0.1)' : 'rgba(6,182,212,0.1)';
    
    const startX = 50;
    const startY = 100;
    const endX = canvas.width - 50;
    const endY = 100;
    
    // Draw Start and End
    ctx.beginPath();
    ctx.arc(startX, startY, 8, 0, Math.PI * 2);
    ctx.fillStyle = textCol;
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(endX, endY, 8, 0, Math.PI * 2);
    ctx.fillStyle = accentCol;
    ctx.fill();
    
    ctx.fillStyle = textCol;
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('START', startX - 18, startY - 15);
    ctx.fillText('END (Output)', endX - 25, endY - 15);
    
    if (currentSimMode === 'gps') {
      // Draw GPS path (Direct vector)
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 4;
      ctx.stroke();
      
      // Animated dot
      const currentX = startX + (endX - startX) * progress;
      ctx.beginPath();
      ctx.arc(currentX, endY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.fill();
      
      ctx.fillStyle = '#f43f5e';
      ctx.font = '10px sans-serif';
      ctx.fillText('Bypass Route', currentX - 30, endY + 20);
      
    } else {
      // Draw Map path (Winding exploration)
      ctx.beginPath();
      ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
      for (let i = 1; i < pathPoints.length; i++) {
        ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
      }
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw obstacle nodes
      obstaclePoints.forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#1e293b' : '#cbd5e1';
        ctx.strokeStyle = varColor('--surface-border');
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = textCol;
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pt.label, pt.x, pt.y + 3);
      });
      ctx.textAlign = 'left'; // Reset
      
      // Animated dot along curve
      const currentIndex = Math.floor(progress * (pathPoints.length - 1));
      const currentPoint = pathPoints[currentIndex];
      
      // Draw path covered
      ctx.beginPath();
      ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
      for (let i = 1; i <= currentIndex; i++) {
        ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
      }
      ctx.strokeStyle = 'rgba(6,182,212,0.4)';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(currentPoint.x, currentPoint.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.fill();
    }
  }
  
  function varColor(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }
  
  function animate() {
    progress += currentSimMode === 'gps' ? 0.015 : 0.005;
    if (progress > 1) {
      progress = 0;
    }
    drawSimulation();
    animationFrameId = requestAnimationFrame(animate);
  }
  
  function toggleSimMode(mode) {
    currentSimMode = mode;
    progress = 0;
    
    // Toggle active buttons
    if (mode === 'gps') {
      gpsBtn.classList.add('active');
      mapBtn.classList.remove('active');
      
      // Update statistics panel (Red alarm state)
      simFriction.innerHTML = 'None <span style="color:var(--accent-rose); font-size:0.75rem;">(Bypass)</span>';
      simTime.textContent = 'Instant (2 Seconds)';
      simRetention.innerHTML = '0% <span style="color:var(--accent-rose); font-size:0.75rem;">(No Schema built)</span>';
      simAgency.innerHTML = 'Passive Passenger';
      
      simFriction.style.color = 'var(--accent-rose)';
      simRetention.style.color = 'var(--accent-rose)';
      simAgency.style.color = 'var(--accent-rose)';
    } else {
      gpsBtn.classList.remove('active');
      mapBtn.classList.add('active');
      
      // Update statistics panel (Healthy cyan state)
      simFriction.innerHTML = 'High <span style="color:var(--accent-cyan); font-size:0.75rem;">(Active Search)</span>';
      simTime.textContent = 'Slow (Effortful Wrestle)';
      simRetention.innerHTML = '95% <span style="color:var(--accent-emerald); font-size:0.75rem;">(Durable Path Memory)</span>';
      simAgency.innerHTML = 'Active Cartographer';
      
      simFriction.style.color = 'var(--accent-cyan)';
      simRetention.style.color = 'var(--accent-emerald)';
      simAgency.style.color = 'var(--accent-emerald)';
    }
    
    generatePathPoints();
  }
  
  gpsBtn.addEventListener('click', () => toggleSimMode('gps'));
  mapBtn.addEventListener('click', () => toggleSimMode('map'));
  
  // Init simulator
  toggleSimMode('map');
  animate();

  // ==========================================
  // 6. Pedagogical Friction Framework Panels
  // ==========================================
  const frameworkNavItems = document.querySelectorAll('.framework-nav-item');
  const frameworkPanels = document.querySelectorAll('.framework-panel');
  
  frameworkNavItems.forEach(item => {
    item.addEventListener('click', () => {
      // Toggle nav list active state
      frameworkNavItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // Toggle panel visible state
      const targetFrame = item.getAttribute('data-frame');
      frameworkPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      
      const activePanel = document.getElementById(`fw-panel-${targetFrame}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // ==========================================
  // 7. Dynamic Diagnostic Quiz Calculator
  // ==========================================
  const quizAnswers = {
    rhetorical: [],
    noetic: [],
    existential: [],
    infrastructural: []
  };
  
  const stepContainers = document.querySelectorAll('.diag-step');
  const nextButtons = document.querySelectorAll('.btn-next');
  const prevButtons = document.querySelectorAll('.btn-prev');
  const restartBtn = document.getElementById('btn-restart-quiz');
  
  // Options selection handler
  document.querySelectorAll('.diag-option').forEach(option => {
    option.addEventListener('click', () => {
      const parentStep = option.parentElement.parentElement;
      const stepIndex = Array.from(stepContainers).indexOf(parentStep) + 1;
      
      // Deselect siblings
      parentStep.querySelectorAll('.diag-option').forEach(sibling => {
        sibling.classList.remove('selected');
      });
      
      // Select current option
      option.classList.add('selected');
      
      // Enable continue button for this step
      const continueBtn = document.getElementById(`btn-next-${stepIndex}`);
      if (continueBtn) {
        continueBtn.removeAttribute('disabled');
      }
    });
  });
  
  // Next Step Handlers
  nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentStep = btn.parentElement.parentElement;
      const stepIndex = Array.from(stepContainers).indexOf(parentStep) + 1;
      
      // Record answer
      const selectedOption = parentStep.querySelector('.diag-option.selected');
      const val = parseInt(selectedOption.getAttribute('data-val'), 10);
      const dim = selectedOption.getAttribute('data-dim');
      
      // Save in state
      if (!quizAnswers[dim]) {
        quizAnswers[dim] = [];
      }
      quizAnswers[dim].push(val);
      
      // Transition to next screen
      parentStep.classList.remove('active');
      
      if (stepIndex < 5) {
        const nextStep = document.getElementById(`diag-step-${stepIndex + 1}`);
        nextStep.classList.add('active');
      } else {
        // Evaluate results
        showQuizResults();
      }
    });
  });
  
  // Back Step Handlers
  prevButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentStep = btn.parentElement.parentElement;
      const stepIndex = Array.from(stepContainers).indexOf(parentStep) + 1;
      
      // Clear answers recorded in this dimension on back press to keep stats aligned
      const prevStepContainer = document.getElementById(`diag-step-${stepIndex - 1}`);
      const selectedOption = prevStepContainer.querySelector('.diag-option.selected');
      if (selectedOption) {
        const dim = selectedOption.getAttribute('data-dim');
        quizAnswers[dim].pop();
      }
      
      parentStep.classList.remove('active');
      prevStepContainer.classList.add('active');
    });
  });
  
  // Calculate results and update DOM elements
  function showQuizResults() {
    const resultsContainer = document.getElementById('diag-results');
    resultsContainer.classList.add('active');
    
    // Math checks
    // Rhetorical answers average (Q1 & Q3)
    const rheVals = quizAnswers.rhetorical || [10];
    const rhetoricalAvg = rheVals.reduce((a, b) => a + b, 0) / rheVals.length;
    
    const noeticAvg = (quizAnswers.noetic || [10])[0];
    const existentialAvg = (quizAnswers.existential || [10])[0];
    const infrastructuralAvg = (quizAnswers.infrastructural || [10])[0];
    
    // Overall Friction Score is average of all 4 dimensions
    const overallScore = Math.round((rhetoricalAvg + noeticAvg + existentialAvg + infrastructuralAvg) / 4);
    
    // Update SVG Ring animation
    const ring = document.getElementById('score-ring');
    const radius = 90;
    const circumference = 2 * Math.PI * radius; // 565.48
    const offset = circumference * (1 - overallScore / 100);
    
    // Trigger SVG offset animation after rendering
    setTimeout(() => {
      ring.style.strokeDashoffset = offset;
    }, 150);
    
    // Animate score counter
    let currentScoreCount = 0;
    const scoreNumEl = document.getElementById('score-number');
    const counterInterval = setInterval(() => {
      if (currentScoreCount >= overallScore) {
        scoreNumEl.textContent = overallScore;
        clearInterval(counterInterval);
      } else {
        currentScoreCount++;
        scoreNumEl.textContent = currentScoreCount;
      }
    }, 15);
    
    // Update badge rating
    const badge = document.getElementById('score-badge');
    badge.className = 'score-rating';
    
    let adviceHeader = '';
    let adviceBody = '';
    
    if (overallScore < 40) {
      badge.textContent = 'Critical Bypass Risk';
      badge.classList.add('rating-bypass');
      adviceHeader = 'Urgent Restructure Needed';
      adviceBody = 'Your assignment features high cognitive bypass vulnerability. Because there is little to no friction in symbolic production, students can outsource the thinking directly to an LLM without interacting with the core ideas. Add <strong>Noetic Friction</strong> by requiring a pre-AI draft outline, or integrate <strong>Rhetorical Friction</strong> through a live Socratic debate.';
    } else if (overallScore < 75) {
      badge.textContent = 'Moderate Bypass Risk';
      badge.classList.add('rating-moderate');
      adviceHeader = 'Refinement Recommended';
      adviceBody = 'Your task has some barriers that discourage outright cheating, but the underlying cognitive challenge can still be easily bypassed. To strengthen retention, consider localizing the assessment scope (increasing <strong>Rhetorical Friction</strong>) or grading the revision process itself rather than evaluating the polished artifact.';
    } else {
      badge.textContent = 'Productive Friction Preserved';
      badge.classList.add('rating-friction');
      adviceHeader = 'Maintained Cognitive Demand';
      adviceBody = 'Outstanding design! Your assignment is highly resistant to cognitive bypass. You have preserved the productive struggle that builds durable long-term memory schemas. Remember to maintain clear, accessible scaffolding structures so the friction remains productive and does not become exclusionary.';
    }
    
    document.getElementById('recommendation-header').innerHTML = adviceHeader;
    document.getElementById('recommendation-body').innerHTML = adviceBody;
    
    // Update individual Dimension Bars
    document.getElementById('score-dim-noetic').textContent = `${noeticAvg}%`;
    document.getElementById('score-dim-rhetorical').textContent = `${Math.round(rhetoricalAvg)}%`;
    document.getElementById('score-dim-existential').textContent = `${existentialAvg}%`;
    document.getElementById('score-dim-infrastructural').textContent = `${infrastructuralAvg}%`;
    
    document.getElementById('bar-dim-noetic').style.width = `${noeticAvg}%`;
    document.getElementById('bar-dim-rhetorical').style.width = `${rhetoricalAvg}%`;
    document.getElementById('bar-dim-existential').style.width = `${existentialAvg}%`;
    document.getElementById('bar-dim-infrastructural').style.width = `${infrastructuralAvg}%`;
  }
  
  // Restart Quiz Handler
  restartBtn.addEventListener('click', () => {
    // Clear state
    quizAnswers.rhetorical.length = 0;
    quizAnswers.noetic.length = 0;
    quizAnswers.existential.length = 0;
    quizAnswers.infrastructural.length = 0;
    
    // Reset SVG Ring
    document.getElementById('score-ring').style.strokeDashoffset = 565.48;
    
    // Reset all step forms
    document.querySelectorAll('.diag-option').forEach(opt => {
      opt.classList.remove('selected');
    });
    
    nextButtons.forEach(btn => {
      btn.setAttribute('disabled', 'true');
    });
    
    // Hide results and show step 1
    stepContainers.forEach(container => {
      container.classList.remove('active');
    });
    
    document.getElementById('diag-step-1').classList.add('active');
  });
});

// Expose printSelection helper globally for inline onclick handlers
window.printSelection = function(mode) {
  document.body.classList.add(`print-focus-${mode}`);
  window.print();
  // Allow small timeout for browser print engine to spin up before class removal
  setTimeout(() => {
    document.body.classList.remove(`print-focus-${mode}`);
  }, 1000);
};
