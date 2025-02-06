# Family Travel Tracker 🌍

This web application helps you track your family's travels by storing information about the countries you've visited and displaying them on a personalized map. It integrates a relational database with a dynamic interface for easily visualizing and managing your travel history, using PostgreSQL and pgAdmin 4 for database management.

# Technologies Used:

- Node.js: JavaScript runtime for server-side logic.
- Express.js: Web framework for routing and middleware handling.
- PostgreSQL: Relational database for storing user and travel data.
- EJS: Templating engine for rendering dynamic HTML pages.
- Body-Parser: Middleware for parsing incoming request bodies.
- CSS: Styling for the user interface.
- pg: PostgreSQL client for Node.js.
  
# 🗄️ Database Structure & Operations:
- Users table: Stores user information (id, name, favorite color).
- Visited countries table: Tracks visited countries, with a foreign key to the users table.
- Countries table: Stores all countries along with their ISO country codes.
__Queries__:
- Inserting new users and countries.
- Retrieving user details and their visited countries.
- Ensuring no duplicate entries for users and countries.

# 🚀 Routes & Functionality:
- GET / → Fetches the visited countries and current user details, then renders the homepage with the user's countries on the map, total count and color.
- POST /add → Adds a country to the user's visited list, checks for duplicates or non-existent countries, and re-renders the page with an error message if needed.
- POST /user → Renders the user creation page if "new" is clicked; otherwise, updates the current user and redirects to the homepage.
- POST /new → Adds a new user with a name and color, updates the current user, and redirects to the homepage.
  
# 🎨 Frontend:
index.ejs: User-friendly interface where users can select their family member and see their traveled countries.
Map View: Visually highlights visited countries with each user’s favorite color for a personalized experience.
new.ejs: User-friendly interface where users can enter a family member's name and select a favorite color using radio buttons.

# ⚠️ Error Handling:
- Prevents duplicate entries if a country has already been added.
- Displays error messages for invalid or non-existent countries.

# DEMO:
![FamilyTrackerGIF](https://github.com/DavidIoana18/FamilyTravelTracker/blob/main/demo/FamilyTravelTracker.gif)
  
