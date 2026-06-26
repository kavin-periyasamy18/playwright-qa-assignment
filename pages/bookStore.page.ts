import { Page } from "@playwright/test";
import { testStep } from "../utils/decoders";
import BrowserActions from "../utils/browserAction";

export class BookStorePage {

    constructor(public page: Page){}

    private get goToBookStoreEle() {
        return this.page.getByRole('button', { name: 'Go To Book Store' })
    }
    private get searchBoxEle() {
        return this.page.getByRole('textbox', { name: 'Type to search' })
    }

    titleEle(bookName: string) {
        return this.page.locator('tr').filter({hasText: bookName}).locator('a')
    } 
    authorEle(bookName: string) {
        return this.page.locator("tr").filter({hasText: bookName}).locator("td").nth(2)
    } 
    publisherEle(bookName: string) {
        return this.page.locator("tr").filter({hasText: bookName}).locator("td").nth(3)
    } 
    
    @testStep("Click Go to Book Store button")
    async clickGoTOBookStore(): Promise<void> {
        await BrowserActions.waitForVisible(this.goToBookStoreEle)
        await BrowserActions.click(this.goToBookStoreEle)
    }

    @testStep("Enter search text in the Search box")
    async search(bookName: string): Promise<void> {
        await BrowserActions.waitForVisible(this.searchBoxEle)
        await BrowserActions.type(this.searchBoxEle, bookName)
    }

    async getBookDetails(bookName: string): Promise<any>{

        const title = await BrowserActions.getInnerText(this.titleEle(bookName))
        const author = await BrowserActions.getInnerText(this.authorEle(bookName))
        const publisher = await BrowserActions.getInnerText(this.publisherEle(bookName))

        return { title, author, publisher }
    }
}