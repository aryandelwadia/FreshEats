# Item API Documentation

Base URL: `http://localhost:3000/item`

---

## POST `/item/additem`

**Description:** Adds a new item to the shop. Only authenticated sellers can add items.

**Authentication:** 🔒 Required — `sellerLoggedin` cookie with valid JWT (Seller only).

### Request Body

```json
{
  "itemname": "Fresh Mangoes",
  "itemprice": 5.99,
  "prodplace": "Ratnagiri, Maharashtra",
  "img": "https://images.unsplash.com/photo-1512152272829-e3139592d56f"
}
```

### Responses

**200 OK** — Item added successfully
```json
{
  "message": "Item added to Shop"
}
```

**500 Internal Server Error** — Validation error (missing required fields, price < 1, etc.)
```json
{
  "message": "<error details>"
}
```

### Field Validation

| Field       | Type   | Required | Rules                      |
|-------------|--------|----------|----------------------------|
| `itemname`  | String | Yes      | Cannot be empty            |
| `itemprice` | Number | Yes      | Must be ≥ 1               |
| `prodplace` | String | Yes      | Cannot be empty            |
| `img`       | String | Yes      | URL or filename of image   |

---

## GET `/item/getitem`

**Description:** Returns all items available in the shop. No authentication required — this is a public endpoint.

**Authentication:** None required.

### Request Body

None.

### Responses

**200 OK** — Returns array of all items
```json
[
  {
    "_id": "664f1a2b3c4d5e6f7a8b9c20",
    "itemname": "Fresh Mangoes",
    "itemprice": 5.99,
    "prodplace": "Ratnagiri, Maharashtra",
    "img": "https://images.unsplash.com/photo-1512152272829-e3139592d56f"
  },
  {
    "_id": "664f1a2b3c4d5e6f7a8b9c21",
    "itemname": "Organic Tomatoes",
    "itemprice": 2.49,
    "prodplace": "Nasik, Maharashtra",
    "img": "https://images.unsplash.com/photo-example"
  }
]
```

**200 OK** — No items available (empty array)
```json
[]
```

**500 Internal Server Error**
```json
{
  "message": "<error details>"
}
```
