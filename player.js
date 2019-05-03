function playerUpdate(){
    
    if(player.direction == 1 && player.position.x >= 1180)
        player.vx = 0;
    else if(player.direction == 3 && player.position.x <= 100)
        player.vx = 0;
    else if(player.direction == 0 && player.position.y >= 620)
        player.vy = 0;
    else if(player.direction == 2 && player.position.y <= 100)
        player.vy = 0;

    if(!player.attacking){
        player.position.y += player.vy;
        player.position.x += player.vx;
    }

    player.hurtBox.x = player.position.x - player.hurtOriginX;
    player.hurtBox.y = player.position.y - player.hurtOriginY;
    player.hitBox.x = player.position.x + player.hitBoxes[player.direction].x;
    player.hitBox.y = player.position.y + player.hitBoxes[player.direction].y;

    if(player.attacking){
        player.texture = player_textures[1][player.direction];
        player.attackingTimer--;
    }else
        player.texture = player_textures[0][player.direction];

    if(player.attackingTimer <= 0)
        player.attacking = false;
    
}

function playerInit(){
    player = new PIXI.Sprite(player_textures[0][0]);
    player.anchor.set(0.5);
    player.life = 1000;
    player.position.set(500, 500);
    player.direction = directions.DOWN;
    player.vy = 0;
    player.vx = 0;
    //Janky hurtbox stuff
    player.hurtOriginX = 10;
    player.hurtOriginY = 30;
    player.hurtWidth = 25;
    player.hurtHeight = 64;
    player.hurtBox = new PIXI.Rectangle((player.position.x / 2) + player.hurtOriginX,
                                        (player.position.y / 2) + player.hurtOriginY,
                                        player.hurtWidth, player.hurtHeight);
    //Janky hitbox stuff
    player.attacking = false;
    player.hitOriginX = 20;
    player.hitOriginY = -25;
    player.hitWidth = 20;
    player.hitHeight = 45;
    player.hitBox = new PIXI.Rectangle(0,0,0,0);

    player.hitBoxes = [];
    player.hitBoxes[0] = new PIXI.Rectangle(-32, 0, 64, 32);
    player.hitBoxes[1] = new PIXI.Rectangle(8, -32, 32, 64);
    player.hitBoxes[2] = new PIXI.Rectangle(-32, -32, 64, 32);
    player.hitBoxes[3] = new PIXI.Rectangle(-32, -32, 32, 64);


    player.parentGroup = objectGroup;
    playerHurtBox.parentGroup = objectGroup;
    playerHitBox.parentGroup = objectGroup;

    //playerContainer.addChild(player);
}