application.directive('cardeleteaction', ['AppInfoService','CarDeleteService',function (AppInfoService,CarDeleteService) {
    /* 删除车辆信息 */
    return {
        restrict: 'A',
        replace: false,
        scope: false,
		controller: function($scope, $element, $attrs){

        },
        link: function (scope, element, attrs) {

            element.on('click', function(event) {
                /* 删除车辆信息 */
                CarDeleteService.setParams(AppInfoService.getAppInfo().get("user").get("token"),{id:attrs.title});
                CarDeleteService.getData().then(function(data){
                    /* 服务器传递信息 */
                    var serverData = data.data;
                    if(serverData){
                        if(serverData.success){
                            /* 删除成功 */
                            scope.$emit("carDeleteSuccess");
                        }else{
                            /* 删除失败 */
                            scope.$emit("carDeleteFail");
                        }
                    }else{
                        /* 删除请求失败 */
                        scope.$emit("carDeleteRequestFail");
                    }
                })
            });
        }
    };
}])
.directive('data-user-car-list-loaded', ['$timeout',function ($timeout) {

    return {
        restrict: 'A',
        replace: false,
        scope: false,
        controller: function($scope, $element, $attrs){
        },
        link: function (scope, element, attrs) {
            console.log("render over listener.");
            if(scope.$last === true){
                $timeout(function(){
                   scope.$emit("carListLoadingOver");
                });
            }
        }
    };
}]);