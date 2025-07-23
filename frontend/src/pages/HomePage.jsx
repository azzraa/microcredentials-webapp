import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-6">
        Welcome to Microcredentials Platform
      </h1>
      <p className="text-center text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
        A simple credential management system for Creators, Users, and Evaluators. Log in to get started based on your role.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Log In
          </button>
        </Link>
      </div>

      <footer className="mt-12 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Microcredentials App. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
