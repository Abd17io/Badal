import { DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

type Language = 'en' | 'ar';
type Tone = 'teal' | 'yellow' | 'cream';

interface Feature {
  number: string;
  title: string;
  description: string;
  icon: string;
  symbol: string;
  tone: Tone;
}

interface PageCopy {
  brand: string;
  homeLabel: string;
  navigationLabel: string;
  howLink: string;
  whyLink: string;
  languageSwitch: string;
  languageSwitchLabel: string;
  headerCta: string;
  eyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  tagline: string;
  playStoreLabel: string;
  playStoreOverline: string;
  playStoreStatus: string;
  heroNote: string;
  imageTag: string;
  imageAlt: string;
  captionStrong: string;
  captionText: string;
  introLabel: string;
  introFirst: string;
  introSecond: string;
  introThird: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionHighlight: string;
  sectionDescription: string;
  features: Feature[];
  closingEyebrow: string;
  closingTitle: string;
  closingHighlight: string;
  closingDescription: string;
  closingCta: string;
  markTop: string;
  markBottom: string;
  contactLabel: string;
  privacyPolicy: string;
  backToTop: string;
  pageTitle: string;
  metaDescription: string;
}

const translations: Record<Language, PageCopy> = {
  en: {
    brand: 'Badal',
    homeLabel: 'Badal home',
    navigationLabel: 'Main navigation',
    howLink: 'How it works',
    whyLink: 'Why Badal',
    languageSwitch: 'العربية',
    languageSwitchLabel: 'Switch to Arabic',
    headerCta: 'Discover Badal',
    eyebrow: 'A fresh start for the things you own',
    heroTitle: 'Good things deserve',
    heroHighlight: 'another go.',
    tagline: 'Swap with others, discover what you need, and give good things a new chance.',
    playStoreLabel: 'Get it on Google Play — coming soon',
    playStoreOverline: 'GET IT ON',
    playStoreStatus: 'Coming soon',
    heroNote: 'A better kind of swap',
    imageTag: 'Pass it on',
    imageAlt: 'Badal: give your items a new purpose, with headphones and books being exchanged',
    captionStrong: 'One person’s unused',
    captionText: 'is another’s just right.',
    introLabel: 'Badal in a nutshell',
    introFirst: 'More than letting go.',
    introSecond: 'More than finding something new.',
    introThird: 'A little more good going around.',
    sectionEyebrow: 'A simple little cycle',
    sectionTitle: 'Your next favorite is',
    sectionHighlight: 'already out there.',
    sectionDescription:
      'Badal makes it easy to list your items, discover what others are sharing, and send swap requests. Turn things you no longer need into a chance to find something that suits you.',
    features: [
      {
        number: '01',
        title: 'Explore a variety of items',
        description:
          'Browse available items, view photos and details, and filter by category or transaction type to find what you’re looking for.',
        icon: '⌕',
        symbol: '↗',
        tone: 'teal',
      },
      {
        number: '02',
        title: 'Add your items with ease',
        description:
          'Upload photos, choose a category and transaction type, and add an item name and description in Arabic and English.',
        icon: '＋',
        symbol: '＋',
        tone: 'yellow',
      },
      {
        number: '03',
        title: 'Swap with other people',
        description:
          'Choose an item and request a swap with one of your own. Review incoming requests and accept or decline them in the app.',
        icon: '↔',
        symbol: '↔',
        tone: 'cream',
      },
      {
        number: '04',
        title: 'Manage your items in one place',
        description:
          'View, edit, or remove your listings from My Items, and keep up with notifications about swap requests.',
        icon: '▤',
        symbol: '✳',
        tone: 'teal',
      },
    ],
    closingEyebrow: 'Small swaps. Real impact.',
    closingTitle: 'Make space for',
    closingHighlight: 'what’s next.',
    closingDescription:
      'Start with Badal: share what you no longer need and discover your next opportunity to swap.',
    closingCta: 'Find your next good thing',
    markTop: 'give',
    markBottom: 'get',
    contactLabel: 'Contact information',
    privacyPolicy: 'Privacy Policy',
    backToTop: 'Back to top',
    pageTitle: 'Badal — Give your items a new purpose',
    metaDescription:
      'Swap with others, discover what you need, and give good things a new chance with Badal.',
  },
  ar: {
    brand: 'بدل',
    homeLabel: 'الصفحة الرئيسية لبدل',
    navigationLabel: 'التنقل الرئيسي',
    howLink: 'كيف يعمل التطبيق',
    whyLink: 'لماذا بدل؟',
    languageSwitch: 'English',
    languageSwitchLabel: 'التبديل إلى الإنجليزية',
    headerCta: 'اكتشف بدل',
    eyebrow: 'بداية جديدة لأغراضك',
    heroTitle: 'الأشياء الجميلة تستحق',
    heroHighlight: 'فرصة أخرى.',
    tagline: 'بادل أغراضك مع الآخرين، واكتشف ما تحتاجه، وامنح الأشياء فرصة جديدة.',
    playStoreLabel: 'احصل عليه من Google Play — قريباً',
    playStoreOverline: 'حمّله من',
    playStoreStatus: 'قريباً',
    heroNote: 'تبادل بطريقة أفضل',
    imageTag: 'امنحها فرصة جديدة',
    imageAlt: 'بدل: امنح أغراضك فرصة جديدة، مع تبادل الكتب وسماعات الرأس',
    captionStrong: 'ما لا تحتاجه أنت',
    captionText: 'قد يكون ما يبحث عنه غيرك.',
    introLabel: 'تعرف على بدل',
    introFirst: 'أكثر من مجرد التخلي عن غرض.',
    introSecond: 'أكثر من العثور على شيء جديد.',
    introThird: 'فرص أكثر وأغراض أقل هدراً.',
    sectionEyebrow: 'كل ما تحتاجه للتبادل',
    sectionTitle: 'ابدأ فرصة جديدة',
    sectionHighlight: 'مع بدل.',
    sectionDescription:
      'امنح أغراضك فرصة جديدة مع Badal - بدل، تطبيق يتيح للمستخدمين عرض أغراضهم واكتشاف أغراض الآخرين وإرسال طلبات التبادل بسهولة. حوّل الأشياء التي لم تعد تحتاجها إلى فرصة للحصول على شيء يناسبك.',
    features: [
      {
        number: '٠١',
        title: 'اكتشف أغراضاً متنوعة',
        description:
          'تصفح الأغراض المتاحة، واطّلع على الصور والتفاصيل، واستخدم عوامل التصفية حسب الفئة ونوع المعاملة للوصول إلى ما تبحث عنه.',
        icon: '⌕',
        symbol: '↗',
        tone: 'teal',
      },
      {
        number: '٠٢',
        title: 'أضف أغراضك بسهولة',
        description:
          'أضف صوراً لأغراضك، وحدد الفئة ونوع المعاملة، وأدخل الاسم بالعربية والإنجليزية مع إمكانية إضافة وصف بكل لغة.',
        icon: '＋',
        symbol: '＋',
        tone: 'yellow',
      },
      {
        number: '٠٣',
        title: 'تبادل مع مستخدمين آخرين',
        description:
          'اختر الغرض الذي يهمك وأرسل طلب تبادل بأحد أغراضك. راجع طلبات التبادل الواردة، واقبل العروض أو ارفضها من داخل التطبيق.',
        icon: '↔',
        symbol: '↔',
        tone: 'cream',
      },
      {
        number: '٠٤',
        title: 'إدارة أغراضك في مكان واحد',
        description:
          'يمكنك عرض إعلاناتك وتعديل معلوماتها أو حذفها من صفحة «أغراضي»، ومتابعة الإشعارات المتعلقة بطلبات التبادل.',
        icon: '▤',
        symbol: '✳',
        tone: 'teal',
      },
    ],
    closingEyebrow: 'تبادل بسيط، وأثر جميل.',
    closingTitle: 'ابدأ مع',
    closingHighlight: 'بدل.',
    closingDescription:
      'شارك ما لم تعد تحتاجه، واكتشف فرصة التبادل التالية.',
    closingCta: 'اكتشف فرصتك التالية',
    markTop: 'شارك',
    markBottom: 'اكتشف',
    contactLabel: 'معلومات التواصل',
    privacyPolicy: 'سياسة الخصوصية',
    backToTop: 'العودة إلى الأعلى',
    pageTitle: 'بدل — امنح أغراضك فرصة جديدة',
    metaDescription:
      'بادل أغراضك مع الآخرين، واكتشف ما تحتاجه، وامنح الأشياء فرصة جديدة مع بدل.',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  host: {
    '[attr.lang]': 'language()',
    '[attr.dir]': "language() === 'ar' ? 'rtl' : 'ltr'",
  },
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  readonly language = signal<Language>('en');
  readonly copy = computed(() => translations[this.language()]);

  constructor() {
    this.updateDocumentLanguage();
  }

  toggleLanguage(): void {
    this.language.update((language) => (language === 'en' ? 'ar' : 'en'));
    this.updateDocumentLanguage();
  }

  private updateDocumentLanguage(): void {
    const language = this.language();
    const copy = translations[language];
    this.document.documentElement.lang = language;
    this.document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    this.title.setTitle(copy.pageTitle);
    this.meta.updateTag({ name: 'description', content: copy.metaDescription });
  }
}
