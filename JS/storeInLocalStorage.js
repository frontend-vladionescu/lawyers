var listaStagiari = [{nume: "Figma Ion", telefon:"0711111111", numarOficii: 0, sex:"M"},
                     {nume: "Smith Ioana", telefon:"0722222222", numarOficii: 0, sex:"F"},
                     {nume: "Iubita Iubita", telefon:"0733333333", numarOficii: 0, sex:"F"},
                     {nume: "Ionel Popescu", telefon:"0711111111", numarOficii: 0, sex:"M"},
                     {nume: "Grig George", telefon:"0722222222", numarOficii: 0, sex:"F"},
                     {nume: "Silviu Valer", telefon:"0733333333", numarOficii: 0, sex:"F"},
                     {nume: "Varnea Ion", telefon:"0711111111", numarOficii: 0, sex:"M"},
                     {nume: "Mure Ioana", telefon:"0722222222", numarOficii: 0, sex:"F"},
                     {nume: "Ionel Ion", telefon:"0711111111", numarOficii: 0, sex:"M"},
                     {nume: "Ioana Ioana", telefon:"0722222222", numarOficii: 0, sex:"F"},
                     {nume: "Adriana Iubita", telefon:"0733333333", numarOficii: 0, sex:"F"},
                     {nume: "Iulian Petronelius", telefon:"0711111111", numarOficii: 0, sex:"M"},
                     {nume: "Andreea Gabor", telefon:"0722222222", numarOficii: 0, sex:"F"},
                     {nume: "Sergiu Valean", telefon:"0733333333", numarOficii: 0, sex:"F"},
                     {nume: "Urnea Ion", telefon:"0711111111", numarOficii: 0, sex:"M"},
                     {nume: "Martin Ioana", telefon:"0722222222", numarOficii: 0, sex:"F"},
                     {nume: "Ion Ion", telefon:"0711111111", numarOficii: 0, sex:"M"},
                     {nume: "Crista Ioana", telefon:"0722222222", numarOficii: 0, sex:"F"},
                     {nume: "Diana Iubita", telefon:"0733333333", numarOficii: 0, sex:"F"},
                     {nume: "Tudor Tudorean", telefon:"0711111111", numarOficii: 0, sex:"M"},
                     {nume: "Cristie Glabe", telefon:"0722222222", numarOficii: 0, sex:"F"},
                     {nume: "Sili Vados", telefon:"0733333333", numarOficii: 0, sex:"F"},
                     {nume: "Jitariu Ion", telefon:"0711111111", numarOficii: 0, sex:"M"},
                     {nume: "Maria Ioana", telefon:"0722222222", numarOficii: 0, sex:"F"},
                     {nume: "Diana Ioana", telefon:"0722222222", numarOficii: 0, sex:"F"},
                     {nume: "Laura Ioana", telefon:"0722222222", numarOficii: 0, sex:"F"},
                     {nume: "Gripa Dana", telefon:"0722222222", numarOficii: 0, sex:"F"}
                    ];
  
  
  
listaStagiari.sort(sortLawyerList); 



var matrixForDates = dateMatrixGenerator();

function sortLawyerList(a, b){
  var nameA = a.nume.toLowerCase(), nameB = b.nume.toLowerCase()
  if ( nameA < nameB ){
    return -1;
  }if (nameA > nameB){
    return 1;
  }
  return 0;
} 


(function addSuspendValue(){
  for(var x=0 ;x <listaStagiari.length; x++)
  {
    listaStagiari[x].suspendat = false;
  }
}());


(function addListNumber(){
  var elementsInList = Math.floor(listaStagiari.length/8);
  var extraElementsInList = listaStagiari.length%8;

  var counter = 0;
  for(var x = 1; x<= extraElementsInList; x++){
    var counterList = elementsInList+1;
    while(counterList > 0){
      listaStagiari[counter].lista = x;
      counter++;
      counterList--;
    }
  }
  for(var y = extraElementsInList+1; y<= 8; y++){
    var counterList = elementsInList;
    while(counterList > 0){
      listaStagiari[counter].lista = y;
      counter++;
      counterList--;
    }
  }
}());


function dateMatrixGenerator(){
  var datesForList = 0;
  var listNumber = 0;
  var dateMatrix=[];
  var startingDate = new Date("01/01/2016");

  for(var x=0; x<8; x++){
    dateMatrix[x]=[];
  }

  while(startingDate.getFullYear() != 2017){
    dateMatrix[listNumber][datesForList] ="";
    dateMatrix[listNumber][datesForList] += startingDate;
    listNumber++;
  
    if(listNumber==8){
      listNumber = 0;
      datesForList++;
    }
    startingDate.setDate(startingDate.getDate() + 7);
  }
  return dateMatrix
}
 
var check1 = JSON.parse( localStorage.getItem( 'itemsArray' ) );
var check2 = JSON.parse( localStorage.getItem( 'dates' ) );

if(check1 == null){
  localStorage.setItem('itemsArray',JSON.stringify(listaStagiari));
}

if(check2 == null){
  localStorage.setItem('dates',JSON.stringify(matrixForDates));
}


