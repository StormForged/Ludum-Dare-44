function play(delta){ 
    if(player.position.x >= 1180 && keyD.isDown)
        camera.position.x += camera.vx;
    else if(player.position.x <= 100 && keyA.isDown)
        camera.position.x += camera.vx;
    else if(player.position.y >= 620 && keyS.isDown)
        camera.position.y += camera.vy;
    else if(player.position.y <= 100 && keyW.isDown)
        camera.position.y += camera.vy;

    playerUpdate();

    //Baddy stuff
    //baddies.forEach(baddyUpdate, delta);

    //Clean up inactive baddies
    for(var i = baddies.length - 1; i >= 0; i--){
        baddyUpdate(baddies[i], delta);
        if(baddies[i].inactive)
            baddies.splice(i, 1);
    }

    if(displayHurtBox){
        if(player.attacking){        
            playerHitBox.clear();
            playerHitBox.beginFill(0xE0707D);
            playerHitBox.drawRect(player.hitBox.x, player.hitBox.y, player.hitBox.width, player.hitBox.height);
            playerHitBox.endFill();
        }else
            playerHitBox.clear();

        playerHurtBox.clear();
        playerHurtBox.beginFill(0x66CCFF);
        playerHurtBox.drawRect(player.hurtBox.x, player.hurtBox.y, player.hurtBox.width, player.hurtBox.height);
        playerHurtBox.endFill();
    

        for(var i = 0; i < baddies.length; i++){
            baddies[i].baddyHurtBox.clear();
            baddies[i].baddyHurtBox.beginFill(0x66CCFF);
            baddies[i].baddyHurtBox.drawRect(baddies[i].hurtBox[0].x, baddies[i].hurtBox[0].y, baddies[i].hurtBox[0].width, baddies[i].hurtBox[0].height);
            baddies[i].baddyHurtBox.endFill();
        
            baddies[i].baddyHitBox.clear();
            baddies[i].baddyHitBox.beginFill(0xE0707D);
            baddies[i].baddyHitBox.drawRect(baddies[i].hitBox[0].x, baddies[i].hitBox[0].y, baddies[i].hitBox[0].width, baddies[i].hitBox[0].height);
            baddies[i].baddyHitBox.endFill();
        }

    }else{
        playerHurtBox.clear();
        playerHitBox.clear();
        for(var i = 0; i < baddies.length; i++){
            baddies[i].baddyHurtBox.clear();
            baddies[i].baddyHitBox.clear();
        }
    }

    second--;
    if(second <= 0){
        player.life--;

        fpsDisplay.text = "FPS: " + frames;
        frames = 0;
        second = 60;
    }

    lifeDisplay.text = "Life: " + player.life;
    if(player.life < 1){
        for(var i = app.stage.children.length - 1; i >= 0; i--){
            app.stage.removeChild(app.stage.children[i]);
        };
        state = gameOver;
    }

    ropes.forEach(updateRope);
    for(var i = ropes.length - 1; i >= 0; i--)
        if(ropes[i].inactive)
            ropes.splice(i, 1);

    bolos.forEach(updateBolo);
    for(var i = bolos.length - 1; i >= 0; i--)
        if(bolos[i].inactive)
            bolos.splice(i, 1);

    arrows.forEach(updateArrow);
    for(var i = arrows.length - 1; i >= 0; i--)
        if(arrows[i].inactive)
            arrows.splice(i, 1);

    if(inventoryDisplay)
        state = inventory;

    if(shopDisplay)
        state = shopState;

    frames++;
}

function inventory(delta){
    if(!inventoryDisplay){
        app.stage.removeChild(inventory_screen);
        app.stage.removeChild(inventorySelector);
        for(var i = 0; i < items.length; i++){
            app.stage.removeChild(items[i]);
            app.stage.removeChild(items[i].count_display);
        }
        state = play;
    }

    inventorySelector.clear();
    inventorySelector.beginFill(0xE0707D);
    inventorySelector.alpha = 0.50;
    inventorySelector.drawRect(items[inventoryPos].position.x + 5, items[inventoryPos].position.y,
                                items[inventoryPos].width - 10, items[inventoryPos].height);
    inventorySelector.endFill();
}

function shopState(delta){
    if(!shopDisplay){
        app.stage.removeChild(shop_overlay);
        app.stage.removeChild(inventorySelector);
        for(var i = 0; i < items.length; i++){
            app.stage.removeChild(shop_items[i]);
            app.stage.removeChild(shop_items[i].name_display);
            app.stage.removeChild(shop_items[i].count_display);
        }
        state = play;
    }

    inventorySelector.clear();
    inventorySelector.beginFill(0xE0707D);
    inventorySelector.alpha = 0.50;
    inventorySelector.drawRect(shop_items[inventoryPos].position.x, shop_items[inventoryPos].position.y,
                                shop_items[inventoryPos].width, shop_items[inventoryPos].height);
    inventorySelector.endFill();
}

function gameOver(delta){
    var gameOverStyle = new PIXI.TextStyle({
        fontSize: 200,
        fill: "red"
    });
    var gameOver = new PIXI.Text("YOU DIED", gameOverStyle);
    gameOver.x = app.stage.width / 2;
    gameOver.y = app.stage.height / 2;

    app.stage.addChild(gameOver);
}