$(function(){
	
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
	
	//var filter = "win16|win32|win64|mac";
	//var filter = 'mobile';
	var filter = navigator.userAgent.toLowerCase();
 	var mobile;
  //if( navigator.platform  ){
  if( navigator.userAgent  ){
    //if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
    //if( filter.indexOf( navigator.userAgent.toLowerCase() ) > 0 ){
    if( filter.indexOf( 'mobile' ) > 0 ){	
        mobile = true;
    }else{
        mobile = false;
    }
  }
  
	/*==================================================================
	 * 기본 공통
	 ===================================================================*/
	
	// gnb submenu
	(function(){
		
		var flagOpen = false;

		$('#gnb>ul>li>a').on('mouseenter', function(){
			var winWidth = $(window).width();
			if( winWidth >= 1000 ){
				$('.submenu_wrap').removeClass('on');
				$(this).next('.submenu_wrap').addClass('on');
			} else if( winWidth >= 768 ){
				$('.submenu_wrap').removeClass('on');
				$('.menu_shop').removeClass('on');
				$('.btn_hide_menu .bar').removeClass('on');
				$(this).next('.submenu_wrap').addClass('on');
				flagOpen = false;
			}
		});
		$('#gnb>ul').on('mouseleave', function(){
			$('.submenu_wrap').removeClass('on');
		});

		// mobile bar
		$('.btn_hide_menu .bar').on('click', function(){
			var winWidth = $(window).width();
			if( winWidth >= 768 ){
				if( flagOpen == false ){
					//$('#gnb').addClass('on');
					//$('.header_util').addClass('on');
					$('.menu_shop').addClass('on');
					$('.btn_hide_menu .bar').addClass('on');
					flagOpen = true;
				} else {
					$('#gnb').removeClass('on');
					$('.header_util').removeClass('on');
					$('.menu_shop').removeClass('on');
					$('.btn_hide_menu .bar').removeClass('on');
					flagOpen = false;
				}
			} else {
				if( flagOpen == false ){
					$('#gnb').addClass('on');
					$('.header_util').addClass('on');
					$('.menu_shop').addClass('on');
					$('.btn_hide_menu .bar').addClass('on');
					flagOpen = true;	
				} else {
					$('#gnb').removeClass('on');
					$('.header_util').removeClass('on');
					$('.menu_shop').removeClass('on');
					$('.btn_hide_menu .bar').removeClass('on');
					flagOpen = false;
				}
			}
			
		});
		
	})();
	
	// mobile header util loading
	(function(){
		
		$(window).on('resize', function(){
			
			var winWidth = $(window).width();
			if(mobile){
				if(winWidth <= 767){
					var headerHeight = $('header').outerHeight() + $('.menu_shop').outerHeight() + $('#gnb').outerHeight();
					$('.header_util').css({top:headerHeight-1});
					
				} else {
					$('.header_util').css({top:0});
				}
			} else {
				if(winWidth <= 750){
					var headerHeight = $('header').outerHeight() + $('.menu_shop').outerHeight() + $('#gnb').outerHeight();
					$('.header_util').css({top:headerHeight-1});
					
				} else {
					$('.header_util').css({top:0});
				}
			}
			
		}).resize();
		
	})();
	
	// 푸터 팝업
	(function(){
		$('footer .btn_infopop').on('click', function(e){
			e.preventDefault();
			var size = "width=750, height=700, scrollbars=no";
			
			if($(this).hasClass('btn_escro')) {
				size = "width=340, height=262, scrollbars=no";
			}
			window.open($(this).attr('href'), "popWindow", size);
			popWindow.document.getElementsByTagName('html').style = 'overflow:hidden;';
		});
	})();
	
	/*==================================================================
	 * index
	 ===================================================================*/

	// user agent check - ios
	(function(){
		
		
		if( iOS ){
			$('.video_area').html(
				'<div class="alter_ios_video"><img src="images/index/alt_video.jpg" /></div>'
			);
		}
		
	})();
	
	// welcome popup
	(function(){
		
		
		var cookie = document.cookie; 
		var video = $('#video1');
		var today = new Date();
				
		if( cookie.indexOf( 'key=ok' ) > 0 ){
			$('.welcome_popup').remove();
			if(video.length > 0) {
				video[0].play();
			}
		}
		
	 	today.setDate( today.getFullYear() + 10000 );
	 	document.cookie = 'key=ok; path=/; expires= ' +  today.toGMTString();
	 	 
		
		$('.welcome_popup .close').on('click', function(e){
			e.preventDefault();
			$('.welcome_popup').remove();
			if(video.length > 0) {
				video[0].play();
			}
		});
		
	})();
	
	//center init
	(function(){
		
		$(window).on('load resize', function(){
			//var videoWidth = $('.index #video1').width();
			var visual1Width = $('.index.visual_section_1 .image_area').width();
			var visual2Width = $('.index.visual_section_2 .image_area').width();
			
			if( $(window).width() < 768 ) {
				//$('.index.video video ').css({'margin-left' : -384});
				//$('.index.video video img').css({'margin-left' : -384});
				$('.visual_section_1 .image_area').css({'margin-left' : -384});
				$('.visual_section_2 .image_area').css({'margin-left' : -384});
			} else if( $(window).width() < 1000 ) {
				//$('.index.video video ').css({'margin-left' : -500});
				//$('.index.video video img').css({'margin-left' : -500});
				$('.visual_section_1 .image_area').css({'margin-left' : -500});
				$('.visual_section_2 .image_area').css({'margin-left' : -500});
			} else {
				//$('.index.video video ').css({'margin-left' : videoWidth / -2});
				//$('.index.video video img').css({'margin-left' : videoWidth / -2});
				$('.visual_section_1 .image_area').css({'margin-left' : visual1Width / -2});
				$('.visual_section_2 .image_area').css({'margin-left' : visual2Width / -2});
			}
		});
	})();
	
	//view original video
	(function(){
		
		var video = $('#video1');
		
		$('.video_area').on('mouseenter', function(){
			$('.view_original').stop().animate({bottom:30}, 350, 'easeOutQuint');
		});
		
		$('.video_area').parent().on('mouseleave', function(){
			$('.view_original').stop().animate({bottom:-50}, 350, 'easeInQuint');
		});
		
		$('.view_original').on('click', function(e){
			e.preventDefault();
			if( !iOS ){	video[0].pause(); }
			$('.original_video').show();
		});
		
		$('.video_close').on('click', function(e){
			e.preventDefault();
			if(!iOS){ video[0].play(); }
			$('.original_video').hide();
		});
		
	})();
	
	// 롤링 & swipe
	(function(){
		
		var tId = 0;
		var done = true;
		
		var $ir1Wrap = $('.visual_section_1');
		var $ir2Wrap = $('.visual_section_2');
		var $ir1Obj = $('.visual_section_1 .visual');
		var $ir2Obj = $('.visual_section_2 .visual');
		
		var ir1 = new Rolling( $ir1Obj );
		var ir2 = new Rolling( $ir2Obj );
		
		
		var originalLeft = 0;
		var originalTop = 0;
		var originalPosition = 0;
		var oldLeft = 0;
		var oldTop = 0;
		var touchedIndex = 0;
		
		$(window).on('load', function(){
			ir1.sizing( $ir1Obj );
			ir1.init( $ir1Obj );
			ir1.paging( $ir1Wrap );
			
			ir2.sizing( $ir2Obj );
			ir2.init( $ir2Obj );
			ir2.paging( $ir2Wrap );
			
			// arrow unwrap at mobile
			if( mobile ){
				$('.index.visual_section_1 .arrow a.left, .index.visual_section_2 .arrow a.left, .pr_detail.visual .arrow a.left').unwrap( '<div></div>' );
				$('.index.visual_section_1 .arrow a.right, .index.visual_section_2 .arrow a.right, .pr_detail.visual .arrow a.right').unwrap( '<div></div>' );
			}
			
			// auto play visual_section_1
			tId = setInterval( function(){
				done = false;
				ir1.setIndex( $ir1Wrap, $ir1Obj, 'left', 2500 );
				setTimeout(function(){done = true;}, 2500);
			}, 7000 );
				
		});
		
		$(window).on('resize', function(){
			ir1.sizing( $ir1Obj );
			ir2.sizing( $ir2Obj );
		}).resize();
		
		//************ visual section 1 event *********************************/
		
		// play & stop
		$('.control .play').on('click', function(e){
			e.preventDefault();
			tId = setInterval( function(){ 
				done = false;
				ir1.setIndex( $ir1Wrap, $ir1Obj, 'left', 2500 );
				setTimeout(function(){done = true;}, 2500);
			}, 7000 );
		});
		$('.control .pause').on('click', function(e){
			e.preventDefault();
			clearInterval(tId);
		});
		
		// arrow
		$('.visual_section_1 .arrow .left, .visual_section_1 .arrow .left_wrap').on('click', function(e){
			e.preventDefault();
			clearInterval(tId);
			if(done == false) return;
			done = false;
			ir1.setIndex($ir1Wrap, $ir1Obj, 'right', 2000 );
			setTimeout(function(){done = true;}, 2000);
		});
		$('.visual_section_1 .arrow .right, .visual_section_1 .arrow .right_wrap').on('click', function(e){
			e.preventDefault();
			clearInterval(tId);
			if(done == false) return;
			done = false;
			ir1.setIndex($ir1Wrap, $ir1Obj, 'left', 2000 );
			setTimeout(function(){done = true;}, 2000);
		});
		
		// mobile swipe
		if( $('section').is('.index') ){
			var ir1ObjLength = $ir1Obj.length;
			
				// swipe start
				$ir1Obj.on('touchstart', function(e){
					//e.preventDefault();
					clearInterval(tId);
					touchedIndex = $(this).index();
					$ir1Obj.children('.text_area').css({left:0});
					oldLeft = originalLeft = e.originalEvent.touches[0].clientX;
					oldTop = originalTop = e.originalEvent.touches[0].clientY;
					originalPosition = $(this).position().left;
					ir1.swipeStart( $ir1Obj, touchedIndex );
				});
			
				// swipe move
				$ir1Obj.on('touchmove', function(e){
					var distanceX = oldLeft - e.originalEvent.touches[0].clientX;
					var distanceY = oldTop - e.originalEvent.touches[0].clientY;
					oldLeft = e.originalEvent.touches[0].clientX;
					oldTop = e.originalEvent.touches[0].clientY;
					slope = distanceY / distanceX;
					if( Math.abs(slope) < 0.5 ) {
						e.preventDefault();
						ir1.swipeMove( $ir1Obj, distanceX );
					}
				});
				
				// swipe end
				$ir1Obj.on('touchend', function(e){
					var diff = originalPosition - $(this).position().left;
					ir1.swipeEnd( $ir1Wrap, $ir1Obj, diff );
				});
		}
		
		// page num click
		$('body').on('click', '.visual_section_1 .control .paging>div', function(e){
			e.preventDefault();
			clearInterval(tId);
			var clickedPage = $(this).index();
			if(done == false) return;
			done = false;
			ir1.moveLeft( $ir1Wrap, $ir1Obj, clickedPage, 2500 );
			setTimeout(function(){done = true;}, 2000);
		});
		 
		//************ visual section 2 *********************************/
		
		$('.visual_section_2 .arrow .left, .visual_section_2 .arrow .left_wrap').on('click', function(e){
			e.preventDefault();
			if(done == false) return;
			done = false;
			ir2.setIndex($ir2Wrap, $ir2Obj, 'right', 2000 );
			setTimeout(function(){done = true;}, 2000);
		});
		$('.visual_section_2 .arrow .right, .visual_section_2 .arrow .right_wrap').on('click', function(e){
			e.preventDefault();
			if(done == false) return;
			done = false;
			ir2.setIndex($ir2Wrap, $ir2Obj, 'left', 2000 );
			setTimeout(function(){done = true;}, 2000);
		});
		
		// mobile swipe
		if( $('section').is('.index') ){
			var ir2ObjLength = $ir2Obj.length;
			
				// swipe start
				$ir2Obj.on('touchstart', function(e){
					//e.preventDefault();
					
					touchedIndex = $(this).index();
					$ir2Obj.children('.text_area').css({left:0});
					oldLeft = originalLeft = e.originalEvent.touches[0].clientX;
					oldTop = originalTop = e.originalEvent.touches[0].clientY;
					originalPosition = $(this).position().left;
					ir2.swipeStart( $ir2Obj, touchedIndex );
				});
			
				// swipe move
				$ir2Obj.on('touchmove', function(e){
					var distanceX = oldLeft - e.originalEvent.touches[0].clientX;
					var distanceY = oldTop - e.originalEvent.touches[0].clientY;
					oldLeft = e.originalEvent.touches[0].clientX;
					oldTop = e.originalEvent.touches[0].clientY;
					slope = distanceY / distanceX;
					if( Math.abs(slope) < 0.5 ) {
						e.preventDefault();
						ir2.swipeMove( $ir2Obj, distanceX );
					}
				});
				
				// swipe end
				$ir2Obj.on('touchend', function(e){
					var diff = originalPosition - $(this).position().left;
					ir2.swipeEnd( $ir2Wrap, $ir2Obj, diff );
				});
		}
		
	})();
	
	/*==================================================================
	 * 주문결제
	 ===================================================================*/
	
	// 쇼핑백 페이지 적립 예상 포인트 도움말
	(function(){
		
		$('.order .help_point').on('mouseenter', function(){
			$('.msg_point').show();
		});
		$('.order .point').on('mouseleave', function(){
			$('.msg_point').hide();
		});
		
	})();
	
	// 주문서 작성 페이지 군부대 발송하기 도움말
	(function(){
		
		$('.order .help_military').on('mouseenter', function(){
			$('.msg_help_military').show();
		});
		$('.order .msg_delivery').on('mouseleave', function(){
			$('.msg_help_military').hide();
		});
		
	})();
	
	// 결제수단 선택
	(function(){
		$('.pay_way .pay_type select').on('change', function(){
			var selected = $(this).find('option:selected').text().substr(0,2);
			
			$('.pay_way .pay_detail > div').removeClass('on');
			
			switch (selected) {
				case '신용' : $('.pay_way .pay_detail .type_credit').addClass('on');
					break;
				case '실시' : $('.pay_way .pay_detail .type_transfer').addClass('on');
					break;
				case '무통' : $('.pay_way .pay_detail .type_virtual').addClass('on');
					break;
				default : break;
			}
			
		});
	})();
	
	/*==================================================================
	 * 고객센터
	 ===================================================================*/
	
	// FAQ 내용 토글
	(function(){
		
		$('.customer.faq .list_table a').on('click', function(e){
			e.preventDefault();
			var answer = $(this).parents('tr').next('.answer');
			
			if(answer.is(':visible')){
				answer.hide();
			} else {
				$('.customer.faq .list_table .answer').hide();
				answer.show();
			}
		});
		
	})();
	
	
	/*============================================================
	 * 마이페이지 달력
	 =============================================================*/
	(function(){
		$('#date_picker_1, #date_picker_2').datepicker({
			duration: 'fast',
			dateFormat: 'yymmdd',
			showMonthAfterYear: true,
			monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
			dayNamesMin: ['일','월','화','수','목','금','토']
		});
		$('.btn_start_date').on('click',function() {
			$('#date_picker_1').datepicker('show');
		});
		$('.btn_end_date').on('click',function() {
			$('#date_picker_2').datepicker('show');
		});
	})();
	
	/*============================================================
	 * 리뷰 점수 표시
	 =============================================================*/
	(function(){
		var rated = $('.rated_box');
		var ratedNumber = $('.rated_number');
		
		$(window).on('load', function() {
			rated.each(function(i){
				review.showRated( rated.eq(i), ratedNumber.eq(i) );	
			});
		});
		
	})();
	
	/*============================================================
	 * 리뷰 점수 선택
	 =============================================================*/
	(function(){
		var ratingBox = $('.rating_box');
		var inputs = $('.rating_box input');
		var ratingNumber = $('.rating_number');
		
		if( ratingBox.length > 0 ) {
			$(window).on('load', function() {
					review.rating( ratingBox, inputs, ratingNumber );
			});
			inputs.on('change', function() {
				review.rating( ratingBox, inputs, ratingNumber );
			});
		}
		
	})();
	
	/*==================================================================
	 * 이벤트 당첨자 발표
	 ===================================================================*/
	
	// 진행중 이벤트 슬라이드
	(function() {
		var list = $('.event.progress .event_list');
		var initSlide = function () {
			var wWidth = $(window).width();
			
			if ( wWidth <= 470 ) {
				//slide.progressEvent( list, { margin : 12, viewnum : 1 });
				slide.progressEvent( list, 12, 1 );
			} else if ( wWidth <= 768 ) {
				//slide.progressEvent( list, { margin : 12, viewnum : 2 });
				slide.progressEvent( list, 12, 2 );
			} else {
				//slide.progressEvent( list, { margin : 12, viewnum : 3 });
				slide.progressEvent( list, 12, 3 );
			}
		};
		
		$(window).on('load resize', initSlide);
		
	})();
	
	// 진행중 이벤트 선택표시
	(function() {
		var events = $('.event.progress .event_list li');
		var btns = $('.event.progress .event_list li a');
		
		btns.on('click', function() {
			events.removeClass('on');
			$(this).parents('li').addClass('on');
		});
	})();
	
	// 이벤트 답글작성 창 토글 
	(function() {
		var replyBtns = $('.comment_list article .btn_reply');
		replyBtns.on('click', function(e) {
			e.preventDefault();
			var writeReply = $(this).parents('article').next('.write_comment');
			if(writeReply.is(':visible')){
				writeReply.hide();
			} else {
				writeReply.show();
			}
		});
	})();
	
	// 당첨자 발표 내용 토글
	(function(){
		
		$('.event.winner .end_event_list a').on('click', function(e){
			e.preventDefault();
			var view = $(this).parents('tr').next('.view');
			
			if(view.is(':visible')){
				view.hide();
			} else {
				$('.event.winner .end_event_list .view').hide();
				view.show();
			}
		});
		
	})();
	
	/*==================================================================
	 * 메이킹 스토리
	 ===================================================================*/

	 // 메이킹 스토리 탭
	 (function() {
			var btns = $('.making_intro div > a');
			var details = $('.making_detail');
			
			making.makingStoryTab( btns, details );
		})();
		
		// feature motion
	 (function(){
		 var $imgs = $('.making_detail .cleansing .img > img, .making_detail .makeup .img > img');
		 var count = 0;
 		
		 if($imgs.length < 2) {
			 return false;
		 }
 		
		 $(window).on('load', function(){
		 	
			 $imgs.each(function(){
				 var $img = $(this);
				 var feature = $(this).attr('data-feature');

				 setInterval( function(){
					 count++;
					 if(count>3) count = 1;
					 $img.attr('src', '../images/brand/' + feature + '_' + count + '.png');
				 }, 40);
			 });
			 
		 });
 		
	 })();
	
	// 0818 수정 :S
	// LHIM motion
	(function(){
		
		$('.hover_area_img').css({opacity:0});
		
		var count = [0, 0, 0, 0];
		var tId = [0, 0, 0, 0];
		
		$('.lhim_hover').on('mouseenter', function(e){
			
			e.preventDefault();
			var motionName = $(this).attr('data-lhim');
			var $motionObject = $('.motion.' + motionName + ' img');
			var index = $(this).index();
			
			clearInterval(tId[index]);
			
			tId[index] = setInterval( function(){
				count[index]++;
				if(count[index] > 25){
					count[index] = 25;
					clearInterval(tId[index]);
					return;
				} else {
					$motionObject.attr('src', '../images/brand/' + motionName + count[index] + '.png');
				}
			}, 40 );
		});
		$('.lhim_hover').on('mouseleave', function(){
			
			var motionName = $(this).attr('data-lhim');
			var $motionObject = $('.motion.' + motionName + ' img');
			var index = $(this).index();
			
			clearInterval(tId[index]);
			
			tId[index] = setInterval( function(){
				count[index]--;
				if(count[index] < 1){
					count[index] = 1;
					clearInterval(tId[index]);
					return;
				} else {
					$motionObject.attr('src', '../images/brand/' + motionName + count[index] + '.png');
				}
			}, 40 );
			
		});
		
	})();
	// 0818 수정 :E

	/*==================================================================
	 * 프로덕트
	 ===================================================================*/
	
	// floating menu
	(function(){
		$(window).on('scroll', function(){
			$('.pr_detail.floating_menu').hide().fadeIn('slow');
		});
	})();
	//center init
	(function(){
		$(window).on('load', function(){
			var prWidth = $('.pr_detail.visual .carousel img').width();
			$('.pr_detail.visual .carousel div img').css({'margin-left' : prWidth / -2});
		});
		$(window).on('resize', function(){
			var prWidth = $('.pr_detail.visual .carousel img').width();
			$('.pr_detail.visual .carousel div img').css({'margin-left' : prWidth / -2});
		}).resize();
	})();
	
	// 롤링
	(function(){

		var $prWrap = $('.pr_detail.visual');
		var $prObj = $('.pr_detail.visual .carousel div');

		var pr = new Rolling( $prObj );
		var done = true;
		
		$(window).on('load', function(){
			pr.sizing( $prObj );
			pr.init( $prObj );
			pr.paging( $prWrap );
		});
		$(window).on('resize', function(){
			pr.sizing( $prObj );
		}).resize();
		
		if( $prObj.length < 2 ) {
			$('.pr_detail.visual .arrow .left').hide();
			$('.pr_detail.visual .arrow .right').hide();
			$('.pr_detail.visual .control').hide();
			return false;
		}
		
		$('.pr_detail.visual .arrow .left, .pr_detail.visual .arrow .left_wrap').on('click', function(e){
			e.preventDefault();
			if(done == false) return;
			done = false;
			pr.setIndex( $prWrap, $prObj, 'right', 2000 );
			setTimeout(function(){done = true;}, 2000);
		});
		$('.pr_detail.visual .arrow .right, .pr_detail.visual .arrow .right_wrap').on('click', function(e){
			e.preventDefault();
			if(done == false) return;
			done = false;
			pr.setIndex( $prWrap, $prObj, 'left', 2000 );
			setTimeout(function(){done = true;}, 2000);
		});
		
		// mobile swipe
		if( $('section').is('.pr_detail') ){
			var prObjLength = $prObj.length;
			
				// swipe start
				$prObj.on('touchstart', function(e){
					//e.preventDefault();
					
					clearInterval(tId);
					touchedIndex = $(this).index();
					oldLeft = originalLeft = e.originalEvent.touches[0].clientX;
					oldTop = originalTop = e.originalEvent.touches[0].clientY;
					originalPosition = $(this).position().left;
					pr.swipeStart( $prObj, touchedIndex );
				});
			
				// swipe move
				$prObj.on('touchmove', function(e){
					var distanceX = oldLeft - e.originalEvent.touches[0].clientX;
					var distanceY = oldTop - e.originalEvent.touches[0].clientY;
					oldLeft = e.originalEvent.touches[0].clientX;
					oldTop = e.originalEvent.touches[0].clientY;
					slope = distanceY / distanceX;
					if( Math.abs(slope) < 0.5 ) {
						e.preventDefault();
						pr.swipeMove( $prObj, distanceX );
					}
				});
				
				// swipe end
				$prObj.on('touchend', function(e){
					var diff = originalPosition - $(this).position().left;
					pr.swipeEnd( $prWrap, $prObj, diff );
				});
		}
		
	})();
	
	
	// 제품 이미지 thumbnail
	(function(){
		
		var $imgWrap = $('.pr_detail.pr_main .big_img_wrap');
		var $imgObj = $('.pr_detail.pr_main .big_img_wrap div');
		var thumbCount = $imgWrap.find('div').size();
		var bigImg = new Rolling( $imgObj );
		var bigImageWidth = $('.pr_detail.pr_main .big_img_list img').outerWidth();
		
		$('.pr_detail.pr_main .img_wrap>div').on('click' , function(event){
			event.preventDefault();
			
			var imageIndex = $(this).index();
			bigImageWidth = $('.pr_detail.pr_main .big_img_list img').outerWidth();
			bigImage.sliding( $imgWrap, imageIndex, thumbCount, 1, bigImageWidth );
			
			$('.pr_detail.pr_main .thumb_cover').removeClass('on');
			$(this).find('.thumb_cover').addClass('on');
		});
		
		$('.pr_detail.pr_main .thumb_count .up').on('click' , function(event){
			event.preventDefault();
			var $imgWrap = $('.pr_detail.pr_main .img_wrap');
			var currentTop = $imgWrap.css('top');
			var currentLeft = $imgWrap.css('left');
			var thumbCount = $imgWrap.find('div').size();
			if( $(window).width() < 768 ) {
				thumbnail.sliding( $imgWrap, currentLeft, thumbCount, 3,  'right' );
			} else {
				thumbnail.sliding( $imgWrap, currentTop, thumbCount, 5,  'down' );
			}
		});
		
		$('.pr_detail.pr_main .thumb_count .down').on('click' , function(event){
			event.preventDefault();
			var $imgWrap = $('.pr_detail.pr_main .img_wrap');
			var currentTop = $imgWrap.css('top');
			var currentLeft = $imgWrap.css('left');
			var thumbCount = $imgWrap.find('div').size();
			if( $(window).width() < 768 ) {
				
				thumbnail.sliding( $imgWrap, currentLeft, thumbCount, 3, 'left' );
			} else {
				thumbnail.sliding( $imgWrap, currentTop, thumbCount, 5, 'up' );
			}
		});
	
		$(window).on('load resize', function() {
			$('.pr_detail.pr_main .img_wrap, .pr_detail.pr_main .big_img_wrap').css({top:0,left:0});
			$('.pr_detail.pr_main .thumb_cover').removeClass('on');
			$('.pr_detail.pr_main .thumb_cover:first').addClass('on');
			$('.pr_detail.pr_main .big_img_list img').css({
				width:$('.pr_detail.pr_main .big_img_list').width(),
			});
			var bigImageWidth = $('.pr_detail.pr_main .big_img_list img').outerWidth();
			var bigImageLength = $('.pr_detail.pr_main .big_img_wrap div').size();
			$('.pr_detail.pr_main .big_img_wrap').css({
				width: bigImageWidth * bigImageLength
			});
		});
		
		// mobile swipe
		if( $('section').is('.pr_detail') ){
			
			var imgObjLength = $imgObj.length;
			
				// swipe start
				$imgObj.on('touchstart', function(e){
					//e.preventDefault();
					
					//clearInterval(tId);
					touchedIndex = $(this).index();
					oldLeft = originalLeft = e.originalEvent.touches[0].clientX;
					oldTop = originalTop = e.originalEvent.touches[0].clientY;
					originalPosition = $imgWrap.position().left;
					//bigImg.swipeStart( $imgObj, touchedIndex );
				});
			
				// swipe move
				$imgObj.on('touchmove', function(e){
					var distanceX = oldLeft - e.originalEvent.touches[0].clientX;
					var distanceY = oldTop - e.originalEvent.touches[0].clientY;
					oldLeft = e.originalEvent.touches[0].clientX;
					oldTop = e.originalEvent.touches[0].clientY;
					slope = distanceY / distanceX;
					if( Math.abs(slope) < 0.5 ) {
						e.preventDefault();
						//bigImg.swipeMove( $imgObj, distanceX );
						$imgWrap.stop().animate({left:'-=' + distanceX}, 0);
					}
				});
				
				// swipe end
				$imgObj.on('touchend', function(e){
					
					var diff = originalPosition - $imgWrap.position().left;
					bigImageWidth = $('.pr_detail.pr_main .big_img_list img').outerWidth();
					
					if( Math.abs( diff ) > bigImageWidth/4 ){
						// next
						if( diff > 0 ){
							var nextIndex = touchedIndex+1;
							if(nextIndex >= imgObjLength){
								bigImage.sliding( $imgWrap, touchedIndex, thumbCount, 1, bigImageWidth );
							} else {
								bigImage.sliding( $imgWrap, nextIndex, thumbCount, 1, bigImageWidth );	
								$('.pr_detail.pr_main .img_wrap .thumb_cover').removeClass('on');
								$('.pr_detail.pr_main .img_wrap div').eq(nextIndex).find('.thumb_cover').addClass('on');
								
								var $thumbWrap = $('.pr_detail.pr_main .img_wrap');
								var currentTop = $thumbWrap.css('top');
								var currentLeft = $thumbWrap.css('left');
								var thumbCount = $thumbWrap.find('div').size();
								if( $(window).width() < 768 ) {
									console.log(1);
									thumbnail.sliding( $thumbWrap, currentLeft, thumbCount, 3,  'left' );
								}
							}
							
						// prev	
						} else {
							var nextIndex = touchedIndex-1;
							if(nextIndex < 0){
								bigImage.sliding( $imgWrap, touchedIndex, thumbCount, 1, bigImageWidth );
							} else {
								bigImage.sliding( $imgWrap, nextIndex, thumbCount, 1, bigImageWidth );
								$('.pr_detail.pr_main .img_wrap .thumb_cover').removeClass('on');
								$('.pr_detail.pr_main .img_wrap div').eq(nextIndex).find('.thumb_cover').addClass('on');
								
								var $thumbWrap = $('.pr_detail.pr_main .img_wrap');
								var currentTop = $thumbWrap.css('top');
								var currentLeft = $thumbWrap.css('left');
								var thumbCount = $thumbWrap.find('div').size();
								if( $(window).width() < 768 ) {
									console.log(1);
									thumbnail.sliding( $thumbWrap, currentLeft, thumbCount, 3,  'right' );
								}
							}
						}
						
					} else {
						bigImage.sliding( $imgWrap, touchedIndex, thumbCount, 1, bigImageWidth );
					}
					
				});
		}
		
		
		
	})();
	/* 
	// 옵션 이미지 thumbnail
	(function(){
		$('.pr_detail.pr_main .option .thumb_img li a').on('click' , function(event){
			event.preventDefault();
			$(this).next('.option_cover').addClass('on');
		});
		$('.pr_detail.pr_main .option .thumb_img li span').on('click' , function(event){
			event.preventDefault();
			$(this).removeClass('on');
		});
		
		$('.pr_detail.pr_main .option_thumb .thumb_arrow .left').on('click' , function(event){
			event.preventDefault();
			var $imgWrap = $('.pr_detail.pr_main .option_thumb .thumb_img ul');
			var currentLeft = $imgWrap.css('left');
			var thumbCount = $imgWrap.find('li').size();
			thumbnail.sliding( $imgWrap, currentLeft, thumbCount, 'right' );
		});
		
		$('.pr_detail.pr_main .option_thumb .thumb_arrow .right').on('click' , function(event){
			event.preventDefault();
			var $imgWrap = $('.pr_detail.pr_main .option_thumb .thumb_img ul');
			var currentLeft = $imgWrap.css('left');
			var thumbCount = $imgWrap.find('li').size();
			thumbnail.sliding( $imgWrap, currentLeft, thumbCount, 'left' );
		});
		
	})();
	
	// 컬러 선택
	(function(){
		
		$('.pr_detail.pr_main .pr_info .pr_color a').on('click' , function(event){
			event.preventDefault();
			$(this).next('span').addClass('on');
		});
		$('.pr_detail.pr_main .pr_info .pr_color span').on('click' , function(event){
			event.preventDefault();
			$(this).removeClass('on');
		});
		
	})();
	*/
	// feature motion
	(function(){
		
		power = 'off';
		count = 0;
		tId = 0;
		tId2 = 0;
		
		$('.btn_feature').css({opacity:0});
		
		$('.btn_feature').on('click', function(e){
			
			e.preventDefault();
			clearInterval( tId );
			clearTimeout( tId2 );
			
			var feature = $(this).attr('data-feature');
			
			if( power == 'off' ){
				
				tId = setInterval( function(){
					count++;
					if(count>3) count = 1;
					$('.feature_motion .frame_image').attr('src', '../images/product/' + feature + '_' + count + '.png');
				}, 40);
				power = 'on';
				
				tId2 = setTimeout(function(){
					clearInterval( tId );
					$('.feature_motion .frame_image').attr('src', '../images/product/' + feature + '_0.png');
					power = 'off';
				}, 10000);
			
			} else {
				
				clearInterval( tId );
				clearTimeout( tId2 );
				
				$('.feature_motion .frame_image').attr('src', '../images/product/' + feature + '_0.png');
				power = 'off';
			}
			
		});
		
	})();
	
	// 프로덕트 이펙트 탭
	(function(){
		var infoTabs = $( '.effect .tab' );
		var infoSections = $( '.effect .effect_info' );
		$(window).on('load', function() {
			tab.init( infoTabs, infoSections );
		});
	})();
	
	// 프로덕트 인포메이션 탭
	(function() {
		var infoTabs = $( '.information .tab' );
		var infoSections = $( '.information .info_section' );
		$(window).on('load', function() {
			tab.init( infoTabs, infoSections );
		});
	})();
	
	// 프로덕트 사용법 간단보기 토글
	(function() {
		var btnView = $('.pr_detail .usage .usage_heading a');
		var toggleArea = $('.pr_detail .usage .usage_body');
		
		toggleArea.css({'height':0, 'padding-top':0});
		btnView.on('click', function(e) {
			e.preventDefault();
			
			$(this).toggleClass('on');
			if( $(this).hasClass('on') ){
				toggleArea.stop().animate({
					'padding-top':40
				}, 40, function() {
					toggleArea.stop().animate({
						'height':toggleArea.find('img:visible').outerHeight()
					}, 700);
				});
			} else {
				toggleArea.stop().animate({
					'height':0
				}, 700, function() {
					toggleArea.stop().animate({
						'padding-top':0
					}, 40);
				});
			}
		});
	})();
	
	// 튜토리얼 동영상 모바일 사이즈
	(function(){
		var video = $('.tutorial .video');
		if( $(window).width() < 768 ) {
			$(window).on('resize', function(){
				video.height( video.width() * 0.52 );
			});
		}
	})();
	
	 
	/*==================================================================
	 * 라이프 뷰티
	 ===================================================================*/
	
	/* 목표등록 */
	(function() {
		var missions = $( '.campaign .mission_list li' );
		
		missions.on({
			'mouseenter' : function() {
				$( this ).find( '.hover' ).stop().fadeIn( 200 );
			},
			'mouseleave' : function() {
				$( this ).find( '.hover' ).stop().fadeOut( 200 );
			}
		});
		
	})();
	
	/* 지난 캠페인 보기 */
	(function() {
		var selectMonth = $('.campaign .past_campaign select');
		var textMonth = $('.campaign .past_campaign p');
		
		selectMonth.on( 'change', function() {
			textMonth.text( selectMonth.val() );
		});
	})();
	
	
	/* 캠페인 목록 */
	(function() {
		var list = $('.campaign .all_article ul');
		var spinner = $('.campaign .all_article .spinner');
		
		// 최초 정렬
		$( window ).on( 'load resize' ,function() {
			if ( list.length < 1 ) return false;
			
			if( $(window).width() < 569 ) {
				list.masonry('destroy');
			}
			else if( $(window).width() <= 1000 ) {
				list.masonry({
					itemSelector : 'li',
					gutterWidth : 8,
					isAnimated: true
				});
			} else {
				list.masonry({
					itemSelector : 'li',
					gutterWidth : 10,
					isAnimated: true
				});
			}
			
			
		});
		
	})();
	
	/* 나의 캠페인 등록글 수정 */
	(function() {
		$( 'body' ).on( 'click', '.edit_my_cmt', function( e ) {
			e.preventDefault();
			
			var cmt = $( this ).parents( 'li' );
			var textHeight = cmt.find( 'h2' ).height() + cmt.find( '> p' ).height() - 8 ;
			var textMsg = cmt.find( '> p' ).text();
			
			cmt.find( '.edit_form .text textarea' ).css({ 'height' : textHeight }).val( textMsg );
			cmt.addClass( 'editing' );
			
			cmt.find( '.cancel_cmt' ).on( 'click', function( e ) {
				e.preventDefault();
				cmt.removeClass( 'editing' );
			});
			
		});
	})();
	
	/* From makeON load list */
	(function(){
		if($(window).width() > 768) {
			$('.from_makeon .from_makeon_list .list_item:nth-child(3n+0)').addClass('third');
		}
		
		$(window).on('resize', function(){
			if($(window).width() > 768) {
				$('.from_makeon .from_makeon_list .list_item:nth-child(3n+0)').addClass('third');
			}
		});
	})();

	/* 슬라이드 show - 임시 */
	(function(){
		$('.list_item').on('click', function(e){
			e.preventDefault();
			$('.carousel-modal-player').show();
		});
	})();
	/* From makeON slide close */
	(function(){
		$('.modal_player_close').on('click', function(e){
			e.preventDefault();
			$('.carousel-modal-player').hide();
		});
	})();
	
	/* 푸터 전화번호가 아이폰에서 자동링크 생기는 것 방지 */
	/* 전 영역 공통 */
	(function() {
		$('a.no_style').on('click', function(e){
			e.preventDefault();
		});
	})();
	
	/* 페이지 맨 위로 이동 버튼 */
	/* 전 영역 공통 */
	(function() {
		var topBtn = $('.btn_page_top');
		$(window).on('scroll', function() {

			if ( $(document).scrollTop() > $(window).height() ) {
				topBtn.stop().animate({'bottom':0}, 200);
			} else {
				topBtn.stop().animate({'bottom':-34}, 200);
			}

		});
		topBtn.on('click',function (e) {
			e.preventDefault();
			$('html').animate({scrollTop : 0}, 300); // for IE
			$('body').animate({scrollTop : 0}, 300);
		});
	})();
	
	// 0829 추가
	/*==================================================================
	 * 브랜드 갤러리
	 ===================================================================*/
	
	// 상세페이지 최근 포스트
	(function() {
		var post_list = $('.lastest_post');
		var initPostSlide = function () {
			var wWidth = $(window).width();
			
			if ( wWidth <= 639 ) {
				slide.progressEvent( post_list, 8, 1 );
			} else if ( wWidth <= 767 ) {
				slide.progressEvent( post_list, 8, 2 );
			} else if ( wWidth <= 1000 ) {
				slide.progressEvent( post_list, 8, 3 );
			} else {
				slide.progressEvent( post_list, 10, 4 );
			}
		};
		
		$(window).on('load resize', initPostSlide);
		
	})();
	
	// latest list
	(function(){
		
		var $postWrap = $('.brand_gallery .lastest_post ul');
		var $postObj = $('.brand_gallery .lastest_post ul li');
		var postCount = $postWrap.find('li').size();
		var post = new Rolling( $postObj );
		var postWidth = $('.brand_gallery .lastest_post ul li').outerWidth()+8;
		
		// mobile swipe
		if( $('div').is('.lastest_post') ){
			
			var postObjLength = $postObj.length;
			
				// swipe start
				$postObj.on('touchstart', function(e){
					//e.preventDefault();
					//clearInterval(tId);
					touchedIndex = $(this).index();
					oldLeft = originalLeft = e.originalEvent.touches[0].clientX;
					oldTop = originalTop = e.originalEvent.touches[0].clientY;
					originalPosition = $postWrap.position().left;
					//bigImg.swipeStart( $imgObj, touchedIndex );
				});
			
				// swipe move
				$postObj.on('touchmove', function(e){
					var distanceX = oldLeft - e.originalEvent.touches[0].clientX;
					var distanceY = oldTop - e.originalEvent.touches[0].clientY;
					oldLeft = e.originalEvent.touches[0].clientX;
					oldTop = e.originalEvent.touches[0].clientY;
					slope = distanceY / distanceX;
					if( Math.abs(slope) < 0.5 ) {
						e.preventDefault();
						//bigImg.swipeMove( $imgObj, distanceX );
						$postWrap.stop().animate({left:'-=' + distanceX}, 0);
					}
				});
				
				// swipe end
				$postObj.on('touchend', function(e){
					
					var diff = originalPosition - $postWrap.position().left;
					postWidth = $('.brand_gallery .lastest_post ul li').outerWidth()+8;
					
					if( Math.abs( diff ) > postWidth/4 ){
						// next
						if( diff > 0 ){
							var nextIndex = touchedIndex+1;
							if(nextIndex >= postObjLength){
								bigImage.sliding( $postWrap, touchedIndex, postCount, 1, postWidth );
							} else {
								bigImage.sliding( $postWrap, nextIndex, postCount, 1, postWidth );
								if(nextIndex>0){ $('.btns_slide .prev').show(); }
								if(nextIndex >= postObjLength-1){ $('.btns_slide .next').hide(); }
							}
							
						// prev	
						} else {
							var nextIndex = touchedIndex-1;
							if(nextIndex < 0){
								bigImage.sliding( $postWrap, touchedIndex, postCount, 1, postWidth );
							} else {
								bigImage.sliding( $postWrap, nextIndex, postCount, 1, postWidth );
								if(nextIndex<=postObjLength){ $('.btns_slide .next').show(); }
								if(nextIndex < 1){ $('.btns_slide .prev').hide(); }
							}
						}
						
					} else {
						bigImage.sliding( $postWrap, touchedIndex, postCount, 1, postWidth );
					}
					
				});
		}
		
		
		
	})();
	
});