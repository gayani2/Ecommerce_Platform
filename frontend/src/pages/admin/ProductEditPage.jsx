import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import AuthContext from '../../context/AuthContext';
import Loader from '../../components/Loader';
import { Save, ArrowLeft } from 'lucide-react';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate('/');
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`/api/products/${productId}`, { name, price, image, brand, category, countInStock, description }, config);
      navigate('/admin/productlist');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all bg-gray-50/30 focus:bg-white";

  return (
    <div className="max-w-2xl mx-auto py-12 animate-fade-in">
      <Link to="/admin/productlist" className="inline-flex items-center gap-2 text-primary-600 font-semibold mb-8 hover:text-primary-700 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Products
      </Link>
      <h1 className="text-3xl font-black text-gray-900 mb-8">Edit Product</h1>

      {loading ? <Loader /> : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>
      ) : (
        <form onSubmit={submitHandler} className="glass-card p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Count In Stock</label>
              <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className={inputClass} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className={inputClass} required />
            {image && <img src={image} alt="preview" className="mt-3 h-32 w-full object-cover rounded-xl border border-gray-100" />}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Brand</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                {['Electronics', 'Cameras', 'Audio', 'Computers'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} required />
          </div>

          <button type="submit" disabled={saving} className="w-full btn-primary flex items-center justify-center gap-2 py-4">
            <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Product'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEditPage;
