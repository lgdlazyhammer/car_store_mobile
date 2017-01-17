var UserModel = Backbone.Model.extend({
    defaults: {
        id: '',
        name: '',
        role: '',
        password: '',
        picId: '',
        token: ''
    }
});

var CarModel = Backbone.Model.extend({
    defaults: {
        id: '',
        userName: '',
        carType: '',
        description: ''
    }
});

var AppInfoModel = Backbone.Model.extend({
    defaults: {
        user: null,
        carList: []
    }
});
