const BasePage = require('./BasePage');

class CartPage extends BasePage {
    get cartIcon() { return $('.showcart'); }
    get viewCartLink() { return $('=View and Edit Cart'); }
    get removeItemButton() { return $('.action-delete'); }
    get emptyCartMessage() { return $('.cart-empty'); }
    get cartCounter() { return $('.counter-number'); }
    get cartItems() { return $$('.cart.item'); }

    async navigateToCart() {
        
        await browser.waitUntil(
            async () => {
                const counterText = await this.cartCounter.getText();
                return counterText !== '0';
            },
            { 
                timeout: 10000,
                timeoutMsg: 'Cart counter did not update after adding product'
            }
        );

        await this.safeClick(this.cartIcon, 'Cart Icon');
        await this.safeClick(this.viewCartLink, 'View Cart Link');
        
        
        await this.waitForDisplayed(this.cartItems[0], 15000, 'Cart Items');
    }

    async removeItem() {
        await this.safeClick(this.removeItemButton, 'Remove Item Button');
        await this.waitForDisplayed(this.emptyCartMessage, 10000, 'Empty Cart Message');
    }

    async verifyEmptyCart() {
        const message = await this.emptyCartMessage.getText();
        if (!message.includes('You have no items in your shopping cart')) {
            await this.takeScreenshot('empty-cart-verification-failed');
            throw new Error('Cart is not empty');
        }
    }
}

module.exports = new CartPage();