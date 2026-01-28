/**
 * Detection script for Seleniumbase automation framework
 * Unique pattern: window._seleniumbase object
 * SeleniumBase injects a branding namespace for test utilities
 */
function detect_seleniumbase() {
  // Check 1: window._seleniumbase object exists (unique to SeleniumBase)
  if (window.hasOwnProperty('_seleniumbase')) {
    return true;
  }

  // Check 2: Verify it's an object (not just a property)
  try {
    if (window._seleniumbase && typeof window._seleniumbase === 'object') {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  // Check 3: Check if _seleniumbase exists in any form
  try {
    if (typeof window._seleniumbase !== 'undefined') {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  return false;
}

if (typeof window !== 'undefined') window.detect_seleniumbase = detect_seleniumbase;
