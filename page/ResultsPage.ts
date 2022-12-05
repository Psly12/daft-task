import { Selector, t } from 'testcafe';

import { getURL } from '../helper/helper';
import CONSTANTS from '../helper/constants';

class ResultsPage {
  quickLinks: Selector = Selector('div[data-testid="quick-links"]');

  closeBudgetModalButtom : Selector = Selector('svg[data-testid="close-modal-button"]');

  searchResultsString : Selector = Selector('h1[data-testid="search-h1"]');

  openFilterModalButton: Selector = Selector('button[data-testid="open-filters-modal"]');

  resultCards : Selector = Selector('li[data-testid^="result-"]');

  async handelBudgetModal(action: string) {
    switch (action) {
      case 'Close':
        if (await this.closeBudgetModalButtom.exists) {
          await t.click(this.closeBudgetModalButtom);
        }
        break;
      case 'Calculate':
        // TODO
        break;
      default:
        break;
    }
  }

  async openResult(index:number){
    if (index > this.resultCards.length ) {
      const resultAttrID = await this.resultCards.nth(index).getAttribute('data-testid');
      const resultID = Number(resultAttrID!.replace(/\D/g, '')).toString();
      await t
        .click(this.resultCards.nth(index))
        .expect(getURL())
        .contains(resultID, { timeout: CONSTANTS.TIMEOUT_LONG });
    } else {
      await t.expect(index).lt(this.resultCards.length, "Results selection not on the page");
    }
  }

  async extractResultsNumber() {
    const txt = await this.searchResultsString.innerText;
    return Number(txt.replace(/\D/g, ''));
  }
}
export default new ResultsPage();
