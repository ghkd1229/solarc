function resultMarkup(idx, name, slogan, a) {
  const descriptions = [
    '가볍고 자연스러운 생기, 간편한 준비와 산뜻한 마무리를 선호해요.',
    '천천히 쉬어가며 편안한 분위기와 촉촉한 마무리를 즐기는 편이에요.',
    '선명한 브론즈 무드와 집중도 있는 간결한 경험을 선호해요.',
    '깊은 컬러의 분위기와 섬세하고 꾸준한 관리를 함께 중요하게 생각해요.',
  ];
  const products = [
    [
      '선 미스트 + 타이머',
      '간편한 준비와 휴식 알림으로 나만의 리듬을 만들어보세요.',
      '쿨링·진정 젤',
      '야외 활동 후 산뜻한 마무리를 위한 제품 조합이에요.',
    ],
    [
      '보습 크림',
      '촉촉한 사용감과 여유로운 케어를 즐겨보세요.',
      'UV 반응 키링',
      '빛의 변화를 즐기는 액세서리예요. 피부 보호 수준을 판단하는 도구는 아니에요.',
    ],
    [
      '셀프 태닝 제품',
      '선명한 브론즈 무드를 표현하는 컬러 제품을 살펴보세요.',
      '타이머',
      '일정과 휴식 리듬을 관리하는 데 활용해보세요.',
    ],
    [
      '보습 크림',
      '부드러운 사용감으로 섬세한 케어 루틴을 만들어보세요.',
      '애프터 선 로션',
      '야외 활동 후 보습으로 마무리하는 조합이에요.',
    ],
  ][idx];
  return (
    '<div class="sun">' +
    ['S + E', 'S + R', 'D + E', 'D + R'][idx] +
    '</div><h3>' +
    name +
    '</h3><p>' +
    slogan +
    '</p><article class="result"><small>YOUR PREFERENCE</small><h3>나의 태닝 취향</h3><p>' +
    descriptions[idx] +
    '</p><p>' +
    ['MORNING', 'MIDDAY', 'SUNSET'][a[0] < 34 ? 0 : a[0] < 67 ? 1 : 2] +
    ' · ' +
    ['글로우 스킨', '골드 브라운', '다크 브론즈', '딥 다크'][
      Math.round((a[1] * 3) / 100)
    ] +
    ' · ' +
    ['가벼운 올인원', '산뜻한 텍스처', '아로마 향기', '쫀쫀한 보습력'][a[2]] +
    '</p><p>직접 선택한 피부 반응: ' +
    [
      '쉽게 붉어지고 따가움',
      '붉은기 없이 색이 변함',
      '처음엔 붉어진 뒤 색이 변함',
      '이미 짙은 베이스 톤',
    ][a[3]] +
    '</p></article><article class="result"><small>YOUR PAIRING</small><h3>나와 맞는 제품 조합</h3><h4>' +
    products[0] +
    '</h4><p>' +
    products[1] +
    '</p><h4>' +
    products[2] +
    '</h4><p>' +
    products[3] +
    '</p></article><small>취향을 알아보는 테스트이며 피부 진단이나 자외선 노출 시간 안내가 아닙니다.</small>'
  );
}
(() => {
  const root = document.getElementById('sun-wire'),
    nav = root.querySelector('nav'),
    stage = root.querySelector('#stage');
  const titles = [
    '당신의 햇빛에는<br>어떤 취향이 있나요?',
    '햇빛을 즐기는<br>나만의 방식을 찾아보세요.',
    '좋아하는 햇빛의 순간은?',
    "내가 원하는 '완벽한 태닝 피부'는 ?",
    '몸에 바르는 스킨케어 제품을 고를 때, 가장 중요하게 생각하는 것은?',
    '평소 햇빛을 오래 받았을 때, 내 피부는 어떻게 반응하나요?',
    '나의 선 라이프 유형',
  ];
  const subs = [
    '네 번의 선택으로 발견하는 나만의 선 라이프.',
    '드래그하고, 고르고, 눌러보세요. 4 QUESTIONS · 4 TYPES',
    'Which moment of sunlight feels most like you?',
    'What is the “perfect tanned skin” I want?',
    'What do you consider most important when choosing a skincare product to apply on the body?',
    'How does my skin react when it is exposed to sunlight for a long time in everyday life?',
    '취향을 바탕으로 제안하는 스타일',
  ];
  let page = 1,
    answers = [50, null, null, null],
    timer = null;
  const labels = [];
  labels.forEach((name, i) => {
    const b = document.createElement('button');
    b.textContent = name;
    b.onclick = () => {
      page = i;
      render();
    };
    nav.append(b);
  });
  const part = (v) => (v < 34 ? 0 : v < 67 ? 1 : 2);
  function select(v) {
    answers[page - 2] = v;
    render();
  }
  function render() {
    clearInterval(timer);
    timer = null;
    root.dataset.page = page;
    root.classList.toggle('figma-question', page >= 2 && page <= 5);
    root.querySelector('header > span').textContent =
      page >= 2 && page <= 5 ? 'Solarc' : 'SOLARC / FIND YOUR SUN';
    window.scrollTo(0, 0);
    nav
      .querySelectorAll('button')
      .forEach((b, i) => b.setAttribute('aria-current', i === page));
    root.querySelector('#title').innerHTML = titles[page];
    root.querySelector('#subtitle').textContent = subs[page];
    root.querySelector('#eyebrow').textContent =
      page < 2
        ? 'TANNING PERSONALITY TEST'
        : page < 6
          ? 'FIND YOUR SUN'
          : 'YOUR SUN PERSONALITY';
    root.querySelector('#count').textContent =
      page < 2 ? 'INTRO' : page < 6 ? `${page - 1} / 4` : 'RESULT';
    if (page >= 2 && page <= 5) {
      root.querySelector('#eyebrow').textContent = `QUESTION ${page - 1}.`;
      root.querySelector('#count').innerHTML = `0${page - 1} <span>/ 04</span>`;
    }
    root.querySelector('#back').disabled = page === 1;
    root.querySelector('#next').textContent =
      page === 0
        ? '나의 햇빛 찾기 →'
        : page === 1
          ? 'FOLLOW THE SUN'
          : page === 5
            ? '결과 보기 →'
            : page === 6
              ? '다시 테스트'
              : '다음 →';
    root.querySelector('#next').disabled =
      page >= 3 && page <= 5 && answers[page - 2] === null;
    root.querySelector('#selection').textContent = '';
    if (page === 1)
      stage.innerHTML =
        '<div class="hero-brand"><div class="hero-tagline"><span>Find Your</span><span>Sun Style</span></div><img class="hero-logo" src="/assets/solarc-logo.svg" alt="Solarc" width="731" height="317"></div>';
    if (page === 2) {
      stage.innerHTML =
        '<div class="horizon"><div class="sun" aria-hidden="true"></div></div><input aria-label="햇빛 시간대" type="range" min="0" max="100"><div class="labels"><span>06:00<br>SUNRISE</span><span>8:00<br>SUNSET</span></div>';
      const input = stage.querySelector('input');
      input.value = answers[0];
      const update = () => {
        answers[0] = +input.value;
        stage.querySelector('.sun').style.left =
          `calc(${15 + answers[0] * 0.7}% - 40px)`;
        stage.querySelector('.sun').style.bottom =
          10 + 50 * Math.sin((answers[0] / 100) * Math.PI) + 'px';
        root.style.setProperty(
          '--sky',
          ['#efe3bb', '#f5d77f', '#e4ad95'][part(answers[0])],
        );
        stage.querySelector('.sun').style.boxShadow =
          `${(50 - answers[0]) * 1.1}px 85px 22px -25px #55442744`;
        root.querySelector('#selection').textContent = [
          'MORNING',
          'MIDDAY',
          'SUNSET',
        ][part(answers[0])];
      };
      const sun = stage.querySelector('.sun');
      sun.style.touchAction = 'none';
      sun.style.cursor = 'grab';
      sun.onpointerdown = (event) => {
        sun.setPointerCapture(event.pointerId);
      };
      sun.onpointermove = (event) => {
        if (!sun.hasPointerCapture(event.pointerId)) return;
        const bounds = stage.querySelector('.horizon').getBoundingClientRect();
        input.value = Math.max(
          0,
          Math.min(
            100,
            (((event.clientX - bounds.left) / bounds.width - 0.15) / 0.7) * 100,
          ),
        );
        update();
      };
      input.oninput = update;
      update();
    }
    if (page === 3) {
      stage.innerHTML = '<div class="tan-photos"></div>';
      ['글로우 스킨', '골드 브라운', '다크 브론즈', '딥 다크'].forEach(
        (label, i) => {
          const button = document.createElement('button');
          button.className = 'tan-photo';
          button.innerHTML =
            '<span class="tan-photo-crop"><img src="/assets/' +
            (i === 1 ? 'tan-photo-golden.png' : 'tan-photo.png') +
            '" alt="" width="1241" height="827" style="left:' +
            -i * 310 +
            'px"></span><span class="tan-photo-label">' +
            label +
            '</span>';
          button.setAttribute('aria-pressed', answers[1] === (i * 100) / 3);
          button.onclick = () => {
            answers[1] = (i * 100) / 3;
            stage
              .querySelectorAll('button')
              .forEach((el, j) => el.setAttribute('aria-pressed', j === i));
            root.querySelector('#next').disabled = false;
            root.querySelector('#selection').textContent = label;
          };
          stage.firstChild.append(button);
        },
      );
    }
    if (page === 4) {
      stage.innerHTML = '<div class="texture-choices"></div>';
      [
        '"이것저것 바르기 귀찮아!"|하나로 끝내는 가벼운 올인원',
        '"끈적임은 절대 못 참아!"|바르자마자 흡수되는 산뜻한 텍스처',
        '"바를 때마다 기분이 좋아야지!"|힐링되는 아로마 향기',
        '"건조한 건 질색이야!"|영양감 듬뿍 담긴 쫀쫀한 보습력',
      ].forEach((x, i) => {
        const b = document.createElement('button');
        b.className = 'texture-choice';
        b.innerHTML =
          '<span class="texture-caption">' +
          x.replace('|', '<br>') +
          '</span><span class="texture-crop texture-' +
          i +
          '"><img src="/assets/textures.png" alt="" width="675" height="796"></span>';
        b.setAttribute('aria-pressed', answers[2] === i);
        b.onclick = () => {
          answers[2] = i;
          stage
            .querySelectorAll('button')
            .forEach((button, j) =>
              button.setAttribute('aria-pressed', j === i),
            );
          root.querySelector('#next').disabled = false;
          root.querySelector('#selection').textContent = x.split('|')[1];
        };
        stage.firstChild.append(b);
      });
    }
    if (page === 5) {
      stage.innerHTML = '<div class="reaction-choices"></div>';
      [
        '쉽게 붉어지고 따가워져서|관리가 필요한 예민보스 피부',
        '붉은기 하나 없이 쏙쏙 흡수하며|잘 타는 피부',
        '처음엔 살짝 붉어졌다가 서서히|까맣게 타는 평범한 피부',
        '이미 베이스가 깔려 있어|웬만해선 더 안 타는 정체기 피부',
      ].forEach((label, i) => {
        const button = document.createElement('button');
        button.className = 'reaction-choice';
        button.innerHTML =
          '<img src="/assets/reaction-' +
          i +
          '.png" alt="" width="926" height="521"><span>' +
          label.replace('|', '<br>') +
          '</span>';
        button.setAttribute('aria-pressed', answers[3] === i);
        button.onclick = () => {
          answers[3] = i;
          stage
            .querySelectorAll('button')
            .forEach((el, j) => el.setAttribute('aria-pressed', j === i));
          root.querySelector('#next').disabled = false;
          root.querySelector('#selection').textContent = '선택 완료';
        };
        stage.firstChild.append(button);
      });
    }
    if (page === 6) {
      // Preference classification only; reported skin reaction is not a diagnosis.
      const d = answers[1] >= 50,
        r = answers[2] >= 2;
      const idx = (d ? 2 : 0) + (r ? 1 : 0),
        names = [
          '스마트 실용주의자 · S+E',
          '감각적 힐링 탐험가 · S+R',
          '야생적 건강미 추구자 · D+E',
          '디테일 완벽주의자 · D+R',
        ],
        slogans = [
          '빠르게, 가볍게, 필요한 만큼',
          '천천히, 편안하게, 감각적으로',
          '더 선명하게, 더 깊게, 나답게',
          '꼼꼼하게, 섬세하게, 완벽하게',
        ];
      stage.innerHTML = resultMarkup(idx, names[idx], slogans[idx], answers);
    }
  }
  root.querySelector('#back').onclick = () => {
    page = Math.max(1, page - 1);
    render();
  };
  root.querySelector('#next').onclick = () => {
    if (page === 6) {
      page = 1;
      answers = [50, null, null, null];
    } else page++;
    render();
  };
  render();
})();

// Scale the complete design canvas, never its individual elements.
(() => {
  const updateCanvas = () => {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    const root = document.documentElement;
    root.style.setProperty('--figma-scale', String(scale));
    root.style.setProperty(
      '--figma-left',
      `${(window.innerWidth - 1920 * scale) / 2}px`,
    );
    root.style.setProperty(
      '--figma-top',
      `${(window.innerHeight - 1080 * scale) / 2}px`,
    );
  };
  window.addEventListener('resize', updateCanvas);
  updateCanvas();
})();
