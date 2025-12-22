import {baseCustomFixture as base} from "./baseCustomFixture.js";
import GaragePage from "../pageObjects/garage/GaragePage.js";

export const garageTest = base.extend({

    page: async ({browser}, use)=> {

        const context = await browser.newContext({
            storageState: 'state/userStorageState.json'
        });
        const page = await context.newPage();
        await use(page);
    },
    garagePage: async ({page}, use)=> {
        const garagePage = new GaragePage(page);
        await garagePage.navigate();
        await use(garagePage);
    }
});