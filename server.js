const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const multer  = require('multer');
const {merging} = require('./merger')
const upload = multer({ dest: 'uploads/' })
app.use(express.static("templates"));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , '/templates/index.html'));
})
app.use('/static', express.static(path.join(__dirname, 'public')));
app.post('/merge' , upload.array('Pdfs' ,2) , async function (req, res, next){
    // console.log(req.files);
    // res.send({body:req.files});
    let d = await merging(path.join(__dirname , req.files[0].path ) , path.join(__dirname , req.files[1].path))
    res.redirect( `http://localhost:3000/static/${d}.pdf`);
})
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})