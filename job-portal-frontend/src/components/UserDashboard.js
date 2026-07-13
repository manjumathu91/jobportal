
import React from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaFileUpload,
  FaHeart,
  FaBuilding,
  FaUserEdit,
} from "react-icons/fa";

const UserDashboard = () => {
  const username = localStorage.getItem("username") || "User";

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl">

        <h1 className="text-4xl font-bold">
          Welcome, {username} 👋
        </h1>

        <p className="mt-3 text-blue-100 text-lg">
          Manage your applications and build your career with JobPortal.
        </p>

      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:-translate-y-2 transition">
          <FaBriefcase className="text-5xl text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">12</h2>
          <p className="text-gray-500">Applied Jobs</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:-translate-y-2 transition">
          <FaHeart className="text-5xl text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">5</h2>
          <p className="text-gray-500">Saved Jobs</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:-translate-y-2 transition">
          <FaFileUpload className="text-5xl text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">1</h2>
          <p className="text-gray-500">Resume Uploaded</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:-translate-y-2 transition">
          <FaBuilding className="text-5xl text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">250+</h2>
          <p className="text-gray-500">Companies</p>
        </div>

      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

        <h2 className="text-3xl font-bold mb-6">
          Recent Activity
        </h2>

        <div className="space-y-4">

          <div className="border-l-4 border-blue-600 pl-4 py-2">
            ✅ Applied for Python Full Stack Developer
          </div>

          <div className="border-l-4 border-green-600 pl-4 py-2">
            📄 Resume Uploaded Successfully
          </div>

          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            👤 Profile Updated
          </div>

        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-5">

          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Find Jobs
          </Link>

          <Link
            to="/resume"
            className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition"
          >
            Upload Resume
          </Link>

          

        </div>

      </div>

    </div>
  );
};

export default UserDashboard;