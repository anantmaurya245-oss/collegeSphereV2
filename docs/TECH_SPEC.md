# CampusSphere Technical Specification
Version: 1.0
Status: Planning
Project Type: Full Stack Web Application

---

# Project Vision

CampusSphere is a verified student-only platform that combines social networking, collaboration, learning, research, and career growth into one digital campus.

The primary goal is to create the digital operating system for university life.

---

# Tech Stack

## Frontend

- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- React Router
- TanStack Query
- Axios
- Framer Motion
- React Hook Form
- Zod
- Lucide React
- Shadcn/UI

---

## Backend

- Python 3.13
- Django 5
- Django REST Framework
- Django Simple JWT
- PostgreSQL
- Cloudinary
- Django CORS Headers

---

## Deployment

Frontend
- Vercel

Backend
- Railway

Database
- Neon PostgreSQL

Media Storage
- Cloudinary

---

# User Roles

## Student

Can:

- Create posts
- Join communities
- Participate in Thought Chains
- Earn XP
- Build profile
- Join challenges

---

## Moderator

Can:

- Remove posts
- Ban users
- Moderate communities

---

## Admin

Can:

- Manage users
- Manage communities
- Manage reports
- Manage universities

---

# MVP Modules

## Authentication

Features

- Register
- Login
- Logout
- JWT Authentication
- Forgot Password
- Reset Password
- Email Verification

---

## Student Verification

Features

- University Selection
- Student Email Verification
- Student ID Upload (Future)
- Verified Badge

---

## Profile

Features

- Profile Photo
- Bio
- University
- Department
- Semester
- Skills
- Interests
- XP
- Reputation
- Achievements

---

## Home Feed

Features

- Personalized Feed
- Trending Discussions
- Latest Posts
- Community Posts
- Suggested Communities

---

## Communities

Features

- Join Community
- Leave Community
- Community Feed
- Community Members
- Community Events
- Community Resources

---

## Posts

Features

- Text Post
- Image Post
- Poll
- Identity Selection

Identity Types

- Real Name
- Alias
- Anonymous

---

## Thought Chains

Features

- Create Discussion
- Branch Replies
- Upvote
- Downvote
- Best Answer
- Evidence
- Counter Argument

---

## Notifications

Features

- Likes
- Replies
- Mentions
- Community Updates
- Challenge Updates

---

## Reputation System

Users earn XP for

- Creating quality posts
- Helping others
- Winning challenges
- Uploading resources
- Completing profile

---

# Non-MVP Features

Version 2

- Resume Builder
- Portfolio Builder
- Skill Exchange
- Study Groups
- Notes
- Research Collaboration

Version 3

- Alumni Network
- Marketplace
- Professor Portal
- AI Study Assistant
- Campus Elections

---

# Frontend Folder Structure

frontend/

src/

components/

pages/

layouts/

hooks/

services/

context/

routes/

types/

utils/

assets/

styles/

---

# Backend Folder Structure

backend/

authentication/

users/

communities/

posts/

thought_chains/

notifications/

reputation/

core/

config/

media/

---

# Coding Standards

Frontend

- TypeScript only
- Functional Components
- Custom Hooks
- Reusable Components
- No Inline Styles

Backend

- REST API
- Class Based Views
- Serializer Validation
- Service Layer
- Modular Apps

---

# Authentication Flow

Register

↓

Verify Email

↓

Complete Profile

↓

Select University

↓

Join Communities

↓

Enter Home Feed

---

# Design Principles

- Mobile First
- Responsive
- Accessible
- Modern
- Minimal
- Fast
- Smooth Animations
- Dark Mode Support

---

# Security

- JWT Authentication
- Password Hashing
- Email Verification
- Protected Routes
- Rate Limiting
- Input Validation
- CSRF Protection

---

# Success Metrics

MVP is successful if users can

- Register
- Verify Student Status
- Complete Profile
- Join Communities
- Create Posts
- Participate in Thought Chains
- Receive Notifications
- Earn XP
- Build Reputation

---

# Development Workflow

For every feature follow this order:

1. Product Specification
2. UI Design
3. Database Design
4. API Design
5. Frontend Development
6. Backend Development
7. Testing
8. Code Review
9. Merge