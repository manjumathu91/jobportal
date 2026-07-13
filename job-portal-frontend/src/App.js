
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import JobList from "./components/JobList";
import JobDetail from "./components/JobDetail";
import ResumeUpload from "./components/ResumeUpload";
import UserDashboard from "./components/UserDashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      {/* Full Page Background */}
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 font-sans text-gray-900">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="w-full mx-auto px-6 lg:px-10 py-10">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/jobs" element={<JobList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/resume" element={<ResumeUpload />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;