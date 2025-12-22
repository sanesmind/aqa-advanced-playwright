import { test as setup } from '@playwright/test';
import MainPage from "../../src/pageObjects/main/mainPage.js";

setup("Login as user", async({page, context}) => {

    const mainPage = new MainPage(page);
    await mainPage.navigate();
    await mainPage.loginWithCredentials(process.env.EMAIL, process.env.PASSWORD);

    await context.storageState({
        path: 'state/userStorageState.json',
    });
});