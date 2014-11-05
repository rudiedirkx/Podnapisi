
// Next episode
jQuery('#series-search').find('button').parent().append('<a id="-next-episode" href="#">&gt;&gt; next &gt;&gt;</a>');
jQuery('#-next-episode').click(function(e) {
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
