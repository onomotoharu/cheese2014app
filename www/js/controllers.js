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


  $scope.signIn = function(){
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
  }
  $scope.signIn();

  $scope.play = function(){
    $("#tutorial_movie")[0].play();
  }

  $scope.next= function(){
    localStorage.launchTimes++;
    $scope.signIn();
    $location.path("/enquete");
  }
});

cheeseControllers.controller('EnqueteCtrl',function($scope,$http,$rootScope, $routeParams,$location, AuthorizationHeader, $sce){ 
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.isViewAnimate = ($rootScope.isNextViewAnimate == undefined)? " " : $rootScope.isNextViewAnimate;
  $rootScope.headerIconLeft = "";
  $rootScope.headerIconRight = "";
  $rootScope.title = "いつも作ってる料理を教えて！";
  $rootScope.location = "/";
  $rootScope.setting = function(){};
  $rootScope.back = function(){};

  recipeFormat = function(data,recipe_id){
    recipe = data;
    recipe.image_url = $sce.trustAsResourceUrl(imgSrc + recipe.default_picture_name);
    recipe.id = recipe_id;
    recipe.screen_ingredients = "";
    $.each(recipe.foods, function(){
      recipe.screen_ingredients += this.screen_name+ ", ";
    });
    if(recipe.screen_ingredients.length > 45){
      recipe.screen_ingredients = recipe.screen_ingredients.substring(0,43) + "..."
    }
    return recipe;
  }
  $scope.recipes = [];
  recipe_ids = [1000000216,1000000216,1000000216,1000000216,1000000216,1000000216];
  AuthorizationHeader.setCredentials();
  $.each(recipe_ids,function(){
    var url = endpoint +  "/recipes/" + this +"/detail";
    $http.get(url).
    success(function(data){
      recipe = recipeFormat(data,this)
      $scope.recipes.push(recipe);
      console.log($scope.recipes);
      // $scope.recipe = [data];
    });  
  })

  $rootScope.likeOrNopeIndicator = function(deltaXRatio){
    if(deltaXRatio > 0 ){
      $(".recommend_card_like").css('opacity',0);
      $(".recommend_card_nope").css('opacity',deltaXRatio * 1.8);  
    }else{
      $(".recommend_card_like").css('opacity',deltaXRatio * -1.8);
      $(".recommend_card_nope").css('opacity',0);
    }
  }  

  $scope.removeCard = function(e){
    $scope.recipes.splice(e.attr("index"),1);
    e.remove();
  }

  $rootScope.carouselPrev = function(e) {
    var recipe_id = $scope.recipes[ e.attr("index") ].id;
    var url = endpoint +  "/recipes/" + recipe_id +"/positive";
    AuthorizationHeader.setCredentials();
    $http.post(url).
    success(function(data){
      console.log("fav!")
    });

    $scope.removeCard(e);    
  };
    
  $rootScope.carouselNext = function(e) {
    var recipe_id = $scope.recipes[ e.attr("index") ].id;
    var url = endpoint +  "/recipes/" + recipe_id +"/negative";
    AuthorizationHeader.setCredentials();
    $http.post(url).
    success(function(data){
      console.log("fav!")
    });

    $scope.removeCard(e);    
  };

  $scope.next= function(){
    $location.path("/");
  }

});




cheeseControllers.controller('RecommendCtrl',function($scope,$http,$rootScope, $routeParams,$location, AuthorizationHeader, $sce){ 
  $rootScope.headerShow = true;
  $rootScope.footerShow = true;
  $rootScope.isViewAnimate = ($rootScope.isNextViewAnimate == undefined)? " " : $rootScope.isNextViewAnimate;
  $rootScope.headerIconLeft = "";
  $rootScope.headerIconRight = "";
  $rootScope.title = "";
  $rootScope.location = "/";
  $rootScope.setting = function(){};
  $rootScope.back = function(){};



  //setup check
  if(localStorage.launchTimes == 0 || localStorage.launchTimes == undefined ){
    $location.path("/tutorial");
  }

  //fillCard
  $scope.fillCard = function(){
    if($rootScope.recipes == undefined){
      $rootScope.recipes = [];
    }
    console.log($rootScope.recipes.length)


    if($rootScope.recipes.length < 5){
      var url = endpoint +  "/recommend/?limit=20";
      AuthorizationHeader.setCredentials();
      $http.get(url).
      success(function(data){
        console.log(data);

        $.each(data,function(){
          this.image_url = $sce.trustAsResourceUrl(imgSrc + this.image_url);

          var screen_ingredients = "";
          $.each(this.ingredients, function(){
            screen_ingredients += this.screen_name+ ", ";
          });
          
          if(screen_ingredients.length > 45){
            screen_ingredients = screen_ingredients.substring(0,43) + "..."
          }

          this.screen_ingredients = screen_ingredients;

        });

        $rootScope.recipes = data.concat($scope.recipes);
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
    var recipe_id = $scope.recipes[ e.attr("index") ].id;
    var url = endpoint +  "/recipes/" + recipe_id +"/negative";
    AuthorizationHeader.setCredentials();
    $http.post(url).
    success(function(data){
      // console.log("fav!")
    });

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
  $rootScope.setting = function(){}

  $scope.recipe_id = $routeParams.recipe_id;

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
    // $location.path("/");
    history.back();
  }
});

cheeseControllers.controller('PostCtrl',function($scope,$http,$rootScope, $routeParams, $location, AuthorizationHeader){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-chevron-circle-left"
  $rootScope.headerIconRight = ""
  $rootScope.title="投稿"
  $rootScope.setting = function(){}

  $rootScope.isViewAnimate = ($rootScope.isNextViewAnimate == undefined)? " " : $rootScope.isNextViewAnimate;

  $scope.recipe = $rootScope.currentRecipe;
  $rootScope.currentRecipe = null;

  $scope.star = 0;
  $scope.setstar = function(stars){
    $scope.star = stars;
  }


  var postInProgress = false;
  $scope.post = function(){

    if(postInProgress == true){
      return;
    }

    postInProgress = true;
    var url = endpoint +  "/recipes/" + $scope.recipe.id +"/made";
    var data = {"comment" : $scope.comment,"rate":$scope.star};

    AuthorizationHeader.setCredentials();
    $http.post(url,data).
    success(function(data){
      console.log(data);
      $location.path("/postafter");
      $rootScope.postInformation = {"recipe": $scope.recipe, "comment" : $scope.comment, "star" : $scope.star};
      postInProgress = false;
    }).error(function(){
      postInProgress = false;
    });    
  }

  $rootScope.back = function(){
    $rootScope.isViewAnimate = "view-animate-back"
    $rootScope.isNextViewAnimate = "view-animate-back"
    // $location.path("/recipe/" + $scope.recipe.id);
    history.back();
  }
});


cheeseControllers.controller('PostafterCtrl',function($scope,$http,$rootScope, $routeParams, $location, $cordovaSocialSharing){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = ""
  $rootScope.headerIconRight = ""
  $rootScope.title="投稿しました！"
  $rootScope.setting = function(){};
  $rootScope.back = function(){};


  $scope.postInformation = $rootScope.postInformation;
  $rootScope.postInformation = null;

  $scope.star = $scope.postInformation.star;


  $scope.finish = function(){
    $rootScope.isViewAnimate = "view-animate";
    $rootScope.isNextViewAnimate = "view-animate";
    $location.path("/mypage");
  }


  $scope.twitter = function(){
    var postcomment =  ($scope.postInformation.comment.length > 1)? $scope.postInformation.comment + " / " : "";
    var comment = postcomment + (new Array($scope.star+1).join("★")) + (new Array(6-$scope.star).join("☆")) +" / "+ $scope.postInformation.recipe.name + " #cheese";

    console.log($scope.postInformation.recipe.default_picture_name);

    $cordovaSocialSharing
      .shareViaTwitter(comment, $scope.postInformation.recipe.default_picture_name)
      .then(function(result) {
        // Success! 
      }, function(err) {
        // An error occured. Show a message to the user
      });
  }

});


cheeseControllers.controller('MypageCtrl',function($scope,$http,$rootScope, $routeParams, $location, AuthorizationHeader, $sce, DateFormatter){
  $rootScope.headerShow = true;
  $rootScope.footerShow = true;
  $rootScope.headerIconLeft = ""
  $rootScope.headerIconRight = "fa-cog"
  $rootScope.title="マイページ"
  $rootScope.location = "mypage";
  $rootScope.back = function(){};


  $scope.dateFormatter =  DateFormatter.toString;


  var url = endpoint + "/my/checked_recipes";
  AuthorizationHeader.setCredentials();
  $http.get(url).
  success(function(data){
    $scope.lists = data;

    console.log(data);

    var types = ["100", "301", "302"];
    for (var i = types.length - 1; i >= 0; i--) {
      $scope.lists[types[i]].reverse();

      $.each( $scope.lists[types[i]], function(){
        this.default_picture_name = $sce.trustAsResourceUrl(imgSrc + this.default_picture_name);
      } );
    };    

  });  

  if($scope.column == undefined){
    $scope.column = "done"; //done, want, hate    
  }


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

  $scope.recipe = function(id){
    console.log(id);
    $location.path("/recipe/" + id);
  }


    $scope.starStr = function(num){

    return (new Array(num+1).join("★") );

  }

});

cheeseControllers.controller('SettingCtrl',function($scope,$http,$rootScope, $routeParams, $location){
  $rootScope.headerShow = true;
  $rootScope.footerShow = false;
  $rootScope.headerIconLeft = "fa-chevron-circle-left"
  $rootScope.headerIconRight = ""
  $rootScope.title="設定"
  $rootScope.setting = function(){}


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








