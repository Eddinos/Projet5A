angular.module('loginService', []).service('login', loginFnc);

loginFnc.$inject=['$http','$q'];

function loginFnc($http, $q) 
{
	var fncContainer={
		register:register, checkCompany:checkCompany, getUser:getUser, setUser:setUser
	};

	var user;

	function getUser()
	{
		return user;
	};

	function setUser(newUser)
	{
		user = newUser;
	}

	function register(company)
	{
		var deferred = $q.defer();
		$http.post('#', company)
		.success(function(data, status, headers, config)
		{
			deferred.resolve(company);
		})
		.
		error(function(data, status, headers, config)
		{
			deferred.reject("Registration failed");
		});
		return deferred.promise;
	};

	function checkCompany(company)
	{
		var deferred = $q.defer();

		//////////////////////////////////////////
		connectedUser = {
			name: "NamePourLinstant",
			mail: company.email
		}


		localStorage.connectedUser = JSON.stringify(connectedUser);
		//console.log(localStorage.connectedUser.name);

		$http.post('#', company)
		.success(function(data, status, headers, config)
		{
			deferred.resolve("Succesfully logged in");

		})
		.
		error(function(data, status, headers, config)
		{
			deferred.reject("Wrong email or password");
		});
		return deferred.promise;
	};

	return fncContainer;
}