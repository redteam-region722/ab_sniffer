/**
 * Detection script for Patchright automation framework
 * Unique pattern: window.__playwright__patched === true
 * Patchright adds an explicit patched flag (not in vanilla Playwright)
 */
function detect_patchright() {
  // Check 1: window.__playwright__patched === true (unique to Patchright)
  if (window.hasOwnProperty('__playwright__patched') && window.__playwright__patched === true) {
    return true;
  }

  // Check 2: Check if __playwright__patched exists and is true
  try {
    if (window.__playwright__patched === true) {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  // Check 3: Verify the property exists and has the correct value
  try {
    if (typeof window.__playwright__patched !== 'undefined' && window.__playwright__patched === true) {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  return false;
}

if (typeof window !== 'undefined') window.detect_patchright = detect_patchright;

