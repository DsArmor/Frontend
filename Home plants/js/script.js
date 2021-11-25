$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.page__help-items, .header__menu').toggleClass('active');
	});
});

$(function(){
	const wrapper = $('#wrapper');
	const contentRightInnerOffset = 
	$('#content__right-inner').offset().top;

	$(window).scroll(function(){
		const scrolled = $(this).scrollTop();

		if (scrolled > contentRightInnerOffset){

		} else if(scrolled < contentRightInnerOffset){
			
		}
	})
});