function shopInit(){
    //Shop init
    shop = new PIXI.Sprite(shop_textures);
    shop.anchor.set(0.5);
    shop.position.set(500, 100);
    shop.parentGroup = objectGroup;
 
    shop_overlay = new PIXI.Sprite(shop_overlay_texture);
 
    for(var i = 0; i < 10; i++)
        shop_items_textures[i] = new PIXI.Texture(shop_items_sheet, new PIXI.Rectangle(i * 95, 0, 95, 125));
 
    for(var i = 0; i < 10; i++){
        shop_items[i] = new PIXI.Sprite(shop_items_textures[i]);
        shop_items[i].position.set((110 + (i * shop_items[i].width)), (250 - shop_items[i].height));
 
        if(i > 4)
            shop_items[i].position.set((110 + ((i - 5) * shop_items[i].width)), (490 - shop_items[i].height));

        shop_items[i].name = items[i].name;
        shop_items[i].count = 10;
        shop_items[i].name_display = new PIXI.Text(shop_items[i].name);
        shop_items[i].name_display.position = shop_items[i].position;

        shop_items[i].count_display = new PIXI.Text(shop_items[i].count);
        shop_items[i].count_display.position = shop_items[i].position;
        shop_items[i].count_display.position.y += 100;

        shop_items[i].cost = 100;
    }
}