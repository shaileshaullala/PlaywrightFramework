import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import{test, expect} from '../fixtures/baseFixtures'

let search = [
    {searchKey: 'macbook', productName: 'MacBook Pro', imageCount: 4},
    {searchKey: 'macbook', productName: 'MacBook Air', imageCount: 4},
    {searchKey: 'samsung', productName: 'Samsung Galaxy Tab 10.1', imageCount: 7}
]

for(let prod of search){
    test(`Verify product header${prod.productName}`, {tag: ['@product', '@sanity', '@regression']}, async ({homePage}) => {
    
    let sResults:SearchResultsPage =  await homePage.doSearch(prod.searchKey);
    let prodInfo: ProductInfoPage = await sResults.selectProduct(prod.productName);
    expect(await prodInfo.getProductHeader()).toBe(prod.productName);
    });
}

for(let prod of search){
    test(`Verify product header${prod.productName} : ${prod.imageCount}`, async ({homePage}) => {
    
    let sResults:SearchResultsPage =  await homePage.doSearch(prod.searchKey);
    let prodInfo: ProductInfoPage = await sResults.selectProduct(prod.productName);
    expect(await prodInfo.getProductImagesCount()).toBe(prod.imageCount);
    });
}



test(`Verify product Metadata`, async ({homePage}) => {

let sResults:SearchResultsPage =  await homePage.doSearch('macbook');
let prodInfo: ProductInfoPage = await sResults.selectProduct('MacBook Pro');

let actualProductFullDetails = await prodInfo.getProductDetails();

expect.soft(actualProductFullDetails.get('header')).toBe('MacBook Pro');
expect.soft(actualProductFullDetails.get('Brand')).toBe('Apple');
expect.soft(actualProductFullDetails.get('Product Code')).toBe('Product 18');
expect.soft(actualProductFullDetails.get('Reward Points')).toBe('800');
expect.soft(actualProductFullDetails.get('Availability')).toBe('Out Of Stock');

});






