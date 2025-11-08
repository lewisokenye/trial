# Troubleshooting 500 Errors - Donations & Waste

## Current Issues

You're experiencing 500 errors on:
1. `POST /api/donations` - Money donations
2. `GET /api/waste/expiry` - Expiry items

## What I've Fixed

✅ Updated `ExpiryItem` model field names
✅ Updated validation rules to match new model
✅ Added detailed error logging
✅ Fixed frontend API response parsing

## The Problem

The errors are persisting because of **one of these reasons**:

### 1. Backend Not Reloading Properly

Even with `npm run dev`, nodemon might not be detecting changes.

**Solution:**
```bash
# In backend terminal
# Press Ctrl+C to stop
# Then run:
npm run dev
```

### 2. Old Data in MongoDB

If you created any expiry items BEFORE I changed the model, they have old field names (`name` instead of `itemName`).

**Solution - Clear the collection:**
```bash
mongosh
use usana

# Clear old expiry items
db.expiryitems.deleteMany({})

# Verify
db.expiryitems.find()
```

### 3. TypeScript Compilation Issue

The ts-node might be caching old code.

**Solution - Force restart:**
```bash
# Stop backend (Ctrl+C)
cd backend

# Clear node modules cache
npm run clean  # if you have this script
# OR
rm -rf dist/  # on Mac/Linux
Remove-Item -Recurse -Force dist/  # on Windows PowerShell

# Restart
npm run dev
```

## How to Debug

### Step 1: Check Backend Terminal

When you try to create a donation, you should see in the backend terminal:

```
Creating donation with data: {
  "type": "money",
  "amount": 1000,
  "currency": "KES",
  "paymentMethod": "Safaricom M-pesa",
  "donor": "..."
}
```

If you DON'T see this, the backend isn't running the new code.

### Step 2: Check for Error Details

You should also see:

```
Donation creation error: ...
Error message: ...
Error name: ...
```

**What to report:**
- Copy the exact error message from the backend terminal
- NOT just "500 error" from the browser

### Step 3: Test Expiry Items

When you visit the waste page, you should see:

```
Fetching expiry items for user: ...
Found 0 expiry items
```

If you see an error instead, it means the model isn't updated.

## Quick Fix - Try This First

1. **Stop ALL Node processes:**
   ```powershell
   # In PowerShell
   Get-Process node | Stop-Process -Force
   ```

2. **Clear MongoDB collections:**
   ```bash
   mongosh
   use usana
   db.expiryitems.deleteMany({})
   db.donations.deleteMany({})
   exit
   ```

3. **Restart backend fresh:**
   ```bash
   cd backend
   npm run dev
   ```

4. **Refresh browser completely:**
   - Press Ctrl+Shift+R (or Cmd+Shift+R)

5. **Try creating a donation again**

6. **Watch the backend terminal** - you should see my debug logs

## If Still Not Working

### Option A: Manual Test

Test the API directly with a simple curl command:

```powershell
# Test GET expiry items (should return empty array)
curl http://localhost:5000/api/waste/expiry `
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get your token from browser:
# 1. Open DevTools (F12)
# 2. Application tab > Local Storage > http://localhost:5173
# 3. Copy the 'token' value
```

### Option B: Check if backend is running new code

Add this test to verify:

1. Open `backend/src/index.ts`
2. Find line with `app.use(express.json...`
3. Add this right after it:
   ```typescript
   console.log('🔥 BACKEND RUNNING WITH LATEST CODE v2.0');
   ```
4. Save
5. Check if you see that message in the terminal

If you DON'T see it, the backend is not running the new code.

## Most Likely Issue

Based on the symptoms, I believe:

1. ❌ You might still have `npm start` running instead of `npm run dev`
2. ❌ Or nodemon isn't reloading properly
3. ❌ Or there's old data in MongoDB causing validation errors

## Next Steps

Please do this:

1. **Stop the backend completely** (Ctrl+C)
2. **Run:** `cd backend && npm run dev`
3. **Take a screenshot** of the backend terminal
4. **Try creating a donation**
5. **Copy the EXACT error** from the backend terminal (not the browser)
6. **Send me that error message**

Then I can tell you exactly what's wrong!

---

**Without seeing the actual backend terminal error logs, I'm just guessing. The logs I added will tell us exactly what's failing!** 🔍
