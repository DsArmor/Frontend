$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.page__help-items, .header__menu').toggleClass('active');
	});
});