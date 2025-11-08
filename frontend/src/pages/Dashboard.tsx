import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Gift, 
  Sprout, 
  Trash2, 
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    donations: 0,
    farmers: 0,
    wasteReduced: 0,
    activeCommunities: 0,
  });

  useEffect(() => {
    // Mock data - in production, fetch from API
    setStats({
      donations: 247,
      farmers: 156,
      wasteReduced: 3450,
      activeCommunities: 12,
    });
  }, []);

  const statCards = [
    {
      label: 'Total Donations',
      value: stats.donations,
      icon: Gift,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      label: 'Active Farmers',
      value: stats.farmers,
      icon: Sprout,
      color: 'bg-primary-500',
      trend: '+8%',
    },
    {
      label: 'Waste Reduced (kg)',
      value: stats.wasteReduced,
      icon: Trash2,
      color: 'bg-amber-500',
      trend: '+15%',
    },
    {
      label: 'Communities',
      value: stats.activeCommunities,
      icon: Users,
      color: 'bg-purple-500',
      trend: '+5%',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'donation',
      message: 'New food donation received from Fresh Market',
      time: '2 hours ago',
      status: 'success',
    },
    {
      id: 2,
      type: 'farmer',
      message: 'Farmer John added new yield data',
      time: '4 hours ago',
      status: 'success',
    },
    {
      id: 3,
      type: 'alert',
      message: '5 items expiring soon',
      time: '1 day ago',
      status: 'warning',
    },
  ];

  return (
    <DashboardLayout>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your food security ecosystem today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value.toLocaleString()}
                </h3>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-primary-600" />
                  <span className="text-sm text-primary-600 font-medium">{stat.trend}</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div
                  className={`p-2 rounded-lg ${
                    activity.status === 'success' ? 'bg-primary-100' : 'bg-amber-100'
                  }`}
                >
                  {activity.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/donations"
              className="block w-full btn-primary text-center"
            >
              Create Donation
            </Link>
            <Link
              to="/farmers"
              className="block w-full btn-outline text-center"
            >
              Register Farmer
            </Link>
            <Link
              to="/waste"
              className="block w-full btn-outline text-center"
            >
              Log Waste Entry
            </Link>
            <Link
              to="/nutrition"
              className="block w-full btn-outline text-center"
            >
              Generate Meal Plan
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
