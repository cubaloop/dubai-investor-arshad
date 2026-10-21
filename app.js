// Dubai Ultra-Luxury Investment Advisory - Unified Simulator for Mr. Arshad
document.addEventListener('DOMContentLoaded', () => {
  // Global State
  const state = {
    currency: 'AED', // 'AED' or 'USD'
    usdRate: 3.6725,
    selectedYear: 2028,
    activeTab: 'allegro'
  };

  // Theme Management (Light-First default)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const rootHtml = document.documentElement;

  // Initialize theme from storage or default to Light
  const savedTheme = localStorage.getItem('arshad_theme') || 'light';
  if (savedTheme === 'dark') {
    rootHtml.classList.add('theme-dark');
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
  } else {
    rootHtml.classList.remove('theme-dark');
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = rootHtml.classList.toggle('theme-dark');
      localStorage.setItem('arshad_theme', isDark ? 'dark' : 'light');
      if (themeIcon) {
        themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
        lucide.createIcons();
      }
    });
  }

  // Currency Formatter
  function formatMoney(amountAED, includeSymbol = true) {
    let val = amountAED;
    let symbol = 'AED ';
    if (state.currency === 'USD') {
      val = amountAED / state.usdRate;
      symbol = '$';
    }
    
    let formatted = Math.round(val).toLocaleString('en-US');
    return includeSymbol ? `${symbol}${formatted}` : formatted;
  }

  // Milestones per Year
  const yearMilestones = {
    2026: {
      tag: 'Off-Plan Entry & Capital Allocation Phase (2026)',
      desc: 'Lock in launch pricing for 2BR assets. Lowest capital outlay with initial booking deposits across Dubai Islands, Dubailand, Maritime City, and Meydan.'
    },
    2027: {
      tag: 'Infrastructure Consolidation & Superstructure Rise (2027)',
      desc: 'Nakheel advances Dubai Islands bridge networks & marinas. Danube DMC tower and Binghatti City reach intermediate construction milestones. KORE prepares for completion.'
    },
    2028: {
      tag: 'Handover Delivery & Initial Rental Cash Flow Window (2028)',
      desc: 'Allegro Park keys handed over (50/50 plan enters 3-year rental harvest). KORE operates at 8.5%-9.5% net yield with biohacking corporate tenancy. Resale flip threshold unlocked.'
    },
    2029: {
      tag: 'Danube DMC 30/70 Handover & Peak Capital Capture (2029)',
      desc: 'Danube SRK delivers in Dec 2029: 100% waterfront appreciation captured while having deployed only 30% cash. Mercedes-Benz Places reaches peak branded asset liquidity.'
    },
    2030: {
      tag: 'Allegro Park Year-3 Exit Arbitrage & Portfolio Maturity (2030)',
      desc: 'Allegro Park completes 3-year post-handover period: AED 540K accumulated rent + AED 1.4M capital gain realized (>160% ROE) prior to final developer settlement.'
    }
  };

  // 4 Developments Financial & Simulation Models (2BR Units)
  const properties = {
    allegro: {
      id: 'allegro',
      name: 'Allegro Park',
      developer: 'Mill Hill Properties & McCone',
      location: 'Dubai Islands (Island A)',
      type: '2BR with Private Balcony Plunge Pool',
      sizeSqFt: 1250,
      basePriceAED: 2400000,
      paymentPlan: '50/50 3-Year Post-Handover',
      targetMetric: '> 160% Return on Equity (ROE)',
      coreAdvantage: 'Exit at Year 3 with only 50% capital deployed; 100% appreciation & rental harvested.',
      yearlyValuations: {
        2026: 2400000,
        2027: 2750000,
        2028: 3100000, // Handover
        2029: 3450000,
        2030: 3800000  // Exit Value
      },
      // Capital invested by Arshad (50% = 1.2M until handover, then rental covers remaining)
      equityDeployed: {
        2026: 480000,  // 20%
        2027: 840000,  // 35%
        2028: 1200000, // 50% at handover
        2029: 1200000, // 50%
        2030: 1200000  // 50% out of pocket
      },
      cumulativeRent: {
        2026: 0,
        2027: 0,
        2028: 180000, // Year 1 Rent
        2029: 360000, // Year 2 Rent
        2030: 540000  // Year 3 Rent
      }
    },
    kore: {
      id: 'kore',
      name: 'KORE by Imtiaz',
      developer: 'Imtiaz Developments',
      location: 'Dubailand (DLRC Hub)',
      type: '2BR Fully Furnished & Equipped Designer Suite',
      sizeSqFt: 1150,
      basePriceAED: 1800000,
      paymentPlan: 'Standard 60/40 Construction Linked',
      targetMetric: '8.5% – 9.5% Net Rental Yield',
      coreAdvantage: 'High recurring cash flow driven by niche wellness & corporate biohacking amenities.',
      yearlyValuations: {
        2026: 1800000,
        2027: 2070000, // +15% step-up fully furnished
        2028: 2250000,
        2029: 2420000,
        2030: 2600000
      },
      equityDeployed: {
        2026: 540000,  // 30%
        2027: 1080000, // 60%
        2028: 1800000, // 100% full handover
        2029: 1800000,
        2030: 1800000
      },
      cumulativeRent: {
        2026: 0,
        2027: 162000, // Early operations
        2028: 324000,
        2029: 486000,
        2030: 648000
      }
    },
    danube: {
      id: 'danube',
      name: 'Danube SRK Residences',
      developer: 'Danube Properties & Shah Rukh Khan',
      location: 'Dubai Maritime City (Waterfront)',
      type: 'Flex Plus 2 BHK Premium (Panoramic Sea View)',
      sizeSqFt: 1380,
      basePriceAED: 4250000,
      paymentPlan: '30/70 (Only 30% Pre-Handover)',
      targetMetric: '> 140% ROE via 30% Capital Deferral',
      coreAdvantage: 'Only 30% deployed across 4 years (AED 1.275M) until Dec 2029 keys; 70% deferred.',
      yearlyValuations: {
        2026: 4250000,
        2027: 4675000,
        2028: 5185000,
        2029: 5800000, // Dec 2029 Handover
        2030: 6250000
      },
      equityDeployed: {
        2026: 850000,  // 20% (10% + 10%)
        2027: 1062500, // 25% (+5% month 10)
        2028: 1275000, // 30% (+5% month 18)
        2029: 1275000, // 30% prior to Dec keys
        2030: 4250000  // 100% post-handover/mortgage
      },
      cumulativeRent: {
        2026: 0,
        2027: 0,
        2028: 0,
        2029: 0,
        2030: 380000 // Year 1 operations
      }
    },
    binghatti: {
      id: 'binghatti',
      name: 'Mercedes-Benz Places',
      developer: 'Binghatti Holding & Mercedes-Benz',
      location: 'Downtown / Meydan Masterplan',
      type: 'Vision Iconic / Maybach 2-Bedroom Luxury Suite',
      sizeSqFt: 1450,
      basePriceAED: 4100000,
      paymentPlan: '70/30 Construction Linked',
      targetMetric: '7.5% - 8.5% Branded Rental & Global Liquidity',
      coreAdvantage: 'First automotive branded master city; global trophy asset with unmatched brand equity.',
      yearlyValuations: {
        2026: 4100000,
        2027: 4550000,
        2028: 5050000,
        2029: 5500000,
        2030: 5950000
      },
      equityDeployed: {
        2026: 820000,  // 20%
        2027: 1845000, // 45%
        2028: 2870000, // 70%
        2029: 4100000, // 100% Handover
        2030: 4100000
      },
      cumulativeRent: {
        2026: 0,
        2027: 0,
        2028: 0,
        2029: 310000,
        2030: 640000
      }
    }
  };

  // Update Simulator Display
  function updateSimulator() {
    const year = state.selectedYear;
    
    // Update year buttons & label
    document.querySelectorAll('.year-btn').forEach(btn => {
      const bYear = parseInt(btn.dataset.year);
      if (bYear === year) {
        btn.classList.add('bg-[#7A5A1E]', 'text-white', 'shadow-md');
        btn.classList.remove('bg-transparent', 'text-slate-500');
      } else {
        btn.classList.remove('bg-[#7A5A1E]', 'text-white', 'shadow-md');
        btn.classList.add('bg-transparent', 'text-slate-500');
      }
    });

    const milestone = yearMilestones[year];
    const milestoneTag = document.getElementById('milestoneTag');
    const milestoneDesc = document.getElementById('milestoneDesc');
    if (milestoneTag) milestoneTag.textContent = milestone.tag;
    if (milestoneDesc) milestoneDesc.textContent = milestone.desc;

    // Update Property Cards in Simulator
    Object.keys(properties).forEach(key => {
      const p = properties[key];
      const val = p.yearlyValuations[year];
      const equity = p.equityDeployed[year];
      const rent = p.cumulativeRent[year];
      const capGain = val - p.basePriceAED;
      const totalProfit = capGain + rent;
      const roe = equity > 0 ? ((totalProfit / equity) * 100).toFixed(1) : 0;

      const valEl = document.getElementById(`sim-val-${key}`);
      const equityEl = document.getElementById(`sim-equity-${key}`);
      const gainEl = document.getElementById(`sim-gain-${key}`);
      const rentEl = document.getElementById(`sim-rent-${key}`);
      const roeEl = document.getElementById(`sim-roe-${key}`);

      if (valEl) valEl.textContent = formatMoney(val);
      if (equityEl) equityEl.textContent = formatMoney(equity);
      if (gainEl) {
        gainEl.textContent = `+${formatMoney(capGain)}`;
        gainEl.className = capGain >= 0 ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'font-bold text-rose-500';
      }
      if (rentEl) rentEl.textContent = formatMoney(rent);
      if (roeEl) {
        roeEl.textContent = `${roe}%`;
        roeEl.className = roe > 100 ? 'text-xl font-extrabold text-amber-600 dark:text-amber-400' : 'text-xl font-bold text-slate-800 dark:text-slate-200';
      }
    });
  }

  // Currency Toggle Listeners
  const btnAED = document.getElementById('currencyAED');
  const btnUSD = document.getElementById('currencyUSD');
  if (btnAED && btnUSD) {
    btnAED.addEventListener('click', () => {
      state.currency = 'AED';
      btnAED.classList.add('bg-[#7A5A1E]', 'text-white');
      btnAED.classList.remove('text-slate-600', 'dark:text-slate-300');
      btnUSD.classList.remove('bg-[#7A5A1E]', 'text-white');
      btnUSD.classList.add('text-slate-600', 'dark:text-slate-300');
      updateAllPrices();
    });

    btnUSD.addEventListener('click', () => {
      state.currency = 'USD';
      btnUSD.classList.add('bg-[#7A5A1E]', 'text-white');
      btnUSD.classList.remove('text-slate-600', 'dark:text-slate-300');
      btnAED.classList.remove('bg-[#7A5A1E]', 'text-white');
      btnAED.classList.add('text-slate-600', 'dark:text-slate-300');
      updateAllPrices();
    });
  }

  function updateAllPrices() {
    // Update general price badges across cards & tables
    document.querySelectorAll('[data-aed]').forEach(el => {
      const aedVal = parseFloat(el.getAttribute('data-aed'));
      el.textContent = formatMoney(aedVal);
    });
    updateSimulator();
  }

  // Year button listeners
  document.querySelectorAll('.year-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedYear = parseInt(btn.dataset.year);
      updateSimulator();
    });
  });

  // Spotlight Tab Switcher
  const tabBtns = document.querySelectorAll('.spotlight-tab');
  const tabContents = document.querySelectorAll('.spotlight-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      state.activeTab = target;
      
      tabBtns.forEach(b => {
        b.classList.remove('border-[#7A5A1E]', 'text-[#7A5A1E]', 'dark:text-[#D9B76F]', 'dark:border-[#D9B76F]');
        b.classList.add('border-transparent', 'text-slate-500');
      });
      btn.classList.add('border-[#7A5A1E]', 'text-[#7A5A1E]', 'dark:text-[#D9B76F]', 'dark:border-[#D9B76F]');
      btn.classList.remove('border-transparent', 'text-slate-500');

      tabContents.forEach(content => {
        if (content.id === `tab-${target}`) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
      lucide.createIcons();
    });
  });

  // Lightbox Modal for Blueprints & High-Res Renders
  const lightbox = document.getElementById('blueprintLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.open-blueprint').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const src = trigger.dataset.img;
      const title = trigger.dataset.title || 'Architectural Floor Plan';
      const desc = trigger.dataset.desc || 'High-resolution official unit plan layout';

      if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Initialize
  updateAllPrices();
  lucide.createIcons();
});
