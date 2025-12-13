// HTML Validator form handler
document.getElementById('html-validator-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const urlInput = document.getElementById('validator-url') as HTMLInputElement;
  const errorDiv = document.getElementById('validator-url-error');
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
    if (errorDiv) errorDiv.textContent = 'Please enter a valid URL (e.g., https://example.com)';
    urlInput.setAttribute('aria-invalid', 'true');
    urlInput.focus();
    return;
  }
  
  // Redirect to W3C Validator with the URL
  const encodedUrl = encodeURIComponent(url);
  window.open(`https://validator.w3.org/nu/?doc=${encodedUrl}`, '_blank');
});

