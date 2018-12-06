# Memori

## Setup your own site

- install dependencies `yarn`
- run dev `yarn start`
- create a `.env.development` with firebase config :

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
```

### Technologies used

- `react` (16.7.0-alpha.0) for hooks
- `final-form` & `react-final-form` as form manager
- `@reach/router` as router system
- `firebase` as login & db system
- `@lingui` as i18n provider
- `@material-ui` as UI framework

### Structure pattern

`scenes` / `services`
