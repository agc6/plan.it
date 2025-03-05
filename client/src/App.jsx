import { Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import GetStarted from "./pages/GetStarted"; // Sign In/Sign Up page
import Calender from "./components/CalenderSite/Calender";  // Calendar page

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
            <CTA />
            <Footer />
          </>
        }
      />
      <Route path="/get-started" element={<GetStarted />} />
      {/* Calendar route */}
      <Route path="/calendar" element={<Calender />} />
    </Routes>
  );
}

export default App;
