$(document).ready(function(){
console.log('script loaded');

//Opponent characters 
var opponents = [
	{ name: "Jadeite", // opponets[0].name
	  img: "img/jaidite.png",
	  health: 100
	},
	{ name: "Zoisite",
	  img: "img/zoisite.png",
	  health: 150
	},
	{ name: "Nephrite",
	  img: "img/Nephrite.png",
	  health: 200	
	},
	{ name: "Kunzite",
	  img: "img/kunzite.png",
	  health: 250
	},
	{ name: "Queen Beryl",
	  img: "img/qb.gif",
	  health: 300
	}
];
//Hero Sailor Moon
var heroSailorMoon = {
	name: "Sailor Moon",
	health: 200,
	power: "tiara",
	special: "wand"
};
//Health Tuxedo Mask
var helpTux = {
	name: "Tuxedo Mask",
	health: 500,
	power: "rose",
	img: " ",
}
//id divs 
var body = $('#body');
var gameBackground = $('#background');
var enemy = $('#enemy');
var statusBox =$('#status-box');

//health boxes 
var heroHealthBox =$('#hero-health');
var enemyHealthBox =$('#enemy-health');


//get order of opponents 
var getOpponents = function(){
	return opponents[Math.floor(Math.random()* opponents.length)];
};
var opponent = getOpponents();
var enemy_health = opponent.health;
var enemy_name = opponent.name;
var enemy_url = opponent.img;

//opponent imgages on background
enemy.css('background-image',"url("+enemy_url+")");

/////////attack and heal functions//////

//hero heal with Tuxedo Mask
var heroHeal = function() {
	var healNow = Math.floor(Math.random()*(50-20 + 1)+20);
	heroSailorMoon.health += healNow;
	if (healNow >= 20) {
		return statusBox.text(helpTux.name + ' gives '+ heroSailorMoon.name +' '+ healNow + ' power!');
	} 
};

//hero attack logic
var heroAttack = function() {
	var heroHitRange = Math.floor(Math.random()*(80-1 + 1)+1);
	if (heroHitRange <= 20) {
		heroHitRange = 0;
		currentHealth();
		return statusBox.text(heroSailorMoon.name + ' missed ' + enemy_name + '!');
	} else {	
		if (heroHitRange >= 21) { 
		enemy_health -= heroHitRange;
		currentHealth();
		statusBox.text(heroSailorMoon.name + ' hit ' + enemy_name + ' ' +  heroHitRange + '!');
		}
	  } 
	  checkWinner();
};
//opponent attack logic
var opponentAttack = function(){
	var oppHitRange = Math.floor(Math.random()*(80-1 + 1)+1);
	if (oppHitRange <= 20) {
		oppHitRange = 0;
		currentHealth();	
		return statusBox.text( enemy_name + ' missed ' + heroSailorMoon.name + '!');
	} else {
		if(oppHitRange >=21) { 
			heroSailorMoon.health -= oppHitRange;
			currentHealth();
			statusBox.text(enemy_name + ' hit ' + heroSailorMoon.name  + ' ' +  oppHitRange + '!');
		} 
	  }
	  checkWinner();
};

//adds current health in health boxes
var currentHealth = function(){
heroHealthBox.text('Sailor Moon Power: ' + heroSailorMoon.health);
enemyHealthBox.text( enemy_name +' Power: ' + enemy_health);
};
currentHealth();
//keydown hero attack 
var attackFunction = $(window).on('keydown',function(e) {
    if(e.which === 65 || e.keycode === 65) {
   	  setTimeout(heroAttack, 100);
   	  setTimeout(function(){statusBox.text(enemy_name + ' is ready to fight!')}, 4000);
   	  setTimeout(opponentAttack, 6000);
   	  setTimeout(function(){statusBox.text(heroSailorMoon.name + ' is ready to fight!')}, 8000);
 	};
});

//keydown heal hero
var healFunction = $(window).on('keydown',function(e) {
    if(e.which === 90 || e.keycode === 90) {
	setTimeout(heroHeal, 1000);
    setTimeout(function(){statusBox.text(enemy_name + ' is ready to fight!')}, 3000);
    setTimeout(opponentAttack, 4000)
 	};
});
//reminder  <= less than or equal to
//reminder >= greater than or equal to 

//check for winner 
var checkWinner = function() {
	//console.log('test meeeeeeee');
	  if(enemy_health <= 0 && heroSailorMoon.health >= 0) {
	  	clearTimeout(attackFunction);
	  	enemy_health = 0;
	    statusBox.text(heroSailorMoon.name  + ' defeated ' +  enemy_name + '!');

	  };
	  if (enemy_health >= 0 && heroSailorMoon.health <= 0) {
	  	heroSailorMoon.health = 0;
	  	clearTimeout(attackFunction);
	  	statusBox.text( enemy_name  + ' defeated ' +  heroSailorMoon.name + '!');
	  };
};

//scoreboard
// counter that keeps who dies 
//resolve a promise for your return
//instead of a value - a promise with .when
// var counter = 0
 var scoreboard =$('#scoreboard');
 scoreboard.text('Crystal Kingdom: ' + "  "+ ' vs ' + "   "+ 'Dark Kingdom: ' + " " );
// var keepScore = function() {

// };
// $.when(checkWinner).then(keepScore);



/// animation
var heroPlace = $('#hero');
heroPlace.append('<img class= "img" src="http://4.bp.blogspot.com/-j3EJifjKGWk/UyR8ne787_I/AAAAAAAAAf4/mjO22FzasKM/s1600/Sailor+Moon.gif">');
 // heroPlace.toggle(function(){
	// 	heroPlace.src = 'http://1.bp.blogspot.com/-XW3JNKS5qLw/UyXuBc48ejI/AAAAAAAAAjI/CKGW27fMmDE/s1600/Moon+Gorgeus+Meditation+%28Classical%29.gif' 	
	//   });

});
 //ready function 