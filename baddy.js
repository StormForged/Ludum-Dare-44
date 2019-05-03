function baddyInit(){
    //Baddy creation
    for(var i = 0; i < 11; i++){
        baddies[i] = new PIXI.Container();
        baddies[i].sprite = new PIXI.Sprite(baddy_textures[0]); 
        baddies[i].patrol = true;
        baddies[i].chasing = true;
        baddies[i].inactive = false;
        baddies[i].attacking = false;
        baddies[i].maxLife = 200;
        baddies[i].life = 200;
        baddies[i].canDrain = false;
        baddies[i].sprite.anchor.set(0.5);
        baddies[i].sprite.position.x = 60 + (i * 110);
        baddies[i].sprite.position.y = (720 / 2);

        baddies[i].targetX = 0;
        baddies[i].targetY = 0;
        baddies[i].needPatrolTarget = true;
        baddies[i].patrolWaitTime = 0;
    
        baddies[i].hitBox = [];
        baddies[i].hurtBox = [];

        baddies[i].hurtBox[0] = new PIXI.Rectangle(baddies[i].position.x,
                                                baddies[i].position.y,
                                                50, 100);

        baddies[i].hitBox[0] = new PIXI.Rectangle(baddies[i].sprite.position.x + 20,
                                                baddies[i].sprite.position.y - 25,
                                                45, 45);

        baddies[i].parentGroup = objectGroup;
        baddies[i].baddyHurtBox = new PIXI.Graphics();
        baddies[i].baddyHitBox = new PIXI.Graphics();

        baddies[i].healthBar = new PIXI.Container();
        baddies[i].healthBar.position.set(baddies[i].sprite.position.x - 32, baddies[i].sprite.position.y - 64);
        
        baddies[i].innerBar = new PIXI.Graphics();
        baddies[i].healthBar.addChild(baddies[i].innerBar);

        baddies[i].outerBar = new PIXI.Graphics();
        baddies[i].healthBar.addChild(baddies[i].outerBar);

        baddies[i].baddyHurtBox.x = baddies[i].sprite.position.x - 20;
        baddies[i].baddyHurtBox.y = baddies[i].sprite.position.y - 50;

        
        baddies[i].addChild(baddies[i].sprite);
        baddies[i].addChild(baddies[i].baddyHurtBox);
        baddies[i].addChild(baddies[i].baddyHitBox); 
        baddies[i].addChild(baddies[i].healthBar);

        baddyContainer.addChild(baddies[i]);
    }
}

function baddyUpdate(baddy, delta){
    if(!baddy.inactive){
        baddy.innerBar.clear();
        baddy.outerBar.clear();

        if(baddy.life < 50){
            baddy.sprite.texture = baddy_textures[1];
            baddy.canDrain = true;
        }

        if(baddy.life == 0){
            baddyContainer.removeChild(baddy);
            baddyContainer.removeChild(baddy.baddyHurtBox);
            baddyContainer.removeChild(baddy.baddyHitBox);
            baddyContainer.removeChild(baddy.healthBar);
            baddy.inactive = true;
        }

        var dx = player.position.x - baddy.sprite.getGlobalPosition().x;
        var dy = player.position.y - baddy.sprite.getGlobalPosition().y;

        var tolerance = Math.sqrt((dx * dx) + (dy * dy));

        if(tolerance <= 200)
            baddy.chasing = true;
        else{
            baddy.chasing = false;
        }

        if(baddy.chasing && !baddy.canDrain){
            baddy.patrol = false;
            baddy.targetX = player.x;
            baddy.targetY = player.y;

            var tx = baddy.targetX - baddy.sprite.getGlobalPosition().x;
            var ty = baddy.targetY - baddy.sprite.getGlobalPosition().y;
            var dist = Math.sqrt((tx * tx) + (ty * ty));

            var velX = (tx / dist) * 5;
            var velY = (ty / dist) * 5;

            if(dist > 10){
                baddy.position.x += velX;
                baddy.position.y += velY;
            }
        }

        if(baddy.patrol && !baddy.canDrain){
            if(baddy.needPatrolTarget){
                baddy.targetX = baddy.position.x + randomInt(10, 200);
                var neg = randomInt(0, 1);
                if(neg == 0)
                    baddy.targetX = -baddy.targetX;

                baddy.targetY = baddy.position.y + randomInt(10, 200);
                neg = randomInt(0, 1);
                if(neg == 0)
                    baddy.targetY = -baddy.targetY;

                baddy.needPatrolTarget = false;
            }
            var tx = baddy.targetX - baddy.position.x;
            var ty = baddy.targetY - baddy.position.y;
            var dist = Math.sqrt((tx * tx) + (ty * ty));

            var velX = (tx / dist) * 5;
            var velY = (ty / dist) * 5;

            if(dist > 10){
                baddy.position.x += velX;
                baddy.position.y += velY;
            }
            if(dist < 10){
                baddy.patrolWaitTime = randomInt(1, 1);
                baddy.patrol = false;
            }
        }
    
        if(baddy.patrolWaitTime > 0 && !baddy.patrol && !baddy.chasing)
            baddy.patrolWaitTime--;

        if(baddy.patrolWaitTime <= 0 && !baddy.patrol && !baddy.chasing){
            baddy.patrol = true;
            baddy.needPatrolTarget = true;
        }


        if(baddy.attacking && collisionRectangle(player.hurtBox, baddy.baddyHitBox))
            player.life--;
            
        //if(player.attacking && collisionRectangle(player.hitBox, baddy.hurtBox[0]))
        //    baddy.life--;
        
        if(player.attacking && collisionRectangleGlobals(player.hitBox.x, player.hitBox.y, player.hitBox.width, player.hitBox.height,
                                baddy.baddyHurtBox.getGlobalPosition().x, baddy.baddyHurtBox.getGlobalPosition().y, baddy.hurtBox[0].width, baddy.hurtBox[0].height))
            baddy.life--;

        baddy.innerBar.beginFill(0x000000);
        baddy.innerBar.drawRect(0, 0, 100, 8);
        baddy.innerBar.endFill();

        baddy.outerBar.beginFill(0xFF3300);
        baddy.outerBar.drawRect(0, 0, (baddy.life / baddy.maxLife) * 100, 8);
        baddy.outerBar.endFill();
    }
}