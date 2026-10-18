/**
 * BEAM PORTFOLIO - MAIN INTERACTIVE JAVASCRIPT
 * Phuwadol Leelanoi (ภูวดล ลีลาน้อย)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavbarScroll();
  initMobileMenu();
  initActiveNavLink();
  initSkillFilter();
  initClipboardButtons();
  initProjectModals();
  initContactForm();
});

/* -------------------------------------------------------------
 * 1. Theme Switcher (Dark / Light)
 * ------------------------------------------------------------- */
function initTheme() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
  const savedTheme = localStorage.getItem('beam_portfolio_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('beam_portfolio_theme', newTheme);
      updateThemeIcon(newTheme, themeIcon);
    });
  }
}

function updateThemeIcon(theme, iconEl) {
  if (!iconEl) return;
  if (theme === 'light') {
    iconEl.className = 'fa-solid fa-moon';
  } else {
    iconEl.className = 'fa-solid fa-sun';
  }
}

/* -------------------------------------------------------------
 * 2. Dynamic Typing Text Effect
 * ------------------------------------------------------------- */
function initTypingEffect() {
  const targetElement = document.getElementById('typedRoleText');
  if (!targetElement) return;

  const roles = [
    'Web Developer',
    'Software Tester / QA',
    'ICT Student @ SPU',
    'Frontend Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseEnd = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      targetElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      targetElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* -------------------------------------------------------------
 * 3. Sticky Navbar & Scroll Styling
 * ------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* -------------------------------------------------------------
 * 4. Mobile Menu Toggle
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  if (!mobileToggle || !navLinks) return;

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });

  // Close menu when clicking link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 5. Active Nav Link on Scroll
 * ------------------------------------------------------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 6. Skill Category Filter
 * ------------------------------------------------------------- */
function initSkillFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 7. Copy to Clipboard & Toast Notification
 * ------------------------------------------------------------- */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('.copy-trigger');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || textToCopy;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`คัดลอก ${label} สำเร็จแล้ว!`);
        }).catch(() => {
          fallbackCopyText(textToCopy, label);
        });
      } else {
        fallbackCopyText(textToCopy, label);
      }
    });
  });
}

function fallbackCopyText(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    showToast(`คัดลอก ${label} สำเร็จแล้ว!`);
  } catch (err) {
    showToast(`ไม่สามารถคัดลอกได้: ${text}`);
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check toast-icon"></i><span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* -------------------------------------------------------------
 * 8. Project Modals & Details Preview
 * ------------------------------------------------------------- */
const projectData = {
  korat: {
    title: 'โครงการปรับปรุงและพัฒนาเว็บไซต์หน่วยงาน อบจ. นครราชสีมา',
    category: 'Web Development & Maintenance (ปวส.)',
    description: 'งานฝึกประสบการณ์วิชาชีพ ณ องค์การบริหารส่วนจังหวัดนครราชสีมา โดยมีหน้าที่ปรับปรุง พัฒนา และดูแลเว็บไซต์ของหน่วยงานในสังกัด',
    details: [
      'ปรับปรุงโครงสร้างหน้าเว็บและดีไซน์ UI ให้ทันสมัย รองรับการแสดงผลทุกขนาดหน้าจอ (Responsive Web Design)',
      'ปรับปรุงความเร็วและประสิทธิภาพการโหลดหน้าเว็บไซต์เพื่อรองรับการเข้าชมของประชาชน',
      'ตรวจสอบและอัปเดตข้อมูลข่าวสาร ประกาศจัดซื้อจัดจ้าง และบริการภาครัฐตามมาตรฐานความโปร่งใส',
      'ประสานงานร่วมกับบุคลากรในหน่วยงานเพื่อรับ Requirement และแก้ไขปัญหาหน้างานอย่างรวดเร็ว'
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'CMS Maintenance', 'Web Standards']
  },
  memessage: {
    title: 'ระบบทดสอบและตรวจสอบคุณภาพซอฟต์แวร์ (Software QA / Tester)',
    category: 'Software Quality Assurance (ปวช.)',
    description: 'งานฝึกประสบการณ์วิชาชีพ ณ บริษัท มีเมสเสจ จำกัด ในตำแหน่ง Software Tester เพื่อรับประกันคุณภาพซอฟต์แวร์ก่อนส่งมอบให้ผู้ใช้งานจริง',
    details: [
      'ศึกษาความต้องการของระบบ (Requirement Specifications) และออกแบบ Test Cases / Test Scenarios ที่ครอบคลุม',
      'ดำเนินการ Manual Testing ทั้ง Functional Testing, UI/UX Testing, และ Regression Testing บน Mobile App และ Web Application',
      'ค้นหา ตรวจสอบ และบันทึกข้อผิดพลาด (Bugs & Defects) พร้อมระบุ Steps to Reproduce อย่างละเอียดเพื่อส่งต่อให้นักพัฒนา',
      'ตรวจสอบผลการแก้ไข Bug (Bug Verification) และร่วมส่งมอบเวอร์ชันที่มีความเสถียรและปราศจากข้อผิดพลาด'
    ],
    skills: ['Software QA', 'Manual Testing', 'Test Case Design', 'Bug Tracking', 'Regression Testing', 'Detail-Oriented']
  },
  portfolio: {
    title: 'Interactive Modern Web Portfolio',
    category: 'Personal Showcase & Modern Web Tech',
    description: 'เว็บไซต์พอร์ตโฟลิโอส่วนตัวที่ออกแบบและสร้างขึ้นเพื่อนำเสนอประวัติการศึกษา ประสบการณ์การทำงาน และผลงานด้านเทคโนโลยี',
    details: [
      'สร้างด้วย Modern Vanilla Web Stack (HTML5, Custom CSS3 Design System, Modular JavaScript)',
      'ระบบ Dark Mode / Light Mode พร้อมการบันทึกสถานะลงใน LocalStorage',
      'ฟีเจอร์ Copy to Clipboard อัจฉริยะสำหรับเบอร์โทรศัพท์และอีเมล พร้อม Toast Feedback',
      'รองรับการสั่งพิมพ์เรซูเม่ (Print-to-PDF Resume Mode) อัตโนมัติด้วย CSS Media Print'
    ],
    skills: ['HTML5', 'CSS Variables', 'JavaScript ES6+', 'Glassmorphism', 'Responsive Design', 'Print Styling']
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalClose = document.getElementById('modalCloseBtn');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  if (!modalOverlay) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      document.getElementById('modalProjTitle').textContent = data.title;
      document.getElementById('modalProjCategory').textContent = data.category;
      document.getElementById('modalProjDesc').textContent = data.description;

      const detailsList = document.getElementById('modalProjDetails');
      detailsList.innerHTML = '';
      data.details.forEach(item => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `<i class="fa-solid fa-circle-check task-bullet"></i><span>${item}</span>`;
        detailsList.appendChild(li);
      });

      const tagsWrap = document.getElementById('modalProjTags');
      tagsWrap.innerHTML = '';
      data.skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'tag-pill';
        span.textContent = skill;
        tagsWrap.appendChild(span);
      });

      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------
 * 9. Contact Form Interactive Handler
 * ------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('senderName');
    const emailInput = document.getElementById('senderEmail');
    const msgInput = document.getElementById('senderMessage');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = msgInput ? msgInput.value.trim() : '';

    if (!name || !email || !message) {
      showToast('กรุณากรอกข้อมูลให้ครบถ้วนก่อนส่งข้อความ');
      return;
    }

    // Direct mailto trigger fallback
    const subject = encodeURIComponent(`ติดต่อจาก ${name} ผ่าน Portfolio`);
    const body = encodeURIComponent(`ชื่อผู้ติดต่อ: ${name}\nอีเมล: ${email}\n\nข้อความ:\n${message}`);
    const mailtoUrl = `mailto:bnem1027@gmail.com?subject=${subject}&body=${body}`;

    showToast('กำลังเตรียมเปิดโปรแกรมส่งอีเมลไปยัง bnem1027@gmail.com...');
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
      form.reset();
    }, 1200);
  });
}
