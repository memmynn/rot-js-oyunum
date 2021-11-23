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
        let _this = ch.options[option];
        buton.innerText = _this.title; 
        buton.addEventListener("click", _this.functionality);
        domEl.append(buton);
        };
               
    };
    //diyalog metni ekleme
    function textAdd(domEl, dialogue) {
        domEl.innerText = ""; //document element'in temizlenmesi
        //if(ch.presence){//presence varsa presence'ın opsiyonları düğme olarak eklenir
        let _this = dialogue;
        domEl.prepend(_this);
        };

    //objeyi dönüştürme
    function objify (_this) {
        return _this;
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
                let index = Game.map[storeArray[ary][cha].x+","+storeArray[ary][cha].y].presence.indexOf(storeArray[ary][cha]);
                if (index > -1) {
                    Game.map[storeArray[ary][cha].x+","+storeArray[ary][cha].y].presence.splice(index, 1);
                  };
            };
        };
    };

    //haritaya character ekle
    function charAdd(...storeArray) {
        for (let ary in storeArray) {
            for (let cha in storeArray[ary]) {
                if(!Game.map[storeArray[ary][cha].x+","+storeArray[ary][cha].y].presence){//eğer presence array yoksa ekle
                Game.map[storeArray[ary][cha].x+","+storeArray[ary][cha].y].presence = [];};
                Game.map[storeArray[ary][cha].x+","+storeArray[ary][cha].y].presence.push(storeArray[ary][cha]);
            };
        };
    };