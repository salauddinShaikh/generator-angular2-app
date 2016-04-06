'use strict';
var generators = require('yeoman-generator'),
    fs = require('fs'),
    _ = require('lodash');

module.exports = generators.Base.extend({
    askForFeatureName: function () {
        var featureFolder = process.cwd() + '/app/';
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'featureName',
            //default: 'core',
            message: 'Which Feature does this Service belongs to?',
            choices: []
        }, {
                type: 'input',
                name: 'serviceName',
                message: 'What is the name of the service ?'
            }];

        // Add Feature choices
        if (fs.existsSync(featureFolder)) {

            fs.readdirSync(featureFolder).forEach(function (folder) {
                var stat = fs.statSync(featureFolder + '/' + folder);

                if (stat.isDirectory()) {
                    prompts[0].choices.push({
                        value: folder,
                        name: folder
                    });
                }
            });
        }

        this.prompt(prompts, function (props) {
            this.featureName = props.featureName;
            this.serviceName = props.serviceName || this.featureName;
            done();
        }.bind(this));
    },

    renderServiceFiles: function () {
        this.fs.copyTpl(
            this.templatePath('_service.ts'),
            this.destinationPath('app/' + this.featureName + '/' + this.serviceName + '.service.ts'),
            {
                serviceName: _.upperFirst(this.serviceName + 'Service')
            }
            );
    }
});