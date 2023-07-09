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
class pages{
    public static getPages = "pages/getPages";
    public static deletePages = "pages/deletePages";
    public static savePage = "pages/savePage";
    public static updatePage = "pages/updatePage";
    //our list
    public static getOurList = "pages/getOurList";
    public static saveOurLink = "pages/saveOurLink";
    public static updateOurList = "pages/updateOurList";
    //About us
    public static getAboutus = "pages/getAboutus";
    public static saveAboutus = "pages/saveAboutus";
    public static updateAboutus = "pages/updateAboutus";
    //Home
    public static getHome = "pages/getHome";
    public static saveHome = "pages/saveHome";
    public static updateHome = "pages/updateHome";

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
    public static pages = pages;
}