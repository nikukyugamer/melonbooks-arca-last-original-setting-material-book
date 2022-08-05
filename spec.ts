// 簡易 Spec
import ArcaLastBook from './ArcaLastBook'

const arcaLastBook = new ArcaLastBook()

if (arcaLastBook.bookUrl === 'https://www.melonbooks.co.jp/detail/detail.php?product_id=670278') {
  console.log('[PASSED] bookUrl')
} else {
  throw new Error('bookUrl is not correct')
}

if (arcaLastBook.mypageUrl === 'https://www.melonbooks.co.jp/mypage/') {
  console.log('[PASSED] mypageUrl')
} else {
  throw new Error('mypageUrl is not correct')
}

if (arcaLastBook.waitForSeconds(2)) {
  console.log('[PASSED] waitForSeconds')
} else {
  throw new Error('waitForSeconds is not correct')
}
