import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-48">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="text-indigo-500 font-bold text-7xl">
            {error.status}
          </div>

          <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
            {error.statusText}
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-20">
            <Link to="/">Go back to the homepage</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
