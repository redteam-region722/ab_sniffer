/**
 * Detection script for Selenium Driverless automation framework
 * Unique pattern: navigator.webdriver === false AND window.__selenium_unwrapped
 * Only selenium-driverless explicitly unsets webdriver AND exposes unwrapped Selenium bridge
 */
function detect_seleniumdriverless() {
  // Check 1: navigator.webdriver === false (explicitly unset - unique to selenium-driverless)
  if (navigator.hasOwnProperty('webdriver') && navigator.webdriver === false) {
    // Also check for __selenium_unwrapped to confirm
    if (window.hasOwnProperty('__selenium_unwrapped')) {
      return true;
    }
  }

  // Check 2: window.__selenium_unwrapped exists (unwrapped Selenium bridge)
  if (window.hasOwnProperty('__selenium_unwrapped')) {
    // Verify webdriver is false (combination is unique to selenium-driverless)
    if (navigator.hasOwnProperty('webdriver') && navigator.webdriver === false) {
      return true;
    }
  }

  // Check 3: Combined check - both conditions must be true
  const webdriverFalse = navigator.hasOwnProperty('webdriver') && navigator.webdriver === false;
  const hasUnwrapped = window.hasOwnProperty('__selenium_unwrapped');
  
  if (webdriverFalse && hasUnwrapped) {
    return true;
  }

  return false;
}

if (typeof window !== 'undefined') window.detect_seleniumdriverless = detect_seleniumdriverless;

