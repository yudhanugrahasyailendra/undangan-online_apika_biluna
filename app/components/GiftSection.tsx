// 'use client';

// import { useCallback } from 'react';
// import { invitationData } from '../data/invitation-data';
// import { useToast } from './ToastProvider';

// export default function GiftSection() {
//   const { showToast } = useToast();

//   // const copyText = useCallback((type: 'account-number' | 'account-name') => {
//   //   let text = '';
//   //   if (type === 'account-number') {
//   //     text = invitationData.accountNumber;
//   //     showToast('✅ Nomor rekening berhasil disalin!', 'fa-copy');
//   //   } else if (type === 'account-name') {
//   //     text = invitationData.accountName;
//   //     showToast('✅ Nama penerima berhasil disalin!', 'fa-user');
//   //   }
//   //   if (navigator.clipboard) {
//   //     navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
//   //   } else {
//   //     fallbackCopy(text);
//   //   }
//   // }, [showToast]);

//   const fallbackCopy = (text: string) => {
//     const ta = document.createElement('textarea');
//     ta.value = text;
//     ta.style.position = 'fixed';
//     ta.style.opacity = '0';
//     document.body.appendChild(ta);
//     ta.select();
//     document.execCommand('copy');
//     document.body.removeChild(ta);
//   };

//   return (
//     <section id="gift">
//       <div className="section-tag reveal">❈ Tanda Kasih ❈</div>
//       <h2 className="section-title reveal">
//         Hadiah &amp;<br /><em style={{ fontStyle: 'italic', color: 'var(--mauve)' }}>Amplop Digital</em>
//       </h2>
//       <div className="section-divider reveal"></div>

//       <p className="gift-intro reveal">
//         Kehadiran dan doa restu Bapak/Ibu/Saudara/i sudah merupakan karunia terbesar bagi kami. Namun apabila berkenan mengirimkan tanda kasih:
//       </p>

//       <div className="bank-card reveal reveal-delay-1">
//         <div className="bank-card-icon">🏦</div>
//         <p className="bank-name-label">Bank</p>
//         <p className="bank-name">{invitationData.bankName}</p>
//         <p className="bank-number">{invitationData.accountNumber}</p>
//         <p className="bank-holder">a.n. {invitationData.accountName}</p>
//         <div className="copy-group">
//           <button className="btn-copy" onClick={() => copyText('account-number')}>
//             <i className="fa-regular fa-copy"></i> Salin No. Rek
//           </button>
//           <button className="btn-copy" onClick={() => copyText('account-name')}>
//             <i className="fa-regular fa-user"></i> Salin Nama
//           </button>
//         </div>
//       </div>

//       <div className="gift-address-card reveal reveal-delay-2">
//         <div className="gift-address-icon">
//           <i className="fa-solid fa-gift"></i>
//         </div>
//         <div>
//           <p className="gift-address-title">Alamat Pengiriman Hadiah</p>
//           <p className="gift-address-text">{invitationData.giftAddress}</p>
//         </div>
//       </div>
//     </section>
//   );
// }
