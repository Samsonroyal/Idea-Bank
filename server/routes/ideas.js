const express = require('express');
const Idea = require('../models/Idea');
const router = express.Router();

router.post('/', async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const idea = new Idea({ title, description, user: userId });
    await idea.save();
    res.status(201).send('Idea submitted');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find().populate('user', 'email');
    res.json(ideas);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
