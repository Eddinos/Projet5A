angular.module('mediaService', []).service('media', mediaFnc);

mediaFnc.$inject=['$http','$q'];

function mediaFnc($http, $q) 
{
	var fncContainer={
		addContent:addContent, saveContent:saveContent
	};

	var contentToSend = [];

	var contentData = {
		"type": "",
		"name": "",
		"companyName": "",
		"code": ""
	}


	function addContent(file, companyName){
		console.log(file);


		var reader = new FileReader();
		reader.onload = function(event) {
			var data = event.target.result;

			console.log(data);

			var newData = {
				"type": file.type.split('/')[0],
				"code": data, 
				"name": file.name,
				"companyName": "getFromServlet"
			};
			contentToSend.push(newData);
		};
		reader.readAsDataURL(file);
	}

	function saveContent()
	{
		localStorage.contents = JSON.stringify(contentToSend);
		var deferred = $q.defer();
		$http.post('#', contentToSend)
			.success(function(data, status, headers, config)
			{
				deferred.resolve("Contents successfully added to your list");
			})
			.
			error(function(data, status, headers, config)
			{
				deferred.reject("Addition of new content failed");
			});

		contentToSend = [];
		return deferred.promise;
	}

	return fncContainer;

}