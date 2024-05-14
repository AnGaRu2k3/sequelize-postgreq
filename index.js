require('dotenv').config()
const express = require('express')
const expressHbs = require('express-handlebars')

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
        helpers: {
            formatDate: function (date) {
                // Chuyển đổi ngày thành chuỗi có định dạng 'DD/MM/YYYY'
                const formattedDate = new Date(date).toLocaleDateString('en-GB');
                return formattedDate;
            },
            isAdmin: function(check) {
                if(check === true) return "Admin"
                return "user"
            },
            first10char: function(str) {
                if (!str) return "";
    
                return str.slice(0, Math.min(20, str.length));
                
            }
        },

    })
)


app.set("view engine", "hbs");

app.get("/", (req, res) => res.render("index"))


app.use("/blogs", require("./routes/blogRoutes"))


app.use((req, res) => {
    res.send("Resquest not found")
})
app.use((error, req, res, next) => {
    console.error(error);
    res.send("Server error")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

