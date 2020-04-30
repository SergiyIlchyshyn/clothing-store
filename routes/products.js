const express = require('express');
const router = express.Router();

const products = require('../controllers/products.controller');

// GET - вся продукція
router.get('/', products.findAll);

// GET + id - один продукт
router.get('/:id', products.findOne);

// POST - створити 1 продукт
router.post('/', products.create);

// PUT - оновити
router.put('/:id', products.update);

// DELETE - видалити
router.delete('/:id', products.delete);

module.exports = router;