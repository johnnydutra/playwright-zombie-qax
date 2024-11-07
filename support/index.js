const { test: base, expect } = require('@playwright/test');

const { Auth } = require('../actions/Auth');
const { Leads } = require('../actions/Leads');
const { Movies } = require('../actions/Movies');
const { Toast } = require('../actions/Components');

const { API } = require('./api');

const test = base.extend({
  page: async ({ page }, use) => {
    const context = page;

    context['auth'] = new Auth(page);
    context['leads'] = new Leads(page);
    context['movies'] = new Movies(page);
    context['toast'] = new Toast(page);

    await use(context);
  },
  request: async ({ request }, use) => {
    const context = request;

    context['api'] = new API(request);

    await use(context);
  }
});

export { test, expect };