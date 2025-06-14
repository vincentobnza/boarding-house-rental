import { tenantRoutes } from "./tenant.routes";
import { globalRoutes } from "./global.routes";
import { landlordRoutes } from "./landlord.routes";
import { adminRoutes } from "./admin.routes";
// Combined routes for easy import
const allRoutes = [
  ...globalRoutes,
  ...tenantRoutes,
  ...landlordRoutes,
  ...adminRoutes,
];
export default allRoutes;
