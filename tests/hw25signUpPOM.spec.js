import {test, expect} from "@playwright/test";
import { faker } from '@faker-js/faker';
import MainPage from "../src/pageObjects/main/mainPage.js";
import SignUpPopup from "../src/pageObjects/registration/components/SignUpPopup.js";

test.describe("SignUp tests POM", () => {

    let mainPage;
    let signUp;

    test.beforeEach( async ({ page }) => {
        mainPage = new MainPage(page);
        signUp = new SignUpPopup(page);
        await mainPage.navigate();
    });

    test("Successful SignUp POM", async () => {

        const passNums = faker.number.int({min: 200, max: 900});
        const email = faker.internet.email();
        const user = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: `aqaD-${email}`,
            password: `Qwerty${passNums}`,
            repeatPassword: `Qwerty${passNums}`,
        };

         const popup = await mainPage.openSignUpPopup();
         await popup.createUser(user);
        //await registration.createNewUser(user);

        await expect(signUp.profileButton, "Button should be visible").toBeVisible();


    });

    test('Incorrect email format validation POM', async () => {

        await mainPage.openSignUpPopup();
        await signUp.email.fill("wrong-email-format");
        await signUp.email.blur();

        await expect(signUp.container.getByText('Email is incorrect')).toBeVisible();
        await expect(signUp.email).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    });

    test('Empty name validation POM', async () => {
        await mainPage.openSignUpPopup();
        await signUp.name.click();
        await signUp.name.blur();

        await expect(signUp.container.getByText('Name required')).toBeVisible();
        await expect(signUp.name).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    });

    test('Last name is too long validation POM', async () => {
        await mainPage.openSignUpPopup();
        await signUp.lastName.fill("asdfwerqwertasdgasdfaerqwersadf");
        await signUp.lastName.blur();

        await expect(signUp.container.getByText('Last name has to be from 2 to 20 characters long'))
            .toBeVisible();
        await expect(signUp.lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    });

    test('Password has less than 8 chars POM', async () => {
        await mainPage.openSignUpPopup();
        await signUp.password.fill("123qwe");
        await signUp.password.blur();

        await expect(signUp.container.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'))
            .toBeVisible();
        await expect(signUp.password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Password has more than 15 chars POM', async () => {
        await mainPage.openSignUpPopup();
        await signUp.password.fill("123qweqweQWEQWE123QWE!@#QWE!@#");
        await signUp.password.blur();

        await expect(signUp.container.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'))
            .toBeVisible();
        await expect(signUp.password).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    });

    test('Wrong repeat password format validation POM', async () => {

        await mainPage.openSignUpPopup();
        await signUp.password.fill("qwe123QWE!");
        await signUp.password.blur();

        await signUp.repeatPassword.fill("123qweQWE!");
        await signUp.repeatPassword.blur();

        await expect(signUp.container.getByText('Passwords do not match'))
            .toBeVisible();
        await expect(signUp.repeatPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

});

