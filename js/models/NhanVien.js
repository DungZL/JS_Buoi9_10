function NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
) {
    this.taiKhoan = String(taiKhoan).trim();
    this.hoTen = String(hoTen).trim();
    this.email = String(email).trim();
    this.matKhau = String(matKhau).trim();
    this.ngayLam = String(ngayLam).trim();
    this.luongCB = Number(luongCB);
    this.chucVu = String(chucVu).trim();
    this.gioLam = Number(gioLam);

    // 5. Phương thức tính tổng lương
    this.tinhTongLuong = function () {
        var cv = this.chucVu.toLowerCase();
        if (cv === "sếp" || cv === "giám đốc") {
            return this.luongCB * 3;
        } else if (cv === "trưởng phòng") {
            return this.luongCB * 2;
        } else if (cv === "nhân viên") {
            return this.luongCB * 1;
        }
        return 0;
    };

    // 6. Phương thức xếp loại nhân viên
    this.xepLoai = function () {
        if (this.gioLam >= 192) {
            return "Xuất sắc";
        } else if (this.gioLam >= 176) {
            return "Giỏi";
        } else if (this.gioLam >= 160) {
            return "Khá";
        } else {
            return "Trung bình";
        }
    };
}

