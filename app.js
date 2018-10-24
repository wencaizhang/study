const fs = require('fs')
const path = require('path')

function travel (dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let pathname = path.join(dir, file)
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback)
    } else {
      if (/\.html$/.test(pathname)) {
        pathname = pathname.replace(/\\/g, '/')
        callback(pathname)
      }
    }
  })
}

let dir = './demos'
const json = []
travel(dir, (pathname) => {
  const fileData = fs.readFileSync(pathname,"utf-8");
  let reg = /<title>(.*)<\/title>/
  let name = reg.exec(fileData)[1]
  json.push({
    link: pathname,
    name,
  })
})

fs.writeFileSync('db.js', 'var db = ' + JSON.stringify(json),"utf-8")