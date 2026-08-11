import {useFormValue, set, unset} from 'sanity'
import {useEffect} from 'react'
import {Menu, MenuItem, MenuButton, Button, Text} from '@sanity/ui'
import {ChevronDownIcon} from '@sanity/icons'
import type {StringInputProps} from 'sanity'
import type {MarketCode} from '../types/index'
import {MARKET_LANGUAGES} from '../utils/helper/marketLangHelper'

export function LanguageSelect(props: StringInputProps) {
  const {value, onChange} = props
  const market = useFormValue(['market']) as MarketCode | undefined
  const {languages, default: defaultLang} = market
    ? MARKET_LANGUAGES[market]
    : {languages: [], default: undefined}

  useEffect(() => {
    if (market === undefined && value !== undefined) {
      onChange(unset())
    }
  }, [market, value, onChange])

  useEffect(() => {
    if (!market) return
    if (!value || !languages.some((l) => l.value === value)) {
      onChange(set(defaultLang))
    }
  }, [market, value, onChange, languages, defaultLang])

  const selectedLabel = languages.find((l) => l.value === value)?.title ?? 'Select language'

  if (market) {
    return (
      <MenuButton
        button={
          <Button
            text={selectedLabel}
            iconRight={ChevronDownIcon}
            mode="ghost"
            style={{width: '100%', justifyContent: 'space-between'}}
          />
        }
        id="language-menu"
        menu={
          <Menu>
            {languages.map((opt) => (
              <MenuItem
                key={opt.value}
                text={opt.title}
                onClick={() => onChange(set(opt.value))}
                pressed={opt.value === value}
              />
            ))}
          </Menu>
        }
      />
    )
  }
  return (
    <Text size={1} muted>
      Please select a market first
    </Text>
  )
}
