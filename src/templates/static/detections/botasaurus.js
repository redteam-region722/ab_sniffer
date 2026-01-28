/**
 * Detection script for Botasaurus automation framework
 * Unique pattern: window.__botasaurus_context
 * botasaurus injects a scrape context for retry/proxy orchestration
 */
function detect_botasaurus() {
  // Check 1: window.__botasaurus_context exists (unique to botasaurus)
  if (window.hasOwnProperty('__botasaurus_context')) {
    return true;
  }

  // Check 2: Verify it's an object (scrape context)
  try {
    if (window.__botasaurus_context && typeof window.__botasaurus_context === 'object') {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  // Check 3: Check if __botasaurus_context exists in any form
  try {
    if (typeof window.__botasaurus_context !== 'undefined') {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  return false;
}

if (typeof window !== 'undefined') window.detect_botasaurus = detect_botasaurus;
