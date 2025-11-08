# User Verification Guide

## Overview

By default, all users are created with `isVerified: false`. This field can be used to implement verification workflows for your platform.

## Methods to Verify Users

### Method 1: Direct Database Update (Quick Fix)

Use MongoDB Compass or command line to update users directly:

**Using MongoDB Shell:**
```bash
mongosh
use usana

# Verify a specific user by email
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { isVerified: true } }
)

# Verify all users (for development/testing)
db.users.updateMany(
  {},
  { $set: { isVerified: true } }
)

# Check verification status
db.users.find({}, { email: 1, isVerified: 1 })
```

**Using MongoDB Compass (GUI):**
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select the `usana` database
4. Select the `users` collection
5. Find your user document
6. Click "Edit Document"
7. Change `isVerified: false` to `isVerified: true`
8. Click "Update"

### Method 2: Admin API Endpoints (Recommended)

I've created admin-only API endpoints for managing user verification.

**Prerequisites:**
- You must have an admin account

**Create an Admin User:**
```bash
mongosh
use usana

# Update your user to admin role
db.users.updateOne(
  { email: "your-admin@example.com" },
  { $set: { role: "admin", isVerified: true } }
)
```

**API Endpoints:**

1. **Get All Users** (Admin Only)
   ```
   GET /api/users
   Headers: Authorization: Bearer <admin-token>
   ```

2. **Verify a User** (Admin Only)
   ```
   PUT /api/users/:userId/verify
   Headers: Authorization: Bearer <admin-token>
   ```

3. **Unverify a User** (Admin Only)
   ```
   PUT /api/users/:userId/unverify
   Headers: Authorization: Bearer <admin-token>
   ```

**Example using cURL:**
```bash
# Get your admin token after logging in, then:

# Get all users
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  http://localhost:5000/api/users

# Verify a user
curl -X PUT \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  http://localhost:5000/api/users/USER_ID_HERE/verify
```

**Example using Postman:**
1. Login as admin to get token
2. Create new request: PUT `http://localhost:5000/api/users/{userId}/verify`
3. Add Header: `Authorization: Bearer {your-admin-token}`
4. Send request

### Method 3: Auto-Verification (Optional Implementation)

If you want users to be automatically verified upon registration, update the backend:

**File:** `backend/src/controllers/authController.ts`

Change line 29-36 to include `isVerified: true`:
```typescript
const user = await User.create({
    name,
    email,
    password,
    role: role || 'user',
    organization,
    location,
    isVerified: true  // Add this line
}) as any;
```

## Quick Start for Development

**To verify all existing users immediately:**

```bash
# Connect to MongoDB
mongosh

# Switch to database
use usana

# Verify all users
db.users.updateMany({}, { $set: { isVerified: true } })

# Verify the change
db.users.find({}, { name: 1, email: 1, isVerified: 1 })
```

## Using isVerified in Your Application

The `isVerified` field is returned in the user object and can be used to:

1. **Display verification badges** in the UI
2. **Restrict certain features** to verified users only
3. **Show verification prompts** to unverified users
4. **Build trust indicators** in the platform

**Example - Show Verification Badge:**
```typescript
// In any React component
import { useAuth } from '../context/AuthContext';
import { CheckCircle } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <span>{user?.name}</span>
      {user?.isVerified && (
        <CheckCircle className="w-5 h-5 text-primary-600" />
      )}
    </div>
  );
};
```

**Example - Restrict Features:**
```typescript
const CreateDonation = () => {
  const { user } = useAuth();
  
  if (!user?.isVerified) {
    return (
      <div className="alert alert-warning">
        Please verify your account to create donations.
      </div>
    );
  }
  
  // Show donation form
};
```

## Production Considerations

For production, consider implementing:

1. **Email Verification:**
   - Send verification email on registration
   - User clicks link to verify
   - Token-based verification

2. **Phone Verification:**
   - SMS OTP verification
   - Two-factor authentication

3. **Document Verification:**
   - Upload ID documents
   - Manual review by admins
   - Automated KYC services

4. **Tiered Verification:**
   - Basic (email verified)
   - Intermediate (phone verified)
   - Full (document verified)

## Troubleshooting

**Issue:** Can't create admin user
- **Solution:** Use MongoDB directly to set role to 'admin'

**Issue:** Verification endpoint returns 403
- **Solution:** Ensure you're logged in as admin and token is valid

**Issue:** User still shows as unverified after update
- **Solution:** User may need to logout and login again to get fresh token with updated data

## Summary

**For Quick Testing (Development):**
```bash
mongosh
use usana
db.users.updateMany({}, { $set: { isVerified: true } })
```

**For Production (Proper Flow):**
1. Create admin account
2. Use admin API endpoints to verify users
3. Or implement email verification workflow

The verification system is now in place and ready to use! 🎉
