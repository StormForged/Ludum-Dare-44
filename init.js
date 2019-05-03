function textures(){
    grass_sheet = PIXI.utils.TextureCache["assets/grass_sheet.png"];
    player_sheet = PIXI.utils.TextureCache["assets/player_sheet.png"];
    baddy_sheet = PIXI.utils.TextureCache["assets/baddy_sheet.png"];
    shop_sheet = PIXI.utils.TextureCache["assets/shop.png"];
    inventory_sheet = PIXI.utils.TextureCache["assets/inventory_sheet.png"];
    item_sheet = PIXI.utils.TextureCache["assets/item_sheet.png"];
    shop_overlay_image = PIXI.utils.TextureCache["assets/shop_overlay.png"];
    shop_items_sheet = PIXI.utils.TextureCache["assets/shop_items_sheet.png"];
    activeItem_image = PIXI.utils.TextureCache["assets/activeItem.png"];
    
    guard_overlay_image = PIXI.utils.TextureCache["assets/guard_overlay.png"];
    guard_overworld_image = PIXI.utils.TextureCache["assets/guard_overworld.png"]

    rope_image = PIXI.utils.TextureCache["assets/rope.png"];
    bolo_image = PIXI.utils.TextureCache["assets/bolo.png"];
    arrow_image = PIXI.utils.TextureCache["assets/arrow.png"];

    for(var i = 0; i < 4; i++)
        grass_textures[i] = new PIXI.Texture(grass_sheet, new PIXI.Rectangle(i * 64, 0, 64, 64));

    for(var i = 0; i < 2; i++)
        baddy_textures[i] = new PIXI.Texture(baddy_sheet, new PIXI.Rectangle(i * 128, 0, 128, 128));

    //Make player textures - not fuckign with nested
    for(var i = 0; i < 4; i++)
        player_textures[0][i] = new PIXI.Texture(player_sheet, new PIXI.Rectangle(i * 64, 0, 64, 64));

    for(var i = 0; i < 4; i++)
        player_textures[1][i] = new PIXI.Texture(player_sheet, new PIXI.Rectangle(i * 64, 64, 64, 64));

    shop_textures = new PIXI.Texture(shop_sheet, new PIXI.Rectangle(0, 0, 128, 128));

    inventory_textures = new PIXI.Texture(inventory_sheet, new PIXI.Rectangle(0, 0, 640, 400));

    for(var i = 0; i < 10; i++)
        item_textures[i] = new PIXI.Texture(item_sheet, new PIXI.Rectangle(i * 110, 0, 110, 150));

    shop_overlay_texture = new PIXI.Texture(shop_overlay_image, new PIXI.Rectangle(0, 0, 1280, 720));
    activeItem_texture = new PIXI.Texture(activeItem_image, new PIXI.Rectangle(0, 0, 110, 150));

    guard_overlay_texture = new PIXI.Texture(guard_overlay_image, new PIXI.Rectangle(0, 0, 1280, 720));
    guard_overworld_texture = new PIXI.Texture(guard_overworld_image, new PIXI.Rectangle(0, 0, 64, 64));

    rope_texture = new PIXI.Texture(rope_image, new PIXI.Rectangle(0, 0, 64, 64));
    bolo_texture = new PIXI.Texture(bolo_image, new PIXI.Rectangle(0, 0, 64, 64));
    arrow_texture = new PIXI.Texture(arrow_image, new PIXI.Rectangle(0, 0, 64, 64));
}

function map(){
    for(var i = 0; i < 50; i++){
        map[i] = [];
        for(var j = 0; j < 50; j++){
            map[i][j] = new PIXI.Sprite(grass_textures[randomInt(0, 3)]);
            map[i][j].position.set(i * 64, j *64);
            map[i][j].parentGroup = backgroundGroup;
            backgroundContainer.addChild(map[i][j]);
        }
    }
}