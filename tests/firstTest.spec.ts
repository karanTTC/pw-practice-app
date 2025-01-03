import { expect, test} from '@playwright/test'



test.beforeEach(async ({ page }) => {
    await page.goto ('/')
    await page.getByText('Forms').click()
})


test('the first test', async ({page}) => {
    
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page }) => {
    await page.getByText('Form Layouts').click()
    // by Tag name
    await page.locator('input').first().click()
    // by ID
    await page.locator('#inputEmail1')

    // by Class value
    await page.locator('.shape-rectangle')

    // by attribute
    await page.locator('[placeholder="Email"]')

    // by Class value (full)
    await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selectors
    await page.locator('input[placeholder="Email"].shape-rectangle[nbinput]')

    // by XPath (NOT RECOMMENDED)
    await page.locator('//*[@id="inputEmail1"]')

    // by partial text match
    await page.locator(':text("Using")')

    // by exact text match
    await page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async ({ page }) => {
    await page.getByText('Form Layouts').click()

    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn') //Have to add data-testid="SignIn" in source code

    await page.getByTitle('IoT Dashboard').click() 
})

test('locating child elements', async ({ page }) => {
    await page.getByText('Form Layouts').click()
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
    
    await page.locator('nb-card').nth(3).getByRole('button').click() // avoid using indexing
})

test('locating parent elements', async ({ page }) => {
    await page.getByText('Form Layouts').click()

    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('textbox', {name: "Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()

})

test('Reusing the locators', async ({ page }) => {3
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await page.getByText('Form Layouts').click()

    // await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).fill('test@test.com')
    // await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Password"}).fill('Welcome123')
    // await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('button', {hasText: "Sign in"}).click()

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button', {hasText: "Sign in"}).click()

    await expect(emailField).toHaveValue('test@test.com') 

})

test('extracting values', async ({ page }) => {
    await page.getByText('Form Layouts').click()

    // single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    // input value
    const emailField = basicForm.getByRole('textbox',{name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    // attribute value
    const placeHolderValue = await emailField.getAttribute('placeholder')
    expect(placeHolderValue).toEqual('Email')
})


test('assertions', async ({ page }) => {
    await page.getByText('Form Layouts').click()
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    // general assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    // Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    // soft assertion
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()

})











test('navigate to date picker page', async ({page}) => {

    await page.getByText('Datepicker').click()
})