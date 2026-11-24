// Dữ liệu bài thi Speaking Tiếng Anh Tài chính - Kế toán (English for Finance & Accounting)
// Đầy đủ 5 Unit: Price, Service, Insurance, Productivity, Motivation
// Bao gồm: Part 1 (Cá nhân / Thuyết trình), Part 2 (Nói cặp - Tình huống giải quyết), Part 3 (Giáo viên hỏi sâu)

export const UNITS = [
  {
    id: 'price',
    title: 'Unit 1: Price',
    vietnameseTitle: 'Giá cả & Chiến lược định giá trong Tài chính',
    description: 'Chiến lược giá, phân tích lạm phát, co giãn cầu theo giá, quyết định giá trong khủng hoảng chi phí.',
    color: 'from-amber-500 to-orange-600',
    badge: 'Finance & Pricing Strategy',
    icon: 'TrendingUp',
    questionsCount: 7,
    keyThemes: ['Inflation & Price Trends', 'Pricing Strategies (Premium vs Low Price)', 'Cost-Push Inflation & Shrinkflation', 'Graph Interpretation']
  },
  {
    id: 'service',
    title: 'Unit 2: Service',
    vietnameseTitle: 'Dịch vụ Khách hàng & Giải quyết Khiếu nại',
    description: 'Quy trình xử lý phàn nàn, Customer Lifetime Value, chính sách hoàn tiền và xử lý khủng hoảng truyền thông.',
    color: 'from-blue-500 to-cyan-600',
    badge: 'Customer Operations & Cost of Service',
    icon: 'Headphones',
    questionsCount: 7,
    keyThemes: ['Complaint Handling Protocols', 'Customer Retention vs Financial Loss', 'Public vs Private PR Response', 'Features of Service Excellence']
  },
  {
    id: 'insurance',
    title: 'Unit 3: Insurance',
    vietnameseTitle: 'Bảo hiểm & Quản trị Rủi ro Tài chính',
    description: 'Bảo hiểm thương mại, bồi thường tổn thất, rủi ro đạo đức (Moral Hazard), mức miễn thường (Excess) và thẩm định khiếu nại.',
    color: 'from-emerald-500 to-teal-600',
    badge: 'Risk Management & Underwriting',
    icon: 'ShieldCheck',
    questionsCount: 7,
    keyThemes: ['Risk Assessment & Types of Policies', 'Claims Investigation & Evidence', 'Personal Responsibility & Negligence', 'Policy Excess & Premium Adjustment']
  },
  {
    id: 'productivity',
    title: 'Unit 4: Productivity',
    vietnameseTitle: 'Năng suất, Tự động hóa & Tối ưu Chi phí',
    description: 'Sản xuất tinh gọn (Lean), mô hình Just-In-Time vs Hàng dự trữ an toàn, chi phí đầu tư máy móc (CapEx) vs Tối ưu quy trình.',
    color: 'from-purple-500 to-indigo-600',
    badge: 'Operations & Cost Accounting',
    icon: 'Cpu',
    questionsCount: 5,
    keyThemes: ['Automation vs Labor Costs', 'Just-In-Time (JIT) vs Safety Stock', 'Capital Investment vs Process Optimization', 'Productivity Metrics (OEE, Output/Hour)']
  },
  {
    id: 'motivation',
    title: 'Unit 5: Motivation',
    vietnameseTitle: 'Động lực Nhân sự & Hiệu quả Chi phí Tiền lương',
    description: 'Đãi ngộ tài chính vs Phi tài chính, chi phí thay thế nhân sự (Turnover cost), tối ưu ngân sách khen thưởng.',
    color: 'from-rose-500 to-pink-600',
    badge: 'HR Management & Incentive Budgeting',
    icon: 'Award',
    questionsCount: 6,
    keyThemes: ['Financial vs Non-financial Incentives', 'Intrinsic vs Extrinsic Motivation', 'Budget Allocation for Team Morale', 'Employee Retention & Productivity']
  }
];

export const SPEAKING_DATA = [
  // ================= UNIT 1: PRICE =================
  {
    id: 'price-q1',
    unitId: 'price',
    part: 'part1',
    type: 'individual_short',
    title: 'Current Price Trends (Increasing Prices)',
    question: 'What kinds of products and services are increasing in price at the moment?',
    vietnameseTranslation: 'Những loại sản phẩm và dịch vụ nào hiện đang tăng giá vào thời điểm này?',
    peelStructure: {
      point: 'State clearly which categories are experiencing price inflation (e.g., energy, fresh food, housing, healthcare).',
      explanation: 'Explain economic and accounting causes: rising input costs, geopolitical tensions, and supply chain disruptions.',
      example: 'Give a concrete financial example: electricity tariffs or gasoline prices surging by 15-20% and driving up logistics fees.',
      link: 'Conclude with the overall impact on consumers\' purchasing power and business operating margins.'
    },
    sampleAnswer: 'Currently, the most prominent categories experiencing steep price hikes are energy commodities, logistics services, and everyday consumer staples. From a macroeconomic perspective, this cost-push inflation is primarily driven by rising crude oil prices and global supply chain bottlenecks. For instance, in Vietnam and many emerging markets, transportation and electricity tariffs have risen significantly over the past year, which has directly elevated operational overheads for manufacturers. Consequently, retail prices for fresh groceries, dining out, and freight shipping have climbed by an estimated 10 to 15 percent, severely squeezing household disposable income and compressing corporate profit margins.',
    keyVocabulary: [
      { term: 'Cost-push inflation', meaning: 'Lạm phát do chi phí đẩy', usage: 'Driven by rising input costs such as raw materials and energy.' },
      { term: 'Consumer staples', meaning: 'Hàng tiêu dùng thiết yếu', usage: 'Essential goods like food and hygiene products.' },
      { term: 'Operating overheads', meaning: 'Chi phí vận hành chung', usage: 'Fixed and variable operational expenses.' },
      { term: 'Profit margins', meaning: 'Biên lợi nhuận', usage: 'The percentage by which revenue exceeds production costs.' }
    ],
    signpostingPhrases: [
      'From a macroeconomic perspective,...',
      'The primary catalyst behind this upward trend is...',
      'A notable case in point is...',
      'Consequently, this directly erodes consumer purchasing power.'
    ],
    teacherFollowUps: [
      {
        question: 'How do businesses protect their profit margins when input costs rise so sharply?',
        sampleResponse: 'Businesses typically adopt three strategies: first, passing cost increases onto end consumers through incremental price adjustments; second, hedging raw material prices via forward contracts; and third, implementing lean management to eliminate operational wastage.'
      }
    ]
  },
  {
    id: 'price-q2',
    unitId: 'price',
    part: 'part1',
    type: 'individual_short',
    title: 'Falling Prices (Deflationary Trends)',
    question: 'What things are getting cheaper?',
    vietnameseTranslation: 'Những thứ gì đang trở nên rẻ hơn?',
    peelStructure: {
      point: 'Identify consumer electronics, renewable energy hardware, or fast fashion.',
      explanation: 'Attribute falling prices to technological innovation, economies of scale, and fierce market saturation.',
      example: 'Cite flat-screen televisions, cloud storage, or solar photovoltaic panels.',
      link: 'Summarize how reduced marginal production costs benefit tech-savvy consumers.'
    },
    sampleAnswer: 'Conversely, consumer electronics and digital technology products have consistently become more affordable in real terms. This deflationary trend is driven by Moore\'s Law, continuous technological innovation, and massive economies of scale in manufacturing. For example, the unit cost of solid-state storage (SSDs), large LED smart TVs, and entry-level electric vehicle batteries has dropped by double digits compared to five years ago. Furthermore, intense competition among Asian manufacturers has driven production costs down, allowing consumers to acquire cutting-edge computing power and digital entertainment hardware at a fraction of their historical cost.',
    keyVocabulary: [
      { term: 'Economies of scale', meaning: 'Quy mô kinh tế', usage: 'Cost advantages reaped by companies when production becomes efficient.' },
      { term: 'Deflationary trend', meaning: 'Xu hướng giảm giá', usage: 'A sustained pattern of declining price levels in a specific sector.' },
      { term: 'Unit cost', meaning: 'Chi phí trên một đơn vị sản phẩm', usage: 'Total expenditure divided by the number of units produced.' },
      { term: 'Market saturation', meaning: 'Bão hòa thị trường', usage: 'A situation where supply exceeds current customer demand.' }
    ],
    signpostingPhrases: [
      'In sharp contrast to commodities,...',
      'This downward price trajectory is largely attributable to...',
      'To illustrate this point,...',
      'As a result, price-to-performance ratios have improved substantially.'
    ],
    teacherFollowUps: [
      {
        question: 'Is continuous price reduction always beneficial for a technology manufacturer?',
        sampleResponse: 'Not necessarily. While lower prices expand market share, an aggressive price war can trigger margin compression, leaving firms with insufficient capital for research and development (R&D).'
      }
    ]
  },
  {
    id: 'price-q3',
    unitId: 'price',
    part: 'part1',
    type: 'individual_short',
    title: 'Purchasing Behavior (Price vs Value vs Brand)',
    question: 'When you buy something, do you usually look for the lowest price, good value for money, or the product you like most?',
    vietnameseTranslation: 'Khi mua một món đồ, bạn thường tìm kiếm mức giá thấp nhất, giá trị tương xứng với số tiền bỏ ra, hay sản phẩm bạn thích nhất?',
    peelStructure: {
      point: 'State your purchasing philosophy clearly (e.g., prioritize "value for money" / cost-benefit ratio).',
      explanation: 'Differentiate between short-term savings and long-term total cost of ownership (durability, utility).',
      example: 'Compare purchasing a reliable laptop vs buying the cheapest alternative that breaks down quickly.',
      link: 'Reiterate that calculating total utility per dollar spent delivers optimal financial efficiency.'
    },
    sampleAnswer: 'As a student with a background in finance and accounting, I invariably prioritize "good value for money" over simply hunting for the lowest price tag. While buying the cheapest product provides immediate cash savings, it frequently results in a higher total cost of ownership due to poor durability, frequent breakdowns, and hidden replacement costs. For instance, when I purchased my study laptop, I chose a reputable mid-range model that offered robust performance and longevity, rather than the cheapest generic machine on the shelf. In my view, value for money represents the optimal equilibrium between acquisition cost, functional utility, and expected lifespan.',
    keyVocabulary: [
      { term: 'Value for money', meaning: 'Giá trị tương xứng với giá tiền', usage: 'The utility and quality derived relative to the financial outlay.' },
      { term: 'Total cost of ownership (TCO)', meaning: 'Tổng chi phí sở hữu', usage: 'Purchase price plus maintenance, repairs, and lifespan factors.' },
      { term: 'Optimal equilibrium', meaning: 'Điểm cân bằng tối ưu', usage: 'The perfect balance between cost and performance.' },
      { term: 'Acquisition cost', meaning: 'Chi phí mua sắm ban đầu', usage: 'The initial purchase price of an asset.' }
    ],
    signpostingPhrases: [
      'From a rational consumer perspective,...',
      'I tend to look beyond the nominal sticker price...',
      'A practical demonstration of this mindset is...',
      'Ultimately, striking the right balance yields the highest return on expenditure.'
    ],
    teacherFollowUps: [
      {
        question: 'Under what circumstances would an emotional preference outweigh value for money?',
        sampleResponse: 'For highly experiential goods, such as luxury watches or specialty coffee, brand equity and emotional resonance create perceived value that justifies a high premium over functional cost.'
      }
    ]
  },
  {
    id: 'price-sit1',
    unitId: 'price',
    part: 'part2',
    type: 'pair_situation',
    title: 'Situation 1: Low Price, Similar Price, or Premium Coffee Brand?',
    question: 'A new Vietnamese coffee brand wants to enter a market dominated by well-known international brands. Should it offer a much lower price, charge a similar price, or position itself as a premium product? Give your opinion and justify it.',
    vietnameseTranslation: 'Tình huống 1: Thương hiệu cà phê Việt Nam mới muốn gia nhập thị trường đã bị thống trị bởi các thương hiệu quốc tế nổi tiếng. Nên đặt giá thấp hơn nhiều, giá tương đương hay định vị cao cấp? Hãy nêu quan điểm và giải thích.',
    pairRoleplay: {
      partnerA: {
        role: 'Marketing & Brand Strategist (Advocates Premium / Value-Added Positioning)',
        stance: 'Suggests positioning as a premium specialty product highlighting Vietnamese authenticity (Robusta/Arabica single-origin).',
        points: ['Entering with a low price triggers an unwinnable price war against well-funded international giants.', 'A cheap price dilutes brand equity and signals inferior bean quality to affluent consumers.', 'Positioning as premium specialty coffee allows higher gross profit margins to cover prime rental costs.']
      },
      partnerB: {
        role: 'Financial Analyst (Advocates Penetration Pricing / Competitive Tier)',
        stance: 'Points out that international brands already hold the premium loyalists, so a competitive or slightly lower pricing tier is needed initially.',
        points: ['A premium price tag lacks consumer trust without established brand heritage.', 'Penetration pricing or value-for-money tier (10-15% below Starbucks) captures office workers and university youth.', 'High volume turnover is essential to achieve break-even within the first two operating years.']
      },
      consensusConclusion: 'Adopt a "Smart Premium Value" (Competitive Mid-Premium) strategy: Match international quality with authentic Vietnamese single-origin credentials, priced 15% below global giants. Combine this with introductory loyalty discounts to drive initial trial volume while preserving high perceived brand equity.'
    },
    sampleAnswer: 'In my assessment, adopting a "value-conscious premium" strategy is the most viable path. Entering with a deep discount is financially suicidal because international conglomerates have far deeper capital reserves to outlast any price war, and a bargain-basement price would irrevocably damage brand equity by signaling low-grade beans. However, pricing identical to or higher than Starbucks is equally dangerous because a new entrant lacks established brand loyalty. Therefore, the optimal approach is to position the brand as an authentic, high-quality Vietnamese specialty coffee, priced approximately 10 to 15 percent below international competitors. This captures cost-conscious coffee enthusiasts who seek premium taste without the exorbitant international brand markup.',
    keyVocabulary: [
      { term: 'Penetration pricing', meaning: 'Định giá thâm nhập thị trường', usage: 'Setting a relatively low price to rapidly gain market share.' },
      { term: 'Brand equity', meaning: 'Tài sản thương hiệu', usage: 'The commercial value derived from consumer perception of the brand name.' },
      { term: 'Gross profit margin', meaning: 'Biên lợi nhuận gộp', usage: 'Sales revenue minus cost of goods sold (COGS), divided by revenue.' },
      { term: 'Price war', meaning: 'Cuộc chiến về giá', usage: 'Fierce competition in which retailers continually undercut competitors.' }
    ],
    signpostingPhrases: [
      'While I see your point regarding market penetration,...',
      'From a financial sustainability perspective,...',
      'If we examine the risk of brand dilution,...',
      'Could we reach a consensus that a mid-premium tier is the safest route?'
    ],
    teacherFollowUps: [
      {
        question: 'If the coffee startup experiences negative cash flow in month six, what pricing levers can it pull?',
        sampleResponse: 'The management can introduce bundled combos (coffee plus pastry) to increase Average Order Value (AOV), launch tiered subscription cards for regular commuters, or conduct dynamic happy-hour pricing during off-peak morning hours.'
      }
    ]
  },
  {
    id: 'price-sit2',
    unitId: 'price',
    part: 'part2',
    type: 'pair_situation',
    title: 'Situation 2: Online Learning Student Pricing Strategy',
    question: 'An online learning company wants to attract university students. It can offer a low monthly price to everyone, or a higher standard price with a large student discount. Which strategy would be more effective? Explain your view.',
    vietnameseTranslation: 'Tình huống 2: Định giá cho sinh viên. Công ty học trực tuyến muốn thu hút sinh viên đại học. Nên đặt giá thấp cho tất cả mọi người, hay đặt giá chuẩn cao kèm chiết khấu sâu cho sinh viên? Chiến lược nào hiệu quả hơn?',
    pairRoleplay: {
      partnerA: {
        role: 'Revenue Operations Specialist (Advocates Price Discrimination / Student Discount)',
        stance: 'Supports second-degree price discrimination: higher standard price with a 50% verified student discount.',
        points: ['Maximizes total revenue by capturing full willingness-to-pay from working professionals ($30/mo) while serving price-sensitive students ($15/mo).', 'Creates perceived psychological value—students feel they are getting an exclusive, prestigious bargain.', 'Protects premium brand perception in the corporate training market.']
      },
      partnerB: {
        role: 'Growth Marketing Manager (Advocates Uniform Low Price)',
        stance: 'Prefers an across-the-board low monthly fee ($15/mo for everyone).',
        points: ['Eliminates student ID verification friction and churn during enrollment.', 'Massive viral user acquisition across high schools, self-learners, and students alike.', 'Lower customer acquisition cost (CAC).']
      },
      consensusConclusion: 'Implement Price Discrimination: Maintain a reputable standard professional tier ($29/month) while offering a 50% discount for verified university students ($14.50/month). This maximizes aggregate consumer surplus and establishes high corporate credibility.'
    },
    sampleAnswer: 'From an economic and financial perspective, the second strategy—charging a higher standard price coupled with a substantial student discount—is significantly more effective. In microeconomics, this is known as price discrimination, which enables a firm to extract maximum consumer surplus across distinct market segments. Working professionals have a higher ability and willingness to pay for career upskilling, whereas university students are notoriously price-sensitive with limited budgets. By maintaining a standard benchmark price of, say, $30 per month, the company anchors high quality and generates robust cash flow from adult learners. Simultaneously, a 50 percent student discount via student ID verification makes the platform accessible to undergraduates without eroding revenues from corporate users.',
    keyVocabulary: [
      { term: 'Price discrimination', meaning: 'Phân biệt giá', usage: 'Selling the same product to different segments at different prices based on willingness to pay.' },
      { term: 'Consumer surplus', meaning: 'Thặng dư tiêu dùng', usage: 'The difference between what consumers are willing to pay and what they actually pay.' },
      { term: 'Price sensitivity / Elasticity', meaning: 'Độ nhạy cảm về giá / Co giãn cầu', usage: 'The degree to which customer demand responds to a change in price.' },
      { term: 'Willingness to pay (WTP)', meaning: 'Mức sẵn lòng chi trả', usage: 'The maximum amount a customer is willing to spend for a service.' }
    ],
    signpostingPhrases: [
      'In financial economics, this mirrors the concept of market segmentation...',
      'If we apply uniform low pricing, we risk severe revenue cannibalization...',
      'On the flip side, offering a targeted discount anchors high brand value...',
      'Therefore, segmented pricing optimizes overall revenue yield.'
    ],
    teacherFollowUps: [
      {
        question: 'What is the risk of price arbitrage in this discount model, and how can the platform prevent it?',
        sampleResponse: 'The main risk is fraudulent use of expired student credentials by professionals. The platform can mitigate this by partnering with third-party verification APIs like SheerID or UNiDAYS to validate university email domains annually.'
      }
    ]
  },
  {
    id: 'price-sit3',
    unitId: 'price',
    part: 'part2',
    type: 'pair_situation',
    title: 'Problem Solving: Campus Coffee Price Hike Decision',
    question: 'A campus coffee must raise some prices because ingredient and energy costs have increased. Decide whether to raise all prices, raise only premium item prices, or reduce portion size while keeping price unchanged. Explain the likely customer reaction and agree on one option.',
    vietnameseTranslation: 'Giải quyết vấn đề: Quán cà phê trong trường phải tăng giá vì chi phí nguyên liệu và điện nước tăng. Quyết định tăng tất cả giá, chỉ tăng giá đồ uống cao cấp, hay giảm khẩu phần (shrinkflation) giữ nguyên giá? Giải thích phản ứng khách hàng và thống nhất 1 phương án.',
    pairRoleplay: {
      partnerA: {
        role: 'Operations & Cost Accountant',
        stance: 'Argues against shrinkflation because students immediately detect smaller cups, which destroys trust.',
        points: ['Shrinkflation (reducing cup size from 450ml to 380ml) leads to intense social media backlash.', 'Across-the-board hikes hurt daily budget-conscious students who buy simple black coffee.', 'Recommends selectively raising prices only on premium signature items (caramel macchiato, seasonal smoothies).']
      },
      partnerB: {
        role: 'Store General Manager',
        stance: 'Worried that raising premium items alone won\'t generate enough gross margin to cover bulk milk/coffee bean inflation.',
        points: ['Every beverage uses milk and electricity, so basic coffee costs have risen as well.', 'However, students are price-sensitive on standard Americano/black coffee.', 'Proposes a 2-tier compromise: keep basic coffee flat or add a modest +2,000 VND, while raising specialty drinks by 10-15%.']
      },
      consensusConclusion: 'Agree on Option B with transparent communication: Freeze the price of the staple daily black coffee to preserve goodwill with price-sensitive students, while raising prices on premium, topping-heavy specialty drinks by 12%. Pair this with a sign explaining ingredient cost increases and offering a small BYO tumbler discount.'
    },
    sampleAnswer: 'After analyzing all three options, we should unequivocally choose to raise prices only on premium specialty items while safeguarding the baseline price of standard drinks. Let us examine the customer reactions: If we implement shrinkflation by reducing portion sizes, students will immediately perceive it as deceptive, triggering toxic word-of-mouth on campus forums. On the other hand, raising all prices across the board penalizes struggling students who rely on basic black coffee for daily study sessions, potentially driving them away to vending machines. Premium items—such as blended frappes and flavored lattes—are luxury purchases with lower price elasticity of demand; students buying them prioritize taste over pennies. By increasing premium drinks by 10 to 15 percent, we cover the higher utility and raw material costs without alienating our core student base.',
    keyVocabulary: [
      { term: 'Shrinkflation', meaning: 'Lạm phát thu nhỏ (giảm khối lượng/kích cỡ giữ nguyên giá)', usage: 'Reducing the size or quantity of a product while keeping the price constant.' },
      { term: 'Price elasticity of demand', meaning: 'Độ co giãn của cầu theo giá', usage: 'Measure of how much the quantity demanded changes when price changes.' },
      { term: 'Cost of goods sold (COGS)', meaning: 'Giá vốn hàng bán', usage: 'Direct costs attributable to the production of the goods sold.' },
      { term: 'Customer retention rate', meaning: 'Tỷ lệ giữ chân khách hàng', usage: 'The percentage of customers that continue purchasing over a given period.' }
    ],
    signpostingPhrases: [
      'Let us weigh the pros and cons of each alternative...',
      'Shrinkflation presents a grave reputational hazard because...',
      'In terms of price elasticity, signature drinks are relatively inelastic...',
      'Therefore, the most rational compromise is selective premium price adjustments.'
    ],
    teacherFollowUps: [
      {
        question: 'How can the campus coffee shop maintain transparency and student loyalty during this price transition?',
        sampleResponse: 'The management can display an honest open letter at the counter detailing the inflation in milk and coffee bean prices, while introducing a 10% eco-friendly discount for students who bring their own reusable tumblers.'
      }
    ]
  },
  {
    id: 'price-pres',
    unitId: 'price',
    part: 'part1',
    type: 'presentation',
    title: 'Presentation (2-3 mins): Price Graph Interpretation',
    question: 'Describe and interpret one price graph from the unit in a 2-3 minute presentation. Identify the overall trends, at least two important trends and one possible business explanation.',
    vietnameseTranslation: 'Thuyết trình (2-3 phút): Miêu tả và phân tích một biểu đồ giá cả trong bài. Chỉ ra xu hướng chung, ít nhất hai xu hướng quan trọng và một lời giải thích về mặt kinh doanh.',
    peelStructure: {
      point: 'Introduction: Introduce the graph title, time horizon (e.g., quarterly coffee bean and retail price trends over 3 years), and main takeaway.',
      explanation: 'Detailed Trends: Trend 1 (sharp upward surge during supply shock) & Trend 2 (stabilization and divergence between raw commodity vs retail price).',
      example: 'Business Explanation: Relate the lag in retail price drops to sticky prices, long-term hedging contracts, and fixed operating costs.',
      link: 'Conclusion: Summarize key financial implications for pricing managers.'
    },
    sampleAnswer: 'Good morning, teacher. Today, I would like to present an analysis of the quarterly price movement graph for raw agricultural commodities and retail beverage prices over the past three years.\n\nLooking at the overall trajectory, the chart reveals a volatile upward cycle, with raw ingredient costs fluctuating wildly while retail consumer prices exhibit strong upward rigidity, or what economists term "sticky prices."\n\nI would like to highlight two critical trends from the data. First, between Q1 2022 and Q3 2023, there was a dramatic surge where raw commodity index jumped by almost 45%, climbing sharply from 120 points to a peak of 174 points. This upward spike was primarily caused by severe climate disruptions in major exporting nations like Brazil and Vietnam, alongside soaring shipping freight rates.\n\nThe second noteworthy trend occurred in late 2024: while wholesale commodity prices experienced a noticeable downturn of roughly 20%, retail beverage prices on store menus did not decrease at all; instead, they plateaued at their historic high.\n\nFrom a financial and accounting standpoint, the business explanation behind this divergence lies in two factors: operational lag and fixed overhead cost inflation. Food and beverage operators typically lock in raw materials through six-month forward contracts, meaning past high costs take time to unwind. Furthermore, while ingredient costs softened, secondary costs such as commercial store rent, employee minimum wages, and energy bills remained persistently elevated. Consequently, companies chose to hold retail prices firm in order to recover lost profit margins from previous quarters.\n\nIn conclusion, this graph underscores that retail pricing strategies are heavily influenced not merely by spot commodity prices, but by comprehensive cost structures and long-term margin recovery targets. Thank you for listening.',
    keyVocabulary: [
      { term: 'Upward trajectory', meaning: 'Xu hướng tăng', usage: 'A sustained upward path of numerical values over time.' },
      { term: 'Sticky prices / Price rigidity', meaning: 'Giá cả kết dính (khó giảm xuống)', usage: 'Resistance of market prices to change despite shifts in cost or demand.' },
      { term: 'Forward contracts / Hedging', meaning: 'Hợp đồng kỳ hạn / Phòng ngừa rủi ro', usage: 'Agreements to purchase assets at a fixed future price to mitigate volatility.' },
      { term: 'Spot commodity price', meaning: 'Giá giao ngay của hàng hóa', usage: 'Current market price at which an asset is bought or sold for immediate delivery.' }
    ],
    signpostingPhrases: [
      'The line graph clearly illustrates...',
      'A closer examination reveals two pivotal movements...',
      'Turning to the first noticeable trend,...',
      'The underlying economic driver behind this disparity is...',
      'To conclude my presentation,...'
    ],
    teacherFollowUps: [
      {
        question: 'Why do consumers react more aggressively to price increases than they do appreciatively to price cuts?',
        sampleResponse: 'Behavioral economics attributes this to "loss aversion"—consumers perceive a price increase as an immediate financial penalty, whereas a price reduction is quickly normalized as baseline expectation.'
      }
    ]
  },

  // ================= UNIT 2: SERVICE =================
  {
    id: 'service-q1',
    unitId: 'service',
    part: 'part1',
    type: 'individual_short',
    title: 'Consumer Complaining Habits in Your Country',
    question: 'In your country, if people have a problem with something they have bought or with service in a shop or restaurant, do they usually complain? If not, why not?',
    vietnameseTranslation: 'Ở nước bạn, nếu mọi người gặp vấn đề với sản phẩm họ mua hoặc dịch vụ trong cửa hàng/nhà hàng, họ có thường phàn nàn không? Nếu không, tại sao?',
    peelStructure: {
      point: 'State clearly the cultural and generational divide in complaining behavior in Vietnam.',
      explanation: 'Explain the traditional avoidance of confrontation vs modern digital feedback behavior.',
      example: 'Older generations remain silent but boycott ("vote with their feet"); younger consumers leave scathing Google/TikTok reviews.',
      link: 'Conclude with the business implication: unvoiced dissatisfaction leads to silent customer attrition.'
    },
    sampleAnswer: 'In Vietnam, consumer complaining habits have undergone a generational paradigm shift. Traditionally, older Vietnamese consumers tended to avoid direct face-to-face confrontation due to a cultural emphasis on harmony and saving face. If they received subpar food or indifferent service, they rarely made a formal scene; instead, they engaged in silent boycotts—simply never returning to that establishment. However, the younger digital-native demographic behaves entirely differently. Today, young customers do not hesitate to voice complaints, although they frequently bypass front-line staff and vent their dissatisfaction directly onto online review platforms like Google Maps, Facebook, or TikTok. For businesses, this silent or digital dissatisfaction is dangerous because it damages brand equity without giving managers an immediate chance to rectify the fault.',
    keyVocabulary: [
      { term: 'Customer attrition / Churn rate', meaning: 'Tỷ lệ rời bỏ của khách hàng', usage: 'The loss of clients or customers over a specific timeframe.' },
      { term: 'Silent boycott', meaning: 'Tẩy chay thầm lặng', usage: 'Ceasing patronage without filing an official verbal complaint.' },
      { term: 'Subpar service', meaning: 'Dịch vụ dưới chuẩn', usage: 'Service quality that falls below acceptable expectations.' },
      { term: 'Brand equity', meaning: 'Giá trị tài sản thương hiệu', usage: 'Commercial value built upon public perception and goodwill.' }
    ],
    signpostingPhrases: [
      'There is a distinct generational disparity in this regard...',
      'Culturally speaking, direct confrontation was traditionally avoided...',
      'In recent years, however, social media has decentralized customer feedback...',
      'From a management perspective, this represents a severe retention risk.'
    ],
    teacherFollowUps: [
      {
        question: 'From an accounting standpoint, why is resolving a complaint cheaper than acquiring a new customer?',
        sampleResponse: 'Financial research proves that Customer Acquisition Cost (CAC) is five to seven times higher than Customer Retention Cost (CRC). Retaining a disgruntled customer through quick service recovery protects their long-term Customer Lifetime Value.'
      }
    ]
  },
  {
    id: 'service-q2',
    unitId: 'service',
    part: 'part1',
    type: 'individual_short',
    title: 'Front-Line Customer Service Responsibilities',
    question: 'When you make a complaint, what should customer service staff say or do?',
    vietnameseTranslation: 'Khi bạn đưa ra lời phàn nàn, nhân viên chăm sóc khách hàng nên nói hoặc làm những gì?',
    peelStructure: {
      point: 'Outline the golden protocol: Active listening, sincere empathy/apology, and decisive restorative action.',
      explanation: 'Explain why defensive justifications inflame customer anger and erode loyalty.',
      example: 'The "LAST" method: Listen, Apologize, Solve, and Thank/Follow up.',
      link: 'Show that effective service recovery can turn an upset customer into a lifelong advocate.'
    },
    sampleAnswer: 'When a customer registers a legitimate complaint, customer service representatives should adhere strictly to the professional service recovery protocol known as the LAST framework—Listen, Apologize, Solve, and Thank. First and foremost, staff must practice active listening without interrupting or becoming defensive. Even if the error originated from third-party logistics, the employee must offer an empathetic, unreserved apology on behalf of the firm to validate the customer\'s frustration. Next, they must take immediate ownership by proposing a concrete solution—such as an instant replacement, a complimentary upgrade, or a full refund. Finally, they should document the incident in the CRM system and follow up to guarantee satisfaction. Demonstrating accountability restores consumer confidence and prevents churn.',
    keyVocabulary: [
      { term: 'Service recovery paradox', meaning: 'Nghịch lý phục hồi dịch vụ', usage: 'A situation where a customer thinks more highly of a company after it successfully fixes a problem.' },
      { term: 'Active listening', meaning: 'Lắng nghe chủ động', usage: 'Fully concentrating and understanding the client without interrupting.' },
      { term: 'Empathetic apology', meaning: 'Lời xin lỗi đồng cảm', usage: 'Expressing genuine regret for the inconvenience caused.' },
      { term: 'CRM system', meaning: 'Hệ thống quản lý quan hệ khách hàng', usage: 'Customer Relationship Management software used to track client interactions.' }
    ],
    signpostingPhrases: [
      'Front-line staff should execute a systematic four-step protocol...',
      'Crucially, they must refrain from finger-pointing or defensive excuses...',
      'A textbook illustration is the service recovery framework...',
      'Ultimately, accountability is what rebuilds shattered trust.'
    ],
    teacherFollowUps: [
      {
        question: 'What authority should senior management empower front-line staff with to resolve complaints efficiently?',
        sampleResponse: 'Management should grant front-line representatives an authorized discretionary spending limit (e.g., up to $50 or a free meal voucher) so they can resolve disputes instantly without waiting for lengthy bureaucratic approvals.'
      }
    ]
  },
  {
    id: 'service-q3',
    unitId: 'service',
    part: 'part1',
    type: 'individual_short',
    title: 'Evaluating Complaint Scenarios (When to Complain)',
    question: 'In which of the situations below should the customer complain? If not, why not? (Food overcooked / Do not like music / 10-min wait / Cigarette ash in expensive hotel / Train 5 min late / Wrong book sent & not arrived after 3 weeks / Car hire without road maps).',
    vietnameseTranslation: 'Trong các tình huống dưới đây, tình huống nào khách hàng NÊN phàn nàn? Nếu không, tại sao? (Thức ăn nấu quá chín / Không thích nhạc quán cà phê / Đợi 10 phút trong cửa hàng / Tàn thuốc trên sàn khách sạn đắt tiền / Tàu trễ 5 phút / Gửi nhầm sách 3 tuần chưa tới / Thuê xe không có bản đồ).',
    peelStructure: {
      point: 'Categorize situations into: Valid objective service breaches vs subjective/minor operational tolerances.',
      explanation: 'Explain that complaints are mandatory when health, safety, contract terms, or premium price value are violated.',
      example: 'Cigarette ash in a luxury hotel and the 3-week book delay are clear breach-of-contract issues; a 5-min train delay is minor tolerance.',
      link: 'Conclude that complaining should be constructive to enforce quality standards.'
    },
    sampleAnswer: 'To evaluate these scenarios, we must differentiate between objective breaches of contract and minor subjective inconveniences. \n\nFirst, a customer must absolutely complain in three clear situations: \n1. Cigarette ash on the floor in an expensive hotel room: When paying premium luxury rates, clean hygiene is a fundamental contractual expectation; ash suggests negligence and secondhand smoke hazards.\n2. Wrong book sent and still missing after three weeks: This is an unacceptable supply chain breakdown and a total failure of service fulfillment.\n3. Overcooked food in a restaurant: A customer is paying for edible, properly prepared culinary standards.\n\nConversely, a customer should generally not file a formal complaint for: \n- A train running five minutes late, which falls within acceptable public transit tolerances.\n- Disliking the ambient music in a cafe, as musical taste is purely subjective unless the decibel volume is physically deafening.\n- Waiting ten minutes in a busy retail shop during peak rush hours, which requires reasonable patience.\n\nAs for the car hire lacking paper road maps, in our modern GPS smartphone era, a polite request for assistance or a digital pin suffices rather than a formal grievance.',
    keyVocabulary: [
      { term: 'Breach of contract', meaning: 'Vi phạm hợp đồng dịch vụ', usage: 'Failing to perform any term of an agreement without a legitimate legal excuse.' },
      { term: 'Contractual expectation', meaning: 'Kỳ vọng theo thỏa thuận', usage: 'Anticipated deliverables agreed upon payment of a price.' },
      { term: 'Operational tolerance', meaning: 'Biên độ dung sai vận hành', usage: 'Allowable minor variations from standard operating procedures.' },
      { term: 'Service fulfillment', meaning: 'Hoàn tất dịch vụ', usage: 'The complete process of delivering an ordered product to the end user.' }
    ],
    signpostingPhrases: [
      'We can dissect these scenarios into two distinct categories...',
      'First, under strict contractual and hygiene grounds,...',
      'On the other hand, reasonable tolerance should be exercised regarding...',
      'In summary, complaints should target structural failures rather than personal taste.'
    ],
    teacherFollowUps: [
      {
        question: 'Why is clear documentation essential when a customer decides to escalate a complaint?',
        sampleResponse: 'Documentation—such as timestamps, order receipts, photographs of defects, and staff names—provides empirical evidence required for accounting refunds and legal compliance.'
      }
    ]
  },
  {
    id: 'service-sit1',
    unitId: 'service',
    part: 'part2',
    type: 'pair_situation',
    title: 'Situation 1: Is the Customer Always Right? (Months-Old Refund Demand)',
    question: 'A customer becomes angry and demands a full refund for a product that has been used for several months. Company policy does not normally allow this. How should the employee respond? How far should a company go to keep a customer satisfied?',
    vietnameseTranslation: 'Tình huống 1: Khách hàng có luôn luôn đúng? Khách nổi giận đòi hoàn tiền đầy đủ cho sản phẩm đã dùng vài tháng. Chính sách công ty không cho phép. Nhân viên nên trả lời thế nào? Công ty nên nhượng bộ đến mức nào để làm hài lòng khách?',
    pairRoleplay: {
      partnerA: {
        role: 'Customer Service Representative (Follows Policy & Financial Prudence)',
        stance: 'The customer is NOT always right when demands violate fair commercial ethics and explicit warranty policies.',
        points: ['Giving full cash back on a product used for months creates moral hazard and inventory write-off losses.', 'Company policy states a 30-day return window for manufacturer defects.', 'Firmly decline the cash refund, but empathetically offer free warranty repair or discounted replacement parts.']
      },
      partnerB: {
        role: 'Brand Reputation & PR Manager',
        stance: 'Recognizes policy limits but warns that an enraged customer can cause disproportionate damage via viral social media.',
        points: ['A viral TikTok video bashing the brand can destroy hundreds of thousands in sales.', 'Customer Lifetime Value (CLV) must be factored in—is this a high-spending VIP customer?', 'Suggests a partial goodwill compromise: store credit or a subsidized upgrade to protect goodwill without setting a cash precedent.']
      },
      consensusConclusion: 'Stand firm on company policy by politely denying the full cash refund, but de-escalate the tension by offering a complimentary professional repair inspection plus a 20% discount voucher toward their next purchase. Draw a firm boundary against unreasonable abuse while offering a dignified exit.'
    },
    sampleAnswer: 'In modern commerce, the traditional adage "the customer is always right" cannot be accepted uncritically, especially when it infringes on commercial viability and corporate policy. A customer demanding a 100 percent cash refund on an item utilized for several months is acting unreasonably. Conceding to such extortionate demands creates severe moral hazard and invites fraudulent returns that severely distort inventory accounting. \n\nHowever, front-line staff must handle this with high emotional intelligence. The representative must first listen calmly, acknowledge the customer\'s disappointment, and reaffirm the company\'s transparent 30-day return policy with polite firmness. While a cash refund must be declined, the firm can offer a commercially viable compromise: a free technical inspection, complimentary repairs under warranty, or a nominal store credit voucher for future purchases. Companies should go far to satisfy reasonable expectations, but never to the extent of compromising employee dignity or sustaining unhedged financial losses.',
    keyVocabulary: [
      { term: 'Moral hazard', meaning: 'Rủi ro đạo đức', usage: 'Lack of incentive to guard against risk where one is protected from its consequences.' },
      { term: 'Inventory write-off', meaning: 'Xóa sổ hàng tồn kho', usage: 'Recognizing the reduced or zero value of an unsellable returned asset.' },
      { term: 'Customer Lifetime Value (CLV)', meaning: 'Giá trị vòng đời khách hàng', usage: 'The total net profit attributed to the entire future relationship with a customer.' },
      { term: 'Warranty liability', meaning: 'Nghĩa vụ bảo hành', usage: 'Expected financial obligation to repair or replace defective goods.' }
    ],
    signpostingPhrases: [
      'While customer satisfaction is paramount, it cannot supersede contractual boundaries...',
      'If we succumb to this demand, we establish a dangerous operational precedent...',
      'A constructive middle ground would involve...',
      'To conclude, firmness in policy must be coupled with courtesy in delivery.'
    ],
    teacherFollowUps: [
      {
        question: 'When should a company officially "fire" or ban a customer?',
        sampleResponse: 'A firm should terminate business relations when a customer engages in verbal abuse, fraudulent return patterns, or costs more in customer service disputes than their aggregate Customer Lifetime Value generates.'
      }
    ]
  },
  {
    id: 'service-sit2',
    unitId: 'service',
    part: 'part2',
    type: 'pair_situation',
    title: 'Situation 2: Social Media Public Complaint Strategy',
    question: 'A dissatisfied customer posts a negative comment about the company on social media before contacting customer service. Should the company respond publicly, privately, or both? Explain your position.',
    vietnameseTranslation: 'Tình huống 2: Khiếu nại công khai. Khách hàng đăng bình luận tiêu cực trên mạng xã hội trước khi liên hệ CSKH. Công ty nên phản hồi công khai, riêng tư, hay cả hai? Giải thích quan điểm của bạn.',
    pairRoleplay: {
      partnerA: {
        role: 'Social Media & Communications Specialist',
        stance: 'Advocates a rapid two-pronged hybrid approach (both public acknowledgment and private resolution).',
        points: ['Ignoring the public post allows rumors and social proof of poor service to spread.', 'Posting an initial courteous public comment shows transparency to all onlookers.', 'Moving details to Direct Message (DM) protects customer data and prevents messy online flame wars.']
      },
      partnerB: {
        role: 'Legal & Compliance Officer',
        stance: 'Warns against admitting liability in public comments.',
        points: ['A public admission of fault can be used against the firm in consumer protection lawsuits.', 'Public responses must remain strictly factual, non-committal, and focused on inviting direct communication.', 'Ensure resolution details (refunds/compensations) stay private to avoid copycat complaints.']
      },
      consensusConclusion: 'Execute a coordinated "Public Empathy, Private Settlement" protocol: Post a prompt public reply within 30 minutes expressing empathy and providing a direct contact ticket link. Then resolve the grievance privately via email/DM, followed by inviting the customer to update their public review once satisfied.'
    },
    sampleAnswer: 'The company should unequivocally execute a synchronized "two-pronged hybrid strategy"—responding both publicly and privately. \n\nFirst, a public acknowledgment is mandatory within minutes of the post. Because social media is visible to prospective buyers, ignoring the grievance or deleting the comment signals guilt and arrogance, causing irreparable brand damage. The public response must be professional, courteous, and non-defensive: thanking the customer for their feedback, expressing regret for their inconvenience, and stating that the company takes the matter seriously.\n\nHowever, the actual investigation and dispute resolution must immediately be redirected to a private channel, such as direct messaging, phone, or encrypted email. Resolving the issue privately protects sensitive customer order information, prevents toxic public arguments, and prevents opportunistic copycat claims from bad actors. Once the issue is successfully resolved privately, the customer can be politely invited to post a follow-up comment confirming that the issue was handled expeditiously.',
    keyVocabulary: [
      { term: 'Two-pronged hybrid strategy', meaning: 'Chiến lược tích hợp hai mũi nhọn', usage: 'An operational approach combining public PR with private resolution.' },
      { term: 'Brand reputation damage', meaning: 'Tổn hại danh tiếng thương hiệu', usage: 'Erosion of commercial standing and public perception.' },
      { term: 'Service Level Agreement (SLA)', meaning: 'Cam kết chất lượng dịch vụ (thời gian phản hồi)', usage: 'Contractually defined response and resolution times.' },
      { term: 'Opportunistic copycat claims', meaning: 'Yêu cầu bồi thường bắt chước cơ hội', usage: 'Frivolous complaints triggered by seeing others receive free compensation.' }
    ],
    signpostingPhrases: [
      'The optimal crisis management protocol requires a bifurcated approach...',
      'On the public front, immediate visibility and transparency are non-negotiable...',
      'Conversely, the substantive negotiation must be transitioned into private channels...',
      'In doing so, the business safeguards both PR optics and commercial confidentiality.'
    ],
    teacherFollowUps: [
      {
        question: 'What is the acceptable Service Level Agreement (SLA) response time for social media complaints in modern business?',
        sampleResponse: 'In today\'s digital marketplace, industry benchmark SLAs require an initial automated or human public response within 15 to 30 minutes to arrest negative viral momentum.'
      }
    ]
  },
  {
    id: 'service-sit3',
    unitId: 'service',
    part: 'part2',
    type: 'pair_situation',
    title: 'Problem Solving: Wrong Product Delivered 1 Day Before Event',
    question: 'A customer received the wrong product one day before an important event. Decide what the company should offer: an immediate refund, express replacement, store credit, or a combination. Justify your choice.',
    vietnameseTranslation: 'Giải quyết vấn đề: Khách nhận nhầm hàng 1 ngày trước sự kiện quan trọng. Quyết định công ty nên đề nghị: hoàn tiền ngay, giao hàng thay thế hỏa tốc, điểm tín dụng cửa hàng (store credit), hay kết hợp? Giải thích sự lựa chọn.',
    pairRoleplay: {
      partnerA: {
        role: 'Logistics & Expedited Fulfillment Manager',
        stance: 'The customer\'s urgent utility is the physical product for the event, not just money.',
        points: ['Offering only a refund leaves the customer empty-handed for their event, destroying relationship.', 'The company must dispatch an express same-day courier with the correct product immediately at company expense.', 'Pick up the incorrect item during delivery so there is zero friction for the customer.']
      },
      partnerB: {
        role: 'Finance & Customer Retention Director',
        stance: 'Agrees on express replacement, but stresses financial compensation for the stress caused.',
        points: ['Logistics alone does not compensate for emotional panic on the eve of a major event.', 'Add a complementary store credit (e.g., 20-30%) or partial rebate on the shipping fee.', 'Cost of express courier ($20) + voucher ($15) is far lower than losing a high-value customer.']
      },
      consensusConclusion: 'Offer a high-impact combination: Dispatch a complimentary same-day express replacement courier within 4 hours, permit the customer to keep or easily hand back the wrong item, and provide a 25% store credit voucher as a goodwill gesture for the severe inconvenience.'
    },
    sampleAnswer: 'In this critical emergency, offering merely a standard refund or store credit is entirely inadequate, because the customer\'s paramount need is to have the functioning product in hand for tomorrow\'s event. Therefore, the company should execute a decisive combination of an immediate express replacement and compensatory store credit. \n\nFirst, logistics must dispatch the correct product via same-day express courier within hours at zero cost to the buyer, accompanied by a courier pickup of the erroneous item to eliminate logistical hassle for the customer. Second, to genuinely restore goodwill and acknowledge the acute stress caused 24 hours prior to a key milestone, the firm should grant a 25% partial refund or equivalent store credit for future purchases. Financially speaking, the immediate expense of express freight and a goodwill credit is negligible compared to the catastrophic loss of Customer Lifetime Value and the risk of public defamation on review sites.',
    keyVocabulary: [
      { term: 'Customer churn cost', meaning: 'Chi phí mất khách hàng', usage: 'Financial loss suffered when an account defect to a rival.' },
      { term: 'Expedited / Express fulfillment', meaning: 'Xử lý đơn hàng hỏa tốc', usage: 'Priority delivery services operating within compressed time windows.' },
      { term: 'Goodwill gesture', meaning: 'Cử chỉ thiện chí', usage: 'A concession or gift provided to maintain amicable business relations.' },
      { term: 'Service breakdown', meaning: 'Sự cố gãy đổ dịch vụ', usage: 'Failure in the operational chain resulting in incorrect customer fulfillment.' }
    ],
    signpostingPhrases: [
      'In a time-sensitive crisis, time utility supersedes mere monetary restitution...',
      'A solitary refund would fail to address the customer\'s acute operational bottleneck...',
      'Hence, the only professional remedy is a multi-tier combination...',
      'This comprehensive package transforms an operational failure into a loyalty builder.'
    ],
    teacherFollowUps: [
      {
        question: 'If the item is completely out of stock and an express replacement is physically impossible, what is the plan B?',
        sampleResponse: 'The manager should issue an instantaneous 100% refund, contact local brick-and-mortar retail partners to hold an equivalent item for the customer, and subsidize any price difference as emergency compensation.'
      }
    ]
  },
  {
    id: 'service-pres',
    unitId: 'service',
    part: 'part1',
    type: 'presentation',
    title: 'Presentation (2-3 mins): Three Features of Excellent Customer Service',
    question: 'Give a 2-3 minute presentation on three features of excellent customer service and explain why each one matters.',
    vietnameseTranslation: 'Thuyết trình (2-3 phút): Trình bày 3 đặc điểm của dịch vụ khách hàng xuất sắc và giải thích tại sao mỗi đặc điểm lại quan trọng.',
    peelStructure: {
      point: 'Introduction: Introduce the thesis that excellent service is a competitive moat and financial driver, not an overhead cost center.',
      explanation: 'Feature 1 (Speed & Responsiveness), Feature 2 (Empathetic Personalization), Feature 3 (First-Contact Resolution - FCR).',
      example: 'Business Impact: Link each feature to metrics like reduced churn, higher Net Promoter Score (NPS), and lower support ticket costs.',
      link: 'Conclusion: Reiterate that service excellence maximizes shareholder value and customer retention.'
    },
    sampleAnswer: 'Good morning, teacher and classmates. Today, I am delighted to present on the three fundamental pillars of excellent customer service and why each represents a critical financial and competitive driver in modern business.\n\nThe first indispensable feature is speed and responsiveness. In our on-demand digital economy, customers equate delayed response times with corporate indifference. A study by Zendesk demonstrates that answering an inquiry within the first hour increases conversion and satisfaction rates by over 40%. When an organization responds swiftly, it eliminates uncertainty, alleviates consumer anxiety, and establishes professional reliability.\n\nThe second pillar is empathetic personalization. Far too many organizations treat customer support as a sterile, robotic script. Excellent service requires front-line representatives to treat customers as individual partners, listening attentively, acknowledging emotions, and tailoring solutions rather than reciting generic boilerplate disclaimers. When clients feel respected and genuinely understood, their emotional attachment to the brand deepens, driving up Customer Lifetime Value and insulating the firm from price competition.\n\nThe third, and arguably most critical operational metric, is First-Contact Resolution, commonly known as FCR. Excellent service does not mean shuffling a customer across four different departments. It means empowering front-line personnel with the operational tools, authority, and financial autonomy to diagnose and resolve an issue on the initial interaction. From an accounting perspective, high FCR dramatically slashes operating overheads by eliminating repetitive ticket escalations and minimizing employee workload.\n\nTo conclude, speed respects the customer\'s time, empathy captures their heart, and first-contact resolution protects their trust. Together, these three features transform customer service from an administrative cost center into a powerful engine of repeat revenue and sustainable brand equity. Thank you for your attention.',
    keyVocabulary: [
      { term: 'First-Contact Resolution (FCR)', meaning: 'Giải quyết ngay trong lần liên hệ đầu', usage: 'Percentage of incoming service requests resolved without requiring follow-up.' },
      { term: 'Net Promoter Score (NPS)', meaning: 'Chỉ số đo lường sự hài lòng và lòng trung thành', usage: 'Metric assessing how likely customers are to recommend a company.' },
      { term: 'Cost center vs Profit engine', meaning: 'Trung tâm chi phí đối lập Động lực tạo lợi nhuận', usage: 'A department that consumes resources versus one generating business value.' },
      { term: 'Operational autonomy', meaning: 'Quyền tự chủ trong vận hành', usage: 'Freedom granted to staff to make decisions without senior sign-off.' }
    ],
    signpostingPhrases: [
      'To commence my presentation, I wish to outline three cardinal pillars...',
      'The initial cornerstone is operational agility and responsiveness...',
      'Moving forward to the second dimension, empathetic personalization...',
      'Finally, from a managerial accounting standpoint, First-Contact Resolution...',
      'In conclusion, these attributes collectively build a formidable competitive moat.'
    ],
    teacherFollowUps: [
      {
        question: 'How do you balance high-touch customer service personalization with the cost-efficiency of AI chatbots?',
        sampleResponse: 'A hybrid model is optimal: deploying AI chatbots for routine, high-volume tier-one inquiries like order tracking, while seamlessly routing complex, emotionally sensitive escalations to highly trained human specialists.'
      }
    ]
  },

  // ================= UNIT 3: INSURANCE =================
  {
    id: 'insurance-q1',
    unitId: 'insurance',
    part: 'part1',
    type: 'individual_short',
    title: 'Common Insurable Risks for Individuals and Businesses',
    question: 'What risks do people and businesses usually insure against?',
    vietnameseTranslation: 'Những rủi ro nào mà cá nhân và doanh nghiệp thường mua bảo hiểm để phòng ngừa?',
    peelStructure: {
      point: 'Categorize risks into personal health/property perils vs commercial corporate liabilities.',
      explanation: 'Explain the core risk transfer mechanism: swapping an unpredictable catastrophic loss for a small, predictable premium.',
      example: 'Individuals: health, life, auto, homeowner; Businesses: business interruption, public liability, cyber risk, directors & officers (D&O).',
      link: 'Conclude that insurance safeguards financial solvency and business continuity.'
    },
    sampleAnswer: 'Both individuals and corporate enterprises face a spectrum of perils and systematically transfer these uncertainties to insurance carriers. For private individuals, the primary insurable risks revolve around personal health emergencies, life insurance against premature death, and property damage covering automobiles and residential real estate against fire or theft. For businesses, risk management is even more intricate. Corporations routinely procure commercial property insurance, business interruption insurance—which replaces lost revenues during unexpected shutdowns—and public liability coverage to protect against customer injury claims. Furthermore, in our digital era, cyber liability insurance has emerged as essential protection against data breaches, ransomware attacks, and associated regulatory penalties. In essence, insurance guarantees financial solvency when catastrophic events strike.',
    keyVocabulary: [
      { term: 'Risk transfer mechanism', meaning: 'Cơ chế chuyển giao rủi ro', usage: 'Shifting the financial burden of pure risk to an insurance company.' },
      { term: 'Business interruption insurance', meaning: 'Bảo hiểm gián đoạn kinh doanh', usage: 'Covers lost income that a business would have earned during an operational halt.' },
      { term: 'Public liability', meaning: 'Trách nhiệm dân sự công cộng', usage: 'Protection against legal claims of third-party bodily injury or property damage.' },
      { term: 'Financial solvency', meaning: 'Khả năng thanh toán tài chính', usage: 'The ability of an entity to meet its long-term financial obligations.' }
    ],
    signpostingPhrases: [
      'We can demarcate insurable risks into two broad spheres...',
      'On the individual level, the focus is safeguarding personal assets and health...',
      'From a corporate governance perspective, commercial exposures include...',
      'Ultimately, insurance converts unpredictable catastrophe into a predictable operating expense.'
    ],
    teacherFollowUps: [
      {
        question: 'Why are speculative risks, like gambling or stock market trading losses, uninsurable?',
        sampleResponse: 'Insurance principles only cover "pure risks" where there is only a chance of loss or no loss. Speculative risks involve the potential for financial gain, making them actuarially uninsurable due to severe moral hazard.'
      }
    ]
  },
  {
    id: 'insurance-q2',
    unitId: 'insurance',
    part: 'part1',
    type: 'individual_short',
    title: 'Necessity of Evidence Before Paying Insurance Claims',
    question: 'Why do insurance companies need evidence before paying a claim?',
    vietnameseTranslation: 'Tại sao các công ty bảo hiểm cần bằng chứng trước khi chi trả tiền bồi thường?',
    peelStructure: {
      point: 'Identify fraud prevention, fiduciary duty, and contractual compliance as the core reasons.',
      explanation: 'Explain insurance fraud accounting losses and the principle of indemnity (preventing unjust enrichment).',
      example: 'Requiring police accident reports, medical invoices, or forensic fire audits before disbursing funds.',
      link: 'Show that robust claims verification preserves the financial solvency of the insurance pool.'
    },
    sampleAnswer: 'Insurance carriers rigorously mandate verifiable empirical evidence prior to approving any claim disbursement due to three fundamental legal and actuarial reasons. First and foremost is the prevention of fraudulent claims. According to global insurance federations, insurance fraud drains tens of billions of dollars annually; without police reports, forensic assessments, and certified receipts, carriers would fall prey to staged accidents or inflated loss values. Second, evidence enforces the core legal doctrine of indemnity—which dictates that the insured should be restored to their pre-loss financial position without gaining an unjust financial profit. Third, insurers have a strict fiduciary duty to protect their underwriting reserves and the collective premium pool; validating legitimate claims ensures that premium rates remain affordable for all honest policyholders.',
    keyVocabulary: [
      { term: 'Principle of indemnity', meaning: 'Nguyên tắc bồi thường', usage: 'Compensating the exact financial loss suffered, preventing profit from a claim.' },
      { term: 'Insurance fraud', meaning: 'Gian lận bảo hiểm', usage: 'Deceptive actions committed to obtain illicit financial payouts from an insurer.' },
      { term: 'Fiduciary duty', meaning: 'Nghĩa vụ ủy thác', usage: 'A legal obligation to act in the best financial interest of beneficiaries.' },
      { term: 'Underwriting reserves', meaning: 'Quỹ dự phòng bồi thường', usage: 'Funds held by an insurer to pay future claims.' }
    ],
    signpostingPhrases: [
      'This evidentiary requirement rests upon three cardinal pillars...',
      'Chief among them is combating systematic insurance fraud...',
      'Furthermore, under the strict legal principle of indemnity,...',
      'Consequently, empirical verification protects the integrity of the risk pool.'
    ],
    teacherFollowUps: [
      {
        question: 'What is the role of an independent loss adjuster during this evidence verification stage?',
        sampleResponse: 'A loss adjuster acts as an impartial professional who inspects the physical damage, audits repair invoices, examines policy conditions, and calculates the exact fair indemnification amount.'
      }
    ]
  },
  {
    id: 'insurance-q3',
    unitId: 'insurance',
    part: 'part1',
    type: 'individual_short',
    title: 'Post-Incident Clarification by Security Managers',
    question: 'What information should a security manager clarify after an incident, theft, or break-in?',
    vietnameseTranslation: 'Người quản lý an ninh nên làm rõ những thông tin gì sau một sự cố, vụ trộm cắp hoặc đột nhập?',
    peelStructure: {
      point: 'Detail the comprehensive forensic incident audit: Time, entry points, itemized asset inventory, CCTV records.',
      explanation: 'Explain how precise incident logging enables police investigations and satisfies insurance claims auditors.',
      example: 'Documenting forced entry marks, alarm sensor logs, and serial numbers of missing IT assets.',
      link: 'Conclude that swift evidentiary clarity accelerates insurance reimbursement and plugs security vulnerabilities.'
    },
    sampleAnswer: 'Following a security breach, theft, or physical break-in, a corporate security manager must compile an immediate, rigorous forensic incident report to satisfy law enforcement and insurance claims underwriters. First, they must clarify the precise chronology and point of breach—identifying exact timestamps through electronic access badges, motion sensors, and security alarm logs. Second, they must preserve and catalog high-definition CCTV footage and inspect physical signs of forced entry. Third, they must conduct an exhaustive, itemized asset audit in coordination with the accounting department, specifying model numbers, serial numbers, purchase invoices, and book values of all missing or damaged assets. Finally, they must clarify whether any staff negligence or protocol lapses contributed to the security failure, ensuring that internal vulnerabilities are remediated immediately.',
    keyVocabulary: [
      { term: 'Forensic incident report', meaning: 'Báo cáo pháp y / giám định sự cố', usage: 'Detailed formal documentation recording facts, evidence, and sequence of an event.' },
      { term: 'Book value / Asset audit', meaning: 'Giá trị ghi sổ / Kiểm toán tài sản', usage: 'The recorded accounting value of an asset on the corporate balance sheet.' },
      { term: 'Chain of custody', meaning: 'Quy trình bảo quản chuỗi chứng cứ', usage: 'Documenting the chronological transfer and custody of evidence.' },
      { term: 'Contributory negligence', meaning: 'Lỗi bất cẩn góp phần', usage: 'Carelessness by the insured that contributes to the occurrence of a loss.' }
    ],
    signpostingPhrases: [
      'The security manager must execute an immediate four-phase audit...',
      'Initial priority is establishing the forensic timeline and vector of entry...',
      'Equally vital is reconciling physical losses against accounting registers...',
      'This rigorous documentation forms the evidentiary bedrock for insurance indemnification.'
    ],
    teacherFollowUps: [
      {
        question: 'If the security alarm was found to be disabled by staff before the break-in, how does that affect the insurance payout?',
        sampleResponse: 'Most commercial policies include a "warranty condition" requiring security systems to remain armed. If staff intentionally deactivated it, the insurer can legally repudiate the claim on grounds of gross negligence or breach of warranty.'
      }
    ]
  },
  {
    id: 'insurance-sit1',
    unitId: 'insurance',
    part: 'part2',
    type: 'pair_situation',
    title: 'Situation 1: Personal Responsibility (Laptop Stolen in Unlocked Car)',
    question: 'A person leaves an expensive laptop in an unlocked car and it is stolen. The laptop is insured. Should the insurance company pay the full claim, part of it, or nothing? Give a reason for your view.',
    vietnameseTranslation: 'Tình huống 1: Trách nhiệm cá nhân. Một người để chiếc laptop đắt tiền trong ô tô không khóa cửa và bị trộm mất. Laptop có mua bảo hiểm. Công ty bảo hiểm nên bồi thường toàn bộ, một phần, hay không bồi thường? Nêu lý do cho quan điểm của bạn.',
    pairRoleplay: {
      partnerA: {
        role: 'Insurance Claims Adjuster (Advocates Repudiation or Partial Payment)',
        stance: 'The policyholder breached the statutory "Duty of Care" by leaving valuable electronics exposed in an unlocked vehicle.',
        points: ['Standard insurance contracts explicitly mandate reasonable precautions against theft.', 'Leaving a car unlocked in a public area amounts to gross negligence.', 'Paying the full claim rewards reckless behavior and encourages moral hazard.']
      },
      partnerB: {
        role: 'Consumer Protection Advocate / Policyholder Representative',
        stance: 'Points out that people purchase comprehensive all-risk coverage precisely to protect against human error and momentary lapses.',
        points: ['The theft was a genuine criminal event verified by a police report.', 'A total claim rejection would generate severe consumer ombudsman disputes and PR fallout.', 'Advocates a partial payout (e.g., 50% or imposing a high negligence deductible/excess).']
      },
      consensusConclusion: 'Apply a Partial Settlement based on Contributory Negligence: The insurer should repudiate a full payout due to clear breach of reasonable care, but pay 50% of the depreciated market value minus the policy excess, penalizing the claimant\'s carelessness while acknowledging that theft is an insured peril.'
    },
    sampleAnswer: 'In evaluating this scenario through the lens of insurance law and risk management, the insurer should definitively approve only a partial payment or reject the claim entirely, with a partial settlement subject to heavy penalties being the most equitable outcome. \n\nEvery comprehensive insurance policy contains an explicit "duty of care" clause, legally obligating the policyholder to take all reasonable precautions to safeguard insured property. Leaving an expensive laptop in plain sight inside an unlocked vehicle constitutes gross contributory negligence—it invites crime and breaches standard security warranties. Paying a 100 percent claim would establish a perilous precedent of moral hazard, effectively incentivizing careless consumer habits at the expense of the collective premium pool. \n\nHowever, because an actual criminal theft occurred, as verified by police, many modern insurance ombudsmen advocate an equitable compromise: approving a reduced settlement of approximately 40 to 50 percent of the laptop\'s depreciated actual cash value, while applying a punitive policy excess. This approach acknowledges the insured peril while penalizing the individual\'s blatant negligence.',
    keyVocabulary: [
      { term: 'Duty of care / Reasonable precautions', meaning: 'Nghĩa vụ cẩn trọng / Biện pháp phòng ngừa hợp lý', usage: 'Legal responsibility to take reasonable steps to prevent foreseeable loss.' },
      { term: 'Gross negligence', meaning: 'Lỗi bất cẩn nghiêm trọng', usage: 'A conscious and voluntary disregard of the need to use reasonable care.' },
      { term: 'Policy excess / Deductible', meaning: 'Mức miễn thường / Khấu trừ', usage: 'The initial out-of-pocket amount paid by the insured before the insurer pays.' },
      { term: 'Actual Cash Value (ACV)', meaning: 'Giá trị tiền mặt thực tế (đã trừ khấu hao)', usage: 'Replacement cost minus accumulated physical depreciation.' }
    ],
    signpostingPhrases: [
      'Under standard contract law, the insured holds an inescapable duty of care...',
      'Leaving high-value assets in an unlocked vehicle represents prima facie negligence...',
      'To disburse full indemnification would invite rampant moral hazard...',
      'Consequently, an apportioned partial reimbursement strikes the fairest legal equilibrium.'
    ],
    teacherFollowUps: [
      {
        question: 'What is the legal difference between simple human forgetfulness and "gross negligence"?',
        sampleResponse: 'Simple negligence is an accidental oversight, such as believing the car auto-locked; gross negligence is an extreme departure from ordinary care, such as knowingly leaving valuables in plain view with open windows or unlocked doors.'
      }
    ]
  },
  {
    id: 'insurance-sit2',
    unitId: 'insurance',
    part: 'part2',
    type: 'pair_situation',
    title: 'Situation 2: High-Risk Customer Policy Renewal (3 Genuine Claims in 2 Years)',
    question: 'A customer has made several genuine claims in two years. Discuss whether the insurer should raise the premium, keep it unchanged, or change the policy excess. Consider fairness and risk.',
    vietnameseTranslation: 'Tình huống 2: Khách hàng rủi ro cao. Khách hàng đã nộp 3 yêu cầu bồi thường chính đáng trong 2 năm. Thảo luận xem công ty bảo hiểm nên tăng phí bảo hiểm, giữ nguyên, hay thay đổi mức miễn thường (policy excess) / từ chối tái tục. Cân nhắc yếu tố công bằng và rủi ro.',
    pairRoleplay: {
      partnerA: {
        role: 'Actuary & Underwriter (Focused on Risk Exposure & Loss Ratios)',
        stance: 'The customer\'s claim frequency exceeds actuarial models; doing nothing jeopardizes the insurer\'s loss ratio.',
        points: ['Three claims in 24 months places this client in the top 5% highest risk tier.', 'Keeping the premium unchanged is unfair to the pool of claim-free policyholders.', 'Proposes substantially hiking the premium by 40% and doubling the policy excess.']
      },
      partnerB: {
        role: 'Customer Retention & Ethics Officer',
        stance: 'Points out that the claims were 100% genuine and verified, not fraudulent.',
        points: ['Refusing to renew penalizes a loyal customer who bought insurance for legitimate protection.', 'An excessive premium increase will cause the customer to cancel and defame the company.', 'Recommends adjusting the policy excess (deductible) rather than an exorbitant premium hike, so the client pays only when making future minor claims.']
      },
      consensusConclusion: 'Implement a Balanced Underwriting Restructuring: Retain the customer by offering renewal with a moderate premium increase (15-20%) and a significantly higher policy excess (deductible) for future claims. This aligns incentives, discourages small nuisance claims, and fairly prices risk.'
    },
    sampleAnswer: 'From an actuarial and ethical standpoint, an insurer cannot keep the policy unchanged, nor should it abruptly refuse renewal for genuine claims. The insurer must implement a balanced underwriting adjustment that combines a moderate premium increase with a restructured policy excess. \n\nLet us analyze fairness and risk: The customer made three verified, genuine claims, proving they were not acting fraudulently. However, from a statistical risk perspective, high claim frequency indicates an unfavorable loss ratio and heightened loss exposure. If the insurer keeps premiums unchanged, honest policyholders who never make claims are effectively subsidizing this high-risk profile, which violates actuarial fairness. Conversely, refusing renewal outright harms client retention and consumer goodwill. \n\nTherefore, the most professional solution is to raise the policy excess (the deductible) significantly—say, doubling it—coupled with a modest 15 percent premium increase. A higher policy excess acts as a behavioral safeguard: it disincentivizes the customer from lodging small, frivolous claims, compels them to adopt better risk mitigation, and shares the financial risk between both parties fairly.',
    keyVocabulary: [
      { term: 'Loss ratio', meaning: 'Tỷ lệ bồi thường / tổn thất', usage: 'Total claims paid divided by total earned premiums.' },
      { term: 'Policy excess / Deductible restructuring', meaning: 'Tái cấu trúc mức khấu trừ', usage: 'Adjusting the out-of-pocket amount required from the client per claim.' },
      { term: 'Actuarial fairness', meaning: 'Công bằng theo xác suất bảo hiểm', usage: 'Pricing premiums directly proportional to an individual\'s expected risk loss.' },
      { term: 'Claim frequency', meaning: 'Tần suất khiếu nại bồi thường', usage: 'The number of claims submitted within a specified time horizon.' }
    ],
    signpostingPhrases: [
      'To evaluate this dilemma, we must balance commercial risk against consumer equity...',
      'Leaving the policy terms untouched violates actuarial fairness across the pool...',
      'Conversely, outright cancellation is heavy-handed for genuine losses...',
      'Restructuring the deductible achieves an ideal alignment of risk-sharing.'
    ],
    teacherFollowUps: [
      {
        question: 'What is a "No-Claims Bonus" (NCB), and how does it incentivize safe behavior?',
        sampleResponse: 'A No-Claims Bonus is a compounding premium discount (up to 50%) granted to policyholders for consecutive claim-free years, economically rewarding risk-averse behavior and reducing minor claim administrative costs.'
      }
    ]
  },
  {
    id: 'insurance-pres',
    unitId: 'insurance',
    part: 'part1',
    type: 'presentation',
    title: 'Presentation (2-3 mins): Making Fair Insurance Claim Decisions',
    question: 'Give a 2-3 minute presentation explaining how an insurer can make a fair claim decision using evidence, policy conditions, and communication.',
    vietnameseTranslation: 'Thuyết trình (2-3 phút): Thuyết trình giải thích cách công ty bảo hiểm đưa ra quyết định bồi thường công bằng dựa trên bằng chứng, điều khoản hợp đồng và giao tiếp.',
    peelStructure: {
      point: 'Introduction: A fair claims settlement process is the ultimate moment of truth that defines an insurance company\'s integrity.',
      explanation: 'Pillar 1: Rigorous Empirical Evidence (photos, police reports, receipts) prevents fraud and ensures accurate loss valuation.',
      example: 'Pillar 2: Transparent Application of Policy Conditions (deductibles, coverage exclusions, limits) without bad-faith ambiguity.',
      link: 'Pillar 3 & Conclusion: Empathetic, Clear Communication throughout the process maintains trust and avoids litigation.'
    },
    sampleAnswer: 'Good morning, teacher. In the insurance industry, the claims handling process is widely recognized as the "moment of truth." It is the decisive moment where the intangible promise sold on paper transforms into real financial indemnification. Today, I will explain how an insurer can execute a truly fair claim decision by harmonizing three core elements: empirical evidence, policy conditions, and transparent communication.\n\nThe first foundational pillar is empirical evidence. Fairness begins with objectivity. Before disbursing funds, claims assessors must conduct an impartial, thorough investigation—examining police incident reports, expert repair estimates, forensic damage audits, and original purchase invoices. Concrete evidence protects the integrity of the claims process: it prevents fraudulent payouts that would otherwise deplete underwriting reserves, while simultaneously verifying the exact monetary quantum of the insured\'s legitimate loss.\n\nThe second pillar is the strict, consistent application of policy conditions. Insurance is a binding legal contract governed by the principle of "uberrima fides"—utmost good faith. An insurer must evaluate whether the loss falls within covered perils, verify whether warranties were observed, and calculate the payout strictly according to agreed policy limits and deductibles. Fairness requires that exclusion clauses be applied reasonably, not weaponized through deceptive legal loopholes to evade legitimate liability.\n\nThe third, and most frequently neglected pillar, is empathetic and transparent communication. Filing a claim is often an acutely stressful experience for a client recovering from an accident, burglary, or fire. The insurer must provide clear, proactive updates regarding the claim\'s status, explain the technical calculation of the settlement, and if a claim must be partially reduced or repudiated, articulate the exact contractual rationale in plain, accessible language rather than obtuse jargon.\n\nTo conclude, by anchoring decisions in verifiable evidence, upholding transparent contract conditions, and communicating with empathy and clarity, an insurer fulfills its legal obligations, protects its risk pool, and earns enduring public trust. Thank you for your attention.',
    keyVocabulary: [
      { term: 'Utmost good faith (Uberrima fides)', meaning: 'Nguyên tắc trung thực tuyệt đối', usage: 'The foundational legal standard requiring full disclosure and honesty in insurance.' },
      { term: 'Quantum of loss', meaning: 'Định mức tổn thất tài chính', usage: 'The exact monetary calculation of damage or financial loss incurred.' },
      { term: 'Covered perils', meaning: 'Hiểm họa được bảo hiểm', usage: 'Specific causes of property loss covered under the written policy.' },
      { term: 'Claim repudiation', meaning: 'Từ chối bồi thường', usage: 'The formal legal refusal by an insurer to pay a submitted claim.' }
    ],
    signpostingPhrases: [
      'The claims settlement procedure represents the ultimate moment of truth...',
      'First and foremost, objectivity demands rigorous empirical evidence...',
      'Secondly, contractual integrity hinges on transparent policy conditions...',
      'Lastly, empathetic and prompt communication bridges technical decisions with consumer trust...',
      'In synthesis, these three pillars ensure equitable indemnification.'
    ],
    teacherFollowUps: [
      {
        question: 'What recourse does a policyholder have if they believe an insurer unfairly rejected their legitimate claim?',
        sampleResponse: 'The policyholder can first appeal to the insurer\'s Internal Dispute Resolution committee; if unresolved, they can escalate the case to the independent Insurance Ombudsman or initiate legal arbitration.'
      }
    ]
  },

  // ================= UNIT 4: PRODUCTIVITY =================
  {
    id: 'prod-q1',
    unitId: 'productivity',
    part: 'part1',
    type: 'individual_short',
    title: 'Productivity Factors in the Automotive Industry',
    question: 'Do you think the same factor could have increased productivity in the car industry? Give example.',
    vietnameseTranslation: 'Bạn có nghĩ yếu tố tương tự có thể làm tăng năng suất trong ngành sản xuất ô tô không? Cho ví dụ.',
    peelStructure: {
      point: 'Affirm strongly: Automation, robotics, and Lean manufacturing systems (Toyota Production System - TPS) revolutionized automotive productivity.',
      explanation: 'Explain how standardization and assembly line robotics reduced takt time and eliminated manufacturing defects.',
      example: 'Tesla\'s gigapress die-casting and Toyota\'s Just-In-Time assembly line.',
      link: 'Conclude that technological automation combined with continuous process refinement drives exponential output per hour.'
    },
    sampleAnswer: 'Yes, absolutely. The exact same operational factors—namely technological automation, standardization, and Lean workflow optimization—have been the primary engines of massive productivity gains in the automotive industry. Historically, Henry Ford revolutionized manufacturing productivity by pioneering the moving assembly line, which slashed chassis assembly time from twelve hours to ninety-three minutes. In the modern era, Japanese automakers like Toyota advanced this through the Toyota Production System, perfecting continuous improvement (Kaizen) and Just-in-Time inventory to eliminate operational waste. Today, companies like Tesla utilize robotic gigapress casting machines that mold massive car frames into single unified components, eliminating hundreds of individual welding steps. These examples prove that combining automated robotics with streamlined process engineering multiplies output per labor hour while drastically lowering defect rates.',
    keyVocabulary: [
      { term: 'Lean manufacturing / Kaizen', meaning: 'Sản xuất tinh gọn / Cải tiến liên tục', usage: 'A systematic methodology aimed at the continuous elimination of waste.' },
      { term: 'Output per labor hour', meaning: 'Sản lượng trên mỗi giờ lao động', usage: 'A benchmark productivity metric measuring labor efficiency.' },
      { term: 'Takt time', meaning: 'Thời gian nhịp sản xuất', usage: 'The rate at which a finished product needs to be completed to meet customer demand.' },
      { term: 'Defect rate', meaning: 'Tỷ lệ phế phẩm / lỗi', usage: 'The percentage of manufactured units that fail quality control standards.' }
    ],
    signpostingPhrases: [
      'Without question, the automotive sector is the historical benchmark for productivity innovation...',
      'A seminal historical precedent was the moving assembly line...',
      'In contemporary manufacturing, this is exemplified by robotic automation...',
      'Hence, technological leverage combined with lean flow optimizes throughput.'
    ],
    teacherFollowUps: [
      {
        question: 'What is the downside if an automated automotive assembly line experiences a single machine breakdown?',
        sampleResponse: 'In highly synchronized automated lines, a single bottleneck shuts down the entire downstream production flow, incurring astronomical downtime costs that can exceed $20,000 per minute in lost output.'
      }
    ]
  },
  {
    id: 'prod-sit1',
    unitId: 'productivity',
    part: 'part2',
    type: 'pair_situation',
    title: 'Situation 1: Automation vs Routine Jobs (Company vs Employee Perspectives)',
    question: 'A factory can improve productivity by introducing more robots, but this may reduce the number of routine jobs. Should the company automate as much as possible? Explain your opinion from both the company\'s and employee\'s perspective.',
    vietnameseTranslation: 'Tình huống 1: Tự động hóa và việc làm. Một nhà máy có thể tăng năng suất bằng cách đưa nhiều robot vào, nhưng điều này có thể làm giảm số lượng công việc thường nhật. Công ty có nên tự động hóa nhiều nhất có thể không? Giải thích quan điểm từ cả góc độ công ty và người lao động.',
    pairRoleplay: {
      partnerA: {
        role: 'Chief Technology & Financial Officer (Company Perspective)',
        stance: 'Advocates maximum automation to safeguard corporate survival, quality consistency, and long-term ROI.',
        points: ['Robots operate 24/7 without fatigue, healthcare costs, or human error.', 'Global competitors are automating; failure to do so will lead to bankruptcy and 100% job losses.', 'High upfront capital expenditure (CapEx) is recouped within 2-3 years through reduced unit labor costs.']
      },
      partnerB: {
        role: 'Labor Union Representative / HR Director (Employee Perspective)',
        stance: 'Warns against reckless displacement of blue-collar workers and social disruption.',
        points: ['Mass layoffs destroy employee morale, institutional knowledge, and local community trust.', 'Workers with decades of service cannot easily find alternative employment.', 'Demands that automation be phased in responsibly, accompanied by corporate retraining and reskilling programs.']
      },
      consensusConclusion: 'Adopt a "Responsible Automation & Upskilling" roadmap: Automate hazardous, ergonomic, and repetitive assembly bottlenecks first, while reinvesting a portion of the operational cost savings into vocational reskilling programs so displaced workers transition into robot maintenance, quality inspection, and logistics programming.'
    },
    sampleAnswer: 'This dilemma represents one of the defining challenges of modern industrial economics. To answer whether a factory should automate to the maximum extent possible, we must analyze the stark trade-offs between corporate competitiveness and labor welfare.\n\nFrom the company\'s financial perspective, aggressive automation is almost an existential necessity. Industrial robots operate 24/7 without fatigue, deliver flawless precision with near-zero defect rates, and eliminate variable payroll costs like overtime and health insurance. In highly competitive global markets, resisting automation results in higher unit costs, loss of market share, and eventual corporate bankruptcy, which would eradicate all jobs entirely. The Return on Investment (ROI) on automated cells is overwhelmingly positive.\n\nFrom the employees\' perspective, however, rapid unmitigated automation poses an acute socioeconomic crisis. Routine assembly workers face immediate structural unemployment, income loss, and obsolescence of their manual skills. \n\nTherefore, the ethical and economically optimal path is not reckless 100% automation overnight, but "collaborative human-robot automation." The company should automate repetitive, hazardous tasks, while reallocating a portion of the efficiency savings into mandatory employee reskilling programs. Displaced manual laborers can be retrained as robotic maintenance technicians, safety supervisors, and quality controllers, thereby enhancing productivity while honoring corporate social responsibility.',
    keyVocabulary: [
      { term: 'Return on Investment (ROI)', meaning: 'Tỷ suất hoàn vốn đầu tư', usage: 'Financial metric used to evaluate the efficiency of an investment.' },
      { term: 'Structural unemployment', meaning: 'Thất nghiệp cơ cấu', usage: 'Joblessness resulting from industrial reorganization and technological change.' },
      { term: 'Capital expenditure (CapEx)', meaning: 'Chi phí đầu tư tài sản cố định', usage: 'Funds used by an enterprise to acquire or upgrade physical assets like machinery.' },
      { term: 'Corporate social responsibility (CSR)', meaning: 'Trách nhiệm xã hội của doanh nghiệp', usage: 'Business model that helps a company be socially accountable to the public.' }
    ],
    signpostingPhrases: [
      'This issue requires an objective synthesis of financial viability versus social ethics...',
      'From a capital allocation and productivity standpoint,...',
      'Conversely, through the socio-labor lens,...',
      'The strategic resolution lies in phased automation paired with institutional reskilling.'
    ],
    teacherFollowUps: [
      {
        question: 'How do you account for employee severance pay versus capital investment costs in the transition budget?',
        sampleResponse: 'Accountants must model the Net Present Value (NPV): offsetting initial severance payouts and retraining expenses against cumulative long-term savings in labor overhead and accelerated depreciation tax shields.'
      }
    ]
  },
  {
    id: 'prod-sit2',
    unitId: 'productivity',
    part: 'part2',
    type: 'pair_situation',
    title: 'Situation 2: Just-in-Time (JIT) vs Safety Stock in Supply Disruptions',
    question: 'A manufacturer can reduce storage costs by using just-in-time delivery, but recent supply delays have stopped production several times. Should it continue the just-in-time delivery or keep more stock? Justify your decision.',
    vietnameseTranslation: 'Tình huống 2: Mô hình Just-in-time (giao đúng lúc) hay Hàng tồn kho an toàn (safety stock). Nhà sản xuất có thể giảm chi phí lưu kho nhờ JIT, nhưng các đợt chậm trễ nguồn cung gần đây đã khiến sản xuất bị ngừng trệ nhiều lần. Có nên tiếp tục JIT hay chuyển sang dự trữ thêm hàng tồn kho? Giải thích quyết định.',
    pairRoleplay: {
      partnerA: {
        role: 'Warehouse & Inventory Cost Controller',
        stance: 'Advocates sticking as close to Lean / JIT as possible to keep carrying costs low.',
        points: ['Holding large inventory ties up critical working capital and incurs warehousing rent, insurance, and obsolescence risks.', 'The root cause is poor supplier reliability, not the JIT philosophy itself.', 'Recommends dual-sourcing suppliers rather than stockpiling massive safety inventories.']
      },
      partnerB: {
        role: 'Plant Production Director',
        stance: 'Points out that the downtime costs of halting an entire factory dwarf the carrying cost of inventory.',
        points: ['An idle factory burns thousands of dollars an hour in unabsorbed fixed overhead and penalties for late delivery to clients.', 'Global supply chain volatility has made ultra-lean JIT dangerously fragile.', 'Demands a buffer of at least 3-4 weeks of critical components (Safety Stock).']
      },
      consensusConclusion: 'Transition from pure "Just-In-Time" to a hybrid "Just-In-Case" selective safety stock model: Maintain lean JIT for non-critical, locally available materials, but build a 2 to 3-week strategic buffer stock for high-risk, imported critical components that could cause catastrophic assembly shutdowns.'
    },
    sampleAnswer: 'In light of recurring supply chain disruptions that have halted the production line, the manufacturer should transition away from pure Just-in-Time (JIT) toward a hybrid "Just-in-Case" strategy that incorporates strategic safety stock for critical bottlenecks. \n\nWhile the theoretical appeal of JIT is indisputable—minimizing warehouse rental fees, avoiding inventory obsolescence, and reducing tied-up working capital—it functions effectively only under conditions of absolute supply certainty. When international supply chains become volatile, an empty warehouse ceases to be a cost-saving measure; instead, it becomes a severe financial liability. Every hour the factory sits idle due to a missing component, the business suffers catastrophic losses in idle worker wages, unabsorbed fixed overhead, and punitive late-delivery fees from clients. \n\nThe optimal financial solution is ABC inventory categorization: Apply lean JIT for easily sourced local parts (Class C items), but maintain a two-to-four-week safety buffer for high-value, long-lead-time critical components (Class A items). The incremental carrying cost of warehousing buffer stock is essentially an insurance premium against crippling operational shutdowns.',
    keyVocabulary: [
      { term: 'Holding / Carrying costs', meaning: 'Chi phí lưu kho / tồn trữ', usage: 'Expenses related to storing unsold goods (rent, insurance, shrinkage, capital interest).' },
      { term: 'Safety stock / Buffer stock', meaning: 'Hàng tồn kho an toàn', usage: 'Surplus inventory held to protect against unexpected supply delays or demand surges.' },
      { term: 'Working capital', meaning: 'Vốn lưu động', usage: 'Operating liquidity available to a business (Current Assets minus Current Liabilities).' },
      { term: 'Downtime cost', meaning: 'Chi phí tổn thất do ngừng máy', usage: 'Financial losses sustained when manufacturing operations are halted unexpectedly.' }
    ],
    signpostingPhrases: [
      'In managerial accounting, we must weigh carrying costs against the immense cost of stockouts...',
      'Pure JIT thrives in stable environments, but collapses under global logistical shocks...',
      'The downtime losses from a stalled assembly line far outweigh inventory storage interest...',
      'Therefore, implementing a targeted safety stock buffer provides operational resilience.'
    ],
    teacherFollowUps: [
      {
        question: 'What is the Economic Order Quantity (EOQ) formula, and how does it balance ordering vs holding costs?',
        sampleResponse: 'The EOQ model calculates the optimal order quantity that minimizes the sum of inventory carrying costs and order setup costs, mathematically finding the equilibrium point.'
      }
    ]
  },
  {
    id: 'prod-sit3',
    unitId: 'productivity',
    part: 'part2',
    type: 'pair_situation',
    title: 'Problem Solving: New Machines vs Process & Staff Coordination',
    question: 'A factory can buy new machines or improve its current process and staff coordination with a limited budget. Decide which option should come first and explain the expected effect on productivity and quality.',
    vietnameseTranslation: 'Giải quyết vấn đề: Máy móc mới hay Quy trình & Phối hợp nhân viên. Nhà máy có thể mua máy móc mới hoặc cải tiến quy trình hiện tại và phối hợp nhân viên với ngân sách hạn hẹp. Quyết định phương án nào nên làm trước và giải thích tác động kỳ vọng đến năng suất và chất lượng.',
    pairRoleplay: {
      partnerA: {
        role: 'Chief Process Engineer & Lean Consultant',
        stance: 'Prioritizes optimizing existing workflows, staff coordination, and standard operating procedures (SOPs).',
        points: ['Buying expensive machinery before fixing broken processes merely automates chaos and creates expensive bottlenecks.', 'Process improvement requires minimal capital expenditure (low CapEx)—ideal for a constrained budget.', 'Cross-training staff and removing idle transit time yields immediate 15-20% productivity gains.']
      },
      partnerB: {
        role: 'Hardware Production Supervisor',
        stance: 'Worried that aging legacy machines are the physical bottleneck limiting output and precision.',
        points: ['No amount of staff coordination can make a 20-year-old machine produce modern micro-tolerances.', 'Workers get frustrated when machinery constantly breaks down.', 'Suggests leasing or purchasing one critical upgraded machine rather than an overhaul.']
      },
      consensusConclusion: 'Execute Process Optimization FIRST, followed by targeted machinery upgrades: Fix workflow bottlenecks, implement 5S and standard operating procedures to extract maximum efficiency from existing assets. Then, use the cost savings generated from the improved workflow to finance high-precision replacement machines.'
    },
    sampleAnswer: 'Given a severely limited budget, the factory must unequivocally prioritize improving its current processes and staff coordination before expending capital on new machinery. In industrial management, there is a fundamental maxim: "If you automate an inefficient process, you simply end up with an expensive, automated inefficiency."\n\nFirst, process optimization—such as implementing Lean 5S practices, eliminating redundant movement, balancing assembly line workloads, and establishing rigorous Standard Operating Procedures (SOPs)—requires minimal capital outlay. It primarily involves organizational discipline, training, and cross-functional coordination. By standardizing workflows and training operators to eliminate idling time, factories routinely unlock a 15 to 25 percent productivity surge using their existing asset base. Furthermore, clearer communication and quality-at-the-source inspections immediately reduce scrap and defect rates.\n\nOnce the workflow has been stripped of waste and stabilized, management can accurately identify the genuine mechanical bottlenecks. The incremental cash flow generated by the optimized process can then be reinvested into purchasing modern, targeted machinery with high certainty of return. Optimizing human capital and processes first is the hallmark of prudent financial and operations management.',
    keyVocabulary: [
      { term: 'Standard Operating Procedures (SOPs)', meaning: 'Quy trình thao tác chuẩn', usage: 'Step-by-step instructions compiled to help workers carry out complex routine operations.' },
      { term: 'Line balancing', meaning: 'Cân bằng chuyền sản xuất', usage: 'Evenly distributing workloads across workstations to prevent bottlenecks.' },
      { term: 'Scrap and rework rate', meaning: 'Tỷ lệ phế phẩm và làm lại', usage: 'The cost and volume of defective output that must be discarded or repaired.' },
      { term: 'Capital efficiency', meaning: 'Hiệu quả sử dụng vốn', usage: 'Generating maximum revenue and productivity per dollar of invested capital.' }
    ],
    signpostingPhrases: [
      'Under tight capital rationing, capital efficiency must dictate our sequence of actions...',
      'Automating an uncalibrated process merely accelerates the production of defects...',
      'Workflow harmonization yields high ROI with negligible capital expenditure...',
      'Thus, refining processes first generates the liquidity required for future equipment upgrades.'
    ],
    teacherFollowUps: [
      {
        question: 'What is the "OEE" (Overall Equipment Effectiveness) metric, and how does it diagnose machine vs process problems?',
        sampleResponse: 'OEE measures the percentage of manufacturing time that is truly productive by multiplying Availability, Performance, and Quality rates, clearly pinpointing whether downtime stems from operator delays or mechanical failure.'
      }
    ]
  },
  {
    id: 'prod-pres',
    unitId: 'productivity',
    part: 'part1',
    type: 'presentation',
    title: 'Presentation (2-3 mins): A Productivity Problem, Solutions & Measurement',
    question: 'Give a 2-3 minute presentation on one productivity problem and propose two practical solutions. Include at least one way to measure whether the solutions work.',
    vietnameseTranslation: 'Thuyết trình (2-3 phút): Thuyết trình về một vấn đề năng suất và đề xuất hai giải pháp thực tế. Bao gồm ít nhất một cách để đo lường xem các giải pháp có hiệu quả hay không.',
    peelStructure: {
      point: 'Problem Identification: High employee multitasking and disjointed communication causing severe project delivery bottlenecks in a financial accounting firm.',
      explanation: 'Root Cause: Fragmented task switching, endless email chains, and undefined project milestones draining 30% of billable hours.',
      example: 'Two Solutions: Solution 1 (Kanban/Agile project management system with daily standups) & Solution 2 (Focus blocks / No-meeting morning deep-work policy).',
      link: 'Measurement Metrics: Measure billable hour realization rate, average project turnaround cycle time, and milestone completion variance.'
    },
    sampleAnswer: 'Good morning, teacher. In today\'s presentation, I will examine a critical productivity bottleneck prevalent across professional accounting and audit firms: chronic project delays caused by fragmented multitasking and communication overload, followed by two practical operational solutions and rigorous measurement metrics.\n\nIn many financial service practices, accountants and analysts struggle with context switching—juggling client emails, tax filings, internal audit spreadsheets, and spontaneous meetings simultaneously. Research by the American Psychological Association reveals that cognitive multitasking can consume up to 40% of an individual\'s productive cognitive capacity. The result is delayed deliverables, overworked staff, and costly errors in ledger reconciliation.\n\nTo remediate this productivity drain, I propose two practical interventions. First, the organization should implement an Agile Kanban workflow system—using digital project boards like Asana or Jira—paired with strict 15-minute daily standup meetings. This visualizes workflow stages, establishes explicit work-in-progress (WIP) limits, and prevents staff from taking on new files until existing audits are completed.\n\nThe second solution is establishing a firm-wide "Deep Work Time Blocking" protocol. Management should designate mornings between 9:00 AM and 11:30 AM as sacred focus hours—banning non-urgent internal emails and meetings. This empowers financial analysts to tackle complex financial modeling and statutory reporting without cognitive disruption.\n\nFinally, to evaluate whether these solutions succeed, the firm must monitor two empirical Key Performance Indicators (KPIs): First, Cycle Time—measuring the average business days required to finalize an audit from initiation to client sign-off. If our interventions work, cycle time should decrease by 20%. Second, the Billable Hour Realization Rate—tracking the percentage of worked hours successfully billed to clients versus administrative overhead waste.\n\nIn conclusion, by curbing communication fragmentation through Kanban boards and protecting deep-work hours, professional firms can dramatically boost operational throughput while maintaining audit precision. Thank you for listening.',
    keyVocabulary: [
      { term: 'Context switching', meaning: 'Chuyển đổi ngữ cảnh công việc', usage: 'The cognitive cost of shifting focus between unrelated tasks.' },
      { term: 'Work-In-Progress (WIP) limits', meaning: 'Giới hạn công việc đang thực hiện', usage: 'Restricting unfinished tasks to prevent bottlenecks and prioritize completion.' },
      { term: 'Billable hour realization rate', meaning: 'Tỷ lệ ghi nhận giờ làm việc tính tiền', usage: 'Percentage of billable time converted into invoiced client fees.' },
      { term: 'Cycle time', meaning: 'Thời gian chu kỳ hoàn thành', usage: 'The total time elapsed from the beginning of a process to its completion.' }
    ],
    signpostingPhrases: [
      'I would like to direct your attention to an acute productivity bottleneck...',
      'The underlying root cause is cognitive multitasking and fragmented workflows...',
      'To address this deficit, I propose two concrete structural remedies...',
      'Crucially, the efficacy of these initiatives will be tracked through two empirical KPIs...',
      'To summarize, operational discipline directly enhances financial throughput.'
    ],
    teacherFollowUps: [
      {
        question: 'What is the danger of setting overly aggressive productivity KPIs for an audit team?',
        sampleResponse: 'Excessive speed targets can incentivize accountants to cut corners in sample testing and due diligence, increasing the risk of material accounting misstatements and legal liabilities.'
      }
    ]
  },

  // ================= UNIT 5: MOTIVATION =================
  {
    id: 'mot-q1',
    unitId: 'motivation',
    part: 'part1',
    type: 'individual_short',
    title: 'Ideal Working Environment',
    question: 'Describe the working environment that you\'d like to work in.',
    vietnameseTranslation: 'Miêu tả môi trường làm việc mà bạn mong muốn được làm việc trong đó.',
    peelStructure: {
      point: 'State clearly: A transparent, meritocratic, and psychologically safe environment that balances professional autonomy with supportive teamwork.',
      explanation: 'Explain why transparency in communication and performance incentives fosters innovation and trust.',
      example: 'Hybrid working flexibility, ergonomic workspaces, and clear promotion pathways based on quantitative output rather than office politics.',
      link: 'Conclude that such an environment maximizes both personal well-being and long-term productivity.'
    },
    sampleAnswer: 'As an aspiring finance and accounting professional, my ideal working environment is built upon three pillars: psychological safety, professional autonomy, and meritocratic transparency. I thrive in an organization where open communication is championed—where junior staff can respectfully question financial models or propose process innovations without fear of harsh recrimination. Furthermore, I value a modern hybrid workplace that offers flexibility while providing an ergonomic, well-resourced office with quiet zones for deep financial analysis and collaborative hubs for cross-departmental strategy meetings. Most importantly, I seek a transparent corporate culture where performance appraisals, bonuses, and career advancement are dictated by measurable achievements and analytical precision, rather than seniority or office politics. This environment fosters genuine commitment and sustained high performance.',
    keyVocabulary: [
      { term: 'Psychological safety', meaning: 'Sự an toàn tâm lý', usage: 'Belief that one will not be punished or humiliated for speaking up with ideas or questions.' },
      { term: 'Meritocratic culture', meaning: 'Văn hóa trọng nhân tài / dựa trên năng lực', usage: 'A system where advancement is based purely on individual ability and achievement.' },
      { term: 'Professional autonomy', meaning: 'Sự tự chủ trong công việc', usage: 'The freedom and discretion to decide how to perform one\'s responsibilities.' },
      { term: 'Hybrid workplace', meaning: 'Nơi làm việc kết hợp (văn phòng & từ xa)', usage: 'A flexible work model supporting a mix of in-office and remote work.' }
    ],
    signpostingPhrases: [
      'My ideal professional environment is anchored in three essential attributes...',
      'First and foremost is an atmosphere of psychological safety...',
      'In addition, I place a premium on functional autonomy and flexibility...',
      'In conclusion, such an ecosystem aligns personal fulfillment with organizational excellence.'
    ],
    teacherFollowUps: [
      {
        question: 'How does psychological safety directly impact error reporting in financial accounting?',
        sampleResponse: 'In accounting, if employees fear punishment, they conceal ledger errors, leading to compounded financial misstatements; psychological safety encourages immediate disclosure and prompt reconciliation.'
      }
    ]
  },
  {
    id: 'mot-q2',
    unitId: 'motivation',
    part: 'part1',
    type: 'individual_short',
    title: 'Personal Motivational Drivers',
    question: 'What motivates you to work harder?',
    vietnameseTranslation: 'Điều gì thúc đẩy bạn làm việc chăm chỉ hơn?',
    peelStructure: {
      point: 'Present a balanced combination: Intrinsic mastery/intellectual challenge combined with fair extrinsic compensation and career progression.',
      explanation: 'Explain how mastering complex financial problems provides deep satisfaction, while competitive rewards validate effort.',
      example: 'Solving a difficult financial modeling puzzle or earning recognition from senior leadership for an insightful cost-saving audit.',
      link: 'Show that internal passion paired with external appreciation creates enduring professional drive.'
    },
    sampleAnswer: 'What motivates me to exert my utmost effort is a symbiotic interplay between intrinsic intellectual growth and tangible extrinsic recognition. On an intrinsic level, I am deeply driven by the pursuit of mastery—tackling complex financial datasets, identifying hidden accounting discrepancies, and transforming raw numbers into strategic corporate insights. Experiencing that breakthrough moment when a complex problem is solved brings profound personal gratification. Extrinsically, however, dedication must be validated. I am motivated when an organization operates a fair reward architecture: recognizing contributions through competitive performance bonuses, clear promotional roadmaps, and public acknowledgment from senior executives. When I know that my diligence directly drives corporate success and advances my career trajectory, my drive becomes limitless.',
    keyVocabulary: [
      { term: 'Intrinsic motivation', meaning: 'Động lực nội tại (từ bên trong)', usage: 'Doing an activity for its inherent satisfaction rather than for some separable consequence.' },
      { term: 'Extrinsic recognition', meaning: 'Sự công nhận bên ngoài', usage: 'External incentives such as compensation, awards, promotions, and praise.' },
      { term: 'Pursuit of mastery', meaning: 'Mưu cầu sự thành thạo đỉnh cao', usage: 'The desire to continuously improve skills and professional competence.' },
      { term: 'Career trajectory', meaning: 'Lộ trình phát triển sự nghiệp', usage: 'The progression and growth of one\'s professional life over time.' }
    ],
    signpostingPhrases: [
      'My professional drive stems from a synergy of two distinct forces...',
      'Internally, I am energized by cognitive challenges and skill mastery...',
      'From an external viewpoint, tangible recognition acts as a catalyst...',
      'Ultimately, this combination fuels long-term resilience and excellence.'
    ],
    teacherFollowUps: [
      {
        question: 'If you are forced to choose between a substantial salary raise and an exciting learning opportunity, which would you pick?',
        sampleResponse: 'At this early stage of my professional development, I would prioritize the steep learning curve, because acquiring specialized high-value skills expands my human capital and future earning potential exponentially.'
      }
    ]
  },
  {
    id: 'mot-q3',
    unitId: 'motivation',
    part: 'part1',
    type: 'individual_short',
    title: 'Impact of Creative Office Design on Motivation',
    question: 'Would a creative office design make employees more motivated? Why or why not?',
    vietnameseTranslation: 'Liệu một thiết kế văn phòng sáng tạo có làm cho nhân viên có động lực hơn không? Tại sao có hoặc tại sao không?',
    peelStructure: {
      point: 'State a nuanced view: Creative design is a "hygiene factor" (Herzberg) that boosts comfort and collaboration, but cannot substitute for fair pay, autonomy, and respectful leadership.',
      explanation: 'Explain Herzberg\'s Two-Factor Theory: Physical environments prevent dissatisfaction but do not create lasting intrinsic motivation alone.',
      example: 'Google-style ping-pong tables and beanbags fail if workers are underpaid, micromanaged, or face toxic cultures.',
      link: 'Conclude that aesthetic workspace design must be supported by sound management practices.'
    },
    sampleAnswer: 'A creative office design certainly enhances comfort and facilitates cross-functional collaboration, but it is insufficient on its own to generate enduring employee motivation. In organizational psychology, this is perfectly elucidated by Frederick Herzberg\'s Two-Factor Theory. Workspace aesthetics, ergonomic furniture, and trendy recreational amenities act as "hygiene factors." Providing natural sunlight, quiet focus booths, and collaborative lounges prevents physical fatigue and workplace dissatisfaction. For example, a well-ventilated, aesthetically pleasing office undeniably makes people happier to commute. However, ping-pong tables and free gourmet coffee can never compensate for true "motivators"—such as competitive salaries, fair promotional ladders, intellectual autonomy, and empathetic leadership. If a company suffers from a toxic micromanagement culture and stagnant wages, a creative office quickly feels superficial and even cynical to employees.',
    keyVocabulary: [
      { term: 'Herzberg\'s Two-Factor Theory', meaning: 'Thuyết hai nhân tố của Herzberg', usage: 'Differentiates between Hygiene factors (prevent dissatisfaction) and Motivators (drive performance).' },
      { term: 'Hygiene factors', meaning: 'Nhân tố duy trì / vệ sinh', usage: 'Work conditions (salary, physical office, security) that do not motivate on their own but prevent discontent.' },
      { term: 'Cross-functional collaboration', meaning: 'Hợp tác liên phòng ban', usage: 'Groups of employees with different functional expertise working together.' },
      { term: 'Superficial perks', meaning: 'Đãi ngộ bề nổi', usage: 'Gimmicky workplace benefits that fail to address deeper employee needs.' }
    ],
    signpostingPhrases: [
      'To critically address this question, we must draw upon Herzberg\'s classic framework...',
      'A creative workspace undeniably fulfills an essential hygiene function...',
      'Nevertheless, physical architecture cannot substitute for fundamental human motivators...',
      'To conclude, office aesthetics serve as a valuable catalyst only when backed by sound leadership.'
    ],
    teacherFollowUps: [
      {
        question: 'What is the downside of trendy "open-plan" office designs for financial accounting teams?',
        sampleResponse: 'Open-plan offices generate constant ambient noise and visual distractions, which significantly elevate cognitive fatigue and increase error rates in precise audit and numerical calculations.'
      }
    ]
  },
  {
    id: 'mot-sit1',
    unitId: 'motivation',
    part: 'part2',
    type: 'pair_situation',
    title: 'Situation 1: Money or Meaning? (Job A vs Job B)',
    question: 'You have two job offers. Job A pays 20% more but involves repetitive work and limited promotion. Job B pays less but offers training, interesting projects, and a supportive manager. Which would you choose and why?',
    vietnameseTranslation: 'Tình huống 1: Tiền bạc hay Ý nghĩa? Bạn có 2 lời mời làm việc. Công việc A trả lương cao hơn 20% nhưng công việc lặp đi lặp lại và cơ hội thăng tiến hạn hẹp. Công việc B lương thấp hơn nhưng có đào tạo bài bản, dự án thú vị và sếp hỗ trợ tốt. Bạn chọn việc nào và tại sao?',
    pairRoleplay: {
      partnerA: {
        role: 'Early-Career Long-Term Investor (Advocates Job B)',
        stance: 'Chooses Job B because skill acquisition and mentorship compound in value far faster than a 20% starting salary premium.',
        points: ['In the first 3-5 years of a finance career, human capital growth is the most valuable asset.', 'A supportive manager and high-impact projects build an impressive portfolio and network.', 'Repetitive work in Job A risks skill atrophy and automation obsolescence.']
      },
      partnerB: {
        role: 'Pragmatic Financial Realist (Plays Devil\'s Advocate for Job A)',
        stance: 'Considers Job A because a 20% pay gap is mathematically substantial in current inflationary times.',
        points: ['20% extra income provides immediate financial security, ability to pay off student loans, or invest.', 'Higher base salary anchors future compensation negotiations at the next company.', 'However, concedes that career stagnation after 2 years would hurt long-term earning power.']
      },
      consensusConclusion: 'Select Job B with conviction: Treat the 20% pay differential as an investment in professional human capital. The mentorship, specialized training, and high-visibility projects in Job B will propel career velocity, ultimately unlocking senior roles that pay far more than Job A within three years.'
    },
    sampleAnswer: 'Without hesitation, I would choose Job B. From a financial and human capital perspective, treating career decisions purely through the prism of a 20 percent starting salary premium is short-sighted. \n\nLet us evaluate the long-term Return on Investment: In Job A, the work is monotonous, repetitive, and offers negligible promotional prospects. In accounting and finance, repetitive data-entry and routine processing jobs are prime targets for automated software and AI displacement. Staying in Job A would cause professional skill atrophy, anchoring me in a dead-end position with diminishing market value. \n\nConversely, Job B offers high-impact projects, structured vocational training, and above all, a supportive manager. In corporate development, having an exceptional mentor is invaluable—they advocate for your advancement, impart tacit industry wisdom, and entrust you with challenging responsibilities. The human capital and specialized competencies acquired in Job B will dramatically accelerate my career velocity. Within three to five years, the skills gained in Job B will enable me to command senior managerial salaries that far exceed the modest starting advantage of Job A.',
    keyVocabulary: [
      { term: 'Human capital development', meaning: 'Phát triển vốn con người', usage: 'The skills, knowledge, and experience possessed by an individual, viewed in terms of economic value.' },
      { term: 'Career velocity', meaning: 'Tốc độ thăng tiến sự nghiệp', usage: 'The speed and direction with which an employee progresses up the corporate ladder.' },
      { term: 'Skill atrophy', meaning: 'Sự thui chột kỹ năng', usage: 'The gradual loss of professional abilities through lack of practice or repetitive work.' },
      { term: 'Compounding returns', meaning: 'Lợi nhuận kép', usage: 'Growth generating further growth over a prolonged horizon.' }
    ],
    signpostingPhrases: [
      'When framing this decision as an investment in human capital,...',
      'The nominal 20% premium in Job A masks a grave hidden hazard: skill stagnation...',
      'In sharp contrast, Job B provides high-yield career compounding...',
      'Therefore, sacrificing short-term cash for long-term career velocity is the rational choice.'
    ],
    teacherFollowUps: [
      {
        question: 'Under what personal financial circumstances would a candidate be compelled to choose Job A?',
        sampleResponse: 'A candidate might rationally pick Job A if they have urgent immediate liabilities, such as pressing family healthcare debt or student loans requiring immediate liquidity.'
      }
    ]
  },
  {
    id: 'mot-sit2',
    unitId: 'motivation',
    part: 'part2',
    type: 'pair_situation',
    title: 'Problem Solving: Motivating a Demoralized Team on a Limited Budget',
    question: 'You must motivate a team whose performance has fallen. You have a limited budget. You can introduce more bonuses, flexible working hours, more training, public recognition, or more challenging projects. Choose the two most effective measures and defend your choice.',
    vietnameseTranslation: 'Giải quyết vấn đề: Thúc đẩy một nhóm có hiệu suất giảm sút với ngân sách eo hẹp. Bạn có thể áp dụng: thêm tiền thưởng, giờ làm việc linh hoạt, đào tạo thêm, công nhận trước tập thể, hoặc dự án thách thức hơn. Chọn 2 biện pháp hiệu quả nhất và bảo vệ sự lựa chọn.',
    pairRoleplay: {
      partnerA: {
        role: 'Operations & People Manager',
        stance: 'Advocates Flexible Working Hours and Structured Training.',
        points: ['Bonuses are impossible with a strictly limited budget (small token bonuses backfire).', 'Flexible working hours costs $0 but delivers immense psychological relief and work-life balance.', 'More training addresses the root cause of performance dips—if staff lack skills or feel overwhelmed, training builds capability.']
      },
      partnerB: {
        role: 'Leadership & Team Dynamics Coach',
        stance: 'Advocates Flexible Working Hours paired with Public Recognition.',
        points: ['Challenging projects right now will burn out a team whose performance is already falling.', 'Public recognition costs nothing financially but deeply satisfies human esteem needs (Maslow).', 'However, agrees that if poor performance is due to competence gaps, targeted peer-led training is extremely effective.']
      },
      consensusConclusion: 'Select Flexible Working Hours and More Training as the two most potent interventions: Flexible hours immediately eliminates burnout and builds trust at zero capital cost, while targeted upskilling cures the root cause of declining performance, revitalizing team confidence and productivity.'
    },
    sampleAnswer: 'Operating under severe capital constraints, we must strategically eliminate options that either consume cash or exacerbate team fatigue. Introducing bonuses is fiscally impossible with a tight budget, and offering trivial token amounts would only breed cynicism. Furthermore, assigning "more challenging projects" to a demoralized team would induce severe burnout. Therefore, the two most effective, high-leverage measures are: Flexible Working Hours and Targeted Training.\n\nFirst, introducing flexible working hours is a transformative zero-cost motivator. When team performance declines, chronic exhaustion and rigid micromanagement are frequently the primary culprits. Granting schedule flexibility and remote autonomy conveys profound trust, restores work-life balance, and alleviates commuter stress. Employees with autonomy over their time consistently demonstrate higher focus and organizational commitment.\n\nSecond, investing in structured training directly targets the root operational cause of declining performance. Performance often slumps not because employees are lazy, but because they feel ill-equipped to handle evolving workflows or complex software. Providing practical, collaborative training upskills the team, restores self-efficacy, and signals that management is investing in their personal professional future. \n\nCombined, flexible hours relieves psychological pressure, while training rebuilds technical competence, producing a sustainable rebound in productivity without straining corporate finances.',
    keyVocabulary: [
      { term: 'High-leverage intervention', meaning: 'Biện pháp đòn bẩy cao', usage: 'Actions that produce disproportionately large positive results with minimal resources.' },
      { term: 'Self-efficacy', meaning: 'Niềm tin vào năng lực bản thân', usage: 'An individual\'s belief in their capacity to execute behaviors necessary to produce specific performance attainments.' },
      { term: 'Zero-cost motivator', meaning: 'Yếu tố tạo động lực không tốn chi phí', usage: 'Non-monetary perks that significantly boost morale without budgetary expenditure.' },
      { term: 'Burnout mitigation', meaning: 'Giảm thiểu tình trạng kiệt sức', usage: 'Strategies designed to relieve chronic workplace stress and exhaustion.' }
    ],
    signpostingPhrases: [
      'Under rigorous budgetary rationing, we must deploy high-leverage, non-monetary levers...',
      'Cash bonuses must be eliminated due to financial constraints and diminishing marginal utility...',
      'Our first non-negotiable measure is flexible working hours, which restores autonomy...',
      'Our second complementary pillar is targeted vocational training to address skill deficits...',
      'Together, these initiatives restore morale and capability simultaneously.'
    ],
    teacherFollowUps: [
      {
        question: 'Why can "public recognition" sometimes backfire if implemented carelessly?',
        sampleResponse: 'If public recognition is perceived as favoritism or awards superficial cheerleading while ignoring underlying operational workload issues, it breeds deep cynicism and resentment among quiet high-performers.'
      }
    ]
  },
  {
    id: 'mot-pres',
    unitId: 'motivation',
    part: 'part1',
    type: 'presentation',
    title: 'Presentation (2-3 mins): Three Motivational Factors & Individual Differences',
    question: 'Give a 2-3 minute presentation on three factors that can motivate employees. Explain why the same factor may not work equally well for everyone.',
    vietnameseTranslation: 'Thuyết trình (2-3 phút): Thuyết trình về ba yếu tố có thể tạo động lực cho nhân viên. Giải thích tại sao cùng một yếu tố lại không phát huy hiệu quả như nhau đối với tất cả mọi người.',
    peelStructure: {
      point: 'Introduction: Motivation is heterogeneous. Present three distinct drivers: Financial Compensation, Autonomy/Flexibility, and Purpose/Mastery.',
      explanation: 'Analyze each factor\'s psychological mechanism: Money satisfies physiological/security needs; autonomy satisfies self-determination; purpose satisfies self-actualization.',
      example: 'Individual Discrepancy: Contrast a young breadwinner with student debt (money-driven) vs a mid-career parent seeking work-life balance (flexibility-driven) vs a senior specialist seeking intellectual challenge.',
      link: 'Conclusion: Modern leadership requires personalized, flexible incentive design rather than a one-size-fits-all approach.'
    },
    sampleAnswer: 'Good morning, teacher. In human resource management and organizational leadership, one immutable principle stands out: motivation is deeply heterogeneous. What ignites passion in one individual may leave another completely indifferent. Today, I will present on three pivotal motivational factors and explain why their effectiveness diverges dramatically across different individuals.\n\nThe first factor is direct financial compensation and performance bonuses. Money is the classic extrinsic reward. It satisfies fundamental physiological and security needs, providing purchasing power, social mobility, and tangible validation of effort. \n\nThe second factor is autonomy and schedule flexibility. Derived from Self-Determination Theory, human beings possess an innate desire to exercise control over their work methods, environment, and hours. Autonomy fosters ownership, accountability, and psychological well-being.\n\nThe third factor is purpose and career mastery—the intrinsic desire to engage in intellectually stimulating work that aligns with personal values and creates a broader positive impact.\n\nNow, why does the identical factor fail to motivate everyone equally? The answer lies in Maslow’s hierarchy of needs and differing life stages. \n\nFor instance, consider financial incentives. For a recent graduate burdened with student loans or a young breadwinner supporting a family, monetary bonuses represent an urgent lifeline and the single most powerful motivator. However, for an affluent mid-career executive whose basic financial needs are thoroughly secured, additional cash offers diminishing marginal utility; they will gladly trade a pay hike for flexible working hours to be present for their young children.\n\nSimilarly, providing a challenging, high-autonomy project will energize an ambitious, highly competent senior analyst, yet it may induce paralyzing anxiety and stress in an inexperienced junior employee who craves clear, structured supervision.\n\nIn conclusion, effective management cannot rely on a naive, one-size-fits-all incentive scheme. Leaders must diagnose individual priorities, life stages, and psychological drivers, engineering a tailored portfolio of financial and non-financial rewards to inspire optimal performance across diverse teams. Thank you.',
    keyVocabulary: [
      { term: 'Heterogeneous motivation', meaning: 'Động lực mang tính đa dạng / không đồng nhất', usage: 'The concept that individuals are driven by fundamentally different needs and desires.' },
      { term: 'Diminishing marginal utility', meaning: 'Lợi ích cận biên giảm dần', usage: 'The decline in satisfaction or value derived from consuming each additional unit of a good or reward.' },
      { term: 'Self-Determination Theory', meaning: 'Thuyết tự quyết', usage: 'Psychological framework focusing on autonomy, competence, and relatedness as core drivers.' },
      { term: 'One-size-fits-all approach', meaning: 'Cách tiếp cận cào bằng / áp dụng khuôn mẫu', usage: 'Applying a single generic policy to diverse individuals without adaptation.' }
    ],
    signpostingPhrases: [
      'Motivation cannot be approached as a monolithic concept...',
      'To begin, I will delineate three primary motivational drivers...',
      'The crucial question is why these levers generate divergent outcomes...',
      'Examining this through Maslow’s hierarchy reveals clear life-stage disparities...',
      'To conclude, agile leadership demands personalized incentive architecture.'
    ],
    teacherFollowUps: [
      {
        question: 'How can a company design a "cafeteria-style" benefits package to accommodate these individual differences?',
        sampleResponse: 'A cafeteria-style benefits system allocates each employee a flexible benefits budget, allowing individuals to customize their allocation between extra cash bonuses, additional paid vacation days, health insurance tiers, or tuition subsidies.'
      }
    ]
  }
];

// Mẫu câu hữu ích cho phần Nói Cặp (Pair Speaking)
export const PAIR_SPEAKING_PHRASES = {
  proposing: [
    'From a financial perspective, I would propose that we...',
    'Looking at the cost-benefit analysis, my recommendation is to...',
    'If we consider the bottom-line impact, our best course of action is...'
  ],
  agreeing: [
    'I completely concur with your financial rationale on that point.',
    'You make a very valid point regarding the profit margin implications.',
    'I agree; that approach significantly mitigates our downside risk.'
  ],
  politelyDisagreeing: [
    'While I understand your point regarding brand equity, I am concerned about the cash flow risk.',
    'I see where you are coming from; however, from an accounting viewpoint, the upfront capital cost is too steep.',
    'That is a compelling argument, but what if customer price elasticity is higher than we anticipate?'
  ],
  reachingConsensus: [
    'Could we reach a strategic compromise where we...?',
    'Shall we agree on option B with the condition that we review the metrics in six months?',
    'It seems we both align on prioritizing long-term customer retention over short-term savings.'
  ]
};
