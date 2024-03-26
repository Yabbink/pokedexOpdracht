$(document).ready(function(){
    let aantalPokemons = 20
    let pagina = 1

    function getPokemonPagina(nummer, isShiny){
      let offset = (nummer - 1) * aantalPokemons;
      console.log(offset)
      let pokeURL = "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=" + aantalPokemons;
    
      $.ajax({
        url: pokeURL,
        type: 'GET',
        success: function(response){
          console.log(response.results);
          $(".pokemonHead").empty()
          $.each(response.results, function(i, item) {
            let id = offset + i + 1
            if(isShiny == true)
            {
              pokeImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + (id) + ".png";
            }
            else
            {
              pokeImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (id) + ".png"
            }
            

            $(".pokemonHead").append(
              '<div class="pokemon">' + 
                '<img src="'+ pokeImage +'">' + 
                '<p>' + id + " " + item.name + '</p>' + 
              '</div>'
            )
          });
        }
      })
    }

    function pokemonDetails(id, isShiny)
    {
      let pokeURL = "https://pokeapi.co/api/v2/pokemon/" + id;
      
      $.ajax({
        url: pokeURL,
        type: 'GET',
        success: function(details){
          console.log(details)
          let pokeImage;
          if(isShiny == true)
          {
            pokeImage = details.sprites.front_shiny
          }
          else
          {
            pokeImage = details.sprites.front_default
          }
          
          let types = "";
          $.each(details.types, function(i, pokeType){
            console.log("types")
            console.log(pokeType)
            console.log(i)

            if(i > 0)
            {
              types += ""
            }

            if(pokeType.type.name.includes("fire"))
            {
              types +=  '<span class="fire">'
            }
            else if(pokeType.type.name.includes("bug"))
            {
              types +=  '<span class="bug">'
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
            types += pokeType.type.name
            types += '</span>'
          })

          console.log(details.abilities)
          let abilities = ""
          $.each(details.abilities, function(i, ability){
            console.log("test")
            console.log(i)
            if(i > 0)
            {
              abilities += "<br/>"
            }
            abilities += ability.ability.name
          })

          let stats = ""
          console.log(details.stats)
          $.each(details.stats, function(i, stat){
            let statNames = ""
            
            if(stat.stat.name.includes("hp"))
            {
               statNames += "HP"
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

            console.log("stats")
            console.log(i)
            if(i >= 5)
            {
              stats += " "
            }
            stats += '<span>'
            stats += stat.base_stat
            stats += '<br/>'
            stats += statNames
            stats += '</span>'
          })

          $('.popup').css("display", "flex")
          $(".detailsHead").empty()
          $(".detailsHead").append(
            '<div class="details">' +
             '<div class="general"><p class="white">' + id + '</p>' +
             '<p class="white">' + details.name + '</p></div>' +
             '<div class="img"><img src="'+ pokeImage +'"></div>' +
             '<div class="types"><p>Type</p><p class="white">' + types + '</p></div>' + 
             '<div class="abilities"><p>Abilities</p><p class="white">' + abilities + '</p></div>' +
             '<div class="stats"><p>Base stats</p><p class="white">' + stats + '</p></div>' +
            '</div>'
          )
        }
      })
    }

    getPokemonPagina(pagina)

    let tekst = "shiny";
    let isShiny = false;
    
    $('.paginationButtons .shiny').html(tekst);
    
    $('.paginationButtons').on('click', '.shiny, .normal', function(){
      if (isShiny) {
        tekst = "shiny";
        isShiny = false;
      } else {
        tekst = "normaal";
        isShiny = true;
      }
      getPokemonPagina(pagina, isShiny);
    });
    
    $('.paginationButtons .previous').on('click', function(){
      if(pagina > 1){
        pagina--;
        getPokemonPagina(pagina, isShiny);
      }
    });
    
    $('.paginationButtons .next').on('click', function(){
      if(pagina < 66){
        pagina++;
        getPokemonPagina(pagina, isShiny);
      }
    });    

    let id = 0;

    $(document).on('click', '.pokemon', function(){
       id = $(this).index() + 1 + (pagina - 1) * aantalPokemons;
       if (isShiny == true) {
        isShiny = true
       } else {
        isShiny = false
       }
       pokemonDetails(id, isShiny);
    });

    $('.popupButtons .previous').on('click', function(){
      if(id > 1)
      {
        id--
        pokemonDetails(id, isShiny)
      }
      else
      {
        console.log("je kunt niet meer terug want je bent al bij de eerste pokemon")
      }
    })

    $('.popupButtons .next').on('click', function(){
      if(id <= 1302)
      {
        id++
        pokemonDetails(id, isShiny)
      }
      else
      {
        console.log("je kunt niet meer verder want je bent al bij de laatste pokemon")
      }
    })

    $('.closePopup').on( "click", function() {
       $('.popup').hide();
    });
 });