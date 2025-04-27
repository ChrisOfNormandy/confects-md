interface ContentMarkdownSchema {
    href: string
}

interface ContentImageSchema {
    image: {
        src: string
    }
    caption?: string
}

interface ContentTextSchema {
    text: string
}

interface ContentTileGroupOptions {
    perRow?: number
}

export interface ContentSchema {
    content: ContentMarkdownSchema | ContentImageSchema | ContentTextSchema
}

interface ContentGroupSchema {
    group: ContentSchema[]
}

interface ContentListItemSchema {
    content: ContentSchema[]
}

interface ContentListSchema {
    list: ContentListItemSchema[]
}

interface ContentTileSchema {
    figure?: {
        image: ContentImageSchema
        caption?: ContentSchema
    }
}

interface ContentTileGroupSchema {
    tiles: {
        options: ContentTileGroupOptions
        content: ContentTileSchema[]
    }
}

interface ContentBlockSchema {
    content: (ContentSchema | ContentListSchema | ContentGroupSchema | ContentTileGroupSchema | null)[]
}

export interface ContentLayoutSchema {
    title?: string
    layout: ContentBlockSchema[]
}

/*
 * Export function isContentSchema(obj: unknown): obj is ContentSchema {
 *     return 'content' in (obj as ContentSchema);
 * }
 */

export function isContentMarkdownSchema(obj: unknown): obj is ContentMarkdownSchema {
    return 'href' in (obj as ContentMarkdownSchema);
}

export function isContentImageSchema(obj: unknown): obj is ContentImageSchema {
    return 'image' in (obj as ContentImageSchema);
}

/*
 * Export function isContentTextSchema(obj: unknown): obj is ContentTextSchema {
 *     return 'text' in (obj as ContentTextSchema);
 * }
 */

export function isContentListSchema(obj: unknown): obj is ContentListSchema {
    return 'list' in (obj as ContentListSchema);
}

/*
 * Export function isContentListItemSchema(obj: unknown): obj is ContentListItemSchema {
 *     return 'content' in (obj as ContentListItemSchema) && isContentImageSchema((obj as ContentListItemSchema).content)
 * }
 */

export function isContentGroupSchema(obj: unknown): obj is ContentGroupSchema {
    return 'group' in (obj as ContentGroupSchema);
}

export function isContentTileGroupSchema(obj: unknown): obj is ContentTileGroupSchema {
    return 'tiles' in (obj as ContentTileGroupSchema);
}