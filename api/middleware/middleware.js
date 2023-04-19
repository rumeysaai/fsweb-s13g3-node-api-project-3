const Users = require('../users/users-model');

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  console.log(`Req Method:${req.method} - Req Url: ${req.url} - Timestamp: ${new Date()}`);
  next();
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    const id = req.params.id
    const userr = await Users.getById(id);
    if (!userr) {
      res.status(404).json({ mesaj: "kullanıcı bulunamadı" });
    }
    else {
      req.user = userr;
      next();
    }
  }
  catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {

    const newUser = req.body;
    if(!newUser.name){
      res.status(400).json({mesaj: "gerekli name alanı eksik"});
    }
    else{
      req.name = newUser.name;
      next();
    }
    
  } catch (error) {
    next(error);
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM

  try {
    
    const text = req.body.text;

    if(!text){
      res.status(400).json({mesaj: "gerekli text alanı eksik"});
    }
    else{
      req.text = text;
      next();
    }
  } catch (error) {
    next(error);
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}