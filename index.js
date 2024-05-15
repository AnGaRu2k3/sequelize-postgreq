require('dotenv').config()
const express = require('express')
const expressHbs = require('express-handlebars')
const helpers = require("./helpers")
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + "/html"))


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine(
    'hbs', 
    expressHbs.engine({
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
        extname: "hbs",
        defaultLayout: "layout",
        helpers: helpers,
    })
)


app.set("view engine", "hbs");

app.use("/", require("./routes/homeRoutes"))
app.use("/blogs", require("./routes/blogRoutes"))


app.use((req, res) => {
    res.send("Resquest not found")
})
app.use((error, req, res, next) => {
    console.error(error);
    res.send("Server error")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

