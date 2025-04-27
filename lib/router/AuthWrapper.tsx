import { Auth0Provider, Auth0ProviderOptions, AuthorizationParams } from '@auth0/auth0-react';
import * as ReactRouterDOM from 'react-router-dom';

const SCOPES = 'openid profile email';

export type AuthWrapperProps = {
    auth?: AuthorizationParams
} & Auth0ProviderOptions;

export function AuthWrapper(
    {
        children,
        domain,
        clientId,
        auth,
        ...props
    }: AuthWrapperProps
) {
    const navigate = ReactRouterDOM.useNavigate();

    if (!(domain && clientId)) {
        return <div>
            MISSING AUTH SETTINGS
        </div>;
    }

    return (
        <Auth0Provider
            onRedirectCallback={(appState) => navigate(appState?.returnTo || window.location.pathname)}
            authorizationParams={
                {
                    redirect_uri: window.location.origin,
                    scope: SCOPES,
                    ...auth
                }
            }
            domain={domain}
            clientId={clientId}
            {...props}
        >
            {children}
        </Auth0Provider>
    );
}