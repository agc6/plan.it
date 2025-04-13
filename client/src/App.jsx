import { Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import GetStarted from "./pages/GetStarted";
import LogIn from "./pages/LogIn";
import Calender from "./components/CalenderSite/Calender";
import Dailypage from "./components/CalenderSite/Dailypage";
import { TaskProvider } from "./components/CalenderSite/TaskContext";

function App() {
  return (
  <TaskProvider>
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
      <Route path="/day/:year/:month/:day" element={<Dailypage />} />
    </Routes>
  </TaskProvider>
  );
}

export default App;
