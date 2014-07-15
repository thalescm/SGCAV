'use strict';

var mean = require('meanio');

module.exports = function(app) {

    app.route('/admin/menu/:name')
        .get(function(req, res) {
            var permissions = (req.user ? req.user.permissions : ['anonymous']);
            var menu = req.params.name ? req.params.name : 'main';
            var defaultMenu = (req.query.defaultMenu ? req.query.defaultMenu : []);

            defaultMenu.forEach(function(item, index) {
                defaultMenu[index] = JSON.parse(item);
            });

            var items = mean.menus.get({
                permissions: permissions,
                menu: menu,
                defaultMenu: defaultMenu
            });

            res.jsonp(items);
        });

};
