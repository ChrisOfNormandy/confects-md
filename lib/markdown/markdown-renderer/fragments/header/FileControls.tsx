import { downloadContent, openInNewTab } from '@chrisofnormandy/confects/helpers';
import { Glyph } from '@chrisofnormandy/confects/buttons';
import { HTML_DivProps } from '@chrisofnormandy/confects/types';
import { MarkdownFeatureFlags } from '../MarkdownHeader';

type FileControlsProps = {
    content?: string
    features: MarkdownFeatureFlags
} & HTML_DivProps

export function FileControls(
    {
        content,
        features,
        ...props
    }: FileControlsProps
) {
    if (!content || !(features.print || features.download))
        return null;

    return <div
        className='file-controls'
        {...props}
    >
        {
            features.print &&
            <Glyph
                className='f-trinary'
                icon='printer'
                onClick={() => openInNewTab(content)}
                title='Open in new tab'
            />
        }

        {
            features.download &&
            <Glyph
                className='f-trinary'
                icon='download'
                onClick={() => downloadContent(content)}
                title='Download as text file'
            />
        }
    </div>;
}