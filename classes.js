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
    
    return Object.assign({}, prototype, {ch, fg, bg, actions});
};

