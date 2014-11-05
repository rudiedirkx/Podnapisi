
// Next episode
$('#series-search').find('button').parent().append('<a id="-next-episode" href="#">&gt;&gt; next &gt;&gt;</a>');
$('#-next-episode').click(function(e) {
	e.preventDefault();
	var $sTE = document.querySelector('input[name="sTE"]');
	$sTE.value = parseInt($sTE.value) + 1;
	$sTE.form.submit();
});

// Release names
$(".release").each(function(i, obj) {
	var $obj = $(obj);

	var tt = $obj.data("tooltip")[0];
	$obj.html("<br>" + tt.innerHTML);
	$obj.removeData("tooltip").unbind("hover mouseover mouseout");
});
$('.tooltip').hide();

// Focus right tab
var q = (function(p,o){o={};p.forEach(function(x){x=x.split('=');o[x[0]]=x[1];});return o;})(location.search.substr(1).split('&'));
if ( q.sT == '0') {
	$('a[href="#movies-search"]').click();
}
else if ( q.sT == '1' ) {
	$('a[href="#series-search"]').click();
}
