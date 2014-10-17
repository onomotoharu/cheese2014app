var cheeseControllers = angular.module('cheeseControllers',[]);

// var endpoint = "https://private-8f017-cheesev2.apiary-mock.com/api/v1";
var endpoint = "http://fmap.d.r3n.cc/api/v1";
var imgSrc = "http://winvelab.net/cheese/img/";

cheeseControllers.controller('TutorialCtrl',function($scope,$http,$rootScope, $routeParams, $location, guid){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = ""
  $rootScope.headerIconRight = ""
  $rootScope.title = "";
  $scope.page = 1;
  $scope.next= function(){
    localStorage.launchTimes++;

    if(localStorage.api_token==undefined&&localStorage.api_token_secret==undefined){
      var url = endpoint +  "/users/create";
      var screen_id = guid();
      var password = guid();
      var data = {"user" : {"screen_id": screen_id, "password": password, "password_confirmation" : password}};
      $http.post(url,data).
      success(function(data){
        localStorage.screen_id = screen_id;
        localStorage.password = password;
        localStorage.api_token = data.api_token;
        localStorage.api_token_secret = data.api_token_secret;
      })
      .error(function(data,status){
        console.log(data);
        console.log(status);
      });      
    }
    $location.path("/");
  }
});


cheeseControllers.controller('RecommendCtrl',function($scope,$http,$rootScope, $routeParams,$location, AuthorizationHeader){ 
  $rootScope.headerShow = true;
  $rootScope.footerShow = true;
  $rootScope.isViewAnimate = ($rootScope.isNextViewAnimate == undefined)? " " : $rootScope.isNextViewAnimate;
  $rootScope.headerIconLeft = "";
  $rootScope.headerIconRight = "";
  $rootScope.title = "";
  $rootScope.location = "/";

  //setup check
  if(localStorage.launchTimes == 0 || localStorage.launchTimes == undefined ){
    $location.path("/tutorial");
  }

  //fillCard
  $scope.fillCardLoading = false;
  $scope.fillCard = function(){
    if($rootScope.recipes == undefined){
      $rootScope.recipes = [];
    }
    if($rootScope.recipes.length < 5 && $scope.fillCardLoading==false){
      $scope.fillCardLoading == true;
      var url = endpoint +  "/recommend/?limit=5";
      AuthorizationHeader.setCredentials();
      $http.get(url).
      success(function(data){
        $rootScope.recipes = data.concat($scope.recipes);
        $scope.fillCard();
        $scope.fillCardLoading == false;
      })
      .error(function(data,status){
        console.log(data);
        console.log(status);
      });
    }
  }


  //init
  $scope.fillCard();

  // function fillCard
  $scope.removeCard = function(e){
    $rootScope.recipes.splice(e.attr("index"),1);
    e.remove();
    $scope.fillCard();
  }

  $rootScope.carouselPrev = function(e) {
    $rootScope.isViewAnimate = "view-animate";
    $rootScope.isNextViewAnimate = "view-animate";
    var recipe_id = $scope.recipes[ e.attr("index") ].id;
    $rootScope.$apply(function() { $location.path("/recipe/" + recipe_id); });
    $scope.removeCard(e);
  };
    
  $rootScope.carouselNext = function(e) {
    $scope.removeCard(e);    
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


cheeseControllers.controller('RecipeCtrl',function($scope,$http,$rootScope, $routeParams, $location, AuthorizationHeader,$sce){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.title = "";
  $rootScope.isViewAnimate = ($rootScope.isNextViewAnimate == undefined)? " " : $rootScope.isNextViewAnimate;
  $rootScope.headerIconLeft = "fa-chevron-circle-left";
  $rootScope.headerIconRight = "";

  // $scope.recipe_id = $routeParams.recipe_id;

  $scope.recipe_id = "1000000032";

  var url = endpoint +  "/recipes/" + $scope.recipe_id +"/detail";

  $scope.loaded = false;
  $scope.recipe = {};
  AuthorizationHeader.setCredentials();
  $http.get(url).
  success(function(data){
    $scope.recipe = data;
    $scope.recipe.default_picture_name = $sce.trustAsResourceUrl(imgSrc + $scope.recipe.default_picture_name);
    $scope.recipe.id = $scope.recipe_id;
    $scope.loaded = true;
  });    

  $scope.done = function(){
    $rootScope.currentRecipe = $scope.recipe;
    $rootScope.isViewAnimate = "view-animate";
    $rootScope.isNextViewAnimate = "view-animate";
    $location.path("/post");
    // window.scrollTop();
  }
  $rootScope.back = function(){
    
    var url = endpoint +  "/recipes/" + $scope.recipe_id +"/positive";
    AuthorizationHeader.setCredentials();
    $http.post(url).
    success(function(data){
      console.log("fav!")
    });

    $rootScope.isViewAnimate = "view-animate-back"
    $rootScope.isNextViewAnimate = "view-animate-back"
    $location.path("/");
  }
});

cheeseControllers.controller('PostCtrl',function($scope,$http,$rootScope, $routeParams, $location, AuthorizationHeader){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-chevron-circle-left"
  $rootScope.headerIconRight = ""
  $rootScope.title="投稿"
  $rootScope.isViewAnimate = ($rootScope.isNextViewAnimate == undefined)? " " : $rootScope.isNextViewAnimate;

  $scope.recipe = $rootScope.currentRecipe;
  $rootScope.currentRecipe = null;

  $scope.star
  $scope.setstar = function(stars){
    $scope.star = stars;
  }

  $scope.post = function(){
    var url = endpoint +  "/recipes/" + $scope.recipe.id +"/made/?" + $scope.star;
    var data = {"comment" : $scope.comment};

    AuthorizationHeader.setCredentials();
    $http.post(url,data).
    success(function(data){
      console.log(data);
      $location.path("/postafter");
      $rootScope.postInformation = {"recipe": $scope.recipe, "comment" : $scope.comment, "star" : $scope.star};
    });    

  }

  $rootScope.back = function(){
    $rootScope.isViewAnimate = "view-animate-back"
    $rootScope.isNextViewAnimate = "view-animate-back"
    $location.path("/recipe/" + $scope.recipe.id);
  }
});


cheeseControllers.controller('PostafterCtrl',function($scope,$http,$rootScope, $routeParams, $location, $cordovaSocialSharing){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = ""
  $rootScope.headerIconRight = ""
  $rootScope.title="投稿しました！"

  $scope.postInformation = $rootScope.postInformation;
  $rootScope.postInformation = null;

  $scope.star = $scope.postInformation.star;


  $scope.finish = function(){
    $rootScope.isViewAnimate = "view-animate";
    $rootScope.isNextViewAnimate = "view-animate";
    $location.path("/mypage");
  }


  $scope.twitter = function(){
    var comment = $scope.postInformation.comment + " / " + (new Array($scope.star+1).join("★")) + (new Array(6-$scope.star).join("☆")) +" / "+ $scope.postInformation.recipe.name + " #cheese";
    $cordovaSocialSharing
      .shareViaTwitter(comment, $scope.postInformation.recipe.default_picture_name)
      .then(function(result) {
        // Success! 
      }, function(err) {
        // An error occured. Show a message to the user
      });
  }

});


cheeseControllers.controller('MypageCtrl',function($scope,$http,$rootScope, $routeParams, $location, AuthorizationHeader){
  $rootScope.headerShow = true;
  $rootScope.footerShow = true;
  $rootScope.headerIconLeft = ""
  $rootScope.headerIconRight = "fa-cog"
  $rootScope.title="マイページ"
  $rootScope.location = "mypage";

  var url = endpoint + "/my/checked_recipes";
  // var url = endpoint + "/users/" + localStorage.screen_id + "/profile";
  // /api/v1/my/checked_recipes
  AuthorizationHeader.setCredentials();
  $http.post(url).
  success(function(data){
    $scope.profile = data;
    console.log(data);
  });  

  $scope.column = "done"; //done, want, hate

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

  $rootScope.tutorial = function(){
    $location.path("/tutorial");
  }

  $rootScope.logout = function(){
    localStorage.clear();
    localStorage.launchTimes = 0;
    $location.path('/'); 
  }

  times = [] 
  $scope.easteregg = function(){
    times.push(new Date());
    diff = times[times.length-1] - times[times.length-5];
    if(diff < 1000){
      alert(localStorage.screen_id);
    }
  }

});








