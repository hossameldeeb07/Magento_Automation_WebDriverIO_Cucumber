const BasePage = require('./BasePage');

class ProductPage extends BasePage {
    get sizeOption() { return $('div.swatch-option.text'); }
    get colorOption() { return $('div.swatch-option.color'); }
    get addToCartButton() { return $('#product-addtocart-button'); }
    get successMessage() { return $('.message-success'); }

    async selectSize(size) {
        const sizeElement = await $(`div.swatch-option.text[option-label="${size}"]`);
        await this.waitForDisplayed(sizeElement, 10000, `Size ${size}`);
        await sizeElement.scrollIntoView();
        await this.safeClick(sizeElement, `Size ${size}`);
    }
    
    async selectColor(color) {
        const colorElement = await $(`div.swatch-option.color[option-label="${color}"]`);
        await this.waitForDisplayed(colorElement, 10000, `Color ${color}`);
        await colorElement.scrollIntoView();
        await this.safeClick(colorElement, `Color ${color}`);
    }

    async addToCart() {
        await this.safeClick(this.addToCartButton, 'Add to Cart Button');
        await this.waitForDisplayed(this.successMessage, 10000, 'Success Message');
    }

    async verifySuccessMessage() {
        const messageText = await this.successMessage.getText();
        if (!messageText.includes('You added')) {
            await this.takeScreenshot('success-message-failure');
            throw new Error(`Success message did not appear. Actual text: "${messageText}"`);
        }
    }
}

module.exports = new ProductPage();