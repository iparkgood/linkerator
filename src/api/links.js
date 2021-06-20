import axios from "axios";

const URL = `/api`;

export async function getAllLinks() {
  try {
    const { data } = await axios.get(URL + `/links`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createNewLink(url) {
  try {
    const response = await fetch(`${URL}/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function patchLink(linkId, url) {
  try {
    const response = await fetch(`${URL}/links/${linkId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function incrementClickCount(linkId) {
  try {
    const response = await fetch(`${URL}/links/${linkId}/count`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
