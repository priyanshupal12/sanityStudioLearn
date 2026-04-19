import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './deskStructure'
import {pageStatusActionsResolver} from './utils/pageStatusController'

export default defineConfig({
  name: 'default',
  title: 'Priyanshu Bhai',

  projectId: 'imwa25gr',
  dataset: 'production',

  plugins: [structureTool({structure: deskStructure}), visionTool()],
  document: {
    actions: pageStatusActionsResolver,
  },

  schema: {
    types: schemaTypes,
  },
})
