function onVideo2008()
{
	var DoA = getElem("A",target.document.selection.createRange().parentElement());
	var vid = prompt("请输入视频ID:", DoA ? DoA.href : "4HLBMF6J");

	if ((vid != null) && (vid != "")) {
		video2008Data(vid, 0);
	} else {
		target.focus();
	}
}

function onVideo2008TextOnly()
{
	var DoA = getElem("A",target.document.selection.createRange().parentElement());
	var vid = prompt("请输入视频ID:", DoA ? DoA.href : "4HLBMF6J");

	if ((vid != null) && (vid != "")) {
		video2008Data(vid, 1);
	} else {
		target.focus();
	}
}

function video2008paste(html) {
	var sel = target.document.selection.createRange();
	try {
		if (sel.parentElement() == document.body) {
			target.focus();
			sel = target.document.selection.createRange();
		}
	} catch(e) {}
	sel.pasteHTML(html);
	sel.select();
}

function video2008Data(vid, which)
{
	var url = "/temp/video2008.jsp?vid=" + vid;
	var http_request = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml');
		}
	} else 
		if (window.ActiveXObject) { // IE
			try {
				http_request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					http_request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}

	// http_request.overrideMimeType('text/xml');
	http_request.onreadystatechange = function(){
		if (http_request.readyState == 4) {
			var videoData = eval("(" + http_request.responseText + ")");
			var html = video2008HTML(videoData, which);
			video2008paste(html);
		} else {
			// still not ready
		}
	};
	http_request.open('GET', url, true);
	http_request.send(null);
}

function video2008HTML(videoData, which) {
	var html = "";
	if (videoData != null) {
		html = "";
		var counter = 0;
		for (i in videoData) {
			if (which == 0) {
				if (counter == 0) {
					html += '<ul style="width:350px; border:1px solid #ccc; margin:0 auto;"><ul style="background:url(http://img2.cache.netease.com/2008/img/end2008/vedio_title_bg.jpg) left top repeat-x; height:29px; line-height:29px; font-size:14px; font-weight:bold; color:#bc2913; text-indent:9px;">' + videoData[counter].title + '</ul><ul style="clear:both;"><a href="' + videoData[counter].url + '"><img src="' + videoData[counter].pic + '" alt="' + videoData[counter].title + '" width="350" height="280" border=0 /></a></ul><ul style="clear:both;"><h6 style="float:left; font-weight:bold; padding:6px 0 0 8px;">本场赛事相关视频</h6><span style="float: right; font-size:12px; padding:7px 8px 0 0; color:#999;">[<a href="' + videoData[counter].link + '" style="color:#999;">更多视频</a>]</span></ul><ul style="clear:both; padding:0 0 0 8px;"><ul>';
				} else {
					html += '<li style="font-size:14px;background:url(http://img2.cache.netease.com/2008/img/end2008/vedio_pic.gif) 2px 6px no-repeat; padding:0 0 0 16px;"><a href="' + videoData[counter].url + '">' + videoData[counter].title + '</a></li>';
				}
			} else {
				if (counter == 0) {
					html += '<ul style="width:350px; border:1px solid #ccc; margin:0 auto;"><ul style="clear:both;"><h6 style="float:left; font-weight:bold; padding:6px 0 0 8px;">本场赛事相关视频</h6><span style="float: right; font-size:12px; padding:7px 8px 0 0; color:#999;">[<a href="' + videoData[counter].link + '" style="color:#999;">更多视频</a>]</span></ul><ul style="clear:both; padding:0 0 0 8px;"><ul>';
					html += '<li style="font-size:14px;background:url(http://img2.cache.netease.com/2008/img/end2008/vedio_pic.gif) 2px 6px no-repeat; padding:0 0 0 16px;"><a href="' + videoData[counter].url + '">' + videoData[counter].title + '</a></li>';
				} else {
					html += '<li style="font-size:14px;background:url(http://img2.cache.netease.com/2008/img/end2008/vedio_pic.gif) 2px 6px no-repeat; padding:0 0 0 16px;"><a href="' + videoData[counter].url + '">' + videoData[counter].title + '</a></li>';
				}
			}
			counter += 1;
		}
		html += '</ul></ul><ul class="blank3"></ul></ul>';
	}
	return html;
}