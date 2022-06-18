import schema from "./schema.generated.json";
import {
  AnyType,
  ArrayTypeNode,
  FunctionNode,
  isKindString,
  ModuleNode,
  ParameterNode,
  SignatureNode
} from "./schemaTypes";

export interface Method {
  name: string;
  signatures: Signature[];
}

export interface Signature {
  parameters: Parameter[];
  returnType: Type;
  shortText: string | null;
  text: string | null;
  returns: string | null;
}

export interface Parameter {
  name: string;
  shortText: string | null;
  text: string | null;
  type: Type;
  isOptional: boolean;
}

export interface Type {
  name: string;
  genericArguments: Type[] | null;
  isArray: boolean;
}

export const getLibraryMethods = (): Method[] => {
  const mainModule = getMainModule();
  const mainFunctions = getFunctionsFromModule(mainModule);

  return mainFunctions.map(functionNode => {
    const name = functionNode.name;
    const signatures = mapSignatures(functionNode.signatures);

    return {
      name,
      signatures
    };
  });
};

const getMainModule = (): ModuleNode => {
  for (const child of schema.children) {
    if (isKindString(child.kindString) && child.kindString === "Module" && child.name === "main") {
      return child as unknown as ModuleNode;
    }
  }

  throw new Error("Could not find Main module");
};

const getFunctionsFromModule = (mainModule: ModuleNode): FunctionNode[] => {
  return mainModule.children.filter(
    c => isKindString(c.kindString) && c.kindString === "Function"
  ) as unknown as FunctionNode[];
};

const mapSignatures = (signatures: SignatureNode[]): Signature[] => {
  return signatures.map(signature => {
    const parameters = mapParameters(signature.parameters);
    const returnType = mapType(signature.type);
    const shortText = signature.comment?.shortText ?? null;
    const text = signature.comment?.text ?? null;
    const returns = signature.comment?.returns ?? null;

    return {
      parameters,
      returnType,
      shortText,
      text,
      returns
    };
  });
};

const mapParameters = (parameters: ParameterNode[]): Parameter[] => {
  return parameters.map(parameter => {
    const name = parameter.name;
    const shortText = parameter.comment?.shortText ?? null;
    const text = parameter.comment?.text ?? null;
    const type = mapType(parameter.type);
    const isOptional = !!parameter.flags.isOptional;

    return {
      name,
      shortText,
      text,
      type,
      isOptional
    };
  });
};

const mapType = (type: AnyType): Type => {
  if (type.type === "array") {
    return mapArrayType(type as ArrayTypeNode);
  }

  if (type.type === "union") {
    return {
      name: type.types
        .map(mapType)
        .map(t => t.name)
        .join(" | "),
      genericArguments: null,
      isArray: false
    };
  }

  if (type.type === "literal") {
    return {
      name: `"${type.value}"`,
      genericArguments: null,
      isArray: false
    };
  }

  const name = type.name;
  const genericArguments = type.typeArguments?.map(mapType) ?? null;
  const isArray = false;

  return {
    name,
    genericArguments,
    isArray
  };
};

const mapArrayType = (type: ArrayTypeNode): Type => {
  return {
    name: "array",
    genericArguments: [mapType(type.elementType)],
    isArray: true
  };
};
