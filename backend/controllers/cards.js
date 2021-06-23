const Cards = require('../models/card');
const ValidationError = require('../utils/errors/ValidationError');
const Forbidden = require('../utils/errors/Forbidden');
const NotFound = require('../utils/errors/NotFound');
const CastError = require('../utils/errors/CastError');

function errCheck(err, next) {
  if (err.name === 'CastError') {
    next(new CastError('Некорректный ID карточки'));
  }
  next(err);
}

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Cards.create({ owner: req.user._id, name, link })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.id)
    .orFail(new NotFound('Карточка с указанным ID не надйдена'))
    .then((data) => {
      if (String(data.owner) !== req.user._id) {
        throw new Forbidden('Карточка недосутпна пользователю');
      }
      return Cards.findByIdAndRemove(req.params.id,
        {
          new: true,
          upsert: false,
        })
        .then((card) => res.send(card));
    }).catch((err) => errCheck(err, next));
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFound('Карточка с указанным ID не надйдена'))
    .then((card) => res.send(card))
    .catch((err) => errCheck(err, next));
};

module.exports.removeLike = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFound('Карточка с указанным ID не надйдена'))
    .then((card) => res.send(card))
    .catch((err) => errCheck(err, next));
};
