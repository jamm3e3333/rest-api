const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const {getParams, postParams} = require('./utils/req.js');

const port = process.env.PORT || 3041;

const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const viewPartials = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views', viewsPath);


app.use(express.static(publicPath));
app.use(express.json());
hbs.registerPartials(viewPartials);

app.get('',(req, res) => {
    res.render('index',{
        name: 'Jakub'
    });
})

app.get('/info', (req, res) => {
    res.render('info', {

    })
})

app.get('/about', (req, res) => {
    res.render('about', {

    })
})

app.get('/get_methods', (req, res) => {
    getParams(req.query.block_name, (err, data) => {
        if(err){
            return res.status(400)
                        .send({
                            err
                        })
        }
        const {body} = data;
        res.status(200)
            .send(
                JSON.stringify(body)
            )
    })
    
})

app.get('/post_methods', (req, res) => {
    postParams(req.query.block_name,parseFloat(req.query.val), (error, data) => {
      if(error){
          return res.status(400)
                    .send({
                        error
                    })
      }  
      res.status(200)
            .send({
              value: req.query.val,
              data: data.body
            })
    })
})

app.listen(port,() => {
    console.log(`Listening on port ${port}`);
})