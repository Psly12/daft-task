import { Selector } from 'testcafe';

class PropertyPage {
  description: Selector = Selector('div[data-testid="description"]');

  features : Selector = Selector('div[data-testid="features"]');

  async getFeatureText() {
    let featureText = '';
    const liItems = this.features.child('li');
    for (let i = 0; i < liItems.length; i = i + 1) {
      const element = liItems.nth(i);
      featureText += ` ${await element.innerText}`;
    }
    return featureText.toLowerCase();
  }
}

export default new PropertyPage();
