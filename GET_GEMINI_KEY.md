# Get Your FREE Google Gemini API Key

## ✅ Completely FREE - No Credit Card Needed!

---

## 🚀 Quick Start (2 Minutes)

### Step 1: Go to Google AI Studio

**Click here:** https://makersuite.google.com/app/apikey

Or alternative link: https://aistudio.google.com/app/apikey

**Requirements:**
- ✅ Google account (Gmail)
- ✅ That's it! No credit card needed!

---

### Step 2: Create Your API Key

1. **Sign in** with your Google account
2. **Click** "Create API Key"
3. **Select** "Create API key in new project" (or select existing project)
4. **Copy** the API key immediately!

Your key will look like this:
```
AIzaSyA...your_key_here...xyz123
```

⚠️ **Save it now!** You can see it again later, but save it anyway.

---

### Step 3: Add to Your Project

1. **Open:** `backend/.env`
2. **Replace line 9:**

```bash
# Before:
GEMINI_API_KEY=your_gemini_api_key_here

# After:
GEMINI_API_KEY=AIzaSyA...your_actual_key...xyz123
```

3. **Save the file**

---

### Step 4: Restart Backend

Backend auto-reloads, but to be sure:

```bash
# In backend terminal:
# Press Ctrl+C, then:
npm run dev
```

Wait for:
```
🚀 Server running on port 5000
🍃 MongoDB Connected: localhost
```

---

### Step 5: Test It!

1. **Go to:** http://localhost:5173/nutrition
2. **Fill in the form:**
   - Age: 25
   - Weight: 70 kg
   - Height: 170 cm
   - Activity: Moderate
   - Diet: Balanced
3. **Click:** "Generate AI Meal Plan" ✨
4. **Wait:** ~5-10 seconds
5. **Success!** 🎉

---

## 💰 Pricing (FREE!)

### Gemini Pro (What We Use)

**FREE Tier:**
- ✅ 60 requests per minute
- ✅ Unlimited daily requests
- ✅ No credit card required
- ✅ Forever FREE!

**That's enough for:**
- 60 meal plans per minute
- 3,600 meal plans per hour
- **Unlimited** for personal use!

**No paid tier needed** - the free tier is more than enough! 🎉

---

## 🆚 Gemini vs OpenAI

| Feature | Google Gemini | OpenAI GPT-3.5 |
|---------|---------------|----------------|
| **Price** | ✅ FREE | ❌ $0.002/request |
| **Quality** | ✅ Great | ✅ Great |
| **Speed** | ✅ Fast (2-5s) | ✅ Fast (5-10s) |
| **Rate Limit** | ✅ 60/min | ❌ Lower on free tier |
| **Credit Card** | ✅ Not needed | ❌ Needed after $5 |
| **Setup** | ✅ 2 minutes | ⚠️ 5 minutes |

**Winner:** Gemini for this use case! 🏆

---

## 🔒 Security

### ✅ DO:
- Keep your API key private
- Never commit `.env` to Git
- Use environment variables only

### ❌ DON'T:
- Share your key publicly
- Hardcode it in your code
- Post it in screenshots

**Good news:** Even if someone uses your key, it's still free! No charges to worry about.

---

## 🐛 Troubleshooting

### Error: "Invalid API key"

**Check:**
1. ✅ Key starts with `AIza`
2. ✅ No spaces before/after
3. ✅ You copied the full key
4. ✅ Backend was restarted

**Test your key:**
```bash
curl "https://generativelanguage.googleapis.com/v1/models?key=YOUR_KEY"
```

If this returns a list of models, your key works!

---

### Error: "API key not configured"

**Fix:**
1. Make sure you edited `backend/.env`
2. Save the file
3. Restart backend (Ctrl+C then `npm run dev`)

---

### Gemini Not Responding

**Check:**
1. Your internet connection
2. Google AI Studio status: https://status.cloud.google.com
3. Backend terminal for error logs

---

## 📊 Monitor Usage (Optional)

**Check your usage:**
https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas

You'll see:
- Requests per minute
- Daily usage
- No costs (it's free!)

---

## 🎯 Quick Links

- **Get API Key:** https://makersuite.google.com/app/apikey
- **Documentation:** https://ai.google.dev/docs
- **Models:** https://ai.google.dev/models/gemini
- **Quotas:** https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas

---

## ✅ Checklist

Before testing:

- [ ] Visited Google AI Studio
- [ ] Created Gemini API key
- [ ] Copied full key (starts with `AIza`)
- [ ] Added to `backend/.env`
- [ ] Saved .env file
- [ ] Backend restarted
- [ ] Saw "🚀 Server running"
- [ ] Tested nutrition page

---

## 🎉 Benefits of Gemini

1. **Completely FREE** - No hidden costs
2. **No credit card** - Just need Google account
3. **High rate limits** - 60 requests/min
4. **Great quality** - Similar to ChatGPT
5. **Fast responses** - 2-5 seconds
6. **Easy setup** - 2 minutes
7. **No quotas** - Unlimited for personal use

---

## 🆘 Still Having Issues?

1. **Copy your API key** (first 10 chars only):
   - Example: `AIzaSyAbc...` ✅
   - Don't show the full key! 🔒

2. **Check backend terminal** for error logs

3. **Try the test curl command** above

Then let me know what error you're seeing!

---

## 🚀 Ready to Start!

**Step 1:** Click here to get your key:
👉 https://makersuite.google.com/app/apikey

**Step 2:** Add it to `backend/.env`

**Step 3:** Restart backend

**Step 4:** Test the nutrition page!

**It's that simple! No credit card, no costs, just free AI! 🎉**
