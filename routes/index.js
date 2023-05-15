// setting up the router using the express framework
const router = require('express').Router();
const apiRoutes = require('./api');
// using the  apiRoutes module for routes starting with '/api'
router.use('/api', apiRoutes);

// if the request does not match any defined routes will send this response message
router.use((req, res) => res.send('Wrong route!'));

// exporing the router module to be reusable in application
module.exports = router;