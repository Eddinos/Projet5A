angular.module('App').controller('mediaContentCtrl',mediaContentCtrFnt);

mediaContentCtrFnt.$inject=['$scope', 'panel', '$http', '$q', 'media'];



function mediaContentCtrFnt($scope, panel, $http, $q, media)
{
	var imagePreview = document.getElementById("imagePreview");
	imagePreview.innerHTML = '';


	$scope.loadFile = function(files)
	{
		for(i in files)
		{
			var dataURLReader = new FileReader();
			dataURLReader.onload = function(event) 
			{
		        // Parse image properties
		        var dataURL = event.target.result;
		        contentType = dataURL.split(",")[0].split(":")[1].split(";")[0].split('/')[0];
		        
		        if(contentType == "image")
		        {
		        	var photo = $('<img />', {
		        		id: 'photo',
		        		src: dataURL,
		        		alt: '',
		        		class: "img-responsive"
		        	});
		        	photo.appendTo($('#imagePreview'));
		        }
		        else if(contentType == "video")
		        {
		        	console.log('une video ! ')
		        	var video = $('<video />', {
		        		id: 'video',
		        		src: dataURL,
		        		type: dataURL.split(",")[0].split(":")[1].split(";")[0],
		        		controls: true,
		        		class: "embed-responsive-item"
		        	});
		        	video.appendTo($('#imagePreview'));
		        }
		        else
		        {
		        	var video = new Application();
		        	video.src = dataURL;
		        	video.onload = function() {
		        		console.log("Image type: " + contentType);
		        		console.log("Image width: " + this.width);
		        		console.log("Image height: " + this.height);
		        		imagePreview.appendChild(this);
		        	};
		        }

		        
		    };
		    dataURLReader.readAsDataURL(files[i]);
		}

	};




	$scope.addFile = function(files) 
	{
	    //var fd = new FormData();
	    //Take the first selected file
	    //$scope.fd.append("file", files[0]);
	    var file = files[0];
	    media.addContent(file, "NamePourLinstant");
	    $scope.loadFile(files);
  
	};


	$scope.uploadFiles = function()
	{
		var promise = media.saveContent();
		promise.then(function(successMessage) 
	    {

	    	alert(successMessage)


	    }, 
	    function(reason) 
	    {
	    	alert('Failed: ' + reason);
	    });
	    
	}
    //reader.readAsBinaryString(file);
    //reader.readAsDataURL(file);

};
