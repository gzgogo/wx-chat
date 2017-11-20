//隐藏浏览器的地址栏
window.onload=function(){
    if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
        bodyTag = document.getElementsByTagName('body')[0];
        bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
    }
    setTimeout(function() {
        window.scrollTo(0, 1);
    }, 0);
};

//聊天逻辑
//var usersStr = window.location.search.substr("?users=".length);
//var chatUsers = JSON.parse(decodeURIComponent(usersStr));
var chatUsers = window.opener.usersVM.selectedUsers;
console.log(chatUsers);

var chatTitle = "群聊";
var contactUrl = "images/contacts.png";
if (chatUsers.length === 2) {
    chatTitle = chatUsers[1].name;
    contactUrl = "images/contact.png";
}

console.log(chatTitle);

var data = {
    users: chatUsers,
    title: chatTitle,
    contactImage: contactUrl,
    choosing : false,
    newMsg:"",
    messages: []
};

var chatVM = new Vue({
    el: '.root',
    data: data,
    methods: {
        chooseUser: function (event) {
            if(this.newMsg) {
                this.choosing = true;
                event.stopPropagation();
            }
            else {
                alert("请输入消息内容");
            }
        },

        sendMsg: function(index) {
            this.messages.push({
                user: this.users[index],
                content: this.newMsg
            });

            this.newMsg="";
            this.choosing = false;
        },

        hideDialog: function(event) {
            this.choosing = false;
            console.log("hideDialog");
        }
    }
});


