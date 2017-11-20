//聊天逻辑
function User(name, faceUrl, isAuthor, isSelected)
{
    this.name = name;
    this.faceUrl = faceUrl;
    this.isAuthor = isAuthor;
    this.isSelected = isSelected;
}

var data = {
    isShowing : false,
    newUserAvatar: "",
    newUserName: "",
    selectedUsers: [],
    users: [
        new User("王思聪", "images/avatars/wsc.jpg"),
        new User("习近平", "images/avatars/xjp.jpg"),
        new User("苍井空", "images/avatars/cjk.jpg"),
        new User("黄晓明", "images/avatars/hxm.jpg"),
        new User("Angelababy", "images/avatars/baby.jpg"),
        new User("范冰冰", "images/avatars/fbb.jpg"),
        new User("李晨", "images/avatars/lc.jpg"),
        new User("邓超", "images/avatars/dc1.jpg"),
        new User("鹿晗", "images/avatars/lh.jpg"),
        new User("权志龙", "images/avatars/bigbang-qzl.jpg"),
        new User("Rain", "images/avatars/rain.png"),
        //new User("斯坦森", "images/avatars/statham.jpg"),
        //new User("斯嘉丽", "images/avatars/scarlett.jpg"),
        new User("马云", "images/avatars/my.jpg"),
        new User("刘强东", "images/avatars/lqd.jpg")
    ]
};

var usersVM = new Vue({
    el: '.root',
    data: data,
    methods: {
        pageLoad: function() {
            alert("load");
        },

        showAddDialog: function (event) {
            this.isShowing = true;
            event.stopPropagation();
        },

        selectPhoto: function(event) {
            var fileUpload = event.target;
            var ext=fileUpload.value.substring(fileUpload.value.lastIndexOf(".")+1).toLowerCase();
            // gif在IE浏览器暂时无法显示
            if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
                alert("文件必须为图片！");
                return;
            }

            html5Reader(fileUpload, this);

            function html5Reader(fileUpload, vm){
                var file = fileUpload.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    vm.newUserAvatar = this.result;
                };
            }
        },

        addUser: function() {
            console.log("addUser");

            if(!this.newUserName) {
                alert("请选择头像");
                return;
            }

            if(!this.newUserName) {
                alert("请输入名称");
                return;
            }

            this.users.push({
                isAuthor: false,
                isSelected: false,
                faceUrl: this.newUserAvatar,
                name: this.newUserName
            });

            this.newUserName = "";
            this.newUserAvatar = "";

            this.isShowing = false;
        },

        cancelAdd: function() {
            this.newUserName = "";
            this.newUserAvatar = "";

            this.isShowing = false;
        },

        chooseUser: function(index) {
            if(this.selectedUsers.length <=0)
                this.users[index].isAuthor = true;

            if(!(this.users[index].isSelected)) {
                this.users[index].isSelected = true;
                this.selectedUsers.push(this.users[index]);

                console.log("users.length: " + this.users.length);
                console.log("choose user: " + index);
                console.log("selected: " + this.users[index].isSelected);
                console.log(this.users[index].name);
            }
        },

        resetUsers: function() {
            for(var i = 0; i < this.selectedUsers.length; i++) {
                this.selectedUsers[i].isAuthor = false;
                this.selectedUsers[i].isSelected = false;
            }

            this.selectedUsers = [];
        },

        startChat: function() {
            if(this.selectedUsers.length > 1) {
                //'fullscreen=1,directories=0,location=0,menubar=0,resizable=0,scrollbars=0,status=0,titlebar=no,toolbar=0'
                window.open("chat.html");
                //var param = encodeURIComponent(JSON.stringify(this.selectedUsers));
                ////console.log(param);
                //window.location.assign("chat.html?users=" + param);
            }
            else {
                alert("请选择用户自己及与其聊天的好友！");
            }
        },

        hideDialog: function(event) {
            this.choosing = false;
            console.log("hideDialog");
        }
    }
});
