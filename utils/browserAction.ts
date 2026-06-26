import { Locator, Page, errors, expect } from "@playwright/test"
import { Timeout } from "./constants"

export default class BrowserActions {
    private static pagePromise: Promise<Page>
    constructor(public page: Page) { }

    static async click(sElement: Locator, scroll: boolean = false): Promise<void> {
        scroll ? await sElement.scrollIntoViewIfNeeded() : undefined
        await sElement.click()
    }

    static async type(sElement: Locator, sValue: string, delayTime: number = Timeout.TYPE_CHAR_ACTION_DELAY_TIME): Promise<void> {
        await sElement.pressSequentially(sValue, { delay: delayTime })
    }

    static async fill(sElement: Locator, sValue: string): Promise<void> {
        await sElement.fill(sValue)
    }

    static throwError(errMsg: string) {
        if (errors.TimeoutError) {
            throw new Error(errMsg)
        }
    }

    static async waitForInvisible(sElement: Locator): Promise<void> {
        try {
            await sElement.waitFor({ state: "hidden" })
        } catch (e) {
            console.log(e)
            BrowserActions.throwError(`${sElement} element is not hidden for specified timeout`)
        }
    }

    static async waitForVisible(sElement: Locator, timeout?: Timeout): Promise<void> {
        try {
            await sElement.first().waitFor({ state: "visible", timeout: timeout })
        } catch (error) {
            BrowserActions.throwError(`${sElement} element is not visible for specified timeout`)
        }
    }

    static async goto(page: Page, url: string, waitUntil?: "load" | "domcontentloaded"): Promise<void> {
        await page.goto(url, { waitUntil: waitUntil })
    }

    static async reload(page:Page): Promise<void> {
        await page.reload()
    }

    static async getInnerText(sElement: Locator): Promise<string> {
        await sElement.waitFor({ state: "visible", timeout: Timeout.ACTION_TIMEOUT })
        return await sElement.innerText()
    }
}

