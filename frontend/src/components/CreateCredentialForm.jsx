import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCredentialForm = ({ onLogout }) => {
  const [formData, setFormData] = useState({ title: '', description: '', category: '', skills: '', eqfLevel: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const buildJsonLdCredential = (formData) => {
    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        {
          "ex": "https://example.org/credentials/v1",
          "eqfLevel": "ex:eqfLevel",
          "skills": "ex:skills"
        }
      ],
      type: ["VerifiableCredential", "Microcredential"],
      issuer: "https://yourapp.example.com/issuer/123",
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: "did:example:student-001",
        title: formData.title,
        description: formData.description,
        eqfLevel: formData.eqfLevel,
        skills: formData.skills.split(',').map(s => s.trim())
      }
    };
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      setError('Title and Description are required!');
      return;
    }

    const jsonLdCredential = buildJsonLdCredential(formData);

    try {
      const response = await fetch('http://localhost:4000/api/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(jsonLdCredential)
      });

      if (!response.ok) throw new Error('Failed to create credential');

      const data = await response.json();
      console.log('Credential created:', data);

      setError('');
      setFormData({ title: '', description: '', category: '', skills: '', eqfLevel: '' });
      alert('Credential created successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl mb-4 font-bold">Create New Microcredential</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="eqfLevel"
          placeholder="EQF Level"
          value={formData.eqfLevel}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
        >
          Create Credential
        </button>
      </form>

      <div className="flex gap-4">
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
    </div>
  );
};

export default CreateCredentialForm;
