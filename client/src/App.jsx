
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
function App() {

  return (
    <BrowserRouter>
       <Routes>

         <Route path="/" element={<HomePage/>} />
         <Route path="/sign-up" element={<SignUp/>} />
         <Route path="/sign-in" element={<SignIn/>} />
       </Routes>
      </BrowserRouter>
  )
}

export default App
