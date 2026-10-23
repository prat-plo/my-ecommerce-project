# 🛒 My E-Commerce Project

เว็บไซต์ E-Commerce แบบ Full Stack สำหรับเรียนรู้การพัฒนาร้านค้าออนไลน์ ตั้งแต่การสมัครสมาชิกและเข้าสู่ระบบ การจัดการสินค้าและสต็อก ตะกร้าสินค้า การ Checkout ไปจนถึงการสร้างคำสั่งซื้อ โดยแยก Frontend และ Backend และสื่อสารกันผ่าน REST API

> **สถานะโครงการ:** Phase 1 เสร็จแล้ว กำลังดำเนินการ Phase 2 โดยหน้า Order History ฝั่ง Frontend ยังต้องตรวจสอบการเชื่อมต่อ API ให้ทำงานได้ครบถ้วน

## 🔗 ลิงก์โครงการ

- **GitHub Repository:** https://github.com/prat-plo/my-ecommerce-project
- **Frontend (Vercel):** https://my-ecommerce-project-five.vercel.app/
- **Backend API (Render):** https://my-ecommerce-api-iowl.onrender.com/

หมายเหตุ: การใช้งานจริงขึ้นอยู่กับสถานะบริการและการตั้งค่า environment variables ของ deployment

---

## 📖 เกี่ยวกับเว็บไซต์

โปรเจกต์นี้เป็นเว็บไซต์ซื้อขายสินค้าออนไลน์ที่มีระบบผู้ใช้ทั่วไปและผู้ดูแลระบบ (Admin) ผู้ใช้สามารถเรียกดูสินค้า จัดการตะกร้า ระบุที่อยู่จัดส่ง และส่งคำสั่งซื้อได้ ส่วน Admin สามารถจัดการข้อมูลสินค้าและเปลี่ยนสถานะคำสั่งซื้อผ่าน API ที่มีการตรวจสอบสิทธิ์

## ✨ ฟีเจอร์ของเว็บไซต์

### 👤 บัญชีผู้ใช้และความปลอดภัย
- สมัครสมาชิกและเข้าสู่ระบบ
- ใช้ JSON Web Token (JWT) สำหรับยืนยันตัวตนใน API ที่ต้องเข้าสู่ระบบ
- เข้ารหัสรหัสผ่านด้วย bcryptjs
- แยกสิทธิ์ผู้ใช้ทั่วไปและ Admin และตรวจสอบสิทธิ์ก่อนเข้าถึง API สำหรับผู้ดูแล
- ดูและแก้ไขข้อมูลโปรไฟล์ผู้ใช้

### 🛍️ สินค้าและสต็อก
- ดึงข้อมูลสินค้าแบบไดนามิกจาก Backend และ MongoDB
- รองรับการอัปโหลดรูปภาพสินค้าไปยัง Cloudinary
- Admin สามารถเพิ่ม แก้ไข และลบสินค้าได้
- จัดเก็บจำนวนสินค้าในสต็อก
- ตรวจสอบสต็อกก่อนรับคำสั่งซื้อและลดสต็อกเมื่อสร้างคำสั่งซื้อสำเร็จ

### 🛒 ตะกร้าสินค้าและ Checkout
- เพิ่มสินค้าในตะกร้า
- เพิ่มหรือลดจำนวนสินค้าและนำสินค้าออกจากตะกร้า
- คำนวณราคารวมของสินค้าในตะกร้า
- กรอกที่อยู่สำหรับจัดส่งก่อนสั่งซื้อ
- ตรวจสอบข้อมูลคำสั่งซื้อและจำนวนสินค้าในสต็อกฝั่ง Backend

### 📦 ที่อยู่และคำสั่งซื้อ
- บันทึกที่อยู่จัดส่งหลายรายการสำหรับบัญชีผู้ใช้
- ดู เพิ่ม แก้ไข และลบที่อยู่ที่บันทึกไว้
- สร้างคำสั่งซื้อโดยผูกกับผู้ใช้ที่เข้าสู่ระบบ
- บันทึกหมายเลขคำสั่งซื้อ รายการสินค้า ราคา จำนวน และยอดรวม
- ใช้ MongoDB transaction สำหรับขั้นตอนสร้างคำสั่งซื้อและปรับสต็อก
- มี API สำหรับดูประวัติคำสั่งซื้อของผู้ใช้ และ API สำหรับ Admin เปลี่ยนสถานะคำสั่งซื้อ
- Backend รองรับวิธีชำระเงิน COD และ Bank Transfer

> **ขอบเขตการชำระเงิน:** ตัวเลือกวิธีชำระเงินไม่ได้หมายความว่ามี Payment Gateway หรือการตัดเงินจริงแล้ว การเชื่อมต่อเกตเวย์วางไว้ใน Phase 5

### 🧰 Validation และ Error Handling
- ตรวจสอบข้อมูลที่จำเป็นก่อนดำเนินการ
- ส่ง HTTP status และข้อความผิดพลาดสำหรับข้อมูลไม่ถูกต้อง ไม่พบข้อมูล หรือไม่มีสิทธิ์
- มี Middleware สำหรับจัดการ API ที่ไม่พบและข้อผิดพลาดส่วนกลาง

### 🎨 ส่วนติดต่อผู้ใช้
- สร้าง UI ด้วย React และ Tailwind CSS
- ใช้ React Hooks (useState, useEffect) จัดการ state และ lifecycle
- ใช้ Axios เรียก REST API
- มีองค์ประกอบ UI เช่น Cart, ProductCard, Login, Register และส่วนจัดการสินค้า

---

## 🧭 Development Roadmap — ความคืบหน้า

สถานะด้านล่างแยกฟีเจอร์ที่มี API แล้วออกจากงานที่ยังต้องตรวจสอบบน Frontend เพื่อไม่ให้เข้าใจว่าทุกส่วนเสร็จสมบูรณ์แล้ว

### 🔴 Phase 1 — ทำให้ระบบพื้นฐานถูกต้อง
- [x] แก้ไขและตรวจสอบความปลอดภัยของ isAdmin
- [x] Authentication / Authorization
- [x] User Profile
- [x] Product Image Upload
- [x] Product Stock
- [x] Validation
- [x] Error Handling

**สถานะ: เสร็จแล้ว**

### 🟠 Phase 2 — ทำให้ซื้อสินค้าได้จริง
- [x] Checkout และสร้างคำสั่งซื้อ
- [x] Shipping Address
- [x] Order System และการบันทึกคำสั่งซื้อ
- [ ] Order History — มี API สำหรับดึงคำสั่งซื้อของผู้ใช้แล้ว แต่ต้องตรวจสอบ/แก้การเชื่อมต่อจาก Frontend และทดสอบทั้ง Localhost กับ Deployment
- [x] Order Status API — มี API สำหรับ Admin เปลี่ยนสถานะคำสั่งซื้อ
- [ ] Payment Method — Backend รองรับ COD และ Bank Transfer; ตรวจสอบ UI และ validation ให้ครบก่อนปิดงาน
- [ ] Shipping / Tracking

**สถานะ: กำลังดำเนินการ** — งานสำคัญถัดไปคือทำให้หน้า Order History โหลดข้อมูลจาก API ได้สม่ำเสมอ และทดสอบ flow คำสั่งซื้อบนระบบที่ deploy แล้ว

### 🟡 Phase 3 — เพิ่มความสามารถของร้านค้า
- [ ] Search
- [ ] Filter
- [ ] Sort
- [ ] Pagination
- [ ] Wishlist
- [ ] Review & Rating
- [ ] Coupon
- [ ] Product Variant

**สถานะ: ยังไม่เริ่ม / รอทำหลัง Phase 2**

### 🟢 Phase 4 — พัฒนาระบบ Admin
- [ ] Dashboard
- [ ] Sales Analytics
- [ ] User Management
- [ ] Order Management
- [ ] Inventory Management
- [ ] Review Management
- [ ] Coupon Management

**สถานะ: วางแผนไว้**

### 🔵 Phase 5 — เตรียมระบบสำหรับ Production
- [ ] Payment Gateway
- [ ] Email Notification
- [ ] Forgot Password
- [ ] Refresh Token
- [ ] Rate Limiting
- [ ] Security Hardening
- [ ] Logging
- [ ] Automated / Integration Testing
- [ ] CI/CD

**สถานะ: วางแผนไว้**

---

## 🛠️ Tech Stack & Deployment

| ส่วน | เทคโนโลยี | หน้าที่ |
|---|---|---|
| Frontend | React 19 | สร้าง UI และส่วนประกอบเว็บไซต์ |
| Frontend tooling | Vite | Development server และ build |
| Styling | Tailwind CSS 4 | จัดรูปแบบ UI |
| HTTP Client | Axios | เรียก API จาก Frontend |
| Backend Runtime | Node.js | รัน Backend |
| Backend Framework | Express 5 | REST API และ Middleware |
| Database | MongoDB Atlas / MongoDB | จัดเก็บข้อมูลผู้ใช้ สินค้า ที่อยู่ และคำสั่งซื้อ |
| ODM | Mongoose | Schema และการติดต่อ MongoDB |
| Authentication | JWT + bcryptjs | Token authentication และ password hashing |
| Image Upload | Multer + Cloudinary | รับไฟล์และจัดเก็บรูปภาพสินค้า |
| Version Control | Git + GitHub | จัดการ source code |
| Frontend Deployment | Vercel | โฮสต์ Frontend |
| Backend Deployment | Render | โฮสต์ REST API |

### ภาพรวมการทำงาน

~~~text
ผู้ใช้
  |
  v
React + Vite (Frontend on Vercel)
  |
  | HTTP requests via Axios
  v
Node.js + Express (Backend API on Render)
  |
  +------ MongoDB / Mongoose
  |
  +------ Cloudinary (product images)
~~~

### Environment Variables

ตั้งค่า environment variables สำหรับ Backend ในเครื่องและบน Render ตามที่โค้ดใช้งานจริง ตัวอย่างตัวแปรหลัก:

- PORT — พอร์ต Backend เช่น 5000
- MONGO_URI — MongoDB connection string
- JWT_SECRET — secret สำหรับลงนาม JWT
- ค่าการเชื่อมต่อ Cloudinary — ใช้ชื่อตัวแปรตามที่โค้ดกำหนด

**ข้อควรระวัง:** อย่าใส่ค่า secret จริงใน README หรือ commit ไฟล์ .env ขึ้น GitHub หากเคยเปิดเผย secret ให้เปลี่ยนหรือ rotate ค่านั้นด้วย

---

## 📁 โครงสร้างโปรเจกต์

โครงสร้างหลักโดยสรุป (ไฟล์ย่อยอาจเพิ่มขึ้นระหว่างพัฒนา):

~~~text
my-ecommerce-project/
├── backend/
│   ├── config/          # การตั้งค่าและเชื่อมต่อฐานข้อมูล
│   ├── controllers/     # ส่วนประมวลผล request (ถ้ามีแยกใช้)
│   ├── middleware/      # Authentication, authorization และ error handling
│   ├── models/          # Mongoose models เช่น User, Product, Order
│   ├── routes/          # REST API เช่น auth, products, orders, addresses
│   ├── server.js        # จุดเริ่มต้น Backend
│   └── package.json
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # UI components เช่น Cart, ProductCard, Login และ Register
│   │   ├── App.jsx      # การประกอบ UI หลัก
│   │   └── main.jsx     # จุดเริ่มต้น React
│   ├── package.json
│   └── vite.config.js
└── README.md
~~~

---

## 🚀 เริ่มต้นใช้งานบนเครื่อง (Local Development)

### สิ่งที่ต้องมี
- Node.js และ npm
- MongoDB Atlas หรือ MongoDB ที่รันในเครื่อง
- บัญชี Cloudinary หากต้องการทดสอบการอัปโหลดรูปภาพ

### 1. Clone Repository

~~~bash
git clone https://github.com/prat-plo/my-ecommerce-project.git
cd my-ecommerce-project
~~~

### 2. ตั้งค่าและรัน Backend

~~~bash
cd backend
npm install
~~~

สร้างไฟล์ .env ภายในโฟลเดอร์ backend/ แล้วกำหนดค่าตามที่โค้ดใช้งานจริง ตัวอย่าง:

~~~env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
~~~

เพิ่มค่าการเชื่อมต่อ Cloudinary ตามชื่อตัวแปรที่ใช้อยู่ในโค้ด จากนั้นเริ่ม Backend:

~~~bash
npm run dev
~~~

Backend จะทำงานบนพอร์ตที่กำหนด เช่น http://localhost:5000

### 3. ตั้งค่าและรัน Frontend

เปิด Terminal อีกหน้าต่างจาก root ของโปรเจกต์:

~~~bash
cd frontend
npm install
npm run dev
~~~

Vite จะแสดง URL สำหรับเปิดเว็บไซต์ใน Terminal โดยทั่วไปคือ http://localhost:5173

ตรวจสอบให้แน่ใจว่า Frontend เรียก Backend URL ที่ถูกต้อง และ Backend อนุญาต CORS สำหรับ origin ที่ใช้งาน

---

## 🔌 API ที่สำคัญ

| Method | Endpoint | หน้าที่ | สิทธิ์ |
|---|---|---|---|
| POST | /api/auth/register | สมัครสมาชิก | Public |
| POST | /api/auth/login | เข้าสู่ระบบและรับ token | Public |
| GET | /api/products | ดูรายการสินค้า | Public |
| POST | /api/products | เพิ่มสินค้า | Admin |
| POST | /api/orders | สร้างคำสั่งซื้อ | ต้องเข้าสู่ระบบ |
| GET | /api/orders | ดูประวัติคำสั่งซื้อของตนเอง | ต้องเข้าสู่ระบบ |
| PATCH | /api/orders/:id/status | เปลี่ยนสถานะคำสั่งซื้อ | Admin |
| GET | /api/addresses | ดูที่อยู่ที่บันทึกไว้ | ต้องเข้าสู่ระบบ |
| POST | /api/addresses | เพิ่มที่อยู่ | ต้องเข้าสู่ระบบ |
| PUT | /api/addresses/:id | แก้ไขที่อยู่ | ต้องเข้าสู่ระบบ |
| DELETE | /api/addresses/:id | ลบที่อยู่ | ต้องเข้าสู่ระบบ |

> รายการนี้เป็น endpoint หลัก ไม่ใช่รายการ API ทั้งหมด โปรดตรวจสอบไฟล์ใน backend/routes/ ก่อนใช้งาน endpoint เพิ่มเติม

---

## 🧪 แนวทางทดสอบและพัฒนาต่อ

1. ทดสอบ API ฝั่ง Backend ด้วย Postman ก่อน เช่น Login, Products, Orders และ Addresses
2. ใช้ token ที่ได้จากการ Login เพื่อทดสอบ endpoint ที่ต้องยืนยันตัวตน
3. ทดสอบสิทธิ์ Admin และผู้ใช้ทั่วไปแยกกัน โดย API สำหรับ Admin ต้องปฏิเสธผู้ใช้ทั่วไป
4. ทดสอบ Checkout ด้วยจำนวนสินค้าในสต็อกที่เพียงพอและไม่เพียงพอ
5. ตรวจสอบว่าเมื่อสร้างคำสั่งซื้อสำเร็จ สต็อกลดลงและคำสั่งซื้อถูกบันทึก
6. ทดสอบ Frontend กับ Backend บน Localhost ก่อน จากนั้น push ขึ้น GitHub และตรวจสอบ deployment บน Vercel/Render
7. หากพบปัญหา ให้ตรวจสอบ Backend URL, token, CORS, environment variables และ log ของ Render

## 📌 ขั้นตอนการทำงานในแต่ละ Phase

- ทำฟีเจอร์และ API ให้ทำงานได้ก่อน
- ทดสอบ API โดยตรงด้วย Postman
- เชื่อมต่อ Frontend และทดสอบ flow จริงของผู้ใช้
- ทดสอบกรณีผิดพลาดและสิทธิ์ที่ไม่ควรเข้าถึง
- Commit และ push เมื่อทดสอบผ่าน แล้วตรวจสอบ deployment
- อัปเดต checkbox ใน Roadmap เมื่อทดสอบฟีเจอร์ครบทั้งส่วนที่เกี่ยวข้อง

---

## 📄 License

README เดิมระบุ License เป็น MIT โปรดตรวจสอบว่ามีไฟล์ LICENSE ใน repository และเนื้อหาตรงกันก่อนเผยแพร่ต่อ
