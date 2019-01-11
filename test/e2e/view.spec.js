module.exports = {
	text: function(browser) {
		browser.expect.element('#main').to.be.present;
		browser.expect.element('#main').text.to.equal('Your name is: pascal');
	}
}