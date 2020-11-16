

// api project using the pokemon api   https://pokeapi.co/  using AJAX  for the fetch API

    $(function() {
   
      //-----------------set variables-----------------------------
      var pokemonSearch;
      var listPokemonData;
      var selectSearch;
      
      // ----------------set defaults--------------------------------
      var defaultPokemon = '1';
      var defaultPokemonData;
    
      // -------------set default pokemon on load----------------------

      // -----------------Default - 3 AJAX REQUESTS FOR DEFAULT POKEMON------------------------
      var initFunc = function() {
          // https://pokeapi.co/api/v2/pokemon/?limit=811
          defaultPokemonData = $.ajax({
              url: "https://pokeapi.co/api/v2/pokemon/" + defaultPokemon,
              method: "GET"
      });

      var defaultDescriptionData = $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon-species/" + defaultPokemon,
        method: "GET"
    });

    var defaultMovesData = $.ajax({
      url: "https://pokeapi.co/api/v2/move/" + defaultPokemon,
      method: "GET"
  });

        //-------------------DEFAULT POKEMON  DONE SET VARIABLES & UPDATE UI-------------------
            defaultPokemonData.done(function( data ) {
              defaultPokemonData = data;
              var pokeImgFront = data.sprites.front_default;
              var pokeImgBack = data.sprites.back_default;
              var pokeImgShinyFront = data.sprites.front_shiny;
              var pokeImgShinyBack = data.sprites.back_shiny;
              var hpStats = data.stats[0].base_stat;
              var attackStats =  data.stats[1].base_stat;
              var defenseStats = data.stats[2].base_stat;
              var specAttack = data.stats[3].base_stat;
              var specDefense = data.stats[4].base_stat;
              var specDefense = data.stats[5].base_stat;
              var pokeTypeA = data.types[0].type.name;
              // var pokeTypeB = data.types[1].type.name;
              var moves = data.moves[0].move.name;
              var allMoves = data.moves;
              var shiny = false;
              var frontImg = true;
                 
              $('.loading-container').removeClass('active')
              $('.pokedex h3').text(data.name.toUpperCase());
              $('.poke-img img').attr('src', pokeImgFront);
              $('.stat-lineA').text(`Hp......................${hpStats}`);
              $('.stat-lineB').text(`Attack................${attackStats}`);
              $('.stat-lineC').text(`Defense..............${defenseStats}`);
              $('.stat-lineD').text(`Special Attack....${specAttack}`);
              $('.stat-lineE').text(`Special Defense..${specDefense}`);
              $('.stat-lineF').text(`Speed..................${specDefense}`);
              $('.typeA').text(pokeTypeA);
              // $('.typeB').text(pokeTypeB);
              $('.moves').text(moves);
             
              console.log(defaultPokemonData);
              //console.log(allMoves);

        //-------------- ON CLICK SWITCH DEFAULT SHINY VIEW IMAGES------------------
              $('.btn-shiny').on('click', function(){
              // console.log(' test trigger function');
      
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

           //-------------- ON CLICK SWITCH DEFAULT REAR VIEW IMAGES------------------

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

            //----------write function for next move and previous move
                   
              var currentMove = data.moves[0].move.name;
              var counter = 0;
              $('.fas.fa-caret-down').on('click', function(){
                  counter++;
                               
                var newElement = data.moves[counter].move.name;
                $('.move-name').text(newElement);
                console.log(newElement);
            });

            $('.fas.fa-caret-up').on('click', function(){
              counter--;
                           
            var newElement = data.moves[counter].move.name;
            $('.move-name').text(newElement);
            console.log(newElement);
          });  
        });

            //-----------DEFAULT DESCRIPTION DONE RETURN FLAVOR TEXT AS STRING FOR DEFAULT POKEMON DESCRIPTION

            defaultDescriptionData.done(function( data ) {
              defaultDescriptionData = data;
              var pokeDescription = data.flavor_text_entries[0].flavor_text;
              $('.pokemon-description').text(pokeDescription);
              console.log(defaultDescriptionData)
              //console.log(pokeDescription);
            });
           
            //-------DEFAULT MOVES DONE RETURN MOVES DATA FOR DEFAULT POKEMON
           
            defaultMovesData.done(function( data ) {
              defaultMovesData = data;
             // var pokeMoveName = data.name;
              var pokeAccuracy = data.accuracy;
              var pokePower = data.power;
              var pokeMoveType = data.type.name;
              var pokePp = data.pp;
              console.log(defaultMovesData);
              //switched move name to moves from ajax call 1
              // $('.move-name').text(pokeMoveName); 
              $('.move-acc').text(`Accuracy.....${pokeAccuracy}`);
              $('.move-power').text(`Power........${pokePower}`);
              $('.move-pp').text(`PP............${pokePower}`);
              $('.move-type').text(`TYPE: ${pokeMoveType}`);
              
            });

             defaultPokemonData.fail(function( jqXHR, textStatus, error ) {
                alert( "Request failed: " + textStatus + ' ' + error );
                console.log(error)    
            });
         };

         // ------------- call/ execute  init function
         initFunc()

         //---------------- end of default function

        //----------------Pokemon search WITH TEXT value submitted from form
        $('.btn').on('click', function(){
            pokemonSearch = $('.pokedex input[type="text"]').val()
            
        //-------------SEARCH  AJAX REQUEST 1 AND CONCAT VARIABLE
        var request = $.ajax({
          // url: "https://pokeapi.co/api/v2/pokemon/pikachu",  
           url: "https://pokeapi.co/api/v2/pokemon/" + pokemonSearch,
          method: "GET",
          // data: { id : menuId },
          // dataType: "html"       
        });

        //--------------SEARCH AJAX REQUEST 2 DESCRIPTION DATA REQUEST
        var formDescriptionData = $.ajax({
          url: "https://pokeapi.co/api/v2/pokemon-species/" + pokemonSearch,
          method: "GET"
      });

      //----- AJAX REQUEST3 FOR MOVES DATA FROM INPUT FIELD

      var movesData = $.ajax({
        url: "https://pokeapi.co/api/v2/move/" + pokemonSearch,
        method: "GET"
    });

         //----------- DONE FUNCTION FOR TEXT INPUT FIELD   
       request.done(function( data ) {
        request = data;
        var pokeImgFront = data.sprites.front_default;
        var pokeImgBack = data.sprites.back_default;
        var pokeImgShinyFront = data.sprites.front_shiny;
        var pokeImgShinyBack = data.sprites.back_shiny;
        var hpStats = data.stats[0].base_stat;
        var attackStats =  data.stats[1].base_stat;
        var defenseStats = data.stats[2].base_stat;
        var specAttack = data.stats[3].base_stat;
        var specDefense = data.stats[4].base_stat;
        var specDefense = data.stats[5].base_stat;
        var pokeTypeA = data.types[0].type.name;
       // var pokeTypeB = data.types[1].type.name;
        //console.log(data)

        $('.pokedex h3').text(data.name.toUpperCase());
        $('.poke-img img').attr('src', pokeImgFront);
        $('.stat-lineA').text(`Hp......................${hpStats}`);
        $('.stat-lineB').text(`Attack................${attackStats}`);
        $('.stat-lineC').text(`Defense..............${defenseStats}`);
        $('.stat-lineD').text(`Special Attack....${specAttack}`);
        $('.stat-lineE').text(`Special Defense..${specDefense}`);
        $('.stat-lineF').text(`Speed..................${specDefense}`);
        $('.typeA').text(pokeTypeA);
        //$('.typeB').text(pokeTypeB);
        shiny = false;
        frontImg = true;

        //----------- SHINY BUTTON  FUNCTION FOR TEXT INPUT FIELD     
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

        // -------------- REARVIEW BUTTON FUNCTION FOR TEXT INPUT FIELD
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

        // ----------------AJAX REQUEST 2 TEXT INPUT FEILD GET DESCRIPTION DATA DONE  FUNCTION 
      formDescriptionData.done(function( data ) {
        formDescriptionData = data;
              var pokeDescription = data.flavor_text_entries[0].flavor_text;
              $('.pokemon-description').text(pokeDescription);
              //console.log(defaultDescriptionData)
              //console.log(pokeDescription);
            });

            //-------- AJAX 3 MOVES DATA DONE FUNCTION  FROM INPUT FIELD

            // outstanding task - fix ajax request must key off id number, does not key off pokemon name
            //search list must loop thru and display names and have value of id number,  id wil be 
            //used to generate the searches
            
            movesData.done(function( data ) {
              movesData = data;
              var pokeMoveName = data.name;
              var pokeAccuracy = data.accuracy;
              var pokePower = data.power;
              var pokeMoveType = data.type.name;
              var pokePp = data.pp;
              //console.log(movesData);
              
              $('.move-name').text(pokeMoveName);
              $('.move-acc').text(`Accuracy.....${pokeAccuracy}`);
              $('.move-power').text(`Power........${pokePower}`);
              $('.move-pp').text(`PP............${pokePower}`);
              $('.move-type').text(`TYPE: ${pokeMoveType}`);
              
            });

      
        request.fail(function( jqXHR, textStatus, error ) {
          alert( "Request failed: " + textStatus + ' ' + error );
        });
      });

    //---------DROP DOWN MENU NAMES LIST FUNCTION - ON LOAD (init function) GET DATA FOR LIST OF NAMES

       var initFuncTwo = function() {

        listPokemonData = $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/?limit=811",
        method: "GET"
       });
    //--------  CREATE DROPDOWN MENU LIST DONE FUNCTION  
       listPokemonData.done(function( data ) {
        listPokemonData = data;
       // console.log(listPokemonData);
        //console.log(listPokemonData.results[2])
        
    //------set data as an array
        var namesList = listPokemonData.results;
       // console.log(namesList);

    //------loop thru array with for of loop    
        var i = 0;
        for (i of namesList) {
        //console.log(i.name);

    // Set names as option text and url as anchor link
    // Reference found  https://www.geeksforgeeks.org/how-to-add-options-to-a-select-element-using-jquery/?ref=lbp
    // Alt Syntax - $('#select1').append(`<option value="${optionValue}">${optionText}</option>`); 
 
       $('.list').append(`<option value="${i.name}">${i.name}</option>`); 
    };
           
    // AJAX REQUEST POKEMON IF NAME SELECTED ON CHANGE IN DROP DOWN LIST  "on change" 

      $('.list').on('change', function() {
          selectSearch = $('.list').val()
    //console.log(selectSearch)
    
    //------AJAX REQUEST 1  FOR DROPDOWN LIST + CONCAT SELECT ON CHANGE VALUE
      var request = $.ajax({
        // url: "https://pokeapi.co/api/v2/pokemon/pikachu",
        url: "https://pokeapi.co/api/v2/pokemon/" + selectSearch,
        method: "GET",
        // data: { id : menuId },
        // dataType: "html"       
      });

    //-----AJAX REQUEST 2 DESCRIPTION DATA FOR DROPDOWN LIST + CONCAT SELECT NAME ON CHANGE OF VALUE

      var formDescriptionData = $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon-species/" + selectSearch,
        method: "GET"
    });

    //----- AJAX REQUEST3 FOR MOVES DATA FROM DROPDOWN FIELD

    var movesData = $.ajax({
      url: "https://pokeapi.co/api/v2/move/" + selectSearch,
      method: "GET"
  });



    //----- AJAX REQUEST 1 DONE 

    request.done(function( data ) {
      request = data;
        
          var pokeImgFront = data.sprites.front_default;
          var pokeImgBack = data.sprites.back_default;
          var pokeImgShinyFront = data.sprites.front_shiny;
          var pokeImgShinyBack = data.sprites.back_shiny;
          var hpStats = data.stats[0].base_stat;
          var attackStats =  data.stats[1].base_stat;
          var defenseStats = data.stats[2].base_stat;
          var specAttack = data.stats[3].base_stat;
          var specDefense = data.stats[4].base_stat;
          var specDefense = data.stats[5].base_stat;
          var pokeTypeA = data.types[0].type.name;
          // var pokeTypeB = data.types[1].type.name;
          var shiny = false;
          var frontImg = true;
    // console.log(data)

          $('.pokedex h3').text(data.name.toUpperCase());
          $('.poke-img img').attr('src', pokeImgFront);
          $('.stat-lineA').text(`Hp......................${hpStats}`);
          $('.stat-lineB').text(`Attack................${attackStats}`);
          $('.stat-lineC').text(`Defense..............${defenseStats}`);
          $('.stat-lineD').text(`Special Attack....${specAttack}`);
          $('.stat-lineE').text(`Special Defense..${specDefense}`);
          $('.stat-lineF').text(`Speed..................${specDefense}`);
          $('.typeA').text(pokeTypeA);
          // $('.typeB').text(pokeTypeB);
          shiny = false;
          frontImg = true;

        
    // ---------SHINY BUTTON FUNCTION FOR DROPDOWN MENU
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

    // ------REARVIEW BUTTON FOR DROPDOWN MENU
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

    //-----DESCRIPTION FUNCTION DONE FROM DROPDOWN ON-CHANGE
    formDescriptionData.done(function( data ) {
      formDescriptionData = data;
      var pokeDescription = data.flavor_text_entries[0].flavor_text;
      $('.pokemon-description').text(pokeDescription);
      //console.log(defaultDescriptionData)
      //console.log(pokeDescription);
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

//Blue Number Buttons feature - w/numbers on click show number on screen in search input box and search by number on submit button

//Style dropdown list to not be so long on screen and scroll

//key search to be off number id instead of name 

// show number of pokemon in name box above image

// scroll buttons to go through moves

// add Ajax to types buttons - DONE

//add pokemon logo and style project to be my own(background etc - DONE

//post on GitHub/pages)

//  CHALLENGE:
// use  the api that gives all pokemons names https://pokeapi.co/api/v2/pokemon/?limit=811,  setup get request to pull data from api
// create a popup,have button that when clicked have list popup from side have div that shows up with all pokemeon, can scroll to find pokemon
// in html set up a field with dropdown that will display the data as a list, use supplied api and use same code to pull data, in results property, use array,
// loop thru all and dispaly on a list, create  anchor links in data from list of urls that when click on links menu disappears and image and name changes

//good reference https://codepen.io/siliconunicorn/pen/VqoxXP 


