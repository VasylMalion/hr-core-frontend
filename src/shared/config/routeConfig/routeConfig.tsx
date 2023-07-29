import { MainPage } from "pages/Main"
import { RouteProps } from "react-router-dom"

export enum  AppRoutes {
  MAIN_PAGE = 'MAIN_PAGE'
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.MAIN_PAGE]: '/'
}

export const routeConfig: Array<RouteProps> = [
  {
    path: RoutePaths.MAIN_PAGE,
    element: <MainPage />
  }
]