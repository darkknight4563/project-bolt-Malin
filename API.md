# Malin Mental Health Platform API Documentation

## Base URL
```
https://api.malin.health/v1
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format
All endpoints return responses in the following format:
```json
{
  "success": boolean,
  "data": any | null,
  "error": string | null,
  "message": string | null,
  "pagination": {
    "total": number,
    "page": number,
    "limit": number,
    "totalPages": number
  } | null
}
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string",
  "preferences": object
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### Tools

#### Get All Tools
```http
GET /tools?page=1&limit=10&type=MEDITATION
```
Query Parameters:
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `type`: ToolType (optional)

#### Get Tool by ID
```http
GET /tools/:id
```

#### Create Tool (Admin)
```http
POST /tools
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "string",
  "description": "string",
  "type": "MEDITATION",
  "icon": "string (URL)"
}
```

#### Update Tool (Admin)
```http
PUT /tools/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "string",
  "description": "string",
  "type": "MEDITATION",
  "icon": "string (URL)"
}
```

#### Delete Tool (Admin)
```http
DELETE /tools/:id
Authorization: Bearer <token>
```

### Exercises

#### Get All Exercises
```http
GET /exercises?page=1&limit=10&toolId=<tool-id>&difficulty=BEGINNER
```
Query Parameters:
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `toolId`: string (optional)
- `difficulty`: Difficulty (optional)

#### Get Exercise by ID
```http
GET /exercises/:id
```

#### Create Exercise (Admin)
```http
POST /exercises
Content-Type: application/json
Authorization: Bearer <token>

{
  "toolId": "string",
  "name": "string",
  "content": "string",
  "difficultyLevel": "BEGINNER"
}
```

### Resources

#### Get All Resources
```http
GET /resources?page=1&limit=10&type=ARTICLE
```
Query Parameters:
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `type`: ResourceType (optional)

#### Get Resource by ID
```http
GET /resources/:id
```

### User Progress

#### Get User Exercise Progress
```http
GET /progress/exercises
Authorization: Bearer <token>
```

#### Update Exercise Progress
```http
POST /progress/exercises/:exerciseId
Content-Type: application/json
Authorization: Bearer <token>

{
  "progress": number,
  "completed": boolean
}
```

### Analytics

#### Get User Engagement
```http
GET /analytics/engagement
Authorization: Bearer <token>
```

#### Track User Session
```http
POST /analytics/track
Content-Type: application/json
Authorization: Bearer <token>

{
  "type": "SESSION",
  "duration": number,
  "metadata": object
}
```

### Privacy

#### Get User Consents
```http
GET /privacy/consents
Authorization: Bearer <token>
```

#### Update Privacy Consent
```http
PUT /privacy/consents
Content-Type: application/json
Authorization: Bearer <token>

{
  "type": "ANALYTICS",
  "granted": boolean
}
```

#### Export User Data
```http
GET /privacy/export
Authorization: Bearer <token>
```

#### Delete User Data
```http
DELETE /privacy/data
Authorization: Bearer <token>
```

## Error Codes

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Internal Server Error

## Data Types

### ToolType
```typescript
enum ToolType {
  MEDITATION
  BREATHING
  JOURNALING
  EXERCISE
  MOOD_TRACKING
  OTHER
}
```

### Difficulty
```typescript
enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}
```

### ResourceType
```typescript
enum ResourceType {
  ARTICLE
  VIDEO
  AUDIO
  DOCUMENT
  EXTERNAL_LINK
}
```

### EngagementType
```typescript
enum EngagementType {
  SESSION
  EXERCISE
  RESOURCE
  TOOL
}
```

### ConsentType
```typescript
enum ConsentType {
  ANALYTICS
  MARKETING
  THIRD_PARTY
  HEALTH_DATA
}
```
