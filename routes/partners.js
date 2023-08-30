import express from 'express';
import * as db from '../db/queries.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (req.query.id) {
      res.render('details', {
        title: 'Details', id: req.query.id,
      });
    } else {
      res.render('index', {
        title: 'Partners',
      }); 
    }
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

router.get('/new', (req, res) => {
  try {
    res.render('newpartner', {
      title: 'New partner', completed: false, error: false,
    });
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const partnerData = await db.getPartner(req.params.id);
    res.render('editpartner', {
      title: 'Edit partner', partner: partnerData[0], completed: false, error: false,
    });
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

export default router;

