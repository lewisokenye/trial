"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./utils/database"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const donations_1 = __importDefault(require("./routes/donations"));
const farmers_1 = __importDefault(require("./routes/farmers"));
const nutrition_1 = __importDefault(require("./routes/nutrition"));
const supplyChain_1 = __importDefault(require("./routes/supplyChain"));
const waste_1 = __importDefault(require("./routes/waste"));
const disease_1 = __importDefault(require("./routes/disease"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
(0, database_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:5177',
    credentials: true
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/donations', donations_1.default);
app.use('/api/farmers', farmers_1.default);
app.use('/api/nutrition', nutrition_1.default);
app.use('/api/supply-chain', supplyChain_1.default);
app.use('/api/waste', waste_1.default);
app.use('/api/disease', disease_1.default);
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Usana API is running' });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map