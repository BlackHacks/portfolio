
/*
 * GET home page.
 */

exports.music = function(req, res){
  res.render('music', { music:'', title: 'Piotr Yordanov' })
};
exports.index = function(req, res){
  res.render('index', { music:'', title: 'Piotr Yordanov' })
};
