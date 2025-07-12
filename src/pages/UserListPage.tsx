import { useUsers } from '../hooks/useUsers';
import { MESSAGES } from '../constants/messages';
import type { User } from '../types/user';

export default function UserListPage() {
  const { users, loading, error, refetch } = useUsers();

  if (loading) return (
    <div className="flex justify-center py-16">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
      {error}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{MESSAGES.USER_LIST.TITLE}</h2>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 text-left font-semibold">{MESSAGES.USER_LIST.COLUMNS.ID}</th>
              <th className="py-2 px-4 text-left font-semibold">{MESSAGES.USER_LIST.COLUMNS.NAME}</th>
              <th className="py-2 px-4 text-left font-semibold">Username</th>
              <th className="py-2 px-4 text-left font-semibold">{MESSAGES.USER_LIST.COLUMNS.EMAIL}</th>
              <th className="py-2 px-4 text-left font-semibold">Phone</th>
              <th className="py-2 px-4 text-left font-semibold">Website</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => (
              <tr key={user.id} className="border-b last:border-none hover:bg-gray-50">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4 font-medium">{user.name}</td>
                <td className="py-2 px-4 text-gray-600">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 text-gray-600">{user.phone || '-'}</td>
                <td className="py-2 px-4 text-gray-600">{user.website || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
