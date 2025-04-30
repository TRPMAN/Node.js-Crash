const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

const app = express();

const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

//register view engine
app.set('view engine','ejs')

//mongoose and mongo sandbox
app.get('/add-blog', (req,res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more and more'
  });

  blog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/all-blog', (req,res) => {
  Blog.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

// app.get('/single-blog', (req,res) => {
//   Blog.findById('6810f50450614901bce90d6f')
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev')); 

// app.use((res,req,next) => {
//   console.log('new request made: ');
//   console.log('host: ',req.hostname);
//   console.log('path: ',req.path);
//   console.log('method: ',req.method)
//   next();
// })

app.get('/',(req,res) => {
  // res.send('<p>hello world</p>')
  // const blogs = [
  //   {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  // ];

  // res.render('index',{title: "Home", blogs});
  res.redirect('/blogs')
})

app.get('/about',(req,res) => {
  res.render('about',{title: "About"});
})

//blog routes
app.use('/blogs',blogRoutes)

//redirect
app.get('/about-us',(req,res) => {
  res.redirect('/about');
})

//404 page
app.use((req,res) => {
  res.render('404',{title: "404 Not Found"});
})