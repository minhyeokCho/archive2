$(document).ready(function(){
	$('#header').length && handleHeaderFix(); //헤더 고정
	$('.go_top').length && goTop(); //상단 이동
	$('.f_menu_wrap').length && initFooterMenuToggle(); //푸터 사이트
	$('#header').length && headerLayer(); //헤더 레이어
	$('.btn_share').length && sharePop(); //공유하기 레이어
	$('.tab_btn').length && tabContent(); //탭 버튼
	$(window).scroll(function() {handleHeaderFix();});
});

function tabContent() {
	$('.tab_btn li').on('click', function(e) {
		e.preventDefault();
		let index = $(this).index();
		$('.tab_btn li').removeClass('active');
		$(this).addClass('active');
		$('.tab_cont li').removeClass('active');
		$('.tab_cont li').eq(index).addClass('active');
	});
}

function sharePop() {
	$('.sns_tooltip').hide();

	$('.btn_share').on('click', function(e) {
		e.preventDefault();
		var $btnShare = $(this);
		var $parentLi = $btnShare.parent('li'); 
		var $tooltip = $btnShare.siblings('.sns_tooltip'); 

		$('.sns_tooltip').not($tooltip).each(function() {
            $(this).fadeOut('fast', function() {
                $(this).css({ left: '', right: '', transform: 'none' });
            });
        });
        $('.btn_share.active-tooltip').not($btnShare).removeClass('active-tooltip');


		if ($tooltip.is(':visible')) {
            $btnShare.removeClass('active-tooltip'); 
			$tooltip.fadeOut('fast', function() {
				$tooltip.css({ left: '', right: '', transform: 'none' });
			});
		} else {
            $btnShare.addClass('active-tooltip');
			$tooltip.css({ 'visibility': 'hidden', 'display': 'block', 'left': '0', 'right': 'auto', 'transform': 'none' });
			var tooltipWidth = $tooltip.outerWidth();
			$tooltip.css({ 'visibility': 'visible', 'display': 'none' }); 

			var liOffset = $parentLi.offset().left; 
			var liWidth = $parentLi.outerWidth();
			var windowWidth = $(window).width();
			var liCenterAbs = liOffset + (liWidth / 2);
			var defaultTooltipLeft = liCenterAbs - (tooltipWidth / 2);
			var tooltipFinalLeft = defaultTooltipLeft;

			if (tooltipFinalLeft < 10) {
				tooltipFinalLeft = 10;
			}
			else if (tooltipFinalLeft + tooltipWidth > windowWidth - 10) {
				tooltipFinalLeft = windowWidth - tooltipWidth - 10;
			}
			$tooltip.css({ 'left': (tooltipFinalLeft - liOffset) + 'px', 'right': 'auto', 'transform': 'none' });

			$tooltip.fadeIn('fast');
		}
	});

	$(document).on('click', function(e) {
		if (!$(e.target).closest('.btn_share').length && !$(e.target).closest('.sns_tooltip').length) {
            $('.btn_share.active-tooltip').removeClass('active-tooltip'); 
			$('.sns_tooltip').fadeOut('fast', function() {
				$(this).css({ left: '', right: '', transform: 'none' });
			});
		}
	});

	$(window).on('resize', function() {
        $('.btn_share.active-tooltip').removeClass('active-tooltip'); 
		$('.sns_tooltip').fadeOut('fast', function() {
			$(this).css({ left: '', right: '', transform: 'none' });
		});
	});
}

function goTop() {
	const $btn = $('.go_top');

	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 1) {
		$btn.addClass('active');
		} else {
		$btn.removeClass('active');
		}
	});

	$btn.on('click', function () {
		$('html, body').animate({ scrollTop: 0 }, 300);
	});
}

function handleHeaderFix() {
	const header = $('#header');
	if ($(window).scrollTop() > 0) {
		header.addClass('fixed');
	} else {
		header.removeClass('fixed');
	}
}

function initFooterMenuToggle() { //푸터 사이트
	const $wrap = $('.f_menu_wrap');
	const $btns = $wrap.find('.btn_f_menu');
	const $uls = $wrap.find('.f_menu ul');

	$btns.on('click', function(e) {
		e.stopPropagation();

		const $thisBtn = $(this);
		const $thisUl = $thisBtn.siblings('ul');

		$btns.not($thisBtn).removeClass('active');
		$uls.not($thisUl).stop().slideUp(200);

		$thisBtn.toggleClass('active');
		$thisUl.stop().slideToggle(200);
	});

	$(document).on('click', function(e) {
		if (!$wrap.is(e.target) && $wrap.has(e.target).length === 0) {
			$btns.removeClass('active');
			$uls.stop().slideUp(200);
		}
	});
}

function headerLayer() {
	const $btnSearch = $('.btn_search');
	const $searchLayer = $('.search_layer');
	const $btnCloseSearchInLayer = $('.search_layer .btn_close'); 

	const $btnMenu = $('.btn_menu');
	const $menuLayer = $('.menu_layer');

	function closeSearchLayer() {
		if ($searchLayer.is(':visible')) {
			$searchLayer.fadeOut();
			$btnSearch.removeClass('active');
		}
	}

	function closeMenuLayer() {
		if ($menuLayer.is(':visible')) { 
			$menuLayer.fadeOut();
			$btnMenu.removeClass('active');
		}
	}

	$btnSearch.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		if ($searchLayer.is(':visible')) {
			closeSearchLayer();
		} else {
			closeMenuLayer();
			$searchLayer.fadeIn();
			$(this).addClass('active');
		}
	});

	$btnCloseSearchInLayer.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation(); 
		closeSearchLayer();
	});

	$btnMenu.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation(); 

		if ($menuLayer.is(':visible')) {
			closeMenuLayer();
		} else {
			closeSearchLayer();
			$menuLayer.fadeIn();
			$(this).addClass('active');
		}
	});

	$(document).on('click', function(e) {
		if ($searchLayer.is(':visible') && !$(e.target).closest($searchLayer).length && !$(e.target).closest($btnSearch).length) {
			closeSearchLayer();
		}
		if ($menuLayer.is(':visible') && !$(e.target).closest($menuLayer).length && !$(e.target).closest($btnMenu).length) {
			closeMenuLayer();
		}
	});

	const mobileBreakpoint = 767; 

	function handleResize() {
		if ($(window).width() > mobileBreakpoint) {
			closeMenuLayer();
		}
	}

	$(window).on('resize', handleResize);
	handleResize();
}