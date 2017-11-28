# Options

#### defaultText

type : `text`, default : `select`

#### index

type : `number`, default : `1`

#### callback

type : `function`

# Sample Usage

```
var dropdown = new Dropdown(document.querySelector('.dropdown'), {
	defaultText : 'Selected',
	index : 1,
	callback : function() {
		
	}
});
```