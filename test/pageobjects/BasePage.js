const { addStep } = require('@wdio/allure-reporter').default;

class BasePage {
    /**
     * Wait for element to be displayed
     * @param {WebdriverIO.Element} element 
     * @param {number} timeout 
     * @param {string} elementName 
     */
    async waitForDisplayed(element, timeout = 10000, elementName = 'Element') {
        addStep(`Waiting for ${elementName} to be displayed`);
        await element.waitForDisplayed({ timeout, timeoutMsg: `${elementName} not displayed after ${timeout}ms` });
    }

    /**
     * Wait for element to be clickable
     * @param {WebdriverIO.Element} element 
     * @param {number} timeout 
     * @param {string} elementName 
     */
    async waitForClickable(element, timeout = 10000, elementName = 'Element') {
        addStep(`Waiting for ${elementName} to be clickable`);
        await element.waitForClickable({ timeout, timeoutMsg: `${elementName} not clickable after ${timeout}ms` });
    }

    /**
     * Click on element with validation
     * @param {WebdriverIO.Element} element 
     * @param {string} elementName 
     */
    async safeClick(element, elementName = 'Element') {
        await this.waitForClickable(element, 10000, elementName);
        addStep(`Clicking on ${elementName}`);
        await element.click();
    }

    /**
     * Set value with validation
     * @param {WebdriverIO.Element} element 
     * @param {string} value 
     * @param {string} elementName 
     */
    async safeSetValue(element, value, elementName = 'Element') {
        await this.waitForDisplayed(element, 10000, elementName);
        addStep(`Setting value "${value}" in ${elementName}`);
        await element.setValue(value);
    }

    /**
     * Take screenshot and attach to report
     * @param {string} name 
     */
    async takeScreenshot(name) {
        const screenshot = await browser.saveScreenshot();
        addStep(`Screenshot: ${name}`, () => {}, screenshot);
    }

    /**
     * Open URL with validation
     * @param {string} path 
     */
    async openUrl(path = '/') {
        addStep(`Opening URL: ${path}`);
        await browser.url(path);
        await this.waitForPageLoaded();
    }

    /**
     * Wait for page to load completely
     */
    async waitForPageLoaded() {
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState === 'complete')),
            {
                timeout: 15000,
                timeoutMsg: 'Page did not load completely'
            }
        );
    }
}

module.exports = BasePage;