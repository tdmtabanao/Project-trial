// Libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./Components/Navbar";

// Context
import { UserContextProvider } from "./Context/UserContext";

// Pages
import Home from "./Pages/Home";

function App() {
 
  return (
    <>
      <UserContextProvider>
        <Router basename="/project-trial/">
          <Navbar />
          <main>
            <Routes>
             <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </Router>
      </UserContextProvider>
    </>
  )
}

export default App
