import { useState } from 'react';
import { Truck, MapPin, Clock, CheckCircle, AlertCircle, Package } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';

const SupplyChain = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL-001',
      from: 'Central Warehouse',
      to: 'Community Center A',
      status: 'in-transit',
      items: 15,
      eta: '2 hours',
      driver: 'John Doe',
    },
    {
      id: 'DEL-002',
      from: 'Farm Fresh Ltd',
      to: 'Distribution Point B',
      status: 'delivered',
      items: 25,
      eta: 'Completed',
      driver: 'Jane Smith',
    },
    {
      id: 'DEL-003',
      from: 'Local Supplier',
      to: 'NGO Headquarters',
      status: 'pending',
      items: 10,
      eta: '5 hours',
      driver: 'Mike Johnson',
    },
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      'in-transit': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Truck },
      delivered: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      delayed: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
    };
    const style = styles[status as keyof typeof styles] || styles.pending;
    const Icon = style.icon;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text} flex items-center gap-1 w-fit`}>
        <Icon className="w-3 h-3" />
        {status.replace('-', ' ')}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supply Chain Management</h1>
        <p className="text-gray-600">Track deliveries and optimize distribution routes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-gray-900">
                {deliveries.filter(d => d.status === 'in-transit').length}
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
                {deliveries.filter(d => d.status === 'delivered').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {deliveries.filter(d => d.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {deliveries.reduce((acc, d) => acc + d.items, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Active Deliveries</h2>
        <div className="space-y-4">
          {deliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{delivery.id}</h3>
                  <p className="text-sm text-gray-600 mt-1">Driver: {delivery.driver}</p>
                </div>
                {getStatusBadge(delivery.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">From</p>
                    <p className="font-medium text-gray-900">{delivery.from}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-600 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">To</p>
                    <p className="font-medium text-gray-900">{delivery.to}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Details</p>
                    <p className="font-medium text-gray-900">{delivery.items} items</p>
                    <p className="text-sm text-gray-600">ETA: {delivery.eta}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupplyChain;
