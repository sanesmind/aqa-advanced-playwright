import BasePage from "../BasePage.js";
import SignUpPopup from "../registration/components/SignUpPopup.js";

export default class MainPage extends BasePage {
    constructor(page) {
        super(page, "/");
        this.signUpButton = page.locator('.btn-primary', {hasText: 'Sign Up'});
    }

    async openSignUpPopup() {
        await this.signUpButton.click();
        return new SignUpPopup(this.page);
    }

}