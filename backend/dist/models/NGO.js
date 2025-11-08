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
const NGOSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    organizationName: {
        type: String,
        required: true,
        trim: true
    },
    registrationNumber: {
        type: String,
        required: true,
        trim: true
    },
    organizationType: {
        type: String,
        enum: ['charity', 'non-profit', 'community-based', 'international', 'faith-based', 'advocacy'],
        default: 'non-profit'
    },
    focusAreas: [{
            type: String,
            trim: true
        }],
    yearEstablished: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear()
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    serviceRegions: [{
            type: String,
            trim: true
        }],
    website: {
        type: String,
        trim: true
    },
    contactPerson: {
        type: String,
        required: true,
        trim: true
    },
    contactEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    contactPhone: {
        type: String,
        required: true,
        trim: true
    },
    bankAccount: {
        type: String,
        trim: true
    },
    taxExemptionNumber: {
        type: String,
        trim: true
    },
    numberOfStaff: {
        type: Number,
        min: 0
    },
    numberOfVolunteers: {
        type: Number,
        min: 0
    },
    annualBudget: {
        type: String,
        enum: ['< $10k', '$10k-$50k', '$50k-$100k', '$100k-$500k', '$500k+']
    },
    certifications: [{
            type: String,
            trim: true
        }],
    verificationDocuments: [String],
    isVerified: {
        type: Boolean,
        default: false
    },
    ngoID: {
        type: String,
        unique: true,
        required: true
    },
    beneficiariesServed: {
        type: Number,
        min: 0
    },
    partneredOrganizations: [{
            type: String,
            trim: true
        }]
}, {
    timestamps: true
});
// Index for efficient queries
NGOSchema.index({ isVerified: 1 });
NGOSchema.index({ location: 1 });
NGOSchema.index({ focusAreas: 1 });
NGOSchema.index({ organizationType: 1 });
exports.default = mongoose_1.default.model('NGO', NGOSchema);
//# sourceMappingURL=NGO.js.map