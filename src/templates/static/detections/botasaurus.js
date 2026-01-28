function detect_botasaurus() {
  /**
     * Detects Botasaurus by checking the property descriptor of `navigator.webdriver`.
     * To prevent detection scripts from altering its state, a framework might make the
     * `webdriver` property non-configurable or non-writable.
     */
    const detectBotasaurus = () => {
        // We are interested if `webdriver` is a property directly on the `navigator` object.
        if ('webdriver' in navigator) {
            try {
                const descriptor = Object.getOwnPropertyDescriptor(navigator, 'webdriver');
                // If a descriptor exists and the property is not writable or not configurable,
                // it's a clear sign that a script has intentionally locked this property to a specific state (`false`).
                // A normal browser's `navigator` object is more flexible.
                if (descriptor && (descriptor.writable === false || descriptor.configurable === false)) {
                    return true;
                }
                
                // Another test: try to change it. If it's locked, this assignment will fail silently (or throw in strict mode).
                const initialValue = navigator.webdriver;
                navigator.webdriver = !initialValue;
                if (navigator.webdriver === initialValue) {
                    // The value couldn't be changed, indicating it's locked.
                    return true;
                }
            } catch (e) {
                // Errors during property inspection can also be a sign of tampering.
                return true;
            }
        }
        return false;
    };

    return detectBotasaurus();
}

if (typeof window !== 'undefined') window.detect_botasaurus = detect_botasaurus;