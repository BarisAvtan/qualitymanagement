import { Modal, Spin, Button, Card } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateRightOutlined, DownloadOutlined, RotateLeftOutlined } from '@ant-design/icons';

function TaskDetail({ isModalOpen, setIsModalOpen, imageUrls, isLoading }) {
    const navigation = useNavigate();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const clearModalAndClose = () => {
        setIsModalOpen(false);
    };

    const [rotation, setRotation] = useState(0);

    const rotateLeft = () => {
        setRotation(prev => prev - 90);
    };

    const rotateRight = () => {
        setRotation(prev => prev + 90);
    };
    const handleImageClick = (url) => {
        setPreviewImage(url);
        setPreviewOpen(true);
    };

    return (
        <>
            <Modal
                width={1500}
                height="50%"
                open={isModalOpen}
                onCancel={clearModalAndClose}
                footer={[
                    <Button
                        key="cancel"
                        onClick={clearModalAndClose}
                        style={{
                            backgroundColor: '#0A4D80',
                            color: '#fff',
                            border: 'none',

                        }}
                    >
                        Vazgeç
                    </Button>
                ]}
            >
                <div style={{ width: '97%', marginTop: 30 }}>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '20px',
                            minHeight: '200px'
                        }}
                    >
                        {isLoading ? (
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '60px 0',
                                    backgroundColor: '#fafafa',
                                    borderRadius: '8px',
                                }}
                            >
                                <Card
                                    style={{
                                        padding: '30px 50px',
                                        border: '1px solid #e0e0e0',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        borderRadius: '12px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Spin size="large" tip="Görseller yükleniyor..." />
                                    <div style={{ marginTop: 24, color: '#555', fontSize: 15 }}>
                                    Görseller hazırlanmaya başlandı.Dosya sunucusundan görsellere erişiliyor. Yükleme süresi sunucu yoğunluğuna bağlı olarak değişebilir.                                    </div>
                                </Card>
                            </div>
                        ) : imageUrls && imageUrls.length > 0 ? (
                            imageUrls.map((url, index) => (
                                <div key={index} style={{ maxWidth: 300 }}>
                                    <img
                                        src={url}
                                        alt={`Görsel ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: 200,
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s',
                                        }}
                                        onClick={() => handleImageClick(url)}
                                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>        Görseller hazırlanamadı ve sunucuda ilgili montaja ait herhangi bir görsel bulunamadı.
                            </p>
                        )}
                    </div>
                </div>
            </Modal>

            <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)} centered width="50%" >
                {previewImage && (
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src={previewImage}
                            alt="Büyük Önizleme"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '80vh',
                                borderRadius: '10px',
                                transform: `rotate(${rotation}deg)`,
                                transition: 'transform 0.3s ease'
                            }}
                        />
                        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 10 }}>
                            <Button
                                onClick={rotateLeft}
                                icon={<RotateLeftOutlined />}
                            >
                                Sola Döndür
                            </Button>
                            <Button
                                onClick={rotateRight}
                                icon={<RotateRightOutlined />}
                            >
                                Sağa Döndür
                            </Button>
                            <a href={previewImage} download target="_blank" rel="noopener noreferrer">
                                <Button
                                    style={{

                                        backgroundColor: '#0A4D80',
                                        color: '#fff',
                                        border: 'none',

                                    }}
                                    icon={<DownloadOutlined />}
                                >
                                    Kaydet
                                </Button>
                            </a>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}

export default TaskDetail;
