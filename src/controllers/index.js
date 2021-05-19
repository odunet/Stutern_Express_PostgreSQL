import { validationResult } from 'express-validator';
require('dotenv').config();
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

//Initialize postgress DB
const { Client } = require('pg'); //Client
const { pool } = require('../db'); //Pool

/**
 * @param  {Express.object} req
 * @param  {Express.object: html} res
 * @method Get
 */
exports.landingPage = (req, res) => {
  res.status(200).render('../../public/views/index.hbs');
};

exports.createPlayer = async (req, res) => {
  const errors = validationResult(req);
  // Evaluate if there are errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const text =
    'INSERT INTO player (name, position , imageid, club) VALUES($1, $2, $3, $4)';
  const values = [
    req.body.name,
    req.body.position,
    req.body.image,
    req.body.clubName,
  ];
  try {
    let response = await pool.query(text, values);
    res.status(200).json({
      statusCode: 200,
      message: `User with name: '${req.body.name}' has been created`,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      statusCode: 401,
      Error: err.message,
    });
  }
};

exports.getPlayer = async (req, res) => {
  const data = await pool.query('SELECT * from player');
  const dataResponse = data.rows;
  res.status(200).json({ dataResponse });
};

exports.updatePlayer = async (req, res) => {
  const text = `UPDATE player
                SET  name = $1,
                     position = $2,
                     club = $3
                WHERE id = ${req.params.id}`;
  const values = [req.body.name, req.body.position, req.body.clubName];
  try {
    let response = await pool.query(text, values);
    res.status(200).json({
      statusCode: 200,
      message: `User with name: '${req.body.name}' has been updated`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      statusCode: 401,
      Error: err.message,
    });
  }
};

exports.updatePage = async (req, res) => {
  res.status(200).render('../../public/views/updatePlayer.hbs');
};

exports.updateAvatar = async (req, res) => {
  try {
    //Get lenght of DB
    let LenghtResponse = await pool.query(`Select * FROM player`);
    DBlenght = LenghtResponse.rows.length;
    if (parseInt(req.params.id) < 1 || req.params.id > DBlenght) {
      throw new Error();
    }

    const text = `Select imageid FROM player WHERE id = $1`;
    const values = [req.params.id];
    let response = await pool.query(text, values);
    let image = response.rows[0].imageid;
    let newPath = path.join(__dirname, '../../public/avatar/', `${image}`);
    let oldPath = path.join(
      __dirname,
      '../../public/avatar/',
      `${req.file.filename}`
    );
    fs.renameSync(oldPath, newPath, () => {
      if (err) console.log(err);
      console.log('File renamed');
    });
    res.status(200).json({ msg: 'Done' });
  } catch (err) {
    console.log(err.message);
    let oldPath = path.join(
      __dirname,
      '../../public/avatar/',
      `${req.file.filename}`
    );
    fs.unlinkSync(oldPath, (err) => {
      if (err) console.log('err');
      else {
        ('Renamed unsaved file');
      }
    });
    res.status(401).json({ Error: err.message });
  }
};

exports.getPlayerById = async (req, res) => {
  const client = new Client();
  await client.connect();
  const data = await client.query(
    `SELECT * FROM player WHERE id=${req.params.id}`
  );
  const dataResponse = data.rows;
  await client.end();
  client.end();
  res.status(200).json({ dataResponse });
};
