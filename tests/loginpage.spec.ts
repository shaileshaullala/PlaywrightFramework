
import { LoginPage } from '../pages/LoginPage'
import{test, expect} from '../fixtures/baseFixtures'

test('Verify Valid login', async ({homePage}) => {
    await expect(homePage.page).toHaveTitle('My Account');
    
   
    
});

test('Verify Invalid login', async ({page, baseURL}) => {
    let loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage(baseURL);
    const actualTitle = await loginPage.doLogin("shaileshaullala@gmail.com", 'test12345'); 
    const iMessage = await loginPage.getInvalidLoginMessage();
    await expect(iMessage).toContain("Warning: No match for E-Mail Address and/or Password");
})