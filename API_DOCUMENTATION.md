# Queue Management API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

Barcha protected endpoint'lar uchun JWT token kerak. Token'ni `Authorization` header'da yuborish kerak:

```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### 1. Register (Ro'yxatdan o'tish)

**POST** `/auth/register`

Telefon raqam va ism bilan ro'yxatdan o'tish.

**Request Body:**

```json
{
  "name": "John Doe",
  "phone": "+998901234567"
}
```

**Response (201):**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "phone": "+998901234567",
    "role": "client"
  }
}
```

**Errors:**

- `400` - Validation error yoki telefon raqam allaqachon mavjud
- `500` - Server error

---

### 2. Telegram Authentication

**POST** `/auth/telegram`

Telegram orqali avtorizatsiya.

**Request Body:**

```json
{
  "id": 123456789,
  "first_name": "John",
  "username": "johndoe",
  "hash": "telegram_auth_hash",
  "auth_date": 1234567890
}
```

**Response (200):**

```json
{
  "message": "Telegram authentication successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John",
    "phone": "telegram_123456789",
    "telegramId": "123456789",
    "telegramUsername": "johndoe",
    "role": "client"
  }
}
```

---

### 3. Get Current User

**GET** `/auth/me`

Joriy foydalanuvchi ma'lumotlarini olish.

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "phone": "+998901234567",
    "telegramId": "123456789",
    "telegramUsername": "johndoe",
    "role": "client",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Client Endpoints

### 4. Get Products List

**GET** `/client/products`

Barcha faol mahsulotlar/xizmatlar ro'yxati.

**Response (200):**

```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Soch olish",
      "description": "Erkaklar uchun soch olish xizmati",
      "price": 50000,
      "duration": 30,
      "category": "Haircut",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 5. Create Order

**POST** `/client/orders`

Yangi buyurtma yaratish.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "quantity": 1
    },
    {
      "productId": "507f1f77bcf86cd799439012",
      "quantity": 2
    }
  ]
}
```

**Response (201):**

```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "items": [
      {
        "productId": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Soch olish",
          "price": 50000,
          "duration": 30
        },
        "quantity": 1,
        "price": 50000
      }
    ],
    "status": "pending",
    "totalAmount": 50000,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**

- `400` - Validation error yoki mahsulot topilmadi
- `401` - Authentication required

---

### 6. Get My Orders

**GET** `/client/orders`

Mijozning barcha buyurtmalari.

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "userId": "507f1f77bcf86cd799439011",
      "items": [...],
      "status": "completed",
      "totalAmount": 50000,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "completedAt": "2024-01-01T01:00:00.000Z"
    }
  ]
}
```

---

### 7. Get Order Details

**GET** `/client/orders/:id`

Buyurtma tafsilotlari.

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "order": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "items": [
      {
        "productId": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Soch olish",
          "description": "Erkaklar uchun soch olish xizmati",
          "price": 50000,
          "duration": 30,
          "category": "Haircut"
        },
        "quantity": 1,
        "price": 50000
      }
    ],
    "status": "pending",
    "totalAmount": 50000,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**

- `404` - Buyurtma topilmadi

---

### 8. Join Queue

**POST** `/client/queue`

Navbatga yozilish.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "serviceId": "507f1f77bcf86cd799439011",
  "orderId": "507f1f77bcf86cd799439013"
}
```

**Note:** `orderId` ixtiyoriy.

**Response (201):**

```json
{
  "message": "Joined queue successfully",
  "queue": {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "orderId": "507f1f77bcf86cd799439013",
    "serviceId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Soch olish",
      "duration": 30
    },
    "queueNumber": 5,
    "status": "waiting",
    "estimatedTime": "2024-01-01T02:30:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**

- `400` - Xizmat topilmadi yoki allaqachon navbatda bor
- `401` - Authentication required

---

### 9. Get Queue Status

**GET** `/client/queue/status`

Mijozning navbat holati.

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "queue": {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "serviceId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Soch olish",
      "duration": 30
    },
    "queueNumber": 5,
    "status": "waiting",
    "estimatedTime": "2024-01-01T02:30:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "position": 3
}
```

Agar navbat bo'lmasa:

```json
{
  "message": "No active queue entry",
  "queue": null,
  "position": null
}
```

---

## Admin Endpoints

**Barcha admin endpoint'lar uchun admin role kerak.**

### 10. Get All Orders

**GET** `/admin/orders`

Barcha buyurtmalar ro'yxati.

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Query Parameters:**

- `status` (optional) - Filter by status: `pending`, `processing`, `completed`, `cancelled`
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 20)

**Example:** `/admin/orders?status=pending&page=1&limit=10`

**Response (200):**

```json
{
  "orders": [...],
  "totalPages": 5,
  "currentPage": 1,
  "total": 100
}
```

---

### 11. Update Order Status

**PUT** `/admin/orders/:id`

Buyurtma holatini yangilash.

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "status": "completed"
}
```

**Status values:** `pending`, `processing`, `completed`, `cancelled`

**Response (200):**

```json
{
  "message": "Order status updated",
  "order": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "completed",
    "completedAt": "2024-01-01T01:00:00.000Z",
    ...
  }
}
```

---

### 12. Get All Products

**GET** `/admin/products`

Barcha mahsulotlar ro'yxati (faol va nofaol).

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Response (200):**

```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Soch olish",
      "description": "Erkaklar uchun soch olish xizmati",
      "price": 50000,
      "duration": 30,
      "category": "Haircut",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 13. Create Product

**POST** `/admin/products`

Yangi mahsulot/xizmat yaratish.

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "name": "Soch olish",
  "description": "Erkaklar uchun soch olish xizmati",
  "price": 50000,
  "duration": 30,
  "category": "Haircut",
  "isActive": true
}
```

**Response (201):**

```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Soch olish",
    ...
  }
}
```

---

### 14. Update Product

**PUT** `/admin/products/:id`

Mahsulotni yangilash.

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "name": "Soch olish (Premium)",
  "price": 60000,
  "isActive": true
}
```

**Note:** Barcha field'lar ixtiyoriy.

**Response (200):**

```json
{
  "message": "Product updated successfully",
  "product": {...}
}
```

---

### 15. Delete Product

**DELETE** `/admin/products/:id`

Mahsulotni o'chirish.

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Response (200):**

```json
{
  "message": "Product deleted successfully"
}
```

---

### 16. Get Queue List

**GET** `/admin/queue`

Navbatlar ro'yxati (real-time).

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Query Parameters:**

- `status` (optional) - Filter by status: `waiting`, `called`, `completed`, `skipped`
- `serviceId` (optional) - Filter by service ID

**Response (200):**

```json
{
  "queues": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "phone": "+998901234567",
        "telegramId": "123456789"
      },
      "serviceId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Soch olish",
        "duration": 30
      },
      "queueNumber": 5,
      "status": "waiting",
      "position": 3,
      "estimatedTime": "2024-01-01T02:30:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 17. Add Client to Queue (Manual)

**POST** `/admin/queue`

Qo'lda mijozni navbatga qo'shish.

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "userId": "507f1f77bcf86cd799439011",
  "serviceId": "507f1f77bcf86cd799439011",
  "orderId": "507f1f77bcf86cd799439013"
}
```

**Note:** `orderId` ixtiyoriy.

**Response (201):**

```json
{
  "message": "Client added to queue successfully",
  "queue": {...}
}
```

---

### 18. Call Client

**POST** `/admin/queue/:id/call`

Mijozni chaqirish (navbat kelganda).

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Response (200):**

```json
{
  "message": "Client called successfully",
  "queue": {
    "_id": "507f1f77bcf86cd799439014",
    "status": "called",
    "calledAt": "2024-01-01T02:00:00.000Z",
    ...
  }
}
```

**Note:** Bu endpoint mijozga Telegram orqali avtomatik xabar yuboradi.

---

### 19. Update Queue Status

**PUT** `/admin/queue/:id/status`

Navbat holatini yangilash.

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "status": "completed"
}
```

**Status values:** `waiting`, `called`, `completed`, `skipped`

**Response (200):**

```json
{
  "message": "Queue status updated",
  "queue": {...}
}
```

---

## Statistics Endpoints

### 20. Get Daily Statistics

**GET** `/admin/statistics/daily`

Kunlik statistika.

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Query Parameters:**

- `date` (optional) - Date in format: `YYYY-MM-DD` (default: today)

**Example:** `/admin/statistics/daily?date=2024-01-01`

**Response (200):**

```json
{
  "statistics": {
    "_id": "507f1f77bcf86cd799439015",
    "date": "2024-01-01T00:00:00.000Z",
    "totalOrders": 50,
    "totalRevenue": 2500000,
    "totalQueueEntries": 45,
    "completedOrders": 48,
    "averageWaitTime": 25.5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 21. Get Monthly Statistics

**GET** `/admin/statistics/monthly`

Oylik statistika.

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Query Parameters:**

- `year` (optional) - Year (default: current year)
- `month` (optional) - Month 1-12 (default: current month)

**Example:** `/admin/statistics/monthly?year=2024&month=1`

**Response (200):**

```json
{
  "statistics": {
    "period": {
      "year": 2024,
      "month": 1,
      "startDate": "2024-01-01T00:00:00.000Z",
      "endDate": "2024-01-31T23:59:59.999Z"
    },
    "totalOrders": 1500,
    "totalRevenue": 75000000,
    "totalQueueEntries": 1350,
    "completedOrders": 1440,
    "averageWaitTime": 28.3,
    "dailyBreakdown": [
      {
        "date": "2024-01-01T00:00:00.000Z",
        "totalOrders": 50,
        "totalRevenue": 2500000,
        ...
      }
    ]
  }
}
```

---

## WebSocket Events (Socket.io)

### Connection

Socket.io orqali ulanish uchun token'ni yuborish kerak:

```javascript
const socket = io("http://localhost:3000", {
  auth: {
    token: "your-jwt-token",
  },
});
```

### Client Events

#### `queue:getStatus`

Mijozning navbat holatini so'rash.

**Emit:**

```javascript
socket.emit("queue:getStatus");
```

**Listen:**

```javascript
socket.on("queue:status", (data) => {
  console.log(data.queue);
});
```

#### `order:getStatus`

Buyurtma holatini so'rash.

**Emit:**

```javascript
socket.emit("order:getStatus", "order-id");
```

**Listen:**

```javascript
socket.on("order:status", (data) => {
  console.log(data.order);
});
```

### Admin Events

#### `admin:getQueue`

Navbatlar ro'yxatini so'rash (faqat admin).

**Emit:**

```javascript
socket.emit("admin:getQueue");
```

**Listen:**

```javascript
socket.on("admin:queue", (data) => {
  console.log(data.queues);
});
```

### Server Events (Real-time Updates)

#### `queue:update`

Navbat yangilanishi.

**Listen:**

```javascript
socket.on("queue:update", (data) => {
  console.log("Queue updated:", data.queue);
});
```

#### `queue:called`

Mijoz chaqirilganda.

**Listen:**

```javascript
socket.on("queue:called", (data) => {
  console.log("You are called!", data.queue);
});
```

#### `queue:joined`

Mijoz navbatga qo'shilganda.

**Listen:**

```javascript
socket.on("queue:joined", (data) => {
  console.log("Joined queue:", data.queue);
});
```

#### `order:status`

Buyurtma holati o'zgarganda.

**Listen:**

```javascript
socket.on("order:status", (data) => {
  console.log("Order status:", data.order);
});
```

#### `order:update`

Buyurtma yangilanishi (admin uchun).

**Listen:**

```javascript
socket.on("order:update", (data) => {
  console.log("Order updated:", data.order);
});
```

---

## Error Responses

Barcha xatoliklar quyidagi formatda qaytariladi:

```json
{
  "error": "Error message",
  "message": "Detailed error message (optional)"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (admin access required)
- `404` - Not Found
- `500` - Internal Server Error

### Validation Errors

```json
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

---

## Data Models

### User

```json
{
  "_id": "ObjectId",
  "name": "String",
  "phone": "String (unique)",
  "telegramId": "String (optional, unique)",
  "telegramUsername": "String (optional)",
  "role": "String (client|admin)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Product

```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String (optional)",
  "price": "Number",
  "duration": "Number (minutes)",
  "category": "String (optional)",
  "isActive": "Boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Order

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "items": [
    {
      "productId": "ObjectId (ref: Product)",
      "quantity": "Number",
      "price": "Number"
    }
  ],
  "status": "String (pending|processing|completed|cancelled)",
  "totalAmount": "Number",
  "completedAt": "Date (optional)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Queue

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "orderId": "ObjectId (ref: Order, optional)",
  "serviceId": "ObjectId (ref: Product)",
  "queueNumber": "Number",
  "status": "String (waiting|called|completed|skipped)",
  "estimatedTime": "Date (optional)",
  "calledAt": "Date (optional)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## Notification System

### Telegram Notifications

Quyidagi voqealarda mijozga avtomatik Telegram xabari yuboriladi:

1. **Navbatga qo'shilganda** - Navbat raqami va taxminiy vaqt
2. **Navbat kelganda** - Mijoz chaqirilganda
3. **Buyurtma holati o'zgarganda** - Processing, Completed, Cancelled

**Eslatma:** Mijozning `telegramId` bo'lishi kerak.

---

## Testing Examples

### cURL Examples

**Register:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","phone":"+998901234567"}'
```

**Create Order:**

```bash
curl -X POST http://localhost:3000/api/client/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"items":[{"productId":"507f1f77bcf86cd799439011","quantity":1}]}'
```

**Join Queue:**

```bash
curl -X POST http://localhost:3000/api/client/queue \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"serviceId":"507f1f77bcf86cd799439011"}'
```

**Call Client (Admin):**

```bash
curl -X POST http://localhost:3000/api/admin/queue/507f1f77bcf86cd799439014/call \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## Notes

1. **JWT Token** - 7 kun muddatga amal qiladi
2. **Queue Numbers** - Har bir xizmat uchun alohida, kunlik yangilanadi
3. **Real-time Updates** - Socket.io orqali real-time yangilanishlar
4. **Telegram Bot** - `.env` faylida `TELEGRAM_BOT_TOKEN` sozlangan bo'lishi kerak
5. **Admin Role** - Foydalanuvchining `role` field'i `admin` bo'lishi kerak

---

## Support

Muammo bo'lsa, server loglarini tekshiring yoki GitHub issue oching.
