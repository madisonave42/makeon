/* IE 하위브라우저 html5태그 대응 */
document.createElement( 'header' );
document.createElement( 'footer' );
document.createElement( 'section' );
document.createElement( 'article' );
document.createElement( 'aside' );

$(function() {
	/* 우편번호 찾기 */
	(function() {
		var tabs = $( '.find_address nav a');
		var oldArea = $( '#old_addr' );
		var newArea = $( '#new_addr' );
		var step02Area = $( '.find_address .step02' );
		var step03Area = $( '.find_address .step03' );
		var selectWay = $( '#new_addr .select_way input[type=radio]' );
		var wayBox = $( '#new_addr .way' );

		var allStepHide = function() {
			oldArea.removeClass( 'on' );
			newArea.removeClass( 'on' );
			step02Area.removeClass( 'on' );
			step03Area.removeClass( 'on' );
		};
		
		tabs.on( 'click', function( e ) {
			e.preventDefault();
			allStepHide();
			tabs.removeClass( 'on' );
			$( this ).addClass( 'on' );
			$( $( this ).attr( 'href' ) ).addClass( 'on' );
		});
		/* 상세주소 입력으로 */
		$( 'body' ).on( 'click', '.find_address .result_addr_list a', function( e ) {
			e.preventDefault();
			allStepHide();
			step02Area.addClass( 'on' );
		});
		/* 주소선택 으로 */
		$( '.find_address .step02 .btns .btn_ok' ).on( 'click', function( e ) {
			e.preventDefault();
			allStepHide();
			step03Area.addClass( 'on' );
		});
		/* 주소 검색으로 */
		$( '.find_address .step02 .btns .btn_cancel' ).on( 'click', function( e ) {
			e.preventDefault();
			allStepHide();
			var idx = tabs.index( tabs.filter( '.on' ) );
			if ( idx == 0 ) {
				oldArea.addClass( 'on' );
			} else {
				newArea.addClass( 'on' );
			}
		});
		
		/* 주소 검색으로 */
		$( '.find_address .step03 .btns .btn_cancel' ).on( 'click', function( e ) {
			e.preventDefault();
			allStepHide();
			var idx = tabs.index( tabs.filter( '.on' ) );
			if ( idx == 0 ) {
				oldArea.addClass( 'on' );
			} else {
				newArea.addClass( 'on' );
			}
		});
		
		/* 아파트명, 도로명 선택 */
		selectWay.on( 'change', function() {
			var idx = selectWay.index( selectWay.filter( ':checked' ) );
			wayBox.removeClass( 'on' );
			wayBox.eq( idx ).addClass( 'on' );
		});
		
	})();
});