import React from 'react';
import CreateCredentialForm from './components/CreateCredentialForm';
import CredentialList from './components/CredentialList';

const credentials = [
  {
    id: 1,
    title: 'React Developer',
    description: 'A course to become a React developer',
    category: 'Web Development',
    eqfLevel: 5,
  },
  {
    id: 2,
    title: 'Data Scientist',
    description: 'An advanced course in data science and machine learning',
    category: 'Data Science',
    eqfLevel: 6,
  },
  // more credentials can go here
];

const App = () => {
  return (
    <div>
      <h1>Microcredential Platform</h1>
      <CreateCredentialForm />
      <CredentialList credentials={credentials} />
    </div>
  );
};

export default App;
