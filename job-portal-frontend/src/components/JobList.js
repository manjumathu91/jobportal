
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        location: '',
        job_type: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true); 
                const queryString = new URLSearchParams(filters).toString();
                const response = await axios.get(`http://localhost:8000/api/jobs/?${queryString}`);
                setJobs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setLoading(false);
            }
        };
        fetchJobs();
    }, [filters]); 

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    // 1. Tailwind UX: Clean Professional Spinning Loader Animation
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center mt-12 font-sans">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600"></div>
                <p className="mt-4 text-gray-600 text-sm font-medium animate-pulse">Fetching available jobs...</p>
            </div>
        );
    }
    const handleApply = (jobId) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        navigate("/login", {
            state: { from: `/jobs/${jobId}` }
        });
        return;
    }

    navigate(`/jobs/${jobId}`);
};

    return (
        // 2. Responsive UI Layout container
        <div className="max-w-7xl mx-auto px-6 py-10">
           <div className="mb-8">
  <h1 className="text-4xl font-bold text-gray-900">
    Find Your Dream Job
  </h1>

  <p className="text-gray-500 mt-2 text-lg">
    Browse thousands of verified jobs from top companies.
  </p>
</div>

            {/* Responsive Filter Panel with Tailwind Flex Wrap and Grid-like flexibility */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-wrap gap-4 mb-10">
                <select 
                    name="category" 
                    value={filters.category} 
                    onChange={handleFilterChange} 
                    className="p-2.5 rounded-md border border-gray-300 flex-1 min-w-[150px] bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                </select>

                <input 
                    type="text" 
                    name="location" 
                    placeholder="Search Location..." 
                    value={filters.location} 
                    onChange={handleFilterChange} 
                    className="p-2.5 rounded-md border border-gray-300 flex-1 min-w-[150px] bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select 
                    name="job_type" 
                    value={filters.job_type} 
                    onChange={handleFilterChange} 
                    className="p-2.5 rounded-md border border-gray-300 flex-1 min-w-[150px] bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Types</option>                                                                             
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                </select>
            </div>
{/* Job Cards Layout Container */}
<div className="grid gap-6">

  {jobs.length > 0 ? (

    jobs.map((job) => (

      <div
        key={job.id}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1"
      >

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h3 className="text-3xl font-bold text-blue-700">
              {job.title}
            </h3>

            <div className="flex items-center gap-2 mt-3 text-gray-700">
              <FaBuilding className="text-blue-600" />
              <span className=" text-xl font-semibold text-gray-800">
                {job.company}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-lg text-gray-600">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{job.location}</span>
            </div>

          </div>

          <div>
            <span className="bg-blue-100 text-blue-700 px-5 py-3 rounded-full text-lg font-bold">              
                {job.job_type}
            </span>
          </div>

        </div>

        {/* Description */}
        <p className="mt-6 text-lg  leading-8 text-gray-700">
          {job.description}
        </p>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-5">

          <div className="flex items-center gap-2 text-gray-500">
            <FaBriefcase className="text-green-600" />
            <span className="text-lg font-medium">Immediate Hiring</span>
          </div>

          <button
    onClick={() => handleApply(job.id)}
    className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg transition duration-300"
>
    Apply Now
</button>

        </div>

      </div>

    ))

  ) : (

    <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl py-12 text-center">

      <FaSearch className="text-5xl text-gray-400 mx-auto mb-4" />

      <h3 className="text-2xl font-bold text-gray-700">
        No Jobs Found
      </h3>

      <p className="text-gray-500 mt-2">
        Try changing your search filters and search again.
      </p>

    </div>

  )}

</div>
            
        
        </div>
    );
};

export default JobList;
