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
    this.move = function () {
        this.x +=1
    };
};

