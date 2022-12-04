const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

//ROUTES
// router.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'The Forest Hiker',
//     user: 'Jonas',
//   });
// });

router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);

router.get('/login', viewsController.getLoginForm);

module.exports = router;
