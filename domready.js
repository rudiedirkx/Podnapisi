

// Next episode
jQuery('#series-search').find('button').parent().append('<a id="-next-episode" href="#">&gt;&gt; next &gt;&gt;</a>');
jQuery('#-next-episode').click(function(e) {
  e.preventDefault();
  var $sTE = document.querySelector('input[name="sTE"]');
  $sTE.value = parseInt($sTE.value) + 1;
  $sTE.form.submit();
});


// Release names
//console.group('Release names');
$(".release").each(function(i, obj) {
	var $obj = $(obj);

	var tt = $obj.data("tooltip")[0];
	$obj.html("<br>" + tt.innerHTML);
	$obj.removeData("tooltip").unbind("hover mouseover mouseout");
});
$('.tooltip').hide();
//console.groupEnd();


// Remove focus unstyles
for (var O=0, i=0, S=document.styleSheets[0], L=S.cssRules.length; i<L; i++) {
  if (S.cssRules[i-O].selectorText.match(/:focus/)) {
    S.removeRule(i-O++);
  }
}

