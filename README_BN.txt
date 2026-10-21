Qubixa AI — DeepSeek API Website
================================

এই প্রজেক্টে আছে:
- Responsive AI chat UI
- DeepSeek Chat API integration
- DeepThink mode (deepseek-reasoner মডেল)
- Chat history (এই ব্রাউজারের localStorage-এ)
- Copy / Regenerate
- Mobile sidebar
- Vercel serverless API route
- API key HTML/JavaScript-এ রাখা হয়নি

Vercel-এ প্রকাশ করার সহজ নিয়ম:
1. ZIP ফাইলটি Extract করুন।
2. ফোল্ডারের সব ফাইল GitHub repository-তে Upload করুন। public/index.html, api/chat.js এবং vercel.json যেন একই root folder-এ থাকে।
3. Vercel-এ ওই GitHub repository Import করুন এবং Deploy দিন।
4. Vercel Project → Settings → Environment Variables-এ যান।
5. api/chat.js ফাইলে 🇧🇩 বাংলাদেশ পতাকা-সহ কমেন্টটি দেখানো আছে—এটাই API Key সেটআপের নির্দেশনা।
6. Name: DEEPSEEK_API_KEY
   Value: DeepSeek Platform-এ তৈরি করা আপনার API key
7. Production, Preview (যদি দরকার হয়) নির্বাচন করে Save করুন।
7. Deployments থেকে সর্বশেষ deployment-এ Redeploy দিন।

DeepSeek API Key:
https://platform.deepseek.com/

গুরুত্বপূর্ণ:
- API Key কাউকে পাঠাবেন না এবং public HTML/JavaScript-এ বসাবেন না।
- API ব্যবহারে আপনার DeepSeek account-এর balance, billing এবং rate limits প্রযোজ্য।
- DeepThink-এর জন্য deepseek-reasoner model access প্রয়োজন।
- Chat history শুধু একই browser/device-এ সংরক্ষিত; এটি cloud sync নয়।
- File upload button বর্তমানে UI preview; PDF/file parsing backend যোগ করা হয়নি।
- Live web search, image generation, voice chat এই ZIP-এ সংযুক্ত নয়।
- Vercel-এর API route কাজ করার জন্য project-টি Vercel-এ deploy করতে হবে; শুধু index.html ফাইল খুললে API কাজ করবে না।
