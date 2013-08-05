$(document).ready(function(){
	
	// cufon
	Cufon.replace('#navigation .menu-title');
	Cufon.replace('#navigation .menu-description');
	Cufon.replace(':header:not(#slideshow :header)', {hover: 'true'});
    
    // menu         
    $('#navigation ul li').mouseenter(   
        function() {
            $(this).children('ul').css('display', 'none');
            $(this).children('ul').stop(true, true);
            $(this).children('ul').slideDown('slow');            
        });
    $('#navigation ul li').mouseleave(   
        function() {
            $(this).children('ul').css('display', 'block');
            $(this).children('ul').stop(true, true);
            $(this).children('ul').slideUp('slow');            
        });               
     
    // prettyPhoto    
    $("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});
	
	// image preview hover effect
	$('a.image-preview').hover(
		function() { $(this).find('img').fadeTo(400, 0.75); },
		function() { $(this).find('img').fadeTo(400, 1); }
	);	
	$('.social a').hover(
		function() { $(this).find('img').fadeTo(400, 0.75); },
		function() { $(this).find('img').fadeTo(400, 1); }
	);	
	$('a.social').hover(
		function() { $(this).find('img').fadeTo(400, 0.75); },
		function() { $(this).find('img').fadeTo(400, 1); }
	);	
		
	// contact form
	function validateMyAjaxInputs() {

		$.validity.start();
		// Validator methods go here:
		$("#name").require();
		$("#email").require().match("email");
		$("#subject").require();	
		$("#message").require();

		// End the validation session:
		var result = $.validity.end();
		return result.valid;
	}	
	
	$.fn.clearForm = function() {
	  return this.each(function() {
	 var type = this.type, tag = this.tagName.toLowerCase();
	 if (tag == 'form')
	   return $(':input',this).clearForm();
	 if (type == 'text' || type == 'password' || tag == 'textarea')
	   this.value = '';
	 else if (type == 'checkbox' || type == 'radio')
	   this.checked = false;
	 else if (tag == 'select')
	   this.selectedIndex = -1;
	  });
	};	
	
	$("#contactform").submit(function () {
		//  procced only if form has been validated ok with validity
		if (validateMyAjaxInputs()) { 
			
			var str = $(this).serialize();
			$.ajax({
				type: "POST",
				url: "php/send.php",
				data: str,
				success: function (msg) {
					$("#formstatus").ajaxComplete(function (event, request, settings) {
						// Message Sent? Show the 'Thank You' message
						if (msg == 'OK') { 
							result = '<div class="successmsg">Your message has been sent. Thank you!</div>';
							$('#contactform').clearForm();
						} else {
							result = msg;
						}
						$(this).html(result);
					});	
				}	
			});
			return false;
		}
	});	
	
	// ie ...
	var ie6 = $('html').is('.ie6');
	var ie7 = $('html').is('.ie7');
	var ie8 = $('html').is('.ie8');
	
	if (ie6 || ie7 || ie8) {
		$('tr:nth-child(even)').css('background', '#262626');
	}
	
	if (ie6 || ie7) {
		$(function() {
			var zIndexNumber = 10000;
			$('div').each(function() {
				$(this).css('zIndex', zIndexNumber);
				zIndexNumber -= 10;
			});
		});
	}

});
