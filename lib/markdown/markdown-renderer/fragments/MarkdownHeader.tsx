import { Button, Glyph } from '@chrisofnormandy/confects/buttons';
import { Dispatch } from 'react';
import { downloadContent, openInNewTab, getClassName } from '@chrisofnormandy/confects/helpers';
import { HTML_DivProps } from '@chrisofnormandy/confects/types';

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

        {
            (
                features.print ||
                features.download
            ) &&
            <div
                className='file-controls'
            >
                {
                    content &&
                    features.print &&
                    <Glyph
                        className='f-trinary'
                        icon='printer'
                        onClick={() => openInNewTab(content)}
                        title='Open in new tab'
                    />
                }

                {
                    content &&
                    features.download &&
                    <Glyph
                        className='f-trinary'
                        icon='download'
                        onClick={() => downloadContent(content)}
                        title='Download as text file'
                    />
                }
            </div>
        }
    </div>;
}