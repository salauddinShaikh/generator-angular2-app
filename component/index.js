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
            message: 'Which Feature does this Component belongs to?',
            choices: []
        }, {
                type: 'input',
                name: 'componentName',
                message: 'What is the name of the component ?'
            },
            {
                type: 'list',
                name: 'templateConfirmation',
                message: 'Would you like to add template file for this component ?',
                choices: ['Yes', 'No']
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
            this.componentName = props.componentName || this.featureName;
            this.templateConfirmation = props.templateConfirmation;
            done();
        }.bind(this));
    },

    renderComponentFiles: function () {
        if(this.templateConfirmation=='Yes'){
            this.template="templateUrl:'app/" + this.featureName + "/" + this.componentName + ".component.html'";
            this.fs.copyTpl(
            this.templatePath('_component.html'),
            this.destinationPath('app/' + this.featureName + '/' + this.componentName + '.component.html'),
            {
                componentName: _.upperFirst(this.componentName + 'Component'),
            }
            );
        }
        else{
               this.template="template:'<h1>Hiiii</h1>'";
        }
        
        this.fs.copyTpl(
            this.templatePath('_component.ts'),
            this.destinationPath('app/' + this.featureName + '/' + this.componentName + '.component.ts'),
            {
                componentName: _.upperFirst(this.componentName + 'Component'),
                selectorName: _.camelCase(this.componentName),
                 template:this.template
            }
            );
    }
});