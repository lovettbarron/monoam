var Lemma = require('../node_modules/lemma-javascript/src/Lemma.js');
var ServerLocator = require('../node_modules/lemma-javascript/src/ServerLocator.js');
var lemma = new Lemma('audio', ""); // +(Math.random() * (5000 - 1) + 1)

lemma.hears('Beat', function(name, value){
  console.log(name + " : " + value);
});

lemma.hears('Note', function(name, value){
  console.log(name + " : " + value);
});

new ServerLocator(lemma).beginLocating();


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.note = function(req, res){
  	console.log(req.body.note)
  if(lemma.isConnected()) {
    var note = req.body.note;
    note = note > 0 && < 2 ? note + 8 : 11;
	lemma.sendEvent("Note",note);
	console.log("Sent to Noam Note: " + note)
    res.send(200, "Sent to Lemma");
  } else {
  	console.log("Lemma not connected");
  	res.send(404);
  }
};