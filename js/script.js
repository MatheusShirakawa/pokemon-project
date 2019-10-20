$(document).ready(function(){

	pokemon.slideHome();
	pokemon.searchPokemon();
	
	if( $("#content-pokedex").is(':visible')){
		pokemon.getContentPokedex();	
	}

	$(".load-more").click(function (e){
		e.preventDefault();

		var href = $(this).attr("href");
		pokemon.getContentPokedex(href);

	});
	
});


var pokemon = {

	slideHome:function(){
		
		var array = [];
	
		$.ajax({
		  method:"get",
		  url: "https://pokeapi.co/api/v2/pokemon?offset=720&limit=20",
		  dataType:"json",
		  success:function(response) {

			$.each(response.results,function(i,v){
				pokemon.getInfoPokemon(v.url, "home");
			}); 

			setTimeout(function(){
				pokemon.getSlider();
			},1000);

		  },
			error:function(error){
				console.log(error);
			}
		});
	},
	getSlider:function (){
		$('#slider-pokemon').slick({
		  infinite: true,
		  slidesToShow: 5,
		  slidesToScroll: 1,
		  nextArrow:'<div class="next arrow bg-dark"><svg viewBox="0 0 451.846 451.847"><path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744   L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284   c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"/></svg>',
		  prevArrow:'<div class="prev arrow bg-dark"><svg viewBox="0 0 451.847 451.847"><path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0   c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744   c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"/></svg></div>"',		
		});
	},

	getInfoPokemon:function (url){

		var pokemonItem = ' ';

		$.ajax({
		  method:"get",
		  url: url,
		  dataType:"json",
		  success:function (response){
		  	
		  	var pokemonItem = '<div class="item bg-secondary">\
		  		<div class="number">'+response.id+'</div>\
                    <div class="img">\
                        <img class="d-block m-auto" src="'+pokemon.getImagemPokemon(response.id)+'">\
                    </div>\
                    <div class="info bg-dark text-white p-3">\
                    	<div class="row">\
                        	<span class="name col-sm-6">'+response.name+'</span>\
                        	<span class="number col-sm-6">'+response.id+'</span>\
                        </div>\
                        <div class="row">\
                        	<span class="type d-block col-sm-12"> tipos: '+pokemon.getTypes(response.types)+'</span>\
                        	<span class="abilities col-sm-12"> habilidades: '+pokemon.getAbilities(response.abilities)+'</span>\
                        </div>\
                    </div>\
                 </div>' ;

                $("#slider-pokemon").append(pokemonItem);
             

		  },error:function (error){
		  	console.log(error);
		  	alert("Ocorreu um erro ao mostrar os pokemons");
		  }
		});

		// return pokemonItem;
	},

	getTypes:function(array){

		var arrayTypes = [];

		$.each(array,function(i,v){
			arrayTypes.push('<span class="btn btn-primary">'+v.type.name+'</span>');
		});

		return arrayTypes;

	},
	getAbilities:function(array){
		var arrayAbilities = [];

		$.each(array,function(i,v){
			arrayAbilities.push(v.ability.name);			
		});

		return arrayAbilities;
	},
	searchPokemon:function (){

		$("#search-pokemon").submit(function(e){
			e.preventDefault();

			var param = $(".input-search").val();
			var url = "https://pokeapi.co/api/v2/pokemon/"+param;

			$("#content-pokedex").html(' ');
			pokemon.getPokemonItemPokedex(url, "pokedex");
		});  
	},
	getContentPokedex:function(url = 'https://pokeapi.co/api/v2/pokemon'){

		$.ajax({
		  method:"get",
		  url: url,
		  dataType:"json",
		  success:function(response) {

			$.each(response.results,function(i,v){
				console.log(v.url);
				pokemon.getPokemonItemPokedex(v.url, "pokedex");
			}); 

			$(".load-more").attr("href",response.next);

		  },
			error:function(error){
				console.log(error);
			}
		});
	},
	getPokemonItemPokedex:function(url){
		var pokemonItem = ' ';

		$.ajax({
		  method:"get",
		  url: url,
		  dataType:"json",
		  success:function (response){
		  	
		  	var pokemonItem = '<div class="item col-sm-3 mb-2 mt-2">\
		  		<div class="block bg-secondary">\
			  		<div class="number">'+response.id+'</div>\
	                    <div class="img">\
	                        <img class="d-block m-auto" src="'+pokemon.getImagemPokemon(response.id)+'">\
	                    </div>\
	                    <div class="info bg-dark text-white p-3">\
	                    	<div class="row">\
	                        	<span class="name col-sm-6">'+response.name+'</span>\
	                        	<span class="number col-sm-6">'+response.id+'</span>\
	                        </div>\
	                        <div class="row">\
	                        	<span class="type d-block col-sm-12">'+pokemon.getTypes(response.types)+'</span>\
	                        </div>\
	                    </div>\
                    </div>\
                 </div>' ;

                 // console.log(response.id);

                $("#content-pokedex").append(pokemonItem);
             

		  },error:function (error){
		  	console.log(error);
		  	alert("Ocorreu um erro ao mostrar os pokemons :C");
		  }
		});
	},
	getImagemPokemon:function (id){

		var str = "" + id;
		var pad = "000";
		var ans = pad.substring(0, pad.length - str.length) + str;

		var src = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"+ans+".png";
		return src;	
	},
}







