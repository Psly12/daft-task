import { ClientFunction } from 'testcafe';

export const getURL = ClientFunction(() => window.location.href);
