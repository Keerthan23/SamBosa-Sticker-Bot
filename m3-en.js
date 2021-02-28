const {
  create,
  decryptMedia
} = require('@open-wa/wa-automate')
const mime = require('mime-types');
const fs = require('fs-extra')
const ffmpeg = require('fluent-ffmpeg')
const process = require('process');
const request = require('request')
const sharp = require('sharp')
const { Readable, Writable } = require('stream')


//====================| www.m3lomh.net |==================//

// All rights reserved to m3lomh.net
// To communicate with me ry2n711@gmaail.com || telegarm @m3lomhnet

//====================| www.m3lomh.net |==================//

const m3lomhnet = (m3 = new Client()) => {
  m3.onStateChanged(function (state) {
    if (state === "UNLAUNCHED") {
      m3.forceRefocus()
    }
    if (state === "CONFLICT") {}
  });
  m3.onMessage(async(message) => {
    try {
      await bot(m3, message)
    } catch (error) {
      console.log(error.message)
    }
    m3.getAmountOfLoadedMessages()
      .then((x) => {
        if (x >= 4000) {
          m3.sendText('xxx@c.us', `Loaded message reach ${x}, cutting message cache...`)
          m3.cutMsgCache()
          m3.cutMsgCache()
          m3.cutMsgCache()
          m3.cutMsgCache()
          m3.cutMsgCache()
          m3.cutMsgCache()
        }
      })
  });
}

async function bot(m3, message) {
  const {
    type,
    t,
    caption,
    id,
    from,
    sender,
    isMedia,
    quotedMsg,
    quotedMsgObj,
    mimetype
  } = message
  let {
    body
  } = message
  body = (type == 'chat') ? body : ((type && caption)) ? caption : ''
  const ua = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
  let txt = body.toLowerCase()
  const arg = body.trim().substring(body.indexOf(' ') + 1)
  if ((txt == "sticker") || (isMedia && mimetype == 'image/jpeg')) {
  
// Put here the author's name that appears at the bottom of the sticker , for pictures they should not contain decorations or emojis, put the name in English only
    const a = "Sticker"   
    
// Put here the pack name that appears at the bottom of the sticker , for pictures they should not contain decorations or emojis, put the name in English only      
           const b = "SamBosa bot"   
      
// Put here the author's name that appears below the sticker, for the video or gif it can contain motifs or emojis
    const author = "Sticker"  
    
// Put here the pack name that appears below the sticker, for the video or gif it can contain motifs or emojis
    const pack = "🤖 Bot SamBosa 🤖"  
    
    await createExif(a,b)
    await sleep(3000)
    await m3.reply(from, message.id)
    if (isMedia && mimetype == 'image/jpeg') {
      decryptMedia(message).then(mediaData => {
        sharp(mediaData).resize({
          width: 512,
          height: 512,
          fit: sharp.fit.contain,
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0
          }
        }).webp().toBuffer().then(buffer => {
          modifExif(buffer, id, (res) => {
            mediaData = res.toString('base64')
            m3.sendRawWebpAsSticker(from, mediaData)
          })
        })
      })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'image/jpeg') {
      decryptMedia(quotedMsg).then(mediaData => {
        sharp(mediaData).resize({
          width: 512,
          height: 512,
          fit: sharp.fit.contain,
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0
          }
        }).webp().toBuffer().then(buffer => {
          modifExif(buffer, id, (res) => {
            mediaData = res.toString('base64')
            m3.sendRawWebpAsSticker(from, mediaData)
          })
        })
      })
    }   else if (isMedia && mimetype == 'image/gif') {
      const shape = ""
      const type = "gif"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'Enjoy your Sticker 🎁')
})
 } else if (quotedMsg && quotedMsgObj.mimetype == 'image/gif') {
      const shape = ""
      const type = "gif"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'Enjoy your Sticker 🎁')
})
 } else if (isMedia && mimetype == 'video/mp4') {
      const shape = ""
      const type = "mp4"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
 m3.sendText(from, 'Enjoy your Sticker 🎁')
                             })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'video/mp4') {
      const shape = ""
      const type = "mp4"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'Enjoy your Sticker 🎁')
            })
    }
  } else if (txt.startsWith("sticker")) {
    await m3.reply(from, message.id)
    const pack = arg.split('|')[0]
    const author = arg.split('|')[1]
     if (isMedia && mimetype == 'image/gif') {
      const shape = ""
      const type = "gif"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'Enjoy your Sticker 🎁')
})
 } else if (quotedMsg && quotedMsgObj.mimetype == 'image/gif') {
      const shape = ""
      const type = "gif"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'Enjoy your Sticker 🎁')
})
 } else if (isMedia && mimetype == 'video/mp4') {
      const shape = ""
      const type = "mp4"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
 m3.sendText(from, 'Enjoy your Sticker 🎁')
                             })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'video/mp4') {
      const shape = ""
      const type = "mp4"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'Enjoy your Sticker 🎁')
            })
    }
  } else if (txt.startsWith("circlesticker")) {
    await m3.reply(from, message.id)
    const pack = arg.split('|')[0]
    const author = arg.split('|')[1]
      if (isMedia && mimetype == 'image/gif') {
      const shape = "circle"
      const type = "gif"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'Enjoy your Sticker 🎁')
            })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'image/gif') {
      const shape = "circle"
      const type = "gif"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'Enjoy your Sticker 🎁')
            })
    } else if (isMedia && mimetype == 'video/mp4') {
      const shape = "circle"
      const type = "mp4"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'Enjoy your Sticker 🎁')
           })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'video/mp4') {
      const shape = "circle"
      const type = "mp4"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'Enjoy your Sticker 🎁')
           })
    }
  }  else if ((txt == "hi") || (txt == "help") || (txt == "bot") || (txt == "Helo")) {
    let sm = "▪ hello, please send me a video, image, or gif and I'll turn it into a sticker 👋\n"
    sm += "▪ if you send a video or a gif, then i will turn it into a circle sticker when using the circlesticker command 🤡\n"
    sm += "▪ For  gif do not background you can send me as a document 📄\n"
    sm += "▪ To obtain sticker packs you can send the command *pack* 📦 \n"
    sm += "▪ I will convert the sticker into an image using the img command 🖼️ \n\n"
    sm += " ▪ ps. You can change author name and sticker pack name if you send \n\n"
    sm += "      *(1)*  \n"
    sm += "▪ sticker pack | author\n"
    sm += "      *(2)*  \n"
    sm += "▪ circlesticker pack | author\n"
    sm += "ℹ️ Follow me on telegram @ gif 711 if this bot is blocked, a new number will be published there \n"
    m3.sendText(from, sm)
    m3.sendImage(from, './img/test-en.jpg', 'test-en.jpg', 'Example of using commands')
  }  else if (txt === 'img') {
     if (quotedMsg) {
    if(quotedMsg.type === 'sticker') {
   const uaOverride = process.env.UserAgent
   const mediaData = await decryptMedia(quotedMsg, uaOverride)
   await m3.sendFile(from, `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`, 'toimg.jpg', ` The sticker has been converted to an image ✅`, id)}}
   
   } else if (txt == "pack") {
    let sm = "❊ To open packages, please download an application *Sticker Maker* 🔓 \n"
    sm += "❊ Please write the name of the package and I will send it 📦 \n"
    sm += "▪ tom and jerry \n"
    sm += "▪ baby \n"
    sm += "▪ Spongebob \n"
    sm += "▪ dog \n"
    sm += "▪ Simpsons \n"
    sm += "▪ Monster \n"
    sm += "▪ frog \n"                
    sm += "❊ ```Sticker Maker``` Application download links\n" 
    sm += "https://play.google.com/store/apps/details?id=com.marsvard.stickermakerforwhatsapp&hl=ar&gl=US || Android \n" 
    sm += "https://apps.apple.com/us/app/sticker-maker-studio/id1443326857 || ios \n"            
    m3.sendText(from, sm)
    } else if ((txt == "tom and jerry") || (txt == "tom")) {
 m3.sendText(from, 'I will send the package please Wait ⏳')
 m3.sendFile(from, './img/pkg-en/tomandjerry.wastickers', 'tomandjerry.wastickers')
 m3.sendFile(from, './img/pkg-en/tomandjerry2.wastickers', 'tomandjerry2.wastickers')
 m3.sendFile(from, './img/pkg-en/tomandjerry3.wastickers', 'tomandjerry3.wastickers')
 m3.sendFile(from, './img/pkg-en/tomandjerry4.wastickers', 'tomandjerry4.wastickers');
 
 } else if ((txt == "Spongebob") || (txt == "Spong")) {
 m3.sendText(from, 'I will send the package please Wait ⏳')
 m3.sendFile(from, './img/pkg-en/Spong.wastickers', 'Spong.wastickers')
 m3.sendFile(from, './img/pkg-en/Spong2.wastickers', 'Spong2.wastickers')
 m3.sendFile(from, './img/pkg-en/Spong3.wastickers', 'Spong3.wastickers');
 
 } else if ((txt == "dogs") || (txt == "dog")) {
 m3.sendText(from, 'I will send the package please Wait ⏳')
 m3.sendFile(from, './img/pkg-en/dog.wastickers', 'dog.wastickers');
 
 } else if ((txt == "Simpson") || (txt == "Simpsons")) {
 m3.sendText(from, 'I will send the package please Wait ⏳')
 m3.sendFile(from, './img/pkg-en/Simpsons1.wastickers', 'Simpsons1.wastickers')
 m3.sendFile(from, './img/pkg-en/Simpsons2.wastickers', 'Simpsons2.wastickers')
 m3.sendFile(from, './img/pkg-en/Simpsons3.wastickers', 'Simpsons3.wastickers')
 m3.sendFile(from, './img/pkg-en/Simpsons4.wastickers', 'Simpsons4.wastickers');
 
 } else if ((txt == "Monster") || (txt == "Monsters")) {
 m3.sendText(from, 'I will send the package please Wait ⏳')
 m3.sendFile(from, './img/pkg-en/Monster.wastickers', 'Monster.wastickers');
 
 } else if ((txt == "frogs") || (txt == "frog")) {
 m3.sendText(from, 'I will send the package please Wait ⏳')
 m3.sendFile(from, './img/pkg-en/frog1.wastickers', 'frog1.wastickers')
 m3.sendFile(from, './img/pkg-en/frog2.wastickers', 'frog2.wastickers')
 m3.sendFile(from, './img/pkg-en/frog3.wastickers', 'frog3.wastickers');
 
 } else if ((txt == "babies") || (txt == "baby")) {
 m3.sendText(from, 'I will send the package please Wait ⏳')
 m3.sendFile(from, './img/pkg-en/baby.wastickers', 'baby.wastickers');
 
 } 
                  
};
     




 

//===========================| process |=========================//

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason);
})
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise);
})
process.on('Something went wrong', function (err) {
  console.log('Caught exception: ', err)
})
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

const convertSticker = function(shape, author, pack, mediaData, type) {
  return new Promise((resolve, reject) => {
    var upfile = "sticker." + type;
    var metadata = {
      "pack": pack,
      "author": author,
      "shape": shape,
      "api_key": "JDJiJDEwJEtBMm0wUDRzRmZnZjFLSTFhTkdCT3VKTnN1dHouenhlVlUVVqcHlVMWk1SURnSnpUZjNl",
// api_key || https://stickerman.org
    };
    var url = "https://stickerman.org/api/convert";
    var boundary = "sticker";
    let data = "";
    for (var i in metadata) {
      if ({}.hasOwnProperty.call(metadata, i)) {
        data += "--" + boundary + "\r\n";
        data += "Content-Disposition: form-data; name=" + i + "; \r\n\r\n" + metadata[i] + "\r\n";
      }
    };
    data += "--" + boundary + "\r\n";
    data += "Content-Disposition: form-data; name=sticker; filename=" + upfile + "\r\n";
    data += "Content-Type:application/octet-stream\r\n\r\n";
    var payload = Buffer.concat([
      Buffer.from(data, "utf8"),
      Buffer.from(mediaData, 'binary'),
      Buffer.from("\r\n--" + boundary + "--\r\n", "utf8"),
    ]);
    var options = {
      method: 'post',
      url: url,
      headers: {
        "Content-Type": "multipart/form-data; boundary=" + boundary
      },
      body: payload,
      encoding: null
    };
    request(options, function(error, response, body) {
      if (error) {
        reject(error)
      } else {
        resolve(body)
      }
    });
  });
};

const stickerPackID = "com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2";
const googleLink = "https://play.google.com/store/apps/details?id=com.marsconstd.stickermakerforwhatsapp";
const appleLink = "https://itunes.apple.com/app/sticker-maker-studio/id1443326857";


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createExif(packname, author) {
  const json = {
    "sticker-pack-id": stickerPackID,
    "sticker-pack-name": packname,
    "sticker-pack-publisher": author,
    "android-app-store-link": googleLink,
    "ios-app-store-link": appleLink
  };

  let length = JSON.stringify(json).length;
  const f = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
  const code = [
    0x00,
    0x00,
    0x16,
    0x00,
    0x00,
    0x00
  ];
  if (length > 256) {
    length = length - 256;
    code.unshift(0x01);
  } else {
    code.unshift(0x00);
  }
  const fff = Buffer.from(code);
  const ffff = Buffer.from(JSON.stringify(json));

  if (length < 16) {
    length = length.toString(16);
    length = "0" + length;
  } else {
    length = length.toString(16);
  }

  const ff = Buffer.from(length, "hex");
  const buffer = Buffer.concat([f, ff, fff, ffff]);
  await fs.writeFileSync('./image/p.exif', buffer, function(err) {
    if (err) return console.error(err);
  });
}

function modifExif(buffer, id, callback) {
  fs.writeFileSync('./image/' + id + '.webp', buffer)
  const {
    spawn
  } = require('child_process')
  spawn('webpmux', ['-set', 'exif', './image/p.exif', './image/' + id + '.webp', '-o', './image/' + id + '.webp'])
    .on('exit', () => {
      callback(fs.readFileSync('./image/' + id + '.webp', {
        encoding: 'base64'
      }))
      fs.unlink('./image/' + id + '.webp').then(() => {})
    })
}

function bufferToStream(buffer) {
  const readable = new Readable()
  readable._read = () => {}
  readable.push(buffer)
  readable.push(null)
  return readable
}

const modifWebp = (id, buffers) => new Promise((resolve) => {
  const stream = bufferToStream(buffers)
  const {
    spawn
  } = require('child_process')
  ffmpeg(stream)
  .inputFormat('mp4')
  .addOutputOptions("-vcodec", "libwebp", "-vf", "scale='min(150,iw)':min'(150,ih)':force_original_aspect_ratio=decrease, fps=15, pad=150:150:-1:-1:color=white@0.0", '-lossless', '1', "-loop", "1", "-preset", "default", "-an", "-vsync", "0", "-s", "150:150")
  .save(`./image/${id}.webp`)
  .on('end', () => {
    stream.destroy()
    spawn('webpmux', ['-set', 'exif', './image/p.exif', './image/' + id + '.webp', '-o', './image/' + id + '.webp'])
    .on('exit', () => {
      let mediaData = (fs.readFileSync('./image/' + id + '.webp', {
        encoding: 'base64'
      }))
      fs.unlink('./image/' + id + '.webp').then(() => {})
      return resolve(mediaData)
    })
  })
})
 
//===========================| process |=========================//
 
 
    

const sambosa = {
  sessionId: 'm3lomhnet',
  useChrome: true,
  headless: true,
  qrRefreshS: 17,
  qrTimeout: 0,
  authTimeout: 60,
  autoRefresh: true,
  cacheEnabled: false,
  blockCrashLogs: false,
  restartOnCrash: m3lomhnet,
  throwErrorOnTosBlock: false,
  killProcessOnBrowserClose: true,
  deleteSessionDataOnLogout: false,
  skipBrokenMethodsCheck: true,
  skipUpdateCheck: true,
  disableSpins: true,
  useStealth: true,
  logConsole: false,
  logConsoleErrors: true,
  trace: true,
  popup: true,
  bypassCSP:true,
  chromiumArgs: ['--no-sandbox'],
}


create(sambosa)
  .then((m3) => m3lomhnet(m3))
  .catch(e => console.log('[ERROR]', e.message))
