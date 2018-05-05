/**
 * 
 */
var app=angular.module("app",['ngRoute','ngCookies'])
app.config(function($routeProvider){
	$routeProvider
	.when('/register',{
		templateUrl:'views/registrationform.html',
		controllers:'usercontroller'
	})
	.when('/login',{
		templateUrl:'views/login.html',
		controllers:'usercontroller'
	})
	.when('/editprofile',{
		templateUrl:'views/updateform.html',
		controllers:'usercontroller'
	})
	.when('/home',{
		templateUrl:'views/home.html'
	})
	.when('/addjob',{  //V to C
		templateUrl:'views/jobform.html',//ng-model
		controllers:'Jobcontroller' //$scope.job
	})
	.when('/getalljobs',{//C to V
		templateUrl:'views/jobslist.html',  //ng-repeat
		controllers:'JobController'// $scope.jobs
	})
	.when('/getjob/:id',{// C to V
		templateUrl:'views/jobdetail.html',
		controllers:'JobController'//$scope.job=response.data
	})
	.when('/addblog',{
		templateUrl:'views/blogform.html',
		controllers:'blogcontroller'
	})
	.when('/getblogs',{
		templateUrl:'views/blogslist.html',
		controllers:'blogcontroller'
	})
	.when('/chat',{
		templateUrl:'views/chat.html',
		controller:'ChatCtrl'
	})

	.when('/getblog/:id',{
		templateUrl:'views/blogpostdetail.html',
		controllers:'blogpostdetailcontroller'
	})
	.otherwise({
		templateUrl:'views/login.html',
		controllers:'usercontroller'
	})
})
app.run(function($rootScope,$cookieStore,userService,$location){
	if($rootScope.loggedInUser==undefined)
		$rootScope.loggedInUser=$cookieStore.get('loggedInUser')
		
		$rootScope.logout=function(){
		userService.logout().then(function(response){
			    $rootScope.successMessage="LoggedOut Successfully.."
			    delete $rootScope.loggedInUser
			    $cookieStore.remove("loggedInUser")
				$location.path('/login')
		},function(response){
			$rootScope.errorMessage="Please login.."
				$location.path('/login')
		})
	}
	
})
