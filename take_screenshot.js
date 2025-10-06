const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to the local server
    console.log('Navigating to http://localhost:8000...');
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });

    // Wait for the page to load completely
    await page.waitForSelector('.control', { timeout: 10000 });

    // Take a screenshot
    console.log('Taking screenshot...');
    await page.screenshot({
      path: '/home/zenha/Documents/Projects/js/01v96-remote/mic_channels_screenshot.png',
      fullPage: true
    });

    console.log('Screenshot saved successfully!');

    // Also verify the colors by checking the computed styles
    const channels = await page.$$eval('.control[data-id^="channel"]', (elements) => {
      return elements.map(el => {
        const style = window.getComputedStyle(el);
        return {
          id: el.getAttribute('data-id'),
          background: style.background,
          backgroundColor: style.backgroundColor
        };
      });
    });

    console.log('Channel styles verification:');
    channels.forEach(channel => {
      console.log(`${channel.id}: ${channel.background}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();