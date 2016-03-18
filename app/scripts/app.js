
var app = angular.module('App', ['angularUtils.directives.dirPagination']);

app.controller('listCtrl', function ($scope, $http) {

    $scope.importJson = function() {

        $http.get('https://api.github.com/users/globocom/repos').success(function(dados) {
            $scope.list = dados;
        });
    };

    $scope.quantity = 20;
    $scope.importJson();

    $scope.abrirSubList = function(list) {

        $http.get(list.url+'/commits').success(function(dados) {
            $scope.commits = dados;
            console.log(list.url+'/commits');
        });
    };
});