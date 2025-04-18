const { Given, When, Then } = require('@wdio/cucumber-framework');
const CartPage = require('../../test/pageobjects/CartPage');
const ProductPage = require('../../test/pageobjects/ProductPage');

require('./addToCartSteps');

When('I verify the product was added successfully', async () => {
    await ProductPage.verifySuccessMessage();
});

When('I navigate to the cart', async () => {
    await CartPage.navigateToCart();
});

When('I remove the product from cart', async () => {
    await CartPage.removeItem();
});

Then('I should see an empty cart message', async () => {
    await CartPage.verifyEmptyCart();
});