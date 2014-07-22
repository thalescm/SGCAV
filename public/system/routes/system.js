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
                .state('acidente.create', {
                    url: '#!/acidente/create',
                    templateUrl: 'public/system/views/acidente/create.html'
                });
        }
    ])
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);
