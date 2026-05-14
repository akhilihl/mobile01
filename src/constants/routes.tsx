// Placeholder route config — add your HCare screen routes here
export interface AppRoute {
  name: string;
  route: string;
  id: number;
}

const routes: AppRoute[] = [
  { name: 'Customers', route: '/customers', id: 1 },
];

export default routes;
