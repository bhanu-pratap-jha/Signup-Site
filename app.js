const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express ();

app.use(express.static("public"));// for our server to serve static files
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members:[
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/2ec369f7e2" ;

    const options = {
        method: "POST",
        auth: "bhanu:0d40879234cb30b8ea261d27aa556e90-us21"

    }

    const request = https.request(url, options, function(response){

        if (response.statusCode == 200){
            res.send("Sucessfully Subscribed");
        }
        else{
            res.send("There was some error with signing up, please try again!");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
request.end();

})


app.post("/failure", function(req,res){
    res.redirect("/")
})


app.listen(process.env.PORT||3000, function(){
    console.log("Server is running at port 3000");
})

// 0d40879234cb30b8ea261d27aa556e90-us21
