import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { getInitialTermCount } from '@/services/termCountService';

export const generateProgressPdf = async ({
  user,
  stats = {},
  streak = {},
  progress = {},
  terms = [],
  quizScores = [],
  matchScores = [],
  morphemeScores = [],
  planName = 'Temel',
  isTr = true
}) => {
  // 14 Kategori Listesi
  const catList = [
    { id: 'skull_bones', name: isTr ? 'Kafatası Kemikleri' : 'Skull Bones' },
    { id: 'trunk_bones', name: isTr ? 'Gövde Kemikleri' : 'Trunk Bones' },
    { id: 'face_bones', name: isTr ? 'Yüz Kemikleri' : 'Facial Bones' },
    { id: 'upper_extremity_bones', name: isTr ? 'Üst Ekstremite Kemikleri' : 'Upper Extremity Bones' },
    { id: 'upper_extremity_joints', name: isTr ? 'Üst Ekstremite Eklemleri' : 'Upper Extremity Joints' },
    { id: 'lower_extremity_bones', name: isTr ? 'Alt Ekstremite Kemikleri' : 'Lower Extremity Bones' },
    { id: 'lower_extremity_joints', name: isTr ? 'Alt Ekstremite Eklemleri' : 'Lower Extremity Joints' },
    { id: 'spine_joints', name: isTr ? 'Omurga Eklemleri' : 'Spine Joints' },
    { id: 'head_and_neck_joints', name: isTr ? 'Kafa ve Boyun Eklemleri' : 'Head & Neck Joints' },
    { id: 'head_and_neck_muscles', name: isTr ? 'Baş ve Boyun Kasları' : 'Head & Neck Muscles' },
    { id: 'muscle_structures', name: isTr ? 'Kas ve Kasla İlişkili Yapılar' : 'Muscle Structures' },
    { id: 'bone_structures', name: isTr ? 'Kemik / İskelet Yapıları' : 'Bone Structures' },
    { id: 'movement_terms', name: isTr ? 'Hareket Terimleri' : 'Movement Terms' },
    { id: 'anatomic_direction', name: isTr ? 'Anatomik Yön Terimleri' : 'Anatomical Directions' }
  ];

  const totalTermsCount = terms.length || getInitialTermCount();
  const learnedCount = Object.values(progress).filter(p => p?.learned).length || stats.learnedTerms || 0;
  const generalPct = totalTermsCount > 0 ? Math.round((learnedCount / totalTermsCount) * 100) : 0;

  // Kategori hesaplamaları
  const categoryStats = catList.map(cat => {
    const catTerms = terms.filter(t => t.category === cat.id || t.subcategory === cat.id);
    const catLearned = catTerms.filter(t => progress[t.id]?.learned).length;
    const catTotal = catTerms.length;
    const pct = catTotal > 0 ? Math.round((catLearned / catTotal) * 100) : 0;
    return { ...cat, learned: catLearned, total: catTotal, pct };
  });

  // Rozetler listesi
  const badges = [
    { id: 'first_step', icon: '🥇', name: isTr ? 'İlk Adım' : 'First Step', desc: isTr ? '1 terim öğrenildi' : '1 term learned', unlocked: learnedCount >= 1 },
    { id: 'quick_start', icon: '🎯', name: isTr ? 'Hızlı Başlangıç' : 'Quick Start', desc: isTr ? '10 terim öğrenildi' : '10 terms learned', unlocked: learnedCount >= 10 },
    { id: 'star_student', icon: '🌟', name: isTr ? 'Yıldız Öğrenci' : 'Star Student', desc: isTr ? '50 terim öğrenildi' : '50 terms learned', unlocked: learnedCount >= 50 },
    { id: 'quiz_master', icon: '🏆', name: isTr ? 'Quiz Üstadı' : 'Quiz Master', desc: isTr ? '5 quiz tamamlandı' : '5 quizzes completed', unlocked: (stats.quizzesTaken || quizScores.length) >= 5 },
    { id: 'on_fire', icon: '🔥', name: isTr ? 'Ateşli Seri' : 'On Fire', desc: isTr ? '7 gün kesintisiz çalışma' : '7-day study streak', unlocked: (streak.currentStreak || 0) >= 7 || (streak.longestStreak || 0) >= 7 },
    { id: 'perfect_score', icon: '💯', name: isTr ? 'Kusursuz Skor' : 'Perfect Score', desc: isTr ? '%100 quiz başarısı' : '100% quiz accuracy', unlocked: quizScores.some(s => s.percentage === 100) }
  ];

  const now = new Date();
  const dateFormatted = now.toLocaleDateString(isTr ? 'tr-TR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const timeFormatted = now.toLocaleTimeString(isTr ? 'tr-TR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // HTML Rapor Şablonu
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '800px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  container.style.boxSizing = 'border-box';
  container.style.padding = '36px 40px';

  container.innerHTML = `
    <div style="font-family: inherit; color: #1e293b; line-height: 1.45;">
      
      <!-- HEADER -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f766e; padding-bottom: 16px; margin-bottom: 24px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #0f766e, #0d9488); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">
              +
            </div>
            <span style="font-size: 22px; font-weight: 800; color: #0f766e; letter-spacing: -0.5px;">Health<span style="color: #d97706;">Lex</span>Med</span>
          </div>
          <h1 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 8px 0 2px 0;">${isTr ? 'Kullanıcı İlerleme ve Başarı Raporu' : 'User Progress & Achievement Report'}</h1>
          <p style="font-size: 12px; color: #64748b; margin: 0;">${isTr ? 'Medikal Terminoloji Öğrenme İstatistikleri ve Sertifikasyon Verisi' : 'Medical Terminology Learning Statistics & Certification Data'}</p>
        </div>
        <div style="text-align: right; font-size: 11px; color: #64748b;">
          <div style="font-weight: 600; color: #0f766e; font-size: 12px;">RESMİ RAPOR</div>
          <div style="margin-top: 4px;"><strong>${isTr ? 'Tarih:' : 'Date:'}</strong> ${dateFormatted}</div>
          <div><strong>${isTr ? 'Saat:' : 'Time:'}</strong> ${timeFormatted}</div>
          <div style="margin-top: 4px; display: inline-block; padding: 2px 8px; background: #f1f5f9; border-radius: 4px; font-weight: 600; color: #334155;">ID: ${user?.uid ? user.uid.slice(0, 12) : 'USER-GUEST'}</div>
        </div>
      </div>

      <!-- KULLANICI BİLGİ KARTI -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; margin-bottom: 22px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; font-size: 12px;">
        <div>
          <div style="color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">${isTr ? 'Kullanıcı Adı' : 'Name'}</div>
          <div style="font-weight: 700; color: #0f172a; font-size: 13px; margin-top: 2px;">${user?.name || user?.displayName || (isTr ? 'Kullanıcı' : 'User')}</div>
        </div>
        <div>
          <div style="color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">${isTr ? 'E-posta' : 'Email'}</div>
          <div style="font-weight: 600; color: #334155; margin-top: 2px; word-break: break-all;">${user?.email || '-'}</div>
        </div>
        <div>
          <div style="color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">${isTr ? 'Aktif Paket' : 'Plan'}</div>
          <div style="font-weight: 700; color: #0f766e; margin-top: 2px; text-transform: capitalize;">★ ${planName}</div>
        </div>
        <div>
          <div style="color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">${isTr ? 'Kayıt Tarihi' : 'Member Since'}</div>
          <div style="font-weight: 600; color: #334155; margin-top: 2px;">${user?.joinDate ? new Date(user.joinDate).toLocaleDateString(isTr ? 'tr-TR' : 'en-US') : '-'}</div>
        </div>
      </div>

      <!-- GENEL İSTATİSTİKLER (4 KUTU) -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;">
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-top: 3px solid #0f766e; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-size: 11px; color: #64748b; font-weight: 600;">${isTr ? 'ÖĞRENİLEN TERİM' : 'LEARNED TERMS'}</div>
          <div style="font-size: 20px; font-weight: 800; color: #0f766e; margin: 4px 0 2px 0;">${learnedCount} <span style="font-size: 12px; font-weight: 500; color: #94a3b8;">/ ${totalTermsCount}</span></div>
          <div style="font-size: 10px; font-weight: 700; color: #059669;">%${generalPct} ${isTr ? 'Tamamlandı' : 'Completed'}</div>
        </div>

        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-top: 3px solid #d97706; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-size: 11px; color: #64748b; font-weight: 600;">${isTr ? 'GÜNLÜK SERİ' : 'DAILY STREAK'}</div>
          <div style="font-size: 20px; font-weight: 800; color: #d97706; margin: 4px 0 2px 0;">${streak.currentStreak || 0} <span style="font-size: 12px; font-weight: 500; color: #94a3b8;">${isTr ? 'Gün' : 'Days'}</span></div>
          <div style="font-size: 10px; color: #64748b;">${isTr ? 'En uzun:' : 'Longest:'} <strong>${streak.longestStreak || streak.currentStreak || 0} ${isTr ? 'gün' : 'days'}</strong></div>
        </div>

        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-top: 3px solid #0284c7; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-size: 11px; color: #64748b; font-weight: 600;">${isTr ? 'KART TEKRARI' : 'CARD REVIEWS'}</div>
          <div style="font-size: 20px; font-weight: 800; color: #0284c7; margin: 4px 0 2px 0;">${stats.totalReviews || 0}</div>
          <div style="font-size: 10px; color: #64748b;">${isTr ? 'Toplam çalışma' : 'Total reviews'}</div>
        </div>

        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-top: 3px solid #7c3aed; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-size: 11px; color: #64748b; font-weight: 600;">${isTr ? 'QUİZ BAŞARISI' : 'QUIZ ACCURACY'}</div>
          <div style="font-size: 20px; font-weight: 800; color: #7c3aed; margin: 4px 0 2px 0;">%${stats.averageQuizScore || (quizScores.length > 0 ? Math.round(quizScores.reduce((a, b) => a + (b.percentage || 0), 0) / quizScores.length) : 0)}</div>
          <div style="font-size: 10px; color: #64748b;">${stats.quizzesTaken || quizScores.length} ${isTr ? 'quiz tamamlandı' : 'quizzes completed'}</div>
        </div>
      </div>

      <!-- KATEGORİ BAZINDA İLERLEME TABLOSU -->
      <div style="margin-bottom: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <h2 style="font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0;">
            ${isTr ? '14 Anatomik Kategoride İlerleme Dağılımı' : 'Progress Across 14 Anatomical Categories'}
          </h2>
          <span style="font-size: 11px; color: #64748b;">${totalTermsCount} ${isTr ? 'toplam medikal terim' : 'total terms'}</span>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 11px; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
          <thead>
            <tr style="background: #0f766e; color: #ffffff; text-align: left;">
              <th style="padding: 6px 10px; font-weight: 600;">#</th>
              <th style="padding: 6px 10px; font-weight: 600;">${isTr ? 'Kategori Adı' : 'Category Name'}</th>
              <th style="padding: 6px 10px; font-weight: 600; text-align: center;">${isTr ? 'Öğrenilen / Toplam' : 'Learned / Total'}</th>
              <th style="padding: 6px 10px; font-weight: 600; text-align: center; width: 140px;">${isTr ? 'İlerleme Çubuğu' : 'Progress Bar'}</th>
              <th style="padding: 6px 10px; font-weight: 600; text-align: right;">${isTr ? 'Yüzde' : 'Percent'}</th>
            </tr>
          </thead>
          <tbody>
            ${categoryStats.map((c, idx) => `
              <tr style="background: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'}; border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 5px 10px; color: #94a3b8; font-weight: 600;">${idx + 1}</td>
                <td style="padding: 5px 10px; font-weight: 600; color: #1e293b;">${c.name}</td>
                <td style="padding: 5px 10px; text-align: center; color: #475569;">${c.learned} / ${c.total}</td>
                <td style="padding: 5px 10px; text-align: center;">
                  <div style="background: #e2e8f0; border-radius: 4px; height: 7px; width: 100%; overflow: hidden;">
                    <div style="background: ${c.pct >= 75 ? '#059669' : c.pct >= 30 ? '#0d9488' : '#d97706'}; height: 100%; width: ${Math.max(2, c.pct)}%;"></div>
                  </div>
                </td>
                <td style="padding: 5px 10px; text-align: right; font-weight: 700; color: ${c.pct > 0 ? '#0f766e' : '#94a3b8'};">%${c.pct}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- OYUN VE MOD İSTATİSTİKLERİ & ROZETLER (YAN YANA 2 SÜTUN) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 22px;">
        
        <!-- OYUN VE ÇALIŞMA MODLARI -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
          <h3 style="font-size: 12px; font-weight: 700; color: #0f172a; text-transform: uppercase; margin: 0 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
            ${isTr ? 'Oyun & Çalışma Modları' : 'Game & Study Modes'}
          </h3>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0; border-bottom: 1px dashed #e2e8f0;">
              <span>🗂️ <strong>${isTr ? 'Flashcard Kartları' : 'Flashcards'}:</strong></span>
              <span style="font-weight: 600; color: #0f766e;">${stats.totalReviews || 0} ${isTr ? 'kart çalışıldı' : 'reviews'}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0; border-bottom: 1px dashed #e2e8f0;">
              <span>🎯 <strong>${isTr ? 'Kelime Eşleştirme' : 'Matching Game'}:</strong></span>
              <span style="font-weight: 600; color: #0f766e;">${stats.matchGamesPlayed || matchScores.length || 0} ${isTr ? 'oyun tamamlandı' : 'played'}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0; border-bottom: 1px dashed #e2e8f0;">
              <span>🏆 <strong>${isTr ? 'Anatomi Quiz' : 'Anatomy Quiz'}:</strong></span>
              <span style="font-weight: 600; color: #0f766e;">${stats.quizzesTaken || quizScores.length || 0} ${isTr ? 'test çözüldü' : 'taken'}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0;">
              <span>🧩 <strong>${isTr ? 'Morfem Yapıcı' : 'Morpheme Builder'}:</strong></span>
              <span style="font-weight: 600; color: #0f766e;">${morphemeScores.length || 0} ${isTr ? 'oturum' : 'sessions'}</span>
            </div>
          </div>
        </div>

        <!-- BAŞARILAR VE ROZETLER -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
          <h3 style="font-size: 12px; font-weight: 700; color: #0f172a; text-transform: uppercase; margin: 0 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
            ${isTr ? 'Kazanılan Rozetler & Hedefler' : 'Badges & Achievements'}
          </h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            ${badges.map(b => `
              <div style="background: #ffffff; border: 1px solid ${b.unlocked ? '#fcd34d' : '#e2e8f0'}; border-radius: 6px; padding: 6px 8px; display: flex; align-items: center; gap: 8px; opacity: ${b.unlocked ? '1' : '0.55'};">
                <span style="font-size: 16px;">${b.icon}</span>
                <div style="overflow: hidden;">
                  <div style="font-size: 10px; font-weight: 700; color: #1e293b; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${b.name}</div>
                  <div style="font-size: 9px; color: ${b.unlocked ? '#d97706' : '#94a3b8'}; font-weight: 600;">${b.unlocked ? (isTr ? '✓ Kazanıldı' : '✓ Unlocked') : (isTr ? '🔒 Kilitli' : '🔒 Locked')}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- FOOTER & WATERMARK -->
      <div style="border-top: 1px solid #cbd5e1; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #64748b;">
        <div>
          <strong>HealthLex Medical Terminology System</strong> · <a href="https://www.healthlexmed.com" style="color: #0f766e; text-decoration: none;">www.healthlexmed.com</a>
        </div>
        <div>
          ${isTr ? 'Bu belge dijital olarak oluşturulmuştur ve kullanıcının anlık platform verilerini yansıtır.' : 'This document is digitally generated from live platform progress data.'}
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Dosya adı: HealthLex-Ilerleme-Raporu-[KULLANICI_ADI]-[TARIH].pdf
    const rawName = user?.name || user?.displayName || 'Kullanici';
    const sanitizedName = rawName
      .trim()
      .replace(/[\s\/\\]+/g, '_')
      .replace(/[^a-zA-Z0-9_\u00C0-\u017F-]/g, '');
    const dateStamp = now.toISOString().split('T')[0];
    const fileName = `HealthLex-Ilerleme-Raporu-${sanitizedName}-${dateStamp}.pdf`;

    pdf.save(fileName);
    return true;
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
};
