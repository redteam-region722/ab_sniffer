/**
 * Detection script for Zendriver automation framework
 * Unique pattern: window.__zendriver_async__ === true
 * zendriver marks async CDP execution explicitly (nodriver does not)
 */
function detect_zendriver() {
  // Check 1: window.__zendriver_async__ === true (unique to zendriver)
  if (window.hasOwnProperty('__zendriver_async__') && window.__zendriver_async__ === true) {
    return true;
  }

  // Check 2: Check if __zendriver_async__ exists and is true
  try {
    if (window.__zendriver_async__ === true) {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  // Check 3: Verify the property exists and has the correct value
  try {
    if (typeof window.__zendriver_async__ !== 'undefined' && window.__zendriver_async__ === true) {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  return false;
}

if (typeof window !== 'undefined') window.detect_zendriver = detect_zendriver;
