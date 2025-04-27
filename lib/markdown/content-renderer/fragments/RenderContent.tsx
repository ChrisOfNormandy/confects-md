import { Content } from '@chrisofnormandy/confects/containers';
import { ContentSchema, isContentImageSchema, isContentMarkdownSchema } from '../content/types';
import { MarkdownRenderer } from 'lib/markdown';

export
    function RenderContent(
        {
            schema
        }: { schema: ContentSchema }
    ) {

    console.log('render content:', schema);

    const { content } = schema;

    if (!content) {
        console.warn(schema);

        return <div>UNDEFINED</div>;
    }

    if (isContentMarkdownSchema(content)) {
        return <Content>
            <MarkdownRenderer
                href={content.href}
                features={
                    {
                        bodyOnly: true
                    }
                }
            />
        </Content>;
    }

    if (isContentImageSchema(content)) {
        return <Content>
            <figure>
                <img
                    src={content.image.src}
                />

                {
                    content.caption &&
                    <figcaption>
                        {content.caption}
                    </figcaption>
                }
            </figure>
        </Content>;
    }

    return <Content>
        {content.text}
    </Content>;
}