<% for(var i = 0; i < features.length; i++) {%>import { <%=features[i].component %>Component } from './<%=features[i].name%>/<%=features[i].name%>.component';<%}%>
interface Route {
    path: string,
    name: string,
    component: any,
}
export const Routes: Route[] = [
    <% for(var i = 0; i < features.length; i++) {%>{ path: '/<%=features[i].name%>', name: '<%=features[i].component%>', component: <%=features[i].component%>Component }, <%}%>
];