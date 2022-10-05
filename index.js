import { createRequire } from "module";
const require = createRequire(import.meta.url);
import {generate} from 'critical';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
  var url =req.body.url;
  var key = req.body.key;
  var _wpnonce = req.body._wpnonce;
  var filename = req.body.filename;
  var css_url = req.body.css_url;
  var path = req.body.path;
  var html = req.body.html;
  if (url== null) {
    url = 'https://w3developments.com';
  }
    const cssGenerate = async() =>{
      res.setHeader('Content-Type', 'application/json');
      const {css, html, uncritical} = await generate({
        src: url,
        width: 1300,
        height: 900,
      });

      const data = {
        url: url,
        w3_put_preload_css: 1,
        result:'success',
        _wpnonce: _wpnonce,
        filename:filename,
        path:path,
        w3_css:css
      };      
      res.send(JSON.stringify(data));
    }
    cssGenerate();
    
});


app.listen(port);




