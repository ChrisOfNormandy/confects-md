import { HTMLElementProps } from '@chrisofnormandy/confects/types';
import { TableOfContents } from 'lib/markdown';
import { ReactNode } from 'react';

interface Processor {
    element: (m: RegExpMatchArray) => ReactNode,
    pattern: RegExp
}

/*
 *Highlight:      ||text||
 *Superscript:    ^text^
 *Subscript:      ~text^
 */

const HIGHLIGHT_SYNTAX = /\|\|(.*)\|\|/;
const SUPERSCRIPT_SYNTAX = /[^^]\^([^^]*)\^/;
const SUBSCRIPT_SYNTAX = /~([^^]*)\^/;
const STYLE_SYNTAX = /%\((.+)\)(.*)%/;
const TOC_SYNTAX = /\[TOC\]/;

const HIGHLIGHT_PROCESS: Processor = {
    element: (m) => {
        return <span
            className='highlight f-primary'
        >
            {m[1]}
        </span>;
    },
    pattern: HIGHLIGHT_SYNTAX
};

const SUPERSCRIPT_PROCESS: Processor = {
    element: (m) => {
        return <sup>
            {m[1]}
        </sup>;
    },
    pattern: SUPERSCRIPT_SYNTAX
};

const SUBSCRIPT_PROCESS: Processor = {
    element: (m) => {
        return <sub>
            {m[1]}
        </sub>;
    },
    pattern: SUBSCRIPT_SYNTAX
};

function getAppliedStyles(tag: string, value: ReactNode) {
    const tagArr = tag.split(/;/g);
    const tags: HTMLElementProps = {};

    tagArr.forEach((tag) => {
        const [key, value] = tag.split('=');
        if (key === undefined || value === undefined)
            return;

        switch (key) {
            case 'class': {
                tags.className = value;
                break;
            }
            case 'style': {
                tags.style = JSON.parse(value);
                break;
            }
            default: throw new Error('Unsupported key: ' + key);
        }
    });

    return <span
        {...tags}
    >
        {value}
    </span>;
}

const STYLE_PROCESS: Processor = {
    element: (m) => {
        if (!m[1])
            return m[2];

        return getAppliedStyles(m[1], m[2]);
    },
    pattern: STYLE_SYNTAX
};

const TOC_PROCESS: Processor = {
    element: () => {
        return <TableOfContents />;
    },
    pattern: TOC_SYNTAX
};

export const processingOrder: Processor[] = [
    HIGHLIGHT_PROCESS,
    SUPERSCRIPT_PROCESS,
    SUBSCRIPT_PROCESS,
    STYLE_PROCESS,
    TOC_PROCESS
];