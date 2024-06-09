import useUserContext from "./context/useUserContext";

export default function App() {
  const { user, setUser } = useUserContext();
  return (
    <div>
      <p>User: {user ? user.name : "No user logged in"}</p>
      <button
        onClick={() => setUser({ name: "Jane Doe", email: "jane@example.com" })}
      >
        Set User
      </button>
    </div>
  );
}
