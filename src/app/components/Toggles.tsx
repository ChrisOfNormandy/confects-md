import { Display } from './helpers/formatters';
import { Toggle, ToggleIconType } from 'lib/inputs';
import { STYLES, themes } from '@chrisofnormandy/confetti/themes';

function ToggleDisplay() {

    const iconTypes: ToggleIconType[] = [
        'check',
        'check-dot',
        'check-square',
        'check-x',
        'dot',
        'eye',
        'power',
        'square',
        'sun-moon',
        'thumb-down',
        'thumb-up',
        'toggle',
        'x',
        'x-dot',
        'x-square'
    ];

    return <Display heading='toggles' >
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
                                <div
                                    className='col'
                                >
                                    {
                                        iconTypes.map((iconType) => {
                                            return <div
                                                key={iconType}
                                                className='row'
                                            >
                                                <Toggle
                                                    className={theme}
                                                    icon={iconType}
                                                    defaultChecked
                                                />

                                                <Toggle
                                                    icon={iconType}
                                                    className={theme}
                                                />
                                            </div>;
                                        })
                                    }
                                </div>
                            </div>;
                        })
                    }
                </div>;
            })
        }
    </Display >;
}

export function Toggles() {
    return <div>
        <ToggleDisplay />
    </div>;
}