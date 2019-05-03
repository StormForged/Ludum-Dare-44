//Simplicity sake everything is loaded inside main
PIXI.loader.add([
    "assets/grass_sheet.png",
    "assets/player_sheet.png",
    "assets/baddy_sheet.png",
    "assets/shop.png",
    "assets/inventory_sheet.png",
    "assets/item_sheet.png",
    "assets/shop_overlay.png",
    "assets/shop_items_sheet.png",
    "assets/activeItem.png",
    "assets/rope.png",
    "assets/bolo.png",
    "assets/arrow.png",
    "assets/guard_overlay.png",
    "assets/guard_overworld.png"
    ]).load(main);

function main(){
    //init
    textures();

    objectGroup.on('sort', function(sprite){
        sprite.zOrder = -sprite.y;
    })

    app.stage = new PIXI.display.Stage();
    app.stage.group.enableSort = true;

    app.stage.addChild(camera);

    app.stage.addChild(new PIXI.display.Layer(backgroundGroup));
    app.stage.addChild(new PIXI.display.Layer(objectGroup));
    app.stage.addChild(new PIXI.display.Layer(foreGroundGroup));

    //app.stage.addChild(backgroundContainer);
    //app.stage.addChild(inventoryContainer);
    //app.stage.addChild(baddyContainer);

    map();

    inventoryInit();
    shopInit();

    guard_overlay = new PIXI.Sprite(guard_overlay_texture);
    guard_overworld = new PIXI.Sprite(guard_overworld_texture);

    app.stage.addChild(guard_overworld);

    playerInit();

    camera.position.set(0,0);
    camera.vx = 0;
    camera.vy = 0;

    camera.addChild(shop);

    baddyInit();

    var activeItemDisplayBackground = new PIXI.Sprite(activeItem_texture);
    activeItemDisplayBackground.position.x = 50;
    activeItemDisplayBackground.position.y = app.renderer.height - (activeItemDisplayBackground.height + 50);
    activeItemContainer.addChild(activeItemDisplayBackground);

    var activeItemDisplayForeground = new PIXI.Sprite(item_textures[item_textures.length - 1]);
    activeItemDisplayForeground.position = activeItemDisplayBackground.position;
    activeItemContainer.addChild(activeItemDisplayForeground);

    var activeItemDisplayCount = new PIXI.Text(items[9].count, whiteTextStyle);
    activeItemDisplayCount.position = activeItemDisplayBackground.position;
    activeItemContainer.addChild(activeItemDisplayCount);

    lifeDisplay = new PIXI.Text("Life: " + player.life);
    app.stage.addChild(lifeDisplay);

    fpsDisplay = new PIXI.Text("FPS: " + displayHurtBox);
    lifeDisplay.y = 20;
    app.stage.addChild(fpsDisplay);

    app.stage.addChild(player);

    app.stage.addChild(activeItemContainer);

    keyW.press = () =>{
        if(!inventoryDisplay && !shopDisplay)
            player.direction = directions.UP;

        player.hitBox.height = player.hitBoxes[player.direction].height;
        player.hitBox.width = player.hitBoxes[player.direction].width;
        if(!player.attacking)
            player.vy -= 10;

        camera.vy += 10;

        if(inventoryDisplay || shopDisplay)
            if(inventoryPos > 4)
                inventoryPos -= 5;
    };
    keyW.release = () =>{
        player.vy = 0;
        camera.vy = 0;
    };

    keyS.press = () =>{
        if(!inventoryDisplay && !shopDisplay)
            player.direction = directions.DOWN;

        player.hitBox.height = player.hitBoxes[player.direction].height;
        player.hitBox.width = player.hitBoxes[player.direction].width;
        if(!player.attacking)
            player.vy += 10;

        camera.vy -= 10;

        if(inventoryDisplay || shopDisplay)
            if(inventoryPos <= 4)
                inventoryPos += 5;
    };
    keyS.release = () =>{
        player.vy = 0;
        camera.vy = 0;
    };

    keyA.press = () =>{
        if(!inventoryDisplay && !shopDisplay)
            player.direction = directions.LEFT;

        player.hitBox.height = player.hitBoxes[player.direction].height;
        player.hitBox.width = player.hitBoxes[player.direction].width;
        if(!player.attacking)
            player.vx -= 10;

        camera.vx += 10;
        
        if(inventoryDisplay || shopDisplay)
            if(inventoryPos > 0)
                inventoryPos -= 1;
    };
    keyA.release = () =>{
        player.vx = 0;
        camera.vx = 0;
    };
    
    keyD.press = () =>{
        if(!inventoryDisplay && !shopDisplay)
            player.direction = directions.RIGHT;

        player.hitBox.height = player.hitBoxes[player.direction].height;
        player.hitBox.width = player.hitBoxes[player.direction].width;
        if(!player.attacking){
                player.vx += 10;
        }
        
        camera.vx -= 10;

        if(inventoryDisplay || shopDisplay)
            if(inventoryPos < 9)
                inventoryPos += 1;
    };
    keyD.release = () =>{
        player.vx = 0;
        camera.vx = 0;
    };

    keyP.press = () =>{
        if(!displayHurtBox)
            displayHurtBox = true;
        else
            displayHurtBox = false;
    };
    
    keyE.press = () =>{
        switch(shopDisplay){
            case true:
                shopDisplay = false;
                break;
            case false:
                if(!inventoryDisplay && collisionRectangleGlobals(player.hitBox.x, player.hitBox.y, player.hitBox.width, player.hitBox.height,
                                                                    shop.getGlobalPosition().x, shop.getGlobalPosition().y,
                                                                    shop.width, shop.height)){
                    shopDisplay = true;
                    app.stage.addChild(shop_overlay);
                    app.stage.addChild(inventorySelector);
                    for(var i = 0; i < shop_items.length; i++){
                        app.stage.addChild(shop_items[i]);
                        app.stage.addChild(shop_items[i].name_display);
                        app.stage.addChild(shop_items[i].count_display);
                    }
                }
                break;
        }

        for(var i = 0; i < baddies.length; i++){
            if(baddies[i].canDrain && collisionRectangleGlobals(player.hitBox.x, player.hitBox.y, player.hitBox.width, player.hitBox.height,
                                                                baddies[i].baddyHurtBox.getGlobalPosition().x, baddies[i].baddyHurtBox.getGlobalPosition().y,
                                                                baddies[i].hurtBox[0].width, baddies[i].hurtBox[0].height)){
                player.life += baddies[i].life;
                baddies[i].life = 0;
            }
        }
    }

    keyR.press = () =>{
        if(!inventoryDisplay && !shopDisplay){
            app.stage.addChild(inventory_screen);
            for(var i = 0; i < items.length; i++){
                items[i].count_display.text = items[i].count;
                app.stage.addChild(items[i]);
                app.stage.addChild(items[i].count_display);
            }
            app.stage.addChild(inventorySelector);
            inventoryDisplay = true;
        }
        else
            inventoryDisplay = false;
    }

    keyI.press = () =>{
        if(!player.attacking){
            player.attacking = true;
            player.attackingTimer = 10;
        }
    };

    keyO.press = () =>{
        if(!player.attacking){
            if(items[activeItem].count > 0){
                items[activeItem].count--;
                activeItemDisplayCount.text = items[activeItem].count;
                switch(activeItem){
                    case 0:
                        newRope();
                        break;
                    case 1:
                        newBolo();
                        break;
                    case 2:
                        newArrow();
                        break;
                    default:
                        break;
                }
            }
        }
    }

    keyEnter.press = () =>{
        if(shopDisplay)
            if(shop_items[inventoryPos].count > 0 && player.life > shop_items[inventoryPos].cost){
                shop_items[inventoryPos].count--;
                items[inventoryPos].count++;
                player.life -= shop_items[inventoryPos].cost;
                shop_items[inventoryPos].count_display.text = shop_items[inventoryPos].count;
                lifeDisplay.text = "Life: " + player.life;
                items[inventoryPos].count_display.text = items[inventoryPos].count;
                activeItemDisplayCount.text = items[activeItem].count;
            }

        if(inventoryDisplay){
            activeItem = inventoryPos;
            activeItemDisplayForeground.texture = item_textures[activeItem];
            activeItemDisplayCount.text = items[activeItem].count;
        }
    }

    //Set state
    state = play;

    app.stage.addChild(playerHurtBox);
    app.stage.addChild(playerHitBox);

    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
    state(delta)
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function collisionRectangleGlobals(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h){
    var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    hit = false;

    //Find the centre points
    var r1centreX = r1x + r1w / 2;
    var r1centreY = r1y + r1h / 2;
    var r2centreX = r2x + r2w / 2;
    var r2centreY = r2y + r2h / 2;

    //Find the half widths and half heights
    var r1halfWidth     = r1w / 2;
    var r1halfHeight    = r1h / 2;
    var r2halfWidth     = r2w / 2;
    var r2halfHeight    = r2h / 2;

    //calculate the distance vector between boxes
    vx = r1centreX - r2centreX;
    vy = r1centreY - r2centreY;

    //Figure out combined half widths/heights

    combinedHalfWidths = r1halfWidth + r2halfWidth;
    combinedHalfHeights = r1halfHeight + r2halfHeight;

    //check for collision on the x-axis
    if(Math.abs(vx) < combinedHalfWidths){
        //Check for collision on the y-axis
        if(Math.abs(vy) < combinedHalfHeights){
            hit = true;
        }else{
            hit = false;
        }
    }else{
        hit = false;
    }

    return hit;
}

function collisionRectangle(r1, r2){
    var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    hit = false;

    //Find the centre points
    r1.centreX = r1.x + r1.width / 2;
    r1.centreY = r1.y + r1.height / 2;
    r2.centreX = r2.x + r2.width / 2;
    r2.centreY = r2.y + r2.height / 2;

    //Find the half widths and half heights
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //calculate the distance vector between boxes
    vx = r1.centreX - r2.centreX;
    vy = r1.centreY - r2.centreY;

    //Figure out combined half widths/heights

    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //check for collision on the x-axis
    if(Math.abs(vx) < combinedHalfWidths){
        //Check for collision on the y-axis
        if(Math.abs(vy) < combinedHalfHeights){
            hit = true;
        }else{
            hit = false;
        }
    }else{
        hit = false;
    }

    return hit;
}