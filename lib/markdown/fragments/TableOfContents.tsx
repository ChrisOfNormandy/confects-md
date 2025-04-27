import './styles/toc.scss';
import { HeadingNode } from './HeadingNode';
import { TOCItem } from './TOCItem';
import { useEffect, useRef, useState } from 'react';

const MAX_CLIMB_ATTEMPTS = 20;

const HEADING_MAP = new Map<string, number>(
    [
        ['H1', 1],
        ['H2', 2],
        ['H3', 3],
        ['H4', 4],
        ['H5', 5],
        ['H6', 6]
    ]
);

export function TableOfContents() {

    const ref = useRef(null as HTMLSpanElement | null);
    const [root] = useState(new HeadingNode('', 0));
    const [ready, isReady] = useState(false);

    useEffect(() => {
        if (!ref.current)
            return;

        let attempts = 0;
        let mdParent = ref.current.parentElement;
        while (mdParent && !mdParent.classList.contains('markdown-renderer') && attempts < MAX_CLIMB_ATTEMPTS) {
            mdParent = mdParent.parentElement;
            attempts++;
        }

        if (!mdParent || !mdParent.classList.contains('markdown-renderer'))
            return;

        root.clear();

        const mapping = new Map<string, HeadingNode>();
        const all = mdParent.querySelectorAll('*');

        let pointer: HeadingNode;
        all.forEach((element) => {
            if (element instanceof HTMLHeadingElement) {
                const tier = HEADING_MAP.get(element.tagName);
                if (!tier)
                    return;

                const heading = new HeadingNode(element.id, tier);
                mapping.set(heading.id, heading);

                if (!pointer) {
                    pointer = root.addNext(heading);

                    return;
                }

                if (tier === pointer.tier) 
                    pointer = pointer.parent().addNext(heading);
                
                else if (tier > pointer.tier) 
                    pointer = pointer.addNext(heading);
                
                else {
                    let parent = pointer.parent();

                    while (parent && parent.tier !== tier - 1)
                        parent = parent.parent();

                    pointer = parent.addNext(heading);
                }
            }
        });

        isReady(true);
    }, [ref]);

    return <span
        ref={ref}
        className='toc'
    >
        {
            ready &&
            <TOCItem heading={root} />
        }
    </span>;
}