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

export async function deleteItem(id, token) {
  try {
    console.log(id, token);
    await httpClient.delete('cart/' + id, { headers: { token } });
    return null;
  } catch (error) {
    return true;
  }
}
