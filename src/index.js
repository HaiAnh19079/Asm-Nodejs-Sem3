import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import cors from 'cors'
import dotenv from 'dotenv'
import route from './routes/index.js'
import db from './config/db.js'
import { LocalStorage } from "node-localstorage";


db.connect()
dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.static(path.join(path.resolve(), '/src/public')))
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            value_condition: value => {
                if (value === 'black') {
                    return value
                } else {
                    return ''
                }
            },
            ifCond: function (v1, operator, v2, options) {
 
                switch (operator) {
                    case '==':
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                    case '===':
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                    case '!=':
                        return (v1 != v2) ? options.fn(this) : options.inverse(this);
                    case '!==':
                        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                    case '<':
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                    case '<=':
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                    case '>':
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                    case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                    case '&&':
                        return (v1 && v2) ? options.fn(this) : options.inverse(this);
                    case '||':
                        return (v1 || v2) ? options.fn(this) : options.inverse(this);
                    default:
                        return options.inverse(this);
                }
            }
        },
    })
)
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(function(req, res, next) {
    res.locals.cookies = req.cookies;
    res.locals.session = req.session;
    // res.locals.user = req.user;
    // res.locals.admin = req.admin;
    next();
});
app.set('view engine', '.hbs')
app.set('views', path.join(path.resolve(), '/src/resources/views/'))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Route init
route(app)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

export default app
