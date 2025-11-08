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
const DonationSchema = new mongoose_1.Schema({
    donor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['food', 'money'],
        required: true
    },
    // Food donation fields
    foodType: {
        type: String,
        enum: {
            values: ['prepared-food', 'fresh-produce', 'baked-goods', 'dairy', 'meat', 'pantry-items', 'frozen', 'beverages', 'other'],
            message: '{VALUE} is not a valid food type'
        },
        validate: {
            validator: function (v) {
                // Only validate if donation type is food and value is provided
                if (this.type === 'food') {
                    return v && v.length > 0;
                }
                return true; // Skip validation for money donations
            },
            message: 'Food type is required for food donations'
        }
    },
    quantity: String,
    unit: {
        type: String,
        enum: {
            values: ['lbs', 'kg', 'pieces', 'servings', 'gallons', 'liters', 'packages', 'cans', 'bottles'],
            message: '{VALUE} is not a valid unit'
        }
    },
    expiryDate: Date,
    pickupLocation: String,
    description: String,
    images: [String],
    // Money donation fields
    amount: Number,
    currency: {
        type: String,
        default: 'KES'
    },
    paymentMethod: {
        type: String,
        enum: ['paystack', 'bank-transfer', 'Safaricom M-pesa', 'other']
    },
    transactionId: String,
    // Common fields
    status: {
        type: String,
        enum: ['pending', 'approved', 'collected', 'delivered', 'cancelled'],
        default: 'pending'
    },
    recipient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    notes: String
}, {
    timestamps: true
});
// Index for efficient queries
DonationSchema.index({ type: 1, status: 1 });
DonationSchema.index({ donor: 1 });
DonationSchema.index({ recipient: 1 });
DonationSchema.index({ createdAt: -1 });
exports.default = mongoose_1.default.model('Donation', DonationSchema);
//# sourceMappingURL=Donation.js.map