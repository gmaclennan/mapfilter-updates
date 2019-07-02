import React from 'react'
import { configure, addDecorator } from '@storybook/react'
// import { withInfo } from '@storybook/addon-info'
import { setIntlConfig, withIntl } from 'storybook-addon-intl'
import { withPropsTable } from 'storybook-addon-react-docgen'

const getMessages = locale => {}

// Set intl configuration
setIntlConfig({
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
  textComponent: React.Fragment,
  getMessages
})

// Register decorator
addDecorator(withIntl)
addDecorator(withPropsTable)

// addDecorator((story, context) =>
//   withInfo({
//     header: false,
//     inline: true
//   })(story)(context)
// )

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/)
function loadStories() {
  // require('./index')
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
