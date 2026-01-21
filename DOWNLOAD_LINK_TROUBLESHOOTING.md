# 🐛 Troubleshooting: 32-bit Download Link Not Saving

## ✅ What Should Work

The 32-bit download link field (`downloadUrl32`) is properly configured in:
- ✓ **Product Model** (`models/Product.ts`) - Line 67, 172
- ✓ **Product Form** (`app/admin/products/ProductForm.tsx`) - Line 31, 71, 578
- ✓ **API Endpoints** (`app/api/products/route.ts` & `[slug]/route.ts`)

## 🔍 Common Issues & Solutions

### Issue 1: Not Logged In as Admin
**Symptom:** Form saves but data not persisted  
**Solution:**
1. Go to `/admin`
2. Enter the admin API key from `.env.local`
3. Make sure you see "Admin Access Granted"

### Issue 2: Empty Field
**Symptom:** Field appears empty after saving  
**Check:**
1. Did you actually type in the URL?
2. Did the input field have the URL before clicking Save?
3. Check browser console for any errors

### Issue 3: Form State Not Updated
**Symptom:** Typing in the field but value not saving  
**Solution:**
1. Clear browser cache
2. Hard refresh (Ctrl+F5 or Cmd+Shift+R)
3. Restart dev server

### Issue 4: Database Connection
**Symptom:** No errors but data not in database  
**Solution:**
1. Check `.env.local` has correct `MONGODB_URI`
2. Verify MongoDB connection is working
3. Check MongoDB Atlas if using cloud database

---

## 🧪 How to Test

### Test 1: Check Form State
1. Open product form
2. Fill in 32-bit URL: `https://example.com/download-32bit.exe`
3. Open browser DevTools → Console
4. Type: `console.log(formData.downloadUrl32)`
5. Should show the URL you entered

### Test 2: Check Network Request
1. Open product form
2. Fill in both download URLs
3. Open DevTools → Network tab
4. Click Save
5. Find the POST/PATCH request
6. Check "Payload" tab
7. Verify `downloadUrl32` is in the request body

### Test 3: Check Database Directly
```bash
# Using MongoDB Compass or shell
db.products.find({}, { name: 1, downloadUrl: 1, downloadUrl32: 1 })
```

---

## 📊 Current Field Structure

### Form State (ProductForm.tsx)
```typescript
formData = {
  downloadUrl: '',      // 64-bit link
  downloadUrl32: '',    // 32-bit link (THIS IS THE FIELD)
  version: '',
  fileSize: '',
  lastUpdate: ''
}
```

### MongoDB Schema (Product.ts)
```typescript
{
  downloadUrl: String,     // Optional
  downloadUrl32: String,   // Optional (THIS IS SAVED)
  version: String,
  fileSize: String,
  lastUpdate: String
}
```

---

## ✅ Step-by-Step Fix

### Step 1: Verify Form Input
1. Go to `/admin/products`
2. Click "Add Product" or edit existing
3. Scroll to "معلومات التحميل" (Download Info)
4. Find "رابط التحميل (32-bit)" field
5. Enter a URL like: `https://drive.google.com/file/d/YOUR-FILE-ID/view`

### Step 2: Save Product
1. Fill all required fields (marked with *)
2. Scroll to bottom
3. Click "إضافة المنتج" or "تحديث المنتج"
4. Wait for success message

### Step 3: Verify Saved
1. Close the form
2. Re-open the same product for editing
3. Check if 32-bit URL field is filled
4. If empty, check console for errors

### Step 4: Check Database
Use the test script:
```bash
node test_downloadUrl32.js
```

---

## 🔧 Quick Fixes

### Fix 1: Clear Everything and Restart
```bash
# Stop dev server (Ctrl+C)
cd inventorywebapp
rm -rf .next
npm run dev
```

### Fix 2: Check Environment Variables
```bash
# .env.local should have:
MONGODB_URI=mongodb+srv://...
ADMIN_API_KEY=your-key
```

### Fix 3: Manual Database Update (Temporary)
If urgent, update directly in MongoDB:
```javascript
db.products.updateOne(
  { slug: "your-product-slug" },
  { $set: { downloadUrl32: "https://your-32bit-link.com" } }
)
```

---

## 📝 What to Check

When reporting the issue, provide:
1. ✅ Browser console errors (F12)
2. ✅ Network tab showing the API request
3. ✅ Form state before clicking Save
4. ✅ Response from API
5. ✅ MongoDB data for that product

---

## 🎯 Expected Behavior

**When working correctly:**
1. Type URL in "رابط التحميل (32-bit)" field
2. Click Save
3. Form closes with success message
4. Re-open product → 32-bit URL field is populated
5. View product page → 32-bit download button appears

**On product page:**
- If `downloadUrl32` exists → Show "تحميل 32-bit" button
- If only `downloadUrl` exists → Show single download button
- If both exist → Show dropdown with both options

---

## 🚨 If Still Not Working

1. **Check Authentication:**
   ```javascript
   // In browser console on /admin/products
   fetch('/api/products/test-product', {
     method: 'PATCH',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ downloadUrl32: 'test-url' })
   }).then(r => r.json()).then(console.log)
   ```

2. **Check MongoDB Field:**
   - Open MongoDB Compass
   - Connect to your database
   - Find `products` collection
   - Check if `downloadUrl32` field exists

3. **Add Console Logs:**
   In `ProductForm.tsx` handleSubmit function (line 82):
   ```typescript
   console.log('💾 Saving product:', formData)
   console.log('📦 32-bit URL:', formData.downloadUrl32)
   ```

---

**Created:** 2026-01-21  
**Issue:** downloadUrl32 field not saving  
**Status:** Investigating
