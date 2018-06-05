var mousewheel_delta=0;
var mousewheel_timer=0;
var mousewheel_tick_interval=0;

function mousewheel_inactive(){ 
    mousewheel_timer=mousewheel_delta=0;
}

function mousewheel_tick(obj){
    if(mousewheel_timer==0){
        clearInterval(mousewheel_tick_interval);
        mousewheel_tick_interval=0;
    }else{
        if(mousewheel_delta>0) mousewheel_control_down.call(obj);
        else mousewheel_control_up.call(obj);
    }
}

function mousewheel_control_up(){
    if(this.nodeName=='SELECT'){
        if(this.selectedIndex<(this.options.length-1)){
            this.selectedIndex++;
        }
    }else{
        this.stepUp();
    }
}

function mousewheel_control_down(){
    if(this.nodeName=='SELECT'){
        if(this.selectedIndex>0){
            this.selectedIndex--;
        }
    }else{
        this.stepDown();
    }
}

function mousewheel_active(e){
    clearTimeout(mousewheel_timer);
    if(mousewheel_tick_interval==0){
        mousewheel_tick();
        mousewheel_tick_interval=setInterval(mousewheel_tick,100,this);
    }
    mousewheel_delta=Math.abs(e.deltaY)>Math.abs(e.deltaX)?e.deltaY:e.deltaX;
    mousewheel_timer=setTimeout(mousewheel_inactive,100);
}

window.addEventListener('load',function(){
    var all=document.querySelectorAll(
        'select,input[type="number"],input[type="range"]'
    );

    for(var i=0;i<all.length;i++){
        all[i].addEventListener('mousewheel',mousewheel_active);
    }
});

