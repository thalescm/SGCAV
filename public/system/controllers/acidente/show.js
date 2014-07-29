'use strict';

// Cadastrar novo acidente
angular.module('mean.system').controller('ShowAcidenteCtrl', 
  ['$scope','$rootScope', '$http', '$location', '$stateParams', 'Global', 
  function ($scope, $rootScope, $http, $location, $stateParams, Global) 
  {
    $scope.acidente = {};
    $scope.acidenteError = '';

    $http.post('/acidente/get/', 
      {  
        idAcidente: $stateParams.idAcidente
      })
      .success(function(response) {
          debugger;
            $scope.acidente = response.acidente;
        })
      .error(function(error) {
          debugger;
          $scope.acidenteError = error;
      });
  }
]);
