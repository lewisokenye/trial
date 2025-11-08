# Get Your OpenAI API Key - Step by Step

## 🚀 Quick Start (5 Minutes)

### Step 1: Sign Up for OpenAI

**Click here:** https://platform.openai.com/signup

Options:
- ✅ Sign up with Google (fastest)
- ✅ Sign up with email

**What you get:**
- $5 in free credits (enough for 2,500 meal plans!)
- No credit card required initially

---

### Step 2: Verify Your Account

1. Check your email for verification link
2. Click the link to verify
3. You'll be redirected to OpenAI dashboard

---

### Step 3: Create Your API Key

**Click here:** https://platform.openai.com/api-keys

1. **Click** the green button: **"+ Create new secret key"**
2. **Enter a name:** "Usana Meal Plans"
3. **Set permissions:** (Leave default - Full access)
4. **Click** "Create secret key"

5. **Copy the key!** It looks like this:
   ```
   sk-proj-abc123def456ghi789...
   ```

   ⚠️ **IMPORTANT:** 
   - Copy it NOW and save it somewhere safe
   - You won't be able to see it again!
   - If you lose it, you'll have to create a new one

---

### Step 4: Add to Your Project

1. **Open:** `backend/.env`
2. **Find line 9:** 
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
3. **Replace with your key:**
   ```
   OPENAI_API_KEY=sk-proj-abc123def456ghi789...
   ```
4. **Save the file**

---

### Step 5: Restart Backend

In your terminal:

```bash
# Press Ctrl+C to stop the backend

# Then restart:
cd backend
npm run dev
```

Wait for:
```
🚀 Server running on port 5000
🍃 MongoDB Connected: localhost
```

---

### Step 6: Test It!

1. **Go to:** http://localhost:5173/nutrition
2. **Fill in the form:**
   - Age: 25
   - Weight: 70
   - Height: 170
   - Activity: Moderate
   - Diet: Balanced
3. **Click:** "Generate AI Meal Plan" ✨
4. **Wait:** ~5-10 seconds
5. **Success!** 🎉

---

## 💰 Pricing Info

### Free Tier
- **$5 free credits** for new accounts
- Expires after 3 months if unused
- Perfect for testing!

### After Free Credits
- **GPT-3.5:** $0.002 per meal plan (~500 tokens)
- **1,000 meal plans:** ~$2
- **Very affordable!**

### Add Billing (Optional)
1. Go to: https://platform.openai.com/account/billing
2. Add payment method
3. Set a spending limit (e.g., $10/month)
4. Never get surprised by charges!

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep your API key secret
- Never commit `.env` to Git (already in `.gitignore`)
- Use environment variables only
- Rotate keys every few months

### ❌ DON'T:
- Share your API key with anyone
- Post it online or in screenshots
- Hardcode it in your code
- Commit it to public repositories

---

## 🐛 Troubleshooting

### Error: "Invalid API Key"

**Check:**
1. ✅ Key starts with `sk-proj-` or `sk-`
2. ✅ No extra spaces before/after the key
3. ✅ You copied the entire key
4. ✅ Backend was restarted after adding key

**Test your key:**
```bash
# In PowerShell:
$headers = @{
    "Authorization" = "Bearer YOUR_API_KEY_HERE"
}
Invoke-RestMethod -Uri "https://api.openai.com/v1/models" -Headers $headers
```

If this works, your key is valid!

---

### Error: "Rate Limit Exceeded"

**Solutions:**
1. Wait 60 seconds and try again
2. Check your usage: https://platform.openai.com/usage
3. Upgrade to paid tier if needed

---

### Error: "Insufficient Quota"

**This means:**
- You've used all your free credits
- Need to add billing to continue

**Solution:**
1. Go to: https://platform.openai.com/account/billing
2. Add payment method
3. Set a low spending limit ($5-10)
4. Continue using the service

---

## 🆓 Free Alternative: Google Gemini

Don't want to use OpenAI? No problem!

**I can switch to Google Gemini:**
- ✅ Completely FREE
- ✅ No credit card needed
- ✅ Unlimited usage
- ✅ Similar quality

Just let me know and I'll update the code!

---

## 📊 Monitor Your Usage

**Check usage dashboard:**
https://platform.openai.com/usage

You'll see:
- Total requests
- Tokens used
- Cost breakdown
- Rate limit status

Set up alerts for spending limits!

---

## 🎯 Quick Links

- **Sign Up:** https://platform.openai.com/signup
- **API Keys:** https://platform.openai.com/api-keys
- **Usage:** https://platform.openai.com/usage
- **Billing:** https://platform.openai.com/account/billing
- **Documentation:** https://platform.openai.com/docs

---

## ✅ Checklist

Before testing, make sure:

- [ ] Signed up for OpenAI account
- [ ] Created API key
- [ ] Copied full API key (starts with `sk-`)
- [ ] Added to `backend/.env` file
- [ ] No extra spaces in .env
- [ ] Saved the .env file
- [ ] Restarted backend server
- [ ] Saw "🚀 Server running on port 5000"
- [ ] Refreshed browser
- [ ] Tested meal plan generation

---

## 🆘 Still Having Issues?

If you're still getting errors:

1. **Copy your API key** and show me just the first 10 characters:
   - Example: `sk-proj-ab...` ✅
   - Don't show the full key! 🔒

2. **Copy the exact error** from backend terminal

3. **Check** if you have free credits left:
   - Go to: https://platform.openai.com/usage

Then I can help you debug!

---

**Ready to get started? Follow Step 1! 🚀**
