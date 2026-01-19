// Medical Terminology Data - Extracted from PDFs

// Main Categories for sidebar navigation
export const mainCategories = [
  { id: 'prefixes', name: 'Ön Ekler' },
  { id: 'roots', name: 'Kökler' },
  { id: 'suffixes', name: 'Son Ekler' }
];

// Body Systems as subcategories under each main category
export const bodySystems = [
  { id: 'movement', name: 'Hareket Sistemi' },
  { id: 'respiratory', name: 'Solunum Sistemi' },
  { id: 'skin', name: 'Deri Sistemi' },
  { id: 'circulatory', name: 'Dolaşım Sistemi' },
  { id: 'sensory', name: 'Duyu Organları' },
  { id: 'endocrine', name: 'Endokrin Sistemi' },
  { id: 'pharmacology', name: 'Farmakoloji' },
  { id: 'general', name: 'Genel Terimler' },
  { id: 'blood', name: 'Kan ve Bağışıklık' },
  { id: 'oncology', name: 'Onkoloji' },
  { id: 'radiology', name: 'Radyoloji' },
  { id: 'digestive', name: 'Sindirim Sistemi' },
  { id: 'urinary', name: 'Üriner Sistem' }
];

// Legacy categories for backward compatibility
export const categories = [
  { id: 'anatomy', name: 'Anatomik Terimler', icon: 'Bone', color: 'primary' },
  { id: 'surgery', name: 'Ameliyat Terimleri', icon: 'Scissors', color: 'secondary' },
  { id: 'roots', name: 'Kökler ve Ekler', icon: 'BookOpen', color: 'accent' },
  { id: 'pathology', name: 'Semptomlar ve Patoloji', icon: 'Activity', color: 'success' }
];

// Subcategories organized by body system
export const subcategoriesBySystem = {
  movement: [
    { id: 'bone_structures', name: 'Kemik / İskelet Yapıları' },
    { id: 'joint_structures', name: 'Eklem Yapıları ve İlişkili Anatomik Alanlar' },
    { id: 'muscle_structures', name: 'Kas ve Kasla İlişkili Yapılar' },
    { id: 'tissue_components', name: 'Doku / Yapısal Bileşenler' },
    { id: 'regional_anatomy', name: 'Organ / Bölgesel Anatomik Alanlar' },
    { id: 'physiological_functional', name: 'Fizyolojik / Fonksiyonel Kökler' },
    { id: 'pathological_conditions', name: 'Patolojik Durum Kökleri' },
    { id: 'anatomy', name: 'Anatomi' },
    { id: 'support', name: 'Destek Dokuları' },
    { id: 'joints', name: 'Eklemler & Hareket' }
  ],
  respiratory: [
    { id: 'anatomy', name: 'Anatomi' }
  ],
  skin: [
    { id: 'anatomy', name: 'Anatomi' }
  ],
  circulatory: [
    { id: 'anatomy', name: 'Anatomi' }
  ],
  sensory: [
    { id: 'anatomy', name: 'Anatomi' }
  ],
  endocrine: [
    { id: 'anatomy', name: 'Anatomi' }
  ],
  pharmacology: [
    { id: 'general', name: 'Genel' }
  ],
  general: [
    { id: 'general', name: 'Genel' }
  ],
  blood: [
    { id: 'anatomy', name: 'Anatomi' }
  ],
  oncology: [
    { id: 'general', name: 'Genel' }
  ],
  radiology: [
    { id: 'general', name: 'Genel' }
  ],
  digestive: [
    { id: 'anatomy', name: 'Anatomi' }
  ],
  urinary: [
    { id: 'anatomy', name: 'Anatomi' }
  ]
};

export const medicalTermsData = {
  anatomy: [
    { id: 1, term: 'Abductor', turkish: 'Uzaklaştırıcı Kas', roots: 'ab- (uzak) + ducere (götürmek)', definition: 'Vücut parçasını orta hattan uzaklaştıran kas', category: 'anatomy', system: 'movement', subcategory: 'anatomy' },
    { id: 2, term: 'Acetabular', turkish: 'Asetabular, Kalça Yuvası', roots: 'acetabulum (küçük kase)', definition: 'Kalça kemiğinde femur başını alan yuva ile ilgili', category: 'anatomy', system: 'movement', subcategory: 'anatomy' },
    { id: 3, term: 'Acromioclavicular', turkish: 'Akromiyoklaviküler', roots: 'acromion (omuz ucu) + clavicula (köprücük kemiği)', definition: 'Kürek kemiği çıkıntısı ile köprücük kemiği arasındaki eklem', category: 'anatomy', system: 'movement', subcategory: 'joints' },
    { id: 4, term: 'Adductor', turkish: 'Yaklaştırıcı Kas', roots: 'ad- (yakın) + ducere (götürmek)', definition: 'Vücut parçasını orta hatta yaklaştıran kas', category: 'anatomy', system: 'movement', subcategory: 'anatomy' },
    { id: 5, term: 'Articular Cartilage', turkish: 'Eklem Kıkırdağı', roots: 'articularis (eklem) + cartilago (kıkırdak)', definition: 'Kemiklerin eklem yüzeylerini kaplayan düz doku', category: 'anatomy', system: 'movement', subcategory: 'support' },
    { id: 6, term: 'Brachial', turkish: 'Brakial, Kol Kemiğine Ait', roots: 'brachium (kol)', definition: 'Omuz ile dirsek arasındaki üst kol bölgesi', category: 'anatomy' },
    { id: 7, term: 'Calcaneal', turkish: 'Kalkaneal, Topuk Kemiğine Ait', roots: 'calcaneus (topuk kemiği)', definition: 'Ayaktaki topuk kemiği ile ilgili', category: 'anatomy' },
    { id: 8, term: 'Carpal', turkish: 'Karpal, El Bileği Kemiğine Ait', roots: 'carpos (bilek)', definition: 'El bileğindeki kemikler ile ilgili', category: 'anatomy' },
    { id: 9, term: 'Cervical', turkish: 'Servikal, Boyun Omurlarına Ait', roots: 'cervix (boyun)', definition: 'Boyun bölgesi omurları ile ilgili', category: 'anatomy' },
    { id: 10, term: 'Chondrocyte', turkish: 'Kondrosit, Kıkırdak Hücresi', roots: 'chondros (kıkırdak) + kytos (hücre)', definition: 'Kıkırdak dokusunda bulunan olgun hücre', category: 'anatomy' },
    { id: 11, term: 'Clavicular', turkish: 'Klavikular, Köprücük Kemiğine Ait', roots: 'clavicula (köprücük kemiği)', definition: 'Köprücük kemiği ile ilgili', category: 'anatomy' },
    { id: 12, term: 'Coccygeal', turkish: 'Kokigeal, Kuyruk Sokumu Kemiğine Ait', roots: 'coccyx (kuyruk sokumu)', definition: 'Omurganın tabanındaki kuyruk sokumu kemiği', category: 'anatomy' },
    { id: 13, term: 'Costal', turkish: 'Kostal, Kaburgaya Ait', roots: 'costa (kaburga)', definition: 'Kaburgalar ile ilgili', category: 'anatomy' },
    { id: 14, term: 'Femoral', turkish: 'Femoral, Uyluk Kemiğine Ait', roots: 'femur (uyluk kemiği)', definition: 'Uyluk kemiği ile ilgili', category: 'anatomy' },
    { id: 15, term: 'Fibular', turkish: 'Fibular, Baldır Kemiğine Ait', roots: 'fibula (baldır kemiği)', definition: 'Alt bacaktaki ince kemik ile ilgili', category: 'anatomy' },
    { id: 16, term: 'Humeral', turkish: 'Humerus, Kol Kemiğine Ait', roots: 'humerus (üst kol kemiği)', definition: 'Üst kol kemiği ile ilgili', category: 'anatomy' },
    { id: 17, term: 'Lumbar', turkish: 'Lomber, Bel Omurlarına Ait', roots: 'lumbus (bel)', definition: 'Alt sırt bölgesi omurları ile ilgili', category: 'anatomy' },
    { id: 18, term: 'Patellar', turkish: 'Patelar, Diz Kapağı Kemiğine Ait', roots: 'patella (diz kapağı)', definition: 'Diz kapağı ile ilgili', category: 'anatomy' },
    { id: 19, term: 'Thoracic', turkish: 'Torasik, Göğüs Kafesine Ait', roots: 'thorax (göğüs)', definition: 'Göğüs bölgesi omurları ile ilgili', category: 'anatomy' },
    { id: 20, term: 'Vertebral', turkish: 'Vertebral, Omurlara Ait', roots: 'vertebra (omur)', definition: 'Omurga kemikleri ile ilgili', category: 'anatomy' }
  ],
  surgery: [
    { id: 21, term: 'Arthrodesis', turkish: 'Eklem Dondurma', roots: 'arthr- (eklem) + -desis (birleştirme)', definition: 'Bir eklemde iki veya daha fazla kemiği kaynaştırma ameliyatı', category: 'surgery' },
    { id: 22, term: 'Arthroplasty', turkish: 'Eklem Plastisi/Onarımı', roots: 'arthr- (eklem) + -plasty (şekillendirme)', definition: 'Eklemin cerrahi olarak onarımı veya değiştirilmesi', category: 'surgery' },
    { id: 23, term: 'Arthrotomy', turkish: 'Eklem Açılması', roots: 'arthr- (eklem) + -tomy (kesme)', definition: 'Ekleme cerrahi kesi yapılması', category: 'surgery' },
    { id: 24, term: 'Bursectomy', turkish: 'Bursektomi/Kavuk Çıkarma', roots: 'burs- (kese) + -ectomy (çıkarma)', definition: 'Bursa kesesinin cerrahi olarak çıkarılması', category: 'surgery' },
    { id: 25, term: 'Carpectomy', turkish: 'Karpal Kemiklerin Çıkarılması', roots: 'carp- (bilek) + -ectomy (çıkarma)', definition: 'Bir veya daha fazla el bilek kemiğinin çıkarılması', category: 'surgery' },
    { id: 26, term: 'Cranioplasty', turkish: 'Kafa Plastisi/Onarımı', roots: 'crani- (kafatası) + -plasty (şekillendirme)', definition: 'Kafatasındaki kusurların cerrahi onarımı', category: 'surgery' },
    { id: 27, term: 'Craniotomy', turkish: 'Kafa Açılması', roots: 'crani- (kafatası) + -tomy (kesme)', definition: 'Beyne ulaşmak için kafatasına cerrahi kesi', category: 'surgery' },
    { id: 28, term: 'Fasciectomy', turkish: 'Fasiya Çıkarma', roots: 'fasci- (bağ) + -ectomy (çıkarma)', definition: 'Fasyaın cerrahi olarak çıkarılması', category: 'surgery' },
    { id: 29, term: 'Fasciorraphy', turkish: 'Fasiya Dikimi', roots: 'fasci- (bağ) + -rrhaphy (dikme)', definition: 'Fasyaın cerrahi olarak dikilmesi', category: 'surgery' },
    { id: 30, term: 'Osteoclasis', turkish: 'Kemiğin Kırılması (Cerrahi)', roots: 'oste- (kemik) + -clasis (kırma)', definition: 'Kemiğin cerrahi olarak yeniden kırılması', category: 'surgery' },
    { id: 31, term: 'Patellapexy', turkish: 'Diz Kapağının Sabitlenmesi', roots: 'patella- (diz kapağı) + -pexy (sabitleme)', definition: 'Diz kapağının cerrahi olarak sabitlenmesi', category: 'surgery' },
    { id: 32, term: 'Synovectomy', turkish: 'Sinoviyal Zar Çıkarma', roots: 'synovi- (eklem zarı) + -ectomy (çıkarma)', definition: 'Eklemi döşeyen sinoviyal zarın çıkarılması', category: 'surgery' },
    { id: 33, term: 'Tenodesis', turkish: 'Tendon Dikimi/Sabitleme', roots: 'ten- (tendon) + -odesis (birleştirme)', definition: 'Tendonun kemiğe cerrahi olarak tutturulması', category: 'surgery' },
    { id: 34, term: 'Tenotomy', turkish: 'Tendon Kesilmesi', roots: 'ten- (tendon) + -tomy (kesme)', definition: 'Tendonun cerrahi olarak kesilmesi veya uzatılması', category: 'surgery' }
  ],
  roots: [
    // Kemik / İskelet Yapıları - Hareket Sistemi
    { id: 1001, term: 'Acetabul/o', turkish: 'Kalça çukuru', roots: 'acetabul/o', definition: 'Kalça kemiğinde femur başını alan çukur', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1002, term: 'Acromi/o', turkish: 'Omuz çıkıntısı', roots: 'acromi/o', definition: 'Kürek kemiğinin omuz ucundaki çıkıntı', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1003, term: 'Calcane/o', turkish: 'Topuk kemiği', roots: 'calcane/o', definition: 'Ayağın topuk kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1004, term: 'Carp/o', turkish: 'El bileği', roots: 'carp/o', definition: 'El bileği kemikleri', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1005, term: 'Cephal/o', turkish: 'Baş, kafa', roots: 'cephal/o', definition: 'Baş veya kafa ile ilgili', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1006, term: 'Clavicul/o', turkish: 'Köprücük kemiği', roots: 'clavicul/o', definition: 'Köprücük kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1007, term: 'Coccyg/o', turkish: 'Kuyruk sokumu', roots: 'coccyg/o', definition: 'Omurganın en alt kısmındaki kuyruk sokumu kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1008, term: 'Cost/o', turkish: 'Kaburga', roots: 'cost/o', definition: 'Kaburga kemikleri', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1009, term: 'Crani/o', turkish: 'Kafatası', roots: 'crani/o', definition: 'Kafatası kemikleri', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1010, term: 'Femor/o', turkish: 'Uyluk kemiği', roots: 'femor/o', definition: 'Uyluk kemiği (femur)', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1011, term: 'Fibul/o', turkish: 'İnce baldır kemiği', roots: 'fibul/o', definition: 'Alt bacaktaki ince kemik (fibula)', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1012, term: 'Front/o', turkish: 'Alın', roots: 'front/o', definition: 'Alın kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1013, term: 'Glen/o', turkish: 'Eklem çukuru', roots: 'glen/o', definition: 'Eklem çukuru (özellikle omuz)', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1014, term: 'Humer/o', turkish: 'Kol kemiği', roots: 'humer/o', definition: 'Üst kol kemiği (humerus)', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1015, term: 'Ischi/o', turkish: 'Oturma kemiği', roots: 'ischi/o', definition: 'Kalça kemiğinin alt kısmı (ischium)', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1016, term: 'Ili/o', turkish: 'Kalça kemiği', roots: 'ili/o', definition: 'Kalça kemiğinin üst kısmı (ilium)', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1017, term: 'Lumb/o', turkish: 'Bel', roots: 'lumb/o', definition: 'Bel bölgesi omurları', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1018, term: 'Malleol/o', turkish: 'Ayak bileği çıkıntısı', roots: 'malleol/o', definition: 'Ayak bileğindeki kemik çıkıntıları', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1019, term: 'Mandibul/o', turkish: 'Alt çene', roots: 'mandibul/o', definition: 'Alt çene kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1020, term: 'Maxill/o', turkish: 'Üst çene', roots: 'maxill/o', definition: 'Üst çene kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1021, term: 'Metacarp/o', turkish: 'El ayası kemikleri', roots: 'metacarp/o', definition: 'El ayasındaki kemikler', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1022, term: 'Metatars/o', turkish: 'Ayak ayası kemikleri', roots: 'metatars/o', definition: 'Ayak ayasındaki kemikler', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1023, term: 'Occipit/o', turkish: 'Ense kemiği', roots: 'occipit/o', definition: 'Kafatasının arka kısmındaki kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1024, term: 'Olecran/o', turkish: 'Dirsek çıkıntısı', roots: 'olecran/o', definition: 'Dirsekteki kemik çıkıntısı', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1025, term: 'Osse/o – Oste/o', turkish: 'Kemik', roots: 'osse/o, oste/o', definition: 'Kemik dokusu', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1026, term: 'Patell/o', turkish: 'Diz kapağı', roots: 'patell/o', definition: 'Diz kapağı kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1027, term: 'Pelv/o', turkish: 'Leğen kemiği', roots: 'pelv/o', definition: 'Leğen kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1028, term: 'Phalang/o', turkish: 'Parmak kemiği', roots: 'phalang/o', definition: 'El ve ayak parmak kemikleri', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1029, term: 'Pub/o', turkish: 'Kasık kemiği', roots: 'pub/o', definition: 'Leğen kemiğinin ön kısmı', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1030, term: 'Radi/o', turkish: 'Çemberli kemik (radius)', roots: 'radi/o', definition: 'Ön kolun başparmak tarafındaki kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1031, term: 'Sacr/o', turkish: 'Kuyruk sokumu üstü', roots: 'sacr/o', definition: 'Omurganın alt kısmındaki üçgen kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1032, term: 'Scapul/o', turkish: 'Kürek kemiği', roots: 'scapul/o', definition: 'Sırt üst kısmındaki kürek kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1033, term: 'Sphen/o', turkish: 'Kama kemiği', roots: 'sphen/o', definition: 'Kafatasında kama şeklindeki kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1034, term: 'Spondyl/o', turkish: 'Omur', roots: 'spondyl/o', definition: 'Omurga kemikleri', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1035, term: 'Stern/o', turkish: 'Göğüs kemiği', roots: 'stern/o', definition: 'Göğsün ortasındaki düz kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1036, term: 'Tempor/o', turkish: 'Şakak', roots: 'tempor/o', definition: 'Kafatasının yan kısmındaki kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1037, term: 'Tibi/o', turkish: 'Kaval kemiği', roots: 'tibi/o', definition: 'Alt bacağın kalın kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1038, term: 'Uln/o', turkish: 'Dirsek kemiği (ulna)', roots: 'uln/o', definition: 'Ön kolun serçe parmak tarafındaki kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1039, term: 'Vertebr/o', turkish: 'Omur', roots: 'vertebr/o', definition: 'Omurga kemikleri', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1040, term: 'Xiph/o', turkish: 'Kılıç çıkıntısı', roots: 'xiph/o', definition: 'Göğüs kemiğinin alt ucundaki çıkıntı', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1041, term: 'Zygomat/o', turkish: 'Elmacık kemiği', roots: 'zygomat/o', definition: 'Yanaklardaki elmacık kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },

    // Eklem Yapıları ve İlişkili Anatomik Alanlar - Hareket Sistemi
    { id: 1042, term: 'Arthr/o', turkish: 'Eklem', roots: 'arthr/o', definition: 'Eklem yapısı', category: 'roots', system: 'movement', subcategory: 'joint_structures', mainCategory: 'roots' },
    { id: 1043, term: 'Articul/o', turkish: 'Eklem', roots: 'articul/o', definition: 'Eklem, eklemleşme', category: 'roots', system: 'movement', subcategory: 'joint_structures', mainCategory: 'roots' },
    { id: 1044, term: 'Burs/o', turkish: 'Bursa (eklem kesesi)', roots: 'burs/o', definition: 'Eklemlerde sürtünmeyi azaltan sıvı dolu kese', category: 'roots', system: 'movement', subcategory: 'joint_structures', mainCategory: 'roots' },
    { id: 1045, term: 'Synovi/o', turkish: 'Sinoviyal (eklem zarı)', roots: 'synovi/o', definition: 'Eklemleri döşeyen ve eklem sıvısı üreten zar', category: 'roots', system: 'movement', subcategory: 'joint_structures', mainCategory: 'roots' },

    // Kas ve Kasla İlişkili Yapılar - Hareket Sistemi
    { id: 1046, term: 'Brachi/o', turkish: 'Kol', roots: 'brachi/o', definition: 'Kol bölgesi', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },
    { id: 1047, term: 'Muscul/o', turkish: 'Kas', roots: 'muscul/o', definition: 'Kas dokusu', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },
    { id: 1048, term: 'My/o', turkish: 'Kas', roots: 'my/o', definition: 'Kas yapısı', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },
    { id: 1049, term: 'Myos/o', turkish: 'Kas', roots: 'myos/o', definition: 'Kas dokusu', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },
    { id: 1050, term: 'Tendin/o – Ten/o', turkish: 'Tendon (kas kirişi)', roots: 'tendin/o, ten/o', definition: 'Kasları kemiklere bağlayan bağ dokusu', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },
    { id: 1051, term: 'Tenosynovi/o', turkish: 'Tendon kılıfı', roots: 'tenosynovi/o', definition: 'Tendonları saran koruyucu kılıf', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },
    { id: 1052, term: 'Fasci/o', turkish: 'Fasya (bağ dokusu)', roots: 'fasci/o', definition: 'Kasları ve organları saran bağ dokusu tabakası', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },

    // Doku / Yapısal Bileşenler - Hareket Sistemi
    { id: 1053, term: 'Cartilagin/o', turkish: 'Kıkırdak', roots: 'cartilagin/o', definition: 'Kıkırdak dokusu', category: 'roots', system: 'movement', subcategory: 'tissue_components', mainCategory: 'roots' },
    { id: 1054, term: 'Chondr/o', turkish: 'Kıkırdak', roots: 'chondr/o', definition: 'Kıkırdak yapısı', category: 'roots', system: 'movement', subcategory: 'tissue_components', mainCategory: 'roots' },
    { id: 1055, term: 'Fibr/o', turkish: 'Lif, lifli doku', roots: 'fibr/o', definition: 'Lifli bağ dokusu', category: 'roots', system: 'movement', subcategory: 'tissue_components', mainCategory: 'roots' },
    { id: 1056, term: 'Medull/o', turkish: 'İlik, iç kısım', roots: 'medull/o', definition: 'Kemik iliği veya organların iç kısmı', category: 'roots', system: 'movement', subcategory: 'tissue_components', mainCategory: 'roots' },
    { id: 1057, term: 'Myel/o', turkish: 'Kemik iliği, omurilik', roots: 'myel/o', definition: 'Kemik iliği veya omurilik', category: 'roots', system: 'movement', subcategory: 'tissue_components', mainCategory: 'roots' },

    // Organ / Bölgesel Anatomik Alanlar - Hareket Sistemi
    { id: 1058, term: 'Cervic/o', turkish: 'Boyun', roots: 'cervic/o', definition: 'Boyun bölgesi', category: 'roots', system: 'movement', subcategory: 'regional_anatomy', mainCategory: 'roots' },
    { id: 1059, term: 'Facio', turkish: 'Yüz', roots: 'facio', definition: 'Yüz bölgesi', category: 'roots', system: 'movement', subcategory: 'regional_anatomy', mainCategory: 'roots' },
    { id: 1060, term: 'Phren/o', turkish: 'Diyafram', roots: 'phren/o', definition: 'Göğüs ve karın boşluğunu ayıran kas', category: 'roots', system: 'movement', subcategory: 'regional_anatomy', mainCategory: 'roots' },
    { id: 1061, term: 'Thorac/o', turkish: 'Göğüs', roots: 'thorac/o', definition: 'Göğüs bölgesi', category: 'roots', system: 'movement', subcategory: 'regional_anatomy', mainCategory: 'roots' },
    { id: 1062, term: 'Pariet/o', turkish: 'Duvar, cidar', roots: 'pariet/o', definition: 'Vücut boşluklarının duvarı', category: 'roots', system: 'movement', subcategory: 'regional_anatomy', mainCategory: 'roots' },

    // Fizyolojik / Fonksiyonel Kökler - Hareket Sistemi
    { id: 1063, term: 'Kinesi/o', turkish: 'Hareket', roots: 'kinesi/o', definition: 'Hareket, hareket etme', category: 'roots', system: 'movement', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1064, term: 'Ton/o', turkish: 'Basınç, gerilim', roots: 'ton/o', definition: 'Kas tonusu, gerilim, basınç', category: 'roots', system: 'movement', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1065, term: 'Duct/o', turkish: 'Çekmek, iletmek', roots: 'duct/o', definition: 'Çekmek, götürmek, iletmek', category: 'roots', system: 'movement', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1066, term: 'Electr/o', turkish: 'Elektrik', roots: 'electr/o', definition: 'Elektrik, elektriksel aktivite', category: 'roots', system: 'movement', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1067, term: 'Hydr/o', turkish: 'Su', roots: 'hydr/o', definition: 'Su, sıvı', category: 'roots', system: 'movement', subcategory: 'physiological_functional', mainCategory: 'roots' },

    // Patolojik Durum Kökleri - Hareket Sistemi
    { id: 1068, term: 'Ankyl/o', turkish: 'Eğri, bükük', roots: 'ankyl/o', definition: 'Eklem sertliği, eğrilik', category: 'roots', system: 'movement', subcategory: 'pathological_conditions', mainCategory: 'roots' },
    { id: 1069, term: 'Kyph/o', turkish: 'Kambur', roots: 'kyph/o', definition: 'Omurganın öne doğru eğriliği (kamburluk)', category: 'roots', system: 'movement', subcategory: 'pathological_conditions', mainCategory: 'roots' },
    { id: 1070, term: 'Lord/o', turkish: 'Çukurlaşmış', roots: 'lord/o', definition: 'Omurganın içe doğru eğriliği', category: 'roots', system: 'movement', subcategory: 'pathological_conditions', mainCategory: 'roots' },
    { id: 1071, term: 'Scoli/o', turkish: 'Eğri', roots: 'scoli/o', definition: 'Omurganın yana doğru eğriliği (skolyoz)', category: 'roots', system: 'movement', subcategory: 'pathological_conditions', mainCategory: 'roots' },
    { id: 1072, term: 'Orth/o', turkish: 'Düz, doğru', roots: 'orth/o', definition: 'Düz, doğru, normal pozisyon', category: 'roots', system: 'movement', subcategory: 'pathological_conditions', mainCategory: 'roots' },
    { id: 1073, term: 'Rhabd/o', turkish: 'Çubuk şeklinde', roots: 'rhabd/o', definition: 'Çubuk şeklinde, çizgili kas', category: 'roots', system: 'movement', subcategory: 'pathological_conditions', mainCategory: 'roots' },

    // Eski terimler (geriye dönük uyumluluk için)
    { id: 35, term: 'Arthr/o', turkish: 'Eklem', roots: 'arthr/o', definition: 'Eklem anlamına gelen kök. Örnek: Arthritis (eklem iltihabı)', category: 'roots' },
    { id: 36, term: 'Oste/o', turkish: 'Kemik', roots: 'oste/o', definition: 'Kemik anlamına gelen kök. Örnek: Osteoporosis (kemik erimesi)', category: 'roots' },
    { id: 37, term: 'My/o', turkish: 'Kas', roots: 'my/o', definition: 'Kas anlamına gelen kök. Örnek: Myalgia (kas ağrısı)', category: 'roots' },
    { id: 38, term: 'Chondr/o', turkish: 'Kıkırdak', roots: 'chondr/o', definition: 'Kıkırdak anlamına gelen kök. Örnek: Chondroma (kıkırdak tümörü)', category: 'roots' },
    { id: 39, term: '-itis', turkish: 'İltihap', roots: '-itis', definition: 'İltihap anlamına gelen sonek. Örnek: Arthritis (eklem iltihabı)', category: 'roots' },
    { id: 40, term: '-ectomy', turkish: 'Çıkarma', roots: '-ectomy', definition: 'Cerrahi çıkarma anlamına gelen sonek. Örnek: Bursectomy', category: 'roots' },
    { id: 41, term: '-plasty', turkish: 'Onarım/Şekillendirme', roots: '-plasty', definition: 'Cerrahi onarım anlamına gelen sonek. Örnek: Arthroplasty', category: 'roots' },
    { id: 42, term: '-tomy', turkish: 'Kesme', roots: '-tomy', definition: 'Cerrahi kesme anlamına gelen sonek. Örnek: Craniotomy', category: 'roots' },
    { id: 43, term: '-algia', turkish: 'Ağrı', roots: '-algia', definition: 'Ağrı anlamına gelen sonek. Örnek: Myalgia (kas ağrısı)', category: 'roots' },
    { id: 44, term: 'Crani/o', turkish: 'Kafatası', roots: 'crani/o', definition: 'Kafatası anlamına gelen kök. Örnek: Craniotomy', category: 'roots' },
    { id: 45, term: 'Cervic/o', turkish: 'Boyun', roots: 'cervic/o', definition: 'Boyun anlamına gelen kök. Örnek: Cervical', category: 'roots' },
    { id: 46, term: 'Lumb/o', turkish: 'Bel', roots: 'lumb/o', definition: 'Bel bölgesi anlamına gelen kök. Örnek: Lumbar', category: 'roots' },
    { id: 47, term: 'Cost/o', turkish: 'Kaburga', roots: 'cost/o', definition: 'Kaburga anlamına gelen kök. Örnek: Costal', category: 'roots' },
    { id: 48, term: 'Carp/o', turkish: 'Bilek', roots: 'carp/o', definition: 'El bileği kemikleri anlamına gelen kök. Örnek: Carpal', category: 'roots' }
  ],
  pathology: [
    { id: 49, term: 'Arthralgia', turkish: 'Artralji (Eklem ağrısı)', roots: 'arthron (eklem) + -algia (ağrı)', definition: 'Bir veya daha fazla eklemde ağrı', category: 'pathology' },
    { id: 50, term: 'Arthritis', turkish: 'Artrit (Eklem iltihabı)', roots: 'arthron (eklem) + -itis (iltihap)', definition: 'Bir veya daha fazla eklemin iltihaplanması', category: 'pathology' },
    { id: 51, term: 'Osteoporosis', turkish: 'Osteoporoz (Kemik erimesi)', roots: 'osteon (kemik) + poros (delik) + -osis (durum)', definition: 'Kemiklerin zayıf ve kırılgan hale gelmesi', category: 'pathology' },
    { id: 52, term: 'Osteomyelitis', turkish: 'Osteomiyelit (Kemik iltihabı)', roots: 'osteon (kemik) + myelos (ilik) + -itis (iltihap)', definition: 'Kemiğin iltihaplanması, genellikle bakteriyel enfeksiyon', category: 'pathology' },
    { id: 53, term: 'Myalgia', turkish: 'Miyalji (Kas ağrısı)', roots: 'mys (kas) + -algia (ağrı)', definition: 'Kas ağrısı veya sancısı', category: 'pathology' },
    { id: 54, term: 'Myositis', turkish: 'Miyozit (Kas iltihabı)', roots: 'mys (kas) + -itis (iltihap)', definition: 'Kasların iltihaplanması', category: 'pathology' },
    { id: 55, term: 'Bursitis', turkish: 'Bursit (Bursa iltihabı)', roots: 'bursa (kese) + -itis (iltihap)', definition: 'Bursa kesesinin iltihaplanması', category: 'pathology' },
    { id: 56, term: 'Tendinitis', turkish: 'Tendinit (Tendon iltihabı)', roots: 'tendon (tendon) + -itis (iltihap)', definition: 'Tendonun iltihaplanması', category: 'pathology' },
    { id: 57, term: 'Scoliosis', turkish: 'Skolyoz (Omurganın yana eğriliği)', roots: 'skoliosis (eğri)', definition: 'Omurganın yana doğru eğriliği', category: 'pathology' },
    { id: 58, term: 'Kyphosis', turkish: 'Kifoz (Sırt kamburluğu)', roots: 'kyphos (eğri)', definition: 'Omurganın anormal dışa doğru eğriliği', category: 'pathology' },
    { id: 59, term: 'Lordosis', turkish: 'Lordoz (Bel çukurunun artması)', roots: 'lordos (geriye eğilmiş)', definition: 'Omurganın anormal içe doğru eğriliği', category: 'pathology' },
    { id: 60, term: 'Chondromalacia', turkish: 'Kondromalazi (Kıkırdak yumuşaması)', roots: 'chondros (kıkırdak) + malakia (yumuşaklık)', definition: 'Kıkırdağın yumuşaması veya dejenerasyonu', category: 'pathology' },
    { id: 61, term: 'Osteoma', turkish: 'Osteom (Kemik tümörü)', roots: 'osteon (kemik) + -oma (tümör)', definition: 'İyi huylu kemik tümörü', category: 'pathology' },
    { id: 62, term: 'Osteosarcoma', turkish: 'Osteosarkom (Kemik kanseri)', roots: 'osteon (kemik) + sarcoma (et tümörü)', definition: 'Kötü huylu kemik tümörü', category: 'pathology' },
    { id: 63, term: 'Fibromyalgia', turkish: 'Fibromiyalji (Yaygın kas ağrısı)', roots: 'fibra (lif) + mys (kas) + -algia (ağrı)', definition: 'Yaygın kas-iskelet sistemi ağrısı', category: 'pathology' },
    { id: 64, term: 'Atrophy', turkish: 'Atrofi (Kas erimesi)', roots: 'a- (yok) + trophē (beslenme)', definition: 'Kas veya dokunun küçülmesi', category: 'pathology' }
  ]
};

// Get all terms as a flat array
export const getAllTerms = () => {
  return Object.values(medicalTermsData).flat();
};

// Get terms by category
export const getTermsByCategory = (categoryId) => {
  return medicalTermsData[categoryId] || [];
};

// Get terms by body system
export const getTermsBySystem = (systemId, mainCategoryId = null) => {
  const allTerms = getAllTerms();
  return allTerms.filter(term => {
    const systemMatch = term.system === systemId;
    const mainCategoryMatch = mainCategoryId ? term.mainCategory === mainCategoryId : true;
    return systemMatch && mainCategoryMatch;
  });
};

// Get terms by system and subcategory
export const getTermsBySubcategory = (systemId, subcategoryId, mainCategoryId = null) => {
  const allTerms = getAllTerms();
  return allTerms.filter(term => {
    const systemMatch = term.system === systemId;
    const subcategoryMatch = term.subcategory === subcategoryId;
    const mainCategoryMatch = mainCategoryId ? term.mainCategory === mainCategoryId : true;
    return systemMatch && subcategoryMatch && mainCategoryMatch;
  });
};

// Get random terms for games
export const getRandomTerms = (count = 10, categoryId = null) => {
  const terms = categoryId ? getTermsByCategory(categoryId) : getAllTerms();
  const shuffled = [...terms].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Search terms
export const searchTerms = (query) => {
  const allTerms = getAllTerms();
  const lowerQuery = query.toLowerCase();
  return allTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.turkish.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery)
  );
};