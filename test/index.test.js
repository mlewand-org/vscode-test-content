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

suite( 'Readme examples', function() {
    const vscodeTestContent = mainModule;
    let editor;

    setup( () => {
        return vscodeTestContent.setWithSelection( 'What a [great} selection!' )
            .then( newEditor => editor = newEditor );
    } );

    test( 'Getter examples', () => {
        // Get the content without selection:
        assert.equal( vscodeTestContent.get( editor ), 'What a great selection!' );

        // Get the content including selection:
        assert.equal( vscodeTestContent.getWithSelection( editor ), 'What a [great} selection!' );
    } );


    suite( 'Setter examples', () => {
        test( 'Example 1', () => {
            // Setting the content without selection:
            return vscodeTestContent.set( 'foobar' )
                .then( textEditor => {
                    assert.equal( textEditor.document.lineAt( 0 ).text, 'foobar' );
                } );
        } );

        test( 'Example 2', () => {
            // Setting the content with a collapsed selection ('^'):
            return vscodeTestContent.setWithSelection( 'Put a collapsed selection here ^' )
                .then( textEditor => {
                    assert.equal( textEditor.document.lineAt( 0 ).text, 'Put a collapsed selection here ' );
                    assert.equal( textEditor.selection.isEmpty, true );
                    assert.equal( textEditor.selection.start.character, 31 );
                } );
        } );

        test( 'Example 3', () => {
            // Setting the content with a ranged selection ('[', ']', '{', '}'):
            return vscodeTestContent.setWithSelection( 'Fancy [content}!' )
                .then( textEditor => {
                    assert.equal( textEditor.document.lineAt( 0 ).text, 'Fancy content!' );
                    assert.equal( textEditor.selection.isEmpty, false );
                    assert.equal( textEditor.selection.start.character, 6 );
                    assert.equal( textEditor.selection.end.character, 13 );
                    assert.equal( textEditor.selection.active, textEditor.selection.end );
                } );
        } );
    } );
} );
