import httpClient from './axios';
import PAGE_CAP from '../utility/page_cap';
export async function fetchList(mode, pageIndex, query) {
  let result;
  let url = `meals?pageIndex=${pageIndex}&pageSize=${PAGE_CAP}&mode=${mode}`;
  if (query) {
    url += `&query=${query}`;
  }
  try {
    result = await httpClient.get(url);
    if (mode) return result.data.count;
    //
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
