import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import post from './src/sanity/schemas/post'

export default defineConfig({
  name: 'default',
  title: 'Nutrition Guide By MisScilla Blog',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [post],
  },
})