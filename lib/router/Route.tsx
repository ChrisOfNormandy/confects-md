import { CRouter } from 'lib/router';
import { RouteList } from './RouteList';

export interface IRouteProps {
    router: CRouter
    maxDepth?: number
    __depth?: number
}

export function Route(
    {
        router,
        maxDepth,
        __depth = 0
    }: IRouteProps
) {
    if (__depth === maxDepth)
        return null;

    if (!router.path) {
        return <RouteList
            router={router}
            maxDepth={maxDepth}
            __depth={__depth + 1}
        />;
    }

    return <div
        className='router-nav-link'
    >
        <a
            href={router.getPath()}
        >
            {router.path.slice(1).split(/[-_]/g)
                .map((s) => s[0]?.toUpperCase() + s.slice(1))
                .join(' ')}
        </a>

        <RouteList
            router={router}
            maxDepth={maxDepth}
            __depth={__depth + 1}
        />
    </div>;
}
