ember-former
==============================================================================

Form composition components useful for auto-generating forms in EmberJS and Ember data.

2 useful components:

1. `<Former @model={{this.model}}/>`: a simple wrapper around the `<form>` element; sets sane defaults for `action` and `method`
2. `<FormField @field="firstName" @model={{this.model}}/>`: generates an `<input/>` and its corresponding `<label>`

For example, the following:

```hbs
<Former @model={{this.model}} @onSubmit={{this.validateAndRegisterUser}}>
	<FormField @field="email" @model={{this.model}}/>
	<button type="submit">Sign up</button>
</Former>
```

Will generate the following HTML:

```html
<form class="former" action="/user" method="POST"">
	<div class="form-field ">
		<input required id="ember133" class="ember-text-field ember-view form-control" type="email">
		<label for="ember133">email</label>
	</div>
	<button type="submit">Sign up</button>
</form>
```

## Features
* `class` toggle `.focused` class when the field gets focus.  Useful for material-style label placement
* intelligent "auto-guess" for `<input/>` `type`

### Compared to [`ember-form-builder`](https://github.com/nibynic/ember-form-builder)

This addon has nearly the same features as [`ember-form-builder`](https://github.com/nibynic/ember-form-builder) and draws its inspiration from the project.  However, note some notable differences:

| Feature                | Former | ember-form-builder |
|------------------------|--------|--------------------|
| `@type="date"`           | ✔      |  ✔                 |
| `@type="datetime"`       | ✔      |  ❌                 |
| `@type="datetime-local"` | ✔      |  ❌                 |
| `@type="checkbox"`       | ✔      |  ✔                 |
| `@type="email"`          | ✔      |  ✔                 |
| `@type="color"`          | ✔      |  ❌                 |
| `@type="number"`         | ✔      |  ❌                 |
| `@type="month"`          | ✔      |  ❌                 |
| `@type="range"`          | ❌      |  ❌                |
| `@type="year"`           | ❌      |  ❌                |
| `@type="time"`           | ✔      |  ❌                |
| `@type="tel"`            | ✔      |  ❌                |
| `<select>`               | ❌      |  ✔                |
| `<textarea>`             | ✔      |  ✔                |

## Types Guessed

Type | Guessed when |
--- | --- |
`checkbox` | attribute name begins with `is`, `has` or `did`; underlying model's attribute is a `DS.attr("boolean")`
`date` | attribute name contains `date` or underlying model's attribute is a `DS.attr("date")`
`datetime` | attribute name contains `dateTime`
`datetime-local` | attribute name contains `dateTimeLocal`
`tel` | attribute name contains `phone`
`time` | attribute name contains `time`
`email` | attribute name contains `email`
`number` | attribute name contains `number` or `count`, or underlying model's attribute is a `DS.attr("number")`
`month` | attribute name contains `month`
`color` | attribute name contains `colour` or `color` 
`password` | attribute name contains `password`
`textarea` | attribute name contains `description`, `content`, `summary`
`string` | _default_: underlying model's attribute is a `DS.attr("string")`

### Overriding the `@type`

Only available for `<Input/>` (we can not currently generate `<textarea/>` or `<select>`):

```hbs
<FormField @field="email" @type="text"/>
```

### Disabling the default `required` attribute
By default, all form controls will have `required`.  To disable this use `@required={{false}}:

```hbs
<FormField @field="email" @model={{this.model}} @required={{false}}/>
```

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-former
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
