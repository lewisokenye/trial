import { useEffect, useState } from 'react';
import { Trash2, AlertTriangle, TrendingDown, DollarSign } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import wasteService, { type WasteEntry, type ExpiryItem } from '../services/wasteService';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const WasteManagement = () => {
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([]);
  const [expiryItems, setExpiryItems] = useState<ExpiryItem[]>([]);
  const [analytics, setAnalytics] = useState({
    totalWaste: 0,
    preventableWaste: 0,
    wasteValue: 0,
  });
  const [loading, setLoading] = useState(true);

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Waste Management</h1>
        <p className="text-gray-600">Track and reduce food waste across your operations</p>
      </div>

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
