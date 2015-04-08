Template.leftMenu.events({
  "click #logoutButton" : function () {
    Router.go("/logout");
  } ,
  "click #dashboardButton": function() {
    Router.go("/dashboard");
  },
  'click #joinGroupButton' : function (event, template) {
    IonPopup.prompt({
      title : 'Join Group' ,
      template : 'Please enter secret group key. Group admins can give these to you.' ,
      okText : 'Join' ,
      inputType : 'text' ,
      inputPlaceholder : 'group key' ,
      onOk : function (event , response) {
        Meteor.call("joinGroup", response, function (error) {
          console.log(error);
        });
      }
    });
  } ,
  'click #createGroupButton' : function (event , template) {
    IonPopup.show({
      title : 'Create Group' ,
      template :'<span id="inputDirections">' + 'Please enter group name' + '</span>' +'<input type="text" placeholder="group name" name="prompt" >',
      buttons: [{
        text: 'Create',
        type: 'button-positive',
        onTap: function(e,template){

          // template ='<span>' + 'Please enter a new group name' + '</span>' +'<input type="text" placeholder="group name" name="prompt" >';
          var inputVal =  $(template.firstNode).find('[name=prompt]').val();
          Meteor.call("createNewGroup" , inputVal, function (error) {
            //TODO: deal with different error differently
            if(error){
              // $(template.firstNode).find("#inputDirections").append(error.message);
              $(template.firstNode).find("#inputDirections").html(error.message);
              console.log(error.message);
              e.preventDefault();
            }
            else{
              IonPopup.close();
            }
          });
        }
      },{
        text: 'Cancel',
        type: 'button-positive',
        onTap: function(e){
          IonPopup.close();
        }
      }]
    });
  },


  'click #leaveGroup' : function(event, template) {
    IonPopup.confirm({
      title: 'Are you sure?',
      template: 'You will no longer have access to drivers for this group',
      onOk: function() {
        Meteor.call("leaveGroup", function(err) {
          if (err) {
            console.log(err.message);
          } else {
            Router.go("/dashboard");
          }
        });
      }
    });
  }
});


