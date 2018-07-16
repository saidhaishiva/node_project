var myApp = angular.module('ngApp', []);
 myApp.controller('AppCtrl', AppCtrl);

 function AppCtrl($scope, $http) {
	//console.log("Hai");
	var refresh = function(){
	$http({
      method: 'GET',
      url: '/contactlist'
   }).then(function (response){
	  console.log("I got data i requested");
		console.log(response.data);
		$scope.contactlist = response.data;
		$scope.contact = {};
   },function (error){

   });
   
   };
   
   refresh();
   
	
	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactlist',$scope.contact).then(function (response){
			console.log(response);
			refresh();
		});
	};
	
	$scope.remove = function(id){
		//console.log(id);
		$http.delete('/contactlist/' + id).then(function (response){
			console.log(response);
			refresh();
		});
	};
	
	$scope.edit = function(id){
		//console.log(id);
		$http.get('/contactlist/' + id).then(function (response){
			console.log(response.data);
			$scope.contact = response.data;
			//refresh();
		});
	};
	
	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id,$scope.contact).then(function (response){
			console.log(response);
			refresh();
		});
	};
	
	$scope.clear = function(){
		$scope.contact = {};
	};
	
 }