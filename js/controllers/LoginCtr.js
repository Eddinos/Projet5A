angular.module('App').controller('loginCtrl',loginCtrFnt);

loginCtrFnt.$inject=['$scope','$log', '$window', '$http', '$q'];

function loginCtrFnt($scope, $log, $window, $http, $q)
{
	$scope.addCompany = function(company)
	{
		console.log("company");
		console.log(company);
		var companyJson = angular.toJson(company, true);
		console.log(companyJson);
		
		var deferred = $q.defer();
		$http.post('#', companyJson)
			.success(function(data, status, headers, config)
			{
				deferred.resolve(companyJson);
			})
			.
			error(function(data, status, headers, config)
			{
				deferred.reject("wrong login or password");
			});
			return deferred.promise;
	};

	$scope.loginCompany = function(login, pwd)
	{
		console.log(login + " et " + pwd);
	};
}