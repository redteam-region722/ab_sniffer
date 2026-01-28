function detect_patchright() {
  /**
     * Detects Patchright (patched Playwright) by checking for behavioral anomalies
     * in how it spoofs browser properties like `navigator.plugins`.
     */
    const detectPatchright = () => {
        // Playwright and its derivatives often spoof the `navigator.plugins` array to appear more human.
        // However, they often spoof it as a simple Array or Object, not a native PluginArray.
        // A real, native PluginArray cannot be iterated with a `for...in` loop.
        if (navigator.plugins && navigator.plugins.length > 0) {
            try {
                // We expect this loop not to run on a native PluginArray. If it does, it's a fake.
                for (const _ in navigator.plugins) {
                    // If we successfully enter this loop, it means the object is a plain JS object,
                    // confirming it's a spoofed property.
                    return true;
                }
            } catch (e) {
                // Native PluginArray will throw an error here in strict mode or simply not execute the loop.
            }
        }
        
        // Also check for remnant Playwright variables.
        if (window['__playwright_script__']) {
            return true;
        }

        return false;
    };

    return detectPatchright();
}

if (typeof window !== 'undefined') window.detect_patchright = detect_patchright;