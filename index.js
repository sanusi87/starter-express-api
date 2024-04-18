const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static('public'));
app.engine('html', ejs.renderFile);
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));

const routes = require('./routes');

app.get('/', routes.site.index);
app.all('/generate/pdf', routes.generator.pdf);
app.all('/generate/xlsx', routes.generator.xlsx);

app.listen(3000)