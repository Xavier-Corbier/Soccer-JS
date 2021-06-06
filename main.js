var game = new Phaser.Game(1280,802);
var speed = 300;
var score = 0;
var heros = {
	preload: function() {
		//chargement des éléments du jeu
		game.load.image('fond','assets/fond.png');
		game.load.image('player','assets/1.png');
		game.load.image('mechant','assets/2.png');
	},
	create: function() {
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();
		//création du jeu
		// type physique du jeu
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// ajout du fond
		game.add.sprite(0,0,'fond');
		// ajout du joueur
		this.player = game.add.sprite(1200,300,'player');
		// déplacement de l'ancre du joueur
		this.player.anchor.set(0.5);
		// activation de la physique
		game.physics.arcade.enable(this.player);
		// activation curseurs jeu
		this.cursors = game.input.keyboard.createCursorKeys();
		// ajout des mechants
		this.mechants = game.add.group();
		// timer méchant
		this.time = 300;
		this.timer = game.time.events.loop(this.time, this.addMechant, this);
		// initialisation score
		this.scoreText = 0;
		this.score = game.add.text(20,20, "Score : 0", {font: "30px Arial", fill: "#fff"});
		this.score2 = game.add.text(300,20, "Meilleur Score : ...", {font: "30px Arial", fill: "#fff"});
		this.score2.text = "Meilleur Score : " + score;
	},
	update: function(){
		//system du jeu
		// gestion de colision
		game.physics.arcade.overlap(this.player, this.mechants, this.restartGame, null, this);
		// réinitialiser le déplacement du joueur
		this.player.body.velocity.x=0;
		this.player.body.velocity.y=0;
		// déplacer le joueur
		if (this.cursors.left.isDown) {
			this.player.body.velocity.x = speed * -1;
		}
		if (this.cursors.right.isDown) {
			this.player.body.velocity.x = speed;
		}
		if (this.cursors.up.isDown) {
			this.player.body.velocity.y = speed * -1;
		}
		if (this.cursors.down.isDown) {
			this.player.body.velocity.y = speed;
		}
		// si le joueur sort on redémarre
		if (this.player.inWorld==false) {
			this.restartGame();
		}
	},	
	restartGame: function() {
		//on redémarre le jeu
		if (this.scoreText>score) {
			score=this.scoreText;
			this.score2.text = "Meilleur Score : " + this.scoreText;
		}
		game.state.start('heros');
	},
	addMechant: function () {
		var position = Math.floor(Math.random() * 1000) -100;
		//ajout des mechants
		var mechant = game.add.sprite(-100,position,'mechant');
		// activation de la physique
		game.physics.arcade.enable(mechant);
		// activation de la gravité
		mechant.body.gravity.x=200;
		// ajout à la liste de méchant
		this.mechants.add(mechant);
		// gestion du score
		this.scoreText += 20;
		this.score.text = "Score : " + this.scoreText;
		// si il est sur le plateau
		mechant.checkWorldBounds = true;
		// si il est hors du plateau
		mechant.outOfBoundKill = true;
	}
};
// mise en place du plateau
game.state.add('heros',heros);
game.state.start('heros');
