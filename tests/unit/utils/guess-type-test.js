import guessType from "dummy/utils/guess-type";
import {module, test} from "qunit";
import {A} from "@ember/array";
import EmberObject, {computed} from "@ember/object";

module("Unit | Utility | guess-type", function() {

	test("it detects phone by attribute name", function(assert) {
		assert.equal(guessType({}, {attributeName: "primaryPhone"}), "tel");
		assert.equal(guessType({}, {attributeName: "primaryPhoneNumber"}), "tel");
		assert.equal(guessType({}, {attributeName: "currentPhoneNumber"}), "tel");
	});

	test("it detects number by attribute name", function(assert) {
		assert.equal(guessType({}, {attributeName: "lotNumber"}), "number");
		assert.equal(guessType({}, {attributeName: "numberOfParticipants"}), "number");
		assert.equal(guessType({}, {attributeName: "participantCount"}), "number");
	});

	test("it detects date by attribute name", function(assert) {
		assert.equal(guessType({}, {attributeName: "dateModified"}), "date");
		assert.equal(guessType({}, {attributeName: "lastModifiedDate"}), "date");
	});

	test("it detects datetime-local by attribute name", function(assert) {
		assert.equal(guessType({}, {attributeName: "dateTimeLocalModified"}), "datetime-local");
		assert.equal(guessType({}, {attributeName: "lastModifiedDateTimeLocal"}), "datetime-local");
		assert.equal(guessType({}, {attributeName: "dateTimeLocal"}), "datetime-local");
	});

	test("it detects datetime by attribute name", function(assert) {
		assert.equal(guessType({}, {attributeName: "dateTimeModified"}), "datetime");
		assert.equal(guessType({}, {attributeName: "lastModifiedDateTime"}), "datetime");
		assert.equal(guessType({}, {attributeName: "dateTime"}), "datetime");
	});

	test("it detects time by attribute name", function(assert) {
		assert.equal(guessType({}, {attributeName: "lastUpdatedTime"}), "time");
		assert.equal(guessType({}, {attributeName: "timeOfPurchase"}), "time");
		assert.equal(guessType({}, {attributeName: "createdTimeUTC"}), "time");
	});

	test("it detects month by attribute name", function(assert) {
		assert.equal(guessType({}, {attributeName: "month"}), "month");
		assert.equal(guessType({}, {attributeName: "selectedMonth"}), "month");
		assert.equal(guessType({}, {attributeName: "selectedMonthWithoutYear"}), "month");
	});

	test("it detects color by attribute name", function(assert) {
		assert.equal(guessType({}, {attributeName: "preferredColour"}), "color");
		assert.equal(guessType({}, {attributeName: "preferredColor"}), "color");
		assert.equal(guessType({}, {attributeName: "colourWhenSelected"}), "color");
		assert.equal(guessType({}, {attributeName: "colorWhenSelected"}), "color");
		assert.equal(guessType({}, {attributeName: "color"}), "color");
		assert.equal(guessType({}, {attributeName: "colour"}), "color");
	});

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
		assert.equal(guessType({}, {attributeName: "isNice"}), "checkbox");
		assert.equal(guessType({}, {attributeName: "hasMustache"}), "checkbox");
		assert.equal(guessType({}, {attributeName: "didWashHimself"}), "checkbox");
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

			assert.equal(guessType(object, {attributeName: "someProperty"}), type === "boolean" ? "checkbox" : type);
		});
	});

	test("it detects textarea inputs by attribute name", function(assert) {
		assert.equal(guessType({}, {attributeName: "description"}), "textarea");
		assert.equal(guessType({}, {attributeName: "summary"}), "textarea");
		assert.equal(guessType({}, {attributeName: "content"}), "textarea");
	});

	test("it returns \"string\" by default", function(assert) {
		assert.equal(guessType({}, {attributeName: "role"}), "string");
	});
});
