import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import { useState } from "react";
import APIURL from "../../../Utils/Constant/APIUrls";
import Swal from 'sweetalert2';

function useTask() {
    const [imageUrls, setImageUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState([]);
    // task table filter states 
    const [dealerFilter, setDealerFileter] = useState(null);
    const [customerFilter, setCustomerFilter] = useState(null);
    const [projectFilter, setProjectFilter] = useState(null);
    const [deviceFilter, setDeviceFilter] = useState(null);
    const [transportFeeFileter, setTransportFeeFileter] = useState(null);
    const [faultFeeFilter, setFaultFeeFilter] = useState(null);
    const [montagePlaceFilter, setMontagePlaceFilter] = useState(null);
    // task table search filter states 
    const [searchTextDealer, setSearchTextDealer] = useState('');
    const [searchTextCustomer, setSearchTextCustomer] = useState('');
    const [searchTextProject, setSearchTextProject] = useState('');
    const [searchTextDevice, setSearchTextDevice] = useState('');
    const [taskInfoData, setTaskInfoData] = useState([]);
    const [device, setDevice] = useState([]);

    const columns = [
        {
            title: "Müşteri",
            dataIndex: "customerName",
            key: "customerName",
            width: 300, // piksel genişlik
            ellipsis: true,
            align: "center",
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],

        },
        {
            title: "Cihaz",
            dataIndex: "deviceName",
            key: "DeviceName",
            width: 150, 
            ellipsis: true,
            align: "center",
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],

        },
        {
            title: "Bayi",
            dataIndex: "serviceName",
            key: "serviceName",
            width: "20%",
            ellipsis: true,
            align: "center",
            responsive: ['md', 'lg', 'xl'],
        },
        {
            //title: "Görevi Tamamlayan Kullanıcı",
            title: (
                <>
                  Tamamlayan<br /> <br />Kullanıcı
                </>
              ),
            dataIndex: "completedTaskUserName",
            key: "completedTaskUserName",
            width: "15%",
            ellipsis: true,
            align: "center",
            responsive: ['md', 'lg', 'xl']
        },
        {
            // title: "Montaj Tamamlama Tarihi",
            title: (
                <>
                  Montaj<br /> <br /> Tarihi
                </>
              ),
            dataIndex: "completionDate",
            key: "completionDate",
            width: "8%",
            ellipsis: true,
            align: "center",
            render: (_, record) => (
                <>
                    {record.completionDate ? moment(record.completionDate).format("DD/MM/YYYY") : <></>}
                </>
            ),
            responsive: ['md', 'lg', 'xl']
        },
        {
            title: "Fotograf Bilgisi",
            title: (
                <>
                  Fotoğraf<br /> <br />Bilgisi                </>
              ),
            key: "detail",
            width: 120, 
            ellipsis: true,
            align: "center",
            render: (_, record) => (
                <button type="link"
                    //onClick={() => console.log(record.taskGroupId)}
                    onClick={() => {
                        setSelectedTask(record.taskGroupId);
                        setIsModalOpen(true);
                        getTaskDetail(record.taskGroupId, record.deviceName, record.completionDate, null);
                    }
                    }
                    style={{
                        height: 10,
                        fontWeight: 'bold',
                        // alignSelf:'center',
                        // padding: "5px 10px",
                        backgroundColor: "transparent",
                        color: "#0c4b80",
                        border: "none",
                        // borderRadius: "5px",
                        // cursor: "pointer",
                    }}
                >
                    Fotograf Gör
                </button >
            ),
            responsive: ['xs', 'sm', 'md', 'lg', 'xl']
        },
    ];

    const getCustomers = async (data) => {
        debugger;
        const url = `${APIURL.baseUrl}${APIURL.getCustomer}?searchText=${encodeURIComponent(data)}`;
        try {
          const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                    
                'Authorization': 'Bearer ' + Cookies.get("token")          
              },
            data: data
          };
      
          const response = await axios.request(config);
          return response.data;
        } catch (error) {
          throw error;
        }
    };
      
    const getDealer = async (searchText) => {
        debugger;
        const url = `${APIURL.baseUrl}${APIURL.getDealer}?searchText=${encodeURIComponent(searchText)}`;
        try {     
            const config = {
              method: 'get',
              maxBodyLength: Infinity,
              url: url,
              headers: {
                'Authorization': 'Bearer ' + Cookies.get("token")          
              },
              data: searchText
            };
        
            const response = await axios.request(config);
            return response.data;
          } catch (error) {
            throw error;
          }
    };

    const getProject = async (searchText) => {
        try {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: APIURL.baseUrl + APIURL.project + searchText,
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get("token")
                }
            };

            const response = await axios.request(config);
            return response.data; // Return the response data
        } catch (error) {
            throw error; // Rethrow the error for the calling function to handle
        }
    };

     const getDevice = async (searchText, customerId) => {
        debugger;
        const params = new URLSearchParams();
        if (searchText) params.append('searchText', searchText);
        if (customerId) params.append('customerId', customerId);
    
        const config = {
            method: 'get',
            url: APIURL.baseUrl + APIURL.getDevice + '?' + params.toString(),
            headers: {
                'Authorization': 'Bearer ' + Cookies.get("token")
            }
        };
    
        const response = await axios.request(config);
        return response.data;
    };

    const getTaskInfo = async (taskData) => {
        debugger;

        const data = {
            CustomerId: customerFilter ?? null,
            DealerId: dealerFilter ?? null,
            DeviceId: deviceFilter ?? null,
            StartDate: taskData.startDate,
            EndDate: taskData.endDate
        };
    
        const config = {
            method: 'post',
            url: APIURL.baseUrl + APIURL.getTaskInfo,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get("token")          
            },
            data: JSON.stringify(data)
        };
    
        try {
            const response = await axios.request(config);
            setTaskInfoData(response.data.data);
            const taskData = response.data.data;
            if (!taskData || taskData.length === 0) {
                Swal.fire({
                  icon: 'info',
                  title: 'Bilgi',
                  text: 'Veri bulunamadı.',
                });
                setTaskInfoData([]); 
                return [];
              }
            return response.data.data;
        }  catch (error) {
            console.error('Error fetching task:', error.response?.data || error.message);
            Swal.fire({
              icon: 'error',
              title: 'Hata',
              text: 'Görev bilgileri alınırken hata oluştu.',
            });
            throw error;
          }
    };
    
    const getTaskDetail = async (taskGroupId, deviceName, startDate, endDate) => {
        setIsLoading(true);
        setImageUrls(null);
      
        if (taskGroupId && deviceName) {
          const key = taskGroupId + "-" + deviceName;
          const data = {
            key: key,
            //date: startDate ?? moment().format("YYYY-MM-DD")
             date : startDate 
            ? moment(startDate).format("YYYY-MM-DD") 
            : moment().format("YYYY-MM-DD")
        };
      
          const config = {
            method: 'post',
            url: APIURL.baseUrl + APIURL.getImages,
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + Cookies.get("token")          
            },
            data: data  // burada JSON objesi doğrudan gönderiliyor
          };
      
          try {
            const response = await axios.request(config);
            const data = response.data.data; // array of { fileName, base64 }
            const urls = data.map(item => `data:image/jpeg;base64,${item.base64}`);
            setImageUrls(urls);
          } catch (error) {
            console.error("Görseller alınamadı:", error);
          } finally {
            setIsLoading(false);
          }
        }
      };
      
    const onChangeTransportFee = (value) => {
        setTransportFeeFileter(value);
    };

    const onChangeFaultFee = (value) => {
        setFaultFeeFilter(value);
    };

    const onChangeMontagePlace = (value) => {
        setMontagePlaceFilter(value);
    };

    const onChangeDealer = (value) => {
        setDealerFileter(value);
    };
    
    const onChangeCustomer = (value) => {
        debugger;
        setCustomerFilter(value);
        setDevice([]);            
    };

    const onChangeProject = (value) => {
        setProjectFilter(value);
    };

    const onChangeDevice = (value) => {
        setDeviceFilter(value);
        setDevice([]); 

    };

    const onSearchDealer = (value) => {
        if (value.length > 3) {
        } else {
            setSearchTextDealer('');
        }
    };

    // Search handler for customers
    const onSearchCustomer = (value) => {
        if (value.length > 3) {
            setSearchTextCustomer(value);
        } else {
            setSearchTextCustomer('');
        }
    };

    // Search handler for projects
    const onSearchProject = (value) => {
        if (value.length > 3) {
            setSearchTextProject(value);
        } else {
            setSearchTextProject('');
        }
    };

    // Search handler for devices
    const onSearchDevice = (value) => {
        if (value.length > 3) {
            setSearchTextDevice(value);
        } else {
            setSearchTextDevice('');
        }
    };

    return {
        columns,
        // filter methods 
        getCustomers, getDealer, getProject, getDevice, getTaskInfo, getTaskDetail,
        //modal control
        isModalOpen, setIsModalOpen,
        // modal select task methods
        selectedTask, setSelectedTask,
        //filter select methods
        onChangeDealer, onSearchDealer, onChangeCustomer, onSearchCustomer, onChangeProject, onSearchProject, onChangeDevice,
        onSearchDevice, onChangeTransportFee, onChangeFaultFee, onChangeMontagePlace,
        dealerFilter, setDealerFileter,
        customerFilter, setCustomerFilter,
        deviceFilter, setDeviceFilter,
        imageUrls, setImageUrls,
        isLoading, setIsLoading,
        //filter search text params 
        searchTextDealer, searchTextCustomer, searchTextDevice, taskInfoData
    }

}

export default useTask
