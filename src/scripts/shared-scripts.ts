// Copy code functionality
document.querySelectorAll('.docs-code-example__copy').forEach(button => {
  button.addEventListener('click', function(this: HTMLElement) {
    const codeExample = this.closest('.docs-code-example');
    if (!codeExample) return;
    
    const codeBlock = codeExample.querySelector('.docs-code-example__code');
    if (!codeBlock) return;
    
    const text = codeBlock.textContent || '';
    
    navigator.clipboard.writeText(text).then(() => {
      const originalText = this.textContent;
      this.textContent = 'Copied!';
      setTimeout(() => {
        if (originalText) this.textContent = originalText;
      }, 2000);
    });
  });
});

// Accordion functionality for docs-card
document.querySelectorAll('.docs-card__header').forEach(button => {
  const panelId = button.getAttribute('aria-controls');
  if (!panelId) return;
  
  const panel = document.getElementById(panelId);
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  
  // Initialize panel state
  if (!isExpanded && panel) {
    panel.hidden = true;
  }
  
  button.addEventListener('click', function(this: HTMLElement) {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    const panelId = this.getAttribute('aria-controls');
    if (!panelId) return;
    
    const panel = document.getElementById(panelId);
    if (!panel) return;
    
    // Update button state
    this.setAttribute('aria-expanded', String(!isExpanded));
    
    // Toggle panel visibility
    if (isExpanded) {
      panel.hidden = true;
    } else {
      panel.hidden = false;
    }
  });

  // Keyboard support
  button.addEventListener('keydown', function(this: HTMLElement, e: any) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
});

// Active navigation link functionality
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  
  // Remove active class from all links
  document.querySelectorAll('.docs-nav__link, .docs-nav__mobile-link').forEach(link => {
    link.classList.remove('docs-nav__link--active', 'docs-nav__mobile-link--active');
  });
  
  // Find and set active link based on current path
  document.querySelectorAll('.docs-nav__link, .docs-nav__mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Normalize paths for comparison
    const normalizedHref = href.startsWith('/') ? href : `/${href}`;
    const normalizedCurrentPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
    
    // Check if current path matches the link href
    // Handle index.html and root path
    if (normalizedHref === '/pages/index.html' && (normalizedCurrentPath === '/pages/index.html' || normalizedCurrentPath === '/' || normalizedCurrentPath === '/index.html')) {
      link.classList.add(
        link.classList.contains('docs-nav__link') 
          ? 'docs-nav__link--active' 
          : 'docs-nav__mobile-link--active'
      );
    } else if (normalizedCurrentPath === normalizedHref || normalizedCurrentPath.endsWith(normalizedHref)) {
      link.classList.add(
        link.classList.contains('docs-nav__link') 
          ? 'docs-nav__link--active' 
          : 'docs-nav__mobile-link--active'
      );
    }
  });
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setActiveNavLink);
} else {
  setActiveNavLink();
}

// Expand/Collapse all accordions functionality
function expandAllAccordions() {
  document.querySelectorAll('.docs-card__header').forEach(button => {
    const panelId = button.getAttribute('aria-controls');
    if (!panelId) return;
    
    const panel = document.getElementById(panelId);
    if (!panel) return;
    
    button.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
  });
}

function collapseAllAccordions() {
  document.querySelectorAll('.docs-card__header').forEach(button => {
    const panelId = button.getAttribute('aria-controls');
    if (!panelId) return;
    
    const panel = document.getElementById(panelId);
    if (!panel) return;
    
    button.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
  });
}

// Add event listeners for expand/collapse buttons
const expandBtn = document.getElementById('expand-all-accordions');
const collapseBtn = document.getElementById('collapse-all-accordions');

if (expandBtn) {
  expandBtn.addEventListener('click', expandAllAccordions);
}

if (collapseBtn) {
  collapseBtn.addEventListener('click', collapseAllAccordions);
}

