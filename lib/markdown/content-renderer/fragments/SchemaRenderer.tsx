import { ContentBlock, ContentDivider, ContentGroup, ContentList, ContentListItem, ContentTileGroup, ContentTileGroupProps, ContentTileProps } from '@chrisofnormandy/confects/containers';
import { ContentLayoutSchema, isContentGroupSchema, isContentListSchema, isContentTileGroupSchema } from '../content/types';
import { RenderContent } from './RenderContent';

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

                return <ContentBlock>
                    {
                        blockSchema.content.map((blockContent, bC) => {
                            console.log('to define:', bC, blockContent);

                            if (blockContent === null)
                                return <ContentDivider />;

                            if (isContentTileGroupSchema(blockContent)) {
                                console.log('tile group', blockContent.tiles.content);

                                return <ContentTileGroup
                                    key={bC}
                                    tiles={blockContent.tiles.content as ContentTileProps[]}
                                    {...blockContent.tiles.options as ContentTileGroupProps | undefined}
                                />;
                            }

                            if (isContentGroupSchema(blockContent)) {
                                console.log('is group');

                                return <ContentGroup
                                    key={bC}
                                >
                                    {
                                        blockContent.group.map((groupContent, gC) => {
                                            console.log('group', gC, groupContent);

                                            return <RenderContent
                                                key={gC}
                                                schema={groupContent}
                                            />;
                                        })
                                    }
                                </ContentGroup>;
                            }

                            if (isContentListSchema(blockContent)) {
                                console.log('list');

                                return <ContentList
                                    key={bC}
                                >
                                    {
                                        blockContent.list.map((listContent, lC) => {
                                            console.log('list', lC, listContent);

                                            return <ContentListItem
                                                key={lC}
                                            >
                                                {
                                                    listContent.content.map((listContentItem, lCI) => {
                                                        console.log('list item', lCI, listContent);

                                                        return <RenderContent
                                                            key={lCI}
                                                            schema={listContentItem}
                                                        />;
                                                    })
                                                }

                                            </ContentListItem>;
                                        })
                                    }
                                </ContentList>;
                            }

                            console.log('unknown content', blockContent);

                            return <RenderContent
                                key={bC}
                                schema={blockContent}
                            />;
                        })
                    }
                </ContentBlock>;
            })
        }
    </>;
}
