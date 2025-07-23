import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const EvaluatorDashboard = ({ onLogout }) => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/applications', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(setApplications);
  }, []);

  const handleAction = (id, status) => {
    fetch(`http://localhost:4000/api/applications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status })
    }).then(() => {
      setApplications(applications.filter(app => app.id !== id));
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Homepage
        </button>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Pending Applications</h2>
      {applications.length === 0 && <p>No pending applications.</p>}
      {applications.map(app => (
        <div key={app.id} className="mb-4 p-4 border rounded shadow">
          <p><strong>User:</strong> {app.userName}</p>
          <p><strong>Credential:</strong> {app.credentialName}</p>
          <p><strong>Comment:</strong> {app.comment}</p>
          {app.filePath && (
            <a
              href={`http://localhost:4000/${app.filePath}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View Attachment
            </a>
          )}
          <div className="mt-2 space-x-2">
            <button
              onClick={() => handleAction(app.id, 'approved')}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={() => handleAction(app.id, 'rejected')}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
