import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ role, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="font-bold hover:underline">Home</Link>
        <Link to="/credentials" className="hover:underline">Credential Dashboard</Link>
        {role === 'creator' && <Link to="/creator" className="hover:underline">Create</Link>}
        {role === 'user' && <Link to="/user" className="hover:underline">Apply</Link>}
        {role === 'evaluator' && <Link to="/evaluator" className="hover:underline">Evaluate</Link>}
      </div>

      <div>
        {role ? (
          <button
            onClick={() => {
              onLogout();
              navigate('/');
            }}
            className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-green-500 hover:bg-green-700 px-3 py-1 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
