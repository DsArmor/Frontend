$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.page__help-items, .header__menu').toggleClass('active');
	});
});

$(function(){
	const wrapper = $('#wrapper');
	const news_items_wrapper = $('#news_items-wrapper-outer');
	var element = document.getElementById('header--body'),
    style = window.getComputedStyle(element),
    min_height = style.getPropertyValue('min-height');
	console.log(min_height);
	const contentRightInnerOffset = 
	$('#news_items').offset().top - parseInt(min_height) - 10;

	$(window).scroll(function(){
		const scrolled = $(this).scrollTop();
		if (scrolled > contentRightInnerOffset){
			wrapper.addClass('aside-fixed--top');
			news_items_wrapper.addClass('_container');
		} else if(scrolled < contentRightInnerOffset){
			wrapper.removeClass('aside-fixed--top');
			news_items_wrapper.removeClass('_container');
		}
	})
});


function Sim(sldrId) {

	let id = document.getElementById(sldrId);
	if(id) {
		this.sldrRoot = id
	}
	else {
		this.sldrRoot = document.querySelector('.sim-slider')
	};

	// Carousel objects
	this.sldrList = this.sldrRoot.querySelector('.sim-slider-list');
	this.sldrElements = this.sldrList.querySelectorAll('.sim-slider-element');
	this.sldrElemFirst = this.sldrList.querySelector('.sim-slider-element');
	this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
	this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
	this.indicatorDots = this.sldrRoot.querySelector('div.sim-slider-dots');

	// Initialization
	this.options = Sim.defaults;
	Sim.initialize(this)
};

Sim.defaults = {
	// Default options for the carousel
	loop: true,     // Бесконечное зацикливание слайдера
	auto: true,     // Автоматическое пролистывание
	interval: 4000, // Интервал между пролистыванием элементов (мс)
	arrows: true,   // Пролистывание стрелками
	dots: true      // Индикаторные точки
};

Sim.prototype.elemPrev = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement -= num;
	if(this.currentElement < 0) this.currentElement = this.elemCount-1;

	if(!this.options.loop) {
		if(this.currentElement == 0) {
			this.leftArrow.style.display = 'none'
		};
		this.rightArrow.style.display = 'block'
	};
	
	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[this.currentElement].style.visibility = 'visible';
	this.sldrElements[this.currentElement].style.zIndex = '1';
	this.sldrElements[prevElement].style.opacity = '0';
	this.sldrElements[prevElement].style.zIndex = '0';
	this.sldrElements[prevElement].style.visibility = 'hidden';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Sim.prototype.elemNext = function(num) {
	num = num || 1;
	
	let prevElement = this.currentElement;
	this.currentElement += num;
	if(this.currentElement >= this.elemCount) this.currentElement = 0;

	if(!this.options.loop) {
		if(this.currentElement == this.elemCount-1) {
			this.rightArrow.style.display = 'none'
		};
		this.leftArrow.style.display = 'block'
	};

	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[this.currentElement].style.visibility = 'visible';
	this.sldrElements[this.currentElement].style.zIndex = '1';
	this.sldrElements[prevElement].style.opacity = '0';
	this.sldrElements[prevElement].style.zIndex = '0';
	this.sldrElements[prevElement].style.visibility = 'hidden';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Sim.prototype.dotOn = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:white; cursor:pointer;'
};

Sim.prototype.dotOff = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:rgb(23, 54, 26, 0.9); cursor:default; border: 5px hidden rgba(15,120,22,0.8);'
};

Sim.initialize = function(that) {

	// Constants
	that.elemCount = that.sldrElements.length; // Количество элементов

	// Variables
	that.currentElement = 0;
	let bgTime = getTime();

	// Functions
	function getTime() {
		return new Date().getTime();
	};
	function setAutoScroll() {
		that.autoScroll = setInterval(function() {
			let fnTime = getTime();
			if(fnTime - bgTime + 10 > that.options.interval) {
				bgTime = fnTime; that.elemNext()
			}
		}, that.options.interval)
	};

	// Start initialization
	if(that.elemCount <= 1) {   // Отключить навигацию
		that.options.auto = false; that.options.arrows = false; that.options.dots = false;
		that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};
	if(that.elemCount >= 1) {   // показать первый элемент
		that.sldrElemFirst.style.opacity = '1';
		that.sldrElemFirst.style.visibility = 'visible';
		that.sldrElemFirst.style.zIndex = '1';
	};

	if(!that.options.loop) {
		that.leftArrow.style.display = 'none';  // отключить левую стрелку
		that.options.auto = false; // отключить автопркрутку
	}
	else if(that.options.auto) {   // инициализация автопрокруки
		setAutoScroll();
		// Остановка прокрутки при наведении мыши на элемент
		that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
		that.sldrList.addEventListener('mouseleave', setAutoScroll, false);
		// that.sldrList.add
	};

	if(that.options.arrows) {  // инициализация стрелок
		that.leftArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};

	if(that.options.dots) {  // инициализация индикаторных точек
		let sum = '', diffNum;
		for(let i=0; i<that.elemCount; i++) {
			sum += '<span class="sim-dot"></span>'
		};
		that.indicatorDots.innerHTML = sum;
		that.indicatorDotsAll = that.sldrRoot.querySelectorAll('span.sim-dot');
		// Назначаем точкам обработчик события 'click'
		for(let n=0; n<that.elemCount; n++) {
			that.indicatorDotsAll[n].addEventListener('click', function() {
				diffNum = Math.abs(n - that.currentElement);
				if(n < that.currentElement) {
					bgTime = getTime(); that.elemPrev(diffNum)
				}
				else if(n > that.currentElement) {
					bgTime = getTime(); that.elemNext(diffNum)
				}
				// Если n == that.currentElement ничего не делаем
			}, false)
		};
		that.dotOff(0);  // точка[0] выключена, остальные включены
		for(let i=1; i<that.elemCount; i++) {
			that.dotOn(i)
		}
	}
};

new Sim();


function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
	  'total': t,
	  'days': days,
	  'hours': hours,
	  'minutes': minutes,
	  'seconds': seconds
	};
  }
  
  function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');
  
	function updateClock() {
	  var t = getTimeRemaining(endtime);
  
	  daysSpan.innerHTML = t.days;
	  hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
	  minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
	  secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
	  if (t.total <= 0) {
		clearInterval(timeinterval);
	  }
	}
  
	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
  }
  
  var deadline="January 01 2018 00:00:00 GMT+0300";
  var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer
  initializeClock('countdown', deadline);