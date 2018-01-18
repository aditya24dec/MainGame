var tripCount=0;
function check()
{

  var elem = document.getElementById("boat1");   
  var rect = elem.getBoundingClientRect();
  var tripCounter = document.getElementById("trips");
  if(checkBoatCount()!=0)
    tripCount++;
  tripCounter.innerHTML = tripCount;
  
  var status=true;

  if(rect.left<=400)
  { 
     status = sourceCount();
  }
  else if(rect.left>=600){
      status=destCount();
  }
 // alert(status);
  if(status==true)
  {
    //alert("check move");
    myMove();
  }
  else{
   // alert("Game over");
     gameOver();
  }
}

function myMove() {
  var elem = document.getElementById("boat1");   
  var rect = elem.getBoundingClientRect();
 // alert(rect.left);
     if (checkBoatCount()!=0) {
     
     // alert("boat");
     // elem.style.left = 500 +'px';
                if (rect.left<=400) {
                  var  pos=0;
                  var id = setInterval(forward, 5);
                }else if(rect.left>=600)
                {
          
                  var pos = 550;
                   var id = setInterval(backward, 5);
               
                } 
              }else
                   {
                   alert("Boat is empty");
                   }

               function backward()
                {
                  if (pos==0) {
                    var status = sourceCount();
                    if (status==false) {
                     // alert("GAME OVER");
                        gameOver();
                    }
                    clearInterval(id);
                  }
                  else{
                    pos--;
                    elem.style.left =pos+'px';
                  }
                }

                //alert("boat clicked");
                function forward() {
                  if (pos == 530) {
                    var status = destCount();
                    if (status==false) {
                     // alert("GAME OVER");
                      gameOver();
                    }
                    clearInterval(id);
                  } else {
                    pos++; 
                    elem.style.left = pos + 'px'; 
                  }
                }
}



//Function to put charector into the boat
function putchar(charId)
{
//alert("put called");
var elemm = document.getElementById(charId);
var sor = document.getElementById("source");
var charPos=elemm.getBoundingClientRect();
sourceCount();
//alert(charPos.left);
//alert(charPos.top);

      if(charPos.left<=230){
          if(checkBoatCount()<2){

              sor.removeChild(elemm);
              elemm.style.position="absolute"
              appendBoat(elemm,charId);
          }
          else{
            alert("boat is full");
          }
        }
        else{
            
             // elem.style.top=432;
                var b = document.getElementById("boat1");
               
                //  elemm.style.left=216;
                 
                  
                    //  alert(checkBoatCount());
                      b.removeChild(elemm);
                      elemm.style.position="static";
                      if(charId=="c3" || charId=="c2" || charId=="c1")
                      elemm.setAttribute("class","canni");
                      else
                      elemm.setAttribute("class","saint");
                      sor.appendChild(elemm);

                   
                        // alert("hello");
                    

        }
}

//Function to append the boat 
function appendBoat(elemm,charId)
{
   var b = document.getElementById("boat1");
   if(charId=="c3" || charId=="c2" || charId=="c1")
                      elemm.setAttribute("class","canni");
                      else
                      elemm.setAttribute("class","saint");

   elemm.style.position="relative";
   elemm.style.left= -350+'px';
   //elemm.style.top=-50;
  // alert(checkBoatCount());


   b.appendChild(elemm);
  // alert("appended");
  // move();

}

//To checl the count of the boat
function checkBoatCount()
{
    var b = document.getElementById("boat1");
    var saints = b.querySelectorAll("img.saint");
    var canni = b.querySelectorAll("img.canni");
    return saints.length+canni.length;
}


//Function to drop character on the destination site

function dropChar(charId)
{
      var dest = document.getElementById("dest");
      var elem = document.getElementById(charId);
      var sor = document.getElementById("source"); 
      var b = document.getElementById("boat1");

      var rect = elem.getBoundingClientRect();
     // alert(rect.left);
     // alert("drop invoked"); 
      destCount();


      if(rect.left>=900){

            if(checkBoatCount()<2)
            {
                dest.removeChild(elem);
                elem.style.position="absolute";
                appendBoat(elem,charId);
            }
            else{
              alert("boat is full");
            }
      }
        else{
            var b = document.getElementById("boat1");
               
                //  elemm.style.left=216;
                 
                  
                     // alert(checkBoatCount());
                      b.removeChild(elem);
               if(charId=="c3" || charId=="c2" || charId=="c1")
                              elem.setAttribute("class","canni");
                              else
                              elem.setAttribute("class","saint");
              elem.style.position="relative";
              elem.style.left=1;
              elem.style.top=2;
              dest.appendChild(elem);
            //  sor.removeChild(elem);
      }
     
}


//to count the number of character at destination

function destCount()
{
  var status=false;
  var b = document.getElementById("boat1");
  var saints1 = b.querySelectorAll("img.saint");
  var canni1 = b.querySelectorAll("img.canni");


  var dest = document.getElementById("dest");
  var saints = dest.querySelectorAll("img.saint");
  var canni = dest.querySelectorAll("img.canni");


 // alert(saints.length+""+saints1.length +" and" +canni.length+":"+canni1.length);
  //alert(saints.length+saints1.length+canni.length+canni1.length);
  if(saints.length+saints1.length==canni.length+canni1.length){
    //alert("con1");
    if(saints.length==1 && canni.length==2){
            //  alert("con4")
              status=false;
              }else
                status=true;
  }
  else if(saints.length+saints1.length==0){
   // alert("con2");
    status=true;
  }
  else if (saints.length+saints1.length>canni.length+canni1.length) {
     // alert("con3");
      status = true;
  }
  else
  {
    //alert("con5");
    status=false;
  }


   if ((saints.length+saints1.length+canni.length+canni1.length)==6) {
    win();
  }
  return status;
}



//to count number of character at source
function sourceCount()
{
   var status=true;
  var b = document.getElementById("boat1");
  var saints1 = b.querySelectorAll("img.saint");
  var canni1 = b.querySelectorAll("img.canni");

  var sor = document.getElementById("source"); 
  var saints = sor.querySelectorAll("img.saint");
  var canni = sor.querySelectorAll("img.canni");


 //alert(saints.length+""+saints1.length +" and" +canni.length+canni1.length);

 if (saints.length<canni.length && saints.length!=0) {
  status=false;
 }
 else if (saints.length==0) {
  status=true;
 }
 else if (saints.length+saints1.length==canni.length+canni1.length) {status=true;}

  else if (saints.length<canni.length+canni1.length) {status=false;}

 


  return status;
}



function Main(charId)
{
    var elem = document.getElementById("boat1");   
    var rect = elem.getBoundingClientRect();
    if(rect.left<=400)
    {
        putchar(charId);
    }
    else if(rect.left>=600) {
        dropChar(charId);
    }
}

function gameOver()
{ 
    postData();
    alert("Game Over"); 
    document.location.reload();


}




function win()
{
  postData();
  alert("You Win");
  document.location.reload();
}

//method for posting score
function postData()
{

  var Finalmin = document.getElementById("min").textContent;
  var Finalsec = document.getElementById("sec").textContent;
  var noOftrip = document.getElementById("trips").textContent;
  
  var user = localStorage.getItem("user");
  var Finalscore = (Finalmin + Finalsec)*noOftrip;


console.log("email is :",user);

  let tate = {score:Finalscore ,username:user};
  let options = {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      method: 'Post',
     body: JSON.stringify(tate)
        }
  console.log("this is the state",options);
 // alert("hiii");
  console.log("calling post");
  //ChromeSamples.log('Posting request to GitHub API...');
  fetch('/scoreSave',options)
  .then((response) => {

        console.log("this is the response",response);
        if(response.status == 200) {
          response.json().then((userData) => {
            console.log("userData---",userData);

            //browserHistory.push('child')


            // userData is the required object contining the user data
          })
        } else {
          response.text().then((text) => {
            // Any text sent from server
          })
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
  
}


//Function for timer

function startTime()
{

var minLabel = document.getElementById("min");
var secLabel = document.getElementById("sec");

setInterval(setTIme,1000);
   var count=0;
var min =0; 
    function setTIme()
    {
      if(count==60)
      {
        min++;
        count=0;
      }

      minLabel.innerHTML = writeTime(min);
 
      secLabel.innerHTML = writeTime(count);
      count++;
    }

    function writeTime(val)
    {
      var timeString = val+"";
      if(timeString.length<2)
      {
        return "0"+timeString;
      }
      else
      {
        return timeString;
      }
    }


}