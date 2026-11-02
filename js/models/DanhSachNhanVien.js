function DanhSachNhanVien() {
    this.arrNV = [];

    // Thêm nhân viên
    this.themNV = function (nv) {
        this.arrNV.push(nv);
    };

    // Tìm vị trí nhân viên theo tài khoản
    this.timViTri = function (taiKhoan) {
        return this.arrNV.findIndex(function (nv) {
            return nv.taiKhoan === taiKhoan;
        });
    };

    // 7. Xóa nhân viên
    this.xoaNV = function (taiKhoan) {
        var index = this.timViTri(taiKhoan);
        if (index !== -1) {
            this.arrNV.splice(index, 1);
            return true;
        }
        return false;
    };

    // Lấy thông tin nhân viên theo tài khoản
    this.layThongTinNV = function (taiKhoan) {
        var index = this.timViTri(taiKhoan);
        if (index !== -1) {
            return this.arrNV[index];
        }
        return null;
    };

    // 8. Cập nhật nhân viên
    this.capNhatNV = function (nv) {
        var index = this.timViTri(nv.taiKhoan);
        if (index !== -1) {
            this.arrNV[index] = nv;
            return true;
        }
        return false;
    };

    // 9. Tìm nhân viên theo loại (xuất sắc, giỏi, khá, trung bình...)
    this.timKiemTheoLoai = function (tuKhoa) {
        var arrKetQua = [];
        var keyword = tuKhoa.trim().toLowerCase();

        this.arrNV.forEach(function (nv) {
            var loaiNV = nv.xepLoai().toLowerCase();
            if (loaiNV.indexOf(keyword) !== -1) {
                arrKetQua.push(nv);
            }
        });

        return arrKetQua;
    };
}

