const BasePage = require('./BasePage');

class MenCategoryPage extends BasePage {
    get categoryTitle() { return $('.base'); }
    get jacketFilter() { return $('*=Jackets'); }
    get pageTitle() { return $('.page-title span.base'); }
    
    async open() {
        await this.openUrl('/');
        await browser.maximizeWindow();
        
        await this.waitForDisplayed($('#maincontent'), 15000, 'Main Content');
        
        const menLink = await $('=Men');
        await this.safeClick(menLink, 'Men Category Link');
        
        await this.waitForDisplayed(
            this.categoryTitle, 
            20000, 
            `Men's category page failed to load. Current URL: ${await browser.getUrl()}`
        );
    }

    async applyJacketFilter() {
        try {
            await this.safeClick(this.jacketFilter, 'Jackets Filter Link');
            await browser.pause(1000); // Brief pause for the filter to apply
        } catch (error) {
            await this.takeScreenshot('jacket-filter-error');
            throw new Error(`Failed to click Jackets filter: ${error.message}`);
        }
    }

    async verifyOnlyJacketsDisplayed() {
        const pageTitle = await this.pageTitle.getText();
        if (pageTitle !== 'Jackets') {
            await this.takeScreenshot('jacket-filter-verification-failed');
            throw new Error(`Page title does not match expected "Jackets". Actual title: "${pageTitle}"`);
        }
    }
}

module.exports = new MenCategoryPage();