//jshint exversion:6

const express= require("express");
const bodyparser=require("body-parser");
const ejs= require("ejs");
const _ = require("lodash");

const homestartingcontent=" this is the home starting content for this blog page. just navigate around to see otherinteresting features within the website. we can still do better";
const aboutcontent="this is theabout content for this web page";
const contactcontent="this is the contact us content for this web page";

const app= express();

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/css"));

let posts=[];

app.get("/", function(req,res){
res.render("home", {
	homestartingcontent:homestartingcontent,
	posts:posts
});
});

app.get("/about", function(req,res){
	res.render("about",{aboutcontent:aboutcontent});
});

app.get("/contact", function(req, res){
	res.render("contact", {contactcontent:contactcontent});
});

app.get("/compose", function(req,res){
	res.render("compose");
});
app.post("/compose", function(req, res){
	const post = {
		title: req.body.posttitle,
		content: req.body.postcontent
	};

	posts.push(post);
	res.redirect("/");
});

app.get("/posts/:postname", function(req, res){
	const requestedTitle = _.lowerCase(req.params.postname);

	posts.forEach(function(post){
		const storedTitle = _.lowerCase(post.title); 

		if (storedTitle === requestedTitle){
			res.render("post",{
				title:post.title,
				content:post.content
			}); 
			}
	});
});


app.listen(3000, function(req, res){
	console.log("app is runing on port 3000");
});