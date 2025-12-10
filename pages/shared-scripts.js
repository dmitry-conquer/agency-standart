// Copy code functionality
document.querySelectorAll('.docs-code-example__copy').forEach(button => {
  button.addEventListener('click', function() {
    const codeBlock = this.closest('.docs-code-example').querySelector('.docs-code-example__code');
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
      const originalText = this.textContent;
      this.textContent = 'Copied!';
      setTimeout(() => {
        this.textContent = originalText;
      }, 2000);
    });
  });
});

// Accordion functionality for docs-card
document.querySelectorAll('.docs-card__header').forEach(button => {
  const panelId = button.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  
  // Initialize panel state
  if (!isExpanded && panel) {
    panel.hidden = true;
  }
  
  button.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    const panelId = this.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    
    // Update button state
    this.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle panel visibility
    if (isExpanded) {
      panel.hidden = true;
    } else {
      panel.hidden = false;
    }
  });

  // Keyboard support
  button.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
});

