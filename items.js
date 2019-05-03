//Rope
function newRope(){
    var rope = new PIXI.Sprite(rope_texture);
    rope.inactive = false;
    rope.traveled = 0;

    ropes.push(rope);
    camera.addChild(ropes[ropes.length - 1]);

    rope.position = rope.toLocal(rope, player);

    switch(player.direction){
        case directions.UP:
            rope.vx = 0;
            rope.vy = -5;
            break;
        case directions.DOWN:
            rope.vx = 0;
            rope.vy = 5;
            break;
        case directions.LEFT:
            rope.vx = -5;
            rope.vy = 0;
            break;
        case directions.RIGHT:
            rope.vx = 5;
            rope.vy = 0;
            break;
    } 
}

function updateRope(rope){
    for(var i = 0; i < baddies.length; i++){
        if(collisionRectangle(rope, baddies[i])){
            if(baddies[i].life < 75){
                camera.removeChild(rope);
                baddies[i].sprite.texture = baddy_textures[1];
                baddies[i].canDrain = true;
                rope.inactive = true;
            }
        }
    }

    if(rope.traveled > 80){
        camera.removeChild(rope);
        rope.inactive = true;
    }

    rope.position.x += rope.vx;
    rope.position.y += rope.vy;

    rope.traveled++;
}
//Bolo
function newBolo(){
    var bolo = new PIXI.Sprite(bolo_texture);
    bolo.inactive = false;
    bolo.traveled = 0;

    bolos.push(bolo);
    camera.addChild(bolos[bolos.length - 1]);

    bolo.position = bolo.toLocal(bolo, player);

    switch(player.direction){
        case directions.UP:
            bolo.vx = 0;
            bolo.vy = -10;
            break;
        case directions.DOWN:
            bolo.vx = 0;
            bolo.vy = 10;
            break;
        case directions.LEFT:
            bolo.vx = -10;
            bolo.vy = 0;
            break;
        case directions.RIGHT:
            bolo.vx = 10;
            bolo.vy = 0;
            break;
    } 
}

function updateBolo(bolo){
    for(var i = 0; i < baddies.length; i++){
        if(collisionRectangle(bolo, baddies[i])){
            if(baddies[i].life < 100){
                camera.removeChild(bolo);
                baddies[i].sprite.texture = baddy_textures[1];
                baddies[i].canDrain = true;
                bolo.inactive = true;
            }
        }
    }

    if(bolo.traveled > 80){
        camera.removeChild(bolo);
        bolo.inactive = true;
    }

    bolo.position.x += bolo.vx;
    bolo.position.y += bolo.vy;

    bolo.traveled++;
}
//arrow
function newArrow(){
    var arrow = new PIXI.Sprite(arrow_texture);
    arrow.inactive = false;
    arrow.traveled = 0;

    arrows.push(arrow);
    camera.addChild(arrows[arrows.length - 1]);

    arrow.position = arrow.toLocal(arrow, player);

    switch(player.direction){
        case directions.UP:
            arrow.vx = 0;
            arrow.vy = -20;
            break;
        case directions.DOWN:
            arrow.vx = 0;
            arrow.vy = 20;
            break;
        case directions.LEFT:
            arrow.vx = -20;
            arrow.vy = 0;
            break;
        case directions.RIGHT:
            arrow.vx = 20;
            arrow.vy = 0;
            break;
    } 
}

function updateArrow(arrow){
    for(var i = 0; i < baddies.length; i++){
        if(collisionRectangle(arrow, baddies[i])){
            camera.removeChild(arrow);
            if(baddies[i].life >= 50)
                baddies[i].life -= 50;
            else
                baddies[i].life = 0;
            arrow.inactive = true;
        }
    }

    if(arrow.traveled > 80){
        camera.removeChild(arrow);
        arrow.inactive = true;
    }

    arrow.position.x += arrow.vx;
    arrow.position.y += arrow.vy;

    arrow.traveled++;
}