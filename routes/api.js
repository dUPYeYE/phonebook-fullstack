import express from 'express';
import formidable from 'express-formidable';
import * as db from '../db/queries.js';

const router = express.Router();
router.use(formidable());

router.get('/partners', async (req, res) => {
  try {
    let result;
    if (req.query.filter) {
      result = await db.listAllPartnersFiltered(req.query.filter);
    } else {
      result = await db.listAllPartners();
    }
    if (result) {
      res.status(200);
      res.end(JSON.stringify(result));
    } else {
      res.status(400);
      res.end(JSON.stringify('Could not get data!'));
    }
  } catch (error) {
    res.write('Internal server error: ', error);
    res.status(500);
    res.end();
  }
});

router.get('/partners/:id', async (req, res) => {
  try {
    const result = await db.getPartner(req.params.id);
    if(result) {
      res.status(200);
      res.end(JSON.stringify(result));
    } else {
      res.status(404);
      res.end(JSON.stringify('Partner not found!'));
    }
  } catch (error) {
    res.write('Internal server error: ', error);
    res.status(500);
    res.end();
  }
});

router.patch('/partners/:id', async (req, res) => {
  try {
    const result = await db.patchPartner(
      req.params.id,
      req.fields.fname,
      req.fields.lname,
      req.fields.phonenum,
    );
    if (result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.write('Internal server error: ', error);
    res.status(500);
    res.end();
  }
});

router.post('/partners', async (req, res) => {
  try {
    const result = await db.insertPartner(
      req.fields.fname,
      req.fields.lname,
      req.fields.phonenum,
    );
    if (result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    res.write('Internal server error: ', err);
    res.status(500);
    res.end();
  }
});

router.delete('/partners/:id', async (req, res) => {
  try {
    const result = await db.deletePartner(req.params.id);
    if (result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    res.write('Internal server error: ', err);
    res.status(500);
    res.end();
  }
});

export default router;
