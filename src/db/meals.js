import httpClient from './axios';

export async function fetchList(query) {
  try {
    let result;
    if (query === undefined) result = await httpClient.get(`meals`);
    else result = await httpClient.get(`meals?query=${query}`);
    const meals = [...result.data];
    meals.forEach(ele => {
      const id = ele._id;
      ele.id = id;
      delete ele._id;
    });

    return meals;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

export async function queryMeal(id) {
  try {
    const result = (await httpClient.get('meals/' + id)).data;

    delete result._id;
    result.id = id;
    return result;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}
