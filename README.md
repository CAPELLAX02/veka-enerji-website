# VEKA ENERJİ Web Sitesi

VEKA Enerji'nin kurumsal web sitesi. Düz HTML + Tailwind CSS ile yazılmış, derleme çıktısı repoda tutulan statik bir sitedir; herhangi bir statik sunucuya (Nginx, Apache, Netlify, Vercel, GitHub Pages, cPanel…) dosyalar olduğu gibi yüklenerek yayınlanabilir.

## Sayfalar

| Dosya | İçerik |
| --- | --- |
| `index.html` | Ana sayfa — hero slider, rakamlar, hizmetler, çalışma modeli, proje haritası, en büyük ölçekli projeler, referans logoları |
| `hakkimizda.html` | Hakkımızda, misyon, vizyon, değerler, kamu kurumları |
| `hizmetler.html` | TM, RES, GES, HES, EİH (enerji iletim hatları), taahhüt, inşaat, lisanssız üretim |
| `projeler.html` | Tamamlanan / devam eden projeler, tür filtreleri, arama, Türkiye & dünya haritası, kurulu güç dağılımı |
| `referanslar.html` | Firmalar (sektördeki büyüklüğe göre) ve kamu kurumları |
| `ekibimiz.html` | Ekip yaklaşımı, rakamlar ve uzmanlık alanları |
| `kariyer.html` | Açık pozisyon (TM saha denetmeni), Kariyer.net yönlendirmesi ve başvuru formu |
| `iletisim.html` | İletişim bilgileri, teklif formu, harita |
| `404.html` | Bulunamadı sayfası |

## Geliştirme

```bash
npm install
npm run build        # proje verisini üretir, partial'ları sayfalara işler, CSS'i derler
npm run serve        # http://localhost:3000
```

Çalışırken iki ayrı terminalde `npm run watch:css` ve `npm run watch:html` kullanılabilir.

### Nasıl çalışır?

- **Ortak parçalar** — `partials/head.html`, `header.html`, `footer.html` dosyaları, `scripts/build-html.mjs` tarafından her sayfadaki `<!-- @head -->…<!-- /@head -->` gibi işaretlerin arasına yazılır. Menüde aktif sayfa otomatik işaretlenir. Header/footer'ı değiştirmek için yalnızca `partials/` altını düzenleyip `npm run build` çalıştırın.
- **İkonlar** — [Lucide](https://lucide.dev) ikon seti. Sayfada `<svg class="icon"><use href="#i-sun" /></svg>` yazmanız yeterli; build betiği kullanılan ikonları bulup sayfaya satır içi sprite olarak ekler.
- **Stiller** — `src/styles.css` (Tailwind v4 teması: marka renkleri, fontlar, bileşen sınıfları) → `assets/css/styles.css`.
- **Haritalar** — `scripts/build-maps.mjs`, il sınırlarından (`data/geo/tr-provinces.json`) ve Natural Earth verisinden `assets/maps/*.svg` üretir. Yalnızca harita görünümü değişecekse `npm run build:maps` çalıştırılır.
- **Fontlar** — Space Grotesk (başlıklar), IBM Plex Sans (metin), IBM Plex Mono (teknik etiketler) — Google Fonts.

## İçerik güncelleme

### Projeler — `data/projeler.json`

Tüm proje verisi tek dosyada, referans listesi tablosuyla aynı sütunlarla (`baslik`, `musteri`, `kategori`, `santralTuru`, `il`, `ilce`, `gerilimKv`, `mwm`, `mwe`, `kapsam`, `durum`, `eslesme` …). Siteye özel iki ek alan vardır:

- `ulke` — `Türkiye`, `Irak`, `Gürcistan` …
- `konum` — haritadaki nokta(lar): `[[enlem, boylam], …]`. Boş bırakılan proje listede görünür, haritada görünmez.

`npm run build` bu dosyadan `assets/js/projects-data.js`'i üretir; harita, filtreler, kartlar ve tüm rakamlar (toplam MW, proje / TM / il / ülke sayısı) buradan otomatik hesaplanır.

**Kurulu güç kuralı:** MW değeri yalnızca `eslesme` alanı `Enerji Atlası`, `Diğer kaynak` veya `Firma bilgisi` olan projelerde gösterilir ve toplama katılır. `Olası eşleşme` satırlarının değerleri teyit edildikten sonra `eslesme` alanını güncelleyin (ya da `scripts/build-projects.mjs` içindeki `CONFIRMED_SOURCES` listesine ekleyin). Aynı santrale ait ikinci kalem `ayniSantral` ile işaretlenir ve toplamda bir kez sayılır; `gucGosterme: true` bir projenin gücünü gizler.

Projeler sayfası adres çubuğundan filtrelenebilir: `projeler.html?tur=TM`, `projeler.html?durum=devam`.

### Referanslar — `data/referanslar.json`

`firmalar` listesi **sektördeki büyüklüğe göre** sıralıdır; sırayı değiştirmek için satırların yerini değiştirmeniz yeterli. Logo dosyaları `assets/img/references/` altındadır; `logo` alanı boş olan firma, adıyla (yazı olarak) gösterilir. Ana sayfadaki kayan logo bandı aynı listenin ilk `bantAdedi` logolu firmasından oluşur. Kamu kurumları (`kurumlar`) da aynı dosyadadır.

### Formlar

İletişim ve kariyer formları varsayılan olarak ziyaretçinin e-posta uygulamasını açar (`info@vekaenerji.com`). Bir form servisi (Formspree, Netlify Forms, kendi API'niz…) kullanmak için `<form>` etiketine `action="https://…"` eklemeniz yeterli; `assets/js/forms.js` formu o adrese gönderir.

## Teyit bekleyenler

- [ ] `Olası eşleşme` işaretli 10 projenin kapasite (MW) bilgileri — teyit edilene kadar gösterilmiyor ve toplama katılmıyor.
- [ ] Projelerdeki `yil` ve `durum` alanları referans tablosunda "tahmini" olarak işaretli (400 kV projelerin tamamı firma bilgisiyle "Tamamlanan" olarak güncellendi).
- [ ] Gülsan Korkuteli GES — tabloda ÇED sürecinin sonlandırıldığı notu var; kapasite gizlendi (`gucGosterme`).
- [ ] Gogni RES (Gürcistan) — VEKA'nın hizmet kapsamı ("Mühendislik ve proje hizmetleri" olarak yazıldı).
- [ ] New Azadi 132 kV GIS TM (Irak) — konum bilinmediği için haritada gösterilmiyor.
- [ ] Logosu bulunamayan firmalar (yazı olarak gösteriliyor): Mensis Enerji, Barkan Enerji, Yander Elektrik, Best Elektrik.
- [ ] Kariyer.net'teki ilanın doğrudan bağlantısı (şu an Kariyer.net'te "veka enerji" aramasına gidiyor).
- [ ] KVKK aydınlatma metni hazırlanınca formlardaki onay kutularına bağlantı eklenmesi.

## Görseller

Fotoğraflar [Unsplash](https://unsplash.com) lisansıyla (ticari kullanım serbest, atıf zorunlu değil) kullanılmıştır. Referans logoları ilgili firmaların ve kurumların tescilli markalarıdır.
