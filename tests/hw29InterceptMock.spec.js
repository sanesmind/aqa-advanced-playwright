import {test} from "../src/customFixtures/guestFixture.js";
import {garageTest} from "../src/customFixtures/userGaragePage.js";
import {expect} from "@playwright/test";

test.describe("Intercept request and mock data", () => {

    test("Abort get car brands", async ({page}) => {
        await test.step("car brands abort", async () => {
            await page.route("/api/cars/brands", async (route)=>{
                await route.abort();
            });
        });
    });


    garageTest("Mock user", async ({page}) => {
        await garageTest.step("Mock user data", async () => {
            await page.route('**/api/users/profile', async (route)=>{
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        data: {
                            lastName: "Test",
                            name: "Mock",
                            photoFilename: "default-user.png",
                            userId: 315291 }
                    })
                });
            });
            await page.goto("/panel/profile");
            await expect(page.locator('p.profile_name.display-4')).toHaveText('Mock Test');

            await page.pause();
        });
    });
});