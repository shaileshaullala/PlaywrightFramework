import {Locator, Page} from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';
import { ProductInfoPage } from '../pages/ProductInfoPage';

export class SearchResultsPage{
    //page locators/objects/OR
    private readonly page:Page;
    private readonly eleUtil: ElementUtil;
    private readonly results: Locator;

    //page class constructor
    constructor(page:Page){
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.results = page.locator('.product-thumb');


    }

    //Page Actions
    /**
     * count
     */
    async getSearchResultsCount(): Promise<number>{
       return await this.results.count();
        
    }

    async selectProduct(productName: string){
        console.log("=========Product Name==== "+ productName)
        await this.eleUtil.click(this.page.getByRole('link', { name: `${productName}` }));
        return new ProductInfoPage(this.page);
    }
}