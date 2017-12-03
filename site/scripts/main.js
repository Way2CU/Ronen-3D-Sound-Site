/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

// handle click on banner opener button
Site.handle_click = function(event) {
	event.preventDefault();

	if(Site.banner.classList.contains('visible')) {
		Site.banner.classList.remove('visible');
	} else {
		Site.banner.classList.add('visible');
	}
};

Site.handle_show_dialog_click = function(event) {
	event.preventDefault();

	Site.dialog_form.open();
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile()) {
		Site.mobile_menu = new Caracal.MobileMenu();

		// dialog which contains form
		Site.dialog_form = new Caracal.Dialog();
		Site.dialog_form
			.set_content_from_dom('div#dialog_contact_form')
			.add_class('dialog_form')
			.set_title(language_handler.getText(null, 'form_title'));

		// open form in dialog
		Site.show_dialog_button = document.querySelector('a#form_link');
		Site.show_dialog_button.addEventListener('click', Site.handle_show_dialog_click);
	}

	if(!Site.is_mobile()) {
		Site.banner_opener = document.querySelector('div#contact_form a');
		Site.banner_opener.addEventListener('click', Site.handle_click);

		Site.banner = document.querySelector('div#contact_form');
		window.setTimeout(function() {
			Site.banner.classList.remove('visible');
		}, 1000);
	}



};


// connect document `load` event with handler function
$(Site.on_load);
