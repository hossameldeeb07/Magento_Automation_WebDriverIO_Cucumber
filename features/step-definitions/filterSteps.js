const { Given, When, Then } = require('@wdio/cucumber-framework');
const MenCategoryPage = require('../../test/pageobjects/MenCategoryPage');

Given('I am on the Men\'s category page', async () => {
    await MenCategoryPage.open();
});

When('I apply the Jackets filter', async () => {
    await MenCategoryPage.applyJacketFilter();
});

Then('I should see only jacket products displayed', async () => {
    await MenCategoryPage.verifyOnlyJacketsDisplayed();
});