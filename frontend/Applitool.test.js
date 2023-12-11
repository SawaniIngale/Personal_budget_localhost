const { Eyes, Target } = require('@applitools/eyes-webdriverio');
const { remote } = require('webdriverio');

async function runVisualTest() {
    const eyes = new Eyes();
   eyes.setApiKey('l8F7Fza104Td1RDnJLq4JjtzFfPJH19mJs4R2gxtw8O108Y110');

    const browsers = [
        { browserName: 'chrome' },
    ];

    for (const browserConfig of browsers) {
        const browser = await remote({
            capabilities: browserConfig,
        });

        try {
            await eyes.open(browser, 'Budget Management App', `Cross Browser Testing, Broswer Name - ${browserConfig.browserName}`);

            await browser.url('http://localhost:3000');

            await eyes.check('React App Page', Target.window());

            await eyes.close();
        } finally {
            await browser.deleteSession();
            await eyes.abortIfNotClosed();
        }
    }
}

runVisualTest();