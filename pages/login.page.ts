import { Page } from "@playwright/test";
import BrowserActions from "../utils/browserAction";
import { testStep } from "../utils/decoders";

export class LoginPage {

    constructor(public page: Page){}

    private get loginButtonEle() {
        return this.page.getByRole('button', { name: 'Login' })
    }
    public get loginInBookStoreHeaderEle() {
        return this.page.getByRole('heading', { name: 'Login in Book Store' })
    }
    private get userNameInputEle() {
        return this.page.getByRole('textbox', { name: 'UserName' })
    }
    private get passwordInputEle() {
        return this.page.getByRole('textbox', { name: 'Password' })
    }
    private get logoutButtonEle() {
        return this.page.getByRole('button', { name: 'Logout' })
    }
    private get loadingEle() {
        return this.page.locator("#loading-label")
    }

    @testStep("Click Login button")
    async clickLogIn(): Promise<void> {
        await BrowserActions.waitForVisible(this.loginButtonEle)
        await BrowserActions.click(this.loginButtonEle)
    }
    
    @testStep("Click Logout button")
    async clickLogOut(): Promise<void> {
        await BrowserActions.waitForVisible(this.logoutButtonEle)
        await BrowserActions.click(this.logoutButtonEle)
    }
    
    @testStep("Enter the User Name")
    async enterUserName(userName: string): Promise<void> {
        await BrowserActions.waitForVisible(this.userNameInputEle)
        await BrowserActions.type(this.userNameInputEle, userName)
    }
    
    @testStep("Enter the Password")
    async enterPassword(password: string): Promise<void> {
        await BrowserActions.waitForVisible(this.passwordInputEle)
        await BrowserActions.type(this.passwordInputEle, password)
    }

    @testStep("Login to the application")
    async logIn(userName: string, password: string): Promise<void> {
        await this.clickLogIn()
        await BrowserActions.waitForVisible(this.loginInBookStoreHeaderEle)
        await this.enterUserName(userName)
        await this.enterPassword(password)
        await this.clickLogIn()
        await BrowserActions.waitForInvisible(this.loadingEle)
    }
}