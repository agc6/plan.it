import { Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import GetStarted from "./pages/GetStarted";
import LogIn from "./pages/LogIn";
import Calender from "./components/CalenderSite/Calender";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Hero />
            <Features />
            <Footer />
          </>
        }
      />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/calendar" element={<Calender />} />
    </Routes>
  );
}

export default App;
