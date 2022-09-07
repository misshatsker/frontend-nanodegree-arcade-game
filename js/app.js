var leftSide = 0;
var rightSide = 500;
var topSide = 0;
var bottomSide = 500;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var shift = this.speed * dt;
    this.x = this.x + shift;
    if (this.x >= rightSide) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.width = 70;
Enemy.prototype.height = 70;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.sprite = 'images/char-princess-girl.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
};

Player.prototype.width = 70;
Player.prototype.height = 70;

Player.prototype.update = function() {
    const enemy = allEnemies[0];

    const isOverlap = checkIsOverlap(
        {
            x: player.x,
            y: player.y
        },
        {
            x: player.x + player.width,
            y: player.y + player.height
        },
        {
            x: enemy.x,
            y: enemy.y
        },
        {
            x: enemy.x + enemy.width,
            y: enemy.y + enemy.height
        }
    );

    if (isOverlap) {
        gameOver();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(action) {
    switch (action) {
        case 'left': {
            if (this.x > leftSide) {
                this.x -= this.speed;
            }
            break;
        }
        case 'right': {
            if (this.x + this.width + this.speed < rightSide) {
                this.x += this.speed;
            }
            break;
        }
        case 'down': {
            if (this.y + this.height + this.speed < bottomSide) {
                this.y += this.speed;
            }
            break;
        }
        case 'up': {
            this.y -= this.speed;
            if (this.y <= 0) {
                gameOver();
            }

            break;
        }
    }
}

Player.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(100, 200, 100),
    // new Enemy(-100, 60, 100),
    // new Enemy(-200, 140, 200), 
    // new Enemy(-300, 220, 150)
];
var player = new Player(200, 400, 75);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function gameOver() {
    player.setPosition(200, 400)
}

function checkIsOverlap(l1, r1,  l2,  r2) {
    const isRectangleOnLeftSideOfAnother = l1.x > r2.x || l2.x > r1.x;
    if (isRectangleOnLeftSideOfAnother) {
        return false;
    }

    const isOneRectangleAboveAnother = r1.y < l2.y || r2.y < l1.y;
    if (isOneRectangleAboveAnother) {
        return false;
    }

    return true;
}
