import { HeadingNode } from './HeadingNode';

export function TOCItem(
    {
        heading
    }: { heading: HeadingNode }
) {
    if (!heading.id) {
        return <ul
            className='toc-list root'
        >
            {
                heading.next.map((next) => {
                    return <TOCItem
                        key={next.id}
                        heading={next}
                    />;
                })
            }
        </ul>;
    }

    return <li
        className='toc-item'
    >
        <a
            href={`#${heading.id}`}
        >
            {heading.id.replace(/-/g, ' ')}
        </a>

        {
            heading.next.length > 0 &&
            <ul
                className='toc-list'
            >
                {
                    heading.next.map((next) => {
                        return <TOCItem
                            key={next.id}
                            heading={next}
                        />;
                    })
                }
            </ul>
        }
    </li>;
}