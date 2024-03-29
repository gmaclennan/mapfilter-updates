// @flow

import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '../utils/styles'

const useStyles = makeStyles({
  root: {
    zIndex: 10,
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    padding: 8,
    flexDirection: 'row',
    '@media only print': {
      display: 'none'
    }
  }
})

type Props = {
  children: React.Node
}

const Toolbar = ({ children }: Props) => {
  const classes = useStyles()
  return (
    <AppBar
      elevation={3}
      color="default"
      className={classes.root + ' d-print-none'}>
      {children}
    </AppBar>
  )
}

export default Toolbar
