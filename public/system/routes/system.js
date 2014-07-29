'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // For unmatched routes:
            $urlRouterProvider
            .otherwise('/');

            // states for my app
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'public/system/views/index.html'
                })
                .state('auth', {
                    templateUrl: 'public/auth/views/index.html'
                })
                .state('acidentecreate', {
                    url: '/acidente/create',
                    templateUrl: 'public/system/views/acidente/create.html'
                })
                .state('acidenteedit', {
                    url: '/acidente/edit/:idAcidente',
                    templateUrl: 'public/system/views/acidente/edit.html'
                })

                .state('acidenteshow', {
                    url: '/acidente/show/:idAcidente',
                    templateUrl: 'public/system/views/acidente/show.html'
                });
        }
    ]);
