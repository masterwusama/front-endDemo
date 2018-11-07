var funDownload = function (content, filename) {
	var eleLink = document.createElement('a');
	eleLink.download = filename;
	eleLink.style.display = 'none';
	var blob = new Blob([content]);//charge to blob
	eleLink.href = URL.createObjectURL(blob);
	document.body.appendChild(eleLink);
	eleLink.click();
	document.body.removeChild(eleLink);
};