

(function ($) {
	'use strict';


  // Fixed header
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 70) {
      $('.site-navigation,.trans-navigation').addClass('header-white');
    } else {
      $('.site-navigation,.trans-navigation').removeClass('header-white');
    }
  });
  

	// navbarDropdown
	if ($(window).width() < 992) {
		$('.navbar-collapse .dropdown-toggle').on('click', function () {
			$(this).siblings('.dropdown-menu').animate({
				height: 'toggle'
			}, 300);
		});
  }
  

  // counter
	function counter() {
		var oTop;
		if ($('.counter').length !== 0) {
			oTop = $('.counter').offset().top - window.innerHeight;
		}
		if ($(window).scrollTop() > oTop) {
			$('.counter').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 500,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}
				});
			});
		}
  }
  $(window).on('scroll', function () {
		counter();
	});


	// Smooth Scroll
	$('a.nav-link').click(function (e) {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				e.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000, function () {
					var $target = $(target);
					$target.focus();
					if ($target.is(':focus')) {
						return false;
					} else {
						$target.attr('tabindex', '-1');
						$target.focus();
					}
				});
			}
		}
	});
	$('.navbar-collapse .navbar-nav a').on('click', function () {
		$('.navbar-toggler:visible').click();
	});


})(jQuery);



const buttons = document.querySelectorAll(".faq-toggle");

buttons.forEach((button) => {
  button.addEventListener("click", () =>
    button.parentElement.classList.toggle("active")
  );
});




$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });



  jQuery(document).ready(function ($) {
	//trigger the animation - open modal window
	$('[data-type="modal-trigger"]').on("click", function () {
	  var actionBtn = $(this),
		scaleValue = retrieveScale(actionBtn.next(".cd-modal-bg"));
  
	  actionBtn.addClass("to-circle");
	  actionBtn
		.next(".cd-modal-bg")
		.addClass("is-visible")
		.one(
		  "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
		  function () {
			animateLayer(actionBtn.next(".cd-modal-bg"), scaleValue, true);
		  }
		);
  
	  //if browser doesn't support transitions...
	  if (actionBtn.parents(".no-csstransitions").length > 0)
		animateLayer(actionBtn.next(".cd-modal-bg"), scaleValue, true);
	});
  
	//trigger the animation - close modal window
	$(".cd-section .cd-modal-close").on("click", function () {
	  closeModal();
	});
	$(document).keyup(function (event) {
	  if (event.which == "27") closeModal();
	});
  
	$(window).on("resize", function () {
	  //on window resize - update cover layer dimention and position
	  if ($(".cd-section.modal-is-visible").length > 0)
		window.requestAnimationFrame(updateLayer);
	});
  
	function retrieveScale(btn) {
	  var btnRadius = btn.width() / 2,
		left = btn.offset().left + btnRadius,
		top = btn.offset().top + btnRadius - $(window).scrollTop(),
		scale = scaleValue(
		  top,
		  left,
		  btnRadius,
		  $(window).height(),
		  $(window).width()
		);
  
	  btn.css("position", "fixed").velocity(
		{
		  top: top - btnRadius,
		  left: left - btnRadius,
		  translateX: 0
		},
		0
	  );
  
	  return scale;
	}
  
	function scaleValue(topValue, leftValue, radiusValue, windowW, windowH) {
	  var maxDistHor = leftValue > windowW / 2 ? leftValue : windowW - leftValue,
		maxDistVert = topValue > windowH / 2 ? topValue : windowH - topValue;
	  return Math.ceil(
		Math.sqrt(Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2)) /
		  radiusValue
	  );
	}
  
	function animateLayer(layer, scaleVal, bool) {
	  layer.velocity({ scale: scaleVal }, 400, function () {
		$("body").toggleClass("overflow-hidden", bool);
		bool
		  ? layer
			  .parents(".cd-section")
			  .addClass("modal-is-visible")
			  .end()
			  .off(
				"webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
			  )
		  : layer
			  .removeClass("is-visible")
			  .removeAttr("style")
			  .siblings('[data-type="modal-trigger"]')
			  .removeClass("to-circle");
	  });
	}
  
	function updateLayer() {
	  var layer = $(".cd-section.modal-is-visible").find(".cd-modal-bg"),
		layerRadius = layer.width() / 2,
		layerTop =
		  layer.siblings(".btn").offset().top +
		  layerRadius -
		  $(window).scrollTop(),
		layerLeft = layer.siblings(".btn").offset().left + layerRadius,
		scale = scaleValue(
		  layerTop,
		  layerLeft,
		  layerRadius,
		  $(window).height(),
		  $(window).width()
		);
  
	  layer.velocity(
		{
		  top: layerTop - layerRadius,
		  left: layerLeft - layerRadius,
		  scale: scale
		},
		0
	  );
	}
  
	function closeModal() {
	  var section = $(".cd-section.modal-is-visible");
	  section
		.removeClass("modal-is-visible")
		.one(
		  "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
		  function () {
			animateLayer(section.find(".cd-modal-bg"), 1, false);
		  }
		);
	  //if browser doesn't support transitions...
	  if (section.parents(".no-csstransitions").length > 0)
		animateLayer(section.find(".cd-modal-bg"), 1, false);
	}
  });