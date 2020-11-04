// api project using the pokemon api   https://pokeapi.co/  using AJAX  for the fetch API

$(function() {
   
        //set variable
         var pokemonSearch;
         var pokemonList;
         var listPokemonData;
         var selectSearch;
         // set defaults
         var defaultPokemon = '1';
         var defaultPokemonData;
        
      // set default pokemon on load
         var initFunc = function() {
             // https://pokeapi.co/api/v2/pokemon/?limit=811
              defaultPokemonData = $.ajax({
                 url: "https://pokeapi.co/api/v2/pokemon/" + defaultPokemon,
                 method: "GET"
             });
            
             defaultPokemonData.done(function( data ) {
                 defaultPokemonData = data;
                 var pokeImgFront = data.sprites.front_default;
                 var pokeImgBack = data.sprites.back_default;
                 var pokeImgShinyFront = data.sprites.front_shiny;
                 var pokeImgShinyBack = data.sprites.back_shiny;
                 //var pokeDescription = data.description;
                 var shiny = false;
                 var frontImg = true;

                 $('.loading-container').removeClass('active')
                 $('.pokedex h3').text(data.name.toUpperCase());
                 $('.poke-img img').attr('src', pokeImgFront);
                 // need to make  second ajax call to species url
                 //$('pokemon-description').attr(data.description);
                 console.log(defaultPokemonData);
                 shiny = false;
                 frontImg = true;

            // -> working reverse image function
       
            // $('.btn-rearview').on('click', function(){
            // $('.poke-img img').attr('src', data.sprites.back_default)
              // console.log(defaultPokemonData)
            // })

            // //refactor reverse image function and add shiny image
            $('.btn-shiny').on('click', function(){
              // console.log(' test trigger function');
            //$(".btn-shiny").click(function() {
            //  $(".poke-img img").attr("src", pokeImgShinyFront);
            //    shiny = true;
            //    frontImg = true;

            if (shiny == false && frontImg == true) {
              shiny = true;
            frontImg = true;
              $(".poke-img img").attr("src", pokeImgShinyFront);
            } 
            else if (shiny == false && frontImg == false) {
                 shiny = true;
                 frontImg = false;
                $(".poke-img img").attr("src", pokeImgShinyBack);
            }
            else if (shiny == true && frontImg == true) {
              shiny = false;
              frontImg = true;
             $(".poke-img img").attr("src", pokeImgFront);
            }
            else if (shiny == true && frontImg == false) {
              shiny = false;
              frontImg = false;
            $(".poke-img img").attr("src", pokeImgBack);
            }
              
            });

            $('.btn-rearview').on('click', function(){
              //console.log(' test trigger-flip');
              if (shiny == false && frontImg == true) {
                shiny = false;
                frontImg = false;
                $(".poke-img img").attr("src", pokeImgBack);
              } else if (shiny == false && frontImg == false) {
                shiny = false;
                frontImg = true;
                $(".poke-img img").attr("src", pokeImgFront);
              } else if (shiny == true && frontImg == true) {
                shiny = true;
                frontImg = false;
                $(".poke-img img").attr("src", pokeImgShinyBack);
              } else if (shiny == true && frontImg == false) {
                shiny = true;
                frontImg = true;
                $(".poke-img img").attr("src", pokeImgShinyFront);
              }
            });

           
            });
         
            defaultPokemonData.fail(function( jqXHR, textStatus, error ) {
                alert( "Request failed: " + textStatus + ' ' + error );
                console.log(error)    
            });
         }

         initFunc()



        //value submitted from form
        $('.btn').on('click', function(){
            pokemonSearch = $('.pokedex input[type="text"]').val()
            
        //concat
        var request = $.ajax({
            // url: "https://pokeapi.co/api/v2/pokemon/pikachu",
           url: "https://pokeapi.co/api/v2/pokemon/" + pokemonSearch,
          method: "GET",
          // data: { id : menuId },
          // dataType: "html"       
        });
      
        request.done(function( data ) {
            $('.pokedex h3').text(data.name.toUpperCase());
             $('.poke-img img').attr('src', data.sprites.front_default)
             shiny = false;
             frontImg = true;

             request = data;
                 var pokeImgFront = data.sprites.front_default;
                 var pokeImgBack = data.sprites.back_default;
                 var pokeImgShinyFront = data.sprites.front_shiny;
                 var pokeImgShinyBack = data.sprites.back_shiny;
         // console.log(data)

         $('.btn-shiny').on('click', function(){

        if (shiny == false && frontImg == true) {
          shiny = true;
        frontImg = true;
          $(".poke-img img").attr("src", pokeImgShinyFront);
        } 
        else if (shiny == false && frontImg == false) {
             shiny = true;
             frontImg = false;
            $(".poke-img img").attr("src", pokeImgShinyBack);
        }
        else if (shiny == true && frontImg == true) {
          shiny = false;
          frontImg = true;
         $(".poke-img img").attr("src", pokeImgFront);
        }
        else if (shiny == true && frontImg == false) {
          shiny = false;
          frontImg = false;
        $(".poke-img img").attr("src", pokeImgBack);
        }
          
        });

        $('.btn-rearview').on('click', function(){
          //console.log(' test trigger-flip');
          if (shiny == false && frontImg == true) {
            shiny = false;
            frontImg = false;
            $(".poke-img img").attr("src", pokeImgBack);
          } else if (shiny == false && frontImg == false) {
            shiny = false;
            frontImg = true;
            $(".poke-img img").attr("src", pokeImgFront);
          } else if (shiny == true && frontImg == true) {
            shiny = true;
            frontImg = false;
            $(".poke-img img").attr("src", pokeImgShinyBack);
          } else if (shiny == true && frontImg == false) {
            shiny = true;
            frontImg = true;
            $(".poke-img img").attr("src", pokeImgShinyFront);
          }
        });

      });
      
        request.fail(function( jqXHR, textStatus, error ) {
          alert( "Request failed: " + textStatus + ' ' + error );
        });
      });


// additionial  challenge :
// use  the api that gives all pokemons names https://pokeapi.co/api/v2/pokemon/?limit=811,  setup get request to pull data from api
// create a popup,have button that when clicked have list popup from side have div that shows up with all pokemeon, can scroll to find pokemon
//- in html set up a field with dropdown that will display the data as a list, use supplied api and use same code to pull data, in results property, use array,
// loop thru all and dispaly on a list, create  anchor links in data from list of urls that when click on links menu disappears and image and name changes
//add button to show back view of pokemon
// add button to show shiny view or pokemon
//good reference https://codepen.io/siliconunicorn/pen/VqoxXP 

//Solution:

//on load (init function) get data for drop down list  from API

       var initFuncTwo = function() {

        listPokemonData = $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/?limit=811",
        method: "GET"
       });
//  when done use use data to give list of pokemon as options of drop down menu 
       listPokemonData.done(function( data ) {
        listPokemonData = data;
       // console.log(listPokemonData);
        //console.log(listPokemonData.results[2])
        
//set data as an array
        var namesList = listPokemonData.results;
       // console.log(namesList);

//loop thru array with for of loop    
        var i = 0;
        for (i of namesList) {
        //console.log(i.name);

// Set names as option text and url as anchor link
// Reference found  https://www.geeksforgeeks.org/how-to-add-options-to-a-select-element-using-jquery/?ref=lbp
// Syntax - $('#selectBox').append($('<option>').val(optionValue).text(optionText))
// Alt Syntax - $('#select1').append(`<option value="${optionValue}">${optionText}</option>`); 
 
       $('.list').append(`<option value="${i.name}">${i.name}</option>`); 
    };
    
        
// if name is selected "on change" of option search for that pokemon
$('.list').on('change', function() {
    selectSearch = $('.list').val()
    //console.log(selectSearch)
    
//concat
var request = $.ajax({
    // url: "https://pokeapi.co/api/v2/pokemon/pikachu",
   url: "https://pokeapi.co/api/v2/pokemon/" + selectSearch,
  method: "GET",
  // data: { id : menuId },
  // dataType: "html"       
});

request.done(function( data ) {
    $('.pokedex h3').text(data.name.toUpperCase());
     $('.poke-img img').attr('src', data.sprites.front_default)
 // console.log(data)
 shiny = false;
 frontImg = true;

 request = data;
     var pokeImgFront = data.sprites.front_default;
     var pokeImgBack = data.sprites.back_default;
     var pokeImgShinyFront = data.sprites.front_shiny;
     var pokeImgShinyBack = data.sprites.back_shiny;
// console.log(data)

$('.btn-shiny').on('click', function(){

if (shiny == false && frontImg == true) {
shiny = true;
frontImg = true;
$(".poke-img img").attr("src", pokeImgShinyFront);
} 
else if (shiny == false && frontImg == false) {
 shiny = true;
 frontImg = false;
$(".poke-img img").attr("src", pokeImgShinyBack);
}
else if (shiny == true && frontImg == true) {
shiny = false;
frontImg = true;
$(".poke-img img").attr("src", pokeImgFront);
}
else if (shiny == true && frontImg == false) {
shiny = false;
frontImg = false;
$(".poke-img img").attr("src", pokeImgBack);
}

});

$('.btn-rearview').on('click', function(){
//console.log(' test trigger-flip');
if (shiny == false && frontImg == true) {
shiny = false;
frontImg = false;
$(".poke-img img").attr("src", pokeImgBack);
} else if (shiny == false && frontImg == false) {
shiny = false;
frontImg = true;
$(".poke-img img").attr("src", pokeImgFront);
} else if (shiny == true && frontImg == true) {
shiny = true;
frontImg = false;
$(".poke-img img").attr("src", pokeImgShinyBack);
} else if (shiny == true && frontImg == false) {
shiny = true;
frontImg = true;
$(".poke-img img").attr("src", pokeImgShinyFront);
}
});
});

request.fail(function( jqXHR, textStatus, error ) {
  alert( "Request failed: " + textStatus + ' ' + error );
});
});
        
   });


};
initFuncTwo()

});
   

//Outstanding Tasks


//Blue Buttons  w/numbers on click show number in search input box and search by number on submit button
// show description in box
// show number of pokemon in name box above image
//show attack and speed etc in a boxes
//add pokemon logo and style project to be my own(background etc
//post on GitHub/pages)
