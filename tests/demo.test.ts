import  {expect } from "@playwright/test";
import { test } from "../fixtures/testFixtures";
import AUT from "../utils/aut";
import { CONSTANTS } from "../utils/constants";
import { FileUtils } from "../utils/fileUtil";

test(" Books Store Application Validation", async({loginPage, homePage, bookStorePage}) => {

    await test.step('Navigate to Books Store Application and login to the Application', async () => {
        await homePage.clickBookStoreApplication()
        await loginPage.logIn(AUT.USERNAME, AUT.PASSWORD)
        await expect.soft(homePage.userInputValue, "Validate the User is login to the application successfully").toHaveText(AUT.USERNAME) 
    })
    
    await test.step(`Go to Book Store, Search for the ${CONSTANTS.LEARNING_JAVASCRIPT_DESIGN_PATTERNS} and Validate the search result is displayed`, async () => {
        await bookStorePage.clickGoTOBookStore()
        await bookStorePage.search(CONSTANTS.LEARNING_JAVASCRIPT_DESIGN_PATTERNS)
        await expect.soft(bookStorePage.titleEle(CONSTANTS.LEARNING_JAVASCRIPT_DESIGN_PATTERNS), "Validate the search book name is displayed in the results").toBeVisible() 
    })

    await test.step("Print the book details", async () => {
        const bookDetails = await bookStorePage.getBookDetails(CONSTANTS.LEARNING_JAVASCRIPT_DESIGN_PATTERNS)
        const bookDetailsInTextFile = await FileUtils.writeBookDetails(bookDetails)
        console.log("Book Details in the Text File", bookDetailsInTextFile)
    })

    await loginPage.clickLogOut()
    await expect.soft(loginPage.loginInBookStoreHeaderEle, "Validate the User is logout from the application successfully").toBeVisible()
})

