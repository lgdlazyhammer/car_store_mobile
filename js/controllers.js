application.controller('MainPage', ['$scope',function($scope) {

}])
.controller('PersonInfoPage', ['$scope','AppInfoService',function($scope,AppInfoService) {
	/* 个人信息页面控制器 */
	$scope.pageInfo = {loginIconHide: false,logoutIconHide: true};

	/* 监听用户登录事件 */
	$scope.$on('user-logged-in', function(event, args) {
		/* user already logged in 用户已经登陆 */
		if(AppInfoService.getAppInfo().get("user").get("token")){
			/* 显示退出按钮，隐藏登录按钮 */
			$scope.pageInfo.loginIconHide = true;
			$scope.pageInfo.logoutIconHide = false;
		}
	});

	/* 用户退出登录 */
	$scope.logout = function(){
		/* 清空登陆token */
		AppInfoService.getAppInfo().get("user").set({token: ""});
		/* 显示登录按钮，隐藏退出按钮 */
		$scope.pageInfo.loginIconHide = false;
		$scope.pageInfo.logoutIconHide = true;
	}

}])
.controller('RegisterPage', ['$scope','RegisterService','AppInfoService','$rootScope','BaseInfoService',function($scope,RegisterService,AppInfoService,$rootScope,BaseInfoService) {
	/* 注册页面控制器 */
	/*存储用户注册信息*/
	$scope.user = {name:"",password:""};
	$scope.alert = {info:"", registerStatus: ""};

	/*用户注册*/
	$scope.register = function(){

		if(!$.checkUserName($scope.user.name)){
			$scope.alert.info = "用户名";
			//显示提示信息
			$("#showRegisterFormDialogLink").click();
			//不通过校验返回
			return;
		}

		if(!$.checkPassword($scope.user.password)){
			$scope.alert.info = "密码";
			//显示提示信息
			$("#showRegisterFormDialogLink").click();
			//不通过校验返回
			return;
		}
		/*服务设置信息*/
		RegisterService.setParams($scope.user);
		/*调用注册服务并处理结果*/
		RegisterService.getData().then(function(data){
			/*返回结果被包装在data中*/
			var serverData = data.data;
			if(serverData){
				if(serverData.success){
					/* 返回登陆token */
					if(serverData.result){
						/* 保存登陆token */
						AppInfoService.getAppInfo().get("user").set({token:serverData.result});
						/* 获取用户基础信息 */
						BaseInfoService.setParams(serverData.result);
						BaseInfoService.getData().then(function(data){
							/* 返回结果被包装在data中 */
							var serverData = data.data;
							/* 用户获取详细信息成功 */
							if(serverData){
								/* 用户获取详细信息成功 */
								if(serverData.success){
									/* 获取用户基础信息 */
									var user = $.makeBaseInfo(AppInfoService.getAppInfo().get("user"),serverData);
									/* 设置用户基础信息 */
									AppInfoService.getAppInfo().get("user").set(user);
									/* 设置用户车列表 */
									AppInfoService.getAppInfo().set({carList:$.makeCarList(serverData)});

								}else{
									/* 用户获取详细信息失败 */
									/* 设置提示信息 */
									$scope.alert.loginStatus = "用户详细信息获取失败！";
									//显示提示信息
									$("#showLoginStatusLink").click();
								}
							}
						});
						/* 广播登陆成功事件 */
						$rootScope.$broadcast('user-logged-in');
						/* 设置提示信息 */
						$scope.alert.registerStatus = "注册成功！";
						//显示提示信息
						$("#showRegisterStatusLink").click();
					}
				}else{
					/* 设置提示信息 */
					$scope.alert.registerStatus = "注册失败，用户已存在！";
					//显示提示信息
					$("#showRegisterStatusLink").click();
				}
			}
		});
	}
}])
.controller('LoginPage', ['$scope','LoginService','AppInfoService','$rootScope','BaseInfoService',function($scope,LoginService,AppInfoService,$rootScope,BaseInfoService) {
	/* 登陆页面控制器 */
	/*存储用户注册信息*/
	$scope.user = {name:"",password:""};
	$scope.alert = {info:"", loginStatus: ""};

	/*用户登录*/
	$scope.login = function(){

		if(!$.checkUserName($scope.user.name)){
			$scope.alert.info = "用户名";
			//显示提示信息
			$("#showLoginFormDialogLink").click();
			//不通过校验返回
			return;
		}

		if(!$.checkPassword($scope.user.password)){
			$scope.alert.info = "密码";
			//显示提示信息
			$("#showLoginFormDialogLink").click();
			//不通过校验返回
			return;
		}
		/*服务设置信息*/
		LoginService.setParams($scope.user);
		/*调用注册服务并处理结果*/
		LoginService.getData().then(function(data){
			/*返回结果被包装在data中*/
			var serverData = data.data;
			if(serverData){
				if(serverData.success){
					/* 返回登陆token */
					if(serverData.result){
						/* 保存登陆token */
						AppInfoService.getAppInfo().get("user").set({token:serverData.result});
						/* 获取用户基础信息 */
						BaseInfoService.setParams(serverData.result);
						BaseInfoService.getData().then(function(data){
							/*返回结果被包装在data中*/
							var serverData = data.data;
							/* 用户获取详细信息成功 */
							if(serverData){
								/* 用户获取详细信息成功 */
								if(serverData.success){
									/* 获取用户基础信息 */
									var user = $.makeBaseInfo(AppInfoService.getAppInfo().get("user"),serverData);
									/* 设置用户基础信息 */
									AppInfoService.getAppInfo().get("user").set(user);
									/* 设置用户车列表 */
									AppInfoService.getAppInfo().set({carList:$.makeCarList(serverData)});
									/* 广播登陆成功事件 */
									$rootScope.$broadcast('user-logged-in');
									/* 设置提示信息 */
									$scope.alert.loginStatus = "登录成功！";
									//显示提示信息
									$("#showLoginStatusLink").click();

								}else{
									/* 用户获取详细信息失败 */
									/* 设置提示信息 */
									$scope.alert.loginStatus = "用户详细信息获取失败！";
									//显示提示信息
									$("#showLoginStatusLink").click();
								}
							}
						});
					}
				}else{
					/* 设置提示信息 */
					$scope.alert.loginStatus = "用户登录失败，请先注册！";
					//显示提示信息
					$("#showLoginStatusLink").click();
				}
			}
		});
	}
}])
.controller('BasicInfoPage', ['$scope','AppInfoService','$rootScope','BaseInfoService',function($scope,AppInfoService,$rootScope,BaseInfoService) {
	/* 基础信息页面控制器 */
	$scope.pageInfo = {contentHide: true};

	$scope.user = AppInfoService.getAppInfo().get("user");
	$scope.car = { list: AppInfoService.getAppInfo().get("carList")};
	$scope.alert = {registerStatus:null};

	/* 保存登陆token */
	//AppInfoService.getAppInfo().get("user").set({token:"test"});

	/* user already logged in 用户已经登陆 */
	if($scope.user.get("token")){
		/* 显示页面内容 */
		$scope.pageInfo.contentHide = false;
	}

	/* 监听用户登录事件 */
	$scope.$on('user-logged-in', function(event, args) {
		/* user already logged in 用户已经登陆 */
		if(AppInfoService.getAppInfo().get("user").get("token")){
			/* 显示页面内容 */
			$scope.pageInfo.contentHide = false;
			/* 刷新页面数据 */
			$scope.user = AppInfoService.getAppInfo().get("user");
			$scope.car.list = AppInfoService.getAppInfo().get("carList");

		}
	});

	/* 监听刷新车辆事件 */
	$scope.$on('car-list-refreshed', function(event, args) {
		/* 刷新页面数据 */
		$scope.car.list = AppInfoService.getAppInfo().get("carList");
	});

	/* 监听车辆信息删除成功 */
	$scope.$on('carDeleteSuccess',function(event){
		/* 刷新车辆信息 */
		BaseInfoService.setParams(AppInfoService.getAppInfo().get("user").get("token"));
		BaseInfoService.getData().then(function(data){
			/*返回结果被包装在data中*/
			var serverData = data.data;
			/* 用户获取详细信息成功 */
			if(serverData){
				/* 用户获取详细信息成功 */
				if(serverData.success){
					/* 设置用户车列表 */
					AppInfoService.getAppInfo().set({carList:$.makeCarList(serverData)});
					/* 广播刷新成功事件 */
					$rootScope.$broadcast('car-list-refreshed');

					/* 车辆信息删除成功 */
					$scope.alert.registerStatus = "车辆信息删除成功!";
					$("#showCarDeleteStatusLink").click();
				}else{
					/* 用户获取详细信息失败 */
				}
			}
		});
	});
	/* 监听车辆信息删除失败 */
	$scope.$on('carDeleteFail',function(event){
		/* 车辆信息删除失败 */
		$scope.alert.registerStatus = "车辆信息删除失败!";
		$("#showCarDeleteStatusLink").click();
	});
	/* 监听车辆信息删除请求失败 */
	$scope.$on('carDeleteRequestFail',function(event){
		/* 车辆信息删除请求失败 */
		$scope.alert.registerStatus = "车辆信息删除请求失败!";
		$("#showCarDeleteStatusLink").click();
	});

}])
.controller('AddCarInfoPage', ['$scope','AppInfoService','CarTypeListService','CarRegisterService',function($scope,AppInfoService,CarTypeListService,CarRegisterService) {
	/* 增加车辆信息页面控制器 */
	$scope.pageInfo = {contentHide: true};
	$scope.car = {list: null, carType:null, description:null};
	$scope.alert = {registerStatus:null};

	/* 保存登陆token */
	//AppInfoService.getAppInfo().get("user").set({token:"test"});

	/* user already logged in 用户已经登陆 */
	if(AppInfoService.getAppInfo().get("user").get("token")){
		/* 显示页面内容 */
		$scope.pageInfo.contentHide = false;
	}else{
		// do nothing
	}

	/* 监听用户登录事件 */
	$scope.$on('user-logged-in', function(event, args) {
		/* user already logged in 用户已经登陆 */
		if(AppInfoService.getAppInfo().get("user").get("token")){
			/* 显示页面内容 */
			$scope.pageInfo.contentHide = false;
			/* 获取车辆类型列表 */
			CarTypeListService.setParams(AppInfoService.getAppInfo().get("user").get("token"));
			CarTypeListService.getData().then(function(data){
				/* 返回结果被包装在data中 */
				var serverData = data.data;
				/* 返回结果被包装在data中 */
				if(serverData){
					if(serverData.success){
						$scope.car.list = serverData.result;
					}else{
						/*get list failed*/
					}
				}else{
					/*request failed*/
				}
			});
		}
	});

	/* 增加车辆信息 */
	$scope.addCar = function(){
		/* 注册车辆信息 */
		CarRegisterService.setParams(AppInfoService.getAppInfo().get("user").get("token"),{carTypeId:$scope.car.carType,description:$scope.car.description});
		CarRegisterService.getData().then(function(data){
			/* 解析服务器返回信息 */
			var serverData = data.data;
			if(serverData){
				if(serverData.success){
					/* 车辆信息注册成功 */
					$scope.alert.registerStatus = "车辆信息注册成功!";
					$("#showCarRegisterStatusLink").click();
				}else{
					/* 车辆信息注册失败 */
					$scope.alert.registerStatus = "车辆信息注册失败!";
					$("#showCarRegisterStatusLink").click();
				}
			}else{
				/* 请求失败 */
				$scope.alert.registerStatus = "请求失败!";
				$("#showCarRegisterStatusLink").click();
			}
		});
	}

}])
.controller('ServicePage', ['$scope','AppInfoService',function($scope,AppInfoService) {
	/* 服务管理页面控制器 */
	$scope.pageInfo = {contentHide: true};

	/* 保存登陆token */
	//AppInfoService.getAppInfo().get("user").set({token:"test"});

	/* user already logged in 用户已经登陆 */
	if(AppInfoService.getAppInfo().get("user").get("token")){
		/* 显示页面内容 */
		$scope.pageInfo.contentHide = false;
	}

	/* 监听用户登录事件 */
	$scope.$on('user-logged-in', function(event, args) {
		/* user already logged in 用户已经登陆 */
		if(AppInfoService.getAppInfo().get("user").get("token")){
			/* 显示页面内容 */
			$scope.pageInfo.contentHide = false;
		}
	});

}])
.controller('ServiceReservePage', ['$scope','AppInfoService',function($scope,AppInfoService) {
	/* 订单预定页面控制器 */
}]);
