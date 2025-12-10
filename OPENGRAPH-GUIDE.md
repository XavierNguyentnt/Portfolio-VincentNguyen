# Hướng dẫn tạo OpenGraph Image mới

## Vấn đề
File `opengraph.jpg` hiện tại vẫn chứa logo Replit, khiến khi share link trên social media vẫn hiển thị branding Replit.

## Giải pháp

### Cách 1: Sử dụng file HTML generator (Đơn giản nhất)

1. Mở file `client/public/generate-opengraph.html` trong trình duyệt
2. Scroll xuống phần preview
3. Chụp màn hình phần preview (kích thước 1200x630px)
4. Lưu file với tên `opengraph.jpg` vào thư mục `client/public/`
5. Xóa file `generate-opengraph.html` sau khi xong

### Cách 2: Sử dụng công cụ online (Khuyên dùng)

#### Option A: Canva (Miễn phí)
1. Truy cập [Canva.com](https://www.canva.com)
2. Tạo design mới với kích thước **1200 x 630px** (Facebook Post size)
3. Thiết kế với:
   - Background: Gradient từ #2E7D32 (ESG Green) đến #1976D2 (ESG Blue)
   - Title: "Nguyen Viet Vinh" (font lớn, đậm, màu trắng)
   - Subtitle: "ESG Officer & CSR Compliance Specialist"
   - Description: "Committed to sustainable value creation..."
4. Download với tên `opengraph.jpg`
5. Đặt vào `client/public/opengraph.jpg`

#### Option B: Figma (Miễn phí)
1. Truy cập [Figma.com](https://www.figma.com)
2. Tạo frame mới 1200x630px
3. Thiết kế tương tự như trên
4. Export với format JPG, quality 90%
5. Đặt vào `client/public/opengraph.jpg`

#### Option C: Photoshop/GIMP
1. Tạo canvas mới 1200x630px
2. Thiết kế theo ý bạn
3. Export với tên `opengraph.jpg`
4. Đặt vào `client/public/opengraph.jpg`

### Cách 3: Sử dụng profile photo hiện có

Nếu bạn muốn đơn giản, có thể:
1. Mở `client/public/profile-photo.jpg`
2. Resize về 1200x630px
3. Thêm text overlay nếu cần
4. Lưu với tên `opengraph.jpg`

## Kích thước chuẩn

- **Facebook/LinkedIn**: 1200 x 630px
- **Twitter**: 1200 x 675px (nhưng 1200x630 cũng hoạt động tốt)
- **Format**: JPG hoặc PNG
- **File size**: Nên < 1MB để load nhanh

## Sau khi tạo xong

1. Thay thế file `client/public/opengraph.jpg` cũ
2. Commit và push lên GitHub
3. Vercel sẽ tự động deploy lại
4. **Quan trọng**: Clear cache của social media platforms:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

## Lưu ý

- Social media platforms cache OpenGraph images, nên sau khi deploy mới, bạn cần clear cache để thấy thay đổi
- Đảm bảo file có kích thước đúng để hiển thị đẹp trên mọi platform
- Nên test trên các platform khác nhau để đảm bảo hiển thị đúng

