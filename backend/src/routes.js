const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const routes = Router();

//Routes
routes.post('/devs' , DevController.store);
routes.get('/devs'  , DevController.index);
routes.get('/search', SearchController.index);
routes.get('/', (req, res) => {
    return res.json({message:'oi'});
})

module.exports = routes;
