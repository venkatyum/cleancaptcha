$(document).ready(function() {

	/*====================================
	 SCROLLING SCRIPTS
	 ======================================*/

	$('.scroll-me a').bind('click', function(event) {//just pass scroll-me in design and start scrolling
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop : $($anchor.attr('href')).offset().top
		}, 1200, 'easeInOutExpo');
		event.preventDefault();
	});

	/*====================================
	 SLIDER SCRIPTS
	 ======================================*/

	$('#carousel-slider').carousel({
		interval : 2000 //TIME IN MILLI SECONDS
	});

	/*====================================
	 VAGAS SLIDESHOW SCRIPTS
	 ======================================*/
	$.vegas('slideshow', {
	backgrounds: [
	{ src: 'assets/img/1.jpg', fade: 1000, delay: 9000 },
	{ src: 'assets/img/2.jpg', fade: 1000, delay: 9000 },
	]
	});
	// ('overlay', {
		// /** SLIDESHOW OVERLAY IMAGE **/
		// src : 'assets/js/vegas/overlays/16.png' 
	// });

	/*====================================
	 POPUP IMAGE SCRIPTS
	 ======================================*/
	$('.fancybox-media').fancybox({
		openEffect : 'elastic',
		closeEffect : 'elastic',
		helpers : {
			title : {
				type : 'inside'
			}
		}
	});

	/*====================================
	 FILTER FUNCTIONALITY SCRIPTS
	 ======================================*/
	$(window).load(function() {
		var $container = $('#work-div');
		$container.isotope({
			filter : '*',
			animationOptions : {
				duration : 750,
				easing : 'linear',
				queue : false
			}
		});
		$('.categories a').click(function() {
			$('.categories .active').removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter : selector,
				animationOptions : {
					duration : 750,
					easing : 'linear',
					queue : false
			    }
			});
			return false;
		});
	});
	
	$.ajax({
			url : 'http://www.cleancaptcha.com/CleanCaptcha/api/getCleanCaptcha',
			type : 'GET',
			async : 'async',
			contentType : "application/json",
			success : function(data) {
					$('#public-question').data('qid',data.questionId);
		 			$('#public-question').text(data.question);
				}
		});
	
	//Custom Question
	$.ajax({
			url : 'http://www.cleancaptcha.com/CleanCaptcha/api/getCleanCaptcha',
			type : 'GET',
			async : 'async',
			headers: {
      				  'authKey':'79f8b65a2dd741f88f98c1ca39c956abccomp001',
   					 },
			contentType : "application/json",
			success : function(data) {
					$('#custom-question').data('qid',data.questionId);
		 			$('#custom-question').text(data.question);
				}
		});
	
	
	$('#public-validate').click(function(){
		if ($('#public-form').valid()){
			var userresponse = $('#public-response').val();
		    var questionid = $('#public-question').data("qid");
		$.ajax({
			url : 'http://www.cleancaptcha.com/CleanCaptcha/api/validateResponse',
			type : 'POST',
			async : 'async',
			contentType : "application/json",
			data : JSON.stringify({
					"questionId": questionid,
					"answer": userresponse
				}),
			success : function(data) {
					if (data.answerStatus == 'Fail') {
						$('#public-response-message').text('Looks like you are a bot!! Try Again!!').addClass('red');
		 				setTimeout(function(){
			 				$('#public-question').data('qid',data.questionId);
			 				$('#public-question').text(data.question);
			 				$('#public-response').val('').focus();
		 					$('#public-response-message').removeClass('red').removeClass('green').text('');
		 				}, 3000);
					}
					else {
						$('#public-response-message').text('Hello Human Being!!!').addClass('green');
						setTimeout(function(){
							$.ajax({
								url : 'http://www.cleancaptcha.com/CleanCaptcha/api/getCleanCaptcha',
								type : 'GET',
								async : 'async',
								contentType : "application/json",
								success : function(data) {
										$('#public-question').data('qid',data.questionId);
							 			$('#public-question').text(data.question);
									}
							  });
			 				$('#public-response').val('').focus();
		 					$('#public-response-message').removeClass('red').removeClass('green').text('');
		 				}, 3000);
					}
				}
		  	 });
		   }
		});
		
		//Register:
		$("#register-button").fancybox({
			'scrolling'		: 'no',
			'titleShow'		: false,
			'onClosed'		: function() {
			    $("#login_error").hide();
			}
		});
		
		$("#login_form").bind("submit", function() {
			if ($("#login_name").val().length < 1 || $("#login_pass").val().length < 1) {
			    $("#login_error").show();
			  //  $.fancybox.resize();
			    return false;
			}
			//$.fancybox.showActivity();
			$.ajax({
				type		: "POST",
				contentType : "application/json",
				url		: "http://www.cleancaptcha.com/CleanCaptcha/api/registerClient",
				data		: JSON.stringify({
					"company": $("#login_name").val(),
					"phone": $("#login_pass").val()
				}),
				success: function(data) {
					//$.fancybox(data);
					//$('#registercall-response').text("<div style='background:red;color:#fff;padding:10px'>Results of <em>print_r($_POST)</em></div>");
					$('#show-response').trigger('click');
					setTimeout(function(){
						$('.fancybox-error').html('Company: ' + data.company + '<br />' + 'Phone: ' +data.phone + '<br />' + '<br />' + 'Auth Key: '+'<br />'+ data.authKey );
					},1000);
				}
			});
			return false;
		});
		
		$('#custom-validate').click(function(){
		if ($('#custom-form').valid()){
			var userresponse = $('#custom-response').val();
		    var questionid = $('#custom-question').data("qid");
		$.ajax({
			url : 'http://www.cleancaptcha.com/CleanCaptcha/api/validateResponse',
			type : 'POST',
			async : 'async',
			contentType : "application/json",
			data : JSON.stringify({
					"questionId": questionid,
					"answer": userresponse
				}),
			success : function(data) {
					if (data.answerStatus == 'Fail') {
						$('#custom-response-message').text('Looks like you are a bot!! Try Again!!').addClass('red');
		 				setTimeout(function(){
			 				$('#custom-question').data('qid',data.questionId);
			 				$('#custom-question').text(data.question);
			 				$('#custom-response').val('').focus();
		 					$('#custom-response-message').removeClass('red').removeClass('green').text('');
		 				}, 3000);
					}
					else {
						$('#custom-response-message').text('Hello Human Being!!!').addClass('green');
						setTimeout(function(){
							$.ajax({
								url : 'http://www.cleancaptcha.com/CleanCaptcha/api/getCleanCaptcha',
								type : 'GET',
								async : 'async',
								contentType : "application/json",
								success : function(data) {
										$('#custom-question').data('qid',data.questionId);
							 			$('#custom-question').text(data.question);
									}
							  });
			 				$('#custom-response').val('').focus();
		 					$('#custom-response-message').removeClass('red').removeClass('green').text('');
		 				}, 3000);
					}
				}
		  	 });
		   }
		});
		

});