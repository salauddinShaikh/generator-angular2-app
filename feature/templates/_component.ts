import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: '<%= selectorName %>',
    templateUrl: 'app/<%= selectorName %>/<%= selectorName %>.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class <%= componentName %> { }