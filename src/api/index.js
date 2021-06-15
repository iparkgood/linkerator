import axios from 'axios';

const URL = `http://localhost:5000/api`

export async function getAllLinks() {
  try {
    const { data } = await axios.get(URL + `/links`);
    return data;
  } catch (error) {
    throw error;
  }
}