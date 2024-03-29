import QRCode from "qrcode"

// With promises
QRCode.toDataURL('I am a pony!')
  .then(url => {
    console.log("teste "+url)
  })
  .catch(err => {
    console.error(err)
  })

// With async/await
const generateQR = async text => {
  try {
    console.log(await QRCode.toDataURL(text))
  } catch (err) {
    console.error(err)
  }
}