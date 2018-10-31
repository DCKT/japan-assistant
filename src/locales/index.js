// @flow

import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'

import enMessage from './en'
import frMessage from './fr'

addLocaleData([...en, ...fr])

export const messages = {
  en: enMessage,
  fr: frMessage
}
