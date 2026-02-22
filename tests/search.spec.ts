import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import{test, expect} from '../fixtures/baseFixtures'

//data provider for product searchKey and result count

let searchData = [
    {searchKey: 'macbook', resultCount: 3},
    {searchKey: 'samsung', resultCount: 2},
    {searchKey: 'imac', resultCount: 1},
    {searchKey: 'canon', resultCount: 1},
    {searchKey: 'dummy', resultCount: 0},

]

for (let product of searchData){
    test(`Verify product search ${product.searchKey}`, async ({homePage}) => {
    
    let sResults:SearchResultsPage =  await homePage.doSearch(product.searchKey)
    expect(await sResults.getSearchResultsCount()).toBe(product.resultCount)
});
}



