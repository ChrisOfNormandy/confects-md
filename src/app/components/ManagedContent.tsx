import { Button } from 'lib/buttons';
import { Dialog, DialogProps, useDialogs } from 'lib/dialogs';
import { Display } from './helpers/formatters';
import { Input } from '@inputs';
import { memo } from 'react';
import { MenuBuilder, MenuSummonButton, useMenus } from 'lib/menus';
import { v4 } from 'uuid';
import ExpandingMenu from 'lib/menu/expanding/ExpandingMenu';
import Modal from 'lib/dialogs/modal/Modal';
import { useToasts } from '@toasts';

function Dialogs() {
    const dialogs = useDialogs();

    return <Display
        heading='dialogs'
    >
        <Button
            onClick={() => {
                const ID = 'example_dialog';

                const dialog = memo((p: DialogProps) => <Dialog
                    {...p}
                    mobile='header'
                >
                    Cool!
                </Dialog>);

                dialogs.add(ID, dialog).open();
            }}
        >
            Dialog
        </Button>

        <Modal
            id='example_modal'
            header={
                {
                    theme: { background: { style: 'primary' } }
                }
            }
        >
            <Input
                name='example_input'
            />
        </Modal>
    </Display>;
}

function Menus() {
    const menus = useMenus();

    return <>
        <Display heading='basic menu'>
            {
                ([
                    undefined,
                    'top',
                    'bottom',
                    'left',
                    'right'
                ] as ('top' | 'bottom' | 'left' | 'right')[]).map((place) => {
                    const builder = new MenuBuilder(menus, v4());

                    builder.addContent()
                        .setText('Hello World!')
                        .addProps({ className: 'f-primary' });

                    return <MenuSummonButton
                        builder={builder}
                        place={place}
                    >
                        Menu {place}
                    </MenuSummonButton>;
                })
            }
        </Display>

        <Display heading='expanding menu'>
            <ExpandingMenu
                builder={new MenuBuilder(menus, v4())}
            />
        </Display>

        <Display heading='radial menu'>

        </Display>
    </>;
}

function Toasts() {
    const toasts = useToasts();

    return <>
        <Display heading='toasts'>
            <Button
                onClick={() => toasts.info('Hello World!')}
            >
                Info
            </Button>
        </Display>
    </>;
}

export function ManagedContent() {
    return <>
        <Dialogs />
        <Menus />
        <Toasts />
    </>;
}