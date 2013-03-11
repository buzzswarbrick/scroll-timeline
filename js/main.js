
(function ($, window, document, undefined) {
	var BUZZ = {},
			project = "tween-max";

	BUZZ[project] = {

		init:function () {
			var self = this;
			$(function () {
				self.site.init();
			});

		},


		site : {

			init : function(){
				var self = this,
						$elementContainer = $('.pages-container');
				if ($elementContainer.length === 0) return;

				self.$page = $('.pages .page');
				self.$pages= $('.pages');
				self.$wrapper= $('#wrapper');


				self.myScroll = new iScroll('pages-wrapper', {
					vScroll: false,
					snap:true,
					momentum:false,
					hScrollbar:true,
					scrollbarClass: 'myScrollbar',

	
					onScrollAnimate: function() {
						self.updateTimeline()
					},
					onScrollMove: function() {
						self.updateTimeline()
					}
				});

				self.myScroll.enable();

				$(window).resize(function () {
					self.resize()
				});
				
				self.resize()



				

			},
			resize : function(){
				var self = this,
				windowWidth = $(window).width(),
				windowHeight = $(window).height();
				self.pagesWidth = windowWidth * self.$page.length;

				self.$pages.width(self.pagesWidth);

				self.$page.width(windowWidth).height(windowHeight);
				

				self.myScroll.refresh();

				window.delay(function(){
					self.myScroll.scrollToPage(self.myScroll.currPageX,0,0)
					self.updateTimeline()
					TweenMax.to($('#wrapper'), 0.5, {css:{autoAlpha:1}, ease:Quad.easeOut})
				},500)

			},


			updateTimeline : function(){
				var self = this
				var val

				if (isChrome || isSafari) {
                    val = Math.round(matrixToArray(self.$pages.css("-webkit-transform"))[4]);
                } else if (isIE) {
                    val = parseFloat(self.$pages.position().left);
                } else {
                    val = parseFloat(self.$pages.css('left'))
                }
				var percentage = (((val/self.pagesWidth*-1) < 0) ? 0 : val/self.pagesWidth*-1).toFixed(3);


			}
		}
	}

	BUZZ[project].init();

	window.BUZZ = BUZZ;
})(jQuery, window, document);

function Create2DArray(rows) {
	var arr = [];

	for (var i = 0; i < rows; i++) {
		arr[i] = [];
	}

	return arr;
}
function matrixToArray(matrix) {
    return matrix.substr(7, matrix.length - 8).split(', ');
}

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}
window.delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

function between(x, min, max) {
  return x >= min && x <= max;
}


var isOpera = !!(window.opera && window.opera.version);  // Opera 8.0+
var isFirefox = testCSS('MozBoxSizing');                 // FF 0.8+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !isSafari && testCSS('WebkitTransform');  // Chrome 1+
var isIE = /*@cc_on!@*/false || testCSS('msTransform');  // At least IE6

function testCSS(prop) {
    return prop in document.documentElement.style;
}
