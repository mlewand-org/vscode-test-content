
# vscode-test-content [![Build Status](https://travis-ci.org/mlewand-org/vscode-test-content.svg?branch=master)](https://travis-ci.org/mlewand-org/vscode-test-content) [![Build status](https://ci.appveyor.com/api/projects/status/c3p3qchaknq6mr5e?svg=true&passingText=master%20%E2%9C%93)](https://ci.appveyor.com/project/mlewand-travis/vscode-test-content)

Provides a set of helper functions for setting or getting the content and selection of a Visual Studio Code instance.

## Usage

### Getting editor content

```javascript
const vscodeTestContent = require( 'vscode-test-content' );

// Get the content without selection:
vscodeTestContent.get( editor );
// Returns: 'What a great selection!'

// Get the content including selection:
vscodeTestContent.getWithSelection( editor );
// 'What a [great} selection!'
```

### Setting editor content

```javascript
const vscodeTestContent = require( 'vscode-test-content' );

// Setting the content without selection:
vscodeTestContent.set( 'foobar' )
    .then( textEditor => {
        assert.equal( textEditor.document.lineAt( 0 ).text, 'foobar' );
    } );

// Setting the content with a collapsed selection ('^'):
vscodeTestContent.setWithSelection( 'Put a collapsed selection here ^' )
    .then( textEditor => {
        assert.equal( textEditor.document.lineAt( 0 ).text, 'Put a collapsed selection here ' );
        assert.equal( textEditor.selection.isEmpty, true );
        assert.equal( textEditor.selection.start.character, 31 );
    } );

// Setting the content with a ranged selection ('[', ']', '{', '}'):
vscodeTestContent.setWithSelection( 'Fancy [content}!' )
    .then( textEditor => {
        assert.equal( textEditor.document.lineAt( 0 ).text, 'Fancy content!' );
        assert.equal( textEditor.selection.isEmpty, false );
        assert.equal( textEditor.selection.start.character, 6 );
        assert.equal( textEditor.selection.end.character, 13 );
        assert.equal( textEditor.selection.active, textEditor.selection.end );
    } );
```

For more information, see [vscode-test-set-content](https://github.com/mlewand-org/vscode-test-set-content/) project.

## Markers

* Collapsed:
    * `^` - Simply marks where the selection caret should be.
* Ranged:
    * `[`, `]` - Marks where selection _anchor_ opening or close should be. Anchor is a position where the selection was started.
    * `{`, `}` - Marks where selection _active_ opening or close should be.

        Active part is the part where the selection ended, and it's the point from which the selection is continued from if you continue to enlarge the selection.

## Limitations

* Nested and intersecting ranges are not handled, since those are not handled in VSCode itself as of version 1.9.1.
