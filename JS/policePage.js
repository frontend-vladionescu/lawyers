var listOfLawyers  = JSON.parse( localStorage.getItem( 'itemsArray' ) );

var dateMatrix  = JSON.parse( localStorage.getItem( 'dates' ) );
console.log(dateMatrix);
var currentListNumber = findCurrentList();

var currentListOfLawyers = listOfLawyers.filter(function(element){return element.lista == currentListNumber});
var lawyerList = currentListOfLawyers.filter(function(element){if(element.suspendat == false) return element;});


function findCurrentList()
{
  var today = new Date();
  var currentListReturn = 0;
  for(var x = 0; x < dateMatrix.length; x++){
    for(var y = 0; y < dateMatrix[x].length; y++){ 
      var startDate = new Date(dateMatrix[x][y])
      var endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 7);
      if(today.getTime()>= startDate.getTime() && today.getTime() <= endDate.getTime()){
        currentListReturn= x+1;   
      }
    }
  }
  return currentListReturn;
}

document.getElementById("stagiar").onclick = function(){
  var displayLawyerData = document.getElementById("displayGivenLawyer");
  var lawyerName; 
  var lawyerPhonenumber;
  var minOficii;
 
  findNextLawyer(lawyerList);
  
  incrementLawyerOficiiNumber();
  displayLawyer();
}

function findNextLawyer(array){
  
  if(document.getElementById("inputM").checked){
    var maleLawyers = array.filter( function(element){return element.sex == "M"})
    lawyerName = maleLawyers[0].nume;
    lawyerPhonenumber = maleLawyers[0].telefon;
    minOficii = maleLawyers[0].numarOficii;

    if(maleLawyers[0].nume == undefined){
      lawyerName = "Nu avem momentan avocati cu sexul masculin pe listele de oficii";
    }else{ 
      for (var i = 0; i < maleLawyers.length; i++){
        if(maleLawyers[i].numarOficii < minOficii){
          minOficii = maleLawyers[i].numarOficii;
          lawyerName = maleLawyers[i].nume;
          lawyerPhonenumber = lawyerList[i].telefon;
        }
      }
    }
  }else if(document.getElementById("inputF").checked){
    var femaleLawyers = array.filter( function(element){return element.sex == "F"})
    lawyerName =femaleLawyers[0].nume;
    lawyerPhonenumber = femaleLawyers[0].telefon;
    minOficii = femaleLawyers[0].numarOficii;

    if(femaleLawyers[0].nume == undefined){
      lawyerName = "Nu avem momentan avocati cu sexul feminin pe listele de oficii";
    }else{
      for (var i = 0; i < femaleLawyers.length; i++){
        if(femaleLawyers[i].numarOficii < minOficii){
          minOficii = femaleLawyers[i].numarOficii;
          lawyerName = femaleLawyers[i].nume;
          lawyerPhonenumber = femaleLawyers[i].telefon;
        }
      }
    }
  }else{
    lawyerName = array[0].nume;
    lawyerPhonenumber = array[0].telefon;
    minOficii = array[0].numarOficii;
    
    if(array[0].nume == undefined){
      lawyerName = "Nu avem momentan avocati pe listele de oficii";
    }else{
      for (var i = 0; i < lawyerList.length; i++){
        if(lawyerList[i].numarOficii < minOficii){
          minOficii = array[i].numarOficii;
          lawyerName = array[i].nume;
          lawyerPhonenumber = array[i].telefon;
        }
      }
    }
  }
}  

function incrementLawyerOficiiNumber(){    
  for(var i = 0; i < lawyerList.length; i++){
    if(lawyerList[i].nume == lawyerName){
      lawyerList[i].numarOficii++;
      for(var x = 0; x< listOfLawyers.length; x++)
      {
        if(listOfLawyers[x].nume == lawyerName){
          listOfLawyers.numarOficii++
        }
      }
    }
  }
  localStorage.setItem('itemsArray',JSON.stringify(listOfLawyers));
}

function displayLawyer(){
  var paraName = document.getElementById("lawyerNameDisplay");
  var paraPhonenumber = document.getElementById("lawyerPhonenumberDisplay");
  paraName.innerHTML ="Nume: " + lawyerName;
  paraPhonenumber.innerHTML = "Telefon: " + lawyerPhonenumber;
  document.getElementById("displayGivenLawyer").className += " displayGivenLawyerFilled";
}