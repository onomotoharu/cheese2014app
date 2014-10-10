var cheeseControllers = angular.module('cheeseControllers',[]);

cheeseControllers.controller('RecommendCtrl',function($scope,$http,$rootScope, $routeParams,$location){
  $rootScope.headerShow = true;
  $rootScope.footerShow = true;
  $rootScope.isViewAnimate = ($rootScope.isNextViewAnimate == undefined)? " " : $rootScope.isNextViewAnimate;
  $rootScope.headerIconLeft = ""
  $rootScope.headerIconRight = ""
  $rootScope.title = "";

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
    history.back();
    // $location.path("/post");
  }
});

cheeseControllers.controller('PostCtrl',function($scope,$http,$rootScope, $routeParams, $location){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-chevron-circle-left"
  $rootScope.headerIconRight = ""
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

    $rootScope.back = function(){
    $rootScope.isViewAnimate = "view-animate-back"
    $rootScope.isNextViewAnimate = "view-animate-back"
    console.log(111);
    history.back();
    // $location.path("/post");
  }

});

cheeseControllers.controller('MypageCtrl',function($scope,$http,$rootScope, $routeParams){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-home"
  $rootScope.headerIconRight = "fa-cog"
  $rootScope.title="マイページ"
});

cheeseControllers.controller('SettingCtrl',function($scope,$http,$rootScope, $routeParams){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-home"
  $rootScope.headerIconRight = "fa-user"
  $rootScope.title="設定"
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




