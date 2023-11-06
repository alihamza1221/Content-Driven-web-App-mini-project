const express = require('express');
const multer = require('multer');

const {pool, getDb} = require('../data/database');
const router = express.Router();

const storateConfiguration = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() +'-'+ file.originalname);
  }
});
const upload = multer({storage:storateConfiguration})//gives back a middle-ware
router.get('/', async function(req, res) {
  try {
    var users;
    var [users, fields] = await pool.query('SELECT * FROM images');
    console.log(users);
  } catch (err) {
    console.log(err);
  }
  res.render('profiles',{users:users});
});
router.get('/new-user', function(req, res) {
  res.render('new-user');
});
router.post('/profiles', upload.single('image'),async  function(req, res) {
   console.log('file-saved');
   const uploaddedFilePath = req.file.path;
   const reqData = req.body;
   console.log(uploaddedFilePath);
  getDb();
  const query = `INSERT INTO images (url,name) VALUES (?, ?)`;

   try {
       const [result, fields] = await pool.query(query, [uploaddedFilePath, reqData.username]);
       console.log('successfully added!'); 
   }
    catch (err) {
       res.status(500).send(err);
   }
   
   res.redirect('/');

});
module.exports = router;
//we can add unilimited middleware to router  
//such as fucntion is a middleware and upload
//here image is name given to our form input