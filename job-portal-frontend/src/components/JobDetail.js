
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://vercel.app{id}/`
        );
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin"></div>
        <p className="mt-4 text-lg text-gray-600">Loading Job Details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-600">
          Job Not Found
        </h2>

        <Link
          to="/jobs"
          className="mt-6 inline-block text-blue-600 font-semibold"
        >
          ← Back to Jobs
        </Link>
      </div>
    );
  }
  const handleApply = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Please login first.");
    navigate("/login");
    return;
  }

  try {
    await axios.post(
      "http://127.0.0.1:8000/api/apply/",
      {
        job_id: job.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("🎉 Application Submitted Successfully!");
    navigate("/dashboard");

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data.detail);
    } else {
      alert("Something went wrong.");
    }
  }
};

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <Link
        to="/jobs"
        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 mb-8"
      >
        <FaArrowLeft />
        Back to Jobs
      </Link>

      <div className="bg-white rounded-3xl shadow-xl p-10">

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>

            <h1 className="text-4xl font-bold text-gray-900">
              {job.title}
            </h1>

            <div className="mt-6 space-y-3">

              <div className="flex items-center gap-3">
                <FaBuilding className="text-blue-600" />
                <span className="text-xl">{job.company}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-red-500" />
                <span>{job.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaBriefcase className="text-green-600" />
                <span>{job.job_type}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMoneyBillWave className="text-yellow-500" />
                <span>{job.salary || "₹5 - ₹10 LPA"}</span>
              </div>

            </div>

          </div>

          <div>

            <span className="bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-bold text-lg">
              {job.job_type}
            </span>

          </div>

        </div>

        <hr className="my-10" />

        <h2 className="text-2xl font-bold mb-4">
          Job Description
        </h2>

        <p className="text-gray-600 leading-8 text-lg">
          {job.description}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          <div>

            <h2 className="text-2xl font-bold mb-5">
              Required Skills
            </h2>

            <div className="space-y-3">

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                Python
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                Django
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                React
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                MySQL
              </div>

            </div>

          </div>

          <div>

            <h2 className="text-2xl font-bold mb-5">
              Benefits
            </h2>

            <div className="space-y-3">

              <div>✅ Health Insurance</div>
              <div>✅ Paid Leave</div>
              <div>✅ Flexible Working Hours</div>
              <div>✅ Performance Bonus</div>

            </div>

          </div>

        </div>

        <div className="mt-12 text-center">

          <button
            onClick={handleApply}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold px-10 py-4 rounded-xl shadow-lg transition duration-300"
          >
            Apply Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default JobDetail;