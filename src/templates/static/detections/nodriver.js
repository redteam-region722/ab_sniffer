/**
 * Detection script for nodriver automation framework
 * Unique pattern: window.__cdp_node_id__ OR injected NodeIdMapper object
 * This is unique to nodriver - no other tool exposes this mapping
 */
function detect_nodriver() {
  // Check 1: window.__cdp_node_id__ property (unique to nodriver)
  if (window.hasOwnProperty('__cdp_node_id__')) {
    return true;
  }

  // Check 2: NodeIdMapper object (nodriver injects DOM↔CDP node mapper)
  try {
    if (window.NodeIdMapper && typeof window.NodeIdMapper === 'object') {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  // Check 3: Check if __cdp_node_id__ exists as a function or property
  try {
    if (typeof window.__cdp_node_id__ !== 'undefined') {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  return false;
}

if (typeof window !== 'undefined') window.detect_nodriver = detect_nodriver;

