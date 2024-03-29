const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const personRouter = require('./src/routes/person');
const taskRouter = require('./src/routes/task');
const rootRouter = require('./src/routes/index');


require('./config/database')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] })); // for PUT and DELETE methods

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs');

app.use('/', rootRouter)
app.use('/persons', personRouter)
app.use('/persons', taskRouter.personDependent)
app.use('/tasks', taskRouter.simple)

app.listen(3000, () => {
    console.log('Servidor Foi Iniciado')
})