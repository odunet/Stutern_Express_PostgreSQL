// Instantiate app
const express = require('express');
const controller = require('../controllers');
const { check } = require('express-validator');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const middleware = require('../middleware');

//Set storage in local disc
const storage = multer.diskStorage({
  destination: './public/avatar/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

// Define router
const router = express.Router();

/**
 * @param  {Express.object} req
 * @param  {Express.object: html} res
 * @method GET
 */
router.get('/', controller.landingPage);

/**
 * @param  {Express.object} req
 * @param  {Express.object: html} res
 * @method GET
 */
router.get('/update', controller.updatePage);

/**
 * @param  {Express.object: JSON.Player} req
 * @param  {Express.object: JSON.Response} res
 * @method POST
 */
router.post(
  '/player',
  upload.single('avatar'),
  middleware.rename,
  [
    check('name', 'A valid name is required').exists(),
    check('position', 'A valid position is required').exists(),
    check('clubName', 'A valid clubname is required').exists(),
  ],
  controller.createPlayer
);

/**
 * @param  {Express.object: JSON.Player} req
 * @param  {Express.object: JSON.Response} res
 * @method GET
 */
router.get('/player', controller.getPlayer);

/**
 * @param  {Express.object: JSON.Player} req
 * @param  {Express.object: JSON.Response} res
 * @method GET
 */
router.get('/player/:id', controller.getPlayerById);

/**
 * @param  {Express.object: JSON.Player} req
 * @param  {Express.object: JSON.Response} res
 * @method PATCH
 */
router.patch(
  '/player/:id',
  [
    check('name', 'A valid name is required').exists(),
    check('position', 'A valid position is required').exists(),
    check('clubName', 'A valid clubname is required').exists(),
  ],
  controller.updatePlayer
);

/**
 * @param  {Express.object: JSON.Player} req
 * @param  {Express.object: JSON.Response} res
 * @method PUT
 */
router.put(
  '/player/:id',
  upload.single('avatar'),
  //   middleware.renameAvatar,
  controller.updateAvatar
);
module.exports = router;
