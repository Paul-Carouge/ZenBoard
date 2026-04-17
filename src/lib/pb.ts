import PocketBase from 'pocketbase'

// L'URL doit être définie dans votre fichier .env.local sous le nom NEXT_PUBLIC_POCKETBASE_URL
const pbUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090'

export const pb = new PocketBase(pbUrl)

// Désactiver l'auto-annulation globale pour éviter les erreurs de "request aborted" 
// dues au double rendu en mode StrictMode de React lors des appels useEffect.
pb.autoCancellation(false)
