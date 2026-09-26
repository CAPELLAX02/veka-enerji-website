/*
 * VEKA Enerji — proje listesi
 * ---------------------------------------------------------------------------
 * ⚠️  ÖRNEK VERİ: Aşağıdaki projeler sitenin yapısını göstermek için eklenmiş
 *     yer tutuculardır. Yayına almadan önce gerçek proje listesiyle değiştirin.
 *
 * Alanlar
 *   id        benzersiz kısa anahtar
 *   name      proje adı
 *   type      'GES' | 'RES' | 'HES' | 'TM' | 'ENH'
 *   status    'tamamlandi' | 'devam'
 *   mw        kurulu güç (MW / MWp) — GES, RES, HES için; toplam güç istatistiğine eklenir
 *   capacity  ekranda gösterilecek kapasite metni (örn. "2×100 MVA", "48 km")
 *   voltage   gerilim seviyesi (TM / ENH için, isteğe bağlı)
 *   il        il adı (haritada ilin vurgulanması için assets/maps/turkiye.svg ile birebir aynı yazılmalı)
 *   country   ülke adı (varsayılan: Türkiye)
 *   lat, lon  konum (ondalık derece)
 *   route     ENH için güzergâh: [[lat, lon], [lat, lon], ...] (isteğe bağlı)
 *   year      tamamlanma / planlanan yıl
 *   scope     verilen hizmetler
 *   image     kart görseli (assets/img/photos/...)
 */
window.VEKA_PROJECTS = [
  // --- GES -----------------------------------------------------------------
  {
    id: 'konya-karatay-ges', name: 'Karatay GES', type: 'GES', status: 'tamamlandi',
    mw: 48, capacity: '48 MWp', il: 'Konya', lat: 37.95, lon: 32.62, year: 2024,
    scope: ['Fizibilite', 'Bakanlık Kati Proje', 'TEDAŞ Onayı', 'Geçici Kabul'],
    image: 'assets/img/photos/ges-aerial.webp',
  },
  {
    id: 'karaman-ges', name: 'Karaman GES', type: 'GES', status: 'tamamlandi',
    mw: 25, capacity: '25 MWp', il: 'Karaman', lat: 37.18, lon: 33.22, year: 2023,
    scope: ['Ön Proje', 'Kati Proje', 'Danışmanlık'],
    image: 'assets/img/photos/ges-field.webp',
  },
  {
    id: 'nigde-bor-ges', name: 'Bor GES', type: 'GES', status: 'tamamlandi',
    mw: 18, capacity: '18 MWp', il: 'Niğde', lat: 37.89, lon: 34.56, year: 2022,
    scope: ['Kati Proje', 'Geçici Kabul'],
    image: 'assets/img/photos/ges-rows.webp',
  },
  {
    id: 'burdur-ges', name: 'Burdur GES', type: 'GES', status: 'tamamlandi',
    mw: 12, capacity: '12 MWp', il: 'Burdur', lat: 37.72, lon: 30.29, year: 2021,
    scope: ['Lisanssız Üretim Danışmanlığı', 'TEDAŞ Onayı'],
    image: 'assets/img/photos/ges-hardhat.webp',
  },
  {
    id: 'viransehir-ges', name: 'Viranşehir GES', type: 'GES', status: 'devam',
    mw: 60, capacity: '60 MWp', il: 'Şanlıurfa', lat: 37.23, lon: 39.76, year: 2026,
    scope: ['Fizibilite', 'Kati Proje', 'Taahhüt'],
    image: 'assets/img/photos/ges-desert.webp',
  },
  {
    id: 'develi-ges', name: 'Develi GES', type: 'GES', status: 'devam',
    mw: 30, capacity: '30 MWp', il: 'Kayseri', lat: 38.39, lon: 35.49, year: 2026,
    scope: ['Ön Proje', 'Kati Proje'],
    image: 'assets/img/photos/ges-worker.webp',
  },

  // --- RES -----------------------------------------------------------------
  {
    id: 'balikesir-res', name: 'Balıkesir RES', type: 'RES', status: 'tamamlandi',
    mw: 72, capacity: '72 MW', il: 'Balıkesir', lat: 39.65, lon: 27.88, year: 2023,
    scope: ['Şalt Sahası Projesi', 'Kati Proje', 'Geçici Kabul'],
    image: 'assets/img/photos/res-sunset.webp',
  },
  {
    id: 'aliaga-res', name: 'Aliağa RES', type: 'RES', status: 'tamamlandi',
    mw: 45, capacity: '45 MW', il: 'İzmir', lat: 38.8, lon: 26.97, year: 2022,
    scope: ['Kati Proje', 'Danışmanlık'],
    image: 'assets/img/photos/res-golden.webp',
  },
  {
    id: 'ezine-res', name: 'Ezine RES', type: 'RES', status: 'tamamlandi',
    mw: 54, capacity: '54 MW', il: 'Çanakkale', lat: 39.79, lon: 26.33, year: 2021,
    scope: ['Fizibilite', 'Kati Proje'],
    image: 'assets/img/photos/hero-res.webp',
  },
  {
    id: 'bahce-res', name: 'Bahçe RES', type: 'RES', status: 'tamamlandi',
    mw: 60, capacity: '60 MW', il: 'Osmaniye', lat: 37.2, lon: 36.57, year: 2024,
    scope: ['Kati Proje', 'Test ve Devreye Alma'],
    image: 'assets/img/photos/res-steppe.webp',
  },
  {
    id: 'sarkoy-res', name: 'Şarköy RES', type: 'RES', status: 'devam',
    mw: 36, capacity: '36 MW', il: 'Tekirdağ', lat: 40.61, lon: 27.11, year: 2026,
    scope: ['Ön Proje', 'Kati Proje'],
    image: 'assets/img/photos/res-fog.webp',
  },
  {
    id: 'sivas-res', name: 'Sivas RES', type: 'RES', status: 'devam',
    mw: 96, capacity: '96 MW', il: 'Sivas', lat: 39.75, lon: 37.02, year: 2027,
    scope: ['Fizibilite', 'Kati Proje', 'Taahhüt'],
    image: 'assets/img/photos/res-crane.webp',
  },

  // --- HES -----------------------------------------------------------------
  {
    id: 'artvin-hes', name: 'Çoruh Vadisi HES', type: 'HES', status: 'tamamlandi',
    mw: 42, capacity: '42 MW', il: 'Artvin', lat: 41.18, lon: 41.82, year: 2020,
    scope: ['Şalt Sahası Projesi', 'Kati Proje'],
    image: 'assets/img/photos/hes-dam.webp',
  },
  {
    id: 'ikizdere-hes', name: 'İkizdere HES', type: 'HES', status: 'tamamlandi',
    mw: 18, capacity: '18 MW', il: 'Rize', lat: 40.78, lon: 40.56, year: 2019,
    scope: ['Kati Proje', 'Geçici Kabul'],
    image: 'assets/img/photos/hes-spill.webp',
  },
  {
    id: 'kastamonu-hes', name: 'Kastamonu HES', type: 'HES', status: 'tamamlandi',
    mw: 9.6, capacity: '9,6 MW', il: 'Kastamonu', lat: 41.38, lon: 33.78, year: 2021,
    scope: ['Danışmanlık', 'TEDAŞ Onayı'],
    image: 'assets/img/photos/hes-river.webp',
  },
  {
    id: 'kemah-hes', name: 'Kemah HES', type: 'HES', status: 'devam',
    mw: 24, capacity: '24 MW', il: 'Erzincan', lat: 39.6, lon: 39.03, year: 2026,
    scope: ['Fizibilite', 'Ön Proje'],
    image: 'assets/img/photos/hes-aerial.webp',
  },

  // --- TM ------------------------------------------------------------------
  {
    id: 'ankara-tm', name: 'Ankara 154/34,5 kV TM', type: 'TM', status: 'tamamlandi',
    capacity: '2×100 MVA', voltage: '154/34,5 kV', il: 'Ankara', lat: 39.87, lon: 32.75, year: 2023,
    scope: ['Primer Proje', 'Sekonder Proje', 'İnşaat Projesi', 'Çelik Tasarım'],
    image: 'assets/img/photos/tm-yard.webp',
  },
  {
    id: 'soma-tm', name: 'Soma 380/154 kV TM', type: 'TM', status: 'devam',
    capacity: '2×250 MVA', voltage: '380/154 kV', il: 'Manisa', lat: 39.19, lon: 27.61, year: 2026,
    scope: ['Primer Proje', 'Sekonder Proje', 'Müşavirlik'],
    image: 'assets/img/photos/tm-transformer.webp',
  },
  {
    id: 'adana-tm', name: 'Adana 154 kV TM', type: 'TM', status: 'tamamlandi',
    capacity: '100 MVA', voltage: '154/34,5 kV', il: 'Adana', lat: 37.0, lon: 35.32, year: 2022,
    scope: ['İnşaat Montaj', 'Sekonder Montaj', 'Test ve Devreye Alma'],
    image: 'assets/img/photos/tm-insulators.webp',
  },
  {
    id: 'samsun-tm', name: 'Samsun 154 kV TM', type: 'TM', status: 'tamamlandi',
    capacity: '2×100 MVA', voltage: '154/34,5 kV', il: 'Samsun', lat: 41.29, lon: 36.33, year: 2024,
    scope: ['Primer Proje', 'Çelik Tasarım', 'Danışmanlık'],
    image: 'assets/img/photos/hero-tm.webp',
  },
  {
    id: 'gaziantep-tm', name: 'Gaziantep 154 kV TM', type: 'TM', status: 'devam',
    capacity: '100 MVA', voltage: '154/34,5 kV', il: 'Gaziantep', lat: 37.07, lon: 37.38, year: 2026,
    scope: ['Zemin Etüdü', 'Topraklama Ölçümleri', 'Çelik Montaj'],
    image: 'assets/img/photos/tm-station.webp',
  },

  // --- ENH -----------------------------------------------------------------
  {
    id: 'kayseri-nigde-enh', name: 'Kayseri – Niğde 154 kV ENH', type: 'ENH', status: 'tamamlandi',
    capacity: '84 km', voltage: '154 kV', il: 'Kayseri', lat: 38.3, lon: 35.1, year: 2022,
    route: [[38.72, 35.48], [38.45, 35.2], [38.15, 34.9], [37.97, 34.68]],
    scope: ['Etüt', 'Kamulaştırma', 'Proje'],
    image: 'assets/img/photos/enh-towers.webp',
  },
  {
    id: 'balikesir-enh', name: 'Balıkesir 380 kV ENH', type: 'ENH', status: 'devam',
    capacity: '46 km', voltage: '380 kV', il: 'Balıkesir', lat: 39.45, lon: 27.55, year: 2026,
    route: [[39.65, 27.88], [39.5, 27.65], [39.3, 27.45], [39.19, 27.61]],
    scope: ['Etüt', 'Proje'],
    image: 'assets/img/photos/enh-pylon.webp',
  },

  // --- Yurt dışı -------------------------------------------------------------
  {
    id: 'semerkant-ges', name: 'Semerkant GES', type: 'GES', status: 'devam',
    mw: 100, capacity: '100 MWp', country: 'Özbekistan', lat: 39.65, lon: 66.96, year: 2027,
    scope: ['Fizibilite', 'Danışmanlık'],
    image: 'assets/img/photos/hybrid.webp',
  },
  {
    id: 'absheron-res', name: 'Abşeron RES', type: 'RES', status: 'tamamlandi',
    mw: 40, capacity: '40 MW', country: 'Azerbaycan', lat: 40.45, lon: 49.95, year: 2024,
    scope: ['Şalt Sahası Projesi', 'Danışmanlık'],
    image: 'assets/img/photos/res-golden.webp',
  },
];
