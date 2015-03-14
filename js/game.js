var playing = false;
function runGame(){
    if (playing == false){
        playGame();
        playing = true;
    }
}
function playGame(){
    "use strict";
    


    var game = document.getElementById("game").getContext("2d");
    game.font = "30px Arial";

        //Player

    var HEIGHT = 500;
    var WIDTH = 500;
    var timeWhenGameStarted; 
    var frameCount = 0;
    var score = 0;
    var highScore = 0;
    var alive;

    var player = {
        x:50,
        y:50,
        hp : 10,
        name:"P",
        width : 20,
        height : 20,
        colour : "green",
    };

    document.onmousemove = function(mouse){
        var mouseX = mouse.clientX - document.getElementById('game').getBoundingClientRect().left;
        var mouseY = mouse.clientY - document.getElementById('game').getBoundingClientRect().top;
        if(mouseX < player.width/2){
            mouseX = player.width/2;
        }
        if(mouseX > WIDTH - player.width/2){
            mouseX = WIDTH - player.width/2;
        }
        if(mouseY < player.height/2){
            mouseY = player.height/2;
        }
        if(mouseY > HEIGHT- player.height/2){
            mouseY = HEIGHT - player.height/2;
        }

        player.x = mouseX;
        player.y = mouseY;
    }

    var enemyList = {};
    var upgradeList = {};

    var Enemy = function (ID, X, Y, SPX, SPY, WIDTH, HEIGHT){
        var enemy = {
            x : X,
            y : Y,
            spX : SPX,
            spY : SPY,
            name : "E",
            id : ID,
            width : WIDTH,
            height : HEIGHT,
            colour : "red",
        };
        enemyList[ID] = enemy;
    }

    var Upgrade = function (ID, X, Y, SPX, SPY, WIDTH, HEIGHT){
        var upgrade = {
            x : X,
            y : Y,
            spX : SPX,
            spY : SPY,
            name : "E",
            id : ID,
            width : WIDTH,
            height : HEIGHT,
            colour : "orange",
        };
        upgradeList[ID] = upgrade;
    }

    var randomlyGenerateEnemy = function(){
        var x = Math.random() * WIDTH;
        var y = Math.random() * HEIGHT;
        var height = 10 + Math.random() * 30;
        var width = 10 + Math.random() * 30;
        var id = Math.random();
        var spX = 5 + Math.random() * 5;
        var spY = 5 + Math.random() * 5;
        Enemy(id, x, y, spX, spY, width, height);
    }

    var randomlyGenerateUpgrade = function(){
        var x = Math.random() * WIDTH;
        var y = Math.random() * HEIGHT;
        var height = 10;
        var width = 10;
        var id = Math.random();
        var spX = 0;
        var spY = 0;
        Upgrade(id, x, y, spX, spY, width, height);
    }


    var updateEntityPosition = function (something){
        something.x += something.spX;
        something.y += something.spY;
        if( something.x > WIDTH || something.x < 0){
            something.spX = -something.spX;
        }
        if( something.y > HEIGHT || something.y < 0){
            something.spY = -something.spY;
        }

    }

    var drawEntity = function(something){
        game.save();
        game.fillStyle = something.colour;
        game.fillRect(something.x - something.width/2, something.y - something.height/2, something.height, something.width)
        game.restore();
    }

    var updateEntity = function (something){

        updateEntityPosition(something);
        drawEntity(something);
    }

    var getDistanceBetweenEntity = function (entity1, entity2){
        var dx = entity1.x - entity2.x;
        var dy = entity1.y - entity2.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

    var testCollisionRect = function(rect1, rect2){
        return  rect1.x <= rect2.x + rect2.width
            &&  rect2.x <= rect1.x + rect1.width
            &&  rect1.y <= rect2.y + rect2.height
            &&  rect2.y <= rect1.y + rect1.height;
    }

    var testCollisionEntity = function (entity1, entity2){
        var rect1 = {
            x : entity1.x - entity1.width/2,
            y : entity1.y - entity1.height/2,
            width : entity1.width,
            height : entity1.height,
        }

        var rect2 = {
            x : entity2.x - entity2.width/2,
            y : entity2.y - entity2.height/2,
            width : entity2.width,
            height : entity2.height,
        }

        return testCollisionRect(rect1, rect2);

    }

    var setHighScore = function (score){
        if(score > highScore){
            highScore = score;
            return true;
        }
        return false;
    }

    var update = function (){
        game.clearRect(0,0,WIDTH, HEIGHT);
        frameCount++;
        score++;

        if(frameCount % 100 == 0){
            randomlyGenerateEnemy();
        }
        if(frameCount % 75 == 0){
            randomlyGenerateUpgrade();
        }

        for(var key in upgradeList){
            updateEntity(upgradeList[key]);
            var isColliding = testCollisionEntity(player, upgradeList[key]);
            if(isColliding){
                score += 100;
                delete upgradeList[key];
            }
        }
        for(var key in enemyList){
            updateEntity(enemyList[key]);
            var isColliding = testCollisionEntity(player, enemyList[key]);
            if(isColliding){
                console.log("player pos: (" + player.x + ", " + player.y + ")");
                console.log("enemy pos: (" + enemyList[key].x + ", " + enemyList[key].y + ")");
                player.hp -= 1;

            }
        }
        
        drawEntity(player);
        game.save();
        game.fillStyle = "white";
        game.fillText(player.hp + " hp", 0, 30);
        game.fillText("Score: " + score, 100, 30);
        game.fillText("High Score: " + highScore, 0, 490);
        game.restore();

        checkHealth();
    }

    var checkHealth = function(){
        if(player.hp <= 0){
            var timeSurvived = Date.now() - timeWhenGameStarted;
            console.log("You lost! You survived for " + timeSurvived + " ms.");
            setHighScore(score);
            startNewGame();
            
        }
    }

    var startNewGame = function(){
        alive = true;
        player.hp = 10;
        timeWhenGameStarted = Date.now();
        frameCount = 0;
        score = 0;
        enemyList = {};
        upgradeList = {};
        randomlyGenerateEnemy();
        randomlyGenerateEnemy();
        randomlyGenerateEnemy();

    }
    
        startNewGame();
        setInterval(update, 40);
}
 





