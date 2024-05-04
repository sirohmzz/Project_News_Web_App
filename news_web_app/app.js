var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require('./database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var categoryRouter = require('./routes/category');
var memberRouter = require('./routes/member');
var majorRouter = require('./routes/major'); 
var favoriteCategoryRouter = require('./routes/favorite_category'); 
var newsRatingRouter = require('./routes/news_rating'); 
var pictureRouter = require('./routes/picture'); 
var readHistoryRouter = require('./routes/read_history'); 
var readLaterRouter = require('./routes/read_later'); 
var subCategoryRouter = require('./routes/sub_category'); 
var totalReadRouter = require('./routes/total_read'); 
var workStatusRouter = require('./routes/work_status'); 
var workStatusDetailRouter = require('./routes/work_status_detail'); 
var newsRouter = require('./routes/news'); 


var app = express();

app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/category', categoryRouter);
app.use('/member', memberRouter);
app.use('/major', majorRouter);
app.use('/favorite_category', favoriteCategoryRouter);
app.use('/news_rating', newsRatingRouter);
app.use('/picture', pictureRouter);
app.use('/read_history', readHistoryRouter);
app.use('/read_later', readLaterRouter);
app.use('/sub_category', subCategoryRouter);
app.use('/total_read', totalReadRouter);
app.use('/work_status', workStatusRouter);
app.use('/work_status_detail', workStatusDetailRouter);
app.use('/news', newsRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  connection
  console.log(`Server is running on port ${port}`);
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
