# 🚀 Hướng dẫn Deploy lên Vercel

## ✅ Đã hoàn thành

Tất cả các file cần thiết đã được tạo:
- ✅ `api/esg-learning/topics.ts` - API endpoint cho topics
- ✅ `api/esg-learning/content.ts` - API endpoint cho content  
- ✅ `vercel.json` - Cấu hình Vercel
- ✅ `script/build-vercel.ts` - Script build cho Vercel
- ✅ `.vercelignore` - File ignore cho Vercel

## 📋 Các bước deploy

### Bước 1: Push code lên GitHub
```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### Bước 2: Deploy trên Vercel

1. **Truy cập**: https://vercel.com
2. **Đăng nhập** bằng GitHub
3. **Click "Add New Project"**
4. **Import** repository của bạn
5. **Cấu hình** (Vercel sẽ tự động detect, nhưng bạn có thể kiểm tra):
   - **Framework Preset**: Other
   - **Root Directory**: `.` (root)
   - **Build Command**: `npm install && tsx script/build-vercel.ts`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`
6. **Click "Deploy"**

### Bước 3: Chờ deploy hoàn tất

Vercel sẽ:
- Cài đặt dependencies
- Build frontend (Vite)
- Deploy serverless functions
- Deploy static files

### Bước 4: Kiểm tra

Sau khi deploy xong, bạn sẽ có URL như: `https://your-project.vercel.app`

Kiểm tra:
- ✅ Trang chủ load được
- ✅ API `/api/esg-learning/topics` trả về JSON
- ✅ Carousel hiển thị nội dung

## 🔄 Auto Deploy

Vercel sẽ tự động deploy mỗi khi bạn:
- Push code lên branch `main` (hoặc branch bạn đã cấu hình)
- Merge Pull Request

## 📝 Lưu ý quan trọng

1. **File size**: Đảm bảo `attached_assets/` không quá lớn (Vercel có giới hạn)
2. **Timeout**: Serverless functions có timeout 30 giây (đã cấu hình)
3. **Environment**: Không cần environment variables cho deployment này

## 🐛 Troubleshooting

### Build fails
- Kiểm tra logs trong Vercel Dashboard
- Đảm bảo Node version đúng (Vercel dùng Node 20)

### API không hoạt động
- Kiểm tra function logs
- Đảm bảo `attached_assets/ESGLearning/` có trong repo

### Frontend không load
- Kiểm tra `outputDirectory` trong `vercel.json`
- Xem build logs để tìm lỗi

## 🎉 Hoàn thành!

Sau khi deploy thành công, bạn có thể:
- Share URL với mọi người
- Thêm custom domain (miễn phí)
- Xem analytics và logs

