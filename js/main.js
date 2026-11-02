// Khởi tạo các đối tượng dùng chung
var dsnv = new DanhSachNhanVien();
var validation = new Validation();

// Lấy danh sách từ LocalStorage khi khởi động
layLocalStorage();

// Helper lấy Element theo ID
function getEle(id) {
    return document.getElementById(id);
}

// Hàm format tiền tệ VND
function formatCurrency(number) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
    }).format(number);
}

// Xóa trắng thông báo lỗi
function resetThongBao() {
    var spans = document.querySelectorAll(".sp-thongbao");
    spans.forEach(function (span) {
        span.innerHTML = "";
        span.style.display = "none";
    });
}

// Reset form nhập liệu
function resetForm() {
    getEle("tknv").value = "";
    getEle("name").value = "";
    getEle("email").value = "";
    getEle("password").value = "";
    getEle("chucvu").selectedIndex = 0;
    getEle("luongCB").value = "";
    getEle("gioLam").value = "";

    // Set ngày hiện tại vào datepicker
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output =
        (("" + month).length < 2 ? "0" : "") +
        month +
        "/" +
        (("" + day).length < 2 ? "0" : "") +
        day +
        "/" +
        d.getFullYear();
    getEle("datepicker").value = output;

    resetThongBao();
}

// Lắng nghe nút "Thêm nhân viên" trên header để mở modal thêm mới
getEle("btnThem").addEventListener("click", function () {
    resetForm();
    getEle("header-title").innerHTML = "Thêm nhân viên";
    getEle("tknv").disabled = false;
    getEle("btnThemNV").style.display = "inline-block";
    getEle("btnCapNhat").style.display = "none";
});

// Hàm lấy thông tin từ form & thực hiện validation (Mục 3 & 4)
function layThongTinForm(isThem) {
    var taiKhoan = getEle("tknv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCB = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value;

    var isValid = true;

    // 1. Validate Tài khoản: 4 - 6 ký số, không để trống
    if (isThem) {
        isValid &=
            validation.kiemTraRong(taiKhoan, "tbTKNV", "(*) Tài khoản không được để trống") &&
            validation.kiemTraTaiKhoan(taiKhoan, "tbTKNV", "(*) Tài khoản phải từ 4 - 6 ký số") &&
            validation.kiemTraTrungTaiKhoan(taiKhoan, "tbTKNV", "(*) Tài khoản đã tồn tại", dsnv.arrNV);
    } else {
        isValid &=
            validation.kiemTraRong(taiKhoan, "tbTKNV", "(*) Tài khoản không được để trống") &&
            validation.kiemTraTaiKhoan(taiKhoan, "tbTKNV", "(*) Tài khoản phải từ 4 - 6 ký số");
    }

    // 2. Validate Tên nhân viên: phải là chữ, không để trống
    isValid &=
        validation.kiemTraRong(hoTen, "tbTen", "(*) Tên nhân viên không được để trống") &&
        validation.kiemTraTen(hoTen, "tbTen", "(*) Tên nhân viên phải là chữ");

    // 3. Validate Email: đúng định dạng, không để trống
    isValid &=
        validation.kiemTraRong(email, "tbEmail", "(*) Email không được để trống") &&
        validation.kiemTraEmail(email, "tbEmail", "(*) Email không đúng định dạng (VD: example@gmail.com)");

    // 4. Validate Mật khẩu: 6-10 ký tự, ít nhất 1 số, 1 ký tự hoa, 1 ký tự đặc biệt, không để trống
    isValid &=
        validation.kiemTraRong(matKhau, "tbMatKhau", "(*) Mật khẩu không được để trống") &&
        validation.kiemTraMatKhau(
            matKhau,
            "tbMatKhau",
            "(*) Mật khẩu 6-10 ký tự (chứa ít nhất 1 số, 1 chữ hoa, 1 ký tự đặc biệt)"
        );

    // 5. Validate Ngày làm: không để trống, định dạng mm/dd/yyyy
    isValid &=
        validation.kiemTraRong(ngayLam, "tbNgay", "(*) Ngày làm không được để trống") &&
        validation.kiemTraNgayLam(ngayLam, "tbNgay", "(*) Ngày làm phải theo định dạng mm/dd/yyyy");

    // 6. Validate Lương cơ bản: 1 000 000 - 20 000 000, không để trống
    isValid &=
        validation.kiemTraRong(luongCB, "tbLuongCB", "(*) Lương cơ bản không được để trống") &&
        validation.kiemTraLuongCB(
            luongCB,
            "tbLuongCB",
            "(*) Lương cơ bản từ 1,000,000 đến 20,000,000"
        );

    // 7. Validate Chức vụ: Giám đốc (Sếp), Trưởng Phòng, Nhân Viên
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "(*) Vui lòng chọn chức vụ hợp lệ");

    // 8. Validate Giờ làm: 80 - 200 giờ, không để trống
    isValid &=
        validation.kiemTraRong(gioLam, "tbGiolam", "(*) Giờ làm không được để trống") &&
        validation.kiemTraGioLam(gioLam, "tbGiolam", "(*) Số giờ làm phải từ 80 đến 200 giờ");

    if (isValid) {
        return new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);
    }
    return null;
}

// 1. In ra table danh sách nhân viên
function renderTable(arr) {
    var content = "";
    if (!arr || arr.length === 0) {
        content = `<tr><td colspan="8" class="text-center">Không có dữ liệu nhân viên</td></tr>`;
        getEle("tableDanhSach").innerHTML = content;
        return;
    }

    arr.forEach(function (nv) {
        content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${formatCurrency(nv.tinhTongLuong())}</td>
                <td>${nv.xepLoai()}</td>
                <td>
                    <button class="btn btn-warning btn-sm mr-1" data-toggle="modal" data-target="#myModal" onclick="chinhSuaNV('${nv.taiKhoan}')">
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="xoaNhanVien('${nv.taiKhoan}')">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    getEle("tableDanhSach").innerHTML = content;
}

// 2. Thêm nhân viên mới
getEle("btnThemNV").addEventListener("click", function () {
    var nv = layThongTinForm(true);
    if (nv) {
        dsnv.themNV(nv);
        renderTable(dsnv.arrNV);
        luuLocalStorage();
        // Đóng modal sau khi thêm thành công
        $("#myModal").modal("hide");
    }
});

// 7. Xóa nhân viên
function xoaNhanVien(taiKhoan) {
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên tài khoản: " + taiKhoan + " không?")) {
        dsnv.xoaNV(taiKhoan);
        renderTable(dsnv.arrNV);
        luuLocalStorage();
    }
}

// Chuẩn bị form để cập nhật (Chỉnh sửa)
function chinhSuaNV(taiKhoan) {
    resetThongBao();
    var nv = dsnv.layThongTinNV(taiKhoan);
    if (nv) {
        getEle("tknv").value = nv.taiKhoan;
        getEle("tknv").disabled = true; // Khóa tài khoản không cho chỉnh sửa

        getEle("name").value = nv.hoTen;
        getEle("email").value = nv.email;
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCB;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;

        getEle("header-title").innerHTML = "Cập nhật nhân viên";
        getEle("btnThemNV").style.display = "none";
        getEle("btnCapNhat").style.display = "inline-block";
    }
}

// 8. Cập nhật nhân viên (có validation)
getEle("btnCapNhat").addEventListener("click", function () {
    var nv = layThongTinForm(false);
    if (nv) {
        dsnv.capNhatNV(nv);
        renderTable(dsnv.arrNV);
        luuLocalStorage();
        // Đóng modal sau khi cập nhật thành công
        $("#myModal").modal("hide");
    }
});

// 9. Tìm Nhân Viên theo loại (xuất sắc, giỏi, khá, trung bình) và hiển thị
function handleSearch() {
    var tuKhoa = getEle("searchName").value;
    var arrKetQua = dsnv.timKiemTheoLoai(tuKhoa);
    renderTable(arrKetQua);
}

getEle("btnTimNV").addEventListener("click", handleSearch);
getEle("searchName").addEventListener("keyup", handleSearch);

// Lưu vào LocalStorage
function luuLocalStorage() {
    var strJSON = JSON.stringify(dsnv.arrNV);
    localStorage.setItem("DSNV", strJSON);
}

// Khôi phục từ LocalStorage
function layLocalStorage() {
    var strJSON = localStorage.getItem("DSNV");
    if (strJSON) {
        var arrParsed = JSON.parse(strJSON);
        // Khôi phục lại đối tượng NhanVien để giữ các method tinhTongLuong, xepLoai
        dsnv.arrNV = arrParsed.map(function (item) {
            return new NhanVien(
                item.taiKhoan,
                item.hoTen,
                item.email,
                item.matKhau,
                item.ngayLam,
                item.luongCB,
                item.chucVu,
                item.gioLam
            );
        });
        renderTable(dsnv.arrNV);
    }
}

