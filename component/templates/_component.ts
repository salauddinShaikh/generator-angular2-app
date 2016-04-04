import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: '<%= componentName %>',
    <%-template %>,
    directives: [ROUTER_DIRECTIVES]
})
export class <%= componentName %> {}