import './styles/router-nav.scss';
import { CRouter, useRouter } from 'lib/router';
import { RouteList } from './RouteList';

export interface RouterNavProps {
    router?: CRouter
    maxDepth?: number
}

export function RouterNav(
    {
        router,
        maxDepth
    }: RouterNavProps
) {
    return <div
        className='router-nav'
    >
        <RouteList
            router={router || useRouter()}
            maxDepth={maxDepth}
        />
    </div>;
}
