import express from 'express';
import { engine } from 'express-handlebars';
const port = 3000;
const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.get('/', (req, res) => {
  res.render('layouts/main');
});
app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`);
}); // // Template engine
// var hbs = handlebars.create({
//     helpers: {
//         sayHello: function () {
//             alert('Hello World')
//         },
//         getStringifiedJson: function (value) {
//             return JSON.stringify(value)
//         },
//     },
//     extname: '.hbs',
//     defaultLayout: 'main',
//     // partialsDir: ['views/partials/']
// })
// // app.engine('hbs', handlebars({
// //     extname: '.hbs'
// // }));
// app.engine('hbs', hbs.engine)
// app.set('view engine', 'hbs')
// app.set('views', path.join(__dirname, 'resources', 'views'))
// // app.engine('handlebars', engine())
// // app.set('view engine', 'handlebars')
// // app.set('views', './views')
// app.get('/', (req, res) => {
//     res.send('Hello World.!')
// })
// app.listen(port, () => {
//     console.log(`Example app listening http://localhost:${port}`)
// })