
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



var img_dl = chrome.extension.getURL('images/download.png'),
	img_ld = chrome.extension.getURL('images/loading.gif'),
	img_dd = chrome.extension.getURL('images/downloaded.png'),
	dl_cache = {};

// Download buttons
A(document.querySelectorAll('div.list_div2 a')).forEach(function(a, i) {
	if ( !i ) {
		var thtr = a.parent('table').tHead.querySelector('tr');
		thtr.insertCell(1);
	}

	var tr = a.parent('tr');

	// Remove native download icon
	var img = tr.cells[0].querySelector('img');
	img.parentNode.removeChild(img);

	// Create new download cell
	var td = tr.insertCell(1);
	td.align = 'center';

	// Create and append download link/icon with click handler
	var a2 = document.createElement('a');
	var st_id = a.attr('href').match(/(\d+)$/)[1];
	a2.attr('href', a.attr('href'));
	a2.innerHTML = '<img src="' + img_dl + '" width="17" height="16" />';
	a2.originalA = a;
	a2.onclick = function(e) {
		if ( !this.downloaded ) {
			e.preventDefault();

			this.firstChild.src = img_ld;
			get(this.href, (function(html1) {
				var m1 = html1.match(/"(\/[a-z]+\/ppodnapisi\/(?:pre)?download\/i\/\d+\/k\/([a-z0-9]+))"/i);
				var dlUrl = m1[1];
				dlUrl = dlUrl.replace('predownload', 'download');

				var hash = m1[2];

				this.downloaded = true;
				this.href = dlUrl;
				this.firstChild.src = img_dd;

				var title = this.originalA.parent('td').innerText.trim().replace(/\s+/g, ' ');
				title = title.replace(/[^a-z0-9.()-]/ig, ' ').trim();

				this.target = '_blank';
				this.download = title + '.zip';
				this.title = 'Download: ' + this.download;
				this.click();
			}).bind(this));
		}
	};
	td.appendChild(a2);

});







function doScript(js) {
	js = 'jQuery(function($) { setTimeout(function() { ' + js + ' }, 1); });';
	var script = document.createElement('script');
	script.innerHTML = js;
	document.body.appendChild(script);
}

var file = chrome.extension.getURL('domready.js');
var xhr = new XMLHttpRequest;
xhr.onload = function(e) {
	doScript(this.responseText);
};
xhr.open('GET', file, true);
xhr.send();


