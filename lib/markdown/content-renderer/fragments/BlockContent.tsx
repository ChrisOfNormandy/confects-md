import { ContentDivider, ContentGroup, ContentList, ContentListItem, ContentTileGroup, ContentTileGroupProps, ContentTileProps } from '@chrisofnormandy/confects/containers';
import { BlockContentType, isContentGroupSchema, isContentListSchema, isContentTileGroupSchema } from '../content/types';
import { uniqueId } from '@chrisofnormandy/confects/helpers';
import { RenderContent } from './RenderContent';

interface BlockContentProps {
    content: BlockContentType
}

export default function BlockContent(
    {
        content
    }: BlockContentProps) {
    console.log('to define:', content);

    if (content === null) {
        return <ContentDivider
            key={uniqueId('divider:')}
        />;
    }

    if (isContentTileGroupSchema(content)) {
        console.log('tile group', content.tiles.content);

        return <ContentTileGroup
            key={uniqueId('tile-group:')}
            tiles={content.tiles.content as ContentTileProps[]}
            {...content.tiles.options as ContentTileGroupProps | undefined}
        />;
    }

    if (isContentGroupSchema(content)) {
        console.log('is group');

        return <ContentGroup
            key={uniqueId('content-group:')}
        >
            {
                content.group.map((groupContent, gC) => {
                    console.log('group', gC, groupContent);

                    return <RenderContent
                        key={uniqueId('group:')}
                        schema={groupContent}
                    />;
                })
            }
        </ContentGroup>;
    }

    if (isContentListSchema(content)) {
        console.log('list');

        return <ContentList
            key={uniqueId('content-list:')}
        >
            {
                content.list.map((listContent, lC) => {
                    console.log('list', lC, listContent);

                    return <ContentListItem
                        key={uniqueId('list-item:')}
                    >
                        {
                            listContent.content.map((listContentItem, lCI) => {
                                console.log('list item', lCI, listContent);

                                return <RenderContent
                                    key={uniqueId('lci:')}
                                    schema={listContentItem}
                                />;
                            })
                        }

                    </ContentListItem>;
                })
            }
        </ContentList>;
    }

    console.log('unknown content', content);

    return <RenderContent
        key={uniqueId('unknown:')}
        schema={content}
    />;
}