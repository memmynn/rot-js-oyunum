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

//input callback
function lightPasses(x, y){
    let key = x+","+y;
    if(key in map) {return (map[key] === 0);}
    return false;
};  

function show(param) {
    display.draw(param.x, param.y, param.avatar)
};

let player = {
    x: null,
    y: null,
    avatar: "@",
};

Object.assign(player, freeCells[30]);

function isPassible(x, y){
    let key = x+","+y;
    if(key in map && map[key] === 1) {return true};
    return false;
}

let fov = new ROT.FOV.PreciseShadowcasting(lightPasses);
//output callback
fov.compute(player.x, player.y, 15, function(x, y, r, visibility) {
    let ch = (r ? "" : player.avatar);
    let color = (map[x+","+y] ? "#aa0":"#660" );
    display.draw(x, y, ch, "#fff", color)
} );

