import {Component} from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
    selector: 'about',
    templateUrl: 'app/about/about.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AboutComponent { }