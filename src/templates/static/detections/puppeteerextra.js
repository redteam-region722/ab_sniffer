function detect_puppeteerextra() {
  /**
     * Detects Puppeteer Extra by identifying the effects of its 'stealth' plugin.
     * The plugin specifically patches the Permissions API to behave in a way that
     * is inconsistent with an un-automated headless browser.
     */
    const detectPuppeteerExtra = () => {
        // In a standard headless browser, querying navigator.permissions will throw a TypeError.
        // The stealth plugin patches this to return a Promise that resolves, mimicking a real browser.
        // This patch is a very strong signal.
        try {
            const permissionsQuery = navigator.permissions.query({ name: 'notifications' });
            // If the query returns a promise (doesn't throw an error), and we have other bot-like
            // indicators (`navigator.webdriver` is false), it's very likely the stealth plugin.
            if (permissionsQuery instanceof Promise && navigator.webdriver === false) {
                return true;
            }
        } catch (e) {
            // This error is the expected behavior for unpatched headless, so we are not a stealth bot.
            return false;
        }

        return false;
    };

    return detectPuppeteerExtra();
}

if (typeof window !== 'undefined') window.detect_puppeteerextra = detect_puppeteerextra;