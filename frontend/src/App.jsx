import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import LoginButton from "./components/LoginButton";
// import LogoutButton from "./components/LogoutButton";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      {/* <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">PlanForage</h1>
        <LoginButton />
        <LogoutButton />
      </div> */}
    </BrowserRouter>
  );
};

export default App;
