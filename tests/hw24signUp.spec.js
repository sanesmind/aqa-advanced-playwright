import {test, expect} from "@playwright/test";
import { faker } from '@faker-js/faker';

test.describe("SignUp tests", () => {

    test.beforeEach( async ({ page }) => {
        await page.goto("/");
    });

    test("Successful SignUp", async ({page}) => {

        const passNums = faker.number.int({min: 200, max: 900});
        const email = faker.internet.email();
        const user = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: `aqaD-${email}`,
            password: `Qwerty${passNums}`,
            repeatPassword: `Qwerty${passNums}`,
        };

        const signUpButton = page.locator('.btn-primary', {hasText: 'Sign Up'});
        await signUpButton.click();

        const signUpPopup = page.locator('.modal-content');
        const nameInput = signUpPopup.locator('#signupName');
        const lastNameInput = signUpPopup.locator('#signupLastName');
        const emailInput = signUpPopup.locator('#signupEmail');
        const passwordInput = signUpPopup.locator('#signupPassword');
        const repeatPasswordInput = signUpPopup.locator('#signupRepeatPassword');
        const submitButton = signUpPopup.locator('.btn-primary');

        await nameInput.fill(user.name);
        await lastNameInput.fill(user.lastName);
        await emailInput.fill(user.email);
        await passwordInput.fill(user.password);
        await repeatPasswordInput.fill(user.repeatPassword);
        await submitButton.click();


    });

    test('Incorrect email format validation', async ({page}) => {
        const signupButton = page.getByRole("button", {name: 'Sign up'});
        await signupButton.click();

        const signupPopup =  page.locator('.modal-content');

        const emailInput = signupPopup.locator('#signupEmail');
        await emailInput.fill("wrong-email-format");
        await emailInput.blur();

        await expect(signupPopup.getByText('Email is incorrect')).toBeVisible();

        // // Перевірка border-color
        // const borderColor = await emailInput.evaluate(el => getComputedStyle(el).borderColor);
        // expect(borderColor.includes('220')).toBeTruthy();
    });

    test('Empty name validation', async ({page}) => {
        const signupButton = page.getByRole("button", {name: 'Sign up'});
        await signupButton.click();

        const signupPopup =  page.locator('.modal-content');

        const nameInput = signupPopup.locator('#signupName');
        await nameInput.click();
        await nameInput.blur();

        await expect(signupPopup, "Name is empty validation")
            .toContainText("Name required");
    });

    test('Last name is too long validation', async ({page}) => {
        const signupButton = page.getByRole("button", {name: 'Sign up'});
        await signupButton.click();

        const signupPopup =  page.locator('.modal-content');
        const lastNameInput = signupPopup.locator('#signupLastName');
        await lastNameInput.fill("asdasdasdasdasdasdasdasdasdasdasdasasdasd");
        await lastNameInput.blur();

        await expect(signupPopup, "Last name has wrong length validation")
            .toContainText("Last name has to be from 2 to 20 characters long");
    });

    test('Password has less than 8 chars', async ({page}) => {
        const signupButton = page.getByRole("button", {name: 'Sign up'});
        await signupButton.click();

        const signupPopup =  page.locator('.modal-content');
        const passwordInput = signupPopup.locator('#signupPassword');
        await passwordInput.fill("asd123");
        await passwordInput.blur();

        await expect(signupPopup, "Password has less than 8 chars validation")
            .toContainText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    });

    test('Password has more than 15 chars', async ({page}) => {
        const signupButton = page.getByRole("button", {name: 'Sign up'});
        await signupButton.click();

        const signupPopup =  page.locator('.modal-content');
        const passwordInput = signupPopup.locator('#signupPassword');
        await passwordInput.fill("asd123asd123asd123");
        await passwordInput.blur();

        await expect(signupPopup, "Password has more than 15 chars validation")
            .toContainText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    });

    test('Wrong repeat password format validation', async ({page}) => {
        const signupButton = page.getByRole("button", {name: 'Sign up'});
        await signupButton.click();

        const signupPopup =  page.locator('.modal-content');

        const passwordInput = signupPopup.locator('#signupPassword');
        await passwordInput.fill("qwe123QWE!");

        const repeatPassInput = signupPopup.locator('#signupRepeatPassword');
        await repeatPassInput.fill("123qweQWE!");
        await repeatPassInput.blur();

        await expect(signupPopup, "Passwords do not match validation")
            .toContainText("Passwords do not match");
    });

});

