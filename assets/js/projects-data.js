/*
 * Bu dosya data/projeler.json dosyasından otomatik üretilir (scripts/build-projects.mjs).
 * Elle düzenlemeyin — data/projeler.json'u güncelleyip `npm run build` çalıştırın.
 */
window.VEKA_PROJECTS = [
 {
  "id": 1,
  "name": "154 kV & 420 kV Trafo Merkezleri (14 adet)",
  "client": "Mensis Enerji",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Türkiye",
  "country": "Türkiye",
  "provinces": [],
  "points": null,
  "voltage": "154/420 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": "14 adet TM",
  "scope": "TM primer, inşaat ve sekonder projeleri; keşif, metraj, şartname; TEİAŞ onayı",
  "substations": 14
 },
 {
  "id": 2,
  "name": "Mihalıççık GES 400 kV TM",
  "client": "Mensis Enerji",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Mihalıççık, Eskişehir",
  "country": "Türkiye",
  "provinces": [
   "Eskişehir"
  ],
  "points": [
   [
    39.867,
    31.496
   ]
  ],
  "voltage": "400 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "400 kV TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 3,
  "name": "Erdemir Malatya GES 400 kV TM",
  "client": "Mensis Enerji",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Hekimhan, Malatya",
  "country": "Türkiye",
  "provinces": [
   "Malatya"
  ],
  "points": [
   [
    38.817,
    37.931
   ]
  ],
  "voltage": "400 kV",
  "mw": 235.4,
  "capacity": "235,4 MW",
  "countMw": true,
  "detail": "Saha alanı: 361,46 ha",
  "scope": "400 kV TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 4,
  "name": "Kılıçlar GES 400 kV TM",
  "client": "Mensis Enerji",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Sivrihisar, Eskişehir",
  "country": "Türkiye",
  "provinces": [
   "Eskişehir"
  ],
  "points": [
   [
    39.451,
    31.537
   ]
  ],
  "voltage": "400 kV",
  "mw": 87,
  "capacity": "87 MW",
  "countMw": true,
  "detail": "203.661 panel",
  "scope": "400 kV TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 5,
  "name": "Çorum RES (YEKA RES-3, Osmancık)",
  "client": "Rönesans Holding",
  "type": "RES",
  "types": [
   "RES"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Osmancık, Çorum",
  "country": "Türkiye",
  "provinces": [
   "Çorum"
  ],
  "points": [
   [
    40.971,
    34.801
   ]
  ],
  "voltage": null,
  "mw": 56,
  "capacity": "56 MW",
  "countMw": true,
  "detail": "8 × Nordex N163",
  "scope": "YEKA kapsamında ön proje ve kati projeler; ETKB onayı",
  "substations": 0
 },
 {
  "id": 6,
  "name": "Sivas RES (YEKA RES-3, Kayalar)",
  "client": "Rönesans Holding",
  "type": "RES",
  "types": [
   "RES"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Sivas",
  "country": "Türkiye",
  "provinces": [
   "Sivas"
  ],
  "points": [
   [
    39.75,
    37.015
   ]
  ],
  "voltage": null,
  "mw": 49,
  "capacity": "49 MW",
  "countMw": true,
  "detail": "7 × Nordex N163",
  "scope": "YEKA kapsamında ön proje ve kati projeler; ETKB onayı",
  "substations": 0
 },
 {
  "id": 7,
  "name": "Kırşehir Lisanssız GES (Koyuneli)",
  "client": "Rönesans Holding",
  "type": "GES",
  "types": [
   "GES"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Kırşehir",
  "country": "Türkiye",
  "provinces": [
   "Kırşehir"
  ],
  "points": [
   [
    39.146,
    34.161
   ]
  ],
  "voltage": null,
  "mw": 15.6,
  "capacity": "15,6 MW",
  "countMw": true,
  "detail": null,
  "scope": "Lisanssız GES TEDAŞ projeleri ve onayları",
  "substations": 0
 },
 {
  "id": 8,
  "name": "Şanlıurfa HES Kapasite Artışı",
  "client": "Rönesans Holding",
  "type": "HES",
  "types": [
   "HES"
  ],
  "plant": "HES",
  "status": "tamamlandi",
  "location": "Haliliye, Şanlıurfa",
  "country": "Türkiye",
  "provinces": [
   "Şanlıurfa"
  ],
  "points": [
   [
    37.167,
    38.796
   ]
  ],
  "voltage": null,
  "mw": 51,
  "capacity": "51 MW",
  "countMw": true,
  "detail": "2 ünite (mevcut)",
  "scope": "Kapasite artışı projeleri; ETKB onayı",
  "substations": 0
 },
 {
  "id": 9,
  "name": "5 Adet Lisanssız RES (İzmir)",
  "client": "Rönesans Holding",
  "type": "RES",
  "types": [
   "RES"
  ],
  "plant": "RES",
  "status": "devam",
  "location": "İzmir",
  "country": "Türkiye",
  "provinces": [
   "İzmir"
  ],
  "points": [
   [
    38.419,
    27.128
   ]
  ],
  "voltage": null,
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "Lisanssız RES projeleri; TEDAŞ onayları",
  "substations": 0
 },
 {
  "id": 10,
  "name": "Döşemealtı TM (İTM)",
  "client": "Girişim Elektrik",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Döşemealtı, Antalya",
  "country": "Türkiye",
  "provinces": [
   "Antalya"
  ],
  "points": [
   [
    37.023,
    30.601
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "İTM kapsamında anahtar teslim TM proje hizmetleri; TEİAŞ onayı",
  "substations": 1
 },
 {
  "id": 11,
  "name": "Narlı TM (İTM)",
  "client": "Girişim Elektrik",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Pazarcık, Kahramanmaraş",
  "country": "Türkiye",
  "provinces": [
   "Kahramanmaraş"
  ],
  "points": [
   [
    37.489,
    37.294
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "İTM kapsamında anahtar teslim TM proje hizmetleri; TEİAŞ onayı",
  "substations": 1
 },
 {
  "id": 12,
  "name": "Korkuteli TM (İTM)",
  "client": "Girişim Elektrik",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Korkuteli, Antalya",
  "country": "Türkiye",
  "provinces": [
   "Antalya"
  ],
  "points": [
   [
    37.067,
    30.197
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "İTM kapsamında anahtar teslim TM proje hizmetleri; TEİAŞ onayı",
  "substations": 1
 },
 {
  "id": 13,
  "name": "Şapdağı RES",
  "client": "Barkan Enerji",
  "type": "RES",
  "types": [
   "RES"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Havran, Balıkesir",
  "country": "Türkiye",
  "provinces": [
   "Balıkesir"
  ],
  "points": [
   [
    39.558,
    27.1
   ]
  ],
  "voltage": "154/33 kV",
  "mw": 55,
  "capacity": "55 MW",
  "countMw": true,
  "detail": "19 türbin",
  "scope": "Kati proje dosyası ve onayları",
  "substations": 0
 },
 {
  "id": 14,
  "name": "Kayseri Yahyalı RES",
  "client": "Bak Enerji",
  "type": "RES",
  "types": [
   "RES"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Yahyalı, Kayseri",
  "country": "Türkiye",
  "provinces": [
   "Kayseri"
  ],
  "points": [
   [
    38.1,
    35.354
   ]
  ],
  "voltage": null,
  "mw": 91.5,
  "capacity": "91,5 MW",
  "countMw": true,
  "detail": "27 türbin; tam kapasite 93 MWe",
  "scope": "Kati projeler; ETKB onayı",
  "substations": 0
 },
 {
  "id": 15,
  "name": "Konyaray, Kılıçlar, Gaziray 154/27,5 kV TM'ler",
  "client": "TCDD",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Konya / Gaziantep",
  "country": "Türkiye",
  "provinces": [
   "Konya",
   "Gaziantep"
  ],
  "points": [
   [
    37.873,
    32.492
   ],
   [
    37.063,
    37.379
   ]
  ],
  "voltage": "154/27,5 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": "Demiryolu cer TM'leri",
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 16,
  "name": "Taşpınar RES",
  "client": "Galata Wind",
  "type": "RES",
  "types": [
   "RES"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Mustafakemalpaşa, Bursa",
  "country": "Türkiye",
  "provinces": [
   "Bursa"
  ],
  "points": [
   [
    40.035,
    28.413
   ]
  ],
  "voltage": null,
  "mw": 73,
  "capacity": "73 MW",
  "countMw": true,
  "detail": "14 türbin",
  "scope": "Kati projeler; ETKB onayı",
  "substations": 0
 },
 {
  "id": 17,
  "name": "Mersinli RES",
  "client": "Yander Elektrik",
  "type": "RES",
  "types": [
   "RES"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Bayındır, İzmir",
  "country": "Türkiye",
  "provinces": [
   "İzmir"
  ],
  "points": [
   [
    38.22,
    27.648
   ]
  ],
  "voltage": null,
  "mw": 55,
  "capacity": "55 MW",
  "countMw": true,
  "detail": "13 × Nordex",
  "scope": "Kati projeler; ETKB onayı",
  "substations": 0
 },
 {
  "id": 18,
  "name": "Elmacık RES",
  "client": "Metgün Enerji",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Kırklareli",
  "country": "Türkiye",
  "provinces": [
   "Kırklareli"
  ],
  "points": [
   [
    41.737,
    27.224
   ]
  ],
  "voltage": null,
  "mw": 70,
  "capacity": "70 MW",
  "countMw": true,
  "detail": "12 × Nordex N163/5.9",
  "scope": "Trafo merkezi ve kati projeler",
  "substations": 1
 },
 {
  "id": 19,
  "name": "Atakale RES TM",
  "client": "Ataseven Enerji",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Keskin, Kırıkkale",
  "country": "Türkiye",
  "provinces": [
   "Kırıkkale"
  ],
  "points": [
   [
    39.674,
    33.615
   ]
  ],
  "voltage": "154 kV",
  "mw": 40,
  "capacity": "40 MW",
  "countMw": true,
  "detail": "9 türbin; hedef 120 MWe",
  "scope": "TM primer, sekonder ve inşaat projeleri; TEİAŞ onayı",
  "substations": 1
 },
 {
  "id": 20,
  "name": "Soğanlı RES TM",
  "client": "Ataseven Enerji",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Aydıntepe, Bayburt",
  "country": "Türkiye",
  "provinces": [
   "Bayburt"
  ],
  "points": [
   [
    40.389,
    40.147
   ]
  ],
  "voltage": "154 kV",
  "mw": 69.8,
  "capacity": "69,8 MW",
  "countMw": true,
  "detail": "21 türbin",
  "scope": "TM primer, sekonder ve inşaat projeleri; onaylar",
  "substations": 1
 },
 {
  "id": 21,
  "name": "TT Ağrı GES TM",
  "client": "Türk Telekom",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "devam",
  "location": "Ağrı",
  "country": "Türkiye",
  "provinces": [
   "Ağrı"
  ],
  "points": [
   [
    39.719,
    43.05
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM primer, sekonder ve inşaat projeleri; TEİAŞ onayı",
  "substations": 1
 },
 {
  "id": 22,
  "name": "TT Sivas GES TM",
  "client": "Türk Telekom",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Zara, Sivas",
  "country": "Türkiye",
  "provinces": [
   "Sivas"
  ],
  "points": [
   [
    39.897,
    37.759
   ]
  ],
  "voltage": "154 kV",
  "mw": 128,
  "capacity": "128 MWp",
  "countMw": true,
  "detail": null,
  "scope": "TM primer, sekonder ve inşaat projeleri; TEİAŞ onayı",
  "substations": 1
 },
 {
  "id": 23,
  "name": "TT Malatya GES 400 kV TM",
  "client": "Türk Telekom",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Malatya",
  "country": "Türkiye",
  "provinces": [
   "Malatya"
  ],
  "points": [
   [
    38.349,
    38.319
   ]
  ],
  "voltage": "400 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM primer, sekonder ve inşaat projeleri; TEİAŞ onayı",
  "substations": 1
 },
 {
  "id": 24,
  "name": "Eti Bakır Ağrı GES TM",
  "client": "Cengiz Enerji",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Doğubayazıt, Ağrı",
  "country": "Türkiye",
  "provinces": [
   "Ağrı"
  ],
  "points": [
   [
    39.548,
    44.079
   ]
  ],
  "voltage": "154/34,5 kV",
  "mw": 45,
  "capacity": "45 MW",
  "countMw": true,
  "detail": "77.575 panel",
  "scope": "TM primer, sekonder ve inşaat projeleri; TEİAŞ onayı",
  "substations": 1
 },
 {
  "id": 25,
  "name": "Eti Bakır Sivas GES TM",
  "client": "Cengiz Enerji",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Sivas",
  "country": "Türkiye",
  "provinces": [
   "Sivas"
  ],
  "points": [
   [
    39.75,
    37.015
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM primer, sekonder ve inşaat projeleri; TEİAŞ onayı",
  "substations": 1
 },
 {
  "id": 26,
  "name": "Arturna RES (YEKA RES-2)",
  "client": "Enerjisa Üretim",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "devam",
  "location": "Muğla",
  "country": "Türkiye",
  "provinces": [
   "Muğla"
  ],
  "points": [
   [
    37.215,
    28.364
   ]
  ],
  "voltage": "154 kV",
  "mw": 92.4,
  "capacity": "92,4 MWm",
  "countMw": true,
  "detail": "Enercon E-138",
  "scope": "Elektriksel tasarım, EİGM proje onayı; 154 kV TM tasarımı ve TEİAŞ onayı",
  "substations": 1
 },
 {
  "id": 27,
  "name": "Falp RES (YEKA RES-2)",
  "client": "Enerjisa Üretim",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "devam",
  "location": "Muğla",
  "country": "Türkiye",
  "provinces": [
   "Muğla"
  ],
  "points": [
   [
    37.215,
    28.364
   ]
  ],
  "voltage": "154 kV",
  "mw": 75.6,
  "capacity": "75,6 MWm",
  "countMw": true,
  "detail": "Enercon E-138",
  "scope": "Elektriksel tasarım, EİGM proje onayı; 154 kV TM tasarımı ve TEİAŞ onayı",
  "substations": 1
 },
 {
  "id": 28,
  "name": "Gaia RES (YEKA RES-2)",
  "client": "Enerjisa Üretim",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "devam",
  "location": "Ula, Muğla",
  "country": "Türkiye",
  "provinces": [
   "Muğla"
  ],
  "points": [
   [
    37.103,
    28.416
   ]
  ],
  "voltage": "154 kV",
  "mw": 61,
  "capacity": "61 MW",
  "countMw": true,
  "detail": "Enercon E-138",
  "scope": "Elektriksel tasarım, EİGM proje onayı; 154 kV TM tasarımı ve TEİAŞ onayı",
  "substations": 1
 },
 {
  "id": 29,
  "name": "Balkaya RES 400 kV TM",
  "client": "Enerjisa Üretim",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Kırklareli",
  "country": "Türkiye",
  "provinces": [
   "Kırklareli"
  ],
  "points": [
   [
    41.737,
    27.224
   ]
  ],
  "voltage": "400 kV",
  "mw": 340,
  "capacity": "340 MW",
  "countMw": true,
  "detail": "Nordex; YEKA RES-2024",
  "scope": "400 kV TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 30,
  "name": "Karaburun RES TM",
  "client": "Enerjisa Üretim",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Karaburun, İzmir",
  "country": "Türkiye",
  "provinces": [
   "İzmir"
  ],
  "points": [
   [
    38.635,
    26.51
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 31,
  "name": "400 kV Tarsus OSB TM",
  "client": "EMTA",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Tarsus, Mersin",
  "country": "Türkiye",
  "provinces": [
   "Mersin"
  ],
  "points": [
   [
    36.916,
    34.895
   ]
  ],
  "voltage": "400 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onaylatılması",
  "substations": 1
 },
 {
  "id": 32,
  "name": "Yeraltı Tip GIS TM",
  "client": "TEİAŞ",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Türkiye",
  "country": "Türkiye",
  "provinces": [],
  "points": null,
  "voltage": null,
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "Yeraltı tip GIS inşaat ve elektrik projeleri",
  "substations": 1
 },
 {
  "id": 33,
  "name": "Payas 380 kV GIS TM",
  "client": "Mensis Enerji",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Payas, Hatay",
  "country": "Türkiye",
  "provinces": [
   "Hatay"
  ],
  "points": [
   [
    36.756,
    36.215
   ]
  ],
  "voltage": "380 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "GIS trafo merkezi inşaat ve elektrik projeleri",
  "substations": 1
 },
 {
  "id": 34,
  "name": "Soran 132 kV GIS TM",
  "client": "Best Elektrik",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Soran, Erbil, Irak",
  "country": "Irak",
  "provinces": [],
  "points": [
   [
    36.653,
    44.544
   ]
  ],
  "voltage": "132 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "GIS trafo merkezi inşaat ve elektrik projeleri",
  "substations": 1
 },
 {
  "id": 35,
  "name": "New Azadi 132 kV GIS TM",
  "client": "Best Elektrik",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Irak",
  "country": "Irak",
  "provinces": [],
  "points": null,
  "voltage": "132 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "GIS trafo merkezi inşaat ve elektrik projeleri",
  "substations": 1
 },
 {
  "id": 36,
  "name": "Al-Qayara 132/33 kV GIS TM",
  "client": "Best Elektrik",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Qayyarah, Ninova, Irak",
  "country": "Irak",
  "provinces": [],
  "points": [
   [
    35.795,
    43.293
   ]
  ],
  "voltage": "132/33 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "GIS trafo merkezi inşaat ve elektrik projeleri",
  "substations": 1
 },
 {
  "id": 37,
  "name": "380 kV GIS TM",
  "client": "Kroman Çelik",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Kocaeli",
  "country": "Türkiye",
  "provinces": [
   "Kocaeli"
  ],
  "points": [
   [
    40.765,
    29.941
   ]
  ],
  "voltage": "380 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": "Çelik tesisi bağlantısı",
  "scope": "GIS inşaat ve elektrik projeleri",
  "substations": 1
 },
 {
  "id": 38,
  "name": "Eskişehir 1 GES 400 kV TM",
  "client": "Efor Holding",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Eskişehir",
  "country": "Türkiye",
  "provinces": [
   "Eskişehir"
  ],
  "points": [
   [
    39.774,
    30.519
   ]
  ],
  "voltage": "400 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "400 kV TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 39,
  "name": "Eskişehir 2 GES 400 kV TM",
  "client": "Efor Holding",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Eskişehir",
  "country": "Türkiye",
  "provinces": [
   "Eskişehir"
  ],
  "points": [
   [
    39.774,
    30.519
   ]
  ],
  "voltage": "400 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "400 kV TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 40,
  "name": "Balıkesir 400 kV TM",
  "client": "Efor Holding",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Balıkesir",
  "country": "Türkiye",
  "provinces": [
   "Balıkesir"
  ],
  "points": [
   [
    39.647,
    27.888
   ]
  ],
  "voltage": "400 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "400 kV TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 41,
  "name": "400 kV Karaman GIS TM",
  "client": "Yıldızlar Holding",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Karaman",
  "country": "Türkiye",
  "provinces": [
   "Karaman"
  ],
  "points": [
   [
    37.181,
    33.219
   ]
  ],
  "voltage": "400 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "GIS TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 42,
  "name": "Karaman DRES 400 kV GIS TM",
  "client": "Yıldızlar Holding",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Karaman",
  "country": "Türkiye",
  "provinces": [
   "Karaman"
  ],
  "points": [
   [
    37.181,
    33.219
   ]
  ],
  "voltage": "400 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "GIS TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 43,
  "name": "400 kV Selvili TM",
  "client": "TEİAŞ",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Türkiye",
  "country": "Türkiye",
  "provinces": [],
  "points": null,
  "voltage": "400 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 44,
  "name": "400 kV Seydişehir TM",
  "client": "TEİAŞ",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Seydişehir, Konya",
  "country": "Türkiye",
  "provinces": [
   "Konya"
  ],
  "points": [
   [
    37.419,
    31.848
   ]
  ],
  "voltage": "400 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 45,
  "name": "Sultanlar GES 400 kV TM",
  "client": "Kalyon",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Karapınar, Konya",
  "country": "Türkiye",
  "provinces": [
   "Konya"
  ],
  "points": [
   [
    37.718,
    33.548
   ]
  ],
  "voltage": "400 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "400 kV TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 46,
  "name": "Ünsal DGES TM",
  "client": "GD Enerji",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "devam",
  "location": "Gazipaşa, Antalya",
  "country": "Türkiye",
  "provinces": [
   "Antalya"
  ],
  "points": [
   [
    36.268,
    32.318
   ]
  ],
  "voltage": "154 kV",
  "mw": 50,
  "capacity": "50 MW",
  "countMw": true,
  "detail": "Depolamalı",
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 47,
  "name": "AG Mars 4 TM",
  "client": "Egesa",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "devam",
  "location": "Türkiye",
  "country": "Türkiye",
  "provinces": [],
  "points": null,
  "voltage": null,
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 48,
  "name": "Yeni DGES TM",
  "client": "Egesa",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "devam",
  "location": "Türkiye",
  "country": "Türkiye",
  "provinces": [],
  "points": null,
  "voltage": null,
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": "Depolamalı",
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 49,
  "name": "Iğdır DGES TM",
  "client": "Egesa",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "devam",
  "location": "Iğdır",
  "country": "Türkiye",
  "provinces": [
   "Iğdır"
  ],
  "points": [
   [
    39.922,
    44.047
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 50,
  "name": "400 kV Kılıçlar GIS TM",
  "client": "Kılıçlar Hurdacılık",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Sivrihisar, Eskişehir",
  "country": "Türkiye",
  "provinces": [
   "Eskişehir"
  ],
  "points": [
   [
    39.451,
    31.537
   ]
  ],
  "voltage": "400 kV",
  "mw": 87,
  "capacity": "87 MW",
  "countMw": false,
  "detail": null,
  "scope": "GIS TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 51,
  "name": "ASO 2-3 OSB GIS TM",
  "client": "ASO OSB",
  "type": "TM",
  "types": [
   "TM"
  ],
  "plant": "TM",
  "status": "tamamlandi",
  "location": "Ankara",
  "country": "Türkiye",
  "provinces": [
   "Ankara"
  ],
  "points": [
   [
    39.921,
    32.854
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "GIS TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 52,
  "name": "Çallıca GES TM (Burdur)",
  "client": "Gülsan Holding",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "devam",
  "location": "Burdur",
  "country": "Türkiye",
  "provinces": [
   "Burdur"
  ],
  "points": [
   [
    37.725,
    30.289
   ]
  ],
  "voltage": "154 kV",
  "mw": 120,
  "capacity": "120 MW",
  "countMw": true,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 53,
  "name": "Gülsan Korkuteli GES TM",
  "client": "Gülsan Holding",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Korkuteli, Antalya",
  "country": "Türkiye",
  "provinces": [
   "Antalya"
  ],
  "points": [
   [
    37.067,
    30.197
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 54,
  "name": "Kerem RES TM",
  "client": "Kırkağaç Enerji",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Türkiye",
  "country": "Türkiye",
  "provinces": [],
  "points": null,
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 55,
  "name": "İstanbul RES TM",
  "client": "Caba Holding",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "İstanbul",
  "country": "Türkiye",
  "provinces": [
   "İstanbul"
  ],
  "points": [
   [
    41.006,
    28.976
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 56,
  "name": "Traçim GES TM",
  "client": "Caba Holding",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "devam",
  "location": "Cizre, Şırnak",
  "country": "Türkiye",
  "provinces": [
   "Şırnak"
  ],
  "points": [
   [
    37.332,
    42.185
   ]
  ],
  "voltage": "154 kV",
  "mw": 80,
  "capacity": "80 MW",
  "countMw": true,
  "detail": "Bataryalı; 192.000 panel",
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 57,
  "name": "Horasan GES TM",
  "client": "Kroman Çelik",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "devam",
  "location": "Horasan, Erzurum",
  "country": "Türkiye",
  "provinces": [
   "Erzurum"
  ],
  "points": [
   [
    40.04,
    42.169
   ]
  ],
  "voltage": "154 kV",
  "mw": 65,
  "capacity": "65 MW",
  "countMw": true,
  "detail": "+45 MW Horasan-2 GES",
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 58,
  "name": "Arakonak GES TM",
  "client": "Fernas",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "devam",
  "location": "Bulanık, Muş",
  "country": "Türkiye",
  "provinces": [
   "Muş"
  ],
  "points": [
   [
    39.092,
    42.271
   ]
  ],
  "voltage": "154 kV",
  "mw": 60,
  "capacity": "60 MW",
  "countMw": true,
  "detail": "Arakonak-1 + Arakonak-2 (2 × 30 MWe)",
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 59,
  "name": "Mersin DRES TM",
  "client": "Aksa Enerji",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "devam",
  "location": "Mersin",
  "country": "Türkiye",
  "provinces": [
   "Mersin"
  ],
  "points": [
   [
    36.798,
    34.63
   ]
  ],
  "voltage": "154 kV",
  "mw": 100.08,
  "capacity": "100,1 MW",
  "countMw": true,
  "detail": "Depolamalı",
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 60,
  "name": "Büyükkışla DRES TM",
  "client": "Entek",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "devam",
  "location": "Şereflikoçhisar, Ankara",
  "country": "Türkiye",
  "provinces": [
   "Ankara"
  ],
  "points": [
   [
    38.939,
    33.544
   ]
  ],
  "voltage": "154 kV",
  "mw": 99.9,
  "capacity": "99,9 MW",
  "countMw": true,
  "detail": "21 türbin; depolama 99,9 MWh",
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 61,
  "name": "Eren DRES TM",
  "client": "Entek",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "devam",
  "location": "Gürün, Sivas",
  "country": "Türkiye",
  "provinces": [
   "Sivas"
  ],
  "points": [
   [
    38.799,
    37.157
   ]
  ],
  "voltage": "154 kV",
  "mw": 55,
  "capacity": "55 MW",
  "countMw": true,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 62,
  "name": "Elmalı 1-2 GES TM",
  "client": "Tüpraş",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "devam",
  "location": "Malkara, Tekirdağ",
  "country": "Türkiye",
  "provinces": [
   "Tekirdağ"
  ],
  "points": [
   [
    40.893,
    26.902
   ]
  ],
  "voltage": "154 kV",
  "mw": 40.5,
  "capacity": "40,5 MW",
  "countMw": true,
  "detail": "Elmalı-1 20,50 MWe + Elmalı-2 20 MWe",
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 63,
  "name": "Yapı Kredi GES TM",
  "client": "Yapı Kredi",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Türkiye",
  "country": "Türkiye",
  "provinces": [],
  "points": null,
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 64,
  "name": "Ekinciler GES TM",
  "client": "Ekinciler Demir Çelik",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "devam",
  "location": "Siverek, Şanlıurfa",
  "country": "Türkiye",
  "provinces": [
   "Şanlıurfa"
  ],
  "points": [
   [
    37.754,
    39.318
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 65,
  "name": "Hisar DRES TM",
  "client": "Selenka Enerji",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "devam",
  "location": "Saray, Tekirdağ",
  "country": "Türkiye",
  "provinces": [
   "Tekirdağ"
  ],
  "points": [
   [
    41.443,
    27.921
   ]
  ],
  "voltage": "154 kV",
  "mw": 90,
  "capacity": "90 MW",
  "countMw": true,
  "detail": "Depolamalı",
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 66,
  "name": "Sivas GES TM",
  "client": "Selenka Enerji",
  "type": "GES",
  "types": [
   "GES",
   "TM"
  ],
  "plant": "GES",
  "status": "devam",
  "location": "Sivas",
  "country": "Türkiye",
  "provinces": [
   "Sivas"
  ],
  "points": [
   [
    39.75,
    37.015
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 67,
  "name": "Dökükdağı RES TM",
  "client": "Betaş",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "tamamlandi",
  "location": "Antalya / Isparta / Konya",
  "country": "Türkiye",
  "provinces": [
   "Antalya",
   "Isparta",
   "Konya"
  ],
  "points": [
   [
    37.495,
    30.981
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 68,
  "name": "Kütahya RES TM",
  "client": "İçdaş",
  "type": "RES",
  "types": [
   "RES",
   "TM"
  ],
  "plant": "RES",
  "status": "devam",
  "location": "Kütahya",
  "country": "Türkiye",
  "provinces": [
   "Kütahya"
  ],
  "points": [
   [
    39.42,
    29.986
   ]
  ],
  "voltage": "154 kV",
  "mw": null,
  "capacity": null,
  "countMw": false,
  "detail": null,
  "scope": "TM projelerinin hazırlanması ve onayı",
  "substations": 1
 },
 {
  "id": 69,
  "name": "Karaman GES 400 kV",
  "client": "SPI Energy Solutions",
  "type": "GES",
  "types": [
   "GES"
  ],
  "plant": "GES",
  "status": "tamamlandi",
  "location": "Karaman",
  "country": "Türkiye",
  "provinces": [
   "Karaman"
  ],
  "points": [
   [
    37.181,
    33.219
   ]
  ],
  "voltage": "400 kV",
  "mw": 260,
  "capacity": "260 MW",
  "countMw": true,
  "detail": null,
  "scope": "Danışmanlık ve saha kontrolü",
  "substations": 0
 },
 {
  "id": 70,
  "name": "Gogni RES",
  "client": "AG Energy",
  "type": "RES",
  "types": [
   "RES"
  ],
  "plant": "RES",
  "status": "devam",
  "location": "Terjola – Tkibuli, İmereti, Gürcistan",
  "country": "Gürcistan",
  "provinces": [],
  "points": [
   [
    42.265,
    42.985
   ]
  ],
  "voltage": null,
  "mw": 187,
  "capacity": "187 MW",
  "countMw": true,
  "detail": null,
  "scope": "Mühendislik ve proje hizmetleri",
  "substations": 0
 }
];
