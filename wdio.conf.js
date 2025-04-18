exports.config = {
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            addConsoleLogs: true
        }]
    ],
    runner: 'local',
    specs: [
        './features/add_to_cart.feature',
        './features/sort_products.feature',
        './features/filter_products.feature',
        './features/cart_management.feature'  
    ],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--window-size=1920,1080',
                '--disable-gpu',
                '--no-sandbox'
            ]
        }
    }],
    framework: 'cucumber',
    cucumberOpts: {
        require: [
            './features/step-definitions/addToCartSteps.js',
            './features/step-definitions/sortSteps.js',
            './features/step-definitions/filterSteps.js',
            './features/step-definitions/cartSteps.js'  
        ],
        timeout: 60000,
        tagExpression: 'not @skip'  
    },
    baseUrl: 'https://magento.softwaretestingboard.com',
    
    
    afterStep: async function (step, scenario, result) {
        const path = require('path');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        if (result.passed === false) {
            const screenshotPath = path.join(__dirname, 'screenshots', `FAIL_${scenario.name}_${timestamp}.png`);
            await browser.saveScreenshot(screenshotPath);
            console.log('Screenshot saved at:', screenshotPath);
        }
    },
    
    
    before: async function() {
        
        await browser.deleteAllCookies();
        
        
        await browser.setTimeout({
            'implicit': 5000,
            'pageLoad': 10000,
            'script': 30000
        });
    },
    
    
    afterScenario: async function(scenario) {
        
        try {
            const CartPage = require('./test/pageobjects/CartPage');
            await CartPage.openCart();
            await CartPage.removeItem();
        } catch (e) {
            
        }
    }
};