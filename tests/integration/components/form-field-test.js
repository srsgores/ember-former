import {module, test} from "qunit";
import {setupRenderingTest} from "ember-qunit";
import {find, focus, render, settled, setupOnerror} from "@ember/test-helpers";
import {hbs} from "ember-cli-htmlbars";
import {CLASS_NAMES, ERROR_MESSAGES} from "../../../components/form-field";

const {FOCUSED_STATE, FORM_FIELD, FORM_CONTROL} = CLASS_NAMES;
const {NO_MODEL_SUPPLIED_MESSAGE, NO_FIELD_NAME_SUPPLIED_MESSAGE} = ERROR_MESSAGES;

module("Integration | Component | form-field", function(hooks) {
	setupRenderingTest(hooks);

	hooks.beforeEach(function() {
		const sampleModel = {
			name: "name",
			_internalModel: {
				modelName: "post"
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
			email: "xyz@mail.com"
		};
		const modelWithPhoneAttribute = {
			primaryPhone: "555555555"
		};
		const modelWithNumberAttribute = {
			lotNumber: "1"
		};
		this.setProperties({
			model: modelWithEmailAttribute,
			field: "email"
		});
		await render(hbs`<FormField @model={{this.model}} @field={{this.field}}/>`);
		assert.dom(`.${FORM_CONTROL}[type="email"]`).exists({count: 1}, "has an email input when email is contained in the attribute name");
		assert.dom(`.${FORM_CONTROL}[type="email"]`).hasValue(modelWithEmailAttribute.email, "pre-populates the email input with the @model's value");
		this.setProperties({
			model: modelWithPhoneAttribute,
			field: "primaryPhone"
		});
		await settled();
		assert.dom(`.${FORM_CONTROL}[type="tel"]`).exists({count: 1}, "has a phone input when phone is contained in the attribute name");
		assert.dom(`.${FORM_CONTROL}[type="tel"]`).hasValue(modelWithPhoneAttribute.primaryPhone, "pre-populates the tel input with the @model's value");
		this.setProperties({
			model: modelWithNumberAttribute,
			field: "lotNumber"
		});
		await settled();
		assert.dom(`.${FORM_CONTROL}[type="number"]`).exists({count: 1}, "has a number input when number is contained in the attribute name");
		assert.dom(`.${FORM_CONTROL}[type="number"]`).hasValue(modelWithNumberAttribute.lotNumber);
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
		await focus(`.${FORM_CONTROL}`);
		assert.dom(`.${FORM_FIELD}`).hasClass(FOCUSED_STATE);
	});

	test("it renders block content when supplied", async function(assert) {
		const YIELDED_TEXT = "Hello, world";
		this.set("yieldedText", YIELDED_TEXT);
		await render(hbs`
			<FormField @model={{this.model}} @field="name">
				{{this.yieldedText}}
			</FormField>`);
		assert.dom(`.${FORM_FIELD}`).includesText(YIELDED_TEXT, `renders the passed-in text "${YIELDED_TEXT}"`);
	});

	test("it sets required attribute to true by default", async function(assert) {
		await render(hbs`<FormField @model={{this.model}} @field="name"/>`);
		assert.dom(`.${FORM_CONTROL}:first-child`).isRequired("first input has required attribute");
	});

	test("it renders an input type checkbox when boolean type", async function(assert) {
		const modelWithBooleanAttribute = {
			isDisabled: false
		};
		this.setProperties({
			model: modelWithBooleanAttribute,
			field: "isDisabled"
		});
		await render(hbs`<FormField @model={{this.model}} @field={{this.field}}/>`);
		assert.dom(`.${FORM_CONTROL}[type="checkbox"]`).exists({count: 1}, "has a checkbox input when the attribute name contains is");
		assert.dom(`.${FORM_CONTROL}[type="checkbox"]`).isNotChecked("checkbox is unchecked when attribute value is false");
		this.set("model.isDisabled", true);
		await settled();
		assert.dom(`.${FORM_CONTROL}[type=checkbox]`).isChecked("checkbox is checked when attribute value is true");
	});

	test("it renders date time when date type", async function(assert) {
		const modelWithDateAttribute = {
			lastModifiedDate: "2020-11-08"
		};
		this.setProperties({
			model: modelWithDateAttribute,
			field: "lastModifiedDate"
		});
		await render(hbs`<FormField @model={{this.model}} @field={{this.field}}/>`);
		assert.dom(`.${FORM_CONTROL}[type="date"]`).exists({count: 1}, "has a date input when the attribute name contains date");
		assert.dom(`.${FORM_CONTROL}[type="date"]`).hasValue(modelWithDateAttribute.lastModifiedDate);
	});

	test("it renders textarea when textarea type", async function(assert) {
		const modelWithTextareaAttributeName = {
			isDisabled: false
		};
		this.setProperties({
			model: modelWithTextareaAttributeName,
			field: "description"
		});
		await render(hbs`<FormField @model={{this.model}} @field={{this.field}}/>`);
		assert.dom(`textarea.${FORM_CONTROL}`).exists({count: 1}, "has a textarea when the attribute name contains description");
	});

	test("it renders URL input when url type", async function(assert) {
		const modelWithURLInAttributeName = {
			photoURL: "https://world.wide.net"
		};
		this.setProperties({
			model: modelWithURLInAttributeName,
			field: "photoURL"
		});
		await render(hbs`<FormField @model={{this.model}} @field={{this.field}}/>`);
		assert.dom(`.${FORM_CONTROL}[type="url"]`).exists({count: 1}, "has a url input when the attribute name contains url");
	});

	test("it renders week input when week type", async function(assert) {
		const modelWithWeekInAttributeName = {
			weekPublished: "2020-w45"
		};
		this.setProperties({
			model: modelWithWeekInAttributeName,
			field: "weekPublished"
		});
		await render(hbs`<FormField @model={{this.model}} @field={{this.field}}/>`);
		assert.dom(`.${FORM_CONTROL}[type="week"]`).exists({count: 1}, "has a week input when the attribute name contains week");
	});

	test("it passes in min, max, and step attributes (number type)", async function(assert) {
		const modelWithNumberAttribute = {
			lotNumber: "1"
		};
		const MIN = 1;
		const MAX = 10;
		const step = 1;
		this.setProperties({
			model: modelWithNumberAttribute,
			field: "lotNumber",
			MIN,
			MAX,
			step
		});
		await render(hbs`<FormField @model={{this.model}} @field={{this.field}} @min={{this.MIN}} @max={{this.MAX}} @step={{this.step}}/>`);
		assert.dom(`.${FORM_CONTROL}[type="number"]`).hasAttribute("min", `${MIN}`);
		assert.dom(`.${FORM_CONTROL}[type="number"]`).hasAttribute("max", `${MAX}`);
		assert.dom(`.${FORM_CONTROL}[type="number"]`).hasAttribute("step", `${step}`);
	});

	test("it disables required attribute when @required={{false}} passed in", async function(assert) {
		await render(hbs`<FormField @model={{this.model}} @field="name" @required={{false}}/>`);
		assert.dom(`.${FORM_CONTROL}`).doesNotHaveAttribute("required", "does not have the required attribute when @required set to false");
	});
});
