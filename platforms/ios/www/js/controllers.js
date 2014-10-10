var cheeseControllers = angular.module('cheeseControllers',[]);

cheeseControllers.controller('RecommendCtrl',function($scope,$http,$rootScope, $routeParams,$location){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-home"
  $rootScope.headerIconRight = "fa-user"
  $rootScope.headerIconLeftClass = ""
  $rootScope.headerIconRightClass = ""  


    $rootScope.carouselPrev = function(e) {
      e.remove();
      Instagram.isInstalled(function (err, installed) {
          if (installed) {
              alert("Instagram is installed");
                    alert("hi");

          } else {
              alert("Instagram is not installed");
          }
      });
    
    };
    
    $rootScope.carouselNext = function(e) {
      $rootScope.$apply(function() { $location.path("/recipe"); });
    };
});


cheeseControllers.controller('RecipeCtrl',function($scope,$http,$rootScope, $routeParams, $location){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-chevron-circle-left"
  $rootScope.headerIconRight = ""
  $rootScope.headerIconLeftClass = ""
  $rootScope.headerIconRightClass = ""
  $scope.done = function(){
    $location.path("/post");
  }
});

cheeseControllers.controller('MypageCtrl',function($scope,$http,$rootScope, $routeParams){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-home"
  $rootScope.headerIconRight = "fa-cog"
  $rootScope.headerIconLeftClass = ""
  $rootScope.headerIconRightClass = ""
  $rootScope.title="マイページ"
});

cheeseControllers.controller('SettingCtrl',function($scope,$http,$rootScope, $routeParams){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-home"
  $rootScope.headerIconRight = "fa-user"
  $rootScope.headerIconLeftClass = ""
  $rootScope.headerIconRightClass = ""
  $rootScope.title="設定"
});


cheeseControllers.controller('PostCtrl',function($scope,$http,$rootScope, $routeParams, $location){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-home"
  $rootScope.headerIconRight = "fa-pencil-square"
  $rootScope.headerIconLeftClass = ""
  $rootScope.headerIconRightClass = "header_button_post"
  $rootScope.title="投稿"

  $scope.star = "fa-star-o"
  $scope.setstar = function(){
    $scope.star = "fa-star"
  }

  $scope.post = function(){
    $location.path("/mypage");
    // alert(1)
    // $window.location = "/mypage";
  }

});

cheeseControllers.controller('TutorialCtrl',function($scope,$http,$rootScope, $routeParams, $location){
  // $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = ""
  $rootScope.headerIconRight = ""
  $rootScope.headerIconLeftClass = ""
  $rootScope.headerIconRightClass = ""

  $scope.next2 = function(){
    $location.path("/tutorial2");
  }

  $scope.next3 = function(){
    $location.path("/tutorial3");
  }

  $scope.next4 = function(){
    $location.path("/tutorial4");
  }

  $scope.next5 = function(){
    $location.path("/tutorial5");
  }

  $scope.next6 = function(){
    $location.path("/tutorial6");
  }

  $scope.next7 = function(){
    $location.path("/tutorial7");
  }

  $scope.recommend = function(){
    $location.path("/");
  }


});




