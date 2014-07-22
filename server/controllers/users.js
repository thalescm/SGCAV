'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.redirect('#!/login');
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);

    user.provider = 'local';

    console.log(req);

    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('name', 'Por favor, insira um nome').notEmpty();
    req.assert('email', 'Por favor, insira um e-mail válido').isEmail();
    req.assert('password', 'Senhas devem ter entre 8-20 caracteres').len(8, 20);
    req.assert('username', 'O Username deve ser menor que 20 caracteres').len(1,20);
    req.assert('confirmPassword', 'As senhas não são iguais').equals(req.body.password);
    req.assert('role', 'Defina o tipo de usuário a ser criado').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    if (user.role === 'adm') {
        user.permissions = ['register', 'create-report', 'create-recursos'];
    } else if (user.role === 'policial' || user.role === 'bombeiro') {
        user.permissions = ['create-cenario', 'atualizar-missao'];
    }

    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    res.status(400).send('Username already taken');
                    break;
                default:
                    res.status(400).send('Please fill all the required fields');
            }

            return res.status(400);
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
        res.status(200);
    });
};

/**
 * Edit user
 */
exports.edit = function(req, res, next) {
    req.assert('username', 'O Username deve ser menor que 20 caracteres').len(1,20);
    debugger;

    User.find({ username: req.username }, function(user) {
        console.log(user);
    });

    res.status(200);
};

/**
 * Check Password
 */
exports.authenticate = function(req, res, next) {
    req.assert('password', 'Senhas devem ter entre 8-20 caracteres').len(8, 20);

    var errors = req.validationErrors();
    if (errors) {
        res.status(400).send(errors);
    }

    console.log('req.password: ' + req.password);

    if (req.user.authenticate(req.password)) {
        res.status(200).send();
    } else {
        res.status(400).send('Senha inválida');
    }

    res.status(200).send();
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};
