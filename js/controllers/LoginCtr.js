angular.module('App').controller('loginCtrl',loginCtrFnt);

loginCtrFnt.$inject=['$scope', '$http', '$q', 'login'];

function loginCtrFnt($scope, $http, $q, login)
{
	$scope.addCompany = function(company)
	{
		console.log("company");
		console.log(company);
		var companyJson = angular.toJson(company, true);
		console.log(companyJson);
		
		var promise = login.register(companyJson)

		promise.then(function(name) 
		{
			
			alert("Welcome " + name);
		    

		}, 
		function(reason) 
		{
		  alert('Failed: ' + reason);
		}, 
		function(role) 
		{
		  alert('Got notification: ' + role);
		});
	};

	$scope.loginCompany = function(loginCompany)
	{
		login.checkCompany(loginCompany);
		var promise = login.checkCompany(loginCompany)

		promise.then(function(successMsg) 
		{
			alert(successMsg);
		    //localStorage.companyName = loginCompany.name;
		}, 
		function(reason) 
		{
		  //$('#connectedUserName').html(loginCompany.email.split('@')[0]);
		  //console.log($('connectedUserName'));
		  alert('Failed: ' + reason);
		}, 
		function(role) 
		{
		  alert('Got notification: ' + role);
		});
	};

	$scope.deconnect = function(){
		localStorage.connectedUser = { 	}
	};
}