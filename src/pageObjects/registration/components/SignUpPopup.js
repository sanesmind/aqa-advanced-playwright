import MainPage from "../../main/mainPage.js";


export default class SignUpPopup extends MainPage {
    constructor(page) {
        super(page);

        this.signUpButton = page.locator('.btn-primary', {hasText: 'Sign Up'});
        this.container = this.page.locator('.modal-content');
        this.name = this.container.locator('#signupName');
        this.lastName = this.container.locator('#signupLastName');
        this.email = this.container.locator('#signupEmail');
        this.password = this.container.locator('#signupPassword');
        this.repeatPassword = this.container.locator('#signupRepeatPassword');
        this.submitButton = this.container.locator('.btn-primary', {hasText: 'Register'});
        this.profileButton = page.locator('#userNavDropdown');
    }

    async openSignUpPopup() {
        await this.signUpButton.click();
        return new SignUpPopup(this.page);
    }

    async fillInRegForm({name, lastName, email, password, repeatPassword}) {
        await this.name.fill(name);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.repeatPassword.fill(repeatPassword);
    }

    async createUser({name, lastName, email, password, repeatPassword}) {
        await this.fillInRegForm({name, lastName, email, password, repeatPassword});
        await this.submitButton.click();
    }



}