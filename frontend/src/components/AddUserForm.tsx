import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = ({ onUserAdded }) => {
  const [newUserName, setNewUserName] = useState('');

  const addUser = async () => {
    if (!newUserName.trim()) return;
    await axios.post("http://localhost:3000/api/addUser", {
      name: newUserName.trim(),
    });
    setNewUserName('');
    onUserAdded();
  };

  return (
    <div className="flex items-center space-x-3">
      <input
        type="text"
        value={newUserName}
        onChange={e => setNewUserName(e.target.value)}
        placeholder="Enter new user name"
        className="border px-3 py-1 rounded"
      />
      <button onClick={addUser} className="bg-green-500 text-white px-4 py-1 rounded">
        Add User
      </button>
    </div>
  );
};

export default AddUserForm;
