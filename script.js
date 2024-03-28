$(document).ready(function(){
  // maken van de variabelen voor het aantal pokemons per pagina en de huidige pagina
  let aantalPokemons = 20;
  let pagina = 1;

  // Functie om gegevens van een pagina met pokemons met de foto´s, id´s en namen op te halen
  function getPokemonPagina(nummer, isShiny){
    // offset bepalen door de uitkomst van de paginanummer - 1 * het aantal pokemons te doen om de hoeveelheid pokemons op een pagina te bepalen
    let offset = (nummer - 1) * aantalPokemons;
    console.log(offset);
    let pokeURL = "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=" + aantalPokemons;

    // AJAX-aanroep om de standaard gegevens van de PokeAPI te krijgen
    $.ajax({
      url: pokeURL,
      type: 'GET',
      success: function(response){
        console.log(response.results);

        // eerst de pagina leegmaken voordat de pokemon op de pagina komen
        $(".pokemonHead").empty();
        
        // loopen over de resultaten en ze laten zien op de pagina
        $.each(response.results, function(i, item) {
          // id bepalen door de offset wat op het eerste moment 0 is + 19 te doen en dat plus 1 om alle foto's te laten zien van de pokemons
          let id = offset + i + 1;
          console.log(id)

          // checken of de shiny status actief is en per status een foto toevoegen
          if(isShiny == true)
          {
            pokeImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + (id) + ".png";
          }
          else
          {
            pokeImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (id) + ".png";
          }

          // de variabele html maken
          let html = ''

          // de variabele html vullen
          html += '<div class="pokemon">' 
          html += '<img src="'+ pokeImage +'">' 
          html += '<p>' + id + " " + item.name + '</p>' 
          html += '</div>'
          
          // Toevoegen van de variable html aan de parent klasse
          $(".pokemonHead").append(html);
        });
      }
    });
  }

  // Functie om de details van een specifieke Pokemon op te halen
  function showPokemonDetails(id, isShiny)
  {
    let pokeURL = "https://pokeapi.co/api/v2/pokemon/" + id;

    pokemonDetails(id, pokeURL);
  }

  // Functie om een Pokemon op te zoeken
  function zoekPokemon()
  {
    let input = $('#pokeField').val();
    let pokeURL = "https://pokeapi.co/api/v2/pokemon/" + input;

    pokemonDetails(input, pokeURL);
  }

  // Functie om details van een Pokemon weer te geven
  function pokemonDetails(id, pokeURL)
  {
    // AJAX-aanroep om de details van een Pokemon te krijgen die je opzoekt of als je er op klikt
    $.ajax({
      url: pokeURL,
      type: 'GET',
      success: function(details){
        // eerst de variabele pokeimage maken 
        let pokeImage;

        // checken of de shiny status actief is en per status een foto toevoegen
        if(isShiny == true)
        {
          pokeImage = details.sprites.front_shiny;
        }
        else
        {
          pokeImage = details.sprites.front_default;
        }

         // eerst de variabele maken voordat er dingen aan worden toegevoegd zodat ik het dadelijk kan toevoegen aan de variabel html
        let types = "";

        // loopen door de Pokemon-types
        $.each(details.types, function(i, pokeType){
         console.log("types");
         console.log(pokeType);
         console.log(i);

         // eerst checken of de pokemon 1 of meer types heeft en daarop reageren
         if(i > 0)
         {
           types += "";
         }

         // de span een klasse geven op het moment dat de pokemon het desbetreffende type heeft
         if(pokeType.type.name.includes("fire"))
         {
           types +=  '<span class="fire">';
         }
         else if(pokeType.type.name.includes("bug"))
         {
           types +=  '<span class="bug">';
         }
         else if(pokeType.type.name.includes("poison"))
         {
           types +=  '<span class="poison">'
         }
         else if(pokeType.type.name.includes("water"))
         {
           types +=  '<span class="water">'
         }
         else if(pokeType.type.name.includes("grass"))
         {
           types +=  '<span class="grass">'
         }
         else if(pokeType.type.name.includes("ground"))
         {
           types +=  '<span class="ground">'
         }
         else if(pokeType.type.name.includes("rock"))
         {
           types +=  '<span class="rock">'
         }
         else if(pokeType.type.name.includes("steel"))
         {
           types +=  '<span class="steel">'
         }
         else if(pokeType.type.name.includes("ice"))
         {
           types +=  '<span class="ice">'
         }
         else if(pokeType.type.name.includes("electric"))
         {
           types +=  '<span class="electric">'
         }
         else if(pokeType.type.name.includes("dragon"))
         {
           types +=  '<span class="dragon">'
         }
         else if(pokeType.type.name.includes("ghost"))
         {
           types +=  '<span class="ghost">'
         }
         else if(pokeType.type.name.includes("psychic"))
         {
           types +=  '<span class="psychic">'
         }
         else if(pokeType.type.name.includes("normal"))
         {
           types +=  '<span class="normal">'
         }
         else if(pokeType.type.name.includes("fighting"))
         {
           types +=  '<span class="fighting">'
         }  
         else if(pokeType.type.name.includes("flying"))
         {
           types +=  '<span class="flying">'
         }
         else if(pokeType.type.name.includes("dark"))
         {
           types +=  '<span class="dark">'
         }
         else if(pokeType.type.name.includes("fairy"))
         {
           types +=  '<span class="fairy">'
         }
         types += pokeType.type.name;
         types += '</span>';
        });

        console.log(details.abilities);

        // eerst de variabele maken voordat er dingen aan worden toegevoegd zodat ik het dadelijk kan toevoegen aan de variabel html
        let abilities = "";

        // loopen door de vaardigheden van de Pokemon
        $.each(details.abilities, function(i, ability){
         console.log("test");
         console.log(i);

         // eerst checken of de pokemon 1 of meer types heeft en daarop reageren met een br dat het weer op een nieuwe regel wordt gezet
         if(i > 0)
         {
           abilities += "<br/>";
         }
         abilities += ability.ability.name;
        });

        // eerst de variabele stats maken voordat de waarden later in de span worden gezet
        let stats = "";
        console.log(details.stats);

        // loopen door de statistieken van de Pokemon
        $.each(details.stats, function(i, stat){
         let statNames = "";
          
         // de statistieken afkorten op het moment dat de naam herkent wordt
         if(stat.stat.name.includes("hp"))
         {
           statNames += "HP";
         }
         else if(stat.stat.name.includes("attack"))
         {
           statNames += "Atk"
         }
         else if(stat.stat.name.includes("defense"))
         {
           statNames += "Def"
         }
         else if(stat.stat.name.includes("special-attack"))
         {
           statNames += "Sp.Atk"
         }
         else if(stat.stat.name.includes("special-defense"))
         {
           statNames += "Sp.Def"
         }
         else if(stat.stat.name.includes("speed"))
         {
           statNames += "Speed"
         }

         // een span toevoegen om de stats en de namen daarvan te laten zien
         stats += '<span>';
         stats += stat.base_stat;
         stats += '<br/>';
         stats += statNames;
         stats += '</span>';
        });

        // Weergeven van de pop-up
        $('.popup').css("display", "flex");

        // de details van de popup eerst leegmaken voordat er elementen aan worden toegevoegd
        $(".detailsHead").empty();

        // eerst weer de variabele html maken 
        let html = '';

        // de variabele html vullen met html elementen
        html += '<div class="details">'
        html += '<div class="general"><p class="white">' + id + '</p>' 
        html += '<p class="white">' + details.name + '</p></div>' 
        html += '<div class="img"><img src="'+ pokeImage +'"></div>' 
        html += '<div class="types"><p>Type</p><p class="white">' + types + '</p></div>'  
        html += '<div class="abilities"><p>Abilities</p><p class="white">' + abilities + '</p></div>' 
        html += '<div class="stats"><p>Base stats</p><p class="white">' + stats + '</p></div>' 
        html += '</div>'
    
        // de html elementen toevoegen aan de detailshead door middel van de append functie
        $(".detailsHead").append(html);
      }
    });
  }

  getPokemonPagina(pagina)

  // on click functie voor het zoeken naar een Pokemon
  $('#pokeSearch').on('click', function(){
    zoekPokemon();
    $('#pokeField').val('');
  });

  // maken van variabelen voor de shiny status en tekst
  let tekst = "shiny";
  let isShiny = false;
  
  $('.paginationButtons .shiny').html(tekst);
  
  // on click functie voor het wijzigen van de shiny status
  $('.paginationButtons').on('click', '.shiny, .normal', function(){
    if(isShiny == true) {
      tekst = "shiny";
      isShiny = false;
    } else {
      tekst = "normaal";
      isShiny = true;
    }
    getPokemonPagina(pagina, isShiny);
  });
  
  // on click functie voor het bladeren naar de vorige pagina
  $('.paginationButtons .previous').on('click', function(){
    if(pagina > 1){
      pagina--;
      getPokemonPagina(pagina, isShiny);
    }
  });
  
  // on click functie voor het bladeren naar de volgende pagina
  $('.paginationButtons .next').on('click', function(){
    if(pagina < 66){
      pagina++;
      getPokemonPagina(pagina, isShiny);
    }
  });    

  let id = 0;

  // on click functie voor het klikken op een Pokemon om de details weer te geven
  $(document).on('click', '.pokemon', function(){
     // de id van de pokemon bepalen door de index van de pokemon te pakken waar je op klikt en dan + 1 te doen zodat die nooit op 0 komt
     //en daarnaast ook de pagina waar de pokemon op zit te bepalen door pagina - 1 * het aantal pokemon te doen  
     id = $(this).index() + 1 + (pagina - 1) * aantalPokemons
     console.log("hallo")
     console.log(id)
     if (isShiny == true) {
      isShiny = true;
     } else {
      isShiny = false;
     }
     showPokemonDetails(id, isShiny);
  });

  // on click functie voor het bladeren naar de vorige Pokemon in de pop-up
  $('.popupButtons .previous').on('click', function(){
    if(id > 1)
    {
      id--;
      showPokemonDetails(id, isShiny);
    }
    else
    {
      console.log("je kunt niet meer terug want je bent al bij de eerste pokemon");
    }
  });

  // on click functie voor het bladeren naar de volgende Pokemon in de pop-up
  $('.popupButtons .next').on('click', function(){
    if(id <= 1302)
    {
      id++;
      showPokemonDetails(id, isShiny);
    }
    else
    {
      console.log("je kunt niet meer verder want je bent al bij de laatste pokemon");
    }
  });

  // on click functie voor het sluiten van de pop-up
  $('.closePopup').on( "click", function() {
     $('.popup').hide();
  });
});