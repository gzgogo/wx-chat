//隐藏浏览器的地址栏
window.onload=function(){document.documentElement.scrollHeight<=document.documentElement.clientHeight&&(bodyTag=document.getElementsByTagName("body")[0],bodyTag.style.height=document.documentElement.clientWidth/screen.width*screen.height+"px"),setTimeout(function(){window.scrollTo(0,1)},0)};
//聊天逻辑
//var usersStr = window.location.search.substr("?users=".length);
//var chatUsers = JSON.parse(decodeURIComponent(usersStr));
var chatUsers=window.opener.usersVM.selectedUsers;console.log(chatUsers);var chatTitle="群聊",contactUrl="images/contacts.png";2===chatUsers.length&&(chatTitle=chatUsers[1].name,contactUrl="images/contact.png"),console.log(chatTitle);var data={users:chatUsers,title:chatTitle,contactImage:contactUrl,choosing:!1,newMsg:"",messages:[]},chatVM=new Vue({el:".root",data:data,methods:{chooseUser:function(event){this.newMsg?(this.choosing=!0,event.stopPropagation()):alert("请输入消息内容")},sendMsg:function(index){this.messages.push({user:this.users[index],content:this.newMsg}),this.newMsg="",this.choosing=!1},hideDialog:function(event){this.choosing=!1,console.log("hideDialog")}}});
/*! wexinchat 最后修改于： 2015-11-13 */