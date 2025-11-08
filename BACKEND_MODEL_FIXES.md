# Backend Model Fixes - Donation & Waste Issues

## Issues Fixed

### 1. ExpiryItem Model Mismatch ✅ FIXED

**Problem:** Frontend expected different field names than backend provided.

**Frontend Expected:**
- `itemName` (string)
- `quantity` (string)
- `status` ('fresh' | 'expiring-soon' | 'expired')

**Backend Had:**
- `name` (string)
- `quantity` (number)
- `priority` ('low' | 'medium' | 'high')

**Solution:** Updated `backend/src/models/ExpiryItem.ts`:
```typescript
// Changed from:
name: String
quantity: Number
priority: { type: String, enum: ['low', 'medium', 'high'] }

// To:
itemName: String
quantity: String
status: { type: String, enum: ['fresh', 'expiring-soon', 'expired'] }
```

### 2. Added Error Logging for Debugging

Added detailed error logging to help identify issues:

**In `donationController.ts`:**
- Logs donation data being created
- Logs validation errors
- Returns detailed error messages

**In `wasteController.ts`:**
- Logs expiry item queries
- Logs error stack traces
- Returns detailed error messages

## What You Need To Do

### IMPORTANT: Restart Backend Server

The model changes won't take effect until you restart the backend:

```bash
# In the backend terminal:
# Press Ctrl+C to stop the server
# Then restart:
npm run dev
```

### Check Error Logs

After restarting, try creating a donation again and check the backend terminal for detailed error logs. You'll see messages like:

```
Creating donation with data: { ... }
Donation creation error: ...
Error message: ...
```

This will tell us exactly what's wrong with the donation creation.

## Common Causes of 500 Errors

### For Money Donations:
1. **Missing required fields** - Check if all required fields are being sent
2. **Invalid enum values** - Payment method must be exactly: `'paystack'`, `'bank-transfer'`, `'Safaricom M-pesa'`, or `'other'`
3. **Type mismatches** - Amount should be a number, not string

### For Expiry Items:
1. **Model not updated** - Need to restart backend
2. **Old documents in database** - May have old field names

## Testing Steps

1. **Restart backend server** (CRITICAL!)
   ```bash
   cd backend
   # Stop with Ctrl+C
   npm run dev
   ```

2. **Try creating a money donation**
   - Open browser console
   - Try to create a donation
   - Check backend terminal for error logs

3. **Try viewing waste management page**
   - Navigate to /waste
   - Check backend terminal for error logs

4. **Check the exact error message** in backend terminal and report it

## If Still Not Working

### Clear MongoDB Collections (Nuclear Option)

If you have old data with incompatible schemas:

```bash
mongosh
use usana

# Clear expiry items collection
db.expiryitems.deleteMany({})

# Or drop and recreate
db.expiryitems.drop()
```

### Verify Model Fields Match

**Frontend expects (ExpiryItem):**
```typescript
{
  itemName: string;
  category: string;
  purchaseDate: string;
  expiryDate: string;
  quantity: string;
  location: string;
  status: 'fresh' | 'expiring-soon' | 'expired';
  notificationSent: boolean;
}
```

**Backend now provides:**
```typescript
{
  itemName: string;  // ✅ Fixed (was 'name')
  category: string;
  purchaseDate: string;
  expiryDate: string;
  quantity: string;  // ✅ Fixed (was Number)
  location: string;
  status: string;    // ✅ Fixed (was 'priority')
  notificationSent: boolean;
}
```

## Next Steps

1. ✅ **Restart backend** - Most important step!
2. ⏳ **Test money donation** - Check backend logs
3. ⏳ **Test waste page** - Should load without errors
4. ⏳ **Report specific error** from backend terminal if still failing

---

**Status:** Models fixed, backend restart required!
