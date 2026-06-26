import { Page, test as baseTest, type BrowserContext } from "@playwright/test"
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { BookStorePage } from "../pages/bookStore.page";
export let browserPage: Page;
export let browserContext: BrowserContext;

type demoAutomationPages = {
    loginPage : LoginPage
    homePage : HomePage
    bookStorePage : BookStorePage
}

const demoAutomationBagePage = baseTest.extend<demoAutomationPages> ({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },
    bookStorePage: async ({ page }, use) => {
        await use(new BookStorePage(page))
    },
})
export const test = demoAutomationBagePage;