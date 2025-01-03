import { test as base} from '@playwright/test'
import { PageManager } from '../pw-practice-app/page-objects/pageManager'

export type TestOPtions = {
   globalsQaURL: string
   formLayoutsPage: string
   pageManager: PageManager
}

export const test = base.extend<TestOPtions>({
    globalsQaURL: ['', {option: true}],

    formLayoutsPage: [async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        console.log('This happens after test as tear down as command after user()')
    }, {auto: true}],

    pageManager: async({page}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})