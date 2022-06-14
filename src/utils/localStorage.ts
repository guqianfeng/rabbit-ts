import { Profile } from "@/types/data";

const PROFILE_KEY = 'xtx-rabit-profile'

export function getProfile (): Profile {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}')
}

export function setProfile (profile: Profile): void {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function removeProfile (): void {
    localStorage.removeItem(PROFILE_KEY)
}