# SEO Optimization Guide for HENG Bunkheang Portfolio

## ✅ Completed Optimizations

### 1. **Name Variations in Keywords**
Added all variations of your name to improve search visibility:
- HENG Bunkheang
- Bunkheang Heng
- Heng Bunkheang
- Bunkheang
- Kheang
- bunkheangheng
- hengbunkheang

### 2. **Schema.org Structured Data**
Enhanced JSON-LD structured data with:
- `alternateName` array containing all name variations
- `givenName` and `familyName` fields
- Enhanced image object with dimensions
- Nationality information (Cambodia)
- Language information (English, Khmer)
- Occupational category code
- Email contact

### 3. **Updated Domain**
Changed all URLs from `kheang-portfolio.vercel.app` to `bunkheangheng.site`:
- ✅ layout.tsx metadata
- ✅ robots.ts sitemap reference
- ✅ SEOStructuredData.tsx constants
- ✅ sitemap.ts (already correct)

### 4. **Enhanced Meta Tags**
- Added geographic keywords (Cambodia Developer, Cambodian Software Engineer)
- Improved OpenGraph tags
- Enhanced Twitter card metadata

### 5. **Manifest Updates**
Updated PWA manifest to include:
- Name with nickname: "HENG Bunkheang (Kheang)"
- Short name: "Bunkheang Heng"
- Additional categories

### 6. **humans.txt File**
Created `/public/humans.txt` with:
- All name variations
- Contact information
- Skills and technologies
- Social media links

---

## 🚀 Next Steps to Rank on Google

### Step 1: Google Search Console Setup
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://bunkheangheng.site`
3. Verify ownership using one of these methods:
   - **DNS Verification** (recommended)
   - HTML file upload
   - HTML tag (update verification code in layout.tsx line 86)
   - Google Analytics
   - Google Tag Manager

4. Submit your sitemap:
   ```
   https://bunkheangheng.site/sitemap.xml
   ```

### Step 2: Google My Business (Optional but Helpful)
1. Create a Google Business Profile
2. Use your name: "HENG Bunkheang - Full Stack Developer"
3. Add your website: `https://bunkheangheng.site`
4. This helps with local search and Knowledge Graph

### Step 3: Build Backlinks
Create profiles on these platforms (using consistent naming):
- ✅ GitHub: https://github.com/Bunkheang-heng
- ✅ LinkedIn: https://linkedin.com/in/bunkheangheng
- ✅ Twitter: @bunkheangheng
- [ ] Dev.to
- [ ] Medium
- [ ] Hashnode
- [ ] Stack Overflow
- [ ] Reddit (r/webdev)
- [ ] YouTube (if you create content)
- [ ] Crunchbase (developer profile)

### Step 4: Content Marketing
Write blog posts/articles about your projects:
1. Publish on Dev.to, Medium, Hashnode
2. Always link back to your portfolio
3. Use your full name in author bio
4. Include name variations naturally in content

### Step 5: Social Media Presence
Post regularly about your work:
- Share your projects
- Write technical threads
- Always mention your full name
- Link to `bunkheangheng.site`

### Step 6: Update Google Verification Code
In `src/app/layout.tsx` line 86, replace:
```typescript
verification: {
  google: 'your-google-verification-code',
},
```
With your actual Google Search Console verification code.

### Step 7: Monitor and Wait
- It takes 2-4 weeks for Google to index your site
- Check Google Search Console weekly
- Monitor which keywords drive traffic
- Update content based on performance

---

## 📊 How to Check Your Progress

### Immediate Checks (After Deployment):
1. **Google Structured Data Testing Tool**
   ```
   https://validator.schema.org/
   ```
   Enter: `https://bunkheangheng.site`

2. **Rich Results Test**
   ```
   https://search.google.com/test/rich-results
   ```
   Test your homepage URL

3. **Mobile-Friendly Test**
   ```
   https://search.google.com/test/mobile-friendly
   ```

### Weekly Checks:
1. Search Google for:
   - "HENG Bunkheang"
   - "Bunkheang Heng"
   - "bunkheangheng"
   - "Kheang developer"
   - "Heng Bunkheang portfolio"

2. Check Google Search Console:
   - Impressions
   - Clicks
   - Position
   - Coverage issues

3. Check site indexing:
   ```
   site:bunkheangheng.site
   ```
   In Google search

---

## 🎯 Expected Timeline

| Week | Expected Result |
|------|-----------------|
| 1    | Site submitted to Google Search Console |
| 2-3  | Initial indexing starts |
| 4-6  | Your name searches start showing results |
| 8-12 | Improved rankings as authority builds |
| 3-6 months | Top 3 results for name searches |

---

## 💡 Pro Tips

1. **Consistency is Key**
   - Use the same name format everywhere
   - Keep your profile URLs consistent
   - Always link back to bunkheangheng.site

2. **Natural Language**
   - Use name variations naturally in content
   - Don't keyword stuff
   - Write quality content

3. **Technical SEO**
   - Keep site speed fast (Next.js already helps)
   - Ensure mobile responsiveness
   - Maintain clean URLs
   - Fix any broken links

4. **Fresh Content**
   - Add new projects regularly
   - Update your skills
   - Add a blog section (optional)

5. **Local SEO**
   - Mention "Cambodia" in appropriate places
   - Use "Phnom Penh" in location references
   - This helps with local search

---

## 🔧 Technical Implementation Details

All changes are production-ready and include:

### Files Modified:
1. ✅ `src/app/layout.tsx` - Enhanced metadata and structured data
2. ✅ `src/app/components/SEOStructuredData.tsx` - Added name variations
3. ✅ `src/app/manifest.ts` - Updated PWA manifest
4. ✅ `src/app/robots.ts` - Updated sitemap URL

### Files Created:
1. ✅ `public/humans.txt` - Human-readable site info

### Already Optimized:
- ✅ sitemap.xml (via sitemap.ts)
- ✅ robots.txt (via robots.ts)
- ✅ OpenGraph tags
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Breadcrumb structured data

---

## 🎉 Summary

Your portfolio is now optimized for name-based searches! The structured data includes:
- All name variations in `alternateName` field
- Proper Person schema with complete information
- Keywords optimized for personal branding
- Consistent naming across all metadata

**Next action:** Deploy these changes and submit to Google Search Console!

---

## 📞 Need Help?

If you encounter any issues:
1. Check Google Search Console for errors
2. Use Schema Markup Validator
3. Test with Rich Results Tool
4. Monitor Core Web Vitals

Good luck! 🚀

