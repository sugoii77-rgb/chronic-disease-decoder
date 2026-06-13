export const bodySystemNodes = [
  {
    id: "vessel",
    label: "혈관",
    icon: "🩸",
    x: 50,
    y: 30,
    title: "혈관과 만성질환",
    content:
      "혈관 벽의 탄성이 줄어들면 심장이 더 강하게 펌프질해야 하고, 이것이 혈압 상승으로 이어질 수 있습니다. 만성 염증은 혈관 내막(내피세포)을 손상시키고, 콜레스테롤은 이 손상을 '수리'하기 위해 몰려들 수 있습니다.",
    relation: "혈압 · 콜레스테롤",
    highlight: "#00d4ff",
  },
  {
    id: "heart",
    label: "심장",
    icon: "❤️",
    x: 50,
    y: 45,
    title: "심장과 혈압",
    content:
      "심박수(분당 박동수)와 박출량(한 번에 뿜어내는 혈액량)이 혈압을 직접 결정합니다. 베타차단제는 심박수와 심장 부하를 줄여 혈압을 낮춥니다. 심장 자체도 고혈압으로 인해 비대해질 수 있습니다.",
    relation: "혈압 · 심박출량",
    highlight: "#ef4444",
  },
  {
    id: "liver",
    label: "간",
    icon: "🫁",
    x: 65,
    y: 50,
    title: "간과 콜레스테롤",
    content:
      "LDL 콜레스테롤의 약 80%는 간에서 생산됩니다. 스타틴은 간의 HMG-CoA 환원효소를 억제하여 콜레스테롤 합성을 줄입니다. 간은 또한 혈당 조절, 해독, 담즙 생산에도 관여합니다.",
    relation: "콜레스테롤 합성 · 스타틴 작용",
    highlight: "#f59e0b",
  },
  {
    id: "brain",
    label: "뇌",
    icon: "🧠",
    x: 50,
    y: 10,
    title: "뇌와 혈압 조절",
    content:
      "뇌는 자율신경계를 통해 혈압 조절 신호를 보냅니다. 만성 스트레스는 교감신경을 활성화시켜 혈압을 올립니다. 뇌 자체는 콜레스테롤을 필요로 하며, 전체 콜레스테롤의 약 20-25%가 뇌에 존재합니다.",
    relation: "혈압 조절 · 스트레스",
    highlight: "#7c3aed",
  },
  {
    id: "pancreas",
    label: "췌장/인슐린",
    icon: "🔬",
    x: 35,
    y: 55,
    title: "인슐린과 혈압",
    content:
      "인슐린 저항성이 생기면 췌장이 더 많은 인슐린을 분비합니다. 높은 인슐린은 신장에서 나트륨 저류를 유발하고, 교감신경을 활성화시켜 혈압을 높일 수 있습니다. 이것이 당뇨 전단계에서 고혈압이 함께 오는 이유 중 하나입니다.",
    relation: "인슐린 저항성 · 혈압",
    highlight: "#10b981",
  },
  {
    id: "fat",
    label: "지방조직",
    icon: "💛",
    x: 40,
    y: 65,
    title: "지방조직과 염증",
    content:
      "특히 내장지방(복부 깊은 곳의 지방)은 단순한 에너지 저장소가 아닙니다. 인터루킨-6, TNF-α 같은 염증성 사이토카인을 분비하여 만성 염증을 일으킵니다. 이 염증이 혈관 손상과 인슐린 저항성을 악화시킵니다.",
    relation: "염증 · 인슐린 저항성",
    highlight: "#f59e0b",
  },
  {
    id: "kidney",
    label: "신장",
    icon: "🫘",
    x: 60,
    y: 65,
    title: "신장과 혈압",
    content:
      "신장은 체내 수분과 나트륨 균형을 조절하는 핵심 기관입니다. 이뇨제는 신장을 통해 나트륨과 수분을 더 많이 배출시켜 혈액량을 줄이고 혈압을 낮춥니다. 신장 기능 저하 자체도 혈압 상승의 원인이 됩니다.",
    relation: "혈액량 · 이뇨제",
    highlight: "#00d4ff",
  },
  {
    id: "muscle",
    label: "근육",
    icon: "💪",
    x: 25,
    y: 70,
    title: "근육과 인슐린 감수성",
    content:
      "근육은 우리 몸에서 포도당을 가장 많이 사용하는 조직입니다. 근육량이 많을수록 인슐린 감수성이 높아져 혈당 조절이 잘 됩니다. 운동 부족은 근육의 인슐린 수용체 기능을 저하시키고 인슐린 저항성을 악화시킵니다.",
    relation: "인슐린 감수성 · 운동",
    highlight: "#10b981",
  },
  {
    id: "nervous",
    label: "신경계",
    icon: "⚡",
    x: 75,
    y: 40,
    title: "자율신경계와 혈압",
    content:
      "교감신경(싸움-도피 반응)이 과활성화되면 혈관이 수축하고 심박수가 올라가 혈압이 상승합니다. 만성 스트레스, 수면 부족, 디지털 과자극은 모두 교감신경을 자극합니다. 부교감신경(이완 반응)을 활성화하는 습관이 중요합니다.",
    relation: "혈압 · 스트레스",
    highlight: "#7c3aed",
  },
];

export interface MedicationDetail {
  name: string;          // 약물 이름 (한글)
  english: string;       // 영문/성분명
  brands: string;        // 한국 대표 상품명
  action: string;        // 작용 기전
  sideEffects: { label: string; severity: "mild" | "moderate" | "severe" }[];
  note?: string;
}

export const hypertensionFactors = [
  {
    id: "volume",
    label: "혈액량",
    icon: "💧",
    title: "혈액량과 혈압",
    description:
      "혈관 내 혈액의 양이 많아질수록 혈관 벽에 가해지는 압력이 커집니다. 마치 수도관에 물이 많이 흐를수록 압력이 높아지는 것과 같습니다.",
    mechanism:
      "나트륨 과다 섭취 → 신장에서 수분 저류 → 혈액량 증가 → 혈압 상승",
    medications: [
      {
        name: "티아지드계 이뇨제",
        english: "Thiazide Diuretics / Hydrochlorothiazide",
        brands: "다이크로짇®, 히드로클로로티아짓",
        action: "신장 원위세뇨관에서 나트륨·수분 재흡수를 억제하여 혈액량을 줄임. 한국에서 1차 선택 이뇨제로 자주 사용.",
        sideEffects: [
          { label: "저칼륨혈증 (근육 경련, 피로)", severity: "moderate" },
          { label: "저마그네슘혈증", severity: "moderate" },
          { label: "혈당 상승 (당뇨 전단계 주의)", severity: "moderate" },
          { label: "요산 증가 (통풍 악화 가능)", severity: "moderate" },
          { label: "잦은 배뇨 (특히 복용 초기)", severity: "mild" },
          { label: "성욕 감소 (일부 환자)", severity: "mild" },
          { label: "저나트륨혈증 (고령자 특히 주의)", severity: "severe" },
        ],
      },
      {
        name: "루프 이뇨제",
        english: "Loop Diuretics / Furosemide",
        brands: "라식스®(Lasix), 후로세마이드",
        action: "헨레고리 상행각에서 나트륨·염소 재흡수 억제. 티아지드보다 강력한 이뇨 효과. 심부전·신부전에 주로 사용.",
        sideEffects: [
          { label: "심한 저칼륨혈증·저마그네슘혈증", severity: "severe" },
          { label: "탈수 및 저혈압", severity: "moderate" },
          { label: "청력 손상 (고용량, 드물게)", severity: "severe" },
          { label: "요산 증가", severity: "moderate" },
          { label: "혈당 상승", severity: "moderate" },
        ],
        note: "심부전이나 신부전 동반 시 주로 사용. 단순 고혈압에는 티아지드가 우선.",
      },
      {
        name: "알도스테론 길항제",
        english: "Aldosterone Antagonist / Spironolactone",
        brands: "알닥톤®(Aldactone), 스피로노락톤",
        action: "알도스테론 수용체 차단 → 나트륨 배출·칼륨 보존. 저항성 고혈압, 심부전에 사용. 칼륨보존 이뇨제.",
        sideEffects: [
          { label: "고칼륨혈증 (ACE억제제·ARB 병용 시 위험)", severity: "severe" },
          { label: "여성형 유방(남성), 월경 불순(여성)", severity: "moderate" },
          { label: "성욕 감소, 발기부전", severity: "moderate" },
          { label: "두통, 졸음", severity: "mild" },
        ],
      },
    ] as MedicationDetail[],
    lifestyleFactors: ["나트륨(소금) 섭취 줄이기", "충분한 수분 섭취", "가공식품 줄이기", "칼륨 풍부한 식품 섭취"],
    sliderEffect: 25,
  },
  {
    id: "elasticity",
    label: "혈관 탄성",
    icon: "🔄",
    title: "혈관 탄성과 혈압",
    description:
      "혈관이 딱딱해지면(동맥경화) 심장이 혈액을 밀어낼 때 더 강한 힘이 필요하고, 혈관 자체도 충격을 흡수하지 못해 혈압이 올라갑니다.",
    mechanism:
      "만성 염증 → 혈관 내막 손상 → 섬유화·석회화 → 혈관 경직 → 혈압 상승",
    medications: [
      {
        name: "ACE 억제제",
        english: "ACE Inhibitors / Enalapril, Ramipril, Perindopril",
        brands: "레니텍®, 트리테이스®, 아서틸®, 에날라프릴",
        action: "앤지오텐신 전환효소(ACE)를 억제 → 앤지오텐신 II 생성 감소 → 혈관 이완·알도스테론 감소. 당뇨·신장 보호 효과도 있어 당뇨 합병 고혈압에 자주 선택.",
        sideEffects: [
          { label: "마른기침 (한국인 10~30%, 동양인 높음)", severity: "moderate" },
          { label: "혈관부종 (드물지만 기도 부종 → 응급)", severity: "severe" },
          { label: "첫 복용 후 저혈압 (특히 이뇨제 병용)", severity: "moderate" },
          { label: "고칼륨혈증 (신장 기능 저하 시)", severity: "moderate" },
          { label: "태아 독성 (임신 중 금기)", severity: "severe" },
          { label: "신기능 초기 악화 (신동맥협착 주의)", severity: "moderate" },
        ],
      },
      {
        name: "칼슘채널차단제 (DHP계)",
        english: "Calcium Channel Blocker / Amlodipine, Nifedipine, Lercanidipine",
        brands: "노바스크®(Norvasc), 암로디핀, 아달라트®, 자니딥®",
        action: "혈관 평활근 세포의 L형 칼슘 채널 차단 → 혈관 이완 → 혈압 하강. 한국 처방 1위권의 고혈압 약. 협심증 동반 시 특히 유용.",
        sideEffects: [
          { label: "발목·하지 부종 (약 10%, 여성에 더 흔함)", severity: "moderate" },
          { label: "두통·안면 홍조 (초기)", severity: "mild" },
          { label: "심계항진·두근거림", severity: "mild" },
          { label: "잇몸 비대 (드물게, 장기 복용)", severity: "mild" },
          { label: "변비 (특히 베라파밀계)", severity: "mild" },
        ],
        note: "암로디핀은 반감기가 길어 하루 1번 복용. 갑자기 끊어도 비교적 안전.",
      },
      {
        name: "아스피린 (항혈소판제)",
        english: "Aspirin / Acetylsalicylic acid",
        brands: "아스피린 프로텍트®, 아스트릭스®, 바이엘 아스피린®",
        action: "혈소판 응집 억제(COX-1 차단) → 혈전 형성 예방. 혈압을 직접 낮추지는 않지만, 심혈관 고위험군에서 심근경색·뇌졸중 2차 예방 목적으로 병용 처방. 저용량(100mg)이 표준.",
        sideEffects: [
          { label: "위장 출혈·궤양 (공복 복용 주의)", severity: "moderate" },
          { label: "뇌출혈 위험 증가 (혈압 미조절 상태에서)", severity: "severe" },
          { label: "아스피린 천식 (아스피린 과민 환자)", severity: "severe" },
          { label: "이명, 청력 저하 (고용량 시)", severity: "moderate" },
          { label: "신기능에 영향 (장기·고용량)", severity: "moderate" },
          { label: "다른 NSAIDs와 병용 금기", severity: "moderate" },
        ],
        note: "1차 예방(심장병 없는 일반인)에서는 출혈 위험이 이득보다 클 수 있어 최근 가이드라인은 고위험군에만 권고. 반드시 의사와 상담 후 결정.",
      },
    ] as MedicationDetail[],
    lifestyleFactors: ["규칙적 유산소 운동", "오메가-3 섭취", "비타민 C·E", "금연", "항산화 식품"],
    sliderEffect: 20,
  },
  {
    id: "diameter",
    label: "혈관 직경",
    icon: "⭕",
    title: "혈관 직경과 혈압",
    description:
      "혈관이 좁아질수록 같은 양의 혈액이 통과하기 위해 더 높은 압력이 필요합니다. 혈관 수축은 교감신경, 앤지오텐신 II, 내피세포 기능 이상 등 여러 요인에 의해 조절됩니다.",
    mechanism:
      "앤지오텐신 II / 교감신경 → 혈관 평활근 수축 → 혈관 직경 감소 → 혈압 상승",
    medications: [
      {
        name: "ARB (앤지오텐신 수용체 차단제)",
        english: "ARB / Losartan, Valsartan, Olmesartan, Telmisartan, Irbesartan",
        brands: "코자®(Cozaar), 디오반®(Diovan), 올메텍®, 미카르디스®, 아프로벨®",
        action: "앤지오텐신 II의 AT1 수용체를 차단 → 혈관 수축·나트륨 저류 억제. ACE 억제제와 효과 유사하나 마른기침 부작용이 없어 한국에서 ACE 억제제 대신 많이 사용. 당뇨·만성신질환 보호 효과.",
        sideEffects: [
          { label: "현기증·기립성 저혈압 (초기)", severity: "mild" },
          { label: "고칼륨혈증 (ACE억제제 병용 시 위험)", severity: "moderate" },
          { label: "신기능 초기 악화 (신동맥협착 주의)", severity: "moderate" },
          { label: "태아 독성 (임신 금기)", severity: "severe" },
          { label: "드물게 혈관부종", severity: "moderate" },
        ],
        note: "ACE 억제제와 ARB 동시 복용은 금기. 마른기침 없어 복약 순응도 좋음.",
      },
      {
        name: "알파차단제",
        english: "Alpha-blocker / Doxazosin, Prazosin, Terazosin",
        brands: "카두라®(Cardura), 하이트린®, 독사조신",
        action: "알파-1 수용체 차단 → 교감신경성 혈관 수축 억제 → 혈관 확장. 전립선 비대증 동반 남성 고혈압 환자에게 특히 유용 (BPH에도 효과).",
        sideEffects: [
          { label: "기립성 저혈압·실신 (첫 복용 후 특히 위험, '초회 효과')", severity: "severe" },
          { label: "두통, 피로감", severity: "mild" },
          { label: "심부전 악화 가능 (단독 사용 시)", severity: "moderate" },
          { label: "역행성 사정 (일부 환자)", severity: "mild" },
        ],
        note: "취침 전 복용 권장(기립성 저혈압 예방). 단독 1차 치료제로는 잘 쓰지 않음.",
      },
      {
        name: "직접 혈관 확장제",
        english: "Vasodilator / Hydralazine, Minoxidil",
        brands: "아프레솔린®(Hydralazine), 미녹시딜",
        action: "혈관 평활근을 직접 이완시켜 혈관 확장. 저항성 고혈압이나 임신성 고혈압 일부에 사용.",
        sideEffects: [
          { label: "반사성 빈맥 (심박수 증가)", severity: "moderate" },
          { label: "체액 저류 (이뇨제 병용 필요)", severity: "moderate" },
          { label: "루푸스 유사 증후군 (Hydralazine 고용량·장기)", severity: "moderate" },
          { label: "다모증 (Minoxidil — 탈모 치료에 역이용)", severity: "mild" },
        ],
        note: "주로 다른 약제로 조절 안 될 때 추가하는 3차 선택약.",
      },
    ] as MedicationDetail[],
    lifestyleFactors: ["스트레스 관리", "마그네슘 섭취", "비트루트 (산화질소 전구체)", "명상·이완 기법"],
    sliderEffect: 20,
  },
  {
    id: "cardiac",
    label: "심박출량",
    icon: "❤️",
    title: "심박출량과 혈압",
    description:
      "심장이 1분 동안 뿜어내는 혈액량입니다. 심박수가 높거나 심장이 강하게 수축할수록 혈압이 올라갑니다. 교감신경 활성화, 스트레스, 카페인, 갑상선 기능 항진 등이 영향을 미칩니다.",
    mechanism:
      "교감신경 활성화 / 스트레스 → 심박수·수축력 증가 → 심박출량 증가 → 혈압 상승",
    medications: [
      {
        name: "베타차단제 (선택적)",
        english: "Selective Beta-blocker / Bisoprolol, Metoprolol, Atenolol, Nebivolol",
        brands: "컨코르®(Concor), 베타록®, 아테놀롤, 네비레트®",
        action: "심장 베타-1 수용체 차단 → 심박수·수축력 감소 → 심박출량 감소 → 혈압 하강. 협심증·심부전·부정맥 동반 시 특히 선호. 비조보롤은 산화질소 효과도 있어 부작용 적음.",
        sideEffects: [
          { label: "피로감·무기력증", severity: "moderate" },
          { label: "손발 냉감 (말초혈관 수축)", severity: "moderate" },
          { label: "혈당 증상 마스킹 (저혈당 징후 차폐, 당뇨 주의)", severity: "moderate" },
          { label: "운동 능력 저하 (최대 심박수 제한)", severity: "mild" },
          { label: "천식·COPD 악화 (비선택적 베타차단제 특히 위험)", severity: "severe" },
          { label: "발기부전 (일부 환자)", severity: "mild" },
          { label: "갑자기 끊으면 반동성 혈압 급등·협심증", severity: "severe" },
          { label: "우울감, 수면장애, 악몽 (지용성 약물)", severity: "mild" },
        ],
        note: "천식·COPD 환자는 선택적 베타차단제라도 주의. 반드시 서서히 감량해야 하며, 임의 중단 위험.",
      },
      {
        name: "베타차단제 (비선택적)",
        english: "Non-selective Beta-blocker / Carvedilol, Propranolol, Labetalol",
        brands: "딜라트렌®(Carvedilol), 인데랄®(Propranolol), 트란데이트®",
        action: "베타-1·2 및 알파-1 수용체 차단 (카베딜롤, 라베탈롤). 심부전·심근경색 후 치료, 갑상선중독증, 본태성 진전, 편두통 예방에도 사용.",
        sideEffects: [
          { label: "기관지 수축 (천식·COPD 금기에 가까움)", severity: "severe" },
          { label: "저혈당 마스킹 (당뇨 환자 주의)", severity: "moderate" },
          { label: "심각한 서맥·방실차단", severity: "severe" },
          { label: "피로, 우울, 성기능 장애", severity: "moderate" },
          { label: "말초 혈액순환 저하 (레이노 현상)", severity: "moderate" },
        ],
        note: "카베딜롤은 알파차단 효과로 말초 저항도 낮춰 심부전에 선호. 천식 환자에게는 원칙적 금기.",
      },
      {
        name: "이바브라딘 (If 채널 차단제)",
        english: "If-channel blocker / Ivabradine",
        brands: "프로코라란®(Procoralan)",
        action: "동결절의 If 전류 차단 → 심박수만 선택적으로 감소. 베타차단제 사용 불가한 환자(천식 등)에서 심박수 조절 목적. 혈압 직접 저하 효과는 제한적.",
        sideEffects: [
          { label: "광시증(밝은 빛 노출 시 섬광, 약 10~15%)", severity: "mild" },
          { label: "서맥", severity: "moderate" },
          { label: "두통, 현기증", severity: "mild" },
          { label: "심방세동 위험 약간 증가", severity: "moderate" },
        ],
        note: "심부전 동반 환자에서 베타차단제와 병용하거나, 베타차단제 불내성 시 대안.",
      },
    ] as MedicationDetail[],
    lifestyleFactors: ["규칙적 운동 (장기적으로 심박수 감소)", "충분한 수면", "카페인 절제", "이완 기법"],
    sliderEffect: 20,
  },
];

export const rootCauses = [
  {
    id: "insulin",
    icon: "📊",
    title: "혈당·인슐린 저항성",
    color: "#f59e0b",
    summary: "인슐린 저항성은 고혈압의 숨겨진 원인 중 하나일 수 있습니다.",
    mechanism:
      "세포가 인슐린에 반응하지 않으면 → 췌장이 더 많은 인슐린을 분비 → 고인슐린혈증 → 신장에서 나트륨 저류 → 교감신경 활성화 → 혈압 상승",
    plainLanguage:
      "정제된 탄수화물과 설탕을 많이 먹으면 혈당이 자주 급등하고, 이를 처리하기 위해 인슐린이 대량 분비됩니다. 장기적으로 세포가 인슐린 신호에 둔감해지면, 이것이 혈압에도 영향을 줄 수 있습니다.",
    habits: [
      "정제 탄수화물·설탕 줄이기",
      "식이섬유 풍부한 채소 먼저 먹기",
      "규칙적인 근력 운동",
      "간헐적 단식 (의사와 상담 후)",
      "식후 10분 걷기",
    ],
  },
  {
    id: "obesity",
    icon: "⚖️",
    title: "비만·혈관 과부하",
    color: "#ef4444",
    summary: "체중이 늘면 혈관 시스템에 더 많은 부담이 가해집니다.",
    mechanism:
      "체중 증가 → 더 많은 조직에 혈액 공급 필요 → 혈액량 및 심박출량 증가 → 혈압 상승. 내장지방 → 염증 사이토카인 분비 → 혈관 내막 손상",
    plainLanguage:
      "몸이 커질수록 혈액을 공급해야 할 범위가 넓어지고, 심장이 더 열심히 일해야 합니다. 또한 배 속 깊은 곳에 쌓인 내장지방은 염증 물질을 분비하여 혈관을 손상시킵니다.",
    habits: [
      "점진적인 체중 감량 (급격한 감량은 금물)",
      "전신 운동 루틴 구축",
      "초가공식품 대신 자연식품 선택",
      "충분한 수면 (수면 부족 시 식욕 호르몬 불균형)",
    ],
  },
  {
    id: "exercise",
    icon: "🏃",
    title: "운동 부족·혈관 경직",
    color: "#7c3aed",
    summary: "규칙적인 운동은 혈관을 젊게 유지합니다.",
    mechanism:
      "운동 부족 → 혈관 내피세포에서 산화질소(NO) 생산 감소 → 혈관 이완 능력 저하 → 혈관 경직 → 혈압 상승",
    plainLanguage:
      "운동할 때 혈관은 혈류 증가에 대응해 산화질소를 방출하고 스스로를 넓힙니다. 이 과정이 반복될수록 혈관이 더 유연해집니다. 운동하지 않으면 혈관이 점점 뻣뻣해집니다.",
    habits: [
      "하루 30분 빠른 걷기",
      "주 3회 이상 유산소 운동",
      "저항 운동(근력 운동) 추가",
      "앉아있는 시간 줄이기 (1시간마다 일어서기)",
    ],
  },
  {
    id: "nutrients",
    icon: "🥦",
    title: "영양소 결핍",
    color: "#10b981",
    summary: "혈관 건강에 필수적인 영양소들이 부족할 수 있습니다.",
    mechanism:
      "비타민 C 부족 → 콜라겐 합성 감소 → 혈관 벽 약화. 마그네슘 부족 → 혈관 평활근 수축 → 혈압 상승. 칼륨 부족 → 나트륨-칼륨 불균형 → 혈압 상승",
    plainLanguage:
      "혈관은 콜라겐으로 이루어진 튜브입니다. 비타민 C가 콜라겐 생산에 필수적이고, 마그네슘은 혈관을 이완시키는 데 도움이 됩니다. 칼륨은 나트륨의 혈압 상승 효과를 상쇄합니다.",
    habits: [
      "색깔 다양한 채소·과일 섭취",
      "견과류로 마그네슘 보충",
      "고구마·바나나로 칼륨 섭취",
      "등푸른 생선으로 오메가-3 보충",
    ],
  },
  {
    id: "stress",
    icon: "🧘",
    title: "만성 스트레스",
    color: "#00d4ff",
    summary: "만성 스트레스는 혈압을 지속적으로 높일 수 있습니다.",
    mechanism:
      "만성 스트레스 → 코르티솔·아드레날린 과다 분비 → 교감신경 과활성화 → 혈관 수축·심박수 증가 → 혈압 상승. 코르티솔은 또한 인슐린 저항성을 유발할 수 있음",
    plainLanguage:
      "몸은 스트레스를 '위협'으로 인식하고 싸움-도피 반응을 준비합니다. 이 상태가 만성화되면 혈압이 항상 높게 유지되고, 혈당도 오르며, 수면도 나빠집니다.",
    habits: [
      "명상 또는 깊은 호흡 연습 (하루 5-10분)",
      "자연 속 산책",
      "디지털 기기 사용 시간 제한",
      "사회적 관계 유지",
      "취미 활동 시간 확보",
    ],
  },
  {
    id: "sleep",
    icon: "😴",
    title: "수면 부족",
    color: "#7c3aed",
    summary: "수면은 혈압 조절의 숨겨진 핵심 요소입니다.",
    mechanism:
      "수면 중에는 혈압이 10-20% 낮아지는 '야간 하강(dipping)'이 정상입니다. 수면 부족 → 코르티솔 상승 → 교감신경 활성화 유지 → 야간 혈압 하강 없음 → 혈압 상승",
    plainLanguage:
      "충분히 자지 못하면 혈압이 밤 사이에도 쉬지 못합니다. 수면 무호흡증은 특히 혈압을 크게 올릴 수 있습니다. 질 좋은 수면 7-9시간은 혈압약 못지않게 중요할 수 있습니다.",
    habits: [
      "매일 같은 시간에 자고 일어나기",
      "침실은 시원하고 어둡게",
      "잠자리 1-2시간 전 스크린 끄기",
      "수면 무호흡증 검사 받기",
      "카페인은 오후 2시 이전에만",
    ],
  },
];

export const nutrients = [
  {
    id: "k2",
    icon: "🧀",
    title: "비타민 K2 / MK-7",
    color: "#f59e0b",
    role: "칼슘이 혈관에 쌓이는 것을 방지하고 뼈로 유도합니다. Matrix Gla Protein(MGP)을 활성화하여 혈관 석회화를 억제합니다.",
    foods: "낫또 (매우 높음), 치즈 (특히 숙성 치즈), 버터, 달걀 노른자",
    connection: "혈관 경직 예방, 동맥 석회화 감소 가능성",
    caution: "혈액 응고제(와파린 등) 복용 중인 경우 반드시 의사와 상담",
  },
  {
    id: "mg",
    icon: "🥜",
    title: "마그네슘",
    color: "#10b981",
    role: "300가지 이상의 효소 반응에 관여합니다. 혈관 평활근을 이완시켜 혈압을 낮추는 데 도움을 줄 수 있습니다. 인슐린 감수성 개선에도 기여합니다.",
    foods: "아몬드, 호박씨, 시금치, 다크 초콜릿, 아보카도, 검은 콩",
    connection: "혈압 조절, 혈관 이완, 인슐린 감수성",
    caution: "신장 기능 저하 시 고용량 보충에 주의. 설사 유발 가능 (용량 주의)",
  },
  {
    id: "k",
    icon: "🍌",
    title: "칼륨",
    color: "#7c3aed",
    role: "나트륨과 반대 역할을 하여 혈압을 낮추는 데 도움을 줍니다. 신장에서 나트륨 배출을 촉진하고, 혈관 벽의 긴장을 완화합니다.",
    foods: "바나나, 고구마, 아보카도, 시금치, 토마토, 콩류",
    connection: "혈압 조절, 나트륨 균형",
    caution: "신장 질환자는 고칼륨 식품 섭취 전 의사 상담 필요",
  },
  {
    id: "omega3",
    icon: "🐟",
    title: "오메가-3",
    color: "#00d4ff",
    role: "EPA·DHA는 항염증 효과가 있으며, 중성지방을 낮추고 혈관 내피 기능을 개선할 수 있습니다. 혈소판 응집 억제 효과도 있습니다.",
    foods: "고등어, 연어, 정어리, 참치, 들기름, 치아씨드, 호두",
    connection: "중성지방 감소, 항염증, 혈관 건강",
    caution: "혈액 희석제 복용 중인 경우 의사와 상담. 고용량 보충 시 주의",
  },
  {
    id: "vitE",
    icon: "🌻",
    title: "비타민 E / 토코트리에놀",
    color: "#f59e0b",
    role: "강력한 지용성 항산화제로 LDL 콜레스테롤의 산화를 방지합니다. 산화된 LDL이 혈관 내막에 쌓이는 것을 줄여줄 수 있습니다. 토코트리에놀은 콜레스테롤 합성 경로에도 영향을 줄 수 있습니다.",
    foods: "아몬드, 해바라기씨, 올리브오일, 아보카도, 팜 과일 (토코트리에놀)",
    connection: "LDL 산화 방지, 항산화 보호",
    caution: "혈액 희석제와 상호작용 가능. 고용량 보충은 의사와 상담",
  },
  {
    id: "vitD",
    icon: "☀️",
    title: "비타민 D / 햇빛",
    color: "#f59e0b",
    role: "비타민 D 수용체는 심혈관 조절, 면역, 혈압 관련 기전에 관여합니다. 햇빛은 피부에서 비타민 D 합성 외에도 산화질소(NO) 방출을 촉진하여 혈압을 낮출 수 있습니다.",
    foods: "햇빛 (15-30분/일), 연어·정어리·고등어, 달걀 노른자, 비타민 D 강화 식품",
    connection: "혈압 조절, 면역 기능, 인슐린 감수성",
    caution: "보충제 사용 시 혈중 수준 확인 후 적정량 복용. 과다복용은 독성 가능",
  },
  {
    id: "beet",
    icon: "🫑",
    title: "비트루트 / 산화질소",
    color: "#ef4444",
    role: "비트에는 질산염이 풍부하여 체내에서 산화질소(NO)로 전환됩니다. 산화질소는 강력한 혈관 확장 물질로 혈관 내피 기능을 개선합니다.",
    foods: "비트루트 주스·분말, 시금치, 루꼴라, 셀러리, 상추",
    connection: "혈관 확장, 혈압 하강 가능, 운동 능력 향상",
    caution: "소변·변이 붉게 변할 수 있음 (정상). 신장 결석 과거력 있는 경우 주의",
  },
  {
    id: "coq10",
    icon: "⚡",
    title: "CoQ10 (코엔자임 Q10)",
    color: "#7c3aed",
    role: "미토콘드리아에서 에너지(ATP) 생산에 필수적인 조효소입니다. 항산화 기능도 합니다. 스타틴은 CoQ10 합성 경로도 억제할 수 있어 보충을 고려하는 경우도 있습니다.",
    foods: "소고기·닭 내장육, 고등어·정어리, 땅콩, 시금치 (식품으로는 보충이 제한적)",
    connection: "세포 에너지, 항산화, 스타틴 복용자 고려 사항",
    caution: "혈액 희석제와 상호작용 가능. 스타틴 복용 중 CoQ10 보충은 반드시 의사와 상담",
  },
];

export const quizQuestions = [
  {
    id: 1,
    question: "다음 중 혈액량을 직접 증가시켜 혈압을 올리는 주된 원인은 무엇인가요?",
    options: [
      "나트륨 과다 섭취와 신장의 수분 저류",
      "심장 근육 약화",
      "LDL 콜레스테롤 증가",
      "갑상선 호르몬 감소",
    ],
    correct: 0,
    explanation:
      "나트륨(소금)을 많이 섭취하면 신장이 수분을 더 많이 붙잡아두어 혈액량이 늘어납니다. 혈액량이 많아질수록 혈관 벽에 가해지는 압력(혈압)이 높아집니다. 이뇨제는 바로 이 메커니즘에 작용하여 수분과 나트륨을 배출시킵니다.",
  },
  {
    id: 2,
    question: "중성지방/HDL 비율이 대사 건강의 지표로 유용한 이유는 무엇인가요?",
    options: [
      "이 비율이 인슐린 저항성 및 심혈관 위험을 반영할 수 있기 때문에",
      "HDL이 높을수록 항상 건강하기 때문에",
      "총 콜레스테롤 수치보다 항상 정확하기 때문에",
      "이 비율은 스타틴 필요 여부를 결정하기 때문에",
    ],
    correct: 0,
    explanation:
      "높은 중성지방과 낮은 HDL은 인슐린 저항성, 내장지방 증가, 대사증후군의 패턴을 반영하는 경향이 있습니다. 총 콜레스테롤 숫자 하나보다 이 비율 패턴이 실제 대사 건강 상태를 더 잘 보여줄 수 있다고 알려져 있습니다.",
  },
  {
    id: 3,
    question: "상대적 위험 감소(RRR)와 절대적 위험 감소(ARR)의 차이는 무엇인가요?",
    options: [
      "RRR은 비율로 표시되고 ARR은 실제 위험도 차이를 보여준다",
      "ARR이 항상 더 크다",
      "RRR만이 임상적으로 의미 있다",
      "둘은 사실 같은 개념이다",
    ],
    correct: 0,
    explanation:
      "예를 들어 위험도가 3%에서 2%로 줄었다면: ARR = 1%포인트 (100명 중 1명 추가 혜택), RRR = 33% (기존 위험의 33% 감소). RRR은 인상적으로 들리지만, ARR이 실제 개인에게 얼마나 도움이 되는지를 더 직접적으로 보여줍니다.",
  },
  {
    id: 4,
    question: "인슐린 저항성이 혈압 상승에 영향을 줄 수 있는 이유는?",
    options: [
      "고인슐린혈증이 신장에서 나트륨 저류와 교감신경 활성화를 유발할 수 있기 때문에",
      "인슐린이 심장을 직접 약하게 만들기 때문에",
      "인슐린이 콜레스테롤을 직접 증가시키기 때문에",
      "인슐린은 혈압과 직접적 연관이 없기 때문에",
    ],
    correct: 0,
    explanation:
      "인슐린 저항성 → 보상적 고인슐린혈증 → (1) 신장에서 나트륨 재흡수 증가로 혈액량 증가, (2) 교감신경 활성화로 혈관 수축·심박수 증가 → 혈압 상승. 이것이 당뇨 전단계와 비만에서 고혈압이 함께 나타나는 이유 중 하나입니다.",
  },
  {
    id: 5,
    question: "콜레스테롤의 필수적인 역할 중 하나는 무엇인가요?",
    options: [
      "성호르몬, 코르티솔, 비타민 D 생산의 원료",
      "혈압을 직접 낮추는 역할",
      "혈당을 조절하는 역할",
      "근육을 만드는 역할",
    ],
    correct: 0,
    explanation:
      "콜레스테롤은 에스트로겐, 테스토스테론, 코르티솔, 비타민 D 등 수많은 스테로이드 호르몬의 필수 원료입니다. 또한 모든 세포막의 구성 성분이고, 뇌와 신경의 주요 구성 물질이며, 소화를 돕는 담즙의 원료이기도 합니다.",
  },
  {
    id: 6,
    question: "약물 변경(시작, 중단, 용량 조절)을 할 때 반드시 해야 할 가장 중요한 일은?",
    options: [
      "반드시 담당 의사나 약사와 상담하고 결정한다",
      "인터넷에서 충분히 정보를 찾아본 후 스스로 결정한다",
      "부작용이 없으면 자유롭게 중단해도 된다",
      "혈압이 정상이면 바로 중단해도 된다",
    ],
    correct: 0,
    explanation:
      "이 앱은 교육 목적으로 만들어졌습니다. 약물은 반드시 의료 전문가와 상담하여 결정해야 합니다. 혈압약을 갑자기 중단하면 반등 효과로 혈압이 급상승할 수 있고, 다른 약들도 갑작스러운 중단이 위험할 수 있습니다.",
  },
];

export const lifestyleHabits = [
  { id: "carbs", label: "정제 탄수화물 줄이기", icon: "🍞",
    effects: { insulin: 25, inflammation: 10, triglycerides: 25, vascular: 5, bp: 15, metabolic: 16 } },
  { id: "protein", label: "양질의 단백질 섭취", icon: "🥩",
    effects: { insulin: 10, inflammation: 8, triglycerides: 5, vascular: 5, bp: 5, metabolic: 9 } },
  { id: "fasting", label: "간헐적 단식 실천", icon: "⏰",
    effects: { insulin: 20, inflammation: 15, triglycerides: 20, vascular: 10, bp: 10, metabolic: 15 } },
  { id: "walking", label: "규칙적 걷기/운동", icon: "🏃",
    effects: { insulin: 20, inflammation: 12, triglycerides: 15, vascular: 25, bp: 20, metabolic: 18 } },
  { id: "sleep", label: "수면 개선", icon: "😴",
    effects: { insulin: 10, inflammation: 15, triglycerides: 5, vascular: 10, bp: 20, metabolic: 12 } },
  { id: "stress", label: "스트레스 관리", icon: "🧘",
    effects: { insulin: 10, inflammation: 20, triglycerides: 5, vascular: 15, bp: 25, metabolic: 13 } },
  { id: "sunlight", label: "햇빛 노출", icon: "☀️",
    effects: { insulin: 8, inflammation: 10, triglycerides: 5, vascular: 10, bp: 10, metabolic: 9 } },
  { id: "weight", label: "체중 감량", icon: "⚖️",
    effects: { insulin: 25, inflammation: 20, triglycerides: 20, vascular: 15, bp: 25, metabolic: 21 } },
  { id: "processed", label: "초가공식품 줄이기", icon: "🚫",
    effects: { insulin: 15, inflammation: 20, triglycerides: 15, vascular: 10, bp: 10, metabolic: 14 } },
];
