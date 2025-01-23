import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;