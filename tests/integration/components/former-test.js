import {module, test} from "qunit";
import {setupRenderingTest} from "ember-qunit";
import {click, render, setupOnerror} from "@ember/test-helpers";
import {hbs} from "ember-cli-htmlbars";
import {CLASS_NAMES as FORM_FIELD_CLASSNAMES} from "../../../components/form-field";
import {CLASS_NAMES as FORM_CLASS_NAMES, ERROR_MESSAGES} from "../../../components/former";

const {FORM_CONTROL} = FORM_FIELD_CLASSNAMES;

const {NO_MODEL_SUPPLIED_MESSAGE} = ERROR_MESSAGES;

const sampleModel = {
	_internalModel: {
		modelName: "post"
	}
};

module("Integration | Component | former", function(hooks) {
	setupRenderingTest(hooks);

	hooks.beforeEach(function() {
		setupOnerror();
		this.set("model", sampleModel);
	});

	test("it yields the rest of the blocks passed in via block form", async function(assert) {
		const YIELDED_TEXT = "Hello, world";
		this.set("yieldedText", YIELDED_TEXT);
		await render(hbs`<Former @model={{this.model}}>{{this.yieldedText}}</Former>`);
		assert.dom(this.element).includesText(YIELDED_TEXT, `renders the passed-in text "${YIELDED_TEXT}"`);
	});

	test("it focuses the first form-field when @autofocus set to true", async function(assert) {
		await render(hbs`
			<Former @autofocus={{true}} @model={{this.model}} as |form|>
				<form.field @for="name"/>
			</Former>
		`);
		assert.dom(`.${FORM_CONTROL}:first-child`).isFocused("first form field is focused");
	});

	test("it triggers @onSubmit callback when @onSubmit argument provided", async function(assert) {
		assert.expect(1);
		this.set("onSubmit", function(submitEvent) {
			assert.ok(submitEvent, "Submit event called");
		});
		await render(hbs`
			<Former @onSubmit={{this.onSubmit}} @model={{this.model}}>
				<button type="submit">Don't refresh, please</button>
			</Former>
		`);
		await click(`button[type="submit"]`);
	});

	test("it throws an error if no @model argument supplied", async function(assert) {
		assert.expect(1);
		setupOnerror(function(error) {
			assert.equal(error.message, `Assertion Failed: ${NO_MODEL_SUPPLIED_MESSAGE}`);
		});
		await render(hbs`<Former/>`);
	});

	test("it has an action and a method that corresponds to the model supplied", async function(assert) {
		this.set("model", sampleModel);
		await render(hbs`<Former @model={{this.model}}/>`);
		assert.dom(`.${FORM_CLASS_NAMES.FORM}`).hasAttribute("action", `/${sampleModel._internalModel.modelName}`);
		assert.dom(`.${FORM_CLASS_NAMES.FORM}`).hasAttribute("method", "POST", "Sets method to POST by default");
	});

	test("it passes in additional, specified attributes to the form element", async function(assert) {
		const CUSTOM_CLASS = "custom";
		this.set("customClass", CUSTOM_CLASS);
		await render(hbs`<Former @model={{this.model}} novalidate="novalidate" class={{this.customClass}}/>`);
		assert.dom(`.${FORM_CLASS_NAMES.FORM}`).hasAttribute("novalidate", "novalidate", "has the novalidate attribute");
		assert.dom(`.${FORM_CLASS_NAMES.FORM}`).hasClass(CUSTOM_CLASS, `has the custom class: ${CUSTOM_CLASS}`);
	});
});
