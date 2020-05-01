var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//MONGOOSE======================================================================
var mongoose = require('mongoose');
// Для подключения к БД shopping применяем метод connect()
mongoose.connect('mongodb://localhost:27017/shopping', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(Error, err.message);
    });
mongoose.Promise = global.Promise;
//==============================================================================
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
//==============================================================================
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//==============================================================================
// const blocks = {};
// hbs.registerHelper('extend', function(name, context) {
//     let block = blocks[name];
//     if (!block) {
//         block = blocks[name] = [];
//     }

//     block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
// });

// hbs.registerHelper('block', function(name) {
//     var val = (blocks[name] || []).join('\n');

//     // clear the block
//     blocks[name] = [];
//     return val;
// });
//==============================================================================

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//==============================================================================
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
//==============================================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;