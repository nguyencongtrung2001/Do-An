export interface CreateOwner {
    ho_ten:string;
    email:string;
    so_dien_thoai:string;
    mat_khau:string;
    anh_cccd_truoc:string;
    anh_cccd_sau:string
}

export interface LoginOwner {
    so_dien_thoai:string;
    email:string;
    mat_khau:string;
}