import { Display } from './helpers/formatters';
import { Calendar, FileInput, Input, Slider } from 'lib/inputs';
import { getClassName } from 'lib/helpers';
import { STYLES, themes } from '@chrisofnormandy/confetti/themes';

function InputDisplay() {
    return <Display heading='inputs' >
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
                                    <Input
                                        name='-'
                                        className={getClassName(theme, 'hvr dis')}
                                        defaultValue='Edit Me!'
                                    />

                                    <Input
                                        name='-'
                                        className={getClassName(theme, 'hvr dis')}
                                        placeholder='Add to Me!'
                                    />
                                </div>

                                <div
                                    className='col'
                                >
                                    <Input
                                        name='-'
                                        className={getClassName(theme, 'hvr dis')}
                                        defaultValue="Don't Edit Me!"
                                        disabled
                                    />

                                    <Input
                                        name='-'
                                        className={getClassName(theme, 'hvr dis')}
                                        placeholder="Don't Add to Me!"
                                        disabled
                                    />
                                </div>

                                <div
                                    className='col'
                                >
                                    <Input
                                        name='-'
                                        className={getClassName(theme, 'hvr dis')}
                                        defaultValue='Read Me!'
                                        readOnly
                                    />

                                    <Input
                                        name='-'
                                        className={getClassName(theme, 'hvr dis')}
                                        placeholder="Don't Read Me!"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </div>;
                        })
                    }
                </div>;
            })
        }
    </Display >;
}

function SliderDisplay() {
    return <Display heading='sliders' >
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
                                    <Slider
                                        name='-'
                                        className={getClassName(theme, 'hvr dis')}
                                    />

                                    <Slider
                                        name='-'
                                        className={getClassName(theme, 'hvr dis')}
                                    />
                                </div>

                                <div
                                    className='col'
                                >
                                    <Slider
                                        name='-'
                                        className={getClassName(theme, 'hvr dis')}
                                        disabled
                                    />

                                    <Slider
                                        name='-'
                                        className={getClassName(theme, 'hvr dis')}
                                        disabled
                                    />
                                </div>

                                <div
                                    className='col'
                                >
                                    <Slider
                                        name='-'
                                        className={getClassName(theme, 'hvr dis')}
                                        readOnly
                                    />

                                    <Slider
                                        name='-'
                                        className={getClassName(theme, 'hvr dis')}
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </div>;
                        })
                    }
                </div>;
            })
        }
    </Display >;
}

function FileInputDisplay() {
    return <Display heading='file-input' >
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
                                    <FileInput
                                        name='-'
                                        className={theme}
                                    />

                                    <FileInput
                                        name='-'
                                        className={theme}
                                    />
                                </div>
                            </div>;
                        })
                    }
                </div>;
            })
        }
    </Display >;
}

function CalendarDisplay() {
    return <Display heading='calendar' >
        <Calendar />
    </Display>;
}

export function Inputs() {
    return <div>
        <InputDisplay />
        <SliderDisplay />
        <FileInputDisplay />
        <CalendarDisplay />
    </div>;
}