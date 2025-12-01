export default class MainPage {
    constructor(page) {
        this.page = page;
        this._URL = "/";
    }

    async navigate() {
        await this.page.goto(this._URL);
    }

}