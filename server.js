const multer = require('multer');
const express = require('express');
const {listFiles} = require('./util');

const app = express();
app.set('view engine', 'ejs');

const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, './uploads'),
    filename: (_, file, cb) => cb(null, file.originalname),
  })
});

app.get('/', async function (req, res) {
  const files = await listFiles('./uploads');
  res.render('index', { files })
});

app.post('/upload', upload.single('file'), function (req, res) {
  res.redirect('/');
});

app.get('/download/:file', function (req, res) {
  res.download(`./uploads/${req.params.file}`);
});

app.listen(5000, function () {
  console.log('Server is listening on port 5000...');
});
