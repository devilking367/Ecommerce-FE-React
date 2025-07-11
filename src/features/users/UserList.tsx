import { useEffect, useState } from 'react';
import { fetchUsers } from '../../services/userService';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">User List</h1>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="border p-3 rounded shadow-sm">
            <p><strong>{user.name}</strong></p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
