$(document).ready(function(){

    $('html').one("click",function(){
        $("#nekopunch").html("&nbsp;&ensp;Λ_Λ<br>&nbsp;(　 ·ω·) ＝つ≡つ<br>( つ 　≡つ＝つ<br>&nbsp;/ __ 　) パパパパ <br>&nbsp;&nbsp;( ／ Ｕ");

        console.log("clicked");
    });

    $('html').off("click",function(){
        $("#nekopunch").html("&nbsp;&ensp;Λ_Λ<br>&nbsp;(　 ·ω·) ＝つ<br>( つ 　≡つ<br>&nbsp;/ __ 　)<br>&nbsp;&nbsp;( ／ Ｕ");

        console.log("back");
    });
})


