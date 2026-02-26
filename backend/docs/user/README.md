# User API Documentation

Base URL: `http://localhost:3000/user`

---

## POST `/user/login`

**Description:** Authenticates a user with email and password. Sets a `loggedin` cookie containing a JWT token on success.

**Authentication:** None required.

### Request Body

```json
{
  "email": "john@example.com",
  "password": "mypassword123"
}
```

### Responses

**200 OK** — Login successful
```json
{
  "message": "Logged in successfully"
}
```
> Sets cookie: `loggedin=<JWT_TOKEN>` (sameSite: None, secure: true)

**401 Unauthorized** — Wrong password
```json
{
  "message": "wrong credentials"
}
```

**404 Not Found** — User not found
```json
{
  "message": "user not found"
}
```

**500 Internal Server Error** — Server error
```json
{
  "message": "<error details>"
}
```

---

## POST `/user/signup`

**Description:** Registers a new user account. Password is automatically hashed via bcrypt before saving. `usertype` is set to "Customer" automatically.

**Authentication:** None required.

### Request Body

```json
{
  "fname": "John",
  "lname": "Doe",
  "username": "johndoe",
  "number": 9876543210,
  "email": "john@example.com",
  "password": "mypassword123"
}
```

### Responses

**200 OK** — Signup successful
```json
{
  "message": "user signed up"
}
```

**500 Internal Server Error** — Validation error (duplicate email/username/number, invalid email, etc.)
```json
{
  "message": "<error details>"
}
```

---

## POST `/user/logout`

**Description:** Logs out the current user by clearing the `loggedin` cookie.

**Authentication:** 🔒 Required — `loggedin` cookie with valid JWT.

### Request Body

```json
{}
```

### Responses

**200 OK** — Logout successful
```json
{
  "message": "user logged out successfully"
}
```

**404 Not Found** — Error during logout
```json
{
  "message": "<error details>"
}
```

---

## GET `/user/currentUser`

**Description:** Returns the full profile of the currently logged-in user.

**Authentication:** 🔒 Required — `loggedin` cookie with valid JWT.

### Request Body

None.

### Responses

**200 OK** — Returns user object
```json
{
  "_id": "664f1a2b3c4d5e6f7a8b9c0d",
  "fname": "John",
  "lname": "Doe",
  "username": "johndoe",
  "number": 9876543210,
  "email": "john@example.com",
  "usertype": "Customer",
  "gender": null,
  "dob": null,
  "address": null,
  "addresses": [
    {
      "_id": "664f1a2b3c4d5e6f7a8b9c0e",
      "label": "Home",
      "street": "123 MG Road",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "phone": "9876543210"
    }
  ],
  "favitem": null,
  "freshpoints": 0,
  "profilePic": "default.png"
}
```

**500 Internal Server Error**
```json
{
  "message": "<error details>"
}
```

---

## POST `/user/profilePic`

**Description:** Uploads a new profile picture for the logged-in user. Uses `multer` for file handling. Expects `multipart/form-data` with a field named `image`.

**Authentication:** 🔒 Required — `loggedin` cookie with valid JWT.

### Request Body

`multipart/form-data`

| Field   | Type | Description          |
|---------|------|----------------------|
| `image` | File | Image file to upload |

### Responses

**200 OK** — Upload successful
```json
{
  "message": "File Uploaded Successfully"
}
```

**400 Bad Request** — No file uploaded or upload error
```json
{
  "message": "No file uploaded"
}
```

**404 Not Found** — Server error
```json
{
  "message": "<error details>"
}
```

---

## GET `/user/address`

**Description:** Returns all saved delivery addresses for the logged-in user.

**Authentication:** 🔒 Required — `loggedin` cookie with valid JWT.

### Request Body

None.

### Responses

**200 OK** — Returns addresses array
```json
{
  "addresses": [
    {
      "_id": "664f1a2b3c4d5e6f7a8b9c0e",
      "label": "Home",
      "street": "123 MG Road",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "phone": "9876543210"
    },
    {
      "_id": "664f1a2b3c4d5e6f7a8b9c0f",
      "label": "Work",
      "street": "456 FC Road",
      "city": "Pune",
      "state": "Maharashtra",
      "pincode": "411001",
      "phone": "9123456789"
    }
  ]
}
```

**500 Internal Server Error**
```json
{
  "message": "<error details>"
}
```

---

## POST `/user/address`

**Description:** Adds a new delivery address to the user's profile.

**Authentication:** 🔒 Required — `loggedin` cookie with valid JWT.

### Request Body

```json
{
  "label": "Home",
  "street": "123 MG Road, Near Station",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "phone": "9876543210"
}
```

### Responses

**200 OK** — Address added, returns updated addresses array
```json
{
  "addresses": [
    {
      "_id": "664f1a2b3c4d5e6f7a8b9c0e",
      "label": "Home",
      "street": "123 MG Road, Near Station",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "phone": "9876543210"
    }
  ]
}
```

**400 Bad Request** — Missing required fields
```json
{
  "message": "All address fields are required"
}
```

**500 Internal Server Error**
```json
{
  "message": "<error details>"
}
```

---

## POST `/user/address/delete`

**Description:** Deletes a saved address by its ID.

**Authentication:** 🔒 Required — `loggedin` cookie with valid JWT.

### Request Body

```json
{
  "addressId": "664f1a2b3c4d5e6f7a8b9c0e"
}
```

### Responses

**200 OK** — Address deleted, returns updated addresses array
```json
{
  "addresses": []
}
```

**500 Internal Server Error**
```json
{
  "message": "<error details>"
}
```
