"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const FarmerSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    farmName: {
        type: String,
        required: true,
        trim: true
    },
    farmSize: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    primaryCrops: [{
            type: String,
            trim: true
        }],
    farmingExperience: {
        type: String,
        required: true,
        enum: ['0-2', '3-5', '6-10', '11-20', '20+']
    },
    farmingType: {
        type: String,
        enum: ['conventional', 'organic', 'sustainable', 'permaculture', 'hydroponic'],
        default: 'conventional'
    },
    certifications: [{
            type: String,
            trim: true
        }],
    soilType: {
        type: String,
        enum: ['clay', 'sandy', 'loam', 'silt', 'mixed']
    },
    irrigationMethod: {
        type: String,
        enum: ['drip', 'sprinkler', 'flood', 'rain-fed', 'mixed']
    },
    equipmentOwned: [{
            type: String,
            trim: true
        }],
    marketingChannels: [{
            type: String,
            trim: true
        }],
    contactNumber: {
        type: String,
        trim: true
    },
    bankAccount: {
        type: String,
        trim: true
    },
    farmAddress: {
        type: String,
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationDocuments: [String],
    farmerID: {
        type: String,
        unique: true,
        required: true
    },
    yieldHistory: [{
            crop: { type: String, required: true },
            year: { type: Number, required: true },
            yield: { type: Number, required: true, min: 0 },
            area: { type: Number, required: true, min: 0 },
            quality: { type: String, required: true },
            revenue: { type: Number, required: true, min: 0 }
        }],
    marketListings: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'MarketListing'
        }]
}, {
    timestamps: true
});
// Index for efficient queries
FarmerSchema.index({ isVerified: 1 });
FarmerSchema.index({ location: 1 });
FarmerSchema.index({ primaryCrops: 1 });
FarmerSchema.index({ farmingType: 1 });
exports.default = mongoose_1.default.model('Farmer', FarmerSchema);
//# sourceMappingURL=Farmer.js.map