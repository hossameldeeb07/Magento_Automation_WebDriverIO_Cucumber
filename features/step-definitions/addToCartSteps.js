const { Given, When, Then } = require('@wdio/cucumber-framework');
const HomePage = require('../../test/pageobjects/HomePage');
const ProductPage = require('../../test/pageobjects/ProductPage');

Given('I am on the homepage', async () => {
    await HomePage.open();
});

When('I search for {string}', async (product) => {
    await HomePage.searchForProduct(product);
});

When('I select the first product', async () => {
    await HomePage.selectFirstProduct();
});

When('I select size {string} and color {string}', async (size, color) => {
    await ProductPage.selectSize(size);
    await ProductPage.selectColor(color);
});

When('I add the product to cart', async () => {
    await ProductPage.addToCart();
    await browser.pause(2000); 
});

Then('I should see the success message', async () => {
    await ProductPage.verifySuccessMessage();
});