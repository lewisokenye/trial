import { useEffect, useState } from 'react';
import { Plus, Package, DollarSign, Clock, CheckCircle } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import donationService, { type Donation } from '../services/donationService';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const Donations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'food' as 'food' | 'money',
    foodType: '',
    quantity: '',
    unit: 'kg',
    expiryDate: '',
    pickupLocation: '',
    description: '',
    amount: 0,
    currency: 'KES',
    paymentMethod: 'Safaricom M-pesa',
  });

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const data = await donationService.getDonations();
      setDonations(data);
    } catch (error) {
      toast.error('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await donationService.createDonation(formData);
      toast.success('Donation created successfully!');
      setShowModal(false);
      fetchDonations();
      // Reset form
      setFormData({
        type: 'food',
        foodType: '',
        quantity: '',
        unit: 'kg',
        expiryDate: '',
        pickupLocation: '',
        description: '',
        amount: 0,
        currency: 'KES',
        paymentMethod: 'Safaricom M-pesa',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create donation');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      collected: 'bg-purple-100 text-purple-800',
      delivered: 'bg-primary-100 text-primary-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Donations</h1>
          <p className="text-gray-600">Manage food and monetary donations</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Donation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold text-gray-900">{donations.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {donations.filter(d => d.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">
                {donations.filter(d => d.status === 'delivered').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Money Donations</p>
              <p className="text-2xl font-bold text-gray-900">
                {donations.filter(d => d.type === 'money').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Donations List */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">All Donations</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Details</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No donations yet. Create your first donation!
                  </td>
                </tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {donation.type === 'food' ? (
                          <Package className="w-5 h-5 text-primary-600" />
                        ) : (
                          <DollarSign className="w-5 h-5 text-amber-600" />
                        )}
                        <span className="font-medium capitalize">{donation.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {donation.type === 'food' ? (
                        <div>
                          <p className="font-medium">{donation.foodType}</p>
                          <p className="text-sm text-gray-600">
                            {donation.quantity} {donation.unit}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium">
                            {donation.currency} {donation.amount?.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">{donation.paymentMethod}</p>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(donation.status)}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {format(new Date(donation.createdAt), 'MMM dd, yyyy')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Donation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Donation</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Donation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Type *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'food' })}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        formData.type === 'food'
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Package className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                      <p className="font-medium">Food</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'money' })}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        formData.type === 'money'
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <DollarSign className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                      <p className="font-medium">Money</p>
                    </button>
                  </div>
                </div>

                {/* Food Donation Fields */}
                {formData.type === 'food' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Food Type *
                        </label>
                        <select
                          value={formData.foodType}
                          onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                          className="input"
                          required
                        >
                          <option value="">Select type</option>
                          <option value="prepared-food">Prepared Food</option>
                          <option value="fresh-produce">Fresh Produce</option>
                          <option value="baked-goods">Baked Goods</option>
                          <option value="dairy">Dairy</option>
                          <option value="meat">Meat</option>
                          <option value="pantry-items">Pantry Items</option>
                          <option value="frozen">Frozen</option>
                          <option value="beverages">Beverages</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity *
                        </label>
                        <input
                          type="text"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          className="input"
                          placeholder="10"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Unit *
                        </label>
                        <select
                          value={formData.unit}
                          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                          className="input"
                          required
                        >
                          <option value="kg">Kilograms (kg)</option>
                          <option value="lbs">Pounds (lbs)</option>
                          <option value="pieces">Pieces</option>
                          <option value="servings">Servings</option>
                          <option value="packages">Packages</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                          className="input"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pickup Location *
                      </label>
                      <input
                        type="text"
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        className="input"
                        placeholder="123 Main St, City"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Money Donation Fields */}
                {formData.type === 'money' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount *
                        </label>
                        <input
                          type="number"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                          className="input"
                          placeholder="1000"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency *
                        </label>
                        <select
                          value={formData.currency}
                          onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                          className="input"
                          required
                        >
                          <option value="KES">KES - Kenyan Shilling</option>
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method *
                      </label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="input"
                        required
                      >
                        <option value="Safaricom M-pesa">Safaricom M-pesa</option>
                        <option value="paystack">Paystack</option>
                        <option value="bank-transfer">Bank Transfer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input"
                    rows={3}
                    placeholder="Additional details about your donation..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button type="submit" className="flex-1 btn-primary">
                  Create Donation
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Donations;
