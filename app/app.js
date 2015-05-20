'use strict';

var SearchFourSquareCtrl = function(dataservice, $resource) {
  var vm = this;
  vm.search = search;
  vm.venues = [];
  vm.errorMessage;  

  function search(keyword, clientId, clientSecret, locale) {
  	vm.venues = [];
  	vm.errorMessage = '';
  	return getVenues(keyword, clientId, clientSecret, locale).then(function() {
  		console.log('Succesfully obtained venues for keyword=', keyword);
  	})
  }  

  function getVenues(keyword, clientId, clientSecret, locale) {
  	return dataservice.getVenues(keyword, clientId, clientSecret, locale).then(function(venues) {
	  if (angular.isArray(venues) && venues.length) {
	  	vm.venues = venues;
	  } else {
	  	vm.errorMessage = getErrorMessage(venues);
	  }
  	})
  }

  function getErrorMessage(venues) {
  	return angular.isArray(venues) ? 'Search yielded 0 results' : venues;
  }
};

SearchFourSquareCtrl.$inject = ['dataservice', '$resource'];

dataservice.$inject = ['$resource'];

function dataservice($resource) {
  return {
  	getVenues: getVenues
  }  

  function getVenues(keyword, clientId, clientSecret, locale) {
  	return $resource(buildURL(keyword, clientId, clientSecret, locale), {}, {})
	         .get()
	         .$promise
	         .then(getVenuesSuccess)
	         .catch(getVenuesFailure);  

  	function getVenuesSuccess(fourSquareResponse) {
	  return fourSquareResponse.response.venues;
  	}  

  	function getVenuesFailure(error) {
	  console.error('XHR Failed for getVenues', error.statusText);
	  return error.statusText;
  	}
  }  

  function buildURL(keyword, clientId, clientSecret, locale) {
  	return 'https://api.foursquare.com/v2/venues/search?client_id=' + clientId + '&client_secret=' + clientSecret + '&near=' + locale + '&query=' + keyword + '&v=20140806&m=foursquare&limit=10';
  }
}

angular.module('app', ['ngRoute', 'ngResource']).
controller('SearchFourSquareCtrl', SearchFourSquareCtrl).
factory('dataservice', dataservice)
