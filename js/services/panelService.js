angular.module('panelService', []).service('panel', panelFnc);

mediaFnc.$inject=['$http','$q'];

function panelFnc($http, $q) 
{
	var fncContainer={
	 	saveElements:saveElements
 	};


 	function saveElements(){
 		var dataToSend = JSON.parse(localStorage.elementList);
		var deferred = $q.defer();
		$http.post('#', dataToSend)
			.success(function(data, status, headers, config)
			{
				deferred.resolve("success");
			})
			.
			error(function(data, status, headers, config)
			{
				deferred.reject("failure");
			});

		contentToSend = [];
		return deferred.promise;
 	}

 	return fncContainer;

}