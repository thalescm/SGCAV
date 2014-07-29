'use strict';

// Cadastrar novo acidente
angular.module('mean.system').controller('NovoAcidenteCtrl', 
  ['$scope','$rootScope', '$http', '$location', 'Global', 
  function ($scope, $rootScope, $http, $location, Global) 
  {
    $scope.acidente = {
      endereco: {
        rua: 'Francisco Preto',
        complemento: '46, BL 02',
        bairro: 'Vila Sonia',
        cidade: 'Sao Paulo',
        estado: 'SP'
      },
      descricao: 'muito foda',
      numVitimas: 2,
      numVeiculos: 0
    };

    $scope.cadastrar = function () {
      $http.post('/acidentes/create', 
        { 
         endereco: $scope.acidente.endereco,
         descricao: $scope.acidente.descricao,
         veiculos: $scope.acidente.numVeiculos,
         vitimas: $scope.acidente.numVitimas,
         idAcidente: 0
        })
        .success(function(response) {
            $location.path('/acidente/edit/' + response.idAcidente);
        })
        .error(function(error) {
            $scope.acidenteError = error;
        });
    };
  }
]);
