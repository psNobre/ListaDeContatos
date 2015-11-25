var meuApp = angular.module('meuApp');

meuApp.service('contatoService', function ($http) {
	this.getContatos = function () {
		return $http.get("http://localhost:3000/contatos");
	}
	
});