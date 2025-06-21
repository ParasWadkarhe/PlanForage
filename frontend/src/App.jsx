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
    </BrowserRouter>
  );
};

export default App;
