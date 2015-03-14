var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if ($(window).scrollTop() >= 60 && $(window).width() >= 1250) {
       // scroll down
       $('nav').removeClass('center').addClass('right');
   } else {
      // scroll up
       $('nav').removeClass('right').addClass('center');
   }
   lastScrollTop = st;
});

$(window).resize(function(){
    if($(window).width() < 1250){
        $('nav').removeClass('right').addClass('center');
    }else{
        $('nav').removeClass('center').addClass('right');
    }
});