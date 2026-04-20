import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import AuthContext from '../../context/AuthContext';
import { Trash2, CheckCircle2, XCircle, ShieldAlert, AlertTriangle } from 'lucide-react';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate('/');
    const fetchUsers = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/users', config);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [userInfo, navigate]);

  const deleteHandler = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.delete(`/api/users/${id}`, config);
      setUsers(users.filter((u) => u._id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 animate-fade-in">
      {/* Inline Confirm Delete Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Delete User?</h3>
            </div>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone. The user account will be permanently removed.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteHandler(confirmDeleteId)}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-8">
        <ShieldAlert className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-black text-gray-900">User Management</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 rounded-full border-4 border-primary-600 border-t-transparent animate-spin" /></div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Name', 'Email', 'Admin', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-500 truncate max-w-[120px]">{user._id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <a href={`mailto:${user.email}`} className="text-primary-600 hover:underline">{user.email}</a>
                  </td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {!user.isAdmin && (
                      <button
                        onClick={() => setConfirmDeleteId(user._id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
