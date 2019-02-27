/* eslint-env browser */
(() => {
	// Helper
	const dom = {
		select: document.querySelector.bind(document),
		selectAll: document.querySelectorAll.bind(document)
	};

	// Burger menu toggle
	const burger = dom.select('.nav-toggle');
	const menu = dom.select('.nav-menu');
	burger.addEventListener('click', () => {
		burger.classList.toggle('is-active');
		menu.classList.toggle('is-active');
	});

	// Higlight active nav menu item
	const navEl = dom.select(`.nav-menu a[href$="${window.location.pathname}"]`)
	if (navEl) {
		navEl.classList.add('is-active');
	}

	// Scroll Hint
	{
		function hideScrollHint() {
			if (window.scrollY > 100) {
				document.removeEventListener('scroll', hideScrollHint);
				dom.select('#scroll-hint').classList.add('hidden');
			}
		}

		document.addEventListener('scroll', hideScrollHint, {passive: true});
	}

	function sendContactEvent(label) {
		ga('send', 'event', 'ContactLink', 'click', label)
	}

	dom.selectAll('[data-contact-link]').forEach(link => {
		const label = link.attributes['data-contact-link'].value
		link.addEventListener('click', function () {
			sendContactEvent(label)
		})
	})
})();
