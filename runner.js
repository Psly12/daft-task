const createTestCafe = require('testcafe')

async function runner() {
  const testcafe = await createTestCafe()
  try {
    const runner = await testcafe.createRunner()
    const reporterDate = new Date()
    const failedCount = await runner
      .src(['tests/*.ts'])
      .browsers(['chrome'])
      .reporter(
        'html',
        `reports/${reporterDate.toDateString()}-${reporterDate.getTime()}-report.html`
      )
      .screenshots({
        path: './reports/screenshots',
        fullPage: true,
        takeOnFails: true,
        pathPattern: '${TEST_INDEX}/${DATE}_${TIME}_${FILE_INDEX}.png',
      })
      .run()
    console.log(`Tests failed: ${failedCount}`)
  } finally {
    await testcafe.close()
  }
}

runner()
