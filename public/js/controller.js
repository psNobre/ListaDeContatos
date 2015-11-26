'use strict';

var meuApp = angular.module('meuApp',['ngMask']);

meuApp.controller('appCtrl',function ($scope, contatoService) {

	$scope.contatos = [];

	var carregarContatos = function () {
		contatoService.getContatos().success(function  (response) {
			$scope.contatos = response;
			console.log(response);
			document.getElementById("btnupd").style.display = "none";
			document.getElementById("btnadd").style.display = "inline";
		});
	}	

	$scope.adicionaContato = function (contato) {
		contato.data = new Date();
		contatoService.setContato(contato).success(function (response){
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			carregarContatos();
		});
	}

	$scope.deleteContato = function (contatos) {
		var contatosParaRmv = contatos.filter(function  (contato) {
			if (contato.selecionado) return contato;
		});
		contatosParaRmv.forEach(function  (contato) {
			contatoService.rmvContato(contato._id).success(function (response){
				console.log(contato.nome + " Deletado com Sucesso")
			});
		});
		carregarContatos();
	}

	$scope.editarContato = function (id) {
		contatoService.getOneContato(id).success(function  (response) {
			$scope.contato = response;
			 document.getElementById("btnadd").style.display = "none";
			 document.getElementById("btnupd").style.display = "inline";
		});
	}

	$scope.atualizarContato = function (contato) {
		contatoService.updContato(contato._id, contato).success(function  (response) {
			console.log(response + " Atualizado com sucesso.");
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			carregarContatos();
			
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