'use strict'
//array'den random item alma
function getRandom(array){
    return Math.floor(Math.random()*array.length)
};

//arraydan random element alma
function getRandEl(array){
    return array[Math.floor(Math.random()*array.length)];
};

//==============================FONKSİYONLAR==================//

    //array'a ekleme
    function store(ch) {ch.storArray.push(ch)};
    //buton ekleme
    function buttonAdd(domEl, ch){
        domEl.innerText = ""; //document element'in temizlenmesi
        //if(ch.presence){//presence varsa presence'ın opsiyonları düğme olarak eklenir
        for (let option in ch.options){ 
        let buton = document.createElement("button"); 
        let _ch = ch.options[option]();
        buton.innerText = _ch.title; 
        buton.onclick = _ch.functionality;
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