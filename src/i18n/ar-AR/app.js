const ar = {
  APPLICATION: {
    TITLE: 'TMS',
    ERROR: 'هناك خطأ ما! ',
    FILE_NAME: 'اسم الملف',
    TYPE: 'اكتب',
    VERSION: 'إصدار',
    EDIT: 'يحرر',
    CREATED_TIME: "وقت الإنشاء",
    ADD_TOOLTIP_TITLE: 'يضيف',
    EXCEPT_ONLY: 'ملف التطبيق فقط مستثنى!',
  },
  LANG: {
    LABEL: 'لغة',
    ENGLISH: 'الإنجليزية',
    FRENCH: 'الفرنسية',
    ARABIC: 'العربية',
    'en-US': 'الإنجليزية',
    'fr-FR': 'الفرنسية',
    'ar-AR': 'العربية',
    MIN: {
      'en-US': 'EN',
      'fr-FR': 'FR',
      'ar-AR': 'AR'
    }
  },
  MISC: {
    EDIT: 'تعديل',
    WARNING: 'تحذير',
    RESET_PASSWORD: 'إعادة تعيين كلمة المرور',
    SEARCH: 'بحث',
    NO_RESULT_FOUND: 'لم يتم العثور على نتائج!',
    CLEAR_SEARCH_FILTERS: 'مرشح واضح',
    HEADING: 'توليد كلمة السر',
    RESET: 'يولد',
    DETAIL: 'التفاصيل',
    DOWNLOAD: 'تحميل'
  },
  NAVBAR: {
    DASHBOARD: 'لوحة القيادة',
    TERMINALS: 'محطات',
    IMPORT_LIST: 'قائمة الاستيراد',
    MERCHANTS: 'التجار',
    TRANSECTIONS: 'المقاطع',
    REPORTS: 'التقارير',
    USER_MANAGEMENT: 'إدارةالمستخدم',
    DOWNLOAD_AND_UPLOAD: 'تحميل وتحميل',
    CALL_SETTINGS: 'اعدادات الاتصال',
    TOOLS: 'أدوات',
    UPDATE: 'حديث نظام التشغيل والتطبيق',
    VIEW_LIST: 'عرض القائمة',
    GROUP_LIST: 'قائمة المجموعة',
    PASSWORD_GERNRATE: 'مولد كلمة السر',
    USER_ACCESS_LOG: "سجل المستخدم",
    USER_LIST: 'قائمة المستخدم',
  },
  USER_MENU: {
    LOGOUT: 'تسجيل خروج',
    PROFILE: 'الملف الشخصي',
    ROLE: 'دور',
    LANGUAGE: 'لغة',
    PROJECTS: 'المشاريع',
    ACCESS_DENIED: 'تم الرفض!',
    GROUP_MISSING_ACCESS_DENIED_CONTENT: 'لا يرتبط المستخدم بأي مجموعة. يرجى الاتصال بالمسؤول.',
    ROLE_MISSING_ACCESS_DENIED_CONTENT: 'لا يرتبط المستخدم بأي دور. يرجى الاتصال بالمسؤول.'
  },
  TERMINAL: {
    ADD_NEW_TERMINAL: 'أضف المحطة الطرفية',
    HEADING: 'تحديث المحطة',
    DIALOG_HEADING: 'تحرير المحطة',
    TERMINAL_HEADING: "قائمة المحطات",
    IMPORT_LIST: "قائمة الاستيراد",
    DELETE: 'تم الحذف بنجاح',
    AAS_SETTING_HEADING: "إعداد AAS",
    MOVE_TERMINALS: "نقل المحطات",
    SELECTED_TERMINALS: "محطات مختارة",
    GROUP_LIST: "اختر مجموعة",
    ALERT: {
      ACTIVATE: {
        TITLE: "قم بتنشيط المحطات",
        CONTENT: "هل تريد التأكيد لتفعيل هذه المحطات؟",
        STATUS: "تنشيط المحطات",
      },
      DISABLE: {
        TITLE: "تعطيل المحطات",
        CONTENT: "هل تريد تأكيد تعطيل هذه المحطات؟",
        STATUS: "محطات معطلة",
      },
      DELETE: {
        TITLE: "حذف المحطات",
        CONTENT: "هل تريد تأكيد حذف هذه المحطات؟",
      },
      ACTIVE_STATUS: "تنشيط المحطات",
      INACTIVE_STATUS: "محطات معطلة"
    },
    VALIDATION: {
      SERIAL_NUMBER: 'يرجى تقديم الرقم التسلسلي.',
      SYS_IDENTIFIER: 'يرجى تقديم معرّف النظام.',
      AQUIRER_IP: 'يرجى تقديم عنوان IP للمشتري.',
      AQUIRED_PORT: 'يرجى تقديم المنفذ المكتسب.',
      VALID_ACQUIRER_IP: 'يرجى تقديم عنوان IP صالح للمشتري',
      VALID_SERIAL_NUMBER: 'يرجى تقديم الرقم التسلسلي بالألفا الرقمية فقط',
      VALID_TERMINAL_ID: 'يرجى تقديم معرف المحطة الطرفية بألفا رقمية فقط',
      VALID_PORT: 'يرجى تقديم المنفذ بالأرقام فقط'
    },
    TERMINAL_DETAIL: {
      TERMINAL_DETAIL: 'تفاصيل المحطة',
      TECHNICAL_DETAIL: 'تفاصيل تقنية',
      TERMINAL_MONITOR: 'مراقب المحطة',
      SERIAL_NUMBER: 'رقم سري',
      ID: "معرّف النظام",
      MODEL: 'نموذج المحطة الطرفية',
      MANUFACTURER: 'الصانع',
      ANDROID_VERSION: 'نسخة أندرويد',
      KERNEL_VERSION: 'إصدار النواة',
      CIB_VERSION: 'نسخة CIB',
      ACQUIRER_IP_ADDRESS: 'عنوان IP المستحوذ',
      ACQUIRER_PORT: 'المنفذ المكتسب',
      TLS: 'TLS',
      BLACKLIST_VERSION: 'نسخة القائمة السوداء',
      OPERATOR_NAME: 'اسم المشغل',
      APN: 'APN',
      SIM_SERIAL_NUMBER: 'الرقم التسلسلي لبطاقة SIM',
      MERCHANT_NAME: 'اسم التاجر',
      ADDRESS: 'عنوان',
      CITY: 'مدينة',
      CREATED_TIME: 'وقت الإنشاء',
      LAST_CALL_DATE: 'وقت آخر مكالمة',
      RAM: 'ضربة كبش',
      USED_RAM: "تستخدم رام",
      FREE_RAM: "رام مجاني",
      TOTAL_RAM: "إجمالي ذاكرة الوصول العشوائي",
      DISK_SPACE: 'مساحة مستخدمة',
      FREE_SPACE: "مساحة فارغة",
      TOTAL_SPACE: "المساحة الكلية",
      CALL_HISTORY: "سجل المكالمات",
      GROUP: "مجموعة",
      SUB_GROUP: "المجموعة الفرعية",
      UPDATED_AT: "الوقت المحدث"
    },
    EDIT_SUCCESS: 'تم تحديث المحطة بنجاح!',
    EDIT_FAILURE: 'حدث خطأ أثناء تحديث المحطة!',
    DELETE_CONTENT: 'هل أنت متأكد من أنك تريد الحذف؟ يتم حذف كافة المجموعات الفرعية وبياناتها نهائيًا.',
    UPLOAD: 'تحميل',
    ERROR: 'هناك خطأ ما! ',
    SERIAL_NUMBER: "رقم سري",
    TERMINAL_MODEL: "نموذج",
    GROUP_NAME: "تاجر",
    CITY: "مدينة",
    CREATED_TIME: "وقت الإنشاء",
    STATUS: "حالة",
    ACTIONS: 'عمل',
    SYSTEM_IDENTIFIER: 'معرّف النظام',
    ACQUIRE_IP_ADDRESS: 'عنوان IP المستحوذ',
    ACQUIRER_PORT: 'ميناء المستحوذ',
    SYSTEM_ID: 'معرف النظام',
    ISA: 'هو',
    APPLICATION_ID: 'رقم الاستمارة',
    TERMINAL_STORE_ID: 'معرف المتجر الطرفي',
    SETTING_ID: 'معرف الإعداد',
    REGISTRATION_DATE: "تاريخ التسجيل",
    LAST_CALL_DATE: 'تاريخ آخر مكالمة',
    OS_VERSION: 'إصدار نظام التشغيل',
    KERNEL_VERSION: 'إصدار النواة',
    APP_VERSION: 'نسخة التطبيق',
    RAM: 'الرامات "الذاكرة العشوائية في الهواتف والحواسيب',
    DISK_SPACE: 'مساحة القرص',
    MANUFACTURER: 'الصانع',
    ADDRESS: 'عنوان',
    COUNTRY: 'دولة',
    SIM_SERIAL_NUMBER: 'الرقم التسلسلي لشريحة SIM',
    OPERATOR_NAME: 'اسم المشغل',
    TERMINAL_IMPORT_SUCCESS: 'تم استيراد المحطة الطرفية بنجاح',
    TERMINAL_IMPORT_FAILURE: 'حدث خطأ أثناء استيراد الملف!',
    RESET_DIALOG: 'إعادة تعيين كلمة المرور',
    TERMINAL_ID: 'معرّف النظام',
    ACQUIRER_IP_ADDRESS: 'عنوان IP المستحوذ',
    BL_VERSION: 'نسخة القائمة السوداء',
    GROUPS: 'مجموعات',
    COMMENT: 'أضف تعليق',
    TRUE: 'حقيقي',
    FALSE: 'خاطئة',
    TERMINAL_REGISTRATION_SUCCESSFUL: 'تم تسجيل المحطة بنجاح',
    SUB_GROUP: "المجموعات الفرعية",
    OFFLINE: 'غير متصل على الانترنت',
    ACTIVE: 'نشيط',
    PASSIVE: 'مبني للمجهول',
    RESET_ERROR: "الرجاء تحديد من المربعات",
    IS_LOGS_UPLOAD: "إذن تحميل السجلات",
  },
  FORM: {
    SERIAL_NUMBER: "رقم سري",
    TERMINAL_MODEL: "نموذج",
    GROUP_NAME: "تاجر",
    CITY: "مدينة",
    CREATED_TIME: "وقت الإنشاء",
    STATUS: "حالة",
    ACTIONS: 'عمل',
    ADD_TOOLTIP_TITLE: 'يضيف',
    EDIT_TOOLTIP_TITLE: 'تعديل.',
    DELETE_TOOLTIP_TITLE: 'حذف',
    WARNING: 'تحذير',
    FILE_NAME: 'اسم الملف',
    TYPE: 'اكتب',
    VERSION: 'إصدار',
    EDIT: 'يحرر',
    ADD: 'يضيف',
    SELECT: 'تحديد',
    ACTIVE: 'نشيط',
    PASSIVE: 'مبني للمجهول',
    DECLARED: 'أعلن',
    SUPER_PASSWORD: 'سوبر كلمة السر',
    MAINTAINER_PASSWORD: 'كلمة مرور المشرف',
    SELECT_DATE: 'حدد تاريخ',
  },
  FILE_TYPE: {
    PARAMETER_PROD: 'المعلمة همز',
    PARAMETER_TEST: 'اختبار المعلمة',
    PARAMETER_BILLER: 'المعلمة بيلر',
    APPLICATION: 'طلب',
    BLACKLIST: 'القائمة السوداء',
    KERNEL: 'نواة',
    OS: 'نظام التشغيل',
  },
  UPLOAD: {
    VALID_EXTENSIONS: '.csv',
    UPLOAD: 'تحميل',
    CANCEL: 'إلغاء',
    CHOOSE_FILE: 'اختر ملف',
    TITLE: 'محطة الاستيراد',
    EXCEL_ONLY: 'قبول ملف CSV و EXCEL فقط!',
    UNIQUE: 'قبول البيانات الفريدة فقط !',
    SUCCESS: 'تم تحميل الملف بنجاح',
    BROWSE: 'تصفح',
    FILE: 'ملف',
    HEADING: 'اضف ملف',
  },
  GROUP: {
    DIALOG_HEADING: 'تحرير المجموعة',
    DIALOG_HEADING_SUB: 'تحرير مجموعة فرعية',
    ADD_HEADING: 'أضف مجموعة',
    ADD_SUBGROUP: 'أضف مجموعة فرعية',
    SUB_GROUP_NAME: 'اسم المجموعة الفرعية',
    GROUP: 'مجموعة',
    VALIDATION: {
      NAME: 'يرجى تقديم الاسم.',
      SUB_GROUP_NAME: 'لا يمكن أن يكون اسم المجموعة الفرعية فارغًا',
      GROUP_TYPE: 'حدد نوع المجموعة',
      GROUP: 'حدد مجموعة',
    },
    STREET_ADDRESS: "عنوان الشارع",
    STATE: "حالة",
    CITY: "مدينة",
    COUNTRY: "كونترy",
    SUB_GROUP: "المجموعة الفرعية",
    TERMINAL: "طرفية",
    EDIT_SUCCESS: 'تم تحديث المجموعة بنجاح!',
    EDIT_FAILURE: 'حدث خطأ أثناء تحديث المجموعة!',
    ADD_SUCCESS: 'تمت إضافة المجموعة بنجاح!',
    ADD_FAILURE: 'حدث خطأ أثناء إضافة المجموعة!',
    ERROR: 'هناك خطأ ما! ',
    SERIAL_NUMBER: "رقم سري",
    TERMINAL_MODEL: "نموذج",
    GROUP_NAME: "أسم المجموعة",
    CREATED_TIME: "وقت الإنشاء",
    STATUS: "حالة",
    ACTIONS: 'عمل',
    ADD_TOOLTIP_TITLE: 'يضيف',
    EDIT_TOOLTIP_TITLE: 'تعديل.',
    DELETE_SUCCESS: 'حذف بنجاح',
    DELETE_FAILURE: 'حدث خطأ أثناء الحذف!',
    DELETE_TOOLTIP_TITLE: 'حذف',
    GROUP_TYPE: "نوع المجموعة",
    BANK: "مصرف",
    PROVIDERSERVICES: "خدمات الموفر",
    SIMPLEGROUP: "مجموعة بسيطة",
    PARAMETERFILE: "ملف المعلمة",
    GROUP_PARENT: "بنك",
  },
  ACTIONS: {
    SAVE: 'يحفظ',
    CANCEL: 'يلغي',
    AGREE: 'نعم',
    DISAGREE: 'رقم',
    CONTINUE: 'يكمل',
    INFO_AGREE: 'حسنا',
    LOGOUT_FROM_OTHER_SESSIONS: 'تسجيل الخروج من الجلسات الأخرى الجارية',
    GO_BACK: 'عد',
    RESET: 'إعادة ضبط',
    GENERATE: 'انشاء',
    APPLY: 'تطبيق'
  },
  FILE_UPLOAD: {
    TYPE_HEADING: 'اكتب',
    TYPE: 'الرجاء تحديد نوع الملف!',
    UPLOAD_HEADING: 'اضف ملف ',
    UPLOAD_SUCCESS: 'تم رفع الملف بنجاح!',
    UPLOAD_FAILURE: 'حدث خطأ أثناء تحميل ملف!',
    EXCEPT_ONLY: 'قبول ملفات XML و JSON و APK فقط!',
    EDIT_HEADING: 'تعديل ملف',
    UPDATE_FAILURE: 'حدث خطأ أثناء تحديث الملف!',
    UPDATE_SUCCESS: 'تم تحديث الملف بنجاح',
    PARAMETER_PROD: 'المعلمة إنتاج',
    PARAMETER_TEST: 'اختبار المعلمة',
    PARAMETER_BILLER: 'المعلمة بيلر',
    APPLICATION: 'تطبيق',
    BLACKLIST: 'القائمة السوداء',
    FILE: 'اختر ملفا، رجاءا !'
  },
  DASHBOARD_COMPONENT: 'مكون لوحة القيادة',
  TERMINALS_COMPONENT: 'مكون المحطات',
  GROUPS_COMPONENT: 'مكون المجموعات',
  MERCHANTS_COMPONENT: 'Merchants Component',
  IMPORT_LIST_COMPONENT: 'Import List',
  PASSWORD: {
    VALIDATION: {
      CHOOSE_FILE: 'اختر ملفا، رجاءا!',
      RANGE_START: 'الرجاء إدخال نطاق البداية للرقم التسلسلي!',
      RANGE_END: 'الرجاء إدخال نطاق النهاية للرقم التسلسلي!',
      DATE: 'الرجاء تحديد التاريخ!',
      CHECKBOX: 'الرجاء تحديد كلمة مرور فائقة أو المشرف!',
      SERIAL_LENGTH: 'يجب أن يتكون الرقم التسلسلي من ستة أرقام!',
      GREATER_LESS: 'يجب أن يكون أكبر من نطاق البداية من عدد',
      API_FALLBACK: 'خطأ في الخادم!'
    },
    EXCEPT_ONLY: 'قبول ملف txt أو csv فقط!',
    SELECT_TYPE: 'اختر صنف',
    RANGE_START: 'أدخل نطاق البداية من المسلسل n.',
    RANGE_END: 'أدخل نطاق النهاية التسلسلي n.',
    HEADING: 'مولد كلمة السر',
    FILTTER: 'منقي',
    ERROR: 'هناك خطأ ما!',
    FILE: 'ملف'
  },
  CALL_SETTINGS: {

    CALL_SETTINGS: "اعدادات الاتصال",

    VALIDATION: {
      SELECT_FILE: 'الرجاء تحديد ملف',
      START_END_DATE: 'يجب أن يكون تاريخ البدء والانتهاءأكبر من وقت التاريخ الحالي'
    },
    ALERT: {
      DELETE_CALL_SCHEDULED: 'حذف المكالمة المجدولة',
      DELETE_CONTENT: 'هل أنت متأكد من أنك تريد حذف المكالمة المجدولة. بعد حذف المكالمة المجدولة غير قادر على الوصول.'
    },
    SCHEDULED_CALL_DELETED: 'تم حذف المكالمة المجدولة',
    CALL_RESCHEDULED: 'تمت إعادة جدولة المكالمة',
    SELECT_ALL: 'اختر الكل',
    UNSELECT_ALL: 'إلغاء تحديد الكل',

    HEADING: 'اعدادات الاتصال',
    FILTER: 'منقي',
    SELECT_TYPE: 'اختر صنف',
    SELECT_DATE: 'حدد التاريخ والوقت',
    SELECT_GROUP: 'اختر مجموعة',
    SELECT_TERMINAL: 'حدد المحطة',
    UPDATE_OS: 'تحديث نظام التشغيل',
    UPDATE_APP: 'تحديث التطبيق',
    SERIAL_NUMBER: "رقم سري",
    GROUPS: 'مجموعة',
    GROUP: 'مجموعة',
    TERMINAL: 'طرفية',
    ADD_SUCCESS: 'تمت إضافة المكالمة بنجاح',
    ADD_FAILURE: 'فشل المكالمة المضافة',
    EMPTY_FIELD: "لا يمكن أن يكون الفلتر فارغًا!",
    EMPTY_GROUP: "لا يمكن أن تكون المجموعة فارغة!",
    EMPTY_TERMINAL: "لا يمكن أن تكون المحطة الطرفية فارغة!",
    START_DATE: 'تاريخ البدء',
    END_DATE: "تاريخ الانتهاء",
    ERRORDATE: "يجب أن يكون التاريخ أكبر من تاريخ البدء!",
    SELECT_FILE: "حدد الملف",
    CALL_TYPE: "OS",
    FILE_VERSION: "حدد إصدار الملف",
    SELECTED_TERMINALS: "محطات مختارة",
    EXECUTE_ON: "تشغيل",
    CALL_TYPES: "نوع الاتصال",
    FILE_NAME: "اسم الملف",
    STARTING_DATE: "تاريخ البدء",
    ENDING_DATE: "تاريخ الانتهاء",
  },
  DOWNLOAD_AND_UPLOAD: {
    ERROR: 'هناك خطأ ما! ',
    FILE_NAME: 'اسم الملف',
    TYPE: 'اكتب',
    VERSION: 'إصدار',
    EDIT: 'يحرر',
    CREATED_TIME: "وقت الإنشاء",
    ADD_TOOLTIP_TITLE: 'يضيف',
    EXCEPT_ONLY: 'قبول ملفات TXT و XML و JSON و CSV فقط'
  },
  ERRORCODES: {
    TERMINAL_NOT_REGISTERED: 'المحطة غير مسجلة',
    FILE_NOT_CREATED: 'لم يتم تحميل الملف',
    APPLICATION_NOT_UPLOADED: 'التطبيق لم يتم تحميله',
    APPLICATION_NOT_FOUND: 'التطبيق غير موجود',
    APPLICATION_NOT_UPDATED: 'التطبيق لم يتم تحديثه',
    CALL_NOT_SCHEDULE: 'المكالمة غير مجدولة',
    CALL_NOT_RESCHEDULE: 'لم يتم إعادة تحديد موعد المكالمة',
    FILE_NOT_FOUND: 'لم يتم العثور على الملف',
    FILE_NOT_UPLOAD: 'لم يتم تحميل الملف',
    FILE_NOT_UPDATED: 'لم يتم تحديث الملف',
    GROUP_NOT_REGISTERED: 'المجموعة غير مسجلة',
    GROUP_NOT_FOUND: 'المجموعة غير موجودة',
    SERIAL_NUMBER_EXIST: 'الرقم التسلسلي موجود بالفعل',
    SERIAL_NUMBER_SHOULD_BE_UNIQUE: 'يجب أن يكون الرقم التسلسلي فريدًا',
    EMPTY_FILE: 'اختر ملفا، رجاءا',
    PASSWORD_NOT_GENERATED: 'لم يتم إنشاء كلمة المرور',
    REQUIRED_FIELD_MISSING: 'الحقل المطلوب مفقود',
    TERMINAL_SHOULD_BE_UNIQUE: 'يجب أن تكون المحطة الطرفية فريدة',
    TERMINAL_NOT_FOUND: 'المحطة غير موجودة',
    TERMINAL_NOT_UPDATED: 'المحطة غير محدثة',
    UNKNOWN_ERROR: 'هناك خطأ ما',
    PLEASE_SELECT_FILE: 'اختر ملفا، رجاءا',
    ONLY_NUMBER_ACCEPTED_AS_A_SERIAL_NUMBER: 'يجب أن يكون الرقم التسلسلي رقمًا وأكبر من 6 أرقام',
    LOGS_NOT_FOUND: 'لم يتم العثور على بيانات',
    INVALID_USER: 'مستخدم غير صالح',
    Created: 'تم تسجيل المستخدم بنجاح',
    Conflict: 'المستخدم مسجل بالفعل',
    RESET_PASSWORD: "إعادة تعيين كلمة المرور بنجاح",
    "لا يوجد محتوى": "تم تحديث المستخدم بنجاح",
    "المستخدم موجود بنفس اسم المستخدم": "المستخدم موجود بنفس اسم المستخدم",
    "غير مصرح به": "غير مصرح به",
    "المستخدم موجود بنفس البريد الإلكتروني": "المستخدم موجود بنفس البريد الإلكتروني",
    "خطأ داخلي في الخادم": "خطأ داخلي في الخادم"
  },
  DASH_BOARD: {
    TERMINAL_STATISTICS: "إحصائيات المحطة",
    MORE_DETAIL: "المزيد من التفاصيل",
    ACTIVE_TERMINALS: "المحطات النشطة",
    INACTIVE_TERMINALS: "محطات غير نشطة",
    ONE_MONTHS: "1 شهر",
    THREE_MONTHS: "3 اشهر",
    SIX_MONTHS: "6 اشهر",
    ALL: "الكل",
    MODEL_DISTRIBUTION: "توزيع النموذج",
    GROUP_DISTRIBUTION: "المجموعات ذات معظم المحطات الطرفية",
    NUMBER_OF_TERMINALS: "عدد المحطات في المجموعة",
  },
  REPORT: {
    BUTTON: 'بحث',
    START_CONNECTION: 'وقت الاتصال الأخير (نطاق النهاية)',
    END_CONNECTION: 'وقت الاتصال الأخير (نطاق النهاية)',
    APPLICATION_VERSION: 'إصدار التطبيق',
    BLACKLIST_VERSION: 'نسخة القائمة السوداء',
    OPERATOR: 'المشغل أو العامل',
    MODEL: 'نموذج',
    CITY: 'مدينة',
    GROUP: 'مجموعة',
    SUBGROUP: 'المجموعة الفرعية',
    EMPTY_LABEL: "لا أحد",
    CLOSE: "الى الخلف",
    COLUMN_LIST: "قائمة الأعمدة",
    VALIDATION: {
      LAST_CONNECTION_VALIDATION: "لا يمكن أن يكون وقت تاريخ البدء أكبر من تاريخ الانتهاء"
    },
    COUNTRY: "دولة",
    STATE: "حالة"
  },
  CALL_HISTORY: {
    FILE_NAME: 'اسم الملف',
    TYPE: "نوع",
    CREATED_TIME: 'تاريخ ووقت الإنشاء',
    DOWNLOAD: 'تحميل',
    COMMENT: 'تعليق'
  },
  DATA_TABLE: {
    ACTIVE: "نشيط",
    DISABLE: "معاق",
    DELETE: "حذف",
    AAS_SETTING: "إعداد AAS",
    APN_SETTING: "إعداد APN",
    MOVE_GROUPS: "نقل المجموعة",
  },
  USER_LOG: {
    DATE: "تاريخ",
    USER: "مستخدم",
    ACTION: "عمل",
    TERMINALS: "خطوات العمل",
    COMMENT: "تعليق",
    USER_LOG: "سجل دخول المستخدم",
    ACTIONS_LIST: {
      ACTIVE_STATUS: "حالة المحطة الطرفية نشطة",
      PASSIVE_STATUS: "حالة المحطة الطرفية سلبية",
      TERMINAL_UPDATE: "تحديث المحطة",
      AAS_CHANGE: "تم تغيير إعداد AAS",
      TERMINAL_DELETE: "محطة محذوفة",
      GROUP_ADD: "تمت إضافة المجموعة",
      SUBGROUP_ADD: "تمت إضافة المجموعة الفرعية",
      GROUP_UPDATE: "تم تحديث المجموعة",
      SUBGROUP_UPDATE: "تم تحديث المجموعة الفرعية",
      GROUP_DELETE: "مجموعة محذوفة",
      DOWNLOAD_PARAM_FILES: "تنزيل ملفات المعلمات",
      CALL_INITIATED: "بدأ الاتصال",
      BLACKLIST_FILE_DOWNLOADED: "تم تنزيل ملفات القائمة السوداء",
      APPLICATION_DOWNLOADED: "تم تنزيل التطبيق",
      HEARTBEAT_CALL_INITIATED: "تم بدء مكالمة Heartbeat",
      DOWNLOADED_RESPONSE: "تنزيل الاستجابة",
      HEARTBEAT_CALL_CHANGE_TERMINAL_STATUS: "تغيير الحالة الطرفية لمكالمة Heartbeat",
      LOGS_UPLOADED: "تم تحميل السجلات",
    }
  },
  USER_MANAGEMENT: {
    FIRST_NAME: 'الاسم الاول',
    LAST_NAME: 'الكنية',
    USER_NAME: 'اسم االمستخدم',
    EMAIL: 'البريد الإلكتروني',
    CREATED_DATE: 'وقت الإنشاء',
    ROLES: 'الأدوار',
    TEMPORARY_PASSWORD: 'كلمة مرور مؤقتة',
    CREATE_USER: 'إنشاء المستخدم',
    EDIT_USER: 'تحرير العضو',
    ROLE_CREATE: 'إنشاء دور',
    RESET_TEMPRORY_PASSWORD: 'إعادة تعيين كلمة المرور',
    RESET_PASSWORD_TOOLTIP: 'إعادة تعيين كلمة المرور',
    ADD_USER_TOOLTIP: 'يضيف',
    ROLE_DESCRIPTION: 'وصف',
    ROLE_NAME: 'اسم',
    CREATE_ROLE_HEADING: 'إنشاء دور',
    ROLE_CREATED: 'تم إنشاء الدور بنجاح',
    USER_CREATED: 'تم إنشاء المستخدم بنجاح',
    ROLE_MAPPED_TO_USER: 'تم تعيين الدور بنجاح',
    USER_UPDATED: 'تم تحديث التفاصيل بنجاح',
    RESET_PASSWORD: 'تم إعادة تعيين كلمة المرور بنجاح',
    VALIDATION: {
      FIRST_NAME: 'الرجاء تقديم اسم القبضة',
      LAST_NAME: 'يرجى تقديم اسم العائلة',
      FIRST_NAME_VALIDATION: 'يجب أن يكون الاسم بالأحرف الأبجدية فقط',
      USER_NAME: 'يرجى تقديم اسم المستخدم',
      EMAIL: 'يرجى تقديم بريد إلكتروني',
      ROLES: 'يرجى تقديم الأدوار',
      TEMPRORY_PASSWORD: 'يرجى تقديم كلمة مرور تيمبريوري',
      PROVIDE_ROLE_NAME: 'يرجى تقديم أدوار صالحة',
      PROVIDE_ROLES: 'الرجاء تحديد اسم الدور',
      PASSWORD_VALIDATION: 'يجب أن تتكون كلمة المرور من 8 أرقام كحد أدنى (يجب أن تكون أبجدية رقمية تبدأ بأحرف كبيرة وحرف خاص واحد على الأقل)',
      EMAIL_VALIDATION: 'يرجى تقديم بريد إلكتروني صالح'
    },
    ROLE_MAPPING: 'تعيين الدور',
    PERMISSION_ASSIGNED: 'تم تعيين الإذن بنجاح',
    PERMISSION_LIST: 'أذونات الميزات',
    ADD_FEATURES_PERMISSION: 'تعيين أذونات',
    DELETE_FEATURES_PERMISSION: 'حذف إذن الميزات',
    PERMISSION_DELETED: 'تم حذف الإذن بنجاح',
    VIEW_PERMISSION: 'عرض الأذونات',
    GROUP_ASSIGN: "تم تعيين المجموعة للمستخدم بنجاح",
    GROUP_ASSIGN_TO_USER: "تعيين المجموعة",
    FINISH_BUTTON: "ينهي",
    BACK_BUTTON: "خلف",
    NEXT_BUTTON: "التالي",
    USER_STEPPER_SUCCESS: "نجاح تسجيل المستخدم",
    GROUP: "مجموعة"
  },
  TRANSACTION: {
    SERIAL_NUMBER: "رقم سري",
    SYSTEM_IDENTIFIER: "معرّف النظام",
    TRANSACTION_TYPE: "نوع المعاملة",
    DATE_AND_TIME_OF_TRANSACTION: "وقت المعاملة",
    TRANSACTION_AMOUNT: "مقدار",
    TRANSACTION_STATUS: "حالة",
    DETAIL: "التفاصيل",
    TRANSACTION_DETAIL: "تفاصيل الصفقة",
    TRANSACTION_NUMBER: "رقم التحويلة",
    CARD_HOLDER_NUMBER: "رقم حامل البطاقة",
    AID_SELECTED_FOR_THE_CARD: "AID المحدد للبطاقة",
    TVR_OF_THE_TRANSACTION: "TVR من الصفقة",
    ACCEPTING_ISSUE_NUMBER: "قبول رقم الإصدار",
    AUTHORIZATION_NUMBER: "رقم الترخيص",
    REASON_FOR_REFUSING: "سبب الرفض",
    SPDH_CODE: "كود SPDH"
  },
  ERROR_BOUNDARY: {
    MESSAGE: "هناك خطأ ما! (يرجى تحديث الصفحة للمتابعة)"
  }
};

export default ar; 