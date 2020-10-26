$(document).ready(function(){

    let fontSize = 20;
    $('#box').on("click", function(){
        console.log("i was clicked!, but in jquery");
        //printHello();
        //addTheNumers(10,20);
        //console.log(10 + 30);
        $('body').css('font-family', 'Arial');

        
        $(this).css('font-size',fontSize);
        fontSize +=10;
    })

    $('body').css('background', 'purple')

    addTheNumers(5,10);

    function addTheNumers(){
        let sum = num1 + num2;
        console.log(sum);
    }



})

/*let myCoolBox = document.getElementById("box");
myCoolBox.addEventListener("click", function(){
    console.log("i was clicked!")
})
*/

