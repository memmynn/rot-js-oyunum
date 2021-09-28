
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
            if (action === "moveLeft") { 
                if (Game.isPassible(this.x - 1, this.y)) {this.x -=1; break};
            };
            if (action === "moveRight") { 
                if (Game.isPassible(this.x + 1, this.y)) {this.x +=1; break};
            };
            if (action === "moveUp") { 
                if (Game.isPassible(this.x, this.y-1)) {this.y -=1; break};
            };
            if (action === "moveDown") { 
                if (Game.isPassible(this.x, this.y+1)) {this.y +=1; break};
            };
            if (action === "moveUL") { 
                if (Game.isPassible(this.x - 1, this.y-1)) {this.x -=1, this.y -=1; break};
            };
            if (action === "moveLeft") { 
                if (Game.isPassible(this.x - 1, this.y)) {this.x -=1; break};
            };
            if (action === "moveDL") { 
                if (Game.isPassible(this.x - 1, this.y+1)) {this.x -=1, this.y +=1; break};
            };
            if (action === "MoveUR") { 
                if (Game.isPassible(this.x + 1, this.y -1)) {this.x +=1, this.y -=1; break};
            };
            if (action === "moveDR") { 
                if (Game.isPassible(this.x + 1, this.y +1)) {this.x +=1, this.y +=1; break};
            };
        
         
        };
    };
};

