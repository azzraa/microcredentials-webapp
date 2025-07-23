import React, { useEffect, useState } from 'react';

const CredentialDashboard = () => {
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/credentials')
      .then(res => res.json())
      .then(setCredentials);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Available Credentials</h2>
      {credentials.length === 0 ? (
        <p>No credentials found.</p>
      ) : (
        <ul className="space-y-4">
          {credentials.map(c => (
            <li key={c.id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{c.credentialSubject?.title || c.title}</h3>
              <p>{c.credentialSubject?.description || c.description || 'No description available'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CredentialDashboard;
