import BaseComponent from "../../BaseComponent.js";

export default class SignUpPopup extends BaseComponent {
    constructor(page) {
        super(page);
        this.container = this.page.locator('.modal-content');
        this.name = this.container.locator('#signupName');
        this.lastName = this.container.locator('#signupLastName');
        this.email = this.container.locator('#signupEmail');
        this.password = this.container.locator('#signupPassword');
        this.repeatPassword = this.container.locator('#signupRepeatPassword');
        this.submitButton = this.container.locator('.btn-primary', {hasText: 'Register'});
        this.profileButton = page.locator('#userNavDropdown');
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