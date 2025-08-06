# Medellin

## Overview
This app is designed to make trip planning for Medellín, Colombia easier. 
It collects the best local activities into one spot, so travelers don’t have 
to waste time hunting down info all over the internet.

### Problem Statement
Travelers struggle with scattered and confusing information when trying to 
figure out what to do in Medellín. This leads to frustration and wasted time. 
The app fixes this by centralizing reliable and curated activity options so 
users can plan their trips faster and stress-free.

### Goals
- Allow users to browse activities and categories
- Enable user registration and login with password hashing
- Let users favorite activities and view their favorites
- Protect routes, only logged in users can save favorites

### Core Features
- User authentication with JWT tokens
- CRUD operations on activities and favorites
- Secure password storage using bcrypt
- Middleware to require user authentication on protected routes
- Organized folder structure for clear separation of concerns

### Tech Stack
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Authentication: JWT, bcrypt
- Tools: Prettier
- API testing: Postman

### Architecture Overview
- /api: Contains all Express route handlers grouped by feature like activities, users, favorites and categories
- /db/queries: SQL query functions separated by feature
- /middleware: Middleware functions like requireUser and requireBody
- /utils: Utility functions like token creation
- app.js: Main Express app setup and middleware registration