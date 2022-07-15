import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import route from './routes/index.js'
import db from './config/db.js'
db.connect()
dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.static(path.join(path.resolve(), '/src/public')))
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')

app.set('views', path.join(path.resolve(), '/src/resources/views'))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//Route init

route(app)

app.listen(port, () => {
    console.log(process.env.PORT)

    console.log(`Example app listening on port http://localhost:${port}`)
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

export default app