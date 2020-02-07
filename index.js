const pathLib = require('path')
const core = require('@actions/core')

async function main() {
  const regexp = new RegExp(core.getInput('regexp'), 'i')
  console.log(regexp)

  const originalPath = process.env['PATH'].split(pathLib.delimiter)
  let path = originalPath.slice()

  path = path.filter(e => !e.match(regexp))

  console.log("Entries removed from PATH:")
  for (const entry of originalPath) {
    if (!path.includes(entry)) {
      console.log(entry)
    }
  }

  const newPath = path.join(pathLib.delimiter)
  core.exportVariable('PATH', newPath)
}

async function run() {
  try {
    await main()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
