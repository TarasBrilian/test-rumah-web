# API Documentation

Generated from Postman Collection: `Rumah web test`

## Base URL
`http://localhost:3000`

---

## Authentication

### Register User
- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Body:**
```json
{
    "name": "string",
    "email": "string",
    "password": "string"
}
```

### Login User
- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

---

## Users

### Get All Users
- **Method:** `GET`
- **Endpoint:** `/users`
- **Headers:**
    - `Authorization: Bearer <JWT_TOKEN>`

### Get User Detail
- **Method:** `GET`
- **Endpoint:** `/users/:id`

### Update User
- **Method:** `PUT`
- **Endpoint:** `/users/:id`
- **Body:**
```json
{
    "password": "string"
}
```

### Delete User
- **Method:** `DELETE`
- **Endpoint:** `/users/:id`

---

## Development Notes
- All endpoints expect JSON payloads.
- Authentication uses JWT Bearer tokens.
- Ensure the server is running locally on port 3000.
