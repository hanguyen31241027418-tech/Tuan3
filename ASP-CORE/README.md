# Bài Tập Cá Nhân - ASP.NET Core MVC (Quản Lý Phim)

## 1. Mô tả dự án
- **Đề tài:** Website Quản lý Phim và Thể loại phim (Movie Management System).
- **Sinh viên thực hiện:** Nguyễn Thanh Hà — **MSSV:** `31241027418`
- **Tên Project / Namespace:** `_31241027418_NguyenThanhHa`
- **Mục tiêu:** Xây dựng ứng dụng web hoàn chỉnh theo mô hình MVC hỗ trợ quản lý danh mục phim, upload hình ảnh poster, tìm kiếm/lọc dữ liệu, phân quyền người dùng và triển khai thực tế lên hosting Somee.
- **Link website triển khai trực tuyến:** http://ptud31241027418.somee.com

## 2. Công nghệ sử dụng
- **Framework:** .NET 10 (`ASP.NET Core MVC`)
- **ORM & Cơ sở dữ liệu:** `Entity Framework Core`, `Microsoft SQL Server` (Hosting tại Somee Cloud)
- **Xác thực & Phân quyền:** `ASP.NET Core Identity` (Phân quyền `Admin` / `User`)
- **Giao diện (Frontend):** `Razor Views`, `HTML5`, `CSS3`, `Bootstrap 5`
- **Công cụ phát triển:** Visual Studio Code, C# Dev Kit, Git / GitHub

## 3. Chức năng chính
- **Quản lý Thể loại (`Genres`) và Phim (`Movies`):** Thực hiện đầy đủ các thao tác Thêm, Xem chi tiết, Cập nhật, Xóa (CRUD) với kiểm tra hợp lệ dữ liệu đầu vào (`Data Annotations`).
- **Quản lý hình ảnh:** Upload file poster phim lưu trữ vào `wwwroot/images`, tự động hiển thị ảnh mặc định khi chưa có ảnh và cập nhật/thay thế ảnh khi chỉnh sửa.
- **Tìm kiếm và lọc:** Tìm kiếm phim theo từ khóa tiêu đề kết hợp lọc theo thể loại phim.
- **Xác thực và phân quyền:** Đăng ký, đăng nhập tài khoản; khách vãng lai chỉ được xem danh sách, tài khoản có quyền `Admin` mới được phép thêm/sửa/xóa dữ liệu.

## 4. Cấu trúc thư mục
```text
ASP-CORE/
├── README.md                                  # Tài liệu mô tả và hướng dẫn dự án
└── SourceCode/
    └── 31241027418_NguyenThanhHa/
        ├── Areas/                             # Giao diện Identity (Đăng nhập, Đăng ký)
        ├── Controllers/                       # Xử lý nghiệp vụ (Home, Movies, Genres)
        ├── Data/                              # ApplicationDbContext cấu hình EF Core
        ├── Migrations/                        # Lịch sử khởi tạo và cập nhật bảng SQL
        ├── Models/                            # Các lớp thực thể (Movie, Genre, ViewModel)
        ├── Properties/                        # Cấu hình khởi chạy launchSettings.json
        ├── Views/                             # Giao diện Razor Views (.cshtml)
        ├── wwwroot/                           # Tài nguyên tĩnh (CSS, JS, thư mục images)
        ├── appsettings.json                   # Cấu hình chuỗi kết nối cơ sở dữ liệu
        ├── Program.cs                         # Cấu hình dịch vụ và pipeline ứng dụng
        └── 31241027418_NguyenThanhHa.csproj   # File cấu hình dự án và gói thư viện NuGet
```

## 5. Hướng dẫn chạy dự án
1. **Mở thư mục mã nguồn:**
   Mở Terminal tại đường dẫn `ASP-CORE/SourceCode/31241027418_NguyenThanhHa`.
2. **Cấu hình chuỗi kết nối cơ sở dữ liệu:**
   Mở file `appsettings.json` và cập nhật thông tin `DefaultConnection` trỏ tới SQL Server của bạn.
3. **Khôi phục gói thư viện và cập nhật Database:**
   ```bash
   dotnet restore
   dotnet ef database update
   ```
4. **Khởi chạy ứng dụng:**
   ```bash
   dotnet run
   ```
   Truy cập trình duyệt tại địa chỉ `https://localhost:<port>` (hiển thị trên Terminal) hoặc xem trực tiếp bản triển khai online tại: http://ptud31241027418.somee.com