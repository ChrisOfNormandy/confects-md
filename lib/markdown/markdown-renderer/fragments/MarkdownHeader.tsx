import { Button } from '@syren-dev-tech/confects/buttons';
import { Dispatch } from 'react';
import { FileControls } from './header/FileControls';
import { getClassName } from '@syren-dev-tech/confects/helpers';
import { HTML_DivProps } from '@syren-dev-tech/confects/types';

export interface MarkdownFeatureFlags {
    bodyOnly?: boolean
    download?: boolean
    print?: boolean
    reload?: boolean
    renderToggle?: boolean
}

export type MarkdownHeaderProps = {
    content?: string
    features: MarkdownFeatureFlags
    raw: boolean
    reload?: () => Promise<void>
    showRaw: Dispatch<boolean>
} & HTML_DivProps

export function MarkdownHeader(
    {
        content,
        features,
        raw,
        reload,
        showRaw,
        ...props
    }: MarkdownHeaderProps
) {
    if (features.bodyOnly)
        return null;

    return <div
        className='md-header f-primary'
        {...props}
    >
        {
            reload &&
            features.reload &&
            <Button
                className='f-trinary'
                onClick={reload}
            >
                Reload
            </Button>
        }

        {
            features.renderToggle &&
            <div
                className='render-controls'
            >
                <Button
                    onClick={() => showRaw(false)}
                    className={getClassName('show-pretty f-trinary', raw && 'l2-f' || 'd2-f')}
                >
                    Pretty
                </Button>

                <Button
                    onClick={() => showRaw(true)}
                    className={getClassName('show-raw f-trinary', !raw && 'l2-f' || 'd2-f')}
                >
                    Raw
                </Button>
            </div>
        }

        <FileControls
            content={content}
            features={features}
        />
    </div>;
}