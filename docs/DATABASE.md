# CampusSphere Database Design
Version: 1.0

---

# Database

PostgreSQL

---

# Database Overview

CampusSphere follows a relational database architecture.

Every entity is connected using foreign keys.

The database is designed to be scalable, secure, and optimized for future growth.

---

# Entity Relationship Diagram

User
│
├── Profile
├── Communities
├── Posts
├── Comments
├── Thought Chains
├── Notifications
├── Reputation
├── Challenges
└── Achievements

Community
│
├── Members
├── Posts
├── Events
├── Resources
└── Challenges

---

# USERS

Table Name

users

Columns

id (UUID, Primary Key)

username

email

password

first_name

last_name

profile_picture

bio

university_id

department_id

semester

graduation_year

xp

reputation

is_verified

is_active

created_at

updated_at

Indexes

email

username

---

# UNIVERSITIES

id

name

country

city

logo

domain

created_at

---

# DEPARTMENTS

id

university_id

name

created_at

---

# PROFILES

id

user_id

headline

about

skills

interests

github

linkedin

website

resume

portfolio

cover_image

---

# COMMUNITIES

id

name

slug

description

cover_image

icon

community_type

owner_id

is_private

created_at

updated_at

Indexes

slug

---

# COMMUNITY_MEMBERS

id

community_id

user_id

role

joined_at

---

# POSTS

id

community_id

author_id

identity_type

title

content

post_type

image

likes_count

comments_count

views

is_pinned

created_at

updated_at

Indexes

community_id

author_id

created_at

---

# COMMENTS

id

post_id

author_id

parent_comment

content

likes

created_at

---

# THOUGHT_CHAINS

id

post_id

parent_node

author_id

content

node_type

depth

created_at

---

# POST_REACTIONS

id

user_id

post_id

reaction

created_at

---

# COMMENT_REACTIONS

id

user_id

comment_id

reaction

created_at

---

# NOTIFICATIONS

id

receiver_id

sender_id

type

title

message

reference_id

is_read

created_at

---

# XP_HISTORY

id

user_id

action

xp

created_at

---

# REPUTATION

id

user_id

score

level

updated_at

---

# ACHIEVEMENTS

id

name

description

icon

xp_reward

created_at

---

# USER_ACHIEVEMENTS

id

achievement_id

user_id

earned_at

---

# EVENTS

id

community_id

title

description

location

start_time

end_time

banner

created_by

created_at

---

# CHALLENGES

id

community_id

title

description

challenge_type

difficulty

start_date

end_date

xp_reward

created_by

created_at

---

# CHALLENGE_SUBMISSIONS

id

challenge_id

user_id

submission

score

rank

submitted_at

---

# REPORTS

id

reporter_id

target_type

target_id

reason

status

created_at

---

# SETTINGS

id

user_id

theme

language

notifications_enabled

email_notifications

privacy_level

updated_at

---

# Identity Types

REAL

ALIAS

ANONYMOUS

---

# Community Types

University

Department

Club

Research

Sports

Gaming

Coding

Photography

Startup

General

---

# Post Types

Discussion

Question

Poll

Announcement

Image

Resource

Thought Chain

---

# Notification Types

Like

Reply

Mention

Community

Challenge

Achievement

System

---

# Relationships

User → One Profile

User → Many Posts

User → Many Communities

Community → Many Posts

Community → Many Members

Post → Many Comments

Post → One Thought Chain

User → Many Notifications

User → Many Achievements

Challenge → Many Submissions

Community → Many Events

---

# Future Tables (Version 2)

Resume

Portfolio

Projects

Research Papers

Study Groups

Mentorship

Skill Exchange

Internships

Company

Professor

Alumni

Marketplace

AI Chat

Voice Rooms

Direct Messages

Bookmarks
Saved Posts