/**
 * Detection script for PuppeteerExtra automation framework
 * Unique pattern: navigator.plugins.length > 0 AND window.__puppeteer_extra_plugin_*
 * puppeteer-extra plugins register themselves globally with prefixed names
 */
function detect_puppeteerextra() {
  // Check 1: navigator.plugins.length > 0 AND window.__puppeteer_extra_plugin_* exists
  // puppeteer-extra has plugins AND registers them globally
  if (navigator.plugins.length > 0) {
    // Check for puppeteer-extra plugin markers
    try {
      for (const key in window) {
        if (key.startsWith('__puppeteer_extra_plugin_')) {
          return true;
        }
      }
    } catch (e) {
      // Ignore errors
    }
  }

  // Check 2: Look for __puppeteer_extra_plugin_* properties directly
  try {
    for (const prop in window) {
      if (prop.startsWith('__puppeteer_extra_plugin_')) {
        return true;
      }
    }
  } catch (e) {
    // Ignore errors
  }

  // Check 3: Combined check - plugins exist AND puppeteer-extra plugin marker
  const hasPlugins = navigator.plugins.length > 0;
  let hasPuppeteerExtraPlugin = false;
  try {
    for (const key in window) {
      if (key.startsWith('__puppeteer_extra_plugin_')) {
        hasPuppeteerExtraPlugin = true;
        break;
      }
    }
  } catch (e) {
    // Ignore errors
  }
  
  if (hasPlugins && hasPuppeteerExtraPlugin) {
    return true;
  }

  return false;
}

if (typeof window !== 'undefined') window.detect_puppeteerextra = detect_puppeteerextra;
