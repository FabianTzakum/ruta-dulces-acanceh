export const appConfig = {
  name: import.meta.env.VITE_APP_NAME || 'Ruta de los Dulces Acanceh',
  env: import.meta.env.VITE_APP_ENV || 'local',
  publicSiteUrl: import.meta.env.VITE_PUBLIC_SITE_URL || 'http://localhost:5173',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  dataMode: import.meta.env.VITE_DATA_MODE || 'local',
  isProduction: import.meta.env.PROD,
  isLocalData: !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_DATA_MODE === 'local',
}
