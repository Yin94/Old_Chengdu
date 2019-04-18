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
    await httpClient.delete('cart/' + id, { headers: { token } });
    return null;
  } catch (error) {
    return true;
  }
}
export async function clearCart(token) {
  try {
    console.log(token);
    await httpClient.put('cart/', null, { headers: { token } });
    return [];
  } catch (error) {
    return error;
  }
}
