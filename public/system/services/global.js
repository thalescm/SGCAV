'use strict';

//Global service for global variables
angular.module('mean.system').factory('Global', [

    function() {
        var _this = this;
        _this._data = {
            user: window.user,
            authenticated: false,
            isAdmin: false
        };
        if (window.user && window.user.permissions) {
            _this._data.authenticated = window.user.permissions.length;
            _this._data.isAdmin = ~window.user.permissions.indexOf('admin');
        }
        return _this._data;
    }
]);
