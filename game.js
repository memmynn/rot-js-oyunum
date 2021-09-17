//=============================OYUN==========================
let Game = function(){
//==============================FONKSİYONLAR==================//
//array'den random item alma

    function getRandom(array){
        return Math.floor(Math.random()*array.length)
    };

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
    };

    //haritaya character ekle
    function charAdd() {
        for (let cha in characters) {
            map[characters[cha].x+","+characters[cha].y].presence = characters[cha];
        };
    };

    //oyun işle
    function init() {
        charClear();
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

    let map = [];
    let freeCells = [];
    let characters = [];

    new ROT.Map.DividedMaze(displayOptions.width, displayOptions.height).create(function(x, y, type) {
        map[x+","+y] = (type === 0 ? {ch:".", bg: "grey", fg: "white", isPassible: true}:{ch:"#", bg: "black"}); //haritaya "type"'a göre "ch" verme
        if(type === 0) {freeCells.push({"x":x, "y":y})}
        //display.DEBUG(x, y);
    });
    //event listener ekleme
    document.addEventListener('keydown', (event) => {
        charClear(); //karakteri siliyoruz
        let code = event.code;
        if (code === "ArrowLeft"){
            if (isPassible(player.x - 1, player.y)) {player.x -=1};
        };if (code === "ArrowRight"){
            if (isPassible(player.x + 1, player.y)) {player.x +=1};
        };if (code === "ArrowUp"){
            if (isPassible(player.x, player.y - 1)) {player.y -=1};
        };if (code === "ArrowDown"){
            if (isPassible(player.x, player.y + 1)) {player.y +=1};
        };
        init();
    });

    let fov = new ROT.FOV.PreciseShadowcasting(lightPasses);

    //output callback
    function fovCompute(char) {
            fov.compute(char.x, char.y, 5, function(x, y, r, visibility) {
            let ch = (r ? (map[x+","+y].presence ? map[x+","+y].presence.ch : map[x+","+y].ch) : char.ch); //presence varsa presence'ın ch'si yoksa haritanın ch'si, en sonunda char'ın ch'si
            r ? map[x+","+y].seen = true : null; //eğer r ise haritadaki nokta görünmüş oluyor
            let color = (map[x+","+y].presence && map[x+","+y].presence.bg ? map[x+","+y].presence.bg : map[x+","+y].bg);
            let fg = (map[x+","+y].presence && map[x+","+y].presence.fg ? map[x+","+y].presence.fg : map[x+","+y].fg);
            display.draw(x, y, ch, fg, color);
        } );
    };
//======================================================================================================
    //haritadaki karakter sınıfı
    let character = function (x, y, ch, fg, bg) {
        this.x = x || null, 
        this.y = y || null, 
        this.ch = ch || null, 
        this.fg = fg || null, 
        this.bg = bg || null,

        //karakterleri "characters" array'e ekleme
        characters.push(this);
    };

//================================karakterler======================
    let player = new character(null, null, "@","yellow", "red");
    let portal = new character(null, null, "€","white", "green");

    //karakterleri rastgele noktaya atma
    Object.assign(player, freeCells[getRandom(freeCells)]);
    Object.assign(portal, freeCells[getRandom(freeCells)]);
return {getRandom, lightPasses, isPassible, init, }
}();