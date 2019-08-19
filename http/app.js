window.onload = function() {
    getValue();
  };

function getValue() {
    let key = new Uint8Array(16);
    crypto.getRandomValues(key);
//    console.log(key);
    //var data = string.fromCharCode(key);
    var str = [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
    console.log(str);    
    var s = document.getElementById('msg');

    s.value = str;
}