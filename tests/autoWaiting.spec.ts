import { expect, test} from '@playwright/test'



test.beforeEach(async ({ page }) => {
    await page.goto (process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    await successButton.click()

    // const text = await successButton.textContent()
    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()
    //expect(text).toEqual('Data loaded with AJAX get request.')
    expect(text).toContain('Data loaded with AJAX get request.')
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')
    // ___ wait for element
    await page.waitForSelector('.bg-success')

    // ___ wait for particular API response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

    // ___ wait for network calls to be completed (NOT RECOMMENDED)
    //await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})


test('timeouts', async ({ page }) => {
    test.setTimeout(30000)
    const successButton = page.locator('.bg-success')
    await successButton.click({timeout: 30000})

    
})

