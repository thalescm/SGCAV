'use strict';

angular.module('mean.system').controller('IndexController', 
  ['$scope','$rootScope', '$http', '$location', 'Global', 
  function ($scope, $rootScope, $http, $location, Global) 
  {
    $scope.global = Global;
    $scope.user = $rootScope.user || {};

    $scope.register = function (ev) {

      debugger;
      $http.post('/register', {
                    email: $scope.user.email,
                    password: $scope.user.password,
                    confirmPassword: $scope.user.confirmPassword,
                    username: $scope.user.username,
                    name: $scope.user.name,
                    role: $scope.user.role
                })
                    .success(function() {
                        // authentication OK
                        $scope.registerError = 0;
                        $rootScope.user = $scope.user;
                        $rootScope.$emit('loggedin');
                        $location.url('/');
                    })
                    .error(function(error) {
                        // Error: authentication failed
                        if (error === 'Username already taken') {
                            $scope.usernameError = error;
                        } else {
                            $scope.registerError = error;
                        }
                    });
    };

    $scope.editar = function (ev) {
      $http.post('/edit', $scope.user)
                    .success(function() {
                        // authentication OK
                        $scope.registerError = 0;
                        $rootScope.user = $scope.user;
                        $rootScope.$emit('loggedin');
                        $location.url('/');
                    })
                    .error(function(error) {
                        // Error: authentication failed
                        if (error === 'Username already taken') {
                            $scope.usernameError = error;
                        } else {
                            $scope.registerError = error;
                        }
                    });
    };

    $scope.editTapped = function () {
      document.getElementsByClassName('index-edit').css('display', 'block');
      document.getElementsByClassName('index-register').css('display', 'none');
    };

    $scope.cadastroTapped = function () {
      document.getElementsByClassName('index-edit').css('display', 'none');
      document.getElementsByClassName('index-register').css('display', 'block');
    };

    $scope.novoAcidente = function() {
        $location.path('acidente/create');
    };

}]);
