const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = 4000;

const app = express();

// Initialization
app.use(cookieParser());

app.use(session({
	secret: "amar",
	saveUninitialized: true,
	resave: true
}));


app.get('/', (req, res) => {
	if (req.session.view) {

		// The next time when user visits, 
		// he is recognized by the cookie 
		// and variable gets updated.
		req.session.view++;
		res.send("You visited this page for "
			+ req.session.view + " times");
	}
	else {

		// If user visits the site for
		// first time
		req.session.view = 1;
		res.send("You have visited this page"
		+ " for first time ! Welcome....");
	}
})

// Host
app.listen(PORT, () =>
	console.log(`Server running at ${PORT}`));
