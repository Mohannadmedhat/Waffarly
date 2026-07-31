import { ProductDetail, DealItem, Transaction, NearbyDeal, ChatMessage } from '../types';

export const mockProductDetail: ProductDetail = {
  id: 'sony-wh1000xm5',
  name: 'سوني WH-1000XM5',
  subtitle: 'سماعات رأس لاسلكية بخاصية إلغاء الضوضاء، لون أسود مطفي',
  rating: 4.8,
  ratingCount: 1240,
  mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAkJ7utX-rV2ZJ8dHuld_B24bGMD14cnaV661NkVU0zDkKQqNaQFy8BGb6tpC0eXrS7biz-MpAu7rfrEo8-ZJvAEo8PN5BKrf87iLJgyhfXeyw_EB-tCq36UfiCqhCImpNh09vSLfg5ASnaNwf4TeTIpWmlQ75P5FowRz64mSb5EVvrdSfSVHqakIIVNAE3jwKeSKdrehM7c3bE56DLg5_794vQKLoijXACTHYvPgKZJ-7VvSbh-OVSNEYXSKOsZwi5MSSmrbBoAAm',
  galleryImages: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAAkJ7utX-rV2ZJ8dHuld_B24bGMD14cnaV661NkVU0zDkKQqNaQFy8BGb6tpC0eXrS7biz-MpAu7rfrEo8-ZJvAEo8PN5BKrf87iLJgyhfXeyw_EB-tCq36UfiCqhCImpNh09vSLfg5ASnaNwf4TeTIpWmlQ75P5FowRz64mSb5EVvrdSfSVHqakIIVNAE3jwKeSKdrehM7c3bE56DLg5_794vQKLoijXACTHYvPgKZJ-7VvSbh-OVSNEYXSKOsZwi5MSSmrbBoAAm',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBCorJYil_Ipms2sIbkBG89KDHYhj0pIzoOEiyxm7jl_ZsC8iAD8W1PVOEvBq77PAPKJV7R-Wo0VDq3evf1FSjrWH0J7hT1WVBh6qEO-6c51O3XoDI3LT3_YTEggsC62TYthKRmE-66MpxP5lm5USrRVyK7kqGHEKIxVa1Gjrkwiad4REtHvULf3WhAXOKqcOTM9Am79wWtlIhO__fylBjpN2gg-u7oT8YSUzDQt45jQYUsnaMamPdfFGFuzzsPAEyJI_6ZSL5KH6jG',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD2q41N0x4bvOn5ZG1Ogr1gs0kZG-HZoyhfmaBpHss34TWa8S4ZbPP7Csj5t4T4W8h5vJdVf3d-Lex1BZOztCpOzaSRtrJfhyrl8zVsmmRNGH_57F5V_MXxwfXqhD8TW99nVcSFlbOZ3uFgshtfAzm1zUyvVCMbqRPz9rDN9uYVXlmPTpXpCbKE0ssm8nzQJA4Exp38xTHfTodizzaQ-zXSSgQmNvhowacYOvv9PzkMy7RWi7AomjDESviKibvYu8lYymnWWwduuZWR',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAhz6Tt2j63_11hGacJpaVmPaxqd0ER992VKdz7WUfTSgT8b4-MW1GdihuKd30_UGt_0ycDWjZlBlAXZ2sna1P11brvipJ3YHAJX6S34_jVazH3LGr0d3XpyXUOpfW5Dij-KuNXqLUTR8XnMRqzMyr5jOIZo7OzeT4Fbk-wJZ8ghZopkEGQe4A7rysWo7rUHi7pLdlHqnN4TI_zz4Ui7RoagHz20_e7M7P7Cl1RNEbOVuZ-P5p7Jjtu6OfKu3KZUhH9JtLneSDPscXH'
  ],
  originalPrice: 18500,
  discountAmount: 2775,
  cashbackAmount: 450,
  finalPrice: 15725,
  totalSaved: 3225,
  currency: 'ج.م',
  recommendedStore: 'نون (Noon)',
  recommendedStoreLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk5qZ5nOVm3PEVNntfybb2M0wEE65Xr9IEmQDB5Dafg-_kdDJpiSsZlk2Lh-ehoGrlvJBk3HBb0_dV2qYPPy8Em_LwrCmtgTsRjWpa8uBN4TaAgUc6EjWb40JLM4VZx8RYraqf1l7O5BSak0J-9tKEx8O4TCButh7l-U4KSG-gnQGTQ_xrAAZnWPJggYdNWoi2JjNrUhzXL2ZHZ9Cv1T03arENR5sF9qS0EOnY5SYyfNgtoTtprUSoThutYzwbGNchgNBCbFn-t63a',
  specs: {
    processor: 'معالج HD QN1 لإلغاء الضوضاء',
    screen: 'مشغلات صوتية 30 ملم دقيقة',
    battery: '30 ساعة تشغيل متواصل',
    storage: 'شحن سريع (3 دقائق تشحن 3 ساعات)'
  },
  delivery: {
    freeDelivery: 'توصيل مجاني خلال 24 إلى 48 ساعة عمل',
    warranty: 'ضمان الوكيل لمدة سنتين',
    returnPolicy: 'إرجاع سهل خلال 14 يوماً من الاستلام'
  },
  storeComparisons: [
    {
      store: 'أمازون (Amazon)',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxfQjvLov5v2CgZlmfL0bKav9zJGJKek04R5PqQSw3a2Qg2eU9FM8Xq7L3dUaIY408vh_Wuy5L3X1dGNdViY5lm5NV_YZSXnDHpWBpcWCnrCqHmVKcBCvKul3XD0bfbLE4G4S8IxsEiZafnd0Ye7ri6que6fbvsTU9rTiXxfw4S-MdAAAmD8NKh0M2X7UvTDs6MRj9743tvtn6DZtuxFXRNbcirazq_LZEsYuZ8UKa90zqi-TYTghnhrPHfzQq2SEAEScBmMp80e7L',
      price: 16200,
      delivery: 'توصيل غداً',
      cashbackNote: 'بدون كاش باك'
    },
    {
      store: 'نون (Noon)',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk5qZ5nOVm3PEVNntfybb2M0wEE65Xr9IEmQDB5Dafg-_kdDJpiSsZlk2Lh-ehoGrlvJBk3HBb0_dV2qYPPy8Em_LwrCmtgTsRjWpa8uBN4TaAgUc6EjWb40JLM4VZx8RYraqf1l7O5BSak0J-9tKEx8O4TCButh7l-U4KSG-gnQGTQ_xrAAZnWPJggYdNWoi2JjNrUhzXL2ZHZ9Cv1T03arENR5sF9qS0EOnY5SYyfNgtoTtprUSoThutYzwbGNchgNBCbFn-t63a',
      price: 15725,
      delivery: 'الأفضل مع وافرلي',
      cashbackNote: 'بواسطة وافرلي',
      isBest: true
    }
  ]
};

export const mockSearchDeals: DealItem[] = [
  {
    id: 'amazon-wh1000xm5',
    store: 'أمازون (Amazon)',
    storeLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7mimstc_Jik_4fjNr_WFaIcwo4Aw8EBe_ZBmHnHVV80fodSteR8jah_76kihFy-ZDg98snPhBdpvZ8FhI5rAtuANS86JY5ASD2YNIiic0iOL6z_VOuD1p_vx2O9MPjwf4MJhM3ZMIzD80y7Gcfs8qyheF9uKgUQXBvymOPePWGBDdT-vzfjAMvVyiJUCNQddP5HtMyjK3VN-P-dL9hqxMHwN3XiZ57Otp6E6H2_0XNOdRZ8sGGQ0l_hypzwEd1pXuthdOBo1ka4FP',
    title: 'سوني WH-1000XM5',
    subtitle: 'سماعة رأس لاسلكية بخاصية إلغاء الضوضاء الفائقة',
    price: 14500,
    originalPrice: 17200,
    currency: 'ج.م',
    discountPercentage: 15,
    cashbackAmount: 435,
    deliveryText: 'توصيل خلال 24 ساعة',
    badgeText: 'أفضل قيمة',
    isBestValue: true,
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAkJ7utX-rV2ZJ8dHuld_B24bGMD14cnaV661NkVU0zDkKQqNaQFy8BGb6tpC0eXrS7biz-MpAu7rfrEo8-ZJvAEo8PN5BKrf87iLJgyhfXeyw_EB-tCq36UfiCqhCImpNh09vSLfg5ASnaNwf4TeTIpWmlQ75P5FowRz64mSb5EVvrdSfSVHqakIIVNAE3jwKeSKdrehM7c3bE56DLg5_794vQKLoijXACTHYvPgKZJ-7VvSbh-OVSNEYXSKOsZwi5MSSmrbBoAAm',
    priceHistoryTrend: 'falling'
  },
  {
    id: 'noon-wh1000xm5',
    store: 'نون (Noon)',
    storeLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk5qZ5nOVm3PEVNntfybb2M0wEE65Xr9IEmQDB5Dafg-_kdDJpiSsZlk2Lh-ehoGrlvJBk3HBb0_dV2qYPPy8Em_LwrCmtgTsRjWpa8uBN4TaAgUc6EjWb40JLM4VZx8RYraqf1l7O5BSak0J-9tKEx8O4TCButh7l-U4KSG-gnQGTQ_xrAAZnWPJggYdNWoi2JjNrUhzXL2ZHZ9Cv1T03arENR5sF9qS0EOnY5SYyfNgtoTtprUSoThutYzwbGNchgNBCbFn-t63a',
    title: 'سوني WH-1000XM5',
    subtitle: 'لون أسود مطفي فاخر',
    price: 14990,
    currency: 'ج.م',
    cashbackAmount: 750,
    couponCode: 'WAFFLE',
    deliveryText: 'توصيل خلال 3 إلى 5 أيام',
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAkJ7utX-rV2ZJ8dHuld_B24bGMD14cnaV661NkVU0zDkKQqNaQFy8BGb6tpC0eXrS7biz-MpAu7rfrEo8-ZJvAEo8PN5BKrf87iLJgyhfXeyw_EB-tCq36UfiCqhCImpNh09vSLfg5ASnaNwf4TeTIpWmlQ75P5FowRz64mSb5EVvrdSfSVHqakIIVNAE3jwKeSKdrehM7c3bE56DLg5_794vQKLoijXACTHYvPgKZJ-7VvSbh-OVSNEYXSKOsZwi5MSSmrbBoAAm',
    priceHistoryTrend: 'stable'
  },
  {
    id: 'jumia-wh1000xm5',
    store: 'جوميا (Jumia)',
    storeLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMwJyVTU1xyBh8OQhIgwdxfoOoqNjqO7YlHKsxgtK3G8PXiG6EWI8csKvJErRJzueGg83u1Akpck3yAPiCJ_kr6SA1Y3JKuODs5I-ZcQlJtkHzNbKR0ieKxl23SlfgL-nN_hsGNosSFNZgQVpBvQkj4J8XOshNeGHDDKPeeZmokdd8AD5gGOp0dDmi5OIEL2QIK7jPqq-EctF_ug06-pug5e1hY5GK9XQDsL5CitMQgD1yR7LzdnfFlVxuMY20YlhYvuuVV53ImFy3',
    title: 'سوني WH-1000XM5',
    subtitle: 'يتوفر استلام من المحطة',
    price: 15200,
    currency: 'ج.م',
    cashbackAmount: 500,
    deliveryText: 'يتوفر استلام من المحطة',
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAkJ7utX-rV2ZJ8dHuld_B24bGMD14cnaV661NkVU0zDkKQqNaQFy8BGb6tpC0eXrS7biz-MpAu7rfrEo8-ZJvAEo8PN5BKrf87iLJgyhfXeyw_EB-tCq36UfiCqhCImpNh09vSLfg5ASnaNwf4TeTIpWmlQ75P5FowRz64mSb5EVvrdSfSVHqakIIVNAE3jwKeSKdrehM7c3bE56DLg5_794vQKLoijXACTHYvPgKZJ-7VvSbh-OVSNEYXSKOsZwi5MSSmrbBoAAm',
    priceHistoryTrend: 'stable'
  },
  {
    id: 'iphone-15-amazon',
    store: 'أمازون (Amazon)',
    storeLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyM3G46NWUskVwRwSwDgVIZM7Nn9K8lCfcADcWNofblh60K1D5GHaYStVPlxFMeWTeMV6PpOsPT-3KSUtBgUgkvezo1xf_560WCPYKB8r3b3gvzsV0-8GcTem4t_QEew9cdUVeYLERfeQ6s034lQTlQ1N7KmSBZiR81qRwH1pdHtfju_7SqKIqEABCIrfKQEBDfx2UvpgPb9h36uZGW0xIGqyCsyLo_FVj1wEXQ8ZJLLj_OlUnvM-rVJinpcz9CVp2deFXuLRAM8pX',
    title: 'آيفون 15 (iPhone 15)',
    subtitle: 'هاتف آيفون 15 سعة 128 جيجابايت - أزرق تيتانيوم',
    price: 42500,
    originalPrice: 48000,
    currency: 'ج.م',
    discountPercentage: 11,
    cashbackAmount: 850,
    deliveryText: 'توصيل خلال 24 ساعة',
    badgeText: 'أفضل قيمة ذكية',
    isBestValue: true,
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoZnJL8zuXUpGZqfyaDs9zBUjJBPVhbtmBQJ_rA4cqNqx7q6HfcpDqC9tyvTPQMcJSPeAwUGZ9JJbWFbDu6iIJfow_dsCBPWsEk4nddLZs5qAWG3dzkXVUpBoQZzNfAHxrhhsCteuhd7Pes215osGYNwOf5JAupWEzWMoUCs2xWHxcfsLECq21ymcMFqpwE3hX-F8ZC8OTsuP1o08JBVOYCHyhM0u3wPQanmclKGwEikt49N8tEp97PHaRcWqjsULL-y_miXuuhi5i',
    priceHistoryTrend: 'falling'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    storeName: 'أمازون مصر',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQp8ufOe1gJZcjrhRAivTt5hDHR6NTW3Vj9WF0G3I-fRx7FSGmv5CbrMLslVU_hNdPJg61dRgwv1AlgyB0Hioqf1_ah9kWFzzfupuEqqC4V0oxg3bqQH_rANk8eSvqqRtZDBSyC4-DMHGKgnC4ZqNEMDHgHwFG5QxwoEQX8MM3yNv34W4LhJxko35lEV1S62Po-tAOl2hhA0ABXAK6_KdxUXm2utEIuBu9ZqoB4DJk2mc2Qt5n20kMvRQ7JD6B2_clnpLs9PfW42vT',
    date: '24 مايو 2024',
    amount: 120.50,
    currency: 'ج.م',
    type: 'cashback',
    status: 'available',
    statusText: 'متاح'
  },
  {
    id: 'tx-2',
    storeName: 'نايكي (Nike)',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN2e_Fu-g5iOgwvAmHC4dq6R40EulBjavgI34Tml0VXv5IKKnsLnasFcHjmGSQ-c-AfDhTPjD9mHYNWbM2e2-dDHV9nI40OPBVEI-0m6_TbYLp3HKsb5xjQMl5tdHrTERgIVExzchcSrpdLJLazGbMx9GgH28MyZGYDSzbRfgki1Fontbf5s17kBzW1n_wBUa1dowpxXAHOfkbph_DvyejNpaBhGniaeLwwFPtoxThNL4RIT12UJaAaGyDpi3ks8zdYjHNYaCHqiFA',
    date: '22 مايو 2024',
    amount: 450.00,
    currency: 'ج.م',
    type: 'cashback',
    status: 'pending',
    statusText: 'قيد المراجعة'
  },
  {
    id: 'tx-3',
    storeName: 'جوميا',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5kNLCPx0yk3zYeJ-j9VzVlW-KeIGIiwmpTxUhNBjO3vV7k74AwnS54ocVdNv5JJhJK_LVMkV3MiL3LNmidrAV2alIKCP8Wn1F6CkyjKp4M9wqL4_CcWlXDpy2Ftu8PwCm_S9_vkR32p9sD4glhTweh0LjctxucqottTIOUUuR2Y7qF7adwbMCEgoXW9B5HqzI-NeZoK7X98nyV3u1NKpusIADI7LOTNEAUUZ2N1dwadEMt1DUstTcnn23maepekg-Uo7Xh6NAE53N',
    date: '18 مايو 2024',
    amount: 85.00,
    currency: 'ج.م',
    type: 'cashback',
    status: 'available',
    statusText: 'متاح'
  },
  {
    id: 'tx-4',
    storeName: 'فاتورة فودافون',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB04eLak2vheJIvzwWSKOhaPOlkBbaZ1jIUmjVk6pQM3iyzyVPSYzRkiG7SopfKlzBmDevQIY2DpbTdqQG92KmLPL3ysdY6GwlwtUE67E42rjxaT9K_ltrErXCNC70YE1U4T_j8Oiay7ZJotYvUk3zuw-Vdkx231j1Q2GfEzluO9UxPMnZ7QBBH5mn00uog9mJJPS_czSg8iD1yZSbaab_9XSsHr2rgCV1EnqcAlRc5nfkxQl8PXwwNVbedgMDkF65N7Pxl0SO_HIgW',
    date: '10 أكتوبر 2023',
    amount: -150.00,
    currency: 'ج.م',
    type: 'bill',
    status: 'paid',
    statusText: 'مدفوع'
  },
  {
    id: 'tx-5',
    storeName: 'قسيمة شراء كارفور',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMwJyVTU1xyBh8OQhIgwdxfoOoqNjqO7YlHKsxgtK3G8PXiG6EWI8csKvJErRJzueGg83u1Akpck3yAPiCJ_kr6SA1Y3JKuODs5I-ZcQlJtkHzNbKR0ieKxl23SlfgL-nN_hsGNosSFNZgQVpBvQkj4J8XOshNeGHDDKPeeZmokdd8AD5gGOp0dDmi5OIEL2QIK7jPqq-EctF_ug06-pug5e1hY5GK9XQDsL5CitMQgD1yR7LzdnfFlVxuMY20YlhYvuuVV53ImFy3',
    date: '05 أكتوبر 2023',
    amount: -200.00,
    currency: 'ج.م',
    type: 'voucher',
    status: 'completed',
    statusText: 'مكتمل'
  }
];

export const mockNearbyDeals: NearbyDeal[] = [
  {
    id: 'deal-1',
    title: 'مطعم المشويات الفاخرة',
    category: 'مطاعم ومأكولات',
    discountText: 'خصم 20%',
    rating: 4.8,
    distance: 'على بعد 1.2 كم',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm9VTY3nFc0lyWCwQDNMw1AGbEtSA_JCekJMjQ2pZvTnCx8xSFTnFTc-RBpoE8rtKl68fPZ5WvppNLo9Fpq7L37GpQNQYzsDMSD_99utuf8a7xa3X3w5xOIEI5JlGk0uusrV4cSRWPeIvNM7_9NQcb702MzUP354pJvDqtTYJ9XtgABeZYwJ2Vre-44ObzzYXnu1sNYky4REkiwa_GFJqflO3KapGZfGaC1LpwxVIuWq7CB0jMtITzvdXU2G3suqcuOMJo_MiiiK1X'
  },
  {
    id: 'deal-2',
    title: 'نادي القوة البدنية',
    category: 'رياضة ولياقة',
    discountText: 'خصم 15%',
    rating: 4.5,
    distance: 'على بعد 2.5 كم',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9zqpXyUmAtoH0ruMvGCWVvLT_4UH3mGTABO2tcjMBpGtcBC-Zp2fkVNqcimnc9bMAyKxspA-6MmeHzD0G5kl8ohwnmlRtACxXcmPpfNpUTEC14Y_9QLemItfD5fCek-0AHx84fkf4MM17ufkdd8MyUu7xjVTKctfgsSt5M4uP672gr6XqkTCjrNJGfon7-Qx2Gb1gSHlPv_b5JfOg7mOPPcmsVToWEFQen9WT6OvzmZjOsrKYTRdYyc_875ZQDTIckXJx3tbfGjGA'
  },
  {
    id: 'deal-3',
    title: 'سوبرماركت العثيم',
    category: 'مشتريات منزلية',
    discountText: 'كاش باك 10%',
    rating: 4.7,
    distance: 'على بعد 0.8 كم',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEApzYwPi1HzdAh10URsfq_jgmrwxcMUAgZ43XRWG23kqX7jLvxU1F1_7EewiovCGdhDzWp85py5iARYrEVzk4aQxFspQS68GATcdeBnhwL05XcxvozQhN7sO2JfYLhYt9bXBpyPWZnBLivouHbS8MaKAmTmqpvsA8p2rsREtyMyLW0RVZ-aM9ExZYhWupMqohOLYIMndl3fk6y71OQmPQDDpQ7Ue_Y3eu9yn4N021onXXFKEr-XnXLt878ls2GTwNJjY7m3MXjM-N'
  }
];

export const mockInitialChatHistory: ChatMessage[] = [
  {
    id: 'chat-1',
    sender: 'user',
    text: 'عايز أرخص لابتوب للألعاب في حدود 30000 ج.م',
    time: '10:42 AM'
  },
  {
    id: 'chat-2',
    sender: 'ai',
    text: 'أهلاً بك! لقد قمت بتحليل السوق وتوقع الأسعار المتاحة. إليك أفضل خيار لجهاز لابتوب للألعاب بحدود ميزانيتك مع استرداد كاش باك حصري:',
    time: '10:43 AM',
    deal: {
      title: 'Lenovo Ideapad Gaming 3',
      specs: 'معالج RTX 3050 ، رام 16GB ، ذاكرة 512GB SSD',
      price: '28,999 ج.م',
      originalPrice: '34,500 ج.م',
      discountText: 'أفضل سعر الآن',
      store: 'أمازون (Amazon)',
      cashback: '850 ج.م',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIet0amJtZ1hmzTgdPdqHCdRr20WQDyBoQISyA-R60gBuNUasSxi9PjuJmMro5cF_gF4Ncp8CYsGuSs5u-4MS3PM8rDVzEdn0Dl-B1LglF6nN0FaXcLvriBCEzzePfLc6hTSeZic85YQqNWiCSz_UCDcaMh8Z_6bOZE_Zw-bIA0DZDUFSWtjrZmX1cdLPrIwOk2c3PGQkDSNHF-KJKkUHJS17VRuNDPAoDISyVHUKgBktURhnqO2f2auKcWd6DhB9ZeNCdRP3ixxIG',
      reason: 'نتوقع انخفاضاً إضافياً بنسبة 5% في الأسعار خلال عروض الأسبوع القادم.',
      dailySavingRate: '5,501 ج.م'
    },
    suggestionChips: ['مقارنة مع بدائل أخرى', 'تتبع انخفاض السعر', 'البحث عن كوبونات']
  }
];
