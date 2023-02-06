export const get: APIRoute = ({ params, request }) => {
  return {
    body: JSON.stringify({
      message: "This was a GET!"
    })
  }
};