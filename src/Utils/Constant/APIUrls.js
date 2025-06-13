
const APIURL = {
 baseUrl : "https://localhost:7237/api",
 //baseUrl : "https://crmportal.arvento.com/AppointmentTrackingService/api/", 
//getImages :"/Snap/images/indexed2",
getImages :"/Snap/getMontageImage",
//getTaskInfo:"/Task/Gettas",
getTaskInfo:"/Task/GetTaskInfo",
getCustomer : "/TaskParameter/Customer",
getDevice :"/TaskParameter/Device",
getDealer :"/TaskParameter/Dealer"
}


export default 
    APIURL
;