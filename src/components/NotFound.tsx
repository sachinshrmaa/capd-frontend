import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-10 w-[300px] mx-auto">
      <h1>Uh-oh! Page Not Found </h1>
      <Link to="/" className="underline text-blue-700">
        Go back to home
      </Link>
    </div>
  );
}
