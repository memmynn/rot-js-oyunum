//array'den random item alma

function getRandom(array){
    return Math.floor(Math.random()*array.length)
};

//arraydan random element alma
function getRandEl(array){
    return array[Math.floor(Math.random()*array.length)];
};

//==============================FONKSİYONLAR==================//
//move hareket fonksiyonu
const move = function(element) {

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
    //array'a ekleme
    function store(ch) {ch.storArray.push(ch)};
    //buton ekleme
    function buttonAdd(domEl, ch){
        domEl.innerText = ""; //document element'in temizlenmesi
        //if(ch.presence){//presence varsa presence'ın opsiyonları düğme olarak eklenir
        for (let option in ch.options){ let buton = document.createElement("button"); 
        buton.innerText = ch.options[option].title; 
        buton.onclick = ch.options[option].functionality;
        domEl.append(buton);
        };
               
    };

    //haritadaki şehirleri "0" değerine ayarla parametreler x, y, value
    function cityAdd(map, arrays){
        for (let city in arrays) {map.set(arrays[city].x, arrays[city].y, 0)};
    };
    //input callback
    function lightPasses(x, y){
        let key = x+","+y;
        if(x < Game.map._width && y < Game.map._height && x > -1 && y > -1) {return (Game.map[key].isPassible === true);}
        return false;
    }; 

    //geçilebilir olma testi
    function isPassible(x, y, map) {
        let key = x+","+y;
        if(x < map._width && y < map._height && x > -1 && y > -1){return (map[key].isPassible === true)};
        return false;
    };

    //haritadaki presence'ı temizle
    function charClear(...storeArray) {
        for (let ary in storeArray) {
            for (let cha in storeArray[ary]) {
                delete Game.map[storeArray[ary][cha].x+","+storeArray[ary][cha].y].presence;
            };
        };
    };

    //haritaya character ekle
    function charAdd(...storeArray) {
        for (let ary in storeArray) {
            for (let cha in storeArray[ary]) {
                Game.map[storeArray[ary][cha].x+","+storeArray[ary][cha].y].presence = storeArray[ary][cha];
            };
        };
    };