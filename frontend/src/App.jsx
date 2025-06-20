import LoginButton from "./components/login";
import LogoutButton from "./components/logout";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">PlanForage</h1>
      <LoginButton />
      <LogoutButton />
    </div>
  );
};

export default App;
