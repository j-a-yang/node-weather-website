const path = require("path");
const express = require('express');
const hbs = require("hbs");
const geocode = require("./geocode");
const forecast = require("./forecast");


const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app
.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Andrew Yang"
    });
})

.get("/weather", (req, res) => {
    const { address } = req.query;
    
    // if no address, send back error
    if (!address) {
        return res.send({
            error: "please provide an address"
        });
    }

    // use address to get geocode data
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        
        //use geocode data to get weather info
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            // send info to client as json.
            res.send({
                forecast: forecastData,
                location,
                address
            });
        });
    });
})

.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Andrew Yang"
    });
})

.get("/help", (req, res) => {
    res.render("help", {
        message: "this is the help message. also, just so you know, my name is andrew yang and i will be a very successful software developer",
        title: "Help",
        name: "Andrew Yang"
    })
})

.get("/help/*", (req, res) => {
    res.render("404", {
        errorMessage: "Help article not found"
    })
})

.get("*", (req, res) => {
    res.render("404", {
        title: "404 Page",
        errorMessage: "Page not found",
        name: "Andrew Yang"
    })
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});