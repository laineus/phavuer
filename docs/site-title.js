import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_TITLE = 'Phavuer - A wrapper library txhat integrates Phaser 3 with Vue 3'

const filePath = path.join(__dirname, 'storybook-static/index.html')

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the HTML file:', err)
    return
  }
  const updatedData = data.replace(/<title>.*<\/title>/, `<title>${SITE_TITLE}</title>`).replace('<link rel="icon" type="image/svg+xml" href="./favicon.svg" />', '')

  fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing the updated HTML file:', writeErr)
    }
    // Title updated successfully
  })
})
