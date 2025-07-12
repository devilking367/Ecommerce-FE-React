import { usePosts } from '../../hooks/usePosts';
import { MESSAGES } from '../../constants/messages';
import type { Post } from '../../types/post';

export default function PostListPage(){
    const { posts, loading, error, refetch } = usePosts();

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
                <th className="py-2 px-4 text-left font-semibold">{MESSAGES.POST_LIST.COLUMNS.ID}</th>
                <th className="py-2 px-4 text-left font-semibold">{MESSAGES.POST_LIST.COLUMNS.TITLE}</th>
                <th className="py-2 px-4 text-left font-semibold">{MESSAGES.POST_LIST.COLUMNS.BODY}</th>
                <th className="py-2 px-4 text-left font-semibold">{MESSAGES.POST_LIST.COLUMNS.USER_ID}</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post: Post) => (
              <tr key={post.id} className="border-b last:border-none hover:bg-gray-50">
                <td className="py-2 px-4">{post.id}</td>
                <td className="py-2 px-4 font-medium">{post.title}</td>
                <td className="py-2 px-4">{post.body}</td>
                <td className="py-2 px-4 text-gray-600">{post.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}