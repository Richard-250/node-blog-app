import express from 'express';

const router = express.Router();
router.get('/welcome', (req, res) => {
  res.json(
    'Hello, There! Welcome, this is iBlog team project.'
  );
});

export default router;