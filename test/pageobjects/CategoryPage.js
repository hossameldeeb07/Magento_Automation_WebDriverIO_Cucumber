const BasePage = require('./BasePage');

class CategoryPage extends BasePage {
    get sortDropdown() { return $('//select[@data-role="sorter"]'); }
    get productPrices() { return $$('//span[@data-price-type="finalPrice"]'); }
    
    async open(category) {
        await this.openUrl(`/catalogsearch/result/?q=${category}`);
        await browser.maximizeWindow();
        await this.waitForPageLoaded();
    }

    async sortBy(optionText) {
        await this.waitForDisplayed(this.sortDropdown, 10000, 'Sort Dropdown');
        await this.sortDropdown.selectByVisibleText(optionText);
        
        await browser.waitUntil(
            async () => {
                const url = await browser.getUrl();
                return url.includes('product_list_order=price');
            },
            { timeout: 10000, timeoutMsg: 'URL did not change to reflect sorting' }
        );
    }

    async verifyPriceSortHighToLow() {
        const priceElements = await this.productPrices;
        const prices = [];
        
        for (const element of priceElements) {
            const priceText = await element.getText();
            const priceValue = parseFloat(priceText.replace(/[^\d.]/g, ''));
            prices.push(priceValue);
        }
        
        let isProperlySorted = true;
        let errorDetails = [];
        
        for (let i = 0; i < prices.length - 2; i++) {
            const current = prices[i];
            const next = prices[i + 1];
            const nextNext = prices[i + 2];
            
            if (!(current >= next && next >= nextNext)) {
                isProperlySorted = false;
                errorDetails.push({
                    position: i,
                    prices: [current, next, nextNext],
                    message: `Sorting violation at position ${i}: ${current} < ${next} < ${nextNext}`
                });
            }
        }
    
        if (!isProperlySorted) {
            let errorMessage = 'Products not properly sorted in descending order:\n';
            errorDetails.forEach(error => {
                errorMessage += `- ${error.message}\n`;
            });
            errorMessage += `Full price list: [${prices.join(', ')}]`;
            await this.takeScreenshot('price-sort-failure');
            throw new Error(errorMessage);
        }
        
        return true;
    }
}

module.exports = new CategoryPage();