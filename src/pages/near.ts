export async function get({ request }) {
  // This solution works but feels a bit "hacky"
  const urlSearchParams = new URLSearchParams(request.url.split('?')[1]);
  const contract = urlSearchParams.get('contract')
  const responseData = {
    message: "The contract is: " + contract
  }

  return new Response(JSON.stringify(responseData), { status: 200 });
}