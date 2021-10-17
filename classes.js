'use strict'

//haritadaki karakter sınıfı
let Character = function (x, y, storArray ) {
    this.x = x || null, 
    this.y = y || null, 
    //this.ch = ch || null, 
    //this.fg = fg || null, 
    //this.bg = bg || null,
    //karakterleri "storArray"a ekleme
    storArray.push(this);
};

let City = function (x, y, fg, bg, storArray) {
    Character.call(this, x, y, storArray);
    this.ch = "C";
    this.fg = fg || null;
    this.bg = bg || null;
    this.options = [
        {title : "Kingdom Hall",
        functionality : function(){buttonAdd(foot, this.options[0])}.bind(this),//onclick'e eklerken this kaybolduğundan bind(this) ile çözdük
        options : [{title : "bring back my daughter",
                    functionality : ""}],
        },
        {title : "Inn",
        functionality : buttonAdd(foot, this)},
        ];
};

let Person = function (x, y, ch, fg, bg, storArray) {
    Character.call(this, x, y, storArray);
    this.ch = ch;
    this.fg = fg || null;
    this.bg = bg || null;
    function getRandEl(array){
        return array[Math.floor(Math.random()*array.length)];
    };
    let actions = ["moveRight" ,"moveLeft", "moveUp", "moveDown", "moveUL", "moveDL", "MoveUR", "moveDR"]
    this.move = function () {
        
        while (true){
            let action = getRandEl(actions);
            if (action === "moveLeft" && this.x-1 > -1) { 
                if (Game.isPassible(this.x - 1, this.y, Game.map)) {this.x -=1; break};
            } 
            else if (action === "moveRight" && this.x+1 < Game.map._width) { 
                if (Game.isPassible(this.x + 1, this.y, Game.map)) {this.x +=1; break};
            }
            else if (action === "moveUp" && this.y-1 > -1) { 
                if (Game.isPassible(this.x, this.y-1, Game.map)) {this.y -=1; break};
            }
            else if (action === "moveDown" && this.y+1 < Game.map._height) { 
                if (Game.isPassible(this.x, this.y+1, Game.map)) {this.y +=1; break};
            }
            else if (action === "moveUL" && this.x-1 > -1 && this.y-1 > -1) { 
                if (Game.isPassible(this.x - 1, this.y-1, Game.map)) {this.x -=1, this.y -=1; break};
            }
            else if (action === "moveDL" && this.x-1 > -1 && this.y+1 < Game.map._height) { 
                if (Game.isPassible(this.x - 1, this.y+1, Game.map)) {this.x -=1, this.y +=1; break};
            } 
            else if (action === "MoveUR" && this.x+1 < Game.map._width && this.y-1 > -1) { 
                if (Game.isPassible(this.x + 1, this.y -1, Game.map)) {this.x +=1, this.y -=1; break};
            }
            else if (action === "moveDR" && this.x+1 < Game.map._width && this.y+1 < Game.map._height) { 
                if (Game.isPassible(this.x + 1, this.y +1, Game.map)) {this.x +=1, this.y +=1; break};
            };
        };
    };
};

