import React, { useState } from 'react';

const CreateCredentialForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skills: '',
    eqfLevel: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation check
    if (!formData.title || !formData.description) {
      setError('Title and Description are required!');
      return;
    }

    console.log('Form data submitted:', formData);
    setError('');
    setFormData({ title: '', description: '', category: '', skills: '', eqfLevel: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h2>Create a Microcredential</h2>

      {error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      )}

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
        <textarea 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', height: '100px' }} 
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="category" style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
        <input 
          type="text" 
          id="category" 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="skills" style={{ display: 'block', marginBottom: '5px' }}>Skills (comma-separated):</label>
        <input 
          type="text" 
          id="skills" 
          name="skills" 
          value={formData.skills} 
          onChange={handleChange} 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="eqfLevel" style={{ display: 'block', marginBottom: '5px' }}>EQF Level:</label>
        <select 
          id="eqfLevel" 
          name="eqfLevel" 
          value={formData.eqfLevel} 
          onChange={handleChange} 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">--Select Level--</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <button 
        type="submit" 
        style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Submit
      </button>
    </form>
  );
};

export default CreateCredentialForm;

