/**
 * BEEM PORTFOLIO - MAIN INTERACTIVE JAVASCRIPT & I18N SYSTEM
 * Poovadol Leelanoi (ภูวดล ลีลาน้อย - บีม)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
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
 * 1. Internationalization (i18n) Translations Dictionary
 * ------------------------------------------------------------- */
let currentLang = localStorage.getItem('beam_portfolio_lang') || 'th';

const i18n = {
  th: {
    'nav.home': 'หน้าหลัก',
    'nav.about': 'เกี่ยวกับฉัน',
    'nav.education': 'การศึกษา',
    'nav.experience': 'ประสบการณ์',
    'nav.skills': 'ทักษะ & ความสามารถ',
    'nav.showcase': 'ผลงาน',
    'nav.contact': 'ติดต่อ',
    'nav.contact_btn': 'ติดต่อฉัน',

    'hero.status': 'พร้อมรับโอกาสฝึกงานและร่วมงานด้าน Tech / QA / Dev',
    'hero.title': 'Poovadol Leelanoi, Beem <br><span class="gradient-text">ภูวดล ลีลาน้อย</span> (บีม)',
    'hero.role_label': 'บทบาท:',
    'hero.desc': 'นักศึกษาปริญญาตรี สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) มหาวิทยาลัยศรีปทุม ผู้มีความหลงใหลในการพัฒนาเว็บไซต์ที่ทันสมัย และการทดสอบระบบ (Software Quality Assurance) เพื่อสร้างประสบการณ์การใช้งานที่มีคุณภาพและไร้ข้อผิดพลาด',
    'hero.btn_exp': 'ดูประวัติ & ผลงาน',
    'hero.btn_contact': 'ติดต่อด่วน',
    'hero.btn_print': 'พิมพ์เรซูเม่',
    'hero.stat1_label': 'GPA ปวช. เทคนิคบุรีรัมย์',
    'hero.stat2_label': 'GPA ปวส. อาชีวะโคราช',
    'hero.stat3_label': 'อายุ (ปี) | คนรุ่นใหม่ไฟแรง',
    'hero.badge1_title': 'ผลการเรียนยอดเยี่ยม',
    'hero.badge1_sub': 'GPA สูงสุด 3.88',
    'hero.badge2_title': 'ประสบการณ์จริง',
    'hero.badge2_sub': 'อบจ. โคราช & MeMessage',

    'about.tag': '<i class="fa-regular fa-user"></i> ข้อมูลส่วนตัว',
    'about.title': 'เกี่ยวกับ<span class="gradient-text">ตัวฉัน</span>',
    'about.desc': 'ทำความรู้จักกับตัวตน ความมุ่งมั่น และเป้าหมายในสายงานเทคโนโลยีของผม',
    'about.card1_title': 'ข้อมูลทั่วไป (Personal Info)',
    'about.lbl_name': 'ชื่อ - นามสกุล',
    'about.val_name': 'นายภูวดล ลีลาน้อย',
    'about.lbl_nick': 'ชื่อเล่น',
    'about.val_nick': 'บีม (BEEM)',
    'about.lbl_age': 'อายุ',
    'about.val_age': '20 ปี',
    'about.lbl_lang': 'สัญชาติ / ภาษา',
    'about.val_lang': 'ไทย (Thai / English)',
    'about.lbl_edu': 'การศึกษาปัจจุบัน',
    'about.val_edu': 'ป.ตรี ICT ม.ศรีปทุม (SPU)',
    'about.lbl_focus': 'สายงานที่มุ่งเน้น',
    'about.val_focus': 'Web Dev & Software QA',
    'about.quote': '"มุ่งมั่นพัฒนาเว็บไซต์ที่มีความเสถียร สวยงาม ตอบสนองผู้ใช้ และผ่านการทดสอบคุณภาพ (QA) อย่างเข้มงวดเพื่อสร้างคุณค่าที่แท้จริงให้แก่ผู้ใช้งาน"',
    'about.card2_title': 'จุดแข็งและเป้าหมาย (Strengths & Focus)',
    'about.str1_title': 'ทักษะการสร้างและปรับปรุงเว็บไซต์',
    'about.str1_desc': 'มีประสบการณ์ตรงในการพัฒนาและดูแลเว็บไซต์ภาครัฐให้รองรับผู้ใช้งานจริง มีโครงสร้างที่เป็นระเบียบ ใช้งานง่าย และมีความปลอดภัย',
    'about.str2_title': 'ความละเอียดรอบคอบในการเป็น Tester',
    'about.str2_desc': 'ผ่านการฝึกงานตรวจสอบและค้นหาข้อผิดพลาด (Bugs) ของโปรแกรมและแอปพลิเคชันอย่างเป็นระบบ ช่วยลดปัญหาและยกระดับคุณภาพซอฟต์แวร์',
    'about.str3_title': 'พื้นฐานทางวิชาการและผลการเรียนเด่น',
    'about.str3_desc': 'สำเร็จการศึกษาระดับ ปวช. ด้วย GPA 3.88 และระดับ ปวส. ด้วย GPA 3.48 สะท้อนถึงความรับผิดชอบและความตั้งใจจริงในการเรียนรู้',

    'edu.tag': '<i class="fa-solid fa-graduation-cap"></i> ประวัติการศึกษา',
    'edu.title': 'เส้นทางการศึกษา <span class="gradient-text">(Education)</span>',
    'edu.desc': 'พื้นฐานความรู้ที่สั่งสมตั้งแต่วิชาชีพสู่ระดับอุดมศึกษาด้านเทคโนโลยีสารสนเทศ',
    'edu.item1_title': 'ระดับปริญญาตรี (กำลังศึกษา)',
    'edu.item1_inst': 'มหาวิทยาลัยศรีปทุม (Sripatum University - SPU)',
    'edu.item1_badge': '<i class="fa-solid fa-spinner fa-spin"></i> ปัจจุบัน',
    'edu.item1_desc': '<strong>สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT)</strong> — มุ่งเน้นการศึกษาเทคโนโลยีสารสนเทศยุคใหม่, การพัฒนาซอฟต์แวร์และแอปพลิเคชัน, สถาปัตยกรรมระบบเครือข่าย, ความมั่นคงปลอดภัยไซเบอร์ ตลอดจนการประยุกต์ใช้เทคโนโลยีเพื่อตอบสนองธุรกิจยุคดิจิทัล',
    'edu.item1_loc': '<i class="fa-solid fa-location-dot"></i> กรุงเทพมหานคร',
    'edu.item1_meta': '<i class="fa-solid fa-book-open"></i> สาขาวิชา ICT',
    'edu.item2_title': 'ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)',
    'edu.item2_inst': 'วิทยาลัยอาชีวศึกษานครราชสีมา',
    'edu.item2_badge': '<i class="fa-solid fa-star"></i> GPA 3.48 (ดีเยี่ยม)',
    'edu.item2_desc': '<strong>สาขาเทคโนโลยีสารสนเทศ (Information Technology)</strong> — ศึกษาหลักสูตรวิชาชีพขั้นสูงด้านคอมพิวเตอร์และการพัฒนาโปรแกรม เน้นทักษะภาคปฏิบัติ การออกแบบฐานข้อมูล การเขียนโค้ดเว็บไซต์ และการลงมือปฏิบัติงานจริงร่วมกับหน่วยงานภาครัฐในจังหวัดนครราชสีมา',
    'edu.item2_loc': '<i class="fa-solid fa-location-dot"></i> จังหวัดนครราชสีมา',
    'edu.item2_meta': '<i class="fa-solid fa-book-open"></i> สาขาเทคโนโลยีสารสนเทศ (IT)',
    'edu.item2_gpa': '<i class="fa-solid fa-chart-line"></i> เกรดเฉลี่ยสะสม 3.48',
    'edu.item3_title': 'ระดับประกาศนียบัตรวิชาชีพ (ปวช.)',
    'edu.item3_inst': 'วิทยาลัยเทคนิคบุรีรัมย์',
    'edu.item3_badge': '<i class="fa-solid fa-trophy"></i> GPA 3.88 (เกียรตินิยม)',
    'edu.item3_desc': '<strong>สาขาเทคโนโลยีสารสนเทศ (Information Technology)</strong> — สำเร็จการศึกษาด้วยผลการเรียนดีเด่น ปูรากฐานความรู้ด้านคอมพิวเตอร์ ฮาร์ดแวร์ ซอฟต์แวร์เบื้องต้น โครงข่ายคอมพิวเตอร์ และการฝึกทักษะการตรวจสอบคุณภาพซอฟต์แวร์ในระดับองค์กรเอกชน',
    'edu.item3_loc': '<i class="fa-solid fa-location-dot"></i> จังหวัดบุรีรัมย์',
    'edu.item3_meta': '<i class="fa-solid fa-book-open"></i> สาขาเทคโนโลยีสารสนเทศ (IT)',
    'edu.item3_gpa': '<i class="fa-solid fa-award"></i> เกรดเฉลี่ยสะสม 3.88',

    'exp.tag': '<i class="fa-solid fa-briefcase"></i> ประสบการณ์การทำงาน',
    'exp.title': 'ประวัติการทำงาน <span class="gradient-text">& การฝึกงาน</span>',
    'exp.desc': 'ประสบการณ์จริงในการพัฒนาเว็บไซต์ภาครัฐ และการทดสอบระบบซอฟต์แวร์ในบริษัทเอกชน',
    'exp.card1_period': '<i class="fa-regular fa-calendar"></i> ช่วงระดับ ปวส.',
    'exp.card1_role': 'ผู้พัฒนาและปรับปรุงเว็บไซต์ (Web Developer Intern)',
    'exp.card1_org': '<i class="fa-solid fa-landmark"></i> องค์การบริหารส่วนจังหวัดนครราชสีมา (อบจ. นครราชสีมา)',
    'exp.card1_resp_title': 'หน้าที่และความรับผิดชอบหลัก:',
    'exp.card1_task1': '<strong>ปรับปรุงและพัฒนาเว็บไซต์:</strong> รับผิดชอบดูแลและพัฒนาเว็บไซต์หน่วยงานในสังกัดองค์การบริหารส่วนจังหวัดนครราชสีมาให้ทันสมัยและใช้งานง่าย',
    'exp.card1_task2': '<strong>Responsive Web Design:</strong> ปรับแต่งการแสดงผลของหน้าเว็บให้รองรับการเปิดใช้งานได้อย่างสมบูรณ์แบบบนคอมพิวเตอร์ แท็บเล็ต และสมาร์ทโฟน',
    'exp.card1_task3': '<strong>อัปเดตระบบสารสนเทศ:</strong> ดูแลการจัดการเนื้อหา ข่าวสารประชาสัมพันธ์ เอกสารราชการ และงานบริการประชาชนของหน่วยงานให้ถูกต้องตามมาตรฐาน',
    'exp.card2_period': '<i class="fa-regular fa-calendar"></i> ช่วงระดับ ปวช.',
    'exp.card2_role': 'ผู้ตรวจสอบและทดสอบคุณภาพซอฟต์แวร์ (Software Tester / QA Intern)',
    'exp.card2_org': '<i class="fa-solid fa-building"></i> บริษัท มีเมสเสจ จำกัด (MeMessage Co., Ltd.)',
    'exp.card2_resp_title': 'หน้าที่และความรับผิดชอบหลัก:',
    'exp.card2_task1': '<strong>Software Quality Assurance:</strong> ได้รับมอบหมายให้เป็น Tester ตรวจสอบและทดสอบคุณภาพของโปรแกรมหรือแอปพลิเคชันอย่างละเอียดรอบคอบ',
    'exp.card2_task2': '<strong>ค้นหาและบันทึกข้อผิดพลาด (Bug Hunting):</strong> ตรวจหา Bug และจุดบกพร่องทั้งด้าน Functionality และ User Experience ก่อนส่งมอบให้ผู้ใช้งานจริง',
    'exp.card2_task3': '<strong>จัดทำรายงานข้อผิดพลาด:</strong> สื่อสารและประสานงานร่วมกับทีมนักพัฒนาซอฟต์แวร์ โดยระบุขั้นตอนการเกิดบั๊ก (Steps to Reproduce) เพื่อการแก้ไขที่รวดเร็ว',

    'skills.tag': '<i class="fa-solid fa-screwdriver-wrench"></i> ทักษะและความถนัด',
    'skills.title': 'ทักษะความสามารถ <span class="gradient-text">(Skills)</span>',
    'skills.desc': 'การผสมผสานระหว่างทักษะการสร้างเว็บ การตรวจสอบคุณภาพ และเครื่องมือที่ใช้ทำงาน',
    'skills.filter_all': 'ทั้งหมด (All)',
    'skills.filter_dev': 'Web Development',
    'skills.filter_qa': 'Software QA & Testing',
    'skills.filter_tools': 'เครื่องมือ & การทำงาน',
    'skills.lvl_high': 'ความชำนาญสูง',
    'skills.lvl_good': 'ความชำนาญดี',
    'skills.s1_desc': 'โครงสร้างเว็บมาตรฐาน, Accessibility, SEO Friendly',
    'skills.s2_desc': 'Flexbox, CSS Grid, Custom Design System, Media Queries',
    'skills.s3_desc': 'DOM Manipulation, Fetch API, Event Handling, Logic',
    'skills.s4_desc': 'Functional, Regression, Smoke Testing & App Verification',
    'skills.s5_desc': 'การออกแบบขั้นตอนทดสอบ และระบุ Steps to Reproduce อย่างแม่นยำ',
    'skills.s6_desc': 'ดูแลอัปเดตระบบสารสนเทศ และความเสถียรของเว็บไซต์',
    'skills.s7_desc': 'Version Control, Repository Management, Teamwork',
    'skills.s8_desc': 'Chrome DevTools, Network Analysis, Console Debugging',

    'showcase.tag': '<i class="fa-solid fa-cubes"></i> ผลงานเด่น',
    'showcase.title': 'ผลงานและ<span class="gradient-text">กรณีศึกษา</span>',
    'showcase.desc': 'ตัวอย่างโครงการและประสบการณ์ที่ได้ลงมือปฏิบัติจริง',
    'showcase.p1_title': 'ระบบเว็บไซต์หน่วยงาน อบจ. นครราชสีมา',
    'showcase.p1_desc': 'โครงการปรับปรุงและพัฒนาเว็บไซต์หน่วยงานในสังกัด อบจ. นครราชสีมา เพื่อยกระดับความทันสมัย เพิ่มประสิทธิภาพการเข้าถึงข้อมูลข่าวสารของประชาชน',
    'showcase.p2_title': 'Software QA & Bug Tracking System',
    'showcase.p2_desc': 'การจัดทำ Test Cases และกระบวนการทดสอบคุณภาพแอปพลิเคชันอย่างเป็นระบบ ณ บริษัท มีเมสเสจ จำกัด ป้องกัน Bug หลุดสู่ผู้ใช้งานจริง',
    'showcase.p3_title': 'Interactive Personal Portfolio',
    'showcase.p3_desc': 'เว็บไซต์แนะนำตัวและผลงานที่พัฒนาด้วย Modern Vanilla Web Stack, ระบบสลับธีม Dark/Light, ฟังก์ชันคัดลอกข้อมูล และพร้อมสั่งพิมพ์เป็นเรซูเม่',
    'showcase.btn_details': 'รายละเอียด',

    'contact.tag': '<i class="fa-regular fa-envelope"></i> ติดต่อสอบถาม',
    'contact.title': 'ร่วมงานหรือ<span class="gradient-text">ติดต่อฉัน</span>',
    'contact.desc': 'สามารถติดต่อได้โดยตรงทางโทรศัพท์ อีเมล หรือส่งข้อความผ่านแบบฟอร์มด้านล่าง',
    'contact.panel_title': 'ช่องทางการติดต่อตรง',
    'contact.panel_desc': 'ยินดีรับฟังทุกโอกาส ทั้งการฝึกงาน โครงการพัฒนาเว็บไซต์ หรืองานตรวจสอบคุณภาพซอฟต์แวร์ (Tester / QA)',
    'contact.lbl_phone': 'เบอร์โทรศัพท์',
    'contact.lbl_email': 'อีเมล',
    'contact.lbl_inst': 'สถาบันปัจจุบัน',
    'contact.btn_copy': 'คัดลอก',
    'contact.btn_call': 'โทรติดต่อทันที (095-603-8960)',
    'contact.btn_mail': 'ส่งอีเมลตรง (bnem1027@gmail.com)',
    'contact.form_title': 'ส่งข้อความถึงบีม',
    'contact.form_name': 'ชื่อของคุณ / ชื่อหน่วยงาน',
    'contact.form_name_ph': 'เช่น บจก. เทคโนโลยี / คุณสมชาย',
    'contact.form_email': 'อีเมลสำหรับติดต่อกลับ',
    'contact.form_msg': 'ข้อความ / รายละเอียดงาน',
    'contact.form_msg_ph': 'พิมพ์ข้อความที่ต้องการติดต่อ ข้อเสนอแนะ หรือรายละเอียดตำแหน่งงานที่นี่...',
    'contact.btn_send': 'ส่งข้อความ',

    'footer.inst': 'สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) มหาวิทยาลัยศรีปทุม (SPU)',
    'footer.rights': '© 2026 Phuwadol Leelanoi (BEEM). All Rights Reserved. Crafted with Modern Web Standards.',
    'footer.top': '<i class="fa-solid fa-arrow-up"></i> กลับขึ้นด้านบน',

    'toast.lang_switched': 'เปลี่ยนภาษาเป็น ภาษาไทย เรียบร้อยแล้ว',
    'toast.copied': 'คัดลอก {label} สำเร็จแล้ว!',
    'toast.form_empty': 'กรุณากรอกข้อมูลให้ครบถ้วนก่อนส่งข้อความ',
    'toast.form_sending': 'กำลังเตรียมเปิดโปรแกรมส่งอีเมลไปยัง bnem1027@gmail.com...',

    'modal.lbl_details': 'รายละเอียดและความรับผิดชอบ:',
    'modal.lbl_skills': 'เทคโนโลยีและทักษะที่ใช้:'
  },

  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.education': 'Education',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.showcase': 'Showcase',
    'nav.contact': 'Contact',
    'nav.contact_btn': 'Contact Me',

    'hero.status': 'Open to Tech / QA / Dev Opportunities',
    'hero.title': 'Poovadol Leelanoi, Beem <br><span class="gradient-text">Poovadol Leelanoi</span> (BEEM)',
    'hero.role_label': 'Role:',
    'hero.desc': 'Undergraduate student in Information and Communication Technology (ICT) at Sripatum University (SPU). Passionate about modern web development and Software Quality Assurance (QA) to build stable, user-centric digital experiences.',
    'hero.btn_exp': 'View Experience',
    'hero.btn_contact': 'Contact Now',
    'hero.btn_print': 'Print Resume',
    'hero.stat1_label': 'GPA Voc. Cert (Buriram Tech)',
    'hero.stat2_label': 'GPA High Voc. Cert (Korat Voc)',
    'hero.stat3_label': 'Age (Years) | Tech Enthusiast',
    'hero.badge1_title': 'Academic Excellence',
    'hero.badge1_sub': 'Highest GPA 3.88',
    'hero.badge2_title': 'Proven Experience',
    'hero.badge2_sub': 'Korat PAO & MeMessage',

    'about.tag': '<i class="fa-regular fa-user"></i> About Me',
    'about.title': 'About <span class="gradient-text">Me</span>',
    'about.desc': 'Get to know my background, dedication, and professional focus in technology.',
    'about.card1_title': 'Personal Overview',
    'about.lbl_name': 'Full Name',
    'about.val_name': 'Mr. Poovadol Leelanoi',
    'about.lbl_nick': 'Nickname',
    'about.val_nick': 'Beam (BEEM)',
    'about.lbl_age': 'Age',
    'about.val_age': '20 Years Old',
    'about.lbl_lang': 'Languages',
    'about.val_lang': 'Thai (Native) / English (Professional Working)',
    'about.lbl_edu': 'Current Studies',
    'about.val_edu': 'B.Sc. in ICT @ Sripatum University (SPU)',
    'about.lbl_focus': 'Career Focus',
    'about.val_focus': 'Web Dev & Software QA',
    'about.quote': '"Committed to engineering stable, aesthetic, and responsive web platforms, rigorously tested through quality assurance to deliver genuine value to end users."',
    'about.card2_title': 'Strengths & Career Focus',
    'about.str1_title': 'Web Development & Modern UI',
    'about.str1_desc': 'Direct experience maintaining and enhancing public-sector websites with clean architecture, responsive layouts, accessibility, and robust security.',
    'about.str2_title': 'Detail-Oriented QA & Testing',
    'about.str2_desc': 'Systematic bug hunting, test case execution, and regression testing for web and mobile applications to prevent flaws from reaching production.',
    'about.str3_title': 'Solid Academic Track Record',
    'about.str3_desc': 'Graduated Vocational Certificate with GPA 3.88 (Honors) and High Vocational Certificate with GPA 3.48 (Distinction), demonstrating discipline and rapid learning ability.',

    'edu.tag': '<i class="fa-solid fa-graduation-cap"></i> Education Journey',
    'edu.title': 'Educational <span class="gradient-text">Background</span>',
    'edu.desc': 'A progressive foundation from vocational mastery to tertiary computing studies.',
    'edu.item1_title': "Bachelor's Degree (In Progress)",
    'edu.item1_inst': 'Sripatum University (SPU)',
    'edu.item1_badge': '<i class="fa-solid fa-spinner fa-spin"></i> Present',
    'edu.item1_desc': '<strong>Information and Communication Technology (ICT)</strong> — Focuses on modern software and cloud web development, network architecture, cybersecurity, and applied digital business technologies.',
    'edu.item1_loc': '<i class="fa-solid fa-location-dot"></i> Bangkok, Thailand',
    'edu.item1_meta': '<i class="fa-solid fa-book-open"></i> ICT Department',
    'edu.item2_title': 'High Vocational Certificate (Diploma)',
    'edu.item2_inst': 'Nakhon Ratchasima Vocational College',
    'edu.item2_badge': '<i class="fa-solid fa-star"></i> GPA 3.48 (Distinction)',
    'edu.item2_desc': '<strong>Information Technology (IT)</strong> — Advanced vocational curriculum in computer science and web application development, database management, and on-site practical training at public government agencies.',
    'edu.item2_loc': '<i class="fa-solid fa-location-dot"></i> Nakhon Ratchasima, Thailand',
    'edu.item2_meta': '<i class="fa-solid fa-book-open"></i> Major: Information Technology (IT)',
    'edu.item2_gpa': '<i class="fa-solid fa-chart-line"></i> Cumulative GPA 3.48',
    'edu.item3_title': 'Vocational Certificate (Certificate)',
    'edu.item3_inst': 'Buriram Technical College',
    'edu.item3_badge': '<i class="fa-solid fa-trophy"></i> GPA 3.88 (Honors)',
    'edu.item3_desc': '<strong>Information Technology (IT)</strong> — Graduated with top academic honors, mastering computing fundamentals, networking, programming logic, and completing an industry Software QA internship.',
    'edu.item3_loc': '<i class="fa-solid fa-location-dot"></i> Buriram, Thailand',
    'edu.item3_meta': '<i class="fa-solid fa-book-open"></i> Major: Information Technology (IT)',
    'edu.item3_gpa': '<i class="fa-solid fa-award"></i> Cumulative GPA 3.88',

    'exp.tag': '<i class="fa-solid fa-briefcase"></i> Work Experience',
    'exp.title': 'Work & <span class="gradient-text">Internship Experience</span>',
    'exp.desc': 'Real-world expertise in government website maintenance and private-sector software quality assurance.',
    'exp.card1_period': '<i class="fa-regular fa-calendar"></i> High Voc. Internship',
    'exp.card1_role': 'Web Developer & Maintenance Intern',
    'exp.card1_org': '<i class="fa-solid fa-landmark"></i> Nakhon Ratchasima Provincial Administrative Organization (PAO)',
    'exp.card1_resp_title': 'Key Responsibilities & Deliverables:',
    'exp.card1_task1': '<strong>Website Upgrades & Maintenance:</strong> Maintained and modernised portal websites of agencies under Nakhon Ratchasima PAO for seamless public access.',
    'exp.card1_task2': '<strong>Responsive Web Design:</strong> Refactored and optimized web pages for full responsiveness across desktop, tablet, and mobile browsers.',
    'exp.card1_task3': '<strong>Information Systems Content:</strong> Managed public announcements, e-government service portals, and procurement notices per government standards.',
    'exp.card2_period': '<i class="fa-regular fa-calendar"></i> Vocational Internship',
    'exp.card2_role': 'Software QA / Tester Intern',
    'exp.card2_org': '<i class="fa-solid fa-building"></i> MeMessage Co., Ltd.',
    'exp.card2_resp_title': 'Key Responsibilities & Deliverables:',
    'exp.card2_task1': '<strong>Software Quality Assurance:</strong> Assigned as a dedicated Tester verifying software quality, UI/UX consistency, and application stability.',
    'exp.card2_task2': '<strong>Systematic Bug Hunting:</strong> Identified, diagnosed, and logged bugs across functional workflows and usability scenarios before production releases.',
    'exp.card2_task3': '<strong>Defect Reporting & Collaboration:</strong> Documented clear steps-to-reproduce and collaborated closely with the software engineering team for swift bug fixes.',

    'skills.tag': '<i class="fa-solid fa-screwdriver-wrench"></i> Competencies',
    'skills.title': 'Technical <span class="gradient-text">Skills</span>',
    'skills.desc': 'A balanced fusion of web engineering, software quality assurance, and modern developer tools.',
    'skills.filter_all': 'All Skills',
    'skills.filter_dev': 'Web Development',
    'skills.filter_qa': 'Software QA & Testing',
    'skills.filter_tools': 'Tools & Workflow',
    'skills.lvl_high': 'Advanced',
    'skills.lvl_good': 'Proficient',
    'skills.s1_desc': 'Semantic Markup, Accessibility, SEO Optimization',
    'skills.s2_desc': 'Flexbox, CSS Grid, Custom Design System, Media Queries',
    'skills.s3_desc': 'DOM Manipulation, Fetch API, Event Handling, Logic',
    'skills.s4_desc': 'Functional, Regression, Smoke Testing & App Verification',
    'skills.s5_desc': 'Test Scenarios Design, Accurate Steps to Reproduce & Tracking',
    'skills.s6_desc': 'Content Management, Performance Tuning & Web Uptime',
    'skills.s7_desc': 'Version Control, Branching, Pull Requests & Team Collaboration',
    'skills.s8_desc': 'Chrome DevTools, Network Inspection, Console Debugging',

    'showcase.tag': '<i class="fa-solid fa-cubes"></i> Featured Works',
    'showcase.title': 'Projects & <span class="gradient-text">Case Studies</span>',
    'showcase.desc': 'Practical projects demonstrating applied coding and testing capabilities.',
    'showcase.p1_title': 'Nakhon Ratchasima PAO Web Portal',
    'showcase.p1_desc': 'Web modernization and maintenance initiative for affiliated agencies under Nakhon Ratchasima Provincial Administrative Organization, enhancing public information accessibility.',
    'showcase.p2_title': 'Software QA & Bug Tracking System',
    'showcase.p2_desc': 'Systematic test case design and quality assurance procedures executed at MeMessage Co., Ltd. to prevent bugs from reaching end users.',
    'showcase.p3_title': 'Interactive Personal Portfolio',
    'showcase.p3_desc': 'Modern personal portfolio built with Vanilla HTML5/CSS3/ES6+, dark/light mode toggle, bilingual support, and print-ready CV formatting.',
    'showcase.btn_details': 'View Details',

    'contact.tag': '<i class="fa-regular fa-envelope"></i> Contact',
    'contact.title': "Let's <span class='gradient-text'>Connect</span>",
    'contact.desc': 'Feel free to reach out directly by phone, email, or by sending a message below.',
    'contact.panel_title': 'Direct Contact Info',
    'contact.panel_desc': 'Open to discussions regarding internships, Junior Web Developer, and QA/Software Tester positions.',
    'contact.lbl_phone': 'Phone Number',
    'contact.lbl_email': 'Email Address',
    'contact.lbl_inst': 'Current Institution',
    'contact.btn_copy': 'Copy',
    'contact.btn_call': 'Call Now (095-603-8960)',
    'contact.btn_mail': 'Send Email (bnem1027@gmail.com)',
    'contact.form_title': 'Send a Message to Beem',
    'contact.form_name': 'Your Name / Organization',
    'contact.form_name_ph': 'e.g. Tech Company Ltd. / HR Manager',
    'contact.form_email': 'Your Email Address',
    'contact.form_msg': 'Message / Project Details',
    'contact.form_msg_ph': 'Type your message, opportunity details, or feedback here...',
    'contact.btn_send': 'Send Message',

    'footer.inst': 'Information and Communication Technology (ICT), Sripatum University (SPU)',
    'footer.rights': '© 2026 Phuwadol Leelanoi (BEEM). All Rights Reserved. Crafted with Modern Web Standards.',
    'footer.top': '<i class="fa-solid fa-arrow-up"></i> Back to Top',

    'toast.lang_switched': 'Language switched to English successfully',
    'toast.copied': 'Copied {label} successfully!',
    'toast.form_empty': 'Please fill in all required fields before submitting.',
    'toast.form_sending': 'Opening your default email client to send to bnem1027@gmail.com...',

    'modal.lbl_details': 'Responsibilities & Highlights:',
    'modal.lbl_skills': 'Technologies & Skills Used:'
  }
};

/* -------------------------------------------------------------
 * 2. Language Switcher Logic
 * ------------------------------------------------------------- */
function initLanguage() {
  const langToggleBtn = document.getElementById('langToggleBtn');
  
  // Apply saved language on first load
  applyLanguage(currentLang, false);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'th' ? 'en' : 'th';
      localStorage.setItem('beam_portfolio_lang', currentLang);
      applyLanguage(currentLang, true);
    });
  }
}

function applyLanguage(lang, triggerToast = false) {
  document.documentElement.setAttribute('lang', lang);

  // Update navbar button badge
  const langBadge = document.getElementById('langBadge');
  if (langBadge) {
    if (lang === 'th') {
      langBadge.innerHTML = '<span class="lang-active">TH</span><span class="lang-divider">/</span><span class="lang-inactive">EN</span>';
    } else {
      langBadge.innerHTML = '<span class="lang-inactive">TH</span><span class="lang-divider">/</span><span class="lang-active">EN</span>';
    }
  }

  // Update all elements with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key] !== undefined) {
      el.innerHTML = i18n[lang][key];
    }
  });

  // Update input placeholders with data-i18n-placeholder
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (i18n[lang] && i18n[lang][key] !== undefined) {
      el.placeholder = i18n[lang][key];
    }
  });

  // Update titles with data-i18n-title
  const titles = document.querySelectorAll('[data-i18n-title]');
  titles.forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (i18n[lang] && i18n[lang][key] !== undefined) {
      el.title = i18n[lang][key];
    }
  });

  // Update document title
  document.title = (lang === 'en')
    ? 'Portfolio | Poovadol Leelanoi (BEEM)'
    : 'Portfolio | ภูวดล ลีลาน้อย (บีม)';

  // Update typing effect language roles
  updateTypingRoles(lang);

  // Show toast notification if triggered by click
  if (triggerToast) {
    showToast(i18n[lang]['toast.lang_switched']);
  }
}

/* -------------------------------------------------------------
 * 3. Theme Switcher (Dark / Light)
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
 * 4. Dynamic Typing Text Effect
 * ------------------------------------------------------------- */
const rolesDictionary = {
  th: [
    'Web Developer',
    'Software Tester / QA',
    'นักศึกษา ICT ม.ศรีปทุม',
    'Frontend Enthusiast'
  ],
  en: [
    'Web Developer',
    'Software QA / Tester',
    'ICT Student @ SPU',
    'Frontend Enthusiast'
  ]
};

let currentRoles = rolesDictionary[currentLang] || rolesDictionary.th;
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout = null;

function initTypingEffect() {
  const targetElement = document.getElementById('typedRoleText');
  if (!targetElement) return;

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseEnd = 1800;

  function type() {
    const currentRole = currentRoles[roleIndex % currentRoles.length];

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
      roleIndex = (roleIndex + 1) % currentRoles.length;
      delay = 400;
    }

    typingTimeout = setTimeout(type, delay);
  }

  type();
}

function updateTypingRoles(lang) {
  currentRoles = rolesDictionary[lang] || rolesDictionary.th;
  charIndex = 0;
  isDeleting = false;
}

/* -------------------------------------------------------------
 * 5. Sticky Navbar & Scroll Styling
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
 * 6. Mobile Menu Toggle
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
 * 7. Active Nav Link on Scroll
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
 * 8. Skill Category Filter
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
 * 9. Copy to Clipboard & Toast Notification
 * ------------------------------------------------------------- */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('.copy-trigger');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || textToCopy;

      const successTemplate = i18n[currentLang]['toast.copied'] || 'Copied {label} successfully!';
      const msg = successTemplate.replace('{label}', label);

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(msg);
        }).catch(() => {
          fallbackCopyText(textToCopy, msg);
        });
      } else {
        fallbackCopyText(textToCopy, msg);
      }
    });
  });
}

function fallbackCopyText(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (err) {
    showToast(`${text}`);
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
 * 10. Bilingual Project Modals & Details Preview
 * ------------------------------------------------------------- */
const projectData = {
  korat: {
    th: {
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
    en: {
      title: 'Nakhon Ratchasima PAO Web Portal Modernization',
      category: 'Web Development & Maintenance (High Voc.)',
      description: 'Vocational internship at Nakhon Ratchasima Provincial Administrative Organization, responsible for developing, maintaining, and enhancing agency web portals.',
      details: [
        'Refactored web architecture and modernised UI layouts for complete multi-device responsiveness (Responsive Web Design).',
        'Optimized page load speed and assets performance for reliable public constituent access.',
        'Audited and updated public relations content, procurement announcements, and government service databases.',
        'Collaborated directly with agency personnel to gather requirements and resolve tickets promptly.'
      ],
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'CMS Maintenance', 'Web Standards']
    }
  },
  memessage: {
    th: {
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
    en: {
      title: 'Software Quality Assurance & Bug Tracking Suite',
      category: 'Software Quality Assurance (Voc. Cert)',
      description: 'Vocational internship at MeMessage Co., Ltd. as a Software QA Tester, ensuring optimal product stability prior to client delivery.',
      details: [
        'Analyzed system requirement specifications and authored comprehensive Test Cases / Test Scenarios.',
        'Executed manual functional testing, usability testing, and regression suites across web and mobile applications.',
        'Discovered and documented defects with precise steps-to-reproduce, severity levels, and logs for engineering team resolution.',
        'Conducted bug verification runs and participated in final release sign-offs.'
      ],
      skills: ['Software QA', 'Manual Testing', 'Test Case Design', 'Bug Tracking', 'Regression Testing', 'Detail-Oriented']
    }
  },
  portfolio: {
    th: {
      title: 'Interactive Modern Web Portfolio',
      category: 'Personal Showcase & Modern Web Tech',
      description: 'เว็บไซต์พอร์ตโฟลิโอส่วนตัวที่ออกแบบและสร้างขึ้นเพื่อนำเสนอประวัติการศึกษา ประสบการณ์การทำงาน และผลงานด้านเทคโนโลยี',
      details: [
        'สร้างด้วย Modern Vanilla Web Stack (HTML5, Custom CSS3 Design System, Modular JavaScript)',
        'ระบบ Dark Mode / Light Mode พร้อมการบันทึกสถานะลงใน LocalStorage',
        'ระบบสลับ 2 ภาษา (ไทย / อังกฤษ) สมบูรณ์แบบทุกองค์ประกอบ',
        'ฟีเจอร์ Copy to Clipboard อัจฉริยะสำหรับเบอร์โทรศัพท์และอีเมล พร้อม Toast Feedback',
        'รองรับการสั่งพิมพ์เรซูเม่ (Print-to-PDF Resume Mode) อัตโนมัติด้วย CSS Media Print'
      ],
      skills: ['HTML5', 'CSS Variables', 'JavaScript ES6+', 'Bilingual (TH/EN)', 'Responsive Design', 'Print Styling']
    },
    en: {
      title: 'Interactive Modern Web Portfolio',
      category: 'Personal Showcase & Modern Web Tech',
      description: 'Personal web portfolio engineered to highlight educational milestones, work experience, and technical competencies.',
      details: [
        'Engineered with Modern Vanilla Web Stack (HTML5, Custom CSS3 Design System, Modular ES6+ JavaScript).',
        'Dark / Light mode toggle with persistent state saved in LocalStorage.',
        'Seamless bilingual localization system (Thai / English) covering all content modules.',
        'Smart Copy-to-Clipboard for telephone and email channels with animated toast feedback.',
        'Clean Print-to-PDF Resume stylesheet via CSS Media Print.'
      ],
      skills: ['HTML5', 'CSS Variables', 'JavaScript ES6+', 'Bilingual (TH/EN)', 'Responsive Design', 'Print Styling']
    }
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
      const projItem = projectData[projKey];
      if (!projItem) return;

      const data = projItem[currentLang] || projItem.th;

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
 * 11. Contact Form Interactive Handler
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
      showToast(i18n[currentLang]['toast.form_empty']);
      return;
    }

    const subject = encodeURIComponent((currentLang === 'en')
      ? `Contact from ${name} via Web Portfolio`
      : `ติดต่อจาก ${name} ผ่าน Portfolio`);

    const body = encodeURIComponent((currentLang === 'en')
      ? `Sender Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      : `ชื่อผู้ติดต่อ: ${name}\nอีเมล: ${email}\n\nข้อความ:\n${message}`);

    const mailtoUrl = `mailto:bnem1027@gmail.com?subject=${subject}&body=${body}`;

    showToast(i18n[currentLang]['toast.form_sending']);

    setTimeout(() => {
      window.location.href = mailtoUrl;
      form.reset();
    }, 1200);
  });
}
