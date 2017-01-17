;(function($) {
    /* 用户基础信息格式化方法 */
    $.makeBaseInfo = function(user,serverData){
        if(user && serverData){
            user.id = serverData.result.user.id;
            user.name = serverData.result.user.name;
            user.role = serverData.result.user.role;
            user.picId = serverData.result.user.picId;
            return  user;
        }else{
            return user;
        }
    }

    /* 用户基础信息格式化方法 */
    $.makeCarList = function(serverData){

        if(serverData){

            var carListParsed = serverData.result.carList;
            var carList = [];

            for(var i=0;i<carListParsed.length;i++){
                (function(car){
                    var carItem = new CarModel();
                    carItem.set({id:car.id,userName:car.userName,carType:car.carType,description:car.description});
                    carList.push(carItem);
                }(carListParsed[i]));
            }

            return carList;
        }else{
            return null;
        }
    }

})(jQuery);/**
 * Created by Administrator on 2017/1/13/013.
 */
