// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: '',
  keycloakIP: '172.21.38.38',
  keycloakPort: '3900',
  keycloakRealm: 'mogesdoc',
  keycloakClientId: 'moges-app',
  mogesdocBackendIp: 'carsma-001-site1.htempurl.com',
  mogesdocBackendPort: '80',
  backendIP: '172.21.38.38',
  backendPort: '7070',
  backendVersion: '/v1.0'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
