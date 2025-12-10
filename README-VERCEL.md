# Hướng dẫn Deploy lên Vercel

## Các bước deploy

### 1. Chuẩn bị GitHub Repository
```bash
# Đảm bảo code đã được commit và push lên GitHub
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy trên Vercel

1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub account
3. Click **"Add New Project"**
4. Chọn repository của bạn
5. Cấu hình project:
   - **Framework Preset**: Không chọn (hoặc "Other")
   - **Root Directory**: `.` (root của project)
   - **Build Command**: `npm install && tsx script/build-vercel.ts`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`
6. Click **"Deploy"**

### 3. Cấu trúc đã được thiết lập

- ✅ **API Serverless Functions**: `api/esg-learning/*.ts`
  - `/api/esg-learning/topics` - Lấy danh sách topics
  - `/api/esg-learning/content` - Lấy nội dung docx

- ✅ **Frontend**: Vite app được build vào `dist/public`

- ✅ **Static Assets**: `attached_assets/` được include trong deployment

### 4. Environment Variables (nếu cần)

Nếu sau này cần thêm environment variables:
1. Vào Vercel Dashboard → Project Settings → Environment Variables
2. Thêm các biến cần thiết

### 5. Custom Domain (tùy chọn)

1. Vào Project Settings → Domains
2. Thêm domain của bạn
3. Follow instructions để cấu hình DNS

## Lưu ý

- Vercel sẽ tự động deploy mỗi khi bạn push code lên GitHub
- Serverless functions có timeout 30 giây (đã cấu hình trong `vercel.json`)
- File `.vercelignore` đã được tạo để loại trừ các file không cần thiết

## Troubleshooting

### Build fails
- Kiểm tra logs trong Vercel Dashboard
- Đảm bảo tất cả dependencies đã được cài đặt
- Kiểm tra Node version (Vercel tự động dùng Node 20)

### API không hoạt động
- Kiểm tra function logs trong Vercel Dashboard
- Đảm bảo file `attached_assets/ESGLearning/` có trong repository
- Kiểm tra đường dẫn file trong serverless functions

### Frontend không load
- Kiểm tra `outputDirectory` trong `vercel.json`
- Đảm bảo build output đúng với cấu hình Vite

