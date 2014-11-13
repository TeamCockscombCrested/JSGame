$(document).ready(function()
{
	// change url attribute of validator links to current url
	var url = $(location).attr('href');
	var htmlUrl = $("#html_validator").attr("href").replace("=","="+url);
	//var cssUrl = $("#css_validator").attr("href").replace("=","="+url);

	$("#html_validator").attr('href', htmlUrl);
	//$("#css_validator").attr('href', cssUrl);
});

// piwik stats
var _paq = _paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);

(function()
{
	var u="http://stats.dawebs.com/";
	_paq.push(['setTrackerUrl', u+'piwik.php']);
	_paq.push(['setSiteId', 14]);
	var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
})();