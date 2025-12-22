import {baseCustomFixture as base} from "./baseCustomFixture.js";
import GaragePage from "../pageObjects/garage/GaragePage.js";

export const test = base.extend({

    garagePage: async ({page, mainPage}, use) => {
        await mainPage.loginAsGuest();
        await use(new GaragePage(page));
    }

});
