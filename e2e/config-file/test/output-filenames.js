// Usually the output file names are randomly generated in the test to ensure they
// do not clash when running in parallel. But when passing args in via the config files, this
// cannot be done - because the file name must be defined in said config file (ie before
// the test starts execution).
//
// This file MUST be .js so we can import it straight into the relevant .js config files.
//
// We define them here so uniqueness is easier to maintain.
module.exports = {
  InputsOutputConfig: "inputs-output-config-output.txt",
  ReplacementConfig: "replacement-config-output.txt",
  AppendConfig: "append-config-output.txt",
  ExcludeConfig: "exclude-config-output.txt",
};
