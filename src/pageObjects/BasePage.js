export default class BasePage {
    constructor(page, URL) {
        this.page = page;
        this._URL = URL;
    }

    async navigate() {
        await this.page.goto(this._URL);
    }
}