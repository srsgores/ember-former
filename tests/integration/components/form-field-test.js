import {module, test} from "qunit";
import {setupRenderingTest} from "ember-qunit";
import {find, focus, render, settled, setupOnerror} from "@ember/test-helpers";
import {hbs} from "ember-cli-htmlbars";
import {ERROR_MESSAGES, CLASS_NAMES} from "../../../components/form-field";


const {FOCUSED_STATE, FORM_CONTROL} = CLASS_NAMES;
const {NO_MODEL_SUPPLIED_MESSAGE, NO_FIELD_NAME_SUPPLIED_MESSAGE} = ERROR_MESSAGES;

module("Integration | Component | form-field", function(hooks) {
	setupRenderingTest(hooks);

	hooks.beforeEach(function() {
		const sampleModel = {
			modelName: "post",
			attributes: {
				name: "name"
			}
		};
		this.set("model", sampleModel);
		setupOnerror();
	});

	test("it throws an error when no @model argument supplied", async function(assert) {
		assert.expect(1);
		setupOnerror(function(error) {
			assert.equal(error.message, `Assertion Failed: ${NO_MODEL_SUPPLIED_MESSAGE}`);
		});
		await render(hbs`<FormField @field="name"/>`);
	});

	test("it throws an error when no @field argument supplied", async function(assert) {
		assert.expect(1);
		setupOnerror(function(error) {
			assert.equal(error.message, `Assertion Failed: ${NO_FIELD_NAME_SUPPLIED_MESSAGE}`);
		});
		await render(hbs`<FormField @model={{this.model}}/>`);
	});

	test("it renders an input element that corresponds to the @model's @field type", async function(assert) {
		const modelWithEmailAttribute = {
			modelName: "post",
			attributes: {
				email: "xyz@mail.com"
			}
		};
		const modelWithPhoneAttribute = {
			modelName: "profile",
			attributes: {
				primaryPhone: 555555555
			}
		};
		const modelWithDateAttribute = {
			modelName: "profile",
			attributes: {
				lastModifiedDate: new Date()
			}
		};
		const modelWithNumberAttribute = {
			modelName: "parking-spot",
			attributes: {
				lotNumber: 1
			}
		};
		const modelWithBooleanAttribute = {
			modelName: "profile",
			attributes: {
				isDisabled: false
			}
		};
		this.setProperties({
			model: modelWithEmailAttribute,
			field: "email"
		});
		await render(hbs`<FormField @model={{this.model}} @field={{this.field}}/>`);
		assert.dom(`.${FORM_CONTROL}[type="email"]`).exists({count: 1}, "has an email input when email is contained in the attribute name");
		assert.dom(`.${FORM_CONTROL}[type="email"]`).hasValue(modelWithEmailAttribute.attributes.email, "pre-populates the email input with the @model's value");
		this.setProperties({
			model: modelWithPhoneAttribute,
			field: "primaryPhone"
		});
		await settled();
		assert.dom(`.${FORM_CONTROL}[type="tel"]`).exists({count: 1}, "has a phone input when phone is contained in the attribute name");
		assert.dom(`.${FORM_CONTROL}[type="tel"]`).hasValue(modelWithPhoneAttribute.attributes.primaryPhone, "pre-populates the tel input with the @model's value");
		this.setProperties({
			model: modelWithNumberAttribute,
			field: "lotNumber"
		});
		await settled();
		assert.dom(`.${FORM_CONTROL}[type="number"]`).exists({count: 1}, "has a number input when number is contained in the attribute name");
		assert.dom(`.${FORM_CONTROL}[type="number"]`).hasValue(modelWithNumberAttribute.attributes.lotNumber);
		this.setProperties({
			model: modelWithDateAttribute,
			field: "lastModifiedDate"
		});
		await settled();
		assert.dom(`.${FORM_CONTROL}[type="date"]`).exists({count: 1}, "has a date input when the attribute name contains date");
		assert.dom(`.${FORM_CONTROL}[type="date"]`).hasValue(modelWithDateAttribute.attributes.lastModifiedDate);
		this.setProperties({
			model: modelWithBooleanAttribute,
			field: "isDisabled"
		});
		await settled();
		assert.dom(`.${FORM_CONTROL}[type="checkbox"]`).exists({count: 1}, "has a checkbox input when the attribute name contains is");
		assert.dom(`.${FORM_CONTROL}[type="checkbox"]`).isNotChecked("checkbox is unchecked when attribute value is false");
		this.set("model.attributes.isDisabled", true);
		await settled();
		assert.dom(`.${FORM_CONTROL}[type=checkbox]`).isChecked("checkbox is checked when attribute value is true");
	});

	test("it renders a corresponding label with each input", async function(assert) {
		await render(hbs`<FormField @model={{this.model}} @field="name"/>`);
		const $input = find("input");
		const inputID = $input.id;
		assert.ok(inputID, "has a unique id");
		assert.dom(`label[for=${inputID}]`).exists({count: 1}, "has an associated label with the unique ID");
	});

	test("it toggles the focused class on the parent container when the form control is focused", async function(assert) {
		await render(hbs`<FormField @model={{this.model}} @field="name"/>`);
		await focus(FORM_CONTROL);
		assert.dom(this.element).hasClass(FOCUSED_STATE);
	});

	test("it renders block content when supplied", async function(assert) {
		const YIELDED_TEXT = "Hello, world";
		this.set("yieldedText", YIELDED_TEXT);
		await render(hbs`
			<FormField @model={{this.model}} @field="name">
				{{this.yieldedText}}
			</FormField>`);
		assert.dom(this.element).includesText(YIELDED_TEXT, `renders the passed-in text "${YIELDED_TEXT}"`);
	});

	test("it sets required attribute to true by default", async function(assert) {
		await render(hbs`<FormField @model={{this.model}} @field="name"/>`);
		assert.dom(`.${FORM_CONTROL}:first-child`).isRequired("first input has required attribute");
	});
});
