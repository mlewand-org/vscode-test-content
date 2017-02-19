/* global suite, test */
const assert = require( 'assert' ),
    vscode = require( 'vscode' ),
    path = require( 'path' ),
    mainModule = require( '../src' );

suite( 'Test integration', function() {
    test( 'Standard content getter / setter', () => {
        return mainModule.set( 'This is a text' )
            .then( editor => assert.equal( mainModule.get( editor ), 'This is a text' ) );
    } );

    test( 'Selection aware getter / setter', () => {
        return mainModule.setWithSelection( 'What [a great selection}!' )
            .then( editor => {
                assert.equal( mainModule.getWithSelection( editor ), 'What [a great selection}!' );
                assert.equal( mainModule.get( editor ), 'What a great selection!' );
            } );
    } );
} );
