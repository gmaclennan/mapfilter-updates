// @flow
import React from 'react'

import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import ReportView from './ReportView'

const exampleObservations = require('../../fixtures/observations.json')

const imageBaseUrl =
  'https://images.digital-democracy.org/mapfilter-sample/sample-'

const getMediaUrl = id => imageBaseUrl + ((parseInt(id, 16) % 17) + 1) + '.jpg'

export default {
  title: 'ReportView',
  component: ReportView,
  decorators: [
    (storyFn: any) => (
      <div style={{ width: '100vw', height: '100vh' }}>{storyFn()}</div>
    )
  ]
}

export const basic = () => (
  <ReportView
    getMediaUrl={getMediaUrl}
    mapboxAccessToken="pk.eyJ1IjoiZ21hY2xlbm5hbiIsImEiOiJSaWVtd2lRIn0.ASYMZE2HhwkAw4Vt7SavEg"
    observations={exampleObservations.slice(0, 10)}
    onUpdateObservation={action('update')}
  />
)
