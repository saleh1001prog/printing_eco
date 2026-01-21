# 🏋️ Gym Management System - Database Schema Analysis

## 📊 Complete Field List for Web Implementation

---

## 1️⃣ **Member (العضو)**

### Personal Information
```typescript
{
  // Basic Info
  id: number
  firstName: string                    // الاسم الأول
  lastName: string                     // اسم العائلة
  firstNameArabic: string              // الاسم الأول بالعربية
  lastNameArabic: string               // اسم العائلة بالعربية
  
  // Contact
  phone: string                        // رقم الهاتف
  email: string                        // البريد الإلكتروني
  address: string                      // العنوان
  addressArabic: string                // العنوان بالعربية
  
  // Personal Details
  dateOfBirth: Date                    // تاريخ الميلاد
  gender: 'Male' | 'Female'            // الجنس
  profilePicture?: string              // صورة العضو (base64 أو رابط)
  
  // Identification
  barcode?: string                     // الباركود
  rfidTag?: string                     // RFID Tag
  cardNumber?: string                  // رقم البطاقة
  
  // Emergency Contact
  emergencyContactName?: string        // اسم جهة الاتصال الطارئة
  emergencyContactPhone?: string       // رقم الهاتف الطارئ
  
  // Medical
  medicalNotes?: string                // ملاحظات طبية
  
  // Status & Dates
  isActive: boolean                    // نشط/غير نشط
  registrationDate: Date               // تاريخ التسجيل
  lastVisitDate?: Date                 // آخر زيارة
}
```

---

## 2️⃣ **Membership Package (باقة العضوية)**

### Package Details
```typescript
{
  id: number
  
  // Names (Multi-language)
  name: string                         // اسم الباقة (إنجليزي)
  nameArabic: string                   // اسم الباقة (عربي)
  nameFrench: string                   // اسم الباقة (فرنسي)
  
  // Descriptions
  description?: string                 // وصف الباقة (إنجليزي)
  descriptionArabic?: string           // وصف الباقة (عربي)
  descriptionFrench?: string           // وصف الباقة (فرنسي)
  
  // Type
  type: 'Time' | 'Session'             // نوع الباقة: زمنية أو جلسات
  
  // Time-based Settings
  durationDays?: number                // المدة بالأيام
  durationMonths?: number              // المدة بالأشهر
  
  // Session-based Settings
  sessionCount?: number                // عدد الجلسات
  sessionValidityDays?: number         // صلاحية الجلسات بالأيام
  
  // Pricing
  price: number                        // السعر
  
  // Freeze Options
  maxFreezeDays: number                // أقصى أيام التجميد (افتراضي: 30)
  allowFreeze: boolean                 // السماح بالتجميد
  
  // Status
  isActive: boolean                    // نشطة/غير نشطة
  createdDate: Date                    // تاريخ الإنشاء
}
```

---

## 3️⃣ **Membership (الاشتراك)**

### Subscription Details
```typescript
{
  id: number
  memberId: number                     // معرف العضو
  membershipPackageId: number          // معرف الباقة
  
  // Dates
  startDate: Date                      // تاريخ البداية
  expiryDate: Date                     // تاريخ الانتهاء
  
  // Session-based
  totalSessions?: number               // إجمالي الجلسات
  remainingSessions?: number           // الجلسات المتبقية
  
  // Freeze Tracking
  totalFreezeDays: number              // إجمالي أيام التجميد المستخدمة
  maxAllowedFreezeDays: number         // أقصى أيام تجميد مسموحة
  isFrozen: boolean                    // مجمد حالياً
  currentFreezeStartDate?: Date        // تاريخ بدء التجميد الحالي
  
  // Payment
  amount: number                       // المبلغ الكلي
  paidAmount: number                   // المبلغ المدفوع
  paymentStatus: 'Paid' | 'Unpaid' | 'PartiallyPaid'
  isPaid: boolean                      // مدفوع كاملاً
  
  // Status
  isActive: boolean                    // نشط/منتهي
  createdDate: Date                    // تاريخ الإنشاء
  notes?: string                       // ملاحظات
}
```

---

## 4️⃣ **Payment (الدفع)**

### Payment Record
```typescript
{
  id: number
  memberId: number                     // معرف العضو
  membershipId?: number                // معرف الاشتراك (اختياري)
  
  // Amount
  amount: number                       // المبلغ
  
  // Payment Details
  paymentMethod: 'Cash' | 'Card' | 'Bank Transfer'  // طريقة الدفع
  paymentDate: Date                    // تاريخ الدفع
  receiptNumber?: string               // رقم الإيصال
  
  // Type
  paymentType: 'Membership' | 'Product' | 'Service'  // نوع الدفع
  
  // Additional
  notes?: string                       // ملاحظات
  processedBy: string                  // تمت المعالجة بواسطة
}
```

---

## 5️⃣ **Product (المنتج)**

### Product Details
```typescript
{
  id: number
  
  // Names (Multi-language)
  name: string                         // اسم المنتج (إنجليزي)
  nameArabic: string                   // اسم المنتج (عربي)
  nameFrench: string                   // اسم المنتج (فرنسي)
  
  description?: string                 // الوصف
  
  // Identification
  sku?: string                         // رمز المنتج (Stock Keeping Unit)
  barcode?: string                     // الباركود
  
  // Category
  categoryId: number                   // معرف الفئة
  
  // Pricing
  costPrice: number                    // سعر الشراء
  salePrice: number                    // سعر البيع
  
  // Stock
  stockQuantity: number                // الكمية المتوفرة
  minStockLevel: number                // الحد الأدنى للمخزون
  
  // Media
  imagePath?: string                   // صورة المنتج
  
  // Status
  isActive: boolean                    // نشط/غير نشط
  createdDate: Date                    // تاريخ الإضافة
  lastUpdated?: Date                   // آخر تحديث
}
```

---

## 6️⃣ **Product Category (فئة المنتج)**

```typescript
{
  id: number
  name: string                         // اسم الفئة
  nameArabic: string                   // اسم الفئة (عربي)
  nameFrench: string                   // اسم الفئة (فرنسي)
  description?: string                 // وصف الفئة
  isActive: boolean                    // نشط/غير نشط
}
```

---

## 7️⃣ **Check-In (الحضور)**

```typescript
{
  id: number
  memberId: number                     // معرف العضو
  membershipId?: number                // معرف الاشتراك
  
  checkInTime: Date                    // وقت الدخول
  checkOutTime?: Date                  // وقت الخروج
  
  method: 'Barcode' | 'RFID' | 'Manual'  // طريقة الدخول
  notes?: string                       // ملاحظات
}
```

---

## 8️⃣ **Training Program (برنامج التدريب)**

```typescript
{
  id: number
  memberId: number                     // معرف العضو
  
  // Program Info
  programName: string                  // اسم البرنامج (إنجليزي)
  programNameArabic: string            // اسم البرنامج (عربي)
  programNameFrench: string            // اسم البرنامج (فرنسي)
  
  // Duration
  durationWeeks: number                // المدة بالأسابيع
  startDate: Date                      // تاريخ البداية
  
  // Content
  programContent: string               // محتوى البرنامج (HTML/Rich Text)
  notes?: string                       // ملاحظات
  
  // Status
  isActive: boolean                    // نشط/غير نشط
  createdDate: Date                    // تاريخ الإنشاء
  updatedDate?: Date                   // تاريخ التحديث
}
```

---

## 9️⃣ **Sale (البيع)**

```typescript
{
  id: number
  memberId?: number                    // معرف العضو (اختياري)
  
  // Sale Details
  saleDate: Date                       // تاريخ البيع
  totalAmount: number                  // المبلغ الإجمالي
  discount: number                     // الخصم
  finalAmount: number                  // المبلغ النهائي
  
  // Payment
  paymentMethod: 'Cash' | 'Card' | 'Bank Transfer'
  isPaid: boolean                      // مدفوع/غير مدفوع
  
  notes?: string                       // ملاحظات
  processedBy: string                  // البائع
}
```

---

## 🔟 **Sale Item (عنصر البيع)**

```typescript
{
  id: number
  saleId: number                       // معرف البيع
  productId: number                    // معرف المنتج
  
  quantity: number                     // الكمية
  unitPrice: number                    // سعر الوحدة
  totalPrice: number                   // السعر الإجمالي
  discount: number                     // الخصم على العنصر
}
```

---

## 1️⃣1️⃣ **Membership Freeze (تجميد الاشتراك)**

```typescript
{
  id: number
  membershipId: number                 // معرف الاشتراك
  memberId: number                     // معرف العضو
  
  freezeStartDate: Date                // تاريخ بدء التجميد
  freezeEndDate: Date                  // تاريخ نهاية التجميد
  
  reason?: string                      // سبب التجميد
  isActive: boolean                    // نشط/منتهي
  createdDate: Date                    // تاريخ الإنشاء
}
```

---

## 📋 **Summary - Required Fields Priority**

### 🔴 **Essential (Must Have)**
1. **Members**: Full member information with identification
2. **Membership Packages**: Package details with pricing
3. **Memberships**: Active subscriptions tracking
4. **Payments**: Payment records

### 🟡 **Important (Should Have)**
5. **Check-Ins**: Attendance tracking
6. **Products**: Gym products/supplements
7. **Product Categories**: Product organization

### 🟢 **Optional (Nice to Have)**
8. **Training Programs**: Custom workout plans
9. **Sales**: POS system for products
10. **Membership Freeze**: Subscription pause management

---

## 🎯 **Recommended Implementation Order**

### Phase 1 - Core Features
1. Members Management
2. Membership Packages
3. Memberships (Subscriptions)
4. Payments

### Phase 2 - Operations
5. Check-Ins (Attendance)
6. Dashboard & Reports

### Phase 3 - Additional Features
7. Products & Categories
8. Training Programs
9. Freeze Management

---

## 💡 **Key Features for Web Version**

### Multi-language Support
- Arabic (عربي)
- English
- French (Français)

### Member Features
- RFID/Barcode scanning
- Profile pictures
- Emergency contacts
- Medical notes

### Subscription Features
- Time-based (شهري/سنوي)
- Session-based (عدد جلسات)
- Freeze management (تجميد)
- Partial payments (دفعات)

### Financial Tracking
- Payment history
- Outstanding balances
- Sales reports
- Product inventory

---

**Date**: 2026-01-21  
**Source**: GymManagementSystem (C# WPF Desktop App)  
**Target**: Next.js Web Application
