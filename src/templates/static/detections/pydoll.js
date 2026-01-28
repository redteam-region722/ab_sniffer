/**
 * Detection script for Pydoll automation framework
 * Unique pattern: window.__pydoll_cdp_session
 * pydoll exposes raw CDP session handle intentionally
 */
function detect_pydoll() {
  // Check 1: window.__pydoll_cdp_session exists (unique to pydoll)
  if (window.hasOwnProperty('__pydoll_cdp_session')) {
    return true;
  }

  // Check 2: Verify it exists (CDP session handle)
  try {
    if (typeof window.__pydoll_cdp_session !== 'undefined') {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  // Check 3: Check if it's an object or function (CDP session handle)
  try {
    if (window.__pydoll_cdp_session && 
        (typeof window.__pydoll_cdp_session === 'object' || typeof window.__pydoll_cdp_session === 'function')) {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  return false;
}

if (typeof window !== 'undefined') window.detect_pydoll = detect_pydoll;
