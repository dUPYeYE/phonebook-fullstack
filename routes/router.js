import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.redirect('/partners');
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

export default router;

