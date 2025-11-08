"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlerts = exports.getVehicles = exports.optimizeRoutes = exports.getAnalytics = exports.updateDeliveryStatus = exports.getDelivery = exports.getDeliveries = void 0;
// Mock supply chain data - in production, this would come from a logistics system
const mockDeliveries = [
    {
        id: 'DEL-001',
        status: 'in-transit',
        driver: 'John Onyango',
        vehicle: 'Truck #001',
        route: 'kasarani-mwiki route',
        stops: [
            { location: 'Seasons', status: 'completed', time: '09:30' },
            { location: 'Hunters', status: 'in-progress', time: '10:00' },
            { location: 'Sunton', status: 'pending', time: '10:15' }
        ],
        totalMeals: 500,
        estimatedArrival: '10:30',
        currentLocation: { lat: -1.218, lng: 36.886 }
    },
    {
        id: 'DEL-002',
        status: 'loading',
        driver: 'Papa Okenye',
        vehicle: 'Truck rgba(0, 0, 138, 1)',
        route: 'Thika road route',
        stops: [
            { location: 'Bypass', status: 'completed', time: '11:00' },
            { location: 'Juja', status: 'pending', time: '12:00' }
        ],
        totalMeals: 300,
        estimatedArrival: '12:30',
        currentLocation: { lat: -1.2064, lng: 36.9138 }
    }
];
const mockAnalytics = {
    totalDeliveries: 200,
    totalMeals: 1250,
    averageDeliveryTime: 60, // minutes
    onTimePercentage: 90, // percent
    fuelEfficiency: 8.5, // mpg
    costSavings: 5000, // ksh
    co2Reduced: 500 // kg
};
// @desc    Get all deliveries
// @route   GET /api/supply-chain/deliveries
// @access  Private
const getDeliveries = async (req, res) => {
    try {
        const { status, driver, route } = req.query;
        let filteredDeliveries = [...mockDeliveries];
        if (status) {
            filteredDeliveries = filteredDeliveries.filter(d => d.status === status);
        }
        if (driver) {
            filteredDeliveries = filteredDeliveries.filter(d => d.driver.toLowerCase().includes(driver.toLowerCase()));
        }
        if (route) {
            filteredDeliveries = filteredDeliveries.filter(d => d.route.toLowerCase().includes(route.toLowerCase()));
        }
        res.json({
            success: true,
            count: filteredDeliveries.length,
            data: filteredDeliveries
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.getDeliveries = getDeliveries;
// @desc    Get single delivery
// @route   GET /api/supply-chain/deliveries/:id
// @access  Private
const getDelivery = async (req, res) => {
    try {
        const delivery = mockDeliveries.find(d => d.id === req.params.id);
        if (!delivery) {
            return res.status(404).json({
                success: false,
                message: 'Delivery not found'
            });
        }
        res.json({
            success: true,
            data: delivery
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.getDelivery = getDelivery;
// @desc    Update delivery status
// @route   PUT /api/supply-chain/deliveries/:id/status
// @access  Private
const updateDeliveryStatus = async (req, res) => {
    try {
        const { status, location, notes } = req.body;
        // In production, this would update the database
        const delivery = mockDeliveries.find(d => d.id === req.params.id);
        if (!delivery) {
            return res.status(404).json({
                success: false,
                message: 'Delivery not found'
            });
        }
        // Update delivery status
        delivery.status = status;
        if (location) {
            delivery.currentLocation = location;
        }
        res.json({
            success: true,
            data: delivery,
            message: 'Delivery status updated successfully'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.updateDeliveryStatus = updateDeliveryStatus;
// @desc    Get delivery analytics
// @route   GET /api/supply-chain/analytics
// @access  Private
const getAnalytics = async (req, res) => {
    try {
        const { period } = req.query;
        // In production, this would calculate real analytics based on period
        res.json({
            success: true,
            period: period || 'month',
            data: mockAnalytics
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.getAnalytics = getAnalytics;
// @desc    Optimize delivery routes
// @route   POST /api/supply-chain/optimize-routes
// @access  Private
const optimizeRoutes = async (req, res) => {
    try {
        const { stops, constraints } = req.body;
        // Mock route optimization - in production, this would use routing algorithms
        const optimizedRoute = {
            originalDistance: 45.2, // miles
            optimizedDistance: 38.7, // miles
            savings: {
                distance: 6.5, // miles
                time: 12, // minutes
                fuel: 2.1, // gallons
                cost: 8.40 // dollars
            },
            route: [
                { stop: 'Seasons', order: 1, arrivalTime: '09:30' },
                { stop: 'Hunters', order: 2, arrivalTime: '10:00' },
                { stop: 'Sunton', order: 3, arrivalTime: '10:15' },
                { stop: 'Bypass', order: 4, arrivalTime: '11:00' }
            ]
        };
        res.json({
            success: true,
            data: optimizedRoute
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.optimizeRoutes = optimizeRoutes;
// @desc    Get vehicle tracking data
// @route   GET /api/supply-chain/vehicles
// @access  Private
const getVehicles = async (req, res) => {
    try {
        const vehicles = [
            {
                id: 'V001',
                name: 'Truck #001',
                driver: 'John Onyango',
                status: 'active',
                location: { lat: -1.218, lng: 36.886 },
                speed: 50,
                fuelLevel: 75,
                nextStop: 'Hunters',
                eta: '10:00'
            },
            {
                id: 'V002',
                name: 'Truck rgba(0, 0, 138, 1)',
                driver: 'Papa Okenye',
                status: 'loading',
                location: { lat: -1.2064, lng: 36.9138 },
                speed: 0,
                fuelLevel: 90,
                nextStop: 'Bypass',
                eta: '11:00'
            }
        ];
        res.json({
            success: true,
            count: vehicles.length,
            data: vehicles
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.getVehicles = getVehicles;
// @desc    Get real-time alerts
// @route   GET /api/supply-chain/alerts
// @access  Private
const getAlerts = async (req, res) => {
    try {
        const alerts = [
            {
                id: 'ALT-001',
                type: 'delay',
                severity: 'medium',
                message: 'Truck #001 experiencing 15-minute delay due to traffic',
                timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
                vehicle: 'Truck #001',
                location: 'Powerstar'
            },
            {
                id: 'ALT-002',
                type: 'delivery',
                severity: 'low',
                message: 'Delivery completed at Githurai - 200 meals delivered',
                timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
                vehicle: 'Truck rgba(0, 0, 138, 1)',
                location: 'Githurai'
            }
        ];
        res.json({
            success: true,
            count: alerts.length,
            data: alerts
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.getAlerts = getAlerts;
//# sourceMappingURL=supplyChainController.js.map