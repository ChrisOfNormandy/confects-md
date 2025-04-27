import { ContentRenderer, MarkdownRenderer } from 'lib/markdown';
import { RouterNav } from './RouterNav';
import { CRouter } from './CRouter';

interface CRouterElementProps {
    router: CRouter
}

export function CRouterElement(
    {
        router
    }: CRouterElementProps
) {
    console.debug(router);

    if (router.markdown) {
        console.debug('RENDER MARKDOWN', router.markdown);

        return <>
            {router.element && router.element()}

            <MarkdownRenderer
                href={router.markdown.href}
                features={router.markdown.features}
            />
        </>;
    }

    if (router.content) {
        console.debug('RENDER CONTENT', router.content);

        return <>
            {router.element && router.element()}

            <ContentRenderer
                href={router.content.href}
            />
        </>;
    }

    if (router.doRenderNav()) {
        console.debug('RENDER NAVIGATION', ...router.getRoutes());

        return <>
            <RouterNav
                router={router}
                maxDepth={1}
            />

            {router.element && router.element()}
        </>;
    }

    console.debug('RENDER DEFAULT');

    return router.element && router.element();
}