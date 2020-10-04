/* eslint-env browser */
// Helper
const dom = {
	select: document.querySelector.bind(document),
	selectAll: document.querySelectorAll.bind(document)
};

(() => {
	const isDev = ['localhost', '127.0.0.1'].includes(location.hostname);

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

(async () => {
	const url = 'https://dev.to/api/articles?username=berniwittmann'

	let json = await (await fetch(url)).json();

	const template = dom.select('#blog-post-template');
	const container = dom.select('#blog-posts');

	json = json.filter((post) => {
		if (!post.id || !post.url || !post.title || !post.published_at) return false;
		if ([92660, 462953].includes(post.id)) return false;
		return true
	}).slice(0, 3)
	for (const post of json) {
		const content = template.cloneNode(true).content;

		const title = content.querySelector('.title');
		title.textContent = post.title;

		const links = content.querySelectorAll('a');
		for (const link of links) {
			link.href = post.url;
		}

		if (post.description) {
			const subtitle = content.querySelector('.subtitle');
			subtitle.textContent = post.description;
		}

		if (post.cover_image) {
			const img = content.querySelector('img')
			img.src = post.cover_image;
		}

		container.appendChild(document.importNode(content, true));
	}

	const readMoreTemplate = dom.select('#read-more-posts-template');
	const content = readMoreTemplate.cloneNode(true).content;
	container.appendChild(document.importNode(content, true));
})();
