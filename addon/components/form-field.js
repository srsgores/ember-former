import Component from "@glimmer/component";
import {assert} from "@ember/debug";
import {guidFor} from "@ember/object/internals";
import {computed} from "@ember/object";
import {tracked} from "@glimmer/tracking";
import guessType from "ember-former/utils/guess-type";

export const CLASS_NAMES = {
	FOCUSED_STATE: "focused",
	FORM_CONTROL: "form-control",
	FORM_FIELD: "form-field",
	LABEL: "form-field-label"
};

export const ERROR_MESSAGES = {
	NO_MODEL_SUPPLIED_MESSAGE: "No @model argument was supplied.  <FormField> requires a model so it can bind to the model",
	NO_FIELD_NAME_SUPPLIED_MESSAGE: "No @field name argument was supplied.  <FormField> requires a field name so it can bind to the model's attribute"
};

export default class FormFieldComponent extends Component {
	elementId = guidFor(this);
	className = CLASS_NAMES.FORM_FIELD;
	focusedClassName = CLASS_NAMES.FOCUSED_STATE;
	formControlClassName = CLASS_NAMES.FORM_CONTROL;
	labelClassName = CLASS_NAMES.LABEL;

	@tracked hasFocus = false;

	@computed.equal("type", "checkbox") isCheckbox;
	@computed.equal("type", "textarea") isTextarea;
	@computed.empty("args.required") isRequired;

	get type() {
		return this.args.type || guessType(this.args.model, {attributeName: this.args.field});
	}

	constructor() {
		super(...arguments);
		assert(ERROR_MESSAGES.NO_MODEL_SUPPLIED_MESSAGE, this.args.model);
		assert(ERROR_MESSAGES.NO_FIELD_NAME_SUPPLIED_MESSAGE, this.args.field);
	}
}
