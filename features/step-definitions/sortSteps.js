const { Given, When, Then } = require('@wdio/cucumber-framework');
const CategoryPage = require('../../test/pageobjects/CategoryPage');

Given('I am on the {string} category page', async (category) => {
    await CategoryPage.open(category);
});

When('I sort products by {string}', async (sortOption) => {
    await CategoryPage.sortBy(sortOption);
});

Then('I should see products sorted by price from highest to lowest', async () => {
    await CategoryPage.verifyPriceSortHighToLow();
});