let express = require("express"),
    app = express(),
    mongoose = require("mongoose");
    cors = require("cors");

let apiRoute = require("./routes/api");
app.use("/api", apiRoute);

app.get('/', (req, res) => {
    res.send("Home");
});

app.use(cors());

let mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL;

if (mongoURL == null) {
    let mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
    if (process.env.DATABASE_SERVICE_NAME) {
        let mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
        mongoHost = process.env[mongoServiceName + "_SERVICE_HOST"];
        mongoPort = process.env[mongoServiceName + "_SERVICE_PORT"];
        mongoDatabase = process.env[mongoServiceName + "_DATABASE"];
        mongoPassword = process.env[mongoServiceName + "_PASSWORD"];
        mongoUser = process.env[mongoServiceName + "_USER"];
    }
    else if (process.env.database_name) {
        mongoDatabase = process.env.database_name;
        mongoPassword = process.env.password;
        mongoUser = process.env.username;
        let mongoUriParts = process.env.uri && process.env.uri.split("//");
        if (mongoUriParts.length == 2) {
            mongoUriParts = mongoUriParts[1].split(":");
            if (mongoUriParts && mongoUriParts.length == 2) {
                mongoHost = mongoUriParts[0];
                mongoPort = mongoUriParts[1];
            }
        }
    }
    else {
        mongoURL = "mongodb://localhost:27017/mydb";
    }

    if (mongoHost && mongoPort && mongoDatabase) {
        mongoURL = `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`
        if (mongoUser && mongoPassword) {
            mongoURL = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`
        }
    }
}


mongoose.connect(mongoURL,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log("Connected to database");
});

let server = app.listen(8080, () => {
    let port = server.address().port;
    console.log("Started server!");
});

module.exports = app;