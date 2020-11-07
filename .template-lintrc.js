"use strict";

module.exports = {
	extends: "octane",
	rules: {
		"no-bare-strings": true,
		"attribute-indentation": false,
		"block-indentation": "tab",
		"no-invalid-interactive": {
			ignoredTags: ["form"]
		}
	}
};
