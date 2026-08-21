// Single source of truth for approved operational facts. Registration details
// come from the business licence supplied by ZimonAI. The owner has confirmed
// that the registered address is also the customer-reception address. Do not
// add an office image, social account or registration identifier unless it is
// recorded here as owner-approved. The contact channels below were supplied
// and approved by the owner on 13 August 2026.
export const brandProfile = {
  name: 'ZimonAI 智蒙灣',
  domain: 'https://zimonai.com',
  email: 'simonlo@zimonai.com',
  contacts: {
    chinaPhone: { display: '+86 19575746458', href: '+8619575746458' },
    taiwanPhone: { display: '+886 988307998', href: '+886988307998' },
    whatsapp: { display: '+886 988307998', href: 'https://wa.me/886988307998' },
    wechat: 'simon3141229',
    line: 'lo17v1'
  },
  operatingModel: 'Client-paid charger and power electronics supplier services',
  operatingBases: ['Taipei', 'Shenzhen'],
  registration: {
    legalNameZhHans: '深圳智蒙湾科技有限公司',
    legalRepresentativeZhHant: '羅亦斈',
    legalRepresentativeZhHans: '罗亦斈',
    entityTypeZhHans: '有限责任公司（港澳台自然人独资）',
    established: '2026-03-03',
    creditCode: '91440300MAK8J4881W',
    registeredAddressZhHans: '深圳市前海深港合作区南山街道怡海大道1167号海运中心口岸楼0701号-A032',
    registeredAddressEn: 'Room A032, No. 0701, Port Building, Shipping Center, 1167 Yihai Avenue, Nanshan Subdistrict, Qianhai Shenzhen–Hong Kong Cooperation Zone, Shenzhen, Guangdong, China',
    publicAsset: '/assets/zimonai-business-license-public.jpg'
  },
  office: {
    address: '深圳市前海深港合作区南山街道怡海大道1167号海运中心口岸楼0701号-A032',
    photos: [
      { id: 'lounge', src: '/assets/zimonai-shenzhen-reception-lounge.png', width: 571, height: 429 },
      { id: 'meeting', src: '/assets/zimonai-shenzhen-public-meeting-area.png', width: 571, height: 425 },
      { id: 'reception', src: '/assets/zimonai-shenzhen-reception-desk.png', width: 567, height: 417 }
    ]
  }
};

export function hasPublishedOfficeEvidence() {
  return Boolean(brandProfile.office.address && brandProfile.office.photos.length);
}
