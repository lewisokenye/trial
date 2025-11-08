import { useEffect, useState } from 'react';
import { Trash2, AlertTriangle, TrendingDown, DollarSign, Plus, X, Apple } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import wasteService, { type WasteEntry, type ExpiryItem } from '../services/wasteService';
import { toast } from 'react-toastify';
import { format, addDays } from 'date-fns';

const WasteManagement = () => {
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([]);
  const [expiryItems, setExpiryItems] = useState<ExpiryItem[]>([]);
  const [analytics, setAnalytics] = useState({
    totalWaste: 0,
    preventableWaste: 0,
    wasteValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    category: 'Fruits',
    purchaseDate: format(new Date(), 'yyyy-MM-dd'),
    expiryDate: '',
    quantity: '',
    location: 'Refrigerator',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [entries, items, analyticsData] = await Promise.all([
        wasteService.getWasteEntries(),
        wasteService.getExpiryItems(),
        wasteService.getWasteAnalytics(),
      ]);
      setWasteEntries(entries);
      setExpiryItems(items);
      setAnalytics(analyticsData);
    } catch (error) {
      toast.error('Failed to load waste data');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to suggest expiry dates based on food category
  const suggestExpiryDate = (category: string, purchaseDate: string): string => {
    const purchase = new Date(purchaseDate);
    const shelfLife: Record<string, number> = {
      'Fruits': 7,
      'Vegetables': 5,
      'Dairy': 7,
      'Meat': 3,
      'Bakery': 3,
      'Pantry Items': 365,
      'Frozen': 90,
      'Beverages': 30
    };
    const days = shelfLife[category] || 7;
    return format(addDays(purchase, days), 'yyyy-MM-dd');
  };

  const handleCategoryChange = (category: string) => {
    const suggestedExpiry = suggestExpiryDate(category, formData.purchaseDate);
    setFormData({ ...formData, category, expiryDate: suggestedExpiry });
  };

  const handleSubmitItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await wasteService.createExpiryItem(formData);
      toast.success('Food item added successfully! 🎉');
      setShowAddForm(false);
      setFormData({
        itemName: '',
        category: 'Fruits',
        purchaseDate: format(new Date(), 'yyyy-MM-dd'),
        expiryDate: '',
        quantity: '',
        location: 'Refrigerator',
        notes: ''
      });
      fetchData();
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  const getExpiryStatusColor = (status: string) => {
    const colors = {
      fresh: 'bg-green-100 text-green-800',
      'expiring-soon': 'bg-yellow-100 text-yellow-800',
      expired: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors];
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Waste Management</h1>
          <p className="text-gray-600">Track and reduce food waste across your operations</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Food Item
        </button>
      </div>

      {/* Add Food Item Modal/Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Apple className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Add Food Item</h2>
              </div>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitItem} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-2">
                    Food Item Name *
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    className="input"
                    placeholder="e.g., Tomatoes, Milk, Chicken"
                    autoComplete="off"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="input"
                    autoComplete="off"
                    required
                  >
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Meat">Meat</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Pantry Items">Pantry Items</option>
                    <option value="Frozen">Frozen</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Expiry date will be auto-suggested based on category</p>
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="input"
                    placeholder="e.g., 1kg, 2 pieces, 1 liter"
                    autoComplete="off"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Purchase Date *
                  </label>
                  <input
                    type="date"
                    id="purchaseDate"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={(e) => {
                      const newPurchaseDate = e.target.value;
                      const suggestedExpiry = suggestExpiryDate(formData.category, newPurchaseDate);
                      setFormData({ ...formData, purchaseDate: newPurchaseDate, expiryDate: suggestedExpiry });
                    }}
                    className="input"
                    autoComplete="off"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="input"
                    autoComplete="off"
                    required
                  />
                  <p className="text-xs text-amber-600 mt-1">
                    💡 Suggested based on typical shelf life. Adjust as needed.
                  </p>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Storage Location *
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input"
                    autoComplete="off"
                    required
                  >
                    <option value="Refrigerator">Refrigerator</option>
                    <option value="Freezer">Freezer</option>
                    <option value="Pantry">Pantry</option>
                    <option value="Counter">Counter</option>
                    <option value="Cupboard">Cupboard</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="input"
                    rows={3}
                    placeholder="Any additional notes about this item..."
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="submit" className="flex-1 btn-primary">
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Waste</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalWaste} kg</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Preventable Waste</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.preventableWaste} kg</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Estimated Value Lost</p>
              <p className="text-2xl font-bold text-gray-900">KES {analytics.wasteValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expiring Soon Items */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-bold text-gray-900">Items Expiring Soon</h2>
          </div>
          <div className="space-y-3">
            {expiryItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No items tracked</p>
            ) : (
              expiryItems.slice(0, 5).map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.itemName}</p>
                    <p className="text-sm text-gray-600">
                      {item.category} - {item.quantity}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Expires: {format(new Date(item.expiryDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getExpiryStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Waste Entries */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Trash2 className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">Recent Waste Entries</h2>
          </div>
          <div className="space-y-3">
            {wasteEntries.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No waste entries</p>
            ) : (
              wasteEntries.slice(0, 5).map((entry) => (
                <div
                  key={entry._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{entry.wasteType}</p>
                    <p className="text-sm text-gray-600">
                      {entry.quantity} {entry.unit} - {entry.reason}
                    </p>
                    {entry.preventable && (
                      <span className="inline-block mt-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs">
                        Preventable
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      KES {entry.estimatedValue}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(entry.createdAt), 'MMM dd')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WasteManagement;
