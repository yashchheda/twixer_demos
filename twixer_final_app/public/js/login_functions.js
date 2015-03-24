var main = function(){
"use strict";

     $.ajax({
        url:"/userinfo",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            console.log(data);
              $("#detail").html("<p><h3>User information</h3></p><p>Name: "+data.name+"</p>Bio: "+data.bio+"</p>");
        },type: "post"
    });

};
$(document).ready(main);
