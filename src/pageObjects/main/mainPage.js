import BasePage from "../BasePage.js";
import SignUpPopup from "../registration/components/SignUpPopup.js";
import {expect} from "@playwright/test";

export default class MainPage extends BasePage {
    constructor(page) {
        super(page, "/");
        this.signUpButton = page.locator('.btn-primary', {hasText: 'Sign Up'});
        this.guestLoginBtn = page.getByText('Guest log in');
        this.signInBtn = page.getByText('Sign In');
    }

    async openSignUpPopup() {
        await this.signUpButton.click();
        return new SignUpPopup(this.page);
    }

    async loginAsGuest(){
        await this.guestLoginBtn.click();
        await expect(this.page.getByText('Log out')).toBeVisible();
    }

    async loginWithCredentials(email, password){
        await this.signInBtn.click();
        const modal = this.page.locator('.modal-body');
        await modal.locator('#signinEmail').fill(email);
        await modal.locator('#signinPassword').fill(password);
        await this.page.getByText('Login').click();

        await expect(this.page.getByText('Log out')).toBeVisible();
    }
}