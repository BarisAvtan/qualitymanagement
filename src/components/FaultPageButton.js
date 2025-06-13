import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function PageButton({selectedTask}) {
    const navigate = useNavigate();

    useEffect(() => {
debugger;
        console.log("Seçili Görev:", selectedTask);
    }, [selectedTask]);

    const handleClick = () => {
        if (!selectedTask) {
            console.warn("Seçili görev bulunamadı.");
            return;
        }
        navigate('/createappointment', { 
            state: 
            { 
            task: selectedTask ,
            appointmentType : 1
        } }); 
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 1000, // Set a high z-index value
            }}
        >
            <Button
                type="primary"
                shape="circle"
                onClick={handleClick}
                style={{
                    width: '100px', 
                    height: '90px',
                    borderRadius: '50%',
                    boxShadow: '#0056f9db 0px 0px 60px',
                    backgroundColor: '#084164', // Button color
                    borderColor: '#084164',
                    color: 'white',
                    justifyContent: 'center', // Yazıyı ortalar
                    fontSize: '15px',
                }}
            >
                 <div style={{
                    display: 'flex',
                    flexDirection: 'column',  // Yazıları dikey sıralar
                    justifyContent: 'center',
                    alignItems: 'center',
                    lineHeight: '16px',  // Satır aralığını kontrol etmek için
                }}>
                    <span>Randevu</span>
                    <span>Oluştur</span>
                </div>
            </Button>
        </div>
    );
}

export default PageButton;
