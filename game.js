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
    function charClear() {
        for (let cha in characters) {
            delete map[characters[cha].x+","+characters[cha].y].presence;
        };
        for (let cha in players) {
            delete map[players[cha].x+","+players[cha].y].presence;
        };
    };

    //haritaya character ekle
    function charAdd() {
        for (let cha in characters) {
            map[characters[cha].x+","+characters[cha].y].presence = characters[cha];
        };
        for (let cha in players) {
            map[players[cha].x+","+players[cha].y].presence = players[cha];
        };
    };

    //oyun işle
    function init() {
        charAdd();
        fovCompute(player);
    };

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

    let freeCells = [];
    let players = [];
    let characters = [];
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


    //event listener ekleme
    document.addEventListener('keydown', (event) => {
        charClear(); //karakteri siliyoruz
        let code = event.key;
        if (code === "ArrowLeft" || code === "4" ){
            if (isPassible(player.x - 1, player.y)) {player.x -=1};
        };if (code === "ArrowRight" || code === "6"){
            if (isPassible(player.x + 1, player.y)) {player.x +=1};
        };if (code === "ArrowUp" || code === "8"){
            if (isPassible(player.x, player.y - 1)) {player.y -=1};
        };if (code === "ArrowDown" || code === "2"){
            if (isPassible(player.x, player.y + 1)) {player.y +=1};
        };if (code === "7" || code === "Home"){
            if (isPassible(player.x - 1, player.y - 1)) {player.y -=1, player.x -=1};
        };if (code === "1" || code === "End"){
            if (isPassible(player.x -1, player.y + 1)) {player.x -= 1, player.y +=1};
        };if (code === "9" || code === "PageUp"){
            if (isPassible(player.x +1, player.y - 1)) {player.x += 1, player.y -=1};
        };if (code === "3" || code === "PageDown"){
            if (isPassible(player.x + 1, player.y + 1)) {player.y +=1, player.x +=1};
        };
        init();
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
//======================================================================================================
    

//================================karakterler======================
    let player = new Person(null, null, "@","yellow", "red", players);
    let portal = new Person(null, null, "€","white", "green", characters);
    let mortal = new Person(5, 3, "M","pink", "black", characters)

    //karakterleri rastgele noktaya atma
    Object.assign(player, freeCells[getRandom(freeCells)]);
    Object.assign(portal, freeCells[getRandom(freeCells)]);
return {getRandom, lightPasses, isPassible, init, }
}();

Game.init();