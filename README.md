# VEKA ENERJİ Web Sitesi

VEKA Enerji'nin kurumsal web sitesi. Düz HTML + Tailwind CSS ile yazılmış, derleme çıktısı repoda tutulan statik bir sitedir; herhangi bir statik sunucuya (Nginx, Apache, Netlify, Vercel, GitHub Pages, cPanel…) dosyalar olduğu gibi yüklenerek yayınlanabilir.

## Sayfalar

| Dosya | İçerik |
| --- | --- |
| `index.html` | Ana sayfa — hero slider, rakamlar, hizmetler, çalışma modeli, proje haritası, öne çıkan projeler, referanslar |
| `hakkimizda.html` | Hakkımızda, misyon, vizyon, değerler, kamu kurumları |
| `hizmetler.html` | GES, RES, HES, trafo merkezleri, nakil hatları, taahhüt, inşaat, lisanssız üretim |
| `projeler.html` | Tamamlanan / devam eden projeler, tür filtreleri, Türkiye & dünya haritası, kurulu güç dağılımı |
| `referanslar.html` | Firma ve kurum logoları |
| `ekibimiz.html` | Yönetim ekibi ve uzmanlık alanları |
| `kariyer.html` | Açık pozisyonlar ve başvuru formu |
| `iletisim.html` | İletişim bilgileri, teklif formu, harita |
| `404.html` | Bulunamadı sayfası |

## Geliştirme

```bash
npm install
npm run build        # partial'ları sayfalara işler + CSS'i derler
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

### Projeler

Tüm proje verisi tek dosyada: **`assets/js/projects-data.js`**. Harita işaretleri, filtreler, proje kartları ve toplam MW / proje / il sayıları bu listeden otomatik hesaplanır. Alanların açıklaması dosyanın başındadır. Kart görselleri `assets/img/photos/` altına eklenebilir.

Projeler sayfası adres çubuğundan filtrelenebilir: `projeler.html?tur=GES`, `projeler.html?durum=devam`.

### Formlar

İletişim ve kariyer formları varsayılan olarak ziyaretçinin e-posta uygulamasını açar (`info@vekaenerji.com`). Bir form servisi (Formspree, Netlify Forms, kendi API'niz…) kullanmak için `<form>` etiketine `action="https://…"` eklemeniz yeterli; `assets/js/forms.js` formu o adrese gönderir.

## Yayına almadan önce

- [ ] `assets/js/projects-data.js` içindeki **örnek projeleri** gerçek proje listesiyle değiştirin.
- [ ] `ekibimiz.html` içindeki **yer tutucu ekip kartlarını** (Ad Soyad) gerçek bilgiler ve fotoğraflarla güncelleyin.
- [ ] `kariyer.html` içindeki **örnek ilanları** güncelleyin.
- [ ] Referanslardaki **SPI** için logo dosyası ekleyin (`assets/img/references/`).
- [ ] KVKK aydınlatma metni hazırlanınca formlardaki onay kutularına bağlantı ekleyin.

## Görseller

Fotoğraflar [Unsplash](https://unsplash.com) lisansıyla (ticari kullanım serbest, atıf zorunlu değil) kullanılmıştır. Referans logoları ilgili firmaların ve kurumların tescilli markalarıdır.
