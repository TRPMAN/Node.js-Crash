const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express();

const dbURI = 'mongodb+srv://trpman08:test123@cluster0.myhumft.mongodb.net/learning?retryWrites=true&w=majority&appName=Cluster0'
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
app.use(morgan('dev')); 

app.use((res,req,next) => {
  console.log('new request made: ');
  console.log('host: ',req.hostname);
  console.log('path: ',req.path);
  console.log('method: ',req.method)
  next();
})

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

app.get('/blogs',(req,res) => {
  // res.send('<p>hello world</p>')
  Blog.find().sort({createdAt: -1})
    .then((result) => {
      res.render('index', { title: "All Blogs", blogs: result})
    })
    .catch((err) => {
      console.log(err)
    })

})

app.get('/blogs/create',(req,res) => {
  res.render('create',{title: "Create a new Blog"});
})

//redirect
app.get('/about-us',(req,res) => {
  res.redirect('/about');
})

//404 page
app.use((req,res) => {
  res.render('404',{title: "404 Not Found"});
})