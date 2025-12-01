import SignUpPopup from "./components/SignUpPopup.js";

export default class Registration extends SignUpPopup {
    constructor(page){
        super(page);

    }



    // async createNewUser({name, lastName, email, password, repeatPassword}) {
    //     const popup = await this.openSignUpPopup();
    //     await popup.fillInRegFormAndSubmit({name, lastName, email, password, repeatPassword});
    // }
}