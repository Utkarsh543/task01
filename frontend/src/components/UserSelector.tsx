import React from 'react';

const UserSelector = ({ users, selectedUserId, onChange, onClaim }) => (
  <div className="flex items-center space-x-3">
    <select
      value={selectedUserId}
      onChange={e => onChange(e.target.value)}
      className="border px-3 py-1 rounded"
    >
      <option value="">Select User</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
    <button
      onClick={onClaim}
      className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
      disabled={!selectedUserId}
    >
      Claim
    </button>
  </div>
);

export default UserSelector;
