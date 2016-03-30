import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import 'rxjs/Rx'; 

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@Component({
    selector: 'my-app',
    templateUrl: 'src/client/app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
    { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/about', name: 'About', component: AboutComponent }
])
export class AppComponent { }
