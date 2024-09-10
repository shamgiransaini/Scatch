const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const path = require("path")
const expressSession = require("express-session")
const flash = require("connect-flash")

require("dotenv").config();

const adminsRouter =  require('./routes/adminsRouter')
const index =  require('./routes/index')
const usersRouter =  require('./routes/usersRouter')
const productsRoutes =  require('./routes/productsRoutes')

const db = require("./config/mongoose-connection")


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(
    expressSession({
        resave:false,
        saveUninitialzed: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)

app.use(flash())

app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")

app.use("/", index)
app.use("/admins", adminsRouter)
app.use("/users", usersRouter)
app.use("/products", productsRoutes)

app.listen(3000, ()=> console.log("http://localhost:3000")
)