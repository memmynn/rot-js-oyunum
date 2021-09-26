//array'den random item alma

    function getRandom(array){
        return Math.floor(Math.random()*array.length)
    };


//=============================OYUN==========================
let Game = function(){
//==============================FONKSİYONLAR==================//

    //input callback
    function lightPasses(x, y){
        let key = x+","+y;
        if(key in map) {return (map[key].isPassible === true);}
        return false;
    };  

    //geçilebilir olma testi
    function isPassible(x, y) {
        let key = x+","+y;
        if(map[key].isPassible) {return true};
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
        charAdd(players, characters, cities);
        fovCompute(player);
    };
    
    let freeCells = [];
    let players = [];
    let characters = [];
    let cities = [];
//================================================OYUN BAŞLATMA========================================

//========================================DÜNYA==============================================================

    let displayOptions = {
        width: 50,
        height: 40,
        fontSize: 18,
        fontFamily: "monospace",
        //fg: "#CB730B",//"#F0FFFF"
        //bg: "#000000",
        spacing: 1,
        layout: "rect",
    };

    let display = new ROT.Display(displayOptions);

    document.body.append(display.getContainer());


    let rand = function () {
        return Math.round(Math.random())
    };

    let map = new ROT.Map.Cellular(displayOptions.width, displayOptions.height).randomize(0.4);
    map.connect();
    map.create(function(x, y, type) {
        map[x+","+y] = (type === 0 ? {ch:".", bg: "grey", fg: "white", isPassible: true}:{ch:"#", bg: "black"}); //haritaya "cell"'a göre "ch" verme
        if(type === 0) {freeCells.push({"x":x, "y":y})};
        //display.DEBUG(x, y);
        });




    let fov = new ROT.FOV.PreciseShadowcasting(lightPasses);

    //output callback
    function fovCompute(char) {
            fov.compute(char.x, char.y, 5, function(x, y, r, visibility) {
            if (map[x+","+y]){
                let ch = (map[x+","+y].presence && map[x+","+y].presence.ch ? map[x+","+y].presence.ch : map[x+","+y].ch); //presence varsa presence'ın ch'si, yoksa haritanın ch'si, en sonunda char'ın ch'si
                map[x+","+y].seen = true; //eğer r ise haritadaki nokta görünmüş oluyor
                let fg = (map[x+","+y].presence && map[x+","+y].presence.fg ? map[x+","+y].presence.fg : map[x+","+y].fg);//presence varsa ve presence'ın fg rengi varsa, yoksa haritanın fg rengi, en sonunda char'ın fg rengi
                let color = map[x+","+y].presence && map[x+","+y].presence.bg ? map[x+","+y].presence.bg : map[x+","+y].bg;//presence varsa ve presence'ın bg rengi varsa, yoksa haritanın bg rengi, en sonunda char'ın bg rengi
                display.draw(x, y, ch, fg, color);
            }
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
    

//================================karakterler======================
    let mortal = new City(5, 3,"pink", "black",cities);
    let player = new Person(null, null, "@","yellow", "red", players);
    let portal = new Person(null, null, "€","white", "green", characters);

    //karakterleri rastgele noktaya atma
    Object.assign(player, freeCells[getRandom(freeCells)]);
    Object.assign(portal, freeCells[getRandom(freeCells)]);

return {getRandom, lightPasses, isPassible, init, /*portal:portal, mortal:mortal, players:players, cities:cities, characters:characters*/}
}();

Game.init();