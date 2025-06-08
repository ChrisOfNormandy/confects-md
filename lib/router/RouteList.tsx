import { getClassName } from '@syren-dev-tech/confects/helpers';
import { IRouteProps, Route } from './Route';

export function RouteList(
    {
        router,
        maxDepth,
        __depth = 0
    }: IRouteProps
) {
    if (!router)
        return null;

    const routes = router.getRoutes();

    if (!routes.length || __depth === maxDepth)
        return null;

    return <ul
        className={getClassName('router-nav-list', !!__depth && 'f-content')}
    >
        {
            routes.map(([path, route]) => {
                return <li
                    key={path}
                    className='router-nav-item'
                >
                    <Route
                        router={route}
                        maxDepth={maxDepth}
                        __depth={__depth}
                    />
                </li>;
            })
        }
    </ul>;
}