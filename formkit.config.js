// formkit.config.js
import { defaultConfig } from "@formkit/vue";
import {
  createMultiStepPlugin,
  createFloatingLabelsPlugin,
  createAutoHeightTextareaPlugin,
} from "@formkit/addons";

//pro
import { createProPlugin, repeater } from "@formkit/pro";

//css
import "@formkit/addons/css/multistep";

const proPlugin = createProPlugin("fk-885cbbc2860", {
  repeater,
  // ... and any other Pro Inputs
});

const config = defaultConfig({
  plugins: [
    createMultiStepPlugin(),
    createAutoHeightTextareaPlugin(),
    createFloatingLabelsPlugin(),
    //  addAsteriskPlugin,
    proPlugin,
  ],
});

export default config;

// plugins
const isCheckboxAndRadioMultiple = (node) =>
  (node.props.type === "checkbox" || node.props.type === "radio") &&
  node.props.options;

function addAsteriskPlugin(node) {
  node.on("created", () => {
    const schemaFn = node.props.definition.schema;
    node.props.definition.schema = (sectionsSchema = {}) => {
      const isRequired = node.props.parsedRules.some((rule) => {
        return rule.name === "required";
      });
      // console.log(node.props.id, node.props, isRequired);

      if (isRequired) {
        if (isCheckboxAndRadioMultiple(node)) {
          sectionsSchema.legend = {
            children: ["$label", "*"],
          };
        } else {
          sectionsSchema.label = {
            children: ["$label", "*"],
          };
        }
      }
      return schemaFn(sectionsSchema);
    };
  });
}

// function pluginRemoveInnerWrapper(inputNode) {
//   inputNode.on("created", ({ payload: node }) => {
//     // Ensure we only tap into checkboxes:
//     if (
//       node.props?.type === "checkbox" &&
//       typeof node.props.definition.schema === "function"
//     ) {
//       // Let's retain our own copy of this definition to prevent deep object referencing
//       const definition = { ...node.props.definition };
//       const schema = definition.schema;

//       // We replace the schema function with our own higher-order-function
//       definition.schema = function (extensions = {}) {
//         const ext = { ...extensions, ...{ inner: { $el: null } } };
//         // Finally we call the original schema, with our extensions applied
//         return schema(ext);
//       };

//       // Now we replace the input definition
//       node.props.definition = definition;
//     }
//     return;
//   });
// }
