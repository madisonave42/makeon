var view = false;
var list_width;

$(function(){
	
	$(window).on('load', function(){
		var winWidth = $(window).width();
		if( winWidth > 1100 ){
			$('#markup_list_frame').css({width:1100});	
		} else {
			$('#markup_list_frame').css({width:winWidth-50});
		}
		list_width = $('#markup_list_frame').width();
		$('#markup_list_frame').css({right:-list_width});
	});
	
	$(window).on('resize', function(){
		var winWidth = $(window).width();
		if( winWidth > 1100 ){
			$('#markup_list_frame').css({width:1100});	
		} else {
			$('#markup_list_frame').css({width:winWidth-50});
		}
		list_width = $('#markup_list_frame').width();
		$('#markup_list_frame').css({right:-list_width});
		view = false;
	});
	
	$('.list_tab .list').on('click', function(){
		if( view == false ){
			$('#markup_list_frame').stop().animate({right:0}, 300);
			view = true;
		} else {
			$('#markup_list_frame').stop().animate({right:-list_width}, 300);
			view = false;
		}
	});
	
	$('.page_link').on('click', function(){
		$('#markup_list_frame').stop().animate({right:-list_width}, 300);
		view = false;
	});
	$('.double_link').on('click', function(){
		$('#markup_list_frame').stop().animate({right:-list_width}, 300);
		view = false;
	});
	
	$(window).on('load', function(){
		$('tr').each(function(){
			
			var text = $(this).find('.page_link').attr('href');
			var pageId = $(this).find('td:first').text();
			
			$(this).find('.page_link').text(text);

			if(pageId == '화면없음'){
				$(this).find('.page_link').parent('td').css({'background' : '#ededed'});
			}
			
			
		});
		
	});
	
});
