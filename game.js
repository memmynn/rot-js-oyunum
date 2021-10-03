'use strict'
//array'den random item alma

    function getRandom(array){
        return Math.floor(Math.random()*array.length)
    };

//=============================OYUN==========================
let Game = function(){
//==============================FONKSİYONLAR==================//
    //buton ekleme
    function buttonAdd(domEl, ch){
        
        domEl.innerText = ""; //document element'in temizlenmesi
        for (let option in ch.options){ let buton = document.createElement("button"); buton.innerText = ch.options[option]; domEl.append(buton)};
    };

    //haritadaki şehirleri "0" değerine ayarla parametreler x, y, value
    function cityAdd(map, arrays){
        for (let city in arrays) {map.set(arrays[city].x, arrays[city].y, 0)};
    };
    //input callback
    function lightPasses(x, y){
        let key = x+","+y;
        if(x < map._width && y < map._height && x > -1 && y > -1) {return (map[key].isPassible === true);}
        return false;
    }; 

    //geçilebilir olma testi
    function isPassible(x, y) {
        let key = x+","+y;
        if(x < map._width && y < map._height && x > -1 && y > -1){return (map[key].isPassible === true)};
        return false;
    };

    //haritadaki presence'ı temizle
    function charClear(...storeArray) {
        for (let ary in storeArray) {
            for (let cha in storeArray[ary]) {
                delete map[storeArray[ary][cha].x+","+storeArray[ary][cha].y].presence;
            };
        };
    };

    //haritaya character ekle
    function charAdd(...storeArray) {
        for (let ary in storeArray) {
            for (let cha in storeArray[ary]) {
                map[storeArray[ary][cha].x+","+storeArray[ary][cha].y].presence = storeArray[ary][cha];
            };
        };
    };
    
    //oyun işle
    function init() {

        characters.forEach(element => element.move()); //karakterlerin hareket etmesi 'move()'
        charAdd(players, characters, cities);
        //for (let i in characters){fovCompute(characters[i])};
        display.clear();
        //centerCamera(player.x, player.y);
        fovCompute(player);
        
        buttonAdd(foot, cities[0]);
    };
    
    let freeCells = [];
    let players = [];
    let characters = [];
    let cities = [];
//================================================OYUN BAŞLATMA========================================

//========================================DÜNYA==============================================================

    let displayOptions = {
        width: 20,
        height: 16,
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
    let map = new ROT.Map.Cellular(60, 60).randomize(0.38);//rastgele 'randomize' coğrafya çıkarma
    map.create(function(x, y, type) {
        //map[x+","+y] = (type === 0 ? {ch:".", bg: "grey", fg: "white", isPassible: true}:{ch:"#", bg: "black"}); //haritaya "cell"'a göre "ch" verme
        if(type === 0) {freeCells.push({"x":x, "y":y})};
        //display.DEBUG(x, y);
        });
    //================================karakterler======================
    let player = new Person(null, null, "@","yellow", "red", players);
    let portal = new Person(null, null, "€","white", "green", characters);
    for (let i = 0; i< 130; i++){let _ = new Person(null, null, "T", "black", "white", characters) };

    //cityAdd(cities);
    let mortal = new City(5, 3,"pink", "black",cities);
    let medDark = new City(15, 16,"pink", "navy",cities);
    let light = new City(19, 22, "white", "green", cities);
    let mediumLight = new City(24, 23, "grey", "green", cities);

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
                if (isPassible(player.x - 1, player.y)) {player.x -=1};
            } if (code === "Numpad6" || code === "ArrowRight"){
                if (isPassible(player.x + 1, player.y)) {player.x +=1};
            } if (code === "Numpad8" || code === "ArrowUp"){
                if (isPassible(player.x, player.y - 1)) {player.y -=1};
            }else if (code === "Numpad2" || code === "ArrowDown"){
                if (isPassible(player.x, player.y + 1)) {player.y +=1};
            }else if (code === "Numpad7"){
                if (isPassible(player.x - 1, player.y - 1)) {player.y -=1, player.x -=1};
            }else if (code === "Numpad1"){
                if (isPassible(player.x -1, player.y + 1)) {player.x -= 1, player.y +=1};
            }else if (code === "Numpad9"){
                if (isPassible(player.x +1, player.y - 1)) {player.x += 1, player.y -=1};
            }else if (code === "Numpad3"){
                if (isPassible(player.x + 1, player.y + 1)) {player.y +=1, player.x +=1};
            };
            init();
        });

//======================================================================================================
    





return {getRandom, isPassible, init, map, portal:portal, mortal:mortal, players:players, cities:cities, characters:characters}
}();