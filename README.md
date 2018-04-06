# dockerfile_validator

A rule based 'linter' for Dockerfiles. The linter rules can be used to check file syntax as well as arbitrary semantic and best practice attributes determined by the rule file writer. The linter can also be used to check LABEL rules against docker images.
It is an [open-source](https://github.com/marquesmps/dockerfile_validator "Open dockerfile_validator on GitHub") extension for [Visual Studio Code](https://code.visualstudio.com), based on [dockerfile_lint](https://github.com/projectatomic/dockerfile_lint)

# Table of Contents

- [Validation Rules](#rules)
- [Preview](#preview)
- [Credits](#credits)
- [License](#license)

# Validation Rules
dockerfile_validator uses the default rule files from [dockerfile_lint](https://github.com/projectatomic/dockerfile_lint#extending-and-customizing-rule-files) are used.

More information [here](https://github.com/projectatomic/dockerfile_lint/blob/master/README.md#extending-and-customizing-rule-files).

# Preview

![import command](/images/dockerfile_validator.gif)

# Credits
The linter is based on https://github.com/projectatomic/dockerfile_lint which is based on https://github.com/aweiteka/dockerfile_checker

# License
MIT