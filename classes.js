//'use strict'

//haritadaki karakter sınıfı
const Character = (x=0, y=0, storArray=[] ) => {
    
    return{x, y, storArray};
};

const City = (x, y, fg, bg, storArray) => {
    const prototype = Character(x, y, storArray);
    const ch="C";
    const options = [
        {title : "Kingdom Hall",
        functionality: function(){buttonAdd(foot, options)},
        options : [{title : "bring back my daughter",
                    functionality : ""}],
        },
        {title : "Inn",
        functionality : buttonAdd(foot, this)},
        ];
    return Object.assign({}, prototype, {ch, fg, bg, options});
};

const Person = (x, y, ch, fg, bg, storArray) => {
    const prototype = Character(x, y, storArray);
    
    const actions = ["moveRight" ,"moveLeft", "moveUp", "moveDown", "moveUL", "moveDL", "MoveUR", "moveDR"];

    let element = Object.assign({}, prototype, {ch, fg, bg, actions});
    
    return Object.assign(element, {move});
    //move hareket fonksiyonu
    function move () {

        while (true){
                let action = getRandEl(element.actions);
                if (action === "moveLeft" && element.x-1 > -1) { 
                    if (Game.isPassible(element.x - 1, element.y, Game.map)) {element.x -=1; break};
                } 
                else if (action === "moveRight" && element.x+1 < Game.map._width) { 
                    if (Game.isPassible(element.x + 1, element.y, Game.map)) {element.x +=1; break};
                }
                else if (action === "moveUp" && element.y-1 > -1) { 
                    if (Game.isPassible(element.x, element.y-1, Game.map)) {element.y -=1; break};
                }
                else if (action === "moveDown" && element.y+1 < Game.map._height) { 
                    if (Game.isPassible(element.x, element.y+1, Game.map)) {element.y +=1; break};
                }
                else if (action === "moveUL" && element.x-1 > -1 && element.y-1 > -1) { 
                    if (Game.isPassible(element.x - 1, element.y-1, Game.map)) {element.x -=1, element.y -=1; break};
                }
                else if (action === "moveDL" && element.x-1 > -1 && element.y+1 < Game.map._height) { 
                    if (Game.isPassible(element.x - 1, element.y+1, Game.map)) {element.x -=1, element.y +=1; break};
                } 
                else if (action === "MoveUR" && element.x+1 < Game.map._width && element.y-1 > -1) { 
                    if (Game.isPassible(element.x + 1, element.y -1, Game.map)) {element.x +=1, element.y -=1; break};
                }
                else if (action === "moveDR" && element.x+1 < Game.map._width && element.y+1 < Game.map._height) { 
                    if (Game.isPassible(element.x + 1, element.y +1, Game.map)) {element.x +=1, element.y +=1; break};
                };
            };
    };
    
    
};

