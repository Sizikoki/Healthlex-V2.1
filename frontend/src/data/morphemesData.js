/**
 * =====================================================================
 *  HealthLexMed — Kapsamlı Tıbbi Morfem Veritabanı (morphemesData.js)
 *  Tıbbi Ön Ekler (Prefixes - 116 adet),
 *  Kelime Kökleri / Birleştirme Formları (Combining Forms / Roots - 318 adet),
 *  Son Ekler (Suffixes - 125 adet).
 * =====================================================================
 */

// =====================================================================
// 1. ÖN EKLER (PREFIXES - 116 Adet)
// =====================================================================
export const PREFIXES = [
  // 1. Sayısal ve Nicel Ön Ekler (Numbers & Quantities)
  {
    prefix: "amb- / ambi- / amphi-",
    variants: ["amb-", "ambi-", "amphi-"],
    meaningTr: "Her iki, çift, her iki tarafta",
    meaningEn: "both, on both sides, around",
    category: "numbers_quantities",
    example: "Ambilateral / Amphibious",
    breakdown: "ambi- (her iki tarafı) + lateral (yan) / amphi- (her iki) + bios (yaşam) + -ous",
    description: "Her iki tarafı da ilgilendiren / Hem karada hem suda yaşayabilen."
  },
  {
    prefix: "bi-",
    variants: ["bi-"],
    meaningTr: "İki, çift",
    meaningEn: "two, double",
    category: "numbers_quantities",
    example: "Bilateral / Bicuspid",
    breakdown: "bi- + lateris + -al / bi- + cuspid (point)",
    description: "İki taraflı / İki uçlu, kalbin sol kısmındaki ikili kapakçık."
  },
  {
    prefix: "centi-",
    variants: ["centi-"],
    meaningTr: "Yüz, yüzde bir",
    meaningEn: "hundred, hundredth",
    category: "numbers_quantities",
    example: "Centigrade",
    breakdown: "centi- + gradus (step)",
    description: "100 derecelik sıcaklık ölçüm birimi (Celsius)."
  },
  {
    prefix: "di-",
    variants: ["di-"],
    meaningTr: "İki, ikili",
    meaningEn: "two, double",
    category: "numbers_quantities",
    example: "Diplejia (Dipleji)",
    breakdown: "di- + plegia (paralysis)",
    description: "İki taraflı felç (vücudun iki simetrik kısmını etkileyen felç)."
  },
  {
    prefix: "diplo-",
    variants: ["diplo-"],
    meaningTr: "Çift, iki kat, duble",
    meaningEn: "double, twofold",
    category: "numbers_quantities",
    example: "Diplopia / Diplobacterial",
    breakdown: "dipl- + -opia (vision) / diplo- + bacteri + -al",
    description: "Çift görme / İkili gruplar halinde bulunan bakteriler."
  },
  {
    prefix: "hemi-",
    variants: ["hemi-"],
    meaningTr: "Yarı, yarım, tek taraf",
    meaningEn: "half, one-sided",
    category: "numbers_quantities",
    example: "Hemiplegia / Hemithorax",
    breakdown: "hemi- + -plegia / hemi- + thorax (chest)",
    description: "Vücudun bir tarafının felç olması / Göğüs kafesinin bir yarısı."
  },
  {
    prefix: "milli-",
    variants: ["milli-"],
    meaningTr: "Binde bir",
    meaningEn: "one-thousandth",
    category: "numbers_quantities",
    example: "Milliunit",
    breakdown: "milli- + unit",
    description: "Bir birimin binde biri (milliünite)."
  },
  {
    prefix: "mono-",
    variants: ["mono-"],
    meaningTr: "Tek, bir",
    meaningEn: "single, one",
    category: "numbers_quantities",
    example: "Monocyte / Mononuclear",
    breakdown: "mono- + cyt + -e / mono- + nucle + -ar",
    description: "Tek çekirdekli büyük akyuvar hücresi / Tek çekirdekli hücre."
  },
  {
    prefix: "multi-",
    variants: ["multi-"],
    meaningTr: "Çok, birden fazla",
    meaningEn: "many, multiple",
    category: "numbers_quantities",
    example: "Multipara / Multiple",
    breakdown: "multi- + parere (bear offspring) / multi- + -ple",
    description: "Birden fazla doğum yapmış kadın / Çoklu, çok kısım içeren."
  },
  {
    prefix: "nulli-",
    variants: ["nulli-"],
    meaningTr: "Hiç, hiç olmayan",
    meaningEn: "none",
    category: "numbers_quantities",
    example: "Nullipara",
    breakdown: "nulli- + para (to bear)",
    description: "Hiç doğum yapmamış kadın."
  },
  {
    prefix: "poly-",
    variants: ["poly-"],
    meaningTr: "Çok, aşırı miktarda",
    meaningEn: "many, excessive",
    category: "numbers_quantities",
    example: "Polyuria / Polydipsia",
    breakdown: "poly- + uria (urine) / poly- + dipsia (thirst)",
    description: "Aşırı/fazla idrar çıkarma / Aşırı susama ve sıvı tüketme durumu."
  },
  {
    prefix: "prim/i-",
    variants: ["primi-", "prim-"],
    meaningTr: "İlk, birinci",
    meaningEn: "first",
    category: "numbers_quantities",
    example: "Primigravida",
    breakdown: "primi- + gravida (pregnant)",
    description: "İlk kez gebe kalan/hamile olan kadın."
  },
  {
    prefix: "quadri-",
    variants: ["quadri-"],
    meaningTr: "Dört",
    meaningEn: "four",
    category: "numbers_quantities",
    example: "Quadriplegia",
    breakdown: "quadri- + plegia",
    description: "Dört uzvun (kollar ve bacaklar) felç olması durumu."
  },
  {
    prefix: "semi-",
    variants: ["semi-"],
    meaningTr: "Yarım",
    meaningEn: "half, partly",
    category: "numbers_quantities",
    example: "Semilunar",
    breakdown: "semi- + luna (moon) + -ar",
    description: "Yarım ay şeklinde (örn. kalpteki semilunar kapakçıklar)."
  },
  {
    prefix: "tetra-",
    variants: ["tetra-"],
    meaningTr: "Dört",
    meaningEn: "four",
    category: "numbers_quantities",
    example: "Tetrad / Tetralogy",
    breakdown: "tetra- + -ad / tetra- + -logy",
    description: "Dörtlü grup / Dörtlü seri (örn. Fallot Tetralojisi)."
  },
  {
    prefix: "tri-",
    variants: ["tri-"],
    meaningTr: "Üç",
    meaningEn: "three",
    category: "numbers_quantities",
    example: "Tricuspid / Triplegia",
    breakdown: "tri- + cuspid / tri- + plegia",
    description: "Üç uçlu, kalbin sağ kısmındaki üçlü kapakçık / Üç uzvun felci."
  },
  {
    prefix: "uni-",
    variants: ["uni-"],
    meaningTr: "Tek, bir",
    meaningEn: "single, one",
    category: "numbers_quantities",
    example: "Unilateral",
    breakdown: "uni- + lateris (side) + -al",
    description: "Tek taraflı, vücudun sadece bir tarafıyla ilgili olan."
  },

  // 2. Yön, Konum ve Zaman Belirten Ön Ekler (Position, Direction & Time)
  {
    prefix: "ab-",
    variants: ["ab-"],
    meaningTr: "...-den uzaklaşmak",
    meaningEn: "away from",
    category: "position_direction",
    example: "Abduction / Abdüksiyon",
    breakdown: "ab- + ducere (lead) + -tion",
    description: "Bir uzvun vücut orta hattından uzaklaşma hareketi."
  },
  {
    prefix: "ad-",
    variants: ["ad-"],
    meaningTr: "...-e yaklaşmak",
    meaningEn: "toward, near",
    category: "position_direction",
    example: "Adduction / Addüksiyon",
    breakdown: "ad- + ducere + -tion",
    description: "Bir uzvun vücut orta hattına (eksenine) yaklaşma hareketi."
  },
  {
    prefix: "af-",
    variants: ["af-"],
    meaningTr: "...-e doğru, getiren",
    meaningEn: "toward, bringing",
    category: "position_direction",
    example: "Afferent",
    breakdown: "af- + ferre (to carry)",
    description: "Merkeze veya bir organa doğru uyarı taşıyan (örn. afferent sinir)."
  },
  {
    prefix: "ante-",
    variants: ["ante-"],
    meaningTr: "Ön, önce, öncesinde",
    meaningEn: "before, in front of",
    category: "position_direction",
    example: "Antenatal / Antemortem",
    breakdown: "ante- + natal (birth) / ante- + mortem",
    description: "Doğum öncesi döneme ait / Ölümden önce gerçekleşen."
  },
  {
    prefix: "circum-",
    variants: ["circum-"],
    meaningTr: "Etrafında, çevreleyen",
    meaningEn: "around",
    category: "position_direction",
    example: "Circumduction",
    breakdown: "circum- + ducere + -tion",
    description: "Bir uzvun dairesel bir hat çizecek şekilde döndürülmesi hareketi."
  },
  {
    prefix: "dextr/o-",
    variants: ["dextro-", "dextr-"],
    meaningTr: "Sağ, sağ taraf",
    meaningEn: "right, toward the right",
    category: "position_direction",
    example: "Dextrocardia (Dekstrokardi)",
    breakdown: "dextr/o- (sağ) + cardia (kalp)",
    description: "Kalbin vücudun sağ tarafında yer alması anomalisi."
  },
  {
    prefix: "dia-",
    variants: ["dia-"],
    meaningTr: "...-den geçerek, arasından",
    meaningEn: "through, across",
    category: "position_direction",
    example: "Dialysis / Diarrhea",
    breakdown: "dia- + lysis (loosening) / dia- + rrhea (flow)",
    description: "Yarı geçirgen zardan geçerek süzülme / İçinden geçip akan sıvı dışkı (ishal)."
  },
  {
    prefix: "ec-",
    variants: ["ec-"],
    meaningTr: "Dışarı, dışarıya doğru",
    meaningEn: "out, outside",
    category: "position_direction",
    example: "Ectopic",
    breakdown: "ec- + topos (place) + -ic",
    description: "Normal dışı yerleşimli (örn. ektopik/dış gebelik)."
  },
  {
    prefix: "ecto-",
    variants: ["ecto-"],
    meaningTr: "Dışında, dış tarafında",
    meaningEn: "outside, outer",
    category: "position_direction",
    example: "Ectopic / Ectogenous",
    breakdown: "ecto- + topos (place) + -ic / ecto- + gen",
    description: "Normal yerinin dışında gelişen / Dış kaynaklı."
  },
  {
    prefix: "ef-",
    variants: ["ef-"],
    meaningTr: "...-den uzaklaşan, götüren",
    meaningEn: "away from, carrying out",
    category: "position_direction",
    example: "Efferent",
    breakdown: "ef- + ferre (to carry)",
    description: "Merkezden çevreye uyarı veya sıvı taşıyan (örn. efferent sinir/damar)."
  },
  {
    prefix: "em-",
    variants: ["em-"],
    meaningTr: "İçinde, içerisinde",
    meaningEn: "in, inside",
    category: "position_direction",
    example: "Empyema (Ampiyem)",
    breakdown: "em- (içinde) + pyo (irin) + -ema (durum)",
    description: "Bir vücut boşluğu (özellikle akciğer zarları) içinde irin birikmesi."
  },
  {
    prefix: "en- / end-",
    variants: ["en-", "end-"],
    meaningTr: "İçinde, iç",
    meaningEn: "inside, within",
    category: "position_direction",
    example: "Endolymph / Encephalon",
    breakdown: "endo- (en-) + lymph (fluid) / en- + cephalos (head)",
    description: "İç kulak zarı içindeki sıvı (iç lenf) / Kafa içi organ (beyin)."
  },
  {
    prefix: "endo-",
    variants: ["endo-"],
    meaningTr: "İçinde, iç kısmında",
    meaningEn: "in, within, inside",
    category: "position_direction",
    example: "Endocrine / Endoscopy",
    breakdown: "endo- + -crine / endo- + -scopy (examine)",
    description: "İç salgılı, salgısını doğrudan kana veren / İç organ boşluğu incelemesi."
  },
  {
    prefix: "epi-",
    variants: ["epi-"],
    meaningTr: "Üstünde, üzerinde, yukarısında",
    meaningEn: "above, upon, on",
    category: "position_direction",
    example: "Epidermis / Epigastric",
    breakdown: "epi- (üstünde) + dermis (deri) / epi- + gastr (mide) + -ic",
    description: "Derinin en dış/üst tabakası / Midenin üst bölgesine ait olan."
  },
  {
    prefix: "eso-",
    variants: ["eso-"],
    meaningTr: "İçeriye doğru, iç",
    meaningEn: "inward",
    category: "position_direction",
    example: "Esotropia",
    breakdown: "eso- + -tropia (turning)",
    description: "Bir veya iki gözün buruna doğru (içe) kayması durumu."
  },
  {
    prefix: "ex-",
    variants: ["ex-"],
    meaningTr: "Dışarıya doğru, dış",
    meaningEn: "out, away from",
    category: "position_direction",
    example: "Exophthalmos",
    breakdown: "ex- + ophthalmos (eye)",
    description: "Göz küresinin anormal şekilde dışarı fırlaması durumu."
  },
  {
    prefix: "exo-",
    variants: ["exo-"],
    meaningTr: "Dışarı, dış kısım",
    meaningEn: "outside, outward",
    category: "position_direction",
    example: "Exocrine / Exotropia",
    breakdown: "exo- + -crine (secrete) / exo- + -tropia",
    description: "Dış salgılı, salgısını bir kanalla dışa akıtan / Gözün dışa kayması."
  },
  {
    prefix: "extra-",
    variants: ["extra-"],
    meaningTr: "Dışında, sınırların ötesinde",
    meaningEn: "outside, beyond",
    category: "position_direction",
    example: "Extracranial",
    breakdown: "extra- + crani (skull) + -al",
    description: "Kafatasının dışında yer alan veya gerçekleşen."
  },
  {
    prefix: "hypo-",
    variants: ["hypo-"],
    meaningTr: "Altında, aşağısında (konum)",
    meaningEn: "under, below, beneath",
    category: "position_direction",
    example: "Hypodermic / Hypogastric",
    breakdown: "hypo- + derm + -ic / hypo- + gastr",
    description: "Derinin altına uygulanan / Midenin alt bölgesine ait olan."
  },
  {
    prefix: "infra-",
    variants: ["infra-"],
    meaningTr: "Altında, aşağısında",
    meaningEn: "under, below",
    category: "position_direction",
    example: "Infracostal",
    breakdown: "infra- + cost (rib) + -al",
    description: "Kaburgaların altında yer alan bölge veya kaslar."
  },
  {
    prefix: "inter-",
    variants: ["inter-"],
    meaningTr: "Arasında, ortasında",
    meaningEn: "between, among",
    category: "position_direction",
    example: "Intercostal / Interphalangeal",
    breakdown: "inter- + cost + -al",
    description: "İki kaburganın arasında bulunan anatomik aralık veya kaslar."
  },
  {
    prefix: "intra-",
    variants: ["intra-"],
    meaningTr: "İçinde, iç bölgesinde",
    meaningEn: "within, inside",
    category: "position_direction",
    example: "Intramuscular / Intrathecal",
    breakdown: "intra- + muscul + -ar / intra- + thec (sheath)",
    description: "Kas dokusunun içine yapılan / Omurilik zarı içine yapılan."
  },
  {
    prefix: "ipsi-",
    variants: ["ipsi-"],
    meaningTr: "Aynı, kendi tarafı",
    meaningEn: "same",
    category: "position_direction",
    example: "Ipsilateral",
    breakdown: "ipsi- + lateral (side)",
    description: "Vücudun aynı tarafında yer alan (örn. sağ el ve sağ ayak)."
  },
  {
    prefix: "meso-",
    variants: ["meso-"],
    meaningTr: "Orta, ara",
    meaningEn: "middle",
    category: "position_direction",
    example: "Mesoderm",
    breakdown: "meso- + dermis (skin)",
    description: "Embriyonun gelişimindeki orta tabaka (mezoderm)."
  },
  {
    prefix: "meta-",
    variants: ["meta-"],
    meaningTr: "Değişim, ötesinde, sonra, boyunca",
    meaningEn: "after, beyond, change",
    category: "position_direction",
    example: "Metastasis",
    breakdown: "meta- + stasis (standing)",
    description: "Kanserin vücutta başka bir bölgeye sıçraması (yer değiştirmesi)."
  },
  {
    prefix: "mid-",
    variants: ["mid-"],
    meaningTr: "Orta, ortasında",
    meaningEn: "middle",
    category: "position_direction",
    example: "Midgut",
    breakdown: "mid- + gut",
    description: "Sindirim borusunun orta kısmı (orta bağırsak)."
  },
  {
    prefix: "para-",
    variants: ["para-"],
    meaningTr: "Yanında, yakınında; anormal",
    meaningEn: "beside, near, abnormal",
    category: "position_direction",
    example: "Paranasal / Paralysis",
    breakdown: "para- + nas (nose) + -al / para- + lysis",
    description: "Burun çevresindeki hava boşlukları / Motor işlev kaybı, felç."
  },
  {
    prefix: "per-",
    variants: ["per-"],
    meaningTr: "Arasından, içinden, baştan başa",
    meaningEn: "through, throughout",
    category: "position_direction",
    example: "Percutaneous",
    breakdown: "per- + cutis (skin) + -aneous",
    description: "Deriden geçerek, deri yoluyla yapılan/alınan."
  },
  {
    prefix: "peri-",
    variants: ["peri-"],
    meaningTr: "Çevresinde, etrafında",
    meaningEn: "around, surrounding",
    category: "position_direction",
    example: "Pericardial / Periodontal",
    breakdown: "peri- + cardi (heart) + -al / peri- + odont",
    description: "Kalp duvarını çevreleyen zarla ilgili / Diş çevresi dokularla ilgili."
  },
  {
    prefix: "post-",
    variants: ["post-"],
    meaningTr: "Sonra, arkasında, sonrasında",
    meaningEn: "after, behind",
    category: "position_direction",
    example: "Postnatal / Postoperative",
    breakdown: "post- + natal / post- + operative",
    description: "Doğum sonrası döneme ait / Ameliyattan sonraki dönem."
  },
  {
    prefix: "pre-",
    variants: ["pre-"],
    meaningTr: "Öncesinde, önünde",
    meaningEn: "before, in front of",
    category: "position_direction",
    example: "Prenatal / Preoperative",
    breakdown: "pre- + natal / pre- + operative",
    description: "Doğum öncesi döneme ait / Ameliyat öncesi dönem."
  },
  {
    prefix: "pro-",
    variants: ["pro-"],
    meaningTr: "Öncesinde, öncü, destekleyici",
    meaningEn: "before, in front of, forward",
    category: "position_direction",
    example: "Prophylaxis / Probiotic",
    breakdown: "pro- + phylaxis (protection)",
    description: "Hastalıktan korunmak için önceden alınan önlem/tedavi."
  },
  {
    prefix: "retro-",
    variants: ["retro-"],
    meaningTr: "Geri, arkaya doğru, arkasında",
    meaningEn: "backward, behind",
    category: "position_direction",
    example: "Retroversion / Retroperitoneal",
    breakdown: "retro- + vertere (to turn) + -ion",
    description: "Bir organın arkaya doğru bükülmesi / Periton arkası."
  },
  {
    prefix: "sinistr/a-",
    variants: ["sinistra-", "sinistr-"],
    meaningTr: "Sol, sol taraf",
    meaningEn: "left, toward the left",
    category: "position_direction",
    example: "Sinistramanual",
    breakdown: "sinistra- (sol) + manual (el)",
    description: "Solak, sol elini kullanan kimse."
  },
  {
    prefix: "sub-",
    variants: ["sub-"],
    meaningTr: "Altında, aşağısında",
    meaningEn: "under, below",
    category: "position_direction",
    example: "Sublingual / Subdural",
    breakdown: "sub- + lingu (tongue) + -al / sub- + dur",
    description: "Dil altında yer alan / Dura mater zarının altında kalan."
  },
  {
    prefix: "super-",
    variants: ["super-"],
    meaningTr: "Üstünde, yukarısında",
    meaningEn: "above, upper",
    category: "position_direction",
    example: "Superficial",
    breakdown: "super- + facies (face/surface) + -al",
    description: "Yüzeysel, vücut yüzeyine yakın olan (örn. yüzeysel venler)."
  },
  {
    prefix: "supra-",
    variants: ["supra-"],
    meaningTr: "Üstünde, yukarısında",
    meaningEn: "above, upon",
    category: "position_direction",
    example: "Supraclavicular / Suprarenal",
    breakdown: "supra- + clavicul (collarbone)",
    description: "Köprücük kemiğinin üstünde yer alan bölge / Böbreküstü bezi."
  },
  {
    prefix: "süper-",
    variants: ["süper-"],
    meaningTr: "Üstünde, yukarısında, aşırı (Türkçe yazılış)",
    meaningEn: "above, excessive",
    category: "position_direction",
    example: "Süperolateral",
    breakdown: "süper- (üst) + lateral (yan)",
    description: "Üst yan tarafta bulunan yapı veya bölge."
  },
  {
    prefix: "trans-",
    variants: ["trans-"],
    meaningTr: "Karşıdan karşıya, içinden",
    meaningEn: "across, through",
    category: "position_direction",
    example: "Transfusion / Transvaginal",
    breakdown: "trans- + fundere (to pour) / trans- + vagin",
    description: "Kan nakli (damar içine aktarma) / Vajina içinden geçerek yapılan."
  },
  {
    prefix: "ultra-",
    variants: ["ultra-"],
    meaningTr: "Ötesinde, aşırı",
    meaningEn: "beyond, excess",
    category: "position_direction",
    example: "Ultrasonography / Ultrasonic",
    breakdown: "ultra- + son (sound) + -graphy",
    description: "Ses üstü dalgalarla görüntüleme."
  },

  // 3. Olumsuzluk, Yokluk ve Karşıtlık Ön Ekler (Negation, Absence & Opposition)
  {
    prefix: "a-",
    variants: ["a-"],
    meaningTr: "Yokluk, bulunmayış (sessiz harf öncesi)",
    meaningEn: "without, not",
    category: "negation_absence",
    example: "Amastia / Aplasia",
    breakdown: "a- + mast (breast) + -ia / a- + plasia",
    description: "Meme dokusunun doğuştan olmaması durumu / Gelişim eksikliği."
  },
  {
    prefix: "an-",
    variants: ["an-"],
    meaningTr: "Yokluk, bulunmayış (sesli harf öncesi)",
    meaningEn: "without, not",
    category: "negation_absence",
    example: "Anesthesia / Anuria",
    breakdown: "an- + esthesia / an- + uria (urine)",
    description: "Duyu ve his kaybı (anestezi) / İdrar üretememe, idrar yokluğu."
  },
  {
    prefix: "anti-",
    variants: ["anti-"],
    meaningTr: "Karşı, karşıt, engelleyen",
    meaningEn: "against, opposing",
    category: "negation_absence",
    example: "Antibacterial / Antineoplastic",
    breakdown: "anti- + bacteri + -al / anti- + neo",
    description: "Bakterilerin üremesini engelleyen / Tümör karşıtı (kanser ilacı)."
  },
  {
    prefix: "contra-",
    variants: ["contra-"],
    meaningTr: "Karşı, zıt, zıt tarafta",
    meaningEn: "against, opposite",
    category: "negation_absence",
    example: "Contralateral / Contraception",
    breakdown: "contra- + lateral / contra- + ception",
    description: "Vücudun karşı (simetrik) tarafında olan / Gebeliği önleyici yöntem."
  },
  {
    prefix: "de-",
    variants: ["de-"],
    meaningTr: "Aşağı; kayıp, uzaklaştırma",
    meaningEn: "down, lack of, removal",
    category: "negation_absence",
    example: "Detoxification / Deamination",
    breakdown: "de- + toxic + -fication",
    description: "Toksinlerin (zehrin) vücuttan atılması / Amino grubunun koparılması."
  },
  {
    prefix: "dez-",
    variants: ["dez-"],
    meaningTr: "Bozulma, yok etme, tersine çevirme",
    meaningEn: "undoing, reversal",
    category: "negation_absence",
    example: "Dezenfeksiyon",
    breakdown: "dez- + enfeksiyon",
    description: "Cansız maddeler üzerindeki mikropları arındırma işlemi."
  },
  {
    prefix: "dis-",
    variants: ["dis-"],
    meaningTr: "Yok, olmayan, uzaklaştırma",
    meaningEn: "free of, undo, apart",
    category: "negation_absence",
    example: "Disinfection",
    breakdown: "dis- + infect + -ion",
    description: "Patojen (hastalık yapıcı) mikroorganizmaları uzaklaştırma işlemi."
  },
  {
    prefix: "im-",
    variants: ["im-"],
    meaningTr: "Olumsuzluk eki (b, p, m öncesi)",
    meaningEn: "not, without",
    category: "negation_absence",
    example: "Impotence (İmpotans)",
    breakdown: "im- + potentia (power) + -ence",
    description: "Cinsel iktidarsızlık, güçsüzlük durumu."
  },
  {
    prefix: "in-",
    variants: ["in-"],
    meaningTr: "Olumsuzluk eki; içinde",
    meaningEn: "not / in",
    category: "negation_absence",
    example: "Incontinence / Impotence",
    breakdown: "in- + continentia (to hold back)",
    description: "İdrar veya gaita akışını kontrol edememe (idrar kaçırma)."
  },
  {
    prefix: "non-",
    variants: ["non-"],
    meaningTr: "Olmayan, yokluk, olumsuzluk eki",
    meaningEn: "not",
    category: "negation_absence",
    example: "Noninvasive",
    breakdown: "non- + invasive",
    description: "Vücuda herhangi bir kesi veya araçla girilmeyen teşhis/tedavi yöntemi."
  },
  {
    prefix: "un-",
    variants: ["un-"],
    meaningTr: "Olmayan, yok, olumsuzluk eki",
    meaningEn: "not, reversal",
    category: "negation_absence",
    example: "Unconscious",
    breakdown: "un- + conscious",
    description: "Bilinçsiz, bilinci yerinde olmayan durum."
  },

  // 4. Büyüklük, Derece ve Seviye Ön Ekler (Size, Degree & Level)
  {
    prefix: "hyper-",
    variants: ["hyper-"],
    meaningTr: "Aşırı, normalin üzerinde, yüksek",
    meaningEn: "excessive, above normal",
    category: "size_degree",
    example: "Hypertension / Hyperthermia",
    breakdown: "hyper- + tension (pressure) / hyper- + therm",
    description: "Kan basıncının yüksek olması / Vücut ısısının aşırı yükselmesi."
  },
  {
    prefix: "hypo-",
    variants: ["hypo-"],
    meaningTr: "Yetersiz, eksik, normalin altında",
    meaningEn: "deficient, below normal",
    category: "size_degree",
    example: "Hypotension / Hypoventilation",
    breakdown: "hypo- + tension / hypo- + ventil",
    description: "Kan basıncının düşük olması / Solunum yetersizliği, az hava girme."
  },
  {
    prefix: "iso-",
    variants: ["iso-"],
    meaningTr: "Eşit, aynı, benzer",
    meaningEn: "same, equal",
    category: "size_degree",
    example: "Isochromic / Isograft",
    breakdown: "iso- + chrom (color) + -ic / iso- + graft",
    description: "Aynı renkte olan / Tek yumurta ikizleri arasında yapılan doku nakli."
  },
  {
    prefix: "macro-",
    variants: ["macro-"],
    meaningTr: "Normalden büyük, geniş",
    meaningEn: "large",
    category: "size_degree",
    example: "Macrocyte / Macrocephaly",
    breakdown: "macro- + cyt (cell) / macro- + cephal",
    description: "Normalden büyük eritrosit hücresi / Kafatasının normalden büyük olması."
  },
  {
    prefix: "mega-",
    variants: ["mega-"],
    meaningTr: "Aşırı büyük, genişlemiş",
    meaningEn: "large, oversized",
    category: "size_degree",
    example: "Megacolon / Megabladdder",
    breakdown: "mega- + colon",
    description: "Kalın bağırsağın (kolonun) anormal derecede genişlemesi durumu."
  },
  {
    prefix: "megalo-",
    variants: ["megalo-"],
    meaningTr: "Anormal büyüklükte olan",
    meaningEn: "large, enlargement",
    category: "size_degree",
    example: "Megaloblast",
    breakdown: "megalo- + blast (embryonic cell)",
    description: "Kemik iliğinde bulunan anormal büyüklükteki genç alyuvar hücresi."
  },
  {
    prefix: "micro-",
    variants: ["micro-"],
    meaningTr: "Normalden küçük, ufak",
    meaningEn: "small",
    category: "size_degree",
    example: "Microcardia / Microscope",
    breakdown: "micro- + cardi (heart) + -ia",
    description: "Kalbin normal yapıdan belirgin ölçüde küçük olması durumu."
  },
  {
    prefix: "neo-",
    variants: ["neo-"],
    meaningTr: "Yeni",
    meaningEn: "new",
    category: "size_degree",
    example: "Neonate / Neonatal",
    breakdown: "neo- + natus (birth)",
    description: "Yeni doğmuş bebek (ilk 28 günlük döneme ait)."
  },
  {
    prefix: "normo-",
    variants: ["normo-"],
    meaningTr: "Normal, olağan",
    meaningEn: "normal, usual",
    category: "size_degree",
    example: "Normovolemia",
    breakdown: "normo- + volemia (volume of blood)",
    description: "Kan hacminin normal seviyede olması durumu."
  },
  {
    prefix: "olig/o-",
    variants: ["oligo-", "olig-"],
    meaningTr: "Az, yetersiz, eksiklik",
    meaningEn: "scanty, few, little",
    category: "size_degree",
    example: "Oliguria / Oligospermia",
    breakdown: "olig- + uria / oligo- + spermia",
    description: "Çıkarılan idrar miktarında azlık / Sperm sayısının normalden az olması."
  },
  {
    prefix: "pachy-",
    variants: ["pachy-"],
    meaningTr: "Kalın, sertleşmiş",
    meaningEn: "thick, heavy",
    category: "size_degree",
    example: "Pachymeningitis",
    breakdown: "pachy- + mening (membranes) + -itis",
    description: "Beyni saran dura mater zarının kalınlaşması ve iltihaplanması."
  },
  {
    prefix: "pan-",
    variants: ["pan-"],
    meaningTr: "Bütün, hepsi, yaygın",
    meaningEn: "all, entire",
    category: "size_degree",
    example: "Pancytopenia / Panarthritis",
    breakdown: "pan- + cyt + -penia (deficiency)",
    description: "Kandaki tüm hücre elemanlarının (eritrosit, lökosit, trombosit) azalması."
  },
  {
    prefix: "pas- / pasa- / panto-",
    variants: ["pas-", "pasa-", "panto-"],
    meaningTr: "Bütün, hepsi, tamamı",
    meaningEn: "all, whole",
    category: "size_degree",
    example: "Pantophobia (Pantofobi)",
    breakdown: "panto- (bütün) + phobia (korku)",
    description: "Her şeyden, bütün çevreden anormal derecede korkma durumu."
  },
  {
    prefix: "pseudo-",
    variants: ["pseudo-"],
    meaningTr: "Yalancı, sahte, gerçek olmayan",
    meaningEn: "false, fake",
    category: "size_degree",
    example: "Pseudocyesis / Pseudoparalizi",
    breakdown: "pseudo- + cyesis (pregnancy)",
    description: "Yalancı gebelik (kadının gebe olmadığı halde belirtileri hissetmesi)."
  },

  // 5. Renk Belirten Ön Ekler (Colors)
  {
    prefix: "chlor/o-",
    variants: ["chloro-", "chlor-"],
    meaningTr: "Yeşil",
    meaningEn: "green",
    category: "colors",
    example: "Chloroma (Kloroma)",
    breakdown: "chlor/o + -oma",
    description: "Yeşilimsi renk gösteren kemik iliği kaynaklı tümör hücresi birikimi."
  },
  {
    prefix: "cirrh/o-",
    variants: ["cirrho-", "cirrh-"],
    meaningTr: "Sarı, portakal sarısı, kuruluk",
    meaningEn: "tawny yellow, orange-yellow",
    category: "colors",
    example: "Cirrhosis (Siroz)",
    breakdown: "cirrh/o + -osis (abnormal condition)",
    description: "Karaciğer hücre harabiyeti sonucu oluşan sararma ve doku sertleşmesi."
  },
  {
    prefix: "cyan/o-",
    variants: ["cyano-", "cyan-"],
    meaningTr: "Mavi, koyu mavi",
    meaningEn: "blue",
    category: "colors",
    example: "Cyanosis (Siyanoz)",
    breakdown: "cyan/o + -osis",
    description: "Kandaki oksijen yetersizliğine bağlı olarak ciltte oluşan morarma/mavilik."
  },
  {
    prefix: "eritr-",
    variants: ["eritr-"],
    meaningTr: "Kırmızı (Türkçe yazılış)",
    meaningEn: "red",
    category: "colors",
    example: "Eritrosit",
    breakdown: "eritr- + -os- + -it",
    description: "Kırmızı kan hücresi (alyuvar)."
  },
  {
    prefix: "erythr/o-",
    variants: ["erythro-", "erythr-"],
    meaningTr: "Kırmızı",
    meaningEn: "red",
    category: "colors",
    example: "Erythrocyte / Erythema",
    breakdown: "erythr/o + -cyte / erythe- + -ma",
    description: "Kırmızı kan hücresi (alyuvar) / Ciltte oluşan kırmızı döküntü."
  },
  {
    prefix: "glauc/o-",
    variants: ["glauco-", "glauc-"],
    meaningTr: "Gri, yeşilimsi gri",
    meaningEn: "gray, bluish-gray",
    category: "colors",
    example: "Glaucoma (Glokom)",
    breakdown: "glauc/o + -oma (tumor/mass)",
    description: "Göz tansiyonu, halk arasında karasu veya yeşil karasu hastalığı."
  },
  {
    prefix: "glok-",
    variants: ["glok-"],
    meaningTr: "Gri/Yeşilimsi (Türkçe yazılış)",
    meaningEn: "grayish-green",
    category: "colors",
    example: "Glokom",
    breakdown: "glok- + -om",
    description: "Göz tansiyonu hastalığının Türkçe tıp dilindeki yazılışı."
  },
  {
    prefix: "klor-",
    variants: ["klor-"],
    meaningTr: "Yeşil (Türkçe yazılış)",
    meaningEn: "green",
    category: "colors",
    example: "Kloroma",
    breakdown: "klor- + -oma",
    description: "Yeşil tümör yapısının Türkçe tıbbi karşılığı."
  },
  {
    prefix: "ksanth-",
    variants: ["ksanth-"],
    meaningTr: "Sarı (Türkçe yazılış)",
    meaningEn: "yellow",
    category: "colors",
    example: "Ksantom",
    breakdown: "ksanth- + -oma",
    description: "Deride sarı plaklar şeklinde beliren iyi huylu tümör yapısı."
  },
  {
    prefix: "leuk/o-",
    variants: ["leuko-", "leuk-"],
    meaningTr: "Beyaz",
    meaningEn: "white",
    category: "colors",
    example: "Leukocyte / Leukopenia",
    breakdown: "leuk/o + -cyte (cell) / leuk/o + -penia",
    description: "Beyaz kan hücresi (akyuvar) / Akyuvar sayısında azalma."
  },
  {
    prefix: "löko-",
    variants: ["löko-"],
    meaningTr: "Beyaz (Türkçe yazılış)",
    meaningEn: "white",
    category: "colors",
    example: "Lökomyelit",
    breakdown: "löko- + myel (spinal cord) + -it",
    description: "Omurilik ak maddesinin (beyaz cevherinin) iltihabı."
  },
  {
    prefix: "melan/o-",
    variants: ["melano-", "melan-"],
    meaningTr: "Siyah, koyu renkli",
    meaningEn: "black, dark",
    category: "colors",
    example: "Melanoma / Melanin",
    breakdown: "melan/o + -oma / melan- + -in",
    description: "Koyu renkli hücrelerden kaynaklanan kötü huylu cilt kanseri / Siyah pigment."
  },
  {
    prefix: "siro-",
    variants: ["siro-"],
    meaningTr: "Sarı/Turuncu (Türkçe yazılış)",
    meaningEn: "yellow/orange",
    category: "colors",
    example: "Siroz",
    breakdown: "siro- + -z",
    description: "Karaciğer sirozu hastalığının Türkçe yazılışı."
  },
  {
    prefix: "siyan-",
    variants: ["siyan-"],
    meaningTr: "Mavi (Türkçe yazılış)",
    meaningEn: "blue",
    category: "colors",
    example: "Siyanoz",
    breakdown: "siyan- + -oz",
    description: "Oksijensizlik morarmasının Türkçe tıp dilindeki yazımı."
  },
  {
    prefix: "xanth/o-",
    variants: ["xantho-", "xanth-"],
    meaningTr: "Sarı",
    meaningEn: "yellow",
    category: "colors",
    example: "Xanthoma / Xanthofobi",
    breakdown: "xanth/o + -oma",
    description: "Deride oluşan sarı renkli yağ birikintisi, sarı ur."
  },

  // 6. Diğer ve Özel Ön Ekler (Miscellaneous & Specialty)
  {
    prefix: "allo-",
    variants: ["allo-"],
    meaningTr: "Diğer, yabancı, farklı",
    meaningEn: "other, differing from normal",
    category: "specialty",
    example: "Allograft (Allogreft)",
    breakdown: "allo- + -graft (transplantation)",
    description: "Aynı türün başka bir bireyinden alınan doku grefti."
  },
  {
    prefix: "ana-",
    variants: ["ana-"],
    meaningTr: "Karşı, zıt; yukarı; tekrar",
    meaningEn: "up, toward, again, apart",
    category: "specialty",
    example: "Anaphylaxis",
    breakdown: "ana- + phylaxis (protection)",
    description: "Aşırı, yaşamı tehdit eden alerjik reaksiyon (koruma karşıtı)."
  },
  {
    prefix: "aniso-",
    variants: ["aniso-"],
    meaningTr: "Eşit olmayan, farklı",
    meaningEn: "unequal, dissimilar",
    category: "specialty",
    example: "Anisocytosis (Anizositoz)",
    breakdown: "aniso- + cyt/o + -osis",
    description: "Kırmızı kan hücrelerinin farklı büyüklükte olması durumu."
  },
  {
    prefix: "auto-",
    variants: ["auto-"],
    meaningTr: "Kendi, kendiliğinden",
    meaningEn: "self, same",
    category: "specialty",
    example: "Autograft / Autoimmune",
    breakdown: "auto- + graft / auto- + immune",
    description: "Kişinin kendi dokusunu başka bir yere nakletmesi / Öz-bağışıklık."
  },
  {
    prefix: "brady-",
    variants: ["brady-"],
    meaningTr: "Yavaş",
    meaningEn: "slow",
    category: "specialty",
    example: "Bradycardia / Bradypnea",
    breakdown: "brady- + cardia / brady- + pnea",
    description: "Kalp atış hızının dakikada 60'ın altına düşmesi / Yavaş solunum."
  },
  {
    prefix: "cata-",
    variants: ["cata-"],
    meaningTr: "Aşağı, alt, gerileme, çökme",
    meaningEn: "down, under, lower",
    category: "specialty",
    example: "Catalepsy",
    breakdown: "cata- + lepsy (seizure)",
    description: "Kasların sertleşmesiyle karakterize yarı bilinçsizlik hali (katalepsi)."
  },
  {
    prefix: "co- / col-",
    variants: ["co-", "col-"],
    meaningTr: "Beraber, birlikte, ortak",
    meaningEn: "together, with",
    category: "specialty",
    example: "Cooperation / Collateral",
    breakdown: "co- + operari (work) / col- + lateral",
    description: "Birlikte çalışma / Yan dal, ana damarın yanında uzanan yedek damar."
  },
  {
    prefix: "com- / con-",
    variants: ["com-", "con-"],
    meaningTr: "Beraber, birlikte, birleşik",
    meaningEn: "together, with",
    category: "specialty",
    example: "Congenital / Confusion",
    breakdown: "con- + genital (birth) / con- + fusion",
    description: "Doğuştan gelen durum veya sakatlık / Bilinç bulanıklığı, zihin karışıklığı."
  },
  {
    prefix: "eu-",
    variants: ["eu-"],
    meaningTr: "İyi, normal, sağlıklı",
    meaningEn: "good, normal, well",
    category: "specialty",
    example: "Eupnea / Euthyroid",
    breakdown: "eu- + pnea / eu- + thyr/o + -oid",
    description: "Normal, zahmetsiz ve düzenli solunum / Normal tiroit işlevi."
  },
  {
    prefix: "hetero-",
    variants: ["hetero-"],
    meaningTr: "Farklı, başka, zıt",
    meaningEn: "different, other",
    category: "specialty",
    example: "Heterograft / Heteropsia",
    breakdown: "hetero- + graft / heter- + -opsia (vision)",
    description: "Farklı bir türden yapılan doku nakli / Farklı görme."
  },
  {
    prefix: "homeo-",
    variants: ["homeo-"],
    meaningTr: "Aynı, benzer, durağan",
    meaningEn: "same, unchanging",
    category: "specialty",
    example: "Homeostasis",
    breakdown: "homeo- + -stasis (standing still)",
    description: "Vücudun iç ortamındaki fiziksel/kimyasal dengeyi sabit tutma gücü."
  },
  {
    prefix: "homo-",
    variants: ["homo-"],
    meaningTr: "Aynı, benzer",
    meaningEn: "same, alike",
    category: "specialty",
    example: "Homograft / Homosexual",
    breakdown: "homo- + graft",
    description: "Aynı türe ait başka bir canlıdan alınan greft (allogreft)."
  },
  {
    prefix: "mal-",
    variants: ["mal-"],
    meaningTr: "Kötü, bozuk, yetersiz",
    meaningEn: "bad, poor, abnormal",
    category: "specialty",
    example: "Malnutrition / Malignant",
    breakdown: "mal- + nutrition / mal- + -ignant",
    description: "Yetersiz ve kötü beslenme / Kanseröz, kötü huylu tümör yapısı."
  },
  {
    prefix: "oksi-",
    variants: ["oksi-"],
    meaningTr: "Oksijenli, keskin (Türkçe yazım)",
    meaningEn: "oxygen, sharp",
    category: "specialty",
    example: "Oksijen / Oksidasyon",
    breakdown: "oksi- + -jen",
    description: "Tıbbi gaz / Oksijenlenme süreci."
  },
  {
    prefix: "oxy-",
    variants: ["oxy-"],
    meaningTr: "Oksijenli, asitli, sivri",
    meaningEn: "sharp, oxygen, acid",
    category: "specialty",
    example: "Oxygen / Oxyesthesia",
    breakdown: "oxy- + gen (producing)",
    description: "Oksijen gazı / Dokunma ve ağrı duyularında aşırı keskinlik."
  },
  {
    prefix: "syn- / sym-",
    variants: ["syn-", "sym-"],
    meaningTr: "Birlikte, birleşik, kaynaşmış",
    meaningEn: "together, with, union",
    category: "specialty",
    example: "Syndactyly / Symbiosis",
    breakdown: "syn- + dactyl (finger) + -y / sym- + bios (life)",
    description: "Parmakların yapışık olması anomalisi / Ortak yaşam, birlikte yaşama."
  },
  {
    prefix: "tachy-",
    variants: ["tachy-"],
    meaningTr: "Hızlı, süratli",
    meaningEn: "rapid, fast",
    category: "specialty",
    example: "Tachycardia / Tachypnea",
    breakdown: "tachy- + cardia / tachy- + pnea",
    description: "Kalp atış hızının dakikada 100'ün üzerine çıkması / Hızlı solunum."
  },
  {
    prefix: "vas(o)-",
    variants: ["vaso-", "vas-"],
    meaningTr: "Damar (İlaç biliminde ön ek)",
    meaningEn: "vessel",
    category: "specialty",
    example: "Vasodilatation / Vasospasm",
    breakdown: "vas/o + dilatatio / vas/o + spasm",
    description: "Damarların genişlemesi / Damarların ani ve geçici kasılması (spazm)."
  },
  {
    prefix: "vazo-",
    variants: ["vazo-"],
    meaningTr: "Damar (Türkçe yazılış)",
    meaningEn: "vessel",
    category: "specialty",
    example: "Vazodilatasyon",
    breakdown: "vazo- + dilatasyon",
    description: "Damarların genişlemesi işleminin Türkçe tıp dilindeki yazımı."
  }
];

// =====================================================================
// 2. KELİME KÖKLERİ (COMBINING FORMS & ROOTS - 318 Adet)
// =====================================================================
export const ROOTS = [
  // 1. Genel, Hücresel ve Sistem Dışı Kökler (General & Cellular)
  { root: "acr/o", cleanRoot: "acr", system: "general", meaningEn: "extremity, peak, highest point", meaningTr: "Uç, uzuv, ekstremite, tepe", example: "Acrocyanosis / Akrosiyanoz", breakdown: "acr/o (uç) + cyan/o (mavi) + -osis (durum) = El ve ayak uçlarında morarma" },
  { root: "aden/o", cleanRoot: "aden", system: "general", meaningEn: "gland", meaningTr: "Bez, salgı bezi", example: "Adenopathy / Adenopati", breakdown: "aden/o (bez) + -pathy (hastalık) = Salgı bezi büyümesi/hastalığı" },
  { root: "aer/o", cleanRoot: "aer", system: "general", meaningEn: "air", meaningTr: "Hava", example: "Aerobic / Aerobik", breakdown: "aer/o (hava) + bi/o (yaşam) + -ic (ilgili) = Oksijenli ortamda yaşayan canlılar" },
  { root: "agglutin/o", cleanRoot: "agglutin", system: "general", meaningEn: "clumping, gluing", meaningTr: "Kümeleşme, yapışma, pıhtılaşma", example: "Agglutination / Aglütinasyon", breakdown: "agglutin/o (kümeleşme) + -ation (süreç) = Antikor etkisiyle hücrelerin kümeleşmesi" },
  { root: "albin/o", cleanRoot: "albin", system: "general", meaningEn: "white", meaningTr: "Beyaz, ak", example: "Albinism / Albinizm", breakdown: "albin/o (beyaz) + -ism (durum) = Renk pigmentlerinin doğuştan eksikliği" },
  { root: "amyl/o", cleanRoot: "amyl", system: "general", meaningEn: "starch", meaningTr: "Nişasta", example: "Amylase / Amilaz", breakdown: "amyl/o (nişasta) + -ase (enzim) = Nişastayı parçalayan sindirim enzimi" },
  { root: "aut/o", cleanRoot: "aut", system: "general", meaningEn: "self, own", meaningTr: "Kendi, kendiliğinden", example: "Autonomic / Otonom", breakdown: "aut/o (kendi) + nom/o (yasa) + -ic = İrade dışı, kendiliğinden çalışan sistem" },
  { root: "bas/o", cleanRoot: "bas", system: "general", meaningEn: "base (alkaline)", meaningTr: "Taban, baz, alkali", example: "Basophil / Bazofil", breakdown: "bas/o (baz) + -phil (eğilim) = Alkali boyalara eğilimi olan akyuvar hücresi" },
  { root: "bi/o", cleanRoot: "bi", system: "general", meaningEn: "life, living", meaningTr: "Yaşam, canlı", example: "Biopsy / Biyopsi", breakdown: "bi/o (canlı) + -opsia (görme) = Canlıdan muayene amacıyla parça alma işlemi" },
  { root: "blast/o", cleanRoot: "blast", system: "general", meaningEn: "embryonic cell, immature", meaningTr: "Genç hücre, embriyonik hücre, tomurcuk", example: "Blastocyte / Blastosit", breakdown: "blast/o (genç hücre) + -cyte (hücre) = Erken gelişim aşamasındaki hücre" },
  { root: "carcin/o", cleanRoot: "carcin", system: "general", meaningEn: "cancer", meaningTr: "Kanser", example: "Carcinogen / Karsinojen", breakdown: "carcin/o (kanser) + -gen (üreten) = Kanser oluşumunu tetikleyen ajan" },
  { root: "chem/o", cleanRoot: "chem", system: "general", meaningEn: "chemical, drug", meaningTr: "Kimyasal, kimyasal madde", example: "Chemotherapy / Kemoterapi", breakdown: "chem/o (kimyasal) + -therapy (tedavi) = Kimyasal ilaçlarla kanser tedavisi" },
  { root: "chlor/o", cleanRoot: "chlor", system: "general", meaningEn: "green", meaningTr: "Yeşil", example: "Chloroma / Kloroma", breakdown: "chlor/o (yeşil) + -oma (tümör) = Yeşilimsi renk gösteren kemik iliği tümörü" },
  { root: "chrom/o", cleanRoot: "chrom", system: "general", meaningEn: "color", meaningTr: "Renk", example: "Chromatocyte / Kromatosit", breakdown: "chrom/o (renk) + -cyte (hücre) = Renkli/pigmentli hücre" },
  { root: "cry/o", cleanRoot: "cry", system: "general", meaningEn: "cold", meaningTr: "Soğuk", example: "Cryotherapy / Kriyoterapi", breakdown: "cry/o (soğuk) + -therapy (tedavi) = Soğukla dondurarak yapılan tedavi yöntemi" },
  { root: "crypt/o", cleanRoot: "crypt", system: "general", meaningEn: "hidden", meaningTr: "Gizli, saklı", example: "Cryptogenic / Kriptojenik", breakdown: "crypt/o (gizli) + -genic (kaynaklanan) = Nedeni bilinmeyen/gizli olan hastalık" },
  { root: "cyan/o", cleanRoot: "cyan", system: "general", meaningEn: "blue", meaningTr: "Mavi, morarma", example: "Cyanosis / Siyanoz", breakdown: "cyan/o (mavi) + -osis (durum) = Oksijensizliğe bağlı ciltte morarma" },
  { root: "cyt/o", cleanRoot: "cyt", system: "general", meaningEn: "cell", meaningTr: "Hücre", example: "Cytology / Sitoloji", breakdown: "cyt/o (hücre) + -logy (bilim) = Hücre yapısını inceleyen bilim dalı" },
  { root: "dynam/o", cleanRoot: "dynam", system: "general", meaningEn: "power, strength, force", meaningTr: "Güç, kuvvet, hareket gücü", example: "Dynamic / Dinamik", breakdown: "dynam/o (güç) + -ic (ilgili) = Güç ve hareketle ilgili, hareketli" },
  { root: "electr/o", cleanRoot: "electr", system: "general", meaningEn: "electricity", meaningTr: "Elektrik", example: "Electrocardiogram / EKG", breakdown: "electr/o (elektrik) + cardi/o (kalp) + -gram (kayıt) = Kalbin elektriksel çizelgesi" },
  { root: "eti/o", cleanRoot: "eti", system: "general", meaningEn: "cause", meaningTr: "Neden, sebep", example: "Etiology / Etiyoloji", breakdown: "eti/o (neden) + -logy (bilim) = Hastalıkların nedenlerini araştıran bilim" },
  { root: "fibr/o", cleanRoot: "fibr", system: "general", meaningEn: "fiber, fibrous tissue", meaningTr: "Lif, bağ dokusu lifi", example: "Fibroma / Fibrom", breakdown: "fibr/o (lif) + -oma (tümör) = İyi huylu lifli bağ dokusu tümörü" },
  { root: "fibrin/o", cleanRoot: "fibrin", system: "general", meaningEn: "fibrin, clot fiber", meaningTr: "Fibrin, pıhtı lifi, pıhtılaşma proteini", example: "Fibrinogen / Fibrinojen", breakdown: "fibrin/o (pıhtı lifi) + -gen (üreten) = Kan pıhtılaşmasını sağlayan öncü protein" },
  { root: "fung/i", cleanRoot: "fung", system: "general", meaningEn: "fungus, mold", meaningTr: "Mantar, küf", example: "Fungicide / Fungisit", breakdown: "fung/i (mantar) + -cide (öldüren) = Mantar ve küfleri yok eden öldürücü kimyasal" },
  { root: "glauc/o", cleanRoot: "glauc", system: "general", meaningEn: "gray, bluish-gray", meaningTr: "Gri, yeşilimsi gri", example: "Glaucoma / Glokom", breakdown: "glauc/o (yeşilimsi gri) + -oma (şişlik) = Karasu hastalığı, göz içi basınç artışı" },
  { root: "helmint/o", cleanRoot: "helmint", system: "general", meaningEn: "worms, intestinal worms", meaningTr: "Solucan, bağırsak kurdu, parazit", example: "Helminthiasis / Helmintiyazis", breakdown: "helmint/o (solucan) + -iasis (durum) = Bağırsak kurdu/solucanı enfeksiyonu" },
  { root: "hist/o", cleanRoot: "hist", system: "general", meaningEn: "tissue", meaningTr: "Doku", example: "Histology / Histoloji", breakdown: "hist/o (doku) + -logy (bilim) = Dokuların mikroskobik yapısını inceleyen bilim" },
  { root: "hydr/o", cleanRoot: "hydr", system: "general", meaningEn: "water, fluid", meaningTr: "Su, sıvı", example: "Hydrocephalus / Hidrosefali", breakdown: "hydr/o (su) + cephal/o (kafa) = Beyin boşluklarında anormal sıvı birikmesi" },
  { root: "idi/o", cleanRoot: "idi", system: "general", meaningEn: "unknown, peculiar", meaningTr: "Bilinmeyen, özgün, kendiliğinden gelişen", example: "Idiopathic / İdiyopatik", breakdown: "idi/o (bilinmeyen) + path/o (hastalık) + -ic = Nedeni bilinmeyen primer hastalık" },
  { root: "jaund/o", cleanRoot: "jaund", system: "general", meaningEn: "yellow", meaningTr: "Sarı, sarılık", example: "Jaundice / Sarılık", breakdown: "jaund/o (sarı) + -ice = Ciltte ve göz akında oluşan sararma durumu" },
  { root: "kary/o", cleanRoot: "kary", system: "general", meaningEn: "nucleus", meaningTr: "Çekirdek (hücre çekirdeği)", example: "Karyocyte / Karyosit", breakdown: "kary/o (çekirdek) + -cyte (hücre) = Çekirdekli hücre" },
  { root: "leuk/o", cleanRoot: "leuk", system: "general", meaningEn: "white", meaningTr: "Beyaz, ak", example: "Leukocyte / Lökosit", breakdown: "leuk/o (beyaz) + -cyte (hücre) = Beyaz kan hücresi, akyuvar" },
  { root: "melan/o", cleanRoot: "melan", system: "general", meaningEn: "black", meaningTr: "Siyah, kara, koyu renkli", example: "Melanoma / Melanom", breakdown: "melan/o (siyah) + -oma (tümör) = Kötü huylu siyah cilt kanseri" },
  { root: "morph/o", cleanRoot: "morph", system: "general", meaningEn: "form, shape, structure", meaningTr: "Şekil, biçim, yapı", example: "Morphology / Morfoloji", breakdown: "morph/o (şekil) + -logy (bilim) = Canlıların biçim ve yapılarını inceleyen bilim" },
  { root: "muc/o", cleanRoot: "muc", system: "general", meaningEn: "mucus", meaningTr: "Mukus, sümüksü sıvı", example: "Mucolytic / Mukolitik", breakdown: "muc/o (mukus) + -lytic (çözücü) = Mukus salgısını yumuşatan ajan" },
  { root: "myx/o", cleanRoot: "myx", system: "general", meaningEn: "mucus", meaningTr: "Mukus, sümük", example: "Myxoid / Miksoid", breakdown: "myx/o (mukus) + -oid (benzer) = Sümüksü, mukusa benzeyen doku" },
  { root: "ne/o", cleanRoot: "ne", system: "general", meaningEn: "new", meaningTr: "Yeni", example: "Neonate / Neonat", breakdown: "ne/o (yeni) + nat/o (doğum) = Yeni doğmuş bebek (ilk 28 günlük)" },
  { root: "nucle/o", cleanRoot: "nucle", system: "general", meaningEn: "nucleus", meaningTr: "Çekirdek", example: "Mononuclear / Mononükleer", breakdown: "mono- (tek) + nucle/o (çekirdek) + -ar = Tek çekirdekli hücre" },
  { root: "path/o", cleanRoot: "path", system: "general", meaningEn: "disease", meaningTr: "Hastalık", example: "Pathology / Patoloji", breakdown: "path/o (hastalık) + -logy (bilim) = Hastalık bilimi, doku bozuklukları" },
  { root: "pharmac/o", cleanRoot: "pharmac", system: "general", meaningEn: "drug, medicine", meaningTr: "İlaç", example: "Pharmacology / Farmakoloji", breakdown: "pharmac/o (ilaç) + -logy (bilim) = İlaç bilimi" },
  { root: "phon/o", cleanRoot: "phon", system: "general", meaningEn: "voice, sound", meaningTr: "Ses", example: "Phonocardiogram / Fonokardiyogram", breakdown: "phon/o (ses) + cardi/o (kalp) + -gram = Kalp seslerinin grafiksel kaydı" },
  { root: "phot/o", cleanRoot: "phot", system: "general", meaningEn: "light", meaningTr: "Işık", example: "Phototherapy / Fototerapi", breakdown: "phot/o (ışık) + -therapy (tedavi) = Işık dalgasıyla yapılan tedavi" },
  { root: "physi/o", cleanRoot: "physi", system: "general", meaningEn: "nature", meaningTr: "Doğa, doğal işleyiş", example: "Physiology / Fizyoloji", breakdown: "physi/o (doğa) + -logy (bilim) = Organların normal işlevini inceleyen bilim" },
  { root: "poli/o", cleanRoot: "poli", system: "general", meaningEn: "gray, gray matter", meaningTr: "Gri, boz, omurilik gri cevheri", example: "Poliomyelitis / Çocuk Felci", breakdown: "poli/o (gri) + myel/o (omurilik) + -itis = Omurilik gri cevherinin iltihaplanması" },
  { root: "prurit/o", cleanRoot: "prurit", system: "general", meaningEn: "itching", meaningTr: "Kaşıntı, kaşınma hissi", example: "Pruritus / Prurit", breakdown: "prurit/o (kaşıntı) + -us = Şiddetli kaşıntı durumu" },
  { root: "py/o", cleanRoot: "py", system: "general", meaningEn: "pus", meaningTr: "İrin, cerahat", example: "Pyogenesis / Piyojenez", breakdown: "py/o (irin) + -genesis (oluşum) = İrin, iltihaplı sıvı oluşma süreci" },
  { root: "pyr/o", cleanRoot: "pyr", system: "general", meaningEn: "fire, fever, heat", meaningTr: "Ateş, yangın, yüksek sıcaklık", example: "Pyromania / Piromani", breakdown: "pyr/o (ateş) + -mania (saplantı) = Yangın çıkarma saplantısı" },
  { root: "radi/o", cleanRoot: "radi", system: "general", meaningEn: "radiation, x-ray, radius", meaningTr: "Radyasyon, X ışını, döner kemik", example: "Radiologist / Radyolog", breakdown: "radi/o (ışınım) + -logist (uzman) = Radyoloji ve görüntüleme uzmanı" },
  { root: "scler/o", cleanRoot: "scler", system: "general", meaningEn: "hardening, sclera", meaningTr: "Sertleşme, göz akı (sklera)", example: "Scleroderma / Skleroderma", breakdown: "scler/o (sertleşme) + -derma (deri) = Derinin anormal sertleşmesi hastalığı" },
  { root: "septic/o", cleanRoot: "septic", system: "general", meaningEn: "infection, decay", meaningTr: "Enfeksiyonlu, mikroplu", example: "Septicemia / Septisemi", breakdown: "septic/o (mikroplu) + -emia = Kana mikrop karışması, kan zehirlenmesi" },
  { root: "somat/o", cleanRoot: "somat", system: "general", meaningEn: "body", meaningTr: "Vücut, beden", example: "Somatosensory / Somatosensoriyel", breakdown: "somat/o (beden) + sens/o (duyum) + -ory = Beden duyumuyla ilgili" },
  { root: "son/o", cleanRoot: "son", system: "general", meaningEn: "sound", meaningTr: "Ses, ses dalgası", example: "Sonography / Sonografi", breakdown: "son/o (ses) + -graphy (kayıt) = Ses dalgalarıyla görüntü elde etme yöntemi" },
  { root: "therm/o", cleanRoot: "therm", system: "general", meaningEn: "heat, temperature", meaningTr: "Isı, sıcaklık", example: "Thermometer / Termometre", breakdown: "therm/o (ısı) + -meter (ölçer) = Ateş/sıcaklık ölçen alet" },
  { root: "tox/o", cleanRoot: "tox", system: "general", meaningEn: "poison", meaningTr: "Zehir, toksin", example: "Toxicology / Toksikoloji", breakdown: "tox/o (zehir) + -logy (bilim) = Zehir bilimi" },
  { root: "troph/o", cleanRoot: "troph", system: "general", meaningEn: "nourishment, development", meaningTr: "Beslenme, doku büyümesi/gelişimi", example: "Atrophy / Atrofi", breakdown: "a- (yokluk) + -trophy (gelişim) = Organın beslenemeyip küçülmesi, erimesi" },
  { root: "tuss/i", cleanRoot: "tuss", system: "general", meaningEn: "cough", meaningTr: "Öksürük", example: "Antitussive / Antitüsif", breakdown: "anti- (karşı) + tuss/i (öksürük) + -ive = Öksürük baskılayan ilaç" },
  { root: "vir/o", cleanRoot: "vir", system: "general", meaningEn: "virus", meaningTr: "Virüs", example: "Virology / Viroloji", breakdown: "vir/o (virüs) + -logy (bilim) = Virüsleri inceleyen bilim dalı" },
  { root: "viscer/o", cleanRoot: "viscer", system: "general", meaningEn: "internal organs", meaningTr: "İç organlar (visera)", example: "Visceral / Viseral", breakdown: "viscer/o (iç organ) + -al = Karın boşluğundaki iç organlarla ilgili" },
  { root: "xanth/o", cleanRoot: "xanth", system: "general", meaningEn: "yellow", meaningTr: "Sarı", example: "Xanthoma / Ksantom", breakdown: "xanth/o (sarı) + -oma (tümör) = Deride sarı renkli yağ birikintisi" },
  { root: "xer/o", cleanRoot: "xer", system: "general", meaningEn: "dry", meaningTr: "Kuru", example: "Xeroderma / Kseroderma", breakdown: "xer/o (kuru) + -derma (deri) = Aşırı kuru ve pullu cilt yapısı" },

  // 2. Yön, Konum ve Anatomik Boşluk Kökleri (Position & Direction)
  { root: "anter/o", cleanRoot: "anter", system: "position", meaningEn: "anterior, front", meaningTr: "Ön, ön taraf", example: "Anterior / Anterior", breakdown: "anter/o (ön) + -ior = Vücudun önünde bulunan yapı" },
  { root: "caud/o", cleanRoot: "caud", system: "position", meaningEn: "tail", meaningTr: "Kuyruk, kuyruk tarafı, aşağı", example: "Caudad / Kaudad", breakdown: "caud/o (kuyruk) + -ad = Kuyruğa doğru yönelme" },
  { root: "crani/o", cleanRoot: "crani", system: "position", meaningEn: "cranium, skull", meaningTr: "Kafatası", example: "Craniotomy / Kraniyotomi", breakdown: "crani/o (kafatası) + -tomy (kesi) = Kafatasının cerrahi olarak açılması" },
  { root: "dist/o", cleanRoot: "dist", system: "position", meaningEn: "far, farthest", meaningTr: "Uzak, merkezden uzak", example: "Distal / Distal", breakdown: "dist/o (uzak) + -al = Gövdeden en uzak bölgedeki yapı" },
  { root: "dors/o", cleanRoot: "dors", system: "position", meaningEn: "back of body", meaningTr: "Arka, sırt tarafı", example: "Dorsal / Dorsal", breakdown: "dors/o (sırt) + -al = Sırt bölgesine ait, arka kısımda bulunan" },
  { root: "infer/o", cleanRoot: "infer", system: "position", meaningEn: "lower, below", meaningTr: "Alt, aşağıda, aşağısında", example: "Inferior / İnferiyor", breakdown: "infer/o (alt) + -ior = Vücudun daha alt bölümünde yer alan" },
  { root: "later/o", cleanRoot: "later", system: "position", meaningEn: "side", meaningTr: "Yan, yan taraf", example: "Lateral / Lateral", breakdown: "later/o (yan) + -al = Vücudun yan tarafına ait olan" },
  { root: "medi/o", cleanRoot: "medi", system: "position", meaningEn: "middle", meaningTr: "Orta, orta kısım", example: "Medial / Mediyal", breakdown: "medi/o (orta) + -al = Vücut orta hattına daha yakın bulunan" },
  { root: "poster/o", cleanRoot: "poster", system: "position", meaningEn: "back of body, behind", meaningTr: "Arka, arkasında, arka taraf", example: "Posterior / Posterior", breakdown: "poster/o (arka) + -ior = Vücudun arkasında kalan bölge" },
  { root: "proxim/o", cleanRoot: "proxim", system: "position", meaningEn: "near, nearest", meaningTr: "Yakın, merkeze yakın", example: "Proximal / Proksimal", breakdown: "proxim/o (yakın) + -al = Gövdeye en yakın yapı" },
  { root: "super/o", cleanRoot: "super", system: "position", meaningEn: "upper, above", meaningTr: "Üst, yukarısında, üstünde", example: "Superior / Süperiyor", breakdown: "super/o (üst) + -ior = Vücudun üst kısımlarında yer alan" },
  { root: "top/o", cleanRoot: "top", system: "position", meaningEn: "place, position", meaningTr: "Yer, konum, lokal", example: "Topical / Topikal", breakdown: "top/o (yer) + -ic + -al = Sadece lokal bir yüzeye uygulanan" },
  { root: "ventr/o", cleanRoot: "ventr", system: "position", meaningEn: "belly, belly side", meaningTr: "Karın, karın tarafı, ön", example: "Ventral / Ventral", breakdown: "ventr/o (karın) + -al = Vücudun karın/ön kısmıyla ilgili" },

  // 3. Deri ve Örtü Sistemi Kökleri (Integumentary System)
  { root: "adip/o", cleanRoot: "adip", system: "integumentary", meaningEn: "fat", meaningTr: "Yağ doku", example: "Adipocyte / Adiposit", breakdown: "adip/o (yağ) + -cyte (hücre) = Yağ hücresi" },
  { root: "axill/o", cleanRoot: "axill", system: "integumentary", meaningEn: "axilla, armpit", meaningTr: "Koltuk altı, koltuk altı çukuru", example: "Axillary / Aksiller", breakdown: "axill/o (koltuk altı) + -ary = Koltuk altı bölgesiyle ilgili" },
  { root: "cutane/o", cleanRoot: "cutan", system: "integumentary", meaningEn: "skin", meaningTr: "Deri, cilt", example: "Subcutaneous / Subkutan", breakdown: "sub- (alt) + cutane/o (deri) + -ous = Deri altı tabakası" },
  { root: "derm/o", cleanRoot: "derm", system: "integumentary", meaningEn: "skin", meaningTr: "Deri, cilt", example: "Hypodermic / Hipodermik", breakdown: "hypo- (alt) + derm/o (deri) + -ic = Derinin altına uygulanan" },
  { root: "dermat/o", cleanRoot: "dermat", system: "integumentary", meaningEn: "skin", meaningTr: "Deri, cilt", example: "Dermatitis / Dermatit", breakdown: "dermat/o (deri) + -itis (iltihap) = Deri iltihaplanması, egzama" },
  { root: "hidr/o", cleanRoot: "hidr", system: "integumentary", meaningEn: "sweat", meaningTr: "Ter, ter bezleri", example: "Hidradenitis / Hidradenit", breakdown: "hidr/o (ter) + aden/o (bez) + -itis = Ter bezlerinin iltihabı" },
  { root: "ichthy/o", cleanRoot: "ichthy", system: "integumentary", meaningEn: "dry, scaly", meaningTr: "Kuru, pullu (balık pulu gibi)", example: "Ichthyosis / İhtiyozis", breakdown: "ichthy/o (kuru/pullu) + -osis = Cildin pul pul dökülmesi hastalığı" },
  { root: "kerat/o", cleanRoot: "kerat", system: "integumentary", meaningEn: "cornea, horny tissue", meaningTr: "Kornea, boynuzsu/sert doku", example: "Keratocyte / Keratosit", breakdown: "kerat/o (sert doku) + -cyte = Korneada veya sert tabakada yer alan hücre" },
  { root: "lip/o", cleanRoot: "lip", system: "integumentary", meaningEn: "fat", meaningTr: "Yağ, yağlı doku", example: "Lipoma / Lipom", breakdown: "lip/o (yağ) + -oma (tümör) = İyi huylu yağ dokusu kütlesi, yağ bezesi" },
  { root: "onych/o", cleanRoot: "onych", system: "integumentary", meaningEn: "nail", meaningTr: "Tırnak", example: "Onychomycosis / Onikomikoz", breakdown: "onych/o (tırnak) + myc/o (mantar) + -osis = Tırnak mantarı hastalığı" },
  { root: "pil/o", cleanRoot: "pil", system: "integumentary", meaningEn: "hair", meaningTr: "Saç, kıl, kıl kökü", example: "Pilonidal / Pilonidal", breakdown: "pil/o (kıl) + nid/o (yuva) + -al = Kıl dönmesi yuvası/kisti" },
  { root: "steat/o", cleanRoot: "steat", system: "integumentary", meaningEn: "fat", meaningTr: "Yağ, iç yağ, sebum", example: "Steatitis / Steatit", breakdown: "steat/o (yağ) + -itis (iltihap) = Yağ dokusunun iltihabı" },
  { root: "sudor/o", cleanRoot: "sudor", system: "integumentary", meaningEn: "sweat", meaningTr: "Ter, ter salgısı", example: "Sudoresis / Sudorez", breakdown: "sudor/o (ter) + -esis = Aşırı ve bol miktarda terleme" },
  { root: "trich/o", cleanRoot: "trich", system: "integumentary", meaningEn: "hair", meaningTr: "Saç, kıl, tüy", example: "Trichopathy / Trikovati", breakdown: "trich/o (saç) + -pathy (hastalık) = Saç ve kıl hastalıklarının genel adı" },
  { root: "ungu/o", cleanRoot: "ungu", system: "integumentary", meaningEn: "nail", meaningTr: "Tırnak", example: "Ungual / Ungual", breakdown: "ungu/o (tırnak) + -al = Tırnak yapısıyla ilgili olan" },

  // 4. Sindirim Sistemi Kökleri (Digestive System)
  { root: "an/o", cleanRoot: "an", system: "digestive", meaningEn: "anus", meaningTr: "Anüs, makat", example: "Anal / Anal", breakdown: "an/o (anüs) + -al = Anüs bölgesiyle ilgili olan" },
  { root: "append/o", cleanRoot: "append", system: "digestive", meaningEn: "appendix", meaningTr: "Apandis", example: "Appendectomy / Apandektomi", breakdown: "append/o (apandis) + -ectomy (çıkarma) = Apandisin kesilip alınması" },
  { root: "bucc/o", cleanRoot: "bucc", system: "digestive", meaningEn: "cheek", meaningTr: "Yanak", example: "Buccal / Bukkal", breakdown: "bucc/o (yanak) + -al = Yanak bölgesi veya yanak içiyle ilgili" },
  { root: "cec/o", cleanRoot: "cec", system: "digestive", meaningEn: "cecum", meaningTr: "Kör bağırsak (çekum)", example: "Cecitis / Çekit", breakdown: "cec/o (kör bağırsak) + -itis = Kör bağırsağın iltihaplanması" },
  { root: "cheil/o", cleanRoot: "cheil", system: "digestive", meaningEn: "lip", meaningTr: "Dudak", example: "Cheilitis / Şelit", breakdown: "cheil/o (dudak) + -itis = Dudak iltihaplanması" },
  { root: "chol/e", cleanRoot: "chol", system: "digestive", meaningEn: "bile, gall", meaningTr: "Safra", example: "Cholelith / Kolelit", breakdown: "chol/e (safra) + lith (taş) = Safra taşı" },
  { root: "cholangi/o", cleanRoot: "cholangi", system: "digestive", meaningEn: "bile vessel", meaningTr: "Safra kanalları", example: "Cholangiography / Kolanjiyografi", breakdown: "cholangi/o (safra kanalı) + -graphy = Safra kanallarının grafisi" },
  { root: "cholecyst/o", cleanRoot: "cholecyst", system: "digestive", meaningEn: "gallbladder", meaningTr: "Safra kesesi", example: "Cholecystitis / Kolesistit", breakdown: "cholecyst/o (safra kesesi) + -itis = Safra kesesi iltihabı" },
  { root: "choledoch/o", cleanRoot: "choledoch", system: "digestive", meaningEn: "common bile duct", meaningTr: "Koledok kanalı (ana safra kanalı)", example: "Choledochotomy / Koledokotomi", breakdown: "choledoch/o (ana safra kanalı) + -tomy (kesi) = Koledok kanalına cerrahi kesi" },
  { root: "col/o", cleanRoot: "col", system: "digestive", meaningEn: "colon, large intestine", meaningTr: "Kolon, kalın bağırsak", example: "Colostomy / Kolostomi", breakdown: "col/o (kalın bağırsak) + -stomy = Kalın bağırsağın karın duvarına ağızlaştırılması" },
  { root: "colon/o", cleanRoot: "colon", system: "digestive", meaningEn: "colon, large intestine", meaningTr: "Kolon, kalın bağırsak", example: "Colonoscopy / Kolonoskopi", breakdown: "colon/o (kalın bağırsak) + -scopy = Kalın bağırsağın endoskopla incelenmesi" },
  { root: "dent/o", cleanRoot: "dent", system: "digestive", meaningEn: "teeth", meaningTr: "Diş", example: "Dentistry / Diş Hekimliği", breakdown: "dent/o (diş) + -ist + -ry = Diş ve ağız sağlığı uzmanlığı dalı" },
  { root: "duoden/o", cleanRoot: "duoden", system: "digestive", meaningEn: "duodenum", meaningTr: "Onikiparmak bağırsağı", example: "Duodenitis / Duodenit", breakdown: "duoden/o (onikiparmak bağırsağı) + -itis = Onikiparmak bağırsağının iltihabı" },
  { root: "enter/o", cleanRoot: "enter", system: "digestive", meaningEn: "intestine (small)", meaningTr: "Bağırsak (genellikle ince bağırsak)", example: "Enteritis / Enterit", breakdown: "enter/o (ince bağırsak) + -itis = İnce bağırsak iltihabı" },
  { root: "esophag/o", cleanRoot: "esophag", system: "digestive", meaningEn: "esophagus", meaningTr: "Yemek borusu (özofagus)", example: "Esophagitis / Özofajit", breakdown: "esophag/o (yemek borusu) + -itis = Yemek borusu iltihabı" },
  { root: "gastr/o", cleanRoot: "gastr", system: "digestive", meaningEn: "stomach", meaningTr: "Mide", example: "Gastritis / Gastrit", breakdown: "gastr/o (mide) + -itis = Mide iç duvarı iltihabı" },
  { root: "gingiv/o", cleanRoot: "gingiv", system: "digestive", meaningEn: "gum", meaningTr: "Diş eti", example: "Gingivitis / Jinjivit", breakdown: "gingiv/o (diş eti) + -itis = Diş eti iltihaplanması" },
  { root: "gloss/o", cleanRoot: "gloss", system: "digestive", meaningEn: "tongue", meaningTr: "Dil", example: "Glossitis / Glosit", breakdown: "gloss/o (dil) + -itis = Dil iltihabı, dilde şişme ve kızarıklık" },
  { root: "hepat/o", cleanRoot: "hepat", system: "digestive", meaningEn: "liver", meaningTr: "Karaciğer", example: "Hepatomegaly / Hepatomegali", breakdown: "hepat/o (karaciğer) + -megaly (büyüme) = Karaciğerin büyümesi" },
  { root: "ile/o", cleanRoot: "ile", system: "digestive", meaningEn: "ileum", meaningTr: "Kıvrım bağırsak (ileum)", example: "Ileostomy / İleostomi", breakdown: "ile/o (ileum) + -stomy = İnce bağırsağın karın dışına ağızlaştırılması" },
  { root: "intestin/o", cleanRoot: "intestin", system: "digestive", meaningEn: "intestines", meaningTr: "Bağırsaklar", example: "Gastrointestinal", breakdown: "gastr/o (mide) + intestin/o (bağırsaklar) + -al = Mide ve bağırsak sistemiyle ilgili" },
  { root: "jejun/o", cleanRoot: "jejun", system: "digestive", meaningEn: "jejunum", meaningTr: "Boş bağırsak (jejunum)", example: "Jejunostomy / Jejunostomi", breakdown: "jejun/o (jejunum) + -stomy = İnce bağırsağın orta bölümünün dışarı açılması" },
  { root: "labi/o", cleanRoot: "labi", system: "digestive", meaningEn: "lip", meaningTr: "Dudak", example: "Labial / Labiyal", breakdown: "labi/o (dudak) + -al = Dudaklara ait, dudak bölgesi" },
  { root: "lingu/o", cleanRoot: "lingu", system: "digestive", meaningEn: "tongue", meaningTr: "Dil", example: "Sublingual / Sublingual", breakdown: "sub- (alt) + lingu/o (dil) + -al = Dil altından uygulanan ilaç" },
  { root: "odont/o", cleanRoot: "odont", system: "digestive", meaningEn: "teeth", meaningTr: "Diş", example: "Orthodontics / Ortodonti", breakdown: "orth/o (düzgün) + odont/o (diş) + -ics = Çene ve diş düzensizliklerini tedavi eden dal" },
  { root: "or/o", cleanRoot: "or", system: "digestive", meaningEn: "mouth", meaningTr: "Ağız", example: "Oral / Oral", breakdown: "or/o (ağız) + -al = Ağız yoluyla yapılan, ağza ait" },
  { root: "pancreat/o", cleanRoot: "pancreat", system: "digestive", meaningEn: "pancreas", meaningTr: "Pankreas", example: "Pancreatitis / Pankreatit", breakdown: "pancreat/o (pankreas) + -itis = Pankreas organı iltihabı" },
  { root: "pharyng/o", cleanRoot: "pharyng", system: "digestive", meaningEn: "pharynx, throat", meaningTr: "Yutak (farenks)", example: "Pharyngitis / Faranjit", breakdown: "pharyng/o (yutak) + -itis = Yutak iltihabı, boğaz ağrısı" },
  { root: "proct/o", cleanRoot: "proct", system: "digestive", meaningEn: "anus, rectum", meaningTr: "Rektum ve anüs", example: "Proctologist / Proktolog", breakdown: "proct/o (rektum/anüs) + -logist = Rektum ve anüs hastalıkları uzmanı" },
  { root: "pylor/o", cleanRoot: "pylor", system: "digestive", meaningEn: "pylorus", meaningTr: "Pilör kanalı (mide çıkış kapısı)", example: "Pylorospasm / Pilorospazm", breakdown: "pylor/o (pilor) + -spasm = Mide çıkış kaslarının istemsiz kasılması" },
  { root: "rect/o", cleanRoot: "rect", system: "digestive", meaningEn: "rectum", meaningTr: "Düz bağırsak (rektum)", example: "Rectocele / Rektosel", breakdown: "rect/o (rektum) + -cele (fıtık) = Rektumun vajina içine doğru fıtıklaşması" },
  { root: "sial/o", cleanRoot: "sial", system: "digestive", meaningEn: "saliva, salivary gland", meaningTr: "Tükürük, tükürük bezleri", example: "Sialolith / Siyalolit", breakdown: "sial/o (tükürük) + -lith (taş) = Tükürük bezinde taş oluşması" },
  { root: "sigmoid/o", cleanRoot: "sigmoid", system: "digestive", meaningEn: "sigmoid colon", meaningTr: "Sigmoid kolon", example: "Sigmoidoscopy / Sigmoidoskopi", breakdown: "sigmoid/o (sigmoid kolon) + -scopy = Kalın bağırsağın son kısmının incelenmesi" },
  { root: "stomat/o", cleanRoot: "stomat", system: "digestive", meaningEn: "mouth", meaningTr: "Ağız, ağız boşluğu", example: "Stomatitis / Stomatit", breakdown: "stomat/o (ağız) + -itis = Ağız içi mukoza iltihabı, aftlar" },

  // 5. Solunum Sistemi Kökleri (Respiratory System)
  { root: "alveol/o", cleanRoot: "alveol", system: "respiratory", meaningEn: "alveolus, air sac", meaningTr: "Alveol, hava keseciği", example: "Alveolar / Alveoler", breakdown: "alveol/o (hava kesesi) + -ar = Akciğerlerdeki küçük hava kesecikleriyle ilgili" },
  { root: "bronch/o", cleanRoot: "bronch", system: "respiratory", meaningEn: "bronchus", meaningTr: "Bronş", example: "Bronchitis / Bronşit", breakdown: "bronch/o (bronş) + -itis = Bronş kanallarının iltihaplanması" },
  { root: "bronchiol/o", cleanRoot: "bronchiol", system: "respiratory", meaningEn: "bronchiole", meaningTr: "Bronşiyol, küçük bronş", example: "Bronchiolitis / Bronşiyolit", breakdown: "bronchiol/o (bronşçuk) + -itis = En küçük hava yollarının iltihabı" },
  { root: "epiglott/o", cleanRoot: "epiglott", system: "respiratory", meaningEn: "epiglottis", meaningTr: "Epiglot, gırtlak kapağı", example: "Epiglottitis / Epiglotit", breakdown: "epiglott/o (epiglot) + -itis = Gırtlak kapağının iltihabı" },
  { root: "laryng/o", cleanRoot: "laryng", system: "respiratory", meaningEn: "larynx, voice box", meaningTr: "Gırtlak (larenks), ses telleri bölgesi", example: "Laryngospasm / Laringospazm", breakdown: "laryng/o (gırtlak) + -spasm = Ses tellerinin aniden kasılması" },
  { root: "lob/o", cleanRoot: "lob", system: "respiratory", meaningEn: "lobe", meaningTr: "Lob, akciğer lobu", example: "Lobectomy / Lobektomi", breakdown: "lob/o (lob) + -ectomy = Akciğer loblarından birinin cerrahi olarak alınması" },
  { root: "nas/o", cleanRoot: "nas", system: "respiratory", meaningEn: "nose", meaningTr: "Burun", example: "Nasal / Nazal", breakdown: "nas/o (burun) + -al = Burun bölgesi veya burunla ilgili olan" },
  { root: "ox/o", cleanRoot: "ox", system: "respiratory", meaningEn: "oxygen", meaningTr: "Oksijen", example: "Anoxia / Anoksi", breakdown: "an- (yokluk) + ox/o (oksijen) + -ia = Dokularda oksijenin tamamen tükenmesi" },
  { root: "pector/o", cleanRoot: "pector", system: "respiratory", meaningEn: "chest", meaningTr: "Göğüs, göğüs kafesi", example: "Pectoral / Pektoral", breakdown: "pector/o (göğüs) + -al = Göğüs kasları veya göğüs bölgesiyle ilgili" },
  { root: "phren/o", cleanRoot: "phren", system: "respiratory", meaningEn: "diaphragm", meaningTr: "Diyafram, nefes kası", example: "Phrenic / Frenik Sinir", breakdown: "phren/o (diyafram) + -ic = Diyafram kasını uyaran solunum siniri" },
  { root: "pleur/o", cleanRoot: "pleur", system: "respiratory", meaningEn: "pleura, lung membrane", meaningTr: "Plevra, akciğer zarı", example: "Pleurisy / Plevrezi", breakdown: "pleur/o (akciğer zarı) + -isy = Akciğer zarında sıvı toplanması" },
  { root: "pneum/o", cleanRoot: "pneum", system: "respiratory", meaningEn: "air, lung", meaningTr: "Hava, solunum, akciğer", example: "Pneumothorax / Pnömotoraks", breakdown: "pneum/o (hava/akciğer) + -thorax = Akciğer zarları arasında hava birikmesi" },
  { root: "pneumon/o", cleanRoot: "pneumon", system: "respiratory", meaningEn: "lung", meaningTr: "Akciğer", example: "Pneumonia / Zatürre", breakdown: "pneumon/o (akciğer) + -ia = Akciğer dokusunun enfeksiyonu, zatürre" },
  { root: "pulmon/o", cleanRoot: "pulmon", system: "respiratory", meaningEn: "lung", meaningTr: "Akciğer", example: "Pulmonologist / Pulmonolog", breakdown: "pulmon/o (akciğer) + -logist = Göğüs hastalıkları uzmanı hekim" },
  { root: "rhin/o", cleanRoot: "rhin", system: "respiratory", meaningEn: "nose", meaningTr: "Burun", example: "Rhinoplasty / Rinoplasti", breakdown: "rhin/o (burun) + -plasty = Burun şekillendirme ve estetik ameliyatı" },
  { root: "sinus/o", cleanRoot: "sinus", system: "respiratory", meaningEn: "sinus, cavity", meaningTr: "Sinüs, kafa kemiklerindeki boşluk", example: "Sinusitis / Sinüzit", breakdown: "sinus/o (sinüs) + -itis = Sinüs boşluklarının iltihabı" },
  { root: "spir/o", cleanRoot: "spir", system: "respiratory", meaningEn: "breathe", meaningTr: "Nefes almak, soluk almak", example: "Spirometry / Spirometri", breakdown: "spir/o (solunum) + -metry = Akciğer solunum hacmini ölçme testi" },
  { root: "steth/o", cleanRoot: "steth", system: "respiratory", meaningEn: "chest", meaningTr: "Göğüs, toraks", example: "Stethoscope / Steteskop", breakdown: "steth/o (göğüs) + -scope = Vücut içi sesleri dinlemeye yarayan cihaz" },
  { root: "thorac/o", cleanRoot: "thorac", system: "respiratory", meaningEn: "chest", meaningTr: "Göğüs kafesi (toraks)", example: "Thoracentesis / Torasentez", breakdown: "thorac/o (göğüs) + -centesis = Göğüs boşluğundan sıvı çekme işlemi" },
  { root: "tonsill/o", cleanRoot: "tonsill", system: "respiratory", meaningEn: "tonsils", meaningTr: "Bademcikler", example: "Tonsillitis / Tonsillit", breakdown: "tonsill/o (bademcik) + -itis = Bademciklerin iltihaplanıp şişmesi" },
  { root: "trache/o", cleanRoot: "trache", system: "respiratory", meaningEn: "trachea, windpipe", meaningTr: "Soluk borusu (trakea)", example: "Tracheotomy / Trakeotomi", breakdown: "trache/o (soluk borusu) + -tomy = Soluk borusuna cerrahi kesi yapılması" },

  // 6. Dolaşım ve Kan/Lenf Sistemleri Kökleri (Cardiovascular & Hematology)
  { root: "aneurysm/o", cleanRoot: "aneurysm", system: "cardiovascular", meaningEn: "widening, widened blood vessel", meaningTr: "Anevrizma, damar genişlemesi", example: "Aneurysmorrhaphy", breakdown: "aneurysm/o (damar genişlemesi) + -rrhaphy = Genişlemiş damarın dikişle kapatılması" },
  { root: "angi/o", cleanRoot: "angi", system: "cardiovascular", meaningEn: "vessel", meaningTr: "Damar (kan veya lenf damarı)", example: "Angioplasty / Anjiyoplasti", breakdown: "angi/o (damar) + -plasty = Tıkalı damarların balonla/cerrahiyle açılması" },
  { root: "aort/o", cleanRoot: "aort", system: "cardiovascular", meaningEn: "aorta", meaningTr: "Aort (en büyük atardamar)", example: "Aortostenosis / Aortostenoz", breakdown: "aort/o (aort) + -stenosis = Aort damar ağzında daralma" },
  { root: "arter/o", cleanRoot: "arter", system: "cardiovascular", meaningEn: "artery", meaningTr: "Atardamar (arter)", example: "Arterial / Arteriyel", breakdown: "arter/o (atardamar) + -al = Atardamar kan dolaşımıyla ilgili" },
  { root: "arteri/o", cleanRoot: "arteri", system: "cardiovascular", meaningEn: "artery", meaningTr: "Atardamar (arter)", example: "Arteriography / Arteriyografi", breakdown: "arteri/o (atardamar) + -graphy = Atardamar akışının görüntülenmesi" },
  { root: "arteriol/o", cleanRoot: "arteriol", system: "cardiovascular", meaningEn: "arteriole", meaningTr: "Arteriyol, küçük atardamar", example: "Arteriolitis / Arteriyolit", breakdown: "arteriol/o (küçük arter) + -itis = Küçük arter iltihabı" },
  { root: "ather/o", cleanRoot: "ather", system: "cardiovascular", meaningEn: "fatty plaque, yellow", meaningTr: "Yağlı plak tabakası (aterom)", example: "Atherosclerosis / Ateroskleroz", breakdown: "ather/o (yağ plağı) + scler/o (sertleşme) + -osis = Damar sertliği" },
  { root: "atri/o", cleanRoot: "atri", system: "cardiovascular", meaningEn: "atrium", meaningTr: "Atriyum, kalbin kulakçık bölgesi", example: "Atrioventricular / AV", breakdown: "atri/o (kulakçık) + ventricul/o (karıncık) + -ar = Kulakçık ve karıncıklar arası bölge" },
  { root: "cardi/o", cleanRoot: "cardi", system: "cardiovascular", meaningEn: "heart", meaningTr: "Kalp", example: "Cardiology / Kardiyoloji", breakdown: "cardi/o (kalp) + -logy = Kalp hastalıkları ve dolaşım sistemi dalı" },
  { root: "coagul/o", cleanRoot: "coagul", system: "cardiovascular", meaningEn: "coagulation, clotting", meaningTr: "Pıhtılaşma", example: "Coagulopathy / Koagülopati", breakdown: "coagul/o (pıhtılaşma) + -pathy = Kan pıhtılaşma sistemindeki bozukluklar" },
  { root: "coron/o", cleanRoot: "coron", system: "cardiovascular", meaningEn: "crown, heart blood vessels", meaningTr: "Taç, kalbi besleyen damarlar (koroner)", example: "Coronary / Koroner", breakdown: "coron/o (taç) + -ary = Kalbin etrafını taç gibi saran damarlar" },
  { root: "ech/o", cleanRoot: "ech", system: "cardiovascular", meaningEn: "echo, sound waves", meaningTr: "Ses dalgası, yankı", example: "Echocardiogram / EKO", breakdown: "ech/o (ses dalgası) + cardi/o (kalp) + -gram = Kalbin ultrason kaydı" },
  { root: "embol/o", cleanRoot: "embol", system: "cardiovascular", meaningEn: "plug, embolus", meaningTr: "Emboli, pıhtı veya tıkaç", example: "Embolectomy / Embolektomi", breakdown: "embol/o (tıkaç) + -ectomy = Damarı tıkayan pıhtının cerrahiyle alınması" },
  { root: "erythr/o", cleanRoot: "erythr", system: "cardiovascular", meaningEn: "red", meaningTr: "Kırmızı", example: "Erythrocyte / Alyuvar", breakdown: "erythr/o (kırmızı) + -cyte = Kırmızı kan hücresi, alyuvar" },
  { root: "hem/o", cleanRoot: "hem", system: "cardiovascular", meaningEn: "blood", meaningTr: "Kan", example: "Hemoglobin / Hemoglobin", breakdown: "hem/o (kan) + globin = Kana kırmızı rengini veren oksijen proteini" },
  { root: "hemangi/o", cleanRoot: "hemangi", system: "cardiovascular", meaningEn: "blood vessel", meaningTr: "Kan damarları", example: "Hemangioma / Hemanziyom", breakdown: "hemangi/o (kan damarları) + -oma = Kan damarlarından oluşan iyi huylu urlar" },
  { root: "hemat/o", cleanRoot: "hemat", system: "cardiovascular", meaningEn: "blood", meaningTr: "Kan", example: "Hematology / Hematoloji", breakdown: "hemat/o (kan) + -logy = Kan ve kan yapıcı organları inceleyen bilim" },
  { root: "immun/o", cleanRoot: "immun", system: "cardiovascular", meaningEn: "immune, safe", meaningTr: "Bağışıklık, koruma", example: "Immunology / İmmünoloji", breakdown: "immun/o (bağışıklık) + -logy = Bağışıklık sistemini inceleyen bilim" },
  { root: "isch/o", cleanRoot: "isch", system: "cardiovascular", meaningEn: "hold back, block", meaningTr: "Kansızlık, kan akışının engellenmesi", example: "Ischemia / İskemi", breakdown: "isch/o (engelleme) + -emia = Bir organın pıhtı yüzünden kansız kalması" },
  { root: "lymph/o", cleanRoot: "lymph", system: "cardiovascular", meaningEn: "lymph", meaningTr: "Lenf sıvısı", example: "Lymphedema / Lenfödem", breakdown: "lymph/o (lenf) + -edema = Lenf tıkanmasına bağlı kol/bacak şişmesi" },
  { root: "lymphaden/o", cleanRoot: "lymphaden", system: "cardiovascular", meaningEn: "lymph gland/node", meaningTr: "Lenf düğümü (bezi)", example: "Lymphadenopathy / LAP", breakdown: "lymphaden/o (lenf düğümü) + -pathy = Lenf bezlerinin büyümesi" },
  { root: "lymphangi/o", cleanRoot: "lymphangi", system: "cardiovascular", meaningEn: "lymph vessel", meaningTr: "Lenf damarları", example: "Lymphangioma / Lenfanjiyom", breakdown: "lymphangi/o (lenf damarı) + -oma = Lenf damarlarının iyi huylu ur yapısı" },
  { root: "phleb/o", cleanRoot: "phleb", system: "cardiovascular", meaningEn: "vein", meaningTr: "Toplardamar (ven)", example: "Phlebitis / Flebit", breakdown: "phleb/o (toplardamar) + -itis = Toplardamar duvarının iltihaplanması" },
  { root: "splen/o", cleanRoot: "splen", system: "cardiovascular", meaningEn: "spleen", meaningTr: "Dalak", example: "Splenomegaly / Splenomegali", breakdown: "splen/o (dalak) + -megaly = Dalağın anormal ölçüde büyümesi" },
  { root: "tensi/o", cleanRoot: "tensi", system: "cardiovascular", meaningEn: "pressure, tension", meaningTr: "Basınç, tansiyon", example: "Hypertension / Hipertansiyon", breakdown: "hyper- (yüksek) + tensi/o (basınç) + -ion = Yüksek kan basıncı/tansiyon" },
  { root: "thromb/o", cleanRoot: "thromb", system: "cardiovascular", meaningEn: "blood clot, thrombus", meaningTr: "Pıhtı, kan pıhtısı", example: "Thrombolysis / Tromboliz", breakdown: "thromb/o (pıhtı) + -lysis = Pıhtıların ilaçlarla eritilmesi" },
  { root: "vas/o", cleanRoot: "vas", system: "cardiovascular", meaningEn: "vessel, duct", meaningTr: "Damar, kanal, sperm kanalı", example: "Vasodilation / Vazodilatasyon", breakdown: "vas/o (damar) + dilat/o + -ion = Kan damarlarının genişlemesi" },
  { root: "vascul/o", cleanRoot: "vascul", system: "cardiovascular", meaningEn: "vessel", meaningTr: "Damar, damarsal yapı", example: "Cardiovascular", breakdown: "cardi/o (kalp) + vascul/o (damar) + -ar = Kalp ve damar sistemiyle ilgili" },
  { root: "ven/o", cleanRoot: "ven", system: "cardiovascular", meaningEn: "vein", meaningTr: "Toplardamar (ven)", example: "Venography / Venografi", breakdown: "ven/o (toplardamar) + -graphy = Toplardamar sisteminin grafisi" },
  { root: "ventricul/o", cleanRoot: "ventricul", system: "cardiovascular", meaningEn: "ventricle", meaningTr: "Ventrikül, karıncık boşluğu", example: "Ventricular / Ventriküler", breakdown: "ventricul/o (karıncık) + -ar = Kalp veya beyin karıncıklarıyla ilgili" },
  { root: "venul/o", cleanRoot: "venul", system: "cardiovascular", meaningEn: "venule", meaningTr: "Venül, küçük toplardamar", example: "Venulitis / Venülit", breakdown: "venul/o (küçük ven) + -itis = Küçük toplardamar iltihabı" },

  // 7. Hareket Sistemi Kökleri (Musculoskeletal System)
  { root: "ankyl/o", cleanRoot: "ankyl", system: "musculoskeletal", meaningEn: "stiffness, bent, crooked", meaningTr: "Eklemlerde katılık, bükülmüş, kambur", example: "Ankylosing Spondylitis", breakdown: "ankyl/o (katılık) + spondyl/o (omur) + -itis = Omur eklemlerinin sertleşmesi" },
  { root: "arthr/o", cleanRoot: "arthr", system: "musculoskeletal", meaningEn: "joint", meaningTr: "Eklem", example: "Arthritis / Artrit", breakdown: "arthr/o (eklem) + -itis = Eklemlerde meydana gelen iltihaplanma" },
  { root: "calcane/o", cleanRoot: "calcane", system: "musculoskeletal", meaningEn: "calcaneum, heel bone", meaningTr: "Topuk kemiği (kalkaneus)", example: "Calcaneal Spur", breakdown: "calcane/o (topuk) + -al = Topuk kemiğinde oluşan kemik dikeni" },
  { root: "carp/o", cleanRoot: "carp", system: "musculoskeletal", meaningEn: "carpus, wrist bones", meaningTr: "El bileği kemikleri (karpal)", example: "Metacarpal / Metakarpal", breakdown: "meta- (ötesi) + carp/o (bilek) + -al = El bileğinden sonra gelen tarak kemikleri" },
  { root: "chondr/o", cleanRoot: "chondr", system: "musculoskeletal", meaningEn: "cartilage", meaningTr: "Kıkırdak", example: "Chondromalacia / Kondromalazi", breakdown: "chondr/o (kıkırdak) + -malacia (yumuşama) = Eklem kıkırdağının aşınması" },
  { root: "clavicul/o", cleanRoot: "clavicul", system: "musculoskeletal", meaningEn: "clavicle, collarbone", meaningTr: "Köprücük kemiği (klavikula)", example: "Supraclavicular", breakdown: "supra- (üstünde) + clavicul/o (köprücük) + -ar = Köprücük kemiğinin hemen üstü" },
  { root: "coccyg/o", cleanRoot: "coccyg", system: "musculoskeletal", meaningEn: "coccyx, tailbone", meaningTr: "Kuyruk sokumu kemiği (koksiks)", example: "Coccygeal / Koksigeal", breakdown: "coccyg/o (kuyruk sokumu) + -eal = Kuyruk sokumu bölgesine ait" },
  { root: "cost/o", cleanRoot: "cost", system: "musculoskeletal", meaningEn: "ribs", meaningTr: "Kaburga kemikleri (kosta)", example: "Intercostal / İnterkostal", breakdown: "inter- (arasında) + cost/o (kaburga) + -al = İki kaburga kemiği arasındaki kaslar" },
  { root: "dactyl/o", cleanRoot: "dactyl", system: "musculoskeletal", meaningEn: "fingers, toes", meaningTr: "El veya ayak parmakları", example: "Dactylomegaly / Daktilomegali", breakdown: "dactyl/o (parmak) + -megaly = Parmakların aşırı büyük olması" },
  { root: "ethm/o", cleanRoot: "ethm", system: "musculoskeletal", meaningEn: "sieve, ethmoid bone", meaningTr: "Kalbur, kalbur kemiği (etmoid kemik)", example: "Ethmoidal / Etmoidal", breakdown: "ethm/o (kalbur) + -oid + -al = Burun tavanındaki kalbursu kemikle ilgili" },
  { root: "faci/o", cleanRoot: "faci", system: "musculoskeletal", meaningEn: "face", meaningTr: "Yüz, çehre", example: "Facial / Fasiyel", breakdown: "faci/o (yüz) + -al = Yüz bölgesiyle ilgili, yüze ait" },
  { root: "fasci/o", cleanRoot: "fasci", system: "musculoskeletal", meaningEn: "fascia", meaningTr: "Fasya, kasları saran zar", example: "Fasciotomy / Fasyotomi", breakdown: "fasci/o (fasya) + -tomy = Basıncı azaltmak için kas zarının kesilmesi" },
  { root: "femor/o", cleanRoot: "femor", system: "musculoskeletal", meaningEn: "femur, thigh bone", meaningTr: "Uyluk kemiği (femur)", example: "Femoral / Femoral", breakdown: "femor/o (uyluk) + -al = Uyluk kemiği veya bölgesiyle ilgili" },
  { root: "fibul/o", cleanRoot: "fibul", system: "musculoskeletal", meaningEn: "fibula", meaningTr: "Kaval kemiği dışındaki ince kemik (fibula)", example: "Fibulocalcaneal", breakdown: "fibul/o (fibula) + calcane/o (topuk) + -al = Fibula ve topuk kemiğiyle ilgili" },
  { root: "front/o", cleanRoot: "front", system: "musculoskeletal", meaningEn: "forehead, frontal bone", meaningTr: "Alın, alın kemiği (frontal kemik)", example: "Frontal / Frontal", breakdown: "front/o (alın) + -al = Alın bölgesine veya kemiğine ait" },
  { root: "humer/o", cleanRoot: "humer", system: "musculoskeletal", meaningEn: "humerus, upper arm bone", meaningTr: "Kol kemiği, pazı kemiği (humerus)", example: "Humeroscapular", breakdown: "humer/o (kol kemiği) + scapul/o (kürek) + -ar = Üst kol kemiği ile kürek kemiğiyle ilgili" },
  { root: "ili/o", cleanRoot: "ili", system: "musculoskeletal", meaningEn: "ilium", meaningTr: "Leğen kemiği kanadı (ilyum)", example: "Iliopelvic / İliyopelvik", breakdown: "ili/o (ilyum) + pelv/i (pelvis) + -ic = Kalça kemiği kanadı ve leğen boşluğu" },
  { root: "ischi/o", cleanRoot: "ischi", system: "musculoskeletal", meaningEn: "ischium", meaningTr: "Kalçadaki oturak kemiği (iskiyum)", example: "Ischialgia / İskiyalji", breakdown: "ischi/o (oturak kemiği) + -algia = Oturak kemiği ve kalça çevresinde ağrı" },
  { root: "kinesi/o", cleanRoot: "kinesi", system: "musculoskeletal", meaningEn: "movement", meaningTr: "Fiziksel hareket", example: "Kinesiology / Kinesiyoloji", breakdown: "kinesi/o (hareket) + -logy = Vücut hareketlerini inceleyen bilim" },
  { root: "kyph/o", cleanRoot: "kyph", system: "musculoskeletal", meaningEn: "humpback, bent", meaningTr: "Kamburluk (kifoz)", example: "Kyphosis / Kifoz", breakdown: "kyph/o (kambur) + -osis = Omurganın dışa doğru bükülmesi" },
  { root: "lamin/o", cleanRoot: "lamin", system: "musculoskeletal", meaningEn: "lamina (vertebral arch)", meaningTr: "Omur kemiğinin arka plakası (lamina)", example: "Laminectomy / Laminektomi", breakdown: "lamin/o (lamina) + -ectomy = Omurilik baskısını gidermek için laminanın alınması" },
  { root: "leiomy/o", cleanRoot: "leiomy", system: "musculoskeletal", meaningEn: "smooth muscle (visceral)", meaningTr: "Düz kas (istemsiz kaslar)", example: "Leiomyoma / Leyomiyom", breakdown: "leiomy/o (düz kas) + -oma = Rahim gibi organların düz kasından gelişen ur" },
  { root: "lord/o", cleanRoot: "lord", system: "musculoskeletal", meaningEn: "curve, swayback", meaningTr: "Çukurluk, bel omurgasının içe bükülmesi", example: "Lordosis / Lordoz", breakdown: "lord/o (içe bükük) + -osis = Bel omurgasının anormal şekilde içe çökmesi" },
  { root: "lumb/o", cleanRoot: "lumb", system: "musculoskeletal", meaningEn: "loins, lower back", meaningTr: "Bel ve alt sırt bölgesi", example: "Lumbar / Lomber", breakdown: "lumb/o (bel) + -ar = Bel omurları ve sırtın alt kısmı ile ilgili" },
  { root: "mandibul/o", cleanRoot: "mandibul", system: "musculoskeletal", meaningEn: "mandible, lower jaw bone", meaningTr: "Alt çene kemiği (mandibula)", example: "Mandibular / Mandibular", breakdown: "mandibul/o (alt çene) + -ar = Alt çene kemiğine ait olan" },
  { root: "maxill/o", cleanRoot: "maxill", system: "musculoskeletal", meaningEn: "maxilla, upper jaw bone", meaningTr: "Üst çene kemiği (maksilla)", example: "Maxillary / Maksiller", breakdown: "maxill/o (üst çene) + -ary = Üst çene kemiği ile ilgili" },
  { root: "metacarp/o", cleanRoot: "metacarp", system: "musculoskeletal", meaningEn: "metacarpus", meaningTr: "El tarak kemikleri (metakarp)", example: "Metacarpectomy", breakdown: "metacarp/o (el tarağı) + -ectomy = El tarak kemiğinin çıkarılması" },
  { root: "metatars/o", cleanRoot: "metatars", system: "musculoskeletal", meaningEn: "metatarsus", meaningTr: "Ayak tarak kemikleri (metatars)", example: "Metatarsalgia / Metatarsalji", breakdown: "metatars/o (ayak tarağı) + -algia = Ayak tarak kemiklerinde ağrı" },
  { root: "muscul/o", cleanRoot: "muscul", system: "musculoskeletal", meaningEn: "muscle", meaningTr: "Kas, kas dokusu", example: "Musculoskeletal", breakdown: "muscul/o (kas) + skelet/o (iskelet) + -al = Kas ve iskelet sistemlerinin bütünü" },
  { root: "my/o", cleanRoot: "my", system: "musculoskeletal", meaningEn: "muscle", meaningTr: "Kas, kas yapısı", example: "Myalgia / Miyalji", breakdown: "my/o (kas) + -algia = Yaygın kas ağrısı durumu" },
  { root: "myos/o", cleanRoot: "myos", system: "musculoskeletal", meaningEn: "muscle", meaningTr: "Kas, kas lifleri", example: "Myositis / Miyozit", breakdown: "myos/o (kas) + -itis = Kas liflerinin kronik iltihaplanması" },
  { root: "occipit/o", cleanRoot: "occipit", system: "musculoskeletal", meaningEn: "occiput, back of head", meaningTr: "Oksipital bölge, başın arka kısmı/kemiği", example: "Occipital / Oksipital", breakdown: "occipit/o (başın arkası) + -al = Başın arka tarafıyla ilgili" },
  { root: "olecran/o", cleanRoot: "olecran", system: "musculoskeletal", meaningEn: "olecranon, elbow", meaningTr: "Dirsek çıkıntısı (olekranon)", example: "Olecranal / Olekranal", breakdown: "olecran/o (dirsek ucu) + -al = Dirsek kemiğinin arkadaki büyük çıkıntısıyla ilgili" },
  { root: "orth/o", cleanRoot: "orth", system: "musculoskeletal", meaningEn: "straight, correct", meaningTr: "Düzgün, dik, doğru, düzeltilmiş", example: "Orthopedics / Ortopedi", breakdown: "orth/o (düzgün) + ped/o + -ics = Kas-iskelet sistemi deformitelerini düzelten dal" },
  { root: "osse/o", cleanRoot: "osse", system: "musculoskeletal", meaningEn: "bone, bony", meaningTr: "Kemik, kemiksi", example: "Osseous / Osseöz", breakdown: "osse/o (kemik) + -ous = Kemik dokusu içeren, kemiksi yapı" },
  { root: "oste/o", cleanRoot: "oste", system: "musculoskeletal", meaningEn: "bone", meaningTr: "Kemik", example: "Osteosarcoma / Osteosarkom", breakdown: "oste/o (kemik) + -sarcoma = Kemik dokusundan köken alan kemik kanseri" },
  { root: "pariet/o", cleanRoot: "pariet", system: "musculoskeletal", meaningEn: "wall, parietal bone", meaningTr: "Duvar, kafa yan kemiği (parietal kemik)", example: "Parietal / Paryetal", breakdown: "pariet/o (duvar) + -al = Kafatasının üst-yan kemiğiyle ilgili" },
  { root: "patell/o", cleanRoot: "patell", system: "musculoskeletal", meaningEn: "patella, kneecap", meaningTr: "Diz kapağı kemiği (patella)", example: "Patellectomy / Patellektomi", breakdown: "patell/o (diz kapağı) + -ectomy = Diz kapağının çıkarılması" },
  { root: "ped/o", cleanRoot: "ped", system: "musculoskeletal", meaningEn: "child; foot", meaningTr: "Çocuk; Ayak", example: "Pediatrics / Pediatri", breakdown: "ped/o (çocuk) + -iatry = Çocuk sağlığı ve hastalıkları tıp dalı" },
  { root: "pelv/i", cleanRoot: "pelv", system: "musculoskeletal", meaningEn: "pelvis", meaningTr: "Pelvis, leğen kemiği haznesi", example: "Pelvimeter / Pelvimetre", breakdown: "pelv/i (leğen kemiği) + -meter = Doğum öncesi çatı çapını ölçen alet" },
  { root: "phalang/o", cleanRoot: "phalang", system: "musculoskeletal", meaningEn: "phalanges", meaningTr: "El ve ayak parmak kemikleri (falanks)", example: "Phalangectomy", breakdown: "phalang/o (parmak kemiği) + -ectomy = Parmak kemiği ekleminin çıkarılması" },
  { root: "pub/o", cleanRoot: "pub", system: "musculoskeletal", meaningEn: "pubis", meaningTr: "Ön kalça kemiği (pubis)", example: "Pubofemoral", breakdown: "pub/o (pubis) + femor/o (uyluk) + -al = Pubis kemiği ile uyluk kemiği arası bağlar" },
  { root: "rhabd/o", cleanRoot: "rhabd", system: "musculoskeletal", meaningEn: "rod-shaped, striated", meaningTr: "Silindirik, çizgili doku", example: "Rhabdoid / Rabdoid", breakdown: "rhabd- (silindirik) + -oid = Silindirik yapıda olan, çubuksu benzer" },
  { root: "rhabdomy/o", cleanRoot: "rhabdomy", system: "musculoskeletal", meaningEn: "striated skeletal muscle", meaningTr: "İskelet kası (çizgili kaslar)", example: "Rhabdomyolysis / Rabdomiyoliz", breakdown: "rhabdomy/o (çizgili kas) + -lysis = Ağır egzersiz veya ezilme sonucu kas erimesi" },
  { root: "sacr/o", cleanRoot: "sacr", system: "musculoskeletal", meaningEn: "sacrum", meaningTr: "Sağrı kemiği (sakrum)", example: "Sacralgia / Sakralji", breakdown: "sacr/o (sağrı) + -algia = Sağrı kemiği bölgesinde hissedilen ağrı" },
  { root: "scapul/o", cleanRoot: "scapul", system: "musculoskeletal", meaningEn: "scapula, shoulder blade", meaningTr: "Kürek kemiği (skapula)", example: "Scapulopexy / Skapulopeksi", breakdown: "scapul/o (kürek kemiği) + -pexy = Çıkık kürek kemiğinin sabitlenmesi" },
  { root: "scoli/o", cleanRoot: "scoli", system: "musculoskeletal", meaningEn: "crooked, curved, bent", meaningTr: "Eğri, bükülmüş, eğrilik", example: "Scoliosis / Skolyoz", breakdown: "scoli/o (eğri) + -osis = Omurganın yana doğru anormal eğriliği" },
  { root: "sphen/o", cleanRoot: "sphen", system: "musculoskeletal", meaningEn: "wedge, sphenoid bone", meaningTr: "Kama, kama kemiği (sfenoid kemik)", example: "Sphenoid / Sfenoid", breakdown: "sphen/o (kama) + -oid = Kafa tabanındaki kama kemiğine benzer" },
  { root: "spin/o", cleanRoot: "spin", system: "musculoskeletal", meaningEn: "spine, backbone", meaningTr: "Omurga, bel kemiği", example: "Spinal / Spinal", breakdown: "spin/o (omurga) + -al = Omurga sistemi veya omurilik kanalıyla ilgili" },
  { root: "stern/o", cleanRoot: "stern", system: "musculoskeletal", meaningEn: "sternum, breastbone", meaningTr: "Göğüs kafesi ön kemiği (sternum)", example: "Sternotomy / Sternotomi", breakdown: "stern/o (göğüs kemiği) + -tomy = İman tahtasının kesilerek açılması" },
  { root: "synov/o", cleanRoot: "synov", system: "musculoskeletal", meaningEn: "synovial membrane/fluid", meaningTr: "Eklem sıvısı kılıfı (sinovya)", example: "Synovitis / Sinovit", breakdown: "synov/o (eklem sıvısı zarı) + -itis = Eklem içi kayganlaştırıcı zarın iltihabı" },
  { root: "tempor/o", cleanRoot: "tempor", system: "musculoskeletal", meaningEn: "temple, temporal bone", meaningTr: "Şakak, şakak kemiği (temporal kemik)", example: "Temporomandibular", breakdown: "tempor/o (şakak) + mandibul/o (alt çene) + -ar = Şakak ve alt çene eklemiyle ilgili" },
  { root: "ten/o", cleanRoot: "ten", system: "musculoskeletal", meaningEn: "tendon", meaningTr: "Kiriş, kas bağı (tendon)", example: "Tenodesis / Tenodez", breakdown: "ten/o (tendon) + -desis = Kopan tendonun kemiğe dikilip tutturulması" },
  { root: "tendin/o", cleanRoot: "tendin", system: "musculoskeletal", meaningEn: "tendon", meaningTr: "Kiriş, kas bağı (tendon)", example: "Tendinitis / Tendinit", breakdown: "tendin/o (tendon) + -itis = Zorlanmaya bağlı tendon kılıfı iltihabı" },
  { root: "tibi/o", cleanRoot: "tibi", system: "musculoskeletal", meaningEn: "tibia", meaningTr: "Kaval kemiğinin kalını (tibia)", example: "Tibiofemoral", breakdown: "tibi/o (kaval kemiği) + femor/o (uyluk) + -al = Kaval kemiği ve uyluk kemiği eklemi" },
  { root: "uln/o", cleanRoot: "uln", system: "musculoskeletal", meaningEn: "ulna", meaningTr: "Ulna kemiği, ön kolun iç kemiği (dirsek kemiği)", example: "Ulnar / Ulnar", breakdown: "uln/o (ulna) + -ar = Dirsek kemiği/ulna ile ilgili" },
  { root: "vertebr/o", cleanRoot: "vertebr", system: "musculoskeletal", meaningEn: "vertebra, backbone", meaningTr: "Omur kemiği (vertebra)", example: "Vertebrectomy", breakdown: "vertebr/o (omur) + -ectomy = Hasarlı omur gövdesinin çıkarılması" },
  { root: "xiph/o", cleanRoot: "xiph", system: "musculoskeletal", meaningEn: "sword, xiphoid process", meaningTr: "Kılıç, sternumun alt ucu (ksifoid)", example: "Xiphoid / Ksifoid", breakdown: "xiph/o (kılıç) + -oid = Göğüs kemiğinin kılıç şeklindeki alt ucu" },
  { root: "zygomat/o", cleanRoot: "zygomat", system: "musculoskeletal", meaningEn: "zygoma, cheekbone", meaningTr: "Elmacık kemiği (zigomatik kemik)", example: "Zygomatic / Zigomatik", breakdown: "zygomat/o (elmacık) + -ic = Elmacık kemiğiyle ilgili" },

  // 8. Ürogenital Sistem Kökleri (Genitourinary System)
  { root: "amni/o", cleanRoot: "amni", system: "genitourinary", meaningEn: "amnion, amniotic sac", meaningTr: "Amniyon kesesi (bebeğin sıvısının olduğu zar)", example: "Amniocentesis / Amniyosentez", breakdown: "amni/o (amniyon) + -centesis = Anne karnından bebeğin suyundan örnek alınması" },
  { root: "cervic/o", cleanRoot: "cervic", system: "genitourinary", meaningEn: "neck, cervix", meaningTr: "Boyun, rahim ağzı (serviks)", example: "Cervicitis / Servisit", breakdown: "cervic/o (rahim ağzı) + -itis = Rahim ağzı bölgesinin iltihaplanması" },
  { root: "colp/o", cleanRoot: "colp", system: "genitourinary", meaningEn: "vagina", meaningTr: "Vajina, hazne", example: "Colpocleisis / Kolpokleizis", breakdown: "colp/o (vajina) + -cleisis = Vajinal kanalın ameliyatla kapatılması" },
  { root: "cyst/o", cleanRoot: "cyst", system: "genitourinary", meaningEn: "bladder", meaningTr: "Mesane (idrar torbası), kist boşluğu", example: "Cystoscopy / Sistoskopi", breakdown: "cyst/o (mesane) + -scopy = İdrar torbasının kameralı incelenmesi" },
  { root: "galact/o", cleanRoot: "galact", system: "genitourinary", meaningEn: "milk", meaningTr: "Anne sütü", example: "Galactorrhea / Galaktore", breakdown: "galact/o (süt) + -rrhea (akıntı) = Memelerden istemsiz süt gelmesi" },
  { root: "glomerul/o", cleanRoot: "glomerul", system: "genitourinary", meaningEn: "glomerulus", meaningTr: "Glomerül (böbrek süzme yumakları)", example: "Glomerulonephritis", breakdown: "glomerul/o + nephr/o (böbrek) + -itis = Böbrek süzme ünitelerinin iltihabı" },
  { root: "gonad/o", cleanRoot: "gonad", system: "genitourinary", meaningEn: "gonads, sex glands", meaningTr: "Üreme bezleri, yumurtalık ve testisler", example: "Gonadotropin", breakdown: "gonad/o (üreme bezi) + tropin = Üreme bezlerini çalıştıran hormonlar" },
  { root: "gynec/o", cleanRoot: "gynec", system: "genitourinary", meaningEn: "female, woman", meaningTr: "Kadın, kadın hastalıkları", example: "Gynecology / Jinekoloji", breakdown: "gynec/o (kadın) + -logy = Kadın üreme sağlığı ve hastalıkları bilim dalı" },
  { root: "hyster/o", cleanRoot: "hyster", system: "genitourinary", meaningEn: "uterus, womb", meaningTr: "Rahim, döl yatağı (uterus)", example: "Hysterectomy / Histerektomi", breakdown: "hyster/o (rahim) + -ectomy = Rahmin ameliyatla tamamen çıkarılması" },
  { root: "lact/o", cleanRoot: "lact", system: "genitourinary", meaningEn: "milk", meaningTr: "Süt, laktik asit", example: "Lactation / Laktasyon", breakdown: "lact/o (süt) + -ation = Doğum sonrası memelerin süt salgılama süreci" },
  { root: "mamm/o", cleanRoot: "mamm", system: "genitourinary", meaningEn: "breast", meaningTr: "Meme dokusu", example: "Mammography / Mammografi", breakdown: "mamm/o (meme) + -graphy = Meme kanseri tarama röntgeni" },
  { root: "mast/o", cleanRoot: "mast", system: "genitourinary", meaningEn: "breast", meaningTr: "Meme dokusu", example: "Mastitis / Mastit", breakdown: "mast/o (meme) + -itis = Emziren annelerde meme dokusu iltihabı" },
  { root: "metr/o", cleanRoot: "metr", system: "genitourinary", meaningEn: "uterus, womb", meaningTr: "Rahim, uterus duvarı", example: "Myometrium / Miyometriyum", breakdown: "my/o (kas) + metr/o (rahim) + -ium = Rahmin kalın kas duvarı tabakası" },
  { root: "nephr/o", cleanRoot: "nephr", system: "genitourinary", meaningEn: "kidney", meaningTr: "Böbrek", example: "Nephrologist / Nefrolog", breakdown: "nephr/o (böbrek) + -logist = Böbrek hastalıkları uzman hekimi" },
  { root: "oestr/o", cleanRoot: "oestr", system: "genitourinary", meaningEn: "estrogen", meaningTr: "Östrojen hormonu, dişi", example: "Estrogenic / Estrojenik", breakdown: "oestr/o (östrojen) + -genic = Östrojen hormonu salgılanmasını uyarıcı" },
  { root: "oophor/o", cleanRoot: "oophor", system: "genitourinary", meaningEn: "ovary", meaningTr: "Yumurtalık (over)", example: "Oophoritis / Ooforit", breakdown: "oophor/o (yumurtalık) + -itis = Kadın yumurtalıklarının iltihabı" },
  { root: "orchid/o", cleanRoot: "orchid", system: "genitourinary", meaningEn: "testis", meaningTr: "Erbezi, testis", example: "Orchidopexy / Orşidopeksi", breakdown: "orchid/o (testis) + -pexy = İnmemiş testisin torbaya indirilip dikilmesi" },
  { root: "ren/o", cleanRoot: "ren", system: "genitourinary", meaningEn: "kidney", meaningTr: "Böbrek", example: "Renal Failure", breakdown: "ren/o (böbrek) + -al = Böbrek yetmezliği, böbrekle ilgili" },
  { root: "salping/o", cleanRoot: "salping", system: "genitourinary", meaningEn: "tube (fallopian)", meaningTr: "Tüp (rahim tüpleri/fallop tüpleri)", example: "Salpingectomy / Salpenjektomi", breakdown: "salping/o (tüp) + -ectomy = Dış gebelikte tüpün ameliyatla alınması" },
  { root: "ur/o", cleanRoot: "ur", system: "genitourinary", meaningEn: "urine, urinary tract", meaningTr: "İdrar, idrar yolları", example: "Urology / Üroloji", breakdown: "ur/o (idrar) + -logy = İdrar yolları ve erkek üreme sistemi tıp dalı" },
  { root: "ureter/o", cleanRoot: "ureter", system: "genitourinary", meaningEn: "ureter", meaningTr: "Böbreği mesaneye bağlayan idrar borusu (üreter)", example: "Ureterolith / Üreterolitiyazis", breakdown: "ureter/o (üreter) + lith (taş) + -iasis = Üreter kanalında taş bulunması" },
  { root: "urethr/o", cleanRoot: "urethr", system: "genitourinary", meaningEn: "urethra", meaningTr: "İdrarı dışarı atan kanal (üretra)", example: "Urethritis / Üretrit", breakdown: "urethr/o (üretra) + -itis = İdrar dış kanalının iltihabı, yanma" },
  { root: "uter/o", cleanRoot: "uter", system: "genitourinary", meaningEn: "uterus, womb", meaningTr: "Rahim (uterus)", example: "Uterine / Uterin", breakdown: "uter/o (rahim) + -ine = Rahme ait, rahim içiyle ilgili" },
  { root: "vagin/o", cleanRoot: "vagin", system: "genitourinary", meaningEn: "vagina", meaningTr: "Vajina", example: "Vaginitis / Vajinit", breakdown: "vagin/o (vajina) + -itis = Vajinal enfeksiyon ve iltihaplanma" },
  { root: "vesic/o", cleanRoot: "vesic", system: "genitourinary", meaningEn: "bladder", meaningTr: "Mesane (idrar kesesi)", example: "Vesical / Vezikal", breakdown: "vesic/o (idrar kesesi) + -al = İdrar torbasına ait olan" },

  // 9. Sinir ve Endokrin Sistem Kökleri (Nervous & Endocrine Systems)
  { root: "adren/o", cleanRoot: "adren", system: "nervous_endocrine", meaningEn: "adrenal glands", meaningTr: "Böbreküstü bezleri (adrenal bezler)", example: "Adrenomegaly / Adrenomegali", breakdown: "adren/o (böbreküstü bezi) + -megaly = Böbreküstü bezinin büyümesi" },
  { root: "adrenal/o", cleanRoot: "adrenal", system: "nervous_endocrine", meaningEn: "adrenal glands", meaningTr: "Böbreküstü bezleri", example: "Adrenalectomy / Adrenalektomi", breakdown: "adrenal/o (böbreküstü bezi) + -ectomy = Böbreküstü bezlerinin çıkarılması" },
  { root: "anxi/o", cleanRoot: "anxi", system: "nervous_endocrine", meaningEn: "anxiety", meaningTr: "Kaygı, endişe, kuruntu", example: "Anxiolytic / Anksiyolitik", breakdown: "anxi/o (kaygı) + -lytic (çözücü) = Kaygıyı gideren sakinleştirici ilaçlar" },
  { root: "cerebr/o", cleanRoot: "cerebr", system: "nervous_endocrine", meaningEn: "cerebrum, brain", meaningTr: "Büyük beyin (serebrum)", example: "Cerebrospinal / BOS", breakdown: "cerebr/o (beyin) + spin/o (omurilik) + -al = Beyin ve omurilik sıvısı" },
  { root: "crin/o", cleanRoot: "crin", system: "nervous_endocrine", meaningEn: "secrete", meaningTr: "Salgılamak, salgı", example: "Endocrine / Endokrin", breakdown: "endo- (iç) + -crine (salgı) = İç salgılı hormon bezleri sistemi" },
  { root: "dendr/o", cleanRoot: "dendr", system: "nervous_endocrine", meaningEn: "tree, branching", meaningTr: "Ağaçsı, dal gösteren, dendrit", example: "Dendroid / Dendroid", breakdown: "dendr/o (ağaçsı) + -oid = Sinir hücresi gibi ağaç şeklinde dallanan" },
  { root: "encephal/o", cleanRoot: "encephal", system: "nervous_endocrine", meaningEn: "brain", meaningTr: "Beyin (tüm kafa içi beyin dokusu)", example: "Encephalitis / Ensefalit", breakdown: "encephal/o (beyin) + -itis = Beyin dokusunun enfeksiyonu, beyin iltihabı" },
  { root: "esthesi/o", cleanRoot: "esthesi", system: "nervous_endocrine", meaningEn: "feeling, sensation", meaningTr: "Ağrı duyumu, his", example: "Anesthesiology / Anesteziyoloji", breakdown: "an- (yokluk) + esthesi/o (duyum) + -logy = Ameliyat hissini yok eden anestezi dalı" },
  { root: "gangli/o", cleanRoot: "gangli", system: "nervous_endocrine", meaningEn: "ganglion (knot mass)", meaningTr: "Sinir düğümü (gangliyon)", example: "Ganglionitis / Gangliyonit", breakdown: "gangli/o (sinir düğümü) + -itis = Sinir düğümünün iltihaplanması" },
  { root: "gli/o", cleanRoot: "gli", system: "nervous_endocrine", meaningEn: "glue, neuroglial tissue", meaningTr: "Glia, sinir sisteminin destek dokusu", example: "Glioma / Gliyom", breakdown: "gli/o (destek hücresi) + -oma = Sinir destek hücrelerinden kaynaklanan tümör" },
  { root: "gluc/o", cleanRoot: "gluc", system: "nervous_endocrine", meaningEn: "sugar, sweetness", meaningTr: "Glikoz, kan şekeri, tatlı", example: "Glucodermal / Glikodermal", breakdown: "gluc/o (şeker) + derm/o (deri) + -al = Deride glikoz depolanmasıyla ilgili" },
  { root: "glyc/o", cleanRoot: "glyc", system: "nervous_endocrine", meaningEn: "sugar", meaningTr: "Şeker, tatlı", example: "Glycemia / Glisemi", breakdown: "glyc/o (şeker) + -emia = Kandaki şeker oranı/durumu" },
  { root: "glycos/o", cleanRoot: "glycos", system: "nervous_endocrine", meaningEn: "sugar", meaningTr: "Glikoz, idrarda şeker", example: "Glycosuria / Glikozüri", breakdown: "glycos/o (şeker) + -uria = İdrarda anormal şekilde şeker bulunması" },
  { root: "hypn/o", cleanRoot: "hypn", system: "nervous_endocrine", meaningEn: "sleep", meaningTr: "Uyku", example: "Hypnotic / Hipnotik İlaçlar", breakdown: "hypn/o (uyku) + -tic = Uyku yapıcı, uyutucu ilaçlar" },
  { root: "insulin/o", cleanRoot: "insulin", system: "nervous_endocrine", meaningEn: "insulin", meaningTr: "İnsülin hormonu", example: "Hyperinsulinism", breakdown: "hyper- (aşırı) + insulin/o (insülin) + -ism = Kanda aşırı miktarda insülin bulunması" },
  { root: "iod/o", cleanRoot: "iod", system: "nervous_endocrine", meaningEn: "iodine", meaningTr: "İyot", example: "Iododerma / İyotoderma", breakdown: "iod/o (iyot) + derm/o (deri) + -a = Aşırı iyot alımına bağlı cilt lezyonları" },
  { root: "lex/o", cleanRoot: "lex", system: "nervous_endocrine", meaningEn: "word, phrase, reading", meaningTr: "Kelime, söz, okuma", example: "Dyslexia / Disleksi", breakdown: "dys- (bozuk/zor) + lex/o (kelime/okuma) + -ia = Öğrenme ve okuma güçlüğü durumu" },
  { root: "mening/o", cleanRoot: "mening", system: "nervous_endocrine", meaningEn: "meninges", meaningTr: "Menenj, beyin zarları", example: "Meningitis / Menenjit", breakdown: "mening/o (beyin zarları) + -itis = Beyin ve omurilik zarlarının iltihabı" },
  { root: "meningi/o", cleanRoot: "meningi", system: "nervous_endocrine", meaningEn: "meninges", meaningTr: "Menenj, beyin zarları", example: "Meningioma / Menenjiyom", breakdown: "meningi/o (beyin zarı) + -oma = Beyin zarından köken alan iyi huylu tümör" },
  { root: "ment/o", cleanRoot: "ment", system: "nervous_endocrine", meaningEn: "mind", meaningTr: "Akıl, zihin", example: "Mental / Mental", breakdown: "ment/o (zihin) + -al = Zihinsel gelişim veya akılla ilgili olan" },
  { root: "myel/o", cleanRoot: "myel", system: "nervous_endocrine", meaningEn: "spinal cord, bone marrow", meaningTr: "Omurilik, kemik iliği", example: "Myelitis / Miyelit", breakdown: "myel/o (omurilik) + -itis = Omurilik dokusunun iltihaplanması" },
  { root: "neur/o", cleanRoot: "neur", system: "nervous_endocrine", meaningEn: "nerve", meaningTr: "Sinir, sinir hücresi", example: "Neurology / Nöroloji", breakdown: "neur/o (sinir) + -logy = Beyin, omurilik ve sinir sistemi tıp dalı" },
  { root: "parathyroid/o", cleanRoot: "parathyroid", system: "nervous_endocrine", meaningEn: "parathyroid glands", meaningTr: "Paratiroit bezleri (kalsiyum bezleri)", example: "Parathyroidectomy", breakdown: "parathyroid/o + -ectomy = Paratiroit bezlerinin çıkarılması" },
  { root: "psych/o", cleanRoot: "psych", system: "nervous_endocrine", meaningEn: "mind", meaningTr: "Ruh, akıl, zihin", example: "Psychosis / Psikoz", breakdown: "psych/o (zihin/ruh) + -osis = Gerçeklikle bağın koptuğu akıl hastalığı" },
  { root: "thyr/o", cleanRoot: "thyr", system: "nervous_endocrine", meaningEn: "thyroid gland", meaningTr: "Tiroit bezi (kalkan bezi)", example: "Euthyroid / Ötiroid", breakdown: "eu- (normal) + thyr/o (tiroit) = Tiroit bezinin normal çalışması" },
  { root: "thyroid/o", cleanRoot: "thyroid", system: "nervous_endocrine", meaningEn: "thyroid gland", meaningTr: "Tiroit bezi", example: "Thyroiditis / Tiroidit", breakdown: "thyroid/o (tiroit) + -itis = Tiroit bezinin iltihaplanması" },

  // 10. Duyu Organları Kökleri (Special Senses - Eye & Ear)
  { root: "acoust/o", cleanRoot: "acoust", system: "special_senses", meaningEn: "hearing, sound", meaningTr: "İşitme, ses, akustik", example: "Acoustic / Akustik", breakdown: "acoust/o (işitme) + -ic = Ses ve işitme ile ilgili" },
  { root: "audi/o", cleanRoot: "audi", system: "special_senses", meaningEn: "hearing", meaningTr: "İşitme, ses dalgası", example: "Audiometer / Odyometre", breakdown: "audi/o (işitme) + -meter = İşitme keskinliğini ölçen cihaz" },
  { root: "aur/o", cleanRoot: "aur", system: "special_senses", meaningEn: "ear", meaningTr: "Kulak", example: "Biaural / Bioral", breakdown: "bi- (çift) + aur/o (kulak) + -al = Her iki kulağı da ilgilendiren" },
  { root: "auricul/o", cleanRoot: "auricul", system: "special_senses", meaningEn: "ear, auricle", meaningTr: "Kulak kepçesi (aurikula)", example: "Auricular / Aurikuler", breakdown: "auricul/o (kulak kepçesi) + -ar = Kulak kepçesine ait olan" },
  { root: "blephar/o", cleanRoot: "blephar", system: "special_senses", meaningEn: "eyelid", meaningTr: "Göz kapağı (blefaron)", example: "Blepharitis / Blefarit", breakdown: "blephar/o (göz kapağı) + -itis = Göz kapağı iltihaplanması" },
  { root: "cerumin/o", cleanRoot: "cerumin", system: "special_senses", meaningEn: "earwax, cerumen", meaningTr: "Kulak kiri (serumen)", example: "Ceruminolytic / Seruminolitik", breakdown: "cerumin/o (kulak kiri) + -lytic = Kulak kirini yumuşatan ve çözen ilaç" },
  { root: "choroid/o", cleanRoot: "choroid", system: "special_senses", meaningEn: "choroid layer of eye", meaningTr: "Koroid tabakası (gözün damar tabakası)", example: "Choroiditis / Koroidit", breakdown: "choroid/o (damar tabaka) + -itis = Gözün koroid zarının iltihaplanması" },
  { root: "cochle/o", cleanRoot: "cochle", system: "special_senses", meaningEn: "cochlea (inner ear)", meaningTr: "Salyangoz, koklea", example: "Cochlear / Koklear", breakdown: "cochle/o (salyangoz) + -ar = İç kulaktaki salyangoz yapısıyla ilgili" },
  { root: "conjunctiv/o", cleanRoot: "conjunctiv", system: "special_senses", meaningEn: "conjunctiva", meaningTr: "Konjonktiva (göz ön zarı)", example: "Conjunctivitis / Konjonktivit", breakdown: "conjunctiv/o (konjonktiva) + -itis = Gözün konjonktiva tabakasının iltihabı" },
  { root: "core/o", cleanRoot: "core", system: "special_senses", meaningEn: "pupil", meaningTr: "Göz bebeği (pupilla)", example: "Coreometer / Koreometre", breakdown: "core/o (göz bebeği) + -meter = Göz bebeğinin genişliğini ölçen alet" },
  { root: "corne/o", cleanRoot: "corne", system: "special_senses", meaningEn: "cornea", meaningTr: "Saydam tabaka (kornea)", example: "Corneal / Korneal", breakdown: "corne/o (saydam tabaka) + -al = Gözün kornea tabakasıyla ilgili" },
  { root: "cycl/o", cleanRoot: "cycl", system: "special_senses", meaningEn: "ciliary body of eye; cycle", meaningTr: "Kirpiksi cisim (siliyer cisim); dairesel", example: "Cycloplegia / Siklopleji", breakdown: "cycl/o (siliyer kas) + -plegia = Göz siliyer kaslarının felci" },
  { root: "dacry/o", cleanRoot: "dacry", system: "special_senses", meaningEn: "tear", meaningTr: "Gözyaşı, gözyaşı yolları", example: "Dacryorrhea / Dakriyore", breakdown: "dacry/o (gözyaşı) + -rrhea = Aşırı ve kontrolsüz gözyaşı akması" },
  { root: "dacryocyst/o", cleanRoot: "dacryocyst", system: "special_senses", meaningEn: "lacrimal sac (tear sac)", meaningTr: "Gözyaşı kesesi", example: "Dacryocystitis / Dakriyosistit", breakdown: "dacryocyst/o (gözyaşı kesesi) + -itis = Gözyaşı kesesinin iltihaplanması" },
  { root: "goni/o", cleanRoot: "goni", system: "special_senses", meaningEn: "angle", meaningTr: "Açı (göz ön odası açısı)", example: "Gonioscopy / Goniyoskopi", breakdown: "goni/o (açı) + -scopy = Glokom teşhisi için göz drenaj açısının incelenmesi" },
  { root: "ir/o", cleanRoot: "ir", system: "special_senses", meaningEn: "iris (colored part of eye)", meaningTr: "İris (gözün renkli tabakası)", example: "Iritis / İrit", breakdown: "ir/o (iris) + -itis = İris tabakasının iltihaplanması" },
  { root: "irid/o", cleanRoot: "irid", system: "special_senses", meaningEn: "iris", meaningTr: "İris", example: "Iridectomy / İridektomi", breakdown: "irid/o (iris) + -ectomy = İris dokusunun bir kısmının çıkarılması" },
  { root: "kerat/o", cleanRoot: "kerat", system: "special_senses", meaningEn: "cornea, horny tissue", meaningTr: "Kornea, saydam tabaka; sert doku", example: "Keratoplasty / Keratoplasti", breakdown: "kerat/o (kornea) + -plasty = Kornea nakli, kornea onarım ameliyatı" },
  { root: "labyrinth/o", cleanRoot: "labyrinth", system: "special_senses", meaningEn: "labyrinth (inner ear)", meaningTr: "Labirent, iç kulak labirenti", example: "Labyrinthitis / Labirentit", breakdown: "labyrinth/o (iç kulak) + -itis = İç kulak labirentlerinin iltihabı" },
  { root: "lacrim/o", cleanRoot: "lacrim", system: "special_senses", meaningEn: "tear", meaningTr: "Gözyaşı, gözyaşı salgısı/kanalı", example: "Lacrimation / Lakrimasyon", breakdown: "lacrim/o (gözyaşı) + -ation = Gözyaşı salgılanması süreci" },
  { root: "mastoid/o", cleanRoot: "mastoid", system: "special_senses", meaningEn: "mastoid process", meaningTr: "Mastoid kemik çıkıntısı", example: "Mastoidectomy / Mastoidektomi", breakdown: "mastoid/o (mastoid) + -ectomy = Kulak arkası mastoid kemik hücrelerinin çıkarılması" },
  { root: "myring/o", cleanRoot: "myring", system: "special_senses", meaningEn: "tympanic membrane (eardrum)", meaningTr: "Kulak zarı", example: "Myringotomy / Miringotomi", breakdown: "myring/o (kulak zarı) + -tomy = Kulak zarına sıvı tahliyesi için cerrahi çizik" },
  { root: "ocul/o", cleanRoot: "ocul", system: "special_senses", meaningEn: "eye", meaningTr: "Göz", example: "Oculomotor / Okülomotor", breakdown: "ocul/o (göz) + mot/o = Göz küresinin hareketlerini kontrol eden motor sinir" },
  { root: "ophthalm/o", cleanRoot: "ophthalm", system: "special_senses", meaningEn: "eye", meaningTr: "Göz", example: "Ophthalmology / Oftalmoloji", breakdown: "ophthalm/o (göz) + -logy = Göz hastalıklarını inceleyen tıp bilim dalı" },
  { root: "opt/o", cleanRoot: "opt", system: "special_senses", meaningEn: "eye, vision", meaningTr: "Göz, görme, görüş yetisi", example: "Optometry / Optometri", breakdown: "opt/o (görme) + -metry = Görme kusurlarını ölçüp gözlük reçete etme" },
  { root: "optic/o", cleanRoot: "optic", system: "special_senses", meaningEn: "eye, vision", meaningTr: "Göz, görme, optik", example: "Optical / Optik", breakdown: "optic/o (görme) + -al = Işık, mercekler ve görmeyle ilgili olan" },
  { root: "phac/o", cleanRoot: "phac", system: "special_senses", meaningEn: "lens of eye", meaningTr: "Mercek, göz merceği (lens)", example: "Phacomalacia / Fakomalazi", breakdown: "phac/o (göz merceği) + -malacia = Göz merceğinin anormal yumuşaması" },
  { root: "pupill/o", cleanRoot: "pupill", system: "special_senses", meaningEn: "pupil", meaningTr: "Göz bebeği (pupilla)", example: "Pupillometry / Pupillometri", breakdown: "pupill/o (göz bebeği) + -metry = Göz bebeği çapının ölçülmesi" },
  { root: "retin/o", cleanRoot: "retin", system: "special_senses", meaningEn: "retina", meaningTr: "Ağ tabaka (retina)", example: "Retinopathy / Retinopati", breakdown: "retin/o (retina) + -pathy = Retinada meydana gelen hastalık" },
  { root: "salping/o", cleanRoot: "salping", system: "special_senses", meaningEn: "tube (eustachian / fallopian)", meaningTr: "Tüp, östaki borusu veya fallop tüpü", example: "Salpingopharyngeal", breakdown: "salping/o (östaki) + pharyng/o (yutak) + -eal = Östaki borusu ile yutak arası bölge" },
  { root: "scot/o", cleanRoot: "scot", system: "special_senses", meaningEn: "darkness", meaningTr: "Karanlık, görme alanı körlüğü", example: "Scotoma / Skotom", breakdown: "scot/o (karanlık) + -oma = Görme alanında beliren ada şeklindeki kör nokta" },
  { root: "staped/o", cleanRoot: "staped", system: "special_senses", meaningEn: "stapes (stirrup bone)", meaningTr: "Üzengi kemiği (stapes)", example: "Stapedectomy / Stapedektomi", breakdown: "staped/o (üzengi kemiği) + -ectomy = İşitme kaybını önlemek için üzengi kemiğinin çıkarılması" },
  { root: "tympan/o", cleanRoot: "tympan", system: "special_senses", meaningEn: "tympanic membrane, middle ear", meaningTr: "Kulak zarı, orta kulak boşluğu", example: "Tympanoplasty / Timpanoplasti", breakdown: "tympan/o (kulak zarı) + -plasty = Hasarlı kulak zarının cerrahi onarımı" },
  { root: "vitr/o", cleanRoot: "vitr", system: "special_senses", meaningEn: "vitreous body (of eye)", meaningTr: "Camsı sıvı, gözün vitreus sıvısı", example: "Vitrectomy / Vitrektomi", breakdown: "vitr/o (vitreus sıvısı) + -ectomy = Göz içi camsı sıvının çekilip temizlenmesi" }
];

// =====================================================================
// 3. SON EKLER (SUFFIXES - 125 Adet)
// =====================================================================
export const SUFFIXES = [
  // 1. Cerrahi Son Ekler (Surgical Suffixes)
  {
    suffix: "-centesis",
    variants: ["-centesis"],
    meaningEn: "Surgical puncture to aspirate or remove fluid",
    meaningTr: "Cerrahi delme, boşluktan iğneyle sıvı çekme (sentez)",
    type: "surgical",
    example: "Arthrocentesis / Artrosentez",
    breakdown: "arthr/o (eklem) + -centesis (delip sıvı alma) = Eklem boşluğundan sıvı alınması"
  },
  {
    suffix: "-clasis",
    variants: ["-clasis"],
    meaningEn: "To break, surgical fracture of bone",
    meaningTr: "Kemik deformitesini düzeltmek amacıyla cerrahi olarak kırmak (klazis)",
    type: "surgical",
    example: "Osteoclasis / Osteoklazis",
    breakdown: "oste/o (kemik) + -clasis = Kemiğin cerrahi olarak kırılması"
  },
  {
    suffix: "-cleisis",
    variants: ["-cleisis"],
    meaningEn: "Closure, surgical closing",
    meaningTr: "Cerrahi kapatma, tıkama işlemi veya anomalisi",
    type: "surgical",
    example: "Colpocleisis / Kolpokleizis",
    breakdown: "colp/o (vajina) + -cleisis = Vajinanın cerrahi olarak kapatılması"
  },
  {
    suffix: "-clysis",
    variants: ["-clysis"],
    meaningEn: "Irrigation, washing",
    meaningTr: "Yıkama, sıvı verme, lavaj",
    type: "surgical",
    example: "Peritoneoclysis / Peritoneoklizis",
    breakdown: "peritone/o (periton) + -clysis = Karın boşluğunun yıkanması"
  },
  {
    suffix: "-desis",
    variants: ["-desis"],
    meaningEn: "Binding, fusion, fixation (of bone or joint)",
    meaningTr: "Sabitleme, dondurma, cerrahi tespit",
    type: "surgical",
    example: "Arthrodesis / Artrodez",
    breakdown: "arthr/o (eklem) + -desis = Eklemin cerrahi olarak sabitlenmesi/dondurulması"
  },
  {
    suffix: "-ectomy",
    variants: ["-ectomy", "-ektomi"],
    meaningEn: "Excision, surgical removal, cutting out",
    meaningTr: "Kesip çıkarma, cerrahi olarak kesip alma",
    type: "surgical",
    example: "Appendectomy / Apandektomi",
    breakdown: "append/o (apandis) + -ectomy = Apandisin cerrahi olarak çıkarılması"
  },
  {
    suffix: "-lysis",
    variants: ["-lysis", "-liz"],
    meaningEn: "Separation, destruction, loosening, dissolving",
    meaningTr: "Çözülme, erime, gevşetme, yapışıklıkları açma",
    type: "surgical",
    example: "Thrombolysis / Tromboliz",
    breakdown: "thromb/o (kan pıhtısı) + -lysis = Kan pıhtısının eritilmesi"
  },
  {
    suffix: "-pexy",
    variants: ["-pexy", "-peksi"],
    meaningEn: "Surgical fixation (securing in position)",
    meaningTr: "Cerrahi sabitleme, asma, yerine tespit etme",
    type: "surgical",
    example: "Mastopexy / Mastopeksi",
    breakdown: "mast/o (meme) + -pexy = Sarkan memenin cerrahi olarak yukarı tespiti"
  },
  {
    suffix: "-plasty",
    variants: ["-plasty", "-plasti"],
    meaningEn: "Surgical repair, plastic surgery",
    meaningTr: "Cerrahi onarım, şekil bozukluklarını düzeltme",
    type: "surgical",
    example: "Rhinoplasty / Rinoplasti",
    breakdown: "rhin/o (burun) + -plasty = Burnun cerrahi olarak yeniden şekillendirilmesi"
  },
  {
    suffix: "-rrhaphy",
    variants: ["-rrhaphy", "-rafi"],
    meaningEn: "Suture, stitching together",
    meaningTr: "Cerrahi dikiş, dikme",
    type: "surgical",
    example: "Myorrhaphy / Miyorafi",
    breakdown: "my/o (kas) + -rrhaphy = Kas yırtığının cerrahi olarak dikilmesi"
  },
  {
    suffix: "-stomy",
    variants: ["-stomy", "-stomi"],
    meaningEn: "Forming an opening to the outside",
    meaningTr: "Ağızlaştırma, yeni bir yapay açıklık/kanal oluşturma",
    type: "surgical",
    example: "Colostomy / Kolostomi",
    breakdown: "col/o (kalın bağırsak) + -stomy = Kolonun karın duvarına ağızlaştırılması"
  },
  {
    suffix: "-tome",
    variants: ["-tome", "-tom"],
    meaningEn: "Instrument used for cutting",
    meaningTr: "Cerrahi kesme aleti",
    type: "surgical",
    example: "Dermatome / Dermatom",
    breakdown: "derm/a (deri) + -tome = Deri grefti kesmek için kullanılan kesici alet"
  },
  {
    suffix: "-tomy",
    variants: ["-tomy", "-tomi"],
    meaningEn: "Incision, cutting into tissue",
    meaningTr: "Cerrahi kesi, içine doğru kesme",
    type: "surgical",
    example: "Tracheotomy / Trakeotomi",
    breakdown: "trache/o (soluk borusu) + -tomy = Soluk borusuna cerrahi kesi yapılması"
  },
  {
    suffix: "-tripsy",
    variants: ["-tripsy", "-tripsi"],
    meaningEn: "Surgical crushing, pulverizing",
    meaningTr: "Cerrahi kırma, ezme",
    type: "surgical",
    example: "Lithotripsy / Litotripsi",
    breakdown: "lith/o (taş) + -tripsy = Böbrek veya safra taşının cerrahi olarak kırılması"
  },

  // 2. Teşhis, Patolojik ve Klinik Son Ekler (Diagnostic & Pathological Suffixes)
  {
    suffix: "-algesia",
    variants: ["-algesia", "-aljezi"],
    meaningEn: "Pain, sensitivity to pain",
    meaningTr: "Ağrı, acı, ağrıya duyarlılık",
    type: "diagnostic",
    example: "Analgesia / Analjezi",
    breakdown: "an- (yokluk) + -algesia = Ağrı hissinin olmaması/giderilmesi"
  },
  {
    suffix: "-algia",
    variants: ["-algia", "-alji"],
    meaningEn: "Pain",
    meaningTr: "Ağrı",
    type: "diagnostic",
    example: "Neuralgia / Nevralji",
    breakdown: "neur/o (sinir) + -algia = Sinir hattı boyunca hissedilen ağrı"
  },
  {
    suffix: "-cele",
    variants: ["-cele", "-sel"],
    meaningEn: "Hernia, swelling, protrusion",
    meaningTr: "Fıtık, dışa doğru büyüme, cep yapma",
    type: "diagnostic",
    example: "Rectocele / Rektosel",
    breakdown: "rect/o (rektum) + -cele = Rektumun vajina içine doğru fıtıklaşması"
  },
  {
    suffix: "-cidal",
    variants: ["-cidal", "-sidal"],
    meaningEn: "Killing, destructive",
    meaningTr: "Öldürücü, yok edici etki gösteren",
    type: "diagnostic",
    example: "Bactericidal / Bakterisidal",
    breakdown: "bacteri + -cidal = Bakterileri öldüren/yok eden etki"
  },
  {
    suffix: "-cide",
    variants: ["-cide", "-sit"],
    meaningEn: "Killing agent, killer",
    meaningTr: "Öldüren madde, öldürücü kimyasal",
    type: "diagnostic",
    example: "Spermicide / Spermisit",
    breakdown: "spermi + -cide = Sperm hücrelerini öldüren kimyasal ajan"
  },
  {
    suffix: "-clast",
    variants: ["-clast", "-klast"],
    meaningEn: "To break, destroying cell",
    meaningTr: "Kıran, yıkan hücre veya ajan",
    type: "diagnostic",
    example: "Osteoclast / Osteoklast",
    breakdown: "oste/o (kemik) + -clast = Kemik dokusunu yıkıp emen hücre"
  },
  {
    suffix: "-clonus",
    variants: ["-clonus", "-klonus"],
    meaningEn: "Muscle spasm, rapid contraction",
    meaningTr: "Titrenti, kasların istemsiz ve hızlı kasılması",
    type: "diagnostic",
    example: "Myoclonus / Miyoklonus",
    breakdown: "my/o (kas) + -clonus = Kas grubunun ani istemsiz kasılması"
  },
  {
    suffix: "-cusia / -cusis",
    variants: ["-cusia", "-cusis", "-akuzi"],
    meaningEn: "Hearing condition",
    meaningTr: "İşitme duyusu veya işitme durumu",
    type: "diagnostic",
    example: "Presbycusis / Presbiakuzi",
    breakdown: "presby- (yaşlı) + -cusis = Yaşlılığa bağlı işitme kaybı durumu"
  },
  {
    suffix: "-dynia",
    variants: ["-dynia", "-dini"],
    meaningEn: "Pain",
    meaningTr: "Ağrı",
    type: "diagnostic",
    example: "Vulvodynia / Vulvodini",
    breakdown: "vulv/o (vulva) + -dynia = Dış genital bölgede kronik ağrı durumu"
  },
  {
    suffix: "-ectasia / -ectasis",
    variants: ["-ectasia", "-ectasis", "-ektazi"],
    meaningEn: "Dilation, expansion",
    meaningTr: "Genişleme, esneme, kalıcı büyüme",
    type: "diagnostic",
    example: "Bronchiectasis / Bronşektazi",
    breakdown: "bronchi (bronş) + -ectasis = Bronş ağacının anormal ve kalıcı genişlemesi"
  },
  {
    suffix: "-edema",
    variants: ["-edema", "-ödem"],
    meaningEn: "Swelling, excess fluid",
    meaningTr: "Ödem, dokularda sıvı birikmesine bağlı şişlik",
    type: "diagnostic",
    example: "Lymphedema / Lenfödem",
    breakdown: "lymph (lenf) + -edema = Lenf kanallarındaki tıkanıklığa bağlı şişme"
  },
  {
    suffix: "-emesis",
    variants: ["-emesis", "-emez"],
    meaningEn: "Vomiting",
    meaningTr: "Kusma",
    type: "diagnostic",
    example: "Hematemesis / Hematemez",
    breakdown: "hemat/o (kan) + -emesis = Kanlı kusma"
  },
  {
    suffix: "-emia",
    variants: ["-emia", "-emi"],
    meaningEn: "Blood condition",
    meaningTr: "Kan durumu, kanda bulunma durumu",
    type: "diagnostic",
    example: "Anemia / Anemi",
    breakdown: "an- (yokluk) + -emia = Kandaki eritrosit veya hemoglobin azlığı"
  },
  {
    suffix: "-esthesia",
    variants: ["-esthesia", "-estezi"],
    meaningEn: "Feeling, sensation",
    meaningTr: "Duyum, hissetme yeteneği",
    type: "diagnostic",
    example: "Anesthesia / Anestezi",
    breakdown: "an- (yokluk) + -esthesia = Ağrı ve duyumun geçici kaybı"
  },
  {
    suffix: "-gen",
    variants: ["-gen", "-jen"],
    meaningEn: "Forming, producing, origin; precursor",
    meaningTr: "Üreten, oluşturan, köken; öncü madde",
    type: "diagnostic",
    example: "Carcinogen / Karsinojen",
    breakdown: "carcin/o (kanser) + -gen = Kanser oluşumunu tetikleyen madde"
  },
  {
    suffix: "-genesis",
    variants: ["-genesis", "-jenez"],
    meaningEn: "Forming, producing, process of generation",
    meaningTr: "Oluşum, başlangıç, gelişme süreci",
    type: "diagnostic",
    example: "Carcinogenesis / Karsinojenez",
    breakdown: "carcin/o (kanser) + -genesis = Kanserli hücrelerin oluşma süreci"
  },
  {
    suffix: "-genic",
    variants: ["-genic", "-jenik"],
    meaningEn: "Pertaining to producing or origin; produced by",
    meaningTr: "-e ait yapı, ...-den kaynaklanan, üreten",
    type: "diagnostic",
    example: "Pathogenic / Patojenik",
    breakdown: "path/o (hastalık) + -genic = Hastalık yapıcı özellik gösteren"
  },
  {
    suffix: "-gram",
    variants: ["-gram", "-gramma"],
    meaningEn: "Record, writing",
    meaningTr: "Kayıt, çizelge, grafiksel döküm",
    type: "diagnostic",
    example: "Electrocardiogram / EKG",
    breakdown: "electr/o + cardi/o + -gram = Kalbin elektriksel aktivitesinin çizelgesi"
  },
  {
    suffix: "-graph",
    variants: ["-graph", "-graf"],
    meaningEn: "Instrument for recording",
    meaningTr: "Kaydedici alet, grafik çizen cihaz",
    type: "diagnostic",
    example: "Electrocardiograph",
    breakdown: "electr/o + cardi/o + -graph = Kalp elektrik dalgalarını kaydeden cihaz"
  },
  {
    suffix: "-graphy",
    variants: ["-graphy", "-grafi", "-graphia"],
    meaningEn: "Process of recording",
    meaningTr: "Görüntüleme, çizelge şeklinde kaydetme yöntemi/süreci",
    type: "diagnostic",
    example: "Ultrasonography / Ultrasonografi",
    breakdown: "ultra- + son/o (ses) + -graphy = Ses dalgasıyla görüntüleme süreci"
  },
  {
    suffix: "-iasis",
    variants: ["-iasis", "-iyazis"],
    meaningEn: "Abnormal condition (often by stones)",
    meaningTr: "Anormal durum, olgusu, taş gibi oluşumların varlığı",
    type: "diagnostic",
    example: "Lithiasis / Lityazis",
    breakdown: "lith/o (taş) + -iasis = Organlarda taş bulunması durumu"
  },
  {
    suffix: "-itis",
    variants: ["-itis", "-it"],
    meaningEn: "Inflammation",
    meaningTr: "İltihap, yangı",
    type: "diagnostic",
    example: "Osteitis / Osteit",
    breakdown: "oste/o (kemik) + -itis = Kemik dokusunun iltihabı"
  },
  {
    suffix: "-kinesia / -kinesis",
    variants: ["-kinesia", "-kinesis", "-kinezi"],
    meaningEn: "Movement, motion",
    meaningTr: "Hareket, motor aktivite",
    type: "diagnostic",
    example: "Bradykinesia / Bradikinezi",
    breakdown: "brady- (yavaş) + -kinesia = Hareketlerin anormal yavaşlaması"
  },
  {
    suffix: "-lepsy",
    variants: ["-lepsy", "-lepsi"],
    meaningEn: "Seizure",
    meaningTr: "Nöbet, ani tutulma",
    type: "diagnostic",
    example: "Epilepsy / Epilepsi",
    breakdown: "ep/i (üstünde) + -lepsy = Beyindeki bozukluğa bağlı nöbetler"
  },
  {
    suffix: "-lith",
    variants: ["-lith", "-lit"],
    meaningEn: "Stone, calculus",
    meaningTr: "Taş, kireçlenme kitlesi",
    type: "diagnostic",
    example: "Cholelith / Kolelit",
    breakdown: "chol/e (safra) + -lith = Safra kesesinde biriken taş"
  },
  {
    suffix: "-lytic",
    variants: ["-lytic", "-litik"],
    meaningEn: "Pertaining to destruction, dissolution, or reducing",
    meaningTr: "Eritici, yıkıcı, çözücü etki gösteren ajan",
    type: "diagnostic",
    example: "Anxiolytic / Anksiyolitik",
    breakdown: "anxi/o (kaygı) + -lytic = Kaygıyı giderici ilaç"
  },
  {
    suffix: "-malacia",
    variants: ["-malacia", "-malazi"],
    meaningEn: "Soft, softening",
    meaningTr: "Yumuşama, anormal doku yumuşaması",
    type: "diagnostic",
    example: "Osteomalacia / Osteomalazi",
    breakdown: "oste/o (kemik) + -malacia = Kemik dokusunun yumuşaması"
  },
  {
    suffix: "-mania",
    variants: ["-mania", "-mani"],
    meaningEn: "Excessive preoccupation, obsession",
    meaningTr: "Aşırı düşkünlük, saplantı, meyil",
    type: "diagnostic",
    example: "Pyromania / Piromani",
    breakdown: "pyr/o (ateş) + -mania = Yangın çıkarma saplantısı"
  },
  {
    suffix: "-megaly",
    variants: ["-megaly", "-megali"],
    meaningEn: "Enlargement, expansion",
    meaningTr: "Anormal büyüme, genişleme",
    type: "diagnostic",
    example: "Cardiomegaly / Kardiyomegali",
    breakdown: "cardi/o (kalp) + -megaly = Kalp organının anormal büyümesi"
  },
  {
    suffix: "-meter",
    variants: ["-meter", "-metre"],
    meaningEn: "Instrument for measuring",
    meaningTr: "Ölçüm aleti, ölçer cihaz",
    type: "diagnostic",
    example: "Audiometer / Odyometre",
    breakdown: "audi/o (işitme) + -meter = İşitme derecesini ölçen alet"
  },
  {
    suffix: "-metry",
    variants: ["-metry", "-metri"],
    meaningEn: "Act or process of measuring",
    meaningTr: "Ölçme işlemi, ölçüm yapma süreci",
    type: "diagnostic",
    example: "Audiometry / Odyometri",
    breakdown: "audi/o (işitme) + -metry = İşitme yeteneğinin ölçülmesi"
  },
  {
    suffix: "-oma",
    variants: ["-oma", "-om"],
    meaningEn: "Tumor, mass",
    meaningTr: "Tümör, kitle, ur (iyi veya kötü huylu)",
    type: "diagnostic",
    example: "Lymphoma / Lenfoma",
    breakdown: "lymph/o (lenf) + -oma = Lenfatik sistem kanseri"
  },
  {
    suffix: "-osis",
    variants: ["-osis", "-oz"],
    meaningEn: "Abnormal condition; increase (of blood cells)",
    meaningTr: "Anormal durum, olgusu, hastalık; hücre artışı",
    type: "diagnostic",
    example: "Psychosis / Psikoz",
    breakdown: "psych/o (akıl) + -osis = Gerçeklik algısının kaybolduğu akıl hastalığı"
  },
  {
    suffix: "-paresis",
    variants: ["-paresis", "-parezi"],
    meaningEn: "Partial paralysis, weakness",
    meaningTr: "Hafif felç, kısmi hareket ve güç kaybı (parezi)",
    type: "diagnostic",
    example: "Hemiparesis / Hemiparezi",
    breakdown: "hemi- (yarı) + -paresis = Vücudun bir tarafında görülen hafif felç"
  },
  {
    suffix: "-pathy",
    variants: ["-pathy", "-pati"],
    meaningEn: "Disease",
    meaningTr: "Hastalık",
    type: "diagnostic",
    example: "Cardiomyopathy / Kardiyomiyopati",
    breakdown: "cardi/o (kalp) + my/o (kas) + -pathy = Kalp kası hastalığı"
  },
  {
    suffix: "-penia",
    variants: ["-penia", "-peni"],
    meaningEn: "Decrease, deficiency",
    meaningTr: "Azalma, eksiklik, kanda hücre sayısının düşmesi",
    type: "diagnostic",
    example: "Leukopenia / Lökopeni",
    breakdown: "leuk/o (beyaz) + -penia = Akyuvar sayısında düşüş"
  },
  {
    suffix: "-phagia",
    variants: ["-phagia", "-faji"],
    meaningEn: "Eating, swallowing",
    meaningTr: "Yeme, yutma, yutkunma",
    type: "diagnostic",
    example: "Dysphagia / Disfaji",
    breakdown: "dys- (zor) + -phagia = Yutma ve yutkunma zorluğu"
  },
  {
    suffix: "-phasia",
    variants: ["-phasia", "-fazi"],
    meaningEn: "Speech",
    meaningTr: "Konuşma, söz söyleme",
    type: "diagnostic",
    example: "Aphasia / Afazi",
    breakdown: "a- (yokluk) + -phasia = Beyin hasarı sonucu konuşma yeteneği kaybı"
  },
  {
    suffix: "-phil / -philia",
    variants: ["-phil", "-philia", "-fili"],
    meaningEn: "Attraction for, affinity",
    meaningTr: "Sevgi, eğilim, çekim, yatkınlık",
    type: "diagnostic",
    example: "Hemophilia / Hemofili",
    breakdown: "hemo (kan) + -philia = Kanın pıhtılaşamamasına yol açan kanama hastalığı"
  },
  {
    suffix: "-phobia",
    variants: ["-phobia", "-fobi"],
    meaningEn: "Abnormal fear",
    meaningTr: "Anlamsız ve aşırı korku",
    type: "diagnostic",
    example: "Nyctophobia / Niktofobi",
    breakdown: "nyct/o (gece) + -phobia = Gece karanlığından aşırı korkma"
  },
  {
    suffix: "-plasia",
    variants: ["-plasia", "-plazi"],
    meaningEn: "Formation, growth, development",
    meaningTr: "Oluşum, gelişim, hücrelerin sayıca artarak büyümesi",
    type: "diagnostic",
    example: "Dysplasia / Displazi",
    breakdown: "dys- (bozuk) + -plasia = Dokuların anormal biçimde şekillenmesi"
  },
  {
    suffix: "-plasm",
    variants: ["-plasm", "-plazm"],
    meaningEn: "Formation, growth, substance",
    meaningTr: "Oluşum, doku, şekillenen madde",
    type: "diagnostic",
    example: "Neoplasm / Neoplazm",
    breakdown: "neo- (yeni) + -plasm = Yeni ve anormal doku büyümesi, tümör"
  },
  {
    suffix: "-plegia",
    variants: ["-plegia", "-pleji"],
    meaningEn: "Paralysis",
    meaningTr: "Felç, motor işlev kaybı",
    type: "diagnostic",
    example: "Hemiplegia / Hemipleji",
    breakdown: "hemi- (yarı) + -plegia = Vücudun bir yarısının felç olması"
  },
  {
    suffix: "-plegic",
    variants: ["-plegic", "-plejik"],
    meaningEn: "Pertaining to paralysis",
    meaningTr: "Felç yapan ajan veya felç durumuyla ilgili",
    type: "diagnostic",
    example: "Paraplegic / Paraplejik",
    breakdown: "para- + -plegic = Belden aşağısı felçli olan kimse"
  },
  {
    suffix: "-pnea",
    variants: ["-pnea", "-pne"],
    meaningEn: "Breathing",
    meaningTr: "Solunum, soluma, nefes alma",
    type: "diagnostic",
    example: "Dyspnea / Dispne",
    breakdown: "dys- (zor) + -pnea = Güçlükle ve zorlanarak nefes alma"
  },
  {
    suffix: "-porosis",
    variants: ["-porosis", "-poroz"],
    meaningEn: "Porous condition, decrease in density",
    meaningTr: "Gözenekli olma hali, doku yoğunluğunda azalma",
    type: "diagnostic",
    example: "Osteoporosis / Osteoporoz",
    breakdown: "oste/o (kemik) + -porosis = Kemik dokusu yoğunluğunun azalması/erimesi"
  },
  {
    suffix: "-ptosis",
    variants: ["-ptosis", "-ptozis"],
    meaningEn: "Prolapse, downward displacement",
    meaningTr: "Sarkma, aşağıya doğru kayma",
    type: "diagnostic",
    example: "Hysteroptosis / Histeroptozis",
    breakdown: "hyster/o (uterus) + -ptosis = Rahmin aşağı doğru sarkması"
  },
  {
    suffix: "-rrhage / -rrhagia",
    variants: ["-rrhage", "-rrhagia", "-raji"],
    meaningEn: "Bursting forth, rapid and excessive flow",
    meaningTr: "Aniden fışkırma, aşırı akış, kanama",
    type: "diagnostic",
    example: "Hemorrhage / Hemoraji",
    breakdown: "hem/o (kan) + -rrhage = Damardan dışarıya doğru kan akışı"
  },
  {
    suffix: "-rrhea",
    variants: ["-rrhea", "-re"],
    meaningEn: "Discharge, flow",
    meaningTr: "Akıntı, akış",
    type: "diagnostic",
    example: "Otorrhea / Otore",
    breakdown: "ot/o (kulak) + -rrhea = Kulaktan gelen sıvı veya irin akıntısı"
  },
  {
    suffix: "-rrhexis",
    variants: ["-rrhexis", "-rreksis"],
    meaningEn: "Rupture",
    meaningTr: "Yırtılma, kopma (organ veya damar yırtılması)",
    type: "diagnostic",
    example: "Hysterorrhexis / Histerorreksis",
    breakdown: "hyster/o (uterus) + -rrhexis = Doğum sırasında döl yatağının yırtılması"
  },
  {
    suffix: "-sarcoma",
    variants: ["-sarcoma", "-sarkom"],
    meaningEn: "Malignant tumor of connective tissue",
    meaningTr: "Kötü huylu bağ dokusu tümörü",
    type: "diagnostic",
    example: "Chondrosarcoma / Kondrosarkom",
    breakdown: "chondr/o (kıkırdak) + -sarcoma = Kıkırdak dokudan gelişen kanser"
  },
  {
    suffix: "-schisis",
    variants: ["-schisis", "-siz"],
    meaningEn: "Split, cleft",
    meaningTr: "Yarık, bölünme anomalisi",
    type: "diagnostic",
    example: "Palatoschisis / Palatosiz",
    breakdown: "palat/o (damak) + -schisis = Doğuştan gelen damak yarığı"
  },
  {
    suffix: "-sclerosis",
    variants: ["-sclerosis", "-skleroz"],
    meaningEn: "Hard, hardening",
    meaningTr: "Sertleşme, anormal bağ doku artışı",
    type: "diagnostic",
    example: "Arteriosclerosis / Arteriyoskleroz",
    breakdown: "arteri/o (arter) + -sclerosis = Damar duvarlarının sertleşmesi"
  },
  {
    suffix: "-scope",
    variants: ["-scope", "-skop"],
    meaningEn: "Instrument for examining or viewing",
    meaningTr: "Gözle inceleme aleti, endoskopik cihaz",
    type: "diagnostic",
    example: "Stethoscope / Steteskop",
    breakdown: "steth/o (göğüs) + -scope = Göğüs seslerini dinleme aleti"
  },
  {
    suffix: "-scopy",
    variants: ["-scopy", "-skopi", "-scopia"],
    meaningEn: "Visual examination process",
    meaningTr: "Gözle veya aletle inceleme, bakarak muayene süreci",
    type: "diagnostic",
    example: "Gastroscopy / Gastroskopi",
    breakdown: "gastr/o (mide) + -scopy = Mide boşluğunun endoskopla incelenmesi"
  },
  {
    suffix: "-spadias",
    variants: ["-spadias", "-spadias"],
    meaningEn: "Slit, fissure",
    meaningTr: "Yarık, anatomik açıklık anomalisi",
    type: "diagnostic",
    example: "Hypospadias / Hipospadias",
    breakdown: "hypo- (alt) + -spadias = İdrar yolu deliğinin penisin altında sonlanması"
  },
  {
    suffix: "-spasm",
    variants: ["-spasm", "-spazm"],
    meaningEn: "Involuntary contraction, twitching, cramp",
    meaningTr: "İstemsiz ani kasılma, spazm, kramp",
    type: "diagnostic",
    example: "Vasospasm / Vazospazm",
    breakdown: "vas/o (damar) + -spasm = Kan damarlarının ani büzüşmesi"
  },
  {
    suffix: "-stasis",
    variants: ["-stasis", "-staz"],
    meaningEn: "Stopping, controlling, standing still",
    meaningTr: "Durdurma, duraklama, akışı kontrol altına alma; denge",
    type: "diagnostic",
    example: "Hemostasis / Hemostaz",
    breakdown: "hem/o (kan) + -stasis = Kanamanın vücut tarafından durdurulması"
  },
  {
    suffix: "-static",
    variants: ["-static", "-statik"],
    meaningEn: "Stopping, controlling (agent)",
    meaningTr: "Durdurucu, baskılayıcı, üremeyi engelleyen (ilaç/ajan)",
    type: "diagnostic",
    example: "Bacteriostatic / Bakteriyostatik",
    breakdown: "bacteri + -static = Bakterilerin çoğalmasını durduran ajan"
  },
  {
    suffix: "-stenosis",
    variants: ["-stenosis", "-stenoz"],
    meaningEn: "Narrowing, stricture",
    meaningTr: "Daralma, büzüşme",
    type: "diagnostic",
    example: "Arteriostenosis / Arteriyostenoz",
    breakdown: "arteri/o (arter) + -stenosis = Atardamar çapının daralması"
  },
  {
    suffix: "-toxic",
    variants: ["-toxic", "-toksik"],
    meaningEn: "Poison, toxic",
    meaningTr: "Zehir, zehirli etki gösteren",
    type: "diagnostic",
    example: "Hepatotoxic / Hepatotoksik",
    breakdown: "hepat/o (karaciğer) + -toxic = Karaciğer hücrelerine zarar veren kimyasal"
  },
  {
    suffix: "-trophy",
    variants: ["-trophy", "-trofi"],
    meaningEn: "Development, nourishment, growth (of tissue)",
    meaningTr: "Beslenme, gelişim, hacimsel büyüme",
    type: "diagnostic",
    example: "Hypertrophy / Hipertrofi",
    breakdown: "hyper- (aşırı) + -trophy = Kas veya organ hacminin aşırı artması"
  },
  {
    suffix: "-tropia",
    variants: ["-tropia", "-tropya"],
    meaningEn: "Turning (primarily of eye)",
    meaningTr: "Dönme, gözün normal hattan kayması anomalisi",
    type: "diagnostic",
    example: "Esotropia / Ezotropya",
    breakdown: "eso- (içeri) + -tropia = Gözün buruna doğru içe kayması (şaşılık)"
  },
  {
    suffix: "-uria",
    variants: ["-uria", "-üri"],
    meaningEn: "Urine, urination condition",
    meaningTr: "İdrar, idrarla atılan, idrar durumu",
    type: "diagnostic",
    example: "Polyuria / Poliüri",
    breakdown: "poly- (çok) + -uria = Aşırı miktarda idrar yapma"
  },

  // 3. Sıfatlaştıran ve İlişkin Olma Son Ekleri (Adjective & Relational Suffixes)
  {
    suffix: "-able / -ible",
    variants: ["-able", "-ible", "-ilebilir", "-abilir"],
    meaningEn: "Capable of, able to",
    meaningTr: "Yapılabilir, edilebilir, ... gücüne sahip",
    type: "adjective",
    example: "Injectable / Enjekte edilebilir",
    breakdown: "inject + -able = Damar veya kas içine verilebilen sıvı"
  },
  {
    suffix: "-ac",
    variants: ["-ac", "-ak"],
    meaningEn: "Pertaining to, relating to",
    meaningTr: "İle ilgili, -e ait (tıbbi terimleri sıfatlaştırır)",
    type: "adjective",
    example: "Cardiac / Kardiyak",
    breakdown: "cardi (kalp) + -ac = Kalp organıyla ilgili, kalbe ait"
  },
  {
    suffix: "-ad",
    variants: ["-ad", "-ad"],
    meaningEn: "Toward, in the direction of",
    meaningTr: "Yönünde, ...-e doğru (yön belirtir)",
    type: "adjective",
    example: "Caudad / Kaudad",
    breakdown: "caud/o (kuyruk) + -ad = Kuyruk yönüne doğru, aşağı yönde"
  },
  {
    suffix: "-al / -alis",
    variants: ["-al", "-alis", "-ale"],
    meaningEn: "Pertaining to, relating to",
    meaningTr: "İle ilgili, -e ait",
    type: "adjective",
    example: "Dermal / Dermal",
    breakdown: "derm (deri) + -al = Deri dokusuyla ilgili"
  },
  {
    suffix: "-an",
    variants: ["-an"],
    meaningEn: "Pertaining to, relating to",
    meaningTr: "İle ilgili, -e ait",
    type: "adjective",
    example: "Median / Medyan",
    breakdown: "medi (orta) + -an = Orta hatta bulunan, orta hatla ilgili"
  },
  {
    suffix: "-ar / -aris",
    variants: ["-ar", "-aris", "-are"],
    meaningEn: "Pertaining to, relating to",
    meaningTr: "İle ilgili, -e ait",
    type: "adjective",
    example: "Muscular / Muskuler",
    breakdown: "muscul (kas) + -ar = Kas sistemiyle ilgili"
  },
  {
    suffix: "-ary",
    variants: ["-ary", "-er"],
    meaningEn: "Pertaining to, relating to",
    meaningTr: "İle ilgili, -e ait",
    type: "adjective",
    example: "Pulmonary / Pulmoner",
    breakdown: "pulmon (akciğer) + -ary = Akciğerlerle ilgili"
  },
  {
    suffix: "-eal",
    variants: ["-eal"],
    meaningEn: "Pertaining to, relating to",
    meaningTr: "İle ilgili, -e ait",
    type: "adjective",
    example: "Esophageal / Özofageal",
    breakdown: "esophag (yemek borusu) + -eal = Yemek borusuna ait"
  },
  {
    suffix: "-eus",
    variants: ["-eus", "-ea", "-eum"],
    meaningEn: "Resembling, similar to",
    meaningTr: "Biçiminde, benzer, -imsi, ait",
    type: "adjective",
    example: "Cutaneus / Kutaneus",
    breakdown: "cutan (deri) + -eus = Derimsi, deriye benzer"
  },
  {
    suffix: "-form",
    variants: ["-form", "-formis"],
    meaningEn: "Resembling, shaped like",
    meaningTr: "Biçiminde, benzer, ... şeklinde",
    type: "adjective",
    example: "Vermiform / Vermiform",
    breakdown: "vermi (solucan) + -form = Solucan biçiminde olan"
  },
  {
    suffix: "-ic / -icus",
    variants: ["-ic", "-icus", "-ica", "-icum", "-ik"],
    meaningEn: "Pertaining to, relating to",
    meaningTr: "İle ilgili, -e ait",
    type: "adjective",
    example: "Pelvic / Pelvik",
    breakdown: "pelv (leğen kemiği) + -ic = Pelvis bölgesiyle ilgili"
  },
  {
    suffix: "-ical",
    variants: ["-ical", "-ik"],
    meaningEn: "Pertaining to (combination of -ic and -al)",
    meaningTr: "İle ilgili, -e ait, bilimsel sıfatlaştırıcı",
    type: "adjective",
    example: "Pathological / Patolojik",
    breakdown: "path/o + log + -ical = Hastalık bilimiyle ilgili"
  },
  {
    suffix: "-ile",
    variants: ["-ile", "-il"],
    meaningEn: "Pertaining to, relating to",
    meaningTr: "İle ilgili, -e ait, yatkın",
    type: "adjective",
    example: "Penile / Penil",
    breakdown: "pen (penis) + -ile = Penis organıyla ilgili"
  },
  {
    suffix: "-ior",
    variants: ["-ior"],
    meaningEn: "Pertaining to directional position",
    meaningTr: "Yön bildiren, ile ilgili",
    type: "adjective",
    example: "Anterior / Anterior",
    breakdown: "anter (ön) + -ior = Vücudun ön tarafında yer alan"
  },
  {
    suffix: "-ive",
    variants: ["-ive", "-if"],
    meaningEn: "Pertaining to, relating to, pharmaceutical type",
    meaningTr: "İle ilgili, etki edici, ilaç sınıfı belirteci",
    type: "adjective",
    example: "Invasive / İnvaziv",
    breakdown: "invas (giriş) + -ive = Vücuda aletle girmeyi gerektiren yöntem"
  },
  {
    suffix: "-logic / -logical",
    variants: ["-logic", "-logical", "-lojik"],
    meaningEn: "Pertaining to the study of",
    meaningTr: "Bilimsel dalıyla ilgili, ... incelemesine ait",
    type: "adjective",
    example: "Neurological / Nörolojik",
    breakdown: "neur/o (sinir) + -logical = Sinir sistemi bilimiyle ilgili"
  },
  {
    suffix: "-oid",
    variants: ["-oid", "-oideus", "-oidea", "-oideum", "-ideus", "-idea", "-ideum"],
    meaningEn: "Resembling, similar to",
    meaningTr: "Biçiminde, benzer, gibi",
    type: "adjective",
    example: "Mucoid / Mukoid",
    breakdown: "muc (mukus) + -oid = Sümüksü, mukusa benzeyen salgı"
  },
  {
    suffix: "-ory / -orius",
    variants: ["-ory", "-orius", "-oria", "-orium"],
    meaningEn: "Pertaining to, relating to",
    meaningTr: "İle ilgili, -e ait, işlev gösteren",
    type: "adjective",
    example: "Auditory / Oditory",
    breakdown: "audit (işitme) + -ory = İşitme duyusuyla ilgili"
  },
  {
    suffix: "-ous",
    variants: ["-ous", "-öz"],
    meaningEn: "Pertaining to, composed of, producing",
    meaningTr: "İle ilgili, ...-den oluşan, barındıran",
    type: "adjective",
    example: "Cutaneous / Kütaneöz",
    breakdown: "cutane (deri) + -ous = Deriyle kaplı, deriye ait"
  },
  {
    suffix: "-tic",
    variants: ["-tic", "-tik"],
    meaningEn: "Pertaining to, relating to",
    meaningTr: "İle ilgili, -e ait, ilaç türü",
    type: "adjective",
    example: "Acoustic / Akustik",
    breakdown: "acous (işitme) + -tic = Ses ve işitme ile ilgili"
  },

  // 4. İsim, Küçültme ve Özel Son Ekler (Noun & Specialty Suffixes)
  {
    suffix: "-andr",
    variants: ["-andr"],
    meaningEn: "Steroid androgen",
    meaningTr: "Androjenik yapıda hormon veya steroid",
    type: "noun",
    example: "Androgen / Androjen",
    breakdown: "andr/o (erkek) + -gen = Erkeklik hormonu grubu"
  },
  {
    suffix: "-arche",
    variants: ["-arche", "-arş"],
    meaningEn: "Beginning",
    meaningTr: "Başlangıç, ilk ortaya çıkış",
    type: "noun",
    example: "Menarche / Menarş",
    breakdown: "men (adet) + -arche = Genç kızda ilk adet kanamasının görülmesi"
  },
  {
    suffix: "-ase",
    variants: ["-ase", "-az"],
    meaningEn: "Enzyme",
    meaningTr: "Enzim (organik katalizör)",
    type: "noun",
    example: "Lipase / Lipaz",
    breakdown: "lip/o (yağ) + -ase = Yağları parçalayan sindirim enzimi"
  },
  {
    suffix: "-blast",
    variants: ["-blast", "-blast"],
    meaningEn: "Embryonic or immature cell",
    meaningTr: "Öncü hücre, olgunlaşmamış genç hücre",
    type: "noun",
    example: "Erythroblast / Eritroblast",
    breakdown: "erythr/o (kırmızı) + -blast = Olgunlaşmamış genç alyuvar hücresi"
  },
  {
    suffix: "-cyesis",
    variants: ["-cyesis"],
    meaningEn: "Pregnancy",
    meaningTr: "Gebelik, hamilelik",
    type: "noun",
    example: "Pseudocyesis / Yalancı Gebelik",
    breakdown: "pseud/o (yalancı) + -cyesis = Gebe olmadığı halde gebelik belirtileri yaşama"
  },
  {
    suffix: "-er",
    variants: ["-er"],
    meaningEn: "One who, practitioner",
    meaningTr: "Yapan kişi, meslek erbabı uzman",
    type: "noun",
    example: "Internist / İnternist",
    breakdown: "internus (iç) + -er = İç hastalıkları tıp uzmanı"
  },
  {
    suffix: "-esis",
    variants: ["-esis", "-ez"],
    meaningEn: "Condition, process",
    meaningTr: "Durum, süreç, olgu",
    type: "noun",
    example: "Diuresis / Diürez",
    breakdown: "di- + ur (idrar) + -esis = Böbreklerden aşırı idrar salgılanma süreci"
  },
  {
    suffix: "-eum / -ium",
    variants: ["-eum", "-ium"],
    meaningEn: "Membrane, structure",
    meaningTr: "Zar, koruyucu tabaka, anatomik yapı/alan",
    type: "noun",
    example: "Peritoneum / Periton",
    breakdown: "peri- + ton/o + -eum = Karın boşluğunu kaplayan iç zar"
  },
  {
    suffix: "-gravida",
    variants: ["-gravida"],
    meaningEn: "Pregnant woman",
    meaningTr: "Gebe kadın, hamile kadın",
    type: "noun",
    example: "Primigravida",
    breakdown: "primi- (ilk) + -gravida = İlk kez hamile kalan kadın"
  },
  {
    suffix: "-ia",
    variants: ["-ia"],
    meaningEn: "Condition, state",
    meaningTr: "Durum, hastalık hali, olgusu",
    type: "noun",
    example: "Insomnia / İnsomnia",
    breakdown: "in- + somn (uyku) + -ia = Uyuyamama, uykusuzluk hastalığı"
  },
  {
    suffix: "-iac",
    variants: ["-iac", "-iyak"],
    meaningEn: "One who suffers from, person affected",
    meaningTr: "Hastalığa yakalanmış kişi, muzdarip kimse",
    type: "noun",
    example: "Hemophiliac / Hemofilik",
    breakdown: "hemo + phil + -iac = Hemofili kan hastalığı olan birey"
  },
  {
    suffix: "-iatrician",
    variants: ["-iatrician", "-iyatrist"],
    meaningEn: "Practitioner, specialist",
    meaningTr: "Uygulayıcı, pratisyen, tıp uzmanı",
    type: "noun",
    example: "Pediatrician / Pediyatrist",
    breakdown: "ped/o (çocuk) + -iatrician = Çocuk sağlığı ve hastalıkları uzmanı"
  },
  {
    suffix: "-iatrics",
    variants: ["-iatrics", "-iyatri"],
    meaningEn: "Medical specialty, branch of medicine",
    meaningTr: "Uzmanlık alanı, tıp dalı, tedavi bilimi",
    type: "noun",
    example: "Pediatrics / Pediyatri",
    breakdown: "ped/o (çocuk) + -iatrics = Çocuk hastalıkları tıp dalı"
  },
  {
    suffix: "-iatry",
    variants: ["-iatry", "-iyatri"],
    meaningEn: "Medicine, medical treatment",
    meaningTr: "Tıp dalı, tıbbi tedavi mesleği",
    type: "noun",
    example: "Podiatry / Podiyatri",
    breakdown: "pod (ayak) + -iatry = Ayak sağlığı ve hastalıklarıyla ilgilenen dal"
  },
  {
    suffix: "-ician",
    variants: ["-ician", "-isyen"],
    meaningEn: "Specialist, practitioner",
    meaningTr: "Uzman, uygulayıcı tıp insanı",
    type: "noun",
    example: "Obstetrician / Obstetrisyen",
    breakdown: "obstetr + -ician = Kadın hastalıkları ve doğum uzmanı hekim"
  },
  {
    suffix: "-icle",
    variants: ["-icle", "-ikül"],
    meaningEn: "Small, minute (diminutive)",
    meaningTr: "Küçük, -cik, -cuk (küçültme eki)",
    type: "noun",
    example: "Ventricle / Ventrikül",
    breakdown: "ventr (boşluk) + -icle = Karıncık, kalpteki küçük boşluklar"
  },
  {
    suffix: "-is",
    variants: ["-is"],
    meaningEn: "Noun ending, condition, state",
    meaningTr: "İsimleştirici son ek, anatomik yapı/durum",
    type: "noun",
    example: "Cutis / Kutis",
    breakdown: "cut/o (deri) + -is = Deri tabakası, cilt"
  },
  {
    suffix: "-ism",
    variants: ["-ism", "-izm"],
    meaningEn: "Condition, theory, state",
    meaningTr: "Durum, klinik olgu, teori",
    type: "noun",
    example: "Hyperthyroidism / Hipertiroidi",
    breakdown: "hyper- + thyroid + -ism = Tiroit bezinin aşırı çalışması"
  },
  {
    suffix: "-ist",
    variants: ["-ist", "-ist"],
    meaningEn: "Specialist, practitioner",
    meaningTr: "Uzman, uygulayıcı, ... uzmanı kişi",
    type: "noun",
    example: "Cardiologist / Kardiyolog",
    breakdown: "cardi/o + -ist = Kalp hastalıkları tıp uzmanı"
  },
  {
    suffix: "-it / -ite",
    variants: ["-it", "-ite"],
    meaningEn: "End product, metabolite",
    meaningTr: "Son ürün, metabolizma ürünü",
    type: "noun",
    example: "Metabolite / Metabolit",
    breakdown: "metabol (değişim) + -ite = Metabolizma sonucu ortaya çıkan ürün"
  },
  {
    suffix: "-ite / -ity",
    variants: ["-ite", "-ity", "-ite"],
    meaningEn: "Condition, state",
    meaningTr: "Durum, nitelik",
    type: "noun",
    example: "Acidity / Asidite",
    breakdown: "acid (asit) + -ity = Asitlik derecesi/durumu"
  },
  {
    suffix: "-logist",
    variants: ["-logist", "-log"],
    meaningEn: "One who studies, specialist",
    meaningTr: "... bilim uzmanı, araştırıcı uzman hekim",
    type: "noun",
    example: "Pulmonologist / Pulmonolog",
    breakdown: "pulmon (akciğer) + -logist = Akciğer hastalıkları tıp uzmanı"
  },
  {
    suffix: "-logy",
    variants: ["-logy", "-loji", "-logia"],
    meaningEn: "Study or science of",
    meaningTr: "... bilim dalı, inceleme alanı",
    type: "noun",
    example: "Gynecology / Jinekoloji",
    breakdown: "gynec/o (kadın) + -logy = Kadın hastalıklarını inceleyen tıp bilimi"
  },
  {
    suffix: "-lysin",
    variants: ["-lysin", "-lizin"],
    meaningEn: "Substance that destroys or dissolves",
    meaningTr: "Eritici madde, dokuyu yıkan ajan",
    type: "noun",
    example: "Hemolysin / Hemolizin",
    breakdown: "hem/o (kan) + -lysin = Alyuvarları parçalayıp eriten madde"
  },
  {
    suffix: "-ole",
    variants: ["-ole", "-ol"],
    meaningEn: "Small, minute (diminutive)",
    meaningTr: "Küçük, -cik, -cuk (küçültme eki)",
    type: "noun",
    example: "Arteriole / Arteriyol",
    breakdown: "arteri + -ole = Küçük atardamar, arter dalı"
  },
  {
    suffix: "-olus",
    variants: ["-olus", "-ol"],
    meaningEn: "Small, minute (diminutive)",
    meaningTr: "Küçük, -cik, -cuk",
    type: "noun",
    example: "Alveolus / Alveol",
    breakdown: "alve (oyuk) + -olus = Akciğerlerdeki küçük hava kesesi"
  },
  {
    suffix: "-opia",
    variants: ["-opia", "-opi"],
    meaningEn: "Vision condition",
    meaningTr: "Görme, görüş durumu anomalisi",
    type: "noun",
    example: "Diplopia / Diplopi",
    breakdown: "dipl- (çift) + -opia = Çift görme göz hastalığı"
  },
  {
    suffix: "-opsia",
    variants: ["-opsia", "-opsi"],
    meaningEn: "Vision condition",
    meaningTr: "Görme, görüş durumu",
    type: "noun",
    example: "Heteropsia / Heteropsi",
    breakdown: "hetero- + -opsia = İki gözün farklı görme kalitesinde olması"
  },
  {
    suffix: "-ose",
    variants: ["-ose", "-oz"],
    meaningEn: "Sugar",
    meaningTr: "Karbonhidrat, şeker türü",
    type: "noun",
    example: "Glucose / Glikoz",
    breakdown: "gluc/o (tatlı) + -ose = Üzüm şekeri, temel kan şekeri"
  },
  {
    suffix: "-para",
    variants: ["-para"],
    meaningEn: "To bear (offspring)",
    meaningTr: "Çocuk doğurma, doğum yapmış olma durumu",
    type: "noun",
    example: "Nullipara",
    breakdown: "nulli- (hiç) + -para = Hiç canlı doğum yapmamış kadın"
  },
  {
    suffix: "-physis",
    variants: ["-physis", "-fiz"],
    meaningEn: "Growth, to grow",
    meaningTr: "Büyüme, büyüme bölgesi, gelişim yapısı",
    type: "noun",
    example: "Epiphysis / Epifiz",
    breakdown: "epi- (üstünde) + -physis = Kemiklerin uçlarındaki büyüme bölgesi"
  },
  {
    suffix: "-poiesis",
    variants: ["-poiesis", "-poiez"],
    meaningEn: "Formation, production, making",
    meaningTr: "Yapım, üretim, sentezlenme süreci",
    type: "noun",
    example: "Erythropoiesis / Eritropoiez",
    breakdown: "erythr/o + -poiesis = Kırmızı kan hücresi yapım süreci"
  },
  {
    suffix: "-salpinx",
    variants: ["-salpinx", "-salpinkis"],
    meaningEn: "Tube (fallopian or eustachian)",
    meaningTr: "Tüp, kanal (fallop tüpü)",
    type: "noun",
    example: "Hydrosalpinx / Hidrosalpinkis",
    breakdown: "hydr/o (su) + -salpinx = Fallop tüpü içinde sıvı birikmesi"
  },
  {
    suffix: "-thermy",
    variants: ["-thermy", "-termi"],
    meaningEn: "Generation of heat, warming",
    meaningTr: "Isı, tedavi amaçlı ısı üretme işlemi",
    type: "noun",
    example: "Diathermy / Diatermi",
    breakdown: "dia- + -thermy = Dokuların yüksek frekanslı elektrikle ısıtılması"
  },
  {
    suffix: "-tocia",
    variants: ["-tocia", "-tosi"],
    meaningEn: "Childbirth, labor",
    meaningTr: "Doğum, doğum sancısı, eylem",
    type: "noun",
    example: "Dystocia / Distosi",
    breakdown: "dys- (zor) + -tocia = Zor ve ağrılı doğum eylemi"
  },
  {
    suffix: "-ula / -ulum / -ulus",
    variants: ["-ula", "-ulum", "-ulus", "-ül"],
    meaningEn: "Small, minute (diminutive)",
    meaningTr: "Küçük, -cik, -cuk",
    type: "noun",
    example: "Lobulus / Lobül",
    breakdown: "lob + -ulus = Organların küçük alt lobcukları"
  },
  {
    suffix: "-ule",
    variants: ["-ule", "-ül"],
    meaningEn: "Small, minute (diminutive)",
    meaningTr: "Küçük, -cik, -cuk",
    type: "noun",
    example: "Venule / Venül",
    breakdown: "ven (toplardamar) + -ule = Küçük toplardamar"
  },
  {
    suffix: "-version",
    variants: ["-version", "-versiyon"],
    meaningEn: "Turning",
    meaningTr: "Dönme, bükülme, yön değiştirme",
    type: "noun",
    example: "Retroversion / Retroversiyon",
    breakdown: "retro- + -version = Organın arkaya doğru bükülmesi"
  },
  {
    suffix: "-y",
    variants: ["-y", "-i"],
    meaningEn: "Condition, process, state",
    meaningTr: "Durum, klinik süreç, yapı",
    type: "noun",
    example: "Atrophy / Atrofi",
    breakdown: "a- (yokluk) + troph + -y = Organın beslenemeyip erimesi"
  }
];

// =====================================================================
// 4. HIZLI ERİŞİM SÖZLÜKLERİ VE YARDIMCI HARİTALAR (Lookups)
// =====================================================================

// Ön ekler haritası: 'sub-', 'sub', 'inter-', 'inter' vb.
export const PREFIX_LOOKUP = {};
PREFIXES.forEach((p) => {
  const meta = { tr: p.meaningTr, en: p.meaningEn, raw: p };
  p.variants.forEach((v) => {
    const clean = v.toLowerCase().replace(/^-+|-+$/g, '');
    PREFIX_LOOKUP[`${clean}-`] = meta;
    PREFIX_LOOKUP[clean] = meta;
  });
});

// Kökler haritası: 'oste', 'osteo', 'card', 'cardi', 'cardio', 'gastr', 'gastro' vb.
export const ROOT_LOOKUP = {};
ROOTS.forEach((r) => {
  const meta = { tr: r.meaningTr, en: r.meaningEn, system: r.system, raw: r };
  const rawParts = r.root.split('/').map((s) => s.trim().toLowerCase());
  const cleanBase = r.cleanRoot.toLowerCase();
  
  ROOT_LOOKUP[cleanBase] = meta;
  if (rawParts.length === 2) {
    ROOT_LOOKUP[rawParts[0]] = meta;
    ROOT_LOOKUP[`${rawParts[0]}${rawParts[1]}`] = meta;
  }
});

// Son ekler haritası: '-itis', 'itis', '-alis', 'alis' vb.
export const SUFFIX_LOOKUP = {};
SUFFIXES.forEach((s) => {
  const meta = { tr: s.meaningTr, en: s.meaningEn, type: s.type, raw: s };
  s.variants.forEach((v) => {
    const clean = v.toLowerCase().replace(/^-+|-+$/g, '');
    SUFFIX_LOOKUP[`-${clean}`] = meta;
    SUFFIX_LOOKUP[clean] = meta;
  });
});
