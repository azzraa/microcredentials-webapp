import React from 'react';

const CredentialList = ({ credentials }) => {
  if (!credentials || credentials.length === 0) {
    return <p>No credentials available.</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Available Microcredentials</h2>

      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {credentials.map((credential) => (
          <li
            key={credential.id}
            style={{
              backgroundColor: '#f9f9f9',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}
          >
            <h3 style={{ margin: '0 0 10px' }}>{credential.title}</h3>
            <p style={{ margin: '0 0 10px' }}>
              <strong>Description:</strong> {credential.description}
            </p>
            <p style={{ margin: '0 0 10px' }}>
              <strong>Category:</strong> {credential.category || 'N/A'}
            </p>
            <p style={{ margin: '0 0 10px' }}>
              <strong>EQF Level:</strong> {credential.eqfLevel || 'N/A'}
            </p>

            {/* Example of a Delete Button or View Details */}
            <div style={{ marginTop: '10px' }}>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                View Details
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#FF5733',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CredentialList;
