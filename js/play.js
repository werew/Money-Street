//Create some variables to identify sprites and groups
var player;
var cursors;
var coins;
//Play state
var play = {
		create: function(){
			//Background
			this.add.image(0,0,'city');
			//Parse the level
			this.level = JSON.parse(this.game.cache.getText('level'+currentLevel));

			//PLAYER
			player = this.add.sprite(this.level.playerStarts.x,this.level.playerStarts.y,'player',0);
			//Add physic body to the player
			this.physics.arcade.enable(player);
			//Walk animation
			player.animations.add('down',[0,1,2,3],10,true);
			player.animations.add('left',[4,5,6,7],10,true);
			player.animations.add('right',[8,9,10,11],10,true);
			player.animations.add('up',[12,13,14,15],10,true);
			//Create cursors
			cursors = this.input.keyboard.createCursorKeys();
			//Player collide world bounds
			player.body.collideWorldBounds = true;

			//COINS
			coins = this.add.group();
			coins.enableBody = true;
			//Create initial coins
			for (this.currentCoin = 0;this.currentCoin < 3;this.currentCoin++){
				coins.create(this.level.coins[this.currentCoin].x,this.level.coins[this.currentCoin].y,'coin',0);
			}
			//Animate them
			coins.callAll('animations.add','animations','spin',[0,1,2,3,4,6,7],10,true);
			coins.callAll('animations.play','animations','spin');


			//CAMERA
			this.camera.follow(player);
			console.log(this);
		},
		update: function(){
			//Move the player
			if (cursors.down.isDown){
				player.body.velocity.setTo(0,200);
				player.animations.play('down');
			}
			else if (cursors.left.isDown){
				player.body.velocity.setTo(-200,0);
				player.animations.play('left');
			}
			else if (cursors.right.isDown){
				player.body.velocity.setTo(200,0);
				player.animations.play('right');
			}
			else if (cursors.up.isDown && player.body.y > 400){
				player.body.velocity.setTo(0,-200);
				player.animations.play('up');
				
			}
			else{
				player.body.velocity.setTo(0,0);
				player.animations.stop();
			}
			//Chek for overlap with coin
			this.physics.arcade.overlap(player,coins,this.collectCoin.bind(this));
		},

		collectCoin: function(player,coin){
				coin.destroy();
				//Add next coin
				if (this.currentCoin < this.level.coins.length){
					var newCoin = coins.create(this.level.coins[this.currentCoin].x,this.level.coins[this.currentCoin].y,'coin');
					newCoin.animations.add('spin',[0,1,2,3,4,5,6,7],10,true);
					newCoin.animations.play('spin');
					this.currentCoin++;
				}
				
					
			}
			
			
};
