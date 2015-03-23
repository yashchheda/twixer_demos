var main = function(){
"use strict";

setInterval(
  function fetchGameResult(){
     $.ajax({
        url:"/acct1",
        dataType: "json",
        success: function (data) {
              $("#detail").empty();
              $("#detail").append("<p><h3>User information</h3></p><p>Name: "+data.name+"</p>Bio: "+data.bio+"</p>");
        },type: "post"
    });
  },200);

};
$(document).ready(main);
