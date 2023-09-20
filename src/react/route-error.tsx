import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const message = error instanceof Error
      ? error.message
      : String(error)

  return (
    <div className="mycelium h-screen">
      <div className="container mx-auto p-8 text-xl">
        <h1 className="text-5xl">oops!</h1>
        <p className="my-2">Sorry, an unexpected error has occurred.</p>
        <blockquote className="border-l-2 border-white pl-3 mt-6">
          {message}
        </blockquote>
      </div>
    </div>
  );
}

export default <ErrorPage />
