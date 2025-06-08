import { Navigate, Route, RouteProps } from 'react-router-dom';
import { HTML_DivProps } from '@syren-dev-tech/confects/types';
import { CRouterElement } from './CRouterElement';
import { CRouter } from './CRouter';
import React from 'react';

let root: CRouter;

export function useRouter() {
    return root;
}

const nestedRoutes = ([path, subroute]: [string, CRouter], RouteArg: React.ComponentType<RouteProps>) => {
    const nested = subroute.getRoutes();

    console.debug(subroute.getPath());

    if (nested.length === 0) {
        return <RouteArg
            key={path}
            path={subroute.getPath()}
            element={<CRouterElement router={subroute} />}
        />;
    }

    return <RouteArg
        key={path}
        path={subroute.getPath()}
        element={<CRouterElement router={subroute} />}
    >
        {nested.map((r) => nestedRoutes(r, Route))}

        {
            subroute.default &&
            <RouteArg
                path={subroute.getPath('/*')}
                element={<Navigate to={subroute.getPath() + subroute.default} />}
            />
        }
    </RouteArg>;
};

export type MarkdownRouterProps = {
    router: CRouter
} & HTML_DivProps;

export function MarkdownRouter(
    {
        router
    }: MarkdownRouterProps
) {
    root = router;

    return router.root().map((r) => nestedRoutes(r, Route));
}

export function markdownRouter(router: CRouter, RouteArg: React.ComponentType<RouteProps>) {
    root = router;

    return router.root().map((r) => nestedRoutes(r, RouteArg));
}