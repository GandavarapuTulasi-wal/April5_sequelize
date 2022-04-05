const Book = require('../models/book');
exports.createBook = (request, response) => {
  const { name, description, author, category } = request.body;
  let bookOb = new Book({ name, description, author, category });
  bookOb.save((err) => {
    if (err) {
      response.json(err);
    } else {
      response.json({ status: 1, data: { msg: 'book created' } });
    }
  });
};
exports.getBooks = (request, response) => {
  Book.find((err, books_list) => {
    if (err) {
      response.json(err);
    } else {
      response.json({ status: 1, data: { books_list } });
    }
  });
};
exports.getBooksWithAuthor = (request, response) => {
  Book.find()
    .populate('author')
    .exec((err, books_list) => {
      if (err) {
        response.json(err);
      } else {
        response.json({ status: 1, data: { books_list } });
      }
    });
};
exports.getBooksWithCondition = (request, response) => {
  Book.find({ name: request.params.name }).exec((err, books_list) => {
    if (err) {
      response.json(err);
    } else {
      response.json({ status: 1, data: { books_list } });
    }
  });
};
exports.getAuthorandCategory = (request, response) => {
  Book.find()
    .populate('author')
    .populate('category')
    .exec((err, books_list) => {
      if (err) {
        response.json(err);
      } else {
        response.json({ status: 1, data: { books_list } });
      }
    });
};
exports.getBookWithId = (request, response) => {
  Book.findById(request.params.id).exec((err, book_data) => {
    if (err) {
      response.json(err);
    } else {
      response.json({ status: 1, data: { book_data } });
    }
  });
};
