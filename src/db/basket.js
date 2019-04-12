import httpClient from './axios';
export async function fetchList(token) {
  try {
    const result = await httpClient.get('cart', { headers: { token } });

    return result.data;
  } catch (error) {
    return error;
  }
}

export async function addListItem(mealId, count, token) {
  try {
    console.log(token);
    console.log(mealId, count);

    const result = await httpClient.post(
      'cart',
      { mealId, count },
      { headers: { token } }
    );

    return result.data;
  } catch (error) {
    return error;
  }
}
