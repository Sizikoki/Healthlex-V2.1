export const LEGAL_CONTENT = {
  tr: {
    nav: {
      terms: 'Kullanıcı Sözleşmesi',
      privacy: 'Gizlilik ve Çerez Politikası',
      refund: 'İptal ve İade Politikası',
      backToHome: 'Ana Sayfaya Dön',
      needHelp: 'Sorunuz mu var?',
      supportNotice: 'Tüm yasal ve operasyonel sorularınız için bize ulaşabilirsiniz.',
      contactSupport: 'İletişim & Destek',
      responseSla: 'Taleplerinize 24-48 saat içinde dönüş sağlanır.'
    },
    terms: {
      id: 'terms',
      title: 'KULLANICI SÖZLEŞMESİ VE KULLANIM KOŞULLARI',
      shortTitle: 'Kullanıcı Sözleşmesi',
      subtitle: '(Terms of Service)',
      effectiveDate: '03.09.2026',
      provider: 'HealthLexMed',
      address: 'Bağcılar / İstanbul, Türkiye',
      email: 'help@healthlexmed.com',
      emailNotice: '(Destek taleplerine en geç 48 saat içinde yanıt verilir)',
      website: 'https://www.healthlexmed.com',
      sections: [
        {
          id: 'parties',
          title: '1. TARAFLAR VE HİZMETİN KAPSAMI',
          content: [
            'İşbu Kullanıcı Sözleşmesi ("Sözleşme"), HealthLexMed ("PLATFORM") ile platforma üye olan veya içeriklerden faydalanan kullanıcı ("ÜYE") arasında yürürlüktedir.',
            'PLATFORM; tıp fakültesi, sağlık bilimleri öğrencileri ve sağlık çalışanlarına yönelik medikal terminoloji, kök-önek-sonek (morfem) çözümlemeleri, kelime kartları ve pekiştirme modülleri sunan web tabanlı bir eğitim yazılımıdır (SaaS).'
          ]
        },
        {
          id: 'medical_disclaimer',
          title: '2. TIBBİ SORUMLULUK REDDİ (MEDICAL DISCLAIMER)',
          isAlert: true,
          alertType: 'warning',
          content: [
            'ÖNEMLİ: PLATFORM bünyesindeki tüm içerik ve materyaller yalnızca eğitsel, akademik ve kişisel gelişim amaçlıdır. Kesinlikle klinik teşhis, tanı, tedavi protokolü veya profesyonel tıbbi konsültasyon niteliği taşımaz.',
            'ÜYE, platformdaki verileri klinik kararlarında tek başına dayanak alamaz. Bilgilerin kullanımından doğabilecek tıbbi ve hukuki tüm sorumluluk münhasıran ÜYE\'ye aittir.'
          ]
        },
        {
          id: 'merchant_of_record',
          title: '3. YETKİLİ SATICI (MERCHANT OF RECORD) VE ÖDEMELER',
          isAlert: true,
          alertType: 'info',
          content: [
            'Sipariş ve ödeme süreçlerimiz, küresel yetkili satıcımız ve kayıtlı tüzel satıcı (Merchant of Record) sıfatıyla hareket eden Paddle.com Market Ltd. (Judd House, 18-29 Mora Street, London, EC1V 8BT, UK) veya bağlı iştirakleri tarafından yürütülmektedir.',
            'Kredi kartı ve finansal ödeme aracı bilgileri PLATFORM sunucularında asla saklanmaz; PCI-DSS Seviye 1 sertifikalı Paddle altyapısında işlenir.',
            'Tüm faturalandırma, vergi tahakkuku (KDV / Sales Tax) ve finansal müşteri desteği Paddle güvencesindedir.'
          ]
        },
        {
          id: 'subscription_trial',
          title: '4. ABONELİK VE 3 GÜNLÜK ÜCRETSİZ DENEME',
          content: [
            'PLATFORM, yıllık abonelik modeli (Temel Plan ve Tam Plan) ile hizmet sunmaktadır. Güncel fiyatlar sitede ve ödeme ekranında ilan edildiği gibidir.',
            'Yeni kullanıcılara tanımlanan 3 günlük ücretsiz deneme süresi boyunca paket özellikleri kısıtlamasız kullanılabilir. Deneme süresi bitmeden önce aboneliğin sonlandırılması halinde kullanıcıdan hiçbir ücret tahsil edilmez.',
            'İptal edilmeyen abonelikler, deneme süresi sonunda ve takip eden her yıl dönümünde otomatik olarak yenilenir.'
          ],
          subsections: [
            {
              title: 'Plan Değişiklikleri ve İade Politikası',
              bullets: [
                'Alt seviye bir plana geçiş (örneğin Pro\'dan Temel\'e) talep edildiğinde, değişiklik mevcut faturalandırma döneminin SONUNDA yürürlüğe girer. Dönem sonuna kadar mevcut planınızın tüm özelliklerinden yararlanmaya devam edersiniz.',
                'Bu geçiş için kısmi iade yapılmaz; ödemesi yapılmış mevcut dönem değişmeden kalır.',
                'Üst seviye bir plana geçiş (örneğin Temel\'den Pro\'ya) talep edildiğinde, fark tutarı kalan süre oranında hesaplanarak anında tahsil edilir ve yeni plan derhal aktif olur.',
                'Ömür Boyu pakete geçişte mevcut yıllık aboneliğiniz iptal edilir; kullanılmamış süre için ayrıca bir iade yapılmaz.',
                'İade şartları ve istisnalara ilişkin detaylar için [İptal ve İade Politikası](/refund) belgesine bakınız.'
              ]
            }
          ]
        },
        {
          id: 'ip_rules',
          title: '5. FİKRİ MÜLKİYET VE KULLANIM KURALLARI',
          content: [
            'Platformda yer alan morfem veritabanı, yazılım kodları, arayüz tasarımları ve algoritmalar 5846 sayılı FSEK kapsamında HealthLexMed\'e aittir.',
            'Platformda sunulan uluslararası anatomik terminoloji ve adlandırma standartları, IFAA / FIPAT (International Federation of Associations of Anatomists) tarafından yayımlanan Terminologia Anatomica (TA2) bilimsel standartlarına dayanmaktadır.',
            'Hesap devri yapılamaz; içerikler scraper/bot yazılımlarıyla çekilemez, kopyalanamaz veya ticari amaçla satılamaz.'
          ]
        },
        {
          id: 'jurisdiction',
          title: '6. UYUŞMAZLIKLARIN ÇÖZÜMÜ',
          content: [
            'İşbu sözleşmenin uygulanmasında Türk Hukuku geçerli olup, doğabilecek uyuşmazlıklarda İstanbul (Bağcılar/Bakırköy) Mahkemeleri ve İcra Daireleri yetkilidir.'
          ]
        }
      ]
    },
    privacy: {
      id: 'privacy',
      title: 'GİZLİLİK POLİTİKASI VE KVKK AYDINLATMA METNİ',
      shortTitle: 'Gizlilik ve Çerez Politikası',
      subtitle: '(Privacy Policy & KVKK)',
      effectiveDate: '16.10.2026',
      controller: 'Sıddık Çiçek (HealthLexMed), Bağcılar / İstanbul, Türkiye',
      email: 'help@healthlexmed.com',
      website: 'https://www.healthlexmed.com',
      sections: [
        {
          id: 'collected_data',
          title: '1. TOPLANAN KİŞİSEL VERİLER',
          bullets: [
            'Kimlik ve iletişim bilgileri: Ad, soyad, e-posta adresi (Google Firebase Authentication aracılığıyla).',
            'Öğrenme verileri: Öğrendiğin terimler ve morfemler, oyun ve test sonuçların, seviye, seri ve çalışma tarihlerin.',
            'Abonelik ve işlem bilgileri: İşlem numarası, plan türü, deneme ve abonelik tarihleri, abonelik durumu. Kart numarası, CVV gibi ödeme bilgileri tarafımızca işlenmez ve saklanmaz; doğrudan yetkili satıcımız Paddle tarafından işlenir.',
            'Teknik veriler: IP adresi, cihaz ve tarayıcı türü, ziyaret edilen sayfalar ve zaman bilgisi.',
            'Analitik veriler (yalnızca onay verirsen): Sitedeki sayfa ve özellik kullanımına ilişkin istatistikler.',
            'Pazarlama verileri (yalnızca onay verirsen): Reklamlarımızdan siteye gelişin ve kayıt, deneme başlatma, satın alma gibi işlemlerin reklam ölçümü amacıyla kaydı; bu kapsamda e-posta adresinin geri döndürülemez biçimde şifrelenmiş (hash) hali.'
          ]
        },
        {
          id: 'health_data_pledge',
          title: '2. SAĞLIK VERİSİ İŞLENMEME TAAHHÜDÜ',
          isAlert: true,
          alertType: 'success',
          content: [
            'HealthLexMed yalnızca bir eğitim ve referans aracıdır. Sana, bir hastaya veya bir sağlık kuruluşuna ait sağlık verisi, rapor, reçete veya anamnez kaydı toplanmaz, istenmez ve işlenmez.'
          ]
        },
        {
          id: 'legal_bases',
          title: '3. İŞLEME AMAÇLARI VE HUKUKİ SEBEPLER',
          bullets: [
            'Hesabını oluşturmak, girişini sağlamak ve öğrenme ilerlemeni saklamak: sözleşmenin kurulması ve ifası (KVKK md. 5/2-c).',
            'Abonelik, ödeme, fatura ve vergi işlemleri: sözleşmenin ifası ve hukuki yükümlülüklerin yerine getirilmesi (md. 5/2-c, 5/2-ç).',
            'Sitenin güvenliği, hataların tespiti ve çerezsiz temel trafik ölçümü (Vercel): meşru menfaat (md. 5/2-f).',
            'Analitik çerezler (Google Analytics, PostHog): açık rıza (md. 5/1).',
            'Pazarlama çerezleri ve reklam ölçümü (Meta Pikseli ve Meta Dönüşümler API\'si): açık rıza (md. 5/1).'
          ],
          content: [
            'Açık rızanı istediğin zaman sitenin alt kısmındaki "Çerez tercihleri" bağlantısından geri alabilirsin. Geri alma, o ana kadar yapılmış işlemleri etkilemez.'
          ]
        },
        {
          id: 'third_parties',
          title: '4. VERİLERİN AKTARILDIĞI HİZMET SAĞLAYICILAR VE YURT DIŞI AKTARIM',
          table: {
            headers: ['Sağlayıcı', 'Ülke', 'Amaç', 'Veri Kapsamı'],
            rows: [
              ['Paddle.com Market Ltd.', 'İngiltere / İrlanda', 'Satış, faturalandırma, abonelik yönetimi ve vergi (yetkili satıcı)', 'Ad, soyad, e-posta, tutar, işlem numarası'],
              ['Google (Firebase)', 'ABD / AB', 'Kimlik doğrulama ve veritabanı', 'Ad, e-posta, parola karması, öğrenme ilerlemesi'],
              ['Vercel Inc.', 'ABD / küresel', 'Barındırma, güvenlik ve çerezsiz trafik ölçümü', 'İstek kayıtları, IP adresi, erişim zamanı'],
              ['Google (Google Analytics 4), yalnızca onayla', 'ABD', 'Ziyaret ve kullanım istatistikleri', 'Cihaz bilgisi, sayfa ve tıklama istatistikleri, çerez kimliği'],
              ['PostHog Inc., yalnızca onayla', 'ABD', 'Özellik kullanımı analizi', 'Cihaz bilgisi, sayfa ve etkileşim istatistikleri, çerez kimliği'],
              ['Meta Platforms Ireland Ltd., yalnızca onayla', 'İrlanda / ABD', 'Reklam ölçümü ve reklamların ilgilenebilecek kişilere gösterilmesi', 'Çerez ve reklam tıklama kimliği, cihaz bilgisi, kayıt / deneme / satın alma olayları, şifrelenmiş e-posta']
            ]
          },
          content: [
            'Bu sağlayıcıların sunucuları yurt dışında bulunduğundan verilerin yurt dışına aktarılır. Aktarımlar KVKK md. 9\'daki şartlara uygun olarak yapılır. Analitik ve pazarlama verileri yalnızca onay verirsen toplanır.'
          ]
        },
        {
          id: 'retention_periods',
          title: '5. SAKLAMA SÜRELERİ',
          bullets: [
            'Hesap ve öğrenme verileri: Hesabın açık olduğu sürece saklanır, hesabını kapatman halinde silinir.',
            'Abonelik, fatura ve işlem kayıtları: İlgili mevzuatın öngördüğü süre boyunca saklanır.',
            'Çerezlerin saklama süreleri Çerez Politikası\'nda yer alır.'
          ]
        },
        {
          id: 'user_rights',
          title: '6. HAKLARIN (KVKK MD. 11)',
          content: [
            'Kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini, şartları oluştuğunda silinmesini veya yok edilmesini isteme, bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme, otomatik sistemlerle analiz sonucu aleyhine bir sonuç çıkmasına itiraz etme ve kanuna aykırı işleme nedeniyle zarara uğraman halinde zararın giderilmesini talep etme haklarına sahipsin.',
            'Verilerinin bir kopyasını Profil sayfasındaki [Verilerimi İndir](/profile) ile alabilirsin. Diğer taleplerini kayıtlı e-posta adresinden help@healthlexmed.com adresine iletebilirsin. Başvurular en geç 30 gün içinde yanıtlanır.'
          ]
        },
        {
          id: 'cookie_policy',
          title: 'ÇEREZ POLİTİKASI',
          isHeader: true,
          subtitle: 'Platform: HealthLexMed (https://www.healthlexmed.com) · Yürürlük Tarihi: 16.10.2026',
          subsections: [
            {
              title: '1. ÇEREZ NEDİR?',
              content: [
                'Çerezler ve benzeri teknolojiler (tarayıcının yerel depolama alanı dahil), ziyaret ettiğin sitenin tarayıcına kaydettiği küçük bilgilerdir. Bir kısmı sitenin çalışması için gereklidir; diğerleri yalnızca onay verirsen kullanılır.'
              ]
            },
            {
              title: '2. ÇEREZ TÜRLERİ VE SAKLAMA SÜRELERİ',
              table: {
                headers: ['Tür', 'Sağlayıcı', 'Amaç', 'Onay', 'Süre'],
                rows: [
                  ['Zorunlu', 'HealthLexMed, Firebase, Vercel', 'Giriş oturumu, güvenlik, dil tercihi ve çerez tercihinin saklanması', 'Gerekmez, kapatılamaz', 'Oturum süresince ya da tercih değiştirilene kadar'],
                  ['Analitik', 'Google Analytics 4 (_ga, _ga_*), PostHog (ph_*)', 'Sayfa ve özellik kullanımı istatistikleri', 'Gerekir', 'Google Analytics: 2 yıla kadar; PostHog: 1 yıla kadar'],
                  ['Pazarlama', 'Meta Pikseli (_fbp, _fbc)', 'Reklam sonuçlarını ölçmek ve reklamları ilgilenebilecek kişilere göstermek', 'Gerekir', '90 gün']
                ]
              },
              content: [
                'Vercel\'in trafik ölçümü çerez veya cihaz kimliği kullanmaz; yalnızca anonim toplam ziyaret sayılarını ölçer ve onaya bağlı değildir.'
              ]
            },
            {
              title: '3. ÇEREZ TERCİHLERİNİN YÖNETİMİ',
              bullets: [
                'İlk ziyaretinde çıkan bildirimde "Tümünü kabul et", "Yalnızca zorunlu" veya "Tercihleri yönet" seçeneklerinden birini seçebilirsin. Bildirimi kapatman "Yalnızca zorunlu" ile aynı sonucu doğurur.',
                'Tercihini istediğin zaman sitenin alt kısmındaki "Çerez tercihleri" bağlantısından değiştirebilirsin.',
                'Tarayıcı ayarlarından çerezleri silebilir veya engelleyebilirsin. Zorunlu çerezleri engellemen halinde giriş gibi bazı özellikler çalışmayabilir.'
              ],
              content: [
                'Sorun veya itirazın için: help@healthlexmed.com'
              ]
            }
          ]
        }
      ]
    },
    refund: {
      id: 'refund',
      title: 'İADE VE İPTAL POLİTİKASI',
      shortTitle: 'İade ve İptal Politikası',
      subtitle: '(Refund & Cancellation Policy)',
      effectiveDate: '03.09.2026',
      platform: 'HealthLexMed (https://www.healthlexmed.com)',
      supportEmail: 'help@healthlexmed.com (48 saat içinde yanıtlanır)',
      paddleSupport: 'https://paddle.net (Hızlı İptal/İade)',
      sections: [
        {
          id: 'trial_cancellation',
          title: '1. 3 GÜNLÜK ÜCRETSİZ DENEME İPTALİ',
          isAlert: true,
          alertType: 'success',
          content: [
            '3 günlük deneme süresi başlatan kullanıcılar, aboneliklerini 72 saatlik süre dolmadan önce istedikleri an sonlandırabilir.',
            'İptal işlemi; profil ayarlarından veya Paddle tarafından e-posta adresinize gönderilen faturadaki "Manage Subscription / Cancel" linki üzerinden tek tıkla yapılabilir.',
            'Deneme süresi dolmadan yapılan iptallerde karttan hiçbir ücret çekilmez ($0 / 0 TL).'
          ]
        },
        {
          id: 'annual_cancellation',
          title: '2. YILLIK ABONELİK İPTALİ',
          content: [
            'Yıllık aboneliğinizi dilediğiniz an iptal edebilirsiniz.',
            'İptal işlemi, bir sonraki fatura döneminde kartınızdan otomatik çekim yapılmasını durdurur. İptal talebinde bulunulan mevcut yıllık dönemin bitimine kadar platforma tam erişiminiz devam eder.'
          ]
        },
        {
          id: 'withdrawal_refund',
          title: '3. CAYMA HAKKI VE İADE ŞARTLARI',
          content: [
            'Mesafeli Sözleşmeler Yönetmeliği m.15/1-ğ ve AB Tüketici Hakları Direktifi uyarınca; deneme süresi bittikten sonra anında ifa edilen dijital eğitim yazılımlarında yasal 14 günlük cayma hakkı istisna kapsamındadır.',
            'Bununla birlikte yetkili satıcımız Paddle ve HealthLexMed, aşağıdaki koşullarda 14 gün içinde yapılan başvurularda tam ücret iadesi yapmayı taahhüt eder:'
          ],
          bullets: [
            'Teknik bir arıza sebebiyle platforma 48 saatten uzun süre erişilememesi,',
            'Sistem hatasından kaynaklanan mükerrer (çift) faturalandırma yapılması,',
            'Kullanıcının rızası dışındaki yetkisiz kart işlemleri.'
          ],
          extraNotice: 'İade taleplerinizi Sipariş Numarası (Order ID) ile birlikte help@healthlexmed.com adresine veya doğrudan paddle.net portalına iletebilirsiniz. İadeler onaylandığında 5-10 iş günü içinde ödeme yapılan karta aktarılır.'
        },
        {
          id: 'plan_changes_refund',
          title: '4. PLAN DEĞİŞİKLİKLERİNDE İADE DURUMU',
          bullets: [
            'Alt seviye bir plana geçişte (örn. Pro\'dan Temel\'e) veya Ömür Boyu pakete geçişte, bu maddenin yukarısında belirtilen istisnai teknik iade koşulları (teknik arıza, mükerrer fatura, yetkisiz işlem) dışında kısmi iade yapılmaz. Detaylı kurallar için [Kullanım Koşulları](/terms)\'ndaki "Plan Değişiklikleri ve İade Politikası" bölümüne bakınız.',
            'Üst seviye bir plana geçişte (örn. Temel\'den Pro\'ya) tahsil edilen fark tutarı için de aynı istisnai koşullar dışında iade yapılmaz.'
          ]
        }
      ]
    }
  },
  en: {
    nav: {
      terms: 'Terms of Service',
      privacy: 'Privacy & Cookie Policy',
      refund: 'Refund & Cancellation Policy',
      backToHome: 'Back to Home',
      needHelp: 'Have questions?',
      supportNotice: 'Feel free to reach out to us for any legal, billing, or operational inquiries.',
      contactSupport: 'Contact & Support',
      responseSla: 'Requests are replied within 24-48 hours.'
    },
    terms: {
      id: 'terms',
      title: 'TERMS OF SERVICE AND USER AGREEMENT',
      shortTitle: 'Terms of Service',
      subtitle: '(Terms of Service)',
      effectiveDate: 'September 3, 2026',
      provider: 'HealthLexMed',
      address: 'Bagcilar / Istanbul, Turkey',
      email: 'help@healthlexmed.com',
      emailNotice: '(Inquiries responded to within 48 hours at latest)',
      website: 'https://www.healthlexmed.com',
      sections: [
        {
          id: 'parties',
          title: '1. PARTIES AND SCOPE OF SERVICE',
          content: [
            'This Terms of Service agreement ("Agreement") is entered into between HealthLexMed ("PLATFORM") and the user ("USER") who registers or accesses content on the platform.',
            'PLATFORM is a web-based educational SaaS application offering medical terminology, prefix-root-suffix (morpheme) decodings, flashcards, and interactive practice modules designed for medical, healthcare students, and practitioners.'
          ]
        },
        {
          id: 'medical_disclaimer',
          title: '2. MEDICAL DISCLAIMER',
          isAlert: true,
          alertType: 'warning',
          content: [
            'IMPORTANT: All content, data, and materials within the PLATFORM are intended strictly for educational, academic, and self-study purposes. They do not constitute clinical diagnosis, medical advice, treatment protocols, or professional consultation in any way.',
            'The USER may not rely on platform information as the sole basis for clinical decisions. Any medical or legal liability arising from the application of this information rests exclusively with the USER.'
          ]
        },
        {
          id: 'merchant_of_record',
          title: '3. MERCHANT OF RECORD AND PAYMENTS',
          isAlert: true,
          alertType: 'info',
          content: [
            'Order and payment processing services are conducted by our authorized global legal Merchant of Record, Paddle.com Market Ltd. (Judd House, 18-29 Mora Street, London, EC1V 8BT, UK) or its subsidiaries.',
            'Credit card details and financial payment data are never stored on PLATFORM servers; they are processed securely through PCI-DSS Level 1 compliant Paddle infrastructure.',
            'All billing, sales tax/VAT collection, and financial transaction customer support are guaranteed by Paddle.'
          ]
        },
        {
          id: 'subscription_trial',
          title: '4. SUBSCRIPTION AND 3-DAY FREE TRIAL',
          content: [
            'The PLATFORM provides services based on an annual subscription model (Basic Plan and Full Plan). Current pricing is displayed transparently on the website and checkout screens.',
            'During the 3-day free trial provided to new users, all plan features are accessible without restriction. If the subscription is cancelled before the trial ends, no charge will be made ($0.00).',
            'Subscriptions not cancelled before the trial expires will automatically renew at the end of the trial period and annually thereafter.'
          ],
          subsections: [
            {
              title: 'Plan Changes and Refund Policy',
              bullets: [
                'When downgrading to a lower-tier plan (e.g., from Pro to Basic), the change takes effect at the END of the current billing period. You will continue to enjoy all features of your current plan until the end of the period.',
                'No partial refund is provided for this downgrade; the paid current billing period remains unchanged.',
                'When upgrading to a higher-tier plan (e.g., from Basic to Pro), the price difference is calculated on a pro-rata basis for the remaining time and billed immediately, activating the new plan right away.',
                'When transitioning to the Lifetime package, your existing annual recurring subscription is cancelled immediately; no partial refund is issued for unused time.',
                'For detailed refund conditions and exceptions, please refer to our [Refund & Cancellation Policy](/refund).'
              ]
            }
          ]
        },
        {
          id: 'ip_rules',
          title: '5. INTELLECTUAL PROPERTY AND USAGE RESTRICTIONS',
          content: [
            'The morpheme database, proprietary code, user interface designs, and algorithms belong to HealthLexMed under applicable intellectual property laws.',
            'International anatomical terminology and anatomical classifications presented on the platform align with the Terminologia Anatomica (TA2) scientific standard published by IFAA / FIPAT (International Federation of Associations of Anatomists).',
            'Accounts may not be shared or transferred; platform content may not be scraped, copied, reverse engineered, or redistributed for commercial gain.'
          ]
        },
        {
          id: 'jurisdiction',
          title: '6. DISPUTE RESOLUTION AND GOVERNING LAW',
          content: [
            'This agreement is governed by the laws of the Republic of Turkey. Any disputes shall be submitted to the exclusive jurisdiction of the Courts and Execution Offices of Istanbul (Bagcilar / Bakirkoy).'
          ]
        }
      ]
    },
    privacy: {
      id: 'privacy',
      title: 'PRIVACY POLICY & KVKK / GDPR NOTICE',
      shortTitle: 'Privacy & Cookie Policy',
      subtitle: '(Privacy Policy & GDPR/KVKK)',
      effectiveDate: 'October 16, 2026',
      controller: 'Sıddık Çiçek (HealthLexMed), Bağcılar / Istanbul, Türkiye',
      email: 'help@healthlexmed.com',
      website: 'https://www.healthlexmed.com',
      sections: [
        {
          id: 'collected_data',
          title: '1. PERSONAL DATA WE COLLECT',
          bullets: [
            'Identity and contact details: Name and email address (via Google Firebase Authentication).',
            'Learning data: Terms and morphemes you have learned, your game and quiz results, level, streak and study dates.',
            'Subscription and transaction details: Transaction ID, plan type, trial and subscription dates, subscription status. Payment card details such as card number and CVV are never processed or stored by us; they are handled directly by our Merchant of Record, Paddle.',
            'Technical data: IP address, device and browser type, pages visited and timestamps.',
            'Analytics data (only with your consent): Statistics on how pages and features are used.',
            'Marketing data (only with your consent): Records of your arrival from our ads and of actions such as sign-up, trial start and purchase, for ad measurement; this includes an irreversibly encrypted (hashed) version of your email address.'
          ]
        },
        {
          id: 'health_data_pledge',
          title: '2. NO HEALTH DATA',
          isAlert: true,
          alertType: 'success',
          content: [
            'HealthLexMed is solely an educational and reference tool. We do not collect, request or process health data, reports, prescriptions or medical histories about you, any patient or any healthcare institution.'
          ]
        },
        {
          id: 'legal_bases',
          title: '3. PURPOSES AND LEGAL BASES',
          bullets: [
            'Creating your account, signing you in and saving your learning progress: performance of a contract (KVKK Art. 5/2-c; GDPR Art. 6(1)(b)).',
            'Subscriptions, payments, invoicing and tax: performance of a contract and legal obligations (KVKK Art. 5/2-c, 5/2-ç; GDPR Art. 6(1)(b), 6(1)(c)).',
            'Site security, error detection and cookieless basic traffic measurement (Vercel): legitimate interests (KVKK Art. 5/2-f; GDPR Art. 6(1)(f)).',
            'Analytics cookies (Google Analytics, PostHog): consent (KVKK Art. 5/1; GDPR Art. 6(1)(a)).',
            'Marketing cookies and ad measurement (Meta Pixel and Meta Conversions API): consent (KVKK Art. 5/1; GDPR Art. 6(1)(a)).'
          ],
          content: [
            'You can withdraw your consent at any time via the "Cookie preferences" link at the bottom of the site. Withdrawal does not affect processing carried out before it.'
          ]
        },
        {
          id: 'third_parties',
          title: '4. SERVICE PROVIDERS AND INTERNATIONAL TRANSFERS',
          table: {
            headers: ['Provider', 'Country', 'Purpose', 'Data'],
            rows: [
              ['Paddle.com Market Ltd.', 'UK / Ireland', 'Checkout, invoicing, subscription management and tax (Merchant of Record)', 'Name, email, amount, transaction ID'],
              ['Google (Firebase)', 'US / EU', 'Authentication and database', 'Name, email, password hash, learning progress'],
              ['Vercel Inc.', 'US / global', 'Hosting, security and cookieless traffic measurement', 'Request logs, IP address, timestamps'],
              ['Google (Google Analytics 4), consent only', 'US', 'Visit and usage statistics', 'Device info, page and click statistics, cookie ID'],
              ['PostHog Inc., consent only', 'US', 'Feature usage analytics', 'Device info, page and interaction statistics, cookie ID'],
              ['Meta Platforms Ireland Ltd., consent only', 'Ireland / US', 'Ad measurement and showing ads to people who may be interested', 'Cookie and ad click IDs, device info, sign-up / trial / purchase events, hashed email']
            ]
          },
          content: [
            'Because these providers\' servers are located abroad, your data is transferred internationally. Transfers are made in accordance with Article 9 of the KVKK and, where applicable, Chapter V of the GDPR. Analytics and marketing data are collected only with your consent.'
          ]
        },
        {
          id: 'retention_periods',
          title: '5. RETENTION',
          bullets: [
            'Account and learning data: Kept while your account is open and deleted when you close your account.',
            'Subscription, invoice and transaction records: Kept for the period required by applicable law.',
            'Cookie retention periods are listed in the Cookie Policy.'
          ]
        },
        {
          id: 'user_rights',
          title: '6. YOUR RIGHTS (KVKK ART. 11 AND GDPR)',
          content: [
            'You have the right to learn whether your personal data is processed, to request information about it, to learn the purpose of processing and whether it is used accordingly, to know the third parties it is transferred to, to request correction of incomplete or inaccurate data, to request deletion or destruction where the conditions are met, to request that these actions be notified to third parties, to object to an adverse outcome resulting solely from automated analysis, and to claim compensation for damage caused by unlawful processing. Under the GDPR you also have the rights to restriction, data portability and objection, and the right to lodge a complaint with your local data protection authority.',
            'You can get a copy of your data via "Download My Data" on your Profile page. Send any other request from your registered email address to help@healthlexmed.com. Requests are answered within 30 days.'
          ]
        },
        {
          id: 'cookie_policy',
          title: 'COOKIE POLICY',
          isHeader: true,
          subtitle: 'Platform: HealthLexMed (https://www.healthlexmed.com) · Effective Date: October 16, 2026',
          subsections: [
            {
              title: '1. WHAT ARE COOKIES?',
              content: [
                'Cookies and similar technologies (including your browser\'s local storage) are small pieces of information that a website saves in your browser. Some are needed for the site to work; others are used only with your consent.'
              ]
            },
            {
              title: '2. COOKIE CATEGORIES AND RETENTION',
              table: {
                headers: ['Category', 'Provider', 'Purpose', 'Consent', 'Duration'],
                rows: [
                  ['Essential', 'HealthLexMed, Firebase, Vercel', 'Sign-in session, security, language preference and storing your cookie choice', 'Not required, cannot be turned off', 'Session or until you change your choice'],
                  ['Analytics', 'Google Analytics 4 (_ga, _ga_*), PostHog (ph_*)', 'Page and feature usage statistics', 'Required', 'Google Analytics: up to 2 years; PostHog: up to 1 year'],
                  ['Marketing', 'Meta Pixel (_fbp, _fbc)', 'Measuring ad results and showing ads to people who may be interested', 'Required', '90 days']
                ]
              },
              content: [
                'Vercel\'s traffic measurement does not use cookies or device identifiers; it only counts anonymous aggregate visits and does not depend on consent.'
              ]
            },
            {
              title: '3. MANAGING YOUR COOKIE PREFERENCES',
              bullets: [
                'On your first visit you can choose "Accept all", "Essential only" or "Manage preferences". Closing the notice has the same effect as "Essential only".',
                'You can change your choice at any time via the "Cookie preferences" link at the bottom of the site.',
                'You can delete or block cookies in your browser settings. If you block essential cookies, some features such as sign-in may not work.'
              ],
              content: [
                'Questions or objections: help@healthlexmed.com'
              ]
            }
          ]
        }
      ]
    },
    refund: {
      id: 'refund',
      title: 'REFUND AND CANCELLATION POLICY',
      shortTitle: 'Refund & Cancellation Policy',
      subtitle: '(Refund & Cancellation Policy)',
      effectiveDate: 'September 3, 2026',
      platform: 'HealthLexMed (https://www.healthlexmed.com)',
      supportEmail: 'help@healthlexmed.com (Replied within 48 hours)',
      paddleSupport: 'https://paddle.net (Fast Cancellation & Refund Portal)',
      sections: [
        {
          id: 'trial_cancellation',
          title: '1. 3-DAY FREE TRIAL CANCELLATION',
          isAlert: true,
          alertType: 'success',
          content: [
            'Users activating a 3-day free trial may cancel their subscription at any time prior to the expiration of the 72-hour trial window.',
            'Cancellation can be executed with a single click via your account Profile page or via the "Manage Subscription / Cancel" link found on your receipt email from Paddle.',
            'If cancelled during the trial period, no charges will be billed to your card ($0.00 / 0 TL).'
          ]
        },
        {
          id: 'annual_cancellation',
          title: '2. ANNUAL SUBSCRIPTION CANCELLATION',
          content: [
            'You may cancel your recurring annual subscription at any point in time.',
            'Cancellation halts automatic recurring renewal for subsequent billing terms. You retain full access to all features until the end of your currently paid annual period.'
          ]
        },
        {
          id: 'withdrawal_refund',
          title: '3. RIGHT OF WITHDRAWAL AND REFUND CONDITIONS',
          content: [
            'In accordance with EU Consumer Rights Directive standards and Distance Contract Regulations, digital SaaS educational software instantly executed with consumer consent is generally exempt from the standard 14-day cooling-off withdrawal right once the free trial ends.',
            'Nonetheless, HealthLexMed and our Merchant of Record Paddle commit to issuing a full refund within 14 days under the following circumstances:'
          ],
          bullets: [
            'Inability to access the service for more than 48 consecutive hours due to technical server outages,',
            'Duplicate or erroneous billing transactions resulting from platform system errors,',
            'Unauthorized transaction claims substantiated outside user authorization.'
          ],
          extraNotice: 'To file a refund request, contact help@healthlexmed.com including your Order ID, or submit it directly at paddle.net. Approved refunds will be credited back to your original payment card within 5-10 business days.'
        },
        {
          id: 'plan_changes_refund',
          title: '4. REFUND CONDITIONS ON PLAN CHANGES',
          bullets: [
            'When downgrading to a lower-tier plan (e.g., from Pro to Basic) or transitioning to the Lifetime package, no partial refund is issued, except under the exceptional technical refund conditions specified above (technical outages, duplicate billing, unauthorized transactions). For comprehensive rules, please consult the "Plan Changes and Refund Policy" section in our [Terms of Service](/terms).',
            'Any price difference collected when upgrading to a higher-tier plan (e.g., from Basic to Pro) is likewise non-refundable except under the same exceptional technical circumstances.'
          ]
        }
      ]
    }
  }
};
