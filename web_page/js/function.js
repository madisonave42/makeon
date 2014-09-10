/**
 * @author Administrator
 */
 
/**
 * 리뷰 점수 체크
 * @namespace 리뷰 점수 함수
 * 
 */
var review = (function(){
	
	return{
		/**
		 * 체크된 점수에 따라 막대그래프 표시
		 * 
		 */
		rating : function( ratingBox, inputs, ratingNumber ){
			var idx = inputs.index( inputs.filter(':checked') ) + 1;
			ratingBox[0].className = 'rating_box';
			ratingBox.addClass( 'rate_' + idx );
			
			switch( idx ) {
				case 1 : ratingNumber.text('1.0');
					break;
				case 2 : ratingNumber.text('2.0');
					break;
				case 3 : ratingNumber.text('3.0');
					break;
				case 4 : ratingNumber.text('4.0');
					break;
				case 5 : ratingNumber.text('5.0');
					break;
			}
		},
		
		showRated : function( rated, ratedNumber ){
			var ratedGrade = rated.attr('class');
			if( ratedGrade.indexOf( 'rate_1' ) > 0 ){
				rated.text( '매우불만족' );
				ratedNumber.text('1.0');
			} else if( ratedGrade.indexOf( 'rate_2' ) > 0 ){
				rated.text( '불만족' );
				ratedNumber.text('2.0');
			} else if( ratedGrade.indexOf( 'rate_3' ) > 0 ){
				rated.text( '보통' );
				ratedNumber.text('3.0');
			} else if( ratedGrade.indexOf( 'rate_4' ) > 0 ){
				rated.text( '만족' );
				ratedNumber.text('4.0');
			} else if( ratedGrade.indexOf( 'rate_5' ) > 0 ){
				rated.text( '매우만족' );
				ratedNumber.text('5.0');
			}
		}
	};
})();

/**
 * 진행중 이벤트 슬라이드
 * @namespace 진행중 이벤트 슬라이드
 * 
 */

var slide = (function(){
	
	return{
		/**
		 * 진행중 이벤트 슬라이드
		 * 
		 */
		progressEvent : function( list, margin, viewnum ) {
			list.each(function() {
				var self = $(this),
					ul = self.find('ul'),
					thumbs = self.find('ul li'),
					ulWidth = 0,
					moveWidth = 0,
					max = 0,
					tx = 0;
				
				moveWidth = thumbs.eq(0).width() + margin; // margin+border
				ulWidth = thumbs.length * moveWidth;
				thumbs.eq(0).parent().css({ width : ulWidth, left : 0 });
				
				max = ( ulWidth - moveWidth * viewnum ) * -1;

				if ( thumbs.length > viewnum ) {
					btnAction(); // 좌우슬라이드 버튼
				} else {
					self.find('.btns_slide').hide(); // 내용이 3개 이하일 경우 좌우 버튼 숨김
					return false;
				}
				
				function btnAction() {
					var prevBtn = self.find('.btns_slide .prev').hide(),
						nextBtn = self.find('.btns_slide .next').show();
					
					prevBtn.off(); // 리사이징시 기존의 이벤트 제거
					nextBtn.off();
					
					prevBtn.on( 'click', function() {
						tx += moveWidth;
						if ( tx >= 0 ) {
							tx = 0;
							prevBtn.hide();
						}
						nextBtn.show();
						moveList();
						
						return false;
						});
					
					nextBtn.on( 'click', function() {
						tx -= moveWidth;
						if ( tx <= max) {
							tx = max;
							nextBtn.hide();
						} 
						prevBtn.show();
						moveList();
						
						return false;
					});
					
					function moveList() {
						ul.stop().animate({ 'left':tx });
					}
				}
			});
		}
	};
	
})();

var making = (function(){
	
	return{
		/**
		 * 메이킹스토리
		 * 
		 */
		
		makingStoryTab : function( btns, details ) {
			btns.on({
				'mouseenter focus' : hoverAction,
				'mouseleave blur' : blurAction,
				'click' : selectAction
			});
			
			function hoverAction() {
				//$(this).find('h2').stop().fadeOut(200);
				$(this).find('h2').stop().animate({top:103,opacity:0},200);
				$(this).find('p').stop().animate({top:139,opacity:1},200);
			};
			function blurAction() {
				//$(this).find('h2').stop().fadeIn(200);
				$(this).find('h2').stop().animate({top:133,opacity:1},200);
				$(this).find('p').stop().animate({top:169,opacity:0},200);
			};
			function selectAction(e) {
				e.preventDefault();
				details.removeClass('on');
				$( $(this).attr('href') ).addClass('on');
				
				if( $(this).attr('href') == '#tech' ){
					$('img[usemap]').rwdImageMaps();
				}
				
				var scroll = 780;
				if( $(window).width() < 768 ) {
					scroll = 630;
				}
				$('html').animate({scrollTop : scroll}, 600); // for IE
				$('body').animate({scrollTop : scroll}, 600);
			};
		}
		
	};
	
})();

/**
 * 롤링 class
 * @namespace 롤링 class
 * 
 */
Rolling = function( $banner ){
	
	this.$currentBanner;
	this.$nextBanner;
	this.bannerSize = $banner.length;
	this.currentIndex = 0;
	this.nextIndex;
	this.isMoving;
	this.bannerWidth;
	
	this.prevTouchedIndex;
	this.nextTouchedIndex;
	
	Rolling.prototype.sizing = function($bannerItem){
		this.bannerWidth = $bannerItem.width();
		$bannerItem.eq(this.currentIndex).siblings().css({left:this.bannerWidth});
	};
	
	Rolling.prototype.init = function($bannerItem){
		$bannerItem.eq(0).css({left:0});
	};
	
	Rolling.prototype.paging = function($bannerWrap){
		for(i=1;i<=this.bannerSize;i++){
			$bannerWrap.find('.paging').append('<div class="page_' + i + '">'+ i +'</div>');
		}
		$bannerWrap.find('.paging').css({'width' : ( $bannerWrap.find('.paging div').width() + 5 ) * this.bannerSize });
		$bannerWrap.find('.control').css({'margin-left' : $bannerWrap.find('.control').width() / -2});
		
		//paging
		$bannerWrap.find('.control .paging>div').removeClass('current');
		$bannerWrap.find('.control .paging>div').eq(0).addClass('current');
		
	};
	Rolling.prototype.setIndex = function($bannerWrap, $bannerItem, direction, speed ){
		if( direction == 'left' ){
			if( this.currentIndex+2 > this.bannerSize ){ this.moveLeft($bannerWrap, $bannerItem, 0, speed); }
			else { this.moveLeft($bannerWrap, $bannerItem, this.currentIndex+1, speed ); }
		} else {
			if( this.currentIndex-1 < 0 ){this.moveRight($bannerWrap, $bannerItem, this.bannerSize-1, speed);}
			else { this.moveRight($bannerWrap, $bannerItem, this.currentIndex-1, speed ); }
		}
	};
	Rolling.prototype.moveLeft = function($bannerWrap, $bannerItem, nextIndex, speed ){
		
		$currentBanner = $bannerItem.eq(this.currentIndex);
		$currentText = $bannerItem.eq(this.currentIndex).find('.text_area');
		$nextBanner = $bannerItem.eq(nextIndex);
		$nextText = $bannerItem.eq(nextIndex).find('.text_area');
		
		$currentBanner.stop().animate({left:-this.bannerWidth}, speed, 'easeInOutQuint');
		$currentText.stop().animate({left:-this.bannerWidth}, speed, 'easeInOutQuint');
		$nextBanner.css({left:this.bannerWidth});
		$nextText.css({left:this.bannerWidth});
		$nextBanner.stop().animate({left:0}, speed, 'easeInOutQuint');
		$nextText.stop().animate({left:0}, speed, 'easeInOutQuint');
		
		$bannerWrap.find('.control .paging>div').removeClass('current');
		$bannerWrap.find('.control .paging>div').eq(nextIndex).addClass('current');
		
		this.currentIndex = nextIndex;
	};
	Rolling.prototype.moveRight = function($bannerWrap, $bannerItem, nextIndex, speed ){
		
		$currentBanner = $bannerItem.eq(this.currentIndex);
		$currentText = $bannerItem.eq(this.currentIndex).find('.text_area');
		$nextBanner = $bannerItem.eq(nextIndex);
		$nextText = $bannerItem.eq(nextIndex).find('.text_area');
		
		$currentBanner.stop().animate({left:this.bannerWidth}, speed, 'easeInOutQuint');
		$currentText.stop().animate({left:this.bannerWidth}, speed, 'easeInOutQuint');
		$nextBanner.css({left:-this.bannerWidth});
		$nextText.css({left:-this.bannerWidth});
		$nextBanner.stop().animate({left:0}, speed, 'easeInOutQuint');
		$nextText.stop().animate({left:0}, speed, 'easeInOutQuint');
		
		$bannerWrap.find('.control .paging>div').removeClass('current');
		$bannerWrap.find('.control .paging>div').eq(nextIndex).addClass('current');
		
		this.currentIndex = nextIndex;
	};
	
	Rolling.prototype.swipeStart = function( $bannerItem, touchedIndex ){
		this.currentIndex = touchedIndex;
		// next
		if( this.currentIndex+2 > this.bannerSize ){ this.nextTouchedIndex = 0; }
		else{ this.nextTouchedIndex = this.currentIndex+1; }
		$bannerItem.eq( this.nextTouchedIndex ).css({left:this.bannerWidth});
		// prev
		if( this.currentIndex-1 < 0 ){ this.prevTouchedIndex = this.bannerSize-1; }
		else{ this.prevTouchedIndex = this.currentIndex-1; }
		$bannerItem.eq( this.prevTouchedIndex ).css({left:-this.bannerWidth});
	};
	
	Rolling.prototype.swipeMove = function( $bannerItem, distance ){
		$bannerItem.eq( this.currentIndex ).stop().animate({left:'-=' + distance}, 0);
		$bannerItem.eq( this.nextTouchedIndex ).stop().animate({left:'-=' + distance}, 0);
		$bannerItem.eq( this.prevTouchedIndex ).stop().animate({left:'-=' + distance}, 0);
	};
	
	Rolling.prototype.swipeEnd = function( $bannerWrap, $bannerItem, diff ){
		
		if( Math.abs( diff ) > this.bannerWidth/4 ){
			
			// next
			if( diff > 0 ){
				$bannerItem.eq( this.currentIndex ).stop().animate({left:-this.bannerWidth}, 100);
				//$bannerItem.eq( this.prevTouchedIndex ).stop().animate({left:-this.bannerWidth*2}, 100);
				$bannerItem.eq( this.nextTouchedIndex ).stop().animate({left:0}, 100);
				
				$bannerWrap.find('.control .paging>div').removeClass('current');
				$bannerWrap.find('.control .paging>div').eq(this.nextTouchedIndex).addClass('current');
				
				this.currentIndex = this.nextTouchedIndex;
			// prev	
			} else {
				$bannerItem.eq( this.currentIndex ).stop().animate({left:this.bannerWidth}, 100);
				$bannerItem.eq( this.prevTouchedIndex ).stop().animate({left:0}, 100);
				//$bannerItem.eq( this.nextTouchedIndex ).stop().animate({left:this.bannerWidth*2}, 100);

				$bannerWrap.find('.control .paging>div').removeClass('current');
				$bannerWrap.find('.control .paging>div').eq(this.prevTouchedIndex).addClass('current');
				
				this.currentIndex = this.prevTouchedIndex;
			}
			
		} else {
			
			$bannerItem.eq( this.currentIndex ).stop().animate({left:0}, 100);
			$bannerItem.eq( this.prevTouchedIndex ).stop().animate({left:-this.bannerWidth}, 100);
			$bannerItem.eq( this.nextTouchedIndex ).stop().animate({left:this.bannerWidth}, 100);
			
		}
		
	};
	

};

/**
 * 프로덕트 thumbnail sliding
 * @namespace 프로덕트 thumbnail sliding
 * 
 */
var thumbnail = (function(){
	
	var hCount = 0;
	var vCount = 0;
	var defaultHeight = 70;
	var defaultWidth = 70;

	return {
		/**
		 * 프로덕트 thumbnail sliding
		 * 
		 */
		sliding : function( $imgWrap, currentPosition, thumbCount, viewNum, direction ){
			if(direction == 'up'){
				if (vCount > -( thumbCount - viewNum ) ){
					$imgWrap.stop().animate({top : parseInt(currentPosition) - defaultHeight});
					vCount--;
				} else {
					return false;
				}
			} else if(direction == 'down') {
				if (vCount < 0 ){
					$imgWrap.stop().animate({top : parseInt(currentPosition) + defaultHeight});
					vCount++;
				} else {
					return false;
				}
			}	else if(direction == 'left') {
				if (hCount > -( thumbCount - viewNum )){
					$imgWrap.stop().animate({left : parseInt(currentPosition) - defaultWidth});
					hCount--;
				} else {
					return false;
				}
			} else {
				if (hCount < 0 ){
					$imgWrap.stop().animate({left : parseInt(currentPosition) + defaultWidth});
					hCount++;
				} else {
					return false;
				}
			}
		}
	};
})();

/**
 * 프로덕트 탭
 * @namespace 프로덕트 탭 기능
 * 
 */
var tab = (function(){

	return {
		/**
		 * 기본 탭기능
		 * 
		 */
		init : function( tab, sections ){
			var btns = tab.find('a');
			btns.on('click', function(e) {
				e.preventDefault();
				var sectionId = $(this).attr('href');
				var sectionHeight = 0;
				btns.removeClass('on');
				$(this).addClass('on');
				sections.children().removeClass('on');
				sections.find(sectionId).addClass('on');
			});
		}
	};
})();