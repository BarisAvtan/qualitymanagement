import { useEffect, useState, React, useSelector } from '../../../Utils/Constant/imports';
import {
    Row,
    Col,
    Card,
    Table,
    Button,
    Select,
    DatePicker
} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

import useTask from '../Hook/useTask';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import projectcss from "../../Task/Style/AntTaskTable.css";
import TaskDetail from '../Component/TaskDetail';
import moment from 'moment';
import Cookies from 'js-cookie';

function Task() {

    const {
        columns,
        getCustomers, getDealer, getProject, getDevice, getTaskInfo,onChangeDevice,
        isModalOpen, setIsModalOpen,
        selectedTask, setSelectedTask,
        onChangeDealer, onChangeCustomer, onChangeProject, taskInfoData ,imageUrls, isLoading,customerFilter ,deviceFilter,dealerFilter
    } = useTask();

    const [loading, setLoading] = useState(false);
    const [dealers, setDealers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [devices, setDevice] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loadingTable, setLoadingTable] = useState(false);

    const token = useSelector((state) => state.General.token);
  
    const customerSearch = async (newValue) => {
        const [searchTextCustomerData] = await Promise.all([
            getCustomers(newValue)
        ]);

        setCustomers(searchTextCustomerData?.data?.map(customer => ({
            value: customer.id,
            label: customer.name
        })));
        setDevice([]);

    }

    const deviceSearch = async (newValue) => {

        const [searchTextDeviceData] = await Promise.all([
            getDevice(newValue,customerFilter)
        ]);

        setDevice(searchTextDeviceData?.data?.map(device => ({
            value: device.id,
            label: device.name
        })));
    }

    const dealersSearch = async (newValue) => {

        const [searchTextDealerData] = await Promise.all([
            getDealer(newValue)
        ]);

        setDealers(searchTextDealerData?.data?.map(dealer => ({
            value: dealer.id,
            label: dealer.name
        })));

    }

    const getStartAndEndDate = (year, month) => {
        // Start date
        const startDates = moment({ year, month: month - 1, day: 1 }).startOf('month'); // month is zero-based in moment.js
        // End date
        const endDates = moment({ year, month: month - 1, day: 1 }).endOf('month');
        setStartDate(startDates.format('YYYY-MM-DD'));
        setEndDate(endDates.format('YYYY-MM-DD'));
    };
    const onDateChange = (date, dateString) => {
        debugger;
        if (date) {
            let year = date.year(); // Get year as integer
            let month = date.month() + 1; // Get month as integer (add 1 since month() is zero-based)
            getStartAndEndDate(year, month);
        }
        else {
            setStartDate('');
            setEndDate('');
          }

    };

    return (
        <>
        <div className="tabled">
            <TaskDetail
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                imageUrls={imageUrls} 
                isLoading={isLoading}
                />
            <Row gutter={[24, 0]}>
                <Col xs={24} xl={24}>
                    <Card bordered={false} className="criclebox tablespace mb-24">
                        <Row gutter={[16, 16]} style={{ alignItems: 'center', marginLeft: 0 }}>
                            {/* Müşteri */}
                            <Col xs={24} sm={12} md={12} lg={5}>
                                <label className="filter-label">Müşteri</label>
                                <Select
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Seçiniz"
                                    optionFilterProp="label"
                                    options={customers}                                   
                                     loading={loading}
                                    filterOption={false}
                                    onChange={onChangeCustomer}
                                    onSearch={customerSearch}
                                    allowClear
                                />
                            </Col>

                            {/* Cihaz */}
                            <Col xs={24} sm={12} md={12} lg={5}>
                                <label className="filter-label">Cihaz</label>
                                <Select
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Seçiniz"
                                    optionFilterProp="label"
                                    onChange={onChangeDevice}
                                    onSearch={deviceSearch}
                                    options={devices}
                                    loading={loading}
                                    filterOption={false}
                                    allowClear={true}
                                    //onChange={(value) => setSelectedDevice(value)} // cihaz değişince güncelle

                                />
                            </Col>

                            {/* Teknik Servis */}
                            <Col xs={24} sm={12} md={12} lg={5}>
                                <label className="filter-label">Teknik Servis</label>
                                <Select
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Seçiniz"
                                    optionFilterProp="label"
                                    options={dealers}
                                    loading={loading}
                                    filterOption={false}
                                    onChange={onChangeDealer}
                                    onSearch={dealersSearch}
                                    allowClear
                                />
                            </Col>


                            {/* Tarih */}
                            <Col xs={24} sm={12} md={12} lg={4}>
                                <label className="filter-label">Montaj Tamamlanma Tarih</label>
                                <DatePicker
                                    picker="month"
                                    style={{
                                        width: '100%',
                                        height: 32,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    onChange={onDateChange} 
                                />
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={2}>
                                <label className="filter-label" style={{ visibility: 'hidden' }}>Ara</label>
                                <Button
                                    type="primary"
                                    icon={<SearchOutlined />}
                                    onClick={() => {
                                        if (!customerFilter || !deviceFilter || !dealerFilter || !startDate || !endDate) {
                                          Swal.fire({
                                            icon: 'warning',
                                            title: 'Uyarı',
                                            text: 'Müşteri, Cihaz, Teknik Servis veya Tarih alanlarını doldurunuz.',
                                            confirmButtonText: 'Tamam'
                                          });
                                          return;
                                        }
                                    
                                        getTaskInfo({ startDate, endDate });
                                      }}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#0A4D80',
                                        borderColor: '#0A4D80',
                                        height: 32,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 0,
                                    }}
                                >
                                    Ara
                                </Button>
                            </Col>

                        </Row>

                        <div className="table-responsive" style={{ marginTop: 24 ,overflowX: 'auto'}}>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <Table
                                    columns={columns}
                                    dataSource={taskInfoData}
                                    bordered
                                    rowClassName="custom-row-height"
                                    loading={loadingTable}
                                    scroll={{ x: 'max-content' }} 

                                />
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
        </>     
    );
}

export default Task;
