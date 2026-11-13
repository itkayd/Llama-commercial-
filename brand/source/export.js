const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const S=__dirname, KIT=path.join(S,'artboards'), OUT=path.join(S,'..','out'), LOGO=path.join(S,'..','logos'), FS=path.join(S,'node_modules','@fontsource'); fs.mkdirSync(OUT,{recursive:true});
const blobs={'45747eb1bfad2fb31f5d91890ad86247':'llama-commercial-logo-green.svg','4daefa90de90aaf6cbfb5b378997ee69':'llama-commercial-logo-white.svg',eb600a582d39b3385988a690e2831197:'llama-commercial-logo-green-descriptor.svg',dabd937533f0acb453058b548c9ac787:'llama-commercial-logo-white-descriptor.svg',ad611d59d5820cd9c3dac1da2c6247c1:'llama-commercial-stacked-green.svg','0dcc9dd6cce55c0e71b7c98afa7943a1':'llama-commercial-stacked-white.svg','6d24f1759fb724ffe604f8d902942d82':'llama-commercial-icon.svg'};
const fonts=`@font-face{font-family:Fraunces;font-weight:500;src:url(file://${FS}/fraunces/files/fraunces-latin-500-normal.woff2)}
@font-face{font-family:Fraunces;font-weight:600;src:url(file://${FS}/fraunces/files/fraunces-latin-600-normal.woff2)}
@font-face{font-family:Fraunces;font-weight:500;font-style:italic;src:url(file://${FS}/fraunces/files/fraunces-latin-500-italic.woff2)}
@font-face{font-family:Manrope;font-weight:400;src:url(file://${FS}/manrope/files/manrope-latin-400-normal.woff2)}
@font-face{font-family:Manrope;font-weight:500;src:url(file://${FS}/manrope/files/manrope-latin-500-normal.woff2)}
@font-face{font-family:Manrope;font-weight:700;src:url(file://${FS}/manrope/files/manrope-latin-700-normal.woff2)}
@font-face{font-family:"IBM Plex Mono";font-weight:500;src:url(file://${FS}/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2)}`;
function load(name,vars={}){
  let s=fs.readFileSync(`${KIT}/${name}.dc.html`,'utf8');
  const styles=[...s.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n');
  let body=s.split('</helmet>')[1].split('</x-dc>')[0];
  for(const [id,f] of Object.entries(blobs)) body=body.split('/_blob/'+id).join('file://'+LOGO+'/'+f);
  for(const [k,v] of Object.entries(vars)) body=body.split('{{'+k+'}}').join(v);
  return {styles,body};
}
function page({styles,body},{w,h,bleed=0,bleedBg='#fff',scale=1,pageW,pageH,headerBleed=false}){
  const W=w+2*bleed,H=h+2*bleed;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}
${pageW?`@page{size:${pageW} ${pageH};margin:0}`:''}
html,body{margin:0;padding:0}${styles}
.wrap{width:${W}px;height:${H}px;position:relative;transform:scale(${scale});transform-origin:0 0;overflow:hidden}
.inner{position:absolute;left:${bleed}px;top:${bleed}px;width:${w}px;height:${h}px}
${headerBleed?`.inner>div>div:first-child{margin:-${bleed}px -${bleed}px 0 !important;padding-top:${40+bleed}px !important;padding-left:${40+bleed}px !important;padding-right:${40+bleed}px !important}`:''}</style></head>
<body><div class="pg" style="width:${(W*scale).toFixed(3)}px;height:${(H*scale).toFixed(3)}px;overflow:hidden;position:relative"><div class="wrap" style="background:${bleedBg}"><div class="inner">${body}</div></div></div>
</body></html>`;
}
const mm=v=>v*96/25.4;
(async()=>{
  const b=await chromium.launch(); const ctx=await b.newContext({deviceScaleFactor:1}); const p=await ctx.newPage();
  const tmp=OUT+'/_tmp.html';
  async function pdf(parts,file,pw,ph){
    const outs=[];
    for(let i=0;i<parts.length;i++){
      fs.writeFileSync(tmp,parts[i]); await p.goto('file://'+tmp); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
      const o=OUT+'/_part'+i+'.pdf'; await p.pdf({path:o,width:pw,height:ph,printBackground:true,margin:{top:0,right:0,bottom:0,left:0},pageRanges:'1'}); outs.push(o);
    }
    require('child_process').execFileSync('python3',['-c',`import sys
from pypdf import PdfWriter
w=PdfWriter()
[w.append(f) for f in sys.argv[2:]]
w.write(sys.argv[1])`,OUT+'/'+file,...outs]); outs.forEach(f=>fs.unlinkSync(f));
  }
  async function png(html,file,w,h,dsf=1){
    fs.writeFileSync(tmp,html); const pg=await (await b.newContext({deviceScaleFactor:dsf,viewport:{width:w,height:h}})).newPage();
    await pg.goto('file://'+tmp); await pg.evaluate(()=>document.fonts.ready); await pg.waitForTimeout(300);
    await pg.screenshot({path:OUT+'/'+file,clip:{x:0,y:0,width:w,height:h}}); await pg.context().close();
  }
  // Business card: 85x55mm at 8px/mm, 3mm bleed = 24px
  const cs=mm(91)/(680+48);
  const cf=page(load('BusinessCardFront'),{w:680,h:440,bleed:24,bleedBg:'#173D36',scale:cs,pageW:'91mm',pageH:'61mm'});
  const cb=page(load('BusinessCardBack'),{w:680,h:440,bleed:24,bleedBg:'#FFFFFF',scale:cs,pageW:'91mm',pageH:'61mm'});
  await pdf([cf,cb],'llama-commercial-business-card-print-91x61mm-bleed.pdf','91mm','61mm');
  // Flyer A5: 4px/mm, bleed 12px
  const fsc=mm(154)/(592+24);
  await pdf([page(load('FlyerA5'),{w:592,h:840,bleed:12,bleedBg:'#FFFFFF',scale:fsc,pageW:'154mm',pageH:'216mm',headerBleed:true})],'llama-commercial-flyer-A5-print-154x216mm-bleed.pdf','154mm','216mm');
  // A4 docs: 794x1123 at 96dpi = A4
  for(const [n,f,v] of [['Letterhead','llama-commercial-letterhead-A4.pdf',{}],['Quote','llama-commercial-quote-A4.pdf',{docType:'Quote'}],['Quote','llama-commercial-invoice-A4.pdf',{docType:'Invoice'}]])
    await pdf([page(load(n,v),{w:794,h:1123,pageW:'210mm',pageH:'297mm'})],f,'210mm','297mm');
  // PNGs
  for(const [n,w,h,f,d] of [['SocialProof',1080,1080,'llama-commercial-ad-llama-clean-that-1080x1080.png',1],['SocialGuarantee',1080,1080,'llama-commercial-ad-what-we-clean-1080x1080.png',1],['SocialStory',1080,1920,'llama-commercial-ad-story-1080x1920.png',1],['LinkedInBanner',1584,396,'llama-commercial-linkedin-banner-1584x396.png',1],['PhotoReport',1080,1350,'llama-commercial-site-specification-1080x1350.png',1],['EmailSignature',600,200,'llama-commercial-email-signature.png',2],['Main',1280,800,'llama-commercial-brand-sheet.png',2],['BusinessCardFront',680,440,'preview-business-card-front.png',1],['BusinessCardBack',680,440,'preview-business-card-back.png',1],['FlyerA5',592,840,'preview-flyer.png',1],['Uniform',1000,620,'llama-commercial-uniform-spec.png',2]])
    await png(page(load(n),{w,h}),f,w,h,d);
  fs.unlinkSync(tmp); await b.close(); console.log(fs.readdirSync(OUT).join('\n'));
})();
