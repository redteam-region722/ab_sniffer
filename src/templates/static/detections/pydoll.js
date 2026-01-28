function detect_pydoll() {
  /**
     * Detects Pydoll by searching for custom properties or functions injected into
     * the `window` or `document` objects, which it might use for synchronization.
     */
    const detectPydoll = () => {
        // Test 1: Search for uniquely named properties on the window object.
        // These are often used as an API bridge for the automation script.
        for (const key in window) {
            if (key.toLowerCase().includes('pydoll') || key.toLowerCase().includes('doll_')) {
                return true;
            }
        }

        // Test 2: Check for custom, non-standard properties on the document object.
        // Frameworks may attach state objects here.
        if (document.pydoll_state || document.doll_ready) {
            return true;
        }

        // Test 3: Check for modifications to console methods.
        // A framework might wrap console methods to intercept messages.
        if (console.debug.toString().includes('pydoll')) {
            return true;
        }
        
        return false;
    };

    return detectPydoll();
}

if (typeof window !== 'undefined') window.detect_pydoll = detect_pydoll;