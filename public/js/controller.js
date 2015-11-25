var meuApp = angular.module('meuApp',['ngMask']);

meuApp.controller('appCtrl',function ($scope, contatoService) {

	$scope.contatos = [];

	var carregarContatos = function () {
		contatoService.getContatos().success(function  (response) {
			$scope.contatos = response;
		});
	}	

	$scope.adicionaContato = function (contato) {
		contato.data = new Date();
		$scope.contatos.push(angular.copy(contato));
		delete $scope.contato;
		$scope.contatoForm.$setPristine();
	}

	$scope.deleteContato = function (contatos) {
		$scope.contatos = contatos.filter(function  (contato) {
			if (!contato.selecionado) return contato;
		});
	}

	$scope.hasContatosSelecionados = function (contatos) {
		return contatos.some(function (contato) {
			return contato.selecionado;
		});

	}
	$scope.ordenarPor = function  (campo) {
		$scope.criterioOrdenamento = campo;
		$scope.direcaoOrdenamento = !$scope.direcaoOrdenamento;
	}

	carregarContatos();
	
});