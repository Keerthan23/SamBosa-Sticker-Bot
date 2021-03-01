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

// a: جميع الحقوق محفوظة لموقع معلومة نت 
// a: لمزيد من البوتات ارجو زيارة الموقع
// a: للتواصل معي ry2n711@gmaail.com || telegarm @m3lomhnet
// a: ارجو عدم ازالة حقوق البرمجة 

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
    const a = "Sticker"                //ضع هنا حقوق البوت التي تظهر اسفل الملصق للصور … يجب الاتحتوي على زخارف او ايموجي فقط بالانجيليزي
    const b = "SamBosa bot"            //ضع هنا حقوق البوت التي تظهر اسفل الملصق للصور … يجب الاتحتوي على زخارف او ايموجي فقط بالانجيليزي
    const author = "Sticker"                    //ضع هنا حقوق البوت التي تظهر اسفل الملصق للفيديو … يمكن ان يحتوي على زخارف او ايموجي
    const pack = "🤖 Bot SamBosa 🤖"      //ضع هنا حقوق البوت التي تظهر اسفل الملصق للفيديو … يمكن ان يحتوي على زخارف او ايموجي
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
m3.sendText(from, 'استمتع بالملصق الخاص بك 🎁')
})
 } else if (quotedMsg && quotedMsgObj.mimetype == 'image/gif') {
      const shape = ""
      const type = "gif"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'استمتع بالملصق الخاص بك 🎁')
})
 } else if (isMedia && mimetype == 'video/mp4') {
      const shape = ""
      const type = "mp4"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
 m3.sendText(from, 'استمتع بالملصق الخاص بك 🎁')
                             })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'video/mp4') {
      const shape = ""
      const type = "mp4"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'استمتع بالملصق الخاص بك 🎁')
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
m3.sendText(from, 'استمتع بالملصق الخاص بك 🎁')
})
 } else if (quotedMsg && quotedMsgObj.mimetype == 'image/gif') {
      const shape = ""
      const type = "gif"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'استمتع بالملصق الخاص بك 🎁')
})
 } else if (isMedia && mimetype == 'video/mp4') {
      const shape = ""
      const type = "mp4"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
 m3.sendText(from, 'استمتع بالملصق الخاص بك 🎁')
                             })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'video/mp4') {
      const shape = ""
      const type = "mp4"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'استمتع بالملصق الخاص بك 🎁')
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
m3.sendText(from, 'استمتع بالملصق الخاص بك 🎁')
            })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'image/gif') {
      const shape = "circle"
      const type = "gif"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'استمتع بالملصق الخاص بك 🎁')
            })
    } else if (isMedia && mimetype == 'video/mp4') {
      const shape = "circle"
      const type = "mp4"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'استمتع بالملصق الخاص بك 🎁')
           })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'video/mp4') {
      const shape = "circle"
      const type = "mp4"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => m3.sendRawWebpAsSticker(from, res.toString("base64"))).then(() => {
m3.sendText(from, 'استمتع بالملصق الخاص بك 🎁')
           })
    }
  }  else if ((txt == "hi") || (txt == "سمبوسه") || (txt == "بوت") || (txt == "Helo")) {
    let sm = "▪ مرحبًا بك ، لتحويل الفيديو او gif او صورة  الى ملصق قم بإرسالها وكتابة الامر *sticker* اثناء الإرسال  او رداً عليه  👋\n"
    sm += "▪ لتغيير حقوق الفيديو او الـ gif اختر الأمر رقم *(1)* 🖋️\n"
    sm += "▪ لتحويل الفيديو او gif الى ملصق دائري استعمل الأمر رقم (2) 🤡\n"
    sm += "▪ اقصى مدة للفيديو 14 ثانية ⏳\n"
    sm += "▪ للمصقات الشفافة ارسل GIF كمستند 📄\n"
    sm += "▪ لايمكن تغيير حقوق الصور 🖼️\n"
    sm += "▪ لتحويل الملصق الى صورة استعمل الأمر رقم (3) \n"
    sm += "▪ لبكجات الملصقات استعمل الأمر رقم (4) 📦 \n"
    sm += " \n\n"
    sm += "🤖  *أوآمر البوت*  🤖\n\n"
    sm += "      *(1)*  \n"
    sm += "▪ sticker pack | author\n"
    sm += "      *(2)*  \n"
    sm += "▪ circlesticker pack | author\n"
    sm += "      *(3)*  \n"
    sm += "▪ img \n\n"
    sm += "      *(4)*  \n"
    sm += "▪ pack \n\n"
    sm += "```author = اسم المؤلف```\n\n"
    sm += "```pack = اسم حزمة الملصقات```\n\n"
    sm += "ℹ️ تابعني على تيليجرام @gif711 إذا تم حظر هذا الروبوت ، فسيتم نشر رقم جديد هناك \n"
    sml = "▪ ارجو عدم إرسال صور شخصية 🧍\n"
    m3.sendText(from, sm)
    m3.sendText(from, sml)
    m3.sendImage(from, './img/test.jpg', 'test.jpg', 'مثال على استعمال الأوامر')
  }  else if (txt === 'img') {
     if (quotedMsg) {
    if(quotedMsg.type === 'sticker') {
   const uaOverride = process.env.UserAgent
   const mediaData = await decryptMedia(quotedMsg, uaOverride)
   await m3.sendFile(from, `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`, 'toimg.jpg', ` تم تحويل الملصق الى صورة بنجاح ✅`, id)}}
   
   } else if (txt == "1") {
    let sm = "▪ استعمل الأمر *sticker pack | author* اسفل الفيديو او رداً على الفيديو\n"
    m3.sendText(from, sm)
    } else if (txt == "2") {
    let sm = "▪ استعمل الأمر *circlesticker pack | author* اسفل الفيديو او رداً على الفيديو\n"
    m3.sendText(from, sm)
    } else if (txt == "3") {
    let sm = "▪ أرسل الملصق وقم بالرد عليه بالأمر img \n"
    m3.sendText(from, sm)
    } else if (txt == "4") {
    let sm = "▪ لإرسال بكجات ملصقات أرسل كلمة *pack* \n"
    m3.sendText(from, sm)
    } else if (txt == "pack") {
    let sm = "❊ يجب عليك تحميل تطبيق ```Sticker Maker``` لفتح البكجات 🔓 \n"
    sm += "❊ من فضلك اكتب إسم المجموعة وسأقوم بإرسالها 📦 \n"
    sm += "▪ توم وجيري \n"
    sm += "▪ اطفال \n"
    sm += "▪ سبونج \n"
    sm += "▪ كلب \n"
    sm += "▪ سيمبسونز \n"
    sm += "▪ شركة المرعبين \n"
    sm += "▪ ضفدع \n"
    sm += "▪ كلمات \n"
    sm += "▪ كلنا مسؤول \n"
    sm += "▪ مضاد \n"    
    sm += "▪ منوعات \n"                
    sm += "❊ روابط تحميل تطبيق ```Sticker Maker``` \n" 
    sm += "https://play.google.com/store/apps/details?id=com.marsvard.stickermakerforwhatsapp&hl=ar&gl=US || اندرويد \n" 
    sm += "https://apps.apple.com/us/app/sticker-maker-studio/id1443326857 || ايفون\n"            
    m3.sendText(from, sm)
    } else if ((txt == "توم وجيري") || (txt == "توم و جيري")) {
 m3.sendText(from, 'ساقوم بإرسل البكج انتظر قليلاً ⏳')
 m3.sendFile(from, './img/pkg/توم وجيري.wastickers', 'توم وجيري.wastickers')
 m3.sendFile(from, './img/pkg/توم وجيري 2.wastickers', 'توم وجيري 2.wastickers')
 m3.sendFile(from, './img/pkg/توم وجيري 3.wastickers', 'توم وجيري 3.wastickers')
 m3.sendFile(from, './img/pkg/توم وجيري 4.wastickers', 'توم وجيري 4.wastickers');
 
 } else if ((txt == "سبونج") || (txt == "سبونج بوب")) {
 m3.sendText(from, 'ساقوم بإرسل البكج انتظر قليلاً ⏳')
 m3.sendFile(from, './img/pkg/سبونج.wastickers', 'سبونج.wastickers')
 m3.sendFile(from, './img/pkg/سبونج 2.wastickers', 'سبونج 2.wastickers')
 m3.sendFile(from, './img/pkg/سبونج 3.wastickers', 'سبونج 3.wastickers');
 
 } else if ((txt == "كلب") || (txt == "dog")) {
 m3.sendText(from, 'ساقوم بإرسل البكج انتظر قليلاً ⏳')
 m3.sendFile(from, './img/pkg/dog.wastickers', 'dog.wastickers');
 
 } else if ((txt == "سيمبسونز") || (txt == "Simpsons")) {
 m3.sendText(from, 'ساقوم بإرسل البكج انتظر قليلاً ⏳')
 m3.sendFile(from, './img/pkg/Simpsons1.wastickers', 'Simpsons1.wastickers')
 m3.sendFile(from, './img/pkg/Simpsons2.wastickers', 'Simpsons2.wastickers')
 m3.sendFile(from, './img/pkg/Simpsons3.wastickers', 'Simpsons3.wastickers')
 m3.sendFile(from, './img/pkg/Simpsons4.wastickers', 'Simpsons4.wastickers');
 
 } else if ((txt == "شركة المرعبين") || (txt == "شركة المرعبين المحدودة")) {
 m3.sendText(from, 'ساقوم بإرسل البكج انتظر قليلاً ⏳')
 m3.sendFile(from, './img/pkg/شركة المرعبين المحدودة.wastickers', 'شركة المرعبين المحدودة.wastickers');
 
 } else if ((txt == "ضفدع") || (txt == "frog")) {
 m3.sendText(from, 'ساقوم بإرسل البكج انتظر قليلاً ⏳')
 m3.sendFile(from, './img/pkg/ضفدع 1.wastickers', 'ضفدع 1.wastickers')
 m3.sendFile(from, './img/pkg/ضفدع 2.wastickers', 'ضفدع 2.wastickers')
 m3.sendFile(from, './img/pkg/ضفدع 3.wastickers', 'ضفدع 3.wastickers');
 
 } else if (txt == "كلمات") {
 m3.sendText(from, 'ساقوم بإرسل البكج انتظر قليلاً ⏳')
 m3.sendFile(from, './img/pkg/كلمات.wastickers', 'كلمات.wastickers');
 
 } else if ((txt == "كلنا مسؤول") || (txt == "كلنا مسول")) {
 m3.sendText(from, 'ساقوم بإرسل البكج انتظر قليلاً ⏳')
 m3.sendFile(from, './img/pkg/كلنا مسؤول.wastickers', 'كلنا مسؤول.wastickers');
 
 } else if (txt == "مضاد") {
 m3.sendText(from, 'ساقوم بإرسل البكج انتظر قليلاً ⏳')
 m3.sendFile(from, './img/pkg/مضاد.wastickers', 'مضاد.wastickers');
 
 } else if (txt == "منوعات") {
 m3.sendText(from, 'ساقوم بإرسل البكج انتظر قليلاً ⏳')
 m3.sendFile(from, './img/pkg/منوعات.wastickers', 'منوعات.wastickers');
 
 } else if ((txt == "اطفال") || (txt == "أطفال")) {
 m3.sendText(from, 'ساقوم بإرسل البكج انتظر قليلاً ⏳')
 m3.sendFile(from, './img/pkg/اطفال.wastickers', 'اطفال.wastickers');
 
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
      "api_key": "JDJiJDEwJEtBMm0wUDRzRmZnZjFLSTFhTkdCT3VKTnN1dHouenh4VlVlUVVqcHlVMWk1SURnSnpUZjNl",
// api_key تأخذه من موقع https://stickerman.org || سجل في الموقع للحصول عليه
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
