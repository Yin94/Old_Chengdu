import httpClient from './axios';
export async function signUpWithEmail(user) {
  const servUser = {
    email: user.email,
    password: user.password,
    username: user.userName,
    phone: user.phone
  };
  try {
    const result = await httpClient.post('auth/signup', servUser);
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
