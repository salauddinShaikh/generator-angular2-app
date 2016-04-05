'use strict';
var generators = require('yeoman-generator'),
    fs = require('fs'),
    _ = require('lodash'),
    engine = require('ejs').render,
    htmlWiring = require("html-wiring");

module.exports = generators.Base.extend({
    initializing: function () {
    },
    askForName: function () {
        var done = this.async();
        this.prompt([
            {
                type: 'input',
                name: 'featureName',
                message: 'Provide Feature Name:? ',
            }], function (answers) {
                this.name = answers.featureName;
                done();
            }.bind(this));
    },

    createdFile: function () {
        var fileNameFragment = _.camelCase(this.name);

        this.fs.copyTpl(
            this.templatePath('_component.ts'),
            this.destinationPath('app/' + fileNameFragment + '/' + fileNameFragment + '.component.ts'),
            {
                componentName: _.upperFirst(this.name + 'Component'),
                selectorName: fileNameFragment
            });

        this.fs.copyTpl(
            this.templatePath('_component.html'),
            this.destinationPath('app/' + fileNameFragment + '/' + fileNameFragment + '.component.html'),
            {
                componentName: _.upperFirst(this.name + 'Component'),
            });
    },
    addRoute: function () {
        var features = []
        var featureFolder = process.cwd() + '/app/';
        if (fs.existsSync(featureFolder)) {
            fs.readdirSync(featureFolder).forEach(function (folder) {
                var stat = fs.statSync(featureFolder + '/' + folder);
                if (stat.isDirectory()) {
                    features.push({
                        name: folder,
                        component: _.upperFirst(folder)
                    });
                }
            });
        }
        var fileNameFragment = _.camelCase(this.name);
        features.push({
            name: fileNameFragment,
            component: _.upperFirst(fileNameFragment )
        });
        this.fs.copyTpl(
            this.templatePath('_routes.ts'),
            this.destinationPath('app/routes.ts'),{
                features:features
            });
    }
});