import { Routes, Route } from "react-router-dom";
import  Login  from "./Login"
import { Signup } from "./Signup";
import { Home } from "./Home"
import { Layout } from "./component/Layout"
import "./App.css";

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
        <Route index path="/home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
