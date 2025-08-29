import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../helpers/api-url';

const UserApplyForm = ({ onLogout }) => {
  const [credentials, setCredentials] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [submission, setSubmission] = useState({
    userName: '',
    comment: '',
    file: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${getApiUrl()}/api/credentials`)
      .then(res => res.json())
      .then(setCredentials);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId || !submission.userName) return alert('Select credential and provide your name.');

    const formData = new FormData();
    formData.append('userName', submission.userName);
    formData.append('comment', submission.comment);
    if (submission.file) {
      formData.append('file', submission.file);
    }

    const response = await fetch(`${getApiUrl()}/api/credentials/${selectedId}/applications`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Application submitted!');
      setSelectedId('');
      setSubmission({ userName: '', comment: '', file: null });
    } else {
      alert('Submission failed!');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-between mb-6">
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

      <form onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4 font-bold">Apply for Credential</h2>

        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        >
          <option value="">Select Credential</option>
          {credentials.map(c => (
            <option key={c.id} value={c.id}>
              {c.credentialSubject?.title || c.title || 'Unnamed Credential'}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Your Name"
          value={submission.userName}
          onChange={(e) => setSubmission({ ...submission, userName: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <textarea
          placeholder="Why are you applying?"
          value={submission.comment}
          onChange={(e) => setSubmission({ ...submission, comment: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="file"
          onChange={(e) => setSubmission({ ...submission, file: e.target.files[0] })}
          className="mb-4"
        />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default UserApplyForm;
