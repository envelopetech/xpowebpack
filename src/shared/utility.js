import base64 from 'base-64';
import utf8 from 'utf8';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import DeleteConfirmation from '../components/UI/Deleteconfirmation/deleteconfirmation'
import React from 'react';
import ReactGA from "react-ga";

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
export const socketendpoint = "http://localhost:3000"
//export const socketendpoint = "https://xpotest.herokuapp.com"
//export const filestackclientid = "A6UvEfkFeSq2d6TdR9OROz";
export const filestackclientid = "AsBC0mi3ETPevaVD62Xhwz";
export const filstackurl = "https://cdn.filestackcontent.com/";
export const thumbnailimageconfiguration = filestackclientid + "/resize=height:110,width:170"
export const largeimageconfiguration = filestackclientid + "/resize=height:400,width:170"
export const GST_value = parseInt(18, 10)
export const filestackanimatemultipleimage = "https://cdn.filestackcontent.com/animate=fit:scale,width:150,height:150/"
export const TwoFactorAPIKey = "9368f1e1-7519-11ea-9fa5-0200cd936042";
export const stall_company_name ="xporium"

export const linkedin_credentials = {
    linkedinclientid: "81kfyyqrvvtd21",
    linkedinclientsecret: "4Wb57dM4to0jHaEh",
    linkedingrant_type: "authorization_code",
    linkedinredirect_uri: "https://localhost:3000/linkedin"
}
export const getfilestackpreviewurl = (handle) => {
    return filstackurl + "preview/" + handle
}
export const getfilestackthumbnailurl = (handle) => {
    return filstackurl + thumbnailimageconfiguration + "/" + handle
}
export const getfilestacklargeurl = (handle) => {
    return filstackurl + largeimageconfiguration + "/" + handle
}
export const setheaderforfirstrequest = () => {
    let userid = "";
    if (localStorage.getItem('userId') != null) {
        var bytes = utf8.encode(localStorage.getItem('userId'));
        userid = base64.encode(bytes);
    }
    var config = {
        headers: { Authorization: localStorage.getItem('token') == null ? null : localStorage.getItem('token') + "##" + userid }
    };
    return config;
}
export const ButtonType = {
    success: "success",
    verify: "verify",
    editprofile: "editprofile",
    recentactivity: "recentactivity",
    tagsbutton: "tagsbutton",
    edit_mode_button_profile: 'edit_mode_button_profile',
    edit_work_edu_link: "edit_work_edu_link",
    showmorelesslink: "showmorelesslink",
    tieup_btn: "tieup_btn",
    btn_add_record: "btn_add_record",
    btn_close_popup: "btn_close_popup",
    btnlistselect: "btnlistselect",
    btnlistdeleteedit: 'btnlistdeleteedit',
    btnsavecancel: 'btnsavecancel',
    btnuserfeedpost: 'btnuserfeedpost',
    btnsharecommentlikepost: "btnsharecommentlikepost",
    btnlikeblue: "btnlikeblue",
    btncancelpost: "btncancelpost",
    btnuserpostmore: "btnuserpostmore",
    btnshowallnotifications: "btnshowallnotifications",
    btnuploadvideo: "btnuploadvideo",
    signuplogin: "signuplogin",
    signuploginlink: "signuploginlink",
    profilesetupbutton: "profilesetupbutton",
    profilesetupbuttondisabled: "profilesetupbuttondisabled",
    viewmorewings: "viewmorewings",
    wingsaction: "wingsaction",
    exhibitionview3d: "exhibitionview3d",
    exhibition_enquries_submit: "exhibition_enquries_submit",
    exhibitor_edit_profile: "exhibitor_edit_profile",
    btn_purple_font_1_bold_text_14: "btn_purple_font_1_bold_text_14",
    btn_blue_font_1_bold_text_14: "btn_blue_font_1_bold_text_14",
    btn_blue_font_1_bold_text_11: "btn_blue_font_1_bold_text_11",
    btn_grey_font_1_bold_text_11: "btn_grey_font_1_bold_text_11",
    btn_text_color_strongblue_font_1_medium: "btn_text_color_strongblue_font_1_medium",
    btn_outline_green: "btn_outline_green",
    btn_outline_purple: "btn_outline_purple",
    btn_textlink_showmoreless_blue: "btn_textlink_showmoreless_blue",
    btn_textlink_showmoreless_black: "btn_textlink_showmoreless_black",
    btn_bluelink: "btn_bluelink",
    btn_textlink_showmoreless_pink: "btn_textlink_showmoreless_pink",
    btn_purple_font_1_bold: "btn_purple_font_1_bold",
    dropdownnavlink: "dropdownnavlink",
    btn_wing_follow: "btn_wing_follow",
    btn_red_italic: "btn_red_italic",
    btn_red: "btn_red",
    btn_green: "btn_green",
    btn_grey: "btn_grey",
    btn_btn_outline_grey: "btn_btn_outline_grey",
    round_button_red: "round_button_red",
    round_button_green: "round_button_green",
    btn_blue_font_1_bold_text_14_disabled: "btn_blue_font_1_bold_text_14_disabled",
    btn_blue_font_1_bold_text_14_disabled_width100per: "btn_blue_font_1_bold_text_14_disabled_width100per",
    btn_action_delete_edit_disabled: "btn_action_delete_edit_disabled",
    btn_back_button: "btn_back_button",
    btn_btn_outline_blue: "btn_btn_outline_blue",
    btn_blue_font_1_bold_text_14_width100per: "btn_blue_font_1_bold_text_14_width100per",
    btn_btn_outline_blue_width100per: "btn_btn_outline_blue_width100per",
    btn_green_flex: "btn_green_flex"
}
export const FilestackType = {
    profile: "profile",
    moderatordoc: "moderatordoc",
    usercoverpic: "usercoverpic",
    userprofilepic: "userprofilepic",
    streamphoto: "streamphoto",
    streamvideo: "streamvideo",
    userprofilesteppic: "userprofilesteppic",
    uploadbrochure: "uploadbrochure",
    uploadimages: "Uploadimages",
    uploaddoc: "uploaddoc"
}
export const textarearownumber = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    ten: "10"
}
export const ButtonText = {
    save: "Save",
    addworkplace: "Add a workplace",
    addeducation: "Add education detail",
    edit: "Edit",
    delete: "Delete",
    report: "Report",
    cancel: "Cancel",
    tieups: "TIEUP",
    go: "Go",
    confirm: "Confirm",
    reset: "RESET",
    tieupsnow: "TIE-UP NOW",
    sendmessage: "Send Message",
    sendenquiry: "Send Enquiry",
    addproduct: "+ Add Product",
    editprofile: "Edit Profile",
    recentactivity: "Recent Activity",
    edit_mode_button_profile: 'edit_mode_button_profile',
    select: 'Select',
    more: 'More...',
    follow: 'Follow',
    unfollow: "Unfollow",
    post: "Post",
    logout: "Sign Out",
    login: "Log in",
    signup: "Sign up",
    upoadavideo: "Upload Video",
    next: "Next",
    profile: "Profile",
    subscription: "Subscription",
    back: "Back",
    skip: "Skip",
    like: "Like",
    reply: "Reply",
    home: "Home",
    manage: "Manage",
    curate: "Curate",
    people: "People",
    expo: "Expo",
    wings: "Wings",
    viewmore: "View",
    action: "Action",
    exit: "Exit",
    viewin3d: "View in 3D",
    submit: "Submit",
    businesspage: "Business Page",
    myprofile: "My Profile",
    billing: "Billing",
    settings: "Settings",
    preview: "Preview",
    addmembers: "+ Add Member",
    resend: "Resend",
    addattribute: "Add Attribute",
    asktojoin: "Ask to Join",
    clicktoinvite: "Click to Invite",
    sendinvite: "Send Invite",
    downloadbrochure: "Download Brochure",
    applytowingjoin: "Apply to join",
    exitfromwing: "Exit from wing",
    currentopening: "Current Opening",
    closelead: "Close Lead",
    refusedlead: "Denied Lead",
    joinawing: "Join a wing",
    accept: "Accept",
    reject: "Reject",
    rejected: "Rejected",
    requested: "Requested",
    approve: "Approve",
    viewprofile: "View Profile",
    remove: "Remove",
    howitworks: "How It Works",
    applynow: "Apply Now",
    pancard: "Pan Card",
    pancardbusiness: "Pan Card Business",
    adharcardpassport: "Aadhar Card/Passport",
    incorporatecertificate: "Incorporation Certificate",
    gstcertificate: "GST Certificate (optional)",
    partnershipdeed: "Partnership Deed/LLP Certificate",
    shoplicense: "Shop License/GST Certificate",
    poaform: "POA Form",
    confirmandbook: "Confirm and Book",
    updatecard: "Update Card",
    paynow: "Pay Now",
    forexhibitor: "For Exhibitors",
    forvisitors: "For Visitors",
    booktickets: "Book Tickets",
    bookastall: "Book a Stall"
}
export const Popupmessagetitle = {
    joinwing: "Join a wing request"
}
export const Popupmessagedescription = {
    joinwing: "Join a wing request has been sent."
}
export const PageType = {
    moderator: "moderator",
    myprofile: "myprofile",
    event: "event",
    myaccount: "myaccount",
    userprofile: "userprofile",
    userprofilephoto: "userprofilephoto",
    userprofilestreamline: "userprofilestreamline",
    userprofilevideos: "userprofilevideos",
    exhibitionprofile: "exhibitionprofile",
    exhibitorprofile: "exhibitorprofile",
    userwings: "userwings",
    explorewings: "explorewings",
    explorepeople: "explorepeople",
    curator: "curator",
    exhibitorproductdetail: "exhibitorproductdetail"
}
export const tablename = {
    wings: "wings",
}
export const EventType = {
    liveevent: "liveevent",
    upcomingevent: "upcomingevent"
}
export const EventTypeText = {
    liveeventtext: "Live Events",
    upcomingeventtext: "Upcoming Events"
}
export const screenresolution = {
    threetwozero: 320,
    threesevenfive: 375,
    fouronefour: 414,
    sevensixeight: 768,
    onezerotwofour: 1024,
    onethreesixsix: 1366,
    oneninetwozero: 1920
}
export const ProfilepicType = {
    user_nav__user_photo_xsmall: "user_nav__user_photo_xsmall",
    user_nav__user_photo_large: "user_nav__user_photo_large",
    aboutmepic: "aboutmepic",
    feedpic: "feedpic",
    user_nav__user_photo_small: "user_nav__user_photo_small",
    tieupsmediumpic: "tieupsmediumpic",
    avatar: "avatar",
    user_nav__user_photo_medium: "user_nav__user_photo_medium",
    user_nav__user_photo_xsmall_margin_r_m: "user_nav__user_photo_xsmall_margin_r_m",
    uploadeduserstreamlinephoto: "uploadeduserstreamlinephoto",
    photos__image_large: "photos__image_large",
    photos__image_large_streamline: "photos__image_large_streamline",
    profilesetuppic: "profilesetuppic",
    user_nav__user_photo_xxsmall_with_margin: "user_nav__user_photo_xxsmall_with_margin",
    avatar_l: "avatar_l",
    img_square_l: "img_square_l",
    avatar_l_avatar_m: "avatar_l_avatar_m",
    square_image_large: "square_image_large",
    avatar_l_avatar_xl: "avatar_l_avatar_xl",
    image_only_height_25: "image_only_height_25",
    avatar_40px: "avatar_40px"
}
export const error_message = {
    fromtoyear: "To year should be greater than from year",
    specvalue: "Value is required",
    specname: "Name is required",
    selectusers: "Please select users",
    samewingname: "Entered wing name is already exists",
    passwordwrong: "Entered old password is wrong",
    passwordchange: "Your password has been changed.",
    otpnotmatched: "Entered OTP not matched!"
}
export const commonplaceholder = {
    degree: "Degree",
    userpostcomment: "Write a comment...",
    userfeedpost: "Write something",
    more: "...",
    to: "to",
    contact_name: "Contact Name",
    first_name: "First Name",
    last_name: "Last Name",
    college_name: "College Name",
    company_name: "Company Name",
    company_logo: "Company Logo",
    confirmpassword: "Confirm Password",
    college_logo: "College Logo",
    location: "Location",
    businessname: "Legal Name of Your Business",
    designation: "Your Designation at Workplace",
    industry: "Type of Industry",
    website: "Business Website",
    address1: "Enter your address",
    address: "Enter your address",
    address2: "Enter your address",
    phonenumber: "Phone number",
    workemail: "Email Address",
    otp: "OTP",
    password: "Password",
    oldpassword: "Old Password",
    newpassword: "New Password",
    exhibitorname: "Exhibitor Name",
    yourmessage: "Your message",
    about_exhibitor: "More about company",
    product_name: "Product Name",
    product_category: "Product Category",
    price: "Price",
    specname: "Specification Name",
    specvalue: "Value",
    productdescription: "Detail description",
    role: "Role",
    searchinviteexistingstaffmembers: "Search members on Xporium...",
    selectleadtype: "Select lead type",
    invoicevalue: "Invoice Value",
    leadreajectreason: "Write a rejection reason",
    select: "Select",
    allregion: "all regions",
    country: "country",
    yourname: "Your Name",
    email: "Email Address",
    wingname: "Wing Name",
    region: "Region",
    selectbusinesstypeproof: "Select the type of company",
    cardnumber: "Card Number",
    cvvnumber: "Security Code (CVV)",
    expirationcode: "Expiration Code",
    postalcode: "Billing Postal Code",
    title: "Enter Event Title",
    description: "Description",
    event_fees: "Fees",
    event_number: "Enter Event Number",
    event_edition: "Enter Event Edition"
}
export const feedpost_type = {
    exhibitor: "exhibitor",
    personal: "personal"
}
export const schedule_call_type = {
    audio: "1",
    video: "2",
    chat: "3"
}
export const lead_status = {
    // open:"open",
    // accepted:"accepted",//deal accepted by mentioned user
    // refused:"refused",//deal refused by mentioned user
    // close:"close",// Close means successfully deal close by curator, win deal
    // rejected:"rejected"//rejected by curator
    open: "open", //open by user
    denied: "denied",//denied by mentioned user
    win: "win",//win means mentioned user submit the invoice and amount to curator
    lose: "lose",//mentioned user lose the lead because of some reasons
    close: "closed",//curator close deal means convert user to customer like success
    rejected: "rejected"//curator rejecte the customer because of some reasons
    //conversion tab just display data which status has close and lose the deal.
}
export const searchplaceholder = {
    headersearch: "Search expo, exhibitors, people...",
    tieupssearch: "Search expo, exhibitors, people...",
    generalsearch: "Search",
    explorewingsearch: "Start Searching by Name or Location..."
}
export const searchpagetype = {
    header: "header",
    profiletieups: "profiletieups",
    explorewingsearch: "explorewingsearch"
}
export const titleheading = {
    latestposts: "Latest Posts",
    workhistory: "Work details",
    editworkhistory: "Edit work details",
    editaboutmedetail: "Edit about me",
    work_detail: "You can edit the details of your work experience here.",
    education: "Education",
    companyname: "companyname",
    collegename: "collegename",
    college: "College",
    year: "Year",
    tenure: "Tenure",
    aboutme: "About Me",
    designation: "Designation",
    duration: "Duration",
    companylogo: "Companylogo",
    present: "Present",
    from: "From",
    month: "Month",
    to: "To",
    yearto: "yearto",
    monthto: "monthto",
    comapny: "Company Name",
    degree: "Degree",
    collegelogo: "Collegelogo",
    myprofile: "My Profile",
    businessgiven: "Business Given",
    tieups: "TieUps",
    totalmembers: "Members",
    businessreceived: "Business Received",
    largestdeal: "Largest Deal",
    fromdate: "From Date",
    user_name: "User Name",
    username: "username",
    email: "Email",
    role: "Role",
    oldpassword: "oldpassword",
    newpassword: "newpassword",
    password: "Password",
    notification: "Notifications",
    messages:"Messages",
    title: "Title",
    description: "Description",
    video: "video",
    uploadvideo: "Upload Video",
    report: "Report",
    message: "Message",
    confirm_password: "confirmpassword",
    signup: "Sign Up",
    firstname: "firstname",
    lastname: "lastname",
    address1: "address1",
    address2: "address2",
    location: "Location",
    manage: "Manage",
    wingstatus: "Wing Status",
    members: "Members",
    lifetimeperformance: "Lifetime Performance",
    totalbusinessgenerated: "Business Generated",
    inr: "INR",
    leadsgenerated: "Leads Generated",
    activemembers: "Active Members",
    largestdealsize: "Largest Deal",
    productname: "productname",
    productcategory: "productcategory",
    price: "price",
    specname: "specificationname",
    specvalue: "specificationvalue",
    productdescription: "productdescription",
    invoicevalue: "invoicevalue",
    reason: "Reason",
    trendingwings: "Trending Wings",
    recommendations: "Recommendations",
    name: "name",
    phonenumber: "PhoneNumber",
    wingname: "wingname",
    region: "Region",
    pancard: "Pancard",
    business_pancard: "pancardbusiness",
    incorporatecertificate: "incorporatecertificate",
    adharcard: "adharcard",
    gstcertificate: "gstcertificate",
    partnershipdeed: "partnershipdeed",
    shoplicense: "shoplicense",
    cardnumber: "cardnumber",
    cvvnumber: "cvvnumber",
    expirationcode: "expirationcode",
    postalcode: "postalcode",
    totalbusiness: "Business",
    totalleads: "Leads",
    poaform: "poaform",
    event_title: "event_title",
    event_description: "event_description",
    start_date: "start_date",
    end_date: "end_date",
    start_time: "start_time",
    end_time: "end_time",
    address: "address",
    event_location: "event_location",
    pincode: "pincode",
    event_fees: "event_fees",
    event_number: "event_number",
    registration_end_date: "registration_end_date",
    edition: "edition",
    event_pic: "eventpic",
    event_cover_pic: "eventcoverpic"

}
export const Registration_status = {
    registrationclosed: "Registration Closed",
    registrationopen: "Registration Open"
}
export const entryformfieldname = {
    companyName: "companyName",
    desgination: "designation",
    industry: "industry",
    website: "website",
    address1: "address1",
    address2: "address2",
    phonenumber: "phonenumber",
    workemail: "workemail"
}
export const users_type = {
    visitor: "Visitor",
    exhibitor: "Exhibitor",
    wingster: "Wingster",
    exhibitorstaff: "Exhibitor Staff",
    curator: "Curator"
}
export const customPopUp = {
    overlay: {
        background: "#fff",
        display: "block",
        position: "absolute",
        padding:"0"
    }
}
export const label_text = {
    friend: "Friend",
    you: "You",
    address1: "Street Address 1",
    address2: "Street Address 2",
    phonenumber: "Enter phone number along with the country code",
    leadtype: "Lead Type",
    workemail: "Enter email",
    website: "Enter your website to allow visitors know more about your business.",
    industry: "Enter the type of industry of your business such as Finance, Technology etc.",
    designation: "Enter your designation such as Founder, CEO, Sales Executive etc.",
    businessname: "Enter the name of your company, brand, organisation, NGO etc.",
    yearselection: "Select year",
    monthselection: "Select month",
    companyname: "Enter the name of your business",
    location: "Enter the city where your live, work or hangout most often.",
    showallrecords: "Show all",
    showlessrecord: "Show only",
    records: "records",
    currentlabel: "I currently working",
    degreename: "Enter your degree",
    collegename: "Enter your college name",
    streamlineuserposttext: "posted on your streamline",
    username: "Enter user name",
    email: "Email Address",
    role: "Role",
    password: "Password",
    viewallnotificatin: "View All Notifications",
    viewallmessages: "View All Messages",
    firstname: "Enter your First Name",
    yourname: "Please enter your name here",
    lastname: "Enter your Last Name",
    wingname: "Enter the name of your wing",
    live: "Live",
    region: "Region you would want to base your Wing at",
    employees: "Employees",
    currencyinr: "(INR)",
    exhibitorbusinesspage: "You are currently viewing",
    productname: "Enter the name of your product",
    productcategory: "Enter the category of your product",
    price: "Enter the price of the product",
    technicalspecification: "Technical Specifications",
    specname: "Enter the technical specification of your product",
    specvalue: "Enter the value of your product",
    productdescription: "Enter detail description of your product",
    companybrochure: "Upload your company's brochure",
    images: "Images",
    productgallery: "Product Gallery",
    mainproductimage: "Main Product Image",
    members: "Members",
    tieups: "Tieups",
    invoicevalue: "Invoice Value",
    congratulations: "Congratulations!",
    congratsleadmessage: "A deal has been made",
    oops: "Oops!",
    leadlosemessage: "Better luck next time",
    leaddealamounttext: "Deal Amount",
    cardnumber: "Card Number",
    cvvnumber: "Security Code (CVV)",
    expirationcode: "Expiration Code",
    postalcode: "Billing Postal Code",
    product_category: "Product Category"
}
export const checkyears = (fromyear, toyear) => {
    if (fromyear !== null && toyear !== null && toyear < fromyear) {
        return error_message.fromtoyear;
    }
    return null;
}
export const range = (start, end) => {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}
export const userfavourites_types = {
    event: "event",
}
export const tieups_status = {
    requested: "Requested",
    accepted: "Accepted",
    rejected: "Rejected"
}
export const wingster_wing_status = {
    requested: 1,
    accepted: 2,
    rejected: 3
}
export const constantvalues = {
    sidebarrecordcount: 2,
    usertieupsdata: 9,
    eventexhibitordata: 20
}
export const profiletabindex = {
    streamline: "0",
    photos: "1",
    videos: "2",
    tieups: "3",
    more: "4"
}

export const hall_number_tab_index = {
    hall_number1: "0",
    hall_number2: "1",
    hall_number3: "2",
    hall_number4: "3",
}

export const Exhibitionprofiletabindex = {
    whyexhibit: "0",
    exhibitorprofile: "1",
    whyvisit: "2",
    exhibitorlist: "3",
    postenquries: "4",
}
export const Exhibitiorprofiletabindex = {
    aboutme: "0",
    products: "1",
    team: "2",
    photos: "3",
    videos: "4",
}
export const Userwingstabindex = {
    streamline: "0",
    recommend: "1",
    leads: "2",
    conversion: "3",
    more: "4",
}
export const usermanagetabindex = {
    wings: "0",
    exhibitions: "1",
    enquiries: "2",
    schedule: "3",
}
export const exploreexpotabindex = {
    liveevents: "0",
    upcomingevents: "1",
}
export const settingstabindex = {
    personal: "0",
    business: "1",
    plans: "2",
    billinghistory: "3",
    paymentmethod: "4",
    referrals: "5",
}
export const curatortabindex = {
    profile: "0",
    deals: "1",
    activity: "2",
    wingsters: "3",
    payout: "4",
}
export const report_type = {
    general: "general",
    feedpost: "feedpost"
}
export const report_form_name = {
    userprofile: "userprofile",
    explorewing: "explorewing",
    manageuserwing: "manageuserwing",
    wingpost: "wingpost"
}
export const ICONS = {
    //ENVELOPE:'M17.5 6h-16c-0.827 0-1.5 0.673-1.5 1.5v9c0 0.827 0.673 1.5 1.5 1.5h16c0.827 0 1.5-0.673 1.5-1.5v-9c0-0.827-0.673-1.5-1.5-1.5zM17.5 7c0.030 0 0.058 0.003 0.087 0.008l-7.532 5.021c-0.29 0.193-0.819 0.193-1.109 0l-7.532-5.021c0.028-0.005 0.057-0.008 0.087-0.008h16zM17.5 17h-16c-0.276 0-0.5-0.224-0.5-0.5v-8.566l7.391 4.927c0.311 0.207 0.71 0.311 1.109 0.311s0.798-0.104 1.109-0.311l7.391-4.927v8.566c0 0.276-0.224 0.5-0.5 0.5z',
    CHAT: 'M5.8 12.2v-6.2h-3.8c-1.1 0-2 0.9-2 2v6c0 1.1 0.9 2 2 2h1v3l3-3h5c1.1 0 2-0.9 2-2v-1.82c-0.064 0.014-0.132 0.021-0.2 0.021l-7-0.001zM18 1h-9c-1.1 0-2 0.9-2 2v8h7l3 3v-3h1c1.1 0 2-0.899 2-2v-6c0-1.1-0.9-2-2-2z',
    CHEVRONSMALLDOWN: 'M13.418 7.859c0.271-0.268 0.709-0.268 0.978 0s0.272 0.701 0 0.969l-3.908 3.83c-0.27 0.268-0.707 0.268-0.979 0l-3.908-3.83c-0.27-0.267-0.27-0.701 0-0.969s0.709-0.268 0.978 0l3.421 3.141 3.418-3.141z',
    BELL: 'M14.65 8.512c-2.28-4.907-3.466-6.771-7.191-6.693-1.327 0.027-1.009-0.962-2.021-0.587-1.010 0.375-0.143 0.924-1.177 1.773-2.902 2.383-2.635 4.587-1.289 9.84 0.567 2.213-1.367 2.321-0.602 4.465 0.559 1.564 4.679 2.219 9.025 0.607s7.086-4.814 6.527-6.378c-0.765-2.145-2.311-0.961-3.272-3.027zM10.924 16.595c-3.882 1.44-7.072 0.594-7.207 0.217-0.232-0.65 1.253-2.816 5.691-4.463s6.915-1.036 7.174-0.311c0.153 0.429-1.775 3.116-5.658 4.557zM9.676 13.101c-2.029 0.753-3.439 1.614-4.353 2.389 0.643 0.584 1.847 0.726 3.046 0.281 1.527-0.565 2.466-1.866 2.095-2.904-0.005-0.013-0.011-0.023-0.016-0.036-0.251 0.082-0.508 0.171-0.772 0.27z',
    BRIEFCASE: 'M9 10h2v2h9c0 0-0.149-4.459-0.2-5.854-0.050-1.326-0.525-2.146-2-2.146h-3.208c-0.497-0.938-1.032-1.945-1.197-2.256-0.331-0.623-0.444-0.744-1.179-0.744h-4.433c-0.735 0-0.847 0.121-1.179 0.744-0.165 0.311-0.7 1.318-1.196 2.256h-3.209c-1.476 0-1.945 0.82-2 2.146s-0.199 5.854-0.199 5.854h9v-2zM7.649 2.916c0.23-0.432 0.308-0.516 0.817-0.516h3.067c0.509 0 0.588 0.084 0.816 0.516 0.086 0.16 0.318 0.6 0.575 1.084h-5.85c0.257-0.484 0.489-0.924 0.575-1.084zM11 15h-2v-2h-8.5c0 0 0.124 1.797 0.199 3.322 0.031 0.633 0.218 1.678 1.8 1.678h15.001c1.582 0 1.765-1.047 1.8-1.678 0.087-1.568 0.2-3.322 0.2-3.322h-8.5v2z',
    MAGNIFYGLASS: 'M17.545 15.467l-3.779-3.779c0.57-0.935 0.898-2.035 0.898-3.21 0-3.417-2.961-6.377-6.378-6.377s-6.186 2.769-6.186 6.186c0 3.416 2.961 6.377 6.377 6.377 1.137 0 2.2-0.309 3.115-0.844l3.799 3.801c0.372 0.371 0.975 0.371 1.346 0l0.943-0.943c0.371-0.371 0.236-0.84-0.135-1.211zM4.004 8.287c0-2.366 1.917-4.283 4.282-4.283s4.474 2.107 4.474 4.474c0 2.365-1.918 4.283-4.283 4.283s-4.473-2.109-4.473-4.474z',
    LEFTARROW: 'M12.452 4.516c0.446 0.436 0.481 1.043 0 1.576l-3.747 3.908 3.747 3.908c0.481 0.533 0.446 1.141 0 1.574-0.445 0.436-1.197 0.408-1.615 0-0.418-0.406-4.502-4.695-4.502-4.695-0.223-0.217-0.335-0.502-0.335-0.787s0.112-0.57 0.335-0.789c0 0 4.084-4.287 4.502-4.695s1.17-0.436 1.615 0z',
    NEWMESSAGE: 'M18.174 1.826c-1.102-1.102-2.082-0.777-2.082-0.777l-8.639 8.632-1.453 4.319 4.317-1.454 8.634-8.638c0 0 0.324-0.98-0.777-2.082zM10.605 11.605l-0.471 0.47-1.473 0.5c-0.104-0.24-0.234-0.477-0.498-0.74s-0.5-0.394-0.74-0.498l0.5-1.473 0.471-0.47c0 0 0.776-0.089 1.537 0.673 0.762 0.761 0.674 1.538 0.674 1.538zM16 17h-13v-13h5l2-2h-7c-1.1 0-2 0.9-2 2v13c0 1.1 0.9 2 2 2h13c1.1 0 2-0.9 2-2v-7l-2 2v5z',
    CLOCK: 'M10 0.4c-5.303 0-9.601 4.298-9.601 9.6 0 5.303 4.298 9.601 9.601 9.601 5.301 0 9.6-4.298 9.6-9.601s-4.299-9.6-9.6-9.6zM9.999 17.6c-4.197 0-7.6-3.402-7.6-7.6 0-4.197 3.402-7.6 7.6-7.6 4.197 0 7.601 3.402 7.601 7.6 0 4.197-3.404 7.6-7.601 7.6zM11 9.33v-5.33h-2v6.245l-3.546 2.048 1 1.732 4.115-2.377c0.238-0.137 0.431-0.473 0.431-0.748v-0.168l4.24-4.166c-0.198-0.271-0.411-0.529-0.647-0.766l-3.593 3.53z',
    LOCATION: 'M19.367 18.102l-1.367-4.102h-1.5l0.833 4h-14.666l0.833-4h-1.5l-1.368 4.102c-0.347 1.044 0.268 1.898 1.368 1.898h16c1.1 0 1.715-0.854 1.367-1.898zM15 5c0-2.761-2.238-5-5-5s-5 2.239-5 5c0 4.775 5 10 5 10s5-5.225 5-10zM7.3 5.060c0-1.491 1.208-2.699 2.7-2.699s2.7 1.208 2.7 2.699c0 1.492-1.209 2.7-2.7 2.7s-2.7-1.209-2.7-2.7z',
    LOCATION_PIN: 'M10 2.009c-2.762 0-5 2.229-5 4.99 0 4.774 5 11 5 11s5-6.227 5-11c0-2.76-2.238-4.99-5-4.99zM10 9.76c-1.492 0-2.7-1.209-2.7-2.7s1.208-2.7 2.7-2.7c1.49 0 2.699 1.209 2.699 2.7s-1.209 2.7-2.699 2.7z',
    GRDUATIONCAP: 'M3.302 12.238c0.464 1.879 1.054 2.701 3.022 3.562 1.969 0.86 2.904 1.8 3.676 1.8s1.648-0.822 3.616-1.684c1.969-0.861 1.443-1.123 1.907-3.002l-5.523 2.686-6.698-3.362zM19.511 7.336l-8.325-4.662c-0.652-0.365-1.72-0.365-2.372 0l-8.326 4.662c-0.652 0.365-0.652 0.963 0 1.328l8.325 4.662c0.652 0.365 1.72 0.365 2.372 0l5.382-3.014-5.836-1.367c-0.225 0.055-0.472 0.086-0.731 0.086-1.052 0-1.904-0.506-1.904-1.131 0-0.627 0.853-1.133 1.904-1.133 0.816 0 1.51 0.307 1.78 0.734l6.182 2.029 1.549-0.867c0.651-0.364 0.651-0.962 0-1.327zM16.967 16.17c-0.065 0.385 1.283 1.018 1.411-0.107 0.579-5.072-0.416-6.531-0.416-6.531l-1.395 0.781c0-0.001 1.183 1.125 0.4 5.857z',
    PLUS: 'M16 10c0 0.553-0.048 1-0.601 1h-4.399v4.399c0 0.552-0.447 0.601-1 0.601s-1-0.049-1-0.601v-4.399h-4.399c-0.552 0-0.601-0.447-0.601-1s0.049-1 0.601-1h4.399v-4.399c0-0.553 0.447-0.601 1-0.601s1 0.048 1 0.601v4.399h4.399c0.553 0 0.601 0.447 0.601 1z',
    CROSS: 'M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z',
    SELECTARROW: 'M10 1l-5 7h10l-5-7zM10 19l5-7h-10l5 7z',
    TRASH: 'M3.389 7.113l1.101 10.908c0.061 0.461 2.287 1.977 5.51 1.979 3.225-0.002 5.451-1.518 5.511-1.979l1.102-10.908c-1.684 0.942-4.201 1.387-6.613 1.387-2.41 0-4.928-0.445-6.611-1.387zM13.168 1.51l-0.859-0.951c-0.332-0.473-0.692-0.559-1.393-0.559h-1.831c-0.7 0-1.061 0.086-1.392 0.559l-0.859 0.951c-2.57 0.449-4.434 1.64-4.434 2.519v0.17c0 1.547 3.403 2.801 7.6 2.801 4.198 0 7.601-1.254 7.601-2.801v-0.17c0-0.879-1.863-2.070-4.433-2.519zM12.070 4.34l-1.070-1.34h-2l-1.068 1.34h-1.7c0 0 1.862-2.221 2.111-2.522 0.19-0.23 0.384-0.318 0.636-0.318h2.043c0.253 0 0.447 0.088 0.637 0.318 0.248 0.301 2.111 2.522 2.111 2.522h-1.7z',
    SAVE: 'M15.173 2h-11.173c-1.101 0-2 0.9-2 2v12c0 1.1 0.899 2 2 2h12c1.101 0 2-0.9 2-2v-10.873l-2.827-3.127zM14 8c0 0.549-0.45 1-1 1h-6c-0.55 0-1-0.451-1-1v-5h8v5zM13 4h-2v4h2v-4z',
    MORE_HORIZONTAL: 'M10.001 7.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.985 2.199-2.2s-0.984-2.2-2.199-2.2zM3.001 7.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.986 2.199-2.2s-0.984-2.2-2.199-2.2zM17.001 7.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.985 2.199-2.2s-0.984-2.2-2.199-2.2z',
    MORE_VERTICAL: 'M10.001 7.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.985 2.199-2.2s-0.984-2.2-2.199-2.2zM10.001 5.2c1.215 0 2.199-0.986 2.199-2.2s-0.984-2.2-2.199-2.2c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2zM10.001 14.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.985 2.199-2.2s-0.984-2.2-2.199-2.2z',
    THUMBSUPS: 'M18.916 11.208c0.443-0.511 0.695-1.355 0.695-2.159 0-0.531-0.115-0.996-0.333-1.345-0.284-0.454-0.738-0.704-1.278-0.704h-2.618c1.425-2.591 1.785-4.543 1.070-5.807-0.499-0.881-1.413-1.193-2.045-1.193-0.25 0-0.462 0.185-0.495 0.433-0.179 1.319-1.188 2.893-2.768 4.318-1.514 1.365-3.374 2.456-5.286 3.11-0.241-0.508-0.758-0.86-1.356-0.86h-3c-0.827 0-1.5 0.673-1.5 1.5v9c0 0.827 0.673 1.5 1.5 1.5h3c0.634 0 1.176-0.395 1.396-0.952 1.961 0.246 2.699 0.64 3.414 1.022 0.895 0.478 1.739 0.93 4.503 0.93 0.72 0 1.398-0.188 1.91-0.529 0.5-0.333 0.82-0.801 0.926-1.343 0.399-0.162 0.753-0.536 1.024-1.092 0.264-0.541 0.435-1.232 0.435-1.761 0-0.099-0.006-0.19-0.017-0.274 0.253-0.186 0.48-0.473 0.667-0.851 0.27-0.545 0.432-1.228 0.432-1.826 0-0.424-0.079-0.777-0.234-1.051-0.013-0.022-0.026-0.044-0.039-0.065zM4.5 18h-3c-0.276 0-0.5-0.224-0.5-0.5v-9c0-0.276 0.224-0.5 0.5-0.5h3c0.276 0 0.5 0.224 0.5 0.5v8.999c0 0 0 0.001 0 0.001-0 0.276-0.224 0.5-0.5 0.5zM18.339 10.274c-0.151 0.304-0.304 0.414-0.37 0.414-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5c0.042 0 0.072 0 0.117 0.078 0.066 0.117 0.104 0.32 0.104 0.558 0 0.445-0.126 0.974-0.328 1.382-0.198 0.399-0.399 0.544-0.487 0.544-0.276 0-0.5 0.224-0.5 0.5 0 0.177 0.092 0.333 0.231 0.422 0.031 0.317-0.117 1.165-0.501 1.718-0.145 0.209-0.298 0.329-0.418 0.329-0.276 0-0.5 0.224-0.5 0.5 0 0.88-0.972 1.281-1.875 1.281-2.513 0-3.217-0.376-4.032-0.812-0.762-0.407-1.618-0.865-3.781-1.134v-8.187c2.101-0.689 4.152-1.877 5.812-3.373 1.593-1.436 2.639-2.988 2.994-4.426 0.272 0.087 0.579 0.271 0.776 0.618 0.334 0.59 0.584 2.096-1.493 5.557-0.093 0.154-0.095 0.347-0.006 0.504s0.255 0.254 0.435 0.254h3.483c0.199 0 0.327 0.070 0.43 0.234 0.117 0.187 0.181 0.477 0.181 0.815 0 0.424-0.102 0.882-0.272 1.225z',
    POSTCOMMENTS: 'M0.5 19c-0.225 0-0.422-0.15-0.482-0.367s0.032-0.447 0.225-0.562c1.691-1.014 2.392-2.489 2.641-3.179-1.838-1.407-2.884-3.354-2.884-5.392 0-1.029 0.258-2.026 0.768-2.964 0.486-0.894 1.18-1.695 2.061-2.381 1.787-1.39 4.156-2.156 6.671-2.156s4.884 0.766 6.671 2.156c0.881 0.685 1.575 1.486 2.061 2.381 0.51 0.937 0.768 1.934 0.768 2.964s-0.258 2.026-0.768 2.964c-0.486 0.894-1.18 1.695-2.061 2.381-1.787 1.39-4.156 2.156-6.671 2.156-1.033 0-2.047-0.129-3.016-0.385-0.429 0.286-1.231 0.793-2.189 1.27-1.488 0.74-2.764 1.115-3.794 1.115zM9.5 3c-4.687 0-8.5 2.916-8.5 6.5 0 1.815 1.005 3.562 2.756 4.792 0.172 0.121 0.25 0.336 0.196 0.539-0.117 0.436-0.515 1.633-1.58 2.788 1.302-0.456 2.704-1.247 3.739-1.959 0.123-0.085 0.277-0.11 0.421-0.069 0.948 0.271 1.947 0.409 2.968 0.409 4.687 0 8.5-2.916 8.5-6.5s-3.813-6.5-8.5-6.5z',
    POSTSHARE: 'M15 13.442c-0.633 0-1.204 0.246-1.637 0.642l-5.938-3.463c0.046-0.188 0.075-0.384 0.075-0.584s-0.029-0.395-0.075-0.583l5.875-3.429c0.446 0.417 1.042 0.675 1.7 0.675 1.379 0 2.5-1.121 2.5-2.5s-1.121-2.5-2.5-2.5-2.5 1.121-2.5 2.5c0 0.2 0.029 0.396 0.075 0.583l-5.875 3.429c-0.446-0.416-1.042-0.675-1.7-0.675-1.379 0-2.5 1.121-2.5 2.5s1.121 2.5 2.5 2.5c0.658 0 1.254-0.258 1.7-0.675l5.938 3.463c-0.042 0.175-0.067 0.358-0.067 0.546 0 1.342 1.087 2.429 2.429 2.429s2.429-1.088 2.429-2.429-1.087-2.429-2.429-2.429z',
    FLAG: 'M18.926 5.584c-9.339 13.568-6.142-0.26-14.037 6.357l1.795 7.059h-2.019l-3.665-14.41 1.85-0.664c8.849-6.471 4.228 5.82 15.637 1.254 0.364-0.147 0.655 0.090 0.439 0.404z',
    REPLY: 'M7.225 5.767v-2.681l-7.225 6.456 7.225 6.691v-2.777l-4.225-3.914 4.225-3.775zM12.225 6.953v-3.867l-7.225 6.456 7.225 6.691v-4.357c3.292 0 5.291 0.422 7.775 4.81 0-0.001-0.368-9.733-7.775-9.733z',
    HOME: 'M19.871 12.165l-8.829-9.758c-0.274-0.303-0.644-0.47-1.042-0.47-0 0 0 0 0 0-0.397 0-0.767 0.167-1.042 0.47l-8.829 9.758c-0.185 0.205-0.169 0.521 0.035 0.706 0.096 0.087 0.216 0.129 0.335 0.129 0.136 0 0.272-0.055 0.371-0.165l2.129-2.353v8.018c0 0.827 0.673 1.5 1.5 1.5h11c0.827 0 1.5-0.673 1.5-1.5v-8.018l2.129 2.353c0.185 0.205 0.501 0.221 0.706 0.035s0.221-0.501 0.035-0.706zM12 19h-4v-4.5c0-0.276 0.224-0.5 0.5-0.5h3c0.276 0 0.5 0.224 0.5 0.5v4.5zM16 18.5c0 0.276-0.224 0.5-0.5 0.5h-2.5v-4.5c0-0.827-0.673-1.5-1.5-1.5h-3c-0.827 0-1.5 0.673-1.5 1.5v4.5h-2.5c-0.276 0-0.5-0.224-0.5-0.5v-9.123l5.7-6.3c0.082-0.091 0.189-0.141 0.3-0.141s0.218 0.050 0.3 0.141l5.7 6.3v9.123z',
    CALENDAR: 'M18.5 2h-2.5v-0.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v0.5h-10v-0.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v0.5h-2.5c-0.827 0-1.5 0.673-1.5 1.5v14c0 0.827 0.673 1.5 1.5 1.5h17c0.827 0 1.5-0.673 1.5-1.5v-14c0-0.827-0.673-1.5-1.5-1.5zM1.5 3h2.5v1.5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-1.5h10v1.5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-1.5h2.5c0.276 0 0.5 0.224 0.5 0.5v2.5h-18v-2.5c0-0.276 0.224-0.5 0.5-0.5zM18.5 18h-17c-0.276 0-0.5-0.224-0.5-0.5v-10.5h18v10.5c0 0.276-0.224 0.5-0.5 0.5z',
    CURATE: 'M9.5 20c-2.538 0-4.923-0.988-6.718-2.782s-2.782-4.18-2.782-6.717c0-2.538 0.988-4.923 2.782-6.718s4.18-2.783 6.718-2.783c2.538 0 4.923 0.988 6.718 2.783s2.782 4.18 2.782 6.718-0.988 4.923-2.782 6.717c-1.794 1.794-4.18 2.782-6.718 2.782zM9.5 2c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.813-8.5-8.5-8.5z',
    LEFT_ARROW: 'M12.452 4.516c0.446 0.436 0.481 1.043 0 1.576l-3.747 3.908 3.747 3.908c0.481 0.533 0.446 1.141 0 1.574-0.445 0.436-1.197 0.408-1.615 0-0.418-0.406-4.502-4.695-4.502-4.695-0.223-0.217-0.335-0.502-0.335-0.787s0.112-0.57 0.335-0.789c0 0 4.084-4.287 4.502-4.695s1.17-0.436 1.615 0z',
    RIGHT_ARROW: 'M9.163 4.516c0.418 0.408 4.502 4.695 4.502 4.695 0.223 0.219 0.335 0.504 0.335 0.789s-0.112 0.57-0.335 0.787c0 0-4.084 4.289-4.502 4.695-0.418 0.408-1.17 0.436-1.615 0-0.446-0.434-0.481-1.041 0-1.574l3.747-3.908-3.747-3.908c-0.481-0.533-0.446-1.141 0-1.576s1.197-0.409 1.615 0z',
    PHONE_HANDSET: 'M16 20c-1.771 0-3.655-0.502-5.6-1.492-1.793-0.913-3.564-2.22-5.122-3.78s-2.863-3.333-3.775-5.127c-0.988-1.946-1.49-3.83-1.49-5.601 0-1.148 1.070-2.257 1.529-2.68 0.661-0.609 1.701-1.32 2.457-1.32 0.376 0 0.816 0.246 1.387 0.774 0.425 0.394 0.904 0.928 1.383 1.544 0.289 0.372 1.73 2.271 1.73 3.182 0 0.747-0.845 1.267-1.739 1.816-0.346 0.212-0.703 0.432-0.961 0.639-0.276 0.221-0.325 0.338-0.333 0.364 0.949 2.366 3.85 5.267 6.215 6.215 0.021-0.007 0.138-0.053 0.363-0.333 0.207-0.258 0.427-0.616 0.639-0.961 0.55-0.894 1.069-1.739 1.816-1.739 0.911 0 2.81 1.441 3.182 1.73 0.616 0.479 1.15 0.958 1.544 1.383 0.528 0.57 0.774 1.011 0.774 1.387 0 0.756-0.711 1.799-1.319 2.463-0.424 0.462-1.533 1.537-2.681 1.537zM3.994 1c-0.268 0.005-0.989 0.333-1.773 1.055-0.744 0.686-1.207 1.431-1.207 1.945 0 6.729 8.264 15 14.986 15 0.513 0 1.258-0.465 1.944-1.213 0.723-0.788 1.051-1.512 1.056-1.781-0.032-0.19-0.558-0.929-1.997-2.037-1.237-0.952-2.24-1.463-2.498-1.469-0.018 0.005-0.13 0.048-0.357 0.336-0.197 0.251-0.408 0.594-0.613 0.926-0.56 0.911-1.089 1.772-1.858 1.772-0.124 0-0.246-0.024-0.363-0.071-2.625-1.050-5.729-4.154-6.779-6.779-0.126-0.315-0.146-0.809 0.474-1.371 0.33-0.299 0.786-0.579 1.228-0.851 0.332-0.204 0.676-0.415 0.926-0.613 0.288-0.227 0.331-0.339 0.336-0.357-0.007-0.258-0.517-1.261-1.469-2.498-1.108-1.439-1.847-1.964-2.037-1.997z',
    BUBBLE: 'M0.5 19c-0.225 0-0.422-0.15-0.482-0.367s0.032-0.447 0.225-0.562c1.691-1.014 2.392-2.489 2.641-3.179-1.838-1.407-2.884-3.354-2.884-5.392 0-1.029 0.258-2.026 0.768-2.964 0.486-0.894 1.18-1.695 2.061-2.381 1.787-1.39 4.156-2.156 6.671-2.156s4.884 0.766 6.671 2.156c0.881 0.685 1.575 1.486 2.061 2.381 0.51 0.937 0.768 1.934 0.768 2.964s-0.258 2.026-0.768 2.964c-0.486 0.894-1.18 1.695-2.061 2.381-1.787 1.39-4.156 2.156-6.671 2.156-1.033 0-2.047-0.129-3.016-0.385-0.429 0.286-1.231 0.793-2.189 1.27-1.488 0.74-2.764 1.115-3.794 1.115zM9.5 3c-4.687 0-8.5 2.916-8.5 6.5 0 1.815 1.005 3.562 2.756 4.792 0.172 0.121 0.25 0.336 0.196 0.539-0.117 0.436-0.515 1.633-1.58 2.788 1.302-0.456 2.704-1.247 3.739-1.959 0.123-0.085 0.277-0.11 0.421-0.069 0.948 0.271 1.947 0.409 2.968 0.409 4.687 0 8.5-2.916 8.5-6.5s-3.813-6.5-8.5-6.5z',
    CALENDAR_EXHIBITION: 'M17 3h-1v2h-3v-2h-6v2h-3v-2h-1c-1.101 0-2 0.9-2 2v12c0 1.1 0.899 2 2 2h14c1.1 0 2-0.9 2-2v-12c0-1.1-0.9-2-2-2zM17 17h-14v-8h14v8zM6.5 1h-2v3.5h2v-3.5zM15.5 1h-2v3.5h2v-3.5z',
    LNRSHOP: 'M6.123 7.25l0.791-5.25h-4.114l-1.719 4.5c-0.053 0.16-0.081 0.326-0.081 0.5 0 1.104 1.15 2 2.571 2 1.31 0 2.393-0.764 2.552-1.75zM10 9c1.42 0 2.571-0.896 2.571-2 0-0.041-0.003-0.082-0.005-0.121l-0.509-4.879h-4.114l-0.51 4.875c-0.002 0.041-0.004 0.082-0.004 0.125 0 1.104 1.151 2 2.571 2zM15 10.046v3.954h-10v-3.948c-0.438 0.158-0.92 0.248-1.429 0.248-0.195 0-0.384-0.023-0.571-0.049v6.349c0 0.77 0.629 1.4 1.398 1.4h11.202c0.77 0 1.4-0.631 1.4-1.4v-6.348c-0.188 0.025-0.376 0.049-0.571 0.049-0.506-0.001-0.99-0.093-1.429-0.255zM18.92 6.5l-1.721-4.5h-4.113l0.79 5.242c0.154 0.99 1.237 1.758 2.553 1.758 1.42 0 2.571-0.896 2.571-2 0-0.174-0.028-0.34-0.080-0.5z',
    LNR_CONTROLLER_RECORD: 'M10 3c-3.866 0-7 3.133-7 7 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7-7-7z',
    CIRCLEWITHPLUS: 'M10 1.6c-4.639 0-8.4 3.761-8.4 8.4s3.761 8.4 8.4 8.4 8.4-3.761 8.4-8.4c0-4.639-3.761-8.4-8.4-8.4zM15 11h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z',
    LINECHECK: 'M8.294 16.998c-0.435 0-0.847-0.203-1.111-0.553l-3.573-4.721c-0.465-0.613-0.344-1.486 0.27-1.951 0.615-0.467 1.488-0.344 1.953 0.27l2.351 3.104 5.911-9.492c0.407-0.652 1.267-0.852 1.921-0.445s0.854 1.266 0.446 1.92l-6.984 11.21c-0.242 0.391-0.661 0.635-1.12 0.656-0.022 0.002-0.042 0.002-0.064 0.002z',
    SHIELD: 'M17.604 3.332c-4.614 0.668-5.529-0.499-7.604-2.332-2.075 1.833-2.99 3-7.604 2.332-2.459 12.248 7.604 15.668 7.604 15.668s10.063-3.42 7.604-15.668zM12.473 13.309l-2.473-1.3-2.472 1.3 0.472-2.753-2-1.95 2.764-0.401 1.236-2.505 1.236 2.505 2.764 0.401-2 1.949 0.473 2.754z',
    ENVELOPE: 'M17.5 6h-16c-0.827 0-1.5 0.673-1.5 1.5v9c0 0.827 0.673 1.5 1.5 1.5h16c0.827 0 1.5-0.673 1.5-1.5v-9c0-0.827-0.673-1.5-1.5-1.5zM17.5 7c0.030 0 0.058 0.003 0.087 0.008l-7.532 5.021c-0.29 0.193-0.819 0.193-1.109 0l-7.532-5.021c0.028-0.005 0.057-0.008 0.087-0.008h16zM17.5 17h-16c-0.276 0-0.5-0.224-0.5-0.5v-8.566l7.391 4.927c0.311 0.207 0.71 0.311 1.109 0.311s0.798-0.104 1.109-0.311l7.391-4.927v8.566c0 0.276-0.224 0.5-0.5 0.5z',
    USER1: 'M15.989 19.129c0-2.246-2.187-3.389-4.317-4.307-2.123-0.914-2.801-1.684-2.801-3.334 0-0.989 0.648-0.667 0.932-2.481 0.12-0.752 0.692-0.012 0.802-1.729 0-0.684-0.313-0.854-0.313-0.854s0.159-1.013 0.221-1.793c0.064-0.817-0.398-2.56-2.301-3.095-0.332-0.341-0.557-0.882 0.467-1.424-2.24-0.104-2.761 1.068-3.954 1.93-1.015 0.756-1.289 1.953-1.24 2.59 0.065 0.78 0.223 1.793 0.223 1.793s-0.314 0.17-0.314 0.854c0.11 1.718 0.684 0.977 0.803 1.729 0.284 1.814 0.933 1.492 0.933 2.481 0 1.65-0.212 2.21-2.336 3.124-2.131 0.917-2.794 2.387-2.783 4.516 0.003 0.637-0.011 0.871-0.011 0.871h16c0 0-0.011-0.234-0.011-0.871zM18.528 13.365c-1.135-0.457-1.605-1.002-1.605-2.066 0-0.641 0.418-0.432 0.602-1.603 0.077-0.484 0.447-0.008 0.518-1.115 0-0.441-0.202-0.551-0.202-0.551s0.103-0.656 0.143-1.159c0.050-0.627-0.364-2.247-2.268-2.247s-2.318 1.62-2.269 2.247c0.042 0.502 0.144 1.159 0.144 1.159s-0.202 0.109-0.202 0.551c0.071 1.107 0.441 0.631 0.518 1.115 0.184 1.172 0.602 0.963 0.602 1.603 0 1.064-0.438 1.562-1.809 2.152-0.069 0.029-0.12 0.068-0.183 0.102 1.64 0.712 4.226 1.941 4.838 4.447h2.645c0 0 0-1.906 0-2.318 0-1-0.273-1.834-1.472-2.317z',
    TROPHY: 'M11.18 14.356c0-1.451 1.1-2.254 2.894-3.442 2.194-1.456 4.926-3.265 4.926-7.56 0-0.387-0.317-0.699-0.709-0.699h-3.43c-0.484-0.896-1.929-1.855-4.861-1.855-2.934 0-4.377 0.959-4.862 1.855h-3.431c-0.391 0-0.707 0.313-0.707 0.699 0 4.295 2.73 6.104 4.926 7.559 1.794 1.188 2.894 1.991 2.894 3.442v1.311c-1.884 0.209-3.269 0.906-3.269 1.736 0 0.994 1.992 1.799 4.449 1.799s4.449-0.805 4.449-1.799c0-0.83-1.385-1.527-3.269-1.736v-1.31zM13.957 9.3c0.566-1.199 1.016-2.826 1.088-5.246h2.51c-0.24 2.701-1.862 4.064-3.598 5.246zM10 2.026c2.732-0.002 3.799 1.115 3.798 1.529 0 0.418-1.066 1.533-3.798 1.535-2.732-0.001-3.799-1.116-3.799-1.534-0.001-0.414 1.067-1.532 3.799-1.53zM2.445 4.054h2.509c0.073 2.42 0.521 4.047 1.089 5.246-1.736-1.182-3.359-2.545-3.598-5.246z',
    WALLET: 'M16 6h-12.5v-0.5l11-0.88v0.88h1.5v-1.5c0-1.1-0.891-1.872-1.979-1.717l-10.041 1.434c-1.089 0.156-1.98 1.183-1.98 2.283v10c0 1.104 0.895 2 2 2h12c1.104 0 2-0.896 2-2v-8c0-1.104-0.896-2-2-2zM14.5 13.006c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5-0.672 1.5-1.5 1.5z',
    ALARM: 'M16.8 15.101c-1.144-0.859-1.8-2.172-1.8-3.601v-3c0-2.513-1.694-4.638-4-5.292l-0-0.708c0-0.827-0.673-1.5-1.5-1.5s-1.5 0.673-1.5 1.5v0.708c-2.306 0.655-4 2.779-4 5.292v3c0 1.429-0.656 2.741-1.8 3.601-0.172 0.129-0.242 0.354-0.174 0.558s0.259 0.342 0.474 0.342h4.55c-0.033 0.164-0.051 0.331-0.051 0.5 0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5c0-0.168-0.017-0.336-0.050-0.5h4.55c0.215 0 0.406-0.138 0.474-0.342s-0.002-0.429-0.174-0.558zM9 2.5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v0.523c-0.165-0.015-0.331-0.023-0.5-0.023s-0.335 0.008-0.5 0.023v-0.523zM11 16.5c0 0.827-0.673 1.5-1.5 1.5s-1.5-0.673-1.5-1.5c0-0.171 0.030-0.34 0.086-0.5h2.828c0.056 0.16 0.086 0.329 0.086 0.5zM3.742 15c0.255-0.309 0.477-0.646 0.659-1.001 0.398-0.778 0.599-1.619 0.599-2.499v-3c0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5v3c0 0.88 0.202 1.721 0.599 2.499 0.182 0.356 0.404 0.692 0.659 1.001h-11.517z',
    ATTACHMENT: 'M5.602 19.8c-1.293 0-2.504-0.555-3.378-1.44-1.695-1.716-2.167-4.711 0.209-7.116 1.391-1.408 6.966-7.053 9.748-9.87 0.988-1 2.245-1.387 3.448-1.060 1.183 0.32 2.151 1.301 2.468 2.498 0.322 1.22-0.059 2.493-1.046 3.493l-9.323 9.44c-0.532 0.539-1.134 0.858-1.738 0.922-0.599 0.064-1.17-0.13-1.57-0.535-0.724-0.736-0.828-2.117 0.378-3.337l6.548-6.63c0.269-0.272 0.705-0.272 0.974 0s0.269 0.714 0 0.986l-6.549 6.631c-0.566 0.572-0.618 1.119-0.377 1.364 0.106 0.106 0.266 0.155 0.451 0.134 0.283-0.029 0.606-0.216 0.909-0.521l9.323-9.439c0.64-0.648 0.885-1.41 0.69-2.145-0.192-0.725-0.778-1.318-1.493-1.513-0.726-0.197-1.48 0.052-2.12 0.7-2.782 2.818-8.356 8.462-9.748 9.87-1.816 1.839-1.381 3.956-0.209 5.143 1.173 1.187 3.262 1.629 5.079-0.212l9.748-9.87c0.269-0.272 0.705-0.272 0.974 0s0.269 0.714 0 0.987l-9.748 9.87c-1.149 1.162-2.436 1.65-3.648 1.65z',
    CONTROLLERPLAY: 'M15 10.001c0 0.299-0.305 0.514-0.305 0.514l-8.561 5.303c-0.624 0.409-1.134 0.106-1.134-0.669v-10.297c0-0.777 0.51-1.078 1.135-0.67l8.561 5.305c-0.001 0 0.304 0.215 0.304 0.514z',
    INFOWITHCIRCLE: 'M10 0.4c-5.303 0-9.601 4.298-9.601 9.6 0 5.303 4.298 9.601 9.601 9.601 5.301 0 9.6-4.298 9.6-9.601s-4.299-9.6-9.6-9.6zM10.896 3.866c0.936 0 1.211 0.543 1.211 1.164 0 0.775-0.62 1.492-1.679 1.492-0.886 0-1.308-0.445-1.282-1.182 0-0.621 0.519-1.474 1.75-1.474zM8.498 15.75c-0.64 0-1.107-0.389-0.66-2.094l0.733-3.025c0.127-0.484 0.148-0.678 0-0.678-0.191 0-1.022 0.334-1.512 0.664l-0.319-0.523c1.555-1.299 3.343-2.061 4.108-2.061 0.64 0 0.746 0.756 0.427 1.92l-0.84 3.18c-0.149 0.562-0.085 0.756 0.064 0.756 0.192 0 0.82-0.232 1.438-0.719l0.362 0.486c-1.513 1.512-3.162 2.094-3.801 2.094z',
    EYEPASSWORD: 'M10 4.4c-6.561 0-10 4.832-10 5.6 0 0.766 3.439 5.6 10 5.6s10-4.834 10-5.6c0-0.768-3.44-5.6-10-5.6zM10 14.307c-2.455 0-4.445-1.928-4.445-4.307s1.99-4.309 4.445-4.309c2.455 0 4.444 1.93 4.444 4.309s-1.989 4.307-4.444 4.307zM10 10c-0.407-0.447 0.663-2.154 0-2.154-1.228 0-2.223 0.965-2.223 2.154s0.995 2.154 2.223 2.154c1.227 0 2.223-0.965 2.223-2.154 0-0.547-1.877 0.379-2.223 0z',
};
export const nodatatext_message = {
    noeventfound: "No event found.",
    noworkhistory: "No work history found.",
    noeducationdetail: "No education detail found.",
    notieupsfound: "No tieups found.",
    noprofilevideofound: "No videos found.",
    noexhibitorphotosfound: "No photo found.",
    nowingsfound: "You are not a member of any wing.",
    noexhibitorproducrfound: "No any product found.",
    noexhibitorstafffound: "No any member found.",
    nopendingdealsfound: "No any pending deal found.",
    nocompleteddealfound: "No any completed deal found.",
    noactivityfound: "No activity found.",
    noliveeventfound: "No live event found.",
    noupcomingeventfound: "No upcoming event found.",
    nowings: "No wings found.",
    nonewapplicationforwingster: "No any application for wingster.",
    nowingster: "No any wingster found.",
    noexhibition: "No exhibition.",
    nonotifications: "No any notifications found."
}
export const nodatatext_image_configuration = {
    sidebarworkhistory: "sidebarworkhistory",
    sidebareducationdetail: "sidebareducationdetail",
    alllistworkhistorypopup: "alllistworkhistory",
    alllisteducationdetailpopup: "alllisteducationdetailpopup",
    userprofilevideo: "userprofilevideo"
}
export const Post_Type = {
    messages: "messages",
    images: "images",
    videos: "videos"
}
export const streamcredentials = {
    appkey: 'cpgppgpbrh9a',
    appid: '45932',
}
export const stream_verb_list = {
    follow: "user_follow",
    like: "like",
    notification: "notification",
    user_posts: "user_posts",
    user: "user",
    comment: "comment",
    user_wing_posts: "user_wing_posts",
    audiovideocall: "audiovideocall",
    user_video_call: "user_video_call",
    audiovideocallstatus: "audiovideocallstatus"
}
export const Wingposttype = {
    all: "All",
    general: "General",
    lead: "Lead",
    recommend: "Recommend",
    conversion: "Conversion"
}
export const Notification_Type = {
    User_Post: "User_Post",
    User_Post_Comment: "User_Post_Comment",
    User_Post_Like: "User_Post_Like",
    User_Post_Comment_Like: "User_Post_Comment_Like",
    Follow: "Follow",
    Tieups: "Tieups"
}
export const streampagetype = {
    schedulecalendar: "schedulecalendar",
    rightheader: "rightheader",
}
export const Wingleadtype = {
    external: "External",
    internal: "Internal"
}
export const callacceptrejectstatus = {
    accept: "accept",
    reject: "reject"
}
export const filestackoptionimage = {
    accept: 'image/*',
}
export const filestackoptionpdf = {
    accept: ['application/pdf', "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
}
export const encodedstring = (obj) => {
    // let text = obj;
    // let bytes = utf8.encode(text.toString());
    // let encoded = base64.encode(bytes);
    // return encoded;
    return window.btoa(obj)
    // var str = "Hello World!";
    // var enc = window.btoa(str); Encoded string
    // var dec = window.atob(enc); Decoded string
}
export const decodedstring = (obj) => {
    // let text = obj;
    // let bytes = utf8.encode(text);
    // let encoded = base64.encode(bytes);
    // return encoded;
    return window.atob(obj)
    // let encoded = obj;
    // let bytes = base64.decode(encoded);
    // let decoded = utf8.decode(bytes);
    // return decoded;
}
export const yeardifference = (fromyear, toyear) => {
    let a = moment([toyear]);
    let b = moment([fromyear]);
    return a.diff(b, 'years');       // 1    
}
export const getcalltype = (calltype) => {
    let strreturn = null
    switch (calltype) {
        case (schedule_call_type.audio):
            strreturn = "Audio"
            break;
        case (schedule_call_type.video):
            strreturn = "Video"
            break;
        case (schedule_call_type.chat):
            strreturn = "Chat"
            break;
        default:
            break;
    }
    return strreturn;
}
export const confirmdelete = (eventhandler) => {
    return confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <DeleteConfirmation onClose={onClose} deletedataconfirmation={eventhandler} />
            );
        },
    });
}


export const url_validation = value =>
/* eslint-disable */
  value && !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(value) ?
  'Invalid URL' : undefined
  
export const password_validation = value =>
value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(value) ?
    'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' : undefined

export const ReactGoogleAnalytics = () => {           
        ReactGA.initialize("UA-40213864-2"); 
        ReactGA.pageview(window.location.pathname + window.location.search); 
}
export const GTM_ID = process.env.REACT_APP_GTM_ID
