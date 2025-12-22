import {baseCustomFixture as base} from "./baseCustomFixture.js";
import GaragePage from "../pageObjects/garage/GaragePage.js";
import {faker} from "@faker-js/faker";

export const newUserTest = base.extend({

    userData: async({}, use) =>{
        const passNums= faker.number.int({min: 200, max: 900});
        const email = faker.internet.email();
        const user= {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: `aqaD-${email}`,
            password: `Qwerty${passNums}`,
            repeatPassword: `Qwerty${passNums}`,
        };

        await use(user);

    },

    garagePage: async ({page, mainPage, userData}, use) => {

        const newUser = await mainPage.openSignUpPopup();
        await newUser.createUser(userData);
        await use(new GaragePage(page));
    }

});
