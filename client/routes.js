"use strict";
var router_1 = require('@angular/router');
exports.routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, { useHash: true });
//# sourceMappingURL=routes.js.map