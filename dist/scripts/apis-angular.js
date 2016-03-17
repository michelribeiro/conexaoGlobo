var app = angular.module("App", []);

app.controller("listCtrl", function($scope, $http) {
    $scope.importJson = function() {
        $http.get("https://api.github.com/users/globocom/repos").success(function(dados) {
            $scope.list = dados;
        });
    }, $scope.importJson();
});