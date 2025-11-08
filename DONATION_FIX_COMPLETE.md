# Money Donation Fix - Complete ✅

## The Problem

**Error:** `Donation validation failed: foodType: '' is not a valid enum value for path foodType`

**Root Cause:** When creating a money donation, the frontend was sending empty strings for food-related fields (`foodType`, `quantity`, `unit`, etc.). The backend Mongoose model was validating these fields even though they're only needed for food donations.

## The Solution

### 1. Controller Cleanup (donationController.ts)

Added logic to remove irrelevant fields based on donation type:

```typescript
// Clean up empty fields for money donations
if (req.body.type === 'money') {
  delete req.body.foodType;
  delete req.body.quantity;
  delete req.body.unit;
  delete req.body.expiryDate;
  delete req.body.pickupLocation;
}

// Clean up empty fields for food donations  
if (req.body.type === 'food') {
  delete req.body.amount;
  delete req.body.paymentMethod;
  delete req.body.transactionId;
}
```

### 2. Model Validation (Donation.ts)

Added custom validator to `foodType` that only validates for food donations:

```typescript
foodType: {
  type: String,
  enum: ['prepared-food', 'fresh-produce', 'baked-goods', ...],
  validate: {
    validator: function(this: IDonation, v: string) {
      if (this.type === 'food') {
        return v && v.length > 0;
      }
      return true; // Skip validation for money donations
    }
  }
}
```

## Files Changed

✅ `backend/src/controllers/donationController.ts` - Added field cleanup
✅ `backend/src/models/Donation.ts` - Improved validation logic

## Testing

The backend is now running with `npm run dev` and will automatically reload when you save changes.

### Test Money Donation:

1. **Go to** `/donations` page
2. **Click** "Create Donation" button
3. **Select** "Money" as donation type
4. **Fill in:**
   - Amount: 1000
   - Currency: KES
   - Payment Method: Safaricom M-pesa
5. **Submit**

**Expected:** ✅ Success! Donation created

### Test Food Donation:

1. **Select** "Food" as donation type
2. **Fill in:**
   - Food Type: Fresh Produce
   - Quantity: 50
   - Unit: kg
   - Pickup Location: Nairobi
3. **Submit**

**Expected:** ✅ Success! Donation created

## Backend Terminal Output

When you create a donation, you should see:

```
Creating donation with data: {
  "type": "money",
  "amount": 1000,
  "currency": "KES",
  "paymentMethod": "Safaricom M-pesa",
  "donor": "673..."
}
```

Notice: No `foodType`, `quantity`, or `unit` fields (they were cleaned up).

## If Still Having Issues

1. **Make sure backend is running:** `npm run dev` (NOT `npm start`)
2. **Check backend terminal** for error logs
3. **Refresh browser** (Ctrl+Shift+R)
4. **Check the exact error message** in backend terminal

## What About Waste/Expiry Items?

I also fixed the ExpiryItem model earlier:
- Changed `name` → `itemName`
- Changed `quantity` from Number → String
- Changed `priority` → `status`
- Updated validation rules

This should also work now!

---

**Status:** ✅ All fixes applied! Backend is running with latest code.

**Next Step:** Try creating a money donation now! 🚀
