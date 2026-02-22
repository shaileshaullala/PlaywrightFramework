import {Locator, Page} from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';
import { LoginPage } from '../pages/LoginPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

export class HomePage{
    //page locators/objects/OR
    readonly page:Page;
    private readonly eleUtil: ElementUtil;
    private readonly logout: Locator;
    private readonly search: Locator;
    private readonly searchIcon: Locator;
    private readonly login: Locator;



    //page class constructor
    constructor(page:Page){
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.logout = page.getByRole('link', { name: 'Logout' });
        this.search = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator(`#search > span.input-group-btn > button.btn`);
        this.login = page.getByRole('link', { name: 'Login' });

    }

    //Page Actions
    /**
     * Is user logged in
     */
    async isUserLoggedIn(): Promise<Boolean>{
       return await this.eleUtil.isVisible(this.logout, 0);
        
    }

    //Page Actions
    /**
     * Logout
     */
    async selectLogout(): Promise<LoginPage>{
       await this.eleUtil.click(this.logout, {timeout: 5000}, 1);
       await this.eleUtil.click(this.login, {timeout: 5000}, 1);
       return new LoginPage(this.page);
    }
    
    async doSearch(searchKey: string): Promise<SearchResultsPage>{
        console.log(`Search key is ${searchKey}`);
        await this.eleUtil.fill(this.search, searchKey);
        await this.eleUtil.click(this.searchIcon);
        return new SearchResultsPage(this.page)

    }
}