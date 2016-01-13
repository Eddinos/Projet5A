angular.module('App').controller('panelElementsCtrl',panelElementsCtrFnt);

panelElementsCtrFnt.$inject=['$scope', 'panel', '$http'];



function panelElementsCtrFnt($scope, panel, http)
{
	$scope.elementList = [];
	if(localStorage.elementList == null)
	{
		localStorage.elementList = [];
	}
	if(localStorage.elementList.length > 0){
		for(elt in JSON.parse(localStorage["elementList"]))
		{
			console.log(JSON.parse(localStorage["elementList"])[elt]);
			$scope.elementList.push(JSON.parse(localStorage["elementList"])[elt]);
		}
	}
	console.log($scope.elementList);
	$scope.fd = new FormData();
	$scope.myvar = "meh";


	$scope.addElement = function(element){
		/*element.name = name;
		element.type = type;*/
		var name = element.name;
		var type = element.type;
		var content = element.content;
		var priority = element.priority;
		var elementToAdd = {name, type, content, priority};
		
		$scope.elementList.push(elementToAdd);
		localStorage["elementList"] = JSON.stringify($scope.elementList);
		console.log("localStorage : " + localStorage["elementList"])
	};

	$scope.deleteElement = function(element){
		var i = $scope.elementList.indexOf(element);
		$scope.elementList.splice(i, 1);
		localStorage["elementList"] = JSON.stringify($scope.elementList);
	};

	$scope.uploadFile = function(files) {
    //var fd = new FormData();
    //Take the first selected file
    $scope.fd.append("file", files[0]);
    console.log(files[0]);
    console.log($scope.fd);

	};

	$scope.confirmElements = function(){
		$scope.elementList.sort(function(a, b){
			return a.priority - b.priority;
		})
		document.location.href="preview.html"
	};
}