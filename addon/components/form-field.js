import Component from "@glimmer/component";
import {assert} from "@ember/debug";
import {guidFor} from "@ember/object/internals";
import {tracked} from "@glimmer/tracking";

export const CLASS_NAMES = {
	FOCUSED_STATE: "focused",
	FORM_CONTROL: "form-control",
	FORM_FIELD: "form-field"
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

	@tracked hasFocus = false;
	constructor() {
		super(...arguments);
		assert(ERROR_MESSAGES.NO_MODEL_SUPPLIED_MESSAGE, this.args.model);
		assert(ERROR_MESSAGES.NO_FIELD_NAME_SUPPLIED_MESSAGE, this.args.field);
	}
}
