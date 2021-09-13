//array'den random item alma
function getRandom(array){
    return Math.floor(Math.random()*array.length)
};
//input callback
function lightPasses(x, y){
    let key = x+","+y;
    if(key in map) {return (map[key] === 0);}
    return false;
};  
//karakter draw
function charDraw(char) {
    display.draw(char.x, char.y, char.ch, char.fg, char.bg)    
}

//harita draw
function drawAll () {
    fovCompute(player);
    charDraw(portal);
}
//geçilebilir olma testi
function isPassible(x, y){
    let key = x+","+y;
    if(map[key] === 0) {return true};
    return false;
};


//========================================HARİTA==============================================================
let displayOptions = {
    width: 10,
    height: 5,
    fontSize: 18,
    fontFamily: "monospace",
    fg: "#000000",//"#F0FFFF"
    bg: "#000000",
    spacing: 1,
    layout: "rect",
};

let display = new ROT.Display(displayOptions);

document.body.append(display.getContainer());

let map = {};
let freeCells = [];

new ROT.Map.DividedMaze(displayOptions.width, displayOptions.height).create(function(x, y, type) {
    map[x+","+y] = type;
    if(type === 0) {freeCells.push({"x":x, "y":y})}
    display.DEBUG(x, y, type);
});
//======================================================================================================

//haritadaki karakter sınıfı
let character = function (ch, fg, bg) {
    this.x = null, 
    this.y = null, 
    this.ch = ch, 
    this.fg = fg, 
    this.bg = bg
};

let player = new character("@","#faebd7", "#f0f8ff");
let portal = new character("#","white", "green");

//player ve portal'ı rastgele noktaya atma
Object.assign(player, freeCells[getRandom(freeCells)]);
Object.assign(portal, freeCells[getRandom(freeCells)]);

//event listener ekleme
document.addEventListener('keydown', (event) => {
    let code = event.code;
    if (code === "ArrowLeft"){
        if (isPassible(player.x - 1, player.y)) {player.x -=1};
        console.log("arrowleft");
    };if (code === "ArrowRight"){
        if (isPassible(player.x + 1, player.y)) {player.x +=1};
    };if (code === "ArrowUp"){
        if (isPassible(player.x, player.y - 1)) {player.y -=1};
    };if (code === "ArrowDown"){
        if (isPassible(player.x, player.y + 1)) {player.y +=1};
    };
    drawAll();
});

let fov = new ROT.FOV.PreciseShadowcasting(lightPasses);

//output callback
function fovCompute(char) {
        fov.compute(char.x, char.y, 5, function(x, y, r, visibility) {
        let ch = (r ? null : char.ch);
        let color = (map[x+","+y] ? "#aa0":null );
        display.draw(x, y, ch, "#fff", color);
    } );
};

drawAll();