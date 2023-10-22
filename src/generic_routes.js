/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Icons from "views/examples/Icons.js";
import Generic_Tables from "views/examples/Generic_Tables";
import Create_Generic_Tables from "views/examples/Create_Generic_Tables";
import Generic_Index from "views/Generic_Index";

var generic_routes = [
  // {
  //   path: "/generic/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: <Generic_Index/>,
  //   layout: "/admin",
  // },
  // {
  //   path: "/generic/tables",
  //   name: "Filter/Add generic data",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Generic_Tables />,
  //   layout: "/admin",
  // },
  {
    path: "/generic/new_tables",
    name: "Create Your Own Chart",
    icon: "ni ni-chart-bar-32",
    component: <Create_Generic_Tables />,
    layout: "/admin",
  },
  // {
  //   path: "/generic/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
];
export default generic_routes;
