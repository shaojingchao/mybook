var visitDate = new Date();
var visitTime = String(Math.floor(visitDate.getTime() / 1000));
var visitCode = visitTime.concat(String(Math.floor(Math.random() * 10 + 1) - 1)).concat(String(Math.floor(Math.random() * 10 + 1) - 1)).concat(String(Math.floor(Math.random() * 10 + 1) - 1)).concat(String(Math.floor(Math.random() * 10 + 1) - 1));
var urlHost = window.location.host.toLowerCase();
var visitUrl = window.location.pathname;
var visitUrls = visitUrl.split("/");

var html5Lock = true;
var html5Timeout = null;
var html5Referrer = document.referrer;
try {
	html5Timeout = setTimeout(function () {
		html5Timeout && clearTimeout(html5Timeout);
		html5Lock = (html5Referrer && html5Referrer.match(/yunzhan365.com\/ht001\/|yunzhan365.com\/view\//)) ? true : false;
	}, 500);
} catch (err) {
	html5Lock = (html5Referrer && html5Referrer.match(/yunzhan365.com\/ht001\/|yunzhan365.com\/view\//)) ? true : false;
}

try {
	if (window.parent) {
		window.parent.postMessage({
			"postType": "hf_one",
			"postApp": "html5"
		}, "*");
		$(window).on("message.endhtml5", function (event) {
			// $(this).off("message.endhtml5");
			var data = event.originalEvent.data;
			if (data.postLoadMode == "2" && data.postType == "hf_two" && data.isCount == "1") {
				html5Timeout && clearTimeout(html5Timeout);
				html5Lock = true;
			}
		});
	}
} catch (err) {
	html5Timeout && clearTimeout(html5Timeout);
	html5Lock = (html5Referrer && html5Referrer.match(/yunzhan365.com\/ht001\/|yunzhan365.com\/view\//)) ? true : false;
}
// setInterval(function() {
// 	console.log(html5Lock)
// }, 2000);
/*
 if(visitUrls.length>=4&&urlHost=='book.yunzhan365.com'){
 var uLink=visitUrls[1];
 var bLink=visitUrls[2];
 jQuery(document).ready(function(){
 //getBookCaseConfig("http://stat.yunzhan365.com/statistic-server/add-book-visitinfo.php?uLink="+uLink+"&bLink="+bLink+"&type=1&page=1&code="+visitCode);
 });
 }*/
//广告
if (visitUrls.length >= 4) {
	if (urlHost == 'book.yunzhan365.com') {
		$.getScript("../../getuserinfo.js")
		.done(function (script, textStatus) {
			if (user_type == 0) {
				if (isPhone() || isPad()) {
					window.cpro_id = "u2807971";
					$("body").append('<script type="text/javascript" src="//cpro.baidustatic.com/cpro/ui/cm.js"></script>');
				} else {
					/*window.cpro_id = "u2892938";
					 $("body").append('<script type="text/javascript" src="http://cpro.baidustatic.com/cpro/ui/c.js"></script>');*/
				}
			}
		})
		.fail(function (jqxhr, settings, exception) {
			//加载失败
		});

		/*var uLink=visitUrls[1];
		 $.ajax({
		 url: "http://www.yunzhan365.com/hostInfo/getbanner.php",
		 type: "GET",
		 dataType: "jsonp",
		 data: {
		 uLink: uLink
		 },
		 beforeSend: function () {
		 },
		 success: function (data) {
		 if(data.status=='1'){
		 if(isPhone()||isPad()){
		 window.cpro_id = "u2807971";
		 $("body").append('<script type="text/javascript" src="http://cpro.baidustatic.com/cpro/ui/cm.js"></script>');
		 }else{
		 //window.cpro_id = "u2892938";
		 //$("body").append('<script type="text/javascript" src="http://cpro.baidustatic.com/cpro/ui/c.js"></script>');
		 }
		 }
		 },
		 error: function (jqXHR, textStatus, errorThrown) {
		 }
		 });*/
	}
}

function sendvisitinfo (type, page) {
	if (html5Lock) {
		return;
	}
	var type = type;
	var page = page;
	if (type == null) {
		var type = '';
	}
	if (page == null) {
		var page = '';
	}

	var isAdd = false;
	if (visitUrls.length >= 4) {
		if (urlHost == 'book.yunzhan365.com') {
			var uLink = visitUrls[1];
			var bLink = visitUrls[2];
			isAdd = true;
		} else if ((urlHost == 'www.yunzhan365.com') && (visitUrls[1] == 'read')) {
			var uLink = visitUrls[2];
			var bLink = visitUrls[3];
			isAdd = true;
		} else {
			if ((urlHost.indexOf('yunzhan365.com') >= 0 || urlHost.indexOf('sharedbook.cn')) && (visitUrls[1] == 'books' || visitUrls[1] == 'read')) {
				var uLink = urlHost;
				var bLink = visitUrls[2];
				isAdd = true;
			}
		}
	}
	if (isAdd == true) {
		jQuery(document).ready(function () {
			//getBookCaseConfig("http://stat.yunzhan365.com/statistic-server/add-book-visitinfo.php?uLink="+uLink+"&bLink="+bLink+"&type="+type+"&page="+page+"&code="+visitCode);
			getBookCaseConfig(location.protocol + "//stat.yunzhan365.com/bookvisitinfo.html?uLink=" + uLink + "&bLink=" + bLink + "&type=" + type + "&page=" + page + "&code=" + visitCode);
		});
	}
}

function getBookCaseConfig (url, callBack) {
	$.ajax({
		async: true,
		url: url,
		type: "GET",
		dataType: 'script',
		jsonp: 'jsoncallback',
		timeout: 5000,
		beforeSend: function () {
		},
		success: function (json, s) {
		},
		complete: function (XMLHttpRequest, textStatus) {
			if (textStatus == "success" && typeof callBack == "function") {
				callBack();
			}
			;
		},
		error: function (xhr) {
		}
	});
};