# Workout Tracker

A simple Workout Tracker web application built for the INFR3120 Web and Script Programming course.  
The app allows users to create, view, update, and delete workout records using a clean, Bootstrap-styled UI.

## Project Overview

The Workout Tracker helps users record basic information about their workouts so they can track progress over time.  
Each workout stores:

- **Exercise Name** (e.g., Bench Press, Squat)  
- **Muscle Group** (e.g., Chest, Back, Legs, Arms, Shoulders, Core)  
- **Sets**  
- **Reps**  
- **Date**

This project demonstrates:

- Full **Create-Read-Update-Delete (CRUD)** functionality
- Use of **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and **EJS**
- Deployment to a cloud provider
- Proper use of **.env** and **.gitignore** to protect credentials

---

## Technologies Used

- **Node.js** + **Express.js**
- **MongoDB Atlas** + **Mongoose**
- **EJS** templating engine
- **Bootstrap 5** for layout and styling
- **method-override** for PUT/DELETE in HTML forms
- **dotenv** for environment variables

---

## Data Model

Each workout is stored as a document in the `workouts` collection:

- `name` (String) – Exercise name  
- `muscleGroup` (String) – Target muscle group  
- `sets` (Number) – Number of sets  
- `reps` (Number) – Number of reps per set  
- `date` (Date) – Date of the workout  

---

## How to Run the Project Locally

1. **Clone the repository**

```bash
git clone https://github.com/pomsotu/workout-tracker.git
cd workout-tracker