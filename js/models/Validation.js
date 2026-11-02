function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (!value || value.trim() === "") {
            document.getElementById(errorId).innerHTML = mess;
            document.getElementById(errorId).style.display = "block";
            return false;
        }
        document.getElementById(errorId).innerHTML = "";
        document.getElementById(errorId).style.display = "none";
        return true;
    };

    // Tài khoản 4 - 6 ký số, không để trống
    this.kiemTraTaiKhoan = function (value, errorId, mess) {
        var pattern = /^[0-9]{4,6}$/;
        if (pattern.test(value)) {
            document.getElementById(errorId).innerHTML = "";
            document.getElementById(errorId).style.display = "none";
            return true;
        }
        document.getElementById(errorId).innerHTML = mess;
        document.getElementById(errorId).style.display = "block";
        return false;
    };

    // Kiểm tra trùng tài khoản (dành cho thêm mới)
    this.kiemTraTrungTaiKhoan = function (value, errorId, mess, dsnv) {
        var isExist = dsnv.some(function (nv) {
            return nv.taiKhoan === value.trim();
        });
        if (isExist) {
            document.getElementById(errorId).innerHTML = mess;
            document.getElementById(errorId).style.display = "block";
            return false;
        }
        document.getElementById(errorId).innerHTML = "";
        document.getElementById(errorId).style.display = "none";
        return true;
    };

    // Tên nhân viên phải là chữ, không để trống
    this.kiemTraTen = function (value, errorId, mess) {
        var pattern =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        var reg = new RegExp(pattern);
        if (reg.test(value)) {
            document.getElementById(errorId).innerHTML = "";
            document.getElementById(errorId).style.display = "none";
            return true;
        }
        document.getElementById(errorId).innerHTML = mess;
        document.getElementById(errorId).style.display = "block";
        return false;
    };

    // Email phải đúng định dạng, không để trống
    this.kiemTraEmail = function (value, errorId, mess) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (pattern.test(value)) {
            document.getElementById(errorId).innerHTML = "";
            document.getElementById(errorId).style.display = "none";
            return true;
        }
        document.getElementById(errorId).innerHTML = mess;
        document.getElementById(errorId).style.display = "block";
        return false;
    };

    // Mật khẩu từ 6-10 ký tự, chứa ít nhất 1 số, 1 in hoa, 1 ký tự đặc biệt
    this.kiemTraMatKhau = function (value, errorId, mess) {
        var pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,10}$/;
        if (pattern.test(value)) {
            document.getElementById(errorId).innerHTML = "";
            document.getElementById(errorId).style.display = "none";
            return true;
        }
        document.getElementById(errorId).innerHTML = mess;
        document.getElementById(errorId).style.display = "block";
        return false;
    };

    // Ngày làm không để trống, định dạng mm/dd/yyyy
    this.kiemTraNgayLam = function (value, errorId, mess) {
        var pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
        if (pattern.test(value)) {
            document.getElementById(errorId).innerHTML = "";
            document.getElementById(errorId).style.display = "none";
            return true;
        }
        document.getElementById(errorId).innerHTML = mess;
        document.getElementById(errorId).style.display = "block";
        return false;
    };

    // Lương cơ bản 1 000 000 - 20 000 000, không để trống
    this.kiemTraLuongCB = function (value, errorId, mess) {
        var num = Number(value);
        if (!isNaN(num) && num >= 1000000 && num <= 20000000) {
            document.getElementById(errorId).innerHTML = "";
            document.getElementById(errorId).style.display = "none";
            return true;
        }
        document.getElementById(errorId).innerHTML = mess;
        document.getElementById(errorId).style.display = "block";
        return false;
    };

    // Chức vụ phải chọn chức vụ hợp lệ (Giám đốc / Sếp, Trưởng Phòng, Nhân Viên)
    this.kiemTraChucVu = function (selectId, errorId, mess) {
        var selectElement = document.getElementById(selectId);
        var selectedValue = selectElement.value.trim().toLowerCase();
        if (selectedValue === "sếp" || selectedValue === "giám đốc" || selectedValue === "trưởng phòng" || selectedValue === "nhân viên") {
            document.getElementById(errorId).innerHTML = "";
            document.getElementById(errorId).style.display = "none";
            return true;
        }
        document.getElementById(errorId).innerHTML = mess;
        document.getElementById(errorId).style.display = "block";
        return false;
    };

    // Số giờ làm trong tháng 80 - 200 giờ, không để trống
    this.kiemTraGioLam = function (value, errorId, mess) {
        var num = Number(value);
        if (!isNaN(num) && num >= 80 && num <= 200) {
            document.getElementById(errorId).innerHTML = "";
            document.getElementById(errorId).style.display = "none";
            return true;
        }
        document.getElementById(errorId).innerHTML = mess;
        document.getElementById(errorId).style.display = "block";
        return false;
    };
}

