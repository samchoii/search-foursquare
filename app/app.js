'use strict';

var SearchFourSquareCtrl = function($scope, dataservice, $resource) {
	var vm = this;
	vm.search = search;
	vm.venues = [];

	function search(keyword, client_id, client_secret, near) {
		return getVenues(keyword, client_id, client_secret, near).then(function() {
			console.log('Succesfully obtained venues for keyword=', keyword);
		})
	}

	function getVenues(keyword, client_id, client_secret, near) {
		return dataservice.getVenues(keyword, client_id, client_secret, near).then(function(venues) {
			vm.venues = venues;
			return vm.venues;
		})
	}
};

SearchFourSquareCtrl.$inject = ['$scope', 'dataservice', '$resource'];

dataservice.$inject = ['$resource'];

function dataservice($resource) {
	return {
		getVenues: getVenues
	}

	function getVenues(keyword, client_id, client_secret, near) {
		var url = 'https://api.foursquare.com/v2/venues/search?client_id=' + client_id + '&client_secret=' + client_secret + '&near=' + near + '&query=' + keyword + '&v=20140806&m=foursquare&limit=10';
		
		return $resource(url, {}, {}).get().$promise.then(getVenuesSuccess).catch(getVenuesFailure);

		function getVenuesSuccess(response) {
			return response.response.venues;
		}

		function getVenuesFailure(error) {
			console.error('XHR Failed for getVenues', error.data);
		}
	}
}

angular.module('app', ['ngRoute', 'ngResource']).
controller('SearchFourSquareCtrl', SearchFourSquareCtrl).
factory('dataservice', dataservice)
