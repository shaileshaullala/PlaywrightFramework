import {Locator, Page} from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';

export class LoginPage{
    //page locators/objects/OR
    private readonly page:Page;
    private readonly eleUtil: ElementUtil
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly warningmsg: Locator;
    private readonly registerLink: Locator;

    //page class constructor
    constructor(page:Page){
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.warningmsg = page.locator('.alert.alert-danger.alert-dismissible');
        this.registerLink = page.getByText('Register', {exact:true})
    }

    //Page Actions
    /**
     * Goto Login page
     */
    async gotoLoginPage(baseURL: string | undefined){
        this.page.goto(baseURL+'?route=account/login');
    }
    /**
     * Login to the application
     * @param email Enter email
     * @param password Enter password
     * @returns return page title
     */
    async doLogin(email: string, password: string): Promise<HomePage>{
        await this.eleUtil.fill(this.emailId, email);
        await this.eleUtil.fill(this.password, password);
        await this.eleUtil.click(this.loginBtn, {force: true, timeout: 5000});
       return new HomePage(this.page);
    }
    /**
     * Get the warning message
     * @returns 
     */
    async getInvalidLoginMessage(): Promise<string | null>{
        const errorMsg = await this.eleUtil.getText(this.warningmsg);
        console.log(`Error message is ${errorMsg}`);
        return errorMsg;
    }

    async navigateToRegisterLink(): Promise<RegisterPage>{
        await this.eleUtil.click(this.registerLink, {force: true}, 1);
        return new RegisterPage(this.page);
    }
}