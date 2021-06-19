const URL = `/api`;

export async function createNewTag(linkId, tag) {
  try {
    const response = await fetch(`${URL}/tags/${linkId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
