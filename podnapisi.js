
function extend(type, methods) {
	for ( var m in methods ) {
		if ( methods.hasOwnProperty(m) ) {
			type.prototype[m] = methods[m];
		}
	}
}

function A(list) {
	return Array.prototype.slice.call(list);
}

extend(Array, {
	contains: function(el) {
		return -1 != this.indexOf(el);
	}
});

extend(Element, {
	is: function(what) {
		return A(this.parentNode.childNodes).contains(this.parentNode.querySelector(what));
	},
	parent: function(what) {
		var p = this.parentNode;
		while ( p && p.is ) {
			if ( p.is(what) ) {
				return p;
			}
			p = p.parentNode;
		}
	},
	attr: function(k, v) {
		if ( 2 <= arguments.length ) {
			this.setAttribute(k, v);
		}
		return this.getAttribute(k);
	}
});

function get(url, cb) {
	var xhr = new XMLHttpRequest;
	xhr.open('GET', url);
	xhr.onreadystatechange = function(e) {
		if ( 4 === this.readyState ) {
			this.event = e;
			cb.call(this, this.responseText);
		}
	};
	xhr.send('');
	return xhr;
}

function dl(url) {
	var iframe = document.createElement('iframe');
	iframe.src = url;
	iframe.style.position = 'absolute';
	iframe.style.visibility = 'hidden';
	iframe.style.width = '0px';
	iframe.style.height = '0px';
	document.body.appendChild(iframe);
}



var img_dl = chrome.extension.getURL('download.png'),
	img_ld = chrome.extension.getURL('loading.gif'),
	img_dd = chrome.extension.getURL('downloaded.png'),
	dl_cache = {};

// Download buttons
A(document.querySelectorAll('div.list_div2 a')).forEach(function(a, i) {
	if ( !i ) {
		var thtr = a.parent('table').tHead.querySelector('tr');
		thtr.insertCell(1);
	}

	var tr = a.parent('tr');
	var img = tr.cells[0].getElementsByTagName('img')[0];
	img.parentNode.removeChild(img);

	// download cell
	var td = tr.insertCell(1);
	td.align = 'center';

	var a2 = document.createElement('a')
	var st_id = a.attr('href').match(/(\d+)$/)[1]
	a2.attr('href', a.attr('href'))
	a2.innerHTML = '<img src="' + img_dl + '" width="17" height="16" />'
	a2.onclick = function(e) {
		e.preventDefault();

		if ( !this.downloaded ) {
			this.firstChild.src = img_ld
			var a3 = this
console.log(a3.href);
			get(a3.href, function(t) {
				var m = t.match(/"(\/en\/ppodnapisi\/download\/\i\/\d+\/k\/[a-f0-9]{30,40})"/i)
console.log(m)
				var dlUrl = m[1];
console.log(dlUrl);
				a3.downloaded = true;
				a3.href = dlUrl;
				dl(dlUrl);
				a3.firstChild.src = img_dd;
			})
		}

		return false
	}

	td.appendChild(a2);

	// rating cell
	var rtd = tr.cells[tr.cells.length-1], imgs = A(rtd.childNodes);
	var rating = 0;
	imgs.forEach(function(img, i) {
		if ( img.nodeName === 'IMG' ) {
			rating += 2;
			var a = document.createElement('a');
			a.href = '/ppodnapisi/oceni/i/' + st_id + '/ocena/' + rating;
			a.onclick = function(e) {
				e.preventDefault();
				get(this.href, function(t) {
					rtd.innerHTML = 'voted...';
				});
			};
			a.appendChild(img);
			rtd.appendChild(a);
		}
		else {
			rtd.removeChild(img);
		}
	});

});







function doScript(js) {
	js = 'jQuery(function($) { ' + js + ' });';
	var script = document.createElement('script');
	script.innerHTML = js;
	document.body.appendChild(script);
}

var file = chrome.extension.getURL('domready.js');
var xhr = new XMLHttpRequest;
xhr.onreadystatechange = function(e) {
	if (this.readyState == 4 && this.status == 200) {
		doScript(this.responseText);
	}
};
xhr.open('GET', file, true);
xhr.send();


