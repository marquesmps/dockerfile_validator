# Change Log
All notable changes to the "dockerfile-validator" extension will be documented in this file.

## [1.0.0]
- Using a new default rule file to fix the issue https://github.com/projectatomic/dockerfile_lint/issues/92. It is the previous rule file with this issue fixed.
- Fixed description in the Debug console for validation rules that had no line details to point to, and details were showing as "undefined" (like missing instructions)
- Allow users to choose the rules file by setting "dockerfile-validator.rulefile.path". If none is set, or. fie does not exist or is invalid, the default rules file is used.
- Ugrade dependency packages. Security issues fixed:
    -[CVE-2018-3728] (https://nvd.nist.gov/vuln/detail/CVE-2018-3728)

## [1.1.0]
- Ugrade dependency packages. Security issues fixed:
    -[CVE-2018-16487] (https://nvd.nist.gov/vuln/detail/CVE-2018-16487)
    -[CVE-2018-16492] (https://nvd.nist.gov/vuln/detail/CVE-2018-16492)
    -[CVE-2018-16491] (https://nvd.nist.gov/vuln/detail/CVE-2018-16491)