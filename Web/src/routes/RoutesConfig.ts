import authRoutes from 'models/routeConfigs/authRoutes'

export default () => {
  const routes = [...authRoutes];

  return routes;
};
