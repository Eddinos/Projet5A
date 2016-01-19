angular.module('App').controller('panelElementsCtrl',panelElementsCtrFnt);

panelElementsCtrFnt.$inject=['$scope', 'panel', '$http', '$compile'];



function panelElementsCtrFnt($scope, panel, $http, $compile)
{
	$scope.elementList = [];
	if(localStorage.elementList == null)
	{
		localStorage.elementList = [];
	}
	if(localStorage.elementList.length > 0){
		for(elt in JSON.parse(localStorage["elementList"]))
		{
			console.log("wesh" + JSON.parse(localStorage["elementList"])[elt]);
			$scope.elementList.push(JSON.parse(localStorage["elementList"])[elt]);
		}
	}
	console.log($scope.elementList);

	$scope.element = {};

	$('#myCarousel').ready(function(){
		loadPersonalContents();
	});

	$('#carouselItems').bind('click', function(event) {
		console.log(event.target);
		$scope.element.content = {};
		$scope.element.content.name = $('#'+event.target.id).attr("name");
		$scope.element.content.id = event.target.id;
		$scope.$apply();
	});

	
	var loadPersonalContents = function(){
		/////appel serveur
		/////recuperation du json
		var pourTester = JSON.parse(localStorage.contents);
		var ct = 1;
		var lastItemId = "";
		for (var i in pourTester) {
			var content;
			if(pourTester[i].type == "image")
			{
				content = $('<img />', {
					id: 'photo' + i,
					src: pourTester[i].code,
					class: "img-responsive selectedImg",
					name: pourTester[i].name
				});
			}
			else if(pourTester[i].type == "video")
			{
				content = $('<video />', {
					id: 'video' + i,
					src: pourTester[i].code,
					type: pourTester[i].code.split(",")[0].split(":")[1].split(";")[0],
					class: "img img-responsive selectedImg",
					name: pourTester[i].name
				}); 
			}console.log(content);
			var link = $('<a />', {
				href: "#" + content[0].id
			});
			var thumbnail = $('<div />', {
				class: "col-sm-3"
			});
			content.appendTo(link);
			link.appendTo(thumbnail);
			if(i<=3) thumbnail.appendTo($('#activeItems'));
			if(i>3){

				if(i%4 == 0){
					ct++;
					lastItemId = "item" + ct;
					var itemChildren = $('<div />', {
						class: "row",
						id: lastItemId
					})
					var newItem = $('<div />', {
						class: 'item'
					});
					thumbnail.appendTo(itemChildren);
					itemChildren.appendTo(newItem);
					newItem.appendTo($('#carouselItems'));
				} 
				else{
					thumbnail.appendTo($('#' + lastItemId));
				}
			}
		};
	};




	$scope.addElement = function(element){
		if($scope.elementList.length <= 3)
		{
			var name = element.name;
			var type = element.type;
			var content = element.content;
			var priority = element.priority;
			for(i in $scope.elementList)
			{
				if($scope.elementList[i].priority == priority)
				{
					alert("An element already have the same priority");
					return;
				}
				else if($scope.elementList[i].name == name)
				{
					alert("An element already have the same name");
					return;
				}
			}
			var elementToAdd = {name, type, content, priority};

			$scope.elementList.push(elementToAdd);
			localStorage["elementList"] = JSON.stringify($scope.elementList);
			console.log("localStorage : " + localStorage["elementList"])
		}
		else
		{
			alert("Unfortunately, you cannot add any more element to this panel");
		}
	};

	$scope.deleteElement = function(element){
		var i = $scope.elementList.indexOf(element);
		$scope.elementList.splice(i, 1);
		localStorage["elementList"] = JSON.stringify($scope.elementList);
	};

	
	$scope.confirmElements = function(){
		$scope.elementList.sort(function(a, b){
			return a.priority - b.priority;
		});
		document.location.href="preview.html"
	};

	$scope.newContent = function(){
		$scope.element.content = {};
	};

	$scope.editPreview = function(){
		$scope.elementList.sort(function(a, b){
			return b.priority - a.priority;
		});
		$scope.$apply();
		localStorage["elementList"] = JSON.stringify($scope.elementList);
	};

}