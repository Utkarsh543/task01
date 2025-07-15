import React from 'react';

const ClaimHistory = ({ histories, users, loading }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 mt-6">📜 Claim History</h2>
      {loading ? (
        <p>Fetching history...</p>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">User</th>
              <th className="p-2 border">Points</th>
              <th className="p-2 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {histories.map(h => {
              const user = users.find(u => u.id === h.userId);
              return (
                <tr key={h.id}>
                  <td className="p-2 border">{user?.name || 'Unknown'}</td>
                  <td className="p-2 border">{h.points}</td>
                  <td className="p-2 border text-sm text-gray-600">
                    {new Date(h.timestamp).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClaimHistory;
