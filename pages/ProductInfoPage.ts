import {Locator, Page} from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';


export class ProductInfoPage{
    //page locators/objects/OR
    private readonly page: Page;
    private readonly eleUtil: ElementUtil;
    private readonly header: Locator;
    private readonly images: Locator;
    private readonly prodMetaData: Locator;
    private readonly prodPriceData: Locator;
    private readonly map = new Map<string, string | number | null>();
    

    //page class constructor
    constructor(page:Page){
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.header = page.locator('h1');
        this.images = page.locator("div#content img");
        this.prodMetaData = page.locator("(//div[@id='content']//ul[@class='list-unstyled'])[1]/li");
        this.prodPriceData = page.locator("(//div[@id='content']//ul[@class='list-unstyled'])[2]/li");

    }

    async getProductHeader(): Promise<string>{
       const header =  await this.eleUtil.getInnerText(this.header);
       console.log("==========Product Header is ====== "+ header);
       return header.trim();
    }

    async getProductImagesCount(): Promise<number>{
        await this.eleUtil.waitForElementVisible(this.images);
        const imageCount = await this.images.count();
        console.log(`Total number of images for ${this.getProductHeader} is ${imageCount}`);
        return imageCount;
    }

    async getProductDetails(): Promise<Map<string, string | number | null>>{
        this.map.set('header', await this.getProductHeader());
        this.map.set('imageCount', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricingData();
        console.log(`Full product details for product : ${ this.getProductHeader}`)
        this.printProductDetails();
        return this.map;

    }

    private printProductDetails(){
        for(let [key, value] of this.map){
            console.log(key, value);
        }
    }

    private async getProductMetaData(){
        let productMetaData: string[] = await this.prodMetaData.allInnerTexts();
        for(let pmdata of productMetaData){
            let metadata : string[] = pmdata.split(':');
            let metaKey = metadata[0].trim();
            let metaValue = metadata[1].trim();
            this.map.set(metaKey,  metaValue);

        }
    }

    private async getProductPricingData(){
         let productPriceData: string[] = await this.prodPriceData.allInnerTexts();
        for(let ppdata of productPriceData){
            let metaPrice = ppdata.split(':')[0];
            let metaPriceExTax = ppdata.split(':')[1];
            this.map.set('price',  metaPrice);
            this.map.set('extaxprice',  metaPriceExTax);

        }
    }

}