/* eslint-env browser */
(() => {
	const isDev = ['localhost', '127.0.0.1'].includes(location.hostname);

	// Helper
	const dom = {
		select: document.querySelector.bind(document),
		selectAll: document.querySelectorAll.bind(document)
	};

	function injectScript(src, cb) {
		const script = document.createElement('script');
		script.src = src;
		script.addEventListener('load', cb);
		document.head.appendChild(script);
	}

	// Smooth anchor scroll
	const scroller = new AnchorScroller().scroller;


	function scrollToTop() {
		scroller.scrollTo(0);
	}

	dom.select('#backToTopButton').addEventListener('click', scrollToTop);
})();
