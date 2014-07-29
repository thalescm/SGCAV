'use strict';

// User routes use users controller
var acidentes = require('../controllers/acidentes');

module.exports = function(app, passport) {

    app.route('/acidentes/me')
        .get(acidentes.me);

    // app.route('/acidentes/edit')
    //     .post(acidentes.edit);

    app.route('/acidente/get')
        .get(acidentes.findById);

    app.route('/acidentes/create')
        .post(acidentes.create);

};
