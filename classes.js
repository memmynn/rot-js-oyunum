//haritadaki karakter sınıfı
const Character = function (x, y, ch, fg, bg, params) {
    this.x = x || null, 
    this.y = y || null, 
    this.ch = ch || null, 
    this.fg = fg || null, 
    this.bg = bg || null,

    //karakterleri "params"a ekleme
    params.push(this) || null;
};

let Person = function (x, y, ch, fg, bg, params) {
    Character.call(this, x, y, ch, fg, bg, params);
};
