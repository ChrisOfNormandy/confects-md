import { getClassName } from '@syren-dev-tech/confects/helpers';
import { HTML_DivProps } from '@syren-dev-tech/confects/types';
import { renderers } from '../helpers/renderers';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownBodyProps = HTML_DivProps & {
    raw: boolean
    markdownContent: string
}

export function MarkdownBody(
    {
        raw,
        markdownContent,
        className
    }: MarkdownBodyProps
) {
    return <div
        className='md-body'
    >
        <div
            className={getClassName('md-content', raw && 'raw', className)}
        >
            {
                raw
                    ? <div>
                        {markdownContent.split(/\n/g).map((line, i) => {
                            if (!line)
                                return <br key={i} />;

                            return <p
                                key={i}
                            >
                                {line}
                            </p>;
                        })}
                    </div>
                    : <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={renderers}
                    >
                        {markdownContent}
                    </Markdown>
            }
        </div>
    </div>;
}