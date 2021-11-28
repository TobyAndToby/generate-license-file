export interface IArguments {
  input: string;
  output: string;
  overwriteOutput: boolean | undefined;
  eol: "windows" | "posix" | undefined;
}
