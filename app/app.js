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
		// var 4sq_client_id = 'F3GXX5HYYU2SPB2UUCZHNB1G4HMMZIA55P3JVLQA5DM2UVRM'
		// var 4sq_client_secret = '14C11HCWX34Q3ADUS3Y3B14LVSR3PNYL1J4YMETGAJEFUOQU'
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
