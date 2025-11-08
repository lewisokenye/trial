# Fix Gemini API - Enable Required Services

## ⚠️ The Problem

Your Gemini API key exists, but the **Generative Language API** isn't enabled for your Google Cloud project.

Error: `models/gemini-pro is not found for API version v1beta`

---

## ✅ Solution: Enable the API (2 Minutes)

### Step 1: Go to Google Cloud Console

**Click here:** https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com

This will take you directly to the Generative Language API page.

---

### Step 2: Enable the API

1. **Make sure** you're logged in with the same Google account you used for the API key
2. **Select** the project (or it will use the default one)
3. **Click** the blue **"ENABLE"** button
4. **Wait** ~30 seconds for it to activate

You'll see "API enabled" when it's done.

---

### Step 3: Test Again

After enabling:

1. Go back to: http://localhost:5173/nutrition
2. Fill in the form
3. Click "Generate AI Meal Plan"
4. **It should work now!** 🎉

---

## 🔄 Alternative: Create New API Key

If the above doesn't work, create a fresh API key with the API pre-enabled:

### Option A: Use AI Studio (Easier)

1. **Go to:** https://aistudio.google.com/app/apikey
2. **Click** "Create API Key"
3. **Select** "Create API key in new project"
4. **Copy** the new key
5. **Replace** in `backend/.env`:
   ```bash
   GEMINI_API_KEY=your_new_key_here
   ```

### Option B: Use Google Cloud Console

1. **Go to:** https://console.cloud.google.com
2. **Create** a new project or select existing
3. **Enable** Generative Language API
4. **Go to:** Credentials → Create Credentials → API Key
5. **Copy** the key and add to `.env`

---

## 🧪 Test Your Setup

After enabling the API, run this test:

```bash
cd backend
node test-gemini.js
```

**You should see:**
```
✅ gemini-pro works!
   Response: {"message": "hello"}
```

---

## 📋 Quick Links

- **Enable API:** https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
- **Create API Key:** https://aistudio.google.com/app/apikey
- **Google Cloud Console:** https://console.cloud.google.com
- **API Dashboard:** https://console.cloud.google.com/apis/dashboard

---

## ✅ Checklist

- [ ] Logged into Google Cloud Console
- [ ] Enabled Generative Language API
- [ ] Waited 30 seconds for activation
- [ ] Tested with `node test-gemini.js`
- [ ] Saw "works!" message
- [ ] Tried nutrition page again

---

## 🆘 Still Not Working?

Try creating a **completely new API key** from scratch:

1. Delete old key from: https://console.cloud.google.com/apis/credentials
2. Go to: https://aistudio.google.com/app/apikey
3. Click "Create API key in new project"
4. This automatically creates project + enables API
5. Copy new key to `.env`
6. Test again

---

**Do this now:**
1. Click: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
2. Enable the API
3. Wait 30 seconds
4. Test the nutrition page!

Let me know if it works! 🚀
