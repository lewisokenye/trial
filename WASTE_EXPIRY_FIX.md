# Waste Expiry Items Fix

## Current Error

`GET http://localhost:5000/api/waste/expiry 500 (Internal Server Error)`

## Root Cause

Mongoose caches model schemas when the backend starts. Even though we updated the `ExpiryItem` model, the old schema might still be in memory from a previous run.

## Complete Fix Procedure

### Step 1: Stop ALL Node Processes

```powershell
# In PowerShell
Get-Process node | Stop-Process -Force
```

This ensures no old code is running.

### Step 2: Clear MongoDB Collection (If Needed)

```bash
mongosh
use usana

# Check if there are any old expiry items with wrong schema
db.expiryitems.find().pretty()

# If you see items with 'name' instead of 'itemName', drop the collection
db.expiryitems.drop()

# Exit
exit
```

### Step 3: Restart Backend Fresh

```bash
cd backend
npm run dev
```

**Wait for:**
```
[nodemon] starting `ts-node src/index.ts`
🚀 Server running on port 5000
🍃 MongoDB Connected: localhost
```

### Step 4: Test the Endpoint

When you visit the waste page, the backend terminal should show:

```
Fetching expiry items for user: 673abc...
Found 0 expiry items
```

If you see an error instead, copy the EXACT error message.

## What I Fixed

✅ Changed `ExpiryItem` model fields:
- `name` → `itemName`
- `quantity`: Number → String
- `priority` → `status`

✅ Updated validation rules to match new model

✅ Added detailed error logging

## Test Creating an Expiry Item

After the backend restarts, try:

1. Go to Waste Management page
2. Look for an "Add Item" or similar button
3. Fill in:
   - Item Name: Milk
   - Category: Dairy
   - Purchase Date: 2024-11-01
   - Expiry Date: 2024-11-10
   - Quantity: 2 liters
   - Location: Refrigerator

4. Submit

**Expected:** ✅ Item created successfully

## If Still Not Working

### Check Backend Terminal for Exact Error

The error logs I added will show one of these:

**Error 1: Old Schema**
```
Error: Cannot overwrite `ExpiryItem` model once compiled
```
**Fix:** Full restart (Step 1-3 above)

**Error 2: Field Missing**
```
Error: ExpiryItem validation failed: itemName: Path `itemName` is required
```
**Fix:** Check frontend is sending correct field names

**Error 3: Auth Issue**
```
Error: jwt must be provided
```
**Fix:** You might be logged out, refresh and login again

### Manual API Test

Test the endpoint directly:

```powershell
# Get your auth token from browser DevTools:
# F12 > Application > Local Storage > token

# Then test:
$token = "YOUR_TOKEN_HERE"
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/waste/expiry" -Headers $headers
```

**Expected Response:**
```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

## Quick Checklist

Before reporting the error, please verify:

- [ ] Backend stopped completely (no node processes)
- [ ] Backend restarted with `npm run dev`
- [ ] You see `🚀 Server running on port 5000`
- [ ] Browser refreshed (Ctrl+Shift+R)
- [ ] You're logged in (check if you see your name in navbar)

## Backend Terminal Logs to Check

When you visit the waste page, you SHOULD see this in backend terminal:

```
Fetching expiry items for user: 673abc123def456...
Found 0 expiry items
```

If you see an ERROR instead, copy the entire error and share it. It will look like:

```
Get expiry items error: Error: ...
Error message: ...
Error stack: ...
```

---

**Please do a complete restart (Steps 1-3) and report what you see in the backend terminal!** 🔍
