//Directions ENUM
const directions = {
    DOWN: 0,
    RIGHT: 1,
    UP: 2,
    LEFT: 3
 }
 
 //Init
 var grass_sheet;
 var player_sheet;
 var baddy_sheet;
 var shop_sheet;
 var item_sheet;
 var inventory_sheet;
 var shop_overlay_image;
 var shop_items_sheet;
 var activeItem_image;

 var guard_overlay_image;
 var guard_overworld_image;
 
 var rope_image;
 var bolo_image;
 var arrow_image;
 
 var shop_textures;
 var shop_overlay_texture;
 var inventory_textures;
 var item_textures = [];
 var shop_items_textures = [];
 var activeItem_texture;

 var guard_overlay_texture;
 var guard_overworld_texture;

 var rope_texture;
 var bolo_texture;
 var arrow_texture;
 
 var grass_textures = [4];
 var baddy_textures = [2];
 
 var player_textures = [2];
 player_textures[0] = [4];
 player_textures[1] = [4];

 var ropes = [];
 var bolos = [];
 var arrows = [];
 
 var map = [];
 var shop;
 var player;
 var shop_overlay;
 var guard_overlay;
 var baddies = [];
 var items = [9];
 var shop_items = [];
 var lifeDisplay;
 var fpsDisplay;
 var frames = 0;
 var second = 60;

 var activeItem = 9;
 
 var inventoryPos = 0;
 
 var inventoryDisplay = false;
 var shopDisplay = false;
 
 var displayHurtBox = false;
 var playerHurtBox = new PIXI.Graphics();
 var playerHitBox = new PIXI.Graphics();
 var inventorySelector = new PIXI.Graphics();

 var camera = new PIXI.Container();
 var activeItemContainer = new PIXI.Container();

 var objectGroup = new PIXI.display.Group(0, true);
 var backgroundGroup = new PIXI.display.Group(-1, false);
 var foreGroundGroup = new PIXI.display.Group(1, true);

 var whiteTextStyle = new PIXI.TextStyle({
    fill: "white",
 });

 //var playerContainer = new PIXI.Container();
 //camera.addChild(playerContainer);

 var baddyContainer = new PIXI.Container();
 camera.addChild(baddyContainer);

 var backgroundContainer = new PIXI.Container();
 camera.addChild(backgroundContainer);

 var inventoryContainer = new PIXI.Container();
 camera.addChild(inventoryContainer);

 var itemContainer = new PIXI.Container();
 camera.addChild(itemContainer);

 //Key events
 var keyW = keyboard("w");
 var keyA = keyboard("a");
 var keyS = keyboard("s");
 var keyD = keyboard("d");
 var keyP = keyboard("p");
 var keyE = keyboard("e");
 var keyR = keyboard("r");
 var keyI = keyboard("i");
 var keyO = keyboard("o");
 var keyEnter = keyboard("Enter");
 var keySpace = keyboard(" ");