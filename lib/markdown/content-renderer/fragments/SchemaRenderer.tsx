import { ContentBlock } from '@chrisofnormandy/confects/containers';
import { ContentLayoutSchema } from '../content/types';
import { uniqueId } from '@chrisofnormandy/confects/helpers';
import BlockContent from './BlockContent';

export
    function SchemaRenderer(
        {
            schema
        }: { schema: ContentLayoutSchema }
    ) {
    return <>
        {
            schema.title &&
            <title>
                {schema.title}
            </title>
        }

        {
            schema.layout.map((blockSchema, bS) => {
                console.log('block content', bS, blockSchema);

                return <ContentBlock
                    key={uniqueId('bc:')}
                >
                    {
                        blockSchema.content.map((blockContent) => {
                            return <BlockContent
                                key={uniqueId('block:')}
                                content={blockContent}
                            />;
                        })
                    }
                </ContentBlock>;
            })
        }
    </>;
}
