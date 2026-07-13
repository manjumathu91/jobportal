
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        location: '',
        job_type: ''
    });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true); 
                const queryString = new URLSearchParams(filters).toString();
                const response = await axios.get(`https://vercel.app{queryString}`);
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

    return (
        // 2. Responsive UI Layout container
        
        <div className="w-full mx-auto px-6 py-10">
            
            
            <section className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700">

  <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20">

    <div className="grid lg:grid-cols-2 items-center gap-16">

      {/* Left Side */}
      <div>

        <span className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-white font-semibold">
          🚀 India's No.1 Job Portal
        </span>

        <h1 className="text-5xl lg:text-7xl font-extrabold text-white mt-8 leading-tight">
          Find Your <br />
          <span className="text-yellow-300">
            Dream Job
          </span>
        </h1>

        <p className="text-xl text-blue-100 mt-8 leading-9 max-w-xl">
          Discover thousands of verified jobs from top companies across India.
          Build your career with confidence and land your dream job faster.
        </p>

        <div className="flex gap-5 mt-10">

          <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 duration-300">
            Explore Jobs
          </button>

          <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 duration-300">
            Learn More
          </button>

        </div>

      </div>

      {/* Right Side */}

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center hover:scale-105 duration-300">
          <h2 className="text-6xl font-bold text-white">
            1000+
          </h2>

          <p className="text-lg text-blue-100 mt-3">
            Jobs Available
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center hover:scale-105 duration-300">
          <h2 className="text-6xl font-bold text-white">
            250+
          </h2>

          <p className="text-lg text-blue-100 mt-3">
            Companies
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center hover:scale-105 duration-300">
          <h2 className="text-6xl font-bold text-white">
            5000+
          </h2>

          <p className="text-lg text-blue-100 mt-3">
            Candidates
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center hover:scale-105 duration-300">
          <h2 className="text-6xl font-bold text-white">
            24/7
          </h2>

          <p className="text-lg text-blue-100 mt-3">
            Support
          </p>
        </div>

      </div>

    </div>

  </div>

</section>

             {/* Top Companies */}

<section className="py-14">

  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-10">

      <h2 className="text-4xl font-bold text-gray-800">
        Top Hiring Companies
      </h2>

      <p className="text-gray-500 mt-3 text-lg">
        Trusted by India's leading companies
      </p>

    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

      {[
        "Google",
        "Microsoft",
        "Amazon",
        "Infosys",
        "TCS",
        "Zoho",
      ].map((company, index) => (

        <div
          key={index}
          className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center hover:-translate-y-2 hover:shadow-xl duration-300 cursor-pointer"
        >

          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700">

            {company.charAt(0)}

          </div>

          <h3 className="mt-4 font-semibold text-gray-700">
            {company}
          </h3>

        </div>

      ))}

    </div>

  </div>

</section>
{/* Why Choose Us */}

<section className="py-20 bg-gray-50 rounded-3xl mt-16">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-14">

      <h2 className="text-4xl font-bold text-gray-800">
        Why Choose JobPortal?
      </h2>

      <p className="text-gray-500 text-lg mt-3">
        Everything you need to land your dream job.
      </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">
        <div className="text-5xl mb-4">💼</div>
        <h3 className="text-xl font-bold mb-2">Verified Jobs</h3>
        <p className="text-gray-600">
          Explore thousands of verified job opportunities from trusted companies.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">
        <div className="text-5xl mb-4">🏢</div>
        <h3 className="text-xl font-bold mb-2">Top Companies</h3>
        <p className="text-gray-600">
          Connect with India's leading startups and multinational companies.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">
        <div className="text-5xl mb-4">📄</div>
        <h3 className="text-xl font-bold mb-2">Easy Resume Upload</h3>
        <p className="text-gray-600">
          Upload your resume and apply for jobs with just one click.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">
        <div className="text-5xl mb-4">⚡</div>
        <h3 className="text-xl font-bold mb-2">Quick Apply</h3>
        <p className="text-gray-600">
          Save time with our fast and simple application process.
        </p>
      </div>

    </div>

  </div>

</section>
{/* Resume Upload CTA */}

<section className="py-20">

  <div className="max-w-7xl mx-auto">

    <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 rounded-3xl p-10 lg:p-16 shadow-2xl">

      <div className="grid lg:grid-cols-2 items-center gap-10">

        {/* Left Side */}

        <div>

          <span className="bg-white/20 text-white px-4 py-2 rounded-full font-medium">
            📄 Resume Upload
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-6 leading-tight">
            Upload Your Resume &
            <br />
            Get Hired Faster
          </h2>

          <p className="text-blue-100 text-lg mt-6 leading-8">
            Create your profile, upload your resume and let top companies
            discover you. Increase your chances of getting hired today.
          </p>

          <button
            className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition duration-300"
          >
            Upload Resume
          </button>

        </div>

        {/* Right Side */}

        <div className="grid grid-cols-2 gap-5">

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <h3 className="text-5xl font-bold text-white">95%</h3>
            <p className="text-blue-100 mt-2">
              Resume Success Rate
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <h3 className="text-5xl font-bold text-white">10K+</h3>
            <p className="text-blue-100 mt-2">
              Active Recruiters
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <h3 className="text-5xl font-bold text-white">5K+</h3>
            <p className="text-blue-100 mt-2">
              Daily Applications
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <h3 className="text-5xl font-bold text-white">24/7</h3>
            <p className="text-blue-100 mt-2">
              Career Support
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>

</section>
{/* Testimonials Section */}

<section className="py-20 bg-gray-50">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-14">
      <h2 className="text-4xl font-bold text-gray-800">
        Success Stories
      </h2>

      <p className="text-gray-500 text-lg mt-3">
        Hear from candidates who found their dream jobs through JobPortal.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {[
        {
          name: "Rahul Sharma",
          role: "Software Engineer",
          company: "TCS",
          review:
            "JobPortal made my job search simple. I received interview calls within a week!",
        },
        {
          name: "Priya Nair",
          role: "UI/UX Designer",
          company: "Zoho",
          review:
            "The resume upload feature helped recruiters find my profile quickly.",
        },
        {
          name: "Arun Kumar",
          role: "Backend Developer",
          company: "Infosys",
          review:
            "Professional interface and verified jobs. Highly recommended for freshers.",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
        >
          <div className="text-yellow-400 text-2xl mb-4">
            ⭐⭐⭐⭐⭐
          </div>

          <p className="text-gray-600 italic leading-7">
            "{item.review}"
          </p>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-xl font-bold text-gray-800">
              {item.name}
            </h3>

            <p className="text-blue-600">
              {item.role}
            </p>

            <p className="text-gray-500 text-sm">
              {item.company}
            </p>
          </div>
        </div>
      ))}

    </div>

  </div>

</section>
{/* Footer */}

<footer className="bg-gray-900 text-white mt-20">

  <div className="max-w-7xl mx-auto px-6 py-16">

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* Company */}

      <div>

        <h2 className="text-3xl font-bold text-blue-400">
          JobPortal
        </h2>

        <p className="text-gray-400 mt-4 leading-7">
          Connecting talented professionals with top companies.
          Find your dream career with trusted employers across India.
        </p>

      </div>

      {/* Quick Links */}

      <div>

        <h3 className="text-xl font-semibold mb-5">
          Quick Links
        </h3>

        <ul className="space-y-3 text-gray-400">

          <li className="hover:text-white cursor-pointer">Home</li>
          <li className="hover:text-white cursor-pointer">Find Jobs</li>
          <li className="hover:text-white cursor-pointer">Dashboard</li>
          <li className="hover:text-white cursor-pointer">Upload Resume</li>

        </ul>

      </div>

      {/* Support */}

      <div>

        <h3 className="text-xl font-semibold mb-5">
          Support
        </h3>

        <ul className="space-y-3 text-gray-400">

          <li className="hover:text-white cursor-pointer">Contact Us</li>
          <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          <li className="hover:text-white cursor-pointer">Help Center</li>

        </ul>

      </div>

      {/* Contact */}

      <div>

        <h3 className="text-xl font-semibold mb-5">
          Contact
        </h3>

        <p className="text-gray-400">
          📧 support@jobportal.com
        </p>

        <p className="text-gray-400 mt-3">
          📞 +91 98765 43210
        </p>

        <p className="text-gray-400 mt-3">
          📍 Chennai, Tamil Nadu
        </p>

      </div>

    </div>

    <hr className="border-gray-700 my-10" />

    <div className="flex flex-col md:flex-row justify-between items-center">

      <p className="text-gray-500">
        © 2026 JobPortal. All Rights Reserved.
      </p>

      <div className="flex gap-5 mt-4 md:mt-0 text-2xl">

        <span className="cursor-pointer hover:text-blue-400">🌐</span>
        <span className="cursor-pointer hover:text-blue-400">💼</span>
        <span className="cursor-pointer hover:text-blue-400">📘</span>
        <span className="cursor-pointer hover:text-blue-400">📷</span>

      </div>

    </div>

  </div>

</footer>
        </div>
    );
};

export default JobList;
