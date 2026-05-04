# Roommate Finder System (Frontend Architecture)

A scalable frontend architecture for a Roommate / Flat Finder platform built with React, TypeScript, and modern frontend engineering practices.


This repository represents the **foundation layer (architecture-first approach)** of the project, not the full implementation.

---



# Tech Stack
React (Vite)
TypeScript
Redux Toolkit
React Router
React Query
Supabase (planned backend integration)
TailwindCSS

This repository represents the **foundation layer (architecture-first approach)** of the project, not the full implementation.

---

# Project Purpose

The goal of this project is to design a **real-world scalable frontend system** that simulates how a production application is structured in modern software companies.

It focuses on:
- Clean Architecture
- Feature-Based Folder Structure
- Separation of Concerns
- Scalability and Maintainability

---

# Problem Being Solved

Finding compatible roommates is often inefficient due to:
- Lack of structured preference matching
- No standardized filtering system
- Poor user experience in existing platforms

This system is designed to eventually solve this through:
- User profiling
- Preference-based matching logic
- Smart filtering system

---

# Architecture Overview

This project uses a **Feature-Based + Layered Architecture** approach.

## Folder Structure

```plaintext
src/
│
├── app/               # Global app setup (store, providers)
├── routes/            # Routing configuration
├── shared/            # Reusable UI + utilities
├── services/          # API layer (Supabase / backend calls)
├── types/             # Global TypeScript types
│
├── features/
│   ├── auth/          # Authentication feature
│   ├── profile/       # User profile management
│   ├── roommates/     # Roommate listing
│   ├── matching/      # Matching algorithm logic