import Component from "@glimmer/component";
import {action} from "@ember/object";
import {assert} from "@ember/debug";

export const CLASS_NAMES = {
	FORM: "former"
};

export const ERROR_MESSAGES = {
	NO_MODEL_SUPPLIED_MESSAGE: "No @model argument provided.  Please provide a @model to the <Former> component"
};

export default class FormerComponent extends Component {
	constructor() {
		super(...arguments);
		assert(ERROR_MESSAGES.NO_MODEL_SUPPLIED_MESSAGE, this.args.model);
	}

	@action onSubmit(submitEvent) {
		submitEvent.preventDefault();
		if (this.args.onSubmit) {
			this.args.onSubmit(...arguments);
		}
	}
}
