import { test, expect } from '../../fixtures/api.fixture';

test.describe('Users API', () => {
  test('should fetch all users and perform filtering', async ({ usersAPI }) => {
    const response = await usersAPI.getAllUsers();
    expect(response.ok()).toBeTruthy();
    
    const { users } = await response.json();
    expect(users).toHaveLength(30);

    const usersInColorado = users.filter(user => user.address.state === 'Colorado');
    expect(usersInColorado).toHaveLength(1);

    const femalesOver25 = users.filter(user => user.gender === 'female' && user.age > 25);
    expect(femalesOver25.length).toBe(14);
  });
});