import { Loading } from '@chrisofnormandy/confects/decorations';
import { withAuthenticationRequired } from '@auth0/auth0-react';

export interface ProtectedRouteProps {
    element: React.ComponentType<object>
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
    const Element = withAuthenticationRequired(element, {
        onRedirecting: () =>
            <Loading />

    });

    return <Element />;
}