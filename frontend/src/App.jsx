import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import NotFound from "./pages/NotFound"
import { SignIn } from "./pages/SignIn"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        {/*  <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
