(function($){
	
	/** Configuration Variables */	
	var expire_time = '2013/01/01 00:00:00';
	var config_twitter_username = 'news';
	/** End of Configurations */
	
	/** aisleCounter */
	function aisleCounter() {		
		var austDay = new Date( Date.parse(expire_time) );		
		$( '#countdown' ).countdown({
			until: austDay, 
			layout: '<span class="dn number">{dn}</span><span class="dl label">{dl}</span> <span class="hn number">{hn}</span><span class="hl label">{hl}</span> <span class="mn number">{mn}</span><span class="ml label">{ml}</span> <span class="sn number">{sn}</span><span class="sl label">{sl}</span>'
		});		
	}

	function getExpireTime(){
		var tag = 1;
		var url = '/nc/token/expiretime/' + tag + '/';
		$.getJSON(url,{},function(data){
			expire_time = data.expiretime;
			aisleCounter();
		});
	}

	
	/** aisleTweet */
	function aisleTweet() {
	// $( '.tweet' ).tweet({
    // 		username: config_twitter_username,
    //      count: 1,
    //      loading_text: "loading informations...",
	// 		template: "popo: bjqinkan@corp.netease.com  <br> popo: zhuran@corp.netease.com"
    // });		
	}
	
	/**
	 * Subscription Form Logic 
	 */
	
	/** Email Validation */
	function isValidEmail( email ) {
	  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	  return pattern.test( email );
	}

	
	/** Pre Submit Callback */
	function showRequest(formData, jqForm, options) {
		var queryString = $.param(formData);
		alert("Begin updating, please wait...");      	
      	return true 
	}
	 
	/** Post Submit Callback */
	function showResponse(responseText, statusText, xhr, $form)  {
       //强制刷新当前页面
       alert("Update over.");   
		window.location.reload();
	}
	
	/** aisleSubscribe */
	function aisleSubscribe() {
		
		var options = { 			
			beforeSubmit : showRequest,          // pre-submit callback 
			success      : showResponse,         // post-submit callback 	 			
			url          : '/nc/token/update/',  // override for form's 'action' attribute 
			type         : 'post',               // 'get' or 'post', override for form's 'method' attribute 
			dataType     : 'json',               // 'xml', 'script', or 'json' (expected server response type) 
			clearForm    : true,                 // clear all form fields after successful submit 
			resetForm    : true,                 // reset the form after successful submit 	 
			// $.ajax options can be used here too, for example: 
			timeout      :   30000 
		}; 
	 
		// bind form using 'ajaxForm' 
		$( '#subscribe-form' ).ajaxForm(options);
				
	}
	
	/** jQuery Document Ready */
	$(document).ready(function(){
		getExpireTime();		
		aisleTweet();
		aisleSubscribe();
	});

	/** jQuery Windows Load */
	$(window).load(function(){
	});	

})(jQuery);