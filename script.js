const defaultMarkdown = `# Slide 1
## Ammar Qaisar
---
# Slide 2
## Roll Number: Bitf24A052
---
# Slide 3
## Assignment 4`;

let slides = [];
let currentSlide = 0;
let isPresentation = false;

const markdownInput = document.getElementById('markdown-input');
const slideBox = document.getElementById('slide-box');
const presSlideBox = document.getElementById('pres-slide-box');
const slideCount = document.getElementById('slide-count');
const presSlideCount = document.getElementById('pres-slide-count');

const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');

const presLeftBtn = document.getElementById('pres-left-btn');
const presRightBtn = document.getElementById('pres-right-btn');
const presFullscreenBtn = document.getElementById('pres-fullscreen-btn');
const presentationScreen = document.getElementById('presentation-screen');

function parseMarkdown(text) {
  if (!text || text.trim() === '') {
    return '<p>Empty Slide</p>';
  }

  const lines = text.split('\n');
  let html = '';
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (line.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += '<h2>' + formatText(line.substring(3)) + '</h2>';
    } else if (line.startsWith('# ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += '<h1>' + formatText(line.substring(2)) + '</h1>';
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += '<li>' + formatText(line.substring(2)) + '</li>';
    } else if (line === '') {
      if (inList) { html += '</ul>'; inList = false; }
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      html += '<p>' + formatText(line) + '</p>';
    }
  }

  if (inList) {
    html += '</ul>';
  }

  return html;
}

function formatText(str) {
  return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function updateSlides() {
  slides = markdownInput.value.split(/\n\s*---\s*\n/);

  if (currentSlide >= slides.length) {
    currentSlide = slides.length - 1;
  }
  if (currentSlide < 0) {
    currentSlide = 0;
  }

  const htmlContent = parseMarkdown(slides[currentSlide]);
  slideBox.innerHTML = htmlContent;
  presSlideBox.innerHTML = htmlContent;

  const countDisplay = (currentSlide + 1) + ' / ' + slides.length;
  slideCount.textContent = countDisplay;
  presSlideCount.textContent = countDisplay;

  leftBtn.disabled = (currentSlide === 0);
  presLeftBtn.disabled = (currentSlide === 0);

  rightBtn.disabled = (currentSlide === slides.length - 1);
  presRightBtn.disabled = (currentSlide === slides.length - 1);

  if (isPresentation) {
    fullscreenBtn.textContent = 'Exit Full Screen';
  } else {
    fullscreenBtn.textContent = 'Full Screen';
  }
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updateSlides();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlides();
  }
}

function togglePresentation() {
  isPresentation = !isPresentation;
  if (isPresentation) {
    presentationScreen.classList.remove('hidden');
  } else {
    presentationScreen.classList.add('hidden');
  }
  updateSlides();
}

function saveSlides() {
  localStorage.setItem('my_slides', markdownInput.value);
  alert('Slides saved in browser internal memory!');
}

function loadSlides() {
  let savedData = localStorage.getItem('my_slides');
  if (savedData) {
    if (!savedData.includes('# Slide 1') || savedData.includes('# Slide 04: Internal Storage')) {
      savedData = defaultMarkdown;
      localStorage.setItem('my_slides', defaultMarkdown);
    }
    markdownInput.value = savedData;
  } else {
    markdownInput.value = defaultMarkdown;
  }
  updateSlides();
}

markdownInput.addEventListener('input', function() {
  updateSlides();
  localStorage.setItem('my_slides', markdownInput.value);
});

leftBtn.addEventListener('click', prevSlide);
rightBtn.addEventListener('click', nextSlide);
fullscreenBtn.addEventListener('click', togglePresentation);

presLeftBtn.addEventListener('click', prevSlide);
presRightBtn.addEventListener('click', nextSlide);
presFullscreenBtn.addEventListener('click', togglePresentation);

window.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
    e.preventDefault();
    saveSlides();
  } else if (e.key === 'F11') {
    e.preventDefault();
    togglePresentation();
  } else if (e.key === 'ArrowRight') {
    if (isPresentation || document.activeElement !== markdownInput) {
      nextSlide();
    }
  } else if (e.key === 'ArrowLeft') {
    if (isPresentation || document.activeElement !== markdownInput) {
      prevSlide();
    }
  } else if (e.key === 'Escape' && isPresentation) {
    togglePresentation();
  }
});

loadSlides();
