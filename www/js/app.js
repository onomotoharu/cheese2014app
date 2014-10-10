var cheeseApp = angular.module('cheeseApp',[
	'ngRoute',
  'ngTouch',
	'cheeseControllers',
  'ngAnimate'
  // 'mobile-angular-ui'
	]);

cheeseApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/recommend.html',
        controller: 'RecommendCtrl'
      }).
      when('/recipe', {
        templateUrl: 'partials/recipe.html',
        controller: 'RecipeCtrl'
      }).
      when('/mypage', {
        templateUrl: 'partials/mypage.html',
        controller: 'MypageCtrl'
      }).
      when('/setting', {
        templateUrl: 'partials/setting.html',
        controller: 'SettingCtrl'
      }).
      when('/post', {
        templateUrl: 'partials/post.html',
        controller: 'PostCtrl'
      }).
      when('/tutorial', {
        templateUrl: 'partials/tutorial.html',
        controller: 'TutorialCtrl'
      }).
      when('/tutorial2', {
        templateUrl: 'partials/tutorial2.html',
        controller: 'TutorialCtrl'
      }).
      when('/tutorial3', {
        templateUrl: 'partials/tutorial3.html',
        controller: 'TutorialCtrl'
      }).
      when('/tutorial4', {
        templateUrl: 'partials/tutorial4.html',
        controller: 'TutorialCtrl'
      }).
      when('/tutorial5', {
        templateUrl: 'partials/tutorial5.html',
        controller: 'TutorialCtrl'
      }).
      when('/tutorial6', {
        templateUrl: 'partials/tutorial6.html',
        controller: 'TutorialCtrl'
      }).
      when('/tutorial7', {
        templateUrl: 'partials/tutorial7.html',
        controller: 'TutorialCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

cheeseApp.directive( "carouselItem", function($rootScope, $swipe){
  return function(scope, element, attrs){
      var startX = null;
      var startY = null;
      var endAction = "cancel";
      var carouselId = element;
      // parent().parent().attr("id");

      var translateAndRotate = function(x, y, z, deg){
        var accelo =  1.3
        x = x * accelo;
        y = y * accelo;
        z = z * accelo;
        element[0].style["-webkit-transform"] =
           "translate3d("+x+"px,"+ y +"px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-moz-transform"] =
           "translate3d("+x+"px," + y +"px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-ms-transform"] =
           "translate3d("+x+"px," + y + "px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-o-transform"] =
           "translate3d("+x+"px," + y  + "px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["transform"] =
           "translate3d("+x+"px," + y + "px," + z + "px) rotate("+ deg +"deg)";
      }

      $swipe.bind(element, {
        start: function(coords) {
          startX = coords.x;
          startY = coords.y;
        },

        cancel: function(e) {
          translateAndRotate(0, 0, 0, 0);
          e.stopPropagation();
        },

        end: function(coords, e) {
          $rootScope.likeOrNopeIndicator(0, e);
          if (endAction == "prev") {
            $rootScope.carouselPrev(carouselId);
          } else if (endAction == "next") {
            $rootScope.carouselNext(carouselId);
          }else{
            translateAndRotate(0, 0, 0, 0);            
          }
          e.stopPropagation();
        },

        move: function(coords, calouselId,a) {
          if( startX != null) {
            var deltaX = coords.x - startX;
            var deltaXRatio = deltaX / element[0].clientWidth;
            $rootScope.likeOrNopeIndicator(deltaXRatio);
            if (deltaXRatio > 0.6) {
              endAction = "next";
            } else if (deltaXRatio < -0.6){
              endAction = "prev";
            } else {
              endAction = null;
            }
            translateAndRotate(deltaXRatio * 200, 0, 0, deltaXRatio * 15);
          }
        }
      });
    }
});