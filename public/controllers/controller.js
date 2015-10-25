var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl',function ($scope, $http){
    console.log("Estou no controller!");

var refresh = function() {
    //Requisição GET
    $http.get("/contactlist").success(function(response) {
    	console.log("Peguei os dados");
    	$scope.contactlist = response;
    	$scope.contact = "";
    }); 
}

refresh();

//Butão de adicionar POST
$scope.addContact = function () {
console.log("Adicionado contato: " + $scope.contact);
    $http.post('/contactlist',$scope.contact).success(function(response) {
    	console.log(response);
    	refresh();
    });
}

//Butão de remover DELETE
$scope.rmvContact = function(id) {
	console.log("ID: "+id+" enviado");
    $http.delete('/contactlist/' + id).success(function(response) {
        console.log(response+" removido");
        refresh();
    });
}

//Butão de editar GET
$scope.edtContact = function(id) {
    console.log("Editar contato "+ id);
    $http.get("/contactlist/"+id).success(function(response) {
        console.log("Contato editado para: "+response);
        $scope.contact = response;
    });
}

//Butão de atualizar PUT
$scope.updContact = function() {
	console.log($scope.contact._id);
    $http.put('/contactlist/'+$scope.contact._id, $scope.contact).success(function(response) {
        console.log("Contato atualizado para: "+response);
        refresh();
    });
}

//Butão de Limpar
$scope.dsltContact = function () {
    $scope.contact = "";
}

});