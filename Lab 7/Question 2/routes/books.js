const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

const parseNumber = (val, defaultVal) => {
  const num = Number(val);
  return isNaN(num) ? defaultVal : num;
};

router.get('/search', async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) return res.status(400).json({ message: 'Title query param required' });

    const books = await Book.find({
      title: { $regex: title, $options: 'i' }
    }).sort({ title: 1 }).limit(20);

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/category/:cat', async (req, res) => {
  try {
    const category = req.params.cat;
    const books = await Book.find({ category }).sort({ title: 1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/sort/:field', async (req, res) => {
  try {
    const field = req.params.field;
    const order = req.query.order === 'desc' ? -1 : 1;

    let sortObj = {};
    if (field === 'price') sortObj.price = order;
    else if (field === 'rating') sortObj.rating = order;
    else return res.status(400).json({ message: 'Sort field must be price or rating' });

    const books = await Book.find().sort(sortObj).limit(50);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/top', async (req, res) => {
  try {
    const books = await Book
      .find({ rating: { $gte: 4 } })
      .sort({ rating: -1, title: 1 })
      .limit(5);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const page = parseNumber(req.query.page, 1);
    const limit = parseNumber(req.query.limit, 10);
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ title: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments();

    res.json({
      books,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;