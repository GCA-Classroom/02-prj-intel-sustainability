// script.js
// This script adds simple interactivity to the timeline cards.
// When a card is clicked, it will show an alert with the card's title and year.
// This is a beginner-friendly example of DOM interaction.

// Wait until the page content is loaded
window.addEventListener('DOMContentLoaded', function() {
  // Select all timeline cards inside the section
  var cards = document.querySelectorAll('section > div');

  // Fun facts for tooltips (one per card, in order)
  const funFacts = [
    "Intel was founded by two pioneers of the semiconductor industry!",
    "The 4004 microprocessor had just 2,300 transistors.",
    "The x86 architecture is still used in most PCs today.",
    "The 386 was the first 32-bit processor for PCs.",
    "Intel's GHG emissions peaked in 2006, then started to drop.",
    "RISE stands for Responsible, Inclusive, Sustainable, Enabling.",
    "Net-zero means balancing emissions produced and removed.",
    "99% renewable electricity is a huge achievement!",
    "The first Sustainability Summit was in 2024."
  ];

  // Modal popup for card details
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const shareBtn = document.getElementById('share-btn');

  // Timeline scroll buttons
  const scrollLeftBtn = document.getElementById('scroll-left');
  const scrollRightBtn = document.getElementById('scroll-right');
  const timelineSection = document.querySelector('section');

  // Search/filter
  const searchBox = document.getElementById('search-box');

  // Progress bar
  const progressBar = document.getElementById('progress-bar');

  // Dark mode
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  // Tooltip
  const tooltip = document.getElementById('tooltip');

  // Back to top
  const backToTop = document.getElementById('back-to-top');

  // Get all timeline cards
  const cards = document.querySelectorAll('section > div');

  // Show modal with card details
  cards.forEach(function(card, idx) {
    card.addEventListener('click', function(e) {
      // Prevent click if tooltip is showing
      if (tooltip.style.display === 'block') return;
      const year = card.querySelector('h2').textContent;
      const title = card.querySelector('h3').textContent;
      const desc = card.querySelector('p').textContent;
      const img = card.querySelector('img').src;
      modalContent.innerHTML =
        `<h2>${year}</h2><h3>${title}</h3><img src="${img}" alt="${title}" style="width:90%;border-radius:6px;margin:10px 0;"/><p>${desc}</p>`;
      modal.style.display = 'flex';
      // Store for share
      shareBtn.dataset.year = year;
      shareBtn.dataset.title = title;
    });
    // Tooltip on hover
    card.addEventListener('mouseenter', function(e) {
      tooltip.textContent = funFacts[idx] || '';
      tooltip.style.display = 'block';
      // Position tooltip near mouse
      document.addEventListener('mousemove', moveTooltip);
    });
    card.addEventListener('mouseleave', function(e) {
      tooltip.style.display = 'none';
      document.removeEventListener('mousemove', moveTooltip);
    });
  });

  // Move tooltip with mouse
  function moveTooltip(e) {
    tooltip.style.left = (e.pageX + 12) + 'px';
    tooltip.style.top = (e.pageY + 12) + 'px';
  }

  // Close modal
  modalClose.onclick = function() {
    modal.style.display = 'none';
  };
  window.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };

  // Share button (copy to clipboard)
  shareBtn.onclick = function() {
    const text = `Check out this Intel milestone: ${this.dataset.year} - ${this.dataset.title}`;
    navigator.clipboard.writeText(text).then(function() {
      shareBtn.textContent = 'Copied!';
      setTimeout(() => shareBtn.textContent = 'Share', 1200);
    });
  };

  // Scroll timeline left/right
  scrollLeftBtn.onclick = function() {
    timelineSection.scrollBy({ left: -300, behavior: 'smooth' });
  };
  scrollRightBtn.onclick = function() {
    timelineSection.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Filter cards by search
  searchBox.addEventListener('input', function() {
    const val = this.value.toLowerCase();
    cards.forEach(function(card) {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(val) ? '' : 'none';
    });
  });

  // Progress bar updates on timeline scroll
  function updateProgressBar() {
    const scrollLeft = timelineSection.scrollLeft;
    const scrollWidth = timelineSection.scrollWidth - timelineSection.clientWidth;
    const percent = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
    progressBar.style.width = percent + '%';
  }
  timelineSection.addEventListener('scroll', updateProgressBar);
  window.addEventListener('resize', updateProgressBar);
  window.addEventListener('DOMContentLoaded', updateProgressBar);

  // Dark mode toggle
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  darkModeToggle.onclick = function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  };

  // Back to top button
  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });
  backToTop.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation for timeline (left/right arrows)
  document.addEventListener('keydown', function(e) {
    if (document.activeElement.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight') {
      timelineSection.scrollBy({ left: 300, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      timelineSection.scrollBy({ left: -300, behavior: 'smooth' });
    }
  });
});
