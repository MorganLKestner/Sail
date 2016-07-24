$(document).ready(function(){
console.log('script loaded');

//Opponent characters 
var opponents = [
	{ name: "Jadeite", // opponets[0].name
	  img: "img/green.gif",
	  health: 100
	},
	{ name: "Zoisite",
	  img: "img/ponytail.gif",
	  health: 150
	},
	{ name: "Nephrite",
	  img: "img/purple.gif",
	  health: 200	
	},
	{ name: "Kunzite",
	  img: "img/silver.gif",
	  health: 250
	},
	{ name: "Queen Beryl",
	  img: "img/queenberyl.gif",
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

//scoreboard
// counter that keeps who dies 
var counter = 0;
var scoreboard =$('#scoreboard');
var keepScore = function() { 
};

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
		currentHealth();
		heroHitRange = 0;
		return statusBox.text(heroSailorMoon.name + ' missed ' + enemy_name + '!');
	} else {	
		if (heroHitRange >= 21) { 
		enemy_health -= heroHitRange;
		currentHealth();
		checkWinner();
		return statusBox.text(heroSailorMoon.name + ' hit ' + enemy_name + ' ' +  heroHitRange + '!');
		}
	  } 
};
//opponent attack logic
var opponentAttack = function(){
	var oppHitRange = Math.floor(Math.random()*(80-1 + 1)+1);
	if (oppHitRange <= 20) {
		currentHealth();	
		oppHitRange = 0;
		return statusBox.text( enemy_name + ' missed ' + heroSailorMoon.name + '!');
	} else {
		if(oppHitRange >=21) { 
			heroSailorMoon.health -= oppHitRange;
			currentHealth();
			checkWinner();	
			return statusBox.text(enemy_name + ' hit ' + heroSailorMoon.name  + ' ' +  oppHitRange + '!');
		} 
	  }
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
// <= less than or equal to
// >= greater than or equal to 

//check for winner 
var checkWinner = function() {
	  if(enemy_health <= 0 && heroSailorMoon.health >= 0) {
	  	enemy_health = 0;
	  	console.log(test meeeeeeee);
	  	clearTimeout(attackFunction);
	    return statusBox.text(heroSailorMoon.name  + 'defeated ' +  enemy_name + '!');
	  };
	  if (enemy_health >= 0 && heroSailorMoon.health <= 0) {
	  	heroSailorMoon.health = 0;
	  	console.log(test meeeeeeee);
	  	clearTimeout(attackFunction);
	  	return statusBox.text( enemy_name  + 'defeated ' +  heroSailorMoon + '!');
	  	};
};
checkWinner();
console.log(checkWinner());


}); //ready function 