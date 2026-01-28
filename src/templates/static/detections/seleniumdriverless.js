function detect_seleniumdriverless() {
  /**
     * Detects Selenium-Driverless by inspecting error stack traces.
     * Injected scripts or patched functions by the framework can reveal themselves
     * when an error is thrown and its stack is examined.
     */
    const detectSeleniumDriverless = () => {
        try {
            // Create a new error to get access to the current call stack.
            throw new Error('Ψ-Anarch Detection Probe');
        } catch (e) {
            // If the stack trace contains the framework's name, it's a direct hit.
            if (e.stack && e.stack.toLowerCase().includes('driverless')) {
                return true;
            }
        }
        
        // As a fallback, check for modifications to core objects that are unusual for users.
        if (window.chrome && !window.chrome.runtime) {
            // If the `chrome` object exists but is incomplete, it's likely a partial spoof.
            return true;
        }

        return false;
    };

    return detectSeleniumDriverless();
}

if (typeof window !== 'undefined') window.detect_seleniumdriverless = detect_seleniumdriverless;