import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { useState } from "react";

export default function App() {

    const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      {/* <Route path="/sign-in" element={<SignIn setUser={setUser} />} /> */}
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      {/* <Route path="/profile" element={<Profile user={user} />} /> */}
    </Routes>
    </BrowserRouter>
  )
}



