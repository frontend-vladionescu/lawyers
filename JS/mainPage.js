var correctPassword = 1234;

document.getElementById("loginForm").addEventListener( "submit", function(e){
  e.preventDefault();
  var inputtedPassword = document.getElementsByName("password")[0].value;
  var inputtedName = document.getElementById("select");
  
  if( inputtedName.options[inputtedName.selectedIndex].value == "SAJ" && inputtedPassword == correctPassword ){
    window.location.href = "HTML/sajPage.html";
  }else if( inputtedPassword == correctPassword ){
    window.location.href = "HTML/policePage.html";
  }else{
    document.getElementById("error").className ='visible';
    setTimeout(function() {
      document.getElementById("error").className = "error";
    }, 2000);
  }  
});


  