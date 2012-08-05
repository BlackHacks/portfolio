
/*
 * GET home page.
 */

exports.music = function(req, res){
  res.render('main', { music:'Music', title: 'Piotr Yordanov' })
};
exports.index = function(req, res){
  res.render('main', { music:'', title: 'Piotr Yordanov' })
};
