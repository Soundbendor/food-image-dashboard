const express = require('express');
const db = require('./config/db')
const cors = require('cors')
const bodyparser = require('body-parser')
const multer = require('multer')
const bcrypt = require('bcrypt')
const execSync = require('child_process').execSync;
const saltRounds = 10
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')


const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
  extended: true
}))
app.use(express.static("./public"))
app.use(cors({
	origin: ["http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3000", 
		 "http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com"],
	methods: ["GET", "POST"],
	credential: true,
	'Access-Control-Allow-Credentials': 'true',
	})
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
	  key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
	},	
	})
);


// Route to get list of all users
app.get("/DBApi/getUsers", (req,res)=>{
  console.log("Got Users Request!")
  db.query("SELECT * FROM USERS", (err,result)=>{
    if(err) {
    console.log(err)
    } 
  return res.status(200).send(result)
});   });

app.get("/DBApi/getFoods", (req,res)=>{
  console.log("Got Foods Request!")
  db.query("SELECT * FROM FOODS", (err,result)=>{
    if(err) {
    console.log(err)
    } 
  return res.status(200).send(result)
});   });

app.get("/DBApi/getFoodNames", (req,res)=>{
  console.log("Got Food names Request!")
  db.query("SELECT FoodName FROM FOODS ORDER BY FoodName", (err,result)=>{
    if(err) {
    console.log(err)
    } 
  return res.status(200).send(result)
});   });

app.get("/DBApi/getMeals", (req,res)=>{
  console.log("Got Meals Request!")
  db.query("SELECT * FROM MEALS", (err,result)=>{
    if(err) {
    console.log(err)
    } 
    
  return res.status(200).send(result)
});   });

app.get("/DBApi/getMealServing", (req,res)=>{
  console.log("Got MealServing Request!")
  db.query("SELECT * FROM MEALSERVINGS", (err,result)=>{
    if(err) {
    console.log(err)
    } 
    return res.status(200).send(result)
});   });

app.post('/DBApi/register', (req,res)=>{
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const age = req.body.age;
  const city = req.body.city;
  const state = req.body.state;
  const phone = req.body.phone;
  const birth = req.body.birth;

  bcrypt.hash(password, saltRounds, (err, hash) => {

  db.query("INSERT INTO USERS (UserName, Email, Password, FName, LName, age, City, State, PhoneNumber, Birthday) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [username, email, hash, fname, lname, age, city, state, phone, birth],
    (err, result) => {
      if(result){
        res.send(result)
      }else{
        res.send({message: "Enter Correct Asked Details"})
      }
    }
  )
  })
});

app.get("/DBApi/login", (req, res) => {
    if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post('/DBApi/login', (req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
	db.query(
    "SELECT * FROM USERS WHERE Username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
	      console.log('hi')
	bcrypt.compare(password, result[0].Password, (error, response) => { 
		if(response) {
                        req.session.user = result;
			console.log(req.session.user);
			res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "Wrong username/password combination" });
      }
    }
  );
});

app.get("/DBApi/getUserNames", (req,res)=>{
  db.query("SELECT UserName FROM USERS", (err,result)=>{
    if(err) {
    	console.log(err)
    }
  	return res.status(200).send(result)
});  });

app.post("/DBApi/getUserByID", (req,res)=>{
        userid = req.body.userID;
	console.log("hi")
  

	db.query("SELECT * FROM USERS WHERE UserID = ?", [userid],
        (err,result)=>{
    if(err) {
    console.log(err)
    }
  return res.send(result)
});   });

app.post('/DBApi/updateProfile', (req, res)=>{
   const username = req.body.username;
  const email = req.body.email;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const age = req.body.age;
  const city = req.body.city;
  const state = req.body.state;
  const phone = req.body.phone;
  const birth = req.body.birth;
 const userID = req.body.userID;
 db.query("UPDATE USERS SET Email = ?, UserName = ?, FName = ?, LName = ?, age = ?, City = ?, State = ?, PhoneNumber = ?, Birthday = ?  WHERE UserID = ?", [email, username, fname, lname, age, city, state, phone, birth, userID],
    (err, result) => {
      if(result){
        res.send(result)
      }else{
        res.send({message: "Enter Correct Asked Details"})
      }
    }
  )
  });


app.get('/DBApi/getServing', (req, res)=>{
  const foodname = req.query.food;
  db.query("SELECT ServSize, ServMetric FROM FOODS WHERE FoodName = ?", [foodname],
    (err, result) => {
      if(err){
	res.send({message: "Error"})
	console.log(err)
      } else {
	if(result.length > 0) {
	//console.log(result)
	  res.send(result)
	}
      }
    }
  )
})

app.post('/DBApi/AddMeal', (req, res) => {
  const userID = req.body.userID;
  var mealID = Math.floor(Math.random() * 30000) + 1;
  db.query("INSERT INTO MEALS (MealID, MealUserID) VALUES (?, ?)", [mealID, userID],
  (err, result) => {
  if (err) {
    console.log(err)
    res.send({message: "DB Error" })
    return;
  }
  else {
  const portionArray = req.body.portionArray
  console.log(portionArray)
  portionArray.map(portion => {
    db.query("INSERT INTO MEALSERVINGS VALUES (?, (SELECT FoodID FROM FOODS WHERE FoodName = ?), ?)", [mealID, portion.foodID, portion.servings],
      (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).send("Meal Insertion Failure")
    }
    else {
    }
    });
  }) 
  res.status(200).send("Meal Insertion Successful")}
  });
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

