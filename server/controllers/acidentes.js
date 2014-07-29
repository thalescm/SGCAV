'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Acidente = mongoose.model('Acidente');

var showError = function (err, res) {
    console.log('error:');
    console.log(err);
    return res.status(400).send();
};

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Create acidente
 */
exports.create = function(req, res, next) {
    console.log('Accident Creation Called');
    console.log('Request body:');
    console.log(req.body);

    var acidente = new Acidente(req.body);

    req.assert('endereco.rua', 'Por favor, insira a rua do local').notEmpty();
    req.assert('endereco.bairro', 'Por favor, insira o bairro do local').notEmpty();
    req.assert('endereco.cidade', 'Por favor, insira a cidade do local').notEmpty();
    req.assert('endereco.estado', 'Por favor, escolha o estado do local').notEmpty();
    req.assert('descricao', 'Por favor, forneça uma descrição do acidente').notEmpty();
    req.assert('vitimas', 'Por favor, forneça o número de vítimas').notEmpty();
    req.assert('veiculos', 'Por favor, forneça o número de veículos').notEmpty();
    
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    console.log('Generating accident index.');
    // Auto increment id
    Acidente.count().exec(function(err, count) {
      acidente.idAcidente = count + 1;

      console.log('Accident index generated. Saving accident');

      acidente.save(function(err, acc) {
          if (err) {
            showError(err, res);
          }
          console.log('Accident saved successfully');
          return res.status(200).send({
            idAcidente: acc.idAcidente
          });
      });
    });
};

/**
 * Send Acidente
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find acidente by idAcidente
 */
exports.findById = function(req, res) {
    Acidente
        .findOne({
            idAcidente: req.body.idAcidente
        })
        .exec(function(err, acidente) {
            if (err) res.status(400).send(err);
            if (!acidente) return res.status(400).send('Acidente não encontrado');
            req.profile = acidente;
            return res.status(200).send({acidente: acidente});
        });
};

exports.all = function(req, res, next) {
  Acidente 
    .find().exec(function(err, acidentes) {
      if (err) return next(err);
      if (!acidentes) return next(new Error('Não foi possível obter lista de acidentes'));
      req.profile = acidentes;
      next();
    });
};
