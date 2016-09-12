var lawyerList  = JSON.parse( localStorage.getItem( 'itemsArray' ) );
var dateMatrix = JSON.parse( localStorage.getItem( 'dates' ) ); 
var currentListLink  = 1;
lawyerList.sort(sortLawyerList); 
generateLists();

function generateLists(){
  for(var x =1 ; x<=8; x++){
    document.getElementById("lista"+x).innerHTML = "";
  }
  var extraLawyers = lawyerList.length%8;
  var currentList;
  var currentOlLawyerList;
  var lawyerCounter = 0;
  var extraIndex;
  var currentLawyer;
  var lawyerName;
  var lawyerPhonenumber;
  var buttonDelete;
  var buttonSuspend;
  var buttonEdit;
 
  for(var list=1; list <= 8; list++){
    currentList = document.getElementById("lista"+list);
    currentOlLawyerList = document.createElement("ol");
    currentList.className = "hidden";
    
    if(extraLawyers > 0){ 
      var extraIndex =1;
    }else{
      var extraIndex = 0;
    }
    
    for(var x = 0; x < Math.floor(lawyerList.length/8)+extraIndex; x++){
        var currentLawyer = createLawyerLi(lawyerCounter, list);
        currentOlLawyerList.appendChild(currentLawyer);
        lawyerCounter++;     
    }
    extraLawyers--;
    currentList.appendChild(currentOlLawyerList);
    var currentListDates = generateListDates(list-1);
    var listDateElement = listDateElementGenerate(currentListDates);
    currentOlLawyerList.appendChild(listDateElement);
  }
};

function listDateElementGenerate(array){
  var element = document.createElement("div");
  var p = document.createElement("p")
  var dateTextNode = document.createTextNode("Urmatoarea perioada in care prezenta lista e activa:");
  p.appendChild(dateTextNode)
  element.appendChild(p);
  var elementText = dateText(array[0]);
  element.appendChild(elementText);
  element.className = "dateElement";
  
  element.addEventListener("mouseover", function(){   
    this.innerHTML = "";
    var p = document.createElement("p");
    var dateTextNode = document.createTextNode("Prezenta lista va fi activa in urmatoarele perioade:");
    p.appendChild(dateTextNode);
    this.appendChild(p);
    for(var x = 0; x< array.length; x++){
      var elementText = dateText(array[x]);
      this.appendChild(elementText);
    }
  })
  
  element.addEventListener("mouseout", function() {   
    this.className ="dateElement";
    this.innerHTML = "";
    var p = document.createElement("p");
    var dateTextNode = document.createTextNode("Urmatoarea perioada in care prezenta lista e activa:");
    p.appendChild(dateTextNode);
    this.appendChild(p);
    var elementText = dateText(array[0]);
    this.appendChild(elementText);
  })
  
  return element;
  
}
   
function dateText(date){
 
  var startDate = new Date(date)
  var pDate = document.createElement("p")
  var startDateMonth = startDate.getMonth()+1;
  var startDateDay = startDate.getDate();
  var endDate = startDate;
  endDate.setDate(endDate.getDate() + 6);
  var endDateMonth = endDate.getMonth()+1;
  var endDateDay = endDate.getDate();
  var period = document.createTextNode(startDateDay + " / " + startDateMonth + " - " + endDateDay + " / " + endDateMonth + " ");
  pDate.appendChild(period) 
  return pDate;
 
} 

function createLawyerLi(nr, x){
  lawyerList[nr].lista = x;
  var suspendText = document.createTextNode("suspenda");
  var deleteText = document.createTextNode("sterge");
  var editText = document.createTextNode("modifica");
  buttonDelete = document.createElement("button");
  buttonDelete.appendChild(deleteText);
  buttonEdit = document.createElement("button");
  buttonEdit.appendChild(editText)
  buttonSuspend = document.createElement("button");
  buttonSuspend.appendChild(suspendText);
  var br = document.createElement("br");
  currentLawyer = document.createElement("li");
  var phoneLogo = document.createElement("i");
  phoneLogo.className = "fa fa-phone";
  buttonDelete.className = "sideButtons";
  buttonSuspend.className = "sideButtons";
  buttonEdit.className = "sideButtons";
  currentLawyer.className = "lawyerElement";
  
  if(lawyerList[nr].suspendat == true){
    currentLawyer.className += " suspendedLawyer"
    var unsuspendText = document.createTextNode("anuleaza suspendarea");
    buttonSuspend.innerHTML = "";
    buttonSuspend.appendChild(unsuspendText);
  }
  
  if(nr%2){
    currentLawyer.className += " color1";
  }else{
    currentLawyer.className += " color2";
  }
  
  lawyerName = document.createTextNode("nume: " + lawyerList[nr].nume + " ");
  lawyerPhonenumber = document.createTextNode(" " + lawyerList[nr].telefon);
  currentLawyer.appendChild(lawyerName);
  currentLawyer.appendChild(br);
  currentLawyer.appendChild(phoneLogo);
  currentLawyer.appendChild(lawyerPhonenumber);
  currentLawyer.appendChild(buttonDelete);
  currentLawyer.appendChild(buttonSuspend);
  currentLawyer.appendChild(buttonEdit);
  currentLawyer.number = nr;
  
  buttonSuspend.onclick  = function(){
    myHandlerSuspend(this.parentElement, this);
  }
  
  buttonEdit.onclick  = function(){
    myHandlerEdit(this.parentElement, this)
  }
  
   buttonDelete.onclick  = function(){
    myHandlerDelete(this.parentElement, this)
  }
  return currentLawyer;
}


document.getElementById("addNewLawyerButton").onclick = function(){
  var addLawyerDiv = document.getElementById("addLawyer");
  addLawyerDiv.className = "outside";
  document.getElementById("addLawyerForm").className = "addLawyerForm";
  document.getElementById("addLawyerForm").className += " addEditSuspendDeleteDiv";
  
  addLawyerDiv.onclick = function(){
    this.className = "hidden";
  }
  
  document.getElementById("addLawyerForm").onclick = function (e){
    e.stopPropagation();
  } 
} 

function myHandlerEdit(clickedLi, buttonEditClicked){
  document.getElementById("editLawyer").className = "outside";
  document.getElementById("editLawyerForm").className = "addEditSuspendDeleteDiv";
  document.getElementById("editLawyerForm").className += " editLawyerForm";
  document.getElementById("editName").placeholder = lawyerList[clickedLi.number].nume;
  document.getElementById("editPhone").placeholder = lawyerList[clickedLi.number].telefon;
  
  document.getElementById("editLawyer").onclick = function(){
    this.className = "hidden";
  }
  
  document.getElementById("editLawyerForm").onclick = function (e){
    e.stopPropagation();
  } 
  
  document.getElementById("editLawyerButtonYes").onclick = function (){
  
    if(document.getElementById("editName").value !== ""){
      lawyerList[clickedLi.number].nume = document.getElementById("editName").value;
    }
    if(document.getElementById("editPhone").value !== ""){
      lawyerList[clickedLi.number].telefon = document.getElementById("editPhone").value;
    }
    if(document.getElementById("inputEditM").checked){
      lawyerList[clickedLi.number].sex = "M"
    }
    if(document.getElementById("inputEditF").checked){
      lawyerList[clickedLi.number].sex = "F";
    }
    lawyerList.sort(sortLawyerList) 
    generateLists();
    localStorage.setItem('itemsArray',JSON.stringify(lawyerList));
    document.getElementById("lista"+currentListLink).className = "currentList";
    document.getElementById("editLawyer").className = "hidden";
  }
  document.getElementById("editLawyerButtonNo").onclick = function (){
  document.getElementById("editLawyer").className = "hidden";
  }

}

function myHandlerDelete(clickedLi, buttonDeleteClicked){
  document.getElementById("deleteLawyer").className = "outside";
  document.getElementById("deleteAlert").className = "addEditSuspendDeleteDiv";
  document.getElementById("deleteAlert").className += " deleteAlert";
  document.getElementById("deleteLawyerName").innerHTML = lawyerList[clickedLi.number].nume;
  
  document.getElementById("deleteLawyer").onclick = function(){
    this.className = "hidden";
  }
  
  document.getElementById("deleteAlert").onclick = function (e){
    e.stopPropagation();
  } 
  
  document.getElementById("yesDelete").onclick = function(){
    lawyerList.splice(clickedLi.number,1);
    generateLists();
    localStorage.setItem('itemsArray',JSON.stringify(lawyerList));
    document.getElementById("lista"+currentListLink).className = "currentList";  
    document.getElementById("deleteLawyer").className = "hidden";
  }
  
  document.getElementById("noDelete").onclick = function (){
    document.getElementById("deleteLawyer").className = "hidden";
  }
}

function myHandlerSuspend(clickedLi, buttonSuspendClicked){
  var unsuspendText = document.createTextNode("anuleaza suspendarea");
  var suspendText = document.createTextNode("suspenda");
  if(buttonSuspendClicked.firstChild.nodeValue == "suspenda"){
    clickedLi.className += " suspendedLawyer";
    buttonSuspendClicked.innerHTML = "";
    buttonSuspendClicked.appendChild(unsuspendText);
    document.getElementById("suspendLawyer").className = "outside";
    document.getElementById("suspendAlert").className = "addEditSuspendDeleteDiv";
    document.getElementById("suspendAlert").className += " suspendAlert";
    
    document.getElementById("ok").onclick = function (){
      document.getElementById("suspendLawyer").className = "hidden";
    }
    
    document.getElementById("suspendLawyer").onclick = function(){
      this.className = "hidden";
    }
    
    document.getElementById("suspendAlert").onclick = function (e){
    e.stopPropagation();
    } 
    lawyerList[clickedLi.number].suspendat = true;
    localStorage.setItem('itemsArray',JSON.stringify(lawyerList));
    
    return;
  }
  if(buttonSuspendClicked.firstChild.nodeValue == "anuleaza suspendarea"){
    clickedLi.className = " lawyerElement";
    if(clickedLi.number%2 == 0){
      clickedLi.className += " color2";
    }else{
      clickedLi.className += " color1";
    }
    buttonSuspendClicked.innerHTML = "";
    buttonSuspendClicked.appendChild(suspendText);
    lawyerList[clickedLi.number].suspendat = false;
    localStorage.setItem('itemsArray',JSON.stringify(lawyerList));
    return;
  }
}

function myHandlerEdit(clickedLi, buttonEditClicked){
  document.getElementById("editLawyer").className = "outside";
  document.getElementById("editLawyerForm").className = "addEditSuspendDeleteDiv";
  document.getElementById("editLawyerForm").className += " editLawyerForm";
  document.getElementById("editName").placeholder = lawyerList[clickedLi.number].nume;
  document.getElementById("editPhone").placeholder = lawyerList[clickedLi.number].telefon;
  
  document.getElementById("editLawyer").onclick = function(){
    this.className = "hidden";
  }
  
  document.getElementById("editLawyerForm").onclick = function (e){
    e.stopPropagation();
  } 
  
  document.getElementById("editLawyerButtonYes").onclick = function (){
  
    if(document.getElementById("editName").value !== ""){
      lawyerList[clickedLi.number].nume = document.getElementById("editName").value;
    }
    if(document.getElementById("editPhone").value !== ""){
      lawyerList[clickedLi.number].telefon = document.getElementById("editPhone").value;
    }
    if(document.getElementById("inputEditM").checked){
      lawyerList[clickedLi.number].sex = "M"
    }
    if(document.getElementById("inputEditF").checked){
      lawyerList[clickedLi.number].sex = "F";
    }
    lawyerList.sort(sortLawyerList) 
    generateLists();
    localStorage.setItem('itemsArray',JSON.stringify(lawyerList));
    document.getElementById("lista"+currentListLink).className = "currentList";
    document.getElementById("editLawyer").className = "hidden";
  }
  
  document.getElementById("editLawyerButtonNo").onclick = function (){
    document.getElementById("editLawyer").className = "hidden";
  }
}

document.getElementById("addLawyerForm").addEventListener("submit", function(e){
  e.preventDefault();
  var minNumberOficii = lawyerList.reduce(function(a,b){
    if (b.numarOficii < a.numarOficii){
      return b;
    }else{
    return a;
    }
  });
  var newLawyer = {
    nume: document.getElementById("name").value,
    telefon: document.getElementById("phone").value,
    suspendat:false,
    numarOficii: minNumberOficii.numarOficii
  }
  
  if(document.getElementById("inputM").checked){
    newLawyer.sex = "M"
  }
  if(document.getElementById("inputF").checked){
    newLawyer.sex = "F";
  }
  if(isNaN(newLawyer.telefon)){
    document.getElementById("error").innerHTML = "Nu ati introdus un numar de telefon";
  }else if(!document.getElementById("inputM").checked && !document.getElementById("inputF").checked){
    document.getElementById("error").innerHTML = "Nu ati bifat sexul";
  }else{
    document.getElementById("error").className = "hidden";
    lawyerList.push(newLawyer);
    lawyerList.sort(sortLawyerList) 
    localStorage.setItem('itemsArray',JSON.stringify(lawyerList));
    generateLists();
    document.getElementById("lista"+currentListLink).className = "currentList";
    document.getElementById("addLawyer").className = "hidden";
  }
});

function sortLawyerList(a, b){
  var nameA=a.nume.toLowerCase(), nameB=b.nume.toLowerCase()
  if (nameA < nameB) 
    return -1;
  if (nameA > nameB)
    return 1;
  return 0;
}

function generateListDates(currentList){
var today = new Date();
var todayMonth = today.getMonth()+1;
var todayDay  = today.getDate();
var nextDateReturn = 0;


  for(var y = 0; y < dateMatrix[currentList].length; y++)
  { var thisDate = new Date(dateMatrix[currentList][y])
    var thisDay = thisDate.getDate();
    var thisMonth = thisDate.getMonth()+1;
    if((thisMonth == todayMonth && todayDay >= thisDay && todayDay <thisDay+7)||(thisMonth == todayMonth && todayDay < thisDay)){
      nextDateReturn= y;
      break;
    }
    if(thisMonth == todayMonth && todayDay > thisDay + 7){ 
      nextDateReturn = y+1;
      break;
    }
    if(thisMonth-1 == todayMonth){
      nextDateReturn =y;
      break;
    }
    if(thisMonth-2 == todayMonth){
      nextDateReturn =y;
      break;
    }
  }
  return dateMatrix[currentList].slice(y, dateMatrix[currentList].length);
}

(function generateLinks(){
  document.getElementById("lista1").className = "currentList";

  for(var i=1; i<=8; i++){
    var link = document.getElementById(i);
    link.number = i;
    link.onclick = function() {
      myHandlerSurf.bind(this)(this.number);
    }
  }
}());

function myHandlerSurf(clickedNumber){
  if(clickedNumber == currentListLink){
    return;
  }else{
    document.getElementById("lista"+ clickedNumber).className = "currentList";
    document.getElementById("lista"+currentListLink).className = "hidden";
    document.getElementById("listNumber").innerHTML = "Lista "+clickedNumber;
    currentListLink  =  clickedNumber;    
  }
}


