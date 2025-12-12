// Mobile navigation toggle
(function() {
  const burger = document.getElementById('docs-nav-toggle');
  const mobileMenu = document.getElementById('docs-nav-mobile');
  
  if (!burger || !mobileMenu) return;

  burger.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    
    // Toggle aria-expanded
    this.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle menu visibility
    if (isExpanded) {
      mobileMenu.hidden = true;
    } else {
      mobileMenu.hidden = false;
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    }
  });

  // Close menu when clicking on a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
      burger.focus();
    }
  });
})();

