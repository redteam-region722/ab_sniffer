function detect_nodriver() {
  /**
     * Detects the Nodriver framework.
     * It looks for the common automation signature of `navigator.webdriver` being explicitly
     * set to `false`. A normal, human-driven browser has this property as `undefined`.
     * This is the primary flag of an environment actively hiding its automated nature.
     */
    const detectNodriver = () => {
        // Test 1: The `navigator.webdriver` property.
        // - Human user: `undefined`
        // - Old Selenium: `true`
        // - Stealth Framework: `false`
        if (navigator.webdriver === false) {
            // Test 2: Check for patched function signatures.
            // Stealth tools often have to modify native browser functions.
            // We check if the `toString()` representation of a common function lacks the "[native code]" signature.
            try {
                if (!Function.prototype.toString.call(navigator.permissions.query).includes('[native code]')) {
                    return true;
                }
            } catch (e) {
                // If the permissions API doesn't exist or errors, this test is inconclusive,
                // but the webdriver flag is a strong indicator on its own.
            }
            return true;
        }
        return false;
    };

    return detectNodriver();
}

if (typeof window !== 'undefined') window.detect_nodriver = detect_nodriver;