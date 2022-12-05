import CONSTANTS from '../helper/constants';
import homepage from '../page/HomePage';
import resultspage from '../page/ResultsPage';
import filtermodal from '../page/FilterModal';
import propertypage from '../page/PropertyPage';

fixture('Test keyword filter')
  .page(`${CONSTANTS.MAIN_URL}`);

test('Search keyword "garage" in location "Dublin (County)"', async (t) => {
  const searchTerm = 'Dublin (County)'; // Can be changed to any valid location
  const keyword = 'garage';
  await homepage.handelCookieModal('Accept All');
  await homepage.search(searchTerm);
  await resultspage.handelBudgetModal('Close');
  await filtermodal.filterKeyword(keyword);
  await resultspage.openResult(2);
  await t
    .expect(propertypage.description.exists)
    .ok('Property page description exists', { timeout: CONSTANTS.TIMEOUT_LONG })
    .expect(propertypage.features.exists)
    .ok('Property page features exists', { timeout: CONSTANTS.TIMEOUT_LONG });

  const propertydescription = (await propertypage.description.innerText).toLowerCase();
  const featureText = await propertypage.getFeatureText();

  await t.expect(propertydescription.includes(keyword.toLowerCase()) || featureText.includes(keyword.toLowerCase())).ok(`Description or Features contain the keyword "${keyword}"`);
});
