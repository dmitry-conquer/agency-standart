document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('clamp-generator-form') as HTMLFormElement;
  const propertyInput = document.getElementById('clamp-property') as HTMLInputElement;
  const minViewportInput = document.getElementById('clamp-min-viewport') as HTMLInputElement;
  const maxViewportInput = document.getElementById('clamp-max-viewport') as HTMLInputElement;
  const minSizeInput = document.getElementById('clamp-min-size') as HTMLInputElement;
  const maxSizeInput = document.getElementById('clamp-max-size') as HTMLInputElement;
  const resultInput = document.getElementById('clamp-result') as HTMLInputElement;
  const errorDiv = document.getElementById('clamp-error');
  const copyBtn = document.getElementById('clamp-copy-btn') as HTMLButtonElement;

  if (!form || !propertyInput || !minViewportInput || !maxViewportInput || !minSizeInput || !maxSizeInput || !resultInput || !copyBtn) return;

  // Round to specified decimals (default 4)
  function roundTo(number: number, decimals: number = 4): number {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
  }

  // Calculate clamp value
  function calculateClamp(minSize: number, maxSize: number, maxViewportWidth: number = 1440, minViewportWidth: number = 375): string {
    // Convert to rem (divide by 16)
    const maxSizeRem = roundTo(maxSize / 16);
    const minSizeRem = roundTo(minSize / 16);
    const maxWidthRem = roundTo(maxViewportWidth / 16);
    const minWidthRem = roundTo(minViewportWidth / 16);

    // Calculate slope
    const slope = roundTo((maxSizeRem - minSizeRem) / (maxWidthRem - minWidthRem));

    // Calculate y-axis intersection
    const yAxisIntersection = roundTo(-minWidthRem * slope + minSizeRem);

    // Calculate slope * 100 for vw unit
    const slopeVw = roundTo(slope * 100);

    // Build clamp string
    return `clamp(${minSizeRem}rem, ${yAxisIntersection}rem + ${slopeVw}vw, ${maxSizeRem}rem)`;
  }

  // Update result on input change
  function updateResult(): void {
    const property = propertyInput.value.trim();
    const minViewport = parseFloat(minViewportInput.value);
    const maxViewport = parseFloat(maxViewportInput.value);
    const minSize = parseFloat(minSizeInput.value);
    const maxSize = parseFloat(maxSizeInput.value);

    // Clear previous errors
    if (errorDiv) errorDiv.textContent = '';

    // Validate inputs
    if (!property) {
      if (errorDiv) errorDiv.textContent = 'Please enter a property name';
      propertyInput.setAttribute('aria-invalid', 'true');
      resultInput.value = '';
      resultInput.placeholder = 'Enter values above to generate clamp()';
      copyBtn.disabled = true;
      return;
    }

    if (isNaN(minViewport) || minViewport <= 0) {
      if (errorDiv) errorDiv.textContent = 'Please enter a valid minimum viewport width';
      minViewportInput.setAttribute('aria-invalid', 'true');
      resultInput.value = '';
      resultInput.placeholder = 'Enter values above to generate clamp()';
      copyBtn.disabled = true;
      return;
    }

    if (isNaN(maxViewport) || maxViewport <= 0) {
      if (errorDiv) errorDiv.textContent = 'Please enter a valid maximum viewport width';
      maxViewportInput.setAttribute('aria-invalid', 'true');
      resultInput.value = '';
      resultInput.placeholder = 'Enter values above to generate clamp()';
      copyBtn.disabled = true;
      return;
    }

    if (minViewport >= maxViewport) {
      if (errorDiv) errorDiv.textContent = 'Minimum viewport width must be less than maximum viewport width';
      minViewportInput.setAttribute('aria-invalid', 'true');
      resultInput.value = '';
      resultInput.placeholder = 'Enter values above to generate clamp()';
      copyBtn.disabled = true;
      return;
    }

    if (isNaN(minSize) || minSize < 0) {
      if (errorDiv) errorDiv.textContent = 'Please enter a valid minimum font size';
      minSizeInput.setAttribute('aria-invalid', 'true');
      resultInput.value = '';
      resultInput.placeholder = 'Enter values above to generate clamp()';
      copyBtn.disabled = true;
      return;
    }

    if (isNaN(maxSize) || maxSize < 0) {
      if (errorDiv) errorDiv.textContent = 'Please enter a valid maximum font size';
      maxSizeInput.setAttribute('aria-invalid', 'true');
      resultInput.value = '';
      resultInput.placeholder = 'Enter values above to generate clamp()';
      copyBtn.disabled = true;
      return;
    }

    if (minSize >= maxSize) {
      if (errorDiv) errorDiv.textContent = 'Minimum font size must be less than maximum font size';
      minSizeInput.setAttribute('aria-invalid', 'true');
      resultInput.value = '';
      resultInput.placeholder = 'Enter values above to generate clamp()';
      copyBtn.disabled = true;
      return;
    }

    // Clear invalid states
    propertyInput.setAttribute('aria-invalid', 'false');
    minViewportInput.setAttribute('aria-invalid', 'false');
    maxViewportInput.setAttribute('aria-invalid', 'false');
    minSizeInput.setAttribute('aria-invalid', 'false');
    maxSizeInput.setAttribute('aria-invalid', 'false');

    // Calculate clamp value
    const clampValue = calculateClamp(minSize, maxSize, maxViewport, minViewport);
    const result = `${property}: ${clampValue};`;

    // Display result
    resultInput.value = result;
    resultInput.placeholder = '';
    copyBtn.disabled = false;
  }

  // Copy to clipboard
  copyBtn.addEventListener('click', async () => {
    const result = resultInput.value;
    if (!result || copyBtn.disabled) return;

    try {
      await navigator.clipboard.writeText(result);
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.style.opacity = '0.7';
      
      setTimeout(() => {
        if (originalText) copyBtn.textContent = originalText;
        copyBtn.style.opacity = '1';
      }, 2000);
    } catch {
      // Fallback for older browsers
      resultInput.select();
      document.execCommand('copy');
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      
      setTimeout(() => {
        if (originalText) copyBtn.textContent = originalText;
      }, 2000);
    }
  });

  // Listen to input changes
  propertyInput.addEventListener('input', updateResult);
  minViewportInput.addEventListener('input', updateResult);
  maxViewportInput.addEventListener('input', updateResult);
  minSizeInput.addEventListener('input', updateResult);
  maxSizeInput.addEventListener('input', updateResult);

  // Prevent form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    updateResult();
  });

  // Initial calculation with default values
  updateResult();
});

