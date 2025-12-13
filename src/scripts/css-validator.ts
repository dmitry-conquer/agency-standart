// CSS Validator form handler
document.getElementById('css-validator-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const urlInput = document.getElementById('css-validator-url') as HTMLInputElement;
  const errorDiv = document.getElementById('css-validator-url-error');
  const url = urlInput.value.trim();
  
  // Clear previous errors
  if (errorDiv) errorDiv.textContent = '';
  urlInput.setAttribute('aria-invalid', 'false');
  
  // Validate URL
  if (!url) {
    if (errorDiv) errorDiv.textContent = 'Please enter a URL';
    urlInput.setAttribute('aria-invalid', 'true');
    urlInput.focus();
    return;
  }
  
  // Basic URL validation
  try {
    new URL(url);
  } catch (e) {
    if (errorDiv) errorDiv.textContent = 'Please enter a valid URL (e.g., https://example.com/styles.css)';
    urlInput.setAttribute('aria-invalid', 'true');
    urlInput.focus();
    return;
  }
  
  // Redirect to W3C CSS Validator with the URL
  const encodedUrl = encodeURIComponent(url);
  window.open(`https://jigsaw.w3.org/css-validator/validator?uri=${encodedUrl}`, '_blank');
});

