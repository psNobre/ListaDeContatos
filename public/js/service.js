'use strict';

var meuApp = angular.module('meuApp');

meuApp.service('contatoService', function ($http, config) {
	
	this.getContatos = function () {
		return $http.get(config.baseUrl + "/contatos");
	}

	this.getOneContato = function (id) {
		return $http.get(config.baseUrl + "/contatos/"+id);
	}

	this.setContato = function (contato) {
		return $http.post(config.baseUrl + "/contatos", contato);
	}

	this.rmvContato = function (id) {
		return $http.delete(config.baseUrl + "/contatos/"+id);
	}

	this.updContato = function (id, contato) {
		return $http.put(config.baseUrl + "/contatos/"+id, contato);
	}
});