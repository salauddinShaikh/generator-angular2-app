import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

interface Route {
    path: string,
    name: string,
    component: any,
}


export const Routes: Route[] = [
   { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
   { path: '/about', name: 'About', component: AboutComponent },
];