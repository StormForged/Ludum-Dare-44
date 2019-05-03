function inventoryInit(){
    //Inventory init
    inventory_screen = new PIXI.Sprite(inventory_textures);
    inventory_screen.anchor.set(0.5);
    inventory_screen.position.set(app.renderer.width / 2, app.renderer.height / 2);
    inventory_screen.parentGroup = foreGroundGroup;

    inventorySelector.parentGroup = foreGroundGroup;

    for(var i = 0; i < 10; i++){
        items[i] = new PIXI.Sprite(item_textures[i]);
        items[i].position.set((inventory_screen.position.x - (inventory_screen.width / 2) + 15) + (i * 125), 
                                (inventory_screen.position.y - (inventory_screen.height / 2) + 15) + (i + 30));
        
        if(items[i].position.x > inventory_screen.position.x + 200)
            items[i].position.set((inventory_screen.position.x - (inventory_screen.width / 2) + 15) + ((i - 5)* 125), 
                                    (inventory_screen.position.y - (inventory_screen.height / 2) + 15) + (i + 200));    

        items[i].parentGroup = foreGroundGroup;

        items[i].name = "N/A";
        items[i].count = 0;

        items[i].name_display = new PIXI.Text(items[i].name, whiteTextStyle);
        items[i].count_display = new PIXI.Text(items[i].count, whiteTextStyle);
        items[i].count_display.position = items[i].position;
        items[i].count_display.position.y += 100;
        items[i].count_display.position.x += 90;
        
        items[i].count_display.parentGroup = foreGroundGroup;
        items[i].count_display.parentGroup = foreGroundGroup;
    }
    //Hardcoded item init
    items[0].name = "Rope";
    items[1].name = "Bolo";
    items[2].name = "Arrows";
}