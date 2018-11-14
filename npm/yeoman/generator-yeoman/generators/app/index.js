'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    // 打印欢迎语
    this.log(
      yosay(`Welcome to the shining ${chalk.cyan('generator-yeoman-demo')} generator!`)
    );
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the superb ${chalk.red('generator-yeoman')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'Your project name',
        default: 'test_demo'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your project description',
        default: 'test des'
      },
      {
        type: 'input',
        name: 'author',
        message: 'author',
        default: this.user.git.name()
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'author email',
        default: this.user.git.email()
      },
      {
        type: 'confirm',
        name: 'lint',
        message: 'Use ESLint to lint your code?'
      },
      {
        name: 'ESlintStyle',
        type: 'list',
        message: 'Pick an ESLint preset',
        when(answers) {
          return answers.lint;
        },
        choices: [
          {
            name: 'Airbnb (https://github.com/airbnb/javascript)',
            value: 'airbnb',
            short: 'Airbnb'
          },
          {
            name: 'Standard (https://github.com/feross/standard)',
            value: 'standard',
            short: 'Standard'
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.log(chalk.red('this.props: ', this.props.appName));
      this.log(chalk.green('name: ', this.props.appName));
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('intellif-demo'),
      this.destinationPath(this.props.appName)
    );
    const currPackage = this.fs.readJSON(
      this.destinationPath(this.props.appName + '/package.json'),
      {}
    );
    currPackage.name = this.props.appName;
    currPackage.author = this.props.author;
    currPackage.description = this.props.description;
    this.fs.writeJSON(
      this.destinationPath(this.props.appName + '/package.json'),
      currPackage
    );
  }

  install() {
    this.installDependencies();
  }

  end() {
    this.fs.delete('.yo-rc.json'); // 删除无用的文件
    this.log(chalk.green('Construction completed!'));
  }
};
