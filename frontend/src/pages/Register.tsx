import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Mail, Lock, User, Building, MapPin, Phone } from 'lucide-react';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    organization: '',
    location: '',
    phoneNumber: '',
    // Farmer-specific fields
    farmName: '',
    farmSize: '',
    primaryCrops: '',
    farmingExperience: '',
    farmingType: 'conventional',
    // NGO-specific fields
    organizationName: '',
    registrationNumber: '',
    organizationType: 'non-profit',
    focusAreas: '',
    yearEstablished: '',
    serviceRegions: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(formData);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-primary-100">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-primary-600 p-4 rounded-2xl">
              <Leaf className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Usana</h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="input pl-11"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input pl-11"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input pl-11"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  I am a *
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="user">User</option>
                  <option value="donor">Donor</option>
                  <option value="farmer">Farmer</option>
                  <option value="ngo">NGO</option>
                </select>
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    value={formData.organization}
                    onChange={handleChange}
                    className="input pl-11"
                    placeholder="Your organization"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="input pl-11"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="input pl-11"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              {/* Farmer-specific fields */}
              {formData.role === 'farmer' && (
                <>
                  <div className="md:col-span-2">
                    <hr className="my-4 border-primary-200" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Details</h3>
                  </div>

                  <div>
                    <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 mb-2">
                      Farm Name *
                    </label>
                    <input
                      id="farmName"
                      name="farmName"
                      type="text"
                      value={formData.farmName}
                      onChange={handleChange}
                      className="input"
                      placeholder="Green Valley Farm"
                      required={formData.role === 'farmer'}
                    />
                  </div>

                  <div>
                    <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 mb-2">
                      Farm Size (acres) *
                    </label>
                    <input
                      id="farmSize"
                      name="farmSize"
                      type="number"
                      value={formData.farmSize}
                      onChange={handleChange}
                      className="input"
                      placeholder="50"
                      min="0"
                      step="0.1"
                      required={formData.role === 'farmer'}
                    />
                  </div>

                  <div>
                    <label htmlFor="farmingType" className="block text-sm font-medium text-gray-700 mb-2">
                      Farming Type *
                    </label>
                    <select
                      id="farmingType"
                      name="farmingType"
                      value={formData.farmingType}
                      onChange={handleChange}
                      className="input"
                      required={formData.role === 'farmer'}
                    >
                      <option value="conventional">Conventional</option>
                      <option value="organic">Organic</option>
                      <option value="sustainable">Sustainable</option>
                      <option value="permaculture">Permaculture</option>
                      <option value="hydroponic">Hydroponic</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="farmingExperience" className="block text-sm font-medium text-gray-700 mb-2">
                      Farming Experience *
                    </label>
                    <select
                      id="farmingExperience"
                      name="farmingExperience"
                      value={formData.farmingExperience}
                      onChange={handleChange}
                      className="input"
                      required={formData.role === 'farmer'}
                    >
                      <option value="">Select experience</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-20">11-20 years</option>
                      <option value="20+">20+ years</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="primaryCrops" className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Crops *
                    </label>
                    <input
                      id="primaryCrops"
                      name="primaryCrops"
                      type="text"
                      value={formData.primaryCrops}
                      onChange={handleChange}
                      className="input"
                      placeholder="Maize, Beans, Tomatoes (comma-separated)"
                      required={formData.role === 'farmer'}
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter crops separated by commas</p>
                  </div>
                </>
              )}

              {/* NGO-specific fields */}
              {formData.role === 'ngo' && (
                <>
                  <div className="md:col-span-2">
                    <hr className="my-4 border-primary-200" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Details</h3>
                  </div>

                  <div>
                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name *
                    </label>
                    <input
                      id="organizationName"
                      name="organizationName"
                      type="text"
                      value={formData.organizationName}
                      onChange={handleChange}
                      className="input"
                      placeholder="Hope Foundation"
                      required={formData.role === 'ngo'}
                    />
                  </div>

                  <div>
                    <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Number *
                    </label>
                    <input
                      id="registrationNumber"
                      name="registrationNumber"
                      type="text"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      className="input"
                      placeholder="NGO/12345/2020"
                      required={formData.role === 'ngo'}
                    />
                  </div>

                  <div>
                    <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Type *
                    </label>
                    <select
                      id="organizationType"
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleChange}
                      className="input"
                      required={formData.role === 'ngo'}
                    >
                      <option value="non-profit">Non-Profit</option>
                      <option value="charity">Charity</option>
                      <option value="community-based">Community-Based</option>
                      <option value="international">International</option>
                      <option value="faith-based">Faith-Based</option>
                      <option value="advocacy">Advocacy</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700 mb-2">
                      Year Established *
                    </label>
                    <input
                      id="yearEstablished"
                      name="yearEstablished"
                      type="number"
                      value={formData.yearEstablished}
                      onChange={handleChange}
                      className="input"
                      placeholder="2015"
                      min="1900"
                      max={new Date().getFullYear()}
                      required={formData.role === 'ngo'}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="focusAreas" className="block text-sm font-medium text-gray-700 mb-2">
                      Focus Areas *
                    </label>
                    <input
                      id="focusAreas"
                      name="focusAreas"
                      type="text"
                      value={formData.focusAreas}
                      onChange={handleChange}
                      className="input"
                      placeholder="Food Security, Nutrition, Education (comma-separated)"
                      required={formData.role === 'ngo'}
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter focus areas separated by commas</p>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="serviceRegions" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Regions *
                    </label>
                    <input
                      id="serviceRegions"
                      name="serviceRegions"
                      type="text"
                      value={formData.serviceRegions}
                      onChange={handleChange}
                      className="input"
                      placeholder="Nairobi, Mombasa, Kisumu (comma-separated)"
                      required={formData.role === 'ngo'}
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter regions/areas you serve separated by commas</p>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      className="input"
                      placeholder="https://yourorganization.org"
                    />
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-600 text-sm">
          Building a sustainable food future together 🌱
        </p>
      </div>
    </div>
  );
};

export default Register;
