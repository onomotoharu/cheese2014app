var cheeseApp = angular.module('cheeseApp',[
	'ngRoute',
  'ngTouch',
	'cheeseControllers',
  'ngAnimate',
  'ngCordova'
	]).run(function($rootScope, $location){
    if(localStorage.numberOfLaunch != undefined) {
        localStorage.numberOfLaunch++;
    }else{
        localStorage.numberOfLaunch = 0;
    }
    // $cordovaStatusbar.hide();
});

cheeseApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/recommend.html',
        controller: 'RecommendCtrl'
      }).
      when('/recipe/:recipe_id', {
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
      when('/postafter', {
        templateUrl: 'partials/postafter.html',
        controller: 'PostafterCtrl'
      }).
      when('/tutorial', {
        templateUrl: 'partials/tutorial.html',
        controller: 'TutorialCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);


cheeseApp.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

//base64
cheeseApp.factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        }
    };
});

//
cheeseApp.factory('AuthorizationHeader', function (Base64, $http) {
     return {
        setCredentials: function () {
            var encoded = Base64.encode(localStorage.api_token + ':' + localStorage.api_token_secret);
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;

            localStorage.authdata = encoded;
        },
        clearCredentials: function () {
            document.execCommand("ClearAuthenticationCache");
            $http.defaults.headers.common.Authorization = 'Basic ';
        }
    };
});


//carousel, cardUI
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

        move: function(coords, calouselId) {
          if( startX != null) {
            var deltaX = coords.x - startX;
            var deltaXRatio = deltaX / element[0].clientWidth;
            $rootScope.likeOrNopeIndicator(deltaXRatio);
            if (deltaXRatio > 0.5) {
              endAction = "next";
            } else if (deltaXRatio < -0.5){
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


