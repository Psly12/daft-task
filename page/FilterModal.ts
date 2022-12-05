import { Selector, t } from 'testcafe';

import resultsPage from './ResultsPage';
import { getURL } from '../helper/helper';
import Constants from '../helper/constants';

class FilterModal {
  keywordsInput: Selector = Selector('input[data-testid="terms-input-text"]');

  showResultsButton : Selector = Selector('button[data-testid="filters-modal-show-results-button"]');

  async filterKeyword(keyword: string) {
    await t
      .click(resultsPage.openFilterModalButton)
      .typeText(this.keywordsInput, keyword)
      .click(this.showResultsButton)
      .expect(getURL())
      .contains(`terms=${keyword}`, { timeout: Constants.TIMEOUT_LONG });
    const resultInt = await resultsPage.extractResultsNumber();
    await t
      .expect(resultInt).gt(0, `${resultInt} results found for filter keyword ${keyword}`);
  }
}

export default new FilterModal();
