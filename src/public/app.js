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
    ['SOFT', 'GOLDEN', 'DEEP'][a[1] < 34 ? 0 : a[1] < 67 ? 1 : 2] +
    ' · ' +
    ['PARK', 'CITY', 'ROOFTOP'][a[2]] +
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
    '원하는 태닝 톤은?',
    '어떤 방식으로 햇빛을 즐기고 싶어?',
    '당신의 태닝 페이스는?',
    '태닝할 때 가장 중요하게 생각하는 건?',
    '나의 선 라이프 유형',
  ];
  const subs = [
    '다섯 번의 선택으로 발견하는 나만의 선 라이프.',
    '드래그하고, 고르고, 눌러보세요. 5 QUESTIONS · 4 TYPES',
    'Which moment of sunlight feels most like you?',
    'How deep do you want to glow?',
    'Where do you feel most comfortable under the sun?',
    'What’s your tanning pace?',
    'What matters most while you’re in the sun?',
    '취향을 바탕으로 제안하는 스타일',
  ];
  let page = 1,
    answers = [50, 50, null, 50, null],
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
    window.scrollTo(0, 0);
    nav
      .querySelectorAll('button')
      .forEach((b, i) => b.setAttribute('aria-current', i === page));
    root.querySelector('#title').innerHTML = titles[page];
    root.querySelector('#subtitle').textContent = subs[page];
    root.querySelector('#eyebrow').textContent =
      page < 2
        ? 'TANNING PERSONALITY TEST'
        : page < 7
          ? 'FIND YOUR SUN'
          : 'YOUR SUN PERSONALITY';
    root.querySelector('#count').textContent =
      page < 2 ? 'INTRO' : page < 7 ? `${page - 1} / 5` : 'RESULT';
    root.querySelector('#back').disabled = page === 1;
    root.querySelector('#next').textContent =
      page === 0
        ? '나의 햇빛 찾기 →'
        : page === 1
          ? 'FOLLOW THE SUN'
          : page === 6
            ? '결과 보기 →'
            : page === 7
              ? '다시 테스트'
              : '다음 →';
    root.querySelector('#next').disabled =
      (page === 4 || page === 6) && answers[page - 2] === null;
    root.querySelector('#selection').textContent = '';
    if (page === 1)
      stage.innerHTML =
        '<div class="hero-brand"><div class="hero-tagline"><span>Find Your</span><span>Sun Style</span></div><img class="hero-logo" src="/assets/solarc-logo.svg" alt="Solarc" width="731" height="317"></div>';
    if (page === 2) {
      stage.innerHTML =
        '<div class="horizon"><div class="sun">SUN</div></div><input aria-label="햇빛 시간대" type="range" min="0" max="100" style="width:100%"><div class="labels"><span>MORNING</span><span>MIDDAY</span><span>SUNSET</span></div>';
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
      stage.innerHTML =
        '<div class="tone"><div class="arm" aria-label="희망 톤 미리보기"></div><input class="vertical" aria-label="희망 태닝 톤" type="range" min="0" max="100"></div><div>SOFT → GOLDEN → DEEP</div>';
      const input = stage.querySelector('input');
      input.value = answers[1];
      const update = () => {
        answers[1] = +input.value;
        stage.querySelector('.arm').style.background =
          `hsl(29 40% ${76 - answers[1] * 0.4}%)`;
        root.querySelector('#selection').textContent = [
          'SOFT',
          'GOLDEN',
          'DEEP',
        ][part(answers[1])];
      };
      input.oninput = update;
      update();
    }
    if (page === 4) {
      stage.innerHTML = '<div class="places"></div>';
      [
        'PARK|잔디에 누워 여유롭게',
        'CITY|산책하거나 이동하면서',
        'ROOFTOP|한 공간에서 집중해서',
      ].forEach((x, i) => {
        const b = document.createElement('button');
        b.className = 'place';
        b.innerHTML = x.split('|')[0] + '<span>' + x.split('|')[1] + '</span>';
        b.setAttribute('aria-pressed', answers[2] === i);
        b.onclick = () => {
          answers[2] = i;
          b.classList.add('chosen');
          setTimeout(() => {
            page = 5;
            render();
          }, 350);
        };
        stage.firstChild.append(b);
      });
    }
    if (page === 5) {
      stage.innerHTML =
        '<button id="hold" class="sun">꾹 누르기</button><input type="range" min="0" max="100" aria-label="선호 페이스"><div class="labels"><span>QUICK</span><span>BALANCED</span><span>SLOW</span></div><small>실제 태닝 시간이 아닌, 선호하는 경험 방식입니다.</small>';
      const input = stage.querySelector('input'),
        hold = stage.querySelector('#hold');
      input.value = answers[3];
      const update = () => {
        answers[3] = +input.value;
        hold.style.transform = `scale(${0.8 + answers[3] / 250})`;
        root.querySelector('#selection').textContent = [
          'QUICK',
          'BALANCED',
          'SLOW',
        ][part(answers[3])];
      };
      input.oninput = update;
      hold.onpointerdown = (e) => {
        hold.setPointerCapture(e.pointerId);
        input.value = 0;
        update();
        timer = setInterval(() => {
          input.value = Math.min(100, +input.value + 2);
          update();
          if (+input.value === 100) clearInterval(timer);
        }, 60);
      };
      hold.onpointerup = hold.onpointercancel = () => clearInterval(timer);
      update();
    }
    if (page === 6) {
      stage.innerHTML = '<div class="orbs"></div>';
      [
        'COMFORT|편하게 즐기는 것',
        'COLOR|예쁜 태닝 컬러',
        'CARE|피부 보호와 관리',
      ].forEach((x, i) => {
        const b = document.createElement('button');
        b.className = 'orb';
        b.innerHTML = x.replace('|', '<br>');
        b.setAttribute('aria-pressed', answers[4] === i);
        b.onclick = () => {
          answers[4] = i;
          stage.querySelectorAll('button').forEach((other, j) => {
            other.classList.toggle('dismissed', j !== i);
            other.setAttribute('aria-pressed', j === i);
          });
          root.querySelector('#next').disabled = false;
          root.querySelector('#selection').textContent = x.split('|')[0];
        };
        stage.firstChild.append(b);
      });
    }
    if (page === 7) {
      let d = answers[1] > 66 || (answers[1] >= 34 && answers[4] === 1),
        r = answers[3] > 66 || (answers[3] >= 34 && answers[2] !== 1);
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
    if (page === 7) {
      page = 1;
      answers = [50, 50, null, 50, null];
    } else page++;
    render();
  };
  render();
})();
