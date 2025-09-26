const express = require('express');
const router = express.Router();
const Player = require('../models/playerModel');
const mongoose = require('mongoose');

// Create a player
router.post('/', async (req, res) => {
  try {
    const { name, number, position } = req.body;
    const player = await Player.create({ name, number, position });
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one player
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Player does not exist.' });
  }
  try {
    const player = await Player.findById(id);
    if (!player) return res.status(404).json({ error: 'Player does not exist.' });
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a player (returns updated doc)
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Player does not exist.' });
  }
  try {
    const player = await Player.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!player) return res.status(404).json({ error: 'Player does not exist.' });
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a player
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Player does not exist.' });
  }
  try {
    const player = await Player.findByIdAndDelete(id);
    if (!player) return res.status(404).json({ error: 'Player does not exist.' });
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
