//--------- Quản lý tuyển sinh-------
function tinhDiem (mon1,mon2,mon3,kv,dt){
    return mon1 + mon2 + mon3 + kv + dt;
}
function kqDiem(tongDiem,diemChuan){
    return tongDiem >= diemChuan ? true : false;
}

function ktDiem(){
    var diemChuan = Number(document.getElementById("diemChuan").value);
    var kv = Number(document.getElementById("khuVuc").value);
    var dt = Number(document.getElementById("doiTuong").value);
    var mon1 = Number(document.getElementById("diemMon1").value);
    var mon2 = Number(document.getElementById("diemMon2").value);
    var mon3 = Number(document.getElementById("diemMon3").value);
    
    var tongDiem = tinhDiem (mon1,mon2,mon3,kv,dt);
    var isPass = true;

    if(mon1 == 0 || mon2 == 0 || mon3 == 0){
        isPass = false;
    }else{
        isPass = kqDiem(tongDiem,diemChuan);
    }

    var stringIsPass = (isPass == true) ? "đậu" : "rớt";
    document.getElementById("txtResult").innerHTML = "Bạn đã "+stringIsPass+ ". Tổng điểm: "+tongDiem;
}
document.getElementById("btnResult").onclick = ktDiem;


 

//---------- Tính tiền điện ----------
const kw50 = 500;
const kw51_100 = 650;
const kw101_200  = 850;
const kw201_350 = 1100;
const kw351 = 1300;

function tienDien(){
    var kw = Number(document.getElementById("soKW").value);
    var hoTen = document.getElementById("hoTen").value;
    var total = 0;
    if(0 < kw && kw <= 50){
        total = kw * kw50;
    }else if(50 < kw && kw <= 100){
        total = 25000 + (kw -50) * kw51_100;
    }else if(100 < kw && kw <= 200){
        total = 25000 + 50 * 650 + (kw - 100) * kw101_200;
    }else if(200 < kw && kw <=350){
        total =25000 + 50 * 650 + 100 * 850 + (kw - 200) * kw201_350;
    }else if(kw > 350){
        total =25000 + 50 * 650 + 100 * 850 + 150 * 1100 + (kw - 350) + kw351;
    }else{
        console.log("Số kw không hợp lệ")
    }
    document.getElementById("txtKW").innerHTML = "Họ tên: "+hoTen+ " - "+ "Tiền điện: "+ new Intl.NumberFormat().format(total);
}
document.getElementById("btnKW").onclick = tienDien;

//----------Tính tiền thuế------------
const tn60 = 0.05;
const tn60_120 = 0.1;
const tn120_210 = 0.15;
const tn210_384 = 0.2;
const tn384_624 = 0.25;
const tn624_960 = 0.3;
const tn960 = 0.35;

function tienThue(){
    var hoTen = document.getElementById("name1").value;
    var tongTN = Number(document.getElementById("tongThuNhap").value);
    var soNgPT = Number(document.getElementById("soNgPT").value);
    var tienChiuThue = tongTN - 4e+6 - soNgPT * 1.6e+6;
    var total = 0;
    if(0 < tienChiuThue && tienChiuThue <= 60e+6){
        total = tienChiuThue * tn60;
    }else if(60e+6 < tienChiuThue && tienChiuThue <= 120e+6){
        total = tienChiuThue * tn60_120;
    }else if(120e+6 < tienChiuThue && tienChiuThue <= 210e+6){
        total = tienChiuThue * tn120_210;
    }else if(210e+6 < tienChiuThue && tienChiuThue <= 384e+6){
        total = tienChiuThue * tn210_384;
    }else if(382e+6 < tienChiuThue && tienChiuThue <= 624e+6){
        total = tienChiuThue * tn384_624;
    }else if(624e+6 < tienChiuThue && tienChiuThue <= 960e+6){
        total = tienChiuThue * tn624_960;
    }else if(960e+6 < tienChiuThue){
        total = tienChiuThue * tn960;
    }else{
        console.log("Số tiền không đúng!");
    }
    document.getElementById("txtTienThue").innerHTML = "Họ tên: "+ hoTen+ " - "+ "Tiền thuế thu nhập cá nhân: "+ new Intl.NumberFormat().format(total) + " VND";
}
document.getElementById("btnTienThue").onclick = tienThue;
//---------Tính tiền cáp----------

function tinhTienNhaDan(soKenhCaoCap){
    var phiXuLyHD = 4.5, phiDichVuCB = 20.5, thueKenhCC = 7.5;
    return phiXuLyHD + phiDichVuCB + (thueKenhCC * soKenhCaoCap);
}
function tinhTienDoanhNghiep(soKenhCaoCap, soKetNoi){
    var phiXuLyHD = 15, phiDichVuCB = 75, thueKenhCC = 50;
    var tempSoKetNoi = 0;
    if(soKetNoi > 10) phiDichVuCB += (soKetNoi - 10) * 5;
    return phiDichVuCB + phiXuLyHD + (thueKenhCC * soKenhCaoCap);
}
function tinhTienCap(loaiKhachHang, soKenhCaoCap, soKetNoi){
    if(loaiKhachHang == 1){
        return tinhTienNhaDan(soKenhCaoCap);
    }
    return tinhTienDoanhNghiep(soKenhCaoCap, soKetNoi);
}
function tienCap(){
    var loaiKhachHang = Number(document.getElementById("khachHang").value);
    var maKH = document.getElementById("name01").value;
    var soKenhCaoCap = Number(document.getElementById("soKenhCaoCap").value);
    var soKetNoi = Number(document.getElementById("soKetNoi").value);

    var ketQua = tinhTienCap(loaiKhachHang, soKenhCaoCap, soKetNoi);
    if(loaiKhachHang == 0) ketQua = 0;
    document.getElementById("txtTienCap").innerHTML = "Mã khách hàng: " + maKH + "; Tiền cáp: "+ketQua+" $";
}
document.getElementById("btnTienCap").onclick = tienCap;

function showKetNoi(loaiKhachHang){
    var style = (loaiKhachHang == 1) ? 'none' : 'block';
    document.getElementById("soKetNoi").style.display = style;
}
document.getElementById("khachHang").onchange = function(){
    var loaiKhachHang = Number(document.getElementById("khachHang").value);
    showKetNoi(loaiKhachHang)
};
document.getElementById("txtTienCap").disabled = true;



