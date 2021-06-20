import axios from "axios";

const URL = `/api`;

export async function createComment(linkId, comment) {
  try {
    const response = await axios.post(URL + `/comments`, { linkId, comment });
    return response;
  } catch (error) {
    console.log("Trouble sending comment to the backEnd");
    console.error(error);
  }
}
