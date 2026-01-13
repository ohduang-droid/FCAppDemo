const { chromium } = require('playwright');

async function fetchAdvisors() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('https://www.briggsfreeman.com/our-agents/', { waitUntil: 'networkidle' });
    
    // 等待页面加载
    await page.waitForTimeout(3000);
    
    // 获取筛选选项
    const filters = {
      offices: await page.evaluate(() => {
        const officeSelect = document.querySelector('select[name*="office"], select[id*="office"]');
        if (!officeSelect) return [];
        return Array.from(officeSelect.options).map(opt => ({
          value: opt.value,
          text: opt.textContent.trim()
        }));
      }),
      languages: await page.evaluate(() => {
        const langSelect = document.querySelector('select[name*="language"], select[id*="language"]');
        if (!langSelect) return [];
        return Array.from(langSelect.options).map(opt => ({
          value: opt.value,
          text: opt.textContent.trim()
        }));
      }),
      specialties: await page.evaluate(() => {
        const specSelect = document.querySelector('select[name*="specialty"], select[id*="specialty"]');
        if (!specSelect) return [];
        return Array.from(specSelect.options).map(opt => ({
          value: opt.value,
          text: opt.textContent.trim()
        }));
      })
    };
    
    // 获取顾问列表
    const advisors = await page.evaluate(() => {
      const advisorCards = document.querySelectorAll('.agent-card, .advisor-card, [class*="agent"], [class*="advisor"]');
      const results = [];
      
      advisorCards.forEach((card, index) => {
        const name = card.querySelector('h2, h3, [class*="name"]')?.textContent?.trim() || '';
        const title = card.querySelector('[class*="title"], [class*="position"]')?.textContent?.trim() || '';
        const image = card.querySelector('img')?.src || '';
        const phone = card.querySelector('[class*="phone"]')?.textContent?.trim() || '';
        const email = card.querySelector('[class*="email"]')?.textContent?.trim() || '';
        const office = card.querySelector('[class*="office"]')?.textContent?.trim() || '';
        
        if (name) {
          results.push({ name, title, image, phone, email, office });
        }
      });
      
      return results;
    });
    
    // 如果上面的选择器没找到，尝试其他方式
    if (advisors.length === 0) {
      const allAdvisors = await page.evaluate(() => {
        // 尝试查找所有可能的顾问卡片
        const cards = document.querySelectorAll('article, .card, [class*="agent"], [class*="advisor"], [class*="person"]');
        const results = [];
        
        cards.forEach(card => {
          const text = card.textContent || '';
          if (text.length > 50 && text.length < 500) {
            const nameMatch = text.match(/([A-Z][a-z]+ [A-Z][a-z]+)/);
            if (nameMatch) {
              const name = nameMatch[1];
              const image = card.querySelector('img')?.src || '';
              results.push({ name, image, rawText: text.substring(0, 200) });
            }
          }
        });
        
        return results;
      });
      
      console.log('Found advisors:', allAdvisors.length);
      console.log(JSON.stringify({ filters, advisors: allAdvisors }, null, 2));
    } else {
      console.log(JSON.stringify({ filters, advisors }, null, 2));
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

fetchAdvisors();
