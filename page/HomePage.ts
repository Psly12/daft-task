import { Selector, t } from 'testcafe';

import resultsPage from './ResultsPage';
import CONSTANTS from '../helper/constants';

class HomePage {
  cookieAcceptAllBtn: Selector = Selector('button[data-tracking="cc-accept"]');

  searchBoxInput: Selector = Selector('div[data-testid="input-value-wrapper"]');

  autoFillSearchItem: Selector = Selector('li[id^="search-box-item-"]');

  async handelCookieModal(action:string) {
    switch (action) {
      case 'Accept All':
        if (await this.cookieAcceptAllBtn.exists) {
          await t.click(this.cookieAcceptAllBtn);
        }
        break;
      case 'Disable Some':
        // TODO:
        break;
      default:
        break;
    }
  }

  selectMenuItem(searchItem:string) {
    return this.autoFillSearchItem.withText(searchItem);
  }

  async search(searchString:string) {
    await t
      .click(this.searchBoxInput)
      .typeText(this.searchBoxInput, searchString)
      .expect(this.selectMenuItem(searchString).exists)
      .ok(`Location for search string - "${searchString}" exists`)
      .click(this.selectMenuItem(searchString))
      .expect(resultsPage.searchResultsString.exists)
      .ok(`Results page loaded successfully with search results for ${searchString}`, { timeout: CONSTANTS.TIMEOUT_LONG });
    const resultInt = await resultsPage.extractResultsNumber();
    await t
      .expect(resultInt).gt(0, `${resultInt} results found for search string ${searchString}`);
  }
}

export default new HomePage();
