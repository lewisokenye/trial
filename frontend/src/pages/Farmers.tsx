import { useEffect, useState } from 'react';
import { Users, MapPin, Sprout, TrendingUp } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import farmerService, { type Farmer } from '../services/farmerService';
import { toast } from 'react-toastify';

const Farmers = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const data = await farmerService.getFarmers();
      setFarmers(data);
    } catch (error) {
      toast.error('Failed to load farmers');
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmers</h1>
        <p className="text-gray-600">Manage registered farmers and their farms</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Farmers</p>
              <p className="text-2xl font-bold text-gray-900">{farmers.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Sprout className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Verified Farmers</p>
              <p className="text-2xl font-bold text-gray-900">
                {farmers.filter(f => f.isVerified).length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Farm Size</p>
              <p className="text-2xl font-bold text-gray-900">
                {farmers.reduce((acc, f) => acc + f.farmSize, 0).toFixed(0)} acres
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Organic Farms</p>
              <p className="text-2xl font-bold text-gray-900">
                {farmers.filter(f => f.farmingType === 'organic').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmers.length === 0 ? (
          <div className="col-span-full text-center py-12 card">
            <Sprout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No farmers registered yet</p>
          </div>
        ) : (
          farmers.map((farmer) => (
            <div key={farmer._id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{farmer.farmName}</h3>
                  <p className="text-sm text-gray-600">{farmer.farmerID}</p>
                </div>
                {farmer.isVerified && (
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                    Verified
                  </span>
                )}
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{farmer.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Sprout className="w-4 h-4" />
                  <span>{farmer.farmSize} acres - {farmer.farmingType}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-2">Primary Crops:</p>
                <div className="flex flex-wrap gap-2">
                  {farmer.primaryCrops.slice(0, 3).map((crop, idx) => (
                    <span
                      key={idx}
                      className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs"
                    >
                      {crop}
                    </span>
                  ))}
                  {farmer.primaryCrops.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      +{farmer.primaryCrops.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default Farmers;
