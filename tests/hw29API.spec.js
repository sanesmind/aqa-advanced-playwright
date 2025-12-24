import {test} from "../src/customFixtures/guestFixture.js";
import {expect, request as pwRequest} from "@playwright/test";

test.describe.only("API car creation", () => {

    test("Create a new car", async () => {
        const request = await pwRequest.newContext({
            storageState: 'state/userStorageState.json'
        });

        const carData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 1011
        };

        const response = await request.post(`/api/cars`,{
            data: carData
        });

        await expect(response).toBeOK();

        const body = await response.json();

        const carId = body.data.id;
        const responseDelete = await request.delete(`/api/cars/${carId}`, {
            data: {
                "status": "ok",
                "data": {
                    "carId": 1
                }
            }
        });
        await expect(responseDelete.ok()).toBeTruthy();

    });

    test('Create car without authorization', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 1000
            }
        });
        expect(response.status()).toBe(401);
        const body = await response.json();
        expect(body.status).toBe('error');
        expect(body.message).toContain('Not authenticated');
    });

    test('Negative: Create car with invalid mileage', async () => {
        const request = await pwRequest.newContext({
            storageState: 'state/userStorageState.json'
        });
        const response = await request.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: -500 //incorrect value, can add only 0 - 999999
            }
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.status).toBe('error');
        expect(body.message).toContain('Mileage has to be from 0 to 999999');
    });
});