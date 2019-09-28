import Routes from './Routes';

class MainRoutes extends Routes {
  getPrefix(): string {
    return '/api/v1';
  }
}

export default MainRoutes;
