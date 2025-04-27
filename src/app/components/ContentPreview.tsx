import { Content, ContentBlock, ContentDivider, ContentGroup, ContentList, ContentListItem, ContentTileGroup } from 'lib/containers';

export default function ContentPreview() {
    return <div>
        <ContentBlock>
            <Content>
                This would be a piece of text content.
            </Content>

            <Content>
                <img src='https://picsum.photos/200/300' />
            </Content>
        </ContentBlock>

        <ContentBlock>
            <ContentList>
                <ContentListItem>
                    This is a row of content.
                </ContentListItem>

                <ContentListItem>
                    This is a second row of content.
                </ContentListItem>
            </ContentList>
        </ContentBlock>

        <ContentBlock>
            <ContentGroup>
                <Content>
                    This would be a piece of text content.
                </Content>

                <Content>
                    This would be a piece of text content.
                </Content>

                <Content>
                    This would be a piece of text content.
                </Content>
            </ContentGroup>
        </ContentBlock>

        <ContentDivider />

        <ContentBlock>
            <ContentTileGroup
                tiles={
                    [
                        {
                            figure: {
                                image: 'https://picsum.photos/200/200'
                            }
                        },
                        {
                            figure: {
                                image: 'https://picsum.photos/200/200'
                            }
                        },
                        {
                            figure: {
                                image: 'https://picsum.photos/200/200'
                            }
                        },
                        {
                            figure: {
                                image: 'https://picsum.photos/200/200'
                            }
                        },
                        {
                            figure: {
                                image: 'https://picsum.photos/200/200'
                            }
                        }
                    ]
                }
            >

            </ContentTileGroup>
        </ContentBlock>
    </div>;
}