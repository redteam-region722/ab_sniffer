function detect_seleniumbase() {
  /**
     * Detects SeleniumBase by looking for artifacts from the underlying ChromeDriver.
     * These are variables injected into the `window` object.
     */
    const detectSeleniumBase = () => {
        // Test 1: Check for known ChromeDriver-related variables in the window object.
        // These are often used as a communication channel between the driver and the page.
        for (const key in window) {
            if (key.startsWith('cdc_') || key.startsWith('$cdc_')) {
                return true;
            }
        }

        // Test 2: Check for specific document attributes.
        // Some configurations of Selenium/WebDriver add attributes to the root element.
        if (document.documentElement.hasAttribute("webdriver") || document.documentElement.hasAttribute("selenium")) {
            return true;
        }

        return false;
    };

    return detectSeleniumBase();
}

if (typeof window !== 'undefined') window.detect_seleniumbase = detect_seleniumbase;