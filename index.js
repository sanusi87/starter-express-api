const express = require('express');
const app = express();

const routes = require('./routes');

app.get('/', routes.site.index);
app.get('/slot/pickup/:store', routes.site.slot_pickup);
app.get('/slot/delivery/:store', routes.site.slot_delivery);

app.listen(process.env.PORT || 3000)