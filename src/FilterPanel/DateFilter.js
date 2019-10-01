// @flow
import * as React from 'react'
import DateIcon from '@material-ui/icons/DateRange'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'

import { useIntl, defineMessages } from 'react-intl'
import { parseDateString } from '../utils/helpers'

import FilterSection from './FilterSection'
import DateField from '../ObservationDialog/DateField'
import type { Key, Filter } from '../types'
import type { EditProps } from './FilterPanel'

const m = defineMessages({
  // Title of min date field in filter
  min: 'From',
  // Title of max date field in filter
  max: 'To'
})

type Props = {
  ...$Exact<EditProps>,
  label: React.Node,
  fieldKey: Key,
  filter?: Filter | null,
  min: string,
  max: string,
  onChangeFilter: (filter: Array<any> | null) => void
}

const DateFilter = ({
  label,
  fieldKey,
  filter,
  min,
  max,
  onChangeFilter,
  ...editProps
}: Props) => {
  const cx = useStyles()
  const { formatMessage: t } = useIntl()
  const [filterMin, filterMax] = parseDateFilter(filter)

  const isFiltered =
    (filterMin != null && filterMin > min) ||
    (filterMax != null && filterMax < max)

  const handleChange = (minOrMax: 'min' | 'max') => value => {
    const newFilter =
      minOrMax === 'min'
        ? compileFilter(fieldKey, value, filterMax)
        : compileFilter(fieldKey, filterMin, value)
    onChangeFilter(newFilter)
  }

  return (
    <FilterSection
      title={label}
      icon={<DateIcon />}
      isFiltered={isFiltered}
      onShowAllClick={() => onChangeFilter(null)}
      {...editProps}>
      <ListItem>
        <DateField
          minDate={parseDateString(min)}
          maxDate={parseDateString(max)}
          label={t(m.min)}
          value={filterMin || min}
          onChange={handleChange('min')}
          fullWidth={false}
          margin="dense"
          className={cx.dateField}
        />
        <DateField
          minDate={parseDateString(min)}
          maxDate={parseDateString(max)}
          label={t(m.max)}
          value={filterMax || max}
          onChange={handleChange('max')}
          fullWidth={false}
          margin="dense"
          className={cx.dateField}
        />
      </ListItem>
    </FilterSection>
  )
}

export default DateFilter

function compileFilter(key, min, max) {
  if (min === undefined && max === undefined) return null
  const filter = ['all']
  if (min) filter.push(['>=', key, min])
  if (max) filter.push(['<=', key, max])
  return filter
}

function parseDateFilter(filter?: Array<any> | null) {
  if (!filter || filter.length < 2 || filter[0] !== 'all') return []
  const minFilter = filter.find(d => Array.isArray(d) && d[0] === '>=')
  const maxFilter = filter.find(d => Array.isArray(d) && d[0] === '<=')
  return [minFilter && minFilter[2], maxFilter && maxFilter[2]]
}

const useStyles = makeStyles(theme => ({
  dateField: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(1)
    }
  }
}))
