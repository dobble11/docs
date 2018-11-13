'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the superb ${chalk.red('generator-yeoman')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'Your project name',
        default: this.appname
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
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};
