const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get('/', async (req, res) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  try {
    const allUsers = await Users.get();
    res.json(allUsers);

  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir

  res.json(req.user);
});

router.post('/', validateUser, async (req, res, next) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.

  try {
    let { name } = req.body;
    const posted = await Users.insert({ name: name });
    res.status(201).json(posted);

  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.

  try {
    let { name } = req.body;
    const updated = await Users.update(req.params.id, { name: name });
    res.json(updated);

  } catch (error) {
    next(error);
  }

});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    await Users.remove(req.params.id);
    res.json(req.user);
  } catch (error) {
    next(error)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    const userPosts = await Users.getUserPosts(req.params.id);
    res.json(userPosts)
  } catch (error) {
    next(error);
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {

    let { text } = req.body;
    const insertedUserPost = await Posts.insert({ user_id: req.params.id, text: text });
    res.json(insertedUserPost);

  } catch (error) {
    next(error);
  }

});

// routerı dışa aktarmayı unutmayın
module.exports = router;
