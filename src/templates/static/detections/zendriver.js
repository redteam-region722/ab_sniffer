function detect_zendriver() {
  /**
     * Detects Zendriver by looking for an incomplete or non-native `window.chrome` object.
     * Automation tools often create a placeholder `chrome` object but fail to populate
     * it with all the functions and properties a real Chrome browser would have.
     */
    const detectZendriver = () => {
        // A real Chrome browser will have a `window.chrome` object.
        if (window.chrome) {
            // However, automation tools often fail to implement all its properties.
            // The `loadTimes` function is a classic example. If the chrome object exists
            // but `loadTimes` is missing or is not a function, it's a strong sign of spoofing.
            if (typeof window.chrome.loadTimes !== 'function') {
                return true;
            }
            
            // Zendriver might also inject a specific marker.
            if (window.zendriver) {
                return true;
            }
        }
        return false;
    };

    return detectZendriver();
}

if (typeof window !== 'undefined') window.detect_zendriver = detect_zendriver;