import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import LoginButton from "./components/LoginButton";
import Chat from './components/Chat';
// import LogoutButton from "./components/LogoutButton";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route path="/home" element={<Home />} />
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
