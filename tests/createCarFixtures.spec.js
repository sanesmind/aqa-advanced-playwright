import {garageTest} from "../src/customFixtures/userGaragePage.js";


garageTest.describe.only("Create Car (fixtures)", () => {

    garageTest("Create Car ", async ({garagePage}) => {
        const brand = "Audi";
        const model = "TT";
        const mileage = "123";

        await garageTest.step("Create new car", async () => {
            const addCarPopup = await garagePage.openAddCarPopup();
            await addCarPopup.createCar({brand, model, mileage});
        });

        await garageTest.step("Verify created car", async () => {
           const carCard = await garagePage.getCarCard({brand, model});
           await carCard.assertBrand(brand);
           await carCard.assertModel(model);
           await carCard.assertMileage(mileage);
        });
    });

});