import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import GetStarted from "./components/GetStarted"; // added a get strated


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
    </Routes>
  );
}
 
export default App;