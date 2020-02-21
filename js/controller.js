var app = angular.module("omnistack", []);
app.controller("omnistackController", ['$scope', '$http', function ($scope, $http) {
  
  $scope.getUsers = function () {
    $http({
      method: "GET",
      url: "http://localhost:3333/devs"
    }).then(function mySuccess(response) {
      var users = response.data.dev;
      console.log('chegou');
      $scope.users = users;
      cancelAnimation()
    }, function myError(response) {
      console.log(response)
    });
  }
  $scope.insertUser = function insertUser() {
    var github_username = document.getElementById("username").value;
    var techs = document.getElementById("techs").value;
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    console.log(github_username)
    animation()
    $http({
      method: "POST",
      url: "http://localhost:3333/devs",
      data:{
        'github_username':github_username,
        'techs':techs,
        'latitude':latitude,
        'longitude':longitude
      }
    }).then(function mySuccess(response) {
      $scope.users = {};
      console.log("foi");
      $scope.getUsers();
      
    }, function myError(response) {
      console.log(response)
    });
  }
  function preencheLatitudeLongitude() {
    navigator.geolocation.getCurrentPosition((success) => {
      const {latitude, longitude} = success.coords;
      document.getElementById("latitude").value = (latitude);
      document.getElementById("longitude").value = (longitude);
  }, (error) => {
      console.log(error);
  }, {timeout: 30000});
  }

  preencheLatitudeLongitude();
  $scope.getUsers();
}]);
var intervalo;
var animation = function animation() {
  var header = document.getElementById("hehe");
  var headerText = document.getElementById("headerText");
  var body = document.getElementsByTagName("body");
  header.style.height = "100vmin";
  header.style.zIndex = "1000";
  intervalo = setInterval(function(){
    if(headerText.style.fontSize == "10vmin" ) {
      setTimeout(function(){},1000);    
      headerText.style.fontSize="5vmin";        
    } else {
      setTimeout(function(){},1000);    
      headerText.style.fontSize="10vmin";
    }   
  },650);
  body[0].style.overflowY="hidden";
}
var cancelAnimation = function cancelAnimation() {
  var header = document.getElementById("hehe");
  var headerText = document.getElementById("headerText");
  var body = document.getElementsByTagName("body");
  header.style.height = "12vmin";
  header.style.zIndex = "1000";
  headerText.style.fontSize="10vmin";
  body[0].style.overflowY="scroll";
  clearInterval(intervalo);
}