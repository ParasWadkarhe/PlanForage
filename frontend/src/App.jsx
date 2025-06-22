import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Login from './components/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* <Route path='/' element={<Login/>}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
