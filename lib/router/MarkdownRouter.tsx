import { Navigate, Route, RouteProps } from 'react-router-dom';
import { HTML_DivProps } from '@chrisofnormandy/confects/types';
import { CRouterElement } from './CRouterElement';
import { CRouter } from './CRouter';
import React from 'react';

let root: CRouter;

export function useRouter() {
    return root;
}

const nestedRoutes = ([path, subroute]: [string, CRouter], Route: React.ComponentType<RouteProps>) => {
    const nested = subroute.getRoutes();

    console.debug(subroute.getPath());

    if (nested.length === 0) {
        return <Route
            key={path}
            path={subroute.getPath()}
            element={<CRouterElement router={subroute} />}
        />;
    }

    return <Route
        key={path}
        path={subroute.getPath()}
        element={<CRouterElement router={subroute} />}
    >
        {nested.map((r) => nestedRoutes(r, Route))}

        {
            subroute.default &&
            <Route
                path={subroute.getPath('/*')}
                element={<Navigate to={subroute.getPath() + subroute.default} />}
            />
        }
    </Route>;
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

export function markdownRouter(router: CRouter, Route: React.ComponentType<RouteProps>) {
    root = router;

    return router.root().map((r) => nestedRoutes(r, Route));
}