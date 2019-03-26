# dockerfile_validator (v1.2.0)

A rule based 'linter' for Dockerfiles. The linter rules can be used to check file syntax as well as arbitrary semantic and best practice attributes determined by the rule file writer. The linter can also be used to check LABEL rules against docker images.
It is an [open-source](https://github.com/marquesmps/dockerfile_validator "Open dockerfile_validator on GitHub") extension for [Visual Studio Code](https://code.visualstudio.com), based on [dockerfile_lint](https://github.com/projectatomic/dockerfile_lint)

# Table of Contents

- [Validation Rules](#rules)
- [Preview](#preview)
- [Credits](#credits)
- [License](#license)

# Validation Rules
dockerfile_validator uses [this](https://github.com/marquesmps/dockerfile_validator/tree/develop/src/rule_files/default_rules.yaml) default rule file.

Custom rule files can be provided by editing the User Setting **"dockerfile-validator.rulefile.path"** in VS Code. The value for that configuration should contain the path to the yaml rule file, if the file does not exist, or if it is invalid, it will use the [default rule file] (https://github.com/marquesmps/dockerfile_validator/tree/develop/src/rule_files/default_rules.yaml).

>Information on how to customize rule files [here](https://github.com/projectatomic/dockerfile_lint/blob/master/README.md#extending-and-customizing-rule-files).

# Preview

![import command](/images/dockerfile_validator.gif)

# Credits
The linter is based on https://github.com/projectatomic/dockerfile_lint which is based on https://github.com/aweiteka/dockerfile_checker

# License
MIT