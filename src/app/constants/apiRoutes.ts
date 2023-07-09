class account{
    public static login = "account/login";
    public static register = "account/register";
    public static resetPassword = "account/reset-password";
    public static updatePassword = "account/updatePassword";
    public static updateUser = "account/updateUser";
    public static getUsers = "account/getUsers";
    public static updateUserStatus = "account/updateUserStatus";
    public static deleteUser = "account/deleteUser";
    public static getCount = "account/getCount";

}
class banner {
    public static savebanner = "banner/saveBanner";
    public static getBanner = "banner/getBanner";

    public static getAllSidebar = "banner/getAllSidebar";
    public static saveUpdateSideBar = "banner/saveUpdateSideBar";
    public static deleteSidebar = "banner/deleteSidebar";

    public static getAllSubSidebar = "banner/getAllSubSidebar";
    public static saveUpdateSubSideBar = "banner/saveUpdateSubSideBar";
    public static deleteSubSidebar = "banner/deleteSubSidebar";
}

export class ApiUrls{
    public static banner = banner;
    public static account = account;
}