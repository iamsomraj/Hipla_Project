$(document).on("scroll", function () {
  if
    ($(document).scrollTop() > 86) {
    $("#banner").addClass("shrink");
  }
  else {
    $("#banner").removeClass("shrink");
  }
});


// $(window).resize(function(){
// 	if ($(window).width() <= 768){	
// 		$("#menu-toggle").click(function(e) {
//       e.preventDefault();
//       $("#wrapper").toggleClass("mobile");
//     });
// 	}else {
//     $("#menu-toggle").click(function(e) {
//       e.preventDefault();
//       $("#wrapper").toggleClass("toggled");
//     });
//   }	
// });

$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  $(".main-sidebar .list-group a span").toggleClass("menu-text");
});




function myFunction() {
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

AOS.init({
  duration: 1200,
})




// For range slider

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
}


const _R = document.querySelector('[type=range]');
_R.style.setProperty('--val', +_R.value);
_R.style.setProperty('--max', +_R.max);
_R.style.setProperty('--min', +_R.min);

document.documentElement.classList.add('js');

_R.addEventListener('input', e => {
  _R.style.setProperty('--val', +_R.value);
}, false);





















































