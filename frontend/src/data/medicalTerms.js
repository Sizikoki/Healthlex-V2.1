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
  { id: 'urinary', name: 'Üriner Sistem' },
  { id: 'reproductive', name: 'Üreme Sistemi' },
  { id: 'nervous', name: 'Sinir Sistemi' }
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
    { id: 'head_and_neck_muscles', name: 'Baş ve Boyun Kasları' },
    { id: 'upper_extremity_muscles', name: 'Üst Ekstremite Kasları' },
    { id: 'trunk_muscles', name: 'Gövde Kasları' },
    { id: 'tissue_components', name: 'Doku / Yapısal Bileşenler' },
    { id: 'regional_anatomy', name: 'Organ / Bölgesel Anatomik Alanlar' },
    { id: 'physiological_functional', name: 'Fizyolojik / Fonksiyonel Kökler' },
    { id: 'pathological_conditions', name: 'Patolojik Durum Kökleri' },
    { id: 'anatomy', name: 'Anatomi' },
    { id: 'support', name: 'Destek Dokuları' },
    { id: 'joints', name: 'Eklemler & Hareket' },
    { id: 'skull_bones', name: 'Kafatası Kemikleri' },
    { id: 'face_bones', name: 'Yüz Kemikleri' },
    { id: 'trunk_bones', name: 'Gövde Kemikleri' },
    { id: 'anatomic_direction', name: 'Anatomik Yön Terimleri' },
    { id: 'basic_movement', name: 'Temel Hareket Terimleri' },
    { id: 'regional_movement', name: 'Bölgesel Hareket Terimleri' },
    { id: 'upper_extremity_bones', name: 'Üst Extremite Kemikleri' },
    { id: 'lower_extremity_bones', name: 'Alt Extremite Kemikleri' },
    { id: 'upper_extremity_joints', name: 'Üst Ekstremite Eklemleri' },
    { id: 'lower_extremity_joints', name: 'Alt Ekstremite Eklemleri' },
    { id: 'spine_joints', name: 'Omurga Eklemleri' },
    { id: 'head_and_neck_joints', name: 'Kafa ve Boyun Eklemleri' }
  ],
  respiratory: [
    { id: 'respiratory_organs', name: 'Solunum Organları ve Yapıları' },
    { id: 'nasal_structures', name: 'Üst Solunum Yolu – Nazal Yapılar' },
    { id: 'thoracic_areas', name: 'Göğüs ve İlişkili Anatomik Alanlar' },
    { id: 'glands_structures', name: 'Bezler ve Yapısal Bileşenler' },
    { id: 'respiratory_mechanics', name: 'Solunum Mekaniği ile İlişkili Yapılar' },
    { id: 'physiological_functional', name: 'Fizyolojik / Fonksiyonel Kökler' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  skin: [
    { id: 'skin_structures_lesions', name: 'Deri, Ekleri ve Lezyon Tipleri' },
    { id: 'skin_functions_physiology', name: 'Deri İşlevleri ve Fizyolojisi' },
    { id: 'skin_diseases_pathology', name: 'Deri Hastalıkları ve Patolojik Süreçler' },
    { id: 'dermatologic_diagnosis_treatment', name: 'Dermatolojik Tanı ve Tedavi Yöntemleri' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  circulatory: [
    { id: 'heart_chambers', name: 'Kalp ve Kalp Bölümleri' },
    { id: 'vessels_structures', name: 'Damarlar ve Damar Yapıları' },
    { id: 'physiological_functional', name: 'Fizyolojik / Fonksiyonel Kökler' },
    { id: 'pathological_conditions', name: 'Patolojik Durum Kökleri' },
    { id: 'diagnostic_imaging', name: 'Tanı – Görüntüleme Kökleri' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  sensory: [
    { id: 'eye_globe_structures', name: 'Göz Küresi ve Yardımcı Yapılar' },
    { id: 'vision_eye_movements', name: 'Görme İşlevi ve Göz Hareketleri' },
    { id: 'vision_loss_diseases', name: 'Görme Kaybı ve Göz Hastalıkları' },
    { id: 'examination_surgical', name: 'Göz Muayenesi ve Cerrahi İşlemler' },
    { id: 'ear_structures', name: 'Kulak Yapıları ve İşitme Yolu' },
    { id: 'hearing_balance_sound', name: 'İşitme, Denge ve Ses İletimi' },
    { id: 'hearing_loss_diseases', name: 'İşitme Kaybı ve Kulak Hastalıkları' },
    { id: 'ear_examination_surgical', name: 'Kulak Muayenesi ve Cerrahi İşlemler' },
    { id: 'smell_taste_structures', name: 'Koku ve Tat Alma Yapıları' },
    { id: 'smell_taste_perception', name: 'Koku ve Tat Algısı' },
    { id: 'smell_taste_disorders', name: 'Koku ve Tat Bozuklukları' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  endocrine: [
    { id: 'endocrine_glands_organs', name: 'Endokrin Bezler ve Organlar' },
    { id: 'hormones_metabolic_controls', name: 'Hormonlar ve Metabolik Kontroller' },
    { id: 'endocrine_clinical_manifestations', name: 'Endokrin Bozuklukların Klinik Görünümleri' },
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
    { id: 'digestive_organs', name: 'Sindirim ve İlişkili Organlar' },
    { id: 'liver_bile_pancreas', name: 'Karaciğer – Safra – Pankreas' },
    { id: 'abdomen_peritoneum', name: 'Karın – Periton – İlişkili Yapılar' },
    { id: 'other_anatomical', name: 'Diğer Anatomik Yapılar' },
    { id: 'physiological_functional', name: 'Fizyolojik / Fonksiyonel Kökler' },
    { id: 'pathological_clinical', name: 'Patolojik Durum / Klinik Hal Kökleri' },
    { id: 'diagnostic_imaging', name: 'Tanı – Görüntüleme – Ölçüm Kökleri' },
    { id: 'biochemical_content', name: 'Madde / İçerik / Biyokimyasal Kökler' },
    { id: 'blood_stool_secretion', name: 'Kan – Dışkı – Salgı İlişkili Kökler' },
    { id: 'other_clinical', name: 'Diğer Klinik / Yardımcı Kökler' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  urinary: [
    { id: 'anatomical_structures', name: 'Anatomik Yapı Kökleri' },
    { id: 'physiological_functional', name: 'Fizyolojik / Fonksiyonel Kökler' },
    { id: 'pathological_urine_content', name: 'Patolojik İçerik / İdrarda Bulunan Maddeler' },
    { id: 'pathological_formations', name: 'Patolojik Oluşumlar' },
    { id: 'clinical_symptoms', name: 'Klinik Durum / Semptom Kökleri' },
    { id: 'treatment_procedures', name: 'Tedavi / İşlem / Fonksiyon Kökleri' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  reproductive: [
    { id: 'female_organs', name: 'Kadın Üreme Organları' },
    { id: 'male_organs', name: 'Erkek Üreme Organları' },
    { id: 'gametes_secretions', name: 'Gametler, Salgılar ve Döngüler' },
    { id: 'clinical_conditions', name: 'Klinik Durumlar ve İşlev Bozuklukları' },
    { id: 'diagnostic_surgical', name: 'Tanı, İşlem ve Cerrahi Girişimler' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  nervous: [
    { id: 'central_peripheral_structures', name: 'Merkezi ve Çevresel Sinir Yapıları' },
    { id: 'mental_sensory_functions', name: 'Zihinsel Süreçler ve Duyusal İşlevler' },
    { id: 'motor_autonomic_functions', name: 'Motor (Hareket) ve Otonom İşlevler' },
    { id: 'neurological_disease_mechanisms', name: 'Nörolojik Hastalık Mekanizmaları' },
    { id: 'psychiatric_mood_disorders', name: 'Psikiyatrik Durumlar ve Duygulanım Bozuklukları' },
    { id: 'diagnostic_interventional', name: 'Nörolojik Tanı ve Girişimsel Yöntemler' },
    { id: 'anatomy', name: 'Anatomi' }
  ]
};

export const medicalTermsData = {
    "skull_bones": [
        {
            "id": 1,
            "term": "Os Frontale",
            "english": "Frontal Bone",
            "roots": "os (kemik) + frons (alın)",
            "turkishDefinition": "Beyni çevreleyen ve koruyan, kafatasının üst kısmını oluşturan kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Beyni çevreleyen ve koruyan, kafatasının üst kısmını oluşturan kemiktir",
            "englishDefinition": "Forms the forehead and anterior cranial roof, articulating posteriorly with the parietal bones at the coronal suture.",
            "group": "Os Frontale"
        },
        {
            "id": 2,
            "term": "Os Parietale",
            "english": "Parietal Bone",
            "roots": "os (kemik) + paries (duvar)",
            "turkishDefinition": "Kafatasının üst dış duvarını ve tavanını oluşturan büyük, kavisli bir kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Kafatasının üst dış duvarını ve tavanını oluşturan büyük, kavisli bir kemiktir",
            "englishDefinition": "A paired bone forming the lateral walls and roof of the cranium, joined to its mate at the sagittal suture.",
            "group": "Os Parietale"
        },
        {
            "id": 3,
            "term": "Os Temporale",
            "english": "Temporal Bone",
            "roots": "os (kemik) + tempus (şakak)",
            "turkishDefinition": "Kafatasının alt yan duvarlarına katkıda bulunur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Kafatasının alt yan duvarlarına katkıda bulunur",
            "englishDefinition": "Forms part of the lateral skull base and houses the structures of hearing and balance within the ear.",
            "group": "Os Temporale"
        },
        {
            "id": 4,
            "term": "Os Occipitale",
            "english": "Occipital Bone",
            "roots": "os (kemik) + occiput (ense)",
            "turkishDefinition": "Kafatasının arka duvarının ve tabanının büyük bir bölümünü oluşturan kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Kafatasının arka duvarının ve tabanının büyük bir bölümünü oluşturan kemiktir",
            "englishDefinition": "Forms the posterior skull and base, containing the foramen magnum through which the spinal cord passes.",
            "group": "Os Occipitale"
        },
        {
            "id": 5,
            "term": "Os Sphenoideum",
            "english": "Sphenoid Bone",
            "roots": "os (kemik) + sphen (kama)",
            "turkishDefinition": "Beyni çevreleyen ve koruyan kafatasının üst kısmını oluşturan kemiklerden biridir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Beyni çevreleyen ve koruyan kafatasının üst kısmını oluşturan kemiklerden biridir",
            "englishDefinition": "A wedge-shaped bone forming the central skull base, articulating with nearly all other cranial bones.",
            "group": "Os Sphenoidale"
        },
        {
            "id": 6,
            "term": "Os Ethmoideum",
            "english": "Ethmoid Bone",
            "roots": "os (kemik) + ethmos (elek)",
            "turkishDefinition": "Kafatasının üst kısmında yer alır ve beyni çevreleyip korur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Kafatasının üst kısmında yer alır ve beyni çevreleyip korur",
            "englishDefinition": "A light, sieve-like bone forming part of the anterior skull base and nasal cavity roof, with perforations for olfactory nerves.",
            "group": "Os Ethmoidale"
        },
        {
            "id": 433,
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The inner surface of the parietal bone, facing the brain.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Internal Surface of Parietal Bone",
            "term": "Facies Interna Ossis Parietalis",
            "roots": "facies (yüz) + interna (iç) + os parietale (duvar kemiği)",
            "turkishDefinition": "Duvar kemiği iç yüzü; duvar kemiğinin beyne bakan iç yüzeyi.",
            "turkishShort": "Duvar kemiği iç yüzü",
            "updatedAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 434,
            "turkishDefinition": "Sigmoid sinüs oluğu; duvar kemiğinin iç yüzünde sigmoid venöz sinüsün yerleştiği oluk.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove on the internal surface of the parietal bone that accommodates the sigmoid venous sinus.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Groove for Sigmoid Sinus of Parietal Bone",
            "term": "Sulcus Sinus Sigmoidei Ossis Parietalis",
            "roots": "sulcus (oluk) + sinus (sinüs) + sigmoideus (S şeklinde) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği sigmoid sinüs oluğu",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 435,
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove along the midline of the internal surface of the parietal bone that houses the superior sagittal sinus.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Groove for Superior Sagittal Sinus of Parietal Bone",
            "term": "Sulcus Sinus Sagittalis Superioris Ossis Parietalis",
            "roots": "sulcus (oluk) + sinus (sinüs) + sagittalis (ok yönünde) + superior (üst) + os parietale (duvar kemiği)",
            "turkishDefinition": "Duvar kemiği üst sagittal sinüs oluğu; duvar kemiğinin iç yüzünün orta hattı boyunca uzanan, üst sagittal venöz sinüsün yerleştiği oluk.",
            "turkishShort": "Duvar kemiği üst sagittal sinüs oluğu",
            "updatedAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 436,
            "turkishDefinition": "Meninks orta arter oluğu; duvar kemiğinin iç yüzünde orta meninks arterinin seyrettiği oluk.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove on the internal surface of the parietal bone that carries the middle meningeal artery.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Groove for Middle Meningeal Artery of Parietal Bone",
            "term": "Sulcus Arteriae Meningeae Mediae Ossis Parietalis",
            "roots": "sulcus (oluk) + arteria (atardamar) + meningeus (meninkslere ait) + medius (orta) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği meninks orta arter oluğu",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 437,
            "turkishDefinition": "Arter olukları; duvar kemiğinin iç yüzünde çeşitli meninks arterlerinin seyrettiği küçük oluklar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "Small grooves on the internal surface of the parietal bone that accommodate branches of the meningeal arteries.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Grooves for Arteries of Parietal Bone",
            "term": "Sulci Arteriosi Ossis Parietalis",
            "roots": "sulcus (oluk) + arteriosus (atardamara ait) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği arter olukları",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 438,
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The outer, convex surface of the parietal bone.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "External Surface of Parietal Bone",
            "term": "Facies Externa Ossis Parietalis",
            "roots": "facies (yüz) + externa (dış) + os parietale (duvar kemiği)",
            "turkishDefinition": "Duvar kemiği dış yüzü; duvar kemiğinin deri altına bakan dış yüzeyi.",
            "turkishShort": "Duvar kemiği dış yüzü",
            "updatedAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 439,
            "turkishDefinition": "Üst şakak çizgisi; duvar kemiğinin dış yüzünde temporal fasyanın tutunduğu üst çizgi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The upper of two curved lines on the external surface of the parietal bone, marking the attachment of the temporal fascia.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Superior Temporal Line of Parietal Bone",
            "term": "Linea Temporalis Superior Ossis Parietalis",
            "roots": "linea (çizgi) + temporalis (şakağa ait) + superior (üst) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği üst şakak çizgisi",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 440,
            "turkishDefinition": "Alt şakak çizgisi; duvar kemiğinin dış yüzünde temporal kasın tutunduğu alt çizgi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The lower of two curved lines on the external surface of the parietal bone, marking the attachment of the temporalis muscle.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Inferior Temporal Line of Parietal Bone",
            "term": "Linea Temporalis Inferior Ossis Parietalis",
            "roots": "linea (çizgi) + temporalis (şakağa ait) + inferior (alt) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği alt şakak çizgisi",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 441,
            "term": "Tuber Parietale",
            "english": "Parietal Tuber",
            "turkishDefinition": "Duvar kemik çıkıntısı (eş anlamlısı: Eminentia Parietalis); duvar kemiğinin dış yüzünde en dışbükey kısmındaki kabartı.",
            "roots": "tuber (tümsek) + parietalis (duvar kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Duvar kemik çıkıntısı",
            "englishDefinition": "The most convex and prominent point on the external surface of the parietal bone.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 442,
            "turkishDefinition": "Ardkafa kemiği kenarı; duvar kemiğinin oksipital kemikle birleştiği kenar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The posterior border of the parietal bone that articulates with the occipital bone.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Occipital Border of Parietal Bone",
            "term": "Margo Occipitalis Ossis Parietalis",
            "roots": "margo (kenar) + occipitalis (ardkafaya ait) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği ardkafa kenarı",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 443,
            "turkishDefinition": "Pullu kenar; duvar kemiğinin şakak kemiğinin pulsu kısmıyla birleştiği kenar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The border of the parietal bone that articulates with the squamous part of the temporal bone.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Squamosal Border of Parietal Bone",
            "term": "Margo Squamosus Ossis Parietalis",
            "roots": "margo (kenar) + squamosus (pullu) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği pullu kenarı",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 444,
            "turkishDefinition": "Sagittal kenar; iki duvar kemiğinin orta hatta birleştiği üst kenar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The superior border of the parietal bone that meets its counterpart at the midline to form the sagittal suture.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Sagittal Border of Parietal Bone",
            "term": "Margo Sagittalis Ossis Parietalis",
            "roots": "margo (kenar) + sagittalis (ok yönünde) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği sagittal kenarı",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 445,
            "turkishDefinition": "Alın kemiği kenarı; duvar kemiğinin alın kemiğiyle birleştiği ön kenar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The anterior border of the parietal bone that articulates with the frontal bone.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Frontal Border of Parietal Bone",
            "term": "Margo Frontalis Ossis Parietalis",
            "roots": "margo (kenar) + frontalis (alına ait) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği alın kenarı",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 446,
            "turkishDefinition": "Alın açısı; duvar kemiğinin alın ve sagittal kenarlarının kesiştiği ön-üst köşesi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The anterosuperior corner of the parietal bone, where the frontal and sagittal borders meet.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Frontal Angle of Parietal Bone",
            "term": "Angulus Frontalis Ossis Parietalis",
            "roots": "angulus (açı, köşe) + frontalis (alına ait) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği alın açısı",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 447,
            "turkishDefinition": "Ardkafa açısı; duvar kemiğinin sagittal ve oksipital kenarlarının kesiştiği arka-üst köşesi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The posterosuperior corner of the parietal bone, where the sagittal and occipital borders meet.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Occipital Angle of Parietal Bone",
            "term": "Angulus Occipitalis Ossis Parietalis",
            "roots": "angulus (açı, köşe) + occipitalis (ardkafaya ait) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği ardkafa açısı",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 448,
            "turkishDefinition": "Kama kemik açısı; duvar kemiğinin ön-alt köşesi, sfenoid kemiğe komşudur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The anteroinferior corner of the parietal bone, adjacent to the sphenoid bone.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Sphenoidal Angle of Parietal Bone",
            "term": "Angulus Sphenoidalis Ossis Parietalis",
            "roots": "angulus (açı, köşe) + sphenoidalis (kama kemiğine ait) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği kama kemik açısı",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 449,
            "turkishDefinition": "Mastoid açısı; duvar kemiğinin arka-alt köşesi, mastoid bölgeye komşudur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The posteroinferior corner of the parietal bone, adjacent to the mastoid region of the temporal bone.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "english": "Mastoid Angle of Parietal Bone",
            "term": "Angulus Mastoideus Ossis Parietalis",
            "roots": "angulus (açı, köşe) + mastoideus (meme şeklinde, mastoid bölgeye ait) + os parietale (duvar kemiği)",
            "turkishShort": "Duvar kemiği mastoid açısı",
            "updatedAt": {
                "_seconds": 1789116630,
                "_nanoseconds": 917000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 450,
            "term": "Foramen Parietale",
            "english": "Parietal Foramen",
            "turkishDefinition": "Parietal delik; duvar kemiğinin arka kısmında bulunan, emisser ven geçişine izin veren küçük delik.",
            "roots": "foramen (delik) + parietalis (duvar kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Parietal delik",
            "englishDefinition": "A small opening near the posterior part of the parietal bone that transmits an emissary vein.",
            "createdAt": {
                "_seconds": 1789115924,
                "_nanoseconds": 701000000
            },
            "group": "Os Parietale"
        },
        {
            "id": 451,
            "term": "Squama Frontalis",
            "english": "Frontal Squama",
            "turkishDefinition": "Alın pulu; alın kemiğinin geniş, dikey plaka şeklindeki ana gövdesi.",
            "roots": "squama (pul) + frontalis (alına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın pulu",
            "englishDefinition": "The broad, vertical plate-like main body of the frontal bone.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 452,
            "term": "Facies Externa Ossis Frontalis",
            "english": "External Surface of Frontal Bone",
            "turkishDefinition": "Alın kemiği dış yüzü; alın kemiğinin kaş kemeri ve glabellayı içeren dış yüzeyi.",
            "roots": "facies (yüz) + externa (dış) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği dış yüzü",
            "englishDefinition": "The outer surface of the frontal bone, which includes the superciliary arches and glabella.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 453,
            "term": "Tuber Frontale",
            "english": "Frontal Tuber",
            "turkishDefinition": "Alın tümseği (eş anlamlısı: Eminentia Frontalis); alın kemiğinin dış yüzünde her iki yanda yer alan hafif kabarıklık.",
            "roots": "tuber (tümsek) + frontalis (alına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın tümseği",
            "englishDefinition": "A slight prominence on either side of the external surface of the frontal bone.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 454,
            "term": "Arcus Superciliaris",
            "english": "Superciliary Arch",
            "turkishDefinition": "Kaş kemeri; alın kemiğinin dış yüzünde kaşların üzerinde yer alan kavisli kabartı.",
            "roots": "arcus (kemer) + superciliaris (kaşa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Kaş kemeri",
            "englishDefinition": "A curved ridge on the external surface of the frontal bone above the eyebrows.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 455,
            "term": "Glabella",
            "english": "Glabella",
            "turkishDefinition": "Kaşlar arası düzlük; iki kaş kemeri arasındaki düz, kıl bulunmayan alan.",
            "roots": "glaber (kılsız, düz)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Kaşlar arası düzlük",
            "englishDefinition": "The smooth area between the eyebrows, located between the two superciliary arches.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 457,
            "term": "Margo Supraorbitalis",
            "english": "Supraorbital Margin",
            "turkishDefinition": "Göz çukuru üst kenarı; alın kemiğinin göz çukurunun üst sınırını oluşturan kenarı.",
            "roots": "margo (kenar) + supra (üstünde) + orbitalis (göz çukuruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Göz çukuru üst kenarı",
            "englishDefinition": "The upper rim of the orbit, formed by the frontal bone.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 458,
            "term": "Incisura Supraorbitalis",
            "english": "Supraorbital Notch; Foramen",
            "turkishDefinition": "Göz üstü çentiği / deliği (eş anlamlısı: Foramen Supraorbitale); supraorbital sinir ve damarların geçtiği çentik veya delik.",
            "roots": "incisura (çentik) + supra (üstünde) + orbitalis (göz çukuruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Göz üstü çentiği",
            "englishDefinition": "A notch or foramen in the supraorbital margin through which the supraorbital nerve and vessels pass.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 459,
            "term": "Incisura Frontalis",
            "english": "Frontal Notch; Foramen",
            "turkishDefinition": "Frontal çentik / delik (eş anlamlısı: Foramen Frontale); supraorbital çentiğin iç tarafında yer alan, frontal sinir dalının geçtiği küçük çentik.",
            "roots": "incisura (çentik) + frontalis (alına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Frontal çentik",
            "englishDefinition": "A small notch or foramen medial to the supraorbital notch, transmitting a branch of the frontal nerve.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 460,
            "term": "Facies Temporalis Ossis Frontalis",
            "english": "Temporal Surface of Frontal Bone",
            "turkishDefinition": "Alın kemiği şakak yüzü; alın kemiğinin şakak çukuruna bakan yan yüzeyi.",
            "roots": "facies (yüz) + temporalis (şakağa ait) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği şakak yüzü",
            "englishDefinition": "The lateral surface of the frontal bone that faces the temporal fossa.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 461,
            "term": "Margo Parietalis Ossis Frontalis",
            "english": "Parietal Margin of Frontal Bone",
            "turkishDefinition": "Alın kemiği parietal kenarı; alın kemiğinin duvar kemikleriyle birleştiği kenar.",
            "roots": "margo (kenar) + parietalis (duvar kemiğine ait) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği parietal kenarı",
            "englishDefinition": "The border of the frontal bone that articulates with the parietal bones.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 462,
            "term": "Linea Temporalis Ossis Frontalis",
            "english": "Temporal Line of Frontal Bone",
            "turkishDefinition": "Alın kemiği temporal çizgisi; alın kemiğinin dış yüzünde temporal fasyanın başlangıcını işaretleyen çizgi.",
            "roots": "linea (çizgi) + temporalis (şakağa ait) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği temporal çizgisi",
            "englishDefinition": "A curved line on the external surface of the frontal bone marking the origin of the temporal fascia.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 463,
            "term": "Processus Zygomaticus Ossis Frontalis",
            "english": "Zygomatic Process of Frontal Bone",
            "turkishDefinition": "Alın kemiği elmacık çıkıntısı; alın kemiğinin yan tarafında elmacık kemiğiyle birleşen çıkıntı.",
            "roots": "processus (çıkıntı) + zygomaticus (elmacığa ait) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği elmacık çıkıntısı",
            "englishDefinition": "A lateral projection of the frontal bone that articulates with the zygomatic bone.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 464,
            "term": "Facies Interna Ossis Frontalis",
            "english": "Internal Surface of Frontal Bone",
            "turkishDefinition": "Alın kemiği iç yüzü; alın kemiğinin beyne bakan, frontal krista ve sagittal sinüs oluğunu içeren iç yüzeyi.",
            "roots": "facies (yüz) + interna (iç) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği iç yüzü",
            "englishDefinition": "The inner surface of the frontal bone, facing the brain and containing the frontal crest and sagittal sinus groove.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 465,
            "term": "Crista Frontalis",
            "english": "Frontal Crest",
            "turkishDefinition": "Alın ibiği; alın kemiğinin iç yüzünün orta hattında yer alan, dura mater'in tutunduğu dikey kemik çıkıntısı.",
            "roots": "crista (ibik) + frontalis (alına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın ibiği",
            "englishDefinition": "A vertical ridge on the midline of the internal surface of the frontal bone, providing attachment for the falx cerebri.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 466,
            "term": "Sulcus Sinus Sagittalis Superioris Ossis Frontalis",
            "english": "Groove for Superior Sagittal Sinus of Frontal Bone",
            "turkishDefinition": "Alın kemiği üst sagittal sinüs oluğu; alın kemiğinin iç yüzünün orta hattında, üst sagittal venöz sinüsün başlangıç kısmının yerleştiği oluk.",
            "roots": "sulcus (oluk) + sinus (sinüs) + sagittalis (ok yönünde) + superior (üst) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği üst sagittal sinüs oluğu",
            "englishDefinition": "A groove along the midline of the internal surface of the frontal bone that continues into the superior sagittal sinus.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 467,
            "term": "Foramen Caecum",
            "english": "Foramen Caecum",
            "turkishDefinition": "Kör delik; alın kemiği ile kalbur kemiği arasında yer alan, embriyonik dönemde önemli olan küçük delik.",
            "roots": "foramen (delik) + caecus (kör, kapalı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Kör delik",
            "englishDefinition": "A small opening between the frontal and ethmoid bones, of embryological significance.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 468,
            "term": "Pars Nasalis Ossis Frontalis",
            "english": "Nasal Part of Frontal Bone",
            "turkishDefinition": "Alın kemiği burun bölgesi; alın kemiğinin burun kökü ve kalbur kemiğine komşu alt-ön kısmı.",
            "roots": "pars (bölüm) + nasalis (buruna ait) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği burun bölgesi",
            "englishDefinition": "The anteroinferior part of the frontal bone adjacent to the nasal bones and ethmoid.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 469,
            "term": "Spina Nasalis Ossis Frontalis",
            "english": "Nasal Spine of Frontal Bone",
            "turkishDefinition": "Alın kemiği burun dikeni; alın kemiğinin burun bölgesinin orta hattından aşağı uzanan sivri çıkıntı.",
            "roots": "spina (diken) + nasalis (buruna ait) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği burun dikeni",
            "englishDefinition": "A pointed projection extending downward from the midline of the nasal part of the frontal bone.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 470,
            "term": "Margo Nasalis Ossis Frontalis",
            "english": "Nasal Margin of Frontal Bone",
            "turkishDefinition": "Alın kemiği burun kenarı; alın kemiğinin burun kemikleriyle birleştiği pürtüklü kenar.",
            "roots": "margo (kenar) + nasalis (buruna ait) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği burun kenarı",
            "englishDefinition": "The serrated border of the frontal bone that articulates with the nasal bones.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 471,
            "term": "Pars Orbitalis Ossis Frontalis",
            "english": "Orbital Part of Frontal Bone",
            "turkishDefinition": "Alın kemiği göz çukuru bölgesi; alın kemiğinin göz çukurunun tavanını oluşturan yatay plaka şeklindeki kısmı.",
            "roots": "pars (bölüm) + orbitalis (göz çukuruna ait) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği göz çukuru bölgesi",
            "englishDefinition": "The horizontal plate-like part of the frontal bone forming the roof of the orbit.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 472,
            "term": "Facies Orbitalis Ossis Frontalis",
            "english": "Orbital Surface of Frontal Bone",
            "turkishDefinition": "Alın kemiği göz çukuru yüzü; alın kemiğinin göz çukurunun tavanını oluşturan alt yüzeyi.",
            "roots": "facies (yüz) + orbitalis (göz çukuruna ait) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği göz çukuru yüzü",
            "englishDefinition": "The smooth inferior surface of the orbital part of the frontal bone, forming the roof of the orbit.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 473,
            "term": "Spina Trochlearis",
            "english": "Trochlear Spine",
            "turkishDefinition": "Makara dikeni; göz çukuru tavanında üst eğik göz kası makarasının tutunduğu küçük çıkıntı.",
            "roots": "spina (diken) + trochlearis (makaraya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Makara dikeni",
            "englishDefinition": "A small projection in the orbit to which the trochlea of the superior oblique muscle attaches.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 474,
            "term": "Fovea Trochlearis",
            "english": "Trochlear Fovea",
            "turkishDefinition": "Makara çukurcuğu; göz çukuru tavanında spina trochlearis yerine bazı bireylerde bulunan sığ çukurcuk.",
            "roots": "fovea (çukurcuk) + trochlearis (makaraya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Makara çukurcuğu",
            "englishDefinition": "A small depression in the orbit, present in some individuals instead of the trochlear spine, for attachment of the trochlea.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 475,
            "term": "Fossa Glandulae Lacrimalis",
            "english": "Fossa for Lacrimal Gland",
            "turkishDefinition": "Gözyaşı bezi çukuru; göz çukurunun dış-üst köşesinde gözyaşı bezini barındıran sığ çukur.",
            "roots": "fossa (çukur) + glandula (bez) + lacrimalis (gözyaşına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Gözyaşı bezi çukuru",
            "englishDefinition": "A shallow depression in the superolateral part of the orbit that houses the lacrimal gland.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 476,
            "term": "Margo Sphenoidalis Ossis Frontalis",
            "english": "Sphenoidal Margin of Frontal Bone",
            "turkishDefinition": "Alın kemiği kama kemik kenarı; alın kemiğinin sfenoid kemiğin büyük kanadıyla birleştiği kenar.",
            "roots": "margo (kenar) + sphenoidalis (kama kemiğine ait) + os frontale (alın kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın kemiği kama kemik kenarı",
            "englishDefinition": "The border of the frontal bone that articulates with the greater wing of the sphenoid bone.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 477,
            "term": "Incisura Ethmoidalis",
            "english": "Ethmoidal Notch",
            "turkishDefinition": "Kalbur kemik çentiği; alın kemiğinin göz çukuru bölümleri arasında kalbur kemiğini kabul eden geniş çentik.",
            "roots": "incisura (çentik) + ethmoidalis (kalbur kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Kalbur kemik çentiği",
            "englishDefinition": "A wide notch between the orbital parts of the frontal bone that accommodates the ethmoid bone.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 478,
            "term": "Sinus Frontalis",
            "english": "Frontal Sinus",
            "turkishDefinition": "Alın sinüsü; alın kemiğinin içinde bulunan, hava dolu paranazal sinüs.",
            "roots": "sinus (boşluk, oyuk) + frontalis (alına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın sinüsü",
            "englishDefinition": "An air-filled paranasal sinus located within the frontal bone.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 479,
            "term": "Apertura Sinus Frontalis",
            "english": "Opening of Frontal Sinus",
            "turkishDefinition": "Alın sinüsü açıklığı; alın sinüsünün orta burun geçidine açıldığı delik.",
            "roots": "apertura (açıklık) + sinus (boşluk) + frontalis (alına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın sinüsü açıklığı",
            "englishDefinition": "The opening through which the frontal sinus drains into the middle nasal meatus.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 480,
            "term": "Septum Sinuum Frontalium",
            "english": "Septum of Frontal Sinuses",
            "turkishDefinition": "Alın sinüsleri bölmesi; sağ ve sol alın sinüslerini birbirinden ayıran ince kemik bölme.",
            "roots": "septum (bölme) + sinus (boşluk) + frontalis (alına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Alın sinüsleri bölmesi",
            "englishDefinition": "The thin bony partition separating the right and left frontal sinuses.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            },
            "group": "Os Frontale"
        },
        {
            "id": 481,
            "term": "Foramen Magnum",
            "english": "Foramen Magnum",
            "turkishDefinition": "En büyük kafa deliği; ardkafa kemiğinin ortasında yer alan, medulla oblongata'nın omurilikle devam ettiği büyük açıklık.",
            "turkishShort": "En büyük kafa deliği",
            "roots": "foramen (delik) + magnus (büyük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The large opening in the occipital bone through which the medulla oblongata continues as the spinal cord.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 482,
            "term": "Basion",
            "english": "Basion",
            "turkishDefinition": "Basiyon; foramen magnum'un ön orta noktası, kraniyometrik ölçümlerde referans noktası.",
            "turkishShort": "Basiyon",
            "roots": "basis (taban - Yunanca)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The midpoint of the anterior margin of the foramen magnum, used as a craniometric landmark.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 483,
            "term": "Opisthion",
            "english": "Opisthion",
            "turkishDefinition": "Opistiyon; foramen magnum'un arka orta noktası, kraniyometrik ölçümlerde referans noktası.",
            "turkishShort": "Opistiyon",
            "roots": "opisthen (arkada - Yunanca)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The midpoint of the posterior margin of the foramen magnum, used as a craniometric landmark.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 484,
            "term": "Pars Basilaris Ossis Occipitalis",
            "english": "Basilar Part of Occipital Bone",
            "turkishDefinition": "Ardkafa kemiği taban parçası; foramen magnum'un önünde yer alan, sfenoid kemikle birleşerek klivusu oluşturan kısım.",
            "turkishShort": "Ardkafa kemiği taban parçası",
            "roots": "pars (bölüm) + basilaris (tabana ait) + os occipitale (ardkafa kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The part of the occipital bone anterior to the foramen magnum that joins the sphenoid bone to form the clivus.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 485,
            "term": "Clivus",
            "english": "Clivus",
            "turkishDefinition": "Yokuş / Klivus; sfenoid kemiğin gövdesi ile ardkafa kemiğinin taban parçasının birleşmesiyle oluşan eğimli yüzey.",
            "turkishShort": "Yokuş / Klivus",
            "roots": "clivus (yokuş, eğim)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The sloped surface formed by the union of the body of the sphenoid bone and the basilar part of the occipital bone.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 486,
            "term": "Tuberculum Pharyngeum",
            "english": "Pharyngeal Tubercle",
            "turkishDefinition": "Yutak tümsekciği; ardkafa kemiğinin taban parçasının alt yüzünde, yutak duvarının tutunduğu küçük tümsek.",
            "turkishShort": "Yutak tümsekciği",
            "roots": "tuberculum (küçük tümsek) + pharyngeus (yutağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small tubercle on the inferior surface of the basilar part of the occipital bone, providing attachment for the pharyngeal wall.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 487,
            "term": "Sulcus Sinus Petrosi Inferioris Ossis Occipitalis",
            "english": "Groove for Inferior Petrosal Sinus of Occipital Bone",
            "turkishDefinition": "Ardkafa kemiği alt petroz sinüs oluğu; ardkafa kemiğinin taban parçasının yan kenarında yer alan, alt petroz venöz sinüsün yerleştiği oluk.",
            "turkishShort": "Ardkafa kemiği alt petroz sinüs oluğu",
            "roots": "sulcus (oluk) + sinus (sinüs) + petrosus (taşsı) + inferior (alt) + os occipitale (ardkafa kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove along the lateral edge of the basilar part of the occipital bone that houses the inferior petrosal sinus.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 488,
            "term": "Pars Lateralis Ossis Occipitalis",
            "english": "Lateral Part of Occipital Bone",
            "turkishDefinition": "Ardkafa kemiği yan parçası; foramen magnum'un yanlarında yer alan, oksipital kondilleri taşıyan kısım.",
            "turkishShort": "Ardkafa kemiği yan parçası",
            "roots": "pars (bölüm) + lateralis (yan) + os occipitale (ardkafa kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The part of the occipital bone lateral to the foramen magnum that bears the occipital condyles.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 489,
            "term": "Squama Occipitalis",
            "english": "Occipital Squama",
            "turkishDefinition": "Ardkafa pulu; ardkafa kemiğinin foramen magnum'un arkasında kalan geniş, kavisli plaka şeklindeki kısmı.",
            "turkishShort": "Ardkafa pulu",
            "roots": "squama (pul) + occipitalis (ardkafaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The broad, curved plate-like portion of the occipital bone posterior to the foramen magnum.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 490,
            "term": "Margo Mastoideus Ossis Occipitalis",
            "english": "Mastoid Border of Occipital Bone",
            "turkishDefinition": "Ardkafa kemiği mastoid kenarı; ardkafa kemiğinin şakak kemiğinin mastoid parçasıyla birleştiği kenar.",
            "turkishShort": "Ardkafa kemiği mastoid kenarı",
            "roots": "margo (kenar) + mastoideus (mastoid bölgeye ait) + os occipitale (ardkafa kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The border of the occipital bone that articulates with the mastoid part of the temporal bone.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 491,
            "term": "Margo Lambdoideus Ossis Occipitalis",
            "english": "Lambdoid Border of Occipital Bone",
            "turkishDefinition": "Ardkafa kemiği lambdoid kenarı; ardkafa kemiğinin duvar kemikleriyle birleşerek lambdoid dikişi oluşturan kenarı.",
            "turkishShort": "Ardkafa kemiği lambdoid kenarı",
            "roots": "margo (kenar) + lambdoideus (lambda harfi şeklinde) + os occipitale (ardkafa kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The border of the occipital bone that articulates with the parietal bones to form the lambdoid suture.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 492,
            "term": "Os Interparietale",
            "english": "Interparietal Bone",
            "turkishDefinition": "İnterparietal kemik; bazı bireylerde ardkafa pulunun üst kısmında ayrı bir kemik olarak kalabilen, embriyonik kaynaklı yapı.",
            "turkishShort": "İnterparietal kemik",
            "roots": "os (kemik) + inter (arasında) + parietalis (duvar kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A variant ossicle that may persist as a separate bone in the upper part of the occipital squama in some individuals.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 493,
            "term": "Condylus Occipitalis",
            "english": "Occipital Condyle",
            "turkishDefinition": "Ardkafa lokması / kondili; ardkafa kemiğinin yan parçasında yer alan, atlas ile eklemleşen oval kemik çıkıntısı.",
            "turkishShort": "Ardkafa lokması",
            "roots": "condylus (lokma, eklem çıkıntısı) + occipitalis (ardkafaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "An oval bony prominence on the lateral part of the occipital bone that articulates with the atlas.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 494,
            "term": "Canalis Condylaris",
            "english": "Condylar Canal",
            "turkishDefinition": "Kondiler kanal; oksipital kondilin arkasında bazı bireylerde bulunan, emisser ven geçişine izin veren kanal.",
            "turkishShort": "Kondiler kanal",
            "roots": "canalis (kanal) + condylaris (kondile ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A canal posterior to the occipital condyle, present in some individuals, transmitting an emissary vein.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 495,
            "term": "Canalis Nervi Hypoglossi",
            "english": "Hypoglossal Canal",
            "turkishDefinition": "Dilaltı sinir kanalı; oksipital kondilin üzerinde yer alan, 12. kafa çifti olan hipoglossal sinirin geçtiği kanal.",
            "turkishShort": "Dilaltı sinir kanalı",
            "roots": "canalis (kanal) + nervus (sinir) + hypoglossus (dil altına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A canal above the occipital condyle through which the hypoglossal nerve (cranial nerve XII) passes.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 496,
            "term": "Fossa Condylaris",
            "english": "Condylar Fossa",
            "turkishDefinition": "Kondil çukuru; oksipital kondilin arkasında yer alan, kondiler kanal bulunmadığında görülebilen çukur.",
            "turkishShort": "Kondil çukuru",
            "roots": "fossa (çukur) + condylaris (kondile ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A depression posterior to the occipital condyle, sometimes containing the opening of the condylar canal.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 497,
            "term": "Tuberculum Jugulare",
            "english": "Jugular Tubercle",
            "turkishDefinition": "Juguler tümsekcik; ardkafa kemiğinin taban parçası ile yan parçası arasında yer alan, hipoglossal kanalın üzerindeki kabartı.",
            "turkishShort": "Juguler tümsekcik",
            "roots": "tuberculum (küçük tümsek) + jugularis (boyun toplardamarına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small elevation above the hypoglossal canal, located between the basilar and lateral parts of the occipital bone.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 498,
            "term": "Incisura Jugularis Ossis Occipitalis",
            "english": "Jugular Notch of Occipital Bone",
            "turkishDefinition": "Ardkafa kemiği juguler çentiği; ardkafa kemiğinin yan parçasında yer alan, şakak kemiğiyle birlikte foramen jugulare'yi oluşturan çentik.",
            "turkishShort": "Ardkafa kemiği juguler çentiği",
            "roots": "incisura (çentik) + jugularis (boyun toplardamarına ait) + os occipitale (ardkafa kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A notch on the lateral part of the occipital bone that, together with the temporal bone, forms the jugular foramen.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 499,
            "term": "Processus Jugularis",
            "english": "Jugular Process",
            "turkishDefinition": "Boyun toplardamarı çıkıntısı; ardkafa kemiğinin yan parçasının dışa doğru uzanan çıkıntısı.",
            "turkishShort": "Boyun toplardamarı çıkıntısı",
            "roots": "processus (çıkıntı) + jugularis (boyun toplardamarına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A lateral projection of the occipital bone's lateral part, situated above the jugular notch.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 500,
            "term": "Processus Intrajugulans Ossis Occipitalis",
            "english": "Intrajugular Process of Occipital Bone",
            "turkishDefinition": "Ardkafa kemiği intrajuguler çıkıntısı; foramen jugulare'yi kısmen ikiye bölen küçük kemik çıkıntısı.",
            "turkishShort": "Ardkafa kemiği intrajuguler çıkıntısı",
            "roots": "processus (çıkıntı) + intra (içinde) + jugularis (boyun toplardamarına ait) + os occipitale (ardkafa kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small bony projection that partially divides the jugular foramen, arising from the occipital bone.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 501,
            "term": "Protuberantia Occipitalis Externa",
            "english": "External Occipital Protuberance",
            "turkishDefinition": "Dış ardkafa tümseği; ardkafa pulunun dış yüzünün orta hattında, ense bağının tutunduğu belirgin kabartı.",
            "turkishShort": "Dış ardkafa tümseği",
            "roots": "protuberantia (kabartı) + occipitalis (ardkafaya ait) + externa (dış)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A prominent midline bump on the external surface of the occipital squama, providing attachment for the nuchal ligament.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 502,
            "term": "Crista Occipitalis Externa",
            "english": "External Occipital Crest",
            "turkishDefinition": "Dış ardkafa ibiği; dış ardkafa tümseğinden foramen magnum'a uzanan orta hat ibiği.",
            "turkishShort": "Dış ardkafa ibiği",
            "roots": "crista (ibik) + occipitalis (ardkafaya ait) + externa (dış)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A midline ridge extending from the external occipital protuberance to the foramen magnum.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 503,
            "term": "Linea Nuchalis Suprema",
            "english": "Highest Nuchal Line",
            "turkishDefinition": "En üst ense çizgisi; dış ardkafa tümseğinin üzerinde yer alan, epikranial aponörozun tutunduğu ince çizgi.",
            "turkishShort": "En üst ense çizgisi",
            "roots": "linea (çizgi) + nuchalis (enseye ait) + suprema (en üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The uppermost of the curved lines on the external occipital surface, providing attachment for the epicranial aponeurosis.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 504,
            "term": "Linea Nuchalis Superior",
            "english": "Superior Nuchal Line",
            "turkishDefinition": "Üst ense çizgisi; trapezius ve sternokleidomastoid kaslarının tutunduğu, dış ardkafa tümseğinden yanlara uzanan çizgi.",
            "turkishShort": "Üst ense çizgisi",
            "roots": "linea (çizgi) + nuchalis (enseye ait) + superior (üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A curved line extending laterally from the external occipital protuberance, providing attachment for the trapezius and sternocleidomastoid muscles.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 505,
            "term": "Linea Nuchalis Inferior",
            "english": "Inferior Nuchal Line",
            "turkishDefinition": "Alt ense çizgisi; üst ense çizgisinin altında yer alan, boyun kaslarının bir kısmının tutunduğu çizgi.",
            "turkishShort": "Alt ense çizgisi",
            "roots": "linea (çizgi) + nuchalis (enseye ait) + inferior (alt)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A curved line below the superior nuchal line, providing attachment for some of the neck muscles.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 506,
            "term": "Planum Occipitale",
            "english": "Occipital Plane",
            "turkishDefinition": "Ardkafa düzlüğü; dış ardkafa tümseğinin üzerinde kalan, ardkafa pulunun üst-dış kısmı.",
            "turkishShort": "Ardkafa düzlüğü",
            "roots": "planum (düzlük) + occipitalis (ardkafaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The upper-outer part of the occipital squama above the external occipital protuberance.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 507,
            "term": "Eminentia Cruciformis",
            "english": "Cruciform Eminence",
            "turkishDefinition": "Haçsı kabartı; ardkafa pulunun iç yüzünde, dört çukuru (iki serebral, iki serebellar) birbirinden ayıran haç şeklindeki kabartı.",
            "turkishShort": "Haçsı kabartı",
            "roots": "eminentia (kabartı) + cruciformis (haç şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A cross-shaped ridge on the internal surface of the occipital squama that separates the cerebral and cerebellar fossae.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 508,
            "term": "Protuberantia Occipitalis Interna",
            "english": "Internal Occipital Protuberance",
            "turkishDefinition": "İç ardkafa tümseği; haçsı kabartının merkezinde yer alan, dural venöz sinüslerin birleştiği nokta.",
            "turkishShort": "İç ardkafa tümseği",
            "roots": "protuberantia (kabartı) + occipitalis (ardkafaya ait) + interna (iç)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The point at the center of the cruciform eminence where the dural venous sinuses converge.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 509,
            "term": "Crista Occipitalis Interna",
            "english": "Internal Occipital Crest",
            "turkishDefinition": "İç ardkafa ibiği; iç ardkafa tümseğinden foramen magnum'a uzanan, falx cerebelli'nin tutunduğu orta hat ibiği.",
            "turkishShort": "İç ardkafa ibiği",
            "roots": "crista (ibik) + occipitalis (ardkafaya ait) + interna (iç)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A midline ridge extending from the internal occipital protuberance to the foramen magnum, providing attachment for the falx cerebelli.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 510,
            "term": "Sulcus Sinus Transversi Ossis Occipitalis",
            "english": "Groove for Transverse Sinus of Occipital Bone",
            "turkishDefinition": "Ardkafa kemiği enine sinüs oluğu; haçsı kabartının yanlara uzanan kollarında yer alan, enine venöz sinüsün yerleştiği oluk.",
            "turkishShort": "Ardkafa kemiği enine sinüs oluğu",
            "roots": "sulcus (oluk) + sinus (sinüs) + transversus (enine) + os occipitale (ardkafa kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove along the lateral arms of the cruciform eminence that houses the transverse venous sinus.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 511,
            "term": "Sulcus Sinus Sigmoidei Ossis Occipitalis",
            "english": "Groove for Sigmoid Sinus of Occipital Bone",
            "turkishDefinition": "Ardkafa kemiği sigmoid sinüs oluğu; ardkafa kemiğinin yan parçasında yer alan, sigmoid venöz sinüsün devam ettiği oluk.",
            "turkishShort": "Ardkafa kemiği sigmoid sinüs oluğu",
            "roots": "sulcus (oluk) + sinus (sinüs) + sigmoideus (S şeklinde) + os occipitale (ardkafa kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove on the lateral part of the occipital bone that continues the course of the sigmoid venous sinus.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 512,
            "term": "Sulcus Sinus Occipitalis",
            "english": "Groove for Occipital Sinus",
            "turkishDefinition": "Ardkafa sinüs oluğu; iç ardkafa ibiğinin yanında yer alan, küçük oksipital venöz sinüsün yerleştiği oluk.",
            "turkishShort": "Ardkafa sinüs oluğu",
            "roots": "sulcus (oluk) + sinus (sinüs) + occipitalis (ardkafaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small groove beside the internal occipital crest that houses the occipital venous sinus.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 513,
            "term": "Sulcus Sinus Marginalis",
            "english": "Groove for Marginal Sinus",
            "turkishDefinition": "Kenar sinüs oluğu; foramen magnum'un kenarı boyunca uzanan, marjinal venöz sinüsün yerleştiği oluk.",
            "turkishShort": "Kenar sinüs oluğu",
            "roots": "sulcus (oluk) + sinus (sinüs) + marginalis (kenara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove along the margin of the foramen magnum that houses the marginal venous sinus.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 514,
            "term": "Processus Paramastoideus",
            "english": "Paramastoid Process",
            "turkishDefinition": "Paramastoid çıkıntı; ardkafa kemiğinin yan parçasında bazı bireylerde bulunan, atlasın enine çıkıntısına doğru uzanan ek çıkıntı.",
            "turkishShort": "Paramastoid çıkıntı",
            "roots": "processus (çıkıntı) + para (yanında) + mastoideus (mastoid bölgeye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "An accessory projection on the lateral part of the occipital bone, present in some individuals, extending toward the transverse process of the atlas.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 515,
            "term": "Fossa Cerebralis",
            "english": "Cerebral Fossa",
            "turkishDefinition": "Beyin çukuru; haçsı kabartının üstünde yer alan, beyin loblarını barındıran çukur.",
            "turkishShort": "Beyin çukuru",
            "roots": "fossa (çukur) + cerebralis (beyne ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A depression above the cruciform eminence on the internal surface of the occipital squama that accommodates the cerebral lobes.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 516,
            "term": "Fossa Cerebellaris",
            "english": "Cerebellar Fossa",
            "turkishDefinition": "Beyincik çukuru; haçsı kabartının altında yer alan, beyincik loblarını barındıran çukur.",
            "turkishShort": "Beyincik çukuru",
            "roots": "fossa (çukur) + cerebellaris (beyinciğe ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A depression below the cruciform eminence on the internal surface of the occipital squama that accommodates the cerebellar lobes.",
            "createdAt": {
                "_seconds": 1789117059,
                "_nanoseconds": 402000000
            },
            "group": "Os Occipitale"
        },
        {
            "id": 517,
            "term": "Corpus Ossis Sphenoidalis",
            "english": "Body of Sphenoid Bone",
            "turkishDefinition": "Kama kemik gövdesi; sfenoid kemiğin merkezi, küp şeklindeki ana gövde kısmı, içinde sfenoid sinüsü barındırır.",
            "turkishShort": "Kama kemik gövdesi",
            "roots": "corpus (gövde) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The central, cuboidal main body of the sphenoid bone, containing the sphenoidal sinus.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 518,
            "term": "Jugum Sphenoidale",
            "english": "Sphenoidal Yoke",
            "turkishDefinition": "Kama kemik boyunduruğu; sfenoid gövdesinin üst yüzünde, iki küçük kanadı birbirine bağlayan düz alan.",
            "turkishShort": "Kama kemik boyunduruğu",
            "roots": "jugum (boyunduruk, bağlantı) + sphenoidalis (kama kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A flat area on the superior surface of the sphenoid body connecting the two lesser wings.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 519,
            "term": "Limbus Sphenoidalis",
            "english": "Limbus of Sphenoid",
            "turkishDefinition": "Kama kemik kenarı; jugum sphenoidale'nin arka sınırını oluşturan keskin kenar, kiyazma önü oluğun önünde yer alır.",
            "turkishShort": "Kama kemik kenarı",
            "roots": "limbus (kenar, sınır) + sphenoidalis (kama kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A sharp ridge forming the posterior border of the jugum sphenoidale, anterior to the prechiasmatic sulcus.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 520,
            "term": "Sulcus Prechiasmaticus",
            "english": "Prechiasmatic Sulcus",
            "turkishDefinition": "Kiyazma önü oluğu; görme siniri çaprazının (kiyazma) önünde yer alan, iki optik kanalı birleştiren enine oluk.",
            "turkishShort": "Kiyazma önü oluğu",
            "roots": "sulcus (oluk) + prae (önünde) + chiasma (çapraz)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A transverse groove connecting the two optic canals, located anterior to the optic chiasm.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 521,
            "term": "Sella Turcica",
            "english": "Sella Turcica (Turkish Saddle)",
            "turkishDefinition": "Türk eğeri; sfenoid kemiğinin gövdesinin üst yüzünde, hipofiz bezini barındıran eyer şeklindeki çukur.",
            "turkishShort": "Türk eğeri",
            "roots": "sella (eyer) + turcicus (Türk'e ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A saddle-shaped depression on the superior surface of the sphenoid body that houses the pituitary gland.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 522,
            "term": "Tuberculum Sellae",
            "english": "Tuberculum of Sella",
            "turkishDefinition": "Eğer tümsekciği; sella turcica'nın ön sınırını oluşturan küçük kemik kabartı.",
            "turkishShort": "Eğer tümsekciği",
            "roots": "tuberculum (küçük tümsek) + sella (eyer)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small bony prominence forming the anterior border of the sella turcica.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 523,
            "term": "Processus Clinoideus Medius",
            "english": "Middle Clinoid Process",
            "turkishDefinition": "Orta klinoid çıkıntı; sella turcica'nın ön-yan kısmında bazı bireylerde bulunan küçük kemik çıkıntı.",
            "turkishShort": "Orta klinoid çıkıntı",
            "roots": "processus (çıkıntı) + clinoideus (yatak şeklinde) + medius (orta)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small bony projection on the anterolateral part of the sella turcica, present in some individuals.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 524,
            "term": "Fossa Hypophysialis",
            "english": "Hypophysial Fossa",
            "turkishDefinition": "Hipofiz çukuru; sella turcica'nın tabanında hipofiz bezinin yerleştiği çukur.",
            "turkishShort": "Hipofiz çukuru",
            "roots": "fossa (çukur) + hypophysis (hipofiz)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The depression at the floor of the sella turcica that houses the pituitary gland.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 525,
            "term": "Dorsum Sellae",
            "english": "Dorsum Sellae",
            "turkishDefinition": "Eğer arkası düzlük; sella turcica'nın arka sınırını oluşturan dikey kemik plaka.",
            "turkishShort": "Eğer arkası düzlük",
            "roots": "dorsum (arka, sırt) + sella (eyer)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A vertical bony plate forming the posterior boundary of the sella turcica.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 526,
            "term": "Processus Clinoideus Posterior",
            "english": "Posterior Clinoid Process",
            "turkishDefinition": "Arka klinoid çıkıntı; dorsum sellae'nin üst köşelerinde yer alan çift kemik çıkıntı.",
            "turkishShort": "Arka klinoid çıkıntı",
            "roots": "processus (çıkıntı) + clinoideus (yatak şeklinde) + posterior (arka)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A paired bony projection at the upper corners of the dorsum sellae.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 527,
            "term": "Sulcus Caroticus",
            "english": "Carotid Sulcus",
            "turkishDefinition": "Karotis arter oluğu; sfenoid gövdesinin yan yüzünde iç karotis arterin seyrettiği S şeklinde oluk.",
            "turkishShort": "Karotis arter oluğu",
            "roots": "sulcus (oluk) + caroticus (şah damarına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "An S-shaped groove on the lateral surface of the sphenoid body that accommodates the internal carotid artery.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 528,
            "term": "Lingula Sphenoidalis",
            "english": "Sphenoidal Lingula",
            "turkishDefinition": "Kama kemik dilciği; sulcus caroticus'un yanında yer alan küçük, dil şeklinde kemik çıkıntı.",
            "turkishShort": "Kama kemik dilciği",
            "roots": "lingula (küçük dil) + sphenoidalis (kama kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small, tongue-shaped bony projection adjacent to the carotid sulcus.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 529,
            "term": "Crista Sphenoidalis",
            "english": "Sphenoidal Crest",
            "turkishDefinition": "Kama kemik ibiği; sfenoid gövdesinin ön yüzünde orta hatta uzanan dikey ibik, etmoid kemiğin perpendiküler tabakasıyla eklemleşir.",
            "turkishShort": "Kama kemik ibiği",
            "roots": "crista (ibik) + sphenoidalis (kama kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A vertical midline ridge on the anterior surface of the sphenoid body that articulates with the perpendicular plate of the ethmoid bone.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 530,
            "term": "Rostrum Sphenoidale",
            "english": "Sphenoidal Rostrum",
            "turkishDefinition": "Kama kemik gagası; sfenoid gövdesinin alt-ön kısmında, vomer kemiğinin kanatları arasına yerleşen sivri çıkıntı.",
            "turkishShort": "Kama kemik gagası",
            "roots": "rostrum (gaga) + sphenoidalis (kama kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A pointed projection on the anteroinferior part of the sphenoid body that fits between the alae of the vomer.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 531,
            "term": "Sinus Sphenoidalis",
            "english": "Sphenoidal Sinus",
            "turkishDefinition": "Kama kemik sinüsü; sfenoid gövdesinin içinde bulunan, hava dolu paranazal sinüs.",
            "turkishShort": "Kama kemik sinüsü",
            "roots": "sinus (boşluk) + sphenoidalis (kama kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "An air-filled paranasal sinus located within the body of the sphenoid bone.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 532,
            "term": "Septum Sinuum Sphenoidalium",
            "english": "Septum of Sphenoidal Sinuses",
            "turkishDefinition": "Kama kemik sinüs bölmesi; sağ ve sol sfenoid sinüslerini birbirinden ayıran ince kemik bölme.",
            "turkishShort": "Kama kemik sinüs bölmesi",
            "roots": "septum (bölme) + sinus (boşluk) + sphenoidalis (kama kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The thin bony partition separating the right and left sphenoidal sinuses.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 533,
            "term": "Apertura Sinus Sphenoidalis",
            "english": "Opening of Sphenoidal Sinus",
            "turkishDefinition": "Kama kemik sinüs açıklığı; sfenoid sinüsünün sfenoetmoidal çıkmaza açıldığı delik.",
            "turkishShort": "Kama kemik sinüs açıklığı",
            "roots": "apertura (açıklık) + sinus (boşluk) + sphenoidalis (kama kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The opening through which the sphenoidal sinus drains into the sphenoethmoidal recess.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 534,
            "term": "Concha Sphenoidalis",
            "english": "Sphenoidal Concha",
            "turkishDefinition": "Kama kemik boynuzu; sfenoid gövdesinin ön-alt kısmında, sfenoid sinüsün ön duvarını oluşturan ince kemik kabuk.",
            "turkishShort": "Kama kemik boynuzu",
            "roots": "concha (kabuk, boynuz) + sphenoidalis (kama kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A thin bony shell forming the anterior wall of the sphenoidal sinus, located anteroinferiorly on the sphenoid body.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 535,
            "term": "Ala Minor Ossis Sphenoidalis",
            "english": "Lesser Wing of Sphenoid Bone",
            "turkishDefinition": "Küçük kanat; sfenoid gövdesinden yanlara uzanan, ön kraniyal çukurun bir kısmını oluşturan ince kemik kanat.",
            "turkishShort": "Küçük kanat",
            "roots": "ala (kanat) + minor (küçük) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A thin bony wing extending laterally from the sphenoid body, forming part of the anterior cranial fossa.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 536,
            "term": "Canalis Opticus",
            "english": "Optic Canal",
            "turkishDefinition": "Görme siniri kanalı; küçük kanadın tabanında yer alan, optik sinir ve oftalmik arterin geçtiği kanal.",
            "turkishShort": "Görme siniri kanalı",
            "roots": "canalis (kanal) + opticus (görmeye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A canal at the base of the lesser wing through which the optic nerve and ophthalmic artery pass.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 537,
            "term": "Processus Clinoideus Anterior",
            "english": "Anterior Clinoid Process",
            "turkishDefinition": "Ön klinoid çıkıntı; küçük kanadın kök kısmında yer alan, dura mater'in tutunduğu kemik çıkıntı.",
            "turkishShort": "Ön klinoid çıkıntı",
            "roots": "processus (çıkıntı) + clinoideus (yatak şeklinde) + anterior (ön)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A bony projection at the root of the lesser wing, providing attachment for the dura mater.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 538,
            "term": "Fissura Orbitalis Superior",
            "english": "Superior Orbital Fissure",
            "turkishDefinition": "Göz çukuru üst yarığı; büyük ve küçük kanatlar arasında yer alan, göz kaslarını hareket ettiren sinirlerin geçtiği yarık.",
            "turkishShort": "Göz çukuru üst yarığı",
            "roots": "fissura (yarık) + orbitalis (göz çukuruna ait) + superior (üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A gap between the greater and lesser wings through which the nerves controlling eye movement pass.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 539,
            "term": "Ala Major Ossis Sphenoidalis",
            "english": "Greater Wing of Sphenoid Bone",
            "turkishDefinition": "Büyük kanat; sfenoid gövdesinden yanlara ve yukarı uzanan, kafatası tabanının önemli bir kısmını oluşturan geniş kemik kanat.",
            "turkishShort": "Büyük kanat",
            "roots": "ala (kanat) + major (büyük) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A broad bony wing extending laterally and superiorly from the sphenoid body, forming a major part of the cranial base.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 540,
            "term": "Facies Cerebralis Ossis Sphenoidalis",
            "english": "Cerebral Surface of Sphenoid Bone",
            "turkishDefinition": "Kama kemiği beyin yüzü; büyük kanadın kafatası boşluğuna bakan iç yüzeyi.",
            "turkishShort": "Kama kemiği beyin yüzü",
            "roots": "facies (yüz) + cerebralis (beyne ait) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The internal surface of the greater wing facing the cranial cavity.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 541,
            "term": "Facies Temporalis Ossis Sphenoidalis",
            "english": "Temporal Surface of Sphenoid Bone",
            "turkishDefinition": "Kama kemiği şakak yüzü; büyük kanadın şakak çukuruna bakan dış yüzeyi.",
            "turkishShort": "Kama kemiği şakak yüzü",
            "roots": "facies (yüz) + temporalis (şakağa ait) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The external surface of the greater wing that faces the temporal fossa.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 542,
            "term": "Facies Infratemporalis Ossis Sphenoidalis",
            "english": "Infratemporal Surface of Sphenoid Bone",
            "turkishDefinition": "Kama kemiği şakak altı yüzü; büyük kanadın şakak altı çukuruna bakan alt yüzeyi.",
            "turkishShort": "Kama kemiği şakak altı yüzü",
            "roots": "facies (yüz) + infratemporalis (şakak altına ait) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The inferior surface of the greater wing that faces the infratemporal fossa.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 543,
            "term": "Crista Infratemporalis Ossis Sphenoidalis",
            "english": "Infratemporal Crest of Sphenoid Bone",
            "turkishDefinition": "Kama kemiği şakak altı ibiği; büyük kanadın şakak yüzü ile şakak altı yüzünü birbirinden ayıran ibik.",
            "turkishShort": "Kama kemiği şakak altı ibiği",
            "roots": "crista (ibik) + infratemporalis (şakak altına ait) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A ridge on the greater wing separating the temporal surface from the infratemporal surface.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 544,
            "term": "Facies Maxillaris Ossis Sphenoidalis",
            "english": "Maxillary Surface of Sphenoid Bone",
            "turkishDefinition": "Kama kemiği üst çene yüzü; büyük kanadın üst çene kemiğine bakan küçük ön-alt yüzeyi.",
            "turkishShort": "Kama kemiği üst çene yüzü",
            "roots": "facies (yüz) + maxillaris (üst çeneye ait) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small anteroinferior surface of the greater wing that faces the maxilla.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 545,
            "term": "Facies Orbitalis Ossis Sphenoidalis",
            "english": "Orbital Surface of Sphenoid Bone",
            "turkishDefinition": "Kama kemiği göz çukuru yüzü; büyük kanadın göz çukurunun yan duvarını oluşturan düz yüzeyi.",
            "turkishShort": "Kama kemiği göz çukuru yüzü",
            "roots": "facies (yüz) + orbitalis (göz çukuruna ait) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The smooth surface of the greater wing that forms the lateral wall of the orbit.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 546,
            "term": "Margo Zygomaticus Ossis Sphenoidalis",
            "english": "Zygomatic Margin of Sphenoid Bone",
            "turkishDefinition": "Kama kemiği elmacık kenarı; büyük kanadın elmacık kemiğiyle birleştiği kenar.",
            "turkishShort": "Kama kemiği elmacık kenarı",
            "roots": "margo (kenar) + zygomaticus (elmacığa ait) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The border of the greater wing that articulates with the zygomatic bone.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 547,
            "term": "Margo Frontalis Ossis Sphenoidalis",
            "english": "Frontal Margin of Sphenoid Bone",
            "turkishDefinition": "Kama kemiği alın kenarı; büyük kanadın alın kemiğiyle birleştiği kenar.",
            "turkishShort": "Kama kemiği alın kenarı",
            "roots": "margo (kenar) + frontalis (alına ait) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The border of the greater wing that articulates with the frontal bone.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 548,
            "term": "Margo Parietalis Ossis Sphenoidalis",
            "english": "Parietal Margin of Sphenoid Bone",
            "turkishDefinition": "Kama kemiği duvar kemik kenarı; büyük kanadın duvar kemiğiyle birleştiği kenar.",
            "turkishShort": "Kama kemiği duvar kemik kenarı",
            "roots": "margo (kenar) + parietalis (duvar kemiğine ait) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The border of the greater wing that articulates with the parietal bone.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 549,
            "term": "Margo Squamosus Ossis Sphenoidalis",
            "english": "Squamosal Margin of Sphenoid Bone",
            "turkishDefinition": "Kama kemiği pullu kenarı; büyük kanadın şakak kemiğinin pulsu parçasıyla birleştiği kenar.",
            "turkishShort": "Kama kemiği pullu kenarı",
            "roots": "margo (kenar) + squamosus (pullu) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The border of the greater wing that articulates with the squamous part of the temporal bone.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 550,
            "term": "Foramen Rotundum",
            "english": "Foramen Rotundum",
            "turkishDefinition": "Yuvarlak delik; büyük kanatta yer alan, trigeminal sinirin maksiller dalının geçtiği yuvarlak delik.",
            "turkishShort": "Yuvarlak delik",
            "roots": "foramen (delik) + rotundus (yuvarlak)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A round opening in the greater wing through which the maxillary branch of the trigeminal nerve passes.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 551,
            "term": "Foramen Ovale",
            "english": "Foramen Ovale",
            "turkishDefinition": "Oval delik; büyük kanatta yer alan, trigeminal sinirin mandibular dalının geçtiği oval delik.",
            "turkishShort": "Oval delik",
            "roots": "foramen (delik) + ovalis (oval)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "An oval opening in the greater wing through which the mandibular branch of the trigeminal nerve passes.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 552,
            "term": "Foramen Venosum",
            "english": "Sphenoidal Emissary Foramen",
            "turkishDefinition": "Venöz delik; büyük kanatta bazı bireylerde bulunan, emisser ven geçişine izin veren küçük delik.",
            "turkishShort": "Venöz delik",
            "roots": "foramen (delik) + venosus (toplardamara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small opening in the greater wing, present in some individuals, transmitting an emissary vein.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 553,
            "term": "Foramen Spinosum",
            "english": "Foramen Spinosum",
            "turkishDefinition": "Dikenli delik; büyük kanatta yer alan, orta meninks arterinin geçtiği delik.",
            "turkishShort": "Dikenli delik",
            "roots": "foramen (delik) + spinosus (dikenli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "An opening in the greater wing through which the middle meningeal artery passes.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 554,
            "term": "Foramen Petrosum",
            "english": "Foramen Petrosum",
            "turkishDefinition": "Petroz delik; bazı bireylerde foramen ovale yakınında bulunan, küçük petroz sinirin geçtiği ek delik.",
            "turkishShort": "Petroz delik",
            "roots": "foramen (delik) + petrosus (taşsı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "An accessory opening near the foramen ovale, present in some individuals, transmitting the lesser petrosal nerve.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 555,
            "term": "Spina Ossis Sphenoidalis",
            "english": "Spine of Sphenoid Bone",
            "turkishDefinition": "Kama kemik dikeni; büyük kanadın arka-alt köşesinde yer alan, sfenomandibular bağın tutunduğu sivri çıkıntı.",
            "turkishShort": "Kama kemik dikeni",
            "roots": "spina (diken) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A pointed projection at the posteroinferior angle of the greater wing, providing attachment for the sphenomandibular ligament.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 556,
            "term": "Sulcus Tubae Auditivae",
            "english": "Sulcus of Auditory Tube",
            "turkishDefinition": "İşitme borusu oluğu (eş anlamlısı: Sulcus Tubae Auditoriae); sfenoid kemiği ile şakak kemiği arasında Östaki borusunun kıkırdak kısmının yerleştiği oluk.",
            "turkishShort": "İşitme borusu oluğu",
            "roots": "sulcus (oluk) + tuba (boru) + auditivus (işitmeye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove between the sphenoid and temporal bones that accommodates the cartilaginous part of the auditory (Eustachian) tube.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 557,
            "term": "Processus Pterygoideus",
            "english": "Pterygoid Process",
            "turkishDefinition": "Kanatsı çıkıntı; sfenoid kemiğinin gövde ve büyük kanat birleşim yerinden aşağı uzanan çift çıkıntı.",
            "turkishShort": "Kanatsı çıkıntı",
            "roots": "processus (çıkıntı) + pterygoideus (kanat şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A paired projection extending downward from the junction of the body and greater wing of the sphenoid bone.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 558,
            "term": "Lamina Lateralis Processus Pterygoidei",
            "english": "Lateral Plate of Pterygoid Process",
            "turkishDefinition": "Kanatsı çıkıntının dış yaprağı; pterigoid çıkıntının daha ince ve dışa yerleşen yaprağı, çiğneme kaslarının tutunduğu yer.",
            "turkishShort": "Kanatsı çıkıntının dış yaprağı",
            "roots": "lamina (yaprak, tabaka) + lateralis (dış) + processus pterygoideus (kanatsı çıkıntı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The thinner, laterally positioned plate of the pterygoid process, providing attachment for the muscles of mastication.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 559,
            "term": "Lamina Medialis Processus Pterygoidei",
            "english": "Medial Plate of Pterygoid Process",
            "turkishDefinition": "Kanatsı çıkıntının iç yaprağı; pterigoid çıkıntının daha ince ve içe yerleşen, alt ucunda hamulus bulunan yaprağı.",
            "turkishShort": "Kanatsı çıkıntının iç yaprağı",
            "roots": "lamina (yaprak, tabaka) + medialis (iç) + processus pterygoideus (kanatsı çıkıntı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The thinner, medially positioned plate of the pterygoid process, ending inferiorly in the pterygoid hamulus.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 560,
            "term": "Incisura Pterygoidea",
            "english": "Pterygoid Notch",
            "turkishDefinition": "Kanatsı çentik; pterigoid çıkıntının iki yaprağı arasındaki alt çentik.",
            "turkishShort": "Kanatsı çentik",
            "roots": "incisura (çentik) + pterygoideus (kanat şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The notch between the two plates of the pterygoid process at their inferior aspect.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 561,
            "term": "Fossa Pterygoidea",
            "english": "Pterygoid Fossa",
            "turkishDefinition": "Kanatsı çukur; pterigoid çıkıntının iki yaprağı arasında kalan, iç kanatsı kasın başladığı çukur.",
            "turkishShort": "Kanatsı çukur",
            "roots": "fossa (çukur) + pterygoideus (kanat şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A depression between the two plates of the pterygoid process, giving origin to the medial pterygoid muscle.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 562,
            "term": "Fossa Scaphoidea Ossis Sphenoidalis",
            "english": "Scaphoid Fossa of Sphenoid Bone",
            "turkishDefinition": "Kama kemiği kayığımsı çukuru; pterigoid çıkıntının kökünde yer alan, kulak zarı gerici kasının başladığı küçük çukur.",
            "turkishShort": "Kama kemiği kayığımsı çukuru",
            "roots": "fossa (çukur) + scaphoideus (kayık şeklinde) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small depression at the root of the pterygoid process that gives origin to the tensor tympani muscle.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 563,
            "term": "Processus Vaginalis Ossis Sphenoidalis",
            "english": "Vaginal Process of Sphenoid Bone",
            "turkishDefinition": "Kama kemiği kılıf benzeri çıkıntısı; pterigoid çıkıntının kökünden vomer kemiğine doğru uzanan ince çıkıntı.",
            "turkishShort": "Kama kemiği kılıf benzeri çıkıntısı",
            "roots": "processus (çıkıntı) + vaginalis (kılıf şeklinde) + os sphenoidale (kama kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A thin projection from the root of the pterygoid process extending toward the vomer.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 564,
            "term": "Sulcus Palatovaginalis",
            "english": "Palatovaginal Groove",
            "turkishDefinition": "Damak-kılıf oluğu; kılıf benzeri çıkıntının alt yüzünde yer alan, damak sinirinin geçtiği oluk.",
            "turkishShort": "Damak-kılıf oluğu",
            "roots": "sulcus (oluk) + palatinus (damağa ait) + vaginalis (kılıf şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove on the inferior surface of the vaginal process that transmits a palatine nerve branch.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 565,
            "term": "Sulcus Vomerovaginalis",
            "english": "Vomerovaginal Groove",
            "turkishDefinition": "Sapan kemik-kılıf oluğu; kılıf benzeri çıkıntının alt yüzünde vomer kemiğinin kanadının yerleştiği oluk.",
            "turkishShort": "Sapan kemik-kılıf oluğu",
            "roots": "sulcus (oluk) + vomer (sapan kemiği) + vaginalis (kılıf şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove on the inferior surface of the vaginal process that accommodates the ala of the vomer.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 566,
            "term": "Hamulus Pterygoideus",
            "english": "Pterygoid Hamulus",
            "turkishDefinition": "Kanatsı çengel; iç pterigoid yaprağın alt ucunda yer alan, kulak zarı gerici kası tendonunun döndüğü kanca şeklindeki çıkıntı.",
            "turkishShort": "Kanatsı çengel",
            "roots": "hamulus (küçük çengel) + pterygoideus (kanat şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A hook-shaped projection at the inferior end of the medial pterygoid plate around which the tendon of the tensor tympani muscle turns.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 567,
            "term": "Sulcus Hamuli Pterygoidei",
            "english": "Groove of Pterygoid Hamulus",
            "turkishDefinition": "Kanatsı çengel oluğu; kanatsı çengelin yanında yer alan, kulak zarı gerici kası tendonunun geçtiği küçük oluk.",
            "turkishShort": "Kanatsı çengel oluğu",
            "roots": "sulcus (oluk) + hamulus (küçük çengel) + pterygoideus (kanat şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small groove beside the pterygoid hamulus through which the tendon of the tensor tympani muscle passes.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 568,
            "term": "Canalis Pterygoideus",
            "english": "Pterygoid Canal",
            "turkishDefinition": "Pterigoid kanal; pterigoid çıkıntının kökünden geçen, Vidian sinir ve damarlarını taşıyan kanal.",
            "turkishShort": "Pterigoid kanal",
            "roots": "canalis (kanal) + pterygoideus (kanat şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A canal through the root of the pterygoid process that transmits the nerve and vessels of the pterygoid canal (Vidian nerve).",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 569,
            "term": "Processus Pterygospinosus",
            "english": "Pterygospinous Process",
            "turkishDefinition": "Pterigospinal çıkıntı; bazı bireylerde pterigoid çıkıntı ile sfenoid dikeni arasında bulunan ek kemik köprüsü.",
            "turkishShort": "Pterigospinal çıkıntı",
            "roots": "processus (çıkıntı) + pterygoideus (kanat şeklinde) + spinosus (dikenli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "An accessory bony bridge, present in some individuals, connecting the pterygoid process to the spine of the sphenoid bone.",
            "createdAt": {
                "_seconds": 1789117932,
                "_nanoseconds": 470000000
            },
            "group": "Os Sphenoidale"
        },
        {
            "id": 570,
            "term": "Pars Petrosa Ossis Temporalis",
            "english": "Petrous Part of Temporal Bone",
            "turkishDefinition": "Taşsı parça; şakak kemiğinin en sert kısmı, iç kulak yapılarını barındıran piramit şeklindeki bölüm.",
            "turkishShort": "Taşsı parça",
            "roots": "pars (bölüm) + petrosus (taşsı) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The densest, pyramid-shaped part of the temporal bone that houses the structures of the inner ear.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 571,
            "term": "Margo Occipitalis Ossis Temporalis",
            "english": "Occipital Border of Temporal Bone",
            "turkishDefinition": "Şakak kemiği ardkafa kenarı; şakak kemiğinin ardkafa kemiğiyle birleştiği kenar.",
            "turkishShort": "Şakak kemiği ardkafa kenarı",
            "roots": "margo (kenar) + occipitalis (ardkafaya ait) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The border of the temporal bone that articulates with the occipital bone.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 572,
            "term": "Processus Mastoideus",
            "english": "Mastoid Process",
            "turkishDefinition": "Meme çıkıntısı; şakak kemiğinin kulak arkasında yer alan, sternokleidomastoid kasının tutunduğu koni şeklindeki çıkıntı.",
            "turkishShort": "Meme çıkıntısı",
            "roots": "processus (çıkıntı) + mastoideus (meme şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A cone-shaped projection of the temporal bone behind the ear, providing attachment for the sternocleidomastoid muscle.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 573,
            "term": "Incisura Mastoidea",
            "english": "Mastoid Notch",
            "turkishDefinition": "Mastoid çentik; mastoid çıkıntının iç tarafında yer alan, digastrik kasın arka karnının başladığı çentik.",
            "turkishShort": "Mastoid çentik",
            "roots": "incisura (çentik) + mastoideus (meme şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove medial to the mastoid process, giving origin to the posterior belly of the digastric muscle.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 574,
            "term": "Sulcus Sinus Sigmoidei Ossis Temporalis",
            "english": "Groove for Sigmoid Sinus of Temporal Bone",
            "turkishDefinition": "Şakak kemiği sigmoid sinüs oluğu; mastoid çıkıntının iç yüzünde sigmoid venöz sinüsün devam ettiği oluk.",
            "turkishShort": "Şakak kemiği sigmoid sinüs oluğu",
            "roots": "sulcus (oluk) + sinus (sinüs) + sigmoideus (S şeklinde) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove on the internal surface of the mastoid process that continues the course of the sigmoid venous sinus.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 575,
            "term": "Sulcus Arteriae Occipitalis",
            "english": "Occipital Groove",
            "turkishDefinition": "Oksipital arter oluğu; mastoid çentiğin yanında yer alan, oksipital arterin seyrettiği oluk.",
            "turkishShort": "Oksipital arter oluğu",
            "roots": "sulcus (oluk) + arteria (atardamar) + occipitalis (ardkafaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove beside the mastoid notch that accommodates the occipital artery.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 576,
            "term": "Foramen Mastoideum",
            "english": "Mastoid Foramen",
            "turkishDefinition": "Mastoid delik; mastoid çıkıntının yakınında yer alan, emisser ven geçişine izin veren küçük delik.",
            "turkishShort": "Mastoid delik",
            "roots": "foramen (delik) + mastoideus (meme şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small opening near the mastoid process transmitting an emissary vein.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 577,
            "term": "Canalis Nervi Facialis",
            "english": "Facial Canal",
            "turkishDefinition": "Yüz siniri kanalı; şakak kemiğinin petroz parçası içinde yüz sinirinin (7. kafa çifti) seyrettiği kıvrımlı kanal.",
            "turkishShort": "Yüz siniri kanalı",
            "roots": "canalis (kanal) + nervus (sinir) + facialis (yüze ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A winding canal within the petrous part of the temporal bone through which the facial nerve (cranial nerve VII) travels.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 578,
            "term": "Geniculum Canalis Nervi Facialis",
            "english": "Geniculum of Facial Canal",
            "turkishDefinition": "Yüz siniri kanalı dizi; yüz siniri kanalının keskin açıyla döndüğü, genikulat gangliyonun yerleştiği kısım.",
            "turkishShort": "Yüz siniri kanalı dizi",
            "roots": "geniculum (küçük diz, dönemeç) + canalis (kanal) + nervus (sinir) + facialis (yüze ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The sharp bend in the facial canal where the geniculate ganglion is located.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 579,
            "term": "Canaliculus Chordae Tympani",
            "english": "Canaliculus for Chorda Tympani",
            "turkishDefinition": "Korda timpani sinir kanalcığı; yüz siniri kanalından ayrılan korda timpani dalının orta kulağa geçtiği ince kanalcık.",
            "turkishShort": "Korda timpani sinir kanalcığı",
            "roots": "canaliculus (küçük kanal) + chorda (tel, ip) + tympanum (kulak zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small canal through which the chorda tympani branch of the facial nerve enters the middle ear.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 580,
            "term": "Apex Partis Petrosae",
            "english": "Apex of Petrous Part",
            "turkishDefinition": "Petroz parçanın tepesi; petroz parçanın en iç ucu, karotis kanalının iç açıklığına komşudur.",
            "turkishShort": "Petroz parçanın tepesi",
            "roots": "apex (tepe, uç) + pars petrosa (taşsı parça)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The medial tip of the petrous part, adjacent to the internal opening of the carotid canal.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 581,
            "term": "Canalis Caroticus",
            "english": "Carotid Canal",
            "turkishDefinition": "Şah damarı kanalı; petroz parçadan geçen, iç karotis arterin kafatasına girdiği kanal.",
            "turkishShort": "Şah damarı kanalı",
            "roots": "canalis (kanal) + caroticus (şah damarına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A canal through the petrous part through which the internal carotid artery enters the skull.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 582,
            "term": "Apertura Externa Canalis Carotici",
            "english": "External Opening of Carotid Canal",
            "turkishDefinition": "Şah damarı kanalı dış deliği; karotis kanalının kafatası tabanındaki dış açıklığı.",
            "turkishShort": "Şah damarı kanalı dış deliği",
            "roots": "apertura (açıklık) + externa (dış) + canalis caroticus (şah damarı kanalı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The external opening of the carotid canal on the base of the skull.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 583,
            "term": "Apertura Interna Canalis Carotici",
            "english": "Internal Opening of Carotid Canal",
            "turkishDefinition": "Şah damarı kanalı iç deliği; karotis kanalının petroz parça tepesindeki iç açıklığı.",
            "turkishShort": "Şah damarı kanalı iç deliği",
            "roots": "apertura (açıklık) + interna (iç) + canalis caroticus (şah damarı kanalı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The internal opening of the carotid canal at the apex of the petrous part.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 584,
            "term": "Canaliculi Caroticotympanici",
            "english": "Caroticotympanic Canaliculi",
            "turkishDefinition": "Karotikotimpanik kanalcıklar; karotis kanalından orta kulağa açılan, sinir dallarını taşıyan küçük kanalcıklar.",
            "turkishShort": "Karotikotimpanik kanalcıklar",
            "roots": "canaliculus (küçük kanal) + caroticus (şah damarına ait) + tympanum (kulak zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "Small canals connecting the carotid canal to the middle ear, transmitting nerve branches.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 585,
            "term": "Canalis Musculotubarius",
            "english": "Musculotubal Canal",
            "turkishDefinition": "Kas-boru kanalı; petroz parçanın tepesinde yer alan, Östaki borusu ve kulak zarı gerici kasını barındıran kanal.",
            "turkishShort": "Kas-boru kanalı",
            "roots": "canalis (kanal) + musculus (kas) + tuba (boru)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A canal at the apex of the petrous part that houses the auditory tube and the tensor tympani muscle.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 586,
            "term": "Semicanalis Musculi Tensoris Tympani",
            "english": "Canal for Tensor Tympani",
            "turkishDefinition": "Kulak zarı gerici kas yarım kanalı; kas-boru kanalının üst, daha küçük bölümü, kulak zarı gerici kasını barındırır.",
            "turkishShort": "Kulak zarı gerici kas yarım kanalı",
            "roots": "semicanalis (yarım kanal) + musculus (kas) + tensor (gerici) + tympanum (kulak zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The upper, smaller compartment of the musculotubal canal, housing the tensor tympani muscle.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 587,
            "term": "Semicanalis Tubae Auditivae",
            "english": "Canal for Auditory Tube",
            "turkishDefinition": "Östaki borusu yarım kanalı; kas-boru kanalının alt, daha büyük bölümü, Östaki borusunun kemik kısmını barındırır.",
            "turkishShort": "Östaki borusu yarım kanalı",
            "roots": "semicanalis (yarım kanal) + tuba (boru) + auditivus (işitmeye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The lower, larger compartment of the musculotubal canal, housing the bony part of the auditory tube.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 588,
            "term": "Septum Canalis Musculotubarii",
            "english": "Septum of Musculotubal Canal",
            "turkishDefinition": "Kas-boru kanalı bölmesi; kas-boru kanalının iki yarım kanalını birbirinden ayıran ince kemik bölme.",
            "turkishShort": "Kas-boru kanalı bölmesi",
            "roots": "septum (bölme) + canalis (kanal) + musculus (kas) + tuba (boru)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The thin bony partition separating the two compartments of the musculotubal canal.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 589,
            "term": "Facies Anterior Partis Petrosae",
            "english": "Anterior Surface of Petrous Part",
            "turkishDefinition": "Petroz parçanın ön yüzü; petroz parçanın orta kraniyal çukura bakan yüzü, kas-boru kanalı ve tegmen timpani'yi içerir.",
            "turkishShort": "Petroz parçanın ön yüzü",
            "roots": "facies (yüz) + anterior (ön) + pars petrosa (taşsı parça)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The surface of the petrous part facing the middle cranial fossa, containing the musculotubal canal and tegmen tympani.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 590,
            "term": "Tegmen Tympani",
            "english": "Tegmen Tympani",
            "turkishDefinition": "Kulak zarı çatısı; petroz parçanın ön yüzünde, orta kulak boşluğunu üstten örten ince kemik plaka.",
            "turkishShort": "Kulak zarı çatısı",
            "roots": "tegmen (çatı, örtü) + tympanum (kulak zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A thin bony plate on the anterior surface of the petrous part that roofs the tympanic cavity.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 591,
            "term": "Eminentia Arcuata",
            "english": "Arcuate Eminence",
            "turkishDefinition": "Kavisli kabartı; petroz parçanın ön yüzünde, üst yarım daire kanalının konumunu işaretleyen kabartı.",
            "turkishShort": "Kavisli kabartı",
            "roots": "eminentia (kabartı) + arcuatus (kavisli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A bony bulge on the anterior surface of the petrous part, marking the position of the superior semicircular canal.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 592,
            "term": "Hiatus Canalis Nervi Petrosi Majoris",
            "english": "Hiatus for Greater Petrosal Nerve",
            "turkishDefinition": "Büyük petroz sinir geçidi; petroz parçanın ön yüzünde büyük petroz sinirin çıktığı küçük açıklık.",
            "turkishShort": "Büyük petroz sinir geçidi",
            "roots": "hiatus (geçit, açıklık) + canalis (kanal) + nervus (sinir) + petrosus (taşsı) + major (büyük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small opening on the anterior surface of the petrous part through which the greater petrosal nerve emerges.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 593,
            "term": "Sulcus Nervi Petrosi Majoris",
            "english": "Groove for Greater Petrosal Nerve",
            "turkishDefinition": "Büyük petroz sinir oluğu; büyük petroz sinir geçidinden devam eden, sinirin seyrettiği oluk.",
            "turkishShort": "Büyük petroz sinir oluğu",
            "roots": "sulcus (oluk) + nervus (sinir) + petrosus (taşsı) + major (büyük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove continuing from the hiatus for the greater petrosal nerve, along which the nerve travels.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 594,
            "term": "Hiatus Canalis Nervi Petrosi",
            "english": "Hiatus for Lesser Petrosal Nerve",
            "turkishDefinition": "Küçük petroz sinir geçidi; büyük petroz sinir geçidinin yanında yer alan, küçük petroz sinirin çıktığı açıklık.",
            "turkishShort": "Küçük petroz sinir geçidi",
            "roots": "hiatus (geçit, açıklık) + canalis (kanal) + nervus (sinir) + petrosus (taşsı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "An opening beside the hiatus for the greater petrosal nerve through which the lesser petrosal nerve emerges.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 595,
            "term": "Sulcus Nervi Petrosi Minoris",
            "english": "Groove for Lesser Petrosal Nerve",
            "turkishDefinition": "Küçük petroz sinir oluğu; küçük petroz sinirin seyrettiği, hiatus'tan devam eden oluk.",
            "turkishShort": "Küçük petroz sinir oluğu",
            "roots": "sulcus (oluk) + nervus (sinir) + petrosus (taşsı) + minor (küçük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove continuing from the hiatus for the lesser petrosal nerve, along which the nerve travels.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 596,
            "term": "Impressio Trigeminalis",
            "english": "Trigeminal Impression",
            "turkishDefinition": "Trigeminal sinir izi; petroz parçanın tepesi yakınında, trigeminal gangliyonun bıraktığı hafif çukurluk.",
            "turkishShort": "Trigeminal sinir izi",
            "roots": "impressio (iz, baskı) + trigeminus (üçüz sinir)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A shallow depression near the apex of the petrous part left by the trigeminal ganglion.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 597,
            "term": "Margo Superior Partis Petrosae",
            "english": "Superior Border of Petrous Part",
            "turkishDefinition": "Petroz parçanın üst kenarı; petroz parçanın orta ve arka kraniyal çukurları ayıran üst kenarı.",
            "turkishShort": "Petroz parçanın üst kenarı",
            "roots": "margo (kenar) + superior (üst) + pars petrosa (taşsı parça)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The upper border of the petrous part, separating the middle and posterior cranial fossae.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 598,
            "term": "Sulcus Sinus Petrosi Superioris",
            "english": "Groove for Superior Petrosal Sinus",
            "turkishDefinition": "Üst petroz sinüs oluğu; petroz parçanın üst kenarı boyunca uzanan, üst petroz venöz sinüsün yerleştiği oluk.",
            "turkishShort": "Üst petroz sinüs oluğu",
            "roots": "sulcus (oluk) + sinus (sinüs) + petrosus (taşsı) + superior (üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove along the superior border of the petrous part that houses the superior petrosal sinus.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 599,
            "term": "Facies Posterior Partis Petrosae",
            "english": "Posterior Surface of Petrous Part",
            "turkishDefinition": "Petroz parçanın arka yüzü; petroz parçanın arka kraniyal çukura bakan yüzü, iç işitme deliğini içerir.",
            "turkishShort": "Petroz parçanın arka yüzü",
            "roots": "facies (yüz) + posterior (arka) + pars petrosa (taşsı parça)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The surface of the petrous part facing the posterior cranial fossa, containing the internal acoustic opening.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 600,
            "term": "Porus Acusticus Internus",
            "english": "Internal Acoustic Opening",
            "turkishDefinition": "İç işitme deliği; petroz parçanın arka yüzünde, işitme ve yüz sinirlerinin girdiği delik.",
            "turkishShort": "İç işitme deliği",
            "roots": "porus (delik) + acusticus (işitmeye ait) + internus (iç)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "An opening on the posterior surface of the petrous part through which the vestibulocochlear and facial nerves enter.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 601,
            "term": "Meatus Acusticus Internus",
            "english": "Internal Acoustic Meatus",
            "turkishDefinition": "İç işitme yolu; porus acusticus internus'tan başlayan, işitme ve yüz sinirlerini taşıyan kısa kanal.",
            "turkishShort": "İç işitme yolu",
            "roots": "meatus (yol, geçit) + acusticus (işitmeye ait) + internus (iç)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A short canal beginning at the internal acoustic opening that transmits the vestibulocochlear and facial nerves.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 602,
            "term": "Fossa Subarcuata",
            "english": "Subarcuate Fossa",
            "turkishDefinition": "Kavis altı çukuru; petroz parçanın arka yüzünde, iç işitme deliğinin üstünde yer alan küçük çukur.",
            "turkishShort": "Kavis altı çukuru",
            "roots": "fossa (çukur) + sub (altında) + arcuatus (kavisli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small depression on the posterior surface of the petrous part, above the internal acoustic opening.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 603,
            "term": "Canaliculus Vestibuli",
            "english": "Vestibular Canaliculus",
            "turkishDefinition": "Vestibüler kanalcık; petroz parçanın arka yüzünde, endolenfatik kesenin yerleştiği ince kanalcık.",
            "turkishShort": "Vestibüler kanalcık",
            "roots": "canaliculus (küçük kanal) + vestibulum (giriş boşluğu)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small canal on the posterior surface of the petrous part that houses the endolymphatic sac.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 604,
            "term": "Apertura Canaliculi Vestibuli",
            "english": "Opening of Vestibular Canaliculus",
            "turkishDefinition": "Vestibüler kanalcık açıklığı; vestibüler kanalcığın petroz parça yüzeyindeki açıklığı.",
            "turkishShort": "Vestibüler kanalcık açıklığı",
            "roots": "apertura (açıklık) + canaliculus (küçük kanal) + vestibulum (giriş boşluğu)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The opening of the vestibular canaliculus on the surface of the petrous part.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 605,
            "term": "Margo Posterior Partis Petrosae",
            "english": "Posterior Border of Petrous Part",
            "turkishDefinition": "Petroz parçanın arka kenarı; petroz parçanın arka ve alt yüzlerini ayıran kenar, alt petroz sinüs oluğunu içerir.",
            "turkishShort": "Petroz parçanın arka kenarı",
            "roots": "margo (kenar) + posterior (arka) + pars petrosa (taşsı parça)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The border separating the posterior and inferior surfaces of the petrous part, containing the groove for the inferior petrosal sinus.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 606,
            "term": "Sulcus Sinus Petrosi Inferioris Ossis Temporalis",
            "english": "Groove for Inferior Petrosal Sinus of Temporal Bone",
            "turkishDefinition": "Şakak kemiği alt petroz sinüs oluğu; petroz parçanın arka kenarında yer alan, alt petroz venöz sinüsün yerleştiği oluk.",
            "turkishShort": "Şakak kemiği alt petroz sinüs oluğu",
            "roots": "sulcus (oluk) + sinus (sinüs) + petrosus (taşsı) + inferior (alt) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove along the posterior border of the petrous part that houses the inferior petrosal sinus.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 607,
            "term": "Incisura Jugularis Ossis Temporalis",
            "english": "Jugular Notch of Temporal Bone",
            "turkishDefinition": "Şakak kemiği juguler çentiği; petroz parçanın alt yüzünde yer alan, ardkafa kemiğiyle birlikte foramen jugulare'yi oluşturan çentik.",
            "turkishShort": "Şakak kemiği juguler çentiği",
            "roots": "incisura (çentik) + jugularis (boyun toplardamarına ait) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A notch on the inferior surface of the petrous part that, together with the occipital bone, forms the jugular foramen.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 608,
            "term": "Facies Inferior Partis Petrosae",
            "english": "Inferior Surface of Petrous Part",
            "turkishDefinition": "Petroz parçanın alt yüzü; kafatası tabanının dışına bakan, juguler çukur ve karotis kanalını içeren düzensiz yüzey.",
            "turkishShort": "Petroz parçanın alt yüzü",
            "roots": "facies (yüz) + inferior (alt) + pars petrosa (taşsı parça)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The irregular external surface of the petrous part at the base of the skull, containing the jugular fossa and carotid canal.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 609,
            "term": "Fossa Jugularis",
            "english": "Jugular Fossa",
            "turkishDefinition": "Boyun toplardamarı çukuru; petroz parçanın alt yüzünde iç juguler venin genişleyerek başladığı derin çukur.",
            "turkishShort": "Boyun toplardamarı çukuru",
            "roots": "fossa (çukur) + jugularis (boyun toplardamarına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A deep depression on the inferior surface of the petrous part where the internal jugular vein begins.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 610,
            "term": "Canaliculus Cochleae",
            "english": "Cochlear Canaliculus",
            "turkishDefinition": "Salyangoz kanalcığı; juguler çukurun yanında yer alan, perilenfatik kanalın açıldığı ince kanalcık.",
            "turkishShort": "Salyangoz kanalcığı",
            "roots": "canaliculus (küçük kanal) + cochlea (salyangoz)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small canal beside the jugular fossa through which the perilymphatic duct opens.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 611,
            "term": "Apertura Canaliculi Cochleae",
            "english": "Opening of Cochlear Canaliculus",
            "turkishDefinition": "Salyangoz kanalcığı açıklığı; kohlear kanalcığın petroz parça yüzeyindeki açıklığı.",
            "turkishShort": "Salyangoz kanalcığı açıklığı",
            "roots": "apertura (açıklık) + canaliculus (küçük kanal) + cochlea (salyangoz)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The opening of the cochlear canaliculus on the surface of the petrous part.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 612,
            "term": "Canaliculus Mastoideus",
            "english": "Mastoid Canaliculus",
            "turkishDefinition": "Mastoid kanalcığı; juguler çukurun içinde başlayan, vagus sinirinin bir dalını taşıyan ince kanalcık.",
            "turkishShort": "Mastoid kanalcığı",
            "roots": "canaliculus (küçük kanal) + mastoideus (meme şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small canal beginning within the jugular fossa that transmits a branch of the vagus nerve.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 613,
            "term": "Processus Intrajugularis Ossis Temporalis",
            "english": "Intrajugular Process of Temporal Bone",
            "turkishDefinition": "Şakak kemiği intrajuguler çıkıntısı; juguler çukurun kenarından uzanan, foramen jugulare'yi kısmen bölen çıkıntı.",
            "turkishShort": "Şakak kemiği intrajuguler çıkıntısı",
            "roots": "processus (çıkıntı) + intra (içinde) + jugularis (boyun toplardamarına ait) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A projection from the edge of the jugular fossa that partially divides the jugular foramen, arising from the temporal bone.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 614,
            "term": "Processus Styloideus Ossis Temporalis",
            "english": "Styloid Process of Temporal Bone",
            "turkishDefinition": "Şakak kemiği bızsı çıkıntısı; petroz parçanın alt yüzünden aşağı uzanan, ince ve uzun kemik çıkıntı, dil ve boyun kaslarının tutunduğu yer.",
            "turkishShort": "Şakak kemiği bızsı çıkıntısı",
            "roots": "processus (çıkıntı) + styloideus (kalem şeklinde) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A thin, elongated bony projection extending downward from the inferior surface of the petrous part, providing attachment for muscles of the tongue and neck.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 615,
            "term": "Foramen Stylomastoideum",
            "english": "Stylomastoid Foramen",
            "turkishDefinition": "Stilomastoid delik; bızsı çıkıntı ile mastoid çıkıntı arasında yer alan, yüz sinirinin kafatasından çıktığı delik.",
            "turkishShort": "Stilomastoid delik",
            "roots": "foramen (delik) + styloideus (kalem şeklinde) + mastoideus (meme şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "An opening between the styloid and mastoid processes through which the facial nerve exits the skull.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 616,
            "term": "Canaliculus Tympanicus",
            "english": "Tympanic Canaliculus",
            "turkishDefinition": "Timpanik kanalcık; petroz parçanın alt yüzünde başlayan, glossofaringeal sinirin bir dalını taşıyan ince kanalcık.",
            "turkishShort": "Timpanik kanalcık",
            "roots": "canaliculus (küçük kanal) + tympanum (kulak zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small canal beginning on the inferior surface of the petrous part that transmits a branch of the glossopharyngeal nerve.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 617,
            "term": "Fossula Petrosa",
            "english": "Petrosal Fossula",
            "turkishDefinition": "Petroz çukurcuk; juguler çukurun dış kenarında yer alan, timpanik kanalcığın başladığı küçük çukurcuk.",
            "turkishShort": "Petroz çukurcuk",
            "roots": "fossula (küçük çukur) + petrosus (taşsı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small depression at the outer edge of the jugular fossa where the tympanic canaliculus begins.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 618,
            "term": "Cavitas Tympani",
            "english": "Tympanic Cavity",
            "turkishDefinition": "Kulak zarı boşluğu; orta kulağı oluşturan, kulak zarının iç tarafında yer alan hava dolu boşluk.",
            "turkishShort": "Kulak zarı boşluğu",
            "roots": "cavitas (boşluk) + tympanum (kulak zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The air-filled space of the middle ear, located medial to the eardrum.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 619,
            "term": "Pars Tympanica Ossis Temporalis",
            "english": "Tympanic Part of Temporal Bone",
            "turkishDefinition": "Şakak kemiği timpanik parçası; dış işitme yolunun ön, alt ve arka duvarlarını oluşturan halka şeklindeki kemik parça.",
            "turkishShort": "Şakak kemiği timpanik parçası",
            "roots": "pars (bölüm) + tympanum (kulak zarı) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A ring-shaped part of the temporal bone forming the anterior, inferior, and posterior walls of the external acoustic meatus.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 620,
            "term": "Anulus Tympanicus",
            "english": "Tympanic Ring",
            "turkishDefinition": "Timpanik halka; yenidoğanda timpanik parçanın henüz tam kapanmamış halka şeklindeki erken hali.",
            "turkishShort": "Timpanik halka",
            "roots": "anulus (halka) + tympanum (kulak zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The incomplete, ring-shaped precursor of the tympanic part, seen in newborns.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 621,
            "term": "Porus Acusticus Externus",
            "english": "External Acoustic Opening",
            "turkishDefinition": "Dış işitme deliği; timpanik parçanın oluşturduğu, dış işitme yolunun kafatası yüzeyindeki açıklığı.",
            "turkishShort": "Dış işitme deliği",
            "roots": "porus (delik) + acusticus (işitmeye ait) + externus (dış)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The opening of the external acoustic meatus on the surface of the skull, formed by the tympanic part.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 622,
            "term": "Meatus Acusticus Externus",
            "english": "External Acoustic Meatus",
            "turkishDefinition": "Dış işitme yolu; dış kulaktan kulak zarına uzanan, kısmen kemik kısmen kıkırdak yapıdaki kanal.",
            "turkishShort": "Dış işitme yolu",
            "roots": "meatus (yol, geçit) + acusticus (işitmeye ait) + externus (dış)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The canal, partly bony and partly cartilaginous, extending from the outer ear to the eardrum.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 623,
            "term": "Spina Tympanica Major",
            "english": "Greater Tympanic Spine",
            "turkishDefinition": "Büyük timpanik diken; timpanik parçanın üst ucunda yer alan büyük kemik çıkıntı.",
            "turkishShort": "Büyük timpanik diken",
            "roots": "spina (diken) + tympanum (kulak zarı) + major (büyük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A larger bony projection at the upper end of the tympanic part.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 624,
            "term": "Spina Tympanica Minor",
            "english": "Lesser Tympanic Spine",
            "turkishDefinition": "Küçük timpanik diken; timpanik parçanın üst ucunda büyük timpanik dikenin yanında yer alan küçük kemik çıkıntı.",
            "turkishShort": "Küçük timpanik diken",
            "roots": "spina (diken) + tympanum (kulak zarı) + minor (küçük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A smaller bony projection at the upper end of the tympanic part, beside the greater tympanic spine.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 625,
            "term": "Sulcus Tympanicus",
            "english": "Tympanic Sulcus",
            "turkishDefinition": "Timpanik oluk; timpanik parçanın iç yüzünde kulak zarının kenarının oturduğu oluk.",
            "turkishShort": "Timpanik oluk",
            "roots": "sulcus (oluk) + tympanum (kulak zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove on the inner surface of the tympanic part in which the margin of the eardrum is seated.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 626,
            "term": "Incisura Tympanica",
            "english": "Tympanic Notch",
            "turkishDefinition": "Timpanik çentik; timpanik oluğun üst kısmında, kulak zarının gevşek kısmına karşılık gelen çentik.",
            "turkishShort": "Timpanik çentik",
            "roots": "incisura (çentik) + tympanum (kulak zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A gap in the upper part of the tympanic sulcus, corresponding to the flaccid part of the eardrum.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 627,
            "term": "Vagina Processus Styloidei",
            "english": "Sheath of Styloid Process",
            "turkishDefinition": "Bızsı çıkıntı kılıfı; timpanik parçanın bızsı çıkıntının kökünü çevreleyen kısmı.",
            "turkishShort": "Bızsı çıkıntı kılıfı",
            "roots": "vagina (kılıf) + processus styloideus (bızsı çıkıntı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The part of the tympanic part that ensheathes the base of the styloid process.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 628,
            "term": "Pars Squamosa Ossis Temporalis",
            "english": "Squamous Part of Temporal Bone",
            "turkishDefinition": "Şakak kemiği pulsu parçası; şakak kemiğinin ince, düz plaka şeklindeki üst-ön kısmı.",
            "turkishShort": "Şakak kemiği pulsu parçası",
            "roots": "pars (bölüm) + squamosus (pullu) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The thin, flat, plate-like anterosuperior part of the temporal bone.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 629,
            "term": "Margo Parietalis Ossis Temporalis",
            "english": "Parietal Border of Temporal Bone",
            "turkishDefinition": "Şakak kemiği duvar kemik kenarı; pulsu parçanın duvar kemiğiyle birleştiği kavisli üst kenar.",
            "turkishShort": "Şakak kemiği duvar kemik kenarı",
            "roots": "margo (kenar) + parietalis (duvar kemiğine ait) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The curved upper border of the squamous part that articulates with the parietal bone.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 630,
            "term": "Incisura Parietalis Ossis Temporalis",
            "english": "Parietal Notch of Temporal Bone",
            "turkishDefinition": "Şakak kemiği duvar kemik çentiği; pulsu parçanın mastoid parçayla birleştiği yerdeki küçük çentik.",
            "turkishShort": "Şakak kemiği duvar kemik çentiği",
            "roots": "incisura (çentik) + parietalis (duvar kemiğine ait) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small notch where the squamous part meets the mastoid part of the temporal bone.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 631,
            "term": "Margo Sphenoidalis Ossis Temporalis",
            "english": "Sphenoidal Margin of Temporal Bone",
            "turkishDefinition": "Şakak kemiği kama kemik kenarı; pulsu parçanın sfenoid kemiğin büyük kanadıyla birleştiği ön kenar.",
            "turkishShort": "Şakak kemiği kama kemik kenarı",
            "roots": "margo (kenar) + sphenoidalis (kama kemiğine ait) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The anterior border of the squamous part that articulates with the greater wing of the sphenoid bone.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 632,
            "term": "Facies Temporalis Ossis Temporalis",
            "english": "Temporal Surface of Temporal Bone",
            "turkishDefinition": "Şakak kemiğinin şakak yüzü; pulsu parçanın şakak çukuruna katılan dış yüzeyi.",
            "turkishShort": "Şakak kemiğinin şakak yüzü",
            "roots": "facies (yüz) + temporalis (şakağa ait) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The external surface of the squamous part that contributes to the temporal fossa.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 633,
            "term": "Sulcus Arteriae Temporalis Mediae",
            "english": "Groove for Middle Temporal Artery",
            "turkishDefinition": "Orta temporal arter oluğu; pulsu parçanın dış yüzünde orta temporal arterin seyrettiği oluk.",
            "turkishShort": "Orta temporal arter oluğu",
            "roots": "sulcus (oluk) + arteria (atardamar) + temporalis (şakağa ait) + medius (orta)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A groove on the external surface of the squamous part that accommodates the middle temporal artery.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 634,
            "term": "Processus Zygomaticus Ossis Temporalis",
            "english": "Zygomatic Process of Temporal Bone",
            "turkishDefinition": "Şakak kemiği elmacık çıkıntısı; pulsu parçadan öne doğru uzanan, elmacık kemiğiyle birleşen çıkıntı.",
            "turkishShort": "Şakak kemiği elmacık çıkıntısı",
            "roots": "processus (çıkıntı) + zygomaticus (elmacığa ait) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A projection extending anteriorly from the squamous part that articulates with the zygomatic bone.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 635,
            "term": "Crista Supramastoidea",
            "english": "Supramastoid Crest",
            "turkishDefinition": "Supramastoid ibik; elmacık çıkıntısının kökünden mastoid çıkıntıya doğru uzanan, temporal fasyanın tutunduğu ibik.",
            "turkishShort": "Supramastoid ibik",
            "roots": "crista (ibik) + supra (üstünde) + mastoideus (meme şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A ridge extending from the root of the zygomatic process toward the mastoid process, providing attachment for the temporal fascia.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 636,
            "term": "Foveola Suprameatica",
            "english": "Suprameatal Triangle",
            "turkishDefinition": "Suprameatal üçgen / çukurcuk (eş anlamlısı: Foveola Suprameatalis); dış işitme yolunun üstünde yer alan küçük üçgen çukurcuk.",
            "turkishShort": "Suprameatal üçgen",
            "roots": "foveola (küçük çukur) + supra (üstünde) + meatus (yol, geçit)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small triangular depression above the external acoustic meatus.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 637,
            "term": "Spina Suprameatica",
            "english": "Suprameatal Spine",
            "turkishDefinition": "Suprameatal diken (eş anlamlısı: Spina Suprameatalis); dış işitme yolunun arka-üst kenarında yer alan küçük kemik çıkıntı.",
            "turkishShort": "Suprameatal diken",
            "roots": "spina (diken) + supra (üstünde) + meatus (yol, geçit)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A small bony projection at the posterosuperior margin of the external acoustic meatus.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 638,
            "term": "Facies Articularis Ossis Temporalis",
            "english": "Articular Surface of Temporal Bone",
            "turkishDefinition": "Şakak kemiği eklem yüzü; mandibular çukurun ön kısmında yer alan, çene eklemi (TME) hareketine katılan eklem yüzü.",
            "turkishShort": "Şakak kemiği eklem yüzü",
            "roots": "facies (yüz) + articularis (ekleme ait) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The articular surface at the anterior part of the mandibular fossa, participating in temporomandibular joint movement.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 639,
            "term": "Tuberculum Articulare",
            "english": "Articular Tubercle",
            "turkishDefinition": "Eklem tümseği; mandibular çukurun önünde yer alan, çene eklemi hareketinde kondilin öne kaydığı kemik tümsek.",
            "turkishShort": "Eklem tümseği",
            "roots": "tuberculum (küçük tümsek) + articularis (ekleme ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A bony prominence anterior to the mandibular fossa over which the mandibular condyle glides during jaw movement.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 640,
            "term": "Fissura Petrotympanica",
            "english": "Petrotympanic Fissure",
            "turkishDefinition": "Petrotimpanik yarık; petroz parça ile timpanik parça arasında yer alan, korda timpani sinirinin çıktığı ince yarık.",
            "turkishShort": "Petrotimpanik yarık",
            "roots": "fissura (yarık) + petrosus (taşsı) + tympanum (kulak zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A thin fissure between the petrous and tympanic parts through which the chorda tympani nerve exits.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 641,
            "term": "Fissura Petrosquamosa",
            "english": "Petrosquamous Fissure",
            "turkishDefinition": "Petroskuamöz yarık; petroz parça ile pulsu parça arasında yenidoğanda görülen, erişkinde genellikle kapanan yarık.",
            "turkishShort": "Petroskuamöz yarık",
            "roots": "fissura (yarık) + petrosus (taşsı) + squamosus (pullu)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A fissure between the petrous and squamous parts, present in infants and usually closed in adults.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 642,
            "term": "Fissura Tympanosquamosa",
            "english": "Tympanosquamous Fissure",
            "turkishDefinition": "Timpanoskuamöz yarık; timpanik parça ile pulsu parça arasında yer alan yarık.",
            "turkishShort": "Timpanoskuamöz yarık",
            "roots": "fissura (yarık) + tympanum (kulak zarı) + squamosus (pullu)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A fissure between the tympanic and squamous parts of the temporal bone.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 643,
            "term": "Fissura Tympanomastoidea",
            "english": "Tympanomastoid Fissure",
            "turkishDefinition": "Timpanomastoid yarık; timpanik parça ile mastoid parça arasında yer alan, vagus sinirinin kulak dalının çıktığı yarık.",
            "turkishShort": "Timpanomastoid yarık",
            "roots": "fissura (yarık) + tympanum (kulak zarı) + mastoideus (meme şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A fissure between the tympanic and mastoid parts through which the auricular branch of the vagus nerve exits.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 644,
            "term": "Facies Cerebralis Ossis Temporalis",
            "english": "Cerebral Surface of Temporal Bone",
            "turkishDefinition": "Şakak kemiği beyin yüzü; petroz parçanın orta kraniyal çukura bakan iç yüzeyi.",
            "turkishShort": "Şakak kemiği beyin yüzü",
            "roots": "facies (yüz) + cerebralis (beyne ait) + os temporale (şakak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The internal surface of the petrous part facing the middle cranial fossa.",
            "createdAt": {
                "_seconds": 1789118933,
                "_nanoseconds": 513000000
            },
            "group": "Os Temporale"
        },
        {
            "id": 645,
            "term": "Lamina Cribrosa",
            "english": "Cribriform Plate",
            "turkishDefinition": "Kalburumsu tabaka; kalbur kemiğinin üst yüzeyinde koku sinir liflerinin geçtiği çok sayıda küçük delik içeren yatay plaka.",
            "turkishShort": "Kalburumsu tabaka",
            "roots": "lamina (tabaka, plaka) + cribrosus (kalburumsu, delikli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A horizontal plate at the top of the ethmoid bone containing numerous small openings through which olfactory nerve fibers pass.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 646,
            "term": "Foramina Cribrosa",
            "english": "Cribriform Foramina",
            "turkishDefinition": "Kalburumsu delikler; kalburumsu tabakada bulunan, koku sinir liflerinin geçtiği çok sayıda küçük delik.",
            "turkishShort": "Kalburumsu delikler",
            "roots": "foramen (delik) + cribrosus (kalburumsu, delikli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "Numerous small openings in the cribriform plate through which the olfactory nerve fibers pass.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 647,
            "term": "Crista Galli",
            "english": "Crista Galli",
            "turkishDefinition": "Horoz ibiği; kalburumsu tabakanın orta hattından yukarı uzanan, falx cerebri'nin tutunduğu üçgen kemik çıkıntı.",
            "turkishShort": "Horoz ibiği",
            "roots": "crista (ibik) + gallus (horoz)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A triangular bony projection rising from the midline of the cribriform plate, providing attachment for the falx cerebri.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 648,
            "term": "Ala Cristae Galli",
            "english": "Ala of Crista Galli",
            "turkishDefinition": "Horoz ibiği kanadı; horoz ibiğinin tabanında yer alan, küçük kanat şeklindeki çift çıkıntı.",
            "turkishShort": "Horoz ibiği kanadı",
            "roots": "ala (kanat) + crista galli (horoz ibiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A pair of small wing-shaped projections at the base of the crista galli.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 649,
            "term": "Lamina Perpendicularis Ossis Ethmoidalis",
            "english": "Perpendicular Plate of Ethmoid Bone",
            "turkishDefinition": "Dik tabaka; kalbur kemiğinin burun bölmesinin üst kısmını oluşturan dikey kemik plaka.",
            "turkishShort": "Dik tabaka",
            "roots": "lamina (tabaka, plaka) + perpendicularis (dik) + os ethmoidale (kalbur kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "The vertical bony plate of the ethmoid bone that forms the upper part of the nasal septum.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 650,
            "term": "Labyrinthus Ethmoidalis",
            "english": "Ethmoidal Labyrinth",
            "turkishDefinition": "Kalbur kemiği labirenti; kalbur kemiğinin iki yanında yer alan, hava hücrelerini barındıran süngerimsi kemik kütlesi.",
            "turkishShort": "Kalbur kemiği labirenti",
            "roots": "labyrinthus (labirent) + ethmoidalis (kalbur kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A spongy mass of bone on either side of the ethmoid bone containing the ethmoidal air cells.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 651,
            "term": "Cellulae Ethmoidales Anteriores",
            "english": "Anterior Ethmoidal Cells",
            "turkishDefinition": "Ön kalbur hücreleri; kalbur labirentinin ön kısmında yer alan, orta burun geçidine açılan hava hücreleri.",
            "turkishShort": "Ön kalbur hücreleri",
            "roots": "cellula (küçük hücre) + ethmoidalis (kalbur kemiğine ait) + anterior (ön)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "Air cells in the anterior part of the ethmoidal labyrinth that drain into the middle nasal meatus.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 652,
            "term": "Cellulae Ethmoidales Mediae",
            "english": "Middle Ethmoidal Cells",
            "turkishDefinition": "Orta kalbur hücreleri; kalbur labirentinin orta kısmında yer alan, bulla ethmoidalis üzerine açılan hava hücreleri.",
            "turkishShort": "Orta kalbur hücreleri",
            "roots": "cellula (küçük hücre) + ethmoidalis (kalbur kemiğine ait) + medius (orta)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "Air cells in the middle part of the ethmoidal labyrinth that open onto the ethmoidal bulla.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 653,
            "term": "Cellulae Ethmoidales Posteriores",
            "english": "Posterior Ethmoidal Cells",
            "turkishDefinition": "Arka kalbur hücreleri; kalbur labirentinin arka kısmında yer alan, üst burun geçidine açılan hava hücreleri.",
            "turkishShort": "Arka kalbur hücreleri",
            "roots": "cellula (küçük hücre) + ethmoidalis (kalbur kemiğine ait) + posterior (arka)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "Air cells in the posterior part of the ethmoidal labyrinth that drain into the superior nasal meatus.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 654,
            "term": "Lamina Orbitalis Ossis Ethmoidalis",
            "english": "Orbital Plate of Ethmoid Bone",
            "turkishDefinition": "Göz çukuru tabakası; kalbur labirentinin göz çukurunun iç duvarını oluşturan ince kemik plaka.",
            "turkishShort": "Göz çukuru tabakası",
            "roots": "lamina (tabaka, plaka) + orbitalis (göz çukuruna ait) + os ethmoidale (kalbur kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A thin bony plate of the ethmoidal labyrinth forming the medial wall of the orbit.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 655,
            "term": "Concha Nasalis Suprema",
            "english": "Supreme Nasal Concha",
            "turkishDefinition": "En üst burun konkası; bazı bireylerde üst burun konkasının üzerinde bulunan ek küçük kemik kıvrım.",
            "turkishShort": "En üst burun konkası",
            "roots": "concha (kabuk, konka) + nasalis (buruna ait) + suprema (en üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "An additional small bony curl sometimes present above the superior nasal concha.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 656,
            "term": "Concha Nasalis Superior",
            "english": "Superior Nasal Concha",
            "turkishDefinition": "Üst burun konkası; kalbur labirentinin iç yüzünde yer alan, üst burun geçidini oluşturan kemik kıvrım.",
            "turkishShort": "Üst burun konkası",
            "roots": "concha (kabuk, konka) + nasalis (buruna ait) + superior (üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A bony curl on the medial surface of the ethmoidal labyrinth that forms the superior nasal meatus.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 657,
            "term": "Concha Nasalis Media",
            "english": "Middle Nasal Concha",
            "turkishDefinition": "Orta burun konkası; kalbur labirentinin iç yüzünde yer alan, orta burun geçidini oluşturan kemik kıvrım.",
            "turkishShort": "Orta burun konkası",
            "roots": "concha (kabuk, konka) + nasalis (buruna ait) + medius (orta)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A bony curl on the medial surface of the ethmoidal labyrinth that forms the middle nasal meatus.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 658,
            "term": "Bulla Ethmoidalis",
            "english": "Ethmoidal Bulla",
            "turkishDefinition": "Kalbur kabarcığı; orta burun geçidinde yer alan, orta kalbur hücrelerinin oluşturduğu yuvarlak kabarıklık.",
            "turkishShort": "Kalbur kabarcığı",
            "roots": "bulla (kabarcık) + ethmoidalis (kalbur kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A rounded bulge in the middle nasal meatus formed by the middle ethmoidal cells.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 659,
            "term": "Processus Uncinatus",
            "english": "Uncinate Process",
            "turkishDefinition": "Çengelsi çıkıntı; kalbur labirentinden aşağı ve arkaya uzanan, ince çengel şeklindeki kemik çıkıntı.",
            "turkishShort": "Çengelsi çıkıntı",
            "roots": "processus (çıkıntı) + uncinatus (çengelli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A thin, hook-shaped bony projection extending downward and backward from the ethmoidal labyrinth.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 660,
            "term": "Infundibulum Ethmoidale",
            "english": "Ethmoidal Infundibulum",
            "turkishDefinition": "Kalbur hunisi; çengelsi çıkıntı ile bulla arasında yer alan, alın sinüsünün genellikle boşaldığı huni şeklindeki geçit.",
            "turkishShort": "Kalbur hunisi",
            "roots": "infundibulum (huni) + ethmoidalis (kalbur kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A funnel-shaped passage between the uncinate process and the bulla into which the frontal sinus typically drains.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        },
        {
            "id": 661,
            "term": "Hiatus Semilunaris",
            "english": "Semilunar Hiatus",
            "turkishDefinition": "Yarım ay şeklindeki geçit; çengelsi çıkıntı ile bulla ethmoidalis arasında yer alan, orta burun geçidine açılan yarık şeklindeki geçit.",
            "turkishShort": "Yarım ay şeklindeki geçit",
            "roots": "hiatus (geçit, açıklık) + semilunaris (yarım ay şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "englishDefinition": "A crescent-shaped passage between the uncinate process and the ethmoidal bulla, opening into the middle nasal meatus.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            },
            "group": "Os Ethmoidale"
        }
    ],
    "face_bones": [
        {
            "id": 7,
            "term": "Os Nasale",
            "english": "Nasal Bone",
            "roots": "os (kemik) + nasus (burun)",
            "turkishDefinition": "Üst yüzün ortasında, Maxilla ön çıkıntıları arasında yan yana yer alan küçük dikdörtgen şekilli kemikler olup birlikte burun sırtını oluştururlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst yüzün ortasında, Maxilla ön çıkıntıları arasında yan yana yer alan küçük dikdörtgen şekilli kemikler olup birlikte burun sırtını oluştururlar",
            "englishDefinition": "A pair of small rectangular bones between the frontal processes of the maxilla, forming the bridge of the nose."
        },
        {
            "id": 8,
            "english": "Lacrimal Bone",
            "roots": "os (kemik) + lacrima (gözyaşı)",
            "turkishDefinition": "Medial Orbital duvarların ön kısmını oluşturan çiftli kraniofasiyal kemiklerdir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Medial Orbital duvarların ön kısmını oluşturan çiftli kraniofasiyal kemiklerdir",
            "englishDefinition": "The smallest facial bone, forming the anterior part of the medial orbital wall and housing the lacrimal groove.",
            "term": "Os Lacrimale"
        },
        {
            "id": 9,
            "term": "Os Zygomaticum",
            "english": "Zygomatic Bone",
            "roots": "os (kemik) + zygoma (yanak)",
            "turkishDefinition": "Yanağın çıkıntısını oluşturan önemli bir yüz kemiğidir. Şekli kabaca dikdörtgen şeklindedir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Yanağın çıkıntısını oluşturan önemli bir yüz kemiğidir",
            "englishDefinition": "A diamond-shaped bone forming the prominence of the cheek, contributing to the lateral orbital wall and zygomatic arch."
        },
        {
            "id": 10,
            "term": "Maxilla",
            "english": "Maxilla",
            "roots": "maxilla (üst çene)",
            "turkishDefinition": "Yüzün orta üçte birini oluşturan, orta hatta birleşen bir çift simetrik kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Yüzün orta üçte birini oluşturan, orta hatta birleşen bir çift simetrik kemiktir",
            "englishDefinition": "A paired bone forming the upper jaw and central middle third of the face, housing the upper teeth and contributing to the orbit, nasal cavity, and hard palate."
        },
        {
            "id": 11,
            "term": "Os Palatinum",
            "english": "Palatine Bone",
            "roots": "os (kemik) + palatum (damak)",
            "turkishDefinition": "Orta hatta birleşen çift L şeklinde kemiklerdir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Orta hatta birleşen çift L şeklinde kemiklerdir",
            "englishDefinition": "An L-shaped bone lying posterior to the maxilla, forming part of the hard palate, nasal cavity, and orbital floor."
        },
        {
            "id": 12,
            "term": "Processus Maxillaris Conchae Nasalis Inferioris",
            "english": "Maxillary Process of Inferior Nasal Concha",
            "roots": "processus (çıkıntı) + maxilla + concha (kabuk)",
            "turkishDefinition": "Inferior Nasal Concha'nın lateral yüzünden çıkan, Maxilla ile eklemleşen kemik çıkıntısıdır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Inferior Nasal Concha'nın lateral yüzünden çıkan, Maxilla ile eklemleşen kemik çıkıntısıdır",
            "englishDefinition": "A bony projection from the inferior nasal concha that articulates with the maxilla, helping form the lateral nasal wall."
        },
        {
            "id": 13,
            "term": "Vomer",
            "english": "Vomer",
            "roots": "vomer (saban demiri)",
            "turkishDefinition": "Eşlenmemiş yüz kemiklerinden biridir ve kemik nasal septumun posteroinferior bölümünü oluşturur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Eşlenmemiş yüz kemiklerinden biridir ve kemik nasal septumun posteroinferior bölümünü oluşturur",
            "englishDefinition": "An unpaired, plough-shaped bone forming the posteroinferior part of the bony nasal septum."
        },
        {
            "id": 14,
            "term": "Mandibula",
            "english": "Mandible",
            "roots": "mandibula (alt çene)",
            "turkishDefinition": "Alt çenenin tek orta hat kemiğidir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Alt çenenin tek orta hat kemiğidir",
            "englishDefinition": "The single midline bone of the lower jaw, articulating with the temporal bone at the temporomandibular joint."
        },
        {
            "id": 662,
            "term": "Concha Nasalis Inferior",
            "english": "Inferior Nasal Concha",
            "turkishDefinition": "Alt burun konkası; burun boşluğunun yan duvarında yer alan, kendi başına bağımsız bir yüz kemiği olan kavisli kemik kıvrım.",
            "turkishShort": "Alt burun konkası",
            "roots": "concha (kabuk, konka) + nasalis (buruna ait) + inferior (alt)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "An independent facial bone forming a curved bony structure on the lateral wall of the nasal cavity.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            }
        },
        {
            "id": 663,
            "term": "Processus Lacrimalis Conchae Nasalis Inferioris",
            "english": "Lacrimal Process of Inferior Nasal Concha",
            "turkishDefinition": "Alt burun konkası gözyaşı çıkıntısı; alt burun konkasının gözyaşı kemiğiyle birleşen küçük çıkıntısı.",
            "turkishShort": "Alt burun konkası gözyaşı çıkıntısı",
            "roots": "processus (çıkıntı) + lacrimalis (gözyaşına ait) + concha nasalis inferior (alt burun konkası)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A small projection of the inferior nasal concha that articulates with the lacrimal bone.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            }
        },
        {
            "id": 664,
            "term": "Processus Ethmoidalis Conchae Nasalis Inferioris",
            "english": "Ethmoidal Process of Inferior Nasal Concha",
            "turkishDefinition": "Alt burun konkası kalbur çıkıntısı; alt burun konkasının kalbur kemiğinin süngerimsi kemiğiyle birleşen çıkıntısı.",
            "turkishShort": "Alt burun konkası kalbur çıkıntısı",
            "roots": "processus (çıkıntı) + ethmoidalis (kalbur kemiğine ait) + concha nasalis inferior (alt burun konkası)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A projection of the inferior nasal concha that articulates with the uncinate process of the ethmoid bone.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            }
        },
        {
            "id": 665,
            "term": "Crista Lacrimalis Posterior",
            "english": "Posterior Lacrimal Crest",
            "turkishDefinition": "Arka gözyaşı ibiği; gözyaşı kemiğinin dış yüzünde yer alan, gözyaşı oluğunun arka sınırını oluşturan dikey ibik.",
            "turkishShort": "Arka gözyaşı ibiği",
            "roots": "crista (ibik) + lacrimalis (gözyaşına ait) + posterior (arka)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A vertical ridge on the lateral surface of the lacrimal bone forming the posterior boundary of the lacrimal groove.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            }
        },
        {
            "id": 666,
            "term": "Sulcus Lacrimalis Ossis Lacrimalis",
            "english": "Lacrimal Groove of Lacrimal Bone",
            "turkishDefinition": "Gözyaşı kemiği gözyaşı oluğu; gözyaşı kemiğinin dış yüzünde yer alan, gözyaşı kesesinin bir kısmını barındıran oluk.",
            "turkishShort": "Gözyaşı kemiği gözyaşı oluğu",
            "roots": "sulcus (oluk) + lacrimalis (gözyaşına ait) + os lacrimale (gözyaşı kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A groove on the lateral surface of the lacrimal bone that houses part of the lacrimal sac.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            }
        },
        {
            "id": 667,
            "term": "Hamulus Lacrimalis",
            "english": "Lacrimal Hamulus",
            "turkishDefinition": "Gözyaşı çengeli; gözyaşı kemiğinin alt ucunda yer alan, alt burun konkasıyla birleşen küçük çengel şeklinde çıkıntı.",
            "turkishShort": "Gözyaşı çengeli",
            "roots": "hamulus (küçük çengel) + lacrimalis (gözyaşına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A small hook-shaped projection at the lower end of the lacrimal bone that articulates with the inferior nasal concha.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            }
        },
        {
            "id": 668,
            "term": "Sulcus Ethmoidalis Ossis Nasalis",
            "english": "Ethmoidal Groove of Nasal Bone",
            "turkishDefinition": "Burun kemiği kalbur oluğu; burun kemiğinin iç yüzünde ön kalbur sinirinin dalının seyrettiği oluk.",
            "turkishShort": "Burun kemiği kalbur oluğu",
            "roots": "sulcus (oluk) + ethmoidalis (kalbur kemiğine ait) + os nasale (burun kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A groove on the internal surface of the nasal bone that accommodates a branch of the anterior ethmoidal nerve.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            }
        },
        {
            "id": 669,
            "term": "Foramina Nasalia",
            "english": "Nasal Foramina",
            "turkishDefinition": "Burun delikleri; burun kemiğinde bulunan, küçük damarların geçtiği çok sayıda küçük delik.",
            "turkishShort": "Burun delikleri",
            "roots": "foramen (delik) + nasalis (buruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "Numerous small openings in the nasal bone that transmit small blood vessels.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            }
        },
        {
            "id": 670,
            "term": "Ala Vomeris",
            "english": "Ala of Vomer",
            "turkishDefinition": "Sapan kemiği kanadı; vomer kemiğinin üst kenarında yer alan, sfenoid kemiğin rostrumuyla eklemleşen ince kanat şeklindeki çıkıntı.",
            "turkishShort": "Sapan kemiği kanadı",
            "roots": "ala (kanat) + vomer (sapan kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A thin, wing-shaped projection on the upper border of the vomer that articulates with the rostrum of the sphenoid bone.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            }
        },
        {
            "id": 671,
            "term": "Sulcus Vomeris",
            "english": "Groove of Vomer",
            "turkishDefinition": "Sapan kemiği oluğu; vomer kemiğinin üst kenarında nazopalatin sinir ve damarının seyrettiği oluk.",
            "turkishShort": "Sapan kemiği oluğu",
            "roots": "sulcus (oluk) + vomer (sapan kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A groove on the upper border of the vomer that accommodates the nasopalatine nerve and vessels.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            }
        },
        {
            "id": 672,
            "term": "Crista Choanalis Vomeris",
            "english": "Choanal Crest of Vomer",
            "turkishDefinition": "Sapan kemiği koan ibiği; vomer kemiğinin alt-arka kenarında yer alan, koananın oluşumuna katılan ibik.",
            "turkishShort": "Sapan kemiği koan ibiği",
            "roots": "crista (ibik) + choana (koana, arka burun deliği) + vomer (sapan kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A ridge on the posteroinferior border of the vomer that contributes to the formation of the choana.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            }
        },
        {
            "id": 673,
            "term": "Pars Cuneiformis Vomeris",
            "english": "Cuneiform Part of Vomer",
            "turkishDefinition": "Sapan kemiği kama şeklindeki parçası; vomer kemiğinin sfenoid kemiğin rostrumuna komşu kama şeklindeki arka-üst kısmı.",
            "turkishShort": "Sapan kemiği kama şeklindeki parçası",
            "roots": "pars (bölüm) + cuneiformis (kama şeklinde) + vomer (sapan kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The wedge-shaped posterosuperior part of the vomer adjacent to the rostrum of the sphenoid bone.",
            "createdAt": {
                "_seconds": 1789200447,
                "_nanoseconds": 800000000
            }
        },
        {
            "id": 674,
            "term": "Facies Lateralis Ossis Zygomatici",
            "english": "Lateral Surface of Zygomatic Bone",
            "turkishDefinition": "Elmacık kemiği dış yüzü; elmacık kemiğinin yüz derisinin altında kalan dışbükey dış yüzeyi.",
            "turkishShort": "Elmacık kemiği dış yüzü",
            "roots": "facies (yüz) + lateralis (yan) + os zygomaticum (elmacık kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The convex outer surface of the zygomatic bone, lying beneath the facial skin.",
            "createdAt": {
                "_seconds": 1789202007,
                "_nanoseconds": 795000000
            }
        },
        {
            "id": 675,
            "term": "Facies Temporalis Ossis Zygomatici",
            "english": "Temporal Surface of Zygomatic Bone",
            "turkishDefinition": "Elmacık kemiği şakak yüzü; elmacık kemiğinin şakak altı çukuruna bakan iç yüzeyi.",
            "turkishShort": "Elmacık kemiği şakak yüzü",
            "roots": "facies (yüz) + temporalis (şakağa ait) + os zygomaticum (elmacık kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The internal surface of the zygomatic bone that faces the infratemporal fossa.",
            "createdAt": {
                "_seconds": 1789202007,
                "_nanoseconds": 795000000
            }
        },
        {
            "id": 676,
            "term": "Facies Orbitalis Ossis Zygomatici",
            "english": "Orbital Surface of Zygomatic Bone",
            "turkishDefinition": "Elmacık kemiği göz çukuru yüzü; elmacık kemiğinin göz çukurunun yan duvarını oluşturan düz yüzeyi.",
            "turkishShort": "Elmacık kemiği göz çukuru yüzü",
            "roots": "facies (yüz) + orbitalis (göz çukuruna ait) + os zygomaticum (elmacık kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The smooth surface of the zygomatic bone that forms the lateral wall of the orbit.",
            "createdAt": {
                "_seconds": 1789202007,
                "_nanoseconds": 795000000
            }
        },
        {
            "id": 677,
            "term": "Processus Temporalis Ossis Zygomatici",
            "english": "Temporal Process of Zygomatic Bone",
            "turkishDefinition": "Elmacık kemiği şakak çıkıntısı; elmacık kemiğinin şakak kemiğinin elmacık çıkıntısıyla birleşerek elmacık kemerini oluşturan çıkıntısı.",
            "turkishShort": "Elmacık kemiği şakak çıkıntısı",
            "roots": "processus (çıkıntı) + temporalis (şakağa ait) + os zygomaticum (elmacık kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A projection of the zygomatic bone that joins the zygomatic process of the temporal bone to form the zygomatic arch.",
            "createdAt": {
                "_seconds": 1789202007,
                "_nanoseconds": 795000000
            }
        },
        {
            "id": 678,
            "term": "Processus Frontalis Ossis Zygomatici",
            "english": "Frontal Process of Zygomatic Bone",
            "turkishDefinition": "Elmacık kemiği alın çıkıntısı; elmacık kemiğinin yukarı uzanarak alın kemiğiyle birleşen çıkıntısı.",
            "turkishShort": "Elmacık kemiği alın çıkıntısı",
            "roots": "processus (çıkıntı) + frontalis (alına ait) + os zygomaticum (elmacık kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A projection of the zygomatic bone extending upward to articulate with the frontal bone.",
            "createdAt": {
                "_seconds": 1789202007,
                "_nanoseconds": 795000000
            }
        },
        {
            "id": 679,
            "term": "Tuberculum Orbitale",
            "english": "Orbital Tubercle",
            "turkishDefinition": "Göz çukuru tümsekciği (Whitnall tümsekciği); elmacık kemiğinin göz çukuru yüzünde yer alan, göz kapağı bağlarının tutunduğu küçük kemik çıkıntı.",
            "turkishShort": "Göz çukuru tümsekciği",
            "roots": "tuberculum (küçük tümsek) + orbitalis (göz çukuruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A small bony projection on the orbital surface of the zygomatic bone, also known as Whitnall's tubercle, providing attachment for eyelid ligaments.",
            "createdAt": {
                "_seconds": 1789202007,
                "_nanoseconds": 795000000
            }
        },
        {
            "id": 680,
            "term": "Tuberculum Marginale",
            "english": "Marginal Tubercle",
            "turkishDefinition": "Kenar tümsekciği; elmacık kemiğinin göz çukuru kenarında yer alan, temporal fasyanın tutunduğu küçük çıkıntı.",
            "turkishShort": "Kenar tümsekciği",
            "roots": "tuberculum (küçük tümsek) + marginalis (kenara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A small projection on the orbital margin of the zygomatic bone, providing attachment for the temporal fascia.",
            "createdAt": {
                "_seconds": 1789202007,
                "_nanoseconds": 795000000
            }
        },
        {
            "id": 681,
            "term": "Foramen Zygomaticoorbitale",
            "english": "Zygomaticoorbital Foramen",
            "turkishDefinition": "Elmacık-göz çukuru deliği; elmacık kemiğinin göz çukuru yüzünde yer alan, elmacık sinirinin girdiği delik.",
            "turkishShort": "Elmacık-göz çukuru deliği",
            "roots": "foramen (delik) + zygomaticus (elmacığa ait) + orbitalis (göz çukuruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "An opening on the orbital surface of the zygomatic bone through which the zygomatic nerve enters.",
            "createdAt": {
                "_seconds": 1789202007,
                "_nanoseconds": 795000000
            }
        },
        {
            "id": 682,
            "term": "Foramen Zygomaticofaciale",
            "english": "Zygomaticofacial Foramen",
            "turkishDefinition": "Elmacık-yüz deliği; elmacık kemiğinin dış yüzünde yer alan, elmacık sinirinin yüze çıktığı delik.",
            "turkishShort": "Elmacık-yüz deliği",
            "roots": "foramen (delik) + zygomaticus (elmacığa ait) + facialis (yüze ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "An opening on the lateral surface of the zygomatic bone through which a branch of the zygomatic nerve emerges onto the face.",
            "createdAt": {
                "_seconds": 1789202007,
                "_nanoseconds": 795000000
            }
        },
        {
            "id": 683,
            "term": "Foramen Zygomaticotemporale",
            "english": "Zygomaticotemporal Foramen",
            "turkishDefinition": "Elmacık-şakak deliği; elmacık kemiğinin şakak yüzünde yer alan, elmacık sinirinin şakak bölgesine çıktığı delik.",
            "turkishShort": "Elmacık-şakak deliği",
            "roots": "foramen (delik) + zygomaticus (elmacığa ait) + temporalis (şakağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "An opening on the temporal surface of the zygomatic bone through which a branch of the zygomatic nerve emerges into the temporal region.",
            "createdAt": {
                "_seconds": 1789202007,
                "_nanoseconds": 795000000
            }
        },
        {
            "id": 684,
            "term": "Corpus Mandibulae",
            "english": "Body of Mandible",
            "turkishDefinition": "Alt çene gövdesi; alt çene kemiğinin at nalı şeklindeki yatay, ana gövde kısmı.",
            "turkishShort": "Alt çene gövdesi",
            "roots": "corpus (gövde) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The horizontal, horseshoe-shaped main body of the mandible.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 685,
            "term": "Basis Mandibulae",
            "english": "Base of Mandible",
            "turkishDefinition": "Alt çene tabanı; alt çene gövdesinin alt kalın kenarı.",
            "turkishShort": "Alt çene tabanı",
            "roots": "basis (taban) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The thick lower border of the body of the mandible.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 686,
            "term": "Symphysis Mandibulae",
            "english": "Mandibular Symphysis",
            "turkishDefinition": "Alt çene birleşim çizgisi; alt çenenin iki yarısının doğumda kaynaştığı orta hat izi.",
            "turkishShort": "Alt çene birleşim çizgisi",
            "roots": "symphysis (birleşme, kaynaşma) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The midline fusion line where the two halves of the mandible unite during infancy.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 687,
            "term": "Protuberantia Mentalis",
            "english": "Mental Protuberance",
            "turkishDefinition": "Çene tümseği; alt çenenin ön orta hattında yer alan, çene ucunu oluşturan üçgen kemik kabartı.",
            "turkishShort": "Çene tümseği",
            "roots": "protuberantia (kabartı) + mentum (çene)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A triangular bony prominence at the midline of the anterior mandible forming the chin.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 688,
            "term": "Tuberculum Mentale",
            "english": "Mental Tubercle",
            "turkishDefinition": "Çene tümsekciği; çene tümseğinin her iki yanında yer alan küçük kabartı.",
            "turkishShort": "Çene tümsekciği",
            "roots": "tuberculum (küçük tümsek) + mentum (çene)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A small prominence on either side of the mental protuberance.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 689,
            "term": "Foramen Mentale",
            "english": "Mental Foramen",
            "turkishDefinition": "Çene deliği; alt çenenin gövdesinde yer alan, çene sinir ve damarlarının çıktığı delik.",
            "turkishShort": "Çene deliği",
            "roots": "foramen (delik) + mentum (çene)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "An opening on the body of the mandible through which the mental nerve and vessels exit.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 690,
            "term": "Linea Obliqua Mandibulae",
            "english": "Oblique Line of Mandible",
            "turkishDefinition": "Alt çene eğik çizgisi; alt çene gövdesinin dış yüzünde çene açısından öne doğru uzanan çizgi.",
            "turkishShort": "Alt çene eğik çizgisi",
            "roots": "linea (çizgi) + obliquus (eğik) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A line on the external surface of the mandibular body running forward from the angle.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 691,
            "term": "Fossa Digastrica",
            "english": "Digastric Fossa",
            "turkishDefinition": "Digastrik kas çukuru; alt çenenin iç-alt yüzünde digastrik kasın ön karnının başladığı küçük çukur.",
            "turkishShort": "Digastrik kas çukuru",
            "roots": "fossa (çukur) + digastricus (iki karınlı kas)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A small depression on the inner-lower surface of the mandible giving origin to the anterior belly of the digastric muscle.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 692,
            "term": "Spina Mentalis Superior",
            "english": "Superior Mental Spine",
            "turkishDefinition": "Üst çene dikeni; alt çenenin iç yüzünde orta hatta yer alan, genioglossus kasının tutunduğu üst çift diken.",
            "turkishShort": "Üst çene dikeni",
            "roots": "spina (diken) + mentum (çene) + superior (üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The upper pair of small spines on the internal surface of the mandibular midline, providing attachment for the genioglossus muscle.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 693,
            "term": "Spina Mentalis Inferior",
            "english": "Inferior Mental Spine",
            "turkishDefinition": "Alt çene dikeni; alt çenenin iç yüzünde orta hatta yer alan, geniohyoid kasının tutunduğu alt çift diken.",
            "turkishShort": "Alt çene dikeni",
            "roots": "spina (diken) + mentum (çene) + inferior (alt)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The lower pair of small spines on the internal surface of the mandibular midline, providing attachment for the geniohyoid muscle.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 694,
            "term": "Linea Mylohyoidea",
            "english": "Mylohyoid Line",
            "turkishDefinition": "Milohiyoid çizgi; alt çenenin iç yüzünde milohiyoid kasının tutunduğu eğik çizgi.",
            "turkishShort": "Milohiyoid çizgi",
            "roots": "linea (çizgi) + mylohyoideus (öğütücü diş-dilkemiği kasına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "An oblique line on the internal surface of the mandible providing attachment for the mylohyoid muscle.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 695,
            "term": "Torus Mandibularis",
            "english": "Mandibular Torus",
            "turkishDefinition": "Alt çene kemik çıkıntısı; alt çenenin iç yüzünde premolar diş bölgesinde bazı bireylerde görülen kemik kabartı.",
            "turkishShort": "Alt çene kemik çıkıntısı",
            "roots": "torus (kabartı, şişkinlik) + mandibularis (alt çeneye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A bony growth on the internal surface of the mandible near the premolar region, present in some individuals.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 696,
            "term": "Fovea Sublingualis",
            "english": "Sublingual Fossa",
            "turkishDefinition": "Dil altı bezi çukuru; alt çenenin iç yüzünde dil altı tükürük bezini barındıran çukur.",
            "turkishShort": "Dil altı bezi çukuru",
            "roots": "fovea (çukurcuk) + sublingualis (dil altına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A depression on the internal surface of the mandible that houses the sublingual salivary gland.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 697,
            "term": "Fovea Submandibularis",
            "english": "Submandibular Fossa",
            "turkishDefinition": "Çene altı bezi çukuru; alt çenenin iç yüzünde milohiyoid çizginin altında çene altı tükürük bezini barındıran çukur.",
            "turkishShort": "Çene altı bezi çukuru",
            "roots": "fovea (çukurcuk) + submandibularis (çene altına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A depression on the internal surface of the mandible, below the mylohyoid line, that houses the submandibular salivary gland.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 698,
            "term": "Pars Alveolaris Mandibulae",
            "english": "Alveolar Part of Mandible",
            "turkishDefinition": "Alt çene diş yuvası parçası; alt çene gövdesinin diş köklerini barındıran üst kısmı.",
            "turkishShort": "Alt çene diş yuvası parçası",
            "roots": "pars (bölüm) + alveolaris (diş yuvasına ait) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The upper part of the mandibular body that houses the roots of the teeth.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 699,
            "term": "Arcus Alveolaris Mandibulae",
            "english": "Alveolar Arch of Mandible",
            "turkishDefinition": "Alt çene diş yuvası kemeri; alt çenenin diş yuvalarının oluşturduğu kavisli kemer.",
            "turkishShort": "Alt çene diş yuvası kemeri",
            "roots": "arcus (kemer) + alveolaris (diş yuvasına ait) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The curved arch formed by the dental alveoli of the mandible.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 700,
            "term": "Alveoli Dentales Mandibulae",
            "english": "Dental Alveoli of Mandible",
            "turkishDefinition": "Alt çene diş yuvaları; alt çenede diş köklerinin yerleştiği çukurlar.",
            "turkishShort": "Alt çene diş yuvaları",
            "roots": "alveolus (küçük çukur, yuva) + dens (diş) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The sockets in the mandible that hold the roots of the teeth.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 701,
            "term": "Septa Interalveolaria Mandibulae",
            "english": "Interalveolar Septa of Mandible",
            "turkishDefinition": "Alt çene diş yuvaları arası bölmeler; komşu diş yuvalarını birbirinden ayıran ince kemik bölmeler.",
            "turkishShort": "Alt çene diş yuvaları arası bölmeler",
            "roots": "septum (bölme) + inter (arasında) + alveolus (küçük çukur, yuva) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "Thin bony partitions separating adjacent dental alveoli in the mandible.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 702,
            "term": "Septa Interradicularia Mandibulae",
            "english": "Interradicular Septa of Mandible",
            "turkishDefinition": "Alt çene kökler arası bölmeler; çok köklü dişlerin kökleri arasındaki kemik bölmeler.",
            "turkishShort": "Alt çene kökler arası bölmeler",
            "roots": "septum (bölme) + inter (arasında) + radix (kök) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "Bony partitions between the roots of multi-rooted teeth in the mandible.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 703,
            "term": "Juga Alveolaria Mandibulae",
            "english": "Alveolar Yokes of Mandible",
            "turkishDefinition": "Alt çene diş yuvası kabartıları; diş köklerinin üzerindeki kemik yüzeyde oluşturduğu hafif kabartılar.",
            "turkishShort": "Alt çene diş yuvası kabartıları",
            "roots": "jugum (kabartı, sırt) + alveolaris (diş yuvasına ait) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "Slight bony ridges on the surface of the mandible overlying the roots of the teeth.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 704,
            "term": "Trigonum Retromolare",
            "english": "Retromolar Triangle",
            "turkishDefinition": "Diş arkası üçgen; alt çenede son azı dişinin arkasında yer alan üçgen kemik alan.",
            "turkishShort": "Diş arkası üçgen",
            "roots": "trigonum (üçgen) + retro (arkasında) + molaris (azı dişine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A triangular bony area on the mandible behind the last molar tooth.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 705,
            "term": "Fossa Retromolaris",
            "english": "Retromolar Fossa",
            "turkishDefinition": "Diş arkası çukur; diş arkası üçgenin yanında yer alan sığ çukur.",
            "turkishShort": "Diş arkası çukur",
            "roots": "fossa (çukur) + retro (arkasında) + molaris (azı dişine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A shallow depression adjacent to the retromolar triangle.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 706,
            "term": "Ramus Mandibulae",
            "english": "Ramus of Mandible",
            "turkishDefinition": "Alt çene kolu; alt çene gövdesinin arka ucundan yukarı doğru uzanan dikey kemik kısmı.",
            "turkishShort": "Alt çene kolu",
            "roots": "ramus (dal, kol) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The vertical portion of the mandible extending upward from the posterior end of the body.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 707,
            "term": "Angulus Mandibulae",
            "english": "Angle of Mandible",
            "turkishDefinition": "Alt çene açısı; alt çene gövdesi ile kolunun birleştiği köşe.",
            "turkishShort": "Alt çene açısı",
            "roots": "angulus (açı, köşe) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The corner where the body and ramus of the mandible meet.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 708,
            "term": "Tuberositas Masseterica",
            "english": "Masseteric Tuberosity",
            "turkishDefinition": "Çiğneme kası pürtüğü; alt çene açısının dış yüzünde çiğneme kasının tutunduğu pürtüklü alan.",
            "turkishShort": "Çiğneme kası pürtüğü",
            "roots": "tuberositas (pürtük, kabarıklık) + masseter (çiğneme kası)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A rough area on the external surface of the mandibular angle providing attachment for the masseter muscle.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 709,
            "term": "Tuberositas Pterygoidea",
            "english": "Pterygoid Tuberosity",
            "turkishDefinition": "Pterigoid kas pürtüğü; alt çene açısının iç yüzünde iç kanatsı kasın tutunduğu pürtüklü alan.",
            "turkishShort": "Pterigoid kas pürtüğü",
            "roots": "tuberositas (pürtük, kabarıklık) + pterygoideus (kanat şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A rough area on the internal surface of the mandibular angle providing attachment for the medial pterygoid muscle.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 710,
            "term": "Foramen Mandibulae",
            "english": "Mandibular Foramen",
            "turkishDefinition": "Alt çene deliği; alt çene kolunun iç yüzünde alt alveoler sinir ve damarların girdiği delik.",
            "turkishShort": "Alt çene deliği",
            "roots": "foramen (delik) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "An opening on the internal surface of the ramus through which the inferior alveolar nerve and vessels enter.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 711,
            "term": "Lingula Mandibulae",
            "english": "Lingula of Mandible",
            "turkishDefinition": "Alt çene dilciği; alt çene deliğinin önünde yer alan, sfenomandibular bağın tutunduğu küçük dil şeklinde çıkıntı.",
            "turkishShort": "Alt çene dilciği",
            "roots": "lingula (küçük dil) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A small tongue-shaped projection anterior to the mandibular foramen, providing attachment for the sphenomandibular ligament.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 712,
            "term": "Canalis Mandibulae",
            "english": "Mandibular Canal",
            "turkishDefinition": "Alt çene kanalı; alt çene deliğinden başlayıp çene deliğine kadar uzanan, alt alveoler sinir ve damarları taşıyan kanal.",
            "turkishShort": "Alt çene kanalı",
            "roots": "canalis (kanal) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A canal running from the mandibular foramen to the mental foramen, transmitting the inferior alveolar nerve and vessels.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 713,
            "term": "Sulcus Mylohyoideus",
            "english": "Mylohyoid Groove",
            "turkishDefinition": "Milohiyoid oluk; alt çene dilciğinin altında milohiyoid sinir ve damarının seyrettiği oluk.",
            "turkishShort": "Milohiyoid oluk",
            "roots": "sulcus (oluk) + mylohyoideus (öğütücü diş-dilkemiği kasına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A groove below the lingula of the mandible that accommodates the mylohyoid nerve and vessels.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 714,
            "term": "Processus Coronoideus Mandibulae",
            "english": "Coronoid Process of Mandible",
            "turkishDefinition": "Alt çene taçsı çıkıntısı; alt çene kolunun ön-üst ucunda yer alan, temporal kasın tutunduğu üçgen çıkıntı.",
            "turkishShort": "Alt çene taçsı çıkıntısı",
            "roots": "processus (çıkıntı) + coronoideus (taç şeklinde) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A triangular projection at the anterosuperior end of the mandibular ramus, providing attachment for the temporalis muscle.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 715,
            "term": "Crista Temporalis Mandibulae",
            "english": "Temporal Crest of Mandible",
            "turkishDefinition": "Alt çene temporal ibiği; taçsı çıkıntının iç yüzünden aşağı uzanan, temporal kas tendonunun bir kısmının tutunduğu ibik.",
            "turkishShort": "Alt çene temporal ibiği",
            "roots": "crista (ibik) + temporalis (şakağa ait) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A ridge descending from the internal surface of the coronoid process, providing partial attachment for the temporalis tendon.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 716,
            "term": "Incisura Mandibulae",
            "english": "Mandibular Notch",
            "turkishDefinition": "Alt çene çentiği; taçsı çıkıntı ile lokma çıkıntısı arasındaki yarım ay şeklinde çentik.",
            "turkishShort": "Alt çene çentiği",
            "roots": "incisura (çentik) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A crescent-shaped notch between the coronoid process and the condylar process.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 717,
            "term": "Processus Condylaris",
            "english": "Condylar Process",
            "turkishDefinition": "Lokma çıkıntısı; alt çene kolunun arka-üst ucunda yer alan, çene eklemini oluşturan çıkıntı.",
            "turkishShort": "Lokma çıkıntısı",
            "roots": "processus (çıkıntı) + condylaris (kondile ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A projection at the posterosuperior end of the mandibular ramus that forms part of the temporomandibular joint.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 718,
            "term": "Collum Mandibulae",
            "english": "Neck of Mandible",
            "turkishDefinition": "Alt çene boynu; lokma çıkıntısının alt çene başını taşıyan, hafifçe daralmış kısmı.",
            "turkishShort": "Alt çene boynu",
            "roots": "collum (boyun) + mandibula (alt çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The slightly narrowed part of the condylar process supporting the head of the mandible.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 719,
            "term": "Fovea Pterygoidea",
            "english": "Pterygoid Fovea",
            "turkishDefinition": "Pterigoid çukurcuk; alt çene boynunun ön yüzünde dış kanatsı kasın tutunduğu küçük çukurcuk.",
            "turkishShort": "Pterigoid çukurcuk",
            "roots": "fovea (çukurcuk) + pterygoideus (kanat şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A small depression on the anterior surface of the neck of the mandible, providing attachment for the lateral pterygoid muscle.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 720,
            "term": "Os Hyoideum",
            "english": "Hyoid Bone",
            "turkishDefinition": "Dil kemiği; boyunda, çeneyle omurga arasında serbestçe asılı duran, hiçbir kemikle doğrudan eklemleşmeyen U şeklinde kemik.",
            "turkishShort": "Dil kemiği",
            "roots": "os (kemik) + hyoides (Y harfi şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A U-shaped bone in the neck, suspended freely between the mandible and the spine, articulating with no other bone.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 721,
            "term": "Corpus Ossis Hyoidei",
            "english": "Body of Hyoid Bone",
            "turkishDefinition": "Dil kemiği gövdesi; dil kemiğinin ortadaki yatay, kalınca kısmı.",
            "turkishShort": "Dil kemiği gövdesi",
            "roots": "corpus (gövde) + os hyoideum (dil kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "The horizontal, thickened central portion of the hyoid bone.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 722,
            "term": "Cornu Minus",
            "english": "Lesser Horn",
            "turkishDefinition": "Küçük boynuz; dil kemiği gövdesinden yukarı ve arkaya uzanan küçük çift çıkıntı.",
            "turkishShort": "Küçük boynuz",
            "roots": "cornu (boynuz) + minus (küçük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A small paired projection extending upward and backward from the body of the hyoid bone.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 723,
            "term": "Cornu Majus",
            "english": "Greater Horn",
            "turkishDefinition": "Büyük boynuz; dil kemiği gövdesinden arkaya ve yukarı uzanan, dil kökü kaslarının tutunduğu daha uzun çift çıkıntı.",
            "turkishShort": "Büyük boynuz",
            "roots": "cornu (boynuz) + majus (büyük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "englishDefinition": "A longer paired projection extending backward and upward from the body of the hyoid bone, providing attachment for muscles of the tongue base.",
            "createdAt": {
                "_seconds": 1789201616,
                "_nanoseconds": 546000000
            }
        },
        {
            "id": 724,
            "term": "Corpus Maxillae",
            "english": "Body of Maxilla",
            "turkishDefinition": "Üst çene gövdesi; üst çene kemiğinin ana, merkezi kısmı, içinde maksiller sinüsü barındırır.",
            "roots": "corpus (gövde) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene gövdesi",
            "englishDefinition": "The main, central part of the maxilla, containing the maxillary sinus."
        },
        {
            "id": 725,
            "term": "Facies Orbitalis Maxillae",
            "english": "Orbital Surface of Maxilla",
            "turkishDefinition": "Üst çene göz çukuru yüzü; üst çene gövdesinin göz çukurunun tabanını oluşturan üçgen yüzeyi.",
            "roots": "facies (yüz) + orbitalis (göz çukuruna ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene göz çukuru yüzü",
            "englishDefinition": "The triangular surface of the maxillary body forming the floor of the orbit."
        },
        {
            "id": 726,
            "term": "Canalis Infraorbitalis",
            "english": "Infraorbital Canal",
            "turkishDefinition": "Göz çukuru altı kanalı; göz çukuru tabanında infraorbital sinir ve damarları taşıyan kanal.",
            "roots": "canalis (kanal) + infra (altında) + orbitalis (göz çukuruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Göz çukuru altı kanalı",
            "englishDefinition": "A canal in the floor of the orbit that transmits the infraorbital nerve and vessels."
        },
        {
            "id": 727,
            "term": "Sulcus Infraorbitalis",
            "english": "Infraorbital Groove",
            "turkishDefinition": "Göz çukuru altı oluğu; kanalis infraorbitalis'in arka kısmında yer alan, öne doğru kanala dönüşen oluk.",
            "roots": "sulcus (oluk) + infra (altında) + orbitalis (göz çukuruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Göz çukuru altı oluğu",
            "englishDefinition": "A groove in the posterior part of the orbital floor that becomes the infraorbital canal anteriorly."
        },
        {
            "id": 728,
            "term": "Margo Infraorbitalis Maxillae",
            "english": "Infraorbital Margin of Maxilla",
            "turkishDefinition": "Üst çene göz çukuru alt kenarı; üst çenenin göz çukurunun alt sınırını oluşturan kenar.",
            "roots": "margo (kenar) + infra (altında) + orbitalis (göz çukuruna ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene göz çukuru alt kenarı",
            "englishDefinition": "The border of the maxilla forming the lower margin of the orbit."
        },
        {
            "id": 729,
            "term": "Facies Anterior Maxillae",
            "english": "Anterior Surface of Maxilla",
            "turkishDefinition": "Üst çene ön yüzü; üst çene gövdesinin yüz derisinin altında kalan ön yüzeyi.",
            "roots": "facies (yüz) + anterior (ön) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene ön yüzü",
            "englishDefinition": "The anterior surface of the maxillary body, lying beneath the facial skin."
        },
        {
            "id": 730,
            "term": "Foramen Infraorbitale",
            "english": "Infraorbital Foramen",
            "turkishDefinition": "Göz çukuru altı deliği; infraorbital sinir ve damarların yüze çıktığı delik.",
            "roots": "foramen (delik) + infra (altında) + orbitalis (göz çukuruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Göz çukuru altı deliği",
            "englishDefinition": "An opening through which the infraorbital nerve and vessels emerge onto the face."
        },
        {
            "id": 731,
            "term": "Fossa Canina",
            "english": "Canine Fossa",
            "turkishDefinition": "Köpek dişi çukuru; üst çene ön yüzünde köpek dişi kökünün üzerinde yer alan çukur.",
            "roots": "fossa (çukur) + caninus (köpek dişine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Köpek dişi çukuru",
            "englishDefinition": "A depression on the anterior surface of the maxilla above the root of the canine tooth."
        },
        {
            "id": 732,
            "term": "Incisura Nasalis Maxillae",
            "english": "Nasal Notch of Maxilla",
            "turkishDefinition": "Üst çene burun çentiği; üst çenenin burun boşluğunun yan sınırını oluşturan kavisli çentik.",
            "roots": "incisura (çentik) + nasalis (buruna ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene burun çentiği",
            "englishDefinition": "The curved notch of the maxilla forming the lateral boundary of the nasal cavity opening."
        },
        {
            "id": 733,
            "term": "Spina Nasalis Anterior",
            "english": "Anterior Nasal Spine",
            "turkishDefinition": "Ön burun dikeni; iki üst çenenin birleşim yerinde burun çentiğinin altında öne uzanan sivri çıkıntı.",
            "roots": "spina (diken) + nasalis (buruna ait) + anterior (ön)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Ön burun dikeni",
            "englishDefinition": "A pointed projection at the junction of the two maxillae, below the nasal notch."
        },
        {
            "id": 735,
            "term": "Facies Infratemporalis Maxillae",
            "english": "Infratemporal Surface of Maxilla",
            "turkishDefinition": "Üst çene şakak altı yüzü; üst çene gövdesinin şakak altı çukuruna bakan arka yüzeyi.",
            "roots": "facies (yüz) + infra (altında) + temporalis (şakağa ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene şakak altı yüzü",
            "englishDefinition": "The posterior surface of the maxillary body facing the infratemporal fossa."
        },
        {
            "id": 736,
            "term": "Foramina Alveolaria",
            "english": "Alveolar Foramina",
            "turkishDefinition": "Diş yuvası delikleri; üst çenenin şakak altı yüzünde arka üst diş sinirlerinin geçtiği delikler.",
            "roots": "foramen (delik) + alveolaris (diş yuvasına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Diş yuvası delikleri",
            "englishDefinition": "Openings on the infratemporal surface of the maxilla through which the posterior superior alveolar nerves pass."
        },
        {
            "id": 737,
            "term": "Canales Alveolares",
            "english": "Alveolar Canals",
            "turkishDefinition": "Diş yuvası kanalları; diş yuvası deliklerinden devam eden, arka üst diş sinir ve damarlarını taşıyan kanallar.",
            "roots": "canalis (kanal) + alveolaris (diş yuvasına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Diş yuvası kanalları",
            "englishDefinition": "Canals continuing from the alveolar foramina that transmit the posterior superior alveolar nerves and vessels."
        },
        {
            "id": 738,
            "term": "Tuber Maxillae",
            "english": "Maxillary Tuberosity",
            "turkishDefinition": "Üst çene tümseği (eş anlamlısı: Eminentia Maxillae); üst çenenin şakak altı yüzünün arka-alt köşesindeki kabartı.",
            "roots": "tuber (tümsek) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene tümseği",
            "englishDefinition": "A rounded prominence at the posteroinferior corner of the infratemporal surface of the maxilla."
        },
        {
            "id": 739,
            "term": "Facies Nasalis Maxillae",
            "english": "Nasal Surface of Maxilla",
            "turkishDefinition": "Üst çene burun yüzü; üst çene gövdesinin burun boşluğuna bakan iç yüzeyi.",
            "roots": "facies (yüz) + nasalis (buruna ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene burun yüzü",
            "englishDefinition": "The medial surface of the maxillary body facing the nasal cavity."
        },
        {
            "id": 740,
            "term": "Sulcus Lacrimalis Maxillae",
            "english": "Lacrimal Groove of Maxilla",
            "turkishDefinition": "Üst çene gözyaşı oluğu; üst çenenin burun yüzünde nazolakrimal kanalın bir kısmını oluşturan oluk.",
            "roots": "sulcus (oluk) + lacrimalis (gözyaşına ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene gözyaşı oluğu",
            "englishDefinition": "A groove on the nasal surface of the maxilla forming part of the nasolacrimal canal."
        },
        {
            "id": 741,
            "term": "Crista Conchalis Maxillae",
            "english": "Conchal Crest of Maxilla",
            "turkishDefinition": "Üst çene konka ibiği; üst çenenin burun yüzünde alt burun konkasının tutunduğu yatay ibik.",
            "roots": "crista (ibik) + concha (kabuk, konka) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene konka ibiği",
            "englishDefinition": "A horizontal ridge on the nasal surface of the maxilla providing attachment for the inferior nasal concha."
        },
        {
            "id": 742,
            "term": "Margo Lacrimalis Maxillae",
            "english": "Lacrimal Margin of Maxilla",
            "turkishDefinition": "Üst çene gözyaşı kenarı; üst çenenin gözyaşı kemiğiyle birleştiği arka kenar.",
            "roots": "margo (kenar) + lacrimalis (gözyaşına ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene gözyaşı kenarı",
            "englishDefinition": "The posterior border of the maxilla that articulates with the lacrimal bone."
        },
        {
            "id": 743,
            "term": "Hiatus Maxillaris",
            "english": "Maxillary Hiatus",
            "turkishDefinition": "Üst çene sinüs ağzı; üst çenenin burun yüzünde maksiller sinüsün burun boşluğuna açıldığı geniş açıklık.",
            "roots": "hiatus (geçit, açıklık) + maxillaris (üst çeneye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene sinüs ağzı",
            "englishDefinition": "A large opening on the nasal surface of the maxilla through which the maxillary sinus communicates with the nasal cavity."
        },
        {
            "id": 744,
            "term": "Sulcus Palatinus Major Maxillae",
            "english": "Greater Palatine Groove of Maxilla",
            "turkishDefinition": "Üst çene büyük damak oluğu; üst çenenin damak çıkıntısında büyük damak sinir ve damarının seyrettiği oluk.",
            "roots": "sulcus (oluk) + palatinus (damağa ait) + major (büyük) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene büyük damak oluğu",
            "englishDefinition": "A groove on the palatine process of the maxilla that accommodates the greater palatine nerve and vessels."
        },
        {
            "id": 745,
            "term": "Sinus Maxillaris",
            "english": "Maxillary Sinus",
            "turkishDefinition": "Maksiller sinüs (Highmore boşluğu); üst çene gövdesinin içinde bulunan en büyük paranazal sinüs.",
            "roots": "sinus (boşluk) + maxillaris (üst çeneye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Maksiller sinüs",
            "englishDefinition": "The largest paranasal sinus, located within the body of the maxilla."
        },
        {
            "id": 746,
            "term": "Processus Frontalis Maxillae",
            "english": "Frontal Process of Maxilla",
            "turkishDefinition": "Üst çene alın çıkıntısı; üst çene gövdesinden yukarı uzanarak alın kemiğiyle birleşen çıkıntı.",
            "roots": "processus (çıkıntı) + frontalis (alına ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene alın çıkıntısı",
            "englishDefinition": "A projection of the maxilla extending upward to articulate with the frontal bone."
        },
        {
            "id": 747,
            "term": "Crista Lacrimalis Anterior",
            "english": "Anterior Lacrimal Crest",
            "turkishDefinition": "Ön gözyaşı ibiği; üst çenenin alın çıkıntısının iç yüzünde yer alan, gözyaşı kesesi çukurunun ön sınırını oluşturan ibik.",
            "roots": "crista (ibik) + lacrimalis (gözyaşına ait) + anterior (ön)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Ön gözyaşı ibiği",
            "englishDefinition": "A ridge on the frontal process of the maxilla forming the anterior boundary of the lacrimal sac fossa."
        },
        {
            "id": 748,
            "term": "Incisura Lacrimalis Maxillae",
            "english": "Lacrimal Notch of Maxilla",
            "turkishDefinition": "Üst çene gözyaşı çentiği; üst çenenin alın çıkıntısında gözyaşı kemiğini kabul eden çentik.",
            "roots": "incisura (çentik) + lacrimalis (gözyaşına ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene gözyaşı çentiği",
            "englishDefinition": "A notch on the frontal process of the maxilla that receives the lacrimal bone."
        },
        {
            "id": 749,
            "term": "Crista Ethmoidalis Maxillae",
            "english": "Ethmoidal Crest of Maxilla",
            "turkishDefinition": "Üst çene kalbur ibiği; üst çenenin burun yüzünde orta burun konkasının tutunduğu ibik.",
            "roots": "crista (ibik) + ethmoidalis (kalbur kemiğine ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene kalbur ibiği",
            "englishDefinition": "A ridge on the nasal surface of the maxilla providing attachment for the middle nasal concha."
        },
        {
            "id": 750,
            "term": "Processus Zygomaticus Maxillae",
            "english": "Zygomatic Process of Maxilla",
            "turkishDefinition": "Üst çene elmacık çıkıntısı; üst çene gövdesinden yana uzanarak elmacık kemiğiyle birleşen çıkıntı.",
            "roots": "processus (çıkıntı) + zygomaticus (elmacığa ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene elmacık çıkıntısı",
            "englishDefinition": "A projection of the maxilla extending laterally to articulate with the zygomatic bone."
        },
        {
            "id": 751,
            "term": "Processus Palatinus",
            "english": "Palatine Process",
            "turkishDefinition": "Damak çıkıntısı; üst çene gövdesinden içe doğru uzanan, sert damağın büyük kısmını oluşturan yatay plaka.",
            "roots": "processus (çıkıntı) + palatinus (damağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak çıkıntısı",
            "englishDefinition": "A horizontal plate projecting medially from the maxilla, forming most of the hard palate."
        },
        {
            "id": 752,
            "term": "Crista Nasalis Maxillae",
            "english": "Nasal Crest of Maxilla",
            "turkishDefinition": "Üst çene burun ibiği; damak çıkıntısının üst yüzünde orta hatta uzanan, burun bölmesinin tutunduğu ibik.",
            "roots": "crista (ibik) + nasalis (buruna ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene burun ibiği",
            "englishDefinition": "A midline ridge on the superior surface of the palatine process, providing attachment for the nasal septum."
        },
        {
            "id": 753,
            "term": "Os Incisivum",
            "english": "Incisive Bone",
            "turkishDefinition": "Kesici kemik (eş anlamlısı: Premaxilla); üst çenenin kesici dişleri taşıyan, embriyonik dönemde ayrı olan ön kısmı.",
            "roots": "os (kemik) + incisivus (kesici)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Kesici kemik",
            "englishDefinition": "The anterior part of the maxilla bearing the incisor teeth, separate from the rest of the maxilla in the embryonic stage."
        },
        {
            "id": 754,
            "term": "Canales Incisivi",
            "english": "Incisive Canals",
            "turkishDefinition": "Kesici diş kanalları; kesici delikten sert damağa uzanan, nazopalatin sinirlerini taşıyan çift kanal.",
            "roots": "canalis (kanal) + incisivus (kesici)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Kesici diş kanalları",
            "englishDefinition": "Paired canals extending from the incisive foramen to the hard palate, transmitting the nasopalatine nerves."
        },
        {
            "id": 755,
            "term": "Sutura Incisiva",
            "english": "Incisive Suture",
            "turkishDefinition": "Kesici diş dikişi; kesici kemik ile üst çenenin geri kalanı arasındaki, bazı bireylerde görülebilen dikiş izi.",
            "roots": "sutura (dikiş) + incisivus (kesici)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Kesici diş dikişi",
            "englishDefinition": "The suture line between the incisive bone and the rest of the maxilla, occasionally visible in some individuals."
        },
        {
            "id": 756,
            "term": "Spinae Palatinae",
            "english": "Palatine Spines",
            "turkishDefinition": "Damak dikenleri; damak çıkıntısının alt yüzünde yer alan küçük kemik çıkıntılar.",
            "roots": "spina (diken) + palatinus (damağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak dikenleri",
            "englishDefinition": "Small bony projections on the inferior surface of the palatine process."
        },
        {
            "id": 757,
            "term": "Sulci Palatini",
            "english": "Palatine Grooves",
            "turkishDefinition": "Damak olukları; damak çıkıntısının alt yüzünde damak sinir ve damarlarının seyrettiği oluklar.",
            "roots": "sulcus (oluk) + palatinus (damağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak olukları",
            "englishDefinition": "Grooves on the inferior surface of the palatine process that accommodate palatine nerves and vessels."
        },
        {
            "id": 758,
            "term": "Processus Alveolaris Maxillae",
            "english": "Alveolar Process of Maxilla",
            "turkishDefinition": "Üst çene diş yuvası çıkıntısı; üst çene gövdesinin diş köklerini barındıran aşağı doğru kalınlaşmış kısmı.",
            "roots": "processus (çıkıntı) + alveolaris (diş yuvasına ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene diş yuvası çıkıntısı",
            "englishDefinition": "The thickened inferior part of the maxillary body that houses the roots of the teeth."
        },
        {
            "id": 759,
            "term": "Arcus Alveolaris Maxillae",
            "english": "Alveolar Arch of Maxilla",
            "turkishDefinition": "Üst çene diş yuvası kemeri; üst çenenin diş yuvalarının oluşturduğu kavisli kemer.",
            "roots": "arcus (kemer) + alveolaris (diş yuvasına ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene diş yuvası kemeri",
            "englishDefinition": "The curved arch formed by the dental alveoli of the maxilla."
        },
        {
            "id": 760,
            "term": "Alveoli Dentales Maxillae",
            "english": "Dental Alveoli of Maxilla",
            "turkishDefinition": "Üst çene diş yuvaları; üst çenede diş köklerinin yerleştiği çukurlar.",
            "roots": "alveolus (küçük çukur, yuva) + dens (diş) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene diş yuvaları",
            "englishDefinition": "The sockets in the maxilla that hold the roots of the teeth."
        },
        {
            "id": 761,
            "term": "Septa Interalveolaria Maxillae",
            "english": "Interalveolar Septa of Maxilla",
            "turkishDefinition": "Üst çene diş yuvaları arası bölmeler; komşu diş yuvalarını birbirinden ayıran ince kemik bölmeler.",
            "roots": "septum (bölme) + inter (arasında) + alveolus (küçük çukur, yuva) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene diş yuvaları arası bölmeler",
            "englishDefinition": "Thin bony partitions separating adjacent dental alveoli in the maxilla."
        },
        {
            "id": 762,
            "term": "Septa Interradicularia Maxillae",
            "english": "Interradicular Septa of Maxilla",
            "turkishDefinition": "Üst çene kökler arası bölmeler; çok köklü dişlerin kökleri arasındaki kemik bölmeler.",
            "roots": "septum (bölme) + inter (arasında) + radix (kök) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene kökler arası bölmeler",
            "englishDefinition": "Bony partitions between the roots of multi-rooted teeth in the maxilla."
        },
        {
            "id": 763,
            "term": "Juga Alveolaria Maxillae",
            "english": "Alveolar Yokes of Maxilla",
            "turkishDefinition": "Üst çene diş yuvası kabartıları; diş köklerinin üzerindeki kemik yüzeyde oluşturduğu hafif kabartılar.",
            "roots": "jugum (kabartı, sırt) + alveolaris (diş yuvasına ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst çene diş yuvası kabartıları",
            "englishDefinition": "Slight bony ridges on the surface of the maxilla overlying the roots of the teeth."
        },
        {
            "id": 764,
            "term": "Foramina Incisiva",
            "english": "Incisive Foramina",
            "turkishDefinition": "Kesici delikler; sert damağın ön kısmında kesici kanalın açıldığı delikler.",
            "roots": "foramen (delik) + incisivus (kesici)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Kesici delikler",
            "englishDefinition": "Openings at the anterior part of the hard palate through which the incisive canals open."
        },
        {
            "id": 765,
            "term": "Lamina Perpendicularis Ossis Palatini",
            "english": "Perpendicular Plate of Palatine Bone",
            "turkishDefinition": "Damak kemiği dikey tabakası; damak kemiğinin burun boşluğunun yan duvarına katkıda bulunan dikey plaka.",
            "roots": "lamina (tabaka, plaka) + perpendicularis (dik) + os palatinum (damak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak kemiği dikey tabakası",
            "englishDefinition": "The vertical plate of the palatine bone contributing to the lateral wall of the nasal cavity."
        },
        {
            "id": 766,
            "term": "Facies Nasalis Ossis Palatini",
            "english": "Nasal Surface of Palatine Bone",
            "turkishDefinition": "Damak kemiği burun yüzü; damak kemiğinin dikey tabakasının burun boşluğuna bakan yüzü.",
            "roots": "facies (yüz) + nasalis (buruna ait) + os palatinum (damak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak kemiği burun yüzü",
            "englishDefinition": "The surface of the perpendicular plate of the palatine bone facing the nasal cavity."
        },
        {
            "id": 767,
            "term": "Facies Maxillaris Ossis Palatini",
            "english": "Maxillary Surface of Palatine Bone",
            "turkishDefinition": "Damak kemiği üst çene yüzü; damak kemiğinin dikey tabakasının üst çeneye bakan dış yüzü.",
            "roots": "facies (yüz) + maxillaris (üst çeneye ait) + os palatinum (damak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak kemiği üst çene yüzü",
            "englishDefinition": "The lateral surface of the perpendicular plate of the palatine bone facing the maxilla."
        },
        {
            "id": 768,
            "term": "Incisura Sphenopalatina",
            "english": "Sphenopalatine Notch",
            "turkishDefinition": "Kama-damak çentiği; damak kemiğinin dikey tabakasının üst kenarında yer alan, sfenopalatin foramen'i oluşturan çentik.",
            "roots": "incisura (çentik) + sphenoidalis (kama kemiğine ait) + palatinus (damağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Kama-damak çentiği",
            "englishDefinition": "A notch on the superior border of the perpendicular plate of the palatine bone that forms the sphenopalatine foramen."
        },
        {
            "id": 769,
            "term": "Sulcus Palatinus Major Ossis Palatini",
            "english": "Greater Palatine Groove of Palatine Bone",
            "turkishDefinition": "Damak kemiği büyük damak oluğu; damak kemiğinin dikey tabakasında büyük damak sinir ve damarının seyrettiği oluk.",
            "roots": "sulcus (oluk) + palatinus (damağa ait) + major (büyük) + os palatinum (damak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak kemiği büyük damak oluğu",
            "englishDefinition": "A groove on the perpendicular plate of the palatine bone that accommodates the greater palatine nerve and vessels."
        },
        {
            "id": 770,
            "term": "Processus Pyramidalis",
            "english": "Pyramidal Process",
            "turkishDefinition": "Piramidal çıkıntı; damak kemiğinin dikey ve yatay tabakalarının birleşim yerinden arkaya uzanan çıkıntı.",
            "roots": "processus (çıkıntı) + pyramidalis (piramit şeklinde)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Piramidal çıkıntı",
            "englishDefinition": "A projection of the palatine bone extending backward from the junction of the perpendicular and horizontal plates."
        },
        {
            "id": 771,
            "term": "Canales Palatini Minores",
            "english": "Lesser Palatine Canals",
            "turkishDefinition": "Küçük damak kanalları; piramidal çıkıntı içinde küçük damak sinirlerini taşıyan kanallar.",
            "roots": "canalis (kanal) + palatinus (damağa ait) + minor (küçük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Küçük damak kanalları",
            "englishDefinition": "Canals within the pyramidal process that transmit the lesser palatine nerves."
        },
        {
            "id": 772,
            "term": "Crista Conchalis Ossis Palatini",
            "english": "Conchal Crest of Palatine Bone",
            "turkishDefinition": "Damak kemiği konka ibiği; damak kemiğinin dikey tabakasında alt burun konkasının tutunduğu ibik.",
            "roots": "crista (ibik) + concha (kabuk, konka) + os palatinum (damak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak kemiği konka ibiği",
            "englishDefinition": "A ridge on the perpendicular plate of the palatine bone providing attachment for the inferior nasal concha."
        },
        {
            "id": 773,
            "term": "Crista Ethmoidalis Ossis Palatini",
            "english": "Ethmoidal Crest of Palatine Bone",
            "turkishDefinition": "Damak kemiği kalbur ibiği; damak kemiğinin dikey tabakasında orta burun konkasının tutunduğu ibik.",
            "roots": "crista (ibik) + ethmoidalis (kalbur kemiğine ait) + os palatinum (damak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak kemiği kalbur ibiği",
            "englishDefinition": "A ridge on the perpendicular plate of the palatine bone providing attachment for the middle nasal concha."
        },
        {
            "id": 774,
            "term": "Processus Orbitalis",
            "english": "Orbital Process",
            "turkishDefinition": "Göz çukuru çıkıntısı; damak kemiğinin dikey tabakasının üst ucundan öne-yana uzanan, göz çukurunun tabanına katkıda bulunan çıkıntı.",
            "roots": "processus (çıkıntı) + orbitalis (göz çukuruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Göz çukuru çıkıntısı",
            "englishDefinition": "A projection from the superior end of the perpendicular plate of the palatine bone contributing to the floor of the orbit."
        },
        {
            "id": 775,
            "term": "Processus Sphenoidalis Ossis Palatini",
            "english": "Sphenoidal Process of Palatine Bone",
            "turkishDefinition": "Damak kemiği kama kemik çıkıntısı; damak kemiğinin dikey tabakasının üst ucundan arkaya-içe uzanan, sfenoid kemiğe komşu çıkıntı.",
            "roots": "processus (çıkıntı) + sphenoidalis (kama kemiğine ait) + os palatinum (damak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak kemiği kama kemik çıkıntısı",
            "englishDefinition": "A projection from the superior end of the perpendicular plate of the palatine bone, adjacent to the sphenoid bone."
        },
        {
            "id": 776,
            "term": "Lamina Horizontalis",
            "english": "Horizontal Plate",
            "turkishDefinition": "Yatay tabaka; damak kemiğinin dikey tabakadan içe uzanan, sert damağın arka kısmını oluşturan yatay parçası.",
            "roots": "lamina (tabaka, plaka) + horizontalis (yatay)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Yatay tabaka",
            "englishDefinition": "The horizontal portion of the palatine bone extending medially from the perpendicular plate, forming the posterior part of the hard palate."
        },
        {
            "id": 777,
            "term": "Facies Nasalis Laminae Horizontalis",
            "english": "Nasal Surface of Horizontal Plate",
            "turkishDefinition": "Yatay tabakanın burun yüzü; damak kemiğinin yatay tabakasının burun boşluğuna bakan üst yüzü.",
            "roots": "facies (yüz) + nasalis (buruna ait) + lamina horizontalis (yatay tabaka)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Yatay tabakanın burun yüzü",
            "englishDefinition": "The superior surface of the horizontal plate of the palatine bone, facing the nasal cavity."
        },
        {
            "id": 778,
            "term": "Facies Palatina",
            "english": "Palatine Surface",
            "turkishDefinition": "Damak yüzü; damak kemiğinin yatay tabakasının ağız boşluğuna bakan alt yüzü.",
            "roots": "facies (yüz) + palatinus (damağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak yüzü",
            "englishDefinition": "The inferior surface of the horizontal plate of the palatine bone, facing the oral cavity."
        },
        {
            "id": 779,
            "term": "Foramina Palatina Minora Ossis Palatini",
            "english": "Lesser Palatine Foramina of Palatine Bone",
            "turkishDefinition": "Damak kemiği küçük damak delikleri; piramidal çıkıntıda küçük damak sinirlerinin ağza çıktığı delikler.",
            "roots": "foramen (delik) + palatinus (damağa ait) + minor (küçük) + os palatinum (damak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak kemiği küçük damak delikleri",
            "englishDefinition": "Openings in the pyramidal process through which the lesser palatine nerves emerge into the oral cavity."
        },
        {
            "id": 780,
            "term": "Spina Nasalis Posterior",
            "english": "Posterior Nasal Spine",
            "turkishDefinition": "Arka burun dikeni; iki damak kemiğinin yatay tabakalarının birleşim yerinde arkaya uzanan sivri çıkıntı.",
            "roots": "spina (diken) + nasalis (buruna ait) + posterior (arka)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Arka burun dikeni",
            "englishDefinition": "A pointed projection at the junction of the horizontal plates of the two palatine bones, extending posteriorly."
        },
        {
            "id": 781,
            "term": "Crista Nasalis Ossis Palatini",
            "english": "Nasal Crest of Palatine Bone",
            "turkishDefinition": "Damak kemiği burun ibiği; yatay tabakanın üst yüzünde orta hatta uzanan, burun bölmesinin tutunduğu ibik.",
            "roots": "crista (ibik) + nasalis (buruna ait) + os palatinum (damak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak kemiği burun ibiği",
            "englishDefinition": "A midline ridge on the superior surface of the horizontal plate, providing attachment for the nasal septum."
        },
        {
            "id": 782,
            "term": "Crista Palatina",
            "english": "Palatine Crest",
            "turkishDefinition": "Damak ibiği; yatay tabakanın alt yüzünde yer alan, damak dikişinin güçlendirilmesine katkıda bulunan enine ibik.",
            "roots": "crista (ibik) + palatinus (damağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Damak ibiği",
            "englishDefinition": "A transverse ridge on the inferior surface of the horizontal plate that reinforces the palatine suture."
        }
    ],
    "spine_joints": [
        {
            "id": 15,
            "term": "Columna Vertebralis",
            "category": "anatomy",
            "system": "movement",
            "english": "Vertebral Column (Spine)",
            "englishDefinition": "The bony axis of the trunk formed by 33 vertebrae, divided into cervical, thoracic, lumbar, sacral, and coccygeal regions.",
            "roots": "columna (sütun) + vertebralis (omura ait)",
            "subcategory": "spine_joints",
            "turkishDefinition": "Omurga; 33 vertebradan oluşan, gövdenin ana eksenini oluşturan kemik yapı. Cervical, thoracic, lumbal, sakral ve koksigeal bölümlere ayrılır.",
            "turkishShort": "Omurga",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 151,
            "term": "Columna Vertebralis",
            "english": "Vertebral Column (Spine)",
            "roots": "columna (sütun) + vertebralis (omura ait)",
            "turkishDefinition": "Omurga; 33 vertebradan oluşan, gövdenin ana eksenini oluşturan kemik yapı. Cervical, thoracic, lumbal, sakral ve koksigeal bölümlere ayrılır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Omurga",
            "turkish": "Vertebral Column (Spine)",
            "definition": "Omurga; 33 vertebradan oluşan, gövdenin ana eksenini oluşturan kemik yapı. Cervical, thoracic, lumbal, sakral ve koksigeal bölümlere ayrılır.",
            "englishDefinition": "The bony axis of the trunk, made up of 33 vertebrae divided into cervical, thoracic, lumbar, sacral, and coccygeal regions."
        },
        {
            "id": 152,
            "term": "Articulatio Zygapophysialis",
            "english": "Zygapophyseal Joint (Facet Joint)",
            "roots": "articulatio (eklem) + zygon (bağlantı) + physis (çıkıntı)",
            "turkishDefinition": "Zigapofizyal eklem (faset eklem); komşu vertebraların processus articularis'leri arasındaki düzlem tipi sinovyal eklem. Omurganın hareket yönünü ve derecesini belirler.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Zigapofizyal eklem (faset eklem)",
            "turkish": "Zygapophyseal Joint (Facet Joint)",
            "definition": "Zigapofizyal eklem (faset eklem); komşu vertebraların processus articularis'leri arasındaki düzlem tipi sinovyal eklem. Omurganın hareket yönünü ve derecesini belirler.",
            "englishDefinition": "A plane synovial joint between the articular processes of adjacent vertebrae that guides the direction and extent of spinal movement.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 153,
            "roots": "discus (disk) + inter (arasında) + vertebra (omur)",
            "turkishDefinition": "İntervertebral disk; komşu vertebra korpuslarını birbirine bağlayan fibrokartilaj yapı. Dış kısmı annulus fibrosus, iç kısmı nucleus pulposus'tan oluşur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "İntervertebral disk",
            "turkish": "Intervertebral Disc",
            "english": "Intervertebral Disc",
            "definition": "İntervertebral disk; komşu vertebra korpuslarını birbirine bağlayan fibrokartilaj yapı. Dış kısmı annulus fibrosus, iç kısmı nucleus pulposus'tan oluşur.",
            "englishDefinition": "A fibrocartilaginous structure linking adjacent vertebral bodies, composed of an outer annulus fibrosus and inner nucleus pulposus.",
            "term": "Discus Intervertebralis",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 154,
            "term": "Nucleus Pulposus",
            "english": "Nucleus Pulposus",
            "roots": "nucleus (çekirdek) + pulposus (etli, yumuşak)",
            "turkishDefinition": "Nükleus pulpozus; intervertebral diskin jel benzeri iç kısmı. Yüksek su içeriğiyle yük dağılımını ve şok emilimini sağlar; yaşla birlikte su kaybederek dejenerasyona uğrar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Nükleus pulpozus",
            "turkish": "Nucleus Pulposus",
            "definition": "Nükleus pulpozus; intervertebral diskin jel benzeri iç kısmı. Yüksek su içeriğiyle yük dağılımını ve şok emilimini sağlar; yaşla birlikte su kaybederek dejenerasyona uğrar.",
            "englishDefinition": "The gel-like inner core of the intervertebral disc that distributes load and absorbs shock due to its high water content.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 155,
            "term": "Annulus Fibrosus",
            "english": "Annulus Fibrosus",
            "roots": "annulus (halka) + fibrosus (lifli)",
            "turkishDefinition": "Anulus fibrosus; intervertebral diskin dış kısmını oluşturan konsantrik kollajen lif tabakaları. Nucleus pulposus'u çevreler ve diskin bütünlüğünü korur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Anulus fibrosus",
            "turkish": "Annulus Fibrosus",
            "definition": "Anulus fibrosus; intervertebral diskin dış kısmını oluşturan konsantrik kollajen lif tabakaları. Nucleus pulposus'u çevreler ve diskin bütünlüğünü korur.",
            "englishDefinition": "The outer portion of the intervertebral disc, made of concentric layers of collagen fibers surrounding the nucleus pulposus.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 156,
            "term": "Ligamentum Longitudinale Anterius",
            "english": "Anterior Longitudinal Ligament",
            "roots": "ligamentum (bağ) + longitudinalis (boylamsal) + anterius (ön)",
            "turkishDefinition": "Ön longitudinal bağ; vertebra korpuslarının ön yüzü boyunca kafa tabanından sakruma kadar uzanan güçlü bağ. Omurganın aşırı ekstansiyonunu sınırlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Ön longitudinal bağ",
            "turkish": "Anterior Longitudinal Ligament",
            "definition": "Ön longitudinal bağ; vertebra korpuslarının ön yüzü boyunca kafa tabanından sakruma kadar uzanan güçlü bağ. Omurganın aşırı ekstansiyonunu sınırlar.",
            "englishDefinition": "A strong ligament running along the anterior surface of the vertebral bodies from the skull base to the sacrum, limiting excessive spinal extension.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 157,
            "term": "Ligamentum Longitudinale Posterius",
            "english": "Posterior Longitudinal Ligament",
            "roots": "ligamentum (bağ) + longitudinalis (boylamsal) + posterius (arka)",
            "turkishDefinition": "Arka longitudinal bağ; vertebra korpuslarının arka yüzü boyunca, canalis vertebralis içinde uzanan bağ. Omurganın aşırı fleksiyonunu ve disk herniasyonunu sınırlamaya yardımcı olur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Arka longitudinal bağ",
            "turkish": "Posterior Longitudinal Ligament",
            "definition": "Arka longitudinal bağ; vertebra korpuslarının arka yüzü boyunca, canalis vertebralis içinde uzanan bağ. Omurganın aşırı fleksiyonunu ve disk herniasyonunu sınırlamaya yardımcı olur.",
            "englishDefinition": "A ligament running along the posterior surface of the vertebral bodies within the vertebral canal, helping to limit excessive spinal flexion.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 158,
            "term": "Ligamentum Flavum",
            "english": "Ligamentum Flavum (Yellow Ligament)",
            "roots": "ligamentum (bağ) + flavus (sarı)",
            "turkishDefinition": "Ligamentum flavum (sarı bağ); komşu vertebraların lamina'ları arasında uzanan, yüksek elastin içeriği nedeniyle sarı renkte görünen bağ. Omurganın fleksiyondan ekstansiyona dönüşünde yardımcı olur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Ligamentum flavum (sarı bağ)",
            "turkish": "Ligamentum Flavum (Yellow Ligament)",
            "definition": "Ligamentum flavum (sarı bağ); komşu vertebraların lamina'ları arasında uzanan, yüksek elastin içeriği nedeniyle sarı renkte görünen bağ. Omurganın fleksiyondan ekstansiyona dönüşünde yardımcı olur.",
            "englishDefinition": "A yellow, elastin-rich ligament connecting the laminae of adjacent vertebrae, assisting the spine's return from flexion to extension.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 159,
            "roots": "ligamentum (bağ) + inter (arasında) + spina (diken, çıkıntı)",
            "turkishDefinition": "İnterspinöz bağ; komşu vertebraların processus spinosus'ları arasında uzanan ince bağ. Aşırı fleksiyon sırasında gerilerek stabilite sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "İnterspinöz bağ",
            "turkish": "Interspinous Ligament",
            "english": "Interspinous Ligament",
            "definition": "İnterspinöz bağ; komşu vertebraların processus spinosus'ları arasında uzanan ince bağ. Aşırı fleksiyon sırasında gerilerek stabilite sağlar.",
            "term": "Ligamentum Interspinale",
            "englishDefinition": "A thin ligament connecting the spinous processes of adjacent vertebrae that provides resistance during excessive flexion.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 160,
            "term": "Ligamentum Supraspinale",
            "english": "Supraspinous Ligament",
            "roots": "ligamentum (bağ) + supra (üstünde) + spina (diken, çıkıntı)",
            "turkishDefinition": "Supraspinöz bağ; vertebraların processus spinosus uçları boyunca C7'den sakruma kadar uzanan yüzeysel bağ. Aşırı fleksiyona karşı direnç gösterir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Supraspinöz bağ",
            "turkish": "Supraspinous Ligament",
            "definition": "Supraspinöz bağ; vertebraların processus spinosus uçları boyunca C7'den sakruma kadar uzanan yüzeysel bağ. Aşırı fleksiyona karşı direnç gösterir.",
            "englishDefinition": "A superficial ligament running along the tips of the spinous processes from C7 to the sacrum, resisting excessive flexion.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 161,
            "term": "Articulatio Atlantooccipitalis",
            "english": "Atlanto-occipital Joint",
            "roots": "articulatio (eklem) + atlas (1. servikal vertebra) + occiput (art kafa)",
            "turkishDefinition": "Atlantooksipital eklem; atlas (C1) ile os occipitale'nin condylus occipitalis'leri arasındaki elipsoid tipi sinovyal eklem. Başın fleksiyon-ekstansiyonunu (baş sallama hareketi) sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Atlantooksipital eklem",
            "turkish": "Atlanto-occipital Joint",
            "definition": "Atlantooksipital eklem; atlas (C1) ile os occipitale'nin condylus occipitalis'leri arasındaki elipsoid tipi sinovyal eklem. Başın fleksiyon-ekstansiyonunu (baş sallama hareketi) sağlar.",
            "englishDefinition": "An ellipsoid synovial joint between the atlas and the occipital condyles that allows nodding movements of the head.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 162,
            "term": "Articulatio Atlantoaxialis",
            "english": "Atlanto-axial Joint",
            "roots": "articulatio (eklem) + atlas (1. servikal vertebra) + axis (2. servikal vertebra)",
            "turkishDefinition": "Atlantoaksiyal eklem; atlas (C1) ile axis (C2) arasındaki eklem kompleksi. Median ve lateral parçalardan oluşur; başın yanlara dönme hareketinin (hayır anlamı) yaklaşık yarısını sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Atlantoaksiyal eklem",
            "turkish": "Atlanto-axial Joint",
            "definition": "Atlantoaksiyal eklem; atlas (C1) ile axis (C2) arasındaki eklem kompleksi. Median ve lateral parçalardan oluşur; başın yanlara dönme hareketinin (hayır anlamı) yaklaşık yarısını sağlar.",
            "englishDefinition": "A joint complex between the atlas and axis, consisting of median and lateral components, responsible for roughly half of the head's rotational movement.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 163,
            "term": "Dens Axis",
            "english": "Dens (Odontoid Process) of Axis",
            "roots": "dens (diş) + axis (2. servikal vertebra)",
            "turkishDefinition": "Axis'in dens'i (odontoid çıkıntısı); axis vertebrasının üst yüzünden yukarı doğru uzanan, atlas'ın içinden geçerek atlantoaksiyal eklemin pivot ekseni görevi gören çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Axis'in dens'i (odontoid çıkıntısı)",
            "turkish": "Dens (Odontoid Process) of Axis",
            "definition": "Axis'in dens'i (odontoid çıkıntısı); axis vertebrasının üst yüzünden yukarı doğru uzanan, atlas'ın içinden geçerek atlantoaksiyal eklemin pivot ekseni görevi gören çıkıntı.",
            "englishDefinition": "A tooth-like projection rising from the body of the axis that passes through the atlas and acts as the pivot for the atlantoaxial joint.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 164,
            "term": "Ligamentum Transversum Atlantis",
            "english": "Transverse Ligament of Atlas",
            "roots": "ligamentum (bağ) + transversus (enine) + atlas (1. servikal vertebra)",
            "turkishDefinition": "Atlasın transvers bağı; atlas'ın iç yüzünde yer alan, dens axis'i arkadan destekleyerek yerinde tutan güçlü bağ. Bütünlüğü bozulursa medulla spinalis hasarı riski oluşur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Atlasın transvers bağı",
            "turkish": "Transverse Ligament of Atlas",
            "definition": "Atlasın transvers bağı; atlas'ın iç yüzünde yer alan, dens axis'i arkadan destekleyerek yerinde tutan güçlü bağ. Bütünlüğü bozulursa medulla spinalis hasarı riski oluşur.",
            "englishDefinition": "A strong ligament on the inner surface of the atlas that holds the dens of the axis in place from behind.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 165,
            "term": "Articulatio Sacroiliaca",
            "english": "Sacroiliac Joint",
            "roots": "articulatio (eklem) + sacrum (kuyruk sokumu üstü kemik) + ilium (kalça kemiği üst kısmı)",
            "turkishDefinition": "Sakroiliak eklem; os sacrum ile os ilium arasındaki güçlü, sınırlı hareketli sinovyal eklem. Gövde ağırlığını pelvise aktarır; klinik olarak sık ağrı kaynağıdır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Sakroiliak eklem",
            "turkish": "Sacroiliac Joint",
            "definition": "Sakroiliak eklem; os sacrum ile os ilium arasındaki güçlü, sınırlı hareketli sinovyal eklem. Gövde ağırlığını pelvise aktarır; klinik olarak sık ağrı kaynağıdır.",
            "englishDefinition": "A strong synovial joint with limited mobility between the sacrum and the ilium that transmits the weight of the trunk to the pelvis.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 166,
            "term": "Symphysis Pubica",
            "english": "Pubic Symphysis",
            "roots": "symphysis (birleşme, kaynaşma) + pubica (pubise ait)",
            "turkishDefinition": "Pubik simfiz; iki os pubis arasında, fibrokartilaj bir disk aracılığıyla oluşan sekonder kıkırdak eklem. Pelvis stabilitesini sağlar, gebelikte hafifçe gevşer.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Pubik simfiz",
            "turkish": "Pubic Symphysis",
            "definition": "Pubik simfiz; iki os pubis arasında, fibrokartilaj bir disk aracılığıyla oluşan sekonder kıkırdak eklem. Pelvis stabilitesini sağlar, gebelikte hafifçe gevşer.",
            "englishDefinition": "A secondary cartilaginous joint formed by a fibrocartilaginous disc between the two pubic bones, stabilizing the pelvis and slightly relaxing during pregnancy.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 167,
            "term": "Articulatio Sacrococcygea",
            "english": "Sacrococcygeal Joint",
            "roots": "articulatio (eklem) + sacrum (kuyruk sokumu üstü kemik) + coccyx (kuyruk sokumu kemiği)",
            "turkishDefinition": "Sakrokoksigeal eklem; os sacrum'un alt ucu ile os coccygis arasındaki sekonder kıkırdak eklem. Otururken hafif hareket serbestisi sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Sakrokoksigeal eklem",
            "turkish": "Sacrococcygeal Joint",
            "definition": "Sakrokoksigeal eklem; os sacrum'un alt ucu ile os coccygis arasındaki sekonder kıkırdak eklem. Otururken hafif hareket serbestisi sağlar.",
            "englishDefinition": "A secondary cartilaginous joint between the inferior end of the sacrum and the coccyx, allowing slight movement during sitting.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 168,
            "term": "Canalis Vertebralis",
            "english": "Vertebral Canal (Spinal Canal)",
            "roots": "canalis (kanal) + vertebralis (omura ait)",
            "turkishDefinition": "Vertebral kanal (omurilik kanalı); üst üste dizilen vertebraların foramen vertebrale'lerinin oluşturduğu, medulla spinalis'i içine alan uzun kanal.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Vertebral kanal (omurilik kanalı)",
            "turkish": "Vertebral Canal (Spinal Canal)",
            "definition": "Vertebral kanal (omurilik kanalı); üst üste dizilen vertebraların foramen vertebrale'lerinin oluşturduğu, medulla spinalis'i içine alan uzun kanal.",
            "englishDefinition": "The long canal formed by the vertebral foramina of the stacked vertebrae, housing the spinal cord.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 169,
            "roots": "foramen (delik, açıklık) + inter (arasında) + vertebra (omur)",
            "turkishDefinition": "İntervertebral foramen; komşu vertebraların pedikülleri arasında oluşan açıklık. Spinal sinirlerin canalis vertebralis'ten çıktığı yerdir; daralması radikülopatiye yol açabilir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "İntervertebral foramen",
            "turkish": "Intervertebral Foramen",
            "english": "Intervertebral Foramen",
            "definition": "İntervertebral foramen; komşu vertebraların pedikülleri arasında oluşan açıklık. Spinal sinirlerin canalis vertebralis'ten çıktığı yerdir; daralması radikülopatiye yol açabilir.",
            "term": "Foramen Intervertebrale",
            "englishDefinition": "An opening formed between the pedicles of adjacent vertebrae through which spinal nerves exit the vertebral canal.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        }
    ],
    "trunk_bones": [
        {
            "id": 16,
            "term": "Sternum",
            "english": "Sternum",
            "roots": "sternum (göğüs kemiği)",
            "turkishDefinition": "Clavicula ve Kaburgalarla eklemlenen ön orta hat göğüs duvarı kemik plakasıdır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_bones",
            "turkishShort": "Clavicula ve Kaburgalarla eklemlenen ön orta hat göğüs duvarı kemik plakasıdır",
            "englishDefinition": "A flat midline bone at the anterior chest wall, articulating with the clavicles and costal cartilages of the ribs."
        },
        {
            "id": 17,
            "term": "Costae",
            "english": "Ribs",
            "roots": "costa (kaburga)",
            "turkishDefinition": "Göğüs organlarını koruyan göğüs kafesinin ana yapısını oluşturur, ancak asıl işlevi solunuma yardımcı olmaktır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_bones",
            "turkishShort": "Göğüs organlarını koruyan göğüs kafesinin ana yapısını oluşturur, ancak asıl işlevi solunuma yardımcı olmaktır",
            "englishDefinition": "Curved bones forming the main structure of the thoracic cage, protecting the thoracic organs and assisting respiration."
        },
        {
            "id": 18,
            "term": "Vertebra",
            "english": "Vertebra",
            "roots": "vertebra (omur)",
            "turkishDefinition": "Omur, Omurga'nın temel segmental birimidir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_bones",
            "turkishShort": "Omur, Omurga'nın temel segmental birimidir",
            "englishDefinition": "The basic segmental unit of the vertebral column, consisting of a body and vertebral arch that encloses the spinal cord."
        }
    ],
    "upper_extremity_bones": [
        {
            "id": 19,
            "term": "Scapula",
            "english": "Scapula",
            "roots": "scapula (kürek kemiği)",
            "turkishDefinition": "Kabaca üçgen şeklinde bir göğüs kemeri kemiğidir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kabaca üçgen şeklinde bir göğüs kemeri kemiğidir",
            "englishDefinition": "A flat, triangular bone forming the posterior part of the shoulder girdle, connecting the upper limb to the trunk.",
            "group": "Scapula"
        },
        {
            "id": 20,
            "term": "Clavicula",
            "english": "Clavicle",
            "roots": "clavicula (köprücük kemiği)",
            "turkishDefinition": "Göğüs kemerinin aksial iskelete bağlayan tek kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Göğüs kemerinin aksial iskelete bağlayan tek kemiktir",
            "englishDefinition": "An S-shaped long bone forming the anterior part of the shoulder girdle, linking the sternum to the scapula.",
            "group": "Clavicula"
        },
        {
            "id": 21,
            "term": "Humerus",
            "english": "Humerus",
            "roots": "humerus (kol kemiği)",
            "turkishDefinition": "Üst kol bölgesinde yer alan uzun bir kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Üst kol bölgesinde yer alan uzun bir kemiktir",
            "englishDefinition": "The single long bone of the arm, extending from the shoulder to the elbow, and the largest bone of the upper limb.",
            "group": "Humerus"
        },
        {
            "id": 22,
            "term": "Radius",
            "english": "Radius",
            "roots": "radius (tekerlek çubuğu)",
            "turkishDefinition": "Ön kolda bulunan ve başparmak tarafındaki kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ön kolda bulunan ve başparmak tarafındaki kemiktir",
            "englishDefinition": "The lateral (thumb-side) forearm bone, articulating with the humerus, ulna, and carpal bones.",
            "group": "Radius"
        },
        {
            "id": 23,
            "term": "Ulna",
            "english": "Ulna",
            "roots": "ulna (dirsek kemiği)",
            "turkishDefinition": "Ön kolda bulunan ve serçe parmak tarafında bulunan kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ön kolda bulunan ve serçe parmak tarafında bulunan kemiktir",
            "englishDefinition": "The medial (little-finger-side) forearm bone, longer than the radius and forming the main hinge of the elbow.",
            "group": "Ulna"
        },
        {
            "id": 24,
            "term": "Ossa Carpi",
            "english": "Carpal Bones",
            "roots": "ossa (kemikler) + carpus (el bileği)",
            "turkishDefinition": "El bileğini oluşturan 8 kısa kemikten meydana gelir ve ön kol ile el arasındaki eklemleşmeyi sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El bileğini oluşturan 8 kısa kemikten meydana gelir ve ön kol ile el arasındaki eklemleşmeyi sağlar",
            "englishDefinition": "Eight short bones arranged in two rows forming the wrist, connecting the forearm to the hand.",
            "group": "Ossa Manus"
        },
        {
            "id": 25,
            "term": "Ossa Metacarpi",
            "english": "Metacarpal Bones",
            "roots": "ossa (kemikler) + metacarpus (el ayası)",
            "turkishDefinition": "El iskeletinde Ossa Carpi ile Phalanges Proximales arasında yer alan 5 uzun kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El iskeletinde Ossa Carpi ile Phalanges Proximales arasında yer alan 5 uzun kemiktir",
            "englishDefinition": "Five miniature long bones forming the palm, connecting the carpal bones to the phalanges.",
            "group": "Ossa Manus"
        },
        {
            "id": 26,
            "english": "Phalanx of Hand",
            "roots": "phalanx (parmak kemiği) + manus (el)",
            "turkishDefinition": "Phalanges Digitorum Manus, parmakların kemikleridir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Phalanges Digitorum Manus, parmakların kemikleridir",
            "englishDefinition": "The bones of the fingers; two in the thumb and three in each other digit, totaling 14.",
            "term": "Phalanges Manus",
            "group": "Ossa Manus"
        },
        {
            "id": 27,
            "term": "Fovea Articularis Capitis Radii",
            "english": "Articular Facet of Head of Radius",
            "roots": "fovea (çukur) + articularis (eklem) + caput (baş) + radius (döner kemik)",
            "turkishDefinition": "Radius başının eklem çukuru; ön kol kemiğinin üst ucundaki çukurluk.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius başının eklem çukuru",
            "englishDefinition": "A shallow depression on top of the radial head that articulates with the capitulum of the humerus.",
            "group": "Radius"
        },
        {
            "id": 28,
            "term": "Caput Radii",
            "english": "Head of Radius",
            "roots": "caput (baş) + radius (döner kemik)",
            "turkishDefinition": "Radius başı; döner kemiğin üst ucu.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius başı",
            "englishDefinition": "The disc-shaped proximal end of the radius, articulating with the humerus and the radial notch of the ulna.",
            "group": "Radius"
        },
        {
            "id": 29,
            "term": "Collum Radii",
            "english": "Neck of Radius",
            "roots": "collum (boyun) + radius (döner kemik)",
            "turkishDefinition": "Radius boynu; radius başının hemen altındaki daralmış kısım.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius boynu",
            "englishDefinition": "The narrowed segment of the radius located just below its head.",
            "group": "Radius"
        },
        {
            "id": 30,
            "term": "Tuberositas Radii",
            "english": "Radial Tuberosity / Bicipital Tuberosity",
            "roots": "tuberositas (pürtük) + radius (döner kemik)",
            "turkishDefinition": "Radius pürtüğü; biceps tendonunun yapıştığı pürtüklü çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius pürtüğü",
            "englishDefinition": "A bony prominence below the radial neck serving as the insertion site for the biceps brachii tendon.",
            "group": "Radius"
        },
        {
            "id": 31,
            "term": "Margo Anterior Radii",
            "english": "Anterior Border of Radius / Anterior Margin",
            "roots": "margo (kenar) + anterior (ön) + radius (döner kemik)",
            "turkishDefinition": "Radius'un ön kenarı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un ön kenarı",
            "englishDefinition": "The rounded anterior edge running along the shaft of the radius.",
            "group": "Radius"
        },
        {
            "id": 32,
            "term": "Facies Anterior Radii",
            "english": "Anterior Surface of Radius",
            "roots": "facies (yüz) + anterior (ön) + radius (döner kemik)",
            "turkishDefinition": "Radius'un ön yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un ön yüzü",
            "englishDefinition": "The forward-facing surface of the radial shaft, giving attachment to forearm flexor muscles.",
            "group": "Radius"
        },
        {
            "id": 33,
            "term": "Margo Interosseus Radii",
            "english": "Interosseous Border of Radius / Interosseous Margin",
            "roots": "margo (kenar) + interosseus (kemikler arası) + radius (döner kemik)",
            "turkishDefinition": "Radius'un kemikler arası kenarı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un kemikler arası kenarı",
            "englishDefinition": "The sharp medial edge of the radius facing the ulna, anchoring the interosseous membrane.",
            "group": "Radius"
        },
        {
            "id": 34,
            "term": "Margo Posterior Radii",
            "english": "Posterior Border of Radius / Posterior Margin",
            "roots": "margo (kenar) + posterior (arka) + radius (döner kemik)",
            "turkishDefinition": "Radius'un arka kenarı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un arka kenarı",
            "englishDefinition": "The posterior edge running along the shaft of the radius.",
            "group": "Radius"
        },
        {
            "id": 35,
            "term": "Facies Posterior Radii",
            "english": "Posterior Surface of Radius",
            "roots": "facies (yüz) + posterior (arka) + radius (döner kemik)",
            "turkishDefinition": "Radius'un arka yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un arka yüzü",
            "englishDefinition": "The backward-facing surface of the radial shaft, giving attachment to forearm extensor muscles.",
            "group": "Radius"
        },
        {
            "id": 36,
            "term": "Facies Lateralis Radii",
            "english": "Lateral Surface of Radius",
            "roots": "facies (yüz) + lateralis (yan) + radius (döner kemik)",
            "turkishDefinition": "Radius'un dış yan yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un dış yan yüzü",
            "englishDefinition": "The outward-facing surface of the radial shaft, between the anterior and posterior borders.",
            "group": "Radius"
        },
        {
            "id": 37,
            "english": "Carpal Articular Surface",
            "roots": "facies (yüz) + articularis (eklem) + carpalis (el bileği)",
            "turkishDefinition": "Radius'un alt ucunda el bileği kemikleriyle eklemleşen yüzeyi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un alt ucunda el bileği kemikleriyle eklemleşen yüzeyi",
            "englishDefinition": "The distal surface of the radius that articulates with the proximal row of carpal bones at the wrist.",
            "term": "Facies Articularis Carpalis",
            "group": "Radius"
        },
        {
            "id": 38,
            "term": "Incisura Ulnaris",
            "english": "Ulnar Notch",
            "roots": "incisura (çentik) + ulna (dirsek kemiği)",
            "turkishDefinition": "Radius'un alt ucundaki dirsek kemiği çentiği; ulnanın eklemleştiği alan.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un alt ucundaki dirsek kemiği çentiği",
            "englishDefinition": "A concavity on the medial side of the distal radius that articulates with the head of the ulna.",
            "group": "Radius"
        },
        {
            "id": 39,
            "term": "Tuberculum Dorsale Radii",
            "english": "Dorsal Radial Tubercle / Dorsal Tubercle of Radius",
            "roots": "tuberculum (tümsekçik) + dorsalis (arka) + radius (döner kemik)",
            "turkishDefinition": "Radius'un arka yüzündeki dorsal tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un arka yüzündeki dorsal tümsekçik",
            "englishDefinition": "A bony prominence (Lister's tubercle) on the posterior distal radius, acting as a pulley for the extensor pollicis longus tendon.",
            "group": "Radius"
        },
        {
            "id": 40,
            "term": "Processus Styloideus Radii",
            "english": "Radial Styloid Process",
            "roots": "processus (çikıntı) + styloideus (kalem şeklinde) + radius (döner kemik)",
            "turkishDefinition": "Radius alt ucunun dış yan tarafındaki kalem benzeri çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius alt ucunun dış yan tarafındaki kalem benzeri çıkıntı",
            "englishDefinition": "A pointed projection on the lateral side of the distal radius, palpable at the wrist.",
            "group": "Radius"
        },
        {
            "id": 41,
            "term": "Olecranon",
            "english": "Olecranon",
            "roots": "olecranon (dirsek çıkıntısı)",
            "turkishDefinition": "Ulnanın üst ucunda bulunan dirsek çıkıntısı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın üst ucunda bulunan dirsek çıkıntısı",
            "englishDefinition": "The large proximal-posterior projection of the ulna that forms the point of the elbow.",
            "group": "Ulna"
        },
        {
            "id": 42,
            "term": "Incisura Trochlearis",
            "english": "Trochlear Notch",
            "roots": "incisura (çentik) + trochlea (makara)",
            "turkishDefinition": "Ulnanın üst ucunda humerus trochleası (makara) ile eklemleşen çentik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın üst ucunda humerus trochleası (makara) ile eklemleşen çentik",
            "englishDefinition": "A crescent-shaped notch on the ulna that grips the trochlea of the humerus at the elbow joint.",
            "group": "Ulna"
        },
        {
            "id": 43,
            "term": "Processus Coronoideus Ulnae",
            "english": "Coronoid Process of Ulna",
            "roots": "processus (çıkıntı) + coronoid (taç/gaga şeklinde) + ulna (dirsek kemiği)",
            "turkishDefinition": "Ulnanın üst ucunda, ön taraftaki gaga benzeri çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın üst ucunda, ön taraftaki gaga benzeri çıkıntı",
            "englishDefinition": "An anterior projection of the ulna forming the lower boundary of the trochlear notch.",
            "group": "Ulna"
        },
        {
            "id": 44,
            "term": "Incisura Radialis",
            "english": "Radial Notch",
            "roots": "incisura (çentik) + radius (döner kemik)",
            "turkishDefinition": "Ulnanın üst ucunda radius başının eklemleştiği çentik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın üst ucunda radius başının eklemleştiği çentik",
            "englishDefinition": "A lateral concavity on the ulna that articulates with the head of the radius.",
            "group": "Ulna"
        },
        {
            "id": 45,
            "term": "Crista Supinatoris",
            "english": "Supinator Crest",
            "roots": "crista (ibik/kenar) + supinator (dışa döndüren)",
            "turkishDefinition": "Ulnadaki supinator kasın yapıştığı keskin kenar/ibik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnadaki supinator kasın yapıştığı keskin kenar/ibik",
            "englishDefinition": "A bony ridge below the radial notch of the ulna, giving origin to part of the supinator muscle.",
            "group": "Ulna"
        },
        {
            "id": 46,
            "term": "Tuberositas Ulnae",
            "english": "Tuberosity of Ulna",
            "roots": "tuberositas (pürtük) + ulna (dirsek kemiği)",
            "turkishDefinition": "Ulnadaki pürtüklü tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnadaki pürtüklü tümsekçik",
            "englishDefinition": "A roughened area below the coronoid process serving as the insertion site for the brachialis muscle.",
            "group": "Ulna"
        },
        {
            "id": 47,
            "term": "Facies Anterior Ulnae",
            "english": "Anterior Surface of Ulna",
            "roots": "facies (yüz) + anterior (ön) + ulna (dirsek kemiği)",
            "turkishDefinition": "Ulnanın ön yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın ön yüzü",
            "englishDefinition": "The forward-facing surface of the ulnar shaft, giving attachment to forearm flexor muscles.",
            "group": "Ulna"
        },
        {
            "id": 48,
            "term": "Margo Interosseus Ulnae",
            "english": "Interosseous Border of Ulna / Interosseous Margin of Ulna",
            "roots": "margo (kenar) + interosseus (kemikler arası) + ulna (dirsek kemiği)",
            "turkishDefinition": "Ulnanın kemikler arası kenarı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın kemikler arası kenarı",
            "englishDefinition": "The sharp lateral edge of the ulna facing the radius, anchoring the interosseous membrane.",
            "group": "Ulna"
        },
        {
            "id": 49,
            "term": "Margo Anterior Ulnae",
            "english": "Anterior Border of Ulna / Anterior Margin of Ulna",
            "roots": "margo (kenar) + anterior (ön) + ulna (dirsek kemiği)",
            "turkishDefinition": "Ulnanın ön kenarı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın ön kenarı",
            "englishDefinition": "The rounded anterior edge running along the shaft of the ulna.",
            "group": "Ulna"
        },
        {
            "id": 50,
            "term": "Margo Posterior Ulnae",
            "english": "Posterior Border of Ulna / Posterior Margin of Ulna",
            "roots": "margo (kenar) + posterior (arka) + ulna (dirsek kemiği)",
            "turkishDefinition": "Ulnanın arka kenarı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın arka kenarı",
            "englishDefinition": "The subcutaneous posterior edge of the ulna, palpable along the back of the forearm.",
            "group": "Ulna"
        },
        {
            "id": 51,
            "term": "Caput Ulnae",
            "english": "Head of Ulna",
            "roots": "caput (baş) + ulna (dirsek kemiği)",
            "turkishDefinition": "Dirsek kemiğinin alt ucundaki kafa kısmı (ulna başı).",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Dirsek kemiğinin alt ucundaki kafa kısmı (ulna başı)",
            "englishDefinition": "The rounded distal end of the ulna, located near the wrist.",
            "group": "Ulna"
        },
        {
            "id": 52,
            "term": "Circumferentia Articularis Capitis Ulnae",
            "english": "Articular Circumference of Head of Ulna",
            "roots": "circumferentia (çevre) + articularis (eklem) + caput (baş) + ulna (dirsek kemiği)",
            "turkishDefinition": "Ulna başındaki çevre eklem yüzeyi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulna başındaki çevre eklem yüzeyi",
            "englishDefinition": "The circular articular surface around the ulnar head that articulates with the ulnar notch of the radius.",
            "group": "Ulna"
        },
        {
            "id": 53,
            "term": "Processus Styloideus Ulnae",
            "english": "Ulnar Styloid Process",
            "roots": "processus (çıkıntı) + styloideus (kalem şeklinde) + ulna (dirsek kemiği)",
            "turkishDefinition": "Ulnanın alt ucundaki kalem benzeri çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın alt ucundaki kalem benzeri çıkıntı",
            "englishDefinition": "A small pointed projection on the medial side of the distal ulna, near the wrist.",
            "group": "Ulna"
        },
        {
            "id": 54,
            "term": "Os Scaphoideum",
            "english": "Scaphoid Bone",
            "roots": "os (kemik) + scapha (kayık)",
            "turkishDefinition": "El bileğinin kayık kemiği (proksimal sıranın en dıştaki kemiği).",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El bileğinin kayık kemiği (proksimal sıranın en dıştaki kemiği)",
            "englishDefinition": "A boat-shaped carpal bone at the lateral end of the proximal row, the most commonly fractured carpal bone.",
            "group": "Ossa Manus"
        },
        {
            "id": 55,
            "term": "Os Lunatum",
            "english": "Lunate Bone",
            "roots": "os (kemik) + luna (ay)",
            "turkishDefinition": "El bileğinin ay kemiği.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El bileğinin ay kemiği",
            "englishDefinition": "A crescent-shaped carpal bone in the middle of the proximal row, articulating directly with the radius.",
            "group": "Ossa Manus"
        },
        {
            "id": 56,
            "term": "Os Triquetrum",
            "roots": "os (kemik) + triquetrus (üç köşeli)",
            "turkishDefinition": "El bileğinin üç köşe kemiği.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El bileğinin üç köşe kemiği",
            "english": "Triquetral Bone",
            "englishDefinition": "A pyramid-shaped carpal bone at the medial end of the proximal row, articulating with the pisiform.",
            "group": "Ossa Manus"
        },
        {
            "id": 57,
            "term": "Os Pisiforme",
            "english": "Pisiform Bone",
            "roots": "os (kemik) + pisum (bezelye)",
            "turkishDefinition": "El bileğinin bezelye kemiği.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El bileğinin bezelye kemiği",
            "englishDefinition": "A small, pea-shaped sesamoid bone sitting on the triquetrum, serving as an attachment for the flexor carpi ulnaris.",
            "group": "Ossa Manus"
        },
        {
            "id": 58,
            "term": "Os Hamatum",
            "english": "Hamate Bone",
            "roots": "os (kemik) + hamus (çengel)",
            "turkishDefinition": "El bileğinin çengelli kemiği.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El bileğinin çengelli kemiği",
            "englishDefinition": "A carpal bone of the distal row bearing a hook-like process on its palmar surface, anchoring wrist flexor structures.",
            "group": "Ossa Manus"
        },
        {
            "id": 59,
            "term": "Fossa Infraspinata",
            "english": "Infraspinous Fossa",
            "roots": "fossa (çukur) + infraspinata (diken altı)",
            "turkishDefinition": "Kürek kemiğinin arkasında, dikenin altındaki geniş çukur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin arkasında, dikenin altındaki geniş çukur",
            "englishDefinition": "A broad depression below the spine of the scapula that gives origin to the infraspinatus muscle.",
            "group": "Scapula"
        },
        {
            "id": 60,
            "term": "Facies Posterior Scapulae",
            "english": "Posterior Surface of Scapula",
            "roots": "facies (yüz) + posterior (arka) + scapula (kürek kemiği)",
            "turkishDefinition": "Kürek kemiğinin arka yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin arka yüzü",
            "englishDefinition": "The dorsal surface of the scapula, divided by the scapular spine into the supraspinous and infraspinous fossae.",
            "group": "Scapula"
        },
        {
            "id": 61,
            "term": "Caput Humeri",
            "english": "Head of Humerus",
            "roots": "caput (baş) + humerus (kol kemiği)",
            "turkishDefinition": "Humerus başı; kol kemiğinin omuz eklemine katılan yarım küre şeklindeki üst ucu.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus başı",
            "englishDefinition": "The rounded proximal end of the humerus that articulates with the glenoid cavity of the scapula to form the shoulder joint.",
            "group": "Humerus"
        },
        {
            "id": 62,
            "term": "Collum Anatomicum Humeri",
            "english": "Anatomical Neck of Humerus",
            "roots": "collum (boyun) + anatomicum (anatomik) + humerus (kol kemiği)",
            "turkishDefinition": "Humerus'un anatomik boynu; caput humeri'yi sınırlayan dar hat.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus'un anatomik boynu",
            "englishDefinition": "A shallow groove encircling the humeral head, marking the former growth-plate line and site of joint capsule attachment.",
            "group": "Humerus"
        },
        {
            "id": 63,
            "term": "Collum Chirurgicum Humeri",
            "english": "Surgical Neck of Humerus",
            "roots": "collum (boyun) + chirurgicum (cerrahi) + humerus (kol kemiği)",
            "turkishDefinition": "Humerus'un cerrahi boynu; kırıkların en sık görüldüğü üst uç altındaki daralan kısım.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus'un cerrahi boynu",
            "englishDefinition": "A narrowed region just below the tubercles of the humerus, clinically important as a common fracture site.",
            "group": "Humerus"
        },
        {
            "id": 64,
            "term": "Tuberculum Minus",
            "roots": "tuberculum (tümsekçik) + minus (küçük)",
            "turkishDefinition": "Humerus üst ucunda, ön tarafta bulunan küçük tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus üst ucunda, ön tarafta bulunan küçük tümsekçik",
            "english": "Lesser Tubercle",
            "englishDefinition": "A small anterior prominence on the proximal humerus serving as the insertion site for the subscapularis muscle.",
            "group": "Humerus"
        },
        {
            "id": 65,
            "term": "Tuberculum Majus",
            "roots": "tuberculum (tümsekçik) + majus (büyük)",
            "turkishDefinition": "Humerus üst ucunda, dış tarafta bulunan büyük tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus üst ucunda, dış tarafta bulunan büyük tümsekçik",
            "english": "Greater Tubercle",
            "englishDefinition": "A large lateral prominence on the proximal humerus providing attachment for several rotator cuff muscles.",
            "group": "Humerus"
        },
        {
            "id": 66,
            "term": "Fossa Radialis",
            "english": "Radial Fossa",
            "roots": "fossa (çukur) + radialis (radius ile ilgili)",
            "turkishDefinition": "Humerus ön alt ucunda, capitulum'un hemen üzerindeki küçük çukurluk.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus ön alt ucunda, capitulum'un hemen üzerindeki küçük çukurluk",
            "englishDefinition": "A small depression above the capitulum that accommodates the head of the radius during forearm flexion.",
            "group": "Humerus"
        },
        {
            "id": 67,
            "term": "Capitulum Humeri",
            "english": "Capitulum of Humerus",
            "roots": "capitulum (küçük baş) + humerus (kol kemiği)",
            "turkishDefinition": "Humerus alt ucunda, radius başı ile eklemleşen küçük baş şeklindeki çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus alt ucunda, radius başı ile eklemleşen küçük baş şeklindeki çıkıntı",
            "englishDefinition": "A rounded lateral articular surface at the distal humerus that articulates with the head of the radius.",
            "group": "Humerus"
        },
        {
            "id": 68,
            "term": "Trochlea Humeri",
            "english": "Trochlea of Humerus",
            "roots": "trochlea (makara) + humerus (kol kemiği)",
            "turkishDefinition": "Humerus alt ucunda, ulna ile eklemleşen makara şeklindeki eklem yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus alt ucunda, ulna ile eklemleşen makara şeklindeki eklem yüzü",
            "englishDefinition": "A pulley-shaped medial articular surface at the distal humerus that engages the trochlear notch of the ulna.",
            "group": "Humerus"
        },
        {
            "id": 69,
            "term": "Facies Posterior Humeri",
            "english": "Posterior Surface of Humerus",
            "roots": "facies (yüz) + posterior (arka) + humerus (kol kemiği)",
            "turkishDefinition": "Humerus'un arka yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus'un arka yüzü",
            "englishDefinition": "The posterior aspect of the humeral shaft, crossed obliquely by the radial groove.",
            "group": "Humerus"
        },
        {
            "id": 70,
            "term": "Fossa Olecrani",
            "english": "Olecranon Fossa",
            "roots": "fossa (çukur) + olecranon (dirsek çıkıntısı)",
            "turkishDefinition": "Humerus arka alt ucunda dirsek eklemi açıldığında olecranon'un girdiği derin çukur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus arka alt ucunda dirsek eklemi açıldığında olecranon'un girdiği derin çukur",
            "englishDefinition": "A deep posterior depression on the distal humerus that receives the olecranon during elbow extension.",
            "group": "Humerus"
        },
        {
            "id": 71,
            "term": "Sulcus Intertubercularis",
            "roots": "sulcus (oluk) + inter- (arasında) + tuberculum (tümsekçik)",
            "turkishDefinition": "Tuberculum majus ile minus arasında uzanan oluk (biceps oluğu).",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Tuberculum majus ile minus arasında uzanan oluk (biceps oluğu)",
            "english": "Intertubercular Sulcus",
            "englishDefinition": "A groove between the greater and lesser tubercles that houses the tendon of the long head of biceps brachii.",
            "group": "Humerus"
        },
        {
            "id": 72,
            "term": "Crista Tuberculi Majoris",
            "english": "Crest of Greater Tubercle",
            "roots": "crista (ibik/kenar) + tuberculum (tümsekçik) + majus (büyük) + labium (dudak) + laterale (dış yan)",
            "turkishDefinition": "Tuberculum majus'un aşağı doğru uzanan keskin kenarı; bicipital oluğun dış dudağı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Tuberculum majus'un aşağı doğru uzanan keskin kenarı",
            "englishDefinition": "A bony ridge extending down from the greater tubercle, giving insertion to the pectoralis major muscle.",
            "group": "Humerus"
        },
        {
            "id": 73,
            "term": "Crista Tuberculi Minoris",
            "english": "Crest of Lesser Tubercle",
            "roots": "crista (ibik/kenar) + tuberculum (tümsekçik) + minus (küçük) + labium (dudak) + mediale (iç yan)",
            "turkishDefinition": "Tuberculum minus'un aşağı doğru uzanan keskin kenarı; bicipital oluğun iç dudağı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Tuberculum minus'un aşağı doğru uzanan keskin kenarı",
            "englishDefinition": "A bony ridge extending down from the lesser tubercle, giving insertion to teres major and latissimus dorsi.",
            "group": "Humerus"
        },
        {
            "id": 74,
            "term": "Sulcus Nervi Radialis",
            "english": "Radial Groove",
            "roots": "sulcus (oluk) + nervus (sinir) + radialis (radial sinir)",
            "turkishDefinition": "Humerus gövdesinin arkasında spiral olarak uzanan radial sinir oluğu.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus gövdesinin arkasında spiral olarak uzanan radial sinir oluğu",
            "englishDefinition": "A spiral groove on the posterior humeral shaft transmitting the radial nerve and deep brachial artery.",
            "group": "Humerus"
        },
        {
            "id": 75,
            "term": "Tuberositas Deltoidea",
            "english": "Deltoid Tuberosity",
            "roots": "tuberositas (pürtük) + deltoidea (deltoid kası ile ilgili)",
            "turkishDefinition": "Humerus gövdesinin dış tarafında, deltoid kasının yapıştığı V şeklindeki pürtüklü alan.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus gövdesinin dış tarafında, deltoid kasının yapıştığı V şeklindeki pürtüklü alan",
            "englishDefinition": "A V-shaped roughened area on the lateral humeral shaft serving as the insertion site for the deltoid muscle.",
            "group": "Humerus"
        },
        {
            "id": 76,
            "term": "Facies Anterolateralis Humeri",
            "english": "Anterolateral Surface of Humerus",
            "roots": "facies (yüz) + anterior (ön) + lateralis (yan) + humerus (kol kemiği)",
            "turkishDefinition": "Humerus'un ön-dış yan yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus'un ön-dış yan yüzü",
            "englishDefinition": "The anterolateral aspect of the humeral shaft, situated between the anterior and lateral borders.",
            "group": "Humerus"
        },
        {
            "id": 77,
            "term": "Facies Anteromedialis Humeri",
            "english": "Anteromedial Surface of Humerus",
            "roots": "facies (yüz) + anterior (ön) + medialis (iç yan) + humerus (kol kemiği)",
            "turkishDefinition": "Humerus'un ön-iç yan yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus'un ön-iç yan yüzü",
            "englishDefinition": "The anteromedial aspect of the humeral shaft, situated between the anterior and medial borders.",
            "group": "Humerus"
        },
        {
            "id": 78,
            "term": "Crista Supracondylaris Medialis",
            "roots": "crista (kenar/ibik) + supra- (üst) + condylus (lokma) / epicondylus (lokma üstü) + medialis (iç yan)",
            "turkishDefinition": "Humerus alt ucunda, epicondylus medialis'in yukarısına uzanan iç yan kenar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus alt ucunda, epicondylus medialis'in yukarısına uzanan iç yan kenar",
            "english": "Medial Supracondylar Crest",
            "englishDefinition": "A bony ridge along the medial edge of the distal humerus, leading down to the medial epicondyle.",
            "group": "Humerus"
        },
        {
            "id": 79,
            "term": "Crista Supracondylaris Lateralis",
            "roots": "crista (kenar/ibik) + supra- (üst) + condylus (lokma) / epicondylus (lokma üstü) + lateralis (dış yan)",
            "turkishDefinition": "Humerus alt ucunda, epicondylus lateralis'in yukarısına uzanan dış yan kenar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus alt ucunda, epicondylus lateralis'in yukarısına uzanan dış yan kenar",
            "english": "Lateral Supracondylar Crest",
            "englishDefinition": "A prominent bony ridge along the lateral edge of the distal humerus, giving origin to the brachioradialis muscle.",
            "group": "Humerus"
        },
        {
            "id": 80,
            "term": "Epicondylus Lateralis Humeri",
            "english": "Lateral Epicondyle of Humerus",
            "roots": "epicondylus (lokma üstü) + lateralis (dış yan) + humerus (kol kemiği)",
            "turkishDefinition": "Humerus alt ucunun dış yan tarafındaki çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus alt ucunun dış yan tarafındaki çıkıntı",
            "englishDefinition": "A lateral bony projection at the distal humerus, providing the common origin of the forearm extensor muscles.",
            "group": "Humerus"
        },
        {
            "id": 81,
            "term": "Epicondylus Medialis Humeri",
            "english": "Medial Epicondyle of Humerus",
            "roots": "epicondylus (lokma üstü) + medialis (iç yan) + humerus (kol kemiği)",
            "turkishDefinition": "Humerus alt ucunun iç yan tarafındaki belirgin çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus alt ucunun iç yan tarafındaki belirgin çıkıntı",
            "englishDefinition": "A prominent medial bony projection at the distal humerus, providing the common origin of the forearm flexor muscles.",
            "group": "Humerus"
        },
        {
            "id": 82,
            "term": "Fossa Coronoidea",
            "english": "Coronoid Fossa",
            "roots": "fossa (çukur) + coronoidea (gaga/taç şeklinde)",
            "turkishDefinition": "Humerus ön alt ucunda, dirsek büküldüğünde ulnanın processus coronoideus'unun girdiği çukur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus ön alt ucunda, dirsek büküldüğünde ulnanın processus coronoideus'unun girdiği çukur",
            "englishDefinition": "An anterior depression above the trochlea that receives the coronoid process of the ulna during elbow flexion.",
            "group": "Humerus"
        },
        {
            "id": 83,
            "term": "Extremitas Acromialis",
            "english": "Acromial End",
            "roots": "extremitas (uç) + acromialis (akromiyona ait)",
            "turkishDefinition": "Köprücük kemiğinin kürek kemiği omuz çıkıntısı (akromiyon) ile eklemleşen yassı dış ucu.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Köprücük kemiğinin kürek kemiği omuz çıkıntısı (akromiyon) ile eklemleşen yassı dış ucu",
            "englishDefinition": "The flattened lateral end of the clavicle that articulates with the acromion of the scapula.",
            "group": "Clavicula"
        },
        {
            "id": 84,
            "term": "Facies Articularis Acromialis",
            "roots": "facies (yüz) + articularis (eklem) + acromialis (akromiyon)",
            "turkishDefinition": "Clavicula'nın akromiyal ucunda bulunan eklem yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Clavicula'nın akromiyal ucunda bulunan eklem yüzü",
            "english": "Acromial Articular Facet",
            "englishDefinition": "A small oval facet on the lateral clavicle forming the acromioclavicular joint with the scapula.",
            "group": "Clavicula"
        },
        {
            "id": 85,
            "term": "Linea Trapezoidea",
            "english": "Trapezoid Line",
            "roots": "linea (çizgi) + trapezoidea (yamuk şeklinde)",
            "turkishDefinition": "Clavicula'nın alt yüzünde trapezoid bağın yapıştığı eğik çizgi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Clavicula'nın alt yüzünde trapezoid bağın yapıştığı eğik çizgi",
            "englishDefinition": "A roughened line on the inferior lateral clavicle anchoring the trapezoid ligament.",
            "group": "Clavicula"
        },
        {
            "id": 86,
            "term": "Tuberculum Conoideum",
            "english": "Conoid Tubercle",
            "roots": "tuberculum (tümsekçik) + conoideum (koni şeklinde)",
            "turkishDefinition": "Clavicula'nın alt yüzünde konoid bağın yapıştığı küçük konik tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Clavicula'nın alt yüzünde konoid bağın yapıştığı küçük konik tümsekçik",
            "englishDefinition": "A cone-shaped prominence on the inferior lateral clavicle anchoring the conoid ligament.",
            "group": "Clavicula"
        },
        {
            "id": 87,
            "term": "Sulcus Musculi Subclavii",
            "roots": "sulcus (oluk) + musculus (kas) + subclavius (köprücük kemiği altı)",
            "turkishDefinition": "Clavicula'nın alt yüzünde subclavius kasının uzandığı oluk.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Clavicula'nın alt yüzünde subclavius kasının uzandığı oluk",
            "english": "Subclavian Groove",
            "englishDefinition": "A shallow groove running along the inferior surface of the clavicular shaft, giving attachment to the subclavius muscle.",
            "group": "Clavicula"
        },
        {
            "id": 88,
            "term": "Impressio Ligamenti Costoclavicularis",
            "english": "Impression for Costoclavicular Ligament",
            "roots": "impressio (iz) + ligamentum (bağ) + costoclavicularis (kaburga-köprücük)",
            "turkishDefinition": "Clavicula'nın alt yüzünde, sternal uca yakın kostoklavikular bağın tutunduğu pürtüklü iz.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Clavicula'nın alt yüzünde, sternal uca yakın kostoklavikular bağın tutunduğu pürtüklü iz",
            "englishDefinition": "A roughened impression on the inferior medial clavicle marking attachment of the costoclavicular ligament to the first rib.",
            "group": "Clavicula"
        },
        {
            "id": 89,
            "term": "Extremitas Sternalis",
            "english": "Sternal End",
            "roots": "extremitas (uç) + sternalis (sternum ile ilgili)",
            "turkishDefinition": "Köprücük kemiğinin sternum (göğüs kemiği) ile eklemleşen kalınlaşmış iç ucu.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Köprücük kemiğinin sternum (göğüs kemiği) ile eklemleşen kalınlaşmış iç ucu",
            "englishDefinition": "The thickened, triangular medial end of the clavicle that articulates with the manubrium of the sternum.",
            "group": "Clavicula"
        },
        {
            "id": 90,
            "term": "Facies Articularis Sternalis",
            "roots": "facies (yüz) + articularis (eklem) + sternalis (sternum)",
            "turkishDefinition": "Clavicula'nın sternal ucunda bulunan eklem yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Clavicula'nın sternal ucunda bulunan eklem yüzü",
            "english": "Sternal Articular Facet",
            "englishDefinition": "The articular surface at the medial clavicular end forming the sternoclavicular joint with the manubrium and first costal cartilage.",
            "group": "Clavicula"
        },
        {
            "id": 91,
            "term": "Tuberculum Supraglenoidale",
            "english": "Supraglenoid Tubercle",
            "roots": "tuberculum (tümsekçik) + supra (üst) + glenoid (eklem çukuru)",
            "turkishDefinition": "Kürek kemiğindeki glenoid çukurun üst kenarında bulunan, biceps kasının uzun tendonunun tutunduğu tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğindeki glenoid çukurun üst kenarında bulunan, biceps kasının uzun tendonunun tutunduğu tümsekçik",
            "englishDefinition": "A small prominence just above the glenoid cavity giving origin to the long head of biceps brachii.",
            "group": "Scapula"
        },
        {
            "id": 93,
            "term": "Collum Scapulae",
            "english": "Neck of Scapula",
            "roots": "collum (boyun) + scapula (kürek kemiği)",
            "turkishDefinition": "Scapula başı (glenoid bölge) ile kürek kemiğinin gövdesi arasındaki daralmış boyun kısmı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Scapula başı (glenoid bölge) ile kürek kemiğinin gövdesi arasındaki daralmış boyun kısmı",
            "englishDefinition": "A slightly constricted region separating the glenoid cavity from the body of the scapula.",
            "group": "Scapula"
        },
        {
            "id": 94,
            "english": "Infraglenoid Tubercle",
            "roots": "tuberculum (tümsekçik) + infra (alt) + glenoid (eklem çukuru)",
            "turkishDefinition": "Kürek kemiğindeki glenoid çukurun alt kenarında bulunan, triceps kasının uzun başının tutunduğu tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğindeki glenoid çukurun alt kenarında bulunan, triceps kasının uzun başının tutunduğu tümsekçik",
            "englishDefinition": "A roughened prominence just below the glenoid cavity giving origin to the long head of triceps brachii.",
            "term": "Tuberculum Infraglenoidale",
            "group": "Scapula"
        },
        {
            "id": 95,
            "term": "Margo Lateralis Scapulae",
            "english": "Lateral Border of Scapula",
            "roots": "margo (kenar) + lateralis (yan) + scapula (kürek kemiği)",
            "turkishDefinition": "Kürek kemiğinin dış yan kenarı; koltuk altına bakan kalın kenar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin dış yan kenarı",
            "englishDefinition": "The thick, sturdy edge of the scapula facing the axilla.",
            "group": "Scapula"
        },
        {
            "id": 96,
            "term": "Fossa Subscapularis",
            "english": "Subscapular Fossa",
            "roots": "fossa (çukur) + subscapularis (kürek kemiği altı)",
            "turkishDefinition": "Kürek kemiğinin kaburgalara bakan ön yüzeyindeki geniş ve sığ çukurluk; subscapularis kası buraya yerleşir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin kaburgalara bakan ön yüzeyindeki geniş ve sığ çukurluk",
            "englishDefinition": "A broad, shallow concavity on the costal surface of the scapula that gives origin to the subscapularis muscle.",
            "group": "Scapula"
        },
        {
            "id": 97,
            "term": "Margo Medialis Scapulae",
            "english": "Medial Border of Scapula",
            "roots": "margo (kenar) + medialis (iç yan) + scapula (kürek kemiği)",
            "turkishDefinition": "Kürek kemiğinin omurgaya bakan iç yan kenarı; daha ince ve uzundur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin omurgaya bakan iç yan kenarı",
            "englishDefinition": "The thin, elongated edge of the scapula facing the vertebral column.",
            "group": "Scapula"
        },
        {
            "id": 98,
            "term": "Angulus Inferior Scapulae",
            "english": "Inferior Angle of Scapula",
            "roots": "angulus (açı) + inferior (alt) + scapula (kürek kemiği)",
            "turkishDefinition": "Kürek kemiğinin iç yan ve dış yan kenarlarının birleşmesiyle oluşan en alt köşesi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin iç yan ve dış yan kenarlarının birleşmesiyle oluşan en alt köşesi",
            "englishDefinition": "The lowest point of the scapula, formed where the medial and lateral borders converge.",
            "group": "Scapula"
        }
    ],
    "upper_extremity_joints": [
        {
            "id": 92,
            "category": "anatomy",
            "system": "movement",
            "english": "Glenoid Cavity",
            "term": "Cavitas Glenoidalis",
            "englishDefinition": "The shallow, pear-shaped articular surface on the lateral scapula that receives the head of the humerus.",
            "roots": "cavitas (çukur, boşluk) + glenoid (yuva şeklinde)",
            "subcategory": "upper_extremity_joints",
            "turkishDefinition": "Glenoidal çukur; scapula'nın lateralinde yer alan sığ eklem yüzeyi. Humerus başını karşılar ve labrum glenoidale ile derinleştirilir.",
            "turkishShort": "Glenoidal çukur",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 99,
            "term": "Articulatio Humeri",
            "roots": "articulatio (eklem) + humeri (humerusa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Omuz eklemi",
            "englishDefinition": "A ball-and-socket synovial joint between the head of the humerus and the glenoid cavity of the scapula, allowing the widest range of motion in the body.",
            "english": "Shoulder Joint (Glenohumeral Joint)",
            "turkishDefinition": "Omuz eklemi; humerus başı ile scapula'nın cavitas glenoidalis'i arasında oluşan top-yuva tipi sinovyal eklem.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 100,
            "term": "Articulatio Acromioclavicularis",
            "english": "Acromioclavicular Joint",
            "roots": "articulatio (eklem) + acromion (akromion) + clavicula (köprücük kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "A plane synovial joint between the acromial end of the clavicle and the acromion of the scapula.",
            "turkishDefinition": "Akromiyoklaviküler eklem; clavicula'nın akromiyal ucu ile scapula'nın acromion'u arasındaki düzlem tipi sinovyal eklem.",
            "turkishShort": "Akromiyoklaviküler eklem",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 101,
            "term": "Articulatio Sternoclavicularis",
            "english": "Sternoclavicular Joint",
            "roots": "articulatio (eklem) + sternum (göğüs kemiği) + clavicula (köprücük kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "A saddle-type synovial joint between the sternal end of the clavicle and the manubrium of the sternum, forming the only bony connection between the upper limb and the axial skeleton.",
            "turkishDefinition": "Sternoklaviküler eklem; clavicula'nın sternal ucu ile sternum'un manubriumu arasındaki eyer tipi sinovyal eklem. Üst ekstremitenin gövdeye bağlandığı tek gerçek eklemdir.",
            "turkishShort": "Sternoklaviküler eklem",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 102,
            "term": "Articulatio Cubiti",
            "english": "Elbow Joint",
            "turkishDefinition": "Dirsek eklemi; humerus, radius ve ulna arasında oluşan bileşik menteşe tipi sinovyal eklem. Articulatio humeroulnaris, humeroradialis ve radioulnaris proximalis'i kapsar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Dirsek eklemi",
            "englishDefinition": "A compound hinge joint of the elbow formed by the humerus, radius, and ulna, comprising the humeroulnar, humeroradial, and proximal radioulnar articulations.",
            "roots": "articulatio (eklem) + cubitus (dirsek)",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 103,
            "term": "Articulatio Humeroulnaris",
            "english": "Humeroulnar Joint",
            "roots": "articulatio (eklem) + humerus + ulna",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "A hinge joint between the trochlea of the humerus and the trochlear notch of the ulna that permits elbow flexion and extension.",
            "turkishDefinition": "Humeroulnar eklem; humerus'un trochlea'sı ile ulna'nın incisura trochlearis'i arasındaki menteşe tipi eklem. Dirsek fleksiyonu ve ekstansiyonunu sağlar.",
            "turkishShort": "Humeroulnar eklem",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 104,
            "term": "Articulatio Humeroradialis",
            "english": "Humeroradial Joint",
            "roots": "articulatio (eklem) + humerus + radius",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "A ball-and-socket joint between the capitulum of the humerus and the head of the radius that contributes to elbow flexion, extension, and forearm rotation.",
            "turkishDefinition": "Humeroradyal eklem; humerus'un capitulum'u ile radius'un fovea articularis'i arasındaki top-yuva tipi eklem. Fleksiyon, ekstansiyon ve önkol rotasyonuna katılır.",
            "turkishShort": "Humeroradyal eklem",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 105,
            "term": "Articulatio Radioulnaris Proximalis",
            "english": "Proximal Radioulnar Joint",
            "roots": "articulatio (eklem) + radius + ulna + proximalis (yakın)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "A pivot joint between the head of the radius and the radial notch of the ulna that permits pronation and supination of the forearm.",
            "turkishDefinition": "Proksimal radioulnar eklem; radius başının çevresi ile ulna'nın incisura radialis'i arasındaki pivot tipi sinovyal eklem. Önkol pronasyon ve supinasyonunu sağlar.",
            "turkishShort": "Proksimal radioulnar eklem",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 106,
            "term": "Articulatio Radioulnaris Distalis",
            "english": "Distal Radioulnar Joint",
            "roots": "articulatio (eklem) + radius + ulna + distalis (uzak)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "A pivot joint between the head of the ulna and the ulnar notch of the radius that works with the proximal radioulnar joint to complete forearm rotation.",
            "turkishDefinition": "Distal radioulnar eklem; ulna başı ile radius'un incisura ulnaris'i arasındaki pivot tipi sinovyal eklem. Proksimal radioulnar eklemle birlikte önkol rotasyonunu tamamlar.",
            "turkishShort": "Distal radioulnar eklem",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 107,
            "term": "Articulatio Radiocarpalis",
            "roots": "articulatio (eklem) + radius + carpus (el bileği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "El bileği eklemi",
            "english": "Radiocarpal Joint (Wrist Joint)",
            "englishDefinition": "An ellipsoid synovial joint between the distal radius and the proximal carpal row, commonly known as the wrist joint.",
            "turkishDefinition": "El bileği eklemi; radius'un distal yüzeyi ile os scaphoideum, os lunatum ve os triquetrum arasındaki ellipsoid tipi sinovyal eklem.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 108,
            "term": "Articulatio Mediocarpalis",
            "english": "Midcarpal Joint",
            "roots": "articulatio (eklem) + medius (orta) + carpus (el bileği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "A compound synovial joint between the proximal and distal rows of carpal bones that contributes to wrist flexion and extension.",
            "turkishDefinition": "Orta karpal eklem; proksimal karpal sıra ile distal karpal sıra arasındaki bileşik sinovyal eklem. El bileği fleksiyon ve ekstansiyonuna katkı sağlar.",
            "turkishShort": "Orta karpal eklem",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 109,
            "term": "Articulationes Carpometacarpales",
            "english": "Carpometacarpal Joints",
            "roots": "articulatio (eklem) + carpus (el bileği) + metacarpus (el tarağı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "The joints between the distal carpal bones and the bases of the five metacarpal bones.",
            "turkishDefinition": "Karpometakarpal eklemler; distal karpal kemikler ile 5 metakarp kemiğinin tabanları arasındaki eklemler. 1. parmak CMC eklemi eyer tipi olup en fazla hareket serbestisine sahiptir.",
            "turkishShort": "Karpometakarpal eklemler",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 110,
            "term": "Articulatio Carpometacarpalis Pollicis",
            "english": "Carpometacarpal Joint of Thumb",
            "roots": "articulatio (eklem) + carpus + metacarpus + pollex (başparmak)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "A saddle joint between the trapezium and the base of the first metacarpal that allows the thumb's wide range of motion, including opposition.",
            "turkishDefinition": "Başparmak karpometakarpal eklemi; os trapezium ile 1. metakarp tabanı arasındaki eyer tipi sinovyal eklem. Başparmak abduksiyonu, adduksiyonu, fleksiyonu, ekstansiyonu ve opposisyonuna izin verir.",
            "turkishShort": "Başparmak karpometakarpal eklemi",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 111,
            "roots": "articulatio (eklem) + metacarpus (el tarağı) + phalanx (parmak kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "english": "Metacarpophalangeal Joints (MCP Joints)",
            "englishDefinition": "Condyloid synovial joints between the metacarpal heads and the bases of the proximal phalanges, permitting flexion, extension, abduction, and adduction.",
            "term": "Articulationes Metacarpophalangeales",
            "turkishDefinition": "Metakarpofalangeal eklemler; metakarp başları ile proksimal falanksların tabanları arasındaki kondiloid tip sinovyal eklemler. Fleksiyon, ekstansiyon, abduksiyon ve adduksiyona izin verir.",
            "turkishShort": "Metakarpofalangeal eklemler",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 112,
            "roots": "articulatio (eklem) + inter (arasında) + phalanx (parmak kemiği) + manus (el)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "english": "Interphalangeal Joints of the Hand (PIP and DIP Joints)",
            "englishDefinition": "Hinge synovial joints between the phalanges of the fingers, allowing flexion and extension at the proximal and distal joints.",
            "term": "Articulationes Interphalangeales Manus",
            "turkishDefinition": "Elin interfalangeal eklemleri; parmak falankslari arasındaki menteşe tipi sinovyal eklemler. Proksimal (PIP) ve distal (DIP) interfalangeal eklemler yalnızca fleksiyon ve ekstansiyona izin verir.",
            "turkishShort": "Elin interfalangeal eklemleri",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 113,
            "term": "Cavitas Glenoidalis",
            "english": "Glenoid Cavity",
            "roots": "cavitas (çukur, boşluk) + glenoid (yuva şeklinde)",
            "turkishDefinition": "Scapula'nın lateralinde yer alan sığ eklem yüzeyi. Humerus Başını karşılar ve Labrum Glenoidale ile derinleştirilir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Scapula'nın lateralinde yer alan sığ eklem yüzeyi",
            "englishDefinition": "A shallow articular surface on the lateral scapula that receives the humeral head, deepened by the glenoid labrum."
        },
        {
            "id": 114,
            "term": "Labrum Glenoidale",
            "english": "Glenoid Labrum",
            "roots": "labrum (dudak, kenar) + glenoidale (glenoide ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "A ring of fibrocartilage surrounding the glenoid cavity that deepens the socket and enhances shoulder joint stability.",
            "turkishDefinition": "Glenoidal dudak; cavitas glenoidalis çevresini çevreleyen fibrokartilaj halka. Eklem yüzeyini derinleştirerek omuz ekleminin stabilitesini artırır.",
            "turkishShort": "Glenoidal dudak",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 115,
            "term": "Capsula Articularis",
            "roots": "capsula (kapsül, kılıf) + articularis (ekleme ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "english": "Articular Capsule (Joint Capsule)",
            "englishDefinition": "The fibrous sleeve enclosing a synovial joint, consisting of an outer fibrous layer and an inner synovial membrane.",
            "turkishDefinition": "Eklem kapsülü; sinovyal eklemi çevreleyen fibröz kılıf. Dış tabakası fibröz membran, iç tabakası sinovyal membrandan oluşur.",
            "turkishShort": "Eklem kapsülü",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 116,
            "term": "Membrana Synovialis",
            "english": "Synovial Membrane",
            "roots": "membrana (zar, tabaka) + synovialis (sinoviyal, yumurta akı benzeri)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "The inner lining of the joint capsule that secretes synovial fluid, nourishes the articular cartilage, and reduces friction.",
            "turkishDefinition": "Sinovyal membran; eklem kapsülünün iç tabakası. Sinovyal sıvı üretir, eklem kıkırdağını besler ve sürtünmeyi azaltır.",
            "turkishShort": "Sinovyal membran",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 117,
            "term": "Discus Articularis",
            "english": "Articular Disc",
            "roots": "discus (disk, yuvarlak levha) + articularis (ekleme ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "A fibrocartilaginous plate found within certain joints that improves the fit between two articular surfaces and helps distribute load.",
            "turkishDefinition": "Eklem diski; bazı eklemlerde iki eklem yüzeyi arasında yer alan fibrokartilaj yapı. Sternoclavicular ve temporomandibular eklemlerde bulunur; yük dağılımını optimize eder.",
            "turkishShort": "Eklem diski",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 118,
            "term": "Bursa Synovialis",
            "english": "Synovial Bursa",
            "roots": "bursa (kese, torba) + synovialis (sinoviyal)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "englishDefinition": "A small fluid-filled sac located where tendons or muscles glide over bone, reducing friction at that site.",
            "turkishDefinition": "Sinovyal bursa; tendon veya kasların kemik üzerinden geçtiği yerlerde sürtünmeyi azaltan sinovyal sıvı içeren küçük kese. Omuz bölgesinde bursa subacromialis klinik açıdan önemlidir.",
            "turkishShort": "Sinovyal bursa",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        }
    ],
    "lower_extremity_bones": [
        {
            "id": 119,
            "term": "Os Coxae",
            "english": "Hip Bone / Coxal Bone",
            "roots": "os (kemik) + coxa (kalça)",
            "turkishDefinition": "Os coxae, ilium, ischium ve pubis'in birleşmesiyle oluşan kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "Os coxae, ilium, ischium ve pubis'in birleşmesiyle oluşan kemiktir",
            "turkish": "Hip Bone / Coxal Bone",
            "definition": "Os coxae, ilium, ischium ve pubis'in birleşmesiyle oluşan kemiktir.",
            "englishDefinition": "A large flat bone formed by fusion of the ilium, ischium, and pubis, connecting the lower limb to the axial skeleton at the pelvis."
        },
        {
            "id": 120,
            "term": "Femur",
            "roots": "femur (uyluk kemiği)",
            "turkishDefinition": "İnsan vücudundaki en uzun, en hacimli ve en güçlü kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "İnsan vücudundaki en uzun, en hacimli ve en güçlü kemiktir",
            "turkish": "Femur / Thigh Bone",
            "english": "Femur / Thigh Bone",
            "definition": "İnsan vücudundaki en uzun, en hacimli ve en güçlü kemiktir.",
            "englishDefinition": "The longest, heaviest, and strongest bone in the human body, extending from the hip joint to the knee joint."
        },
        {
            "id": 121,
            "term": "Patella",
            "english": "Patella / Knee Bone",
            "roots": "patella (diz kapağı)",
            "turkishDefinition": "İnsan vücudundaki en büyük Sesamoid kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "İnsan vücudundaki en büyük Sesamoid kemiktir",
            "turkish": "Patella / Knee Bone",
            "definition": "İnsan vücudundaki en büyük Sesamoid kemiktir.",
            "englishDefinition": "The largest sesamoid bone in the human body, embedded within the quadriceps tendon and protecting the front of the knee joint."
        },
        {
            "id": 122,
            "term": "Tibia",
            "english": "Tibia / Shin Bone",
            "roots": "tibia (kaval kemiği)",
            "turkishDefinition": "Bacağın en büyük kemiğidir; Art. Genus ve Art. Talocruralis'in oluşumuna katılır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "Bacağın en büyük kemiğidir",
            "turkish": "Tibia / Shin Bone",
            "definition": "Bacağın en büyük kemiğidir; Art. Genus ve Art. Talocruralis'in oluşumuna katılır.",
            "englishDefinition": "The larger of the two leg bones, bearing most of the body's weight and contributing to both the knee and ankle joints."
        },
        {
            "id": 123,
            "term": "Fibula",
            "roots": "fibula (ince baldır kemiği)",
            "turkishDefinition": "Bacağın iki kemiğinden daha küçük olanıdır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "Bacağın iki kemiğinden daha küçük olanıdır",
            "turkish": "Fibula / Calf Bone",
            "english": "Fibula / Calf Bone",
            "definition": "Bacağın iki kemiğinden daha küçük olanıdır.",
            "englishDefinition": "The slender, laterally positioned leg bone that provides muscle attachment and forms the lateral malleolus of the ankle."
        },
        {
            "id": 124,
            "term": "Ossa Tarsi",
            "english": "Tarsal Bones",
            "roots": "ossa (kemikler) + tarsus (ayak bileği)",
            "turkishDefinition": "Ayakta Ossa Metatarsalia ve Phalanges Pedis dışında kalan yedi kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "Ayakta Ossa Metatarsalia ve Phalanges Pedis dışında kalan yedi kemiktir",
            "turkish": "Tarsal Bones",
            "definition": "Ayakta Ossa Metatarsalia ve Phalanges Pedis dışında kalan yedi kemiktir.",
            "englishDefinition": "The seven bones of the ankle and hindfoot region, forming the posterior part of the foot proximal to the metatarsals."
        },
        {
            "id": 125,
            "english": "Metatarsal Bones",
            "roots": "ossa (kemikler) + metatarsus (ayak ayası)",
            "turkishDefinition": "Ayakta medialden laterale doğru I'den V'e numaralandırılan 5 uzun kemikten oluşur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "Ayakta medialden laterale doğru I'den V'e numaralandırılan 5 uzun kemikten oluşur",
            "turkish": "Metatarsal Bones",
            "definition": "Ayakta medialden laterale doğru I'den V'e numaralandırılan 5 uzun kemikten oluşur.",
            "englishDefinition": "Five long bones of the midfoot, numbered I to V from medial to lateral, connecting the tarsals to the toes.",
            "term": "Ossa Metatarsalia"
        },
        {
            "id": 126,
            "term": "Phalanges Pedis",
            "english": "Phalanges of Foot",
            "roots": "phalanx (parmak kemiği) + pes (ayak)",
            "turkishDefinition": "Ossa Metatarsalia'nın Distal'inde yer alan ve ayak parmaklarını oluşturan uzun kemiklerdir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "Ossa Metatarsalia'nın Distal'inde yer alan ve ayak parmaklarını oluşturan uzun kemiklerdir",
            "turkish": "Phalanges of Foot",
            "definition": "Ossa Metatarsalia'nın Distal'inde yer alan ve ayak parmaklarını oluşturan uzun kemiklerdir.",
            "englishDefinition": "The miniature long bones of the toes; two in the hallux (great toe) and three in each other toe, totaling 14."
        }
    ],
    "lower_extremity_joints": [
        {
            "id": 127,
            "term": "Articulatio Coxae",
            "english": "Hip Joint",
            "roots": "articulatio (eklem) + coxa (kalça)",
            "turkishDefinition": "Kalça eklemi; femur başı ile os coxae'nin acetabulum'u arasında oluşan top-yuva tipi sinovyal eklem. Vücuttaki en stabil eklemlerden biridir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Kalça eklemi",
            "turkish": "Hip Joint",
            "definition": "Kalça eklemi; femur başı ile os coxae'nin acetabulum'u arasında oluşan top-yuva tipi sinovyal eklem. Vücuttaki en stabil eklemlerden biridir.",
            "englishDefinition": "A ball-and-socket synovial joint between the head of the femur and the acetabulum of the hip bone, providing one of the most stable joints in the body.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 128,
            "term": "Acetabulum",
            "english": "Acetabulum",
            "roots": "acetabulum (sirke kabı - şekil benzetmesi)",
            "turkishDefinition": "Asetabulum; os coxae üzerinde os ilium, os ischii ve os pubis'in birleşiminden oluşan derin, yarım küre şeklindeki eklem çukuru. Femur başını karşılar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Asetabulum",
            "turkish": "Acetabulum",
            "definition": "Asetabulum; os coxae üzerinde os ilium, os ischii ve os pubis'in birleşiminden oluşan derin, yarım küre şeklindeki eklem çukuru. Femur başını karşılar.",
            "englishDefinition": "The deep, cup-shaped socket on the hip bone formed by the ilium, ischium, and pubis that receives the head of the femur.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 129,
            "term": "Labrum Acetabulare",
            "english": "Acetabular Labrum",
            "roots": "labrum (dudak, kenar) + acetabulare (asetabuluma ait)",
            "turkishDefinition": "Asetabular dudak; acetabulum kenarını çevreleyen fibrokartilaj halka. Eklem yüzeyini derinleştirerek kalça ekleminin stabilitesini ve negatif basıncını artırır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Asetabular dudak",
            "turkish": "Acetabular Labrum",
            "definition": "Asetabular dudak; acetabulum kenarını çevreleyen fibrokartilaj halka. Eklem yüzeyini derinleştirerek kalça ekleminin stabilitesini ve negatif basıncını artırır.",
            "englishDefinition": "A ring of fibrocartilage around the rim of the acetabulum that deepens the socket and enhances stability of the hip joint.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 130,
            "term": "Ligamentum Capitis Femoris",
            "roots": "ligamentum (bağ) + caput (baş) + femur (uyluk kemiği)",
            "turkishDefinition": "Femur başı bağı; femur başındaki fovea capitis'ten acetabulum tabanına uzanan intraartiküler bağ. İçinden femur başına giden bir arter (a. capitis femoris) geçer.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Femur başı bağı",
            "turkish": "Ligament of the Head of Femur",
            "definition": "Femur başı bağı; femur başındaki fovea capitis'ten acetabulum tabanına uzanan intraartiküler bağ. İçinden femur başına giden bir arter (a. capitis femoris) geçer.",
            "english": "Ligament of Head of Femur",
            "englishDefinition": "An intra-articular ligament running from the fovea of the femoral head to the base of the acetabulum, carrying a small artery to the femoral head.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 131,
            "term": "Articulatio Genus",
            "english": "Knee Joint",
            "roots": "articulatio (eklem) + genu (diz)",
            "turkishDefinition": "Diz eklemi; femur, tibia ve patella arasında oluşan vücudun en büyük ve en karmaşık sinovyal eklemi. Menteşe ve rotasyon hareketlerini birleştirir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Diz eklemi",
            "turkish": "Knee Joint",
            "definition": "Diz eklemi; femur, tibia ve patella arasında oluşan vücudun en büyük ve en karmaşık sinovyal eklemi. Menteşe ve rotasyon hareketlerini birleştirir.",
            "englishDefinition": "The largest and most complex synovial joint in the body, formed by the femur, tibia, and patella, combining hinge and rotational movement.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 132,
            "term": "Articulatio Femorotibialis",
            "english": "Femorotibial Joint",
            "roots": "articulatio (eklem) + femur + tibia (kaval kemiği)",
            "turkishDefinition": "Femorotibiyal eklem; diz ekleminin femur ile tibia kondilleri arasındaki ana eklem bölümü. Diz fleksiyon ve ekstansiyonunun asıl gerçekleştiği yerdir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Femorotibiyal eklem",
            "turkish": "Femorotibial Joint",
            "definition": "Femorotibiyal eklem; diz ekleminin femur ile tibia kondilleri arasındaki ana eklem bölümü. Diz fleksiyon ve ekstansiyonunun asıl gerçekleştiği yerdir.",
            "englishDefinition": "The main weight-bearing component of the knee joint between the femoral and tibial condyles, primarily responsible for flexion and extension.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 133,
            "term": "Articulatio Femoropatellaris",
            "english": "Femoropatellar Joint",
            "roots": "articulatio (eklem) + femur + patella (diz kapağı)",
            "turkishDefinition": "Femoropatellar eklem; patella'nın arka yüzü ile femur'un facies patellaris'i arasındaki eklem bölümü. Diz ekstansiyonu sırasında patella'nın kayma hareketini sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Femoropatellar eklem",
            "turkish": "Femoropatellar Joint",
            "definition": "Femoropatellar eklem; patella'nın arka yüzü ile femur'un facies patellaris'i arasındaki eklem bölümü. Diz ekstansiyonu sırasında patella'nın kayma hareketini sağlar.",
            "englishDefinition": "The joint compartment between the posterior surface of the patella and the patellar surface of the femur, allowing the patella to glide during knee extension.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 134,
            "term": "Meniscus Medialis",
            "english": "Medial Meniscus",
            "roots": "meniscus (hilal şeklinde yapı) + medialis (iç, orta hatta yakın)",
            "turkishDefinition": "Medial menisküs; tibia'nın medial kondili üzerinde yer alan C şeklinde fibrokartilaj yapı. Yük dağılımını sağlar, lateral menisküse göre daha az hareketli ve yaralanmaya daha yatkındır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Medial menisküs",
            "turkish": "Medial Meniscus",
            "definition": "Medial menisküs; tibia'nın medial kondili üzerinde yer alan C şeklinde fibrokartilaj yapı. Yük dağılımını sağlar, lateral menisküse göre daha az hareketli ve yaralanmaya daha yatkındır.",
            "englishDefinition": "A C-shaped fibrocartilage structure on the medial tibial condyle that distributes load and is more prone to injury due to limited mobility.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 135,
            "term": "Meniscus Lateralis",
            "english": "Lateral Meniscus",
            "roots": "meniscus (hilal şeklinde yapı) + lateralis (dış, yan)",
            "turkishDefinition": "Lateral menisküs; tibia'nın lateral kondili üzerinde yer alan, medial menisküse göre daha yuvarlak ve hareketli fibrokartilaj yapı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Lateral menisküs",
            "turkish": "Lateral Meniscus",
            "definition": "Lateral menisküs; tibia'nın lateral kondili üzerinde yer alan, medial menisküse göre daha yuvarlak ve hareketli fibrokartilaj yapı.",
            "englishDefinition": "A more circular and mobile fibrocartilage structure on the lateral tibial condyle that helps distribute load across the knee joint.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 136,
            "term": "Ligamentum Cruciatum Anterius",
            "english": "Anterior Cruciate Ligament (ACL)",
            "roots": "ligamentum (bağ) + cruciatus (çapraz şeklinde) + anterius (ön)",
            "turkishDefinition": "Ön çapraz bağ; tibia'nın ön interkondiler alanından femur'un lateral kondiline uzanan intraartiküler bağ. Tibia'nın öne doğru kaymasını sınırlar, diz stabilitesinde kritik rol oynar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Ön çapraz bağ",
            "turkish": "Anterior Cruciate Ligament (ACL)",
            "definition": "Ön çapraz bağ; tibia'nın ön interkondiler alanından femur'un lateral kondiline uzanan intraartiküler bağ. Tibia'nın öne doğru kaymasını sınırlar, diz stabilitesinde kritik rol oynar.",
            "englishDefinition": "An intra-articular ligament running from the anterior intercondylar area of the tibia to the lateral femoral condyle, limiting anterior translation of the tibia.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 137,
            "term": "Ligamentum Cruciatum Posterius",
            "english": "Posterior Cruciate Ligament (PCL)",
            "roots": "ligamentum (bağ) + cruciatus (çapraz şeklinde) + posterius (arka)",
            "turkishDefinition": "Arka çapraz bağ; tibia'nın arka interkondiler alanından femur'un medial kondiline uzanan intraartiküler bağ. Tibia'nın arkaya doğru kaymasını sınırlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Arka çapraz bağ",
            "turkish": "Posterior Cruciate Ligament (PCL)",
            "definition": "Arka çapraz bağ; tibia'nın arka interkondiler alanından femur'un medial kondiline uzanan intraartiküler bağ. Tibia'nın arkaya doğru kaymasını sınırlar.",
            "englishDefinition": "An intra-articular ligament running from the posterior intercondylar area of the tibia to the medial femoral condyle, limiting posterior translation of the tibia.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 138,
            "term": "Ligamentum Collaterale Tibiale",
            "roots": "ligamentum (bağ) + collateralis (yan) + tibiale (tibiaya ait)",
            "turkishDefinition": "Tibial kollateral bağ (medial kollateral bağ); femur'un medial epikondilinden tibia'ya uzanan, dizin iç tarafını destekleyen ekstraartiküler bağ. Valgus streslerine karşı korur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Tibial kollateral bağ (medial kollateral bağ)",
            "turkish": "Tibial Collateral Ligament (MCL)",
            "definition": "Tibial kollateral bağ (medial kollateral bağ); femur'un medial epikondilinden tibia'ya uzanan, dizin iç tarafını destekleyen ekstraartiküler bağ. Valgus streslerine karşı korur.",
            "english": "Tibial Collateral Ligament (Medial Collateral Ligament, MCL)",
            "englishDefinition": "An extra-articular ligament connecting the medial femoral epicondyle to the tibia, resisting valgus stress at the knee.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 139,
            "term": "Ligamentum Collaterale Fibulare",
            "roots": "ligamentum (bağ) + collateralis (yan) + fibulare (fibulaya ait)",
            "turkishDefinition": "Fibular kollateral bağ (lateral kollateral bağ); femur'un lateral epikondilinden fibula başına uzanan, dizin dış tarafını destekleyen ekstraartiküler bağ. Varus streslerine karşı korur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Fibular kollateral bağ (lateral kollateral bağ)",
            "turkish": "Fibular Collateral Ligament (LCL)",
            "definition": "Fibular kollateral bağ (lateral kollateral bağ); femur'un lateral epikondilinden fibula başına uzanan, dizin dış tarafını destekleyen ekstraartiküler bağ. Varus streslerine karşı korur.",
            "english": "Fibular Collateral Ligament (Lateral Collateral Ligament, LCL)",
            "englishDefinition": "An extra-articular ligament connecting the lateral femoral epicondyle to the fibular head, resisting varus stress at the knee.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 140,
            "term": "Ligamentum Patellae",
            "english": "Patellar Ligament",
            "roots": "ligamentum (bağ) + patella (diz kapağı)",
            "turkishDefinition": "Patellar bağ; patella'nın alt ucundan tibia'nın tuberositas tibiae'sine uzanan, quadriceps femoris tendonunun devamı niteliğindeki güçlü bağ.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Patellar bağ",
            "turkish": "Patellar Ligament",
            "definition": "Patellar bağ; patella'nın alt ucundan tibia'nın tuberositas tibiae'sine uzanan, quadriceps femoris tendonunun devamı niteliğindeki güçlü bağ.",
            "englishDefinition": "The continuation of the quadriceps femoris tendon extending from the inferior pole of the patella to the tibial tuberosity.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 141,
            "term": "Articulatio Tibiofibularis",
            "english": "Tibiofibular Joint (Proximal)",
            "roots": "articulatio (eklem) + tibia (kaval kemiği) + fibula (kamış kemiği)",
            "turkishDefinition": "Tibiofibular eklem; tibia'nın lateral kondili ile fibula başı arasındaki düzlem tipi sinovyal eklem. Ayak bileği hareketleri sırasında fibula'nın küçük rotasyonel hareketlerine izin verir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Tibiofibular eklem",
            "turkish": "Tibiofibular Joint (Proximal)",
            "definition": "Tibiofibular eklem; tibia'nın lateral kondili ile fibula başı arasındaki düzlem tipi sinovyal eklem. Ayak bileği hareketleri sırasında fibula'nın küçük rotasyonel hareketlerine izin verir.",
            "englishDefinition": "A plane synovial joint between the lateral tibial condyle and the head of the fibula that allows slight rotational movement of the fibula.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 142,
            "term": "Articulatio Talocruralis",
            "english": "Talocrural Joint (Ankle Joint)",
            "roots": "articulatio (eklem) + talus (aşık kemiği) + crus (bacak)",
            "turkishDefinition": "Ayak bileği eklemi; tibia ve fibula'nın distal uçları ile talus arasındaki menteşe tipi sinovyal eklem. Dorsifleksiyon ve plantar fleksiyonu sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Ayak bileği eklemi",
            "turkish": "Talocrural Joint (Ankle Joint)",
            "definition": "Ayak bileği eklemi; tibia ve fibula'nın distal uçları ile talus arasındaki menteşe tipi sinovyal eklem. Dorsifleksiyon ve plantar fleksiyonu sağlar.",
            "englishDefinition": "A hinge synovial joint between the distal tibia and fibula and the talus, commonly known as the ankle joint, permitting dorsiflexion and plantarflexion.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 143,
            "term": "Articulatio Subtalaris",
            "english": "Subtalar Joint",
            "roots": "articulatio (eklem) + sub (altında) + talus (aşık kemiği)",
            "turkishDefinition": "Subtalar eklem; talus ile calcaneus arasındaki sinovyal eklem. Ayağın inversiyon ve eversiyon hareketlerinin büyük kısmını sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Subtalar eklem",
            "turkish": "Subtalar Joint",
            "definition": "Subtalar eklem; talus ile calcaneus arasındaki sinovyal eklem. Ayağın inversiyon ve eversiyon hareketlerinin büyük kısmını sağlar.",
            "englishDefinition": "A synovial joint between the talus and calcaneus responsible for most of the foot's inversion and eversion movement.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 144,
            "term": "Articulatio Talocalcaneonavicularis",
            "english": "Talocalcaneonavicular Joint",
            "roots": "articulatio (eklem) + talus + calcaneus (topuk kemiği) + naviculare (naviküler kemiğe ait)",
            "turkishDefinition": "Talokalkaneonaviküler eklem; talus, calcaneus ve os naviculare arasındaki bileşik sinovyal eklem. Subtalar eklemle birlikte inversiyon-eversiyon hareketine katkı sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Talokalkaneonaviküler eklem",
            "turkish": "Talocalcaneonavicular Joint",
            "definition": "Talokalkaneonaviküler eklem; talus, calcaneus ve os naviculare arasındaki bileşik sinovyal eklem. Subtalar eklemle birlikte inversiyon-eversiyon hareketine katkı sağlar.",
            "englishDefinition": "A compound synovial joint involving the talus, calcaneus, and navicular bone that works with the subtalar joint to produce inversion and eversion.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 145,
            "term": "Articulatio Calcaneocuboidea",
            "english": "Calcaneocuboid Joint",
            "roots": "articulatio (eklem) + calcaneus (topuk kemiği) + cuboideum (küp şeklinde kemik)",
            "turkishDefinition": "Kalkaneoküboid eklem; calcaneus ile os cuboideum arasındaki sinovyal eklem. Talokalkaneonaviküler eklemle birlikte transvers tarsal eklem hattını (Chopart eklemi) oluşturur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Kalkaneoküboid eklem",
            "turkish": "Calcaneocuboid Joint",
            "definition": "Kalkaneoküboid eklem; calcaneus ile os cuboideum arasındaki sinovyal eklem. Talokalkaneonaviküler eklemle birlikte transvers tarsal eklem hattını (Chopart eklemi) oluşturur.",
            "englishDefinition": "A synovial joint between the calcaneus and the cuboid bone that, together with the talocalcaneonavicular joint, forms the transverse tarsal joint line.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 146,
            "term": "Articulationes Tarsometatarsales",
            "english": "Tarsometatarsal Joints (Lisfranc Joint)",
            "roots": "articulatio (eklem) + tarsus (ayak bileği-tarsal bölge) + metatarsus (ayak tarağı)",
            "turkishDefinition": "Tarsometatarsal eklemler; distal tarsal kemikler (cuneiforme ve cuboideum) ile 5 metatars kemiğinin tabanları arasındaki eklemler. Klinik olarak 'Lisfranc eklemi' olarak da bilinir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Tarsometatarsal eklemler",
            "turkish": "Tarsometatarsal Joints (Lisfranc Joint)",
            "definition": "Tarsometatarsal eklemler; distal tarsal kemikler (cuneiforme ve cuboideum) ile 5 metatars kemiğinin tabanları arasındaki eklemler. Klinik olarak 'Lisfranc eklemi' olarak da bilinir.",
            "englishDefinition": "The joints between the distal tarsal bones and the bases of the five metatarsal bones, also known clinically as the Lisfranc joint.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 147,
            "term": "Articulationes Metatarsophalangeales",
            "english": "Metatarsophalangeal Joints (MTP Joints)",
            "roots": "articulatio (eklem) + metatarsus (ayak tarağı) + phalanx (parmak kemiği)",
            "turkishDefinition": "Metatarsofalangeal eklemler; metatars başları ile proksimal falanksların tabanları arasındaki kondiloid tip sinovyal eklemler. Yürüme sırasında itiş fazında kritik rol oynar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Metatarsofalangeal eklemler",
            "turkish": "Metatarsophalangeal Joints (MTP Joints)",
            "definition": "Metatarsofalangeal eklemler; metatars başları ile proksimal falanksların tabanları arasındaki kondiloid tip sinovyal eklemler. Yürüme sırasında itiş fazında kritik rol oynar.",
            "englishDefinition": "Condyloid synovial joints between the metatarsal heads and the bases of the proximal phalanges, important during the propulsive phase of gait.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 148,
            "roots": "articulatio (eklem) + inter (arasında) + phalanx (parmak kemiği) + pes (ayak)",
            "turkishDefinition": "Ayağın interfalangeal eklemleri; ayak parmağı falanksları arasındaki menteşe tipi sinovyal eklemler. Proksimal (PIP) ve distal (DIP) interfalangeal eklemleri kapsar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Ayağın interfalangeal eklemleri",
            "turkish": "Interphalangeal Joints of the Foot",
            "english": "Interphalangeal Joints of the Foot",
            "definition": "Ayağın interfalangeal eklemleri; ayak parmağı falanksları arasındaki menteşe tipi sinovyal eklemler. Proksimal (PIP) ve distal (DIP) interfalangeal eklemleri kapsar.",
            "term": "Articulationes Interphalangeales Pedis",
            "englishDefinition": "Hinge synovial joints between the phalanges of the toes, including the proximal and distal interphalangeal joints.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 149,
            "roots": "ligamentum (bağ) + inguen (kasık)",
            "turkishDefinition": "İnguinal bağ (kasık bağı); spina iliaca anterior superior'dan tuberculum pubicum'a uzanan, karın duvarı ile uyluk arasındaki sınırı oluşturan bağ.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "İnguinal bağ (kasık bağı)",
            "turkish": "Inguinal Ligament",
            "english": "Inguinal Ligament",
            "definition": "İnguinal bağ (kasık bağı); spina iliaca anterior superior'dan tuberculum pubicum'a uzanan, karın duvarı ile uyluk arasındaki sınırı oluşturan bağ.",
            "term": "Ligamentum Inguinale",
            "englishDefinition": "A band of connective tissue running from the anterior superior iliac spine to the pubic tubercle, marking the boundary between the abdominal wall and the thigh.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 150,
            "roots": "membrana (zar) + interosseus (kemikler arası) + crus (bacak)",
            "turkishDefinition": "Bacağın interosseöz membranı; tibia ve fibula gövdeleri arasında uzanan, iki kemiği birbirine bağlayan fibröz zar. Kas yapışma yüzeyi olarak da görev yapar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Bacağın interosseöz membranı",
            "turkish": "Interosseous Membrane of the Leg",
            "definition": "Bacağın interosseöz membranı; tibia ve fibula gövdeleri arasında uzanan, iki kemiği birbirine bağlayan fibröz zar. Kas yapışma yüzeyi olarak da görev yapar.",
            "term": "Membrana Interossea Cruris",
            "english": "Interosseous Membrane of Leg",
            "englishDefinition": "A fibrous membrane connecting the shafts of the tibia and fibula, providing an attachment site for surrounding muscles.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        }
    ],
    "head_and_neck_joints": [
        {
            "id": 170,
            "term": "Articulatio Temporomandibularis",
            "english": "Temporomandibular Joint (TMJ)",
            "roots": "articulatio (eklem) + temporalis (şakak kemiğine ait) + mandibula (alt çene)",
            "turkishDefinition": "Temporomandibular eklem; os temporale'nin fossa mandibularis'i ile mandibula'nın caput mandibulae'si arasındaki bileşik sinovyal eklem. Çene açma-kapama, öne-arkaya kayma ve yanal hareketleri sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Temporomandibular eklem",
            "turkish": "Temporomandibular Joint (TMJ)",
            "definition": "Temporomandibular eklem; os temporale'nin fossa mandibularis'i ile mandibula'nın caput mandibulae'si arasındaki bileşik sinovyal eklem. Çene açma-kapama, öne-arkaya kayma ve yanal hareketleri sağlar.",
            "englishDefinition": "A compound synovial joint between the mandibular fossa of the temporal bone and the head of the mandible, enabling jaw opening, closing, and lateral movements.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 171,
            "term": "Discus Articularis Temporomandibularis",
            "roots": "discus (disk) + articularis (ekleme ait) + temporomandibularis (temporomandibulara ait)",
            "turkishDefinition": "Temporomandibular eklem diski; eklem boşluğunu üst ve alt olmak üzere ikiye ayıran fibrokartilaj disk. Eklem yüzeylerinin uyumunu sağlar ve yükü dağıtır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Temporomandibular eklem diski",
            "turkish": "Articular Disc of the Temporomandibular Joint",
            "definition": "Temporomandibular eklem diski; eklem boşluğunu üst ve alt olmak üzere ikiye ayıran fibrokartilaj disk. Eklem yüzeylerinin uyumunu sağlar ve yükü dağıtır.",
            "english": "Articular Disc of Temporomandibular Joint",
            "englishDefinition": "A fibrocartilaginous disc that divides the temporomandibular joint cavity into upper and lower compartments, improving the fit and distributing load between the articular surfaces.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 172,
            "term": "Fossa Mandibularis",
            "english": "Mandibular Fossa",
            "roots": "fossa (çukur) + mandibularis (alt çeneye ait)",
            "turkishDefinition": "Mandibular çukur; os temporale üzerinde yer alan, mandibula'nın caput mandibulae'sini (kondil başı) karşılayan derin çukur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Mandibular çukur",
            "turkish": "Mandibular Fossa",
            "definition": "Mandibular çukur; os temporale üzerinde yer alan, mandibula'nın caput mandibulae'sini (kondil başı) karşılayan derin çukur.",
            "englishDefinition": "A deep depression on the temporal bone that receives the head of the mandible.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 173,
            "term": "Caput Mandibulae",
            "english": "Head of Mandible (Mandibular Condyle)",
            "roots": "caput (baş) + mandibula (alt çene)",
            "turkishDefinition": "Mandibula başı (kondili); mandibula'nın processus condylaris'inin üst ucunda yer alan, temporomandibular eklemi oluşturan yuvarlak eklem yüzeyi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Mandibula başı (kondili)",
            "turkish": "Head of Mandible (Mandibular Condyle)",
            "definition": "Mandibula başı (kondili); mandibula'nın processus condylaris'inin üst ucunda yer alan, temporomandibular eklemi oluşturan yuvarlak eklem yüzeyi.",
            "englishDefinition": "The rounded articular surface at the top of the mandibular condylar process that forms part of the temporomandibular joint.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 174,
            "term": "Ligamentum Temporomandibulare",
            "english": "Temporomandibular Ligament (Lateral Ligament)",
            "roots": "ligamentum (bağ) + temporomandibularis (temporomandibulara ait)",
            "turkishDefinition": "Temporomandibular bağ (lateral bağ); eklem kapsülünün lateral yüzünü güçlendiren bağ. Mandibula'nın aşırı geriye ve aşağıya hareketini sınırlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Temporomandibular bağ (lateral bağ)",
            "turkish": "Temporomandibular Ligament (Lateral Ligament)",
            "definition": "Temporomandibular bağ (lateral bağ); eklem kapsülünün lateral yüzünü güçlendiren bağ. Mandibula'nın aşırı geriye ve aşağıya hareketini sınırlar.",
            "englishDefinition": "A lateral ligament that reinforces the temporomandibular joint capsule and limits excessive posterior and inferior movement of the mandible.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 175,
            "term": "Sutura Coronalis",
            "english": "Coronal Suture",
            "roots": "sutura (dikiş, sütur) + coronalis (taç şeklinde, önden geçen)",
            "turkishDefinition": "Koronal sütur; os frontale ile iki os parietale arasında, kafatasının önden geçen sabit fibröz eklemi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Koronal sütur",
            "turkish": "Coronal Suture",
            "definition": "Koronal sütur; os frontale ile iki os parietale arasında, kafatasının önden geçen sabit fibröz eklemi.",
            "englishDefinition": "The fixed fibrous joint running across the front of the skull between the frontal bone and the two parietal bones.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 176,
            "term": "Sutura Sagittalis",
            "english": "Sagittal Suture",
            "roots": "sutura (dikiş, sütur) + sagittalis (ok yönünde, ön-arka doğrultuda)",
            "turkishDefinition": "Sagittal sütur; iki os parietale arasında, kafatasının tepesinde ön-arka doğrultuda uzanan sabit fibröz eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Sagittal sütur",
            "turkish": "Sagittal Suture",
            "definition": "Sagittal sütur; iki os parietale arasında, kafatasının tepesinde ön-arka doğrultuda uzanan sabit fibröz eklem.",
            "englishDefinition": "The fixed fibrous joint running along the midline of the skull between the two parietal bones.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 177,
            "term": "Sutura Lambdoidea",
            "english": "Lambdoid Suture",
            "roots": "sutura (dikiş, sütur) + lambda (Yunan alfabesinde λ harfi)",
            "turkishDefinition": "Lambdoid sütur; iki os parietale ile os occipitale arasında, kafatasının arkasında yer alan ve Yunan harfi lambda'ya benzeyen sabit fibröz eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Lambdoid sütur",
            "turkish": "Lambdoid Suture",
            "definition": "Lambdoid sütur; iki os parietale ile os occipitale arasında, kafatasının arkasında yer alan ve Yunan harfi lambda'ya benzeyen sabit fibröz eklem.",
            "englishDefinition": "The fixed fibrous joint at the back of the skull between the parietal bones and the occipital bone, resembling the Greek letter lambda.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 178,
            "term": "Sutura Squamosa",
            "english": "Squamous Suture",
            "roots": "sutura (dikiş, sütur) + squamosus (pullu, ince tabaka şeklinde)",
            "turkishDefinition": "Squamöz sütur; os temporale'nin pars squamosa'sı ile os parietale arasında, kafatasının yan tarafında yer alan pullu (üst üste binen) tipte fibröz eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Squamöz sütur",
            "turkish": "Squamous Suture",
            "definition": "Squamöz sütur; os temporale'nin pars squamosa'sı ile os parietale arasında, kafatasının yan tarafında yer alan pullu (üst üste binen) tipte fibröz eklem.",
            "englishDefinition": "The fixed fibrous joint on the side of the skull between the squamous part of the temporal bone and the parietal bone, characterized by an overlapping edge.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 179,
            "term": "Fonticulus Anterior",
            "english": "Anterior Fontanelle",
            "roots": "fonticulus (küçük pınar, kaynak) + anterior (ön)",
            "turkishDefinition": "Ön bıngıldak; yenidoğanda sutura coronalis ile sutura sagittalis'in kesiştiği noktada, kemikleşmenin henüz tamamlanmadığı en büyük yumuşak bölge. Genellikle 18-24 ayda kapanır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Ön bıngıldak",
            "turkish": "Anterior Fontanelle",
            "definition": "Ön bıngıldak; yenidoğanda sutura coronalis ile sutura sagittalis'in kesiştiği noktada, kemikleşmenin henüz tamamlanmadığı en büyük yumuşak bölge. Genellikle 18-24 ayda kapanır.",
            "englishDefinition": "The largest soft spot on a newborn's skull, located where the coronal and sagittal sutures meet, typically closing by 18 to 24 months of age.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 180,
            "term": "Fonticulus Posterior",
            "english": "Posterior Fontanelle",
            "roots": "fonticulus (küçük pınar, kaynak) + posterior (arka)",
            "turkishDefinition": "Arka bıngıldak; yenidoğanda sutura sagittalis ile sutura lambdoidea'nın kesiştiği noktadaki daha küçük yumuşak bölge. Genellikle 2-3 ayda kapanır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Arka bıngıldak",
            "turkish": "Posterior Fontanelle",
            "definition": "Arka bıngıldak; yenidoğanda sutura sagittalis ile sutura lambdoidea'nın kesiştiği noktadaki daha küçük yumuşak bölge. Genellikle 2-3 ayda kapanır.",
            "englishDefinition": "A smaller soft spot on a newborn's skull, located where the sagittal and lambdoid sutures meet, typically closing within 2 to 3 months.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 181,
            "term": "Articulationes Costovertebrales",
            "english": "Costovertebral Joints",
            "roots": "articulatio (eklem) + costa (kaburga) + vertebra (omur)",
            "turkishDefinition": "Kostovertebral eklemler; kaburgaların başı ile torasik vertebra korpusları arasındaki sinovyal eklemler. Solunum sırasında kaburgaların hareketine izin verir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Kostovertebral eklemler",
            "turkish": "Costovertebral Joints",
            "definition": "Kostovertebral eklemler; kaburgaların başı ile torasik vertebra korpusları arasındaki sinovyal eklemler. Solunum sırasında kaburgaların hareketine izin verir.",
            "englishDefinition": "The synovial joints between the heads of the ribs and the bodies of the thoracic vertebrae, allowing rib movement during respiration.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 182,
            "term": "Articulationes Sternocostales",
            "english": "Sternocostal Joints",
            "roots": "articulatio (eklem) + sternum (göğüs kemiği) + costa (kaburga)",
            "turkishDefinition": "Sternokostal eklemler; kaburga kıkırdaklarının (cartilago costalis) sternum ile birleştiği eklemler. 1. kosta kıkırdağı sternumla sinkondroz, diğerleri genelde sinovyal eklem oluşturur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Sternokostal eklemler",
            "turkish": "Sternocostal Joints",
            "definition": "Sternokostal eklemler; kaburga kıkırdaklarının (cartilago costalis) sternum ile birleştiği eklemler. 1. kosta kıkırdağı sternumla sinkondroz, diğerleri genelde sinovyal eklem oluşturur.",
            "englishDefinition": "The joints where the costal cartilages attach to the sternum, mostly synovial except for the first, which is a synchondrosis.",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 456,
            "term": "Sutura Frontalis Persistens",
            "english": "Persistent Frontal Suture; Metopic Suture",
            "turkishDefinition": "Kalıcı alın dikişi (eş anlamlısı: Sutura Metopica); normalde çocuklukta kapanan, bazı bireylerde erişkinlikte de devam eden alın kemiği ortadaki dikiş.",
            "roots": "sutura (dikiş) + frontalis (alına ait) + persistens (devam eden)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Kalıcı alın dikişi",
            "englishDefinition": "The midline suture of the frontal bone that normally closes in childhood but occasionally persists into adulthood.",
            "createdAt": {
                "_seconds": 1789116370,
                "_nanoseconds": 219000000
            }
        },
        {
            "id": 734,
            "term": "Sutura Zygomaticomaxillaris",
            "english": "Zygomaticomaxillary Suture",
            "turkishDefinition": "Zygomatik-maksiller dikiş; üst çene kemiği ile elmacık kemiği arasındaki sabit dikiş.",
            "roots": "sutura (dikiş) + zygomaticus (elmacığa ait) + maxilla (üst çene kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Zygomatik-maksiller dikiş",
            "englishDefinition": "The fixed suture between the maxilla and the zygomatic bone."
        },
        {
            "id": 783,
            "term": "Sutura Frontonasalis",
            "english": "Frontonasal Suture",
            "turkishDefinition": "Alın-burun dikişi; alın kemiği ile burun kemikleri arasındaki dikiş.",
            "turkishShort": "Alın-burun dikişi",
            "roots": "fronto- (alına ait) + nasalis (buruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the frontal bone and the nasal bones."
        },
        {
            "id": 784,
            "term": "Sutura Frontomaxillaris",
            "english": "Frontomaxillary Suture",
            "turkishDefinition": "Alın-üst çene dikişi; alın kemiği ile üst çene kemiği arasındaki dikiş.",
            "turkishShort": "Alın-üst çene dikişi",
            "roots": "fronto- (alına ait) + maxillaris (üst çeneye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the frontal bone and the maxilla."
        },
        {
            "id": 785,
            "term": "Sutura Frontolacrimalis",
            "english": "Frontolacrimal Suture",
            "turkishDefinition": "Alın-gözyaşı dikişi; alın kemiği ile gözyaşı kemiği arasındaki dikiş.",
            "turkishShort": "Alın-gözyaşı dikişi",
            "roots": "fronto- (alına ait) + lacrimalis (gözyaşına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the frontal bone and the lacrimal bone."
        },
        {
            "id": 786,
            "term": "Sutura Frontoethmoidalis",
            "english": "Frontoethmoidal Suture",
            "turkishDefinition": "Alın-kalbur kemik dikişi; alın kemiği ile kalbur kemik arasındaki dikiş.",
            "turkishShort": "Alın-kalbur kemik dikişi",
            "roots": "fronto- (alına ait) + ethmoidalis (kalbur kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the frontal bone and the ethmoid bone."
        },
        {
            "id": 787,
            "term": "Sutura Sphenofrontalis",
            "english": "Sphenofrontal Suture",
            "turkishDefinition": "Temel-alın kemik dikişi; temel kemik ile alın kemiği arasındaki dikiş.",
            "turkishShort": "Temel-alın kemik dikişi",
            "roots": "spheno- (temel kemiğe ait) + frontalis (alına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the sphenoid bone and the frontal bone."
        },
        {
            "id": 788,
            "term": "Sutura Sphenoparietalis",
            "english": "Sphenoparietal Suture",
            "turkishDefinition": "Temel-duvar kemik dikişi; temel kemik ile duvar kemiği arasındaki dikiş.",
            "turkishShort": "Temel-duvar kemik dikişi",
            "roots": "spheno- (temel kemiğe ait) + parietalis (duvar kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the sphenoid bone and the parietal bone."
        },
        {
            "id": 789,
            "term": "Sutura Sphenosquamosa",
            "english": "Sphenosquamosal Suture",
            "turkishDefinition": "Temel-pullu kısım dikişi; temel kemik ile şakak kemiğinin pullu kısmı arasındaki dikiş.",
            "turkishShort": "Temel-pullu kısım dikişi",
            "roots": "spheno- (temel kemiğe ait) + squamosa (pullu)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the sphenoid bone and the squamous part of the temporal bone."
        },
        {
            "id": 790,
            "term": "Sutura Sphenoethmoidalis",
            "english": "Sphenoethmoidal Suture",
            "turkishDefinition": "Temel-kalbur kemik dikişi; temel kemik ile kalbur kemik arasındaki dikiş.",
            "turkishShort": "Temel-kalbur kemik dikişi",
            "roots": "spheno- (temel kemiğe ait) + ethmoidalis (kalbur kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the sphenoid bone and the ethmoid bone."
        },
        {
            "id": 791,
            "term": "Sutura Temporozygomatica",
            "english": "Temporozygomatic Suture",
            "turkishDefinition": "Şakak-elmacık kemiği dikişi; şakak kemiği ile elmacık kemiği arasındaki dikiş.",
            "turkishShort": "Şakak-elmacık kemiği dikişi",
            "roots": "temporo- (şakak kemiğine ait) + zygomatica (elmacık kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the temporal bone and the zygomatic bone."
        },
        {
            "id": 792,
            "term": "Sutura Internasalis",
            "english": "Internasal Suture",
            "turkishDefinition": "Burun kemikleri arası dikiş; iki burun kemiği arasındaki orta hat dikişi.",
            "turkishShort": "Burun kemikleri arası dikiş",
            "roots": "inter- (arasında) + nasalis (buruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The median suture between the two nasal bones."
        },
        {
            "id": 793,
            "term": "Sutura Nasomaxillaris",
            "english": "Nasomaxillary Suture",
            "turkishDefinition": "Burun-üst çene kemiği dikişi; burun kemiği ile üst çene kemiği arasındaki dikiş.",
            "turkishShort": "Burun-üst çene kemiği dikişi",
            "roots": "naso- (buruna ait) + maxillaris (üst çeneye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the nasal bone and the maxilla."
        },
        {
            "id": 794,
            "term": "Sutura Lacrimomaxillaris",
            "english": "Lacrimomaxillary Suture",
            "turkishDefinition": "Gözyaşı-üst çene kemiği dikişi; gözyaşı kemiği ile üst çene kemiği arasındaki dikiş.",
            "turkishShort": "Gözyaşı-üst çene kemiği dikişi",
            "roots": "lacrimo- (gözyaşına ait) + maxillaris (üst çeneye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the lacrimal bone and the maxilla."
        },
        {
            "id": 795,
            "term": "Sutura Lacrimoconchalis",
            "english": "Lacrimoconchal Suture",
            "turkishDefinition": "Gözyaşı-alt konka kemiği dikişi; gözyaşı kemiği ile alt burun konkası arasındaki dikiş.",
            "turkishShort": "Gözyaşı-alt konka kemiği dikişi",
            "roots": "lacrimo- (gözyaşına ait) + conchalis (konkaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the lacrimal bone and the inferior nasal concha."
        },
        {
            "id": 796,
            "term": "Sutura Intermaxillaris",
            "english": "Intermaxillary Suture",
            "turkishDefinition": "Üst çene kemikleri arası dikiş; iki üst çene kemiği arasındaki orta hat dikişi.",
            "turkishShort": "Üst çene kemikleri arası dikiş",
            "roots": "inter- (arasında) + maxillaris (üst çeneye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The median suture between the two maxillae."
        },
        {
            "id": 797,
            "term": "Sutura Palatomaxillaris",
            "english": "Palatomaxillary Suture",
            "turkishDefinition": "Damak-üst çene kemiği dikişi; damak kemiği ile üst çene kemiği arasındaki dikiş.",
            "turkishShort": "Damak-üst çene kemiği dikişi",
            "roots": "palato- (damağa ait) + maxillaris (üst çeneye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the palatine bone and the maxilla."
        },
        {
            "id": 798,
            "term": "Sutura Palatoethmoidalis",
            "english": "Palatoethmoidal Suture",
            "turkishDefinition": "Damak-kalbur kemik dikişi; damak kemiği ile kalbur kemik arasındaki dikiş.",
            "turkishShort": "Damak-kalbur kemik dikişi",
            "roots": "palato- (damağa ait) + ethmoidalis (kalbur kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the palatine bone and the ethmoid bone."
        },
        {
            "id": 799,
            "term": "Sutura Interpalatina",
            "english": "Interpalatine Suture",
            "turkishDefinition": "Damak kemikleri arası dikiş; iki damak kemiği arasındaki orta hat dikişi.",
            "turkishShort": "Damak kemikleri arası dikiş",
            "roots": "inter- (arasında) + palatina (damağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The median suture between the two palatine bones."
        },
        {
            "id": 800,
            "term": "Sutura Occipitomastoidea",
            "english": "Occipitomastoid Suture",
            "turkishDefinition": "Artkafa-meme çıkıntısı dikişi; artkafa kemiği ile şakak kemiğinin meme çıkıntısı arasındaki dikiş.",
            "turkishShort": "Artkafa-meme çıkıntısı dikişi",
            "roots": "occipito- (artkafa kemiğine ait) + mastoidea (meme çıkıntısına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the occipital bone and the mastoid process of the temporal bone."
        },
        {
            "id": 801,
            "term": "Sutura Parietomastoidea",
            "english": "Parietomastoid Suture",
            "turkishDefinition": "Duvar kemiği-meme çıkıntısı dikişi; duvar kemiği ile şakak kemiğinin meme çıkıntısı arasındaki dikiş.",
            "turkishShort": "Duvar kemiği-meme çıkıntısı dikişi",
            "roots": "parieto- (duvar kemiğine ait) + mastoidea (meme çıkıntısına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the parietal bone and the mastoid process of the temporal bone."
        },
        {
            "id": 802,
            "term": "Sutura Squamomastoidea",
            "english": "Squamomastoid Suture",
            "turkishDefinition": "Pullu kısım-meme çıkıntısı dikişi; şakak kemiğinin pullu kısmı ile meme çıkıntısı arasındaki dikiş.",
            "turkishShort": "Pullu kısım-meme çıkıntısı dikişi",
            "roots": "squamo- (pullu kısma ait) + mastoidea (meme çıkıntısına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the squamous part and the mastoid process of the temporal bone."
        },
        {
            "id": 803,
            "term": "Sutura Frontozygomatica",
            "english": "Frontozygomatic Suture",
            "turkishDefinition": "Alın-elmacık kemiği dikişi; alın kemiği ile elmacık kemiği arasındaki dikiş.",
            "turkishShort": "Alın-elmacık kemiği dikişi",
            "roots": "fronto- (alına ait) + zygomatica (elmacık kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the frontal bone and the zygomatic bone."
        },
        {
            "id": 804,
            "term": "Sutura Ethmoidomaxillaris",
            "english": "Ethmoidomaxillary Suture",
            "turkishDefinition": "Kalbur kemik-üst çene kemiği dikişi; kalbur kemik ile üst çene kemiği arasındaki dikiş.",
            "turkishShort": "Kalbur kemik-üst çene kemiği dikişi",
            "roots": "ethmoido- (kalbur kemiğine ait) + maxillaris (üst çeneye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the ethmoid bone and the maxilla."
        },
        {
            "id": 805,
            "term": "Sutura Ethmoidolacrimalis",
            "english": "Ethmoidolacrimal Suture",
            "turkishDefinition": "Kalbur kemik-gözyaşı kemiği dikişi; kalbur kemik ile gözyaşı kemiği arasındaki dikiş.",
            "turkishShort": "Kalbur kemik-gözyaşı kemiği dikişi",
            "roots": "ethmoido- (kalbur kemiğine ait) + lacrimalis (gözyaşına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the ethmoid bone and the lacrimal bone."
        },
        {
            "id": 806,
            "term": "Sutura Sphenovomeralis",
            "english": "Sphenovomerine Suture",
            "turkishDefinition": "Temel kemik-vomer dikişi; temel kemik ile vomer kemiği arasındaki dikiş.",
            "turkishShort": "Temel kemik-vomer dikişi",
            "roots": "spheno- (temel kemiğe ait) + vomeralis (vomer kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the sphenoid bone and the vomer."
        },
        {
            "id": 807,
            "term": "Sutura Sphenozygomatica",
            "english": "Sphenozygomatic Suture",
            "turkishDefinition": "Temel kemik-elmacık kemiği dikişi; temel kemik ile elmacık kemiği arasındaki dikiş.",
            "turkishShort": "Temel kemik-elmacık kemiği dikişi",
            "roots": "spheno- (temel kemiğe ait) + zygomatica (elmacık kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the sphenoid bone and the zygomatic bone."
        },
        {
            "id": 808,
            "term": "Sutura Sphenomaxillaris",
            "english": "Sphenomaxillary Suture",
            "turkishDefinition": "Temel kemik-üst çene kemiği dikişi; temel kemik ile üst çene kemiği arasındaki dikiş.",
            "turkishShort": "Temel kemik-üst çene kemiği dikişi",
            "roots": "spheno- (temel kemiğe ait) + maxillaris (üst çeneye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The suture between the sphenoid bone and the maxilla."
        },
        {
            "id": 809,
            "term": "Sutura Palatina Mediana",
            "english": "Median Palatine Suture",
            "turkishDefinition": "Orta damak dikişi; iki damak kemiğinin yatay tabakalarını orta hatta birleştiren dikiş.",
            "turkishShort": "Orta damak dikişi",
            "roots": "palatina (damağa ait) + mediana (orta hatta ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The median suture joining the horizontal plates of the two palatine bones."
        },
        {
            "id": 810,
            "term": "Sutura Palatina Transversa",
            "english": "Transverse Palatine Suture",
            "turkishDefinition": "Enine damak dikişi; üst çene kemiğinin damak çıkıntısı ile damak kemiğinin yatay tabakası arasındaki enine dikiş.",
            "turkishShort": "Enine damak dikişi",
            "roots": "palatina (damağa ait) + transversa (enine)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The transverse suture between the palatine process of the maxilla and the horizontal plate of the palatine bone."
        },
        {
            "id": 811,
            "term": "Ligamentum Pterygospinale",
            "english": "Pterygospinous Ligament",
            "turkishDefinition": "Pterigospinal bağ; sfenoid kemiğin pterigoid çıkıntısı ile dikeni arasında uzanan, bazen kemikleşebilen bağ dokusu.",
            "turkishShort": "Pterigospinal bağ",
            "roots": "pterygo- (pterigoid çıkıntıya ait) + spinale (dikene ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "A fibrous band, occasionally ossified, extending between the pterygoid process and the spine of the sphenoid bone."
        },
        {
            "id": 812,
            "term": "Ligamentum Stylohyoideum",
            "english": "Stylohyoid Ligament",
            "turkishDefinition": "Stilohiyoid bağ; şakak kemiğinin sivri çıkıntısı ile dil kemiğinin küçük boynuzu arasında uzanan bağ.",
            "turkishShort": "Stilohiyoid bağ",
            "roots": "stylo- (sivri çıkıntıya ait) + hyoideum (dil kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "A fibrous cord connecting the styloid process of the temporal bone to the lesser horn of the hyoid bone."
        },
        {
            "id": 813,
            "term": "Syndesmosis Dentoalveolaris",
            "english": "Dento-Alveolar Syndesmosis (Gomphosis)",
            "turkishDefinition": "Diş-çene kemiği eklemi; dişin kökü ile diş yuvası arasındaki lifli bağ dokusu eklemi (gomfoz).",
            "turkishShort": "Diş-çene kemiği eklemi",
            "roots": "dento- (dişe ait) + alveolaris (diş yuvasına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The fibrous joint (gomphosis) between the root of a tooth and its alveolar socket."
        },
        {
            "id": 814,
            "term": "Periodontium",
            "english": "Periodontium",
            "turkishDefinition": "Diş çevresi doku; dişi çene kemiğine bağlayan ve destekleyen dokuların tümü.",
            "turkishShort": "Diş çevresi doku",
            "roots": "peri- (çevresinde) + odontium (dişe ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The supporting tissues surrounding and anchoring a tooth to the jawbone."
        },
        {
            "id": 815,
            "term": "Periodontium Protectionis",
            "english": "Gingiva (Gum)",
            "turkishDefinition": "Koruyucu periodontiyum; diş etini oluşturan, dişin çevresini örten koruyucu yumuşak doku.",
            "turkishShort": "Koruyucu periodontiyum",
            "roots": "periodontium (diş çevresi doku) + protectionis (koruyucuya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The protective portion of the periodontium forming the gum tissue that covers the alveolar bone around the teeth."
        },
        {
            "id": 816,
            "term": "Periodontium Insertionis",
            "english": "Inserting Periodontium",
            "turkishDefinition": "Tutunma periodontiyumu; dişi diş yuvasına sıkıca bağlayan, tutunmayı sağlayan periodontiyum kısmı.",
            "turkishShort": "Tutunma periodontiyumu",
            "roots": "periodontium (diş çevresi doku) + insertionis (tutunmaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The attachment portion of the periodontium that anchors the tooth firmly within its socket."
        },
        {
            "id": 817,
            "term": "Desmodontium",
            "english": "Desmodontium (Periodontal Fibre)",
            "turkishDefinition": "Periodontal bağ lifi; dişin kökü ile diş yuvası duvarı arasındaki bağ dokusu lifleri.",
            "turkishShort": "Periodontal bağ lifi",
            "roots": "desmo- (bağa ait) + odontium (dişe ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The fibrous connective tissue fibers between the root of a tooth and the wall of its alveolar socket."
        },
        {
            "id": 818,
            "term": "Cementum",
            "english": "Cement (Cementum)",
            "turkishDefinition": "Diş çimentosu; diş kökünü örten, dişi periodontal liflerle diş yuvasına bağlayan sert doku.",
            "turkishShort": "Diş çimentosu",
            "roots": "cementum (çimento)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The calcified tissue covering the root of a tooth that anchors the periodontal fibers to the tooth."
        },
        {
            "id": 819,
            "term": "Synchondrosis Sphenooccipitalis",
            "english": "Spheno-Occipital Synchondrosis",
            "turkishDefinition": "Sfenooksipital kıkırdak eklem; temel kemik ile artkafa kemiği arasındaki kıkırdak doku ile birleşme.",
            "turkishShort": "Sfenooksipital kıkırdak eklem",
            "roots": "spheno- (temel kemiğe ait) + occipitalis (artkafa kemiğine ait) + synchondrosis (kıkırdak eklem)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The cartilaginous joint between the sphenoid and occipital bones at the base of the skull."
        },
        {
            "id": 820,
            "term": "Synchondrosis Sphenopetrosa",
            "english": "Sphenopetrosal Synchondrosis",
            "turkishDefinition": "Sfenopetroz kıkırdak eklem; temel kemik ile şakak kemiğinin kayasal kısmı arasındaki kıkırdak birleşme.",
            "turkishShort": "Sfenopetroz kıkırdak eklem",
            "roots": "spheno- (temel kemiğe ait) + petrosa (kayasal kısma ait) + synchondrosis (kıkırdak eklem)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The cartilaginous joint between the sphenoid bone and the petrous part of the temporal bone."
        },
        {
            "id": 821,
            "term": "Synchondrosis Petrooccipitalis",
            "english": "Petro-Occipital Synchondrosis",
            "turkishDefinition": "Petrooksipital kıkırdak eklem; şakak kemiğinin kayasal kısmı ile artkafa kemiği arasındaki kıkırdak birleşme.",
            "turkishShort": "Petrooksipital kıkırdak eklem",
            "roots": "petro- (kayasal kısma ait) + occipitalis (artkafa kemiğine ait) + synchondrosis (kıkırdak eklem)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The cartilaginous joint between the petrous part of the temporal bone and the occipital bone."
        },
        {
            "id": 822,
            "term": "Synchondrosis Sphenoethmoidalis",
            "english": "Spheno-Ethmoidal Synchondrosis",
            "turkishDefinition": "Sfenoetmoid kıkırdak eklem; temel kemik ile kalbur kemik arasındaki kıkırdak birleşme.",
            "turkishShort": "Sfenoetmoid kıkırdak eklem",
            "roots": "spheno- (temel kemiğe ait) + ethmoidalis (kalbur kemiğine ait) + synchondrosis (kıkırdak eklem)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The cartilaginous joint between the sphenoid bone and the ethmoid bone."
        },
        {
            "id": 823,
            "term": "Ligamentum Mediale Articulationis Temporomandibularis",
            "english": "Medial Ligament Of The Temporomandibular Joint",
            "turkishDefinition": "Çene eklemi iç yan bağı; çene ekleminin iç (medial) tarafında yer alan destekleyici bağ.",
            "turkishShort": "Çene eklemi iç yan bağı",
            "roots": "medium (orta/iç) + articulatio (eklem) + temporomandibularis (çene eklemine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "A supporting ligament located on the medial aspect of the temporomandibular joint."
        },
        {
            "id": 824,
            "term": "Ligamentum Sphenomandibulare",
            "english": "Sphenomandibular Ligament",
            "turkishDefinition": "Sfenomandibular bağ; temel kemiğin dikeni ile alt çene kemiğinin dilcik çıkıntısı arasında uzanan bağ.",
            "turkishShort": "Sfenomandibular bağ",
            "roots": "spheno- (temel kemiğe ait) + mandibulare (alt çeneye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "A ligament extending from the spine of the sphenoid bone to the lingula of the mandible."
        },
        {
            "id": 825,
            "term": "Ligamentum Stylomandibulare",
            "english": "Stylomandibular Ligament",
            "turkishDefinition": "Stilomandibular bağ; şakak kemiğinin sivri çıkıntısı ile alt çene kemiğinin açısı arasında uzanan bağ.",
            "turkishShort": "Stilomandibular bağ",
            "roots": "stylo- (sivri çıkıntıya ait) + mandibulare (alt çeneye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "A ligament extending from the styloid process of the temporal bone to the angle of the mandible."
        },
        {
            "id": 826,
            "term": "Membrana Atlantooccipitalis Anterior",
            "english": "Anterior Atlanto-Occipital Membrane",
            "turkishDefinition": "Ön atlantooksipital zar; atlas omuru ile artkafa kemiği arasındaki ön eklem zarı.",
            "turkishShort": "Ön atlantooksipital zar",
            "roots": "atlanto- (atlas omuruna ait) + occipitalis (artkafa kemiğine ait) + anterior (ön)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The membrane connecting the anterior arch of the atlas to the anterior margin of the foramen magnum."
        },
        {
            "id": 827,
            "term": "Membrana Atlantooccipitalis Posterior",
            "english": "Posterior Atlanto-Occipital Membrane",
            "turkishDefinition": "Arka atlantooksipital zar; atlas omuru ile artkafa kemiği arasındaki arka eklem zarı.",
            "turkishShort": "Arka atlantooksipital zar",
            "roots": "atlanto- (atlas omuruna ait) + occipitalis (artkafa kemiğine ait) + posterior (arka)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "The membrane connecting the posterior arch of the atlas to the posterior margin of the foramen magnum."
        },
        {
            "id": 828,
            "term": "Ligamentum Atlantooccipitale Laterale",
            "english": "Lateral Atlanto-Occipital Ligament",
            "turkishDefinition": "Yan atlantooksipital bağ; atlas omuru ile artkafa kemiği arasında yan tarafta uzanan destekleyici bağ.",
            "turkishShort": "Yan atlantooksipital bağ",
            "roots": "atlanto- (atlas omuruna ait) + occipitale (artkafa kemiğine ait) + laterale (yan)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "englishDefinition": "A ligament supporting the lateral aspect of the atlanto-occipital joint."
        }
    ],
    "movement_terms": [
        {
            "id": 183,
            "term": "Abductio",
            "english": "Abduction",
            "roots": "ab- (uzaklaştırmak, -den uzak) + ducere (götürmek, çekmek)",
            "turkishDefinition": "Vücut orta hattından uzaklaştırma hareketi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Vücut orta hattından uzaklaştırma hareketi",
            "turkish": "Abduction",
            "definition": "Vücut orta hattından uzaklaştırma hareketi",
            "englishDefinition": "Movement of a body part away from the midline of the body."
        },
        {
            "id": 184,
            "term": "Adductio",
            "english": "Adduction",
            "roots": "ad- (yaklaştırmak, -e doğru) + ducere (götürmek, çekmek)",
            "turkishDefinition": "Vücut orta hattına yakınlaştırma hareketi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Vücut orta hattına yakınlaştırma hareketi",
            "turkish": "Adduction",
            "definition": "Vücut orta hattına yakınlaştırma hareketi.",
            "englishDefinition": "Movement of a body part toward the midline of the body."
        },
        {
            "id": 185,
            "term": "Rotatio Lateralis",
            "english": "Lateral Rotation",
            "roots": "rotare (döndürmek) + latus / lateralis (yan, dış taraf)",
            "turkishDefinition": "Bir uzvun kendi uzun ekseni etrafında dışa doğru dönme hareketi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkish": "Lateral Rotation",
            "definition": "Bir uzvun kendi uzun ekseni etrafında dışa doğru dönme hareketi",
            "englishDefinition": "Rotation of a limb outward around its own long axis.",
            "turkishShort": "Bir uzvun dışa dönme hareketi"
        },
        {
            "id": 186,
            "term": "Rotatio Medialis",
            "english": "Medial Rotation",
            "roots": "rotare (döndürmek) + medius / medialis (orta, iç taraf)",
            "turkishDefinition": "Bir uzvun kendi uzun ekseni etrafında içe doğru dönme hareketi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkish": "Medial Rotation",
            "definition": "Bir uzvun kendi uzun ekseni etrafında içe doğru dönme hareketi",
            "englishDefinition": "Rotation of a limb inward around its own long axis.",
            "turkishShort": "Bir uzvun içe dönme hareketi"
        },
        {
            "id": 187,
            "term": "Circumductio",
            "english": "Circumduction",
            "roots": "circum- (etrafında, dairesel) + ducere (götürmek, çekmek)",
            "turkishDefinition": "Bir uzvun flexion, extension, abduction ve adduction kombinasyonuyla yaptığı dairesel dönme hareketi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Bir uzvun flexion, extension, abduction ve adduction kombinasyonuyla yaptığı dairesel dönme hareketi",
            "turkish": "Circumduction",
            "definition": "Bir uzvun flexion, extension, abduction ve adduction kombinasyonuyla yaptığı dairesel dönme hareketi.",
            "englishDefinition": "A circular movement of a limb combining flexion, extension, abduction, and adduction in sequence."
        },
        {
            "id": 188,
            "term": "Flexio",
            "english": "Flexion",
            "roots": "flectere (bükmek, eğmek)",
            "turkishDefinition": "Eklem açısını küçülterek vücut bölümlerini birbirine yaklaştıran hareket.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Eklem açısını küçülterek vücut bölümlerini birbirine yaklaştıran hareket",
            "turkish": "Flexion",
            "definition": "Eklem açısını küçülterek vücut bölümlerini birbirine yaklaştıran hareket.",
            "englishDefinition": "A movement that decreases the angle of a joint, bringing adjacent body parts closer together."
        },
        {
            "id": 189,
            "term": "Extensio",
            "english": "Extension",
            "roots": "ex- (dışarı, dışa doğru) + tendere (germek, uzatmak)",
            "turkishDefinition": "Eklem açısını büyüterek vücut bölümlerini birbirinden uzaklaştırma hareketi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkish": "Extension",
            "definition": "Eklem açısını büyüterek vücut bölümlerini birbirinden uzaklaştırma hareketi",
            "englishDefinition": "A movement that increases the angle of a joint, moving adjacent body parts apart.",
            "turkishShort": "Eklem açısını büyüterek uzaklaştırma hareketi"
        },
        {
            "id": 190,
            "term": "Pronatio",
            "english": "Pronation",
            "roots": "pronare (öne doğru eğmek, yüzüstü çevirmek)",
            "turkishDefinition": "Ön kolun dönmesiyle avuç içinin arkaya / aşağıya bakması ; ayak tabanının dışa dönmesi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Ön kolun dönmesiyle avuç içinin arkaya / aşağıya bakması",
            "turkish": "Pronation",
            "definition": "Ön kolun dönmesiyle avuç içinin arkaya / aşağıya bakması ; ayak tabanının dışa dönmesi",
            "englishDefinition": "Rotation of the forearm that turns the palm to face posteriorly or downward."
        },
        {
            "id": 191,
            "term": "Supinatio",
            "english": "Supination",
            "roots": "supinare (arkaüstü/sırtüstü çevirmek)",
            "turkishDefinition": "Ön kolun dönmesiyle avuç içinin öne / yukarı bakması ; ayak tabanının içe dönmesi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Ön kolun dönmesiyle avuç içinin öne / yukarı bakması",
            "turkish": "Supination",
            "definition": "Ön kolun dönmesiyle avuç içinin öne / yukarı bakması ; ayak tabanının içe dönmesi",
            "englishDefinition": "Rotation of the forearm that turns the palm to face anteriorly or upward."
        },
        {
            "id": 192,
            "term": "Oppositio",
            "english": "Opposition",
            "roots": "ob- (karşı, karşısına) + ponere (koymak, yerleştirmek)",
            "turkishDefinition": "Başparmağın, avuç içini çaprazlayarak diğer parmak uçlarına yaklaşma hareketi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Başparmağın, avuç içini çaprazlayarak diğer parmak uçlarına yaklaşma hareketi",
            "turkish": "Opposition",
            "definition": "Başparmağın, avuç içini çaprazlayarak diğer parmak uçlarına yaklaşma hareketi.",
            "englishDefinition": "Movement of the thumb across the palm to touch the tips of the other fingers."
        },
        {
            "id": 193,
            "term": "Repositio",
            "english": "Reposition",
            "roots": "re- (tekrar, geri) + ponere (koymak, yerleştirmek)",
            "turkishDefinition": "Opozisyon halindeki başparmağın anatomik başlangıç konumuna geri dönmesi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkish": "Reposition",
            "definition": "Opozisyon halindeki başparmağın anatomik başlangıç konumuna geri dönmesi",
            "englishDefinition": "The return of the thumb from opposition back to its anatomical starting position.",
            "turkishShort": "Başparmağın başlangıç konumuna dönmesi"
        },
        {
            "id": 194,
            "term": "Plantiflexio",
            "english": "Plantar Flexion",
            "roots": "planta (ayak tabanı) + flectere (bükmek)",
            "turkishDefinition": "Ayak bileğinde, ayak ucunun tabana doğru aşağı doğru bükülmesi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkish": "Plantar Flexion",
            "definition": "Ayak bileğinde, ayak ucunun tabana doğru aşağı doğru bükülmesi",
            "englishDefinition": "Movement at the ankle that points the foot downward, away from the shin.",
            "turkishShort": "Ayak ucunun aşağı doğru bükülmesi"
        },
        {
            "id": 195,
            "term": "Dorsiflexio",
            "english": "Dorsiflexion",
            "roots": "dorsum (sırt, ayak sırtı) + flectere (bükmek)",
            "turkishDefinition": "Ayak bileğinde, ayak ucunun yukarıya doğru çekilmesi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Ayak bileğinde, ayak ucunun yukarıya doğru çekilmesi",
            "turkish": "Dorsiflexion",
            "definition": "Ayak bileğinde, ayak ucunun yukarıya doğru çekilmesi.",
            "englishDefinition": "Movement at the ankle that draws the foot upward, toward the shin."
        },
        {
            "id": 196,
            "term": "Elevatio",
            "english": "Elevation",
            "roots": "e- (dışarı, yukarı) + levare (kaldırmak, hafifletmek)",
            "turkishDefinition": "Omuz veya Mandibula gibi bir yapının yukarı doğru yükselme hareketi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Omuz veya Mandibula gibi bir yapının yukarı doğru yükselme hareketi",
            "turkish": "Elevation",
            "definition": "Omuz veya Mandibula gibi bir yapının yukarı doğru yükselme hareketi.",
            "englishDefinition": "An upward movement of a structure such as the shoulder or mandible."
        },
        {
            "id": 197,
            "term": "Depressio",
            "english": "Depression",
            "roots": "de- (aşağı) + premere (bastırmak)",
            "turkishDefinition": "Yukarı kaldırılmış bir yapının dikey eksende aşağıya doğru indirilmesi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Yukarı kaldırılmış bir yapının dikey eksende aşağıya doğru indirilmesi",
            "turkish": "Depression",
            "definition": "Yukarı kaldırılmış bir yapının dikey eksende aşağıya doğru indirilmesi.",
            "englishDefinition": "A downward movement returning an elevated structure along the vertical axis."
        },
        {
            "id": 198,
            "term": "Eversio",
            "english": "Eversion",
            "roots": "ex- (dışarı, dışa doğru) + vertere (döndürmek)",
            "turkishDefinition": "Ayak tabanının, vücut orta hattından uzaklaşarak dışa dönmesi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Ayak tabanının, vücut orta hattından uzaklaşarak dışa dönmesi",
            "turkish": "Eversion",
            "definition": "Ayak tabanının, vücut orta hattından uzaklaşarak dışa dönmesi.",
            "englishDefinition": "Turning of the sole of the foot outward, away from the midline of the body."
        },
        {
            "id": 199,
            "term": "Inversio",
            "english": "Inversion",
            "roots": "in- (içeri, içe doğru) + vertere (döndürmek)",
            "turkishDefinition": "Ayak tabanının, vücut orta hattına bakacak şekilde içe dönmesi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Ayak tabanının, vücut orta hattına bakacak şekilde içe dönmesi",
            "turkish": "Inversion",
            "definition": "Ayak tabanının, vücut orta hattına bakacak şekilde içe dönmesi.",
            "englishDefinition": "Turning of the sole of the foot inward, toward the midline of the body."
        },
        {
            "id": 200,
            "term": "Protractio",
            "english": "Protraction",
            "roots": "pro- (öne doğru, ileri) + trahere (çekmek)",
            "turkishDefinition": "Omuz kuşağı veya Mandibula'nın yatay düzlemde öne doğru kayma hareketi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Omuz kuşağı veya Mandibula'nın yatay düzlemde öne doğru kayma hareketi",
            "turkish": "Protraction",
            "definition": "Omuz kuşağı veya Mandibula'nın yatay düzlemde öne doğru kayma hareketi.",
            "englishDefinition": "A forward gliding movement of a structure such as the shoulder girdle or mandible in the horizontal plane."
        },
        {
            "id": 201,
            "term": "Retractio",
            "english": "Retraction",
            "roots": "re- (geri, arkaya) + trahere (çekmek)",
            "turkishDefinition": "Öne çekilmiş omuz kuşağı veya Mandibula'nın arkaya doğru çekilmesi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Öne çekilmiş omuz kuşağı veya Mandibula'nın arkaya doğru çekilmesi",
            "turkish": "Retraction",
            "definition": "Öne çekilmiş omuz kuşağı veya Mandibula'nın arkaya doğru çekilmesi.",
            "englishDefinition": "A backward gliding movement returning a protracted structure, such as the shoulder girdle or mandible, to its original position."
        }
    ],
    "anatomic_direction": [
        {
            "id": 202,
            "term": "Radialis",
            "english": "Radial",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Radial",
            "definition": "Ön kolda radius kemiği tarafında (başparmak yönünde) olan.",
            "englishDefinition": "Relating to the radius, describing the thumb-side aspect of the forearm.",
            "roots": "radius/radi (ışın, önkol kemiği) + alis (sıfat eki)",
            "turkishDefinition": "Radial; önkolun radius kemiği tarafına ait yön.",
            "turkishShort": "Radial",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 203,
            "term": "Ulnaris",
            "english": "Ulnar",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Ulnar",
            "definition": "Ön kolda ulna kemiği tarafında (serçe parmak yönünde) olan.",
            "englishDefinition": "Relating to the ulna, describing the little-finger-side aspect of the forearm.",
            "roots": "ulna/uln (dirsek kemiği) + aris (sıfat eki)",
            "turkishDefinition": "Ulnar; önkolun ulna kemiği tarafına ait yön.",
            "turkishShort": "Ulnar",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 204,
            "term": "Palmaris",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Palmar",
            "definition": "Avuç içine ait olan.",
            "english": "Palmar, Volar",
            "englishDefinition": "Relating to the palm surface of the hand.",
            "roots": "palma/palm (avuç içi) + aris (sıfat eki)",
            "turkishDefinition": "Palmar (volar); elin avuç içi yüzeyine ait yön.",
            "turkishShort": "Palmar (volar)",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 205,
            "term": "Tibialis",
            "english": "Tibial",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Tibial",
            "definition": "Bacakta tibia kemiği tarafında olan.",
            "englishDefinition": "Relating to the tibia, describing the inner-side aspect of the leg.",
            "roots": "tibia/tibi (kaval kemiği) + alis (sıfat eki)",
            "turkishDefinition": "Tibial; bacağın tibia kemiği tarafına ait yön.",
            "turkishShort": "Tibial",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 206,
            "term": "Fibularis",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Fibular",
            "definition": "Bacakta fibula kemiği tarafında olan.",
            "english": "Fibular, Peroneal",
            "englishDefinition": "Relating to the fibula, describing the outer-side aspect of the leg.",
            "roots": "fibula/fibul (kamış kemiği) + aris (sıfat eki)",
            "turkishDefinition": "Fibular (peroneal); bacağın fibula kemiği tarafına ait yön.",
            "turkishShort": "Fibular (peroneal)",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 207,
            "term": "Plantaris",
            "english": "Plantar",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Plantar",
            "definition": "Ayak tabanına ait olan.",
            "englishDefinition": "Relating to the sole surface of the foot.",
            "roots": "planta/plant (ayak tabanı) + aris (sıfat eki)",
            "turkishDefinition": "Plantar; ayağın taban yüzeyine ait yön.",
            "turkishShort": "Plantar",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 208,
            "term": "Frontalis",
            "english": "Frontal",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Frontal",
            "definition": "Alın bölgesine ait, başın ön tarafında yer alan.",
            "englishDefinition": "Relating to the region of the forehead.",
            "roots": "frons/front (alın) + alis (sıfat eki)",
            "turkishDefinition": "Frontal; alın tarafına ait konum.",
            "turkishShort": "Frontal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 209,
            "term": "Occipitalis",
            "english": "Occipital",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Occipital",
            "definition": "Başın arkası tarafında yer alan.",
            "englishDefinition": "Relating to the region at the back of the skull.",
            "roots": "occiput/occipit (artkafa) + alis (sıfat eki)",
            "turkishDefinition": "Oksipital; artkafa (ense) tarafına ait konum.",
            "turkishShort": "Oksipital",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 210,
            "term": "Cranialis",
            "english": "Cranial",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Cranial",
            "definition": "Baş tarafına ait, başa daha yakın olan.",
            "englishDefinition": "Describing a direction toward the head.",
            "roots": "cranium/crani (kafatası) + alis (sıfat eki)",
            "turkishDefinition": "Kranial; baş tarafına doğru olan yön.",
            "turkishShort": "Kranial",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 211,
            "term": "Rostralis",
            "english": "Rostral",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Rostral",
            "definition": "Gaga veya burun tarafına yakın olan.",
            "englishDefinition": "Describing a direction toward the nose or beak, a term used especially in neuroanatomy.",
            "roots": "rostrum/rostr (gaga, burun) + alis (sıfat eki)",
            "turkishDefinition": "Rostral; burun/gaga tarafına doğru olan yön, özellikle nöroanatomide kullanılır.",
            "turkishShort": "Rostral",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 212,
            "term": "Horizontalis",
            "english": "Horizontal",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Horizontal",
            "definition": "Enlemesine, yere paralel olan yatay düzlem.",
            "englishDefinition": "Relating to a direction parallel to the ground plane.",
            "roots": "horizon (ufuk çizgisi) + alis (sıfat eki)",
            "turkishDefinition": "Yatay; yer düzlemine paralel olan yönü ifade eder.",
            "turkishShort": "Yatay",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 213,
            "term": "Medianus",
            "english": "Median",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Median",
            "definition": "Vücudu tam ortadan sağ ve sol eşit iki yarıma bölen dik düzlem.",
            "englishDefinition": "Relating to the median plane, the imaginary line dividing the body into equal right and left halves.",
            "roots": "medius (orta) + anus (sıfat eki)",
            "turkishDefinition": "Orta hat; vücudu sağ ve sol eşit iki yarıya bölen hayali düzlem.",
            "turkishShort": "Orta hat",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 214,
            "term": "Coronalis",
            "english": "Coronal",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Coronal",
            "definition": "Vücudun tam ortasından geçerek ön (ventral) ve arka (dorsal) parçalara ayıran kesit düzlemi.",
            "englishDefinition": "Relating to the coronal plane, a vertical plane dividing the body into anterior and posterior sections.",
            "roots": "corona (taç) + alis (sıfat eki)",
            "turkishDefinition": "Koronal; vücudu ön ve arka parçalara bölen düşey düzlem.",
            "turkishShort": "Koronal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 215,
            "term": "Sagittalis",
            "english": "Sagittal",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Sagittal",
            "definition": "Vücudu veya organları boylamasına (önden arkaya doğru) keserek sağ ve sol asimetrik parçalara bölen dikey düzlem.",
            "englishDefinition": "Relating to the sagittal plane, a vertical plane dividing the body into right and left sections.",
            "roots": "sagitta (ok) + alis (sıfat eki)",
            "turkishDefinition": "Sagittal; vücudu sağ ve sol parçalara bölen düşey düzlem.",
            "turkishShort": "Sagittal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 216,
            "term": "Transversus",
            "english": "Transverse",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Transverse",
            "definition": "Vücudu veya herhangi bir organı enlemesine keserek üst (superior) ve alt (inferior) parçalara ayıran yatay düzlem.",
            "englishDefinition": "Relating to the transverse plane, dividing the body into upper and lower sections.",
            "roots": "trans (karşı, öte) + versus (dönmüş, çevrilmiş)",
            "turkishDefinition": "Transvers; vücudu üst ve alt parçalara bölen enine düzlem.",
            "turkishShort": "Transvers",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 217,
            "term": "Longitudinalis",
            "english": "Longitudinal",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Longitudinal",
            "definition": "Vücut veya organ boyunca uzanan, boylamsal düzlem.",
            "englishDefinition": "Describing a direction running parallel to the long axis of the body or a structure.",
            "roots": "longus/longitudo (uzunluk) + alis (sıfat eki)",
            "turkishDefinition": "Longitudinal; boyuna, uzun eksene paralel yön.",
            "turkishShort": "Longitudinal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 218,
            "term": "Axialis",
            "english": "Axial",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Axial",
            "definition": "Merkez eksen boyunca olan; vücudu veya organları enlemesine keserek üst ve alt bölümlere ayıran eksenel düzlem.",
            "englishDefinition": "Relating to the main axis of the body.",
            "roots": "axis/ax (eksen) + alis (sıfat eki)",
            "turkishDefinition": "Aksiyel; vücudun ana eksenine ait yön.",
            "turkishShort": "Aksiyel",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 219,
            "term": "Verticalis",
            "english": "Vertical",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Vertical",
            "definition": "Yere dik konumda olan; yukarıdan aşağıya doğru düşey eksende uzanan dikey hat veya düzlem.",
            "englishDefinition": "Relating to a direction perpendicular to the ground plane.",
            "roots": "vertex/vertic (tepe, en yüksek nokta) + alis (sıfat eki)",
            "turkishDefinition": "Dikey; yer düzlemine dik olan yönü ifade eder.",
            "turkishShort": "Dikey",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 220,
            "term": "Dexter",
            "english": "Right",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Right",
            "definition": "Sağ taraf, sağda olan yapı.",
            "englishDefinition": "Relating to the right side of the body.",
            "roots": "dexter (sağ)",
            "turkishDefinition": "Sağ; vücudun sağ tarafını belirtir.",
            "turkishShort": "Sağ",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 221,
            "term": "Sinister",
            "english": "Left",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Left",
            "definition": "Sol taraf, solda olan yapı.",
            "englishDefinition": "Relating to the left side of the body.",
            "roots": "sinister (sol)",
            "turkishDefinition": "Sol; vücudun sol tarafını belirtir.",
            "turkishShort": "Sol",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 222,
            "term": "Anterior",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Anterior / Front",
            "definition": "Ön taraf, vücudun önünde bulunan.",
            "english": "Anterior",
            "englishDefinition": "Describing a position toward the front of the body.",
            "roots": "ante (önünde) + ior (karşılaştırma eki)",
            "turkishDefinition": "Anterior; vücudun ön tarafına yönelik konum.",
            "turkishShort": "Anterior",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 223,
            "term": "Posterior",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Posterior / Back",
            "definition": "Arka taraf, vücudun arkasında bulunan.",
            "english": "Posterior",
            "englishDefinition": "Describing a position toward the back of the body.",
            "roots": "post (sonra, arkasında) + ior (karşılaştırma eki)",
            "turkishDefinition": "Posterior; vücudun arka tarafına yönelik konum.",
            "turkishShort": "Posterior",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 224,
            "term": "Ventralis",
            "english": "Ventral",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Ventral",
            "definition": "Karın tarafında olan, önde yer alan.",
            "englishDefinition": "Describing a position toward the belly side of the body, used synonymously with anterior in humans.",
            "roots": "venter/ventr (karın) + alis (sıfat eki)",
            "turkishDefinition": "Ventral; karın tarafına yönelik konum, insanda anterior ile eşanlamlı kullanılır.",
            "turkishShort": "Ventral",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 225,
            "term": "Dorsalis",
            "english": "Dorsal",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Dorsal",
            "definition": "Sırt tarafında olan, arkada yer alan.",
            "englishDefinition": "Describing a position toward the back side of the body, used synonymously with posterior in humans.",
            "roots": "dorsum/dors (sırt) + alis (sıfat eki)",
            "turkishDefinition": "Dorsal; sırt tarafına yönelik konum, insanda posterior ile eşanlamlı kullanılır.",
            "turkishShort": "Dorsal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 226,
            "term": "Superior",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Superior / Upper",
            "definition": "Üst taraf, yukarıda bulunan.",
            "english": "Superior",
            "englishDefinition": "Describing a position toward the head, or above another structure.",
            "roots": "superus (üstteki) + ior (karşılaştırma eki)",
            "turkishDefinition": "Superior; yukarı, baş tarafına yakın konum.",
            "turkishShort": "Superior",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 227,
            "term": "Inferior",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Inferior / Lower",
            "definition": "Alt taraf, aşağıda bulunan.",
            "english": "Inferior",
            "englishDefinition": "Describing a position toward the feet, or below another structure.",
            "roots": "inferus (alttaki) + ior (karşılaştırma eki)",
            "turkishDefinition": "İnferior; aşağı, ayak tarafına yakın konum.",
            "turkishShort": "İnferior",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 228,
            "term": "Medialis",
            "english": "Medial",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Medial",
            "definition": "İç yan, vücut orta hattına daha yakın olan.",
            "englishDefinition": "Describing a position closer to the midline of the body.",
            "roots": "medius (orta) + alis (sıfat eki)",
            "turkishDefinition": "Medial; orta hatta yakın konum.",
            "turkishShort": "Medial",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 229,
            "term": "Lateralis",
            "english": "Lateral",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Lateral",
            "definition": "Dış yan, vücut orta hattından uzak olan.",
            "englishDefinition": "Describing a position farther from the midline of the body.",
            "roots": "latus/later (yan) + alis (sıfat eki)",
            "turkishDefinition": "Lateral; orta hattan uzak, dış yandaki konum.",
            "turkishShort": "Lateral",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 230,
            "term": "Intermedius",
            "english": "Intermediate",
            "roots": "inter (arasında) + medius (orta)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Intermediate",
            "definition": "İki yapının tam ortasında bulunan.",
            "englishDefinition": "Describing a position between medial and lateral structures.",
            "turkishDefinition": "Ara; medial ve lateral yapılar arasında kalan konum.",
            "turkishShort": "Ara",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 231,
            "term": "Medius",
            "english": "Middle",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Middle",
            "definition": "Orta, ortadaki.",
            "englishDefinition": "Describing a position between two ends.",
            "roots": "medius (orta)",
            "turkishDefinition": "Orta; iki uç arasında kalan konum.",
            "turkishShort": "Orta",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 232,
            "term": "Caudalis",
            "english": "Caudal",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Caudal",
            "definition": "Kuyruk tarafına ait.",
            "englishDefinition": "Describing a direction toward the tailbone.",
            "roots": "cauda/caud (kuyruk) + alis (sıfat eki)",
            "turkishDefinition": "Kaudal; kuyruk sokumu tarafına doğru olan yön.",
            "turkishShort": "Kaudal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 233,
            "term": "Apicalis",
            "english": "Apical",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Apical",
            "definition": "Tepe noktasına (apex) ait, uçta/tepede bulunan.",
            "englishDefinition": "Relating to the tip or apex of a structure.",
            "roots": "apex/apic (tepe, uç) + alis (sıfat eki)",
            "turkishDefinition": "Apikal; bir yapının tepe noktasıyla ilgili.",
            "turkishShort": "Apikal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 234,
            "term": "Basalis",
            "english": "Basal",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Basal",
            "definition": "Taban kısmına ait, tabanda bulunan.",
            "englishDefinition": "Relating to the base of a structure.",
            "roots": "basis/bas (taban) + alis (sıfat eki)",
            "turkishDefinition": "Bazal; bir yapının taban kısmıyla ilgili.",
            "turkishShort": "Bazal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 235,
            "term": "Externus",
            "english": "External",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "External",
            "definition": "Dış, bir yapının dışarısında olan.",
            "englishDefinition": "Relating to the outer part of a structure.",
            "roots": "extra/extern (dış) + us (sıfat eki)",
            "turkishDefinition": "Eksternal; bir yapının dış kısmına ait.",
            "turkishShort": "Eksternal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 236,
            "term": "Internus",
            "english": "Internal",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Internal",
            "definition": "İç, bir yapının içerisinde olan.",
            "englishDefinition": "Relating to the inner part of a structure.",
            "roots": "intra/intern (iç) + us (sıfat eki)",
            "turkishDefinition": "İnternal; bir yapının iç kısmına ait.",
            "turkishShort": "İnternal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 237,
            "term": "Luminalis",
            "english": "Luminal",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Luminal",
            "definition": "Organ veya damar boşluğuna (lümen) bakan yüzey.",
            "englishDefinition": "Relating to the internal cavity, or lumen, of an organ.",
            "roots": "lumen/lumin (boşluk, ışık) + alis (sıfat eki)",
            "turkishDefinition": "Luminal; bir organın iç boşluğuna (lümen) ait.",
            "turkishShort": "Luminal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 238,
            "term": "Superficialis",
            "english": "Superficial",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Superficial",
            "definition": "Yüzeysel, deri yüzeyine yakın olan.",
            "englishDefinition": "Describing a position close to the surface of the body.",
            "roots": "super (üstünde) + facies/facial (yüzey) + is (sıfat eki)",
            "turkishDefinition": "Yüzeyel; vücut yüzeyine yakın konum.",
            "turkishShort": "Yüzeyel",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 239,
            "term": "Profundus",
            "english": "Deep",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Deep",
            "definition": "Derin, yüzeyden uzakta derinde yer alan.",
            "englishDefinition": "Describing a position far from the surface of the body, deep within the tissue.",
            "roots": "pro (öne, ileri) + fundus (dip, taban)",
            "turkishDefinition": "Derin; vücut yüzeyinden uzak, iç kısımdaki konum.",
            "turkishShort": "Derin",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 240,
            "term": "Proximalis",
            "english": "Proximal",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Proximal",
            "definition": "Gövdeye veya merkeze en yakın olan başlangıç kısmı.",
            "englishDefinition": "Describing a position closer to the trunk or point of origin.",
            "roots": "proximus/proxim (en yakın) + alis (sıfat eki)",
            "turkishDefinition": "Proksimal; gövdeye veya başlangıç noktasına yakın konum.",
            "turkishShort": "Proksimal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 241,
            "term": "Distalis",
            "english": "Distal",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Distal",
            "definition": "Gövdeden veya başlangıç noktasından en uzak olan uç kısım.",
            "englishDefinition": "Describing a position farther from the trunk or point of origin.",
            "roots": "distare/dist (uzakta olmak) + alis (sıfat eki)",
            "turkishDefinition": "Distal; gövdeden veya başlangıç noktasından uzak konum.",
            "turkishShort": "Distal",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 242,
            "term": "Centralis",
            "english": "Central",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Central",
            "definition": "Merkezi, merkezde yer alan.",
            "englishDefinition": "Relating to the center of a structure.",
            "roots": "centrum/centr (merkez) + alis (sıfat eki)",
            "turkishDefinition": "Santral; merkezde bulunan konum.",
            "turkishShort": "Santral",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 243,
            "term": "Periphericus",
            "english": "Peripheral",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Peripheral",
            "definition": "Çevresel, merkeze uzak olan çevre yapılar.",
            "englishDefinition": "Describing a position far from the center, toward the periphery.",
            "roots": "peri (çevresinde) + pherein/pheric (taşımak) + icus (sıfat eki)",
            "turkishDefinition": "Periferik; merkezden uzak, çevresel konum.",
            "turkishShort": "Periferik",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 244,
            "english": "Flexor",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Flexor",
            "definition": "Eklem açısını küçülterek bükülme (fleksiyon) hareketini yaptıran kas veya bu hareketin gerçekleştiği eklem yüzeyi.",
            "englishDefinition": "Describing a muscle that bends a joint by decreasing the angle between two body parts.",
            "term": "Flexor",
            "roots": "flectere/flex (bükmek) + or (yapan, eden eki)",
            "turkishDefinition": "Fleksör; bir eklemi büküp fleksiyon yaptıran kas grubu.",
            "turkishShort": "Fleksör",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 245,
            "english": "Extensor",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkish": "Extensor",
            "definition": "Eklem açısını büyüterek germe (ekstansiyon) hareketini yaptıran kas veya bu hareketin gerçekleştiği eklem yüzeyi.",
            "englishDefinition": "Describing a muscle that straightens a joint by increasing the angle between two body parts.",
            "term": "Extensor",
            "roots": "extendere/extens (germek, uzatmak) + or (yapan, eden eki)",
            "turkishDefinition": "Ekstensör; bir eklemi açıp ekstansiyon yaptıran kas grubu.",
            "turkishShort": "Ekstensör",
            "updatedAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 364,
            "term": "Basilaris",
            "english": "Basilar",
            "turkishDefinition": "Bazilar; temel veya tabana ait yapı.",
            "roots": "basis/basil (taban) + aris (sıfat eki)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkishShort": "Bazilar",
            "englishDefinition": "Relating to the base or foundation of a structure.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 367,
            "term": "Transversalis",
            "english": "Transverse",
            "turkishDefinition": "Transversal; enine yönde uzanan yapı veya düzlem.",
            "roots": "trans (karşı, öte) + versalis (dönmüş, sıfat eki)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "anatomic_direction",
            "turkishShort": "Transversal",
            "englishDefinition": "Describing a structure or plane running in a transverse direction.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        }
    ],
    "muscle_structures": [
        {
            "id": 906,
            "term": "Caput",
            "english": "Head (of Muscle)",
            "turkishDefinition": "Kas başı; bir kasın kemiğe sabit başlangıç noktasından çıkan kısmı.",
            "turkishShort": "Kas başı",
            "roots": "caput (baş)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The origin point of a muscle, arising from a fixed attachment on bone.",
            "createdAt": {}
        },
        {
            "id": 907,
            "term": "Venter",
            "english": "Belly (of Muscle)",
            "turkishDefinition": "Kas karnı; bir kasın en kalın, kasılabilen orta gövde kısmı.",
            "turkishShort": "Kas karnı",
            "roots": "venter (karın)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The thick, contractile central portion of a muscle.",
            "createdAt": {}
        },
        {
            "id": 908,
            "term": "Insertio",
            "english": "Insertion",
            "turkishDefinition": "Yapışma yeri; kasın hareket ettirdiği kemiğe tutunduğu, genellikle hareketli uç noktası.",
            "turkishShort": "Yapışma yeri",
            "roots": "insertio (yerleştirme)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The attachment point of a muscle onto the bone it moves, usually the mobile end.",
            "createdAt": {}
        },
        {
            "id": 909,
            "term": "Punctum Fixum",
            "english": "Fixed Point",
            "turkishDefinition": "Sabit nokta; kasılma sırasında yerinde kalan, genellikle başlangıç ucuna karşılık gelen nokta.",
            "turkishShort": "Sabit nokta",
            "roots": "punctum (nokta) + fixum (sabit)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The point that remains stationary during muscle contraction, usually corresponding to the origin.",
            "createdAt": {}
        },
        {
            "id": 910,
            "term": "Punctum Mobile",
            "english": "Mobile Point",
            "turkishDefinition": "Hareketli nokta; kasılma sırasında yer değiştiren, genellikle yapışma ucuna karşılık gelen nokta.",
            "turkishShort": "Hareketli nokta",
            "roots": "punctum (nokta) + mobile (hareketli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The point that moves during muscle contraction, usually corresponding to the insertion.",
            "createdAt": {}
        },
        {
            "id": 911,
            "term": "M. Fusiformis",
            "english": "Fusiform Muscle",
            "turkishDefinition": "İğsi kas; ortası kalın, uçlara doğru incelen mekik biçimli kas tipi.",
            "turkishShort": "İğsi kas",
            "roots": "fusiformis (iğ biçimli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A spindle-shaped muscle, thick in the middle and tapering at both ends.",
            "createdAt": {}
        },
        {
            "id": 912,
            "term": "M. Planus",
            "english": "Flat Muscle",
            "turkishDefinition": "Yassı kas; geniş ve düz, ince tabaka biçimindeki kas tipi.",
            "turkishShort": "Yassı kas",
            "roots": "planus (düz/yassı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A broad, flat, thin sheet-like muscle.",
            "createdAt": {}
        },
        {
            "id": 913,
            "term": "M. Rectus",
            "english": "Straight Muscle",
            "turkishDefinition": "Düz kas; lifleri paralel ve düz bir eksende uzanan kas tipi.",
            "turkishShort": "Düz kas",
            "roots": "rectus (düz)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle with fibers running in a straight, parallel line.",
            "createdAt": {}
        },
        {
            "id": 914,
            "term": "M. Triangularis",
            "english": "Triangular Muscle",
            "turkishDefinition": "Üçgen kas; üçgen biçimindeki kas tipi.",
            "turkishShort": "Üçgen kas",
            "roots": "triangularis (üçgen biçimli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A triangular-shaped muscle.",
            "createdAt": {}
        },
        {
            "id": 915,
            "term": "M. Quadratus",
            "english": "Quadrate Muscle",
            "turkishDefinition": "Dörtgen kas; dört kenarlı, dörtgen biçimindeki kas tipi.",
            "turkishShort": "Dörtgen kas",
            "roots": "quadratus (dörtgen biçimli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A square or rectangular-shaped muscle.",
            "createdAt": {}
        },
        {
            "id": 916,
            "term": "M. Biventer",
            "english": "Two-bellied Muscle",
            "turkishDefinition": "İki karınlı kas; ara tendonla ayrılan iki ayrı kas karnından oluşan kas tipi.",
            "turkishShort": "İki karınlı kas",
            "roots": "bi- (iki) + venter (karın)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle consisting of two bellies separated by an intermediate tendon.",
            "createdAt": {}
        },
        {
            "id": 917,
            "term": "M. Biceps",
            "english": "Two-headed Muscle",
            "turkishDefinition": "İki başlı kas; iki ayrı başlangıç başından tek bir kasa birleşen kas tipi.",
            "turkishShort": "İki başlı kas",
            "roots": "bi- (iki) + ceps (baş)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle with two separate heads of origin that unite into one muscle belly.",
            "createdAt": {}
        },
        {
            "id": 918,
            "term": "M. Triceps",
            "english": "Three-headed Muscle",
            "turkishDefinition": "Üç başlı kas; üç ayrı başlangıç başından tek bir kasa birleşen kas tipi.",
            "turkishShort": "Üç başlı kas",
            "roots": "tri- (üç) + ceps (baş)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle with three separate heads of origin that unite into one muscle belly.",
            "createdAt": {}
        },
        {
            "id": 919,
            "term": "M. Quadriceps",
            "english": "Four-headed Muscle",
            "turkishDefinition": "Dört başlı kas; dört ayrı başlangıç başından tek bir kasa birleşen kas tipi.",
            "turkishShort": "Dört başlı kas",
            "roots": "quadri- (dört) + ceps (baş)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle with four separate heads of origin that unite into one muscle belly.",
            "createdAt": {}
        },
        {
            "id": 920,
            "term": "M. Semipennatus (m. Unipennatus)",
            "english": "Semipennate Muscle",
            "turkishDefinition": "Yarı tüysü kas; lifleri tendonun sadece bir tarafına açılı biçimde bağlanan kas tipi.",
            "turkishShort": "Yarı tüysü kas",
            "roots": "semi- (yarı) + pennatus (tüy biçimli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle whose fibers attach obliquely to only one side of a central tendon.",
            "createdAt": {}
        },
        {
            "id": 921,
            "term": "M. Pennatus (m. Bipennatus)",
            "english": "Pennate Muscle",
            "turkishDefinition": "Tüysü kas; lifleri merkezi tendonun her iki tarafına açılı biçimde bağlanan, tüy görünümündeki kas tipi.",
            "turkishShort": "Tüysü kas",
            "roots": "pennatus (tüy biçimli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle whose fibers attach obliquely on both sides of a central tendon, resembling a feather.",
            "createdAt": {}
        },
        {
            "id": 922,
            "term": "M. Multipennatus",
            "english": "Multipennate Muscle",
            "turkishDefinition": "Çok tüysü kas; birden fazla tendona açılı liflerle bağlanan, karmaşık tüy görünümündeki kas tipi.",
            "turkishShort": "Çok tüysü kas",
            "roots": "multi- (çok) + pennatus (tüy biçimli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle with fibers attaching obliquely to multiple tendons, forming a complex feather-like pattern.",
            "createdAt": {}
        },
        {
            "id": 923,
            "term": "M. Orbicularis",
            "english": "Orbicular Muscle",
            "turkishDefinition": "Halkasal kas; bir açıklığı çevreleyen, halka biçimindeki kas tipi.",
            "turkishShort": "Halkasal kas",
            "roots": "orbicularis (halka biçimli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A ring-shaped muscle surrounding a body opening.",
            "createdAt": {}
        },
        {
            "id": 924,
            "term": "M. Cutaneus",
            "english": "Cutaneous Muscle",
            "turkishDefinition": "Deri kası; derinin hemen altında yer alan, deriyi hareket ettiren kas tipi.",
            "turkishShort": "Deri kası",
            "roots": "cutaneus (deriye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle located just beneath the skin that moves the skin itself.",
            "createdAt": {}
        },
        {
            "id": 925,
            "term": "M. Abductor",
            "english": "Abductor Muscle",
            "turkishDefinition": "Uzaklaştırıcı kas; bir uzvu vücudun orta hattından uzaklaştıran kas tipi.",
            "turkishShort": "Uzaklaştırıcı kas",
            "roots": "ab- (uzağa) + ductor (götürücü)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle that moves a body part away from the midline.",
            "createdAt": {}
        },
        {
            "id": 926,
            "term": "M. Adductor",
            "english": "Adductor Muscle",
            "turkishDefinition": "Yaklaştırıcı kas; bir uzvu vücudun orta hattına yaklaştıran kas tipi.",
            "turkishShort": "Yaklaştırıcı kas",
            "roots": "ad- (yakına) + ductor (götürücü)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle that moves a body part toward the midline.",
            "createdAt": {}
        },
        {
            "id": 927,
            "term": "M. Rotator",
            "english": "Rotator Muscle",
            "turkishDefinition": "Döndürücü kas; bir kemiği ekseni etrafında döndüren kas tipi.",
            "turkishShort": "Döndürücü kas",
            "roots": "rotator (döndürücü)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle that rotates a bone around its axis.",
            "createdAt": {}
        },
        {
            "id": 928,
            "term": "M. Flexor",
            "english": "Flexor Muscle",
            "turkishDefinition": "Bükücü kas; bir eklemi büken, açıyı küçülten kas tipi.",
            "turkishShort": "Bükücü kas",
            "roots": "flexor (bükücü)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle that flexes a joint, decreasing the angle between bones.",
            "createdAt": {}
        },
        {
            "id": 929,
            "term": "M. Extensor",
            "english": "Extensor Muscle",
            "turkishDefinition": "Gerici kas; bir eklemi açan, açıyı büyüten kas tipi.",
            "turkishShort": "Gerici kas",
            "roots": "extensor (gerici)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle that extends a joint, increasing the angle between bones.",
            "createdAt": {}
        },
        {
            "id": 930,
            "term": "M. Pronator",
            "english": "Pronator Muscle",
            "turkishDefinition": "İçe döndürücü kas; ön kolu içe (avuç içi aşağı bakacak şekilde) döndüren kas tipi.",
            "turkishShort": "İçe döndürücü kas",
            "roots": "pronator (içe döndürücü)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle that rotates the forearm so the palm faces downward.",
            "createdAt": {}
        },
        {
            "id": 932,
            "term": "M. Opponens",
            "english": "Opponens Muscle",
            "turkishDefinition": "Karşı koydurucu kas; başparmağı diğer parmaklarla karşı karşıya getiren kas tipi.",
            "turkishShort": "Karşı koydurucu kas",
            "roots": "opponens (karşı koyan)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle that brings the thumb into opposition with the other fingers.",
            "createdAt": {}
        },
        {
            "id": 933,
            "term": "M. Sphincter",
            "english": "Sphincter Muscle",
            "turkishDefinition": "Büzücü kas; bir vücut açıklığını halka biçiminde sararak kapatan kas tipi.",
            "turkishShort": "Büzücü kas",
            "roots": "sphincter (büzücü)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A ring-shaped muscle that closes a body opening by constricting around it.",
            "createdAt": {}
        },
        {
            "id": 934,
            "term": "M. Dilatator",
            "english": "Dilator Muscle",
            "turkishDefinition": "Genişletici kas; bir vücut açıklığını genişleten kas tipi.",
            "turkishShort": "Genişletici kas",
            "roots": "dilatator (genişletici)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A muscle that widens a body opening.",
            "createdAt": {}
        },
        {
            "id": 935,
            "term": "Compartimentum",
            "english": "Compartment",
            "turkishDefinition": "Kas kompartımanı; fasyalarla çevrelenmiş, kas gruplarını içeren bölme.",
            "turkishShort": "Kas kompartımanı",
            "roots": "compartimentum (bölme)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A fascia-bound section containing a group of muscles.",
            "createdAt": {}
        },
        {
            "id": 936,
            "term": "Fascia",
            "english": "Fascia",
            "turkishDefinition": "Fasya; kasları, organları ve diğer yapıları saran, destekleyen bağ dokusu zarı.",
            "turkishShort": "Fasya",
            "roots": "fascia (bant/kılıf)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A sheet of connective tissue that surrounds and supports muscles, organs, and other structures.",
            "createdAt": {}
        },
        {
            "id": 937,
            "term": "Fascia Capitis Et Colli",
            "english": "Fascia of Head and Neck",
            "turkishDefinition": "Baş ve boyun fasyası; baş ve boyun bölgesindeki kas ve yapıları saran fasya.",
            "turkishShort": "Baş ve boyun fasyası",
            "roots": "fascia (bant/kılıf) + capitis (başa ait) + colli (boyuna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The fascia enveloping the muscles and structures of the head and neck region.",
            "createdAt": {}
        },
        {
            "id": 938,
            "term": "Fascia Trunci",
            "english": "Fascia of Trunk",
            "turkishDefinition": "Gövde fasyası; gövde bölgesindeki kas ve yapıları saran fasya.",
            "turkishShort": "Gövde fasyası",
            "roots": "fascia (bant/kılıf) + trunci (gövdeye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The fascia enveloping the muscles and structures of the trunk.",
            "createdAt": {}
        },
        {
            "id": 939,
            "term": "Fascia Parietalis",
            "english": "Parietal Fascia",
            "turkishDefinition": "Duvar fasyası; vücut boşluğunun iç duvarını örten fasya.",
            "turkishShort": "Duvar fasyası",
            "roots": "fascia (bant/kılıf) + parietalis (duvara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The fascia lining the inner wall of a body cavity.",
            "createdAt": {}
        },
        {
            "id": 940,
            "term": "Fascia Extraserosalis",
            "english": "Extraserosal Fascia",
            "turkishDefinition": "Seröz dışı fasya; seröz zarın dışında yer alan bağ dokusu tabakası.",
            "turkishShort": "Seröz dışı fasya",
            "roots": "extra- (dışında) + serosalis (seröz zara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The connective tissue layer located external to a serous membrane.",
            "createdAt": {}
        },
        {
            "id": 941,
            "term": "Fascia Visceralis",
            "english": "Visceral Fascia",
            "turkishDefinition": "Organ fasyası; iç organları saran ince fasya tabakası.",
            "turkishShort": "Organ fasyası",
            "roots": "fascia (bant/kılıf) + visceralis (organa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The thin fascial layer enveloping the internal organs.",
            "createdAt": {}
        },
        {
            "id": 942,
            "term": "Fasciae Membrorum",
            "english": "Fascia of Limbs",
            "turkishDefinition": "Üye fasyaları; kol ve bacaklardaki kasları saran fasyalar.",
            "turkishShort": "Üye fasyaları",
            "roots": "fascia (bant/kılıf) + membrorum (uzuvlara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The fasciae enveloping the muscles of the limbs.",
            "createdAt": {}
        },
        {
            "id": 943,
            "term": "Fasciae Musculorum",
            "english": "Fascia of Muscles",
            "turkishDefinition": "Kas fasyaları; tek tek kasları veya kas gruplarını saran fasyalar.",
            "turkishShort": "Kas fasyaları",
            "roots": "fascia (bant/kılıf) + musculorum (kaslara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The fasciae enveloping individual muscles or muscle groups.",
            "createdAt": {}
        },
        {
            "id": 944,
            "term": "Fascia Investiens",
            "english": "Investing Layer",
            "turkishDefinition": "Sarıcı tabaka; bir yapıyı veya bölgeyi kılıf gibi saran fasya tabakası.",
            "turkishShort": "Sarıcı tabaka",
            "roots": "fascia (bant/kılıf) + investiens (saran/örten)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The fascial layer that envelops a structure or region like a sheath.",
            "createdAt": {}
        },
        {
            "id": 945,
            "term": "Fascia Propria Musculi",
            "english": "Fascia of Individual Muscle",
            "turkishDefinition": "Kasa özel fasya; tek bir kası doğrudan saran kılıf.",
            "turkishShort": "Kasa özel fasya",
            "roots": "fascia (bant/kılıf) + propria (özel) + musculi (kasa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The fascial sheath directly enveloping a single muscle.",
            "createdAt": {}
        },
        {
            "id": 946,
            "term": "Epimysium",
            "english": "Epimysium",
            "turkishDefinition": "Kas dış zarı; tüm kası saran en dış bağ dokusu tabakası.",
            "turkishShort": "Kas dış zarı",
            "roots": "epi- (üzerinde) + mysium (kas zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The outermost connective tissue layer surrounding an entire muscle.",
            "createdAt": {}
        },
        {
            "id": 947,
            "term": "Perimysium",
            "english": "Perimysium",
            "turkishDefinition": "Kas demeti zarı; kas liflerini demetler halinde saran orta bağ dokusu tabakası.",
            "turkishShort": "Kas demeti zarı",
            "roots": "peri- (çevresinde) + mysium (kas zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The connective tissue layer surrounding bundles (fascicles) of muscle fibers.",
            "createdAt": {}
        },
        {
            "id": 948,
            "term": "Endomysium",
            "english": "Endomysium",
            "turkishDefinition": "Tekil kas lifi zarı; her bir kas lifini ayrı ayrı saran ince bağ dokusu tabakası.",
            "turkishShort": "Tekil kas lifi zarı",
            "roots": "endo- (içinde) + mysium (kas zarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "The thin connective tissue layer surrounding each individual muscle fiber.",
            "createdAt": {}
        },
        {
            "id": 949,
            "term": "Tendo",
            "english": "Tendon",
            "turkishDefinition": "Kas kirişi; kası kemiğe bağlayan, güçlü, esnek olmayan bağ dokusu ipliği.",
            "turkishShort": "Kas kirişi",
            "roots": "tendo (kiriş)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A strong, inelastic band of connective tissue connecting muscle to bone.",
            "createdAt": {}
        },
        {
            "id": 950,
            "term": "Tendo Intermedius",
            "english": "Intermediate Tendon",
            "turkishDefinition": "Ara tendon; iki kas karnı arasında yer alan kısa tendon.",
            "turkishShort": "Ara tendon",
            "roots": "tendo (kiriş) + intermedius (arada olan)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A short tendon located between two muscle bellies.",
            "createdAt": {}
        },
        {
            "id": 951,
            "term": "Intersectio Tendinea",
            "english": "Tendinous Intersection",
            "turkishDefinition": "Kirişsel ara bölme; bazı kaslarda (örn. rektus abdominis) gövdeyi enine bölen tendon bandı.",
            "turkishShort": "Kirişsel ara bölme",
            "roots": "intersectio (kesişme) + tendinea (kirişe ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A fibrous band crossing a muscle belly transversely, as seen in the rectus abdominis.",
            "createdAt": {}
        },
        {
            "id": 952,
            "term": "Aponeurosis",
            "english": "Aponeurosis",
            "turkishDefinition": "Geniş yassı kiriş; kası geniş bir yüzeye bağlayan, yassı ve geniş tendon tabakası.",
            "turkishShort": "Geniş yassı kiriş",
            "roots": "apo- (ayrılmış) + neurosis (sinir/kiriş)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A broad, flat sheet of tendinous tissue connecting a muscle to a wide surface.",
            "createdAt": {}
        },
        {
            "id": 953,
            "term": "Arcus Tendineus",
            "english": "Tendinous Arch",
            "turkishDefinition": "Kiriş kemeri; fasya veya kas kirişinin kemer biçiminde kalınlaşmış bölümü.",
            "turkishShort": "Kiriş kemeri",
            "roots": "arcus (kemer) + tendineus (kirişe ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "An arch-shaped thickening of a fascia or tendon.",
            "createdAt": {}
        },
        {
            "id": 954,
            "term": "Trochlea Muscularis",
            "english": "Muscular Trochlea",
            "turkishDefinition": "Kas makarası; bir kas kirişinin yön değiştirdiği, makara görevi gören anatomik yapı.",
            "turkishShort": "Kas makarası",
            "roots": "trochlea (makara) + muscularis (kasa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "An anatomical structure acting as a pulley, redirecting the course of a muscle's tendon.",
            "createdAt": {}
        },
        {
            "id": 955,
            "term": "Vagina Synovialis",
            "english": "Synovial Sheath",
            "turkishDefinition": "Sinovyal kılıf; tendonu saran, sürtünmeyi azaltan kaygan sinovyal sıvı içeren kılıf.",
            "turkishShort": "Sinovyal kılıf",
            "roots": "vagina (kılıf) + synovialis (sinovyaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "muscle_structures",
            "englishDefinition": "A fluid-filled sheath surrounding a tendon that reduces friction.",
            "createdAt": {}
        }
    ],
    "bone_structures": [
        {
            "id": 400,
            "term": "Pars Ossea",
            "english": "Bony Part",
            "turkishDefinition": "Kemik bölüm; bir yapının kemikleşmiş kısmı.",
            "roots": "pars (bölüm) + os/ossis (kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kemik bölüm",
            "englishDefinition": "The bony portion of a structure that also has a cartilaginous or membranous part.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 401,
            "term": "Substantia Corticalis",
            "english": "Cortical Bone",
            "turkishDefinition": "Kortikal tabaka; kemiğin dış yüzeyini oluşturan sert ve yoğun doku.",
            "roots": "substantia (madde, doku) + cortex/cortic (kabuk)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kortikal tabaka",
            "englishDefinition": "The dense outer layer of bone tissue that provides strength and protection.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 402,
            "term": "Substantia Compacta",
            "english": "Compact Bone",
            "turkishDefinition": "Sert kemik doku; yoğun ve gözeneksiz yapıya sahip kemik dokusu.",
            "roots": "substantia (madde) + compactus (sıkı, yoğun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Sert kemik doku",
            "englishDefinition": "The dense, solid bone tissue that forms the outer shell of most bones.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 403,
            "term": "Substantia Spongiosa",
            "english": "Spongy Bone; Trabecular Bone",
            "turkishDefinition": "Süngerimsi kemik doku (eş anlamlısı: Substantia Trabecularis); ince kemik çubukçuklarından oluşan gözenekli yapı.",
            "roots": "substantia (madde) + spongiosus (süngerimsi)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Süngerimsi kemik doku",
            "englishDefinition": "The porous, trabecular bone tissue found inside bones, providing structural support while reducing weight.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 404,
            "term": "Pars Cartilaginea",
            "english": "Cartilaginous Part",
            "turkishDefinition": "Kıkırdak bölüm; bir yapının kıkırdaktan oluşan kısmı.",
            "roots": "pars (bölüm) + cartilago/cartilagin (kıkırdak)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kıkırdak bölüm",
            "englishDefinition": "The cartilaginous portion of a structure that has not yet ossified or that remains cartilage.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 405,
            "term": "Pars Membranacea",
            "english": "Membranous Part",
            "turkishDefinition": "Zarımsı bölüm; ince bir zar yapısından oluşan kısım.",
            "roots": "pars (bölüm) + membrana (zar)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Zarımsı bölüm",
            "englishDefinition": "The thin, membrane-like portion of a structure.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 406,
            "term": "Periosteum",
            "english": "Periosteum",
            "turkishDefinition": "Kemik dış zarı; kemiği çevreleyen, kan damarları ve sinirler içeren fibröz zar.",
            "roots": "peri (çevresinde) + osteon (kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kemik dış zarı",
            "englishDefinition": "The fibrous membrane covering the outer surface of bone, containing blood vessels and nerve fibers.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 407,
            "term": "Perichondrium",
            "english": "Perichondrium",
            "turkishDefinition": "Kıkırdak dış zarı; kıkırdak dokuyu çevreleyen fibröz bağ dokusu.",
            "roots": "peri (çevresinde) + chondros (kıkırdak)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kıkırdak dış zarı",
            "englishDefinition": "The layer of dense connective tissue that surrounds cartilage.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 408,
            "term": "Skeleton Axiale",
            "english": "Axial Skeleton",
            "turkishDefinition": "Gövde iskeleti; kafatası, omurga ve göğüs kafesinden oluşan iskelet bölümü.",
            "roots": "skeleton (iskelet) + axis/axialis (eksen)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Gövde iskeleti",
            "englishDefinition": "The part of the skeleton consisting of the skull, vertebral column, and rib cage.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 409,
            "term": "Skeleton Appendiculare",
            "english": "Appendicular Skeleton",
            "turkishDefinition": "Üyeler iskeleti; üst ve alt ekstremiteler ile bunları gövdeye bağlayan kuşaklardan oluşan iskelet bölümü.",
            "roots": "skeleton (iskelet) + appendere/appendicula (eklenti, uzantı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Üyeler iskeleti",
            "englishDefinition": "The part of the skeleton consisting of the limbs and the girdles that attach them to the axial skeleton.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 410,
            "term": "Os Longum",
            "english": "Long Bone",
            "turkishDefinition": "Uzun kemik; enine göre boyu belirgin şekilde uzun olan kemik tipi (örn. humerus, femur).",
            "roots": "os (kemik) + longus (uzun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Uzun kemik",
            "englishDefinition": "A bone that is longer than it is wide, typically found in the limbs.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 411,
            "term": "Os Breve",
            "english": "Short Bone",
            "turkishDefinition": "Kısa kemik; eni ve boyu birbirine yakın küboid şeklindeki kemik tipi (örn. el bileği kemikleri).",
            "roots": "os (kemik) + brevis (kısa)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kısa kemik",
            "englishDefinition": "A roughly cube-shaped bone with similar length and width, such as those in the wrist and ankle.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 412,
            "term": "Os Planum",
            "english": "Flat Bone",
            "turkishDefinition": "Düz kemik; ince ve yassı yapıya sahip kemik tipi (örn. kafatası kemikleri).",
            "roots": "os (kemik) + planus (düz)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Düz kemik",
            "englishDefinition": "A thin, flattened bone that often provides protection or a broad surface for muscle attachment.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 413,
            "term": "Os Irregulare",
            "english": "Irregular Bone",
            "turkishDefinition": "Düzensiz kemik; standart kemik şekillerine uymayan karmaşık yapılı kemik tipi (örn. vertebra).",
            "roots": "os (kemik) + irregularis (düzensiz)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Düzensiz kemik",
            "englishDefinition": "A bone with a complex shape that does not fit into the other standard bone shape categories.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 414,
            "term": "Os Pneumaticum",
            "english": "Pneumatized Bone",
            "turkishDefinition": "Havalı kemik; içinde hava dolu boşluklar (sinüsler) bulunan kemik tipi (örn. maxilla).",
            "roots": "os (kemik) + pneuma (hava, nefes)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Havalı kemik",
            "englishDefinition": "A bone containing air-filled cavities, such as the sinuses of the skull.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 415,
            "term": "Os Sesamoideum",
            "english": "Sesamoid Bone",
            "turkishDefinition": "Susam kemiği; tendon içinde gelişen küçük, yuvarlak kemik (örn. patella).",
            "roots": "os (kemik) + sesamum (susam tohumu - şekil benzetmesi)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Susam kemiği",
            "englishDefinition": "A small, round bone embedded within a tendon, such as the patella.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 416,
            "term": "Diaphysis",
            "english": "Diaphysis",
            "turkishDefinition": "Kemik gövdesi; uzun kemiğin orta, silindirik gövde kısmı.",
            "roots": "dia (arasında) + phyein (büyümek)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kemik gövdesi",
            "englishDefinition": "The long, central shaft portion of a long bone.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 417,
            "term": "Epiphysis",
            "english": "Epiphysis",
            "turkishDefinition": "Kemik ucu; uzun kemiğin genişlemiş uç kısmı, eklem yüzeyini içerir.",
            "roots": "epi (üzerinde) + phyein (büyümek)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kemik ucu",
            "englishDefinition": "The rounded end portion of a long bone, typically forming part of a joint.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 418,
            "term": "Cartilago Epiphysialis",
            "english": "Epiphysial Cartilage",
            "turkishDefinition": "Epifiz kıkırdağı; büyüme çağında epifiz ile diyafiz arasında yer alan kıkırdak tabaka.",
            "roots": "cartilago (kıkırdak) + epiphysis (kemik ucu)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Epifiz kıkırdağı",
            "englishDefinition": "The cartilage plate between the epiphysis and diaphysis responsible for bone growth in length.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 419,
            "term": "Lamina Epiphysialis",
            "english": "Epiphysial Plate; Growth Plate",
            "turkishDefinition": "Büyüme plağı; uzun kemiklerin boyuna büyümesini sağlayan kıkırdak tabaka.",
            "roots": "lamina (tabaka, plaka) + epiphysis (kemik ucu)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Büyüme plağı",
            "englishDefinition": "The growth plate responsible for the lengthening of long bones during childhood and adolescence.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 420,
            "term": "Linea Epiphysialis",
            "english": "Epiphysial Line",
            "turkishDefinition": "Epifiz çizgisi; büyüme tamamlandıktan sonra büyüme plağının kemikleşmesiyle oluşan iz.",
            "roots": "linea (çizgi) + epiphysis (kemik ucu)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Epifiz çizgisi",
            "englishDefinition": "The line marking the former location of the growth plate after it has ossified in adulthood.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 421,
            "term": "Metaphysis",
            "english": "Metaphysis",
            "turkishDefinition": "Metafiz; diyafiz ile epifiz arasında kalan, büyüme plağına komşu kemik bölgesi.",
            "roots": "meta (arasında, sonra) + physis (büyüme)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Metafiz",
            "englishDefinition": "The region of a long bone between the diaphysis and the epiphysis, adjacent to the growth plate.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 422,
            "term": "Apophysis",
            "english": "Apophysis",
            "turkishDefinition": "Çıkıntı; kendi kemikleşme merkezi olan, kas veya bağ tutunma yeri işlevi gören kemik çıkıntısı.",
            "roots": "apo (uzakta, ayrı) + physis (büyüme)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Çıkıntı",
            "englishDefinition": "A bony outgrowth with its own ossification center that serves as a muscle or ligament attachment site.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 423,
            "term": "Tuber",
            "english": "Tuber; Tuberosity",
            "turkishDefinition": "Tümsek; kemik yüzeyinde yer alan yuvarlak, pürüzlü kabarıklık.",
            "roots": "tuber (şişkinlik, yumru)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Tümsek",
            "englishDefinition": "A rounded, rough prominence on the surface of a bone.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 424,
            "term": "Eminentia",
            "english": "Eminence",
            "turkishDefinition": "Kabarıklık; kemik yüzeyinde belirgin bir yükselti veya çıkıntı.",
            "roots": "eminere (yükselmek, öne çıkmak)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kabarıklık",
            "englishDefinition": "A projection or raised area on the surface of a bone.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 425,
            "term": "Condylus",
            "english": "Condyle",
            "turkishDefinition": "Lokma / Kondil; bir eklemde diğer kemikle eklemleşen yuvarlak, çıkıntılı kemik ucu.",
            "roots": "kondylos (eklem çıkıntısı - Yunanca)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Lokma / Kondil",
            "englishDefinition": "A rounded articular prominence at the end of a bone that forms part of a joint.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 426,
            "term": "Cavitas Medullaris",
            "english": "Medullary Cavity; Marrow Cavity",
            "turkishDefinition": "Kemik iliği boşluğu; uzun kemiğin diyafizi içindeki, kemik iliğini barındıran boşluk.",
            "roots": "cavitas (boşluk) + medulla (ilik, öz)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kemik iliği boşluğu",
            "englishDefinition": "The central cavity within the diaphysis of a long bone that contains bone marrow.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 427,
            "term": "Endosteum",
            "english": "Endosteum",
            "turkishDefinition": "Kemik iç zarı; kemik iliği boşluğunun iç yüzeyini kaplayan ince zar.",
            "roots": "endo (içinde) + osteon (kemik)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kemik iç zarı",
            "englishDefinition": "The thin membrane lining the inner surface of the medullary cavity of bone.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 428,
            "term": "Medulla Ossium Flava",
            "english": "Yellow Bone Marrow",
            "turkishDefinition": "Sarı kemik iliği; büyük oranda yağ hücresi içeren, kan hücresi üretimi düşük kemik iliği tipi.",
            "roots": "medulla (ilik) + os/ossis (kemik) + flavus (sarı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Sarı kemik iliği",
            "englishDefinition": "The fatty, yellow bone marrow found mainly in the medullary cavities of long bones in adults.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 429,
            "term": "Medulla Ossium Rubra",
            "english": "Red Bone Marrow",
            "turkishDefinition": "Kırmızı kemik iliği; kan hücrelerinin üretildiği aktif kemik iliği tipi.",
            "roots": "medulla (ilik) + os/ossis (kemik) + ruber (kırmızı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kırmızı kemik iliği",
            "englishDefinition": "The active, blood-cell-producing bone marrow found in flat bones and the ends of long bones.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 430,
            "term": "Foramen Nutricium",
            "english": "Nutrient Foramen",
            "turkishDefinition": "Besleyici delik; kemik damarlarının kemik içine girdiği küçük açıklık.",
            "roots": "foramen (delik) + nutrire (beslemek)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Besleyici delik",
            "englishDefinition": "A small opening in a bone through which nutrient blood vessels pass.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 431,
            "term": "Canalis Nutricius",
            "english": "Nutrient Canal",
            "turkishDefinition": "Besleyici kanal (eş anlamlısı: Canalis Nutriens); besleyici deliğin kemik içine devam eden kanalı.",
            "roots": "canalis (kanal) + nutrire (beslemek)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Besleyici kanal",
            "englishDefinition": "The canal within bone through which the nutrient vessels travel after entering via the nutrient foramen.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        },
        {
            "id": 432,
            "term": "Centrum Ossificationis",
            "english": "Ossification Centre",
            "turkishDefinition": "Kemikleşme merkezi; kemik dokusunun ilk oluşmaya başladığı nokta.",
            "roots": "centrum (merkez) + ossificare (kemikleşmek)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "bone_structures",
            "turkishShort": "Kemikleşme merkezi",
            "englishDefinition": "The site within cartilage or connective tissue where bone formation begins.",
            "createdAt": {
                "_seconds": 1789115654,
                "_nanoseconds": 36000000
            }
        }
    ]
,
    "head_and_neck_muscles": [
    
        {
            "id": 829,
            "term": "M. Epicranius",
            "english": "Epicranius Muscle",
            "turkishDefinition": "Kafatası kası; kafatası derisini hareket ettiren, alın ve artkafa karınlarıyla galea aponörotikadan oluşan kas grubu.",
            "turkishShort": "Kafatası kası",
            "roots": "epi- (üzerinde) + cranium (kafatası)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle group covering the skull, consisting of the frontal and occipital bellies connected by the galea aponeurotica."
        },
        {
            "id": 830,
            "term": "M. Occipitofrontalis",
            "english": "Occipitofrontalis Muscle",
            "turkishDefinition": "Artkafa-alın kası; kaşları kaldıran ve alın derisini kırıştıran, artkafa ve alın karınlarından oluşan kas.",
            "turkishShort": "Artkafa-alın kası",
            "roots": "occipito- (artkafaya ait) + frontalis (alına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle composed of the occipital and frontal bellies that raises the eyebrows and wrinkles the forehead."
        },
        {
            "id": 831,
            "term": "Venter Frontalis",
            "english": "Frontal Belly",
            "turkishDefinition": "Alın karnı; occipitofrontalis kasının kaşları kaldıran ön (alın) parçası.",
            "turkishShort": "Alın karnı",
            "roots": "venter (karın) + frontalis (alına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The anterior belly of the occipitofrontalis muscle that raises the eyebrows."
        },
        {
            "id": 832,
            "term": "Venter Occipitalis",
            "english": "Occipital Belly",
            "turkishDefinition": "Artkafa karnı; occipitofrontalis kasının kafa derisini geriye çeken arka (artkafa) parçası.",
            "turkishShort": "Artkafa karnı",
            "roots": "venter (karın) + occipitalis (artkafaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The posterior belly of the occipitofrontalis muscle that draws the scalp backward."
        },
        {
            "id": 833,
            "term": "M. Temporoparietalis",
            "english": "Temporoparietal Muscle",
            "turkishDefinition": "Şakak-duvar kemiği kası; kulak üstü deriyi gerdiren ince kas.",
            "turkishShort": "Şakak-duvar kemiği kası",
            "roots": "temporo- (şakak kemiğine ait) + parietalis (duvar kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A thin muscle that tightens the scalp above the ear."
        },
        {
            "id": 834,
            "term": "Galea Aponeurotica",
            "english": "Galeal Aponeurosis",
            "turkishDefinition": "Kafa derisi zarı; alın ve artkafa karınlarını birbirine bağlayan geniş, yassı tendon zarı.",
            "turkishShort": "Kafa derisi zarı",
            "roots": "galea (miğfer) + aponeurotica (aponevroza ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The broad, flat tendinous sheet connecting the frontal and occipital bellies of the occipitofrontalis muscle."
        },
        {
            "id": 835,
            "term": "M. Procerus",
            "english": "Procerus Muscle",
            "turkishDefinition": "Burun kökü kası; kaşlar arasındaki deriyi aşağı çeken, burun kökünde enine kırışıklık oluşturan kas.",
            "turkishShort": "Burun kökü kası",
            "roots": "procerus (uzun/ince)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A small muscle that pulls the skin between the eyebrows downward, producing transverse wrinkles over the bridge of the nose."
        },
        {
            "id": 836,
            "term": "M. Nasalis",
            "english": "Nasalis Muscle",
            "turkishDefinition": "Burun kası; burun deliklerini sıkıştıran ve genişleten kas.",
            "turkishShort": "Burun kası",
            "roots": "nasus (burun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that compresses and widens the nostrils."
        },
        {
            "id": 837,
            "term": "Pars Transversa (M. Nasalis)",
            "english": "Transverse Part",
            "turkishDefinition": "Enine parça; burun kasının burun deliklerini sıkıştıran enine lifleri.",
            "turkishShort": "Enine parça",
            "roots": "pars (parça) + transversa (enine)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The transverse fibers of the nasalis muscle that compress the nostrils."
        },
        {
            "id": 838,
            "term": "Pars Alaris (M. Nasalis)",
            "english": "Alar Part",
            "turkishDefinition": "Kanat parçası; burun kasının burun kanadını genişleten lifleri.",
            "turkishShort": "Kanat parçası",
            "roots": "pars (parça) + alaris (kanada ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The alar fibers of the nasalis muscle that widen the nostril."
        },
        {
            "id": 839,
            "term": "M. Depressor Septi Nasi",
            "english": "Depressor Septi Nasi Muscle",
            "turkishDefinition": "Burun bölmesi indirici kası; burun ucunu ve bölmesini aşağı çeken küçük kas.",
            "turkishShort": "Burun bölmesi indirici kası",
            "roots": "depressor (indirici) + septum (bölme) + nasi (buruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A small muscle that pulls the tip and septum of the nose downward."
        },
        {
            "id": 840,
            "term": "M. Orbicularis Oculi",
            "english": "Orbicularis Oculi Muscle",
            "turkishDefinition": "Göz çevresi halka kası; göz kapaklarını kapatan, göz çevresini saran halka biçimli kas.",
            "turkishShort": "Göz çevresi halka kası",
            "roots": "orbicularis (halka biçimli) + oculi (göze ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The ring-shaped muscle surrounding the eye that closes the eyelids."
        },
        {
            "id": 841,
            "term": "Pars Palpebralis (M. Orbicularis Oculi)",
            "english": "Palpebral Part",
            "turkishDefinition": "Göz kapağı parçası; göz kapağı içinde yer alan, göz kapaklarını nazikçe kapatan lifler.",
            "turkishShort": "Göz kapağı parçası",
            "roots": "pars (parça) + palpebralis (göz kapağına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The part of the orbicularis oculi within the eyelid, responsible for gentle, involuntary blinking."
        },
        {
            "id": 842,
            "term": "Fasciculus Ciliaris",
            "english": "Ciliary Bundle",
            "turkishDefinition": "Kirpik demeti; göz kapağı kenarında, kirpik köklerine yakın ince kas lifi demeti.",
            "turkishShort": "Kirpik demeti",
            "roots": "fasciculus (küçük demet) + ciliaris (kirpiğe ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A thin bundle of muscle fibers near the eyelid margin, close to the roots of the eyelashes."
        },
        {
            "id": 843,
            "term": "Pars Profunda (M. Orbicularis Oculi)",
            "english": "Deep Part",
            "turkishDefinition": "Derin parça; göz kapağı kasının gözyaşı kesesini çevreleyen derin lifleri.",
            "turkishShort": "Derin parça",
            "roots": "pars (parça) + profunda (derin)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The deep part of the orbicularis oculi surrounding the lacrimal sac."
        },
        {
            "id": 844,
            "term": "Pars Orbitalis (M. Orbicularis Oculi)",
            "english": "Orbital Part",
            "turkishDefinition": "Göz çukuru parçası; göz yuvası çevresini saran, göz kapaklarını sıkıca kapatan dış lifler.",
            "turkishShort": "Göz çukuru parçası",
            "roots": "pars (parça) + orbitalis (göz çukuruna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The outer part of the orbicularis oculi surrounding the orbit, responsible for forceful eyelid closure."
        },
        {
            "id": 845,
            "term": "M. Corrugator Supercilii",
            "english": "Corrugator Supercilii Muscle",
            "turkishDefinition": "Kaş kırıştırıcı kas; kaşları içe ve aşağı çekerek dikey kırışıklık oluşturan kas.",
            "turkishShort": "Kaş kırıştırıcı kas",
            "roots": "corrugator (kırıştırıcı) + supercilium (kaş)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that draws the eyebrows medially and downward, producing vertical frown lines."
        },
        {
            "id": 846,
            "term": "M. Depressor Supercilii",
            "english": "Depressor Supercilii Muscle",
            "turkishDefinition": "Kaş indirici kas; kaşın iç kısmını aşağı çeken küçük kas.",
            "turkishShort": "Kaş indirici kas",
            "roots": "depressor (indirici) + supercilium (kaş)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A small muscle that depresses the medial portion of the eyebrow."
        },
        {
            "id": 847,
            "term": "M. Auricularis Anterior",
            "english": "Anterior Auricular Muscle",
            "turkishDefinition": "Ön kulak kası; kulak kepçesini öne doğru çeken küçük kas.",
            "turkishShort": "Ön kulak kası",
            "roots": "auricularis (kulağa ait) + anterior (ön)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A small muscle that draws the auricle forward."
        },
        {
            "id": 848,
            "term": "M. Auricularis Superior",
            "english": "Superior Auricular Muscle",
            "turkishDefinition": "Üst kulak kası; kulak kepçesini yukarı doğru çeken küçük kas.",
            "turkishShort": "Üst kulak kası",
            "roots": "auricularis (kulağa ait) + superior (üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A small muscle that draws the auricle upward."
        },
        {
            "id": 849,
            "term": "M. Auricularis Posterior",
            "english": "Posterior Auricular Muscle",
            "turkishDefinition": "Arka kulak kası; kulak kepçesini geriye doğru çeken küçük kas.",
            "turkishShort": "Arka kulak kası",
            "roots": "auricularis (kulağa ait) + posterior (arka)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A small muscle that draws the auricle backward."
        },
        {
            "id": 850,
            "term": "M. Orbicularis Oris",
            "english": "Orbicularis Oris Muscle",
            "turkishDefinition": "Ağız çevresi halka kası; dudakları kapatan ve büzen, ağız çevresini saran halka biçimli kas.",
            "turkishShort": "Ağız çevresi halka kası",
            "roots": "orbicularis (halka biçimli) + oris (ağıza ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The ring-shaped muscle surrounding the mouth that closes and purses the lips."
        },
        {
            "id": 851,
            "term": "Pars Marginalis (M. Orbicularis Oris)",
            "english": "Marginal Part",
            "turkishDefinition": "Kenar parçası; dudak kenarındaki ince, yüzeyel lifler.",
            "turkishShort": "Kenar parçası",
            "roots": "pars (parça) + marginalis (kenara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The thin, superficial fibers at the margin of the lips."
        },
        {
            "id": 852,
            "term": "Pars Labialis (M. Orbicularis Oris)",
            "english": "Labial Part",
            "turkishDefinition": "Dudak parçası; dudak içindeki derin, ağzı sıkıca kapatan lifler.",
            "turkishShort": "Dudak parçası",
            "roots": "pars (parça) + labialis (dudağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The deeper fibers within the lips that tightly close the mouth."
        },
        {
            "id": 853,
            "term": "M. Depressor Anguli Oris",
            "english": "Depressor Anguli Oris Muscle",
            "turkishDefinition": "Ağız köşesi indirici kas; ağız köşesini aşağı çeken, üzgün ifade oluşturan kas.",
            "turkishShort": "Ağız köşesi indirici kas",
            "roots": "depressor (indirici) + angulus (köşe) + oris (ağıza ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that pulls the corner of the mouth downward, producing a frowning expression."
        },
        {
            "id": 854,
            "term": "M. Transversus Menti",
            "english": "Transversus Menti Muscle",
            "turkishDefinition": "Çene enine kası; çene ucunda, depressor anguli oris kasının liflerinin birleştiği küçük enine kas.",
            "turkishShort": "Çene enine kası",
            "roots": "transversus (enine) + mentum (çene)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A small transverse muscle at the chin formed by the union of fibers from the depressor anguli oris."
        },
        {
            "id": 855,
            "term": "M. Risorius",
            "english": "Risorius Muscle",
            "turkishDefinition": "Gülümseme kası; ağız köşesini yana çekerek gülümseme veya sırıtma ifadesi oluşturan ince kas.",
            "turkishShort": "Gülümseme kası",
            "roots": "risorius (gülmeye ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A thin muscle that draws the corner of the mouth laterally, producing a smiling or grinning expression."
        },
        {
            "id": 856,
            "term": "M. Zygomaticus Major",
            "english": "Zygomaticus Major Muscle",
            "turkishDefinition": "Büyük elmacık kası; ağız köşesini yukarı ve dışa çekerek gülümsemeyi sağlayan kas.",
            "turkishShort": "Büyük elmacık kası",
            "roots": "zygomaticus (elmacık kemiğine ait) + major (büyük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that draws the corner of the mouth upward and laterally, producing a smile."
        },
        {
            "id": 857,
            "term": "M. Zygomaticus Minor",
            "english": "Zygomaticus Minor Muscle",
            "turkishDefinition": "Küçük elmacık kası; üst dudağı yukarı çeken, burun-dudak oluğunu derinleştiren kas.",
            "turkishShort": "Küçük elmacık kası",
            "roots": "zygomaticus (elmacık kemiğine ait) + minor (küçük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that elevates the upper lip, deepening the nasolabial furrow."
        },
        {
            "id": 858,
            "term": "M. Levator Labii Superioris",
            "english": "Levator Labii Superioris Muscle",
            "turkishDefinition": "Üst dudak kaldırıcı kas; üst dudağı yukarı kaldıran kas.",
            "turkishShort": "Üst dudak kaldırıcı kas",
            "roots": "levator (kaldırıcı) + labium (dudak) + superior (üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that elevates the upper lip."
        },
        {
            "id": 859,
            "term": "M. Levator Labii Superioris Alaeque Nasi",
            "english": "Levator Labii Superioris Alaeque Nasi Muscle",
            "turkishDefinition": "Üst dudak ve burun kanadı kaldırıcı kas; hem üst dudağı hem burun kanadını yukarı kaldıran kas.",
            "turkishShort": "Üst dudak ve burun kanadı kaldırıcı kas",
            "roots": "levator (kaldırıcı) + labium (dudak) + superior (üst) + ala (kanat) + nasus (burun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that elevates both the upper lip and the wing of the nose."
        },
        {
            "id": 860,
            "term": "M. Depressor Labii Inferioris",
            "english": "Depressor Labii Inferioris Muscle",
            "turkishDefinition": "Alt dudak indirici kas; alt dudağı aşağı ve dışa çeken kas.",
            "turkishShort": "Alt dudak indirici kas",
            "roots": "depressor (indirici) + labium (dudak) + inferior (alt)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that pulls the lower lip downward and laterally."
        },
        {
            "id": 861,
            "term": "M. Levator Anguli Oris",
            "english": "Levator Anguli Oris Muscle",
            "turkishDefinition": "Ağız köşesi kaldırıcı kas; ağız köşesini yukarı kaldıran kas.",
            "turkishShort": "Ağız köşesi kaldırıcı kas",
            "roots": "levator (kaldırıcı) + angulus (köşe) + oris (ağıza ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that elevates the corner of the mouth."
        },
        {
            "id": 862,
            "term": "Modiolus Anguli Oris",
            "english": "Modiolus",
            "turkishDefinition": "Ağız köşesi düğümü; ağız köşesinde birçok mimik kasının liflerinin birleştiği sıkı doku düğümü.",
            "turkishShort": "Ağız köşesi düğümü",
            "roots": "modiolus (tekerlek göbeği) + angulus (köşe) + oris (ağıza ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A dense fibromuscular node at the corner of the mouth where several facial muscles converge."
        },
        {
            "id": 863,
            "term": "M. Buccinator",
            "english": "Buccinator Muscle",
            "turkishDefinition": "Yanak kası; yanağı kemiğe bastıran, üfleme ve çiğnemeye yardımcı olan düz kas.",
            "turkishShort": "Yanak kası",
            "roots": "buccinator (trompetçi)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The flat muscle of the cheek that compresses it against the teeth, aiding in blowing and chewing."
        },
        {
            "id": 864,
            "term": "M. Mentalis",
            "english": "Mentalis Muscle",
            "turkishDefinition": "Çene kası; çene derisini yukarı iterek alt dudağı dışa çıkaran kas.",
            "turkishShort": "Çene kası",
            "roots": "mentum (çene)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that raises the skin of the chin and everts the lower lip."
        },
        {
            "id": 865,
            "term": "M. Masseter",
            "english": "Masseter Muscle",
            "turkishDefinition": "Çiğneme kası; alt çeneyi kaldırıp öne iterek çiğnemeyi sağlayan güçlü kas.",
            "turkishShort": "Çiğneme kası",
            "roots": "masseter (çiğneyici)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A powerful muscle that elevates and protracts the mandible during chewing."
        },
        {
            "id": 866,
            "term": "Pars Superficialis (M. Masseter)",
            "english": "Superficial Part",
            "turkishDefinition": "Yüzeyel parça; masseter kasının elmacık kemiğinden başlayan yüzeyel lifleri.",
            "turkishShort": "Yüzeyel parça",
            "roots": "pars (parça) + superficialis (yüzeysel)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The superficial fibers of the masseter muscle arising from the zygomatic bone."
        },
        {
            "id": 867,
            "term": "M. Temporalis",
            "english": "Temporalis Muscle",
            "turkishDefinition": "Şakak kası; şakak çukurundan başlayıp alt çeneyi kaldıran yelpaze biçimli kas.",
            "turkishShort": "Şakak kası",
            "roots": "temporalis (şakak kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A fan-shaped muscle arising from the temporal fossa that elevates the mandible."
        },
        {
            "id": 868,
            "term": "M. Pterygoideus Lateralis",
            "english": "Lateral Pterygoid Muscle",
            "turkishDefinition": "Dış kanat kası; alt çeneyi öne ve yana hareket ettiren kas.",
            "turkishShort": "Dış kanat kası",
            "roots": "pterygoideus (kanatsı çıkıntıya ait) + lateralis (yan)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that protracts and moves the mandible laterally."
        },
        {
            "id": 869,
            "term": "Caput Superius (M. Pterygoideus Lateralis)",
            "english": "Superior Head",
            "turkishDefinition": "Üst baş; dış kanat kasının sfenoid kemiğin büyük kanadından başlayan üst kısmı.",
            "turkishShort": "Üst baş",
            "roots": "caput (baş) + superius (üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The upper head of the lateral pterygoid muscle arising from the greater wing of the sphenoid."
        },
        {
            "id": 870,
            "term": "Caput Inferius (M. Pterygoideus Lateralis)",
            "english": "Inferior Head",
            "turkishDefinition": "Alt baş; dış kanat kasının kanatsı çıkıntıdan başlayan alt kısmı.",
            "turkishShort": "Alt baş",
            "roots": "caput (baş) + inferius (alt)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The lower head of the lateral pterygoid muscle arising from the pterygoid process."
        },
        {
            "id": 871,
            "term": "M. Pterygoideus Medialis",
            "english": "Medial Pterygoid Muscle",
            "turkishDefinition": "İç kanat kası; alt çeneyi kaldırıp öne iten kas.",
            "turkishShort": "İç kanat kası",
            "roots": "pterygoideus (kanatsı çıkıntıya ait) + medialis (iç)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that elevates and protracts the mandible."
        },
        {
            "id": 872,
            "term": "Fascia Buccopharyngea",
            "english": "Buccopharyngeal Fascia",
            "turkishDefinition": "Yanak-yutak fasyası; yanak kası ile yutak kaslarını örten ince bağ dokusu zarı.",
            "turkishShort": "Yanak-yutak fasyası",
            "roots": "bucco- (yanağa ait) + pharyngea (yutağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The thin fascial layer covering the buccinator and pharyngeal muscles."
        },
        {
            "id": 873,
            "term": "Fascia Masseterica",
            "english": "Masseteric Fascia",
            "turkishDefinition": "Çiğneme kası fasyası; masseter kasını saran bağ dokusu zarı.",
            "turkishShort": "Çiğneme kası fasyası",
            "roots": "masseterica (çiğneme kasına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The fascial sheath covering the masseter muscle."
        },
        {
            "id": 874,
            "term": "Fascia Parotidea",
            "english": "Parotid Fascia",
            "turkishDefinition": "Kulak altı bezi fasyası; parotis bezini saran bağ dokusu zarı.",
            "turkishShort": "Kulak altı bezi fasyası",
            "roots": "parotidea (kulak altı bezine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The fascial sheath surrounding the parotid gland."
        },
        {
            "id": 875,
            "term": "Fascia Temporalis",
            "english": "Temporal Fascia",
            "turkishDefinition": "Şakak fasyası; şakak kasını örten güçlü bağ dokusu zarı.",
            "turkishShort": "Şakak fasyası",
            "roots": "temporalis (şakak kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The strong fascial layer covering the temporalis muscle."
        },
        {
            "id": 876,
            "term": "Platysma",
            "english": "Platysma Muscle",
            "turkishDefinition": "Boyun yüzeyel kası; boyun ön-yan derisinde yer alan, ağız köşesini aşağı çeken ince, geniş kas.",
            "turkishShort": "Boyun yüzeyel kası",
            "roots": "platysma (yassı levha)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A thin, broad muscle in the anterolateral neck that depresses the corner of the mouth."
        },
        {
            "id": 877,
            "term": "M. Longus Capitis",
            "english": "Longus Capitis Muscle",
            "turkishDefinition": "Uzun baş kası; boyun omurlarından başlayıp başı öne eğen uzun kas.",
            "turkishShort": "Uzun baş kası",
            "roots": "longus (uzun) + caput (baş)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A long muscle arising from the cervical vertebrae that flexes the head."
        },
        {
            "id": 878,
            "term": "M. Longus Colli",
            "english": "Longus Colli Muscle",
            "turkishDefinition": "Uzun boyun kası; boyun omurgasını öne eğen ve stabilize eden uzun kas.",
            "turkishShort": "Uzun boyun kası",
            "roots": "longus (uzun) + collum (boyun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A long muscle that flexes and stabilizes the cervical spine."
        },
        {
            "id": 879,
            "term": "M. Scalenus Anterior",
            "english": "Anterior Scalene Muscle",
            "turkishDefinition": "Ön merdiven kası; boynun yan tarafında yer alan, 1. kaburgayı kaldıran kas.",
            "turkishShort": "Ön merdiven kası",
            "roots": "scalenus (eşkenar olmayan üçgen) + anterior (ön)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A lateral neck muscle that elevates the first rib."
        },
        {
            "id": 880,
            "term": "M. Scalenus Medius",
            "english": "Middle Scalene Muscle",
            "turkishDefinition": "Orta merdiven kası; boynun yan tarafında yer alan, 1. kaburgayı kaldıran en uzun merdiven kası.",
            "turkishShort": "Orta merdiven kası",
            "roots": "scalenus (eşkenar olmayan üçgen) + medius (orta)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The longest of the scalene muscles, elevating the first rib."
        },
        {
            "id": 881,
            "term": "M. Scalenus Posterior",
            "english": "Posterior Scalene Muscle",
            "turkishDefinition": "Arka merdiven kası; boynun yan tarafında yer alan, 2. kaburgayı kaldıran kas.",
            "turkishShort": "Arka merdiven kası",
            "roots": "scalenus (eşkenar olmayan üçgen) + posterior (arka)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A lateral neck muscle that elevates the second rib."
        },
        {
            "id": 882,
            "term": "M. Scalenus Minimus",
            "english": "Smallest Scalene Muscle",
            "turkishDefinition": "En küçük merdiven kası; sabit olmayan, bazı kişilerde bulunan küçük merdiven kası.",
            "turkishShort": "En küçük merdiven kası",
            "roots": "scalenus (eşkenar olmayan üçgen) + minimus (en küçük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "An inconstant, small scalene muscle present in some individuals."
        },
        {
            "id": 883,
            "term": "M. Sternocleidomastoideus",
            "english": "Sternocleidomastoid Muscle",
            "turkishDefinition": "Göğüs kemiği-köprücük-meme çıkıntısı kası; başı döndüren ve öne eğen, boyunda belirgin görünen büyük kas.",
            "turkishShort": "Göğüs kemiği-köprücük-meme çıkıntısı kası",
            "roots": "sterno- (göğüs kemiğine ait) + cleido- (köprücük kemiğine ait) + mastoideus (meme çıkıntısına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A prominent neck muscle that rotates and flexes the head, extending from the sternum and clavicle to the mastoid process."
        },
        {
            "id": 884,
            "term": "M. Rectus Capitis Anterior",
            "english": "Rectus Capitis Anterior Muscle",
            "turkishDefinition": "Ön düz baş kası; başı öne eğen küçük suboksipital kas.",
            "turkishShort": "Ön düz baş kası",
            "roots": "rectus (düz) + caput (baş) + anterior (ön)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A small suboccipital muscle that flexes the head."
        },
        {
            "id": 885,
            "term": "M. Rectus Capitis Lateralis",
            "english": "Rectus Capitis Lateralis Muscle",
            "turkishDefinition": "Yan düz baş kası; başı yana eğen küçük suboksipital kas.",
            "turkishShort": "Yan düz baş kası",
            "roots": "rectus (düz) + caput (baş) + lateralis (yan)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A small suboccipital muscle that laterally flexes the head."
        },
        {
            "id": 886,
            "term": "M. Rectus Capitis Posterior Major",
            "english": "Rectus Capitis Posterior Major Muscle",
            "turkishDefinition": "Büyük arka düz baş kası; başı geriye uzatan ve döndüren suboksipital kas.",
            "turkishShort": "Büyük arka düz baş kası",
            "roots": "rectus (düz) + caput (baş) + posterior (arka) + major (büyük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A suboccipital muscle that extends and rotates the head."
        },
        {
            "id": 887,
            "term": "M. Rectus Capitis Posterior Minor",
            "english": "Rectus Capitis Posterior Minor Muscle",
            "turkishDefinition": "Küçük arka düz baş kası; başı geriye uzatan küçük suboksipital kas.",
            "turkishShort": "Küçük arka düz baş kası",
            "roots": "rectus (düz) + caput (baş) + posterior (arka) + minor (küçük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A small suboccipital muscle that extends the head."
        },
        {
            "id": 888,
            "term": "M. Obliquus Capitis Superior",
            "english": "Superior Oblique Muscle of Head",
            "turkishDefinition": "Üst eğik baş kası; başı yana eğen ve geriye uzatan suboksipital kas.",
            "turkishShort": "Üst eğik baş kası",
            "roots": "obliquus (eğik) + caput (baş) + superior (üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A suboccipital muscle that laterally flexes and extends the head."
        },
        {
            "id": 889,
            "term": "M. Obliquus Capitis Inferior",
            "english": "Inferior Oblique Muscle of Head",
            "turkishDefinition": "Alt eğik baş kası; başı döndüren suboksipital kas.",
            "turkishShort": "Alt eğik baş kası",
            "roots": "obliquus (eğik) + caput (baş) + inferior (alt)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A suboccipital muscle that rotates the head."
        },
        {
            "id": 890,
            "term": "M. Digastricus",
            "english": "Digastric Muscle",
            "turkishDefinition": "Çift karınlı kas; alt çeneyi indiren ve dil kemiğini kaldıran, iki karınlı kas.",
            "turkishShort": "Çift karınlı kas",
            "roots": "di- (iki) + gastricus (karına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A two-bellied muscle that depresses the mandible and elevates the hyoid bone."
        },
        {
            "id": 891,
            "term": "M. Stylohyoideus",
            "english": "Stylohyoid Muscle",
            "turkishDefinition": "Sivri çıkıntı-dil kemiği kası; dil kemiğini yukarı ve geriye çeken kas.",
            "turkishShort": "Sivri çıkıntı-dil kemiği kası",
            "roots": "stylo- (sivri çıkıntıya ait) + hyoideus (dil kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that elevates and retracts the hyoid bone."
        },
        {
            "id": 892,
            "term": "M. Mylohyoideus",
            "english": "Mylohyoid Muscle",
            "turkishDefinition": "Değirmen-dil kemiği kası; ağız tabanını oluşturan, dil kemiğini kaldıran kas.",
            "turkishShort": "Değirmen-dil kemiği kası",
            "roots": "mylo- (azı dişine/değirmene ait) + hyoideus (dil kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle forming the floor of the mouth that elevates the hyoid bone."
        },
        {
            "id": 893,
            "term": "M. Geniohyoideus",
            "english": "Geniohyoid Muscle",
            "turkishDefinition": "Çene ucu-dil kemiği kası; dil kemiğini öne çeken kas.",
            "turkishShort": "Çene ucu-dil kemiği kası",
            "roots": "genio- (çene ucuna ait) + hyoideus (dil kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that draws the hyoid bone forward."
        },
        {
            "id": 894,
            "term": "M. Sternohyoideus",
            "english": "Sternohyoid Muscle",
            "turkishDefinition": "Göğüs kemiği-dil kemiği kası; dil kemiğini aşağı çeken kas.",
            "turkishShort": "Göğüs kemiği-dil kemiği kası",
            "roots": "sterno- (göğüs kemiğine ait) + hyoideus (dil kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that depresses the hyoid bone."
        },
        {
            "id": 895,
            "term": "M. Omohyoideus",
            "english": "Omohyoid Muscle",
            "turkishDefinition": "Kürek kemiği-dil kemiği kası; dil kemiğini aşağı çeken, iki karınlı kas.",
            "turkishShort": "Kürek kemiği-dil kemiği kası",
            "roots": "omo- (kürek kemiğine ait) + hyoideus (dil kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A two-bellied muscle that depresses the hyoid bone."
        },
        {
            "id": 896,
            "term": "M. Sternothyreoideus",
            "english": "Sternothyroid Muscle",
            "turkishDefinition": "Göğüs kemiği-tiroid kıkırdağı kası; gırtlağı aşağı çeken kas.",
            "turkishShort": "Göğüs kemiği-tiroid kıkırdağı kası",
            "roots": "sterno- (göğüs kemiğine ait) + thyreoideus (tiroid kıkırdağına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that depresses the larynx."
        },
        {
            "id": 897,
            "term": "M. Thyrohyoideus",
            "english": "Thyrohyoid Muscle",
            "turkishDefinition": "Tiroid kıkırdağı-dil kemiği kası; gırtlağı yukarı, dil kemiğini aşağı çeken kas.",
            "turkishShort": "Tiroid kıkırdağı-dil kemiği kası",
            "roots": "thyreo- (tiroid kıkırdağına ait) + hyoideus (dil kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The muscle that elevates the larynx and depresses the hyoid bone."
        },
        {
            "id": 898,
            "term": "Fascia Cervicalis (Fascia Colli)",
            "english": "Cervical Fascia",
            "turkishDefinition": "Boyun fasyası; boyun kaslarını ve organlarını saran, katmanlı bağ dokusu zarı.",
            "turkishShort": "Boyun fasyası",
            "roots": "cervicalis (boyuna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The layered connective tissue sheath enveloping the muscles and organs of the neck."
        },
        {
            "id": 899,
            "term": "Lamina Superficialis (Fascia Cervicalis)",
            "english": "Superficial Layer",
            "turkishDefinition": "Yüzeyel tabaka; boyun fasyasının sternokleidomastoideus ve trapezius kaslarını saran dış tabakası.",
            "turkishShort": "Yüzeyel tabaka",
            "roots": "lamina (tabaka) + superficialis (yüzeysel)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The outer layer of the cervical fascia enclosing the sternocleidomastoid and trapezius muscles."
        },
        {
            "id": 900,
            "term": "Spatium Suprasternale",
            "english": "Suprasternal Space",
            "turkishDefinition": "Göğüs kemiği üstü boşluğu; boyun fasyasının yüzeyel tabakaları arasında, göğüs kemiği çentiğinin üzerinde kalan boşluk.",
            "turkishShort": "Göğüs kemiği üstü boşluğu",
            "roots": "supra- (üzerinde) + sternum (göğüs kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The space between the layers of superficial cervical fascia above the sternal notch."
        },
        {
            "id": 901,
            "term": "Lamina Pretrachealis",
            "english": "Pretracheal Layer",
            "turkishDefinition": "Soluk borusu önü tabakası; boyun fasyasının tiroid bezi ve gırtlağı saran orta tabakası.",
            "turkishShort": "Soluk borusu önü tabakası",
            "roots": "prae- (önünde) + trachea (soluk borusu)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The middle layer of the cervical fascia enclosing the thyroid gland and larynx."
        },
        {
            "id": 902,
            "term": "Lamina Prevertebralis",
            "english": "Prevertebral Layer",
            "turkishDefinition": "Omur önü tabakası; boyun fasyasının omurga önü kaslarını saran derin tabakası.",
            "turkishShort": "Omur önü tabakası",
            "roots": "prae- (önünde) + vertebra (omur)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The deep layer of the cervical fascia enclosing the prevertebral muscles."
        },
        {
            "id": 903,
            "term": "Vagina Carotica",
            "english": "Carotid Sheath",
            "turkishDefinition": "Karotis kılıfı; boyunda karotis arterini, iç boyun toplardamarını ve vagus sinirini saran bağ dokusu kılıfı.",
            "turkishShort": "Karotis kılıfı",
            "roots": "vagina (kılıf) + carotica (karotis arterine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The fascial sheath in the neck enclosing the carotid artery, internal jugular vein, and vagus nerve."
        },
        {
            "id": 904,
            "term": "M. Splenius Capitis",
            "english": "Splenius Capitis Muscle",
            "turkishDefinition": "Baş sargı kası; başı döndüren ve geriye uzatan geniş ense kası.",
            "turkishShort": "Baş sargı kası",
            "roots": "splenius (sargı/bandaj) + caput (baş)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A broad neck muscle that rotates and extends the head."
        },
        {
            "id": 905,
            "term": "M. Splenius Colli",
            "english": "Splenius Colli Muscle",
            "turkishDefinition": "Boyun sargı kası; boyun omurgasını döndüren ve geriye uzatan ense kası. (TA2 resmi adı: M. Splenius Cervicis).",
            "turkishShort": "Boyun sargı kası",
            "roots": "splenius (sargı/bandaj) + collum (boyun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "A neck muscle that rotates and extends the cervical spine."
        }
    ,
        {
            "id": 1062,
            "term": "Venter Anterior (m. Digastricus)",
            "english": "Anterior Belly",
            "turkishDefinition": "Ön karın; digastrik kasın alt çeneden dil kemiğine uzanan ön kısmı.",
            "turkishShort": "Ön karın",
            "roots": "venter (karın) + anterior (ön)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The anterior part of the digastric muscle, extending from the mandible to the hyoid bone.",
            "createdAt": {}
        },
        {
            "id": 1063,
            "term": "Venter Posterior (m. Digastricus)",
            "english": "Posterior Belly",
            "turkishDefinition": "Arka karın; digastrik kasın şakak kemiğinden dil kemiğine uzanan arka kısmı.",
            "turkishShort": "Arka karın",
            "roots": "venter (karın) + posterior (arka)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The posterior part of the digastric muscle, extending from the temporal bone to the hyoid bone.",
            "createdAt": {}
        },
        {
            "id": 1064,
            "term": "Venter Superior (m. Omohyoideus)",
            "english": "Superior Belly",
            "turkishDefinition": "Üst karın; omohiyoid kasın dil kemiğine uzanan üst kısmı.",
            "turkishShort": "Üst karın",
            "roots": "venter (karın) + superior (üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The superior part of the omohyoid muscle, extending toward the hyoid bone.",
            "createdAt": {}
        },
        {
            "id": 1065,
            "term": "Venter Inferior (m. Omohyoideus)",
            "english": "Inferior Belly",
            "turkishDefinition": "Alt karın; omohiyoid kasın kürek kemiğine uzanan alt kısmı.",
            "turkishShort": "Alt karın",
            "roots": "venter (karın) + inferior (alt)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_muscles",
            "englishDefinition": "The inferior part of the omohyoid muscle, extending toward the scapula.",
            "createdAt": {}
        }
    ],
    "trunk_muscles": [
    
        {
            "id": 956,
            "term": "Pars Descendens (m. Trapezius)",
            "english": "Descending Part",
            "turkishDefinition": "İnen parça; trapez kasının omuz kemiğini yukarı kaldıran üst lifleri.",
            "turkishShort": "İnen parça",
            "roots": "pars (parça) + descendens (inen)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The upper fibers of the trapezius muscle that elevate the scapula.",
            "createdAt": {}
        },
        {
            "id": 957,
            "term": "Pars Transversa (m. Trapezius)",
            "english": "Transverse Part",
            "turkishDefinition": "Enine parça; trapez kasının kürek kemiğini omurgaya yaklaştıran orta lifleri.",
            "turkishShort": "Enine parça",
            "roots": "pars (parça) + transversa (enine)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The middle fibers of the trapezius muscle that retract the scapula.",
            "createdAt": {}
        },
        {
            "id": 958,
            "term": "Pars Ascendens (m. Trapezius)",
            "english": "Ascending Part",
            "turkishDefinition": "Yükselen parça; trapez kasının kürek kemiğini aşağı çeken alt lifleri.",
            "turkishShort": "Yükselen parça",
            "roots": "pars (parça) + ascendens (yükselen)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The lower fibers of the trapezius muscle that depress the scapula.",
            "createdAt": {}
        },
        {
            "id": 959,
            "term": "M. Serratus Posterior Inferior",
            "english": "Serratus Posterior Inferior Muscle",
            "turkishDefinition": "Arka alt testere kası; alt kaburgaları aşağı ve dışa çeken sırt kası.",
            "turkishShort": "Arka alt testere kası",
            "roots": "serratus (testere biçimli) + posterior (arka) + inferior (alt)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A back muscle that depresses the lower ribs.",
            "createdAt": {}
        },
        {
            "id": 960,
            "term": "M. Serratus Posterior Superior",
            "english": "Serratus Posterior Superior Muscle",
            "turkishDefinition": "Arka üst testere kası; üst kaburgaları kaldıran sırt kası.",
            "turkishShort": "Arka üst testere kası",
            "roots": "serratus (testere biçimli) + posterior (arka) + superior (üst)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A back muscle that elevates the upper ribs.",
            "createdAt": {}
        },
        {
            "id": 961,
            "term": "M. Erector Spinae",
            "english": "Erector Spinae Muscle",
            "turkishDefinition": "Omurga dikleştirici kas; omurgayı dik tutan ve geriye uzatan, birçok alt kastan oluşan büyük kas grubu.",
            "turkishShort": "Omurga dikleştirici kas",
            "roots": "erector (dikleştirici) + spinae (omurgaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A large group of muscles that straighten and extend the vertebral column.",
            "createdAt": {}
        },
        {
            "id": 962,
            "term": "M. Iliocostalis",
            "english": "Iliocostalis Muscle",
            "turkishDefinition": "Kalça-kaburga kası; erector spinae'nin en dışta yer alan, kalça kemiğinden kaburgalara uzanan parçası.",
            "turkishShort": "Kalça-kaburga kası",
            "roots": "ilio- (kalça kemiğine ait) + costalis (kaburgaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The most lateral part of the erector spinae, extending from the ilium to the ribs.",
            "createdAt": {}
        },
        {
            "id": 963,
            "term": "M. Longissimus",
            "english": "Longissimus Muscle",
            "turkishDefinition": "En uzun sırt kası; erector spinae'nin orta, en uzun parçası.",
            "turkishShort": "En uzun sırt kası",
            "roots": "longissimus (en uzun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The middle, longest part of the erector spinae.",
            "createdAt": {}
        },
        {
            "id": 964,
            "term": "M. Spinalis",
            "english": "Spinalis Muscle",
            "turkishDefinition": "Diken çıkıntı kası; erector spinae'nin en içte, omurga diken çıkıntılarına en yakın parçası.",
            "turkishShort": "Diken çıkıntı kası",
            "roots": "spinalis (diken çıkıntısına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The most medial part of the erector spinae, closest to the vertebral spinous processes.",
            "createdAt": {}
        },
        {
            "id": 965,
            "term": "Mm. Multifidi",
            "english": "Multifidus Muscles",
            "turkishDefinition": "Çok parçalı derin sırt kasları; omurgayı segment segment stabilize eden küçük, derin kaslar.",
            "turkishShort": "Çok parçalı derin sırt kasları",
            "roots": "multi- (çok) + fidus (bölünmüş)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "Small, deep muscles that stabilize the vertebral column segment by segment.",
            "createdAt": {}
        },
        {
            "id": 966,
            "term": "M. Semispinalis Capitis",
            "english": "Semispinalis Capitis Muscle",
            "turkishDefinition": "Yarım diken baş kası; başı geriye uzatan derin ense kası.",
            "turkishShort": "Yarım diken baş kası",
            "roots": "semi- (yarım) + spinalis (diken çıkıntısına ait) + capitis (başa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A deep neck muscle that extends the head.",
            "createdAt": {}
        },
        {
            "id": 967,
            "term": "Mm. Rotatores",
            "english": "Rotatores Muscles",
            "turkishDefinition": "Döndürücü omurga kasları; omurları birbirine göre döndüren en derin, en kısa sırt kasları.",
            "turkishShort": "Döndürücü omurga kasları",
            "roots": "rotatores (döndürücüler)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The deepest, shortest muscles of the back that rotate the vertebrae relative to each other.",
            "createdAt": {}
        },
        {
            "id": 968,
            "term": "Fascia Thoracolumbalis",
            "english": "Thoracolumbar Fascia",
            "turkishDefinition": "Sırt-bel fasyası; sırt ve bel bölgesindeki derin kasları saran güçlü fasya.",
            "turkishShort": "Sırt-bel fasyası",
            "roots": "thoraco- (göğse ait) + lumbalis (bele ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A strong fascia enveloping the deep muscles of the back and lumbar region.",
            "createdAt": {}
        },
        {
            "id": 969,
            "term": "Pars Clavicularis (m. Pectoralis Major)",
            "english": "Clavicular Head",
            "turkishDefinition": "Köprücük kemiği başı; büyük göğüs kasının köprücük kemiğinden başlayan üst lifleri.",
            "turkishShort": "Köprücük kemiği başı",
            "roots": "pars (parça) + clavicularis (köprücük kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The upper fibers of the pectoralis major arising from the clavicle.",
            "createdAt": {}
        },
        {
            "id": 970,
            "term": "Pars Sternocostalis (m. Pectoralis Major)",
            "english": "Sternocostal Head",
            "turkishDefinition": "Göğüs kafesi başı; büyük göğüs kasının göğüs kemiği ve kaburgalardan başlayan orta lifleri.",
            "turkishShort": "Göğüs kafesi başı",
            "roots": "pars (parça) + sterno- (göğüs kemiğine ait) + costalis (kaburgaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The middle fibers of the pectoralis major arising from the sternum and costal cartilages.",
            "createdAt": {}
        },
        {
            "id": 971,
            "term": "Pars Abdominalis (m. Pectoralis Major)",
            "english": "Abdominal Part",
            "turkishDefinition": "Karın parçası; büyük göğüs kasının karın kaslarının kılıfından başlayan alt lifleri.",
            "turkishShort": "Karın parçası",
            "roots": "pars (parça) + abdominalis (karına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The lower fibers of the pectoralis major arising from the abdominal fascia.",
            "createdAt": {}
        },
        {
            "id": 972,
            "term": "M. Subclavius",
            "english": "Subclavius Muscle",
            "turkishDefinition": "Köprücük kemiği altı kası; köprücük kemiğini aşağı çeken ve stabilize eden küçük kas.",
            "turkishShort": "Köprücük kemiği altı kası",
            "roots": "sub- (altında) + clavius (köprücük kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A small muscle that depresses and stabilizes the clavicle.",
            "createdAt": {}
        },
        {
            "id": 973,
            "term": "Mm. Levatores Costarum",
            "english": "Levatores Costarum Muscles",
            "turkishDefinition": "Kaburga kaldırıcı kaslar; omurlardan kaburgalara uzanan, kaburgaları kaldıran küçük kaslar.",
            "turkishShort": "Kaburga kaldırıcı kaslar",
            "roots": "levatores (kaldırıcılar) + costarum (kaburgalara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "Small muscles extending from the vertebrae to the ribs, elevating the ribs.",
            "createdAt": {}
        },
        {
            "id": 974,
            "term": "Mm. Intercostales Externi",
            "english": "External Intercostal Muscles",
            "turkishDefinition": "Dış kaburgalar arası kaslar; soluk alırken kaburgaları kaldıran en dış tabaka kaslar.",
            "turkishShort": "Dış kaburgalar arası kaslar",
            "roots": "inter- (arasında) + costales (kaburgalara ait) + externi (dış)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The outermost layer of intercostal muscles that elevate the ribs during inspiration.",
            "createdAt": {}
        },
        {
            "id": 975,
            "term": "Mm. Intercostales Interni",
            "english": "Internal Intercostal Muscles",
            "turkishDefinition": "İç kaburgalar arası kaslar; soluk verirken kaburgaları indiren orta tabaka kaslar.",
            "turkishShort": "İç kaburgalar arası kaslar",
            "roots": "inter- (arasında) + costales (kaburgalara ait) + interni (iç)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The middle layer of intercostal muscles that depress the ribs during expiration.",
            "createdAt": {}
        },
        {
            "id": 976,
            "term": "Mm. Intercostales Intimi",
            "english": "Innermost Intercostal Muscles",
            "turkishDefinition": "En iç kaburgalar arası kaslar; iç kaburgalar arası kasların en derin, en iç tabakası.",
            "turkishShort": "En iç kaburgalar arası kaslar",
            "roots": "inter- (arasında) + costales (kaburgalara ait) + intimi (en iç)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The deepest, innermost layer of the intercostal muscles.",
            "createdAt": {}
        },
        {
            "id": 977,
            "term": "Mm. Subcostales",
            "english": "Subcostal Muscles",
            "turkishDefinition": "Kaburga altı kasları; göğüs kafesinin arka iç yüzünde, komşu olmayan kaburgalar arasında uzanan değişken kaslar.",
            "turkishShort": "Kaburga altı kasları",
            "roots": "sub- (altında) + costales (kaburgalara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "Variable muscles on the inner posterior thoracic wall, spanning non-adjacent ribs.",
            "createdAt": {}
        },
        {
            "id": 978,
            "term": "M. Transversus Thoracis",
            "english": "Transversus Thoracis Muscle",
            "turkishDefinition": "Enine göğüs kası; göğüs kemiğinin iç yüzünden kaburgalara uzanan ince kas.",
            "turkishShort": "Enine göğüs kası",
            "roots": "transversus (enine) + thoracis (göğse ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A thin muscle on the internal surface of the sternum extending to the ribs.",
            "createdAt": {}
        },
        {
            "id": 979,
            "term": "Fascia Endothoracica",
            "english": "Endothoracic Fascia",
            "turkishDefinition": "Göğüs içi koruyucu fasya; göğüs kafesinin iç yüzünü döşeyen ince fasya tabakası.",
            "turkishShort": "Göğüs içi koruyucu fasya",
            "roots": "endo- (içinde) + thoracica (göğse ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The thin fascial layer lining the inner surface of the thoracic wall.",
            "createdAt": {}
        },
        {
            "id": 980,
            "term": "Diaphragma",
            "english": "Diaphragm",
            "turkishDefinition": "Diyafram; göğüs ve karın boşluklarını ayıran, solunumun ana kası olan kubbe biçimli kas.",
            "turkishShort": "Diyafram",
            "roots": "dia- (arasında) + phragma (perde/bölme)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The dome-shaped muscle separating the thoracic and abdominal cavities, the primary muscle of respiration.",
            "createdAt": {}
        },
        {
            "id": 981,
            "term": "Pars Lumbalis Diaphragmatis",
            "english": "Lumbar Part of Diaphragm",
            "turkishDefinition": "Bel parçası; diyaframın bel omurlarından başlayan arka kısmı.",
            "turkishShort": "Bel parçası",
            "roots": "pars (parça) + lumbalis (bele ait) + diaphragmatis (diyaframa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The posterior part of the diaphragm arising from the lumbar vertebrae.",
            "createdAt": {}
        },
        {
            "id": 982,
            "term": "Crus Dextrum (diaphragma)",
            "english": "Right Crus",
            "turkishDefinition": "Sağ bacak; diyaframın bel parçasının sağ, daha uzun tendon bacağı.",
            "turkishShort": "Sağ bacak",
            "roots": "crus (bacak) + dextrum (sağ)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The right, longer tendinous leg of the lumbar part of the diaphragm.",
            "createdAt": {}
        },
        {
            "id": 983,
            "term": "Crus Sinistrum (diaphragma)",
            "english": "Left Crus",
            "turkishDefinition": "Sol bacak; diyaframın bel parçasının sol, daha kısa tendon bacağı.",
            "turkishShort": "Sol bacak",
            "roots": "crus (bacak) + sinistrum (sol)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The left, shorter tendinous leg of the lumbar part of the diaphragm.",
            "createdAt": {}
        },
        {
            "id": 984,
            "term": "Lig. Arcuatum Medianum",
            "english": "Median Arcuate Ligament",
            "turkishDefinition": "Orta kavisli bağ; diyaframın iki bacağını aortanın önünde birleştiren lifli kemer.",
            "turkishShort": "Orta kavisli bağ",
            "roots": "arcuatum (kavisli) + medianum (orta)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A fibrous arch connecting the two crura of the diaphragm anterior to the aorta.",
            "createdAt": {}
        },
        {
            "id": 985,
            "term": "Lig. Arcuatum Mediale",
            "english": "Medial Arcuate Ligament",
            "turkishDefinition": "İç kavisli bağ; diyaframın bel parçasını psoas major kasının üzerinden geçiren kalınlaşmış fasya kemeri.",
            "turkishShort": "İç kavisli bağ",
            "roots": "arcuatum (kavisli) + mediale (iç)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A thickened fascial arch of the diaphragm passing over the psoas major muscle.",
            "createdAt": {}
        },
        {
            "id": 986,
            "term": "Lig. Arcuatum Laterale",
            "english": "Lateral Arcuate Ligament",
            "turkishDefinition": "Dış kavisli bağ; diyaframın bel parçasını quadratus lumborum kasının üzerinden geçiren kalınlaşmış fasya kemeri.",
            "turkishShort": "Dış kavisli bağ",
            "roots": "arcuatum (kavisli) + laterale (yan)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A thickened fascial arch of the diaphragm passing over the quadratus lumborum muscle.",
            "createdAt": {}
        },
        {
            "id": 987,
            "term": "Hiatus Aorticus",
            "english": "Aortic Hiatus",
            "turkishDefinition": "Aort geçidi; diyaframda aortanın, göğüs kanalının ve azigos toplardamarının geçtiği açıklık.",
            "turkishShort": "Aort geçidi",
            "roots": "hiatus (açıklık) + aorticus (aortaya ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The opening in the diaphragm through which the aorta, thoracic duct, and azygos vein pass.",
            "createdAt": {}
        },
        {
            "id": 988,
            "term": "Hiatus Oesophageus",
            "english": "Oesophageal Hiatus",
            "turkishDefinition": "Yemek borusu geçidi; diyaframda yemek borusu ve vagus sinirinin geçtiği açıklık.",
            "turkishShort": "Yemek borusu geçidi",
            "roots": "hiatus (açıklık) + oesophageus (yemek borusuna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The opening in the diaphragm through which the esophagus and vagus nerve pass.",
            "createdAt": {}
        },
        {
            "id": 989,
            "term": "Foramen Venae Cavae",
            "english": "Caval Opening",
            "turkishDefinition": "Alt ana toplardamar deliği; diyaframda alt ana toplardamarın geçtiği açıklık.",
            "turkishShort": "Alt ana toplardamar deliği",
            "roots": "foramen (delik) + venae (toplardamara ait) + cavae (ana toplardamara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The opening in the diaphragm through which the inferior vena cava passes.",
            "createdAt": {}
        },
        {
            "id": 990,
            "term": "Centrum Tendineum",
            "english": "Central Tendon",
            "turkishDefinition": "Diyaframın merkez kirişi; diyaframın orta, yonca yaprağı biçimindeki tendon kısmı.",
            "turkishShort": "Diyaframın merkez kirişi",
            "roots": "centrum (merkez) + tendineum (kirişe ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The central, clover-leaf-shaped tendinous portion of the diaphragm.",
            "createdAt": {}
        },
        {
            "id": 991,
            "term": "M. Rectus Abdominis",
            "english": "Rectus Abdominis Muscle",
            "turkishDefinition": "Düz karın kası; göğüs kemiğinden kasık kemiğine uzanan, karın ön duvarındaki çift, uzun kas.",
            "turkishShort": "Düz karın kası",
            "roots": "rectus (düz) + abdominis (karına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A paired, long muscle of the anterior abdominal wall extending from the sternum to the pubis.",
            "createdAt": {}
        },
        {
            "id": 992,
            "term": "Vagina Musculi Recti Abdominis",
            "english": "Rectus Sheath",
            "turkishDefinition": "Karın düz kası kılıfı; düz karın kasını saran, karnın diğer kaslarının aponevrozlarından oluşan kılıf.",
            "turkishShort": "Karın düz kası kılıfı",
            "roots": "vagina (kılıf) + musculi (kasa ait) + recti (düz) + abdominis (karına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The sheath enclosing the rectus abdominis, formed by the aponeuroses of the other abdominal muscles.",
            "createdAt": {}
        },
        {
            "id": 993,
            "term": "M. Pyramidalis",
            "english": "Pyramidalis Muscle",
            "turkishDefinition": "Piramitsi karın kası; kasık kemiğinin önünde yer alan küçük, üçgen kas.",
            "turkishShort": "Piramitsi karın kası",
            "roots": "pyramidalis (piramit biçimli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A small, triangular muscle in front of the pubis.",
            "createdAt": {}
        },
        {
            "id": 994,
            "term": "M. Obliquus Externus Abdominis",
            "english": "External Oblique Muscle",
            "turkishDefinition": "Dış eğik karın kası; karın yan duvarının en dışında yer alan, lifleri çapraz uzanan kas.",
            "turkishShort": "Dış eğik karın kası",
            "roots": "obliquus (eğik) + externus (dış) + abdominis (karına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The outermost muscle of the lateral abdominal wall, with fibers running obliquely.",
            "createdAt": {}
        },
        {
            "id": 995,
            "term": "Anulus Inguinalis Superficialis",
            "english": "Superficial Inguinal Ring",
            "turkishDefinition": "Yüzeysel kasık halkası; dış eğik karın kası aponevrozundaki üçgen açıklık.",
            "turkishShort": "Yüzeysel kasık halkası",
            "roots": "anulus (halka) + inguinalis (kasığa ait) + superficialis (yüzeysel)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A triangular opening in the aponeurosis of the external oblique muscle.",
            "createdAt": {}
        },
        {
            "id": 996,
            "term": "M. Obliquus Internus Abdominis",
            "english": "Internal Oblique Muscle",
            "turkishDefinition": "İç eğik karın kası; karın yan duvarının orta tabakasında yer alan, lifleri dış eğik kasa ters yönde uzanan kas.",
            "turkishShort": "İç eğik karın kası",
            "roots": "obliquus (eğik) + internus (iç) + abdominis (karına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The middle muscle of the lateral abdominal wall, with fibers running opposite to the external oblique.",
            "createdAt": {}
        },
        {
            "id": 997,
            "term": "M. Cremaster",
            "english": "Cremaster Muscle",
            "turkishDefinition": "Testis torbası kası; iç eğik karın kasından uzanan, testisi kaldıran ince kas lifleri.",
            "turkishShort": "Testis torbası kası",
            "roots": "cremaster (asıcı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "Thin muscle fibers derived from the internal oblique that elevate the testis.",
            "createdAt": {}
        },
        {
            "id": 998,
            "term": "M. Transversus Abdominis",
            "english": "Transversus Abdominis Muscle",
            "turkishDefinition": "Enine karın kası; karın yan duvarının en derin tabakasında yer alan, lifleri enine uzanan kas.",
            "turkishShort": "Enine karın kası",
            "roots": "transversus (enine) + abdominis (karına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The deepest muscle of the lateral abdominal wall, with transversely running fibers.",
            "createdAt": {}
        },
        {
            "id": 999,
            "term": "Linea Alba",
            "english": "Linea Alba",
            "turkishDefinition": "Beyaz çizgi; karın ön duvarının ortasında, iki düz karın kasını ayıran fibröz bant.",
            "turkishShort": "Beyaz çizgi",
            "roots": "linea (çizgi) + alba (beyaz)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The fibrous band running down the midline of the anterior abdominal wall, separating the two rectus abdominis muscles.",
            "createdAt": {}
        },
        {
            "id": 1000,
            "term": "Anulus Umbilicalis",
            "english": "Umbilical Ring",
            "turkishDefinition": "Göbek halkası; linea alba üzerinde, göbek deliğinin bulunduğu açıklık.",
            "turkishShort": "Göbek halkası",
            "roots": "anulus (halka) + umbilicalis (göbeğe ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The opening in the linea alba where the umbilicus is located.",
            "createdAt": {}
        },
        {
            "id": 1001,
            "term": "Canalis Inguinalis",
            "english": "Inguinal Canal",
            "turkishDefinition": "Kasık kanalı; karın alt duvarında, kasık bölgesinde uzanan eğik kanal.",
            "turkishShort": "Kasık kanalı",
            "roots": "canalis (kanal) + inguinalis (kasığa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "An oblique canal in the lower abdominal wall in the groin region.",
            "createdAt": {}
        },
        {
            "id": 1002,
            "term": "Anulus Inguinalis Profundus",
            "english": "Deep Inguinal Ring",
            "turkishDefinition": "Derin kasık halkası; enine karın kası fasyasındaki, kasık kanalının başlangıç açıklığı.",
            "turkishShort": "Derin kasık halkası",
            "roots": "anulus (halka) + inguinalis (kasığa ait) + profundus (derin)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The opening in the transversalis fascia marking the beginning of the inguinal canal.",
            "createdAt": {}
        },
        {
            "id": 1003,
            "term": "M. Quadratus Lumborum",
            "english": "Quadratus Lumborum Muscle",
            "turkishDefinition": "Dörtgen bel kası; bel bölgesinde, kalça kemiği ile son kaburga arasında uzanan dörtgen kas.",
            "turkishShort": "Dörtgen bel kası",
            "roots": "quadratus (dörtgen biçimli) + lumborum (bele ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A quadrangular muscle in the lumbar region extending between the ilium and the last rib.",
            "createdAt": {}
        },
        {
            "id": 1004,
            "term": "Fascia Transversalis",
            "english": "Transversalis Fascia",
            "turkishDefinition": "Karın enine kası fasyası; enine karın kasının iç yüzünü döşeyen fasya tabakası.",
            "turkishShort": "Karın enine kası fasyası",
            "roots": "fascia (bant/kılıf) + transversalis (enine kasa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The fascial layer lining the inner surface of the transversus abdominis muscle.",
            "createdAt": {}
        },
        {
            "id": 1005,
            "term": "Fascia Pelvis",
            "english": "Pelvic Fascia",
            "turkishDefinition": "Pelvis fasyası; pelvis (leğen) boşluğundaki organ ve kasları saran fasya.",
            "turkishShort": "Pelvis fasyası",
            "roots": "fascia (bant/kılıf) + pelvis (leğene ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The fascia enveloping the organs and muscles of the pelvic cavity.",
            "createdAt": {}
        },
        {
            "id": 1006,
            "term": "Diaphragma Pelvis",
            "english": "Pelvic Diaphragm",
            "turkishDefinition": "Pelvis döşemesi; pelvis boşluğunun tabanını oluşturan kas ve fasya tabakası.",
            "turkishShort": "Pelvis döşemesi",
            "roots": "dia- (arasında) + phragma (perde) + pelvis (leğene ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The muscular and fascial layer forming the floor of the pelvic cavity.",
            "createdAt": {}
        },
        {
            "id": 1007,
            "term": "M. Levator Ani",
            "english": "Levator Ani Muscle",
            "turkishDefinition": "Anüs kaldırıcı kas; pelvis tabanını oluşturan, anüsü destekleyen geniş kas grubu.",
            "turkishShort": "Anüs kaldırıcı kas",
            "roots": "levator (kaldırıcı) + ani (anüse ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A broad muscle group forming the pelvic floor and supporting the anus.",
            "createdAt": {}
        },
        {
            "id": 1008,
            "term": "M. Pubococcygeus",
            "english": "Pubococcygeus Muscle",
            "turkishDefinition": "Pubokoksigeal kas; kasık kemiğinden kuyruk sokumuna uzanan, levator ani'nin bir parçası.",
            "turkishShort": "Pubokoksigeal kas",
            "roots": "pubo- (kasık kemiğine ait) + coccygeus (kuyruk sokumuna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A part of the levator ani extending from the pubis to the coccyx.",
            "createdAt": {}
        },
        {
            "id": 1009,
            "term": "M. Puborectalis",
            "english": "Puborectalis Muscle",
            "turkishDefinition": "Puborektal kas; kasık kemiğinden rektumun arkasına dolanan, anal kıvrımı oluşturan kas.",
            "turkishShort": "Puborektal kas",
            "roots": "pubo- (kasık kemiğine ait) + rectalis (rektuma ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A muscle looping from the pubis around the rectum, forming the anorectal angle.",
            "createdAt": {}
        },
        {
            "id": 1010,
            "term": "M. Iliococcygeus",
            "english": "Iliococcygeus Muscle",
            "turkishDefinition": "İliyokoksigeal kas; kalça kemiğinden kuyruk sokumuna uzanan, levator ani'nin bir parçası.",
            "turkishShort": "İliyokoksigeal kas",
            "roots": "ilio- (kalça kemiğine ait) + coccygeus (kuyruk sokumuna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A part of the levator ani extending from the ilium to the coccyx.",
            "createdAt": {}
        },
        {
            "id": 1011,
            "term": "M. Coccygeus",
            "english": "Coccygeus Muscle",
            "turkishDefinition": "Kuyruk sokumu kası; sakrum ile kalça kemiği arasında uzanan, pelvis tabanını destekleyen kas.",
            "turkishShort": "Kuyruk sokumu kası",
            "roots": "coccygeus (kuyruk sokumuna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A muscle extending between the sacrum and ischium, supporting the pelvic floor.",
            "createdAt": {}
        },
        {
            "id": 1012,
            "term": "M. Sphincter Ani Externus",
            "english": "External Anal Sphincter",
            "turkishDefinition": "Dış anüs büzücü kası; anüsü isteğe bağlı olarak kapatan çizgili kas.",
            "turkishShort": "Dış anüs büzücü kası",
            "roots": "sphincter (büzücü) + ani (anüse ait) + externus (dış)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The voluntary striated muscle that closes the anus.",
            "createdAt": {}
        },
        {
            "id": 1013,
            "term": "M. Semispinalis",
            "english": "Semispinalis Muscle",
            "turkishDefinition": "Yarı diken kası; omurga diken çıkıntılarına tutunan, gövdeyi geriye uzatan derin sırt kası.",
            "turkishShort": "Yarı diken kası",
            "roots": "semi- (yarı) + spinalis (diken çıkıntısına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A deep back muscle attaching to the spinous processes, extending the trunk.",
            "createdAt": {}
        },
        {
            "id": 1014,
            "term": "Mm. Interspinales",
            "english": "Interspinales Muscles",
            "turkishDefinition": "Diken çıkıntılar arası kaslar; komşu omurların diken çıkıntıları arasında uzanan küçük stabilizasyon kasları.",
            "turkishShort": "Diken çıkıntılar arası kaslar",
            "roots": "inter- (arasında) + spinales (diken çıkıntılarına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "Small muscles extending between the spinous processes of adjacent vertebrae.",
            "createdAt": {}
        },
        {
            "id": 1015,
            "term": "Mm. Intertransversarii",
            "english": "Intertransversarii Muscles",
            "turkishDefinition": "Enine çıkıntılar arası kaslar; komşu omurların enine çıkıntıları arasında uzanan küçük stabilizasyon kasları.",
            "turkishShort": "Enine çıkıntılar arası kaslar",
            "roots": "inter- (arasında) + transversarii (enine çıkıntılara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "Small muscles extending between the transverse processes of adjacent vertebrae.",
            "createdAt": {}
        },
        {
            "id": 1016,
            "term": "M. Psoas Major",
            "english": "Psoas Major Muscle",
            "turkishDefinition": "Büyük bel kası; bel omurlarından kalçaya uzanan, uyluğun en güçlü bükücü kası.",
            "turkishShort": "Büyük bel kası",
            "roots": "psoas (bel kası)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A muscle extending from the lumbar vertebrae to the hip, the strongest flexor of the thigh.",
            "createdAt": {}
        },
        {
            "id": 1017,
            "term": "M. Psoas Minor",
            "english": "Psoas Minor Muscle",
            "turkishDefinition": "Küçük bel kası; bazı kişilerde bulunan, psoas major'ın önünde yer alan ince kas.",
            "turkishShort": "Küçük bel kası",
            "roots": "psoas (bel kası) + minor (küçük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A thin, inconstant muscle lying anterior to the psoas major.",
            "createdAt": {}
        },
        {
            "id": 1018,
            "term": "M. Iliacus",
            "english": "Iliacus Muscle",
            "turkishDefinition": "İliak kas; kalça kemiğinin iç yüzünü dolduran, uyluğu büken kas.",
            "turkishShort": "İliak kas",
            "roots": "iliacus (kalça kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A muscle filling the internal surface of the ilium that flexes the thigh.",
            "createdAt": {}
        },
        {
            "id": 1019,
            "term": "M. Iliopsoas",
            "english": "Iliopsoas Muscle",
            "turkishDefinition": "İliyopsoas kası; psoas major ve iliacus kaslarının birleşiminden oluşan, uyluğu büken güçlü kas.",
            "turkishShort": "İliyopsoas kası",
            "roots": "ilio- (kalça kemiğine ait) + psoas (bel kası)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "A powerful hip flexor formed by the union of the psoas major and iliacus muscles.",
            "createdAt": {}
        }
    ,
        {
            "id": 1066,
            "term": "M. Iliocostalis Lumborum",
            "english": "Iliocostalis Lumborum Muscle",
            "turkishDefinition": "Bel iliyokostal kası; iliocostalis kasının bel bölgesindeki alt parçası.",
            "turkishShort": "Bel iliyokostal kası",
            "roots": "ilio- (kalça kemiğine ait) + costalis (kaburgaya ait) + lumborum (bele ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The lumbar segment of the iliocostalis muscle.",
            "createdAt": {}
        },
        {
            "id": 1067,
            "term": "M. Iliocostalis Thoracis",
            "english": "Iliocostalis Thoracis Muscle",
            "turkishDefinition": "Sırt iliyokostal kası; iliocostalis kasının göğüs bölgesindeki orta parçası.",
            "turkishShort": "Sırt iliyokostal kası",
            "roots": "ilio- (kalça kemiğine ait) + costalis (kaburgaya ait) + thoracis (göğse ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The thoracic segment of the iliocostalis muscle.",
            "createdAt": {}
        },
        {
            "id": 1068,
            "term": "M. Iliocostalis Cervicis",
            "english": "Iliocostalis Cervicis Muscle",
            "turkishDefinition": "Boyun iliyokostal kası; iliocostalis kasının boyun bölgesindeki üst parçası.",
            "turkishShort": "Boyun iliyokostal kası",
            "roots": "ilio- (kalça kemiğine ait) + costalis (kaburgaya ait) + cervicis (boyuna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The cervical segment of the iliocostalis muscle.",
            "createdAt": {}
        },
        {
            "id": 1069,
            "term": "M. Longissimus Thoracis",
            "english": "Longissimus Thoracis Muscle",
            "turkishDefinition": "Sırtın en uzun kası; longissimus kasının göğüs bölgesindeki en büyük parçası.",
            "turkishShort": "Sırtın en uzun kası",
            "roots": "longissimus (en uzun) + thoracis (göğse ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The thoracic segment of the longissimus muscle, the largest part.",
            "createdAt": {}
        },
        {
            "id": 1070,
            "term": "M. Longissimus Cervicis",
            "english": "Longissimus Cervicis Muscle",
            "turkishDefinition": "Boyunun en uzun kası; longissimus kasının boyun bölgesindeki parçası.",
            "turkishShort": "Boyunun en uzun kası",
            "roots": "longissimus (en uzun) + cervicis (boyuna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The cervical segment of the longissimus muscle.",
            "createdAt": {}
        },
        {
            "id": 1071,
            "term": "M. Longissimus Capitis",
            "english": "Longissimus Capitis Muscle",
            "turkishDefinition": "Başın en uzun kası; longissimus kasının başa uzanan en üst parçası.",
            "turkishShort": "Başın en uzun kası",
            "roots": "longissimus (en uzun) + capitis (başa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The cranial segment of the longissimus muscle, extending to the head.",
            "createdAt": {}
        },
        {
            "id": 1072,
            "term": "M. Spinalis Thoracis",
            "english": "Spinalis Thoracis Muscle",
            "turkishDefinition": "Sırt diken kası; spinalis kasının göğüs bölgesindeki, diken çıkıntılara en yakın parçası.",
            "turkishShort": "Sırt diken kası",
            "roots": "spinalis (diken çıkıntısına ait) + thoracis (göğse ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The thoracic segment of the spinalis muscle, closest to the spinous processes.",
            "createdAt": {}
        },
        {
            "id": 1073,
            "term": "M. Spinalis Cervicis",
            "english": "Spinalis Cervicis Muscle",
            "turkishDefinition": "Boyun diken kası; spinalis kasının boyun bölgesindeki parçası.",
            "turkishShort": "Boyun diken kası",
            "roots": "spinalis (diken çıkıntısına ait) + cervicis (boyuna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The cervical segment of the spinalis muscle.",
            "createdAt": {}
        },
        {
            "id": 1074,
            "term": "M. Spinalis Capitis",
            "english": "Spinalis Capitis Muscle",
            "turkishDefinition": "Baş diken kası; spinalis kasının başa uzanan, genellikle semispinalis capitis ile birleşik parçası.",
            "turkishShort": "Baş diken kası",
            "roots": "spinalis (diken çıkıntısına ait) + capitis (başa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The cranial segment of the spinalis muscle, often blended with the semispinalis capitis.",
            "createdAt": {}
        },
        {
            "id": 1075,
            "term": "M. Semispinalis Thoracis",
            "english": "Semispinalis Thoracis Muscle",
            "turkishDefinition": "Sırt yarı diken kası; semispinalis kasının göğüs bölgesindeki parçası.",
            "turkishShort": "Sırt yarı diken kası",
            "roots": "semi- (yarı) + spinalis (diken çıkıntısına ait) + thoracis (göğse ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The thoracic segment of the semispinalis muscle.",
            "createdAt": {}
        },
        {
            "id": 1076,
            "term": "M. Semispinalis Cervicis",
            "english": "Semispinalis Cervicis Muscle",
            "turkishDefinition": "Boyun yarı diken kası; semispinalis kasının boyun bölgesindeki parçası.",
            "turkishShort": "Boyun yarı diken kası",
            "roots": "semi- (yarı) + spinalis (diken çıkıntısına ait) + cervicis (boyuna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The cervical segment of the semispinalis muscle.",
            "createdAt": {}
        },
        {
            "id": 1077,
            "term": "Mm. Multifidi Lumborum",
            "english": "Multifidus Lumborum Muscles",
            "turkishDefinition": "Bel çok parçalı kasları; multifidus kaslarının bel bölgesindeki, en gelişmiş parçası.",
            "turkishShort": "Bel çok parçalı kasları",
            "roots": "multi- (çok) + fidus (bölünmüş) + lumborum (bele ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The lumbar segment of the multifidus muscles, the most developed part.",
            "createdAt": {}
        },
        {
            "id": 1078,
            "term": "Mm. Rotatores Cervicis",
            "english": "Rotatores Cervicis Muscles",
            "turkishDefinition": "Boyun döndürücü kasları; rotatores kaslarının boyun bölgesindeki parçası.",
            "turkishShort": "Boyun döndürücü kasları",
            "roots": "rotatores (döndürücüler) + cervicis (boyuna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The cervical segment of the rotatores muscles.",
            "createdAt": {}
        },
        {
            "id": 1079,
            "term": "Mm. Interspinales Cervicis",
            "english": "Interspinales Cervicis Muscles",
            "turkishDefinition": "Boyun dikenler arası kasları; interspinales kaslarının boyun bölgesindeki, en gelişmiş parçası.",
            "turkishShort": "Boyun dikenler arası kasları",
            "roots": "inter- (arasında) + spinales (diken çıkıntılarına ait) + cervicis (boyuna ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The cervical segment of the interspinales muscles, the most developed part.",
            "createdAt": {}
        },
        {
            "id": 1080,
            "term": "Mm. Intertransversarii Lumborum",
            "english": "Intertransversarii Lumborum Muscles",
            "turkishDefinition": "Bel enine çıkıntılar arası kasları; intertransversarii kaslarının bel bölgesindeki parçası.",
            "turkishShort": "Bel enine çıkıntılar arası kasları",
            "roots": "inter- (arasında) + transversarii (enine çıkıntılara ait) + lumborum (bele ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_muscles",
            "englishDefinition": "The lumbar segment of the intertransversarii muscles.",
            "createdAt": {}
        }
    ],
    "upper_extremity_muscles": [
        {
            "id": 322,
            "term": "Musculus Deltoideus",
            "english": "Deltoid Muscle",
            "turkishDefinition": "Deltoid kas; omuzu üçgen şeklinde saran, clavicula, acromion ve spina scapulae'den başlayıp humerus'un tuberositas deltoidea'sına yapışan kas. Omuz abduksiyonunun ana motorudur.",
            "roots": "musculus (kas) + deltoideus (delta harfi şeklinde, üçgen)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Deltoid kas",
            "englishDefinition": "A triangular muscle covering the shoulder that originates from the clavicle, acromion, and scapular spine and inserts on the deltoid tuberosity of the humerus, serving as the main abductor of the shoulder.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 323,
            "term": "Musculus Supraspinatus",
            "english": "Supraspinatus Muscle",
            "turkishDefinition": "Supraspinatus kası; scapula'nın fossa supraspinata'sından başlayıp humerus'un tuberculum majus'una yapışan rotator manşet kası. Omuz abduksiyonunun ilk derecelerini başlatır.",
            "roots": "musculus (kas) + supra (üstünde) + spina (omurga, çıkıntı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Supraspinatus kası",
            "englishDefinition": "A rotator cuff muscle running from the supraspinous fossa of the scapula to the greater tubercle of the humerus, initiating the first degrees of shoulder abduction.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 324,
            "term": "Musculus Infraspinatus",
            "english": "Infraspinatus Muscle",
            "turkishDefinition": "İnfraspinatus kası; scapula'nın fossa infraspinata'sından başlayıp humerus'un tuberculum majus'una yapışan rotator manşet kası. Omuzun dış rotasyonunu sağlar.",
            "roots": "musculus (kas) + infra (altında) + spina (omurga, çıkıntı)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "İnfraspinatus kası",
            "englishDefinition": "A rotator cuff muscle running from the infraspinous fossa of the scapula to the greater tubercle of the humerus, responsible for external rotation of the shoulder.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 325,
            "term": "Musculus Teres Minor",
            "english": "Teres Minor Muscle",
            "turkishDefinition": "Teres minor kası; scapula'nın margo lateralis'inden başlayıp humerus'un tuberculum majus'una yapışan küçük rotator manşet kası. Omuzun dış rotasyonuna yardımcı olur.",
            "roots": "musculus (kas) + teres (silindirik, yuvarlak) + minor (küçük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Teres minor kası",
            "englishDefinition": "A small rotator cuff muscle running from the lateral border of the scapula to the greater tubercle of the humerus, assisting external rotation of the shoulder.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 326,
            "term": "Musculus Subscapularis",
            "english": "Subscapularis Muscle",
            "turkishDefinition": "Subskapularis kası; scapula'nın ön (kostal) yüzündeki fossa subscapularis'ten başlayıp humerus'un tuberculum minus'una yapışan rotator manşet kası. Omuzun iç rotasyonunun ana motorudur.",
            "roots": "musculus (kas) + sub (altında) + scapula (kürek kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Subskapularis kası",
            "englishDefinition": "A rotator cuff muscle running from the subscapular fossa on the anterior scapula to the lesser tubercle of the humerus, the main internal rotator of the shoulder.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 327,
            "term": "Musculus Teres Major",
            "english": "Teres Major Muscle",
            "turkishDefinition": "Teres major kası; scapula'nın angulus inferior'undan başlayıp humerus'un crista tuberculi minoris'ine yapışan kas. Omuz adduksiyonu, iç rotasyonu ve ekstansiyonunu sağlar.",
            "roots": "musculus (kas) + teres (silindirik, yuvarlak) + major (büyük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Teres major kası",
            "englishDefinition": "A muscle running from the inferior angle of the scapula to the crest of the lesser tubercle of the humerus, contributing to shoulder adduction, internal rotation, and extension.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 328,
            "term": "Musculus Trapezius",
            "english": "Trapezius Muscle",
            "turkishDefinition": "Trapezius kası; oksipital kemikten torasik vertebralara kadar uzanan, scapula ve clavicula'ya yapışan geniş sırt kası. Scapula'nın elevasyon, retraksiyon ve rotasyonunu sağlar.",
            "roots": "musculus (kas) + trapezium (dörtgen şekli - yamuk)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Trapezius kası",
            "englishDefinition": "A broad back muscle extending from the occipital bone to the thoracic vertebrae and attaching to the scapula and clavicle, elevating, retracting, and rotating the scapula.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 329,
            "term": "Musculus Latissimus Dorsi",
            "english": "Latissimus Dorsi Muscle",
            "turkishDefinition": "Latissimus dorsi kası; alt torasik ve lumbal vertebralardan, sakrum ve iliak krestten başlayıp humerus'a yapışan geniş sırt kası. Omuz adduksiyonu, ekstansiyonu ve iç rotasyonunda görev alır.",
            "roots": "musculus (kas) + latissimus (en geniş) + dorsum (sırt)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Latissimus dorsi kası",
            "englishDefinition": "A broad back muscle originating from the lower thoracic and lumbar vertebrae, sacrum, and iliac crest and inserting on the humerus, contributing to shoulder adduction, extension, and internal rotation.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 330,
            "term": "Musculus Pectoralis Major",
            "english": "Pectoralis Major Muscle",
            "turkishDefinition": "Pektoralis major kası; clavicula, sternum ve kaburga kıkırdaklarından başlayıp humerus'un crista tuberculi majoris'ine yapışan geniş göğüs kası. Omuz fleksiyonu, adduksiyonu ve iç rotasyonunu sağlar.",
            "roots": "musculus (kas) + pectus (göğüs) + major (büyük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Pektoralis major kası",
            "englishDefinition": "A broad chest muscle originating from the clavicle, sternum, and costal cartilages and inserting on the crest of the greater tubercle of the humerus, producing shoulder flexion, adduction, and internal rotation.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 331,
            "term": "Musculus Pectoralis Minor",
            "english": "Pectoralis Minor Muscle",
            "turkishDefinition": "Pektoralis minor kası; 3-5. kaburgalardan başlayıp scapula'nın processus coracoideus'una yapışan küçük göğüs kası. Scapula'yı öne ve aşağı çeker.",
            "roots": "musculus (kas) + pectus (göğüs) + minor (küçük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Pektoralis minor kası",
            "englishDefinition": "A small chest muscle running from the third through fifth ribs to the coracoid process of the scapula, drawing the scapula forward and downward.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 332,
            "term": "Musculus Serratus Anterior",
            "english": "Serratus Anterior Muscle",
            "turkishDefinition": "Serratus anterior kası; ilk 8-9 kaburgadan başlayıp scapula'nın margo medialis'ine yapışan, testere dişi görünümlü kas. Scapula'yı göğüs duvarına yaklaştırır ve öne itme hareketlerinde önemlidir.",
            "roots": "musculus (kas) + serratus (testere dişli) + anterior (ön)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Serratus anterior kası",
            "englishDefinition": "A saw-toothed muscle running from the upper eight or nine ribs to the medial border of the scapula, drawing the scapula toward the chest wall and important in pushing movements.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 333,
            "term": "Musculus Rhomboideus Major",
            "english": "Rhomboid Major Muscle",
            "turkishDefinition": "Rhomboid major kası; T2-T5 vertebralardan başlayıp scapula'nın margo medialis'ine yapışan kas. Scapula'yı retrakte eder ve stabilize eder.",
            "roots": "musculus (kas) + rhomboideus (eşkenar dörtgen şeklinde) + major (büyük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Rhomboid major kası",
            "englishDefinition": "A muscle running from the T2 through T5 vertebrae to the medial border of the scapula, retracting and stabilizing the scapula.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 334,
            "term": "Musculus Rhomboideus Minor",
            "english": "Rhomboid Minor Muscle",
            "turkishDefinition": "Rhomboid minor kası; C7-T1 vertebralardan başlayıp scapula'nın margo medialis'inin üst kısmına yapışan kas. Rhomboid major ile birlikte scapula retraksiyonuna katılır.",
            "roots": "musculus (kas) + rhomboideus (eşkenar dörtgen şeklinde) + minor (küçük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Rhomboid minor kası",
            "englishDefinition": "A muscle running from the C7 and T1 vertebrae to the upper part of the medial border of the scapula, assisting in scapular retraction.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 335,
            "term": "Musculus Levator Scapulae",
            "english": "Levator Scapulae Muscle",
            "turkishDefinition": "Levator scapulae kası; C1-C4 vertebralarının processus transversus'larından başlayıp scapula'nın angulus superior'una yapışan kas. Scapula'yı yukarı kaldırır.",
            "roots": "musculus (kas) + levator (kaldırıcı) + scapula (kürek kemiği)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Levator scapulae kası",
            "englishDefinition": "A muscle running from the transverse processes of C1 through C4 to the superior angle of the scapula, elevating the scapula.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 336,
            "term": "Musculus Biceps Brachii",
            "english": "Biceps Brachii Muscle",
            "turkishDefinition": "Biceps brachii kası; scapula'dan iki başla başlayıp radius'un tuberositas radii'sine yapışan kol kası. Dirsek fleksiyonu ve önkol supinasyonunun ana motorudur.",
            "roots": "musculus (kas) + biceps (iki başlı) + brachium (kol)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Biceps brachii kası",
            "englishDefinition": "A two-headed muscle of the arm originating from the scapula and inserting on the radial tuberosity, serving as the primary supinator and a strong flexor of the elbow.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 337,
            "term": "Musculus Brachialis",
            "english": "Brachialis Muscle",
            "turkishDefinition": "Brakialis kası; humerus'un ön yüzünün alt yarısından başlayıp ulna'nın tuberositas ulnae'sine yapışan kas. Dirsek fleksiyonunun en güçlü ve saf motorudur.",
            "roots": "musculus (kas) + brachium (kol)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Brakialis kası",
            "englishDefinition": "A muscle covering the lower half of the anterior humerus and inserting on the ulnar tuberosity, acting as the strongest pure flexor of the elbow.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 338,
            "term": "Musculus Triceps Brachii",
            "english": "Triceps Brachii Muscle",
            "turkishDefinition": "Triceps brachii kası; scapula ve humerus'tan üç başla başlayıp ulna'nın olecranon'una yapışan kol kası. Dirsek ekstansiyonunun ana motorudur.",
            "roots": "musculus (kas) + triceps (üç başlı) + brachium (kol)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Triceps brachii kası",
            "englishDefinition": "A three-headed muscle of the arm originating from the scapula and humerus and inserting on the olecranon of the ulna, the primary extensor of the elbow.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 339,
            "term": "Musculus Coracobrachialis",
            "english": "Coracobrachialis Muscle",
            "turkishDefinition": "Korakobrakialis kası; scapula'nın processus coracoideus'undan başlayıp humerus'un orta gövdesine yapışan kas. Omuz fleksiyonu ve adduksiyonuna yardımcı olur.",
            "roots": "musculus (kas) + coracoideus (karga gagası şeklinde) + brachium (kol)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Korakobrakialis kası",
            "englishDefinition": "A muscle running from the coracoid process of the scapula to the middle of the humeral shaft, assisting shoulder flexion and adduction.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 340,
            "term": "Musculus Anconeus",
            "english": "Anconeus Muscle",
            "turkishDefinition": "Anconeus kası; humerus'un epicondylus lateralis'inden başlayıp ulna'nın olecranon ve arka yüzüne yapışan küçük kas. Dirsek ekstansiyonuna yardımcı olur ve eklem kapsülünü stabilize eder.",
            "roots": "musculus (kas) + ankon (dirsek - Yunanca)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "turkishShort": "Anconeus kası",
            "englishDefinition": "A small muscle running from the lateral epicondyle of the humerus to the olecranon and posterior ulna, assisting elbow extension and stabilizing the joint capsule.",
            "createdAt": {
                "_seconds": 1789114584,
                "_nanoseconds": 451000000
            }
        },
        {
            "id": 1020,
            "term": "Caput Longum (m. Biceps Brachii)",
            "english": "Long Head",
            "turkishDefinition": "Uzun baş; biceps brachii kasının kürek kemiğinin üstündeki çıkıntıdan başlayan uzun başı.",
            "turkishShort": "Uzun baş",
            "roots": "caput (baş) + longum (uzun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "The long head of the biceps brachii, arising from the supraglenoid tubercle of the scapula.",
            "createdAt": {}
        },
        {
            "id": 1021,
            "term": "Caput Breve (m. Biceps Brachii)",
            "english": "Short Head",
            "turkishDefinition": "Kısa baş; biceps brachii kasının kürek kemiğinin gaga çıkıntısından başlayan kısa başı.",
            "turkishShort": "Kısa baş",
            "roots": "caput (baş) + breve (kısa)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "The short head of the biceps brachii, arising from the coracoid process of the scapula.",
            "createdAt": {}
        },
        {
            "id": 1022,
            "term": "Aponeurosis Musculi Bicipitis Brachii",
            "english": "Bicipital Aponeurosis",
            "turkishDefinition": "Biseps aponörozu; biceps brachii kasından önkol fasyasına uzanan, dirsek çukurunu koruyan yassı kiriş uzantısı.",
            "turkishShort": "Biseps aponörozu",
            "roots": "aponeurosis (yassı kiriş) + musculi (kasa ait) + bicipitis (iki başlıya ait) + brachii (kola ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A flat tendinous extension from the biceps brachii to the forearm fascia, protecting the cubital fossa.",
            "createdAt": {}
        },
        {
            "id": 1023,
            "term": "Caput Laterale (m. Triceps Brachii)",
            "english": "Lateral Head",
            "turkishDefinition": "Dış yan baş; triceps brachii kasının kol kemiğinin arka üst yüzünden başlayan dış başı.",
            "turkishShort": "Dış yan baş",
            "roots": "caput (baş) + laterale (yan)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "The lateral head of the triceps brachii, arising from the posterior surface of the humerus.",
            "createdAt": {}
        },
        {
            "id": 1024,
            "term": "Caput Mediale (m. Triceps Brachii)",
            "english": "Medial Head",
            "turkishDefinition": "İç yan baş; triceps brachii kasının kol kemiğinin arka alt yüzünden başlayan, en derin başı.",
            "turkishShort": "İç yan baş",
            "roots": "caput (baş) + mediale (iç)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "The medial head of the triceps brachii, the deepest head, arising from the posterior surface of the humerus.",
            "createdAt": {}
        },
        {
            "id": 1025,
            "term": "M. Pronator Teres",
            "english": "Pronator Teres Muscle",
            "turkishDefinition": "Yuvarlak içe döndürücü kas; önkolu içe döndüren, dirsek iç kısmından başlayan kas.",
            "turkishShort": "Yuvarlak içe döndürücü kas",
            "roots": "pronator (içe döndürücü) + teres (yuvarlak)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A forearm muscle that pronates the forearm, arising from the medial elbow region.",
            "createdAt": {}
        },
        {
            "id": 1026,
            "term": "M. Flexor Carpi Radialis",
            "english": "Flexor Carpi Radialis Muscle",
            "turkishDefinition": "Radyal el bileği bükücü kası; el bileğini büken ve radius tarafına doğru bükücü ince önkol kası.",
            "turkishShort": "Radyal el bileği bükücü kası",
            "roots": "flexor (bükücü) + carpi (el bileğine ait) + radialis (döner kemiğe ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A forearm muscle that flexes and radially deviates the wrist.",
            "createdAt": {}
        },
        {
            "id": 1027,
            "term": "M. Palmaris Longus",
            "english": "Palmaris Longus Muscle",
            "turkishDefinition": "Uzun avuç kası; avuç içi aponörozunu gerginleştiren, sabit olmayan ince önkol kası.",
            "turkishShort": "Uzun avuç kası",
            "roots": "palmaris (avuç içine ait) + longus (uzun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "An inconstant forearm muscle that tenses the palmar aponeurosis.",
            "createdAt": {}
        },
        {
            "id": 1028,
            "term": "M. Flexor Carpi Ulnaris",
            "english": "Flexor Carpi Ulnaris Muscle",
            "turkishDefinition": "Ulnar el bileği bükücü kası; el bileğini büken ve dirsek kemiği tarafına doğru bükücü önkol kası.",
            "turkishShort": "Ulnar el bileği bükücü kası",
            "roots": "flexor (bükücü) + carpi (el bileğine ait) + ulnaris (dirsek kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A forearm muscle that flexes and ulnarly deviates the wrist.",
            "createdAt": {}
        },
        {
            "id": 1029,
            "term": "M. Flexor Digitorum Superficialis",
            "english": "Flexor Digitorum Superficialis Muscle",
            "turkishDefinition": "Yüzeysel parmak bükücü kası; 2-5. parmakların orta boğumlarını büken yüzeysel önkol kası.",
            "turkishShort": "Yüzeysel parmak bükücü kası",
            "roots": "flexor (bükücü) + digitorum (parmaklara ait) + superficialis (yüzeysel)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A forearm muscle that flexes the middle phalanges of the 2nd to 5th fingers.",
            "createdAt": {}
        },
        {
            "id": 1030,
            "term": "M. Flexor Digitorum Profundus",
            "english": "Flexor Digitorum Profundus Muscle",
            "turkishDefinition": "Derin parmak bükücü kası; 2-5. parmakların uç boğumlarını büken derin önkol kası.",
            "turkishShort": "Derin parmak bükücü kası",
            "roots": "flexor (bükücü) + digitorum (parmaklara ait) + profundus (derin)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A forearm muscle that flexes the distal phalanges of the 2nd to 5th fingers.",
            "createdAt": {}
        },
        {
            "id": 1031,
            "term": "M. Flexor Pollicis Longus",
            "english": "Flexor Pollicis Longus Muscle",
            "turkishDefinition": "Uzun başparmak bükücü kası; başparmağın uç boğumunu büken derin önkol kası.",
            "turkishShort": "Uzun başparmak bükücü kası",
            "roots": "flexor (bükücü) + pollicis (başparmağa ait) + longus (uzun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A forearm muscle that flexes the distal phalanx of the thumb.",
            "createdAt": {}
        },
        {
            "id": 1032,
            "term": "M. Pronator Quadratus",
            "english": "Pronator Quadratus Muscle",
            "turkishDefinition": "Dörtgen içe döndürücü kas; el bileğine yakın, önkolu içe döndüren dörtgen kas.",
            "turkishShort": "Dörtgen içe döndürücü kas",
            "roots": "pronator (içe döndürücü) + quadratus (dörtgen biçimli)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A quadrangular muscle near the wrist that pronates the forearm.",
            "createdAt": {}
        },
        {
            "id": 1033,
            "term": "M. Brachioradialis",
            "english": "Brachioradialis Muscle",
            "turkishDefinition": "Brakioradyal kas; önkolun en hacimli dış kası, dirseği büken kas.",
            "turkishShort": "Brakioradyal kas",
            "roots": "brachio- (kola ait) + radialis (döner kemiğe ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "The most bulky lateral forearm muscle that flexes the elbow.",
            "createdAt": {}
        },
        {
            "id": 1034,
            "term": "M. Extensor Carpi Radialis Longus",
            "english": "Extensor Carpi Radialis Longus Muscle",
            "turkishDefinition": "Uzun radyal el bileği gerici kası; el bileğini geren ve radius tarafına doğru bükücü önkol kası.",
            "turkishShort": "Uzun radyal el bileği gerici kası",
            "roots": "extensor (gerici) + carpi (el bileğine ait) + radialis (döner kemiğe ait) + longus (uzun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A forearm muscle that extends and radially deviates the wrist.",
            "createdAt": {}
        },
        {
            "id": 1035,
            "term": "M. Extensor Carpi Radialis Brevis",
            "english": "Extensor Carpi Radialis Brevis Muscle",
            "turkishDefinition": "Küçük radyal el bileği gerici kası; el bileğini geren, öncekinden daha kısa önkol kası.",
            "turkishShort": "Küçük radyal el bileği gerici kası",
            "roots": "extensor (gerici) + carpi (el bileğine ait) + radialis (döner kemiğe ait) + brevis (kısa)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A forearm muscle that extends the wrist, shorter than its longus counterpart.",
            "createdAt": {}
        },
        {
            "id": 1036,
            "term": "M. Extensor Digitorum",
            "english": "Extensor Digitorum Muscle",
            "turkishDefinition": "Parmak gerici kası; 2-5. parmakları geren önkol kası.",
            "turkishShort": "Parmak gerici kası",
            "roots": "extensor (gerici) + digitorum (parmaklara ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A forearm muscle that extends the 2nd to 5th fingers.",
            "createdAt": {}
        },
        {
            "id": 1037,
            "term": "M. Extensor Digiti Minimi",
            "english": "Extensor Digiti Minimi Muscle",
            "turkishDefinition": "Küçük parmak gerici kası; sadece küçük parmağı geren ince önkol kası.",
            "turkishShort": "Küçük parmak gerici kası",
            "roots": "extensor (gerici) + digiti (parmağa ait) + minimi (en küçük)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A forearm muscle that extends the little finger alone.",
            "createdAt": {}
        },
        {
            "id": 1038,
            "term": "M. Extensor Carpi Ulnaris",
            "english": "Extensor Carpi Ulnaris Muscle",
            "turkishDefinition": "Ulnar el bileği gerici kası; el bileğini geren ve dirsek kemiği tarafına doğru bükücü önkol kası.",
            "turkishShort": "Ulnar el bileği gerici kası",
            "roots": "extensor (gerici) + carpi (el bileğine ait) + ulnaris (dirsek kemiğine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A forearm muscle that extends and ulnarly deviates the wrist.",
            "createdAt": {}
        },
        {
            "id": 1039,
            "term": "M. Abductor Pollicis Longus",
            "english": "Abductor Pollicis Longus Muscle",
            "turkishDefinition": "Uzun başparmak uzaklaştırıcı kası; başparmağı avuçtan uzaklaştıran derin önkol kası.",
            "turkishShort": "Uzun başparmak uzaklaştırıcı kası",
            "roots": "abductor (uzaklaştırıcı) + pollicis (başparmağa ait) + longus (uzun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A deep forearm muscle that abducts the thumb.",
            "createdAt": {}
        },
        {
            "id": 1040,
            "term": "M. Extensor Pollicis Brevis",
            "english": "Extensor Pollicis Brevis Muscle",
            "turkishDefinition": "Küçük başparmak gerici kası; başparmağın taban boğumunu geren derin önkol kası.",
            "turkishShort": "Küçük başparmak gerici kası",
            "roots": "extensor (gerici) + pollicis (başparmağa ait) + brevis (kısa)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A deep forearm muscle that extends the proximal phalanx of the thumb.",
            "createdAt": {}
        },
        {
            "id": 1041,
            "term": "M. Extensor Pollicis Longus",
            "english": "Extensor Pollicis Longus Muscle",
            "turkishDefinition": "Uzun başparmak gerici kası; başparmağın uç boğumunu geren derin önkol kası.",
            "turkishShort": "Uzun başparmak gerici kası",
            "roots": "extensor (gerici) + pollicis (başparmağa ait) + longus (uzun)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A deep forearm muscle that extends the distal phalanx of the thumb.",
            "createdAt": {}
        },
        {
            "id": 1042,
            "term": "M. Extensor Indicis",
            "english": "Extensor Indicis Muscle",
            "turkishDefinition": "İşaret parmağı gerici kası; sadece işaret parmağını geren ince derin önkol kası.",
            "turkishShort": "İşaret parmağı gerici kası",
            "roots": "extensor (gerici) + indicis (işaret parmağına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A deep forearm muscle that extends the index finger alone.",
            "createdAt": {}
        },
        {
            "id": 1043,
            "term": "M. Palmaris Brevis",
            "english": "Palmaris Brevis Muscle",
            "turkishDefinition": "Kısa avuç kası; avuç içi derisini kırıştıran küçük yüzeysel el kası.",
            "turkishShort": "Kısa avuç kası",
            "roots": "palmaris (avuç içine ait) + brevis (kısa)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A small superficial hand muscle that wrinkles the skin of the palm.",
            "createdAt": {}
        },
        {
            "id": 1044,
            "term": "M. Abductor Pollicis Brevis",
            "english": "Abductor Pollicis Brevis Muscle",
            "turkishDefinition": "Kısa başparmak uzaklaştırıcı kası; başparmağı avuçtan uzaklaştıran yüzeysel el kası.",
            "turkishShort": "Kısa başparmak uzaklaştırıcı kası",
            "roots": "abductor (uzaklaştırıcı) + pollicis (başparmağa ait) + brevis (kısa)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A superficial hand muscle that abducts the thumb.",
            "createdAt": {}
        },
        {
            "id": 1045,
            "term": "M. Flexor Pollicis Brevis",
            "english": "Flexor Pollicis Brevis Muscle",
            "turkishDefinition": "Kısa başparmak bükücü kası; başparmağın taban boğumunu büken el kası.",
            "turkishShort": "Kısa başparmak bükücü kası",
            "roots": "flexor (bükücü) + pollicis (başparmağa ait) + brevis (kısa)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A hand muscle that flexes the proximal phalanx of the thumb.",
            "createdAt": {}
        },
        {
            "id": 1046,
            "term": "M. Opponens Pollicis",
            "english": "Opponens Pollicis Muscle",
            "turkishDefinition": "Başparmak karşılaştırıcı kası; başparmağı diğer parmaklarla karşı karşıya getiren el kası.",
            "turkishShort": "Başparmak karşılaştırıcı kası",
            "roots": "opponens (karşı koyan) + pollicis (başparmağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A hand muscle that brings the thumb into opposition with the other fingers.",
            "createdAt": {}
        },
        {
            "id": 1047,
            "term": "M. Adductor Pollicis",
            "english": "Adductor Pollicis Muscle",
            "turkishDefinition": "Başparmak yakınlaştırıcı kası; başparmağı avuca yaklaştıran el kası.",
            "turkishShort": "Başparmak yakınlaştırıcı kası",
            "roots": "adductor (yakınlaştırıcı) + pollicis (başparmağa ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A hand muscle that adducts the thumb toward the palm.",
            "createdAt": {}
        },
        {
            "id": 1048,
            "term": "M. Abductor Digiti Minimi Manus",
            "english": "Abductor Digiti Minimi Muscle (Hand)",
            "turkishDefinition": "El küçük parmak uzaklaştırıcı kası; küçük parmağı diğer parmaklardan uzaklaştıran el kası.",
            "turkishShort": "El küçük parmak uzaklaştırıcı kası",
            "roots": "abductor (uzaklaştırıcı) + digiti (parmağa ait) + minimi (en küçük) + manus (ele ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A hand muscle that abducts the little finger.",
            "createdAt": {}
        },
        {
            "id": 1049,
            "term": "M. Flexor Digiti Minimi Brevis Manus",
            "english": "Flexor Digiti Minimi Brevis Muscle (Hand)",
            "turkishDefinition": "El küçük parmak kısa bükücü kası; küçük parmağın taban boğumunu büken el kası.",
            "turkishShort": "El küçük parmak kısa bükücü kası",
            "roots": "flexor (bükücü) + digiti (parmağa ait) + minimi (en küçük) + brevis (kısa) + manus (ele ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A hand muscle that flexes the proximal phalanx of the little finger.",
            "createdAt": {}
        },
        {
            "id": 1050,
            "term": "M. Opponens Digiti Minimi Manus",
            "english": "Opponens Digiti Minimi Muscle (Hand)",
            "turkishDefinition": "El küçük parmak karşılaştırıcı kası; küçük parmağı başparmağa doğru döndüren el kası.",
            "turkishShort": "El küçük parmak karşılaştırıcı kası",
            "roots": "opponens (karşı koyan) + digiti (parmağa ait) + minimi (en küçük) + manus (ele ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A hand muscle that rotates the little finger toward the thumb.",
            "createdAt": {}
        },
        {
            "id": 1051,
            "term": "Mm. Lumbricales Manus",
            "english": "Lumbrical Muscles of the Hand",
            "turkishDefinition": "Eldeki solucansı kaslar; parmakların taban eklemlerini büken, uç eklemlerini geren, solucan biçimli küçük el kasları.",
            "turkishShort": "Eldeki solucansı kaslar",
            "roots": "lumbricales (solucansı) + manus (ele ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "Worm-shaped small hand muscles that flex the metacarpophalangeal joints and extend the interphalangeal joints.",
            "createdAt": {}
        },
        {
            "id": 1052,
            "term": "Mm. Interossei Dorsales (manus)",
            "english": "Dorsal Interossei Muscles",
            "turkishDefinition": "Arka kemikler arası kaslar; parmakları birbirinden uzaklaştıran, el tarak kemikleri arasındaki kaslar.",
            "turkishShort": "Arka kemikler arası kaslar",
            "roots": "inter- (arasında) + ossei (kemiklere ait) + dorsales (arka)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "Muscles between the metacarpal bones that abduct the fingers.",
            "createdAt": {}
        },
        {
            "id": 1053,
            "term": "Mm. Interossei Palmares",
            "english": "Palmar Interossei Muscles",
            "turkishDefinition": "Avuç tarafı kemikler arası kaslar; parmakları birbirine yaklaştıran, el tarak kemikleri arasındaki kaslar.",
            "turkishShort": "Avuç tarafı kemikler arası kaslar",
            "roots": "inter- (arasında) + ossei (kemiklere ait) + palmares (avuç içine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "Muscles between the metacarpal bones that adduct the fingers.",
            "createdAt": {}
        },
        {
            "id": 1054,
            "term": "Fascia Axillaris",
            "english": "Axillary Fascia",
            "turkishDefinition": "Koltuk altı fasyası; koltuk altı çukurunu döşeyen fasya tabakası.",
            "turkishShort": "Koltuk altı fasyası",
            "roots": "fascia (bant/kılıf) + axillaris (koltuk altına ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "The fascial layer lining the axillary fossa.",
            "createdAt": {}
        },
        {
            "id": 1055,
            "term": "Fascia Brachii",
            "english": "Brachial Fascia",
            "turkishDefinition": "Kol fasyası; kol kaslarını saran fasya tabakası.",
            "turkishShort": "Kol fasyası",
            "roots": "fascia (bant/kılıf) + brachii (kola ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "The fascial layer enveloping the muscles of the arm.",
            "createdAt": {}
        },
        {
            "id": 1056,
            "term": "Septum Intermusculare Brachii Mediale",
            "english": "Medial Intermuscular Septum",
            "turkishDefinition": "İç yan kaslar arası bölme; kol kasının iç yan tarafında fasyadan kemiğe uzanan bölme.",
            "turkishShort": "İç yan kaslar arası bölme",
            "roots": "septum (bölme) + intermusculare (kaslar arası) + brachii (kola ait) + mediale (iç)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A fascial partition on the medial aspect of the arm extending from the fascia to the bone.",
            "createdAt": {}
        },
        {
            "id": 1057,
            "term": "Septum Intermusculare Brachii Laterale",
            "english": "Lateral Intermuscular Septum",
            "turkishDefinition": "Dış yan kaslar arası bölme; kol kasının dış yan tarafında fasyadan kemiğe uzanan bölme.",
            "turkishShort": "Dış yan kaslar arası bölme",
            "roots": "septum (bölme) + intermusculare (kaslar arası) + brachii (kola ait) + laterale (yan)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A fascial partition on the lateral aspect of the arm extending from the fascia to the bone.",
            "createdAt": {}
        },
        {
            "id": 1058,
            "term": "Fascia Antebrachii",
            "english": "Antebrachial Fascia",
            "turkishDefinition": "Önkol fasyası; önkol kaslarını saran fasya tabakası.",
            "turkishShort": "Önkol fasyası",
            "roots": "ante- (önünde) + brachii (kola ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "The fascial layer enveloping the muscles of the forearm.",
            "createdAt": {}
        },
        {
            "id": 1059,
            "term": "Retinaculum Musculorum Extensorum",
            "english": "Extensor Retinaculum",
            "turkishDefinition": "Gerici kas kirişleri tutucu bağı; el bileği üstünde gerici kas kirişlerini yerinde tutan bağ.",
            "turkishShort": "Gerici kas kirişleri tutucu bağı",
            "roots": "retinaculum (tutucu bağ) + musculorum (kaslara ait) + extensorum (gericilere ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A ligament holding the extensor tendons in place over the wrist.",
            "createdAt": {}
        },
        {
            "id": 1060,
            "term": "Retinaculum Musculorum Flexorum",
            "english": "Flexor Retinaculum",
            "turkishDefinition": "Bükücü kas kirişleri tutucu bağı; karpal tüneli oluşturan, bükücü kas kirişlerini yerinde tutan bağ.",
            "turkishShort": "Bükücü kas kirişleri tutucu bağı",
            "roots": "retinaculum (tutucu bağ) + musculorum (kaslara ait) + flexorum (bükücülere ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A ligament forming the roof of the carpal tunnel, holding the flexor tendons in place.",
            "createdAt": {}
        },
        {
            "id": 1061,
            "term": "Aponeurosis Palmaris",
            "english": "Palmar Aponeurosis",
            "turkishDefinition": "Avuç içi aponörozu; avuç içi derisinin altında yer alan üçgen biçimli, güçlü fasya tabakası.",
            "turkishShort": "Avuç içi aponörozu",
            "roots": "aponeurosis (yassı kiriş) + palmaris (avuç içine ait)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A strong, triangular fascial layer beneath the skin of the palm.",
            "createdAt": {}
        },
        {
            "id": 931,
            "term": "M. Supinator",
            "english": "Supinator Muscle",
            "turkishDefinition": "Ön kolun derin arka kompartmanında bulunan, n. radialis'in ramus profundus'u tarafından delinen ve ön kola supinasyon yaptıran özel kas.",
            "turkishShort": "Dışa döndürücü kas",
            "roots": "supinator (dışa döndürücü)",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_muscles",
            "englishDefinition": "A muscle in the deep posterior compartment of the forearm, pierced by the deep branch of the radial nerve, that supinates the forearm.",
            "createdAt": {}
        }
    ]};

// Get all terms as a flat array
export const getAllTerms = () => {
  return Object.values(medicalTermsData).flat();
};

// Get terms by category
export const getTermsByCategory = (categoryId) => {
  return medicalTermsData[categoryId] || (categoryId === 'motus' ? medicalTermsData['movement_terms'] : []);
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
export const getRandomTerms = (count = 10, filter = null) => {
  let terms = [];

  if (!filter || filter === 'all') {
    terms = getAllTerms();
  } else if (typeof filter === 'string') {
    const parts = filter.split(':');
    if (parts.length === 1) {
      terms = getTermsByCategory(filter);
    } else if (parts.length === 2) {
      const [mainCategory, system] = parts;
      terms = getTermsBySystem(system, mainCategory);
    } else if (parts.length === 3) {
      const [mainCategory, system, subcategory] = parts;
      terms = getTermsBySubcategory(system, subcategory, mainCategory);
    }
  }

  if (terms.length === 0) {
    terms = getAllTerms();
  }

  const shuffled = [...terms].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Search terms
export const searchTerms = (query) => {
  const allTerms = getAllTerms();
  const lowerQuery = query.toLowerCase();
  return allTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    (term.turkish && term.turkish.toLowerCase().includes(lowerQuery)) ||
    (term.definition && term.definition.toLowerCase().includes(lowerQuery))
  );
};
