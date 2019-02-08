document.addEventListener("DOMContentLoaded", function(){
    var clock = document.getElementById('clock'),
        color = document.getElementById('color');

    function timer(){
        var time = new Date,
            h = time.getHours().toString(),
            m = time.getMinutes().toString(),
            s = time.getSeconds().toString();
        if(h.length<2){
            h = '0'+h;
        }
        if(m.length<2){
            m = '0'+m;
        }
        if(s.length<2){
            s = '0'+s;
        }

        clock.textContent = h+':'+m+':'+s;
        color.textContent = '#'+h+m+s;
        document.body.style.backgroundColor = color.textContent;
    }

    timer();
    setInterval(timer,1000)
});