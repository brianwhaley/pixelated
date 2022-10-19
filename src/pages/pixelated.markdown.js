/* eslint-disable */

/* https://randyperkins2k.medium.com/writing-a-simple-markdown-parser-using-javascript-1f2e9449a558 */

export function markdownParser(text) {
	const toHTML = text
    	.replace(/^#{6}\s(.*$)/gim, '<h6>$1</h6>') // h6 tag
    	.replace(/^#{5}\s(.*$)/gim, '<h5>$1</h5>') // h5 tag
    	.replace(/^#{4}\s(.*$)/gim, '<h4>$1</h4>') // h4 tag
		.replace(/^#{3}\s(.*$)/gim, '<h3>$1</h3>') // h3 tag
		.replace(/^#{2}\s(.*$)/gim, '<h2>$1</h2>') // h2 tag
		.replace(/^#{1}\s(.*$)/gim, '<h1>$1</h1>') // h1 tag
		.replace(/(\=|\-|\*){3}/gim, '<hr />') // horizontal rule
        .replace(/\[([^\[]+)\]\((.*)\)/gim, '<a href="$2">$1</a>') // links
		.replace(/^\*{1}\s+(.*$)/gim, '<li>$1</li>') // unordered list
		.replace(/^\d+\.\s+(.*$)/gim, '<li>$1</li>') // ordered list
		.replace(/\:\"(.*?)\"\:/gim, '<q>$1</q>') // quote
		.replace(/`(.*?)`/gim, '<code>$1</code>') // inline code
		.replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>') // bold text
		.replace(/\*(.*?)\*/gim, '<i>$1</i>') // italic text
		.replace(/(^[A-z].+)/gim, '<p>$1</p>') // paragraphs
		//.replace(//gim, '')
		;
	return toHTML.trim(); // using trim method to remove whitespace
}
