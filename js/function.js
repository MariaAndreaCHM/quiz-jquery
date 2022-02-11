function play(){
  //alert pour commencer a jouer 
   const swalWithBootstrapButtons = Swal.mixin({
       backdrop: `
     rgba(0,0,123,0.4)
     url("assets/kirbi.gif")
     left top
     no-repeat
     
   `,
       customClass: {
       confirmButton: 'btn btn-success' ,
       cancelButton: 'btn btn-danger'
       },
       buttonsStyling: false
     })
     swalWithBootstrapButtons.fire({
       title: 'Voulez-vous jouer?',
      
       imageUrl: 'assets/play.png',
       imageWidth: 100,
       imageHeight: 100,
       showCancelButton: true,
       confirmButtonText: 'OUI, on y va',
       cancelButtonText: 'NON, au revoir'
     ,
       reverseButtons: true
     }).then((result) => {
         if(result.isConfirmed){
           
           
   $(".principal").children(".cont").eq(0).show(); 
 
   $("#pg_barre1").width(0);
   $("#pg1").show();

   $("#pg_barre2").width("100%");

   console.log("#conta2 width" + $("#conta2").width());

   $("#pg2").show();
   $('#pg_barre2').animate(
     {
       width: [0, "linear"]
     },
     2000,
     function () {
       console.log("TEMPS ECOULE");

       passer_a_la_question_suivante();
     })

         }else if(  window.close()){
          
         }

     }
     )
    
var resp =5; 
var numQ = 0;   
var numRep = 0; 
var cont=0;

function passer_a_la_question_suivante() {

 if (numQ  < resp) {
 
   $(".cont").hide();

   $('.principal').children('.cont').eq(numQ).next().show();


   numQ = numQ + 1;
   console.log(numQ);

   var newprogress = numQ / resp* 100;
   console.log(newprogress);
   $("#pg_barre1").width(newprogress + '%');
   $("#pg_barre1").text(newprogress + '%');

   $('#pg_barre2').removeAttr('style');
   $("#pg_barre2").width("100%");

  

   $('#pg_barre2').animate(
     {
       
       width: [0, "linear"]
     },
     1500,
     function () { 
       console.log("TEMPS ECOULE");


       passer_a_la_question_suivante();
     })
 }
 
 else {
   console.log(cont);
   Swal.fire({
    title: 'Est-ce que vous voulez garder le score?',
    text: 'Votre score '+cont,
    
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'oui'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Registrer votre user',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Envoyer',
        showLoaderOnConfirm: true,
        
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
          $.post("https://iut-deniau.alwaysdata.net/Ux2i/enregistrer_score_quiz.php",
      { quiz: "cartoon-quiz", score: cont, pseudo: result.value })
      
      .done(function () {
        Swal.fire(
          'Bien registré!',
          'Votre score est bien registré.',
          'success'
        )
      })
      .fail(function () {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'il y a un error!',
         
        })
      })
      .always(function () {
        // alert( "finished" );
      });
          
        }
      })
     
    }
  })

 }
}


$(document).ready(function () {





 $("#bilan").hide();

 $(".cont").hide();
 $("#pg1").hide();
 $("#pg2").hide();

 $("#result").hide();
 //click
$(".options").click(function(){
 // alert("pregunta"+numQ);
 numRep = $(this).parent().children('.options').index($(this));

 switch(numQ){
   case 0:
     if(numRep===0){
      $("#c1").css("background-color", "lightgreen");
      cont++;
    
     }else{
      $("#c1").css("background-color", "lightgreen");
      $("#c12").css("background-color", "lightcoral");
      $("#c13").css("background-color", "lightcoral");
      $("#c14").css("background-color", "lightcoral");

     }
     
     break;
     case 1:
      if(numRep===2){
        $("#c2").css("backgroud-color","lightgreen");
        cont++;
        
      }else{
        $("#c2").css("background-color", "lightgreen");
      $("#c22").css("background-color", "lightcoral");
      $("#c23").css("background-color", "lightcoral");
      $("#c24").css("background-color", "lightcoral");
      }
      
     break;
     case 2:
      if(numRep===0){
        $("#c3").css("backgroud-color","lightgreen");
        cont++;
      }else{
        $("#c3").css("background-color", "lightgreen");
        $("#c32").css("background-color", "lightcoral");
        $("#c33").css("background-color", "lightcoral");
        $("#c34").css("background-color", "lightcoral");
      }
     break;
     case 3:
      if(numRep===3){
        $("#c4").css("backgroud-color","lightgreen");
        cont++;
      }else{
        $("#c4").css("background-color", "lightgreen");
        $("#c42").css("background-color", "lightcoral");
        $("#c43").css("background-color", "lightcoral");
        $("#c44").css("background-color", "lightcoral");
      
      }
     break;
     case 4:
      if(numRep===2){
        $("#c5").css("backgroud-color","lightgreen");
        cont++;
      }else{
        $("#c5").css("background-color", "lightgreen");
      $("#c52").css("background-color", "lightcoral");
      $("#c53").css("background-color", "lightcoral");
      $("#c54").css("background-color", "lightcoral");
      }
      break;

 }
});



$("#scores").click(function(){
  
  $.getJSON('http://iut-deniau.alwaysdata.net/Ux2i/obtenir_classement_quiz.php?quiz=cartoon-quiz', function () {
    console.log("success");
  })
    .done(function (data) {
      console.log("second success");

      console.log("classement length : " + data.classement.length);

      console.log("score : " + data);

      for (let i = 0; i < data.classement.length; i++) {
        $( ".usuarios" ).append( '<br>'+data.classement[i].pseudo);
       $( ".scores" ).append( '<br>'+ data.classement[i].score);
        console.log(data.classement[i].pseudo);
        console.log(data.classement[i].score);
   
      }
    })
    .fail(function () {
      console.log("error");
    })
    .always(function () {
      console.log("complete");
    });
 
 });


});
}



 


