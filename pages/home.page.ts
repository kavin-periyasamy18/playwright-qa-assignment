import { Page } from "@playwright/test";
import BrowserActions from "../utils/browserAction";
import { testStep } from "../utils/decoders";
import AUT from "../utils/aut";
import { Timeout } from "../utils/constants";

export class HomePage {

    constructor(public page: Page){}

    public get userInputValue() {
        return this.page.locator("#userName-value")
    }

    private get bookStoreApplicationEle() {
        return this.page.locator("a").filter({hasText : "Book Store Application"})
    }

    @testStep("Open the Demo url")
    async openPage(): Promise<void> {
        await this.page.goto(AUT.QADEMOURL, {timeout:Timeout.ACTION_TIMEOUT})
    }

    @testStep("Enter the Book Store Application")
    async clickBookStoreApplication(): Promise<void> {
        await this.openPage()
        await BrowserActions.waitForVisible(this.bookStoreApplicationEle)
        await BrowserActions.click(this.bookStoreApplicationEle)
    }
}