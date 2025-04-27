import { Badge, Button, Glyph, SocialLink } from 'lib/buttons';
import { BrandName, brands } from 'lib/types';
import { Display } from './helpers/formatters';
import { getClassName } from 'lib/helpers';
import { StyleMode, STYLES, themes } from '@chrisofnormandy/confetti/themes';

const MODES: (StyleMode | undefined)[] = [
undefined,
'i',
'c'
];

function ButtonDisplay() {
    return <Display heading='buttons' >
        {
            MODES.map((mode) => {
                return <div
                    key={mode || 'n'}
                    className='col'
                >
                    {
                        Array.from(STYLES).map((n) => {
                            const theme = themes.getBasicStyling(n, { background: { mode },
border: { mode } });

                            return <div
                                key={n}
                                className='row'
                            >
                                <Button
                                    className={getClassName(theme, 'hvr dis')}
                                >
                                    {n} {mode}
                                </Button>

                                <Button
                                    className={getClassName(theme, 'hvr dis')}
                                    disabled
                                >
                                    X {n} {mode} X
                                </Button>
                            </div>;
                        })
                    }
                </div>;
            })
        }
    </Display>;
}

function BadgeDisplay() {
    return <Display heading='badges'>
        {
            [
'',
'i',
'c'
].map((mode) => {
                return <div
                    key={mode || 'n'}
                    className='col'
                >
                    {
                        Array.from(STYLES).map((n) => {
                            const theme = themes.getBasicStyling(n);

                            return <div
                                key={n}
                                className='row'
                            >
                                <Badge
                                    className={theme}
                                >
                                    Awesome
                                </Badge>

                                <Badge
                                    className={theme}
                                    disabled
                                >
                                    Not Awesome
                                </Badge>

                                <Badge
                                    className={theme}
                                    group='Noice'
                                >
                                    Awesome
                                </Badge>

                                <Badge
                                    className={theme}
                                    group='Noice'
                                    disabled
                                >
                                    Not Awesome
                                </Badge>
                            </div>;
                        })
                    }
                </div>;
            })
        }
    </Display>;
}

function GlyphDisplay() {

    const SIZES = [
1,
2,
3,
4,
5
] as (1 | 2 | 3 | 4 | 5)[];

    return <Display heading='glyphs'>
        {
            [
'',
'i',
'c'
].map((mode) => {
                return <div
                    key={mode || 'n'}
                    className='col'
                >
                    {
                        Array.from(STYLES).map((n) => {
                            const theme = themes.getBasicStyling(n);

                            return <div
                                key={n}
                                className='row'
                            >
                                {
                                    SIZES.map((size) => {
                                        return <div
                                            key={size}
                                        >
                                            <Glyph
                                                className={theme}
                                                icon='emoji-smile'
                                                size={size}
                                            />

                                            <Glyph
                                                className={theme}
                                                icon='emoji-smile'
                                                size={size}
                                                disabled
                                            />
                                        </div>;
                                    })
                                }

                            </div>;
                        })
                    }
                </div>;
            })
        }

        {
            [
'',
'i',
'c'
].map((mode) => {
                return <div
                    key={mode || 'n'}
                    className='col'
                >
                    {
                        Array.from(STYLES).map((n) => {
                            const theme = themes.getBasicStyling(n);

                            return <div
                                key={n}
                                className='row'
                            >
                                {
                                    SIZES.map((size) => {
                                        return <div
                                            key={size}
                                        >
                                            <Glyph
                                                className={theme}
                                                icon='emoji-smile'
                                                size={size}
                                            />

                                            <Glyph
                                                className={theme}
                                                icon='emoji-smile'
                                                size={size}
                                                disabled
                                            />
                                        </div>;
                                    })
                                }

                            </div>;
                        })
                    }
                </div>;
            })
        }
    </Display>;
}

function SocialLinkDisplay() {
    const brandNames = Object.keys(brands) as BrandName[];
    const brandsPerCol = Math.round(brandNames.length / 5);

    const brandLists: BrandName[][] = [];
    for (let c = 0; c < 5; c++) {
        const list: BrandName[] = [];

        for (let b = 0; b < brandsPerCol; b++) {
            const i = b + c * brandsPerCol;
            if (i >= brandNames.length)
                break;

            const item = brandNames[i];
            if (!item)
                throw new Error('Undefined brand item');

            list.push(item);
        }

        brandLists[c] = list;
    }

    return <Display heading='social-links'>
        {
            brandLists.map((list, i) => {
                return <div
                    key={i}
                    className='col'
                >
                    {
                        list.map((brand) => {
                            return <div
                                key={brand}
                                className='row'
                            >
                                <SocialLink
                                    brand={brand}
                                    className='circular'
                                />

                                <SocialLink
                                    brand={brand}
                                    className='circular'
                                    fill
                                />

                                <SocialLink
                                    brand={brand}
                                    withLabel
                                />

                                <SocialLink
                                    brand={brand}
                                    fill
                                    withLabel
                                />
                            </div>;
                        })
                    }
                </div>;
            })
        }
    </Display>;
}

export function Buttons() {
    return <div
        className='buttons-wrapper'
    >
        <ButtonDisplay />
        <BadgeDisplay />
        <GlyphDisplay />
        <SocialLinkDisplay />
    </div>;
}