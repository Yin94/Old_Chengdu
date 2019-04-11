import httpClient from './axios';
export async function fetchList(token) {
  try {
    const result = await httpClient.get('cart', { headers: { token } });

    return result.data;
  } catch (error) {
    const status = error.response.status;
    if (status === 403) return 3;
    else return 0;
  }
}

export async function signInWithEmail(email, password) {
  try {
    const result = await httpClient.post('auth/signin', { email, password });
    return result.data;
  } catch (error) {
    const status = error.response.status;
    if (status === 401) return 1;
    if (status === 403) return 2;
  }
}
