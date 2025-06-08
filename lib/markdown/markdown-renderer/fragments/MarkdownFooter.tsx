import { HTML_DivProps } from '@syren-dev-tech/confects/types';
import { MarkdownFeatureFlags } from 'lib/markdown';

export type MarkdownFooterProps = {
    features?: MarkdownFeatureFlags
} & HTML_DivProps;

export function MarkdownFooter(
    {
        features,
        ...props
    }: MarkdownFooterProps
) {
    if (features?.bodyOnly)
        return null;

    return <div
        className='md-footer f-secondary'
        {...props}
    >

    </div>;
}