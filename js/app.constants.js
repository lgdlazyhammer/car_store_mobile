application.constant('constants', {
	/// <summary>
	/// Base Url for api calls.
	/// </summary>
    //baseUrl: 'http://192.168.1.1:8080/CarStoreWeb',
	baseUrl: 'http://127.0.0.1:8080/CarStoreWeb/mobile',
	/// <summary>
	/// header part services
	/// </summary>
    services: {
		register: '/user/action/register',
        login: '/user/action/login',
        baseInfo: '/user/action/baseInfo',
        carTypeList: '/carType/action/list',
        carRegister: '/car/action/register',
        carDelete: '/car/action/delete'
    }
});