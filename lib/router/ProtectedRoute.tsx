import { Loading } from '@syren-dev-tech/confects/decorations';
import { withAuthenticationRequired } from '@auth0/auth0-react';

export interface ProtectedRouteProps<T> {
    element: React.ComponentType<T>;
    [key: string]: unknown;
}

export function ProtectedRoute<T extends object>({ element, ...rest }: ProtectedRouteProps<T>) {
    const Element = withAuthenticationRequired(element, {
        onRedirecting: () => <Loading />
    });

    return <Element {...rest as T} />;
}