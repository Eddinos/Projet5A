angular.module('panelService', []).service('panel', panelFnc);

function panelFnc() 
{
	var elements=[];

	function getElements(){
		return elements;
	};

	var fncContainer={
	 	getElements:getElements
 	};

 	return fncContainer;

}