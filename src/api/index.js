import axios from 'axios';

const URL = `/api`

export async function getAllLinks() {
  try {
    const { data } = await axios.get(URL + `/links`);
    return data;
  } catch (error) {
    throw error;
  }
}