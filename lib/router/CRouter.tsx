import { MarkdownFeatureFlags } from 'lib/markdown';
import { JSX } from 'react';

interface MarkdownDefinition {
    href: string
    features?: MarkdownFeatureFlags
}

interface ContentDefinition {
    href: string
}

interface IRouter {
    path: string
    routes?: IRouter[]
    default?: string;
    noNav?: boolean;

    markdown?: MarkdownDefinition
    content?: ContentDefinition
}

export class CRouter {
    readonly default?: string;

    // eslint-disable-next-line no-use-before-define
    readonly parent?: CRouter;

    readonly path: string;

    readonly noNav: boolean;

    readonly markdown?: MarkdownDefinition;

    readonly content?: ContentDefinition;

    private readonly routes = new Map<string, CRouter>();

    element?: () => JSX.Element;

    setElement(element: () => JSX.Element) {
        this.element = element;

        return this;
    }

    setPathElement(path: string, element: () => JSX.Element) {
        const p = this.getPath();

        if (p === path)
            this.setElement(element);
        else {
            this.routes.forEach((router) => {
                router.setPathElement(path, element);
            });
        }
    }

    getRoutes() {
        return Array.from(this.routes);
    }

    getPath(...paths: string[]): string {
        if (!this.parent) {
            if (paths.length)
                return this.path + paths.join('/');

            return this.path;
        }

        const path = this.parent.getPath(this.path);

        if (paths.length)
            return path + paths.join('/');

        return path;
    }

    doRenderNav() {
        return !this.noNav && this.routes.size > 0;
    }

    private addRoute(router: IRouter) {
        this.routes.set(router.path, new CRouter(router, this));
    }

    root() {
        if (this.parent)
            throw new Error('Cannot use root routing for routers with parents.');

        const list: [string, CRouter][] = [[this.path, this]];

        return list;
    }

    constructor(router: IRouter, parent?: CRouter) {
        this.content = router.content;
        this.default = router.default;
        this.markdown = router.markdown;
        this.path = router.path;
        this.noNav = !!router.noNav;

        if (router.routes)
            router.routes.forEach((route) => this.addRoute(route));

        this.parent = parent;

        console.debug('new router', parent && 'with parent' || '');
    }
}