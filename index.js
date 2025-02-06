import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "-",
  password: "-",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [ //too see how the array will look like
  { id: 1, name: "Ioana", color: "teal" },
  { id: 2, name: "Robert", color: "powderblue" },
];

async function checkVisited() { 
  const result = await db.query("SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1;", [currentUserId]); //get the countries that the current user has visited
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getCurrentUser(){
  const result =  await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId); //find the user with the currentUserId
}

app.get("/", async (req, res) => { //get the countries that the current user has visited and display them
  const countries = await checkVisited(); 
  const currentUser = await getCurrentUser(); //get the current user
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  }); 
});

app.post("/add", async (req, res) => { //add a country to the visited_countries table
  const input = req.body["country"];
  const currentUser = await getCurrentUser();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';", 
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisited();
      res.render("index.ejs",{
        countries: countries, 
        total: countries.length, 
        users: users,
        color: currentUser.color,
        error: "Country has already added, try again!"
      });
      
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisited();
    res.render("index.ejs",{
      countries: countries, 
      total: countries.length, 
      users: users,
      color: currentUser.color,
      error: "Country name doesn't exist, try again!"
    });      
  }
});

app.post("/user", (req, res) => {
  if(req.body.add === "new"){
    res.render("new.ejs");
  }else{
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  const result = await db.query("INSERT INTO users (name, color) VALUES ($1, $2)  RETURNING *;", //return all columns of the newly created row after the insert operation was performed
     [name, color]);

  const id = result.rows[0].id; //get the id of the newly created user
  currentUserId = id; 

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
