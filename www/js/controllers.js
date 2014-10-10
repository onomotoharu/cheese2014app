var cheeseControllers = angular.module('cheeseControllers',[]);

cheeseControllers.controller('RecommendCtrl',function($scope,$http,$rootScope, $routeParams,$location){
  $rootScope.headerShow = true;
  $rootScope.footerShow = true;
  $rootScope.isViewAnimate = ($rootScope.isNextViewAnimate == undefined)? " " : $rootScope.isNextViewAnimate;
  $rootScope.headerIconLeft = "";
  $rootScope.headerIconRight = "";
  $rootScope.title = "";
  $rootScope.location = "/";


  $rootScope.carouselPrev = function(e) {
    $rootScope.isViewAnimate = "view-animate";
    $rootScope.isNextViewAnimate = "view-animate";
    $rootScope.$apply(function() { $location.path("/recipe"); });
    e.remove();
  };
    
  $rootScope.carouselNext = function(e) {
    e.remove();
  };

  $rootScope.likeOrNopeIndicator = function(deltaXRatio){
    if(deltaXRatio > 0 ){
      $(".recommend_card_like").css('opacity',0);
      $(".recommend_card_nope").css('opacity',deltaXRatio * 1.8);  
    }else{
      $(".recommend_card_like").css('opacity',deltaXRatio * -1.8);
      $(".recommend_card_nope").css('opacity',0);
    }
  }

  $rootScope.mypage = function(){
    $rootScope.isViewAnimate = ""
    $rootScope.isNextViewAnimate = ""
    $location.path("/mypage");
  }

  $rootScope.home = function(){
    $rootScope.isViewAnimate = ""
    $rootScope.isNextViewAnimate = ""
    $location.path("/");
  }

});


cheeseControllers.controller('RecipeCtrl',function($scope,$http,$rootScope, $routeParams, $location){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.title = "";
  $rootScope.isViewAnimate = ($rootScope.isNextViewAnimate == undefined)? " " : $rootScope.isNextViewAnimate;
  $rootScope.headerIconLeft = "fa-chevron-circle-left";
  $rootScope.headerIconRight = "";

  $scope.done = function(){
    $rootScope.isViewAnimate = "view-animate";
    $rootScope.isNextViewAnimate = "view-animate";
    $location.path("/post");
  }
  $rootScope.back = function(){
    $rootScope.isViewAnimate = "view-animate-back"
    $rootScope.isNextViewAnimate = "view-animate-back"
    console.log(111);
    $location.path("/");
    // $location.path("/post");
  }
});

cheeseControllers.controller('PostCtrl',function($scope,$http,$rootScope, $routeParams, $location){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-chevron-circle-left"
  $rootScope.headerIconRight = ""
  $rootScope.title="投稿"

  $scope.setstar = function(stars){
    $scope.star = stars;
  }

  $scope.post = function(){
    $location.path("/mypage");
    // $window.location = "/mypage";
  }

  $rootScope.back = function(){
    $rootScope.isViewAnimate = "view-animate-back"
    $rootScope.isNextViewAnimate = "view-animate-back"
    console.log(111);
    $location.path("/recipe");
  }

});

cheeseControllers.controller('MypageCtrl',function($scope,$http,$rootScope, $routeParams, $location){
  $rootScope.headerShow = true;
  $rootScope.footerShow = true;
  $rootScope.headerIconLeft = ""
  $rootScope.headerIconRight = "fa-cog"
  $rootScope.title="マイページ"
  $rootScope.location = "mypage";


  $scope.column = "done";

  $rootScope.setting = function(){
    $rootScope.isViewAnimate = "view-animate";
    $rootScope.isNextViewAnimate = "view-animate";
    $location.path("/setting");
  }

  $rootScope.mypage = function(){
    $rootScope.isViewAnimate = ""
    $rootScope.isNextViewAnimate = ""
    $location.path("/mypage");
  }

  $rootScope.home = function(){
    $rootScope.isViewAnimate = ""
    $rootScope.isNextViewAnimate = ""
    $location.path("/");
  }

});

cheeseControllers.controller('SettingCtrl',function($scope,$http,$rootScope, $routeParams, $location){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-chevron-circle-left"
  $rootScope.headerIconRight = ""
  $rootScope.title="設定"

  $rootScope.back = function(){
    $rootScope.isViewAnimate = "view-animate-back"
    $rootScope.isNextViewAnimate = "view-animate-back"
    $location.path("/mypage");
   }
});




cheeseControllers.controller('TutorialCtrl',function($scope,$http,$rootScope, $routeParams, $location){
  // $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = ""
  $rootScope.headerIconRight = ""

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




