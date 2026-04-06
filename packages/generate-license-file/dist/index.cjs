Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_getLicenseFileText = require('./lib/getLicenseFileText.cjs');
const require_generateLicenseFile = require('./lib/generateLicenseFile.cjs');
const require_getProjectLicenses = require('./lib/getProjectLicenses.cjs');

exports.generateLicenseFile = require_generateLicenseFile.generateLicenseFile;
exports.getLicenseFileText = require_getLicenseFileText.getLicenseFileText;
exports.getProjectLicenses = require_getProjectLicenses.getProjectLicenses;