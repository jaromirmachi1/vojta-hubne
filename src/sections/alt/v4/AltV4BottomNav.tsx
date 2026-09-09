import { ALT_HOME_PATH } from '../../../data/altHomepage'
import {
  MobileBottomNav,
  MobileBottomNavSpacer,
} from '../../../components/MobileBottomNav'

/** @deprecated Prefer MobileBottomNavSpacer — kept for /alt layout imports. */
export const AltV4BottomNavSpacer = MobileBottomNavSpacer

export function AltV4BottomNav() {
  return <MobileBottomNav homeTo={ALT_HOME_PATH} />
}
