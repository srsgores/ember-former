import guessType from "dummy/utils/guess-type";
import {module, test} from "qunit";
import {A} from "@ember/array";
import EmberObject, {computed} from "@ember/object";

module("Unit | Utility | guess-type", function() {

	test("it detects password by attribute name", function(assert) {
		assert.equal(guessType({}, {attributeName: "password"}), "password");
		assert.equal(guessType({}, {attributeName: "passwordConfirmation"}), "password");
		assert.equal(guessType({}, {attributeName: "currentPassword"}), "password");
	});

	test("it detects email by attribute name", function(assert) {
		assert.equal(guessType({}, {attributeName: "email"}), "email");
		assert.equal(guessType({}, {attributeName: "emailConfirmation"}), "email");
	});

	test("it detects boolean by attribute name", function(assert) {
		assert.equal(guessType({}, {attributeName: "isNice"}), "boolean");
		assert.equal(guessType({}, {attributeName: "hasMustache"}), "boolean");
		assert.equal(guessType({}, {attributeName: "didWashHimself"}), "boolean");
	});

	test("it detects collection when a collection param is available", function(assert) {
		assert.equal(guessType({}, {attributeName: "role", collection: A()}), "collection");
	});

	test("it recognizes Ember Data attribute types", function(assert) {
		A(["string", "number", "date", "boolean"]).forEach(function(type) {
			let object = EmberObject.extend({
				someProperty: computed(function() {
					return undefined;
				}).meta({type: type})
			}).create();

			assert.equal(guessType(object, {attributeName: "someProperty"}), type);
		});
	});

	test("it returns \"string\" by default", function(assert) {
		assert.equal(guessType({}, {attributeName: "role"}), "string");
	});
});
