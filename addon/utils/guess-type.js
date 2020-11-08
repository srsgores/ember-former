// adapted shamelessly from https://github.com/nibynic/ember-form-builder/blob/master/tests/unit/utilites/guess-type-test.js
export default function(model, {attributeName, collection}) {
	attributeName = attributeName || "";
	let guessedType = "string";

	if (attributeName.match(/password/i)) {
		guessedType = "password";
	}
	else if (attributeName.match(/email/)) {
		guessedType = "email";
	}
	else if (attributeName.match(/phone/i)) {
		guessedType = "tel";
	}
	else if (attributeName.match(/(number|count)/i)) {
		guessedType = "number";
	}
	else if (attributeName.match(/^(is|has|did)/)) {
		guessedType =  "boolean";
	}
	else if (collection) {
		guessedType = "collection";
	}
	else {
		guessedType = model.constructor?.metaForProperty && typeof model.constructor.metaForProperty === "function" ? model.constructor.metaForProperty(attributeName)?.type : guessedType;
	}

	return guessedType;
}
