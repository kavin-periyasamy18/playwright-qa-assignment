import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../utils/apiHelper';
import { APIDETAILS } from '../../utils/constants';

test('ReqRes user flow', async ({ request }) => {
  const api = new ApiHelper(request);

  let userId: string;

  await test.step('Create user', async () => {
    const createResponse = await api.createUser(APIDETAILS.NAME, APIDETAILS.JOB);
    expect(createResponse.status(), 'Create should return 201').toBe(201);

    const createdBody = await createResponse.json();
    userId = createdBody.id;

    expect(userId, 'User ID should be returned').toBeTruthy();
    expect(createdBody.name, 'Name should match').toBe(APIDETAILS.NAME);
    expect(createdBody.job, 'Job should match').toBe(APIDETAILS.JOB);
  });

  await test.step('Get user', async () => {
    const getResponse = await api.getUser(userId);

    // If your ReqRes setup does not persist created users, this may not be 200.
    expect([200, 404]).toContain(getResponse.status());

    if (getResponse.status() === 200) {
      const getBody = await getResponse.json();
      expect(getBody).toBeTruthy();
    }
  });

  await test.step('Update user name', async () => {
    const updatedName = `${APIDETAILS.NAME} Updated`;
    const updateResponse = await api.updateUser(userId, updatedName);

    expect(updateResponse.status(), 'Update should return 200').toBe(200);

    const updatedBody = await updateResponse.json();
    expect(updatedBody.name, 'Updated name should match').toBe(updatedName);
  });
});