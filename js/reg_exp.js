;(function($) {
    /*用户名数字字母组成*/
    $.checkUserName = function(param){
        if(param){
            var validator = new RegExp(/^[a-zA-Z0-9]{6,12}$/);
            return validator.test(param);
        }else{
            return false;
        }
    };

    /*用户密码，数字字母组成，必需大小写混合，必需有数字，必需长度超过8位*/
    $.checkPassword = function(param){
        if(param){
            /*数字字母组成,长度超8位*/
            var validator = new RegExp(/^[a-zA-Z0-9]{8,12}$/);
            if(validator.test(param)){
                /*必需有小写字母*/
                var validatorTwo = new RegExp(/[a-z]+/);
                if(validatorTwo.test(param)){
                    /*必需有大写字母*/
                    var validatorThree = new RegExp(/[A-Z]+/);
                    if(validatorThree.test(param)){
                        /*必需有数字*/
                        var validatorFour = new RegExp(/[0-9]+/);
                        if(validatorFour.test(param)){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            return false;
        }
    };
})(jQuery);/**
 * Created by Administrator on 2017/1/13/013.
 */
