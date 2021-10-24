//'use strict'

//=============================OYUN==========================
let Game = function(){

    //oyun işle
    function init() {
        _location = map[(player.x +","+ player.y)];
        display.clear();
         //karakterlerin hareket etmesi 'move(element)'
        characters.forEach(element => move(element));
        charAdd(players, characters, cities);        
        /*for (let i in characters){fovCompute(characters[i])};*/
        fovCompute(player);
        foot.innerText = "";
        if(_location.presence.options){buttonAdd(foot, _location.presence)};
    };
    
    
    let freeCells = [];
    let players = [];
    let characters = [];
    let cities = [];
//================================================OYUN BAŞLATMA========================================

//========================================DÜNYA==============================================================

    let displayOptions = {
        width: 36,
        height: 22,
        fontSize: 30,
        fontFamily: "monospace",
        fg: "#CB730B",//"#F0FFFF"
        bg: "#000000",
        spacing: 1.3,
        //layout: "rect",
    };

    //====================================DOM ELEMENTLERİ===============================

    let display = new ROT.Display(displayOptions);
    let displayDiv = document.getElementById('dsply');
    displayDiv.append(display.getContainer());
    let foot = document.getElementById('foot');
    //==============================================================================
    let map = new ROT.Map.Cellular(70, 55).randomize(0.1);//rastgele 'randomize' coğrafya çıkarma
    map.create(function(x, y, type) {
        //map[x+","+y] = (type === 0 ? {ch:".", bg: "grey", fg: "white", isPassible: true}:{ch:"#", bg: "black"}); //haritaya "cell"'a göre "ch" verme
        if(type === 0) {freeCells.push({"x":x, "y":y})};
        //display.DEBUG(x, y);
        });
    //================================karakterler======================
    let player = Person(null, null, "@","yellow", "red", players);store(player);
    let portal = Person(null, null, "€","white", "green", characters);store(portal);
    for (let i = 0; i< 2; i++){let _ = Person(null, null, "T", "black", "white", characters); store(_) };

    //cityAdd(cities);
    let mortal = City(5, 3,"pink", "black",cities); store(mortal);
    let medDark = City(15, 16,"pink", "navy",cities);store(medDark);
    let light = City(19, 22, "white", "green", cities);store(light);
    let mediumLight = City(24, 23, "grey", "green", cities);store(mediumLight);

    cityAdd(map, cities);

    //haritadaki "0" değerlerini birbirine bağla ve haritaya değer ver
    map.connect(function(x, y, type){
        map[x+","+y] = (type === 0 ? {ch:".", bg: "grey", fg: "white", isPassible: true}:{ch:"#", bg: "black"}); //haritaya "cell"'a göre "ch" verme
        });

        
    //karakterleri rastgele noktaya atma
    Object.assign(player, freeCells[getRandom(freeCells)]);
    for(let i = 0; i < characters.length; i++) {Object.assign(characters[i], freeCells[getRandom(freeCells)])};
    
    let cameraTarget = player;
    
    //ekranda player'ı takip etme algoritması
    function drawScreen (x, y, character, fgColor, bgColor) {
		if (cameraTarget) {
			x += (Math.round(displayOptions.width/2) - cameraTarget.x);
			y += (Math.round(displayOptions.height/2) - cameraTarget.y);
		}
		return display.draw(x, y, character, fgColor, bgColor);
	};    
    
    let fov = new ROT.FOV.PreciseShadowcasting(lightPasses);

    //output callback
    function fovCompute(char) {
            fov.compute(char.x, char.y, 5, function(x, y, r, visibility) {
            if (x < map._width && y < map._height && x > -1 && y > -1){//harita içinde olup olmadığı kontrolü
                let ch = (map[x+","+y].presence && map[x+","+y].presence.ch ? map[x+","+y].presence.ch : map[x+","+y].ch); //presence varsa presence'ın ch'si, yoksa haritanın ch'si
                map[x+","+y].seen = true; //eğer r ise haritadaki nokta görünmüş oluyor
                let fg = (map[x+","+y].presence && map[x+","+y].presence.fg ? map[x+","+y].presence.fg : map[x+","+y].fg);//presence varsa ve presence'ın fg rengi varsa, yoksa haritanın fg rengi, en sonunda char'ın fg rengi
                let color = map[x+","+y].presence && map[x+","+y].presence.bg ? map[x+","+y].presence.bg : map[x+","+y].bg;//presence varsa ve presence'ın bg rengi varsa, yoksa haritanın bg rengi, en sonunda char'ın bg rengi
                
                drawScreen(x, y, ch, fg, color);
                /*display.draw(x, y, ch, fg, color)*/
            };
        } );
    };
    
        //event listener ekleme
        document.addEventListener('keydown', function (event) {
            let code = event.code;
            charClear(players, characters, cities); //karakteri siliyoruz
            if (code === "Numpad4" || code === "ArrowLeft" ){
                if (isPassible(player.x - 1, player.y, map)) {player.x -=1};
            } if (code === "Numpad6" || code === "ArrowRight"){
                if (isPassible(player.x + 1, player.y, map)) {player.x +=1};
            } if (code === "Numpad8" || code === "ArrowUp"){
                if (isPassible(player.x, player.y - 1, map)) {player.y -=1};
            }else if (code === "Numpad2" || code === "ArrowDown"){
                if (isPassible(player.x, player.y + 1, map)) {player.y +=1};
            }else if (code === "Numpad7"){
                if (isPassible(player.x - 1, player.y - 1, map)) {player.y -=1, player.x -=1};
            }else if (code === "Numpad1"){
                if (isPassible(player.x -1, player.y + 1, map)) {player.x -= 1, player.y +=1};
            }else if (code === "Numpad9"){
                if (isPassible(player.x +1, player.y - 1, map)) {player.x += 1, player.y -=1};
            }else if (code === "Numpad3"){
                if (isPassible(player.x + 1, player.y + 1, map)) {player.y +=1, player.x +=1};
            };
            init();
        });

//======================================================================================================
  





return {getRandom, isPassible, init, map, players, cities, characters};
}();