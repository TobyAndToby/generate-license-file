const kindStrings = {
  Module: null,
  Interface: null,
  Property: null,
  Function: null,
  "Call signature": null,
  "Type alias": null
};
type KindString = keyof typeof kindStrings;

export const isKindString = (input: string): input is KindString => {
  return typeof input === "string" && kindStrings[input as KindString] !== undefined;
};

type BaseNode = {
  name: string;
  flags: {
    isOptional?: boolean;
  };
};

export type TopLevelNode = BaseNode & {
  children: ModuleNode[];
};

export type ModuleNode = BaseNode &
  ParentNode & {
    kindString: "Module";
    children: (InterfaceNode | FunctionNode | TypeAliasNode)[];
    sources: Source[];
  };

export type FunctionNode = BaseNode & {
  kindString: "Function";
  sources: Source[];
  signatures: SignatureNode[];
};

export type SignatureNode = BaseNode & {
  kindString: "Call signature";
  comment?: Comment;
  parameters: ParameterNode[];
  type: AnyType;
};

export type ParameterNode = BaseNode & {
  kindString: "Parameter";
  comment?: Comment;
  type: AnyType;
};

export type TypeAliasNode = BaseNode & {
  kindString: "Type alias";
  comment?: Comment;
  sources: Source[];
  type: AnyType;
};

export type InterfaceNode = BaseNode & {
  kindString: "Interface";
  children?: PropertyNode[];
};

export type PropertyNode = BaseNode & {
  kindString: "Property";
  comment?: Comment;
  sources: Source[];
  type: AnyType;
};

////---------

export type BaseTypeNode = {
  name: string;
  typeArguments?: AnyType[];
};

export type AnyType =
  | IntrinsicTypeNode
  | ReferenceTypeNode
  | LiteralTypeNode
  | UnionTypeNode
  | ArrayTypeNode;

const types = {
  intrinsic: null,
  reference: null,
  literal: null,
  union: null,
  array: null
};
type Type = keyof typeof types;

export const isType = (input: string): input is Type => {
  return typeof input === "string" && types[input as Type] !== undefined;
};

export type IntrinsicTypeNode = BaseTypeNode & {
  type: "intrinsic";
};

export type ReferenceTypeNode = BaseTypeNode & {
  type: "reference";
  id: number;
};

export type LiteralTypeNode = BaseTypeNode & {
  type: "literal";
  value: string;
};

export type UnionTypeNode = BaseTypeNode & {
  type: "union";
  types: AnyType[];
};

export type ArrayTypeNode = BaseTypeNode & {
  type: "array";
  elementType: AnyType;
};

////---------

export interface Comment {
  shortText?: string;
  text?: string;
  tags?: Tag[];
  returns?: string;
}

export interface Tag {
  tag: "example";
  text: string;
}

export interface Source {
  fileName: string;
  line: number;
  character: number;
}
