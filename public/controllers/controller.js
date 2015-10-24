var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl',function ($scope, $http){
    console.log("Estou no controller!");

var refresh = function() {
    $http.get("/contactlist").success(function(response) {
    	console.log("Peguei os dados");
    	$scope.contactlist = response;
    	$scope.contact = "";
    }); 
}

refresh();

//Butão de adicionar
$scope.addContact = function () {
console.log("Adicionado contato: " + $scope.contact);
    $http.post('/contactlist',$scope.contact).success(function(response) {
    	console.log(response);
    	refresh();
    });
}

$scope.rmvContact = function() {
	console.log("Contato removido");
}

$scope.updContact = function() {
	console.log("Contato editado");
}

});