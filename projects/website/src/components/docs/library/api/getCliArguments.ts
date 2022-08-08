import schema from "./schema.generated.json";
import { InterfaceNode, isKindString, ModuleNode, PropertyNode, Tag } from "./schemaTypes";

export interface CliArgument {
  name: string;
  shortText: string | null;
  text: string | null;
  examples: string[];
}

export const getCliArguments = (): CliArgument[] => {
  const cliModule = getCliModule();
  const userInputsInterface = getUserInputsInterface(cliModule);
  const cliArgumentProperties = getPropertiesFromInterface(userInputsInterface);

  return cliArgumentProperties.map(property => {
    const { name, comment } = property;
    const shortText = comment?.shortText ?? null;
    const text = comment?.text ?? null;
    const examples = getExamples(comment?.tags);

    return { name, shortText, text, examples };
  });
};

const getCliModule = (): ModuleNode => {
  for (const child of schema.children) {
    if (
      isKindString(child.kindString) &&
      child.kindString === "Module" &&
      child.name === "cli/cli-arguments"
    ) {
      return child as unknown as ModuleNode;
    }
  }

  throw new Error("Could not find Cli module");
};

const getUserInputsInterface = (moduleNode: ModuleNode): InterfaceNode => {
  for (const child of moduleNode.children) {
    if (
      isKindString(child.kindString) &&
      child.kindString === "Interface" &&
      child.name === "UserInputs"
    ) {
      return child as unknown as InterfaceNode;
    }
  }

  throw new Error("Could not find UserInputs interface");
};

const getPropertiesFromInterface = (interfaceNode: InterfaceNode) => {
  return interfaceNode.children?.filter(
    c => isKindString(c.kindString) && c.kindString === "Property"
  ) as unknown as PropertyNode[];
};

const getExamples = (tags?: Tag[]): string[] => {
  if (!tags) {
    return [];
  }

  return tags.filter(t => t.tag === "example").map(t => t.text);
};
