var application = angular.module('application', []);

/*转换angular的序列化方式使之和jquery相同*/
application.config(function($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
});
