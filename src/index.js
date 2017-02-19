
const getContent = require( 'vscode-test-get-content' ),
	setContent = require( 'vscode-test-set-content' );

module.exports = {
	get: getContent,
	getWithSelection: getContent.withSelection,
	set: setContent,
	setWithSelection: setContent.withSelection
};