# CampusSphere API Specification
Version: 1.0

Base URL

/api/v1

Authentication

JWT Authentication

Authorization Header

Authorization: Bearer <access_token>

---

# AUTHENTICATION

POST /auth/register
Create a new account.

POST /auth/login
Login user.

POST /auth/logout
Logout user.

POST /auth/refresh
Refresh JWT token.

POST /auth/forgot-password
Send reset email.

POST /auth/reset-password
Reset password.

POST /auth/verify-email
Verify email.

GET /auth/me
Return current logged-in user.

---

# USER PROFILE

GET /users/profile

PATCH /users/profile

GET /users/{id}

GET /users/search

GET /users/{id}/posts

GET /users/{id}/communities

GET /users/{id}/achievements

GET /users/{id}/reputation

GET /users/{id}/followers

GET /users/{id}/following

---

# UNIVERSITIES

GET /universities

GET /universities/{id}

GET /universities/search

GET /universities/{id}/departments

---

# DEPARTMENTS

GET /departments

GET /departments/{id}

---

# COMMUNITIES

GET /communities

POST /communities

GET /communities/{id}

PATCH /communities/{id}

DELETE /communities/{id}

POST /communities/{id}/join

POST /communities/{id}/leave

GET /communities/{id}/members

GET /communities/{id}/posts

GET /communities/{id}/events

GET /communities/{id}/resources

GET /communities/{id}/leaderboard

---

# POSTS

GET /posts

POST /posts

GET /posts/{id}

PATCH /posts/{id}

DELETE /posts/{id}

GET /posts/trending

GET /posts/latest

GET /posts/community/{community_id}

POST /posts/{id}/pin

POST /posts/{id}/unpin

---

# POST REACTIONS

POST /posts/{id}/like

DELETE /posts/{id}/like

POST /posts/{id}/bookmark

DELETE /posts/{id}/bookmark

---

# COMMENTS

GET /posts/{id}/comments

POST /posts/{id}/comments

PATCH /comments/{id}

DELETE /comments/{id}

POST /comments/{id}/like

DELETE /comments/{id}/like

---

# THOUGHT CHAINS

POST /thought-chains

GET /thought-chains/{id}

POST /thought-chains/{id}/reply

PATCH /thought-chains/{id}

DELETE /thought-chains/{id}

POST /thought-chains/{id}/vote

GET /thought-chains/{id}/tree

---

# NOTIFICATIONS

GET /notifications

PATCH /notifications/{id}/read

PATCH /notifications/read-all

DELETE /notifications/{id}

---

# REPUTATION

GET /reputation

GET /reputation/leaderboard

GET /reputation/history

---

# XP

GET /xp

GET /xp/history

---

# CHALLENGES

GET /challenges

POST /challenges

GET /challenges/{id}

PATCH /challenges/{id}

DELETE /challenges/{id}

POST /challenges/{id}/join

POST /challenges/{id}/submit

GET /challenges/{id}/leaderboard

GET /challenges/today

---

# EVENTS

GET /events

POST /events

GET /events/{id}

PATCH /events/{id}

DELETE /events/{id}

POST /events/{id}/join

GET /events/upcoming

---

# ACHIEVEMENTS

GET /achievements

GET /achievements/{id}

GET /users/me/achievements

---

# SEARCH

GET /search

GET /search/users

GET /search/posts

GET /search/communities

GET /search/challenges

---

# REPORTS

POST /reports

GET /reports

PATCH /reports/{id}

DELETE /reports/{id}

---

# SETTINGS

GET /settings

PATCH /settings

---

# HEALTH

GET /health

GET /status