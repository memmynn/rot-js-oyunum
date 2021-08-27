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

//harita draw
function drawAll () {
    fovCompute(player);
    display.draw(portal);
}
//geçilebilir olma testi
function isPassible(x, y){
    let key = x+","+y;
    if(key in map && map[key] === 0) {return true};
    return false;
};


//========================================HARİTA==============================================================
let displayOptions = {
    width: 55,
    height: 20,
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
let character = function (avatar, fg, bg) {
    this.x;
    this.y;
    this.ch = avatar;
    this.fg = fg;
    this.bg = bg;
};

let player = new character("@","#faebd7", "#f0f8ff");
let portal = new character("#","#f0f8ff", "#faebd7");

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
        fov.compute(char.x, char.y, 15, function(x, y, r, visibility) {
        let ch = (r ? "" : char.ch);
        let color = (map[x+","+y] ? "#aa0":"#660" );
        display.draw(x, y, ch, "#fff", color);
    } );
};

drawAll();
