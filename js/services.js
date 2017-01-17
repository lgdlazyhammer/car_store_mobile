application.factory('AppInfoService',[function(){

  /*application information*/
  var appInfo = new AppInfoModel();

  /* initialize user base info */
  if(appInfo.get("user")){
    //do nothing
  }else{
    appInfo.set({user: new UserModel()});
  }

  return{
    getAppInfo: function(){
      return appInfo;
    },
    setAppInfo: function(APPINFO){
      appInfo = APPINFO;
    }
  }

}])
.factory('RegisterService', ['$q','$http','constants',function ($q, $http, constants) {

  var ajaxData;
  //#region Common WS Retry functionality
  function doGetQuery(deferred, URL, counter) {

    var req = {
      method: 'POST',
      url: URL,
      data: { ajaxData: JSON.stringify(ajaxData) }
    };

    $http(req).then(function(data, status, headers, config){ deferred.resolve(data, status, headers, config); }
        ,function(data, status, headers, config){
          if (counter < 1) {
            counter++;
            doGetQuery(deferred, url, counter);
          } else {
            deferred.reject(data, status, headers, config);
            //$ionicLoading.hide();
          }
        }
    );

  }

  function makeUrl() {
    return constants.baseUrl + constants.services.register;
  }

  return {
    setParams: function(AJAXDATA){
      ajaxData = AJAXDATA;
    },
    getData: function () {
      //get eid based on pnum from api
      var deferred = $q.defer();
      doGetQuery(deferred, makeUrl(), 1);
      return deferred.promise;
    }
  }

}])
.factory('LoginService', ['$q','$http','constants',function ($q, $http, constants) {

  var ajaxData;
  //#region Common WS Retry functionality
  function doGetQuery(deferred, URL, counter) {

    var req = {
      method: 'POST',
      url: URL,
      data: { ajaxData: JSON.stringify(ajaxData) }
    };

    $http(req).then(function(data, status, headers, config){ deferred.resolve(data, status, headers, config); }
        ,function(data, status, headers, config){
          if (counter < 1) {
            counter++;
            doGetQuery(deferred, url, counter);
          } else {
            deferred.reject(data, status, headers, config);
            //$ionicLoading.hide();
          }
        }
    );

  }

  function makeUrl() {
    return constants.baseUrl + constants.services.login;
  }

  return {
    setParams: function(AJAXDATA){
      ajaxData = AJAXDATA;
    },
    getData: function () {
      //get eid based on pnum from api
      var deferred = $q.defer();
      doGetQuery(deferred, makeUrl(), 1);
      return deferred.promise;
    }
  }

}])
.factory('BaseInfoService', ['$q','$http','constants',function ($q, $http, constants) {

  var token;
  //#region Common WS Retry functionality
  function doGetQuery(deferred, URL, counter) {

    var req = {
      method: 'POST',
      url: URL,
      data: { token: token }
    };

    $http(req).then(function(data, status, headers, config){ deferred.resolve(data, status, headers, config); }
        ,function(data, status, headers, config){
          if (counter < 1) {
            counter++;
            doGetQuery(deferred, url, counter);
          } else {
            deferred.reject(data, status, headers, config);
            //$ionicLoading.hide();
          }
        }
    );

  }

  function makeUrl() {
    return constants.baseUrl + constants.services.baseInfo;
  }

  return {
    setParams: function(TOKEN){
      token = TOKEN;
    },
    getData: function () {
      //get eid based on pnum from api
      var deferred = $q.defer();
      doGetQuery(deferred, makeUrl(), 1);
      return deferred.promise;
    }
  }

}])
.factory('CarTypeListService', ['$q','$http','constants',function ($q, $http, constants) {

  var token;
  //#region Common WS Retry functionality
  function doGetQuery(deferred, URL, counter) {

    var req = {
      method: 'POST',
      url: URL,
      data: { token: token }
    };

    $http(req).then(function(data, status, headers, config){ deferred.resolve(data, status, headers, config); }
        ,function(data, status, headers, config){
          if (counter < 1) {
            counter++;
            doGetQuery(deferred, url, counter);
          } else {
            deferred.reject(data, status, headers, config);
            //$ionicLoading.hide();
          }
        }
    );

  }

  function makeUrl() {
    return constants.baseUrl + constants.services.carTypeList;
  }

  return {
    setParams: function(TOKEN){
      token = TOKEN;
    },
    getData: function () {
      //get eid based on pnum from api
      var deferred = $q.defer();
      doGetQuery(deferred, makeUrl(), 1);
      return deferred.promise;
    }
  }

}])
.factory('CarRegisterService', ['$q','$http','constants',function ($q, $http, constants) {

  var token, ajaxData;
  //#region Common WS Retry functionality
  function doGetQuery(deferred, URL, counter) {

    var req = {
      method: 'POST',
      url: URL,
      data: { token: token, ajaxData: JSON.stringify(ajaxData) }
    };

    $http(req).then(function(data, status, headers, config){ deferred.resolve(data, status, headers, config); }
        ,function(data, status, headers, config){
          if (counter < 1) {
            counter++;
            doGetQuery(deferred, url, counter);
          } else {
            deferred.reject(data, status, headers, config);
            //$ionicLoading.hide();
          }
        }
    );

  }

  function makeUrl() {
    return constants.baseUrl + constants.services.carRegister;
  }

  return {
    setParams: function(TOKEN,AJAXDATA){
      token = TOKEN;
      ajaxData = AJAXDATA;
    },
    getData: function () {
      //get eid based on pnum from api
      var deferred = $q.defer();
      doGetQuery(deferred, makeUrl(), 1);
      return deferred.promise;
    }
  }

}])
.factory('CarDeleteService', ['$q','$http','constants',function ($q, $http, constants) {

  var token, ajaxData;
  //#region Common WS Retry functionality
  function doGetQuery(deferred, URL, counter) {

    var req = {
      method: 'POST',
      url: URL,
      data: { token: token, ajaxData: JSON.stringify(ajaxData) }
    };

    $http(req).then(function(data, status, headers, config){ deferred.resolve(data, status, headers, config); }
        ,function(data, status, headers, config){
          if (counter < 1) {
            counter++;
            doGetQuery(deferred, url, counter);
          } else {
            deferred.reject(data, status, headers, config);
            //$ionicLoading.hide();
          }
        }
    );

  }

  function makeUrl() {
    return constants.baseUrl + constants.services.carDelete;
  }

  return {
    setParams: function(TOKEN,AJAXDATA){
      token = TOKEN;
      ajaxData = AJAXDATA;
    },
    getData: function () {
      //get eid based on pnum from api
      var deferred = $q.defer();
      doGetQuery(deferred, makeUrl(), 1);
      return deferred.promise;
    }
  }

}]);
