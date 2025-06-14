import { tenantRoutes } from "./tenant.routes";
import { globalRoutes } from "./global.routes";
import { landlordRoutes } from "./landlord.routes";

// Combined routes for easy import
const allRoutes = [...globalRoutes, ...tenantRoutes, ...landlordRoutes];
export default allRoutes;
