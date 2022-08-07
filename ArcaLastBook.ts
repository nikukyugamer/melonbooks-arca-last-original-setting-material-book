import { chromium } from 'playwright'
import 'dotenv/config'

class ArcaLastBook {
  bookUrl: string
  mypageUrl: string
  loginId: string
  loginPassword: string

  constructor() {
    this.bookUrl =
      'https://www.melonbooks.co.jp/detail/detail.php?product_id=670278'
    this.mypageUrl = 'https://www.melonbooks.co.jp/mypage/'
    this.loginId = process.env.LOGIN_ID || ''
    this.loginPassword = process.env.LOGIN_PASSWORD || ''
  }

  async exec() {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    // ログイン
    await page.goto(this.mypageUrl)

    await page.type('#melonbooks_login_id', this.loginId)
    await page.type('#melonbooks_password', this.loginPassword)
    await page.click('input[type=submit]')
    await page.waitForSelector('#container')

    // ビューアに移動する
    await page.goto(this.bookUrl)

    // ビューアは別タブで開かれるため、新たなページ用変数を定義する
    const [bookPage] = await Promise.all([
      context.waitForEvent('page'),
      await page.click('text=この作品を読む'),
    ])

    // インフォメーションのポップアップを閉じる
    await bookPage.setViewportSize({ width: 1508 * 2, height: 2097 })
    await bookPage.click('.btn.btn-close-dialog')

    // 1ページ目
    this.waitForSeconds(5)
    await bookPage.screenshot({ path: 'tmp/screenshot_newPage_表紙.png' })

    // 以降、ページめくり
    // TODO: ループする
    for (let i = 0; i < 5; i++) {
      await bookPage.keyboard.press('ArrowLeft')
      this.waitForSeconds(5)
      await bookPage.screenshot({ path: `tmp/screenshot_newPage_${i}.png` })
    }

    await browser.close()
  }

  waitForSeconds(seconds: number) {
    const waitTill = new Date(new Date().getTime() + seconds * 1000)
    while (waitTill > new Date()) {}

    return true
  }

  sleep(msec: number) {
    const wait = require('timers/promises').setTimeout;

    (async () => {
      console.log('Start');
      await wait(msec);
      console.log('End');
    })();
  }

  // TODO: 実装する
  divideImageFile(path: string) {
    // const imageFile = fs.readFileSync(path)
    // singlePageSize = { width: 1508, height: 2097 }
    // const image = new Jimp(imageFile)
    // ファイルの書き出し

    return path
  }
}

export default ArcaLastBook
