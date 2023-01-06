import { QueryFunction } from "react-query";

const apiUrl = "http://localhost:1337/api/";

// Fetch All

export const fetchShoppingItems = async () => {
  const res = await fetch(`${apiUrl}shopping-items`);
  console.log(res);

  return res.json();
};

// Fetch One
export const fetchItemById:any = async (key:any, { id }:any) => {
  const res = await fetch(`${apiUrl}shopping-items/${id}`);

  return res.json();
};

// Create
export const postItem = async (body:any) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  console.log({settings});
  try {
    const fetchResponse = await fetch(`${apiUrl}shopping-items`, settings);
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

// Update
export const patchItem = async (body:any) => {
  const settings = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResponse = await fetch(
      `${apiUrl}shopping-items/${body.id}`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

// Delete
export const deleteItem = async (id:any) => {
  const settings = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(
      `${apiUrl}shopping-items/${id}`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};