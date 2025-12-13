// CSS Validator form handler
document.getElementById('css-validator-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const urlInput = document.getElementById('css-validator-url');
  const errorDiv = document.getElementById('css-validator-url-error');
  const url = urlInput.value.trim();
  
  // Clear previous errors
  errorDiv.textContent = '';
  urlInput.setAttribute('aria-invalid', 'false');
  
  // Validate URL
  if (!url) {
    errorDiv.textContent = 'Please enter a URL';
    urlInput.setAttribute('aria-invalid', 'true');
    urlInput.focus();
    return;
  }
  
  // Basic URL validation
  try {
    new URL(url);
  } catch (e) {
    errorDiv.textContent = 'Please enter a valid URL (e.g., https://example.com/styles.css)';
    urlInput.setAttribute('aria-invalid', 'true');
    urlInput.focus();
    return;
  }
  
  // Redirect to W3C CSS Validator with the URL
  const encodedUrl = encodeURIComponent(url);
  window.open(`https://jigsaw.w3.org/css-validator/validator?uri=${encodedUrl}`, '_blank');
});

