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
const ExpiryItemSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Pantry Items', 'Frozen', 'Beverages']
    },
    purchaseDate: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        enum: ['Refrigerator', 'Freezer', 'Pantry', 'Counter', 'Cupboard']
    },
    status: {
        type: String,
        enum: ['fresh', 'expiring-soon', 'expired'],
        default: 'fresh'
    },
    notificationSent: {
        type: Boolean,
        default: false
    },
    notes: String
}, {
    timestamps: true
});
// Index for efficient queries
ExpiryItemSchema.index({ user: 1, expiryDate: 1 });
ExpiryItemSchema.index({ user: 1, notificationSent: 1 });
exports.default = mongoose_1.default.model('ExpiryItem', ExpiryItemSchema);
//# sourceMappingURL=ExpiryItem.js.map