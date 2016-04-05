// 'use strict';
// var generators = require('yeoman-generator');
// 
// module.exports = generators.Base.extend({
//     method1: function () {
//         this.log('Helllooosssssssssssssss')
//     }
// });

'use strict';
var generators = require('yeoman-generator'),
    _ = require('lodash'),
    fs = require('fs'),
    chalk = require('chalk'),
    yosay = require('yosay');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        // this.log('name:',this.name)
    },

    initializing: function () {
        this.log('initializing')
    },
    prompting: function () {
        this.log(yosay('Welcome to ' +
            chalk.yellow('Angular 2 App') + ' generator!'));

        var done = this.async();
        this.prompt([{
            type: 'input',
            name: 'appname',
            message: ' What would you like to call your application? ',
            default: this.config.get('appname') || 'app'
        },
            {
                type: 'list',
                name: 'backendServer',
                message: 'Which Backend server would you like include? ',
                choices: ['NodeJS', 'ASP.NET', 'Nothing']
            },
            {
                type: 'checkbox',
                name: 'jslibs',
                message: 'Which JS libraries would you like to include?',
                choices: [
                    {
                        name: 'lodash',
                        value: 'lodash',
                        checked: true
                    },
                    {
                        name: 'Moment.js',
                        value: 'momentjs',
                        checked: true
                    }
                ]
            }, {
                type: 'list',
                name: "installPackages",
                message: "Run npm install and bower install?",
                choices: ['Yes', 'No']
            }], function (answers) {
                this.config.set('ngappname', answers.appname);
                this.config.save();

                this.appname = answers.appname
                this.includeLodash = _.includes(answers.jslibs, 'lodash');
                this.includeMoment = _.includes(answers.jslibs, 'momentjs');
                this.installPackages = answers.installPackages;
                this.backendServer = answers.backendServer;
                done();
            }.bind(this));
    },
    writing: {

        packageJSON: function () {
            this.copy('_package.json', 'package.json');
        },

        git: function () {
            //this.copy('gitignore', '.gitignore');
            this.composeWith('common', {
                options: {
                    'skip-messages': true,
                    gitignore: true,
                    gitattributes: true,
                    jshintrc: false,
                    editorconfig: false,
                    'test-jshintrc': false
                }
            });
        },

        bower: function () {
            var bowerJson = {
                name: this.appname,
                license: 'MIT',
                dependencies: {}
            };
            bowerJson.dependencies['bootstrap-css-only'] = '~3.3.5';
            if (this.includeLodash) {
                bowerJson.dependencies['lodash'] = '~3.10.1';
            }
            if (this.includeMoment) {
                bowerJson.dependencies['moment'] = '~2.10.6';
            }
            this.fs.writeJSON('bower.json', bowerJson);

        },


        scripts: function () {
            this.fs.copyTpl(
                this.templatePath('app/_main.ts'),
                this.destinationPath('app/main.ts'));
            this.fs.copyTpl(
                this.templatePath('app/home/_home.component.ts'),
                this.destinationPath('app/home/home.component.ts'));
            this.fs.copyTpl(
                this.templatePath('app/about/_about.component.ts'),
                this.destinationPath('app/about/about.component.ts'));
            this.fs.copyTpl(
                this.templatePath('app/_app.component.ts'),
                this.destinationPath('app/app.component.ts'));
            this.fs.copyTpl(
                this.templatePath('app/_routes.ts'),
                this.destinationPath('app/routes.ts'));
            this.fs.copyTpl(
                this.templatePath('_tsconfig.json'),
                this.destinationPath('tsconfig.json'));
            this.fs.copyTpl(
                this.templatePath('_typings.json'),
                this.destinationPath('typings.json'));
        },

        html: function () {

            this.fs.copyTpl(
                this.templatePath('_index.html'),
                this.destinationPath('index.html'), {
                    appname: _.startCase(this.appname)
                });
            this.fs.copyTpl(
                this.templatePath('app/_app.component.html'),
                this.destinationPath('app/app.component.html'), {
                    appname: _.startCase(this.appname)
                });
            this.fs.copy(
                this.templatePath('app/home/_home.component.html'),
                this.destinationPath('app/home/home.component.html'));
            this.fs.copy(
                this.templatePath('app/about/_about.component.html'),
                this.destinationPath('app/about/about.component.html'));
        }
    },
    conflicts: function () {
    },
    install: function () {
        if (this.installPackages === 'Yes') {
            this.installDependencies({
                skipInstall: this.options['skip-install']
            });
        }
    },
    end: function () {
    }
});