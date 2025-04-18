const BasePage = require('./BasePage');

class HomePage extends BasePage {
    get searchInput() { return $('#search'); }
    get searchButton() { return $('button[title="Search"]'); }
    get firstProduct() { return $$('.product-item-link')[0]; }
    
    async open() {
        await this.openUrl('/');
        await browser.maximizeWindow();
    }

    async searchForProduct(productName) {
        await this.safeSetValue(this.searchInput, productName, 'Search Input');
        await this.safeClick(this.searchButton, 'Search Button');
    }

    async selectFirstProduct() {
        await this.safeClick(this.firstProduct, 'First Product');
    }
}

module.exports = new HomePage();