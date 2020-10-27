$(document).ready(function(){

    let noneClicked = true;

    $('html').mousedown(function(){
        noneClicked = false;
        swapPunch();
    });

    $('html').mouseup(function(){
        noneClicked = true;
        swapPunch();
        
    });


    function swapPunch(){
        if(noneClicked==true){
            $("#nekopunch").html("&nbsp;&ensp;Λ_Λ<br>&nbsp;(　 ·ω·) ＝つ<br>( つ 　≡つ<br>&nbsp;/ __ 　)<br>&nbsp;&nbsp;( ／ Ｕ");
        }
        else{
            $("#nekopunch").html("&nbsp;&ensp;Λ_Λ<br>&nbsp;(　 ·ω·) ＝つ≡つ<br>( つ 　≡つ＝つ<br>&nbsp;/ __ 　) パパパパ <br>&nbsp;&nbsp;( ／ Ｕ");
        }
    }
})






