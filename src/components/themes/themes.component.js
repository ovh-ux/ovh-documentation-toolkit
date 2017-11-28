import controller from "./themes.controller";
import template from "./themes.html";

export default {
    template,
    controller,
    bindings: {
        onChange: "&"
    }
};
